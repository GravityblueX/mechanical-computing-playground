import { describe, expect, it } from 'vitest';
import {
  assertInterlockInvariant,
  createSettingCrankInterlock,
  InvalidInterlockStateError,
  replayInterlock,
  traceInterlockActions,
  transitionInterlock,
  type InterlockAction,
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

  it('rejects an unknown serialized action instead of completing an active crank cycle', () => {
    const active = transitionInterlock(createSettingCrankInterlock(), { type: 'BEGIN_CRANK_CYCLE', cycleId: 'begin' }).state;
    const action = { type: 'UNKNOWN', cycleId: 'unknown' } as unknown as InterlockAction;
    expect(() => transitionInterlock(active, action)).toThrow(/unsupported setting-crank interlock action type/);
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

  it('accepts serialized events with reordered object fields', () => {
    const trace = JSON.parse(JSON.stringify(fullTrace())) as InterlockTrace;
    trace.events = trace.events.map((event) => Object.fromEntries(Object.entries(event).reverse()) as typeof event);
    expect(replayInterlock(trace)).toEqual(trace.finalState);
  });

  it('accepts a complete cycle resumed from a producer-derived active state', () => {
    const active = transitionInterlock(createSettingCrankInterlock(314), {
      type: 'BEGIN_CRANK_CYCLE', cycleId: 'shared-cycle',
    }).state;
    const trace = traceInterlockActions(active, [
      { type: 'COMPLETE_CRANK_CYCLE', cycleId: 'shared-cycle' },
      { type: 'CHANGE_SETTING', cycleId: 'shared-cycle', value: 314 },
      { type: 'BEGIN_CRANK_CYCLE', cycleId: 'shared-cycle' },
    ]);
    expect(replayInterlock(JSON.parse(JSON.stringify(trace)) as InterlockTrace)).toEqual(trace.finalState);
  });

  it.each([
    ['removed action', (trace: InterlockTrace) => { trace.actions.splice(0, 1); }],
    ['setting payload', (trace: InterlockTrace) => {
      const action = trace.actions.find((item) => item.type === 'CHANGE_SETTING');
      if (action?.type === 'CHANGE_SETTING') action.value += 1;
    }],
    ['action cycle id', (trace: InterlockTrace) => { trace.actions[0].cycleId = 'forged-action-cycle'; }],
    ['unknown action type', (trace: InterlockTrace) => {
      (trace.actions[0] as { type: string }).type = 'UNKNOWN';
    }],
  ] as const)('rejects %s provenance tampering', (_name, tamper) => {
    const trace = clone(fullTrace());
    tamper(trace);
    expect(() => replayInterlock(trace)).toThrow();
  });

  it('rejects event cycle identity that is not derived from the recorded action', () => {
    const trace = clone(fullTrace());
    trace.events[0].cycleId = 'forged-event-cycle';
    expect(() => replayInterlock(trace)).toThrow(/action\/event mismatch/);
  });

  it.each(['missing cycle id', 'extra field'] as const)('rejects an event with %s', (kind) => {
    const trace = clone(fullTrace());
    if (kind === 'missing cycle id') Reflect.deleteProperty(trace.events[0], 'cycleId');
    else Object.assign(trace.events[0], { unrelated: true });
    expect(() => replayInterlock(trace)).toThrow(/action\/event mismatch/);
  });

  it('requires serialized action and event arrays', () => {
    const trace = clone(fullTrace());
    (trace as unknown as { actions: unknown }).actions = { 0: trace.actions[0] };
    expect(() => replayInterlock(trace)).toThrow(/action and event arrays/);
  });

  it('validates an empty trace snapshot before accepting it', () => {
    const invalid = createSettingCrankInterlock();
    invalid.settingValue = -1;
    expect(() => replayInterlock({
      initialState: invalid,
      actions: [],
      events: [],
      finalState: clone(invalid),
    })).toThrow(InvalidInterlockStateError);
  });

  it('accepts exactly the action history that produced each bounded event history', () => {
    type OracleNode = { active: boolean; actions: InterlockAction[] };
    const histories: InterlockAction[][] = [];
    let frontier: OracleNode[] = [{ active: false, actions: [] }];

    for (let depth = 0; depth <= 4; depth += 1) {
      histories.push(...frontier.map((node) => node.actions));
      if (depth === 4) break;
      const next: OracleNode[] = [];
      for (const node of frontier) {
        const cycle = `oracle-${depth}`;
        if (node.active) {
          next.push({
            active: false,
            actions: [...node.actions, { type: 'COMPLETE_CRANK_CYCLE', cycleId: `${cycle}-complete` }],
          });
        } else {
          next.push(
            { active: false, actions: [...node.actions, { type: 'CHANGE_SETTING', cycleId: `${cycle}-set-0`, value: 0 }] },
            { active: false, actions: [...node.actions, { type: 'CHANGE_SETTING', cycleId: `${cycle}-set-1`, value: 1 }] },
            { active: true, actions: [...node.actions, { type: 'BEGIN_CRANK_CYCLE', cycleId: `${cycle}-begin` }] },
          );
        }
      }
      frontier = next;
    }

    const traces = histories.map((actions) => traceInterlockActions(createSettingCrankInterlock(), actions));
    let accepted = 0;
    let acceptedExtras = 0;
    for (const trace of traces) {
      for (const actions of histories) {
        const exact = JSON.stringify(actions) === JSON.stringify(trace.actions);
        try {
          replayInterlock({ ...clone(trace), actions: clone(actions) });
          accepted += 1;
          if (!exact) acceptedExtras += 1;
        } catch {
          if (exact) throw new Error('replay rejected its producer-derived action history');
        }
      }
    }

    expect({ histories: histories.length, comparisons: histories.length ** 2, accepted, acceptedExtras }).toEqual({
      histories: 69,
      comparisons: 4_761,
      accepted: 69,
      acceptedExtras: 0,
    });
  });

  it('rejects an unknown serialized event instead of treating it as setting release', () => {
    const trace = clone(fullTrace());
    (trace.events[trace.events.length - 1] as { type: string }).type = 'UNKNOWN';
    expect(() => replayInterlock(trace)).toThrow(/unsupported setting-crank interlock event type/);
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
