import { describe, expect, it } from 'vitest';
import { CARRY_EVIDENCE_PROFILES, getCarryEvidenceProfile } from '../src/exhibits/carry-provenance';

describe('typed carry provenance dataset', () => {
  it('has unique IDs and all source-separated required profiles', () => {
    const ids = CARRY_EVIDENCE_PROFILES.map(profile => profile.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(['pascal-avis', 'pascaline-cnam', 'pascaline-cmu-reconstruction', 'felt-us366945', 'felt-us762520', 'comptometer-model-a', 'odhner-us514725', 'odhner-us1377269', 'talamini-marchant-us1867603', 'thomas-1820-patent', 'thomas-1820-smithsonian', 'thomas-1865', 'thomas-de-bojano-1880', 'thomas-1880-revision-history']));
  });
  it('requires current two-axis evidence, source identity, roles, and open boundaries', () => {
    for (const profile of CARRY_EVIDENCE_PROFILES) {
      expect(['H', 'R']).toContain(profile.claimType); expect(['E1', 'E2', 'E3', 'E4']).toContain(profile.evidenceStrength);
      expect(profile.sourceLabel.trim()).not.toBe(''); expect(() => new URL(profile.sourceUrl)).not.toThrow();
      expect(profile.documentedRoles.length).toBeGreaterThan(0); expect(profile.notEstablished.length).toBeGreaterThan(0);
      expect(profile.operatorImplication.en.trim()).not.toBe(''); expect(profile.operatorImplication.zh.trim()).not.toBe('');
    }
  });
  it('keeps early Felt and delayed Duplex contexts separate', () => {
    const early = getCarryEvidenceProfile('felt-us366945'); const duplex = getCarryEvidenceProfile('felt-us762520');
    expect(early.sourceUrl).toContain('US366945'); expect(duplex.sourceUrl).toContain('US762520');
    expect(early.notEstablished.some(item => item.en.includes('Duplex'))).toBe(true);
    expect(duplex.documentedRoles.some(item => item.en.includes('delays carry'))).toBe(true);
  });
  it('does not claim an exact patent linkage for the Model A catalog object', () => {
    expect(getCarryEvidenceProfile('comptometer-model-a').notEstablished.some(item => item.en.includes('exact US762520 linkage'))).toBe(true);
  });
  it('keeps Pascal primary operational text, institutional mechanism description, and reconstruction distinct', () => {
    expect(getCarryEvidenceProfile('pascal-avis')).toMatchObject({ claimType: 'H', evidenceStrength: 'E1' });
    expect(getCarryEvidenceProfile('pascaline-cnam')).toMatchObject({ claimType: 'H', evidenceStrength: 'E2' });
    expect(getCarryEvidenceProfile('pascaline-cmu-reconstruction')).toMatchObject({ claimType: 'R', evidenceStrength: 'E2' });
    expect(getCarryEvidenceProfile('pascal-avis').notEstablished.some(item => item.en.includes('does not describe sautoir geometry'))).toBe(true);
  });
  it('never presents the repository serialized carry event chain as historical timing', () => {
    const text = JSON.stringify(CARRY_EVIDENCE_PROFILES); expect(text).not.toContain('CARRY_PENDING → CARRY_PROPAGATED');
    expect(getCarryEvidenceProfile('felt-us762520').notEstablished.some(item => item.en.includes('repository serialized'))).toBe(true);
  });
  it('keeps 1894, 1921, and 1932 rotary patent contexts separate', () => {
    expect(getCarryEvidenceProfile('odhner-us514725').sourceUrl).toContain('US514725');
    expect(getCarryEvidenceProfile('odhner-us1377269').sourceUrl).toContain('US1377269');
    expect(getCarryEvidenceProfile('talamini-marchant-us1867603').sourceUrl).toContain('US1867603');
  });
  it('assigns rapid-rotation miscalculation only to the 1921 improvement', () => {
    expect(getCarryEvidenceProfile('odhner-us1377269').documentedRoles.some(item => item.en.includes('miscalculation'))).toBe(true);
    expect(getCarryEvidenceProfile('odhner-us514725').documentedRoles.some(item => item.en.includes('miscalculation'))).toBe(false);
  });
  it('keeps the 1932 result bounded and attributes it to Talamini/Marchant', () => {
    const profile = getCarryEvidenceProfile('talamini-marchant-us1867603');
    expect(profile.sourceLabel).toContain('Louis Talamini / Marchant');
    expect(profile.notEstablished.some(item => item.en.includes('universal 22 percent'))).toBe(true);
    expect(profile.notEstablished.some(item => item.en.includes('authorship by Odhner'))).toBe(true);
  });
  it('keeps the 1820 patent distinct from the earliest surviving object', () => {
    expect(getCarryEvidenceProfile('thomas-1820-patent')).toMatchObject({ claimType: 'H', evidenceStrength: 'E1' });
    const object = getCarryEvidenceProfile('thomas-1820-smithsonian');
    expect(object).toMatchObject({ claimType: 'H', evidenceStrength: 'E2' });
    expect(object.documentedRoles.some(item => item.en.includes('not identical to the 1820 patent drawings'))).toBe(true);
  });
  it('assigns successive phasing, rapid overrun, and older false results to Thomas 1865', () => {
    const roles = getCarryEvidenceProfile('thomas-1865').documentedRoles.map(item => item.en).join(' ');
    expect(roles).toContain('one after another'); expect(roles).toContain('one or two teeth'); expect(roles).toContain('false results');
    expect(roles).not.toContain('spiral');
  });
  it('keeps the 1880 proposal separate from production interpretation', () => {
    const patent = getCarryEvidenceProfile('thomas-de-bojano-1880'); const history = getCarryEvidenceProfile('thomas-1880-revision-history');
    expect(patent).toMatchObject({ claimType: 'H', evidenceStrength: 'E1' });
    expect(patent.documentedRoles.some(item => item.en.includes('20-part') && item.en.includes('10-part'))).toBe(true);
    expect(patent.notEstablished.some(item => item.en.includes('production adoption'))).toBe(true);
    expect(history).toMatchObject({ claimType: 'R', evidenceStrength: 'E3' });
    expect(history.documentedRoles.some(item => item.en.includes('phantom'))).toBe(true);
  });
  it('does not collapse Thomas and Odhner/Talamini source identities', () => {
    const thomas = CARRY_EVIDENCE_PROFILES.filter(profile => profile.id.startsWith('thomas'));
    expect(thomas.every(profile => !/Odhner|Talamini|Marchant/.test(profile.sourceLabel))).toBe(true);
    expect(getCarryEvidenceProfile('talamini-marchant-us1867603').sourceLabel).not.toContain('Thomas');
  });
  it('fails closed for unknown profile IDs', () => { expect(() => getCarryEvidenceProfile('bad' as never)).toThrow(/unknown carry evidence profile/); });
});
