import { describe, it, expect } from 'vitest';

// Content imports for uniqueness comparison: roof-repair across 4 representative cities
import { JERSEY_CITY_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/jersey-city/roof-repair';
import { HOBOKEN_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/hoboken/roof-repair';
import { BAYONNE_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/bayonne/roof-repair';
import { SECAUCUS_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/secaucus/roof-repair';

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

  describe('cross-city uniqueness — cityServiceNarrative Jaccard < 30%', () => {
    // All 6 pairwise combinations of 4 cities for roof-repair
    const cities = [
      { name: 'Jersey City', narrative: JERSEY_CITY_ROOF_REPAIR_CONTENT.cityServiceNarrative },
      { name: 'Hoboken', narrative: HOBOKEN_ROOF_REPAIR_CONTENT.cityServiceNarrative },
      { name: 'Bayonne', narrative: BAYONNE_ROOF_REPAIR_CONTENT.cityServiceNarrative },
      { name: 'Secaucus', narrative: SECAUCUS_ROOF_REPAIR_CONTENT.cityServiceNarrative },
    ];

    // Generate all 6 pairwise combinations
    for (let i = 0; i < cities.length; i++) {
      for (let j = i + 1; j < cities.length; j++) {
        const cityA = cities[i];
        const cityB = cities[j];
        it(`roof-repair: ${cityA.name} vs ${cityB.name} narrative similarity < 30%`, () => {
          const similarity = jaccardSimilarity(cityA.narrative, cityB.narrative);
          expect(similarity).toBeLessThan(0.30);
        });
      }
    }
  });

  describe('cross-city uniqueness — localCaseScenario Jaccard < 30%', () => {
    // Test localCaseScenario for 2 representative pairs
    it('roof-repair: Jersey City vs Hoboken case scenario similarity < 30%', () => {
      const similarity = jaccardSimilarity(
        JERSEY_CITY_ROOF_REPAIR_CONTENT.localCaseScenario,
        HOBOKEN_ROOF_REPAIR_CONTENT.localCaseScenario,
      );
      expect(similarity).toBeLessThan(0.30);
    });

    it('roof-repair: Bayonne vs Secaucus case scenario similarity < 30%', () => {
      const similarity = jaccardSimilarity(
        BAYONNE_ROOF_REPAIR_CONTENT.localCaseScenario,
        SECAUCUS_ROOF_REPAIR_CONTENT.localCaseScenario,
      );
      expect(similarity).toBeLessThan(0.30);
    });
  });
});
