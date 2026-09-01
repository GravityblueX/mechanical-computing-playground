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
  type DirectMultiplierEvent,
} from '../src/mechanisms/direct-multiplier';
import { compare314x27 } from '../src/exhibits/multiplication-compare';

function reverseObjectKeyOrder<T extends object>(value: T): T {
  return Object.fromEntries(Object.entries(value).reverse()) as T;
}

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
    expect(trace.action).toEqual({ type: 'DIRECT_MULTIPLY', multiplier: 27 });
    expect(operations).toHaveLength(2);
    expect(trace.finalState.operationCycleCount).not.toBe(27);
  });

  it('replays from the recorded action and ordered events and is deterministic', () => {
    const trace = traceDirectMultiplication(314, 27);
    expect(traceDirectMultiplication(314, 27)).toEqual(trace);
    expect(replayDirectMultiplication(trace)).toEqual(trace.finalState);
  });

  it('accepts semantically identical event objects regardless of member insertion order', () => {
    const canonical = traceDirectMultiplication(314, 27);
    const reordered = structuredClone(canonical);
    reordered.events = reordered.events.map(reverseObjectKeyOrder);

    expect(JSON.stringify(reordered.events[0])).not.toBe(JSON.stringify(canonical.events[0]));
    expect(replayDirectMultiplication(reordered)).toEqual(canonical.finalState);
  });

  it('accepts a JSON round trip without weakening event provenance', () => {
    const trace = traceDirectMultiplication(314, 27);
    const parsed = JSON.parse(JSON.stringify(trace)) as typeof trace;

    expect(replayDirectMultiplication(parsed)).toEqual(trace.finalState);
  });

  it('keeps action metadata forward-compatible while treating only serialized event fields as authoritative', () => {
    const actionMetadata = structuredClone(traceDirectMultiplication(314, 27)) as ReturnType<typeof traceDirectMultiplication> & {
      action: ReturnType<typeof traceDirectMultiplication>['action'] & { note?: unknown };
    };
    actionMetadata.action.note = { source: 'future-extension' };
    expect(replayDirectMultiplication(actionMetadata)).toEqual(actionMetadata.finalState);

    const undefinedEventField = structuredClone(traceDirectMultiplication(314, 27));
    (undefinedEventField.events[0] as DirectMultiplierEvent & { note?: unknown }).note = undefined;
    expect(replayDirectMultiplication(undefinedEventField)).toEqual(undefinedEventField.finalState);
    const parsed = JSON.parse(JSON.stringify(undefinedEventField)) as typeof undefinedEventField;
    expect('note' in parsed.events[0]).toBe(false);
    expect(replayDirectMultiplication(parsed)).toEqual(parsed.finalState);

    const definedEventField = structuredClone(traceDirectMultiplication(314, 27));
    (definedEventField.events[0] as DirectMultiplierEvent & { note?: unknown }).note = true;
    expect(() => replayDirectMultiplication(definedEventField)).toThrow(/action\/event mismatch/);
  });

  it('preserves event array order and rejects real event-value changes', () => {
    const reordered = structuredClone(traceDirectMultiplication(314, 27));
    const first = reordered.events[0];
    const second = reordered.events[1];
    reordered.events[0] = { ...second, sequence: 0 };
    reordered.events[1] = { ...first, sequence: 1 };
    expect(() => replayDirectMultiplication(reordered)).toThrow(/operation-cycle event/);

    const changed = structuredClone(traceDirectMultiplication(314, 27));
    const selected = changed.events.find((event) => event.type === 'MULTIPLIER_DIGIT_SELECTED');
    if (!selected || selected.type !== 'MULTIPLIER_DIGIT_SELECTED') throw new Error('missing selection event');
    selected.selectedMultiple += 1;
    expect(() => replayDirectMultiplication(changed)).toThrow(/digit-selection event/);
  });

  it('rejects replacing the events and final state with another multiplier operation', () => {
    const trace = structuredClone(traceDirectMultiplication(314, 27));
    const alternate = traceDirectMultiplication(314, 28);
    trace.events = structuredClone(alternate.events);
    trace.finalState = structuredClone(alternate.finalState);

    expect(() => replayDirectMultiplication(trace)).toThrow(/action\/event mismatch/);
  });

  it.each([
    [314, 0, 0],
    [1, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  ])('binds multiplier %i at the supported boundary', (multiplicand, multiplier, expected) => {
    const trace = traceDirectMultiplication(multiplicand, multiplier);
    expect(trace.action.multiplier).toBe(multiplier);
    expect(replayDirectMultiplication(trace).accumulator).toBe(expected);
  });

  it('rejects missing, unknown, and unsafe recorded actions', () => {
    const missing = structuredClone(traceDirectMultiplication(314, 27));
    delete (missing as Partial<typeof missing>).action;
    (missing.events[0] as { type: string }).type = 'UNKNOWN';
    expect(() => replayDirectMultiplication(missing)).toThrow(/action type/);

    const unknown = structuredClone(traceDirectMultiplication(314, 27));
    (unknown.action as { type: string }).type = 'UNKNOWN';
    expect(() => replayDirectMultiplication(unknown)).toThrow(/action type/);

    const unsafe = structuredClone(traceDirectMultiplication(314, 27));
    unsafe.action.multiplier = Number.MAX_SAFE_INTEGER + 1;
    unsafe.initialState.accumulator = -1;
    expect(() => replayDirectMultiplication(unsafe)).toThrow(
      'multiplier must be a non-negative safe integer',
    );
  });

  it('rejects a valid but non-canonical initial state before consuming events', () => {
    const trace = structuredClone(traceDirectMultiplication(314, 27));
    trace.initialState.accumulator = 1;

    expect(() => replayDirectMultiplication(trace)).toThrow(/initial state.*recorded action/);
  });

  it('rejects a recorded final state that does not match replayed events', () => {
    const trace = structuredClone(traceDirectMultiplication(314, 27));
    trace.finalState.accumulator += 1;
    expect(() => replayDirectMultiplication(trace)).toThrow(/recorded final state/);
  });

  it('rejects an unknown serialized event type instead of treating it as a carriage shift', () => {
    const trace = structuredClone(traceDirectMultiplication(314, 27));
    (trace.events[2] as { type: string }).type = 'UNKNOWN';
    expect(() => replayDirectMultiplication(trace)).toThrow(/unsupported direct multiplication event type/);
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
    expect(comparison.historicalProtocolEvidence.patent).toMatchObject({ claimType: 'H', evidenceStrength: 'E1', source: expect.stringMatching(/US 558,913.*pp\. 1–2, 5–6, 9/) });
    expect(comparison.historicalProtocolEvidence.patent.supports).toMatch(/multiplier lever\/scale.*one complete crank rotation.*left-starting.*convenience/);
    expect(comparison.historicalProtocolEvidence.patent.notEstablished).toMatch(/production-wide geometry.*timing.*universal multiplier-digit direction\/carriage protocol/);
    expect(comparison.historicalProtocolEvidence.survivingControls).toMatchObject({ claimType: 'H', evidenceStrength: 'E1', source: expect.stringMatching(/MA\.328619.*MA\.323594.*MA\.333940/) });
    expect(comparison.historicalProtocolEvidence.survivingControls.supports).toMatch(/0–9 multiplier control.*A\/M\/D\/S selector.*multiplier-or-quotient.*carriage-shift control/);
    expect(comparison.historicalProtocolEvidence.repositoryModel).toMatchObject({ claimType: 'P/M' });
    expect(comparison.historicalProtocolEvidence.repositoryModel.supports).toMatch(/select 7, operate, shift one decimal place, select 2, operate/);
    expect(comparison.historicalProtocolEvidence.repositoryModel.notEstablished).toMatch(/historical production digit order.*automatic\/manual shift.*physical timing.*lookup table.*control plates/);
    expect(comparison.paths.steppedDrum.operatorRepetitions).toBe(9);
    expect(comparison.paths.pinwheel.operatorRepetitions).toBe(9);
  });
});
