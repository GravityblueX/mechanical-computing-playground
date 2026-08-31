import { describe, expect, it } from 'vitest';
import {
  createDirectMultiplier,
  replayDirectMultiplication,
  runOperationCycle,
  selectMultiplierDigit,
  shiftDirectMultiplierCarriage,
  traceDirectMultiplication,
} from '../src/mechanisms/direct-multiplier';
import { compare314x27 } from '../src/exhibits/multiplication-compare';

describe('direct multiplication functional model', () => {
  it.each([
    [0, 0],
    [1, 314],
    [7, 2198],
  ])('selecting digit %i exposes the encoded multiple %i', (digit, expected) => {
    const selected = selectMultiplierDigit(createDirectMultiplier(314), digit);
    expect(selected.state.selectedMultiple).toBe(expected);
    expect(selected.event).toMatchObject({
      type: 'MULTIPLIER_DIGIT_SELECTED',
      digit,
      selectedMultiple: expected,
    });
  });

  it('digit zero contributes nothing but still records one operation cycle', () => {
    const selected = selectMultiplierDigit(createDirectMultiplier(314), 0);
    const operated = runOperationCycle(selected.state, 1);
    expect(operated.event).toMatchObject({ contribution: 0, accumulatorBefore: 0, accumulatorAfter: 0 });
    expect(operated.state).toMatchObject({ accumulator: 0, operationCycleCount: 1 });
  });

  it('carriage offset changes the selected multiple decimal place deterministically', () => {
    const selected = selectMultiplierDigit(createDirectMultiplier(314), 2);
    const shifted = shiftDirectMultiplierCarriage(selected.state, 1);
    const operated = runOperationCycle(shifted.state, 2);
    expect(operated.event).toMatchObject({ selectedMultiple: 628, carriageOffset: 1, contribution: 6280 });
    expect(operated.state.accumulator).toBe(6280);
  });

  it('traces 314 × 27 as two selected multiples and two operation cycles', () => {
    const trace = traceDirectMultiplication(314, 27);
    const operations = trace.events.filter((event) => event.type === 'OPERATION_CYCLE');
    expect(operations).toMatchObject([
      { digit: 7, selectedMultiple: 2198, carriageOffset: 0, contribution: 2198 },
      { digit: 2, selectedMultiple: 628, carriageOffset: 1, contribution: 6280 },
    ]);
    expect(trace.finalState).toMatchObject({ accumulator: 8478, operationCycleCount: 2, shiftCount: 1 });
    expect(operations).toHaveLength(2);
    expect(trace.finalState.operationCycleCount).not.toBe(27);
  });

  it('replays solely from ordered events and is deterministic', () => {
    const trace = traceDirectMultiplication(314, 27);
    expect(traceDirectMultiplication(314, 27)).toEqual(trace);
    expect(replayDirectMultiplication(trace)).toEqual(trace.finalState);
  });

  it('connects a fourth path to the multiplication comparison', () => {
    const comparison = compare314x27();
    expect(comparison.directMultiplication).toMatchObject({
      finalResult: 8478,
      operationCycles: 2,
      carriageShifts: 1,
      claimType: 'P',
    });
    expect(comparison.paths.directMultiplication.multiplicationTableWork).toContain('pre-encoded multiple');
    expect(comparison.paths.steppedDrum.operatorRepetitions).toBe(9);
    expect(comparison.paths.pinwheel.operatorRepetitions).toBe(9);
  });
});
