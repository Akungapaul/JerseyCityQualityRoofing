import { describe, it, expect, beforeAll } from 'vitest';
import type { CityHubContent } from '@/data/types';

// Helper to count words in a string
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// Helper to extract sentences from text
function extractSentences(text: string): string[] {
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 10);
}

// Helper to calculate sentence overlap ratio between two texts
function sentenceOverlapRatio(textA: string, textB: string): number {
  const sentencesA = extractSentences(textA);
  const sentencesB = extractSentences(textB);
  if (sentencesA.length === 0 || sentencesB.length === 0) return 0;
  const setB = new Set(sentencesB);
  const shared = sentencesA.filter((s) => setB.has(s)).length;
  return shared / Math.min(sentencesA.length, sentencesB.length);
}

// All 12 city slugs and their expected export names
const CITY_MODULES: Array<{ slug: string; exportName: string; modulePath: string }> = [
  // Tier 1 (Plan 07-01)
  { slug: 'jersey-city', exportName: 'JERSEY_CITY_CONTENT', modulePath: '@/data/content/cities/jersey-city' },
  { slug: 'hoboken', exportName: 'HOBOKEN_CONTENT', modulePath: '@/data/content/cities/hoboken' },
  { slug: 'bayonne', exportName: 'BAYONNE_CONTENT', modulePath: '@/data/content/cities/bayonne' },
  { slug: 'north-bergen', exportName: 'NORTH_BERGEN_CONTENT', modulePath: '@/data/content/cities/north-bergen' },
  // Tier 2 (Plan 07-03)
  { slug: 'union-city', exportName: 'UNION_CITY_CONTENT', modulePath: '@/data/content/cities/union-city' },
  { slug: 'west-new-york', exportName: 'WEST_NEW_YORK_CONTENT', modulePath: '@/data/content/cities/west-new-york' },
  { slug: 'secaucus', exportName: 'SECAUCUS_CONTENT', modulePath: '@/data/content/cities/secaucus' },
  { slug: 'kearny', exportName: 'KEARNY_CONTENT', modulePath: '@/data/content/cities/kearny' },
  // Tier 3 (Plan 07-03)
  { slug: 'harrison', exportName: 'HARRISON_CONTENT', modulePath: '@/data/content/cities/harrison' },
  { slug: 'east-newark', exportName: 'EAST_NEWARK_CONTENT', modulePath: '@/data/content/cities/east-newark' },
  { slug: 'guttenberg', exportName: 'GUTTENBERG_CONTENT', modulePath: '@/data/content/cities/guttenberg' },
  { slug: 'weehawken', exportName: 'WEEHAWKEN_CONTENT', modulePath: '@/data/content/cities/weehawken' },
];

// Dynamically loaded city content — populated in beforeAll
const loadedCities: Array<{ name: string; content: CityHubContent }> = [];

beforeAll(async () => {
  for (const city of CITY_MODULES) {
    try {
      const mod = await import(city.modulePath);
      const content = mod[city.exportName] as CityHubContent;
      if (content) {
        loadedCities.push({ name: city.slug, content });
      }
    } catch {
      // City content file not yet created — skip (expected for Tier 2/3 before Plan 07-03)
    }
  }
});

describe('city hub content data', () => {
  // Use a getter so tests see the populated array after beforeAll runs
  function getCities() {
    return loadedCities;
  }

  describe('individual city validation', () => {
    // We test each loaded city dynamically
    it('has at least 1 loaded city to test', () => {
      expect(getCities().length).toBeGreaterThan(0);
    });

    // Per-city tests grouped by slug
    for (const city of CITY_MODULES) {
      describe(city.slug, () => {
        function getContent(): CityHubContent | undefined {
          return loadedCities.find((c) => c.name === city.slug)?.content;
        }

        function skipIfNotLoaded() {
          const content = getContent();
          if (!content) {
            return true;
          }
          return false;
        }

        it('has slug matching filename', () => {
          if (skipIfNotLoaded()) return;
          expect(getContent()!.slug).toBe(city.slug);
        });

        it('has heroHeadline with length > 10', () => {
          if (skipIfNotLoaded()) return;
          expect(getContent()!.heroHeadline.length).toBeGreaterThan(10);
        });

        it('has heroSubtitle with length > 10', () => {
          if (skipIfNotLoaded()) return;
          expect(getContent()!.heroSubtitle.length).toBeGreaterThan(10);
        });

        it('has localExpertiseNarrative with 400-700 words', () => {
          if (skipIfNotLoaded()) return;
          const words = countWords(getContent()!.localExpertiseNarrative);
          expect(words).toBeGreaterThanOrEqual(400);
          expect(words).toBeLessThanOrEqual(700);
        });

        it('has housingStockNarrative with 300-600 words', () => {
          if (skipIfNotLoaded()) return;
          const words = countWords(getContent()!.housingStockNarrative);
          expect(words).toBeGreaterThanOrEqual(300);
          expect(words).toBeLessThanOrEqual(600);
        });

        it('has weatherClimateNarrative with 300-600 words', () => {
          if (skipIfNotLoaded()) return;
          const words = countWords(getContent()!.weatherClimateNarrative);
          expect(words).toBeGreaterThanOrEqual(300);
          expect(words).toBeLessThanOrEqual(600);
        });

        it('has at least 4 entries in neighborhoodBreakdown', () => {
          if (skipIfNotLoaded()) return;
          expect(getContent()!.neighborhoodBreakdown.length).toBeGreaterThanOrEqual(4);
        });

        it('each neighborhoodBreakdown entry has required fields', () => {
          if (skipIfNotLoaded()) return;
          getContent()!.neighborhoodBreakdown.forEach((nb) => {
            expect(nb.name.length).toBeGreaterThan(0);
            expect(countWords(nb.description)).toBeGreaterThanOrEqual(50);
            expect(nb.commonRoofTypes.length).toBeGreaterThanOrEqual(1);
            expect(nb.keyChallenge.length).toBeGreaterThan(0);
          });
        });

        it('has landmarksNarrative with 200-500 words', () => {
          if (skipIfNotLoaded()) return;
          const words = countWords(getContent()!.landmarksNarrative);
          expect(words).toBeGreaterThanOrEqual(200);
          expect(words).toBeLessThanOrEqual(500);
        });

        it('has buildingCodeNarrative with 150-400 words', () => {
          if (skipIfNotLoaded()) return;
          const words = countWords(getContent()!.buildingCodeNarrative);
          expect(words).toBeGreaterThanOrEqual(150);
          expect(words).toBeLessThanOrEqual(400);
        });

        it('has whyChooseUsNarrative with 200-500 words', () => {
          if (skipIfNotLoaded()) return;
          const words = countWords(getContent()!.whyChooseUsNarrative);
          expect(words).toBeGreaterThanOrEqual(200);
          expect(words).toBeLessThanOrEqual(500);
        });

        it('has closingNarrative with 100-350 words', () => {
          if (skipIfNotLoaded()) return;
          const words = countWords(getContent()!.closingNarrative);
          expect(words).toBeGreaterThanOrEqual(100);
          expect(words).toBeLessThanOrEqual(350);
        });

        it('has 8-10 FAQs', () => {
          if (skipIfNotLoaded()) return;
          expect(getContent()!.cityFaqs.length).toBeGreaterThanOrEqual(8);
          expect(getContent()!.cityFaqs.length).toBeLessThanOrEqual(10);
        });

        it('each FAQ has question and answer with 40+ words', () => {
          if (skipIfNotLoaded()) return;
          getContent()!.cityFaqs.forEach((faq) => {
            expect(faq.question.length).toBeGreaterThan(10);
            expect(countWords(faq.answer)).toBeGreaterThanOrEqual(40);
          });
        });

        it('has total word count >= 3000 across all narrative fields and FAQ answers', () => {
          if (skipIfNotLoaded()) return;
          const content = getContent()!;
          const totalWords = countWords([
            content.heroHeadline,
            content.heroSubtitle,
            content.localExpertiseNarrative,
            content.housingStockNarrative,
            content.weatherClimateNarrative,
            ...content.neighborhoodBreakdown.map((nb) => nb.description),
            content.landmarksNarrative,
            content.buildingCodeNarrative,
            content.whyChooseUsNarrative,
            content.closingNarrative,
            ...content.cityFaqs.map((f) => `${f.question} ${f.answer}`),
          ].join(' '));
          expect(totalWords).toBeGreaterThanOrEqual(3000);
        });
      });
    }
  });

  describe('content uniqueness', () => {
    it('each pair of loaded cities has < 30% sentence overlap in localExpertiseNarrative', () => {
      const cities = getCities();
      for (let i = 0; i < cities.length; i++) {
        for (let j = i + 1; j < cities.length; j++) {
          const cityA = cities[i];
          const cityB = cities[j];
          const overlap = sentenceOverlapRatio(
            cityA.content.localExpertiseNarrative,
            cityB.content.localExpertiseNarrative
          );
          expect(
            overlap,
            `${cityA.name} and ${cityB.name} share ${(overlap * 100).toFixed(1)}% sentences`
          ).toBeLessThan(0.3);
        }
      }
    });
  });
});
