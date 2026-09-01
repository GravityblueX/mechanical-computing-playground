export const OPERATOR_DIVISION_ID = 'operator-division';

export type DivisionPhase = 'READY' | 'OVERSHOOT_PENDING' | 'CORRECTION_REQUIRED' | 'COMPLETE';

export interface PendingOvershoot {
  offset: number;
  contribution: number;
  residualBefore: number;
  quotientBefore: number;
}

export interface OperatorDivisionState {
  mechanismId: typeof OPERATOR_DIVISION_ID;
  dividend: number;
  divisor: number;
  residual: number;
  carriageOffset: number;
  /** Least-significant decimal place first. */
  quotientDigits: number[];
  operationCount: number;
  humanOperationCount: number;
  phase: DivisionPhase;
  currentContribution: number;
  /** True after correction or exact zero proves the current quotient place is complete. */
  placeExhausted: boolean;
  pendingOvershoot: PendingOvershoot | null;
}

export type DivisionAction =
  | { type: 'SUBTRACT_ONCE'; cycleId: string }
  | { type: 'CORRECT_ADD_BACK'; cycleId: string }
  | { type: 'SHIFT_CARRIAGE_DOWN'; cycleId: string }
  | { type: 'DIVISION_COMPLETE'; cycleId: string };

interface BaseEvent { mechanismId: typeof OPERATOR_DIVISION_ID; cycleId: string; sequence: number; }
export type DivisionEvent =
  | (BaseEvent & { type: 'SUBTRACT_ONCE'; offset: number; contribution: number; residualBefore: number; residualAfter: number; quotientBefore: number; quotientAfter: number; operationBefore: number; operationAfter: number; humanBefore: number; humanAfter: number })
  | (BaseEvent & { type: 'OVERSHOOT_DETECTED'; offset: number; residual: number; contribution: number })
  | (BaseEvent & { type: 'CORRECT_ADD_BACK'; offset: number; contribution: number; residualBefore: number; residualAfter: number; quotientBefore: number; quotientAfter: number; operationBefore: number; operationAfter: number; humanBefore: number; humanAfter: number })
  | (BaseEvent & { type: 'SHIFT_CARRIAGE_DOWN'; offsetBefore: number; offsetAfter: number; contributionBefore: number; contributionAfter: number; humanBefore: number; humanAfter: number })
  | (BaseEvent & { type: 'DIVISION_COMPLETE'; quotient: number; remainder: number; humanOperations: number; operations: number });

export interface OperatorDivisionTrace {
  initialState: OperatorDivisionState;
  actions: DivisionAction[];
  events: DivisionEvent[];
  finalState: OperatorDivisionState;
}

export class InvalidDivisionStateError extends Error {
  constructor(message: string) { super(message); this.name = 'InvalidDivisionStateError'; }
}

function safe(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) throw new InvalidDivisionStateError(`${name} must be a non-negative safe integer`);
}

function contribution(divisor: number, offset: number): number {
  const value = divisor * 10 ** offset;
  if (!Number.isSafeInteger(value)) throw new InvalidDivisionStateError('place-value contribution exceeds safe integer range');
  return value;
}

export function quotientValue(state: Readonly<OperatorDivisionState>): number {
  return state.quotientDigits.reduce((value, digit, offset) => value + digit * 10 ** offset, 0);
}

export function createOperatorDivision(dividend: number, divisor: number, carriageOffset: number): OperatorDivisionState {
  safe(dividend, 'dividend');
  safe(divisor, 'divisor');
  if (divisor === 0) throw new InvalidDivisionStateError('division by zero is not allowed');
  if (!Number.isInteger(carriageOffset) || carriageOffset < 0) throw new InvalidDivisionStateError('carriage offset must be a non-negative integer');
  const currentContribution = contribution(divisor, carriageOffset);
  return {
    mechanismId: OPERATOR_DIVISION_ID,
    dividend,
    divisor,
    residual: dividend,
    carriageOffset,
    quotientDigits: Array.from({ length: carriageOffset + 1 }, () => 0),
    operationCount: 0,
    humanOperationCount: 0,
    phase: 'READY',
    currentContribution,
    placeExhausted: dividend === 0,
    pendingOvershoot: null,
  };
}

function assertState(state: Readonly<OperatorDivisionState>): void {
  if (state.mechanismId !== OPERATOR_DIVISION_ID || state.divisor <= 0 || state.carriageOffset < 0 || !Number.isInteger(state.carriageOffset)) throw new InvalidDivisionStateError('invalid operator-division state');
  if (state.currentContribution !== contribution(state.divisor, state.carriageOffset)) throw new InvalidDivisionStateError('current contribution does not match divisor and offset');
  const correctionInFlight = state.phase === 'OVERSHOOT_PENDING' || state.phase === 'CORRECTION_REQUIRED';
  const invalidDigit = state.quotientDigits.some((digit, offset) => {
    const temporaryOvershootDigit = digit === 10 && correctionInFlight && offset === state.carriageOffset;
    return !Number.isInteger(digit) || digit < 0 || (digit > 9 && !temporaryOvershootDigit);
  });
  if (state.quotientDigits.length <= state.carriageOffset || invalidDigit) throw new InvalidDivisionStateError('invalid quotient register');
}

export function transitionOperatorDivision(state: Readonly<OperatorDivisionState>, action: Readonly<DivisionAction>): { state: OperatorDivisionState; events: DivisionEvent[] } {
  assertState(state);
  if (typeof action.cycleId !== 'string' || action.cycleId.length === 0) throw new InvalidDivisionStateError('division action requires a non-empty cycle id');
  const base = (sequence: number): BaseEvent => ({ mechanismId: OPERATOR_DIVISION_ID, cycleId: action.cycleId, sequence });
  let events: DivisionEvent[];
  if (action.type === 'SUBTRACT_ONCE') {
    if (state.phase !== 'READY' || state.placeExhausted) throw new InvalidDivisionStateError('subtraction requires an unfinished READY place');
    const qBefore = state.quotientDigits[state.carriageOffset];
    const residualAfter = state.residual - state.currentContribution;
    if (qBefore >= 9 && residualAfter >= 0) throw new InvalidDivisionStateError('quotient capacity is too small for this division');
    events = [{ ...base(0), type: 'SUBTRACT_ONCE', offset: state.carriageOffset, contribution: state.currentContribution, residualBefore: state.residual, residualAfter, quotientBefore: qBefore, quotientAfter: qBefore + 1, operationBefore: state.operationCount, operationAfter: state.operationCount + 1, humanBefore: state.humanOperationCount, humanAfter: state.humanOperationCount + 1 }];
    if (residualAfter < 0) events.push({ ...base(1), type: 'OVERSHOOT_DETECTED', offset: state.carriageOffset, residual: residualAfter, contribution: state.currentContribution });
  } else if (action.type === 'CORRECT_ADD_BACK') {
    if (state.phase !== 'CORRECTION_REQUIRED' || !state.pendingOvershoot) throw new InvalidDivisionStateError('correction requires a pending overshoot');
    const pending = state.pendingOvershoot;
    events = [{ ...base(0), type: 'CORRECT_ADD_BACK', offset: pending.offset, contribution: pending.contribution, residualBefore: state.residual, residualAfter: state.residual + pending.contribution, quotientBefore: state.quotientDigits[pending.offset], quotientAfter: pending.quotientBefore, operationBefore: state.operationCount, operationAfter: state.operationCount + 1, humanBefore: state.humanOperationCount, humanAfter: state.humanOperationCount + 1 }];
  } else if (action.type === 'SHIFT_CARRIAGE_DOWN') {
    if (state.phase !== 'READY' || !state.placeExhausted || state.carriageOffset === 0) throw new InvalidDivisionStateError('carriage can shift down only after completing the current place');
    events = [{ ...base(0), type: 'SHIFT_CARRIAGE_DOWN', offsetBefore: state.carriageOffset, offsetAfter: state.carriageOffset - 1, contributionBefore: state.currentContribution, contributionAfter: contribution(state.divisor, state.carriageOffset - 1), humanBefore: state.humanOperationCount, humanAfter: state.humanOperationCount + 1 }];
  } else if (action.type === 'DIVISION_COMPLETE') {
    if (state.phase !== 'READY' || state.carriageOffset !== 0 || (!state.placeExhausted && state.residual !== 0) || state.residual >= state.divisor) throw new InvalidDivisionStateError('division is not ready to complete');
    events = [{ ...base(0), type: 'DIVISION_COMPLETE', quotient: quotientValue(state), remainder: state.residual, humanOperations: state.humanOperationCount, operations: state.operationCount }];
  } else {
    throw new InvalidDivisionStateError('unsupported operator-division action type');
  }
  return { state: events.reduce(reduceDivisionEvent, structuredClone(state)), events };
}

export function reduceDivisionEvent(state: Readonly<OperatorDivisionState>, event: Readonly<DivisionEvent>): OperatorDivisionState {
  assertState(state);
  if (event.mechanismId !== state.mechanismId) throw new Error('event mechanism mismatch');
  if (event.type === 'SUBTRACT_ONCE') {
    const expected = contribution(state.divisor, state.carriageOffset);
    const q = state.quotientDigits[state.carriageOffset];
    if (state.phase !== 'READY' || state.placeExhausted || (q >= 9 && event.residualAfter >= 0) || event.offset !== state.carriageOffset || event.contribution !== expected || event.residualBefore !== state.residual || event.residualAfter !== state.residual - expected || event.quotientBefore !== q || event.quotientAfter !== q + 1 || event.operationBefore !== state.operationCount || event.operationAfter !== state.operationCount + 1 || event.humanBefore !== state.humanOperationCount || event.humanAfter !== state.humanOperationCount + 1) throw new Error('invalid subtraction event');
    const quotientDigits = [...state.quotientDigits]; quotientDigits[event.offset] = event.quotientAfter;
    const overshot = event.residualAfter < 0;
    return { ...state, residual: event.residualAfter, quotientDigits, operationCount: event.operationAfter, humanOperationCount: event.humanAfter, phase: overshot ? 'OVERSHOOT_PENDING' : 'READY', placeExhausted: !overshot && event.residualAfter === 0, pendingOvershoot: overshot ? { offset: event.offset, contribution: event.contribution, residualBefore: event.residualBefore, quotientBefore: event.quotientBefore } : null };
  }
  if (event.type === 'OVERSHOOT_DETECTED') {
    if (state.phase !== 'OVERSHOOT_PENDING' || !state.pendingOvershoot || event.offset !== state.pendingOvershoot.offset || event.contribution !== state.pendingOvershoot.contribution || event.residual !== state.residual || event.residual >= 0) throw new Error('invalid overshoot event');
    return { ...structuredClone(state), phase: 'CORRECTION_REQUIRED' };
  }
  if (event.type === 'CORRECT_ADD_BACK') {
    const pending = state.pendingOvershoot;
    if (state.phase !== 'CORRECTION_REQUIRED' || !pending || event.offset !== pending.offset || event.contribution !== pending.contribution || event.residualBefore !== state.residual || event.residualAfter !== pending.residualBefore || event.quotientBefore !== state.quotientDigits[event.offset] || event.quotientAfter !== pending.quotientBefore || event.operationBefore !== state.operationCount || event.operationAfter !== state.operationCount + 1 || event.humanBefore !== state.humanOperationCount || event.humanAfter !== state.humanOperationCount + 1) throw new Error('invalid correction event');
    const quotientDigits = [...state.quotientDigits]; quotientDigits[event.offset] = event.quotientAfter;
    return { ...state, residual: event.residualAfter, quotientDigits, operationCount: event.operationAfter, humanOperationCount: event.humanAfter, phase: 'READY', placeExhausted: true, pendingOvershoot: null };
  }
  if (event.type === 'SHIFT_CARRIAGE_DOWN') {
    if (state.phase !== 'READY' || !state.placeExhausted || event.offsetBefore !== state.carriageOffset || event.offsetAfter !== state.carriageOffset - 1 || event.contributionBefore !== state.currentContribution || event.contributionAfter !== contribution(state.divisor, event.offsetAfter) || event.humanBefore !== state.humanOperationCount || event.humanAfter !== state.humanOperationCount + 1) throw new Error('invalid carriage-shift event');
    return { ...state, carriageOffset: event.offsetAfter, currentContribution: event.contributionAfter, humanOperationCount: event.humanAfter, placeExhausted: state.residual === 0 };
  }
  if (event.type === 'DIVISION_COMPLETE') {
    if (state.phase !== 'READY' || state.carriageOffset !== 0 || (!state.placeExhausted && state.residual !== 0) || state.residual >= state.divisor || event.quotient !== quotientValue(state) || event.remainder !== state.residual || event.humanOperations !== state.humanOperationCount || event.operations !== state.operationCount) throw new Error('invalid completion event');
    return { ...state, phase: 'COMPLETE' };
  }
  throw new Error('unsupported operator-division event type');
}

export function replayOperatorDivision(trace: Readonly<OperatorDivisionTrace>): OperatorDivisionState {
  if (!Array.isArray(trace.actions) || !Array.isArray(trace.events)) throw new Error('division trace requires action and event arrays');

  const canonicalInitial = createOperatorDivision(
    trace.initialState.dividend,
    trace.initialState.divisor,
    trace.initialState.carriageOffset,
  );
  if (JSON.stringify(canonicalInitial) !== JSON.stringify(trace.initialState)) throw new Error('division initial state mismatch');
  assertState(trace.finalState);
  if (trace.finalState.phase !== 'COMPLETE') throw new Error('division final state is not complete');

  let expectedSequence = 0;
  const replayed = trace.events.reduce<OperatorDivisionState>((state, event) => {
    if (event.sequence !== expectedSequence) throw new Error('division event sequence is not contiguous');
    expectedSequence += 1;
    return reduceDivisionEvent(state, event);
  }, structuredClone(trace.initialState));
  if (JSON.stringify(replayed) !== JSON.stringify(trace.finalState)) throw new Error('division replay final state mismatch');

  let actionDerived = structuredClone(trace.initialState);
  const expectedEvents: DivisionEvent[] = [];
  const cycleIds = new Set<string>();
  for (const action of trace.actions) {
    if (typeof action.cycleId !== 'string' || action.cycleId.length === 0 || cycleIds.has(action.cycleId)) throw new Error('division action cycle ids must be non-empty and unique');
    cycleIds.add(action.cycleId);
    const result = transitionOperatorDivision(actionDerived, action);
    const shifted = result.events.map((event) => ({ ...event, sequence: event.sequence + expectedEvents.length } as DivisionEvent));
    actionDerived = shifted.reduce(reduceDivisionEvent, actionDerived);
    expectedEvents.push(...shifted);
  }
  if (JSON.stringify(expectedEvents) !== JSON.stringify(trace.events)) throw new Error('division action/event mismatch');
  if (JSON.stringify(actionDerived) !== JSON.stringify(trace.finalState)) throw new Error('division action-derived final state mismatch');
  return replayed;
}

export function traceOperatorDivision(dividend: number, divisor: number, initialOffset: number): OperatorDivisionTrace {
  const initialState = createOperatorDivision(dividend, divisor, initialOffset);
  let state = initialState;
  const actions: DivisionAction[] = [];
  const events: DivisionEvent[] = [];
  const apply = (action: DivisionAction) => {
    const result = transitionOperatorDivision(state, action);
    const shifted = result.events.map((event) => ({ ...event, sequence: event.sequence + events.length } as DivisionEvent));
    state = shifted.reduce(reduceDivisionEvent, state);
    actions.push(action); events.push(...shifted);
  };
  while (state.phase !== 'COMPLETE') {
    const cycleId = `division-${actions.length}`;
    if (state.phase === 'CORRECTION_REQUIRED') apply({ type: 'CORRECT_ADD_BACK', cycleId });
    else if (state.placeExhausted && state.carriageOffset > 0) apply({ type: 'SHIFT_CARRIAGE_DOWN', cycleId });
    else if (state.carriageOffset === 0 && state.placeExhausted) apply({ type: 'DIVISION_COMPLETE', cycleId });
    else apply({ type: 'SUBTRACT_ONCE', cycleId });
  }
  return { initialState, actions, events, finalState: state };
}
