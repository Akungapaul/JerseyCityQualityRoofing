import { describe, it, expect, beforeAll } from 'vitest';
import {
  initializeContentRegistry,
  getSiloArticles,
  getBlogArticlesForService,
  getCostGuideForService,
  resetRegistry,
} from '../internal-links';

const ALL_SERVICE_SLUGS = [
  'roof-repair',
  'roof-replacement',
  'roof-inspection',
  'emergency-roofing',
  'flat-roof-systems',
  'roof-maintenance',
  'commercial-repair',
  'commercial-replacement',
] as const;

describe('Silo Forward Links (SEO-05)', () => {
  beforeAll(() => {
    resetRegistry();
    initializeContentRegistry();
  });

  describe.each(ALL_SERVICE_SLUGS)('service: %s', (slug) => {
    it('has at least one forward link (blog article or cost guide)', () => {
      const siloArticles = getSiloArticles(slug);
      const relatedArticles = getBlogArticlesForService(slug);
      const costGuide = getCostGuideForService(slug);
      const hasArticles = siloArticles.length > 0 || relatedArticles.length > 0;
      const hasCostGuide = costGuide !== null;
      expect(hasArticles || hasCostGuide).toBe(true);
    });

    it('has a cost guide', () => {
      const costGuide = getCostGuideForService(slug);
      expect(costGuide).not.toBeNull();
      expect(costGuide!.title).toBeTruthy();
      expect(costGuide!.path).toMatch(/^\//);
    });

    it('cost guide has valid InternalLink shape', () => {
      const costGuide = getCostGuideForService(slug);
      if (costGuide) {
        expect(typeof costGuide.title).toBe('string');
        expect(costGuide.title.length).toBeGreaterThan(0);
        expect(costGuide.path).toMatch(/^\//);
        expect(costGuide.type).toBe('cost-guide');
      }
    });

    it('blog articles have valid InternalLink shape', () => {
      const siloArticles = getSiloArticles(slug);
      const relatedArticles = getBlogArticlesForService(slug);
      const allArticles = [...siloArticles, ...relatedArticles];
      for (const article of allArticles) {
        expect(typeof article.title).toBe('string');
        expect(article.title.length).toBeGreaterThan(0);
        expect(article.path).toMatch(/^\//);
        expect(typeof article.type).toBe('string');
      }
    });
  });
});
