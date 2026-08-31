import { describe, expect, it } from 'vitest';
import {
  assertInterlockInvariant,
  createSettingCrankInterlock,
  InvalidInterlockStateError,
  replayInterlock,
  traceInterlockActions,
  transitionInterlock,
  type InterlockTrace,
} from '../src/mechanisms/setting-crank-interlock';

const clone = <T>(value: T): T => structuredClone(value);
const fullTrace = () => traceInterlockActions(createSettingCrankInterlock(12), [
  { type: 'CHANGE_SETTING', cycleId: 'set', value: 314 },
  { type: 'BEGIN_CRANK_CYCLE', cycleId: 'begin' },
  { type: 'COMPLETE_CRANK_CYCLE', cycleId: 'complete' },
]);

describe('generic setting–crank interlock', () => {
  it('starts at a consistent home invariant', () => {
    const state = createSettingCrankInterlock();
    expect(() => assertInterlockInvariant(state)).not.toThrow();
    expect(state).toMatchObject({ phase: 'HOME_FREE', crankPosition: 'HOME', crankLocked: true, settingLocked: false });
  });

  it('changes setting only at home and increments revision/human operation', () => {
    const result = transitionInterlock(createSettingCrankInterlock(12), { type: 'CHANGE_SETTING', cycleId: 'set', value: 314 });
    expect(result.state).toMatchObject({ settingValue: 314, settingRevision: 1, humanOperationCount: 1 });
    expect(result.events).toMatchObject([{ type: 'SETTING_CHANGED', valueBefore: 12, valueAfter: 314, revisionBefore: 0, revisionAfter: 1 }]);
  });

  it('locks setting before releasing and activating the crank', () => {
    const result = transitionInterlock(createSettingCrankInterlock(314), { type: 'BEGIN_CRANK_CYCLE', cycleId: 'begin' });
    expect(result.events.map((event) => event.type)).toEqual(['SETTING_LOCKED', 'CRANK_RELEASED', 'CRANK_CYCLE_BEGUN']);
    expect(result.state).toMatchObject({ phase: 'ACTIVE', crankPosition: 'ACTIVE', crankLocked: false, settingLocked: true, humanOperationCount: 1 });
  });

  it('rejects setting change and a second begin while active', () => {
    const active = transitionInterlock(createSettingCrankInterlock(), { type: 'BEGIN_CRANK_CYCLE', cycleId: 'begin' }).state;
    expect(() => transitionInterlock(active, { type: 'CHANGE_SETTING', cycleId: 'bad-set', value: 9 })).toThrow(InvalidInterlockStateError);
    expect(() => transitionInterlock(active, { type: 'BEGIN_CRANK_CYCLE', cycleId: 'bad-begin' })).toThrow(InvalidInterlockStateError);
  });

  it('rejects completion while home', () => {
    expect(() => transitionInterlock(createSettingCrankInterlock(), { type: 'COMPLETE_CRANK_CYCLE', cycleId: 'bad' })).toThrow(InvalidInterlockStateError);
  });

  it('completion counts a cycle, returns home, locks crank, then releases setting', () => {
    const active = transitionInterlock(createSettingCrankInterlock(), { type: 'BEGIN_CRANK_CYCLE', cycleId: 'begin' }).state;
    const result = transitionInterlock(active, { type: 'COMPLETE_CRANK_CYCLE', cycleId: 'complete' });
    expect(result.events.map((event) => event.type)).toEqual(['CRANK_CYCLE_COMPLETED', 'CRANK_RETURNED_HOME', 'CRANK_LOCKED', 'SETTING_RELEASED']);
    expect(result.state).toMatchObject({ phase: 'HOME_FREE', crankPosition: 'HOME', crankLocked: true, settingLocked: false, completedCycleCount: 1, humanOperationCount: 2 });
  });

  it('is deterministic and replayable', () => {
    expect(fullTrace()).toEqual(fullTrace());
    const trace = fullTrace();
    expect(replayInterlock(trace)).toEqual(trace.finalState);
  });

  it.each(['sequence', 'setting', 'lock', 'cycle', 'final'] as const)('rejects %s tampering', (kind) => {
    const trace = clone(fullTrace());
    if (kind === 'sequence') trace.events[1].sequence += 1;
    if (kind === 'setting') {
      const event = trace.events.find((item) => item.type === 'SETTING_CHANGED');
      if (event?.type === 'SETTING_CHANGED') event.revisionAfter += 1;
    }
    if (kind === 'lock') {
      const event = trace.events.find((item) => item.type === 'CRANK_RELEASED');
      if (event?.type === 'CRANK_RELEASED') (event as unknown as { crankLockedBefore: boolean }).crankLockedBefore = false;
    }
    if (kind === 'cycle') {
      const event = trace.events.find((item) => item.type === 'CRANK_CYCLE_COMPLETED');
      if (event?.type === 'CRANK_CYCLE_COMPLETED') event.cycleCountAfter += 1;
    }
    if (kind === 'final') trace.finalState.settingLocked = true;
    expect(() => replayInterlock(trace as InterlockTrace)).toThrow();
  });

  it('rejects invalid numeric state and setting values', () => {
    expect(() => createSettingCrankInterlock(-1)).toThrow(InvalidInterlockStateError);
    expect(() => transitionInterlock(createSettingCrankInterlock(), { type: 'CHANGE_SETTING', cycleId: 'bad', value: Number.MAX_VALUE })).toThrow(InvalidInterlockStateError);
  });
});
