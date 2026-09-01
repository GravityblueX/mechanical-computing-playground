export interface RevolutionState { count: number; }
export interface RevolutionEvent { type: 'REVOLUTION'; sequence: number; before: number; after: number; }

export class InvalidRevolutionCounterError extends Error {
  constructor(message: string) { super(message); this.name = 'InvalidRevolutionCounterError'; }
}

function assertCount(count: number): void {
  if (!Number.isSafeInteger(count) || count < 0) throw new InvalidRevolutionCounterError('revolution count must be a non-negative safe integer');
}

export function createRevolutionCounter(count = 0): RevolutionState {
  assertCount(count);
  return { count };
}
export function crankRevolution(state: Readonly<RevolutionState>): { state: RevolutionState; event: RevolutionEvent } {
  const count = state.count;
  assertCount(count);
  if (count === Number.MAX_SAFE_INTEGER) throw new InvalidRevolutionCounterError('revolution count cannot exceed the safe integer range');
  const after = count + 1;
  return { state: { count: after }, event: { type: 'REVOLUTION', sequence: count, before: count, after } };
}
export function reduceRevolution(state: Readonly<RevolutionState>, event: Readonly<RevolutionEvent>): RevolutionState {
  const count = state.count;
  const { type, sequence, before, after } = event as RevolutionEvent & { type?: unknown };
  assertCount(count);
  if (type !== 'REVOLUTION') throw new InvalidRevolutionCounterError(`unknown revolution event: ${String(type)}`);
  if (!Number.isSafeInteger(sequence) || sequence !== count || before !== count || !Number.isSafeInteger(after) || after !== count + 1) throw new InvalidRevolutionCounterError('revolution event precondition failed');
  return { count: after };
}
