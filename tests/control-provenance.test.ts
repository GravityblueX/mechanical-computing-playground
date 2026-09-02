import { describe, expect, it } from 'vitest';
import { CONTROL_EVIDENCE_PROFILES, getControlEvidenceProfile } from '../src/exhibits/control-provenance';

describe('typed control provenance dataset', () => {
  it('has unique IDs and all required source profiles', () => {
    const ids = CONTROL_EVIDENCE_PROFILES.map(profile => profile.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining([
      'thomas-1868-pamphlet', 'thomas-1867-object', 'thomas-ca1873-object', 'thomas-ca1820-object', 'odhner-us1510100', 'felt-us960528', 'turck-us1154897',
      'ziehm-us1110734', 'felt-controlled-key-manuals', 'comptometer-model-f-objects',
      'controlled-key-model-mapping-e3', 'pascaline-complement',
    ]));
  });

  it('keeps historical source identity and the two-axis vocabulary explicit', () => {
    for (const profile of CONTROL_EVIDENCE_PROFILES) {
      expect(profile.sourceLabel.trim()).not.toBe('');
      expect(() => new URL(profile.sourceUrl)).not.toThrow();
      expect(['H', 'R', 'H/R']).toContain(profile.claimType);
      expect(['E1', 'E2', 'E3', 'E4']).toContain(profile.evidenceStrength);
      expect(profile.claimType).not.toMatch(/^[A-D]$/);
      expect(profile.evidenceStrength).not.toMatch(/^[A-D]$/);
    }
  });

  it('requires documented roles and explicit open/not-established boundaries', () => {
    for (const profile of CONTROL_EVIDENCE_PROFILES) {
      expect(profile.documentedRoles.length).toBeGreaterThan(0);
      expect(profile.notEstablished.length).toBeGreaterThan(0);
      for (const item of [...profile.documentedRoles, ...profile.notEstablished]) {
        expect(item.en.trim()).not.toBe('');
        expect(item.zh.trim()).not.toBe('');
      }
    }
  });

  it('keeps Thomas pamphlet, 1867, ca.1873, early object and P/M boundaries distinct', () => {
    const pamphlet = getControlEvidenceProfile('thomas-1868-pamphlet');
    const object1867 = getControlEvidenceProfile('thomas-1867-object');
    const object1873 = getControlEvidenceProfile('thomas-ca1873-object');
    const early = getControlEvidenceProfile('thomas-ca1820-object');
    expect(pamphlet).toMatchObject({ claimType: 'H', evidenceStrength: 'E1', dateOrModel: expect.stringMatching(/MA\.318961\.02.*NMAH-AHB2018q019415.*1 canvas.*unnumbered opening/) });
    expect(pamphlet.documentedRoles.map(item => item.en).join(' ')).toMatch(/A setting sliders.*B selects.*C windows.*D windows.*N is.*O independently zeros D.*P independently zeros C.*lift and slide.*M/);
    expect(pamphlet.notEstablished.map(item => item.en).join(' ')).toMatch(/step sequence.*repeated-turn counts.*overshoot.*add-back.*counter direction.*phase names.*Thomas terminology/);
    expect(object1867.documentedRoles.map(item => item.en).join(' ')).toMatch(/eight setting levers.*seven positions.*clockwise for subtraction\/division.*counterclockwise for addition\/multiplication.*right knob zeros/);
    expect(object1867.notEstablished.map(item => item.en).join(' ')).toMatch(/result-zeroing control.*1868 pamphlet procedure applicability/);
    expect(object1873).toMatchObject({ dateOrModel: expect.stringMatching(/MA\.335215.*serial 1068/) });
    expect(object1873.documentedRoles.map(item => item.en).join(' ')).toMatch(/ten setting levers.*11 multiplier\/quotient.*20 result.*right black knob.*left knob.*instruction book.*1868/);
    expect(object1873.notEstablished.map(item => item.en).join(' ')).toMatch(/every procedure.*unchanged.*1867 object.*overshoot\/add-back/);
    expect(early.documentedRoles.map(item => item.en).join(' ')).toMatch(/three setting levers.*multiplication lever.*red\/black result-window.*red ribbon.*no revolution register/);
    expect(early.notEstablished.map(item => item.en).join(' ')).toMatch(/later crank.*dual-register.*1820 patent drawings/);
  });

  it('separates Controlled-Key manual, patent, object, E3 mapping and P/M boundaries', () => {
    const patent = getControlEvidenceProfile('ziehm-us1110734');
    const manual = getControlEvidenceProfile('felt-controlled-key-manuals');
    const objects = getControlEvidenceProfile('comptometer-model-f-objects');
    const mapping = getControlEvidenceProfile('controlled-key-model-mapping-e3');
    expect(patent).toMatchObject({ claimType: 'H', evidenceStrength: 'E1', dateOrModel: expect.stringMatching(/US 1,110,734.*claims 11, 16, 19/) });
    expect(patent.documentedRoles.map(item => item.en).join(' ')).toMatch(/partial depression.*other columns.*fully depressing.*release key 134.*does not permanently release/);
    expect(patent.notEstablished.map(item => item.en).join(' ')).toMatch(/repository event names.*exactly-once commit.*patent-to-production/);
    expect(manual).toMatchObject({ claimType: 'H', evidenceStrength: 'E1', dateOrModel: expect.stringMatching(/printed p\. 8.*printed pp\. IX–XI/) });
    expect(manual.documentedRoles.map(item => item.en).join(' ')).toMatch(/addition.*red Correction\/Release Button.*all columns except.*multiplication\/division.*cancel/);
    expect(manual.notEstablished.map(item => item.en).join(' ')).toMatch(/every edition or model.*registration threshold.*clearing\/zeroing/);
    expect(objects).toMatchObject({ claimType: 'H', evidenceStrength: 'E1' });
    expect(objects.notEstablished.map(item => item.en).join(' ')).toMatch(/last plate date.*US 1,110,734.*photographs/);
    expect(mapping).toMatchObject({ claimType: 'H', evidenceStrength: 'E3' });
    expect(mapping.notEstablished.map(item => item.en).join(' ')).toMatch(/primary proof.*commercial Model E\/F.*matching dates/);
  });

  it('does not relabel the repository P/M event sequence as historical evidence', () => {
    const serialized = JSON.stringify(CONTROL_EVIDENCE_PROFILES);
    expect(serialized).not.toContain('SETTING_LOCKED → CRANK_RELEASED');
    expect(serialized).not.toContain('historical event sequence');
    expect(getControlEvidenceProfile('odhner-us1510100').notEstablished.some(item => item.en.includes('repository interlock'))).toBe(true);
  });

  it('fails closed for unknown profile IDs', () => {
    expect(() => getControlEvidenceProfile('unknown' as never)).toThrow(/unknown control evidence profile/);
  });
});
