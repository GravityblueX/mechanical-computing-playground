import {
  assertKeyDrivenState,
  transitionKeyStroke,
  type KeyDrivenAccumulatorState,
  type KeyDrivenEvent,
} from '../key-driven-accumulator';

export const KEY_STROKE_INTEGRITY_ID = 'key-stroke-integrity';
export type IntegrityPhase = 'IDLE' | 'STROKE_IN_PROGRESS' | 'ERROR_LOCKED' | 'CORRECTED_LOCKED';

export interface KeyStrokeIntegrityState {
  mechanismId: typeof KEY_STROKE_INTEGRITY_ID;
  accumulator: KeyDrivenAccumulatorState;
  activeColumn: number | null;
  activeDigit: number | null;
  phase: IntegrityPhase;
  inputPermitted: boolean;
  integrityCycleCount: number;
  humanOperationCount: number;
}

export type IntegrityAction =
  | { type: 'BEGIN_KEY_STROKE'; cycleId: string; column: number; digit: number }
  | { type: 'COMPLETE_KEY_STROKE'; cycleId: string }
  | { type: 'RELEASE_INCOMPLETE'; cycleId: string }
  | { type: 'COMPLETE_ERRANT_STROKE'; cycleId: string }
  | { type: 'RELEASE_ERROR_LOCK'; cycleId: string };

interface BaseEvent { mechanismId: typeof KEY_STROKE_INTEGRITY_ID; cycleId: string; sequence: number }
export type IntegrityEvent =
  | (BaseEvent & { type: 'KEY_STROKE_BEGUN'; column: number; digit: number; humanBefore: number; humanAfter: number })
  | (BaseEvent & { type: 'INCOMPLETE_STROKE_RELEASED'; column: number; digit: number; accumulatorValueUnchanged: number; humanBefore: number; humanAfter: number })
  | (BaseEvent & { type: 'INCOMPLETE_STROKE_DETECTED'; column: number; digit: number })
  | (BaseEvent & { type: 'INPUT_LOCKED'; errantColumn: number })
  | (BaseEvent & { type: 'ARITHMETIC_COMMITTED'; column: number; digit: number; accumulatorEvents: KeyDrivenEvent[]; humanBefore: number; humanAfter: number })
  | (BaseEvent & { type: 'ERROR_LOCK_RELEASED'; integrityCycleBefore: number; integrityCycleAfter: number; humanBefore: number; humanAfter: number });

export interface KeyStrokeIntegrityTrace {
  initialState: KeyStrokeIntegrityState;
  actions: IntegrityAction[];
  events: IntegrityEvent[];
  finalState: KeyStrokeIntegrityState;
}

export class InvalidKeyStrokeIntegrityError extends Error {
  constructor(message: string) { super(message); this.name = 'InvalidKeyStrokeIntegrityError'; }
}

const value = (state: Readonly<KeyDrivenAccumulatorState>) => state.digits.reduce((sum, digit, column) => sum + digit * 10 ** column, 0);
const count = (n: number) => Number.isSafeInteger(n) && n >= 0;

export function assertKeyStrokeIntegrityState(state: Readonly<KeyStrokeIntegrityState>): void {
  if (state.mechanismId !== KEY_STROKE_INTEGRITY_ID) throw new InvalidKeyStrokeIntegrityError('integrity mechanism id mismatch');
  assertKeyDrivenState(state.accumulator);
  if (!count(state.integrityCycleCount) || !count(state.humanOperationCount)) throw new InvalidKeyStrokeIntegrityError('integrity counts must be non-negative safe integers');
  if (!['IDLE', 'STROKE_IN_PROGRESS', 'ERROR_LOCKED', 'CORRECTED_LOCKED'].includes(state.phase)) throw new InvalidKeyStrokeIntegrityError('invalid integrity phase');
  const idle = state.phase === 'IDLE';
  if (idle !== (state.activeColumn === null && state.activeDigit === null)) throw new InvalidKeyStrokeIntegrityError('active key identity does not match phase');
  if (!idle && (!Number.isInteger(state.activeColumn) || state.activeColumn! < 0 || state.activeColumn! >= state.accumulator.digits.length || !Number.isInteger(state.activeDigit) || state.activeDigit! < 1 || state.activeDigit! > 9)) throw new InvalidKeyStrokeIntegrityError('active key identity is invalid');
  if (state.inputPermitted !== idle) throw new InvalidKeyStrokeIntegrityError('input permission does not match integrity phase');
  if (state.accumulator.phase !== 'IDLE') throw new InvalidKeyStrokeIntegrityError('wrapped accumulator must be idle between integrity events');
}

export function createKeyStrokeIntegrity(accumulator: Readonly<KeyDrivenAccumulatorState>): KeyStrokeIntegrityState {
  assertKeyDrivenState(accumulator);
  if (accumulator.phase !== 'IDLE') throw new InvalidKeyStrokeIntegrityError('integrity controller requires an idle accumulator');
  return { mechanismId: KEY_STROKE_INTEGRITY_ID, accumulator: structuredClone(accumulator), activeColumn: null, activeDigit: null, phase: 'IDLE', inputPermitted: true, integrityCycleCount: 0, humanOperationCount: 0 };
}

export function transitionKeyStrokeIntegrity(state: Readonly<KeyStrokeIntegrityState>, action: Readonly<IntegrityAction>): { state: KeyStrokeIntegrityState; events: IntegrityEvent[] } {
  assertKeyStrokeIntegrityState(state);
  if (typeof action.cycleId !== 'string' || action.cycleId.length === 0) throw new InvalidKeyStrokeIntegrityError('integrity action requires a cycle id');
  const events: IntegrityEvent[] = [];
  const base = (): BaseEvent => ({ mechanismId: KEY_STROKE_INTEGRITY_ID, cycleId: action.cycleId, sequence: events.length });
  if (action.type === 'BEGIN_KEY_STROKE') {
    if (state.phase !== 'IDLE' || !Number.isInteger(action.column) || action.column < 0 || action.column >= state.accumulator.digits.length || !Number.isInteger(action.digit) || action.digit < 1 || action.digit > 9) throw new InvalidKeyStrokeIntegrityError('cannot begin this key stroke');
    events.push({ ...base(), type: 'KEY_STROKE_BEGUN', column: action.column, digit: action.digit, humanBefore: state.humanOperationCount, humanAfter: state.humanOperationCount + 1 });
  } else if (action.type === 'RELEASE_INCOMPLETE') {
    if (state.phase !== 'STROKE_IN_PROGRESS') throw new InvalidKeyStrokeIntegrityError('incomplete release requires a stroke in progress');
    events.push({ ...base(), type: 'INCOMPLETE_STROKE_RELEASED', column: state.activeColumn!, digit: state.activeDigit!, accumulatorValueUnchanged: value(state.accumulator), humanBefore: state.humanOperationCount, humanAfter: state.humanOperationCount + 1 });
    events.push({ ...base(), type: 'INCOMPLETE_STROKE_DETECTED', column: state.activeColumn!, digit: state.activeDigit! });
    events.push({ ...base(), type: 'INPUT_LOCKED', errantColumn: state.activeColumn! });
  } else if (action.type === 'COMPLETE_KEY_STROKE' || action.type === 'COMPLETE_ERRANT_STROKE') {
    const expected = action.type === 'COMPLETE_KEY_STROKE' ? 'STROKE_IN_PROGRESS' : 'ERROR_LOCKED';
    if (state.phase !== expected) throw new InvalidKeyStrokeIntegrityError('stroke completion is out of order');
    const arithmetic = transitionKeyStroke(state.accumulator, { type: 'PRESS_KEY', cycleId: `${action.cycleId}:arithmetic`, column: state.activeColumn!, digit: state.activeDigit! });
    events.push({ ...base(), type: 'ARITHMETIC_COMMITTED', column: state.activeColumn!, digit: state.activeDigit!, accumulatorEvents: arithmetic.events, humanBefore: state.humanOperationCount, humanAfter: state.humanOperationCount + 1 });
  } else if (action.type === 'RELEASE_ERROR_LOCK') {
    if (state.phase !== 'CORRECTED_LOCKED') throw new InvalidKeyStrokeIntegrityError('error lock can be released only after correction');
    events.push({ ...base(), type: 'ERROR_LOCK_RELEASED', integrityCycleBefore: state.integrityCycleCount, integrityCycleAfter: state.integrityCycleCount + 1, humanBefore: state.humanOperationCount, humanAfter: state.humanOperationCount + 1 });
  } else throw new InvalidKeyStrokeIntegrityError('unsupported integrity action type');
  const next = events.reduce(reduceKeyStrokeIntegrityEvent, structuredClone(state));
  return { state: next, events };
}

export function reduceKeyStrokeIntegrityEvent(state: Readonly<KeyStrokeIntegrityState>, event: Readonly<IntegrityEvent>): KeyStrokeIntegrityState {
  assertKeyStrokeIntegrityState(state);
  if (event.mechanismId !== KEY_STROKE_INTEGRITY_ID || typeof event.cycleId !== 'string' || !Number.isSafeInteger(event.sequence) || event.sequence < 0) throw new InvalidKeyStrokeIntegrityError('invalid integrity event identity');
  if (event.type === 'KEY_STROKE_BEGUN') {
    if (state.phase !== 'IDLE' || event.humanBefore !== state.humanOperationCount || event.humanAfter !== event.humanBefore + 1 || !Number.isInteger(event.column) || event.column < 0 || event.column >= state.accumulator.digits.length || !Number.isInteger(event.digit) || event.digit < 1 || event.digit > 9) throw new InvalidKeyStrokeIntegrityError('invalid stroke-begin event');
    return { ...state, activeColumn: event.column, activeDigit: event.digit, phase: 'STROKE_IN_PROGRESS', inputPermitted: false, humanOperationCount: event.humanAfter };
  }
  if (event.type === 'INCOMPLETE_STROKE_RELEASED') {
    if (state.phase !== 'STROKE_IN_PROGRESS' || state.activeColumn !== event.column || state.activeDigit !== event.digit || event.accumulatorValueUnchanged !== value(state.accumulator) || event.humanBefore !== state.humanOperationCount || event.humanAfter !== event.humanBefore + 1) throw new InvalidKeyStrokeIntegrityError('invalid incomplete-release event');
    return { ...state, humanOperationCount: event.humanAfter };
  }
  if (event.type === 'INCOMPLETE_STROKE_DETECTED') {
    if (state.phase !== 'STROKE_IN_PROGRESS' || state.activeColumn !== event.column || state.activeDigit !== event.digit) throw new InvalidKeyStrokeIntegrityError('invalid incomplete-detection event');
    return { ...state, phase: 'ERROR_LOCKED' };
  }
  if (event.type === 'INPUT_LOCKED') {
    if (state.phase !== 'ERROR_LOCKED' || state.activeColumn !== event.errantColumn) throw new InvalidKeyStrokeIntegrityError('invalid input-lock event');
    return structuredClone(state);
  }
  if (event.type === 'ARITHMETIC_COMMITTED') {
    const normal = state.phase === 'STROKE_IN_PROGRESS';
    if ((!normal && state.phase !== 'ERROR_LOCKED') || state.activeColumn !== event.column || state.activeDigit !== event.digit || event.humanBefore !== state.humanOperationCount || event.humanAfter !== event.humanBefore + 1) throw new InvalidKeyStrokeIntegrityError('invalid arithmetic-commit event');
    const expected = transitionKeyStroke(state.accumulator, { type: 'PRESS_KEY', cycleId: event.accumulatorEvents[0]?.cycleId ?? '', column: event.column, digit: event.digit });
    if (JSON.stringify(expected.events) !== JSON.stringify(event.accumulatorEvents)) throw new InvalidKeyStrokeIntegrityError('forged wrapped arithmetic events');
    return normal
      ? { ...state, accumulator: expected.state, activeColumn: null, activeDigit: null, phase: 'IDLE', inputPermitted: true, integrityCycleCount: state.integrityCycleCount + 1, humanOperationCount: event.humanAfter }
      : { ...state, accumulator: expected.state, phase: 'CORRECTED_LOCKED', humanOperationCount: event.humanAfter };
  }
  if (event.type === 'ERROR_LOCK_RELEASED') {
    if (state.phase !== 'CORRECTED_LOCKED' || event.integrityCycleBefore !== state.integrityCycleCount || event.integrityCycleAfter !== event.integrityCycleBefore + 1 || event.humanBefore !== state.humanOperationCount || event.humanAfter !== event.humanBefore + 1) throw new InvalidKeyStrokeIntegrityError('invalid error-lock release event');
    return { ...state, activeColumn: null, activeDigit: null, phase: 'IDLE', inputPermitted: true, integrityCycleCount: event.integrityCycleAfter, humanOperationCount: event.humanAfter };
  }
  throw new InvalidKeyStrokeIntegrityError('unsupported integrity event type');
}

export function traceKeyStrokeIntegrity(initialState: Readonly<KeyStrokeIntegrityState>, actions: readonly IntegrityAction[]): KeyStrokeIntegrityTrace {
  let state = structuredClone(initialState); const events: IntegrityEvent[] = [];
  for (const action of actions) {
    const result = transitionKeyStrokeIntegrity(state, action);
    const shifted = result.events.map(event => ({ ...event, sequence: event.sequence + events.length } as IntegrityEvent));
    state = shifted.reduce(reduceKeyStrokeIntegrityEvent, state); events.push(...shifted);
  }
  return { initialState: structuredClone(initialState), actions: structuredClone(actions) as IntegrityAction[], events, finalState: state };
}

export function replayKeyStrokeIntegrity(trace: Readonly<KeyStrokeIntegrityTrace>): KeyStrokeIntegrityState {
  assertKeyStrokeIntegrityState(trace.initialState); assertKeyStrokeIntegrityState(trace.finalState);
  const expected = traceKeyStrokeIntegrity(trace.initialState, trace.actions);
  if (JSON.stringify(expected.events) !== JSON.stringify(trace.events)) throw new InvalidKeyStrokeIntegrityError('integrity action/event mismatch');
  if (JSON.stringify(expected.finalState) !== JSON.stringify(trace.finalState)) throw new InvalidKeyStrokeIntegrityError('integrity final state mismatch');
  trace.events.forEach((event, sequence) => { if (event.sequence !== sequence) throw new InvalidKeyStrokeIntegrityError('integrity event sequence mismatch'); });
  return structuredClone(trace.finalState);
}
