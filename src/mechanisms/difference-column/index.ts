export interface DifferenceState { columns: number[][]; row: number; output: number[]; }
export function createDifferenceState(columns: readonly (readonly number[])[]): DifferenceState {
  if (!columns.length || columns.some(c => !c.length)) throw new Error('difference columns must be non-empty');
  return { columns: columns.map(c => [...c]), row: 0, output: [columns[0][0]] };
}
/** Pedagogical bottom-up update: add each higher difference into the column below it. */
export function crankDifference(state: Readonly<DifferenceState>): DifferenceState {
  const columns = state.columns.map(c => [...c]);
  for (let i = 0; i < columns.length - 1; i++) columns[i][0] += columns[i + 1][0];
  return { columns, row: state.row + 1, output: [...state.output, columns[0][0]] };
}
export const crankDifferenceCorrect = crankDifference;
export function squarePreset(): DifferenceState { return createDifferenceState([[0], [1], [2]]); }
export function cubicPreset(): DifferenceState { return createDifferenceState([[0], [1], [6], [6]]); }
