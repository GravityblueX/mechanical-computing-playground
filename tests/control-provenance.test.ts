import { describe, expect, it } from 'vitest';
import { CONTROL_EVIDENCE_PROFILES, getControlEvidenceProfile } from '../src/exhibits/control-provenance';

describe('typed control provenance dataset', () => {
  it('has unique IDs and all required source profiles', () => {
    const ids = CONTROL_EVIDENCE_PROFILES.map(profile => profile.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining([
      'thomas-1867-object', 'odhner-us1510100', 'felt-us960528', 'turck-us1154897', 'pascaline-complement',
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
