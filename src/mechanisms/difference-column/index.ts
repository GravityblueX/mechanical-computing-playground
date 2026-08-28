export interface DifferenceEvent {
  type: 'COLUMN_ADD';
  sequence: number;
  sourceOrder: number;
  targetOrder: number;
  addend: number;
  before: number;
  after: number;
}

export interface DifferenceState {
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

export function createDifferenceState(columns: readonly number[]): DifferenceState {
  if (columns.length < 2 || columns.length > 5 || columns.some(value => !Number.isFinite(value))) {
    throw new Error('difference row must contain 2..5 finite leading values');
  }
  return { columns: [...columns], row: 0, output: [columns[0]] };
}

/** Add each current higher difference to the column below, low-order first. */
export function transitionDifference(state: Readonly<DifferenceState>): DifferenceCrank {
  const columns = [...state.columns];
  const events: DifferenceEvent[] = [];
  for (let targetOrder = 0; targetOrder < columns.length - 1; targetOrder += 1) {
    const sourceOrder = targetOrder + 1;
    const before = columns[targetOrder];
    const addend = columns[sourceOrder];
    columns[targetOrder] = before + addend;
    events.push({ type: 'COLUMN_ADD', sequence: events.length, sourceOrder, targetOrder, addend, before, after: columns[targetOrder] });
  }
  return {
    before: cloneDifferenceState(state),
    after: { columns, row: state.row + 1, output: [...state.output, columns[0]] },
    events,
  };
}

export function reduceDifferenceEvent(columns: readonly number[], event: Readonly<DifferenceEvent>): number[] {
  const next = [...columns];
  if (next[event.targetOrder] !== event.before || next[event.sourceOrder] !== event.addend) {
    throw new Error('difference event precondition failed');
  }
  next[event.targetOrder] = event.after;
  return next;
}

export function replayDifference(crank: Readonly<DifferenceCrank>): DifferenceState {
  const columns = crank.events.reduce(reduceDifferenceEvent, [...crank.before.columns]);
  return { columns, row: crank.before.row + 1, output: [...crank.before.output, columns[0]] };
}

export function crankDifference(state: Readonly<DifferenceState>): DifferenceState {
  return transitionDifference(state).after;
}

/** Backwards-compatible name used by the original acceptance tests. */
export const crankDifferenceCorrect = crankDifference;

export function cloneDifferenceState(state: Readonly<DifferenceState>): DifferenceState {
  return { columns: [...state.columns], row: state.row, output: [...state.output] };
}

export function squarePreset(): DifferenceState { return createDifferenceState([0, 1, 2]); }
export function cubicPreset(): DifferenceState { return createDifferenceState([0, 1, 6, 6]); }
