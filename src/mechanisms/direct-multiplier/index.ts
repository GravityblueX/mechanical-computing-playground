import { canonicalize } from '../../core/trace';

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

export interface DirectMultiplicationAction {
  type: 'DIRECT_MULTIPLY';
  multiplier: number;
}

export interface DirectMultiplicationTrace {
  initialState: DirectMultiplierState;
  action: DirectMultiplicationAction;
  events: DirectMultiplierEvent[];
  finalState: DirectMultiplierState;
}

const DIRECT_MULTIPLIER_EVENT_TYPES = new Set<string>([
  'MULTIPLIER_DIGIT_SELECTED',
  'OPERATION_CYCLE',
  'CARRIAGE_SHIFTED',
]);

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

function checkedIncrement(value: number, name: string): number {
  assertNonNegativeInteger(value, name);
  if (value === Number.MAX_SAFE_INTEGER) {
    throw new Error(`${name} exceeds safe integer range`);
  }
  return value + 1;
}

function checkedSum(left: number, right: number, name: string): number {
  const sum = left + right;
  if (!Number.isSafeInteger(sum)) throw new Error(`${name} exceeds safe integer range`);
  return sum;
}

function placeFactor(offset: number): number {
  assertNonNegativeInteger(offset, 'carriage offset');
  const factor = 10 ** offset;
  if (!Number.isSafeInteger(factor)) throw new Error('carriage place factor exceeds safe integer range');
  return factor;
}

function assertState(state: Readonly<DirectMultiplierState>): void {
  assertNonNegativeInteger(state.multiplicand, 'multiplicand');
  assertEncodedMultipleTable(state.encodedMultipleTable);
  if (state.encodedMultipleTable.multiplicand !== state.multiplicand) {
    throw new Error('encoded multiple table does not match the multiplicand');
  }
  assertNonNegativeInteger(state.carriageOffset, 'carriage offset');
  assertNonNegativeInteger(state.selectedMultiple, 'selected multiple');
  assertNonNegativeInteger(state.accumulator, 'accumulator');
  assertNonNegativeInteger(state.operationCycleCount, 'operation cycle count');
  assertNonNegativeInteger(state.humanOperationCount, 'human operation count');
  assertNonNegativeInteger(state.shiftCount, 'shift count');
  if (state.selectedMultiplierDigit === null) {
    if (state.selectedMultiple !== 0) throw new Error('an unset multiplier digit cannot have a selected multiple');
    return;
  }
  assertDigit(state.selectedMultiplierDigit);
  if (state.selectedMultiple !== selectEncodedMultiple(state.encodedMultipleTable, state.selectedMultiplierDigit)) {
    throw new Error('selected multiple does not match the multiplier digit');
  }
}

function statesMatch(
  left: Readonly<DirectMultiplierState>,
  right: Readonly<DirectMultiplierState>,
): boolean {
  return left.multiplicand === right.multiplicand
    && left.selectedMultiplierDigit === right.selectedMultiplierDigit
    && left.carriageOffset === right.carriageOffset
    && left.selectedMultiple === right.selectedMultiple
    && left.accumulator === right.accumulator
    && left.operationCycleCount === right.operationCycleCount
    && left.humanOperationCount === right.humanOperationCount
    && left.shiftCount === right.shiftCount
    && left.encodedMultipleTable.multiplicand === right.encodedMultipleTable.multiplicand
    && left.encodedMultipleTable.entries.length === right.encodedMultipleTable.entries.length
    && left.encodedMultipleTable.entries.every(
      (entry, index) => entry === right.encodedMultipleTable.entries[index],
    );
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

function assertEncodedMultipleTable(table: Readonly<EncodedMultipleTable>): void {
  assertNonNegativeInteger(table.multiplicand, 'encoded table multiplicand');
  if (!Array.isArray(table.entries) || table.entries.length !== 10) {
    throw new Error('encoded multiple table must contain digits 0..9');
  }
  for (let digit = 0; digit <= 9; digit += 1) {
    const expected = table.multiplicand * digit;
    if (!Number.isSafeInteger(expected) || table.entries[digit] !== expected) {
      throw new Error('encoded multiple table contains an invalid entry');
    }
  }
}

export function selectEncodedMultiple(table: Readonly<EncodedMultipleTable>, digit: number): number {
  assertDigit(digit);
  assertEncodedMultipleTable(table);
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
  assertState(state);
  assertNonNegativeInteger(sequence, 'event sequence');
  const selectedMultiple = selectEncodedMultiple(state.encodedMultipleTable, digit);
  const event: DirectMultiplierEvent = {
    type: 'MULTIPLIER_DIGIT_SELECTED',
    sequence,
    digit,
    multiplicand: state.multiplicand,
    tableEntryDigit: digit,
    selectedMultiple,
    humanOperationBefore: state.humanOperationCount,
    humanOperationAfter: checkedIncrement(state.humanOperationCount, 'human operation count'),
  };
  return { state: reduceDirectMultiplierEvent(state, event), event };
}

export function runOperationCycle(
  state: Readonly<DirectMultiplierState>,
  sequence = 0,
): { state: DirectMultiplierState; event: DirectMultiplierEvent } {
  assertState(state);
  assertNonNegativeInteger(sequence, 'event sequence');
  if (state.selectedMultiplierDigit === null) throw new Error('select a multiplier digit before an operation cycle');
  const contribution = state.selectedMultiple * placeFactor(state.carriageOffset);
  if (!Number.isSafeInteger(contribution)) {
    throw new Error('direct multiplication exceeds safe integer range');
  }
  const accumulatorAfter = checkedSum(state.accumulator, contribution, 'direct multiplication');
  const event: DirectMultiplierEvent = {
    type: 'OPERATION_CYCLE',
    sequence,
    digit: state.selectedMultiplierDigit,
    carriageOffset: state.carriageOffset,
    selectedMultiple: state.selectedMultiple,
    contribution,
    accumulatorBefore: state.accumulator,
    accumulatorAfter,
    operationCycleBefore: state.operationCycleCount,
    operationCycleAfter: checkedIncrement(state.operationCycleCount, 'operation cycle count'),
    humanOperationBefore: state.humanOperationCount,
    humanOperationAfter: checkedIncrement(state.humanOperationCount, 'human operation count'),
  };
  return { state: reduceDirectMultiplierEvent(state, event), event };
}

export function shiftDirectMultiplierCarriage(
  state: Readonly<DirectMultiplierState>,
  sequence = 0,
): { state: DirectMultiplierState; event: DirectMultiplierEvent } {
  assertState(state);
  assertNonNegativeInteger(sequence, 'event sequence');
  const event: DirectMultiplierEvent = {
    type: 'CARRIAGE_SHIFTED',
    sequence,
    offsetBefore: state.carriageOffset,
    offsetAfter: checkedIncrement(state.carriageOffset, 'carriage offset'),
    humanOperationBefore: state.humanOperationCount,
    humanOperationAfter: checkedIncrement(state.humanOperationCount, 'human operation count'),
    shiftCountBefore: state.shiftCount,
    shiftCountAfter: checkedIncrement(state.shiftCount, 'shift count'),
  };
  return { state: reduceDirectMultiplierEvent(state, event), event };
}

export function reduceDirectMultiplierEvent(
  state: Readonly<DirectMultiplierState>,
  event: Readonly<DirectMultiplierEvent>,
): DirectMultiplierState {
  assertState(state);
  assertNonNegativeInteger(event.sequence, 'event sequence');
  if (!DIRECT_MULTIPLIER_EVENT_TYPES.has(event.type)) {
    throw new Error('unsupported direct multiplication event type');
  }
  if (event.type === 'MULTIPLIER_DIGIT_SELECTED') {
    assertDigit(event.digit);
    assertDigit(event.tableEntryDigit);
    const expectedMultiple = selectEncodedMultiple(state.encodedMultipleTable, event.digit);
    if (
      state.multiplicand !== event.multiplicand
      || event.tableEntryDigit !== event.digit
      || event.selectedMultiple !== expectedMultiple
      || state.humanOperationCount !== event.humanOperationBefore
      || event.humanOperationAfter !== checkedIncrement(event.humanOperationBefore, 'human operation count')
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
    assertDigit(event.digit);
    const expectedContribution = event.selectedMultiple * placeFactor(event.carriageOffset);
    if (!Number.isSafeInteger(expectedContribution)) throw new Error('operation-cycle event exceeds safe integer range');
    if (
      state.selectedMultiplierDigit !== event.digit
      || state.selectedMultiple !== event.selectedMultiple
      || state.carriageOffset !== event.carriageOffset
      || state.accumulator !== event.accumulatorBefore
      || state.operationCycleCount !== event.operationCycleBefore
      || state.humanOperationCount !== event.humanOperationBefore
      || event.contribution !== expectedContribution
      || event.accumulatorAfter !== checkedSum(event.accumulatorBefore, event.contribution, 'accumulator')
      || event.operationCycleAfter !== checkedIncrement(event.operationCycleBefore, 'operation cycle count')
      || event.humanOperationAfter !== checkedIncrement(event.humanOperationBefore, 'human operation count')
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
    || event.offsetAfter !== checkedIncrement(event.offsetBefore, 'carriage offset')
    || event.humanOperationAfter !== checkedIncrement(event.humanOperationBefore, 'human operation count')
    || event.shiftCountAfter !== checkedIncrement(event.shiftCountBefore, 'shift count')
  ) throw new Error('carriage-shift event precondition failed');
  return {
    ...state,
    carriageOffset: event.offsetAfter,
    humanOperationCount: event.humanOperationAfter,
    shiftCount: event.shiftCountAfter,
  };
}

export function replayDirectMultiplication(trace: Readonly<DirectMultiplicationTrace>): DirectMultiplierState {
  if (trace.action?.type !== 'DIRECT_MULTIPLY') {
    throw new Error('unsupported direct multiplication action type');
  }
  assertNonNegativeInteger(trace.action.multiplier, 'multiplier');
  assertState(trace.initialState);
  const expected = traceDirectMultiplication(trace.initialState.multiplicand, trace.action.multiplier);
  if (!statesMatch(expected.initialState, trace.initialState)) {
    throw new Error('direct multiplication initial state does not match the recorded action');
  }
  const replayed = trace.events.reduce<DirectMultiplierState>(
    (state, event, index) => {
      if (event.sequence !== index) throw new Error('direct multiplication event sequence is not contiguous');
      return reduceDirectMultiplierEvent(state, event);
    },
    structuredClone(trace.initialState),
  );
  assertState(trace.finalState);
  if (!statesMatch(replayed, trace.finalState)) {
    throw new Error('direct multiplication replay did not produce the recorded final state');
  }
  if (JSON.stringify(canonicalize(expected.events)) !== JSON.stringify(canonicalize(trace.events))) {
    throw new Error('direct multiplication action/event mismatch');
  }
  return replayed;
}

export function traceDirectMultiplication(multiplicand: number, multiplier: number): DirectMultiplicationTrace {
  assertNonNegativeInteger(multiplier, 'multiplier');
  const initialState = createDirectMultiplier(multiplicand);
  const action: DirectMultiplicationAction = { type: 'DIRECT_MULTIPLY', multiplier };
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

  return { initialState, action, events, finalState: state };
}
