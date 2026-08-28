export interface RevolutionState { count: number; }
export interface RevolutionEvent { type: 'REVOLUTION'; sequence: number; before: number; after: number; }
export function createRevolutionCounter(count = 0): RevolutionState {
  if (!Number.isInteger(count) || count < 0) throw new Error('revolution count must be a non-negative integer');
  return { count };
}
export function crankRevolution(state: Readonly<RevolutionState>): { state: RevolutionState; event: RevolutionEvent } {
  return { state: { count: state.count + 1 }, event: { type: 'REVOLUTION', sequence: state.count, before: state.count, after: state.count + 1 } };
}
export function reduceRevolution(state: Readonly<RevolutionState>, event: Readonly<RevolutionEvent>): RevolutionState {
  if (state.count !== event.before) throw new Error('revolution event precondition failed');
  return { count: event.after };
}
