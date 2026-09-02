import { describe, expect, it } from 'vitest';
import {
  createComplementRegister,
  ninesComplement,
  replayComplementSubtraction,
  traceComplementSubtraction,
  transitionComplementRegister,
  type ComplementRegisterTrace,
} from '../src/mechanisms/complement-register';

const clone = <T>(value: T): T => structuredClone(value);

describe('generic P/M complement register', () => {
  it('computes fixed-width mathematical nines complement', () => {
    expect(ninesComplement(1234, 4)).toBe(8765);
  });

  it('is involutive at fixed width', () => {
    for (const value of [0, 1, 99, 1234, 9999]) expect(ninesComplement(ninesComplement(value, 4), 4)).toBe(value);
  });

  it('keeps addition and subtraction readouts complementary at every event', () => {
    const trace = traceComplementSubtraction(5678, 1234, 4);
    for (const event of trace.events) expect(event.subtractionReadout).toBe(ninesComplement(event.additionReadout, 4));
    expect(trace.finalState.subtractionReadout).toBe(4444);
  });

  it('exposes carry boundaries during 1200 - 345 = 855', () => {
    const trace = traceComplementSubtraction(1200, 345, 4);
    expect(trace.finalState.subtractionReadout).toBe(855);
    expect(trace.events.some(event => event.carriedAcross.length > 0)).toBe(true);
  });

  it.each([
    { a: 5678, b: 0, result: 5678 },
    { a: 5678, b: 5678, result: 0 },
  ])('supports boundary $a - $b', ({ a, b, result }) => {
    expect(traceComplementSubtraction(a, b, 4).finalState.subtractionReadout).toBe(result);
  });

  it('rejects unsupported underflow, invalid width/value and overflow-shaped states', () => {
    expect(() => traceComplementSubtraction(3, 4, 1)).toThrow(/0 <= B <= A/);
    expect(() => createComplementRegister(0, 0)).toThrow(/width/);
    expect(() => createComplementRegister(100, 2)).toThrow(/fit/);
    const state = createComplementRegister(9, 1);
    expect(() => transitionComplementRegister({ ...state, modulus: 100 }, { type: 'ADD_SUBTRAHEND_FORWARD', cycleId: 'bad', subtrahend: 0 })).toThrow(/modulus/);
  });

  it('is deterministic and replayable', () => {
    expect(traceComplementSubtraction(1200, 345, 4)).toEqual(traceComplementSubtraction(1200, 345, 4));
    const trace = traceComplementSubtraction(5678, 1234, 4);
    expect(replayComplementSubtraction(trace)).toEqual(trace.finalState);
  });

  it.each(['action', 'event', 'final', 'envelope'] as const)('fails closed on %s tampering', kind => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    if (kind === 'action') trace.action.subtrahend += 1;
    if (kind === 'event') trace.events[0].physicalAfter += 1;
    if (kind === 'final') trace.finalState.subtractionReadout += 1;
    if (kind === 'envelope') (trace as unknown as { version: number }).version = 2;
    expect(() => replayComplementSubtraction(trace)).toThrow();
  });

  it('rejects malformed serialized fields and unknown action types', () => {
    const trace = traceComplementSubtraction(12, 3, 2);
    Object.assign(trace.action, { extra: true });
    expect(() => replayComplementSubtraction(trace)).toThrow(/unsupported fields/);
    expect(() => transitionComplementRegister(createComplementRegister(12, 2), { type: 'UNKNOWN', cycleId: 'x', subtrahend: 1 } as never)).toThrow(/unsupported complement action/);
  });
});
