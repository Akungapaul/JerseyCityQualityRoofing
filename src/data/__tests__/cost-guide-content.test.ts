import { describe, it, expect } from 'vitest';
import { ALL_COST_GUIDES } from '@/data/content/cost-guides';

describe('Cost guide content validation', () => {
  it('should have 8 cost guides, one per service', () => {
    expect(ALL_COST_GUIDES.length).toBe(8);
  });

  it('each guide should have at least 3 cost ranges', () => {
    ALL_COST_GUIDES.forEach((guide) => {
      expect(
        guide.costOverview.length,
        `${guide.slug} has ${guide.costOverview.length} cost ranges, expected 3+`,
      ).toBeGreaterThanOrEqual(3);
    });
  });

  it('each guide should have at least 4 location pricing entries', () => {
    ALL_COST_GUIDES.forEach((guide) => {
      expect(
        guide.locationPricing.length,
        `${guide.slug} has ${guide.locationPricing.length} location pricing entries, expected 4+`,
      ).toBeGreaterThanOrEqual(4);
    });
  });

  it('each guide should have 5+ FAQs', () => {
    ALL_COST_GUIDES.forEach((guide) => {
      expect(
        guide.faqs.length,
        `${guide.slug} has ${guide.faqs.length} FAQs, expected 5+`,
      ).toBeGreaterThanOrEqual(5);
    });
  });

  it('each guide should have non-empty narratives (intro, costFactors, saving, whenToInvest)', () => {
    ALL_COST_GUIDES.forEach((guide) => {
      expect(guide.introNarrative.length, `${guide.slug} introNarrative is empty`).toBeGreaterThan(0);
      expect(guide.costFactorsNarrative.length, `${guide.slug} costFactorsNarrative is empty`).toBeGreaterThan(0);
      expect(guide.savingStrategies.length, `${guide.slug} savingStrategies is empty`).toBeGreaterThan(0);
      expect(guide.whenToInvest.length, `${guide.slug} whenToInvest is empty`).toBeGreaterThan(0);
    });
  });

  it('all guide slugs should be unique', () => {
    const slugs = ALL_COST_GUIDES.map((g) => g.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});
