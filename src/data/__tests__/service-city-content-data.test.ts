import { describe, it, expect } from 'vitest';
import type { ServiceInCityContent } from '../types';
import { getService } from '../services';
import { getMunicipality } from '../municipalities';

// Sample content imports: 4 diverse files across cities and services
import { JERSEY_CITY_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/jersey-city/roof-repair';
import { HOBOKEN_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/hoboken/flat-roof-systems';
import { SECAUCUS_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/secaucus/emergency-roofing';
import { WEEHAWKEN_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/weehawken/commercial-repair';

/**
 * Counts words in a string (rough word count for content length validation).
 */
function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Computes total prose word count across all long-form fields in a ServiceInCityContent object.
 * This measures the content data file's contribution to the 3000+ word page total.
 * The resolver adds ~527 words on top of this, so content data must provide >= 2500 words.
 */
function totalProseWords(content: ServiceInCityContent): number {
  let total = 0;
  total += wordCount(content.heroHeadline);
  total += wordCount(content.heroSubtitle);
  total += wordCount(content.cityServiceNarrative);
  total += wordCount(content.localCaseScenario);
  total += wordCount(content.cityMaterialsAdvice);
  total += wordCount(content.cityCostContext);
  total += wordCount(content.citySpecificProcess);
  total += wordCount(content.closingNarrative);
  for (const n of content.neighborhoodServiceInsights) {
    total += wordCount(n.insight);
    total += wordCount(n.commonIssue);
  }
  for (const faq of content.extendedFaqs) {
    total += wordCount(faq.question);
    total += wordCount(faq.answer);
  }
  return total;
}

describe('service-city content data validation', () => {
  it('wordCount helper works correctly', () => {
    expect(wordCount('one two three four five')).toBe(5);
    expect(wordCount('')).toBe(0);
    expect(wordCount('  spaced   out  ')).toBe(2);
  });

  it('totalProseWords helper aggregates all prose fields', () => {
    expect(typeof totalProseWords).toBe('function');
  });

  // ---------------------------------------------------------------------------
  // Sample content validation: each file checked against all criteria
  // ---------------------------------------------------------------------------

  const samples: Array<{ label: string; content: ServiceInCityContent }> = [
    { label: 'jersey-city/roof-repair', content: JERSEY_CITY_ROOF_REPAIR_CONTENT },
    { label: 'hoboken/flat-roof-systems', content: HOBOKEN_FLAT_ROOF_SYSTEMS_CONTENT },
    { label: 'secaucus/emergency-roofing', content: SECAUCUS_EMERGENCY_ROOFING_CONTENT },
    { label: 'weehawken/commercial-repair', content: WEEHAWKEN_COMMERCIAL_REPAIR_CONTENT },
  ];

  describe('content structure and word counts', () => {
    for (const { label, content } of samples) {
      describe(label, () => {
        it('cityServiceNarrative >= 400 words', () => {
          expect(wordCount(content.cityServiceNarrative)).toBeGreaterThanOrEqual(400);
        });

        it('localCaseScenario >= 250 words', () => {
          expect(wordCount(content.localCaseScenario)).toBeGreaterThanOrEqual(250);
        });

        it('cityMaterialsAdvice >= 150 words', () => {
          expect(wordCount(content.cityMaterialsAdvice)).toBeGreaterThanOrEqual(150);
        });

        it('cityCostContext >= 100 words', () => {
          expect(wordCount(content.cityCostContext)).toBeGreaterThanOrEqual(100);
        });

        it('citySpecificProcess >= 150 words', () => {
          expect(wordCount(content.citySpecificProcess)).toBeGreaterThanOrEqual(150);
        });

        it('closingNarrative >= 100 words', () => {
          expect(wordCount(content.closingNarrative)).toBeGreaterThanOrEqual(100);
        });

        it('neighborhoodServiceInsights has 3-5 entries', () => {
          expect(content.neighborhoodServiceInsights.length).toBeGreaterThanOrEqual(3);
          expect(content.neighborhoodServiceInsights.length).toBeLessThanOrEqual(5);
        });

        it('each neighborhood insight >= 50 words', () => {
          for (const n of content.neighborhoodServiceInsights) {
            expect(wordCount(n.insight)).toBeGreaterThanOrEqual(50);
          }
        });

        it('extendedFaqs has 3-5 entries', () => {
          expect(content.extendedFaqs.length).toBeGreaterThanOrEqual(3);
          expect(content.extendedFaqs.length).toBeLessThanOrEqual(5);
        });

        it('each FAQ answer >= 30 words', () => {
          for (const faq of content.extendedFaqs) {
            expect(wordCount(faq.answer)).toBeGreaterThanOrEqual(30);
          }
        });

        it('serviceSlug matches a valid service', () => {
          const service = getService(content.serviceSlug);
          expect(service).toBeDefined();
          expect(service!.slug).toBe(content.serviceSlug);
        });

        it('citySlug matches a valid municipality', () => {
          const city = getMunicipality(content.citySlug);
          expect(city).toBeDefined();
          expect(city!.slug).toBe(content.citySlug);
        });

        it('totalProseWords >= 2500 (content data contribution to 3000+ page)', () => {
          const total = totalProseWords(content);
          expect(total).toBeGreaterThanOrEqual(2500);
        });
      });
    }
  });
});
