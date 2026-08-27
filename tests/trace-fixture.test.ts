import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { MechanismEvent } from '../src/core/events';
import { parseTrace, replayTrace, serializeTrace } from '../src/core/trace';
import {
  createCrankTrace,
  reduceDecimalRegisterEvent,
  type CrankAction,
  type DecimalRegisterState,
} from '../src/mechanism-core';

const fixtureUrl = new URL('../fixtures/carry/0099-plus-one.json', import.meta.url);

describe('0099 canonical carry fixture', () => {
  it('matches generated canonical bytes', () => {
    const fixture = readFileSync(fixtureUrl, 'utf8');
    expect(serializeTrace(createCrankTrace([9, 9, 0, 0]))).toBe(fixture);
  });

  it('replays without running the transition or using a UI', () => {
    const fixture = readFileSync(fixtureUrl, 'utf8');
    const trace = parseTrace<DecimalRegisterState, CrankAction, MechanismEvent>(fixture);
    expect(replayTrace(trace, reduceDecimalRegisterEvent)).toEqual({
      mechanismId: 'decimal-register',
      digits: [0, 0, 1, 0],
    });
  });
});
