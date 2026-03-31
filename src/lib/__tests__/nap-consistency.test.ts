import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { BUSINESS_INFO } from '@/data/business-info';
import { PHONE_NUMBER, SITE_NAME } from '@/lib/constants';

describe('NAP Consistency', () => {
  it('BUSINESS_INFO.phone matches PHONE_NUMBER constant', () => {
    expect(BUSINESS_INFO.phone).toBe(PHONE_NUMBER);
  });

  it('BUSINESS_INFO.name matches SITE_NAME constant', () => {
    expect(BUSINESS_INFO.name).toBe(SITE_NAME);
  });

  it('BUSINESS_INFO.phone contains area code "(201)"', () => {
    expect(BUSINESS_INFO.phone).toContain('(201)');
  });

  it('BUSINESS_INFO.address has all required fields', () => {
    expect(BUSINESS_INFO.address.street).toBeDefined();
    expect(BUSINESS_INFO.address.street.length).toBeGreaterThan(0);
    expect(BUSINESS_INFO.address.city).toBeDefined();
    expect(BUSINESS_INFO.address.city.length).toBeGreaterThan(0);
    expect(BUSINESS_INFO.address.state).toBeDefined();
    expect(BUSINESS_INFO.address.state.length).toBeGreaterThan(0);
    expect(BUSINESS_INFO.address.zip).toBeDefined();
    expect(BUSINESS_INFO.address.zip.length).toBeGreaterThan(0);
  });

  it('BUSINESS_INFO.serviceAreas has exactly 12 entries', () => {
    expect(BUSINESS_INFO.serviceAreas).toHaveLength(12);
  });

  it('BUSINESS_INFO.email contains "@jerseycityqualityroofing.com"', () => {
    expect(BUSINESS_INFO.email).toContain('@jerseycityqualityroofing.com');
  });

  describe('OG route constants', () => {
    const ogRouteContent = readFileSync(
      resolve(__dirname, '../../app/api/og/route.tsx'),
      'utf-8'
    );

    it('does not contain hardcoded company name literal', () => {
      // The string "Jersey City Quality Roofing" should not appear as a standalone literal
      // (it may appear in an import path or comment, so check for JSX usage pattern)
      expect(ogRouteContent).not.toContain('>Jersey City Quality Roofing<');
      expect(ogRouteContent).not.toContain("'Jersey City Quality Roofing'");
      expect(ogRouteContent).not.toContain('"Jersey City Quality Roofing"');
    });

    it('does not contain hardcoded phone number literal', () => {
      expect(ogRouteContent).not.toContain('(201) 555-0123');
    });

    it('imports SITE_NAME and PHONE_NUMBER from constants', () => {
      expect(ogRouteContent).toContain('SITE_NAME');
      expect(ogRouteContent).toContain('PHONE_NUMBER');
    });
  });
});
