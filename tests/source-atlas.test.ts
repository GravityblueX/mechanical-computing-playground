import { describe, expect, it } from 'vitest';
import { getNamedMachineSourceAnchor, NAMED_MACHINE_SOURCE_ANCHORS, sourceAnchorsForTrack } from '../src/exhibits/source-atlas';

describe('named-machine source anchor atlas', () => {
  it('has unique ids and complete two-axis source metadata', () => {
    const ids = NAMED_MACHINE_SOURCE_ANCHORS.map(anchor => anchor.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const anchor of NAMED_MACHINE_SOURCE_ANCHORS) {
      expect(['H', 'R']).toContain(anchor.claimType);
      expect(['E1', 'E2', 'E3']).toContain(anchor.evidenceStrength);
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

  it('keeps the Curta patent distinct from production models and operator procedure', () => {
    const patent = getNamedMachineSourceAnchor('curta-us2525352');
    expect(patent).toMatchObject({ documentRole: 'patent', accessKind: 'direct primary facsimile', fullFacsimileInspected: true });
    expect(patent.notEstablished.map(item => item.en).join(' ')).toMatch(/every production Type I or Type II.*operator procedure/);
  });

  it('keeps Curta operator and service documents in their actual roles', () => {
    const operator = getNamedMachineSourceAnchor('curta-operator-guide');
    const service = getNamedMachineSourceAnchor('curta-type1-service-1967');
    expect(operator).toMatchObject({ documentRole: 'operator manual', accessKind: 'specialist-hosted primary facsimile' });
    expect(operator.notEstablished.map(item => item.en).join(' ')).toMatch(/service linkage geometry/);
    expect(service).toMatchObject({ documentRole: 'service manual', generation: { en: expect.stringMatching(/Model I/) } });
    expect(service.supports.map(item => item.en).join(' ')).not.toMatch(/operator instructions/);
    expect(service.notEstablished.map(item => item.en).join(' ')).toMatch(/operator instructions.*Type II/);
  });

  it('requires facsimile inspection before Analytical Engine page claims', () => {
    const primary = getNamedMachineSourceAnchor('ae-menabrea-lovelace-1843');
    const transcription = getNamedMachineSourceAnchor('ae-hpb-1888-transcription');
    expect(primary).toMatchObject({ fullFacsimileInspected: true, accessKind: 'direct primary facsimile' });
    expect(primary.pageFigureAnchors).toEqual(expect.arrayContaining([expect.stringMatching(/printed p\. 677/), expect.stringMatching(/printed p\. 679/), expect.stringMatching(/printed p\. 704/)]));
    expect(transcription).toMatchObject({ fullFacsimileInspected: false, accessKind: 'specialist transcription', pageFigureAnchors: [] });
  });

  it('keeps Analytical Engine design, reconstruction, and repository timing separate', () => {
    const drawing = getNamedMachineSourceAnchor('ae-bab-a-125');
    const walker = getNamedMachineSourceAnchor('ae-walker-fourmilab');
    expect(drawing.notEstablished.map(item => item.en).join(' ')).toMatch(/complete built Analytical Engine.*repository event sequence/);
    expect(walker).toMatchObject({ claimType: 'R', accessKind: 'reconstruction documentation' });
    expect(walker.notEstablished.map(item => item.en).join(' ')).toMatch(/nineteenth-century punched-card syntax.*historical reader order/);
    for (const anchor of sourceAnchorsForTrack('analytical-engine')) expect(anchor.notEstablished.map(item => item.en).join(' ')).toMatch(/repository|this repository|本站/);
  });

  it('covers all four tracks non-trivially and exposes no pseudo-quality score', () => {
    expect(sourceAnchorsForTrack('difference-engine-no-2').length).toBeGreaterThanOrEqual(5);
    expect(sourceAnchorsForTrack('bush-differential-analyzer').length).toBeGreaterThanOrEqual(6);
    expect(sourceAnchorsForTrack('curta').length).toBeGreaterThanOrEqual(2);
    expect(sourceAnchorsForTrack('analytical-engine').length).toBeGreaterThanOrEqual(4);
    const keys = NAMED_MACHINE_SOURCE_ANCHORS.flatMap(anchor => Object.keys(anchor));
    expect(keys).not.toEqual(expect.arrayContaining(['reliabilityScore', 'efficiencyScore', 'fidelityScore', 'confidenceScore', 'sourceQualityScore']));
  });

  it('fails closed for unknown anchor ids', () => {
    expect(() => getNamedMachineSourceAnchor('unknown')).toThrow(/unknown named-machine source anchor/);
  });
});
