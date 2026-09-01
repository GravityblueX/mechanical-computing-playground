import { describe, expect, it } from 'vitest';
import {
  createAnalyticalFlowState,
  createAnalyticalFlowTrace,
  InvalidAnalyticalFlowError,
  reduceAnalyticalFlowEvent,
  replayAnalyticalFlow,
  stateAtAnalyticalEvent,
  type AnalyticalFlowEvent,
  type AnalyticalFlowState,
  type AnalyticalFlowTrace,
} from '../src/exhibits/analytical-engine-flow';

const clone = <T>(value: T): T => structuredClone(value);
const reverseObjectKeyOrder = <T extends object>(value: T): T => Object.fromEntries(Object.entries(value).reverse()) as T;

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

  it('rejects events and final state generated from a different fixture', () => {
    const trace = clone(createAnalyticalFlowTrace());
    const alternate = createAnalyticalFlowTrace({ a: 3, b: 4, c: 5, d: 6 });
    trace.events = clone(alternate.events);
    trace.finalState = clone(alternate.finalState);

    expect(() => replayAnalyticalFlow(trace)).toThrow(InvalidAnalyticalFlowError);
  });

  it('accepts semantic object-key reordering and a JSON round trip', () => {
    const canonical = createAnalyticalFlowTrace();
    const reordered = clone(canonical);
    reordered.fixture = reverseObjectKeyOrder(reordered.fixture);
    reordered.initialState = reverseObjectKeyOrder(reordered.initialState);
    reordered.events = reordered.events.map(reverseObjectKeyOrder);
    reordered.finalState = reverseObjectKeyOrder(reordered.finalState);

    expect(JSON.stringify(reordered.events[0])).not.toBe(JSON.stringify(canonical.events[0]));
    expect(replayAnalyticalFlow(reordered)).toEqual(canonical.finalState);
    expect(replayAnalyticalFlow(JSON.parse(JSON.stringify(canonical)) as AnalyticalFlowTrace)).toEqual(canonical.finalState);
  });

  it('rejects fixture-only tampering and unsupported fixture fields', () => {
    const changed = clone(createAnalyticalFlowTrace());
    changed.fixture.a = 3;
    expect(() => replayAnalyticalFlow(changed)).toThrow(/fixture\/event mismatch/);

    const extra = clone(createAnalyticalFlowTrace()) as AnalyticalFlowTrace & { fixture: AnalyticalFlowTrace['fixture'] & { note?: string } };
    extra.fixture.note = undefined;
    expect(() => replayAnalyticalFlow(extra)).toThrow(/unsupported fields/);

    const symbol = clone(createAnalyticalFlowTrace());
    Object.defineProperty(symbol.fixture, Symbol('unknown'), { enumerable: true, value: undefined });
    expect(() => replayAnalyticalFlow(symbol)).toThrow(/unsupported fields/);
  });

  it('validates the fixture before unrelated event and final-state corruption', () => {
    const trace = clone(createAnalyticalFlowTrace());
    trace.fixture.a = Number.MAX_SAFE_INTEGER + 1;
    trace.events[0] = { ...trace.events[0], type: 'UNKNOWN' } as unknown as AnalyticalFlowEvent;
    trace.finalState.output = 49;

    expect(() => replayAnalyticalFlow(trace)).toThrow('a must be a safe integer');
  });

  it('rejects a non-canonical initial state', () => {
    const trace = clone(createAnalyticalFlowTrace());
    trace.initialState.output = 0;

    expect(() => replayAnalyticalFlow(trace)).toThrow(/initial state.*fixture-derived trace/);
  });

  it('preserves event-array order and rejects extra event fields', () => {
    const reordered = clone(createAnalyticalFlowTrace());
    [reordered.events[0], reordered.events[1]] = [reordered.events[1], reordered.events[0]];
    expect(() => replayAnalyticalFlow(reordered)).toThrow(/fixture\/event mismatch/);

    const extra = clone(createAnalyticalFlowTrace());
    (extra.events[0] as AnalyticalFlowEvent & { unexpected: boolean }).unexpected = true;
    expect(() => replayAnalyticalFlow(extra)).toThrow(/fixture\/event mismatch/);
  });

  it('replays supported alternate and safe-integer boundary fixtures', () => {
    const alternate = createAnalyticalFlowTrace({ a: 3, b: 4, c: 5, d: 6 });
    expect(replayAnalyticalFlow(alternate).output).toBe(102);

    const boundary = createAnalyticalFlowTrace({ a: 1, b: Number.MAX_SAFE_INTEGER, c: 0, d: 1 });
    expect(replayAnalyticalFlow(boundary).output).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('binds fixture provenance while stepping the trace', () => {
    const trace = clone(createAnalyticalFlowTrace());
    trace.fixture.d = 6;

    expect(() => stateAtAnalyticalEvent(trace, 0)).toThrow(/fixture\/event mismatch/);

    const finalState = clone(createAnalyticalFlowTrace());
    finalState.finalState.output = 49;
    expect(() => stateAtAnalyticalEvent(finalState, 0)).toThrow(/fixture\/final state mismatch/);
  });

  it('rejects a null fixture before consuming the trace', () => {
    const trace = clone(createAnalyticalFlowTrace());
    (trace as unknown as { fixture: null }).fixture = null;

    expect(() => replayAnalyticalFlow(trace)).toThrow('fixture must be an object');
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])('rejects non-finite fixture value %s', (value) => {
    const trace = clone(createAnalyticalFlowTrace());
    trace.fixture.a = value;

    expect(() => replayAnalyticalFlow(trace)).toThrow('a must be a safe integer');
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])('does not equate non-finite state value %s with null', (value) => {
    const initial = clone(createAnalyticalFlowTrace());
    initial.initialState.currentCardRole = value as unknown as AnalyticalFlowState['currentCardRole'];
    expect(() => replayAnalyticalFlow(initial)).toThrow(/initial state.*fixture-derived trace/);

    const final = clone(createAnalyticalFlowTrace());
    final.finalState.mill.result = value;
    expect(() => replayAnalyticalFlow(final)).toThrow(/fixture\/final state mismatch/);
  });

  it('rejects enumerable undefined and Symbol extensions throughout the trace contract', () => {
    const initial = clone(createAnalyticalFlowTrace());
    (initial.initialState as AnalyticalFlowState & { unexpected?: unknown }).unexpected = undefined;
    expect(() => replayAnalyticalFlow(initial)).toThrow(/initial state.*fixture-derived trace/);

    const event = clone(createAnalyticalFlowTrace());
    Object.defineProperty(event.events[0], Symbol('unexpected'), { enumerable: true, value: undefined });
    expect(() => replayAnalyticalFlow(event)).toThrow(/fixture\/event mismatch/);

    const final = clone(createAnalyticalFlowTrace());
    (final.finalState as AnalyticalFlowState & { unexpected?: unknown }).unexpected = undefined;
    expect(() => stateAtAnalyticalEvent(final, 0)).toThrow(/fixture\/final state mismatch/);
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
