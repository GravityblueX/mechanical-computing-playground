export const DIFFERENCE_COLUMN_ID = 'difference-column';

export interface DifferenceEvent {
  type: 'COLUMN_ADD';
  sequence: number;
  sourceOrder: number;
  targetOrder: number;
  addend: number;
  before: number;
  after: number;
  claimType: 'P/M';
}

export interface DifferenceState {
  mechanismId: typeof DIFFERENCE_COLUMN_ID;
  /** Δ⁰, Δ¹ ... Δⁿ leading values. */
  columns: number[];
  row: number;
  output: number[];
}

export interface DifferenceCrank {
  before: DifferenceState;
  after: DifferenceState;
  events: DifferenceEvent[];
}

export class InvalidDifferenceStateError extends Error {
  constructor(message: string) { super(message); this.name = 'InvalidDifferenceStateError'; }
}

function finite(value: number, name: string): void {
  if (!Number.isFinite(value)) throw new InvalidDifferenceStateError(`${name} must be finite`);
}
function safeCount(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) throw new InvalidDifferenceStateError(`${name} must be a non-negative safe integer`);
}
function increment(value: number, name: string): number {
  safeCount(value, name);
  if (value === Number.MAX_SAFE_INTEGER) throw new InvalidDifferenceStateError(`${name} exceeds safe integer range`);
  return value + 1;
}
function add(left: number, right: number): number {
  const result = left + right;
  finite(result, 'difference addition result');
  return result;
}

export function assertDifferenceState(state: Readonly<DifferenceState>): void {
  if (state.mechanismId !== DIFFERENCE_COLUMN_ID) throw new InvalidDifferenceStateError('difference mechanism id mismatch');
  if (!Array.isArray(state.columns) || state.columns.length < 2 || state.columns.length > 5) throw new InvalidDifferenceStateError('difference state must contain 2..5 columns');
  if (state.columns.some(value => !Number.isFinite(value))) throw new InvalidDifferenceStateError('difference columns must be finite');
  safeCount(state.row, 'difference row');
  if (!Array.isArray(state.output) || state.output.some(value => !Number.isFinite(value))) throw new InvalidDifferenceStateError('difference output must be finite');
  if (state.output.length !== state.row + 1 || state.output[state.output.length - 1] !== state.columns[0]) throw new InvalidDifferenceStateError('difference row/output consistency failed');
}

export function createDifferenceState(columns: readonly number[]): DifferenceState {
  if (columns.length < 2 || columns.length > 5 || columns.some(value => !Number.isFinite(value))) throw new InvalidDifferenceStateError('difference row must contain 2..5 finite leading values');
  const state: DifferenceState = { mechanismId: DIFFERENCE_COLUMN_ID, columns: [...columns], row: 0, output: [columns[0]] };
  assertDifferenceState(state);
  return state;
}

/** P/M update: add each current higher difference to the column below, low-order first. */
export function transitionDifference(state: Readonly<DifferenceState>): DifferenceCrank {
  assertDifferenceState(state);
  const columns = [...state.columns];
  const events: DifferenceEvent[] = [];
  for (let targetOrder = 0; targetOrder < columns.length - 1; targetOrder += 1) {
    const sourceOrder = targetOrder + 1;
    const before = columns[targetOrder];
    const addend = columns[sourceOrder];
    const after = add(before, addend);
    columns[targetOrder] = after;
    events.push({ type: 'COLUMN_ADD', sequence: events.length, sourceOrder, targetOrder, addend, before, after, claimType: 'P/M' });
  }
  const after: DifferenceState = { mechanismId: DIFFERENCE_COLUMN_ID, columns, row: increment(state.row, 'difference row'), output: [...state.output, columns[0]] };
  assertDifferenceState(after);
  return { before: cloneDifferenceState(state), after, events };
}

export function reduceDifferenceEvent(columns: readonly number[], event: Readonly<DifferenceEvent>): number[] {
  if (!Array.isArray(columns) || columns.length < 2 || columns.length > 5 || columns.some(value => !Number.isFinite(value))) throw new InvalidDifferenceStateError('invalid replay columns');
  if (event.type !== 'COLUMN_ADD') throw new InvalidDifferenceStateError(`unknown difference event: ${String((event as { type?: unknown }).type)}`);
  if (event.claimType !== 'P/M') throw new InvalidDifferenceStateError('difference event claim type mismatch');
  safeCount(event.sequence, 'difference event sequence');
  if (!Number.isSafeInteger(event.targetOrder) || !Number.isSafeInteger(event.sourceOrder) || event.targetOrder < 0 || event.targetOrder >= columns.length - 1 || event.sourceOrder !== event.targetOrder + 1 || event.sequence !== event.targetOrder) throw new InvalidDifferenceStateError('invalid difference event order');
  const next = [...columns];
  const before = next[event.targetOrder];
  const addend = next[event.sourceOrder];
  const after = add(before, addend);
  if (event.before !== before || event.addend !== addend || event.after !== after) throw new InvalidDifferenceStateError('difference event arithmetic/precondition failed');
  next[event.targetOrder] = after;
  return next;
}

export function replayDifference(crank: Readonly<DifferenceCrank>): DifferenceState {
  assertDifferenceState(crank.before);
  assertDifferenceState(crank.after);
  if (crank.events.length !== crank.before.columns.length - 1) throw new InvalidDifferenceStateError('difference crank event count mismatch');
  const columns = crank.events.reduce(reduceDifferenceEvent, [...crank.before.columns]);
  const replayed: DifferenceState = { mechanismId: DIFFERENCE_COLUMN_ID, columns, row: increment(crank.before.row, 'difference row'), output: [...crank.before.output, columns[0]] };
  assertDifferenceState(replayed);
  if (JSON.stringify(replayed) !== JSON.stringify(crank.after)) throw new InvalidDifferenceStateError('difference crank final state mismatch');
  return replayed;
}

export function crankDifference(state: Readonly<DifferenceState>): DifferenceState { return transitionDifference(state).after; }
export const crankDifferenceCorrect = crankDifference;
export function cloneDifferenceState(state: Readonly<DifferenceState>): DifferenceState { return { mechanismId: DIFFERENCE_COLUMN_ID, columns: [...state.columns], row: state.row, output: [...state.output] }; }
export function squarePreset(): DifferenceState { return createDifferenceState([0, 1, 2]); }
export function cubicPreset(): DifferenceState { return createDifferenceState([0, 1, 6, 6]); }
