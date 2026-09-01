import { describe, expect, it } from 'vitest';
import { compare314x27 } from '../src/exhibits/multiplication-compare';
import { getOperatorWorkProfile, OPERATOR_WORK_PROFILES } from '../src/exhibits/operator-work';

describe('operator/machine arithmetic-work profiles', () => {
  it('has unique required P/M scenarios with anchors and boundaries', () => {
    const ids = OPERATOR_WORK_PROFILES.map(profile => profile.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(['multiplication-314x27', 'key-driven-34', 'division-8478-by-314', 'printing-ledger-subtotal-total']));
    for (const profile of OPERATOR_WORK_PROFILES) {
      expect(profile.claimType).toBe('P/M');
      expect(profile.sourceAnchor).toMatch(/^research\//);
      expect(profile.operatorResponsibilities.length).toBeGreaterThan(0);
      expect(profile.machineResponsibilities.length).toBeGreaterThan(0);
      expect(profile.notEstablished.length).toBeGreaterThan(0);
    }
  });

  it('derives multiplication counts from the existing comparison and direct trace', () => {
    const comparison = compare314x27();
    const profile = getOperatorWorkProfile('multiplication-314x27');
    const paths = Object.fromEntries(profile.multiplicationPaths!.map(path => [path.id, path]));
    expect(paths['repeated-addition'].operatorRepetitions).toBe(comparison.paths.repeatedAddition.operatorRepetitions);
    expect(paths['stepped-drum'].operationCycles).toBe(comparison.paths.steppedDrum.operationCycles);
    expect(paths.pinwheel.operationCycles).toBe(comparison.paths.pinwheel.operationCycles);
    expect(paths['direct-multiplication'].operationCycles).toBe(comparison.directMultiplication.trace.events.filter(event => event.type === 'OPERATION_CYCLE').length);
    expect(paths['direct-multiplication'].operationCycles).toBe(2);
    expect(profile.observedCounts.find(item => item.actionClass === 'shift/place management')?.count).toBe(1);
  });

  it('derives key-driven 34 from two key-stroke cycles and no crank', () => {
    const profile = getOperatorWorkProfile('key-driven-34');
    expect(profile.observedCounts.find(item => item.actionClass === 'repetition/cycle')?.count).toBe(2);
    expect(profile.outcome.en).toContain('accumulator 34');
    expect(JSON.stringify(profile)).not.toMatch(/CRANK|separate crank action/);
    expect(profile.outcome.en).toContain('no separate crank event');
  });

  it('keeps division overshoot, correction, subtraction, and place shift visible', () => {
    const profile = getOperatorWorkProfile('division-8478-by-314');
    expect(profile.observedCounts.find(item => item.derivedFrom.includes('SUBTRACT_ONCE'))?.count).toBe(10);
    expect(profile.observedCounts.find(item => item.derivedFrom.includes('OVERSHOOT_DETECTED'))?.count).toBe(1);
    expect(profile.observedCounts.find(item => item.actionClass === 'correction')?.count).toBe(1);
    expect(profile.observedCounts.find(item => item.actionClass === 'shift/place management')?.count).toBe(1);
    expect(profile.outcome.en).toContain('quotient 27');
  });

  it('separates item entry from output requests and preserves subtotal/total semantics', () => {
    const profile = getOperatorWorkProfile('printing-ledger-subtotal-total');
    expect(profile.observedCounts.find(item => item.actionClass === 'arithmetic entry')?.count).toBe(3);
    expect(profile.observedCounts.find(item => item.actionClass === 'output request')?.count).toBe(2);
    expect(profile.outcome.en).toContain('subtotal 20 retained 20');
    expect(profile.outcome.en).toContain('total 25 cleared to 0');
    expect(profile.persistentOutputResponsibility).not.toBeNull();
  });

  it('contains no scalar ranking or pseudo-historical productivity data', () => {
    const keys = OPERATOR_WORK_PROFILES.flatMap(profile => Object.keys(profile));
    expect(keys).not.toEqual(expect.arrayContaining(['efficiencyScore', 'automationPercentage', 'historicalSeconds', 'wage', 'cost', 'failureProbability', 'throughput']));
    const serialized = JSON.stringify(OPERATOR_WORK_PROFILES);
    expect(serialized).not.toMatch(/fastest machine|automation percentage|seconds per operation|wage figure|universal throughput/i);
  });

  it('fails closed for unknown profile IDs', () => {
    expect(() => getOperatorWorkProfile('unknown' as never)).toThrow(/unknown operator-work profile/);
  });
});
