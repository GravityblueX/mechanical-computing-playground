import { describe, expect, it } from 'vitest';
import {
  createOperatorDivision,
  InvalidDivisionStateError,
  quotientValue,
  replayOperatorDivision,
  traceOperatorDivision,
  transitionOperatorDivision,
  type DivisionAction,
  type OperatorDivisionTrace,
} from '../src/mechanisms/operator-division';

const clone = <T>(value: T): T => structuredClone(value);

describe('generic operator-driven division', () => {
  it('subtracts once at the carriage place and advances its quotient digit', () => {
    const initial = createOperatorDivision(8478, 314, 1);
    const result = transitionOperatorDivision(initial, { type: 'SUBTRACT_ONCE', cycleId: 'tens-1' });
    expect(result.state).toMatchObject({ residual: 5338, quotientDigits: [0, 1], operationCount: 1 });
    expect(result.events[0]).toMatchObject({ contribution: 3140, residualBefore: 8478, residualAfter: 5338, quotientBefore: 0, quotientAfter: 1 });
  });

  it('derives 8478 ÷ 314 = 27 through subtraction, overshoot, correction and shift', () => {
    const trace = traceOperatorDivision(8478, 314, 1);
    expect(quotientValue(trace.finalState)).toBe(27);
    expect(trace.finalState).toMatchObject({ residual: 0, phase: 'COMPLETE', quotientDigits: [7, 2] });
    expect(trace.events.filter((event) => event.type === 'SUBTRACT_ONCE')).toHaveLength(10);
    expect(trace.events.filter((event) => event.type === 'OVERSHOOT_DETECTED')).toMatchObject([{ offset: 1, residual: -942 }]);
    expect(trace.events.some((event) => event.type === 'CORRECT_ADD_BACK')).toBe(true);
    expect(trace.events.some((event) => event.type === 'SHIFT_CARRIAGE_DOWN')).toBe(true);
    expect(trace.events.some((event) => event.type === ('DIVIDE_RESULT' as string))).toBe(false);
  });

  it('derives 1000 ÷ 64 = 15 remainder 40 through explicit cycles', () => {
    const trace = traceOperatorDivision(1000, 64, 1);
    expect(quotientValue(trace.finalState)).toBe(15);
    expect(trace.finalState).toMatchObject({ residual: 40, phase: 'COMPLETE' });
    expect(trace.events.filter((event) => event.type === 'SUBTRACT_ONCE').length).toBeGreaterThan(2);
  });

  it('requires correction after overshoot and correction reverses the quotient step', () => {
    let state = createOperatorDivision(8478, 314, 1);
    for (let index = 0; index < 3; index += 1) state = transitionOperatorDivision(state, { type: 'SUBTRACT_ONCE', cycleId: `s${index}` }).state;
    expect(state).toMatchObject({ residual: -942, phase: 'CORRECTION_REQUIRED', quotientDigits: [0, 3] });
    expect(() => transitionOperatorDivision(state, { type: 'SUBTRACT_ONCE', cycleId: 'blocked' })).toThrow(InvalidDivisionStateError);
    expect(() => transitionOperatorDivision(state, { type: 'SHIFT_CARRIAGE_DOWN', cycleId: 'blocked' })).toThrow(InvalidDivisionStateError);
    const corrected = transitionOperatorDivision(state, { type: 'CORRECT_ADD_BACK', cycleId: 'correct' });
    expect(corrected.state).toMatchObject({ residual: 2198, phase: 'READY', placeExhausted: true, quotientDigits: [0, 2] });
    expect(corrected.events[0]).toMatchObject({ contribution: 3140, residualBefore: -942, residualAfter: 2198, quotientBefore: 3, quotientAfter: 2 });
  });

  it('rejects zero divisor, invalid offsets, premature shifts and premature completion', () => {
    expect(() => createOperatorDivision(10, 0, 0)).toThrow(InvalidDivisionStateError);
    expect(() => createOperatorDivision(10, 2, -1)).toThrow(InvalidDivisionStateError);
    const state = createOperatorDivision(10, 2, 0);
    expect(() => transitionOperatorDivision(state, { type: 'SHIFT_CARRIAGE_DOWN', cycleId: 'bad' })).toThrow(InvalidDivisionStateError);
    expect(() => transitionOperatorDivision(state, { type: 'DIVISION_COMPLETE', cycleId: 'bad' })).toThrow(InvalidDivisionStateError);
  });

  it('rejects an unknown serialized action instead of completing the division', () => {
    const action = { type: 'UNKNOWN', cycleId: 'unknown' } as unknown as DivisionAction;
    expect(() => transitionOperatorDivision(createOperatorDivision(0, 3, 0), action)).toThrow(/unsupported operator-division action type/);
  });

  it('is deterministic and replayable', () => {
    expect(traceOperatorDivision(8478, 314, 1)).toEqual(traceOperatorDivision(8478, 314, 1));
    const trace = traceOperatorDivision(1000, 64, 1);
    expect(replayOperatorDivision(trace)).toEqual(trace.finalState);
  });

  it('rejects an unknown serialized event instead of treating it as division completion', () => {
    const trace = clone(traceOperatorDivision(0, 3, 0));
    (trace.events[0] as { type: string }).type = 'UNKNOWN';
    expect(() => replayOperatorDivision(trace)).toThrow(/unsupported operator-division event type/);
  });

  it.each(['sequence', 'arithmetic', 'quotient', 'correction', 'final'] as const)('rejects %s tampering', (kind) => {
    const trace = clone(traceOperatorDivision(8478, 314, 1));
    if (kind === 'sequence') trace.events[1].sequence += 1;
    if (kind === 'arithmetic') {
      const event = trace.events.find((item) => item.type === 'SUBTRACT_ONCE');
      if (event?.type === 'SUBTRACT_ONCE') event.residualAfter += 1;
    }
    if (kind === 'quotient') {
      const event = trace.events.find((item) => item.type === 'SUBTRACT_ONCE');
      if (event?.type === 'SUBTRACT_ONCE') event.quotientAfter += 1;
    }
    if (kind === 'correction') {
      const event = trace.events.find((item) => item.type === 'CORRECT_ADD_BACK');
      if (event?.type === 'CORRECT_ADD_BACK') event.contribution += 1;
    }
    if (kind === 'final') trace.finalState.residual += 1;
    expect(() => replayOperatorDivision(trace as OperatorDivisionTrace)).toThrow();
  });
});
