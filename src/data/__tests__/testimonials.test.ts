import { describe, it, expect } from 'vitest';
import {
  TESTIMONIALS,
  getServicePageTestimonials,
} from '@/data/testimonials';
import { BUSINESS_INFO } from '@/data/business-info';

describe('Testimonial Data Completeness', () => {
  it('TESTIMONIALS has exactly 48 entries', () => {
    expect(TESTIMONIALS).toHaveLength(48);
  });

  it('every testimonial has all required fields', () => {
    TESTIMONIALS.forEach((t, index) => {
      expect(t.id, `testimonial[${index}] missing id`).toBeDefined();
      expect(t.name, `testimonial[${index}] missing name`).toBeDefined();
      expect(t.citySlug, `testimonial[${index}] missing citySlug`).toBeDefined();
      expect(t.serviceSlug, `testimonial[${index}] missing serviceSlug`).toBeDefined();
      expect(t.rating, `testimonial[${index}] missing rating`).toBeDefined();
      expect(t.text, `testimonial[${index}] missing text`).toBeDefined();
      expect(t.date, `testimonial[${index}] missing date`).toBeDefined();
      expect(t.projectType, `testimonial[${index}] missing projectType`).toBeDefined();
    });
  });

  it('all ratings are 4 or 5', () => {
    TESTIMONIALS.forEach((t) => {
      expect([4, 5]).toContain(t.rating);
    });
  });

  it('every testimonial has text length > 50 characters', () => {
    TESTIMONIALS.forEach((t) => {
      expect(
        t.text.length,
        `testimonial ${t.id} text too short (${t.text.length} chars)`
      ).toBeGreaterThan(50);
    });
  });

  it('at least one testimonial exists for each of the 12 city slugs', () => {
    const citySlugs = BUSINESS_INFO.serviceAreas.map((area) =>
      area.toLowerCase().replace(/\s+/g, '-')
    );
    citySlugs.forEach((slug) => {
      const found = TESTIMONIALS.filter((t) => t.citySlug === slug);
      expect(
        found.length,
        `no testimonial found for city slug "${slug}"`
      ).toBeGreaterThanOrEqual(1);
    });
  });
});

// CRO Phase 4 (2026-11-06, audit 4.3): service pages must show only
// their own city's testimonials. The previous selection fell back to
// all 48 testimonials from all 12 towns whenever a page had fewer than
// 3 city+service matches.
describe('getServicePageTestimonials (CRO Phase 4)', () => {
  it('jersey-city roof repair returns only Jersey City testimonials', () => {
    const result = getServicePageTestimonials('jersey-city', 'roof-repair');
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => t.citySlug === 'jersey-city')).toBe(true);
  });

  it('never falls back to the global 48-testimonial list', () => {
    const services = [
      'roof-repair',
      'roof-replacement',
      'roof-inspection',
      'emergency-roofing',
      'flat-roof-systems',
      'roof-maintenance',
      'commercial-repair',
      'commercial-replacement',
    ];
    for (const service of services) {
      const result = getServicePageTestimonials('jersey-city', service);
      expect(result.length).toBeLessThan(TESTIMONIALS.length);
      expect(result.every((t) => t.citySlug === 'jersey-city')).toBe(true);
    }
  });

  it('returns all 4 Jersey City testimonials when city+service has < 3', () => {
    // Jersey City has exactly 1 roof-repair testimonial (Sarah Kim),
    // so the city set (4) is used instead of the single match alone
    // or the global list.
    const result = getServicePageTestimonials('jersey-city', 'roof-repair');
    expect(result).toHaveLength(4);
    expect(result.some((t) => t.name === 'Sarah Kim')).toBe(true);
  });

  it('stays inside the requested city for other cities too', () => {
    const result = getServicePageTestimonials('hoboken', 'roof-repair');
    expect(result.every((t) => t.citySlug === 'hoboken')).toBe(true);
  });
});
