import type { MechanismEvent } from './events';
import { applyEvents } from './transition';
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

export function replayTrace<State, Action, Event extends MechanismEvent>(
  trace: OperationTrace<State, Action, Event>,
  reducer: (state: Readonly<State>, event: Readonly<Event>) => State,
): State {
  const replayed = applyEvents(trace.initialState, trace.events, reducer);
  if (JSON.stringify(canonicalize(replayed)) !== JSON.stringify(canonicalize(trace.finalState))) {
    throw new Error('trace replay did not produce the recorded final state');
  }
  return replayed;
}
