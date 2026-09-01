import { describe, expect, it } from 'vitest';
import {
  createOperatorDivision,
  InvalidDivisionStateError,
  quotientValue,
  reduceDivisionEvent,
  replayOperatorDivision,
  traceOperatorDivision,
  transitionOperatorDivision,
  type DivisionAction,
  type DivisionEvent,
  type OperatorDivisionTrace,
} from '../src/mechanisms/operator-division';

const clone = <T>(value: T): T => structuredClone(value);
const renumber = (events: DivisionEvent[]): DivisionEvent[] => events.map((event, sequence) => ({ ...event, sequence }));

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

  it.each([
    { label: '19 ÷ 2', dividend: 19, divisor: 2, offset: 0, quotient: 9, remainder: 1, digits: [9] },
    { label: '190 ÷ 2', dividend: 190, divisor: 2, offset: 1, quotient: 95, remainder: 0, digits: [5, 9] },
    { label: '100 ÷ 10', dividend: 100, divisor: 10, offset: 1, quotient: 10, remainder: 0, digits: [0, 1] },
    { label: '0 ÷ 3', dividend: 0, divisor: 3, offset: 1, quotient: 0, remainder: 0, digits: [0, 0] },
  ])('finishes $label across quotient-nine and exact-zero boundaries', ({ dividend, divisor, offset, quotient, remainder, digits }) => {
    const trace = traceOperatorDivision(dividend, divisor, offset);
    expect(quotientValue(trace.finalState)).toBe(quotient);
    expect(trace.finalState).toMatchObject({ residual: remainder, phase: 'COMPLETE', quotientDigits: digits });
    expect(replayOperatorDivision(trace)).toEqual(trace.finalState);
  });

  it('rejects a quotient that cannot fit the configured carriage capacity', () => {
    expect(() => traceOperatorDivision(20, 2, 0)).toThrow(/quotient capacity is too small/);
  });

  it('rejects a forged tenth subtraction that does not overshoot', () => {
    let state = createOperatorDivision(20, 2, 0);
    for (let index = 0; index < 9; index += 1) {
      state = transitionOperatorDivision(state, { type: 'SUBTRACT_ONCE', cycleId: `s${index}` }).state;
    }

    const forged: DivisionEvent = {
      mechanismId: state.mechanismId,
      cycleId: 'forged-capacity-overflow',
      sequence: 0,
      type: 'SUBTRACT_ONCE',
      offset: 0,
      contribution: 2,
      residualBefore: 2,
      residualAfter: 0,
      quotientBefore: 9,
      quotientAfter: 10,
      operationBefore: 9,
      operationAfter: 10,
      humanBefore: 9,
      humanAfter: 10,
    };

    expect(() => reduceDivisionEvent(state, forged)).toThrow(/invalid subtraction event/);
  });

  it('requires correction after overshoot and correction reverses the quotient step', () => {
    let state = createOperatorDivision(8478, 314, 1);
    for (let index = 0; index < 2; index += 1) state = transitionOperatorDivision(state, { type: 'SUBTRACT_ONCE', cycleId: `s${index}` }).state;
    const overshoot = transitionOperatorDivision(state, { type: 'SUBTRACT_ONCE', cycleId: 's2' });
    expect(overshoot.events.map((event) => event.type)).toEqual(['SUBTRACT_ONCE', 'OVERSHOOT_DETECTED']);
    const subtractionState = reduceDivisionEvent(state, overshoot.events[0]);
    expect(subtractionState).toMatchObject({ residual: -942, phase: 'OVERSHOOT_PENDING', quotientDigits: [0, 3] });
    expect(reduceDivisionEvent(subtractionState, overshoot.events[1])).toEqual(overshoot.state);
    state = overshoot.state;
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

  it('reduces every event prefix and exposes detection before correction is required', () => {
    const trace = traceOperatorDivision(19, 2, 0);
    const states = [clone(trace.initialState)];
    for (const event of trace.events) states.push(reduceDivisionEvent(states.at(-1)!, event));

    const overshootIndex = trace.events.findIndex((event) => event.type === 'SUBTRACT_ONCE' && event.residualAfter < 0);
    expect(overshootIndex).toBeGreaterThanOrEqual(0);
    expect(trace.events[overshootIndex + 1].type).toBe('OVERSHOOT_DETECTED');
    expect(states[overshootIndex + 1]).toMatchObject({ residual: -1, phase: 'OVERSHOOT_PENDING', quotientDigits: [10] });
    expect(states[overshootIndex + 2]).toMatchObject({ residual: -1, phase: 'CORRECTION_REQUIRED', quotientDigits: [10] });
    expect(states).toHaveLength(trace.events.length + 1);
    expect(states.at(-1)).toEqual(trace.finalState);
  });

  it('rejects an omitted overshoot-detection event', () => {
    const trace = clone(traceOperatorDivision(19, 2, 0));
    const detectedIndex = trace.events.findIndex((event) => event.type === 'OVERSHOOT_DETECTED');
    trace.events.splice(detectedIndex, 1);
    trace.events = renumber(trace.events);
    expect(() => replayOperatorDivision(trace)).toThrow(/invalid correction event/);
  });

  it('rejects a duplicated overshoot-detection event', () => {
    const trace = clone(traceOperatorDivision(19, 2, 0));
    const detectedIndex = trace.events.findIndex((event) => event.type === 'OVERSHOOT_DETECTED');
    trace.events.splice(detectedIndex + 1, 0, clone(trace.events[detectedIndex]));
    trace.events = renumber(trace.events);
    expect(() => replayOperatorDivision(trace)).toThrow(/invalid overshoot event/);
  });

  it.each([
    'missing-actions',
    'forged-action',
    'event-cycle',
    'collapsed-event-cycles',
    'collapsed-action-and-event-cycles',
    'empty-forgery',
  ] as const)('rejects %s provenance tampering', (kind) => {
    const trace = clone(traceOperatorDivision(19, 2, 0));

    if (kind === 'missing-actions') trace.actions = [];
    if (kind === 'forged-action') {
      trace.actions[0] = { type: 'DIVISION_COMPLETE', cycleId: trace.actions[0].cycleId };
    }
    if (kind === 'event-cycle') {
      const detected = trace.events.find((event) => event.type === 'OVERSHOOT_DETECTED')!;
      detected.cycleId = 'forged-detection-cycle';
    }
    if (kind === 'collapsed-event-cycles') {
      for (const event of trace.events) event.cycleId = 'collapsed-cycle';
    }
    if (kind === 'collapsed-action-and-event-cycles') {
      for (const action of trace.actions) action.cycleId = 'collapsed-cycle';
      for (const event of trace.events) event.cycleId = 'collapsed-cycle';
    }
    if (kind === 'empty-forgery') {
      trace.actions = [];
      trace.events = [];
      trace.initialState = {
        ...trace.initialState,
        residual: 999,
        quotientDigits: [7],
        phase: 'COMPLETE',
        placeExhausted: true,
      };
      trace.finalState = clone(trace.initialState);
    }

    expect(() => replayOperatorDivision(trace)).toThrow();
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
