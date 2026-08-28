import { describe, expect, it } from 'vitest';
import {
  createDifferenceState,
  cubicPreset,
  replayDifference,
  squarePreset,
  transitionDifference,
} from '../src/mechanisms/difference-column';

describe('finite-difference mechanism', () => {
  it('generates ten square-number cranks', () => {
    let state = squarePreset();
    for (let i = 0; i < 10; i += 1) state = transitionDifference(state).after;
    expect(state.output).toEqual([0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]);
  });

  it('generates cubic values', () => {
    let state = cubicPreset();
    for (let i = 0; i < 4; i += 1) state = transitionDifference(state).after;
    expect(state.output).toEqual([0, 1, 8, 27, 64]);
  });

  it('supports custom rows and deterministic event replay', () => {
    const before = createDifferenceState([5, 2, 1, 0]);
    const crank = transitionDifference(before);
    expect(crank.events.map((event) => event.targetOrder)).toEqual([0, 1, 2]);
    expect(replayDifference(crank)).toEqual(crank.after);
  });

  it('rejects invalid rows', () => {
    expect(() => createDifferenceState([1])).toThrow();
    expect(() => createDifferenceState([1, Number.NaN])).toThrow();
    expect(() => createDifferenceState([1, 2, 3, 4, 5, 6])).toThrow();
  });
});
