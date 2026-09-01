import { describe, expect, it } from 'vitest';
import { MECHANICAL_ERROR_CONTROL_PROFILES, getMechanicalErrorControlProfile } from '../src/exhibits/mechanical-error-control';

describe('mechanical error-control provenance', () => {
  it('has unique IDs and all required source contexts', () => {
    const ids = MECHANICAL_ERROR_CONTROL_PROFILES.map(profile => profile.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(['thomas-1865-error-control', 'odhner-us1377269-error-control', 'talamini-marchant-us1867603-error-control', 'bush-frontlash-1983-3002-04']));
  });

  it('requires two-axis evidence, source, problem, control, and explicit boundaries', () => {
    for (const profile of MECHANICAL_ERROR_CONTROL_PROFILES) {
      expect(['H', 'R']).toContain(profile.claimType);
      expect(['E1', 'E2', 'E3', 'E4']).toContain(profile.evidenceStrength);
      expect(profile.sourceLabel.trim()).not.toBe('');
      expect(() => new URL(profile.sourceUrl)).not.toThrow();
      expect(profile.documentedProblem.length).toBeGreaterThan(0);
      expect(profile.documentedControl.length).toBeGreaterThan(0);
      expect(profile.notEstablished.length).toBeGreaterThan(0);
    }
  });

  it('keeps at least three distinct physical error classes visible', () => {
    expect(new Set(MECHANICAL_ERROR_CONTROL_PROFILES.map(profile => profile.errorClass))).toEqual(new Set(['inertia/load', 'carry scheduling', 'backlash/transmission']));
  });

  it('identifies the Bush catalog context and backlash compensation without torque amplification', () => {
    const bush = getMechanicalErrorControlProfile('bush-frontlash-1983-3002-04');
    expect(bush.dateOrModel).toContain('1983.3002.04');
    expect(bush.dateOrModel).toContain('nmah_693235');
    expect(bush.documentedControl.some(item => item.en.includes('compensated for that backlash'))).toBe(true);
    expect(bush.errorClass).toBe('backlash/transmission');
    expect(bush.notEstablished.some(item => item.en.includes('torque amplification'))).toBe(true);
    expect(bush.documentedControl.some(item => item.en.includes('torque'))).toBe(false);
  });

  it('retains Thomas and Odhner/Talamini source identities', () => {
    expect(getMechanicalErrorControlProfile('thomas-1865-error-control').sourceUrl).toContain('PageBrevet1865FR');
    expect(getMechanicalErrorControlProfile('odhner-us1377269-error-control').sourceUrl).toContain('US1377269');
    expect(getMechanicalErrorControlProfile('talamini-marchant-us1867603-error-control').sourceUrl).toContain('US1867603');
    expect(getMechanicalErrorControlProfile('thomas-1865-error-control').sourceLabel).not.toMatch(/Odhner|Talamini|Marchant/);
  });

  it('contains no pseudo-quantitative reliability claims', () => {
    const documented = MECHANICAL_ERROR_CONTROL_PROFILES.flatMap(profile => [...profile.documentedProblem, ...profile.documentedControl]).map(item => item.en).join(' ');
    expect(documented).not.toMatch(/failure probability|safe RPM|tolerance magnitude|residual error/);
    expect(MECHANICAL_ERROR_CONTROL_PROFILES.every(profile => profile.claimType !== ('P' as never))).toBe(true);
  });

  it('fails closed for unknown IDs', () => {
    expect(() => getMechanicalErrorControlProfile('unknown' as never)).toThrow(/unknown mechanical error-control profile/);
  });
});
