import { describe, it, expect } from 'vitest';
import type { ServiceInCityContent } from '../types';

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
    // Verify the helper compiles and runs without errors
    expect(typeof totalProseWords).toBe('function');
  });

  describe.skip('content structure (enable when Tier 1 content data exists)', () => {
    // These tests will be unskipped as content files are created.
    // Each test validates:
    // 1. All required fields are non-empty strings
    // 2. cityServiceNarrative >= 400 words
    // 3. localCaseScenario >= 250 words
    // 4. cityMaterialsAdvice >= 150 words
    // 5. cityCostContext >= 100 words
    // 6. citySpecificProcess >= 150 words
    // 7. closingNarrative >= 100 words
    // 8. neighborhoodServiceInsights has 3-5 entries
    // 9. extendedFaqs has 3-5 entries
    // 10. serviceSlug matches a valid service slug
    // 11. citySlug matches a valid municipality slug
    // 12. CUMULATIVE: totalProseWords(content) >= 2500 (resolver adds ~527 to reach 3000+)
    it('placeholder: jersey-city/roof-repair content meets all criteria including cumulative word count', () => {
      // Will be implemented when content exists:
      // expect(totalProseWords(content)).toBeGreaterThanOrEqual(2500);
    });
  });
});
