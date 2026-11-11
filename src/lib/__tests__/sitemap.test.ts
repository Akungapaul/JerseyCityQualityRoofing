import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { BASE_URL } from '@/lib/constants';

describe('sitemap generation', () => {
  it('returns an array of sitemap entries', () => {
    const entries = sitemap();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  it('generates 48 total URLs', () => {
    const entries = sitemap();
    // Single-city restructure (2026-11-06): 11 static (homepage, about,
    // privacy-policy, terms-of-service, contact, gallery, blog, guides,
    // guides/cost, guides/materials, problems) + 8 Jersey City
    // service-in-city + 8 blog + 8 cost guides + 6 material guides
    // + 5 problems = 46. The 12 city hubs, the other 88 combos,
    // /service-areas, and the /services index layer were retired.
    // Toms River treatment (2026-11-10): +2 flat Rule 7 service hubs
    // (/residential-roofing-jersey-city-nj and
    // /commercial-roofing-jersey-city-nj) = 48.
    expect(entries).toHaveLength(48);
  });

  it('includes both flat service hubs (2026-11-10)', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${BASE_URL}/residential-roofing-jersey-city-nj`);
    expect(urls).toContain(`${BASE_URL}/commercial-roofing-jersey-city-nj`);
  });

  it('excludes testimonials stub page from sitemap', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).not.toContain(`${BASE_URL}/testimonials`);
  });

  it('includes homepage with priority 1.0', () => {
    const entries = sitemap();
    const home = entries.find((e) => e.url.endsWith('.com'));
    expect(home?.priority).toBe(1.0);
  });

  it('includes no city hub pages (retired 2026-11-06)', () => {
    const entries = sitemap();
    const cityPages = entries.filter((e) =>
      e.url.includes('/roofing-contractor-')
    );
    expect(cityPages).toHaveLength(0);
  });

  it('includes all service-in-city pages', () => {
    const entries = sitemap();
    const serviceCityPages = entries.filter((e) =>
      e.url.match(/\/[a-z0-9-]+-nj$/) && !e.url.includes('/roofing-contractor-')
    );
    // Single-city site: 8 services x Jersey City only = 8, plus the 2
    // flat service hubs added 2026-11-10, whose slugs also match the
    // flat -nj pattern but are hubs, not service-in-city combos.
    const hubPages = serviceCityPages.filter(
      (e) =>
        e.url.endsWith('/residential-roofing-jersey-city-nj') ||
        e.url.endsWith('/commercial-roofing-jersey-city-nj')
    );
    expect(hubPages).toHaveLength(2);
    expect(serviceCityPages.length - hubPages.length).toBe(8);
  });

  it('excludes the retired /services index layer and /service-areas', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).not.toContain(`${BASE_URL}/services`);
    expect(urls).not.toContain(`${BASE_URL}/services/residential`);
    expect(urls).not.toContain(`${BASE_URL}/services/commercial`);
    expect(urls).not.toContain(`${BASE_URL}/service-areas`);
  });

  it('all URLs start with https://', () => {
    const entries = sitemap();
    entries.forEach((entry) => {
      expect(entry.url).toMatch(/^https:\/\//);
    });
  });

  it('all entries have changeFrequency and priority', () => {
    const entries = sitemap();
    entries.forEach((entry) => {
      expect(entry.changeFrequency).toBeDefined();
      expect(entry.priority).toBeDefined();
      expect(entry.priority).toBeGreaterThanOrEqual(0);
      expect(entry.priority).toBeLessThanOrEqual(1);
    });
  });
});
