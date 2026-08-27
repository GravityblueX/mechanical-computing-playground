// Generated runtime companion for the dependency-free M0 model.
export const PHASES = ['INPUT_STEP', 'CARRY_PENDING', 'CARRY_PROPAGATED', 'CARRY_OUT', 'CRANK_COMPLETE'];
export class InvalidWheelStateError extends Error {
  constructor(message) { super(message); this.name = 'InvalidWheelStateError'; }
}
function assertDigits(digits) {
  if (!Array.isArray(digits) || digits.length === 0) throw new InvalidWheelStateError('wheel state must be a non-empty array');
  digits.forEach((digit, index) => {
    if (!Number.isInteger(digit) || digit < 0 || digit > 9) throw new InvalidWheelStateError(`wheel ${index} must be an integer in 0..9`);
  });
}
function assertCrank(crank) {
  if (!Number.isInteger(crank) || crank < 0) throw new InvalidWheelStateError('crank must be a non-negative integer');
}
export function incrementWheel(position) {
  if (!Number.isInteger(position) || position < 0 || position > 9) throw new InvalidWheelStateError('wheel position must be an integer in 0..9');
  return position === 9 ? { position: 0, carry: true } : { position: position + 1, carry: false };
}
export function crankPlusOne(digits, crank = 0) {
  assertDigits(digits); assertCrank(crank);
  const before = [...digits], after = [...digits];
  const phases = [{ phase: 'INPUT_STEP', activeIndex: 0 }];
  let index = 0;
  while (index < after.length) {
    const result = incrementWheel(after[index]); after[index] = result.position;
    if (!result.carry) break;
    const nextIndex = index + 1;
    if (nextIndex >= after.length) {
      const event = { type: 'CARRY_OUT', fromIndex: index, crank };
      phases.push({ phase: 'CARRY_OUT', activeIndex: index, event }); break;
    }
    const pending = { type: 'CARRY_PENDING', fromIndex: index, toIndex: nextIndex, crank };
    phases.push({ phase: 'CARRY_PENDING', activeIndex: index, event: pending });
    const propagated = { type: 'CARRY_PROPAGATED', fromIndex: index, toIndex: nextIndex, crank };
    phases.push({ phase: 'CARRY_PROPAGATED', activeIndex: nextIndex, event: propagated });
    index = nextIndex;
  }
  phases.push({ phase: 'CRANK_COMPLETE' });
  return { before, after, crank, phases };
}
export function digitsToString(digits) { assertDigits(digits); return [...digits].reverse().join(''); }
export function replay(result) {
  assertDigits(result.before); assertCrank(result.crank);
  const replayed = crankPlusOne(result.before, result.crank);
  if (JSON.stringify(replayed.phases) !== JSON.stringify(result.phases)) throw new Error('transition phases are not deterministic or do not match the result');
  return replayed.after;
}
