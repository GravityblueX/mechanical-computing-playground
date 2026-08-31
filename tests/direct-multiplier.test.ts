import { describe, expect, it } from 'vitest';
import {
  createDirectMultiplier,
  createEncodedMultipleTable,
  replayDirectMultiplication,
  runOperationCycle,
  selectEncodedMultiple,
  selectMultiplierDigit,
  shiftDirectMultiplierCarriage,
  traceDirectMultiplication,
} from '../src/mechanisms/direct-multiplier';
import { compare314x27 } from '../src/exhibits/multiplication-compare';

describe('direct multiplication functional model', () => {
  it('stores an inspectable immutable table and selects its represented entry', () => {
    const table = createEncodedMultipleTable(314);
    const state = createDirectMultiplier(314);
    expect(table.entries).toEqual([0, 314, 628, 942, 1256, 1570, 1884, 2198, 2512, 2826]);
    expect(state.encodedMultipleTable).toEqual(table);
    expect(Object.isFrozen(state.encodedMultipleTable.entries)).toBe(true);
    expect(selectEncodedMultiple(table, 7)).toBe(2198);
    const selected = selectMultiplierDigit(state, 7);
    expect(selected.event).toMatchObject({ tableEntryDigit: 7, selectedMultiple: state.encodedMultipleTable.entries[7] });
  });

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

  it('rejects a recorded final state that does not match replayed events', () => {
    const trace = structuredClone(traceDirectMultiplication(314, 27));
    trace.finalState.accumulator += 1;
    expect(() => replayDirectMultiplication(trace)).toThrow(/recorded final state/);
  });

  it('rejects unsafe table selection before an invalid number enters state', () => {
    expect(() => createEncodedMultipleTable(Number.MAX_SAFE_INTEGER)).toThrow(/safe integer range/);
    expect(() => traceDirectMultiplication(Number.MAX_SAFE_INTEGER, 2)).toThrow(/safe integer range/);
  });

  it('rejects tampered derived values and non-contiguous replay events', () => {
    const selected = structuredClone(traceDirectMultiplication(314, 27));
    const selectedEvent = selected.events.find((event) => event.type === 'MULTIPLIER_DIGIT_SELECTED');
    if (!selectedEvent || selectedEvent.type !== 'MULTIPLIER_DIGIT_SELECTED') throw new Error('missing selection event');
    selectedEvent.selectedMultiple += 1;
    expect(() => replayDirectMultiplication(selected)).toThrow(/digit-selection event/);

    const wrongTableEntry = structuredClone(traceDirectMultiplication(314, 27));
    const tableEvent = wrongTableEntry.events.find((event) => event.type === 'MULTIPLIER_DIGIT_SELECTED');
    if (!tableEvent || tableEvent.type !== 'MULTIPLIER_DIGIT_SELECTED') throw new Error('missing selection event');
    tableEvent.tableEntryDigit = 6;
    expect(() => replayDirectMultiplication(wrongTableEntry)).toThrow(/digit-selection event/);

    const corruptedTable = structuredClone(traceDirectMultiplication(314, 27));
    (corruptedTable.initialState.encodedMultipleTable.entries as number[])[7] += 1;
    expect(() => replayDirectMultiplication(corruptedTable)).toThrow(/invalid entry/);

    const operated = structuredClone(traceDirectMultiplication(314, 27));
    const operationEvent = operated.events.find((event) => event.type === 'OPERATION_CYCLE');
    if (!operationEvent || operationEvent.type !== 'OPERATION_CYCLE') throw new Error('missing operation event');
    operationEvent.accumulatorAfter += 1;
    expect(() => replayDirectMultiplication(operated)).toThrow(/operation-cycle event/);

    const shifted = structuredClone(traceDirectMultiplication(314, 27));
    const shiftEvent = shifted.events.find((event) => event.type === 'CARRIAGE_SHIFTED');
    if (!shiftEvent || shiftEvent.type !== 'CARRIAGE_SHIFTED') throw new Error('missing carriage event');
    shiftEvent.offsetAfter += 1;
    expect(() => replayDirectMultiplication(shifted)).toThrow(/carriage-shift event/);

    const reordered = structuredClone(traceDirectMultiplication(314, 27));
    reordered.events[1].sequence = 7;
    expect(() => replayDirectMultiplication(reordered)).toThrow(/sequence is not contiguous/);
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
