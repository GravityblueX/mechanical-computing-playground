import { canonicalize } from '../../core/trace';

export const ANALYTICAL_FLOW_ID = 'analytical-engine-teaching-flow';

export type StoreLocation = 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6' | 'V7';
export type CardRole = 'NUMBER' | 'DIRECTIVE' | 'OPERATION' | 'OUTPUT';
export type ArithmeticOperation = 'ADD' | 'MULTIPLY';

export interface AnalyticalFixture { a: number; b: number; c: number; d: number; }
export interface MillState { inputs: number[]; operation: ArithmeticOperation | null; result: number | null; }
export interface AnalyticalFlowState {
  mechanismId: typeof ANALYTICAL_FLOW_ID;
  store: Partial<Record<StoreLocation, number>>;
  mill: MillState;
  currentCardRole: CardRole | null;
  output: number | null;
  eventIndex: number;
}

interface BaseEvent {
  mechanismId: typeof ANALYTICAL_FLOW_ID;
  sequence: number;
  cardRole: CardRole;
  claimType: 'P/M';
}
export type AnalyticalFlowEvent =
  | (BaseEvent & { type: 'NUMBER_ASSOCIATED'; location: StoreLocation; symbol: 'a' | 'b' | 'c' | 'd'; value: number })
  | (BaseEvent & { type: 'STORE_TO_MILL'; source: StoreLocation; value: number; inputIndex: 0 | 1 })
  | (BaseEvent & { type: 'OPERATION_SELECTED'; operation: ArithmeticOperation })
  | (BaseEvent & { type: 'MILL_OPERATION_COMPLETED'; operation: ArithmeticOperation; left: number; right: number; result: number })
  | (BaseEvent & { type: 'MILL_TO_STORE'; target: StoreLocation; symbol: 'p' | 'q' | 'result'; value: number })
  | (BaseEvent & { type: 'RESULT_OUTPUT'; source: 'V7'; value: number });

export interface AnalyticalFlowTrace {
  fixture: AnalyticalFixture;
  initialState: AnalyticalFlowState;
  events: AnalyticalFlowEvent[];
  finalState: AnalyticalFlowState;
}

export class InvalidAnalyticalFlowError extends Error {
  constructor(message: string) { super(message); this.name = 'InvalidAnalyticalFlowError'; }
}

const LOCATIONS: readonly StoreLocation[] = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7'];
function safe(value: number, name: string): void {
  if (!Number.isSafeInteger(value)) throw new InvalidAnalyticalFlowError(`${name} must be a safe integer`);
}
function location(value: string): asserts value is StoreLocation {
  if (!LOCATIONS.includes(value as StoreLocation)) throw new InvalidAnalyticalFlowError(`invalid Store location: ${value}`);
}
function calculate(operation: ArithmeticOperation, left: number, right: number): number {
  const result = operation === 'ADD' ? left + right : left * right;
  safe(result, 'Mill result');
  return result;
}
function semanticallyEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(canonicalize(left)) === JSON.stringify(canonicalize(right));
}
function normalizeFixture(fixture: Readonly<AnalyticalFixture>): AnalyticalFixture {
  if (fixture === null || typeof fixture !== 'object' || Array.isArray(fixture)) throw new InvalidAnalyticalFlowError('fixture must be an object');
  const supportedKeys = new Set<PropertyKey>(['a', 'b', 'c', 'd']);
  const hasUnknownEnumerableKey = Reflect.ownKeys(fixture).some(
    (key) => Object.prototype.propertyIsEnumerable.call(fixture, key) && !supportedKeys.has(key),
  );
  if (hasUnknownEnumerableKey) throw new InvalidAnalyticalFlowError('fixture contains unsupported fields');
  const normalized = { a: fixture.a, b: fixture.b, c: fixture.c, d: fixture.d };
  safe(normalized.a, 'a'); safe(normalized.b, 'b'); safe(normalized.c, 'c'); safe(normalized.d, 'd');
  return normalized;
}

export function createAnalyticalFlowState(): AnalyticalFlowState {
  return { mechanismId: ANALYTICAL_FLOW_ID, store: {}, mill: { inputs: [], operation: null, result: null }, currentCardRole: null, output: null, eventIndex: 0 };
}

export function reduceAnalyticalFlowEvent(
  state: Readonly<AnalyticalFlowState>,
  event: Readonly<AnalyticalFlowEvent>,
): AnalyticalFlowState {
  if (state.mechanismId !== ANALYTICAL_FLOW_ID || event.mechanismId !== state.mechanismId) throw new InvalidAnalyticalFlowError('mechanism id mismatch');
  if (event.sequence !== state.eventIndex) throw new InvalidAnalyticalFlowError('event sequence is not contiguous');
  if (event.claimType !== 'P/M') throw new InvalidAnalyticalFlowError('teaching event claim type mismatch');
  const base = { currentCardRole: event.cardRole, eventIndex: state.eventIndex + 1 };

  if (event.type === 'NUMBER_ASSOCIATED') {
    location(event.location); safe(event.value, 'given value');
    const expected: Record<typeof event.symbol, StoreLocation> = { a: 'V1', b: 'V2', c: 'V3', d: 'V4' };
    if (event.cardRole !== 'NUMBER' || event.location !== expected[event.symbol] || state.store[event.location] !== undefined || state.mill.inputs.length || state.mill.operation || state.mill.result !== null || state.output !== null) {
      throw new InvalidAnalyticalFlowError('invalid Number-role association');
    }
    return { ...state, ...base, store: { ...state.store, [event.location]: event.value } };
  }

  if (event.type === 'STORE_TO_MILL') {
    location(event.source); safe(event.value, 'transferred value');
    if (event.cardRole !== 'DIRECTIVE' || state.store[event.source] === undefined || state.store[event.source] !== event.value || event.inputIndex !== state.mill.inputs.length || event.inputIndex > 1 || state.mill.result !== null) {
      throw new InvalidAnalyticalFlowError('invalid Store-to-Mill transfer');
    }
    return { ...state, ...base, mill: { ...state.mill, inputs: [...state.mill.inputs, event.value] } };
  }

  if (event.type === 'OPERATION_SELECTED') {
    if (event.cardRole !== 'OPERATION' || state.mill.inputs.length !== 2 || state.mill.operation !== null || state.mill.result !== null) throw new InvalidAnalyticalFlowError('operation requires two Mill operands');
    return { ...state, ...base, mill: { ...state.mill, operation: event.operation } };
  }

  if (event.type === 'MILL_OPERATION_COMPLETED') {
    const [left, right] = state.mill.inputs;
    const expected = left === undefined || right === undefined ? null : calculate(event.operation, left, right);
    if (event.cardRole !== 'OPERATION' || state.mill.operation !== event.operation || state.mill.inputs.length !== 2 || event.left !== left || event.right !== right || event.result !== expected || state.mill.result !== null) {
      throw new InvalidAnalyticalFlowError('invalid Mill operation result or ordering');
    }
    return { ...state, ...base, mill: { ...state.mill, result: expected } };
  }

  if (event.type === 'MILL_TO_STORE') {
    location(event.target); safe(event.value, 'stored result');
    const expectedTargets: Record<typeof event.symbol, StoreLocation> = { p: 'V5', q: 'V6', result: 'V7' };
    if (event.cardRole !== 'DIRECTIVE' || event.target !== expectedTargets[event.symbol] || state.store[event.target] !== undefined || state.mill.result === null || event.value !== state.mill.result) throw new InvalidAnalyticalFlowError('invalid Mill-to-Store transfer');
    return { ...state, ...base, store: { ...state.store, [event.target]: event.value }, mill: { inputs: [], operation: null, result: null } };
  }

  if (event.cardRole !== 'OUTPUT' || event.source !== 'V7' || state.store.V7 === undefined || event.value !== state.store.V7 || state.output !== null || state.mill.inputs.length || state.mill.operation || state.mill.result !== null) {
    throw new InvalidAnalyticalFlowError('invalid output transfer');
  }
  return { ...state, ...base, output: event.value };
}

type WithoutBase<T> = T extends BaseEvent ? Omit<T, keyof BaseEvent> : never;
type AnalyticalEventInput = WithoutBase<AnalyticalFlowEvent> & { cardRole: CardRole };

function makeEvent(sequence: number, event: AnalyticalEventInput): AnalyticalFlowEvent {
  return { mechanismId: ANALYTICAL_FLOW_ID, sequence, claimType: 'P/M', ...event } as AnalyticalFlowEvent;
}

export function createAnalyticalFlowTrace(fixture: AnalyticalFixture = { a: 2, b: 3, c: 4, d: 5 }): AnalyticalFlowTrace {
  const normalizedFixture = normalizeFixture(fixture);
  const initialState = createAnalyticalFlowState();
  const events: AnalyticalFlowEvent[] = [];
  const add = (event: Parameters<typeof makeEvent>[1]) => events.push(makeEvent(events.length, event));
  add({ type: 'NUMBER_ASSOCIATED', cardRole: 'NUMBER', location: 'V1', symbol: 'a', value: normalizedFixture.a });
  add({ type: 'NUMBER_ASSOCIATED', cardRole: 'NUMBER', location: 'V2', symbol: 'b', value: normalizedFixture.b });
  add({ type: 'NUMBER_ASSOCIATED', cardRole: 'NUMBER', location: 'V3', symbol: 'c', value: normalizedFixture.c });
  add({ type: 'NUMBER_ASSOCIATED', cardRole: 'NUMBER', location: 'V4', symbol: 'd', value: normalizedFixture.d });
  const operation = (left: StoreLocation, right: StoreLocation, operation: ArithmeticOperation, target: StoreLocation, symbol: 'p' | 'q' | 'result', leftValue: number, rightValue: number) => {
    add({ type: 'STORE_TO_MILL', cardRole: 'DIRECTIVE', source: left, value: leftValue, inputIndex: 0 });
    add({ type: 'STORE_TO_MILL', cardRole: 'DIRECTIVE', source: right, value: rightValue, inputIndex: 1 });
    add({ type: 'OPERATION_SELECTED', cardRole: 'OPERATION', operation });
    const result = calculate(operation, leftValue, rightValue);
    add({ type: 'MILL_OPERATION_COMPLETED', cardRole: 'OPERATION', operation, left: leftValue, right: rightValue, result });
    add({ type: 'MILL_TO_STORE', cardRole: 'DIRECTIVE', target, symbol, value: result });
    return result;
  };
  const p = operation('V1', 'V2', 'MULTIPLY', 'V5', 'p', normalizedFixture.a, normalizedFixture.b);
  const q = operation('V5', 'V3', 'ADD', 'V6', 'q', p, normalizedFixture.c);
  const result = operation('V6', 'V4', 'MULTIPLY', 'V7', 'result', q, normalizedFixture.d);
  add({ type: 'RESULT_OUTPUT', cardRole: 'OUTPUT', source: 'V7', value: result });
  const finalState = events.reduce(reduceAnalyticalFlowEvent, initialState);
  return { fixture: normalizedFixture, initialState, events, finalState };
}

function fixtureDerivedTrace(trace: Readonly<AnalyticalFlowTrace>): AnalyticalFlowTrace {
  const canonical = createAnalyticalFlowTrace(trace.fixture);
  if (!semanticallyEqual(trace.fixture, canonical.fixture)) throw new InvalidAnalyticalFlowError('fixture contains unsupported fields');
  if (!semanticallyEqual(trace.initialState, canonical.initialState)) throw new InvalidAnalyticalFlowError('initial state does not match fixture-derived trace');
  if (!semanticallyEqual(trace.events, canonical.events)) throw new InvalidAnalyticalFlowError('fixture/event mismatch');
  if (!semanticallyEqual(trace.finalState, canonical.finalState)) throw new InvalidAnalyticalFlowError('fixture/final state mismatch');
  return canonical;
}

export function replayAnalyticalFlow(trace: Readonly<AnalyticalFlowTrace>): AnalyticalFlowState {
  fixtureDerivedTrace(trace);
  const replayed = trace.events.reduce(reduceAnalyticalFlowEvent, structuredClone(trace.initialState));
  if (!semanticallyEqual(replayed, trace.finalState)) throw new InvalidAnalyticalFlowError('replay final state mismatch');
  return replayed;
}

export function stateAtAnalyticalEvent(trace: Readonly<AnalyticalFlowTrace>, count: number): AnalyticalFlowState {
  if (!Number.isInteger(count) || count < 0 || count > trace.events.length) throw new InvalidAnalyticalFlowError('event index outside trace');
  fixtureDerivedTrace(trace);
  return trace.events.slice(0, count).reduce(reduceAnalyticalFlowEvent, structuredClone(trace.initialState));
}
