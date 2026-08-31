import { describe, expect, it } from 'vitest';
import {
  createIntegrator,
  integrate,
  InvalidIntegratorStateError,
  replayIntegrator,
  traceIntegratorActions,
  transitionIntegrator,
  type IntegratorEvent,
} from '../src/mechanisms/continuous-integrator';
import {
  createContinuousFlowTrace,
  InvalidContinuousFlowError,
  replayContinuousFlow,
  stateAtContinuousEvent,
  type ContinuousFlowEvent,
} from '../src/exhibits/continuous-flow';

const clone = <T>(value: T): T => structuredClone(value);

describe('continuous integrator P/M inspection model', () => {
  it('integrates a constant relation and preserves the compatibility wrapper', () => {
    let state = createIntegrator(2, 0.5);
    for (let i = 0; i < 4; i += 1) state = integrate(state);
    expect(state.independentQuantity).toBe(2);
    expect(state.integratedQuantity).toBe(4);
    expect(state.sampleCount).toBe(4);
  });

  it('emits observation, coordinate advance, then integrated advance', () => {
    const result = transitionIntegrator(createIntegrator(3, 0.5), { type: 'OBSERVE_AND_INTEGRATE', cycleId: 'one' });
    expect(result.events.map((event) => event.type)).toEqual(['INPUT_QUANTITY_OBSERVED', 'INDEPENDENT_QUANTITY_ADVANCED', 'INTEGRATED_QUANTITY_ADVANCED']);
    expect(result.state).toMatchObject({ independentQuantity: 0.5, integratedQuantity: 1.5, sampleCount: 1, nextSequence: 3 });
  });

  it('is deterministic, replayable, and rejects sequence/arithmetic tampering', () => {
    const actions = [{ type: 'OBSERVE_AND_INTEGRATE' as const, cycleId: 'a', inputQuantity: 3 }, { type: 'OBSERVE_AND_INTEGRATE' as const, cycleId: 'b', inputQuantity: 3 }];
    const trace = traceIntegratorActions(createIntegrator(0, 0.5), actions);
    expect(traceIntegratorActions(createIntegrator(0, 0.5), actions)).toEqual(trace);
    expect(replayIntegrator(trace)).toEqual(trace.finalState);
    const sequence = clone(trace); sequence.events[1].sequence += 1;
    expect(() => replayIntegrator(sequence)).toThrow(InvalidIntegratorStateError);
    const arithmetic = clone(trace);
    const advance = arithmetic.events.find((event) => event.type === 'INTEGRATED_QUANTITY_ADVANCED');
    if (advance?.type === 'INTEGRATED_QUANTITY_ADVANCED') advance.integratedAfter += 1;
    expect(() => replayIntegrator(arithmetic)).toThrow(InvalidIntegratorStateError);
  });

  it('rejects invalid numbers, intervals, unknown actions, and unknown events', () => {
    expect(() => createIntegrator(Number.NaN, 0.5)).toThrow(InvalidIntegratorStateError);
    expect(() => createIntegrator(1, 0)).toThrow(InvalidIntegratorStateError);
    expect(() => transitionIntegrator(createIntegrator(), { type: 'BAD' } as never)).toThrow(/unknown integrator action/);
    expect(() => replayIntegrator({ initialState: createIntegrator(), actions: [], events: [{ mechanismId: 'continuous-integrator', cycleId: 'x', sequence: 0, claimType: 'P\/M', type: 'BAD' } as unknown as IntegratorEvent], finalState: createIntegrator() })).toThrow(/unknown integrator event/);
  });
});

describe('continuous mechanics teaching flow', () => {
  it('makes the adder relation explicit and reaches 1.5 only after integration/output', () => {
    const trace = createContinuousFlowTrace();
    const sumEvent = trace.events.find((event) => event.type === 'ADDER_RELATION_APPLIED');
    expect(sumEvent).toMatchObject({ inputA: 2, inputB: 1, sum: 3 });
    const integratedIndex = trace.events.findIndex((event) => event.type === 'INTEGRATOR_EVENT' && event.integratorEvent.type === 'INTEGRATED_QUANTITY_ADVANCED');
    expect(stateAtContinuousEvent(trace, integratedIndex).integrator.integratedQuantity).toBe(0);
    expect(stateAtContinuousEvent(trace, integratedIndex + 1).integrator.integratedQuantity).toBe(1.5);
    expect(stateAtContinuousEvent(trace, trace.events.length - 1).tracerOutput).toBeNull();
    expect(trace.finalState.tracerOutput).toBe(1.5);
  });

  it('repeated cycles deterministically advance coordinate and accumulated output', () => {
    const trace = createContinuousFlowTrace(undefined, 2);
    expect(trace.finalState).toMatchObject({ cycleCount: 2, tracerOutput: 3 });
    expect(trace.finalState.integrator).toMatchObject({ independentQuantity: 1, integratedQuantity: 3, sampleCount: 2 });
    expect(replayContinuousFlow(trace)).toEqual(trace.finalState);
    expect(createContinuousFlowTrace(undefined, 2)).toEqual(trace);
  });

  it.each(['sequence', 'sum', 'integration', 'final', 'claim'] as const)('rejects %s tampering', (kind) => {
    const trace = clone(createContinuousFlowTrace());
    if (kind === 'sequence') trace.events[2].sequence += 1;
    if (kind === 'sum') {
      const event = trace.events.find((item) => item.type === 'ADDER_RELATION_APPLIED');
      if (event?.type === 'ADDER_RELATION_APPLIED') event.sum += 1;
    }
    if (kind === 'integration') {
      const event = trace.events.find((item) => item.type === 'INTEGRATOR_EVENT' && item.integratorEvent.type === 'INTEGRATED_QUANTITY_ADVANCED');
      if (event?.type === 'INTEGRATOR_EVENT' && event.integratorEvent.type === 'INTEGRATED_QUANTITY_ADVANCED') event.integratorEvent.contribution += 1;
    }
    if (kind === 'final') trace.finalState.tracerOutput = 99;
    if (kind === 'claim') trace.events[0].claimType = 'H' as 'P/M';
    expect(() => replayContinuousFlow(trace)).toThrow();
  });

  it('rejects invalid fixtures and unknown flow events', () => {
    expect(() => createContinuousFlowTrace({ inputA: Infinity, inputB: 1, inspectionInterval: 0.5 })).toThrow(InvalidContinuousFlowError);
    const trace = createContinuousFlowTrace();
    trace.events[0] = { ...trace.events[0], type: 'BAD' } as unknown as ContinuousFlowEvent;
    expect(() => replayContinuousFlow(trace)).toThrow(/unknown continuous-flow event/);
  });
});
