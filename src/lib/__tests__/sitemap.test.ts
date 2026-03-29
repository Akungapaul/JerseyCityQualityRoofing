import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';

describe('sitemap generation', () => {
  it('returns an array of sitemap entries', () => {
    const entries = sitemap();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  it('generates 152 total URLs', () => {
    const entries = sitemap();
    // 9 static + 4 residential + 4 commercial + 12 city + 48 res-city + 48 com-city
    // + 8 blog + 8 cost guides + 6 material guides + 5 problems = 152
    expect(entries).toHaveLength(152);
  });

  it('includes homepage with priority 1.0', () => {
    const entries = sitemap();
    const home = entries.find((e) => e.url.endsWith('.com'));
    expect(home?.priority).toBe(1.0);
  });

  it('includes all 12 city hub pages', () => {
    const entries = sitemap();
    const cityPages = entries.filter((e) =>
      e.url.includes('/service-areas/') && !e.url.endsWith('/service-areas')
    );
    expect(cityPages).toHaveLength(12);
  });

  it('includes all service-in-city pages', () => {
    const entries = sitemap();
    const serviceCityPages = entries.filter((e) =>
      e.url.match(/\/services\/(residential|commercial)\/[^/]+\/[^/]+$/)
    );
    // 4 residential x 12 cities + 4 commercial x 12 cities = 96
    expect(serviceCityPages).toHaveLength(96);
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
