import type { MechanismEvent } from './events';
import { applyEvents } from './transition';
import type { Transition } from './transition';
import type { ErrorCondition, MechanismId, OperationCycleId, WarningCondition } from './types';

export interface OperationTrace<State, Action, Event extends MechanismEvent = MechanismEvent> {
  format: 'mechanical-computing-trace';
  version: 1;
  mechanismId: MechanismId;
  cycleId: OperationCycleId;
  initialState: State;
  action: Action;
  events: Event[];
  warnings: WarningCondition[];
  errors: ErrorCondition[];
  finalState: State;
}

export function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, entry]) => entry !== undefined)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, entry]) => [key, canonicalize(entry)]),
    );
  }
  return value;
}

export function serializeTrace<State, Action, Event extends MechanismEvent>(
  trace: OperationTrace<State, Action, Event>,
): string {
  return JSON.stringify(canonicalize(trace));
}

export function parseTrace<State, Action, Event extends MechanismEvent>(
  json: string,
): OperationTrace<State, Action, Event> {
  const parsed = JSON.parse(json) as Partial<OperationTrace<State, Action, Event>>;
  if (parsed.format !== 'mechanical-computing-trace' || parsed.version !== 1 || !Array.isArray(parsed.events)) {
    throw new Error('unsupported or malformed mechanism trace');
  }
  return parsed as OperationTrace<State, Action, Event>;
}

/**
 * Compare the complete enumerable trace shape while ignoring object member
 * insertion order. Unlike JSON.stringify, this does not collapse NaN into
 * null, sparse array slots with explicit undefined entries, or discard enumerable
 * undefined and Symbol properties.
 */
function enumerableKeys(value: object): PropertyKey[] {
  return Reflect.ownKeys(value)
    .filter((key) => Object.prototype.propertyIsEnumerable.call(value, key));
}

function isDenseOrdinaryArray(value: unknown): value is unknown[] {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) return false;
  const keys = enumerableKeys(value);
  if (keys.length !== value.length) return false;
  for (let index = 0; index < value.length; index += 1) {
    if (!Object.prototype.propertyIsEnumerable.call(value, String(index))) return false;
  }
  return true;
}

/** Reject dynamic or cyclic enumerable graphs before trusted replay code reads them. */
export function assertStableEnumerableDataTree(value: unknown, message: string): void {
  if (value === null || typeof value !== 'object') return;
  const active = new WeakSet<object>();
  const visited = new WeakSet<object>();
  const stack: Array<{ value: object; exiting: boolean }> = [{ value, exiting: false }];
  while (stack.length > 0) {
    const frame = stack.pop();
    if (!frame) break;
    if (frame.exiting) {
      active.delete(frame.value);
      visited.add(frame.value);
      continue;
    }
    if (active.has(frame.value)) throw new Error(message);
    if (visited.has(frame.value)) continue;
    active.add(frame.value);
    stack.push({ value: frame.value, exiting: true });
    for (const key of Reflect.ownKeys(frame.value)) {
      const descriptor = Object.getOwnPropertyDescriptor(frame.value, key);
      if (!descriptor || !descriptor.enumerable) continue;
      if (!('value' in descriptor)) throw new Error(message);
      const child = descriptor.value;
      if (child !== null && typeof child === 'object') {
        stack.push({ value: child, exiting: false });
      }
    }
  }
}

function ownEnumerableDataValue(value: object, key: PropertyKey, message: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  if (!descriptor || !descriptor.enumerable || !('value' in descriptor)) {
    throw new Error(message);
  }
  return descriptor.value;
}

function hasOwnEnumerableEnvelope(
  event: unknown,
  mechanismId: unknown,
  cycleId: unknown,
): event is MechanismEvent {
  if (event === null || typeof event !== 'object' || Array.isArray(event)) return false;
  const mechanism = Object.getOwnPropertyDescriptor(event, 'mechanismId');
  const cycle = Object.getOwnPropertyDescriptor(event, 'cycleId');
  return Boolean(
    mechanism
    && mechanism.enumerable
    && 'value' in mechanism
    && mechanism.value === mechanismId
    && cycle
    && cycle.enumerable
    && 'value' in cycle
    && cycle.value === cycleId,
  );
}

function stableTraceValuesEqual(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true;
  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) return false;
  }
  if (left === null || right === null || typeof left !== 'object' || typeof right !== 'object') return false;
  if (Object.getPrototypeOf(left) !== Object.getPrototypeOf(right)) return false;

  const leftKeys = enumerableKeys(left);
  const rightKeys = enumerableKeys(right);
  return leftKeys.length === rightKeys.length
    && leftKeys.every((key) => Object.prototype.hasOwnProperty.call(right, key)
      && stableTraceValuesEqual(
        (left as Record<PropertyKey, unknown>)[key],
        (right as Record<PropertyKey, unknown>)[key],
      ));
}

/** Reject dynamic/cyclic inputs before performing an order-independent exact comparison. */
export function traceValuesEqual(left: unknown, right: unknown): boolean {
  const malformedValue = 'trace comparison requires stable enumerable data';
  assertStableEnumerableDataTree(left, malformedValue);
  assertStableEnumerableDataTree(right, malformedValue);
  return stableTraceValuesEqual(left, right);
}

export function replayTrace<State, Action, Event extends MechanismEvent>(
  trace: OperationTrace<State, Action, Event>,
  reducer: (state: Readonly<State>, event: Readonly<Event>) => State,
  transition: Transition<State, Action, Event>,
): State {
  const malformedTrace = 'unsupported or malformed mechanism trace';
  const invalidEnvelope = 'trace envelope does not match the recorded action';
  assertStableEnumerableDataTree(trace, malformedTrace);
  const supportedTraceKeys = new Set<PropertyKey>([
    'format',
    'version',
    'mechanismId',
    'cycleId',
    'initialState',
    'action',
    'events',
    'warnings',
    'errors',
    'finalState',
  ]);
  const traceKeys = trace !== null && typeof trace === 'object' ? enumerableKeys(trace) : [];
  if (
    trace === null
    || typeof trace !== 'object'
    || traceKeys.length !== supportedTraceKeys.size
    || traceKeys.some((key) => !supportedTraceKeys.has(key))
  ) {
    throw new Error(malformedTrace);
  }
  const format = ownEnumerableDataValue(trace, 'format', malformedTrace);
  const version = ownEnumerableDataValue(trace, 'version', malformedTrace);
  const mechanismId = ownEnumerableDataValue(trace, 'mechanismId', malformedTrace);
  const cycleId = ownEnumerableDataValue(trace, 'cycleId', malformedTrace);
  const initialState = ownEnumerableDataValue(trace, 'initialState', malformedTrace) as State;
  const action = ownEnumerableDataValue(trace, 'action', malformedTrace) as Action;
  const eventsValue = ownEnumerableDataValue(trace, 'events', malformedTrace);
  const warnings = ownEnumerableDataValue(trace, 'warnings', malformedTrace);
  const errors = ownEnumerableDataValue(trace, 'errors', malformedTrace);
  const finalState = ownEnumerableDataValue(trace, 'finalState', malformedTrace) as State;
  if (
    format !== 'mechanical-computing-trace'
    || version !== 1
    || !Array.isArray(eventsValue)
    || !Array.isArray(warnings)
    || !Array.isArray(errors)
  ) {
    throw new Error(malformedTrace);
  }

  const expected = transition(initialState, action);
  assertStableEnumerableDataTree(expected, invalidEnvelope);
  if (expected === null || typeof expected !== 'object') throw new Error(invalidEnvelope);
  const expectedState = ownEnumerableDataValue(expected, 'state', invalidEnvelope) as State;
  const expectedEventsValue = ownEnumerableDataValue(expected, 'events', invalidEnvelope);
  const expectedWarnings = ownEnumerableDataValue(expected, 'warnings', invalidEnvelope);
  const expectedErrors = ownEnumerableDataValue(expected, 'errors', invalidEnvelope);
  if (
    !isDenseOrdinaryArray(expectedEventsValue)
    || expectedEventsValue.length === 0
    || expectedEventsValue.some((event) => !hasOwnEnumerableEnvelope(event, mechanismId, cycleId))
  ) {
    throw new Error(invalidEnvelope);
  }

  if (
    !isDenseOrdinaryArray(eventsValue)
    || eventsValue.some((event) => !hasOwnEnumerableEnvelope(event, mechanismId, cycleId))
  ) {
    throw new Error('trace action did not produce the recorded events');
  }
  const events = eventsValue as Event[];
  const replayed = applyEvents(initialState, events, reducer);
  if (!stableTraceValuesEqual(replayed, finalState)) {
    throw new Error('trace replay did not produce the recorded final state');
  }

  if (!stableTraceValuesEqual(expectedEventsValue, events)) {
    throw new Error('trace action did not produce the recorded events');
  }
  if (!stableTraceValuesEqual(expectedWarnings, warnings)) {
    throw new Error('trace action did not produce the recorded warnings');
  }
  if (!stableTraceValuesEqual(expectedErrors, errors)) {
    throw new Error('trace action did not produce the recorded errors');
  }
  if (!stableTraceValuesEqual(expectedState, finalState)) {
    throw new Error('trace action did not produce the recorded final state');
  }
  return replayed;
}
