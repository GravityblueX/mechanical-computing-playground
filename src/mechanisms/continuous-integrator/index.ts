export const CONTINUOUS_INTEGRATOR_ID = 'continuous-integrator';

export interface IntegratorState {
  mechanismId: typeof CONTINUOUS_INTEGRATOR_ID;
  independentQuantity: number;
  inputQuantity: number;
  integratedQuantity: number;
  inspectionInterval: number;
  sampleCount: number;
  nextSequence: number;
}

export interface ObserveAndIntegrateAction {
  type: 'OBSERVE_AND_INTEGRATE';
  cycleId: string;
  inputQuantity?: number;
}

interface BaseEvent {
  mechanismId: typeof CONTINUOUS_INTEGRATOR_ID;
  cycleId: string;
  sequence: number;
  claimType: 'P/M';
}

export type IntegratorEvent =
  | (BaseEvent & { type: 'INPUT_QUANTITY_OBSERVED'; inputBefore: number; inputObserved: number; sampleBefore: number })
  | (BaseEvent & { type: 'INDEPENDENT_QUANTITY_ADVANCED'; independentBefore: number; interval: number; independentAfter: number })
  | (BaseEvent & { type: 'INTEGRATED_QUANTITY_ADVANCED'; inputObserved: number; interval: number; contribution: number; integratedBefore: number; integratedAfter: number; sampleBefore: number; sampleAfter: number });

export interface IntegratorTrace {
  initialState: IntegratorState;
  actions: ObserveAndIntegrateAction[];
  events: IntegratorEvent[];
  finalState: IntegratorState;
}

export class InvalidIntegratorStateError extends Error {
  constructor(message: string) { super(message); this.name = 'InvalidIntegratorStateError'; }
}

function finite(value: number, name: string): void {
  if (!Number.isFinite(value)) throw new InvalidIntegratorStateError(`${name} must be finite`);
}
function count(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) throw new InvalidIntegratorStateError(`${name} must be a non-negative safe integer`);
}
function close(left: number, right: number): boolean {
  return Math.abs(left - right) <= Number.EPSILON * Math.max(1, Math.abs(left), Math.abs(right)) * 8;
}
function add(left: number, right: number, name: string): number {
  const result = left + right; finite(result, name); return result;
}
function multiply(left: number, right: number, name: string): number {
  const result = left * right; finite(result, name); return result;
}
function increment(value: number, name: string): number {
  count(value, name); if (value === Number.MAX_SAFE_INTEGER) throw new InvalidIntegratorStateError(`${name} exceeds safe integer range`); return value + 1;
}

export function assertIntegratorState(state: Readonly<IntegratorState>): void {
  if (state.mechanismId !== CONTINUOUS_INTEGRATOR_ID) throw new InvalidIntegratorStateError('mechanism id mismatch');
  finite(state.independentQuantity, 'independent quantity');
  finite(state.inputQuantity, 'input quantity');
  finite(state.integratedQuantity, 'integrated quantity');
  finite(state.inspectionInterval, 'inspection interval');
  if (state.inspectionInterval <= 0) throw new InvalidIntegratorStateError('inspection interval must be positive');
  count(state.sampleCount, 'sample count');
  count(state.nextSequence, 'next sequence');
}

export function createIntegrator(inputQuantity = 1, inspectionInterval = 0.1, integratedQuantity = 0): IntegratorState {
  const state: IntegratorState = {
    mechanismId: CONTINUOUS_INTEGRATOR_ID,
    independentQuantity: 0,
    inputQuantity,
    integratedQuantity,
    inspectionInterval,
    sampleCount: 0,
    nextSequence: 0,
  };
  assertIntegratorState(state);
  return state;
}

export function transitionIntegrator(
  state: Readonly<IntegratorState>,
  action: Readonly<ObserveAndIntegrateAction>,
): { state: IntegratorState; events: IntegratorEvent[] } {
  assertIntegratorState(state);
  if (action.type !== 'OBSERVE_AND_INTEGRATE') throw new InvalidIntegratorStateError(`unknown integrator action: ${String((action as { type?: unknown }).type)}`);
  if (typeof action.cycleId !== 'string' || action.cycleId.length === 0) throw new InvalidIntegratorStateError('cycle id is required');
  const observed = action.inputQuantity ?? state.inputQuantity;
  finite(observed, 'observed input quantity');
  const independentAfter = add(state.independentQuantity, state.inspectionInterval, 'independent quantity');
  const contribution = multiply(observed, state.inspectionInterval, 'integrated contribution');
  const integratedAfter = add(state.integratedQuantity, contribution, 'integrated quantity');
  const sampleAfter = increment(state.sampleCount, 'sample count');
  const sequence = state.nextSequence;
  const base = (offset: number): BaseEvent => ({ mechanismId: CONTINUOUS_INTEGRATOR_ID, cycleId: action.cycleId, sequence: sequence + offset, claimType: 'P/M' });
  const events: IntegratorEvent[] = [
    { ...base(0), type: 'INPUT_QUANTITY_OBSERVED', inputBefore: state.inputQuantity, inputObserved: observed, sampleBefore: state.sampleCount },
    { ...base(1), type: 'INDEPENDENT_QUANTITY_ADVANCED', independentBefore: state.independentQuantity, interval: state.inspectionInterval, independentAfter },
    { ...base(2), type: 'INTEGRATED_QUANTITY_ADVANCED', inputObserved: observed, interval: state.inspectionInterval, contribution, integratedBefore: state.integratedQuantity, integratedAfter, sampleBefore: state.sampleCount, sampleAfter },
  ];
  return { state: events.reduce(reduceIntegratorEvent, structuredClone(state)), events };
}

export function reduceIntegratorEvent(state: Readonly<IntegratorState>, event: Readonly<IntegratorEvent>): IntegratorState {
  assertIntegratorState(state);
  if (event.mechanismId !== state.mechanismId || event.sequence !== state.nextSequence || event.claimType !== 'P/M') throw new InvalidIntegratorStateError('invalid integrator event identity or sequence');
  if (event.type === 'INPUT_QUANTITY_OBSERVED') {
    finite(event.inputObserved, 'observed input quantity');
    if (event.inputBefore !== state.inputQuantity || event.sampleBefore !== state.sampleCount) throw new InvalidIntegratorStateError('invalid input observation');
    return { ...state, inputQuantity: event.inputObserved, nextSequence: increment(state.nextSequence, 'next sequence') };
  }
  if (event.type === 'INDEPENDENT_QUANTITY_ADVANCED') {
    const expected = add(state.independentQuantity, state.inspectionInterval, 'independent quantity');
    if (!close(event.independentBefore, state.independentQuantity) || !close(event.interval, state.inspectionInterval) || !close(event.independentAfter, expected)) throw new InvalidIntegratorStateError('invalid independent-quantity advance');
    return { ...state, independentQuantity: expected, nextSequence: increment(state.nextSequence, 'next sequence') };
  }
  if (event.type === 'INTEGRATED_QUANTITY_ADVANCED') {
    const contribution = multiply(state.inputQuantity, state.inspectionInterval, 'integrated contribution');
    const after = add(state.integratedQuantity, contribution, 'integrated quantity');
    if (!close(event.inputObserved, state.inputQuantity) || !close(event.interval, state.inspectionInterval) || !close(event.contribution, contribution) || !close(event.integratedBefore, state.integratedQuantity) || !close(event.integratedAfter, after) || event.sampleBefore !== state.sampleCount || event.sampleAfter !== increment(state.sampleCount, 'sample count')) throw new InvalidIntegratorStateError('invalid integrated-quantity advance');
    return { ...state, integratedQuantity: after, sampleCount: event.sampleAfter, nextSequence: increment(state.nextSequence, 'next sequence') };
  }
  throw new InvalidIntegratorStateError(`unknown integrator event: ${String((event as { type?: unknown }).type)}`);
}

export function integrate(state: Readonly<IntegratorState>, inputQuantity = state.inputQuantity): IntegratorState {
  return transitionIntegrator(state, { type: 'OBSERVE_AND_INTEGRATE', cycleId: `sample-${state.sampleCount}`, inputQuantity }).state;
}

export function traceIntegratorActions(initialState: Readonly<IntegratorState>, actions: readonly ObserveAndIntegrateAction[]): IntegratorTrace {
  const start = structuredClone(initialState);
  let state = start;
  const events: IntegratorEvent[] = [];
  for (const action of actions) {
    const result = transitionIntegrator(state, action);
    state = result.state;
    events.push(...result.events);
  }
  return { initialState: start, actions: structuredClone([...actions]), events, finalState: state };
}

export function replayIntegrator(trace: Readonly<IntegratorTrace>): IntegratorState {
  if (!Array.isArray(trace.actions) || !Array.isArray(trace.events)) throw new InvalidIntegratorStateError('integrator trace requires action and event arrays');
  assertIntegratorState(trace.initialState);
  assertIntegratorState(trace.finalState);
  const replayed = trace.events.reduce(reduceIntegratorEvent, structuredClone(trace.initialState));
  if (JSON.stringify(replayed) !== JSON.stringify(trace.finalState)) throw new InvalidIntegratorStateError('integrator replay final state mismatch');
  let actionDerived = structuredClone(trace.initialState);
  const expectedEvents: IntegratorEvent[] = [];
  for (const action of trace.actions) {
    const expected = transitionIntegrator(actionDerived, action);
    actionDerived = expected.state;
    expectedEvents.push(...expected.events);
  }
  if (JSON.stringify(expectedEvents) !== JSON.stringify(trace.events)) throw new InvalidIntegratorStateError('integrator action/event mismatch');
  if (JSON.stringify(actionDerived) !== JSON.stringify(trace.finalState)) throw new InvalidIntegratorStateError('integrator action-derived final state mismatch');
  return replayed;
}
