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

export interface KeyStrokeAction {
  type: 'PRESS_KEY';
  cycleId: string;
  column: number;
  digit: number;
}

interface EventBase { mechanismId: typeof KEY_DRIVEN_MECHANISM_ID; cycleId: string; sequence: number; }
export type KeyDrivenEvent =
  | (EventBase & { type: 'KEY_STROKE_BEGIN'; column: number; digit: number; keyStrokeBefore: number; humanOperationBefore: number })
  | (EventBase & { type: 'PLACE_VALUE_CONTRIBUTION'; column: number; digit: number; contribution: number; accumulatorBefore: number; accumulatorAfter: number })
  | (EventBase & { type: 'DIGIT_ADVANCE'; column: number; amount: number; from: number; to: number })
  | (EventBase & { type: 'CARRY_PENDING'; fromColumn: number; toColumn: number })
  | (EventBase & { type: 'CARRY_PROPAGATED'; fromColumn: number; toColumn: number })
  | (EventBase & { type: 'KEY_STROKE_END'; column: number; digit: number; keyStrokeAfter: number; humanOperationAfter: number });

export interface KeyStrokeTrace {
  initialState: KeyDrivenAccumulatorState;
  action: KeyStrokeAction;
  events: KeyDrivenEvent[];
  finalState: KeyDrivenAccumulatorState;
}

export class InvalidKeyDrivenStateError extends Error {
  constructor(message: string) { super(message); this.name = 'InvalidKeyDrivenStateError'; }
}

function assertDigits(digits: readonly number[]): void {
  if (!Array.isArray(digits) || digits.length === 0) throw new InvalidKeyDrivenStateError('register must have at least one digit');
  if (digits.some((digit) => !Number.isInteger(digit) || digit < 0 || digit > 9)) {
    throw new InvalidKeyDrivenStateError('register digits must be integers in 0..9');
  }
}

export function accumulatorValue(state: Readonly<KeyDrivenAccumulatorState>): number {
  return state.digits.reduce((value, digit, column) => value + digit * 10 ** column, 0);
}

export function createKeyDrivenAccumulator(width: number, initialValue = 0): KeyDrivenAccumulatorState {
  if (!Number.isInteger(width) || width <= 0) throw new InvalidKeyDrivenStateError('register width must be a positive integer');
  if (!Number.isSafeInteger(initialValue) || initialValue < 0 || initialValue >= 10 ** width) {
    throw new InvalidKeyDrivenStateError('initial value must fit the register width');
  }
  const digits = Array.from({ length: width }, (_, column) => Math.floor(initialValue / 10 ** column) % 10);
  return { mechanismId: KEY_DRIVEN_MECHANISM_ID, digits, activeColumn: null, pressedDigit: null, phase: 'IDLE', keyStrokeCount: 0, humanOperationCount: 0 };
}

export function transitionKeyStroke(
  state: Readonly<KeyDrivenAccumulatorState>,
  action: Readonly<KeyStrokeAction>,
): { state: KeyDrivenAccumulatorState; events: KeyDrivenEvent[] } {
  assertDigits(state.digits);
  if (state.mechanismId !== KEY_DRIVEN_MECHANISM_ID || state.phase !== 'IDLE') throw new InvalidKeyDrivenStateError('key-driven accumulator is not idle');
  if (action.type !== 'PRESS_KEY' || !Number.isInteger(action.digit) || action.digit < 1 || action.digit > 9) {
    throw new InvalidKeyDrivenStateError('pressed digit must be an integer in 1..9');
  }
  if (!Number.isInteger(action.column) || action.column < 0 || action.column >= state.digits.length) {
    throw new InvalidKeyDrivenStateError('key column is outside the register');
  }
  const before = accumulatorValue(state);
  const contribution = action.digit * 10 ** action.column;
  if (before + contribution >= 10 ** state.digits.length) throw new InvalidKeyDrivenStateError('keypress would overflow register width');

  const events: KeyDrivenEvent[] = [];
  const base = (): EventBase => ({ mechanismId: KEY_DRIVEN_MECHANISM_ID, cycleId: action.cycleId, sequence: events.length });
  events.push({ ...base(), type: 'KEY_STROKE_BEGIN', column: action.column, digit: action.digit, keyStrokeBefore: state.keyStrokeCount, humanOperationBefore: state.humanOperationCount });
  events.push({ ...base(), type: 'PLACE_VALUE_CONTRIBUTION', column: action.column, digit: action.digit, contribution, accumulatorBefore: before, accumulatorAfter: before + contribution });

  const digits = [...state.digits];
  let column = action.column;
  let amount = action.digit;
  while (amount > 0) {
    const from = digits[column];
    const sum = from + amount;
    const to = sum % 10;
    const carry = Math.floor(sum / 10);
    events.push({ ...base(), type: 'DIGIT_ADVANCE', column, amount, from, to });
    digits[column] = to;
    if (carry === 0) break;
    events.push({ ...base(), type: 'CARRY_PENDING', fromColumn: column, toColumn: column + 1 });
    events.push({ ...base(), type: 'CARRY_PROPAGATED', fromColumn: column, toColumn: column + 1 });
    column += 1;
    amount = carry;
  }
  events.push({ ...base(), type: 'KEY_STROKE_END', column: action.column, digit: action.digit, keyStrokeAfter: state.keyStrokeCount + 1, humanOperationAfter: state.humanOperationCount + 1 });
  return { state: events.reduce(reduceKeyDrivenEvent, structuredClone(state)), events };
}

export function reduceKeyDrivenEvent(state: Readonly<KeyDrivenAccumulatorState>, event: Readonly<KeyDrivenEvent>): KeyDrivenAccumulatorState {
  if (event.mechanismId !== state.mechanismId) throw new Error('event mechanism does not match state');
  if (event.type === 'KEY_STROKE_BEGIN') {
    if (state.phase !== 'IDLE' || state.keyStrokeCount !== event.keyStrokeBefore || state.humanOperationCount !== event.humanOperationBefore) throw new Error('key-stroke begin precondition failed');
    return { ...state, activeColumn: event.column, pressedDigit: event.digit, phase: 'KEY_DOWN' };
  }
  if (event.type === 'PLACE_VALUE_CONTRIBUTION') {
    if (state.phase !== 'KEY_DOWN' || accumulatorValue(state) !== event.accumulatorBefore) throw new Error('contribution precondition failed');
    return { ...state, phase: 'ACCUMULATING' };
  }
  if (event.type === 'DIGIT_ADVANCE') {
    if (state.phase !== 'ACCUMULATING' || state.digits[event.column] !== event.from) throw new Error('digit-advance precondition failed');
    const digits = [...state.digits]; digits[event.column] = event.to;
    return { ...state, digits };
  }
  if (event.type === 'KEY_STROKE_END') {
    if (state.phase !== 'ACCUMULATING' || state.activeColumn !== event.column || state.pressedDigit !== event.digit) throw new Error('key-stroke end precondition failed');
    return { ...state, activeColumn: null, pressedDigit: null, phase: 'IDLE', keyStrokeCount: event.keyStrokeAfter, humanOperationCount: event.humanOperationAfter };
  }
  return state;
}

export function replayKeyStroke(trace: Readonly<KeyStrokeTrace>): KeyDrivenAccumulatorState {
  return trace.events.reduce(reduceKeyDrivenEvent, structuredClone(trace.initialState));
}

export function createKeyStrokeTrace(state: Readonly<KeyDrivenAccumulatorState>, column: number, digit: number, cycleId = `key-${state.keyStrokeCount}`): KeyStrokeTrace {
  const initialState = structuredClone(state);
  const action: KeyStrokeAction = { type: 'PRESS_KEY', cycleId, column, digit };
  const result = transitionKeyStroke(initialState, action);
  return { initialState, action, events: result.events, finalState: result.state };
}
