import { describe, expect, it } from 'vitest';
import { canonicalize, parseTrace, replayTrace, serializeTrace } from '../src/core/trace';
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

  it('rejects malformed action and digit-array shapes before transitioning', () => {
    const state = createDecimalRegister([1, 0, 0, 0]);
    expect(() => transitionDecimalRegister(state, { type: 'CRANK_PLUS_ONE', cycleId: '' })).toThrow(
      InvalidWheelStateError,
    );

    const sparse = createDecimalRegister([1, 0, 0, 0]);
    delete sparse.digits[0];
    expect(() => transitionDecimalRegister(sparse, { type: 'CRANK_PLUS_ONE', cycleId: 'sparse' })).toThrow(
      InvalidWheelStateError,
    );

    const extended = createDecimalRegister([1, 0, 0, 0]);
    Object.assign(extended.digits, { [Symbol('forged')]: true });
    expect(() => transitionDecimalRegister(extended, { type: 'CRANK_PLUS_ONE', cycleId: 'extended' })).toThrow(
      InvalidWheelStateError,
    );
  });

  it('rejects dense digit arrays with a custom prototype', () => {
    const customPrototypeDigits = [1, 0, 0];
    Object.setPrototypeOf(customPrototypeDigits, Object.create(Array.prototype));
    expect(() => createDecimalRegister(customPrototypeDigits)).toThrow(
      'wheel state contains sparse or unsupported fields',
    );
  });

  it('rejects a non-canonical enumerable key in place of an own digit slot', () => {
    const nonCanonicalDigits = [1, 0, 0];
    delete nonCanonicalDigits[0];
    Object.defineProperty(nonCanonicalDigits, '01', { value: 1, enumerable: true });
    expect(() => createDecimalRegister(nonCanonicalDigits)).toThrow(
      'wheel state contains sparse or unsupported fields',
    );
  });

  it('rejects digit accessors without invoking them', () => {
    const accessorDigits = [1];
    let reads = 0;
    Object.defineProperty(accessorDigits, '0', {
      enumerable: true,
      get: () => {
        reads += 1;
        return reads === 1 ? 1 : 99;
      },
    });

    expect(() => createDecimalRegister(accessorDigits)).toThrow(
      'wheel state contains sparse or unsupported fields',
    );
    expect(reads).toBe(0);
  });

  it('rejects state and action accessors without invoking them', () => {
    const state = createDecimalRegister([1, 0, 0, 0]);
    let stateReads = 0;
    Object.defineProperty(state, 'mechanismId', {
      enumerable: true,
      get: () => {
        stateReads += 1;
        return stateReads === 1 ? 'decimal-register' : 'forged-mechanism';
      },
    });
    expect(() => transitionDecimalRegister(state, { type: 'CRANK_PLUS_ONE', cycleId: 'state-accessor' })).toThrow(
      'decimal register state contains unsupported fields',
    );
    expect(stateReads).toBe(0);

    const action: CrankAction = { type: 'CRANK_PLUS_ONE', cycleId: 'action-accessor' };
    let actionReads = 0;
    Object.defineProperty(action, 'cycleId', {
      enumerable: true,
      get: () => {
        actionReads += 1;
        return actionReads < 3 ? 'action-accessor' : 'forged-cycle';
      },
    });
    expect(() => transitionDecimalRegister(createDecimalRegister([1, 0, 0, 0]), action)).toThrow(
      'decimal register action contains unsupported fields',
    );
    expect(actionReads).toBe(0);
  });
});

describe('canonical JSON trace and UI-independent replay', () => {
  it('canonicalizes nested object keys without changing array order', () => {
    const canonical = [
      { type: 'FIRST', payload: { left: 1, right: 2 } },
      { type: 'SECOND', payload: { left: 3, right: 4 } },
    ];
    const reorderedKeys = [
      { payload: { right: 2, left: 1 }, type: 'FIRST' },
      { payload: { right: 4, left: 3 }, type: 'SECOND' },
    ];

    expect(JSON.stringify(canonicalize(reorderedKeys))).toBe(JSON.stringify(canonicalize(canonical)));
    expect(JSON.stringify(canonicalize(reorderedKeys.slice().reverse()))).not.toBe(
      JSON.stringify(canonicalize(canonical)),
    );
  });

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
    expect(replayTrace(parsed, reduceDecimalRegisterEvent, transitionDecimalRegister)).toEqual(parsed.finalState);
    expect(digitsToString(parsed.finalState.digits)).toBe('0100');
  });

  it.each(['format', 'version'] as const)('rejects a forged trace %s during direct replay', (kind) => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    if (kind === 'format') Object.assign(trace, { format: 'forged-format' });
    if (kind === 'version') Object.assign(trace, { version: 2 });

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, transitionDecimalRegister)).toThrow(
      'unsupported or malformed mechanism trace',
    );
  });

  it.each([
    'trace-format',
    'trace-initial-state',
    'state-mechanism',
    'event-mechanism',
  ] as const)('rejects a self-replacing %s accessor before replay', (target) => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    let reads = 0;
    const replaceOnRead = (owner: object, key: PropertyKey, value: unknown) => {
      Object.defineProperty(owner, key, {
        configurable: true,
        enumerable: true,
        get: () => {
          reads += 1;
          Object.defineProperty(owner, key, {
            configurable: true,
            enumerable: true,
            writable: true,
            value,
          });
          return value;
        },
      });
    };
    if (target === 'trace-format') replaceOnRead(trace, 'format', trace.format);
    if (target === 'trace-initial-state') replaceOnRead(trace, 'initialState', trace.initialState);
    if (target === 'state-mechanism') {
      replaceOnRead(trace.initialState, 'mechanismId', trace.initialState.mechanismId);
    }
    if (target === 'event-mechanism') {
      replaceOnRead(trace.events[0], 'mechanismId', trace.events[0].mechanismId);
    }

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, transitionDecimalRegister)).toThrow(
      'unsupported or malformed mechanism trace',
    );
    expect(reads).toBe(0);
  });

  it('rejects a cyclic enumerable trace value before replay', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    Object.assign(trace.initialState, { self: trace.initialState });

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, transitionDecimalRegister)).toThrow(
      'unsupported or malformed mechanism trace',
    );
  });

  it('rejects an accessor returned by the trusted transition without invoking it', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    let reads = 0;
    const accessorTransition = (
      state: Readonly<DecimalRegisterState>,
      action: Readonly<CrankAction>,
    ) => {
      const result = transitionDecimalRegister(state, action);
      const events = result.events;
      Object.defineProperty(result, 'events', {
        enumerable: true,
        get: () => {
          reads += 1;
          return events;
        },
      });
      return result;
    };

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, accessorTransition)).toThrow(
      'trace envelope does not match the recorded action',
    );
    expect(reads).toBe(0);
  });

  it.each(['inserted', 'substituted'] as const)('rejects an unknown event type when it is %s', (mutation) => {
    const trace = createCrankTrace([9, 9, 0, 0], 7);
    const unknownEvent = {
      ...trace.events[0],
      type: 'UNKNOWN_DECIMAL_EVENT',
    } as unknown as MechanismEvent;
    const events = mutation === 'inserted'
      ? [unknownEvent, ...trace.events]
      : trace.events.map((event) => event.type === 'WHEEL_STEP' ? event : {
        ...event,
        type: 'UNKNOWN_DECIMAL_EVENT',
      } as unknown as MechanismEvent);

    expect(() => replayTrace({ ...trace, events }, reduceDecimalRegisterEvent, transitionDecimalRegister)).toThrow(
      'unsupported decimal register event type: UNKNOWN_DECIMAL_EVENT',
    );
  });

  it.each([
    'action-cycle',
    'envelope-mechanism',
    'envelope-cycle',
    'omitted-control-events',
    'event-order',
    'event-sequence',
    'warning',
    'error',
  ] as const)('binds replay to the recorded action for %s tampering', (kind) => {
    const trace = structuredClone(createCrankTrace([9, 9, 0, 0], 7));
    if (kind === 'action-cycle') trace.action.cycleId = 'forged-action-cycle';
    if (kind === 'envelope-mechanism') trace.mechanismId = 'forged-mechanism';
    if (kind === 'envelope-cycle') trace.cycleId = 'forged-envelope-cycle';
    if (kind === 'omitted-control-events') {
      trace.events = trace.events.filter((event) => event.type === 'WHEEL_STEP');
    }
    if (kind === 'event-order') {
      const firstStep = trace.events.findIndex((event) => event.type === 'WHEEL_STEP');
      const secondStep = trace.events.findIndex((event, index) => index > firstStep && event.type === 'WHEEL_STEP');
      [trace.events[firstStep], trace.events[secondStep]] = [trace.events[secondStep], trace.events[firstStep]];
    }
    if (kind === 'event-sequence') trace.events[0].sequence = 99;
    if (kind === 'warning') trace.warnings.push({ severity: 'warning', code: 'FORGED', message: 'not action-derived' });
    if (kind === 'error') trace.errors.push({ severity: 'error', code: 'FORGED', message: 'not action-derived' });

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, transitionDecimalRegister)).toThrow();
  });

  it('rejects a transition with no event available to bind the trace envelope', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    trace.mechanismId = 'forged-mechanism';
    trace.cycleId = 'forged-cycle';
    trace.events = [];
    trace.finalState = structuredClone(trace.initialState);
    const noEventTransition = (state: Readonly<DecimalRegisterState>) => ({
      state: structuredClone(state),
      events: [] as MechanismEvent[],
      warnings: [],
      errors: [],
    });

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, noEventTransition)).toThrow(
      'trace envelope does not match the recorded action',
    );
  });

  it('rejects a transition whose event array contains only a sparse slot', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    trace.mechanismId = 'forged-mechanism';
    trace.cycleId = 'forged-cycle';
    trace.events = new Array<MechanismEvent>(1);
    trace.finalState = structuredClone(trace.initialState);
    const sparseEventTransition = (state: Readonly<DecimalRegisterState>) => ({
      state: structuredClone(state),
      events: new Array<MechanismEvent>(1),
      warnings: [],
      errors: [],
    });

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, sparseEventTransition)).toThrow(
      'trace envelope does not match the recorded action',
    );
  });

  it('rejects a dense transition event array with a custom prototype', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    const customArrayPrototype = Object.create(Array.prototype);
    Object.setPrototypeOf(trace.events, customArrayPrototype);
    const customPrototypeTransition = (
      state: Readonly<DecimalRegisterState>,
      action: Readonly<CrankAction>,
    ) => {
      const result = transitionDecimalRegister(state, action);
      Object.setPrototypeOf(result.events, customArrayPrototype);
      return result;
    };

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, customPrototypeTransition)).toThrow(
      'trace envelope does not match the recorded action',
    );
  });

  it('rejects a transition event array with an enumerable extension', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    Object.assign(trace.events, { forged: true });
    const extendedArrayTransition = (
      state: Readonly<DecimalRegisterState>,
      action: Readonly<CrankAction>,
    ) => {
      const result = transitionDecimalRegister(state, action);
      Object.assign(result.events, { forged: true });
      return result;
    };

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, extendedArrayTransition)).toThrow(
      'trace envelope does not match the recorded action',
    );
  });

  it('rejects a non-canonical event key in place of an own transition event slot', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    delete trace.events[0];
    Object.defineProperty(trace.events, '01', { value: trace.events[1], enumerable: true });
    const nonCanonicalSlotTransition = (
      state: Readonly<DecimalRegisterState>,
      action: Readonly<CrankAction>,
    ) => {
      const result = transitionDecimalRegister(state, action);
      Reflect.deleteProperty(result.events, '0');
      Object.defineProperty(result.events, '01', { value: result.events[1], enumerable: true });
      return result;
    };

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, nonCanonicalSlotTransition)).toThrow(
      'trace envelope does not match the recorded action',
    );
  });

  it('rejects transition envelope fields inherited from an event prototype', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    const inheritedEnvelope = {
      mechanismId: trace.mechanismId,
      cycleId: trace.cycleId,
    };
    Reflect.deleteProperty(trace.events[0], 'mechanismId');
    Reflect.deleteProperty(trace.events[0], 'cycleId');
    Object.setPrototypeOf(trace.events[0], inheritedEnvelope);
    const inheritedEnvelopeTransition = (
      state: Readonly<DecimalRegisterState>,
      action: Readonly<CrankAction>,
    ) => {
      const result = transitionDecimalRegister(state, action);
      Reflect.deleteProperty(result.events[0], 'mechanismId');
      Reflect.deleteProperty(result.events[0], 'cycleId');
      Object.setPrototypeOf(result.events[0], inheritedEnvelope);
      return result;
    };

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, inheritedEnvelopeTransition)).toThrow(
      'trace envelope does not match the recorded action',
    );
  });

  it('rejects non-enumerable transition envelope fields', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    Object.defineProperties(trace.events[0], {
      mechanismId: { value: trace.mechanismId, enumerable: false },
      cycleId: { value: 'forged-cycle', enumerable: false },
    });
    const nonEnumerableEnvelopeTransition = (
      state: Readonly<DecimalRegisterState>,
      action: Readonly<CrankAction>,
    ) => {
      const result = transitionDecimalRegister(state, action);
      Object.defineProperties(result.events[0], {
        mechanismId: { value: trace.mechanismId, enumerable: false },
        cycleId: { value: trace.cycleId, enumerable: false },
      });
      return result;
    };

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, nonEnumerableEnvelopeTransition)).toThrow(
      'trace envelope does not match the recorded action',
    );
  });

  it('rejects reducer output that diverges from the recorded final state', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    const faultyReducer = (state: Readonly<DecimalRegisterState>) => structuredClone(state);

    expect(() => replayTrace(trace, faultyReducer, transitionDecimalRegister)).toThrow(
      'trace replay did not produce the recorded final state',
    );
  });

  it('rejects a transition state that diverges from its recorded events and final state', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    const faultyTransition = (
      state: Readonly<DecimalRegisterState>,
      action: Readonly<CrankAction>,
    ) => ({
      ...transitionDecimalRegister(state, action),
      state: structuredClone(state),
    });

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, faultyTransition)).toThrow(
      'trace action did not produce the recorded final state',
    );
  });

  it('rejects enumerable event fields that canonical JSON would discard', () => {
    const undefinedField = createCrankTrace([1, 0, 0, 0], 7);
    Object.assign(undefinedField.events[0], { forged: undefined });
    expect(() => replayTrace(
      undefinedField,
      reduceDecimalRegisterEvent,
      transitionDecimalRegister,
    )).toThrow('trace action did not produce the recorded events');

    const symbolField = createCrankTrace([1, 0, 0, 0], 7);
    Object.assign(symbolField.events[0], { [Symbol('forged')]: true });
    expect(() => replayTrace(
      symbolField,
      reduceDecimalRegisterEvent,
      transitionDecimalRegister,
    )).toThrow('trace action did not produce the recorded events');
  });

  it('rejects a same-sized substitution of an enumerable event key', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    Object.assign(trace.events[0], { forgedUndefined: undefined });
    const expectedKeyTransition = (
      state: Readonly<DecimalRegisterState>,
      action: Readonly<CrankAction>,
    ) => {
      const result = transitionDecimalRegister(state, action);
      Object.assign(result.events[0], { expectedUndefined: undefined });
      return result;
    };

    expect(() => replayTrace(trace, reduceDecimalRegisterEvent, expectedKeyTransition)).toThrow(
      'trace action did not produce the recorded events',
    );
  });

  it('compares non-finite trace numbers with Object.is semantics', () => {
    const matchingNan = createCrankTrace([1, 0, 0, 0], 7);
    Object.assign(matchingNan.events[0], { diagnostic: Number.NaN });
    const matchingNanTransition = (
      state: Readonly<DecimalRegisterState>,
      action: Readonly<CrankAction>,
    ) => {
      const result = transitionDecimalRegister(state, action);
      Object.assign(result.events[0], { diagnostic: Number.NaN });
      return result;
    };
    expect(replayTrace(matchingNan, reduceDecimalRegisterEvent, matchingNanTransition)).toEqual(
      matchingNan.finalState,
    );

    const signedZero = createCrankTrace([1, 0, 0, 0], 7);
    Object.assign(signedZero.events[0], { diagnostic: 0 });
    const negativeZeroTransition = (
      state: Readonly<DecimalRegisterState>,
      action: Readonly<CrankAction>,
    ) => {
      const result = transitionDecimalRegister(state, action);
      Object.assign(result.events[0], { diagnostic: -0 });
      return result;
    };
    expect(() => replayTrace(signedZero, reduceDecimalRegisterEvent, negativeZeroTransition)).toThrow(
      'trace action did not produce the recorded events',
    );
  });

  it('rejects an event array with a trailing sparse slot', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    trace.events.length += 1;
    expect(() => replayTrace(
      trace,
      reduceDecimalRegisterEvent,
      transitionDecimalRegister,
    )).toThrow('trace action did not produce the recorded events');
  });

  it('rejects a recorded event with a non-canonical prototype', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    Object.setPrototypeOf(trace.events[0], null);
    expect(() => replayTrace(
      trace,
      reduceDecimalRegisterEvent,
      transitionDecimalRegister,
    )).toThrow('trace action did not produce the recorded events');
  });

  it.each(['trace', 'initial-state', 'action', 'final-state'] as const)(
    'rejects unsupported enumerable %s fields',
    (target) => {
      const trace = createCrankTrace([1, 0, 0, 0], 7);
      if (target === 'trace') Object.assign(trace, { forged: undefined });
      if (target === 'initial-state') Object.assign(trace.initialState, { forged: undefined });
      if (target === 'action') Object.assign(trace.action, { [Symbol('forged')]: true });
      if (target === 'final-state') Object.assign(trace.finalState, { forged: undefined });

      expect(() => replayTrace(
        trace,
        reduceDecimalRegisterEvent,
        transitionDecimalRegister,
      )).toThrow();
    },
  );

  it('distinguishes sparse event arrays from explicit entries', () => {
    const trace = createCrankTrace([1, 0, 0, 0], 7);
    delete trace.events[0];
    expect(() => replayTrace(
      trace,
      reduceDecimalRegisterEvent,
      transitionDecimalRegister,
    )).toThrow('trace action did not produce the recorded events');
  });
});
