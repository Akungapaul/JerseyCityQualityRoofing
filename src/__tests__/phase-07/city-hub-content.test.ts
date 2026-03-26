import { describe, it, expect } from 'vitest';
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

// Import all 12 city content constants
// Tier 1 (Plan 07-01)
import { JERSEY_CITY_CONTENT } from '@/data/content/cities/jersey-city';
import { HOBOKEN_CONTENT } from '@/data/content/cities/hoboken';
import { BAYONNE_CONTENT } from '@/data/content/cities/bayonne';
import { NORTH_BERGEN_CONTENT } from '@/data/content/cities/north-bergen';
// Tier 2 (Plan 07-03)
import { UNION_CITY_CONTENT } from '@/data/content/cities/union-city';
import { WEST_NEW_YORK_CONTENT } from '@/data/content/cities/west-new-york';
import { SECAUCUS_CONTENT } from '@/data/content/cities/secaucus';
import { KEARNY_CONTENT } from '@/data/content/cities/kearny';
// Tier 3 (Plan 07-03)
import { HARRISON_CONTENT } from '@/data/content/cities/harrison';
import { EAST_NEWARK_CONTENT } from '@/data/content/cities/east-newark';
import { GUTTENBERG_CONTENT } from '@/data/content/cities/guttenberg';
import { WEEHAWKEN_CONTENT } from '@/data/content/cities/weehawken';

const ALL_CITY_CONTENTS: Array<{ name: string; content: CityHubContent }> = [
  { name: 'jersey-city', content: JERSEY_CITY_CONTENT },
  { name: 'hoboken', content: HOBOKEN_CONTENT },
  { name: 'bayonne', content: BAYONNE_CONTENT },
  { name: 'north-bergen', content: NORTH_BERGEN_CONTENT },
  { name: 'union-city', content: UNION_CITY_CONTENT },
  { name: 'west-new-york', content: WEST_NEW_YORK_CONTENT },
  { name: 'secaucus', content: SECAUCUS_CONTENT },
  { name: 'kearny', content: KEARNY_CONTENT },
  { name: 'harrison', content: HARRISON_CONTENT },
  { name: 'east-newark', content: EAST_NEWARK_CONTENT },
  { name: 'guttenberg', content: GUTTENBERG_CONTENT },
  { name: 'weehawken', content: WEEHAWKEN_CONTENT },
];

describe('city hub content data', () => {
  describe.each(ALL_CITY_CONTENTS)('$name', ({ name, content }) => {
    it('has slug matching filename', () => {
      expect(content.slug).toBe(name);
    });

    it('has heroHeadline with length > 10', () => {
      expect(content.heroHeadline.length).toBeGreaterThan(10);
    });

    it('has heroSubtitle with length > 10', () => {
      expect(content.heroSubtitle.length).toBeGreaterThan(10);
    });

    it('has localExpertiseNarrative with 400-700 words', () => {
      const words = countWords(content.localExpertiseNarrative);
      expect(words).toBeGreaterThanOrEqual(400);
      expect(words).toBeLessThanOrEqual(700);
    });

    it('has housingStockNarrative with 300-600 words', () => {
      const words = countWords(content.housingStockNarrative);
      expect(words).toBeGreaterThanOrEqual(300);
      expect(words).toBeLessThanOrEqual(600);
    });

    it('has weatherClimateNarrative with 300-600 words', () => {
      const words = countWords(content.weatherClimateNarrative);
      expect(words).toBeGreaterThanOrEqual(300);
      expect(words).toBeLessThanOrEqual(600);
    });

    it('has at least 4 entries in neighborhoodBreakdown', () => {
      expect(content.neighborhoodBreakdown.length).toBeGreaterThanOrEqual(4);
    });

    it('each neighborhoodBreakdown entry has required fields', () => {
      content.neighborhoodBreakdown.forEach((nb) => {
        expect(nb.name.length).toBeGreaterThan(0);
        expect(countWords(nb.description)).toBeGreaterThanOrEqual(50);
        expect(nb.commonRoofTypes.length).toBeGreaterThanOrEqual(1);
        expect(nb.keyChallenge.length).toBeGreaterThan(0);
      });
    });

    it('has landmarksNarrative with 200-500 words', () => {
      const words = countWords(content.landmarksNarrative);
      expect(words).toBeGreaterThanOrEqual(200);
      expect(words).toBeLessThanOrEqual(500);
    });

    it('has buildingCodeNarrative with 150-400 words', () => {
      const words = countWords(content.buildingCodeNarrative);
      expect(words).toBeGreaterThanOrEqual(150);
      expect(words).toBeLessThanOrEqual(400);
    });

    it('has whyChooseUsNarrative with 200-500 words', () => {
      const words = countWords(content.whyChooseUsNarrative);
      expect(words).toBeGreaterThanOrEqual(200);
      expect(words).toBeLessThanOrEqual(500);
    });

    it('has closingNarrative with 100-350 words', () => {
      const words = countWords(content.closingNarrative);
      expect(words).toBeGreaterThanOrEqual(100);
      expect(words).toBeLessThanOrEqual(350);
    });

    it('has 8-10 FAQs', () => {
      expect(content.cityFaqs.length).toBeGreaterThanOrEqual(8);
      expect(content.cityFaqs.length).toBeLessThanOrEqual(10);
    });

    it('each FAQ has question and answer with 40+ words', () => {
      content.cityFaqs.forEach((faq) => {
        expect(faq.question.length).toBeGreaterThan(10);
        expect(countWords(faq.answer)).toBeGreaterThanOrEqual(40);
      });
    });

    it('has total word count >= 3000 across all narrative fields and FAQ answers', () => {
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

  describe('content uniqueness', () => {
    it('each pair of cities has < 30% sentence overlap in localExpertiseNarrative', () => {
      for (let i = 0; i < ALL_CITY_CONTENTS.length; i++) {
        for (let j = i + 1; j < ALL_CITY_CONTENTS.length; j++) {
          const cityA = ALL_CITY_CONTENTS[i];
          const cityB = ALL_CITY_CONTENTS[j];
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
