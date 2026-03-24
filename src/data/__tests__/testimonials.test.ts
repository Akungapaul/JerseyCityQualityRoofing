import { describe, it, expect } from 'vitest';
import { TESTIMONIALS } from '@/data/testimonials';
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
