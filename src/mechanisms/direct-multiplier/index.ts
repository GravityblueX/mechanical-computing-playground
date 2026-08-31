export interface EncodedMultipleTable {
  multiplicand: number;
  /** Entry index is the represented multiplier digit 0..9. */
  entries: readonly number[];
}

export interface DirectMultiplierState {
  multiplicand: number;
  encodedMultipleTable: EncodedMultipleTable;
  selectedMultiplierDigit: number | null;
  carriageOffset: number;
  selectedMultiple: number;
  accumulator: number;
  operationCycleCount: number;
  humanOperationCount: number;
  shiftCount: number;
}

export type DirectMultiplierEvent =
  | {
      type: 'MULTIPLIER_DIGIT_SELECTED';
      sequence: number;
      digit: number;
      multiplicand: number;
      tableEntryDigit: number;
      selectedMultiple: number;
      humanOperationBefore: number;
      humanOperationAfter: number;
    }
  | {
      type: 'OPERATION_CYCLE';
      sequence: number;
      digit: number;
      carriageOffset: number;
      selectedMultiple: number;
      contribution: number;
      accumulatorBefore: number;
      accumulatorAfter: number;
      operationCycleBefore: number;
      operationCycleAfter: number;
      humanOperationBefore: number;
      humanOperationAfter: number;
    }
  | {
      type: 'CARRIAGE_SHIFTED';
      sequence: number;
      offsetBefore: number;
      offsetAfter: number;
      humanOperationBefore: number;
      humanOperationAfter: number;
      shiftCountBefore: number;
      shiftCountAfter: number;
    };

export interface DirectMultiplicationTrace {
  initialState: DirectMultiplierState;
  events: DirectMultiplierEvent[];
  finalState: DirectMultiplierState;
}

function assertNonNegativeInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${name} must be a non-negative safe integer`);
  }
}

function assertDigit(digit: number): void {
  if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
    throw new Error('multiplier digit must be an integer from 0 to 9');
  }
}

/** P/M control representation: inspectable arithmetic entries, not historical geometry. */
export function createEncodedMultipleTable(multiplicand: number): EncodedMultipleTable {
  assertNonNegativeInteger(multiplicand, 'multiplicand');
  const entries = Object.freeze(Array.from({ length: 10 }, (_, digit) => multiplicand * digit));
  if (entries.some((entry) => !Number.isSafeInteger(entry))) {
    throw new Error('encoded multiple table exceeds safe integer range');
  }
  return Object.freeze({ multiplicand, entries });
}

export function selectEncodedMultiple(table: Readonly<EncodedMultipleTable>, digit: number): number {
  assertDigit(digit);
  if (table.multiplicand < 0 || table.entries.length !== 10 || table.entries[digit] === undefined) {
    throw new Error('encoded multiple table must contain digits 0..9');
  }
  return table.entries[digit];
}

export function createDirectMultiplier(multiplicand: number): DirectMultiplierState {
  assertNonNegativeInteger(multiplicand, 'multiplicand');
  return {
    multiplicand,
    encodedMultipleTable: createEncodedMultipleTable(multiplicand),
    selectedMultiplierDigit: null,
    carriageOffset: 0,
    selectedMultiple: 0,
    accumulator: 0,
    operationCycleCount: 0,
    humanOperationCount: 0,
    shiftCount: 0,
  };
}

export function selectMultiplierDigit(
  state: Readonly<DirectMultiplierState>,
  digit: number,
  sequence = 0,
): { state: DirectMultiplierState; event: DirectMultiplierEvent } {
  const selectedMultiple = selectEncodedMultiple(state.encodedMultipleTable, digit);
  const event: DirectMultiplierEvent = {
    type: 'MULTIPLIER_DIGIT_SELECTED',
    sequence,
    digit,
    multiplicand: state.multiplicand,
    tableEntryDigit: digit,
    selectedMultiple,
    humanOperationBefore: state.humanOperationCount,
    humanOperationAfter: state.humanOperationCount + 1,
  };
  return { state: reduceDirectMultiplierEvent(state, event), event };
}

export function runOperationCycle(
  state: Readonly<DirectMultiplierState>,
  sequence = 0,
): { state: DirectMultiplierState; event: DirectMultiplierEvent } {
  if (state.selectedMultiplierDigit === null) throw new Error('select a multiplier digit before an operation cycle');
  const contribution = state.selectedMultiple * 10 ** state.carriageOffset;
  if (!Number.isSafeInteger(contribution) || !Number.isSafeInteger(state.accumulator + contribution)) {
    throw new Error('direct multiplication exceeds safe integer range');
  }
  const event: DirectMultiplierEvent = {
    type: 'OPERATION_CYCLE',
    sequence,
    digit: state.selectedMultiplierDigit,
    carriageOffset: state.carriageOffset,
    selectedMultiple: state.selectedMultiple,
    contribution,
    accumulatorBefore: state.accumulator,
    accumulatorAfter: state.accumulator + contribution,
    operationCycleBefore: state.operationCycleCount,
    operationCycleAfter: state.operationCycleCount + 1,
    humanOperationBefore: state.humanOperationCount,
    humanOperationAfter: state.humanOperationCount + 1,
  };
  return { state: reduceDirectMultiplierEvent(state, event), event };
}

export function shiftDirectMultiplierCarriage(
  state: Readonly<DirectMultiplierState>,
  sequence = 0,
): { state: DirectMultiplierState; event: DirectMultiplierEvent } {
  const event: DirectMultiplierEvent = {
    type: 'CARRIAGE_SHIFTED',
    sequence,
    offsetBefore: state.carriageOffset,
    offsetAfter: state.carriageOffset + 1,
    humanOperationBefore: state.humanOperationCount,
    humanOperationAfter: state.humanOperationCount + 1,
    shiftCountBefore: state.shiftCount,
    shiftCountAfter: state.shiftCount + 1,
  };
  return { state: reduceDirectMultiplierEvent(state, event), event };
}

export function reduceDirectMultiplierEvent(
  state: Readonly<DirectMultiplierState>,
  event: Readonly<DirectMultiplierEvent>,
): DirectMultiplierState {
  if (event.type === 'MULTIPLIER_DIGIT_SELECTED') {
    if (
      state.multiplicand !== event.multiplicand
      || event.tableEntryDigit !== event.digit
      || state.encodedMultipleTable.entries[event.tableEntryDigit] !== event.selectedMultiple
      || state.humanOperationCount !== event.humanOperationBefore
    ) {
      throw new Error('digit-selection event precondition failed');
    }
    return {
      ...state,
      selectedMultiplierDigit: event.digit,
      selectedMultiple: event.selectedMultiple,
      humanOperationCount: event.humanOperationAfter,
    };
  }
  if (event.type === 'OPERATION_CYCLE') {
    if (
      state.selectedMultiplierDigit !== event.digit
      || state.selectedMultiple !== event.selectedMultiple
      || state.carriageOffset !== event.carriageOffset
      || state.accumulator !== event.accumulatorBefore
      || state.operationCycleCount !== event.operationCycleBefore
      || state.humanOperationCount !== event.humanOperationBefore
    ) throw new Error('operation-cycle event precondition failed');
    return {
      ...state,
      accumulator: event.accumulatorAfter,
      operationCycleCount: event.operationCycleAfter,
      humanOperationCount: event.humanOperationAfter,
    };
  }
  if (
    state.carriageOffset !== event.offsetBefore
    || state.humanOperationCount !== event.humanOperationBefore
    || state.shiftCount !== event.shiftCountBefore
  ) throw new Error('carriage-shift event precondition failed');
  return {
    ...state,
    carriageOffset: event.offsetAfter,
    humanOperationCount: event.humanOperationAfter,
    shiftCount: event.shiftCountAfter,
  };
}

export function replayDirectMultiplication(trace: Readonly<DirectMultiplicationTrace>): DirectMultiplierState {
  return trace.events.reduce<DirectMultiplierState>(
    (state, event) => reduceDirectMultiplierEvent(state, event),
    structuredClone(trace.initialState),
  );
}

export function traceDirectMultiplication(multiplicand: number, multiplier: number): DirectMultiplicationTrace {
  assertNonNegativeInteger(multiplier, 'multiplier');
  const initialState = createDirectMultiplier(multiplicand);
  let state = initialState;
  const events: DirectMultiplierEvent[] = [];
  const digits = String(multiplier).split('').reverse().map(Number);

  for (let index = 0; index < digits.length; index += 1) {
    const selected = selectMultiplierDigit(state, digits[index], events.length);
    state = selected.state;
    events.push(selected.event);

    const operated = runOperationCycle(state, events.length);
    state = operated.state;
    events.push(operated.event);

    if (index < digits.length - 1) {
      const shifted = shiftDirectMultiplierCarriage(state, events.length);
      state = shifted.state;
      events.push(shifted.event);
    }
  }

  return { initialState, events, finalState: state };
}
