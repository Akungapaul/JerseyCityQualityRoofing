import { describe, it, expect } from 'vitest';
import type { ProblemSolution } from '@/data/types';

// TODO: Import content registries when created in Plan 06
// import { ALL_PROBLEMS } from '@/data/content/problems';

// Placeholder until content data arrives
const ALL_PROBLEMS: ProblemSolution[] = [];

const REQUIRED_PROBLEMS = [
  'ice-dams',
  'ponding-water',
  'flashing-failure',
  'wind-damage',
  'missing-shingles',
];

describe.skip('Problem-solution content validation', () => {
  it('should have 5 problem pages', () => {
    expect(ALL_PROBLEMS.length).toBe(5);
  });

  it('should cover required problems: ice-dams, ponding-water, flashing-failure, wind-damage, missing-shingles', () => {
    const slugs = ALL_PROBLEMS.map((p) => p.slug);
    REQUIRED_PROBLEMS.forEach((problem) => {
      expect(slugs, `Missing problem page: ${problem}`).toContain(problem);
    });
  });

  it('each problem should have at least 4 identification signs', () => {
    ALL_PROBLEMS.forEach((problem) => {
      expect(
        problem.identificationSigns.length,
        `${problem.slug} has ${problem.identificationSigns.length} identification signs, expected 4+`,
      ).toBeGreaterThanOrEqual(4);
    });
  });

  it('each problem should have 5+ FAQs', () => {
    ALL_PROBLEMS.forEach((problem) => {
      expect(
        problem.faqs.length,
        `${problem.slug} has ${problem.faqs.length} FAQs, expected 5+`,
      ).toBeGreaterThanOrEqual(5);
    });
  });

  it('each problem should have at least 1 relatedServiceSlug', () => {
    ALL_PROBLEMS.forEach((problem) => {
      expect(
        problem.relatedServiceSlugs.length,
        `${problem.slug} has no relatedServiceSlugs`,
      ).toBeGreaterThanOrEqual(1);
    });
  });

  it('all problem slugs should be unique', () => {
    const slugs = ALL_PROBLEMS.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});
