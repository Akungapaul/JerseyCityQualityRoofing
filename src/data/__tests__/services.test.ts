import { describe, it, expect } from 'vitest';
import {
  getService,
  getAllServiceSlugs,
  getResidentialServiceSlugs,
  getCommercialServiceSlugs,
} from '@/data/services';

describe('services registry', () => {
  it('contains exactly 8 services', () => {
    expect(getAllServiceSlugs()).toHaveLength(8);
  });

  it('contains 4 residential services', () => {
    expect(getResidentialServiceSlugs()).toHaveLength(4);
  });

  it('contains 4 commercial services', () => {
    expect(getCommercialServiceSlugs()).toHaveLength(4);
  });

  it('contains all expected service slugs', () => {
    const slugs = getAllServiceSlugs();
    const expected = [
      'roof-repair', 'roof-replacement', 'roof-inspection', 'emergency-roofing',
      'flat-roof-systems', 'roof-maintenance', 'commercial-repair', 'commercial-replacement',
    ];
    expected.forEach((slug) => {
      expect(slugs).toContain(slug);
    });
  });

  it('getService returns data for valid slug', () => {
    const service = getService('roof-repair');
    expect(service).toBeDefined();
    expect(service?.name).toBe('Roof Repair');
    expect(service?.category).toBe('residential');
  });

  it('getService returns undefined for invalid slug', () => {
    expect(getService('nonexistent')).toBeUndefined();
  });

  it('every service has 5+ FAQs', () => {
    getAllServiceSlugs().forEach((slug) => {
      const service = getService(slug);
      expect(service?.faqs.length).toBeGreaterThanOrEqual(5);
    });
  });

  it('every service has processSteps', () => {
    getAllServiceSlugs().forEach((slug) => {
      const service = getService(slug);
      expect(service?.processSteps.length).toBeGreaterThan(0);
    });
  });

  it('every service has materials', () => {
    getAllServiceSlugs().forEach((slug) => {
      const service = getService(slug);
      expect(service?.materials.length).toBeGreaterThan(0);
    });
  });

  it('emergency-roofing has emergencyAvailable: true', () => {
    const service = getService('emergency-roofing');
    expect(service?.emergencyAvailable).toBe(true);
  });
});
