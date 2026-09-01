import { describe, expect, it } from 'vitest';
import {
  createRotaryCarrySchedule,
  createRotaryCarryScheduleTrace,
  InvalidRotaryCarryScheduleError,
  replayRotaryCarrySchedule,
  transitionRotaryCarrySchedule,
} from '../src/mechanisms/rotary-carry-schedule';

describe('ordinal rotary carry schedule P/M model', () => {
  it('gives one carry one higher-order transfer opportunity', () => {
    const trace = createRotaryCarryScheduleTrace(4, 1);
    expect(trace.events).toMatchObject([
      { type: 'BOUNDARY_CROSSED', sourceOrder: 0, causedByCarry: false },
      { type: 'NEXT_ORDER_CONDITIONED', sourceOrder: 0, targetOrder: 1 },
      { type: 'TRANSFER_OPPORTUNITY', sourceOrder: 0, targetOrder: 1, slot: 0 },
      { type: 'SCHEDULE_COMPLETE', transferCount: 1, carryOut: false },
    ]);
  });

  it('uses strictly increasing ordinal slots for a three-stage dependency chain', () => {
    const trace = createRotaryCarryScheduleTrace(5, 3);
    const transfers = trace.events.filter(event => event.type === 'TRANSFER_OPPORTUNITY');
    expect(transfers.map(event => event.slot)).toEqual([0, 1, 2]);
    expect(transfers.map(event => [event.sourceOrder, event.targetOrder])).toEqual([[0, 1], [1, 2], [2, 3]]);
    expect(new Set(transfers.map(event => event.slot)).size).toBe(transfers.length);
    expect(trace.events.filter(event => event.type === 'BOUNDARY_CROSSED')).toMatchObject([
      { sourceOrder: 0, causedByCarry: false }, { sourceOrder: 1, causedByCarry: true }, { sourceOrder: 2, causedByCarry: true },
    ]);
  });

  it('represents a full-width carry-out explicitly', () => {
    const trace = createRotaryCarryScheduleTrace(3, 3);
    expect(trace.events.filter(event => event.type === 'CARRY_OUT')).toEqual([
      expect.objectContaining({ sourceOrder: 2, targetOrder: 3, slot: 2 }),
    ]);
    expect(trace.finalState).toMatchObject({ phase: 'COMPLETE', carryOut: true, completedTransfers: 3 });
  });

  it('is deterministic and replayable', () => {
    const left = createRotaryCarryScheduleTrace(5, 3, 'same');
    const right = createRotaryCarryScheduleTrace(5, 3, 'same');
    expect(left).toEqual(right); expect(replayRotaryCarrySchedule(left)).toEqual(left.finalState);
  });

  it.each(['slot', 'order', 'sequence', 'cycle', 'omit', 'insert', 'unknown', 'final'] as const)('rejects %s trace tampering', kind => {
    const trace = structuredClone(createRotaryCarryScheduleTrace(5, 3, 'tamper'));
    const transfer = trace.events.find(event => event.type === 'TRANSFER_OPPORTUNITY')!;
    if (kind === 'slot' && transfer.type === 'TRANSFER_OPPORTUNITY') transfer.slot = 2;
    if (kind === 'order' && transfer.type === 'TRANSFER_OPPORTUNITY') transfer.targetOrder = 3;
    if (kind === 'sequence') trace.events[2].sequence = 99;
    if (kind === 'cycle') trace.events[2].cycleId = 'other';
    if (kind === 'omit') trace.events.splice(1, 1);
    if (kind === 'insert') trace.events.splice(2, 0, structuredClone(trace.events[1]));
    if (kind === 'unknown') trace.events[0] = { ...trace.events[0], type: 'BAD' } as never;
    if (kind === 'final') trace.finalState.completedTransfers = 2;
    expect(() => replayRotaryCarrySchedule(trace)).toThrow(InvalidRotaryCarryScheduleError);
  });

  it.each([[1, 1], [3, 0], [3, 4], [2.5, 1]])('rejects malformed width/depth (%s, %s)', (width, depth) => {
    expect(() => createRotaryCarrySchedule(width, depth)).toThrow(InvalidRotaryCarryScheduleError);
  });

  it('rejects non-ready public action state', () => {
    const state = { ...createRotaryCarrySchedule(4, 2), phase: 'CONDITIONED', conditionedTargetOrder: 1 } as const;
    expect(() => transitionRotaryCarrySchedule(state, { type: 'SCHEDULE_CARRY_CHAIN', cycleId: 'bad-start' })).toThrow(InvalidRotaryCarryScheduleError);
  });
});
