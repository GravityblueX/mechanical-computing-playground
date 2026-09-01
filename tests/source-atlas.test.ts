import { describe, expect, it } from 'vitest';
import { getNamedMachineSourceAnchor, NAMED_MACHINE_SOURCE_ANCHORS, sourceAnchorsForTrack } from '../src/exhibits/source-atlas';

describe('named-machine source anchor atlas', () => {
  it('has unique ids and complete two-axis source metadata', () => {
    const ids = NAMED_MACHINE_SOURCE_ANCHORS.map(anchor => anchor.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const anchor of NAMED_MACHINE_SOURCE_ANCHORS) {
      expect(['H', 'R']).toContain(anchor.claimType);
      expect(['E1', 'E2']).toContain(anchor.evidenceStrength);
      expect(anchor.institution.trim()).not.toBe('');
      expect(anchor.recordIdentifier.trim()).not.toBe('');
      expect(() => new URL(anchor.sourceUrl)).not.toThrow();
      expect(anchor.supports.length).toBeGreaterThan(0);
      expect(anchor.notEstablished.length).toBeGreaterThan(0);
      expect(anchor.researchNoteAnchor).toMatch(/^research\//);
    }
  });

  it('keeps BAB/A/171 calculation evidence out of printer timing and geometry', () => {
    const anchor = getNamedMachineSourceAnchor('bab-a-171');
    expect(anchor.supports.map(item => item.en).join(' ')).toMatch(/calculation|addition-carriage/);
    expect(anchor.supports.map(item => item.en).join(' ')).not.toMatch(/printer timing|printer geometry/);
    expect(anchor.notEstablished.map(item => item.en).join(' ')).toMatch(/printer timing.*printer geometry/);
  });

  it('does not turn printing/stereotype drawings into a completed lifetime printer', () => {
    for (const id of ['bab-b-013', 'bab-b-014']) {
      const anchor = getNamedMachineSourceAnchor(id);
      expect(anchor.notEstablished.map(item => item.en).join(' ')).toMatch(/built in Babbage’s lifetime/);
    }
  });

  it('keeps the modern DE2 engine an institutional reconstruction', () => {
    const anchor = getNamedMachineSourceAnchor('de2-reconstruction-1991-2002');
    expect(anchor).toMatchObject({ claimType: 'R', evidenceStrength: 'E2', accessKind: 'institutional reconstruction' });
    expect(anchor.notEstablished.map(item => item.en).join(' ')).toMatch(/Babbage-lifetime artifact/);
  });

  it('limits frontlash to the catalogued adjacent-shaft compensation role', () => {
    const anchor = getNamedMachineSourceAnchor('bush-frontlash-1983-3002-04');
    expect(anchor.supports.map(item => item.en).join(' ')).toMatch(/backlash.*output shaft.*adjacent unit.*input shaft/);
    expect(anchor.notEstablished.map(item => item.en).join(' ')).toMatch(/numerical backlash.*residual error/);
    const keys = Object.keys(anchor);
    expect(keys).not.toEqual(expect.arrayContaining(['backlashMagnitude', 'residualError', 'gearCount', 'linkagePath', 'rpm', 'tolerance', 'force']));
  });

  it('keeps input, adder, integrator, and tracer roles as separate records', () => {
    const roles = ['bush-input-1983-3002-01', 'bush-adder-1983-3002-02', 'bush-integrator-ma-314824', 'bush-tracer-1983-3002-03'];
    expect(roles.map(id => getNamedMachineSourceAnchor(id).recordIdentifier)).toHaveLength(4);
    expect(new Set(roles.map(id => getNamedMachineSourceAnchor(id).recordIdentifier)).size).toBe(4);
    for (const id of roles) expect(getNamedMachineSourceAnchor(id).notEstablished.map(item => item.en).join(' ')).toMatch(/repository A\+B/);
  });

  it('allows no Bush page/figure claim without a directly inspected facsimile', () => {
    const bush = getNamedMachineSourceAnchor('bush-1931-paper');
    expect(bush).toMatchObject({ accessKind: 'bibliographic-only', fullFacsimileInspected: false, pageFigureAnchors: [] });
    if (!bush.fullFacsimileInspected) expect(bush.pageFigureAnchors).toHaveLength(0);
  });

  it('covers both tracks non-trivially and exposes no pseudo-quality score', () => {
    expect(sourceAnchorsForTrack('difference-engine-no-2').length).toBeGreaterThanOrEqual(5);
    expect(sourceAnchorsForTrack('bush-differential-analyzer').length).toBeGreaterThanOrEqual(6);
    const keys = NAMED_MACHINE_SOURCE_ANCHORS.flatMap(anchor => Object.keys(anchor));
    expect(keys).not.toEqual(expect.arrayContaining(['reliabilityScore', 'efficiencyScore', 'fidelityScore', 'confidenceScore', 'sourceQualityScore']));
  });

  it('fails closed for unknown anchor ids', () => {
    expect(() => getNamedMachineSourceAnchor('unknown')).toThrow(/unknown named-machine source anchor/);
  });
});
