import { describe, expect, it } from 'vitest';
import {
  crankPlusOne,
  digitsToString,
  incrementWheel,
  InvalidWheelStateError,
  replay,
} from '../src/mechanism-core';

describe('decimal wheel', () => {
  it.each([[0, 1], [8, 9]])('%i + 1 advances to %i', (position, expected) => {
    expect(incrementWheel(position)).toEqual({ position: expected, carry: false });
  });

  it('9 + 1 rolls over and emits a carry request', () => {
    expect(incrementWheel(9)).toEqual({ position: 0, carry: true });
  });
});

describe('carry chain', () => {
  it.each([
    [[9, 0, 0, 0], '0010'],
    [[9, 9, 0, 0], '0100'],
    [[9, 9, 9, 9], '0000'],
  ])('increments %j to %s', (before, expected) => {
    expect(digitsToString(crankPlusOne(before).after)).toBe(expected);
  });

  it('exposes every carry stage and carry-out', () => {
    const result = crankPlusOne([9, 9, 9, 9]);
    expect(result.phases.filter(({ event }) => event).map(({ event }) => event?.type)).toEqual([
      'CARRY_PENDING', 'CARRY_PROPAGATED',
      'CARRY_PENDING', 'CARRY_PROPAGATED',
      'CARRY_PENDING', 'CARRY_PROPAGATED',
      'CARRY_OUT',
    ]);
  });

  it('is deterministic and replayable', () => {
    const result = crankPlusOne([9, 9, 8], 3);
    expect(crankPlusOne(result.before, result.crank)).toEqual(result);
    expect(replay(result)).toEqual(result.after);
  });

  it('rejects invalid wheel states', () => {
    expect(() => crankPlusOne([])).toThrow(InvalidWheelStateError);
    expect(() => crankPlusOne([10])).toThrow(InvalidWheelStateError);
    expect(() => crankPlusOne([1.5])).toThrow(InvalidWheelStateError);
  });
});
