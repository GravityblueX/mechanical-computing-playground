import { describe, expect, it } from 'vitest';
import {
  createAnalyticalFlowState,
  createAnalyticalFlowTrace,
  InvalidAnalyticalFlowError,
  reduceAnalyticalFlowEvent,
  replayAnalyticalFlow,
  stateAtAnalyticalEvent,
  type AnalyticalFlowEvent,
  type AnalyticalFlowTrace,
} from '../src/exhibits/analytical-engine-flow';

const clone = <T>(value: T): T => structuredClone(value);

describe('Analytical Engine P/M information-flow trace', () => {
  it('reaches 50 through separately stored p=6 and q=10', () => {
    const trace = createAnalyticalFlowTrace();
    expect(trace.finalState.store).toMatchObject({ V5: 6, V6: 10, V7: 50 });
    expect(trace.finalState.output).toBe(50);
    expect(trace.events.filter((event) => event.type === 'MILL_OPERATION_COMPLETED').map((event) => event.result)).toEqual([6, 10, 50]);
  });

  it('associates given values with V1..V4 before arithmetic', () => {
    expect(stateAtAnalyticalEvent(createAnalyticalFlowTrace(), 4).store).toEqual({ V1: 2, V2: 3, V3: 4, V4: 5 });
  });

  it('stores p and q only after their Mill-to-Store events', () => {
    const trace = createAnalyticalFlowTrace();
    const pIndex = trace.events.findIndex((event) => event.type === 'MILL_TO_STORE' && event.target === 'V5');
    const qIndex = trace.events.findIndex((event) => event.type === 'MILL_TO_STORE' && event.target === 'V6');
    expect(stateAtAnalyticalEvent(trace, pIndex).store.V5).toBeUndefined();
    expect(stateAtAnalyticalEvent(trace, pIndex + 1).store.V5).toBe(6);
    expect(stateAtAnalyticalEvent(trace, qIndex).store.V6).toBeUndefined();
    expect(stateAtAnalyticalEvent(trace, qIndex + 1).store.V6).toBe(10);
  });

  it('does not output before V7 is stored and output role executes', () => {
    const trace = createAnalyticalFlowTrace();
    expect(stateAtAnalyticalEvent(trace, trace.events.length - 1)).toMatchObject({ store: { V7: 50 }, output: null });
    expect(trace.finalState.output).toBe(50);
  });

  it('is deterministic and replayable', () => {
    const trace = createAnalyticalFlowTrace();
    expect(createAnalyticalFlowTrace()).toEqual(trace);
    expect(replayAnalyticalFlow(trace)).toEqual(trace.finalState);
  });

  it('requires two Mill operands before operation selection', () => {
    const trace = createAnalyticalFlowTrace();
    const selected = trace.events.find((event) => event.type === 'OPERATION_SELECTED')!;
    expect(() => reduceAnalyticalFlowEvent(createAnalyticalFlowState(), { ...selected, sequence: 0 })).toThrow(InvalidAnalyticalFlowError);
  });

  it.each(['sequence', 'transfer', 'result', 'order', 'claim', 'final'] as const)('rejects %s tampering', (kind) => {
    const trace = clone(createAnalyticalFlowTrace());
    if (kind === 'sequence') trace.events[2].sequence = 7;
    if (kind === 'transfer') {
      const event = trace.events.find((item) => item.type === 'STORE_TO_MILL');
      if (event?.type === 'STORE_TO_MILL') event.value += 1;
    }
    if (kind === 'result') {
      const event = trace.events.find((item) => item.type === 'MILL_OPERATION_COMPLETED');
      if (event?.type === 'MILL_OPERATION_COMPLETED') event.result += 1;
    }
    if (kind === 'order') [trace.events[4], trace.events[6]] = [trace.events[6], trace.events[4]];
    if (kind === 'claim') (trace.events[0] as AnalyticalFlowEvent).claimType = 'H' as 'P/M';
    if (kind === 'final') trace.finalState.output = 49;
    expect(() => replayAnalyticalFlow(trace as AnalyticalFlowTrace)).toThrow();
  });

  it('rejects invalid fixture values and Store references', () => {
    expect(() => createAnalyticalFlowTrace({ a: Number.MAX_VALUE, b: 3, c: 4, d: 5 })).toThrow(InvalidAnalyticalFlowError);
    const trace = createAnalyticalFlowTrace();
    const transfer = trace.events.find((event) => event.type === 'STORE_TO_MILL')!;
    expect(() => reduceAnalyticalFlowEvent(createAnalyticalFlowState(), { ...transfer, source: 'V99', sequence: 0 } as unknown as AnalyticalFlowEvent)).toThrow(InvalidAnalyticalFlowError);
    expect(() => stateAtAnalyticalEvent(trace, -1)).toThrow(InvalidAnalyticalFlowError);
  });
});
