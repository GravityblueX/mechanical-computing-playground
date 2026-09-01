import { describe, expect, it } from 'vitest';
import { accumulatorValue, createKeyDrivenAccumulator } from '../src/mechanisms/key-driven-accumulator';
import {
  createKeyStrokeIntegrity,
  InvalidKeyStrokeIntegrityError,
  replayKeyStrokeIntegrity,
  traceKeyStrokeIntegrity,
  transitionKeyStrokeIntegrity,
  type IntegrityAction,
  type KeyStrokeIntegrityTrace,
} from '../src/mechanisms/key-stroke-integrity';

const clone = <T>(value: T): T => structuredClone(value);
const recoveredActions: IntegrityAction[] = [
  { type: 'BEGIN_KEY_STROKE', cycleId: 'begin', column: 0, digit: 7 },
  { type: 'RELEASE_INCOMPLETE', cycleId: 'early', },
  { type: 'COMPLETE_ERRANT_STROKE', cycleId: 'correct' },
  { type: 'RELEASE_ERROR_LOCK', cycleId: 'release' },
];
const recovered = (initial = 0) => traceKeyStrokeIntegrity(createKeyStrokeIntegrity(createKeyDrivenAccumulator(3, initial)), recoveredActions);

 describe('generic key-stroke integrity controller', () => {
  it('commits an ordinary full units 7 stroke and returns idle', () => {
    const trace = traceKeyStrokeIntegrity(createKeyStrokeIntegrity(createKeyDrivenAccumulator(3)), [
      { type: 'BEGIN_KEY_STROKE', cycleId: 'begin', column: 0, digit: 7 },
      { type: 'COMPLETE_KEY_STROKE', cycleId: 'complete' },
    ]);
    expect(accumulatorValue(trace.finalState.accumulator)).toBe(7);
    expect(trace.finalState).toMatchObject({ phase: 'IDLE', inputPermitted: true, integrityCycleCount: 1 });
  });

  it('leaves arithmetic unchanged and locks after incomplete release', () => {
    const initial = createKeyStrokeIntegrity(createKeyDrivenAccumulator(3, 12));
    const begun = transitionKeyStrokeIntegrity(initial, { type: 'BEGIN_KEY_STROKE', cycleId: 'begin', column: 0, digit: 7 }).state;
    const released = transitionKeyStrokeIntegrity(begun, { type: 'RELEASE_INCOMPLETE', cycleId: 'early' });
    expect(released.events.map(event => event.type)).toEqual(['INCOMPLETE_STROKE_RELEASED', 'INCOMPLETE_STROKE_DETECTED', 'INPUT_LOCKED']);
    expect(released.state).toMatchObject({ phase: 'ERROR_LOCKED', inputPermitted: false, activeColumn: 0, activeDigit: 7 });
    expect(accumulatorValue(released.state.accumulator)).toBe(12);
  });

  it('rejects another-column input while locked', () => {
    const trace = traceKeyStrokeIntegrity(createKeyStrokeIntegrity(createKeyDrivenAccumulator(3)), recoveredActions.slice(0, 2));
    expect(() => transitionKeyStrokeIntegrity(trace.finalState, { type: 'BEGIN_KEY_STROKE', cycleId: 'blocked', column: 1, digit: 3 })).toThrow(InvalidKeyStrokeIntegrityError);
  });

  it('commits the errant value exactly once and preserves it through release', () => {
    const trace = recovered();
    expect(accumulatorValue(trace.finalState.accumulator)).toBe(7);
    expect(trace.events.filter(event => event.type === 'ARITHMETIC_COMMITTED')).toHaveLength(1);
    expect(trace.finalState).toMatchObject({ phase: 'IDLE', inputPermitted: true, integrityCycleCount: 1 });
    expect(() => transitionKeyStrokeIntegrity(trace.finalState, { type: 'RELEASE_ERROR_LOCK', cycleId: 'again' })).toThrow();
  });

  it('permits the next ordinary stroke after recovery', () => {
    const first = recovered().finalState;
    const next = traceKeyStrokeIntegrity(first, [
      { type: 'BEGIN_KEY_STROKE', cycleId: 'next-begin', column: 1, digit: 2 },
      { type: 'COMPLETE_KEY_STROKE', cycleId: 'next-complete' },
    ]);
    expect(accumulatorValue(next.finalState.accumulator)).toBe(27);
  });

  it('delegates carry to the existing accumulator semantics', () => {
    expect(accumulatorValue(recovered(99).finalState.accumulator)).toBe(106);
  });

  it('is deterministic and replayable', () => {
    expect(recovered()).toEqual(recovered());
    const trace = recovered(99);
    expect(replayKeyStrokeIntegrity(trace)).toEqual(trace.finalState);
  });

  it.each(['missing-detection', 'duplicated-commit', 'forged-key', 'illegal-release', 'final'] as const)('rejects %s tampering', kind => {
    const trace = clone(recovered());
    if (kind === 'missing-detection') trace.events.splice(trace.events.findIndex(event => event.type === 'INCOMPLETE_STROKE_DETECTED'), 1);
    if (kind === 'duplicated-commit') {
      const commit = trace.events.find(event => event.type === 'ARITHMETIC_COMMITTED')!;
      trace.events.splice(trace.events.indexOf(commit) + 1, 0, clone(commit));
    }
    if (kind === 'forged-key') {
      const begin = trace.actions[0]; if (begin.type === 'BEGIN_KEY_STROKE') begin.digit = 8;
    }
    if (kind === 'illegal-release') [trace.actions[2], trace.actions[3]] = [trace.actions[3], trace.actions[2]];
    if (kind === 'final') trace.finalState.accumulator.digits[0] = 8;
    trace.events.forEach((event, sequence) => { event.sequence = sequence; });
    expect(() => replayKeyStrokeIntegrity(trace as KeyStrokeIntegrityTrace)).toThrow();
  });

  it('rejects invalid digit, column, cycle and forged state', () => {
    const state = createKeyStrokeIntegrity(createKeyDrivenAccumulator(3));
    expect(() => transitionKeyStrokeIntegrity(state, { type: 'BEGIN_KEY_STROKE', cycleId: '', column: 0, digit: 7 })).toThrow();
    expect(() => transitionKeyStrokeIntegrity(state, { type: 'BEGIN_KEY_STROKE', cycleId: 'bad', column: 3, digit: 7 })).toThrow();
    expect(() => transitionKeyStrokeIntegrity(state, { type: 'BEGIN_KEY_STROKE', cycleId: 'bad', column: 0, digit: 0 })).toThrow();
    const forged = clone(state); forged.inputPermitted = false;
    expect(() => transitionKeyStrokeIntegrity(forged, { type: 'BEGIN_KEY_STROKE', cycleId: 'bad', column: 0, digit: 7 })).toThrow();
  });
});
