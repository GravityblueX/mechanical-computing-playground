import { describe, expect, it } from 'vitest';
import { CARRY_EVIDENCE_PROFILES, getCarryEvidenceProfile } from '../src/exhibits/carry-provenance';

describe('typed carry provenance dataset', () => {
  it('has unique IDs and all source-separated required profiles', () => {
    const ids = CARRY_EVIDENCE_PROFILES.map(profile => profile.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(['pascal-avis', 'pascaline-cnam', 'pascaline-cmu-reconstruction', 'felt-us366945', 'felt-us762520', 'comptometer-model-a', 'odhner-us514725', 'odhner-us1377269', 'talamini-marchant-us1867603']));
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
  it('fails closed for unknown profile IDs', () => { expect(() => getCarryEvidenceProfile('bad' as never)).toThrow(/unknown carry evidence profile/); });
});
