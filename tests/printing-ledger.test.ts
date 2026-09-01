import { describe, expect, it } from 'vitest';
import { createPrintingLedger, InvalidPrintingLedgerError, PRINTING_LEDGER_PRESET, replayPrintingLedger, tracePrintingLedger, transitionPrintingLedger, type PrintingLedgerAction, type PrintingLedgerEvent } from '../src/mechanisms/printing-ledger';
import { getOutputContractProfile, OUTPUT_CONTRACT_PROFILES } from '../src/exhibits/output-contracts';
const clone = <T>(value: T): T => structuredClone(value);

describe('generic P/M printing ledger', () => {
  it('persists two item lines while accumulating 12 + 8', () => {
    const trace = tracePrintingLedger(PRINTING_LEDGER_PRESET.slice(0, 2));
    expect(trace.finalState.accumulator).toBe(20);
    expect(trace.finalState.printedLines).toEqual([{ sequence: 0, kind: 'ITEM', value: 12 }, { sequence: 1, kind: 'ITEM', value: 8 }]);
  });
  it('subtotal records 20 and retains 20', () => {
    const state = tracePrintingLedger(PRINTING_LEDGER_PRESET.slice(0, 3)).finalState;
    expect(state.accumulator).toBe(20); expect(state.printedLines.at(-1)).toEqual({ sequence: 2, kind: 'SUBTOTAL', value: 20 });
  });
  it('then adds 5, prints total 25, and clears only working state', () => {
    const trace = tracePrintingLedger(PRINTING_LEDGER_PRESET);
    expect(trace.finalState.accumulator).toBe(0);
    expect(trace.finalState.printedLines.map(line => `${line.kind}:${line.value}`)).toEqual(['ITEM:12', 'ITEM:8', 'SUBTOTAL:20', 'ITEM:5', 'TOTAL:25']);
  });
  it('starts a new accumulation after total without erasing the old record', () => {
    const closed = tracePrintingLedger(PRINTING_LEDGER_PRESET).finalState;
    const next = transitionPrintingLedger(closed, { type: 'ADD_ITEM', amount: 7 }).state;
    expect(next.accumulator).toBe(7); expect(next.printedLines).toHaveLength(6); expect(next.printedLines[4]).toMatchObject({ kind: 'TOTAL', value: 25 });
  });
  it('is deterministic and replayable', () => {
    const left = tracePrintingLedger(PRINTING_LEDGER_PRESET); const right = tracePrintingLedger(PRINTING_LEDGER_PRESET);
    expect(left).toEqual(right); expect(replayPrintingLedger(left)).toEqual(left.finalState);
  });
  it.each(['sequence', 'value', 'before', 'after', 'kind', 'final', 'omit', 'action'] as const)('rejects %s tampering', kind => {
    const trace = clone(tracePrintingLedger(PRINTING_LEDGER_PRESET));
    if (kind === 'sequence') trace.events[1].sequence = 9;
    if (kind === 'value') trace.events[0].line.value = 99;
    if (kind === 'before') trace.events[1].accumulatorBefore += 1;
    if (kind === 'after') trace.events[1].accumulatorAfter += 1;
    if (kind === 'kind') trace.events[2].line.kind = 'TOTAL';
    if (kind === 'final') trace.finalState.accumulator = 25;
    if (kind === 'omit') trace.events.pop();
    if (kind === 'action') (trace.actions[0] as { amount?: number }).amount = 13;
    expect(() => replayPrintingLedger(trace)).toThrow(InvalidPrintingLedgerError);
  });
  it('fails closed for unknown/invalid/unsafe operations', () => {
    expect(() => transitionPrintingLedger(createPrintingLedger(), { type: 'BAD' } as unknown as PrintingLedgerAction)).toThrow(/unsupported/);
    expect(() => transitionPrintingLedger(createPrintingLedger(), { type: 'ADD_ITEM', amount: 0 })).toThrow(InvalidPrintingLedgerError);
    expect(() => transitionPrintingLedger(createPrintingLedger(), { type: 'ADD_ITEM', amount: 1.5 })).toThrow(InvalidPrintingLedgerError);
    expect(() => transitionPrintingLedger(createPrintingLedger(), { type: 'PRINT_SUBTOTAL' })).toThrow(/requires accumulated/);
    const trace = tracePrintingLedger([{ type: 'ADD_ITEM', amount: 1 }]); trace.events[0] = { ...trace.events[0], type: 'BAD' } as unknown as PrintingLedgerEvent;
    expect(() => replayPrintingLedger(trace)).toThrow();
  });
});

describe('typed output-contract provenance', () => {
  it('has unique required profiles and valid two-axis source metadata', () => {
    const ids = OUTPUT_CONTRACT_PROFILES.map(profile => profile.id); expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(['burroughs-calculator-register', 'burroughs-class-3', 'burroughs-style-9', 'swalm-us885202', 'difference-engine-output']));
    for (const profile of OUTPUT_CONTRACT_PROFILES) { expect(profile.sourceLabel.trim()).not.toBe(''); expect(() => new URL(profile.sourceUrl)).not.toThrow(); expect(['H', 'R', 'H/R']).toContain(profile.claimType); expect(['E1', 'E2', 'E3', 'E4']).toContain(profile.evidenceStrength); expect(profile.notEstablished.length).toBeGreaterThan(0); }
  });
  it('keeps generic event timing out of historical profiles', () => {
    const text = JSON.stringify(OUTPUT_CONTRACT_PROFILES); expect(text).not.toContain('ITEM_RECORDED → SUBTOTAL_RECORDED');
    expect(getOutputContractProfile('swalm-us885202').notEstablished.some(item => item.en.includes('repository ledger'))).toBe(true);
    expect(getOutputContractProfile('difference-engine-output').notEstablished.some(item => item.en.includes('historical phases'))).toBe(true);
  });
  it('fails closed for unknown profile IDs', () => { expect(() => getOutputContractProfile('bad' as never)).toThrow(/unknown output-contract profile/); });
});
