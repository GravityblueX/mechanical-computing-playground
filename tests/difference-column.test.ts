import { describe, expect, it } from 'vitest';
import {
  createDifferenceState,
  cubicPreset,
  InvalidDifferenceStateError,
  replayDifference,
  squarePreset,
  transitionDifference,
  type DifferenceEvent,
} from '../src/mechanisms/difference-column';
import {
  createDifferenceOutputTrace,
  InvalidDifferenceOutputError,
  replayDifferenceOutput,
  stateAtDifferenceOutputEvent,
  type DifferenceOutputEvent,
} from '../src/exhibits/difference-output-flow';

const clone = <T>(value: T): T => structuredClone(value);

describe('finite-difference mechanism', () => {
  it('generates ten square-number cranks', () => {
    let state = squarePreset();
    for (let i = 0; i < 10; i += 1) state = transitionDifference(state).after;
    expect(state.output).toEqual([0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]);
  });

  it('generates cubic values', () => {
    let state = cubicPreset();
    for (let i = 0; i < 4; i += 1) state = transitionDifference(state).after;
    expect(state.output).toEqual([0, 1, 8, 27, 64]);
  });

  it('supports custom rows and deterministic event replay', () => {
    const crank = transitionDifference(createDifferenceState([5, 2, 1, 0]));
    expect(crank.events.map((event) => event.targetOrder)).toEqual([0, 1, 2]);
    expect(replayDifference(crank)).toEqual(crank.after);
    expect(transitionDifference(crank.before)).toEqual(crank);
  });

  it.each(['sequence', 'source', 'target', 'addend', 'before', 'after', 'omit', 'reorder', 'final', 'claim'] as const)('rejects %s tampering', (kind) => {
    const crank = clone(transitionDifference(squarePreset()));
    if (kind === 'sequence') crank.events[0].sequence = 1;
    if (kind === 'source') crank.events[0].sourceOrder = 2;
    if (kind === 'target') crank.events[0].targetOrder = 1;
    if (kind === 'addend') crank.events[0].addend += 1;
    if (kind === 'before') crank.events[0].before += 1;
    if (kind === 'after') crank.events[0].after += 1;
    if (kind === 'omit') crank.events.pop();
    if (kind === 'reorder') [crank.events[0], crank.events[1]] = [crank.events[1], crank.events[0]];
    if (kind === 'final') crank.after.output[crank.after.output.length - 1] += 1;
    if (kind === 'claim') crank.events[0].claimType = 'H' as 'P/M';
    expect(() => replayDifference(crank)).toThrow(InvalidDifferenceStateError);
  });

  it('rejects unknown events and invalid/non-finite states', () => {
    const crank = transitionDifference(squarePreset());
    crank.events[0] = { ...crank.events[0], type: 'BAD' } as unknown as DifferenceEvent;
    expect(() => replayDifference(crank)).toThrow(/unknown difference event/);
    expect(() => createDifferenceState([1])).toThrow(InvalidDifferenceStateError);
    expect(() => createDifferenceState([1, Number.NaN])).toThrow(InvalidDifferenceStateError);
    expect(() => transitionDifference(createDifferenceState([Number.MAX_VALUE, Number.MAX_VALUE]))).toThrow(InvalidDifferenceStateError);
    const bad = squarePreset(); bad.output = [99];
    expect(() => transitionDifference(bad)).toThrow(/consistency/);
  });
});

describe('Difference Engine tabular-output P/M flow', () => {
  it('consumes the actual next square value and delays persistent artifacts', () => {
    const trace = createDifferenceOutputTrace(squarePreset());
    expect(trace.sourceCrank.after).toMatchObject({ row: 1, output: [0, 1] });
    expect(trace.initialState.generatedValue).toBe(1);
    expect(stateAtDifferenceOutputEvent(trace, 1)).toMatchObject({ calculationReady: true, checkCopyValue: null, stereotypeMasterValue: null });
    expect(stateAtDifferenceOutputEvent(trace, 2)).toMatchObject({ checkCopyValue: 1, stereotypeMasterValue: null });
    expect(trace.finalState).toMatchObject({ checkCopyValue: 1, stereotypeMasterValue: 1 });
  });

  it('is deterministic and replayable', () => {
    const trace = createDifferenceOutputTrace(squarePreset());
    expect(createDifferenceOutputTrace(squarePreset())).toEqual(trace);
    expect(replayDifferenceOutput(trace)).toEqual(trace.finalState);
  });

  it.each(['sequence', 'row', 'value', 'order', 'source', 'final', 'claim'] as const)('rejects %s tampering', (kind) => {
    const trace = clone(createDifferenceOutputTrace(squarePreset()));
    if (kind === 'sequence') trace.events[1].sequence = 9;
    if (kind === 'row') trace.events[0].row += 1;
    if (kind === 'value') trace.events[1].value += 1;
    if (kind === 'order') [trace.events[1], trace.events[2]] = [trace.events[2], trace.events[1]];
    if (kind === 'source') trace.sourceCrank.after.output[1] = 2;
    if (kind === 'final') trace.finalState.stereotypeMasterValue = 2;
    if (kind === 'claim') trace.events[0].claimType = 'H' as 'P/M';
    expect(() => replayDifferenceOutput(trace)).toThrow();
  });

  it('fails closed for unknown output events', () => {
    const trace = createDifferenceOutputTrace(squarePreset());
    trace.events[0] = { ...trace.events[0], type: 'BAD' } as unknown as DifferenceOutputEvent;
    expect(() => replayDifferenceOutput(trace)).toThrow(/unknown output event/);
    expect(() => stateAtDifferenceOutputEvent(createDifferenceOutputTrace(squarePreset()), -1)).toThrow(InvalidDifferenceOutputError);
  });
});
