import { describe, expect, it } from 'vitest';
import {
  accumulatorValue,
  createKeyDrivenAccumulator,
  createKeyStrokeTrace,
  InvalidKeyDrivenStateError,
  replayKeyStroke,
} from '../src/mechanisms/key-driven-accumulator';

describe('generic key-driven accumulator', () => {
  it('presses units 7 as one arithmetic cycle with no crank', () => {
    const trace = createKeyStrokeTrace(createKeyDrivenAccumulator(3), 0, 7);
    expect(accumulatorValue(trace.finalState)).toBe(7);
    expect(trace.finalState.keyStrokeCount).toBe(1);
    expect(trace.events.map((event) => event.type)).toEqual([
      'KEY_STROKE_BEGIN', 'PLACE_VALUE_CONTRIBUTION', 'DIGIT_ADVANCE', 'KEY_STROKE_END',
    ]);
    expect(trace.events.some((event) => event.type.includes('CRANK'))).toBe(false);
  });

  it('units 7 then units 4 produces 11 and exposes carry into tens', () => {
    const first = createKeyStrokeTrace(createKeyDrivenAccumulator(3), 0, 7);
    const second = createKeyStrokeTrace(first.finalState, 0, 4);
    expect(accumulatorValue(second.finalState)).toBe(11);
    expect(second.events).toMatchObject([
      { type: 'KEY_STROKE_BEGIN' },
      { type: 'PLACE_VALUE_CONTRIBUTION', contribution: 4, accumulatorBefore: 7, accumulatorAfter: 11 },
      { type: 'DIGIT_ADVANCE', column: 0, from: 7, to: 1 },
      { type: 'CARRY_PENDING', fromColumn: 0, toColumn: 1 },
      { type: 'CARRY_PROPAGATED', fromColumn: 0, toColumn: 1 },
      { type: 'DIGIT_ADVANCE', column: 1, from: 0, to: 1 },
      { type: 'KEY_STROKE_END' },
    ]);
  });

  it('pressing tens 3 contributes 30 deterministically', () => {
    const trace = createKeyStrokeTrace(createKeyDrivenAccumulator(3), 1, 3);
    expect(trace.events[1]).toMatchObject({ type: 'PLACE_VALUE_CONTRIBUTION', column: 1, digit: 3, contribution: 30 });
    expect(accumulatorValue(trace.finalState)).toBe(30);
  });

  it('tens 3 plus units 4 produces 34 in two key-stroke cycles', () => {
    const tens = createKeyStrokeTrace(createKeyDrivenAccumulator(3), 1, 3);
    const units = createKeyStrokeTrace(tens.finalState, 0, 4);
    expect(accumulatorValue(units.finalState)).toBe(34);
    expect(units.finalState.keyStrokeCount).toBe(2);
  });

  it('99 plus units 7 reaches 106 with a two-column carry path', () => {
    const trace = createKeyStrokeTrace(createKeyDrivenAccumulator(3, 99), 0, 7);
    expect(accumulatorValue(trace.finalState)).toBe(106);
    expect(trace.events.filter((event) => event.type === 'CARRY_PROPAGATED')).toMatchObject([
      { fromColumn: 0, toColumn: 1 },
      { fromColumn: 1, toColumn: 2 },
    ]);
  });

  it('is deterministic and replayable solely from ordered events', () => {
    const initial = createKeyDrivenAccumulator(3, 99);
    const left = createKeyStrokeTrace(initial, 0, 7, 'same-action');
    const right = createKeyStrokeTrace(initial, 0, 7, 'same-action');
    expect(left).toEqual(right);
    expect(replayKeyStroke(left)).toEqual(left.finalState);
  });

  it.each([
    [0, 0, 0],
    [2, 2, 1],
    [2, -1, 1],
    [2, 0, 10],
  ])('rejects invalid width/column/digit (%i, %i, %i)', (width, column, digit) => {
    expect(() => {
      const state = createKeyDrivenAccumulator(width);
      createKeyStrokeTrace(state, column, digit);
    }).toThrow(InvalidKeyDrivenStateError);
  });
});
