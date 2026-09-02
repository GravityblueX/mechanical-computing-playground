import { describe, expect, it } from 'vitest';
import {
  carryBoundarySummaries,
  createComplementRegister,
  ninesComplement,
  replayComplementSubtraction,
  traceComplementSubtraction,
  transitionComplementRegister,
} from '../src/mechanisms/complement-register';

const clone = <T>(value: T): T => structuredClone(value);

describe('generic compact P/M complement register', () => {
  it('computes fixed-width mathematical nines complement and is involutive', () => {
    expect(ninesComplement(1234, 4)).toBe(8765);
    for (const value of [0, 1, 99, 1234, 9999]) expect(ninesComplement(ninesComplement(value, 4), 4)).toBe(value);
  });

  it.each([
    { a: 5678, b: 1234, result: 4444 },
    { a: 1200, b: 345, result: 855 },
    { a: 5678, b: 0, result: 5678 },
    { a: 5678, b: 5678, result: 0 },
  ])('derives $a - $b = $result in one compact action', ({ a, b, result }) => {
    const trace = traceComplementSubtraction(a, b, 4);
    expect(trace.finalState.subtractionReadout).toBe(result);
    expect(trace.finalState.actionCount).toBe(1);
    expect(trace.events).toHaveLength(6);
    expect(trace.events.map(event => event.type)).toEqual([
      'FORWARD_ADD_BEGIN',
      'CARRY_BOUNDARY_SUMMARY',
      'CARRY_BOUNDARY_SUMMARY',
      'CARRY_BOUNDARY_SUMMARY',
      'REGISTER_ADVANCED',
      'FORWARD_ADD_END',
    ]);
  });

  it('summarizes crossings at multiple decimal boundaries exactly', () => {
    expect(carryBoundarySummaries(8799, 345, 4)).toEqual([
      { order: 0, boundary: 10, crossingCount: 35 },
      { order: 1, boundary: 100, crossingCount: 4 },
      { order: 2, boundary: 1000, crossingCount: 1 },
    ]);
  });

  it('keeps event count bounded by width, not subtrahend magnitude', () => {
    for (const b of [0, 1, 345, 1200]) expect(traceComplementSubtraction(1200, b, 4).events).toHaveLength(6);
    for (let width = 1; width <= 15; width += 1) {
      const trace = traceComplementSubtraction(0, 0, width);
      expect(trace.events.length).toBeLessThanOrEqual(width + 2);
    }
  });

  it('handles one large width-15 action with a small event list', () => {
    const a = 999_999_999_999_998;
    const b = 888_888_888_888_888;
    const trace = traceComplementSubtraction(a, b, 15);
    expect(trace.finalState.subtractionReadout).toBe(111_111_111_111_110);
    expect(trace.events).toHaveLength(17);
    expect(trace.events.filter(event => event.type === 'CARRY_BOUNDARY_SUMMARY')).toHaveLength(14);
  });

  it('uses no per-unit public transition events or exported increment helper', async () => {
    const module = await import('../src/mechanisms/complement-register');
    expect(Object.keys(module)).not.toContain('incrementComplementRegister');
    expect(traceComplementSubtraction(999_999, 999_999, 6).events.some(event => event.type === ('REGISTER_INCREMENTED' as string))).toBe(false);
  });

  it('is deterministic and replayable', () => {
    expect(traceComplementSubtraction(1200, 345, 4)).toEqual(traceComplementSubtraction(1200, 345, 4));
    const trace = traceComplementSubtraction(5678, 1234, 4);
    expect(replayComplementSubtraction(trace)).toEqual(trace.finalState);
  });

  it.each(['action', 'summary', 'order', 'final', 'version', 'extra', 'unknown'] as const)('fails closed on %s tampering', kind => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    if (kind === 'action') trace.action.subtrahend += 1;
    if (kind === 'summary') {
      const event = trace.events.find(item => item.type === 'CARRY_BOUNDARY_SUMMARY');
      if (event?.type === 'CARRY_BOUNDARY_SUMMARY') event.crossingCount += 1;
    }
    if (kind === 'order') [trace.events[1], trace.events[2]] = [trace.events[2], trace.events[1]];
    if (kind === 'final') trace.finalState.subtractionReadout += 1;
    if (kind === 'version') (trace as unknown as { version: number }).version = 1;
    if (kind === 'extra') Object.assign(trace.action, { extra: true });
    if (kind === 'unknown') (trace.events[0] as { type: string }).type = 'UNKNOWN';
    expect(() => replayComplementSubtraction(trace)).toThrow();
  });

  it('rejects invalid width/value, underflow, overflow-shaped state and unknown action', () => {
    expect(() => traceComplementSubtraction(3, 4, 1)).toThrow(/0 <= B <= A/);
    expect(() => createComplementRegister(0, 0)).toThrow(/width/);
    expect(() => createComplementRegister(100, 2)).toThrow(/fit/);
    const state = createComplementRegister(9, 1);
    expect(() => transitionComplementRegister({ ...state, modulus: 100 }, { type: 'ADD_SUBTRAHEND_FORWARD', cycleId: 'bad', subtrahend: 0 })).toThrow(/modulus/);
    expect(() => transitionComplementRegister(createComplementRegister(12, 2), { type: 'UNKNOWN', cycleId: 'x', subtrahend: 1 } as never)).toThrow(/unsupported complement action/);
  });
});
