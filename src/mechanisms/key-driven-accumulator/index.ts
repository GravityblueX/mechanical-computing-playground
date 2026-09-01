export const KEY_DRIVEN_MECHANISM_ID = 'key-driven-accumulator';

export interface KeyDrivenAccumulatorState {
  mechanismId: typeof KEY_DRIVEN_MECHANISM_ID;
  /** Least-significant decimal digit first. */
  digits: number[];
  activeColumn: number | null;
  pressedDigit: number | null;
  phase: 'IDLE' | 'KEY_DOWN' | 'ACCUMULATING' | 'KEY_RETURN';
  keyStrokeCount: number;
  humanOperationCount: number;
}

export interface KeyStrokeAction { type: 'PRESS_KEY'; cycleId: string; column: number; digit: number; }
interface EventBase { mechanismId: typeof KEY_DRIVEN_MECHANISM_ID; cycleId: string; sequence: number; }
export type KeyDrivenEvent =
  | (EventBase & { type: 'KEY_STROKE_BEGIN'; column: number; digit: number; keyStrokeBefore: number; humanOperationBefore: number })
  | (EventBase & { type: 'PLACE_VALUE_CONTRIBUTION'; column: number; digit: number; contribution: number; accumulatorBefore: number; accumulatorAfter: number })
  | (EventBase & { type: 'DIGIT_ADVANCE'; column: number; amount: number; from: number; to: number })
  | (EventBase & { type: 'CARRY_PENDING'; fromColumn: number; toColumn: number })
  | (EventBase & { type: 'CARRY_PROPAGATED'; fromColumn: number; toColumn: number })
  | (EventBase & { type: 'KEY_STROKE_END'; column: number; digit: number; keyStrokeAfter: number; humanOperationAfter: number });
export interface KeyStrokeTrace { initialState: KeyDrivenAccumulatorState; action: KeyStrokeAction; events: KeyDrivenEvent[]; finalState: KeyDrivenAccumulatorState; }

export class InvalidKeyDrivenStateError extends Error { constructor(message: string) { super(message); this.name = 'InvalidKeyDrivenStateError'; } }

function assertDigits(digits: readonly number[]): void {
  if (!Array.isArray(digits) || digits.length === 0) throw new InvalidKeyDrivenStateError('register must have at least one digit');
  if (digits.some(digit => !Number.isInteger(digit) || digit < 0 || digit > 9)) throw new InvalidKeyDrivenStateError('register digits must be integers in 0..9');
}
function nonNegativeCount(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) throw new InvalidKeyDrivenStateError(`${name} must be a non-negative safe integer`);
}
export function assertKeyDrivenState(state: Readonly<KeyDrivenAccumulatorState>): void {
  if (state.mechanismId !== KEY_DRIVEN_MECHANISM_ID) throw new InvalidKeyDrivenStateError('key-driven mechanism id mismatch');
  assertDigits(state.digits);
  nonNegativeCount(state.keyStrokeCount, 'key-stroke count'); nonNegativeCount(state.humanOperationCount, 'human-operation count');
  if (state.keyStrokeCount !== state.humanOperationCount) throw new InvalidKeyDrivenStateError('key-stroke/human-operation counts must agree');
  if (!['IDLE', 'KEY_DOWN', 'ACCUMULATING', 'KEY_RETURN'].includes(state.phase)) throw new InvalidKeyDrivenStateError('invalid key-driven phase');
  const idle = state.phase === 'IDLE';
  if (idle && (state.activeColumn !== null || state.pressedDigit !== null)) throw new InvalidKeyDrivenStateError('idle state cannot retain an active key');
  if (!idle && (!Number.isInteger(state.activeColumn) || state.activeColumn! < 0 || state.activeColumn! >= state.digits.length || !Number.isInteger(state.pressedDigit) || state.pressedDigit! < 1 || state.pressedDigit! > 9)) throw new InvalidKeyDrivenStateError('active phase requires a valid key identity');
}
export function accumulatorValue(state: Readonly<KeyDrivenAccumulatorState>): number {
  assertDigits(state.digits);
  const value = state.digits.reduce((sum, digit, column) => sum + digit * 10 ** column, 0);
  if (!Number.isSafeInteger(value)) throw new InvalidKeyDrivenStateError('accumulator exceeds safe integer range');
  return value;
}
export function createKeyDrivenAccumulator(width: number, initialValue = 0): KeyDrivenAccumulatorState {
  if (!Number.isInteger(width) || width <= 0 || width > 15) throw new InvalidKeyDrivenStateError('register width must be a positive safe decimal width');
  if (!Number.isSafeInteger(initialValue) || initialValue < 0 || initialValue >= 10 ** width) throw new InvalidKeyDrivenStateError('initial value must fit the register width');
  const state: KeyDrivenAccumulatorState = { mechanismId: KEY_DRIVEN_MECHANISM_ID, digits: Array.from({ length: width }, (_, column) => Math.floor(initialValue / 10 ** column) % 10), activeColumn: null, pressedDigit: null, phase: 'IDLE', keyStrokeCount: 0, humanOperationCount: 0 };
  assertKeyDrivenState(state); return state;
}
export function transitionKeyStroke(state: Readonly<KeyDrivenAccumulatorState>, action: Readonly<KeyStrokeAction>): { state: KeyDrivenAccumulatorState; events: KeyDrivenEvent[] } {
  assertKeyDrivenState(state);
  if (state.phase !== 'IDLE') throw new InvalidKeyDrivenStateError('key-driven accumulator is not idle');
  if (action.type !== 'PRESS_KEY' || typeof action.cycleId !== 'string' || action.cycleId.length === 0 || !Number.isInteger(action.digit) || action.digit < 1 || action.digit > 9) throw new InvalidKeyDrivenStateError('keypress identity/digit is invalid');
  if (!Number.isInteger(action.column) || action.column < 0 || action.column >= state.digits.length) throw new InvalidKeyDrivenStateError('key column is outside the register');
  const before = accumulatorValue(state); const contribution = action.digit * 10 ** action.column;
  if (!Number.isSafeInteger(contribution) || before + contribution >= 10 ** state.digits.length) throw new InvalidKeyDrivenStateError('keypress would overflow register width');
  const events: KeyDrivenEvent[] = []; const base = (): EventBase => ({ mechanismId: KEY_DRIVEN_MECHANISM_ID, cycleId: action.cycleId, sequence: events.length });
  events.push({ ...base(), type: 'KEY_STROKE_BEGIN', column: action.column, digit: action.digit, keyStrokeBefore: state.keyStrokeCount, humanOperationBefore: state.humanOperationCount });
  events.push({ ...base(), type: 'PLACE_VALUE_CONTRIBUTION', column: action.column, digit: action.digit, contribution, accumulatorBefore: before, accumulatorAfter: before + contribution });
  const digits = [...state.digits]; let column = action.column; let amount = action.digit;
  while (amount > 0) {
    const from = digits[column]; const sum = from + amount; const to = sum % 10; const carry = Math.floor(sum / 10);
    events.push({ ...base(), type: 'DIGIT_ADVANCE', column, amount, from, to }); digits[column] = to;
    if (carry === 0) break;
    events.push({ ...base(), type: 'CARRY_PENDING', fromColumn: column, toColumn: column + 1 });
    events.push({ ...base(), type: 'CARRY_PROPAGATED', fromColumn: column, toColumn: column + 1 });
    column += 1; amount = carry;
  }
  events.push({ ...base(), type: 'KEY_STROKE_END', column: action.column, digit: action.digit, keyStrokeAfter: state.keyStrokeCount + 1, humanOperationAfter: state.humanOperationCount + 1 });
  const next = events.reduce(reduceKeyDrivenEvent, structuredClone(state)); assertKeyDrivenState(next); return { state: next, events };
}
export function reduceKeyDrivenEvent(state: Readonly<KeyDrivenAccumulatorState>, event: Readonly<KeyDrivenEvent>): KeyDrivenAccumulatorState {
  assertKeyDrivenState(state);
  if (event.mechanismId !== state.mechanismId || typeof event.cycleId !== 'string' || !Number.isSafeInteger(event.sequence) || event.sequence < 0) throw new InvalidKeyDrivenStateError('invalid key-driven event identity');
  if (event.type === 'KEY_STROKE_BEGIN') {
    if (state.phase !== 'IDLE' || state.keyStrokeCount !== event.keyStrokeBefore || state.humanOperationCount !== event.humanOperationBefore || !Number.isInteger(event.column) || event.column < 0 || event.column >= state.digits.length || !Number.isInteger(event.digit) || event.digit < 1 || event.digit > 9) throw new InvalidKeyDrivenStateError('key-stroke begin precondition failed');
    return { ...state, activeColumn: event.column, pressedDigit: event.digit, phase: 'KEY_DOWN' };
  }
  if (event.type === 'PLACE_VALUE_CONTRIBUTION') {
    const expected = event.digit * 10 ** event.column;
    if (state.phase !== 'KEY_DOWN' || state.activeColumn !== event.column || state.pressedDigit !== event.digit || accumulatorValue(state) !== event.accumulatorBefore || event.contribution !== expected || event.accumulatorAfter !== event.accumulatorBefore + expected) throw new InvalidKeyDrivenStateError('contribution precondition failed');
    return { ...state, phase: 'ACCUMULATING' };
  }
  if (event.type === 'DIGIT_ADVANCE') {
    if (state.phase !== 'ACCUMULATING' || !Number.isInteger(event.column) || event.column < 0 || event.column >= state.digits.length || state.digits[event.column] !== event.from || !Number.isInteger(event.amount) || event.amount < 1 || event.to !== (event.from + event.amount) % 10) throw new InvalidKeyDrivenStateError('digit-advance precondition failed');
    const digits = [...state.digits]; digits[event.column] = event.to; return { ...state, digits };
  }
  if (event.type === 'CARRY_PENDING' || event.type === 'CARRY_PROPAGATED') {
    if (state.phase !== 'ACCUMULATING' || !Number.isInteger(event.fromColumn) || event.toColumn !== event.fromColumn + 1 || event.fromColumn < 0 || event.toColumn >= state.digits.length) throw new InvalidKeyDrivenStateError('carry relationship is invalid');
    return { ...state };
  }
  if (event.type === 'KEY_STROKE_END') {
    if (state.phase !== 'ACCUMULATING' || state.activeColumn !== event.column || state.pressedDigit !== event.digit || event.keyStrokeAfter !== state.keyStrokeCount + 1 || event.humanOperationAfter !== state.humanOperationCount + 1) throw new InvalidKeyDrivenStateError('key-stroke end precondition failed');
    return { ...state, activeColumn: null, pressedDigit: null, phase: 'IDLE', keyStrokeCount: event.keyStrokeAfter, humanOperationCount: event.humanOperationAfter };
  }
  throw new InvalidKeyDrivenStateError(`unknown key-driven event: ${String((event as { type?: unknown }).type)}`);
}
export function replayKeyStroke(trace: Readonly<KeyStrokeTrace>): KeyDrivenAccumulatorState {
  assertKeyDrivenState(trace.initialState); assertKeyDrivenState(trace.finalState);
  const expected = transitionKeyStroke(trace.initialState, trace.action);
  if (JSON.stringify(expected.events) !== JSON.stringify(trace.events)) throw new InvalidKeyDrivenStateError('key-driven action/event mismatch');
  const replayed = trace.events.reduce(reduceKeyDrivenEvent, structuredClone(trace.initialState));
  if (JSON.stringify(replayed) !== JSON.stringify(trace.finalState)) throw new InvalidKeyDrivenStateError('key-driven final state mismatch');
  return replayed;
}
export function createKeyStrokeTrace(state: Readonly<KeyDrivenAccumulatorState>, column: number, digit: number, cycleId = `key-${state.keyStrokeCount}`): KeyStrokeTrace {
  const initialState = structuredClone(state); const action: KeyStrokeAction = { type: 'PRESS_KEY', cycleId, column, digit }; const result = transitionKeyStroke(initialState, action);
  return { initialState, action, events: result.events, finalState: result.state };
}
