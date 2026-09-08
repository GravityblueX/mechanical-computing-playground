import { describe, expect, it } from 'vitest';
import { accumulatorValue } from '../src/mechanisms/key-driven-accumulator';
import { replayKeyStrokeIntegrity, traceKeyStrokeIntegrity } from '../src/mechanisms/key-stroke-integrity';
import {
  applyWorkbenchAction,
  createKeyStrokeWorkbench,
  displayedWorkbenchState,
  returnToCurrentWorkbench,
  startWorkbenchReplay,
  stepWorkbenchReplay,
  type KeyStrokeWorkbench,
  type WorkbenchAction,
} from '../src/exhibits/key-stroke-workbench';

const begin = (digit: number, column = 0): WorkbenchAction => ({ type: 'BEGIN_KEY_STROKE', column, digit });
const apply = (workbench: KeyStrokeWorkbench, ...actions: WorkbenchAction[]) => actions.reduce(applyWorkbenchAction, workbench);
const amount = (workbench: KeyStrokeWorkbench) => accumulatorValue(displayedWorkbenchState(workbench).accumulator);
const interrupted = (initial: 0 | 99 = 0) => apply(createKeyStrokeWorkbench(initial), begin(7), { type: 'RELEASE_INCOMPLETE' });

describe('Controlled-Key operator workbench', () => {
  it('records normal operations with the actual nested place-value and carry evidence', () => {
    const workbench = apply(createKeyStrokeWorkbench(), begin(7), { type: 'COMPLETE_KEY_STROKE' }, begin(4), { type: 'COMPLETE_KEY_STROKE' });
    expect(amount(workbench)).toBe(11);
    expect(workbench.trace.actions.map(action => action.type)).toEqual(['BEGIN_KEY_STROKE', 'COMPLETE_KEY_STROKE', 'BEGIN_KEY_STROKE', 'COMPLETE_KEY_STROKE']);
    const last = workbench.trace.events.at(-1);
    expect(last?.type).toBe('ARITHMETIC_COMMITTED');
    if (last?.type !== 'ARITHMETIC_COMMITTED') throw new Error('missing commit');
    expect(last.accumulatorEvents).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'PLACE_VALUE_CONTRIBUTION', contribution: 4, accumulatorBefore: 7, accumulatorAfter: 11 }),
      expect.objectContaining({ type: 'CARRY_PROPAGATED', fromColumn: 0, toColumn: 1 }),
    ]));
    expect(workbench.trace).toEqual(traceKeyStrokeIntegrity(workbench.trace.initialState, workbench.trace.actions));
  });

  it.each([begin(2, 1), { type: 'RELEASE_ERROR_LOCK' } as WorkbenchAction])('keeps rejected attempts out of all mechanism history: %j', request => {
    const locked = interrupted();
    const before = structuredClone(locked);
    const rejected = applyWorkbenchAction(locked, request);
    expect(rejected.feedback?.kind).toBe('rejected');
    expect(rejected.trace).toBe(locked.trace);
    expect(locked).toEqual(before);
    expect(amount(rejected)).toBe(0);
    expect(rejected.trace.finalState).toMatchObject({ phase: 'ERROR_LOCKED', activeColumn: 0, activeDigit: 7, humanOperationCount: 2 });
    expect(rejected.trace.actions).toHaveLength(2);
    expect(rejected.trace.events).toHaveLength(4);
  });

  it('holds the corrected result through repeated-completion rejection and lock release', () => {
    const corrected = apply(interrupted(), { type: 'COMPLETE_ERRANT_STROKE' });
    const repeat = apply(corrected, { type: 'COMPLETE_ERRANT_STROKE' });
    expect(repeat.feedback).toEqual({ kind: 'rejected', reason: 'already-committed' });
    expect(repeat.trace).toEqual(corrected.trace);
    expect(repeat.trace.finalState).toMatchObject({ phase: 'CORRECTED_LOCKED', inputPermitted: false });
    const released = apply(repeat, { type: 'RELEASE_ERROR_LOCK' });
    expect(amount(released)).toBe(7);
    expect(released.trace.finalState).toMatchObject({ phase: 'IDLE', inputPermitted: true });
    const continued = apply(released, begin(2, 1), { type: 'COMPLETE_KEY_STROKE' });
    expect(amount(continued)).toBe(27);
    expect(continued.trace.events.filter(event => event.type === 'ARITHMETIC_COMMITTED')).toHaveLength(2);
    expect(continued.trace.events.map(event => event.sequence)).toEqual(continued.trace.events.map((_, index) => index));
    expect(continued.trace).toEqual(traceKeyStrokeIntegrity(continued.trace.initialState, continued.trace.actions));
  });

  it('retains both carry transfers inside the actual 099 → 106 correction', () => {
    const locked = interrupted(99);
    expect(amount(locked)).toBe(99);
    const corrected = apply(locked, { type: 'COMPLETE_ERRANT_STROKE' });
    const commit = corrected.trace.events.at(-1);
    if (commit?.type !== 'ARITHMETIC_COMMITTED') throw new Error('missing commit');
    expect(commit.accumulatorEvents.filter(event => event.type === 'CARRY_PROPAGATED').map(event => [event.fromColumn, event.toColumn])).toEqual([[0, 1], [1, 2]]);
    expect(amount(corrected)).toBe(106);
    const released = apply(corrected, { type: 'RELEASE_ERROR_LOCK' });
    expect(amount(released)).toBe(106);
    expect(replayKeyStrokeIntegrity(released.trace)).toEqual(released.trace.finalState);
  });

  it('snapshots the selected key at begin and records tens contribution as 30', () => {
    const selection = { type: 'BEGIN_KEY_STROKE', column: 1, digit: 3 } as const;
    const begun = apply(createKeyStrokeWorkbench(), selection);
    const changed = { ...selection, column: 0, digit: 7 };
    const blocked = apply(begun, changed);
    expect(blocked.trace.actions[0]).toMatchObject({ column: 1, digit: 3 });
    const completed = apply(blocked, { type: 'COMPLETE_KEY_STROKE' });
    expect(amount(completed)).toBe(30);
    expect(completed.trace.finalState.humanOperationCount).toBe(2);
  });

  it('replays each recorded event without changing the live endpoint or accepting new operations', () => {
    const live = apply(interrupted(99), { type: 'COMPLETE_ERRANT_STROKE' }, { type: 'RELEASE_ERROR_LOCK' });
    let replay = startWorkbenchReplay(live);
    expect(amount(replay)).toBe(99);
    const phases = [displayedWorkbenchState(replay).phase];
    for (let index = 0; index < live.trace.events.length; index += 1) {
      const rejected = apply(replay, begin(2, 1));
      expect(rejected.feedback).toEqual({ kind: 'rejected', reason: 'replay-only' });
      expect(rejected.trace).toBe(live.trace);
      expect(rejected.replayIndex).toBe(index);
      replay = stepWorkbenchReplay(rejected);
      phases.push(displayedWorkbenchState(replay).phase);
    }
    expect(phases).toEqual(['IDLE', 'STROKE_IN_PROGRESS', 'STROKE_IN_PROGRESS', 'ERROR_LOCKED', 'ERROR_LOCKED', 'CORRECTED_LOCKED', 'IDLE']);
    expect(displayedWorkbenchState(replay)).toEqual(live.trace.finalState);
    expect(stepWorkbenchReplay(replay).replayIndex).toBe(live.trace.events.length);
    expect(apply(replay, begin(1)).feedback).toEqual({ kind: 'rejected', reason: 'replay-only' });
    const current = returnToCurrentWorkbench(replay);
    expect(current.replayIndex).toBeNull();
    expect(current.trace).toBe(live.trace);
    expect(amount(apply(current, begin(2, 1), { type: 'COMPLETE_KEY_STROKE' }))).toBe(126);
  });

  it('replays an unfinished action boundary and only continues after returning to current', () => {
    const live = interrupted();
    const replay = startWorkbenchReplay(live);
    const returned = returnToCurrentWorkbench(replay);
    expect(displayedWorkbenchState(returned).phase).toBe('ERROR_LOCKED');
    expect(amount(apply(returned, { type: 'COMPLETE_ERRANT_STROKE' }))).toBe(7);
  });

  it('rejects overflowing completion without losing the pending key or recording an event', () => {
    const added = apply(createKeyStrokeWorkbench(99), begin(9, 2), { type: 'COMPLETE_KEY_STROKE' });
    const begun = apply(added, begin(1));
    const overflow = apply(begun, { type: 'COMPLETE_KEY_STROKE' });
    expect(overflow.feedback).toEqual({ kind: 'rejected', reason: 'overflow' });
    expect(overflow.trace).toBe(begun.trace);
    expect(amount(overflow)).toBe(999);
    expect(displayedWorkbenchState(overflow).phase).toBe('STROKE_IN_PROGRESS');
  });

  it('starts a fresh experiment with no inherited error, key, actions or replay cursor', () => {
    const old = apply(startWorkbenchReplay(interrupted()), begin(2, 1));
    const reset = createKeyStrokeWorkbench(99);
    expect(reset.feedback).toBeNull();
    expect(reset.replayIndex).toBeNull();
    expect(reset.trace.actions).toEqual([]);
    expect(reset.trace.events).toEqual([]);
    expect(displayedWorkbenchState(reset)).toMatchObject({ activeColumn: null, activeDigit: null, phase: 'IDLE', humanOperationCount: 0, integrityCycleCount: 0 });
    expect(amount(reset)).toBe(99);
    expect(old.trace.actions).toHaveLength(2);
  });
});
