import { describe, expect, it } from 'vitest';
import { parseTrace, replayTrace, serializeTrace } from '../src/core/trace';
import type { MechanismEvent } from '../src/core/events';
import {
  crankPlusOne,
  createCrankTrace,
  createDecimalRegister,
  digitsToString,
  incrementWheel,
  InvalidWheelStateError,
  reduceDecimalRegisterEvent,
  replay,
  transitionDecimalRegister,
  type CrankAction,
  type DecimalRegisterState,
} from '../src/mechanism-core';

describe('decimal wheel', () => {
  it.each([[0, 1], [8, 9]])('%i + 1 advances to %i', (position, expected) => {
    expect(incrementWheel(position)).toEqual({ position: expected, carry: false });
  });

  it('9 + 1 rolls over and emits a carry request', () => {
    expect(incrementWheel(9)).toEqual({ position: 0, carry: true });
  });
});

describe('carry chain compatibility API', () => {
  it.each([
    [[9, 0, 0, 0], '0010'],
    [[9, 9, 0, 0], '0100'],
    [[9, 9, 9, 9], '0000'],
  ])('increments %j to %s', (before, expected) => {
    expect(digitsToString(crankPlusOne(before).after)).toBe(expected);
  });

  it('exposes every carry stage and carry-out', () => {
    const result = crankPlusOne([9, 9, 9, 9]);
    expect(result.phases.map(({ phase }) => phase)).toEqual([
      'CRANK_BEGIN', 'WHEEL_STEP',
      'CARRY_PENDING', 'CARRY_PROPAGATED', 'WHEEL_STEP',
      'CARRY_PENDING', 'CARRY_PROPAGATED', 'WHEEL_STEP',
      'CARRY_PENDING', 'CARRY_PROPAGATED', 'WHEEL_STEP',
      'CARRY_OUT', 'CRANK_END',
    ]);
  });

  it('is deterministic and replayable', () => {
    const result = crankPlusOne([9, 9, 8], 3);
    expect(crankPlusOne(result.before, result.crank)).toEqual(result);
    expect(replay(result)).toEqual(result.after);
  });

  it('rejects invalid wheel states', () => {
    expect(() => crankPlusOne([])).toThrow(InvalidWheelStateError);
    expect(() => crankPlusOne([10])).toThrow(InvalidWheelStateError);
    expect(() => crankPlusOne([1.5])).toThrow(InvalidWheelStateError);
  });
});

describe('deterministic transition contract', () => {
  it('returns state, ordered events, warnings, and errors without mutating input', () => {
    const state = createDecimalRegister([9, 9, 0, 0]);
    const original = structuredClone(state);
    const action: CrankAction = { type: 'CRANK_PLUS_ONE', cycleId: 'canonical-0099' };
    const result = transitionDecimalRegister(state, action);
    expect(state).toEqual(original);
    expect(result.state.digits).toEqual([0, 0, 1, 0]);
    expect(result.warnings).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.events.map(({ sequence }) => sequence)).toEqual(result.events.map((_, index) => index));
  });

  it('reports explicit overflow warning and event', () => {
    const trace = createCrankTrace([9, 9, 9, 9]);
    expect(trace.events.at(-2)?.type).toBe('CARRY_OUT');
    expect(trace.warnings).toMatchObject([{ code: 'OVERFLOW', wheel: { index: 3 } }]);
  });
});

describe('canonical JSON trace and UI-independent replay', () => {
  it('serializes identical state/action byte-for-byte identically', () => {
    expect(serializeTrace(createCrankTrace([9, 9, 0, 0], 7))).toBe(
      serializeTrace(createCrankTrace([9, 9, 0, 0], 7)),
    );
  });

  it('round trips JSON without changing carry event order', () => {
    const trace = createCrankTrace([9, 9, 0, 0], 7);
    const json = serializeTrace(trace);
    const parsed = parseTrace<DecimalRegisterState, CrankAction, MechanismEvent>(json);
    expect(serializeTrace(parsed)).toBe(json);
    expect(parsed.events.map(({ type }) => type)).toEqual(trace.events.map(({ type }) => type));
  });

  it('replays 0099 + 1 solely from the complete trace', () => {
    const parsed = parseTrace<DecimalRegisterState, CrankAction, MechanismEvent>(
      serializeTrace(createCrankTrace([9, 9, 0, 0], 7)),
    );
    expect(replayTrace(parsed, reduceDecimalRegisterEvent)).toEqual(parsed.finalState);
    expect(digitsToString(parsed.finalState.digits)).toBe('0100');
  });
});
