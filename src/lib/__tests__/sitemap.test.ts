import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { BASE_URL } from '@/lib/constants';

describe('sitemap generation', () => {
  it('returns an array of sitemap entries', () => {
    const entries = sitemap();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  it('generates 150 total URLs', () => {
    const entries = sitemap();
    // Flat URL structure (2026-10-17): 11 static/silo index + 12 city hubs + 96 service-in-city
    // + 8 blog + 8 cost guides + 6 material guides + 5 problems = 146, plus the
    // /guides/cost and /guides/materials hub index pages added 2026-10-18 = 148,
    // plus /privacy-policy and /terms-of-service added 2026-10-20 = 150.
    // (The 8 old service pillar pages were merged into the Jersey City combo pages.)
    expect(entries).toHaveLength(150);
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

  it('includes all 12 city hub pages', () => {
    const entries = sitemap();
    const cityPages = entries.filter((e) =>
      e.url.includes('/roofing-contractor-')
    );
    expect(cityPages).toHaveLength(12);
  });

  it('includes all service-in-city pages', () => {
    const entries = sitemap();
    const serviceCityPages = entries.filter((e) =>
      e.url.match(/\/[a-z0-9-]+-nj$/) && !e.url.includes('/roofing-contractor-')
    );
    // 4 residential x 12 cities + 4 commercial x 12 cities = 96
    expect(serviceCityPages).toHaveLength(96);
  });

  it('includes silo index pages for /services, /services/residential, /services/commercial', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${BASE_URL}/services`);
    expect(urls).toContain(`${BASE_URL}/services/residential`);
    expect(urls).toContain(`${BASE_URL}/services/commercial`);
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
