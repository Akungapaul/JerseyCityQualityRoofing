import { describe, it, expect } from 'vitest';

/**
 * Jaccard word-set similarity: measures overlap between two texts.
 * Returns 0 (completely different) to 1 (identical word sets).
 */
function jaccardSimilarity(a: string, b: string): number {
  const setA = new Set(a.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  const setB = new Set(b.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

describe('service-city content uniqueness', () => {
  it('jaccardSimilarity helper works correctly', () => {
    expect(jaccardSimilarity('the quick brown fox', 'the quick brown fox')).toBeCloseTo(1.0);
    expect(jaccardSimilarity('completely different words here', 'nothing matches at all now')).toBeLessThan(0.2);
    expect(jaccardSimilarity('', '')).toBe(0);
  });

  describe.skip('cross-city uniqueness (enable when Tier 1 content data exists)', () => {
    // These tests will be unskipped as content files are created.
    // Each test compares cityServiceNarrative between two cities for the same service.
    // Threshold: < 30% Jaccard similarity (70%+ uniqueness).
    it('roof-repair: jersey-city vs hoboken narrative similarity < 30%', () => {
      // Import content files when available
      // const jc = JERSEY_CITY_ROOF_REPAIR_CONTENT.cityServiceNarrative;
      // const hob = HOBOKEN_ROOF_REPAIR_CONTENT.cityServiceNarrative;
      // expect(jaccardSimilarity(jc, hob)).toBeLessThan(0.30);
    });
  });
});
