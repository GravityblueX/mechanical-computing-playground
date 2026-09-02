import { describe, expect, it } from 'vitest';
import {
  carryBoundarySummaries,
  createComplementRegister,
  InvalidComplementRegisterError,
  ninesComplement,
  replayComplementSubtraction,
  traceComplementSubtraction,
  transitionComplementRegister,
  type ComplementRegisterTrace,
} from '../src/mechanisms/complement-register';

const clone = <T>(value: T): T => structuredClone(value);

const countedProxy = <T extends object>(target: T, dualView = false) => {
  let getCount = 0;
  return {
    proxy: new Proxy(target, {
      get: (object, key, receiver) => {
        getCount += 1;
        if (dualView && key === 'subtractionReadout') return -1;
        return Reflect.get(object, key, receiver);
      },
    }),
    getCount: () => getCount,
  };
};

describe('generic compact P/M complement register', () => {
  it('computes fixed-width mathematical nines complement and is involutive', () => {
    expect(ninesComplement(1234, 4)).toBe(8765);
    for (const value of [0, 1, 99, 1234, 9999]) expect(ninesComplement(ninesComplement(value, 4), 4)).toBe(value);
  });

  it.each([
    { a: 5678, b: 1234, result: 4444 },
    { a: 1200, b: 345, result: 855 },
    { a: 5678, b: 0, result: 5678 },
    { a: 5678, b: 5678, result: 0 },
  ])('derives $a - $b = $result in one compact action', ({ a, b, result }) => {
    const trace = traceComplementSubtraction(a, b, 4);
    expect(trace.finalState.subtractionReadout).toBe(result);
    expect(trace.finalState.actionCount).toBe(1);
    expect(trace.events).toHaveLength(6);
    expect(trace.events.map(event => event.type)).toEqual([
      'FORWARD_ADD_BEGIN',
      'CARRY_BOUNDARY_SUMMARY',
      'CARRY_BOUNDARY_SUMMARY',
      'CARRY_BOUNDARY_SUMMARY',
      'REGISTER_ADVANCED',
      'FORWARD_ADD_END',
    ]);
  });

  it('summarizes crossings at multiple decimal boundaries exactly', () => {
    expect(carryBoundarySummaries(8799, 345, 4)).toEqual([
      { order: 0, boundary: 10, crossingCount: 35 },
      { order: 1, boundary: 100, crossingCount: 4 },
      { order: 2, boundary: 1000, crossingCount: 1 },
    ]);
  });

  it('keeps event count bounded by width, not subtrahend magnitude', () => {
    for (const b of [0, 1, 345, 1200]) expect(traceComplementSubtraction(1200, b, 4).events).toHaveLength(6);
    for (let width = 1; width <= 15; width += 1) {
      const trace = traceComplementSubtraction(0, 0, width);
      expect(trace.events.length).toBeLessThanOrEqual(width + 2);
    }
  });

  it('handles one large width-15 action with a small event list', () => {
    const a = 999_999_999_999_998;
    const b = 888_888_888_888_888;
    const trace = traceComplementSubtraction(a, b, 15);
    expect(trace.finalState.subtractionReadout).toBe(111_111_111_111_110);
    expect(trace.events).toHaveLength(17);
    expect(trace.events.filter(event => event.type === 'CARRY_BOUNDARY_SUMMARY')).toHaveLength(14);
    expect(replayComplementSubtraction(trace)).toEqual(trace.finalState);
  });

  it('uses no per-unit public transition events or exported increment helper', async () => {
    const module = await import('../src/mechanisms/complement-register');
    expect(Object.keys(module)).not.toContain('incrementComplementRegister');
    expect(traceComplementSubtraction(999_999, 999_999, 6).events.some(event => event.type === ('REGISTER_INCREMENTED' as string))).toBe(false);
  });

  it('is deterministic and replayable', () => {
    expect(traceComplementSubtraction(1200, 345, 4)).toEqual(traceComplementSubtraction(1200, 345, 4));
    const trace = traceComplementSubtraction(5678, 1234, 4);
    expect(replayComplementSubtraction(trace)).toEqual(trace.finalState);
  });

  it('treats object member order as irrelevant during replay', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    const finalState = trace.finalState;
    trace.finalState = {
      actionCount: finalState.actionCount,
      encodedMinuend: finalState.encodedMinuend,
      subtractionReadout: finalState.subtractionReadout,
      additionReadout: finalState.additionReadout,
      physicalValue: finalState.physicalValue,
      modulus: finalState.modulus,
      width: finalState.width,
      mechanismId: finalState.mechanismId,
    };
    expect(replayComplementSubtraction(trace)).toEqual(finalState);
  });

  it('treats event member order as irrelevant during replay', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    const begin = trace.events[0];
    if (begin.type !== 'FORWARD_ADD_BEGIN') throw new Error('expected forward-add begin event');
    trace.events[0] = {
      delta: begin.delta,
      physicalBefore: begin.physicalBefore,
      type: begin.type,
      sequence: begin.sequence,
      cycleId: begin.cycleId,
      mechanismId: begin.mechanismId,
    };
    expect(replayComplementSubtraction(trace)).toEqual(trace.finalState);
  });

  it('rejects a transparent top-level Proxy without invoking its get trap', () => {
    const counted = countedProxy(clone(traceComplementSubtraction(1200, 345, 4)));
    expect(() => replayComplementSubtraction(counted.proxy)).toThrow(InvalidComplementRegisterError);
    expect(counted.getCount()).toBe(0);
  });

  it('rejects a nested Proxy without invoking its get trap', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    const counted = countedProxy(trace.finalState);
    trace.finalState = counted.proxy;
    expect(() => replayComplementSubtraction(trace)).toThrow(InvalidComplementRegisterError);
    expect(counted.getCount()).toBe(0);
  });

  it('rejects an array Proxy without invoking its get trap', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    const counted = countedProxy(trace.events);
    trace.events = counted.proxy;
    expect(() => replayComplementSubtraction(trace)).toThrow(InvalidComplementRegisterError);
    expect(counted.getCount()).toBe(0);
  });

  it('rejects a dual-view Proxy without reading its forged value', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    const counted = countedProxy(trace.finalState, true);
    trace.finalState = counted.proxy;
    expect(() => replayComplementSubtraction(trace)).toThrow(InvalidComplementRegisterError);
    expect(counted.getCount()).toBe(0);
  });

  it('rejects a retained Proxy that detaches itself during structural inspection', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    const initialState = trace.initialState;
    let getCount = 0;
    trace.initialState = new Proxy(initialState, {
      get: (target, key, receiver) => {
        getCount += 1;
        return Reflect.get(target, key, receiver);
      },
      getPrototypeOf: (target) => {
        trace.initialState = initialState;
        return Reflect.getPrototypeOf(target);
      },
    });

    let caught: unknown;
    try {
      replayComplementSubtraction(trace);
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(InvalidComplementRegisterError);
    expect((caught as Error).message).toBe('invalid complement trace data');
    expect(getCount).toBe(0);
  });

  it('does not invoke an accessor injected into a seen node by a Proxy trap', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    const initialState = trace.initialState;
    const victim = trace.finalState as ComplementRegisterTrace['finalState'] & { injected?: number };
    let getCount = 0;
    let reads = 0;
    trace.initialState = new Proxy({ bridge: { victim } }, {
      get: (target, key, receiver) => {
        getCount += 1;
        return Reflect.get(target, key, receiver);
      },
      getPrototypeOf: (target) => {
        trace.initialState = initialState;
        Object.defineProperty(victim, 'injected', {
          configurable: true,
          enumerable: true,
          get: () => {
            reads += 1;
            return 2;
          },
        });
        return Reflect.getPrototypeOf(target);
      },
    }) as unknown as ComplementRegisterTrace['initialState'];

    let caught: unknown;
    try {
      replayComplementSubtraction(trace);
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(InvalidComplementRegisterError);
    expect((caught as Error).message).toBe('invalid complement trace data');
    expect(getCount).toBe(0);
    expect(reads).toBe(0);
  });

  it('normalizes a top-level ownKeys trap failure to the mechanism error type', () => {
    const sentinel = new Error('ownKeys sentinel');
    const trace = new Proxy(clone(traceComplementSubtraction(1200, 345, 4)), {
      ownKeys: () => {
        throw sentinel;
      },
    }) as ComplementRegisterTrace;
    let caught: unknown;
    try {
      replayComplementSubtraction(trace);
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(InvalidComplementRegisterError);
    expect(caught).not.toBe(sentinel);
    expect((caught as Error).message).toBe('invalid complement trace data');
  });

  it('replaces a domain-typed structural trap error without preserving its identity or message', () => {
    const sentinel = new InvalidComplementRegisterError('attacker sentinel');
    const trace = new Proxy(clone(traceComplementSubtraction(1200, 345, 4)), {
      ownKeys: () => {
        throw sentinel;
      },
    }) as ComplementRegisterTrace;
    let caught: unknown;
    try {
      replayComplementSubtraction(trace);
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(InvalidComplementRegisterError);
    expect(caught).not.toBe(sentinel);
    expect((caught as Error).message).toBe('invalid complement trace data');
  });

  it('rejects a Proxy after its structural trap replaces ambient validator intrinsics', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    const originalStructuredClone = globalThis.structuredClone;
    const originalArrayIsArray = Array.isArray;
    const originalArrayIterator = Array.prototype[Symbol.iterator];
    const originalArrayPop = Array.prototype.pop;
    const originalArrayPush = Array.prototype.push;
    const originalNumberIsInteger = Number.isInteger;
    const originalObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    const originalObjectGetPrototypeOf = Object.getPrototypeOf;
    const originalReflectOwnKeys = Reflect.ownKeys;
    const originalWeakSetAdd = WeakSet.prototype.add;
    const originalWeakSetDelete = WeakSet.prototype.delete;
    const originalWeakSetHas = WeakSet.prototype.has;
    let ambientCalls = 0;
    let getCount = 0;
    const proxy = new Proxy(trace.events, {
      get: (target, key, receiver) => {
        getCount += 1;
        return Reflect.get(target, key, receiver);
      },
      getPrototypeOf: (target) => {
        globalThis.structuredClone = (<T>(value: T) => {
          ambientCalls += 1;
          return value;
        }) as typeof globalThis.structuredClone;
        Array.isArray = ((value: unknown) => {
          ambientCalls += 1;
          return originalArrayIsArray(value);
        }) as typeof Array.isArray;
        Array.prototype[Symbol.iterator] = (function (this: unknown[]) {
          ambientCalls += 1;
          return originalArrayIterator.call(this);
        }) as typeof originalArrayIterator;
        Array.prototype.pop = (function (this: unknown[]) {
          ambientCalls += 1;
          return originalArrayPop.call(this);
        }) as typeof Array.prototype.pop;
        Array.prototype.push = (function (this: unknown[], ...items: unknown[]) {
          ambientCalls += 1;
          return originalArrayPush.apply(this, items);
        }) as typeof Array.prototype.push;
        Number.isInteger = ((value: unknown) => {
          ambientCalls += 1;
          return originalNumberIsInteger(value);
        }) as typeof Number.isInteger;
        Object.getOwnPropertyDescriptor = ((value: object, key: PropertyKey) => {
          ambientCalls += 1;
          return originalObjectGetOwnPropertyDescriptor(value, key);
        }) as typeof Object.getOwnPropertyDescriptor;
        Object.getPrototypeOf = ((value: object) => {
          ambientCalls += 1;
          return originalObjectGetPrototypeOf(value);
        }) as typeof Object.getPrototypeOf;
        Reflect.ownKeys = ((value: object) => {
          ambientCalls += 1;
          return originalReflectOwnKeys(value);
        }) as typeof Reflect.ownKeys;
        WeakSet.prototype.add = (function (this: WeakSet<object>, value: object) {
          ambientCalls += 1;
          return originalWeakSetAdd.call(this, value);
        }) as typeof WeakSet.prototype.add;
        WeakSet.prototype.delete = (function (this: WeakSet<object>, value: object) {
          ambientCalls += 1;
          return originalWeakSetDelete.call(this, value);
        }) as typeof WeakSet.prototype.delete;
        WeakSet.prototype.has = (function (this: WeakSet<object>, value: object) {
          ambientCalls += 1;
          return originalWeakSetHas.call(this, value);
        }) as typeof WeakSet.prototype.has;
        return originalObjectGetPrototypeOf(target);
      },
    });
    trace.events = proxy;

    let caught: unknown;
    try {
      replayComplementSubtraction(trace);
    } catch (error) {
      caught = error;
    } finally {
      globalThis.structuredClone = originalStructuredClone;
      Array.isArray = originalArrayIsArray;
      Array.prototype[Symbol.iterator] = originalArrayIterator;
      Array.prototype.pop = originalArrayPop;
      Array.prototype.push = originalArrayPush;
      Number.isInteger = originalNumberIsInteger;
      Object.getOwnPropertyDescriptor = originalObjectGetOwnPropertyDescriptor;
      Object.getPrototypeOf = originalObjectGetPrototypeOf;
      Reflect.ownKeys = originalReflectOwnKeys;
      WeakSet.prototype.add = originalWeakSetAdd;
      WeakSet.prototype.delete = originalWeakSetDelete;
      WeakSet.prototype.has = originalWeakSetHas;
    }
    expect(caught).toBeInstanceOf(InvalidComplementRegisterError);
    expect((caught as Error).message).toBe('invalid complement trace data');
    expect(ambientCalls).toBe(0);
    expect(getCount).toBe(0);
  });

  it('rejects unsupported final-state fields that JSON serialization would discard', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    Object.assign(trace.finalState, { unsupported: undefined });
    expect(() => replayComplementSubtraction(trace)).toThrow();
  });

  it('rejects every Symbol key, including non-enumerable fields', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    Object.defineProperty(trace.finalState, Symbol('unsupported'), { value: true, enumerable: false });
    expect(() => replayComplementSubtraction(trace)).toThrow('invalid complement trace data');
  });

  it.each([
    ['Symbol', Symbol('leaf')],
    ['Function', () => 1],
  ])('rejects a %s leaf before comparison', (_label, leaf) => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    (trace.finalState as unknown as Record<string, unknown>).subtractionReadout = leaf;
    expect(() => replayComplementSubtraction(trace)).toThrow('invalid complement trace data');
  });

  it.each([
    ['Date', new Date(0)],
    ['Map', new Map([['key', 'value']])],
    ['Set', new Set(['value'])],
    ['custom prototype', Object.create({ inherited: true })],
    ['array subclass', new (class TraceArray extends Array<unknown> {})(1)],
  ])('rejects a %s outside the exact ordinary-container contract', (_label, value) => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    trace.finalState = value as unknown as ComplementRegisterTrace['finalState'];
    expect(() => replayComplementSubtraction(trace)).toThrow('invalid complement trace data');
  });

  it.each([
    ['Date', () => new Date(0)],
    ['Map', () => new Map()],
    ['Set', () => new Set()],
    ['boxed Number', () => Object(0)],
    ['boxed Boolean', () => Object(false)],
    ['ArrayBuffer', () => new ArrayBuffer(0)],
    ['DataView', () => new DataView(new ArrayBuffer(0))],
    ['Uint8Array', () => new Uint8Array(0)],
  ])('rejects a prototype-spoofed %s with an otherwise valid trace shape', (_label, createExotic) => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    const exotic = createExotic();
    Object.setPrototypeOf(exotic, Object.prototype);
    Object.assign(exotic, trace);
    expect(() => replayComplementSubtraction(exotic as ComplementRegisterTrace)).toThrow(
      'invalid complement trace data',
    );
  });

  it.each([
    ['frozen', Object.freeze],
    ['sealed', Object.seal],
  ])('accepts ordinary %s complement data objects', (_label, constrain) => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    constrain(trace.finalState);
    constrain(trace.events);
    constrain(trace);
    expect(replayComplementSubtraction(trace)).toEqual(trace.finalState);
  });

  it('rejects non-enumerable string properties outside intrinsic array length', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    Object.defineProperty(trace.finalState, 'hidden', { value: true, enumerable: false });
    expect(() => replayComplementSubtraction(trace)).toThrow('invalid complement trace data');
  });

  it('rejects an events array beyond the width-derived structural budget', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    trace.events.length = 18;
    expect(() => replayComplementSubtraction(trace)).toThrow('invalid complement trace data');
  });

  it('rejects nested data beyond the complement-tree depth budget', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    const probe: Record<string, unknown> = {};
    let cursor = probe;
    for (let depth = 0; depth < 33; depth += 1) {
      const next: Record<string, unknown> = {};
      cursor.next = next;
      cursor = next;
    }
    Object.assign(trace.action, { probe });
    expect(() => replayComplementSubtraction(trace)).toThrow('invalid complement trace data');
  });

  it('rejects accessors before reading dynamic trace data', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    let accessed = false;
    Object.defineProperty(trace.finalState, 'subtractionReadout', {
      enumerable: true,
      get: () => {
        accessed = true;
        return 855;
      },
    });
    expect(() => replayComplementSubtraction(trace)).toThrow('invalid complement trace data');
    expect(accessed).toBe(false);
  });

  it('rejects cyclic trace data before structural comparison', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    Object.assign(trace.finalState, { cycle: trace.finalState });
    expect(() => replayComplementSubtraction(trace)).toThrow('invalid complement trace data');
  });

  it('rejects repeated object identities outside the complement JSON-tree shape', () => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    trace.finalState = trace.initialState;
    expect(() => replayComplementSubtraction(trace)).toThrow('invalid complement trace data');
  });

  it.each(['action', 'summary', 'order', 'final', 'version', 'extra', 'unknown'] as const)('fails closed on %s tampering', kind => {
    const trace = clone(traceComplementSubtraction(1200, 345, 4));
    if (kind === 'action') trace.action.subtrahend += 1;
    if (kind === 'summary') {
      const event = trace.events.find(item => item.type === 'CARRY_BOUNDARY_SUMMARY');
      if (event?.type === 'CARRY_BOUNDARY_SUMMARY') event.crossingCount += 1;
    }
    if (kind === 'order') [trace.events[1], trace.events[2]] = [trace.events[2], trace.events[1]];
    if (kind === 'final') trace.finalState.subtractionReadout += 1;
    if (kind === 'version') (trace as unknown as { version: number }).version = 1;
    if (kind === 'extra') Object.assign(trace.action, { extra: true });
    if (kind === 'unknown') (trace.events[0] as { type: string }).type = 'UNKNOWN';
    expect(() => replayComplementSubtraction(trace)).toThrow();
  });

  it('rejects invalid width/value, underflow, overflow-shaped state and unknown action', () => {
    expect(() => traceComplementSubtraction(3, 4, 1)).toThrow(/0 <= B <= A/);
    expect(() => createComplementRegister(0, 0)).toThrow(/width/);
    expect(() => createComplementRegister(100, 2)).toThrow(/fit/);
    const state = createComplementRegister(9, 1);
    expect(() => transitionComplementRegister({ ...state, modulus: 100 }, { type: 'ADD_SUBTRAHEND_FORWARD', cycleId: 'bad', subtrahend: 0 })).toThrow(/modulus/);
    expect(() => transitionComplementRegister(createComplementRegister(12, 2), { type: 'UNKNOWN', cycleId: 'x', subtrahend: 1 } as never)).toThrow(/unsupported complement action/);
  });
});
