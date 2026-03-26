import { describe, it, expect } from 'vitest';
import { getTestimonialsByCity } from '@/data/testimonials';
import { getAllMunicipalitySlugs } from '@/data/municipalities';

describe('city testimonials', () => {
  const allSlugs = getAllMunicipalitySlugs();

  it('has all 12 municipality slugs', () => {
    expect(allSlugs.length).toBe(12);
  });

  describe.each(allSlugs.map((slug) => ({ slug })))('$slug', ({ slug }) => {
    it('returns at least 3 testimonials', () => {
      const testimonials = getTestimonialsByCity(slug);
      expect(testimonials.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('jersey-city returns exactly 4 testimonials', () => {
    const testimonials = getTestimonialsByCity('jersey-city');
    expect(testimonials.length).toBe(4);
  });
});
