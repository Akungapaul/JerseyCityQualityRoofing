import { describe, it, expect } from 'vitest';
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
});
