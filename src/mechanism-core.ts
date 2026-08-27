/**
 * Deterministic M0 decimal wheel and carry-chain model.
 * Wheels are stored least-significant first (index 0 is the units wheel).
 */

export const PHASES = [
  'INPUT_STEP',
  'CARRY_PENDING',
  'CARRY_PROPAGATED',
  'CARRY_OUT',
  'CRANK_COMPLETE',
] as const;

export type CrankPhase = (typeof PHASES)[number];
export type CarryEventType = Exclude<CrankPhase, 'INPUT_STEP' | 'CRANK_COMPLETE'>;

export interface CarryEvent {
  type: CarryEventType;
  fromIndex: number;
  toIndex?: number;
  crank: number;
}

export interface Phase {
  phase: CrankPhase;
  activeIndex?: number;
  event?: CarryEvent;
}

export interface TransitionResult {
  before: number[];
  after: number[];
  crank: number;
  phases: Phase[];
}

export class InvalidWheelStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidWheelStateError';
  }
}

function assertDigits(digits: readonly number[]): void {
  if (!Array.isArray(digits) || digits.length === 0) {
    throw new InvalidWheelStateError('wheel state must be a non-empty array');
  }
  digits.forEach((digit, index) => {
    if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
      throw new InvalidWheelStateError(`wheel ${index} must be an integer in 0..9`);
    }
  });
}

function assertCrank(crank: number): void {
  if (!Number.isInteger(crank) || crank < 0) {
    throw new InvalidWheelStateError('crank must be a non-negative integer');
  }
}

/** Increment one validated decimal wheel. */
export function incrementWheel(position: number): { position: number; carry: boolean } {
  if (!Number.isInteger(position) || position < 0 || position > 9) {
    throw new InvalidWheelStateError('wheel position must be an integer in 0..9');
  }
  return position === 9
    ? { position: 0, carry: true }
    : { position: position + 1, carry: false };
}

/**
 * Execute exactly one +1 crank. The input array is never mutated.
 * Event and phase ordering is stable and suitable for JSON serialization/replay.
 */
export function crankPlusOne(digits: readonly number[], crank = 0): TransitionResult {
  assertDigits(digits);
  assertCrank(crank);

  const before = [...digits];
  const after = [...digits];
  const phases: Phase[] = [{ phase: 'INPUT_STEP', activeIndex: 0 }];
  let index = 0;

  while (index < after.length) {
    const result = incrementWheel(after[index]);
    after[index] = result.position;
    if (!result.carry) break;

    const nextIndex = index + 1;
    if (nextIndex >= after.length) {
      const event: CarryEvent = { type: 'CARRY_OUT', fromIndex: index, crank };
      phases.push({ phase: 'CARRY_OUT', activeIndex: index, event });
      break;
    }

    const pending: CarryEvent = {
      type: 'CARRY_PENDING',
      fromIndex: index,
      toIndex: nextIndex,
      crank,
    };
    phases.push({ phase: 'CARRY_PENDING', activeIndex: index, event: pending });

    const propagated: CarryEvent = {
      type: 'CARRY_PROPAGATED',
      fromIndex: index,
      toIndex: nextIndex,
      crank,
    };
    phases.push({ phase: 'CARRY_PROPAGATED', activeIndex: nextIndex, event: propagated });
    index = nextIndex;
  }

  phases.push({ phase: 'CRANK_COMPLETE' });
  return { before, after, crank, phases };
}

export function digitsToString(digits: readonly number[]): string {
  assertDigits(digits);
  return [...digits].reverse().join('');
}

export function replay(result: TransitionResult): number[] {
  assertDigits(result.before);
  assertCrank(result.crank);
  const replayed = crankPlusOne(result.before, result.crank);
  if (JSON.stringify(replayed.phases) !== JSON.stringify(result.phases)) {
    throw new Error('transition phases are not deterministic or do not match the result');
  }
  return replayed.after;
}
