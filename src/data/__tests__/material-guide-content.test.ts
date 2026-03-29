import { describe, it, expect } from 'vitest';
import { ALL_MATERIAL_GUIDES } from '@/data/content/material-guides';

const REQUIRED_MATERIALS = [
  'asphalt-shingles',
  'tpo-membrane',
  'epdm-rubber',
  'slate-roofing',
  'metal-roofing',
  'modified-bitumen',
];

describe('Material guide content validation', () => {
  it('should have 6 material guides', () => {
    expect(ALL_MATERIAL_GUIDES.length).toBe(6);
  });

  it('should cover required materials: asphalt-shingles, tpo-membrane, epdm-rubber, slate-roofing, metal-roofing, modified-bitumen', () => {
    const slugs = ALL_MATERIAL_GUIDES.map((g) => g.slug);
    REQUIRED_MATERIALS.forEach((material) => {
      expect(slugs, `Missing material guide: ${material}`).toContain(material);
    });
  });

  it('each guide should have at least 3 pros and 3 cons', () => {
    ALL_MATERIAL_GUIDES.forEach((guide) => {
      expect(
        guide.prosAndCons.pros.length,
        `${guide.slug} has ${guide.prosAndCons.pros.length} pros, expected 3+`,
      ).toBeGreaterThanOrEqual(3);
      expect(
        guide.prosAndCons.cons.length,
        `${guide.slug} has ${guide.prosAndCons.cons.length} cons, expected 3+`,
      ).toBeGreaterThanOrEqual(3);
    });
  });

  it('each guide should have 5+ FAQs', () => {
    ALL_MATERIAL_GUIDES.forEach((guide) => {
      expect(
        guide.faqs.length,
        `${guide.slug} has ${guide.faqs.length} FAQs, expected 5+`,
      ).toBeGreaterThanOrEqual(5);
    });
  });

  it('each guide should have at least 1 relatedServiceSlug', () => {
    ALL_MATERIAL_GUIDES.forEach((guide) => {
      expect(
        guide.relatedServiceSlugs.length,
        `${guide.slug} has no relatedServiceSlugs`,
      ).toBeGreaterThanOrEqual(1);
    });
  });

  it('all guide slugs should be unique', () => {
    const slugs = ALL_MATERIAL_GUIDES.map((g) => g.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});
