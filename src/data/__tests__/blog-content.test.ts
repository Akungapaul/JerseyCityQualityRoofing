import { describe, it, expect } from 'vitest';
import { ALL_BLOG_ARTICLES } from '@/data/content/blog';

describe('Blog article content validation', () => {
  it('should have at least 8 blog articles total', () => {
    expect(ALL_BLOG_ARTICLES.length).toBeGreaterThanOrEqual(8);
  });

  it('should have at least 5 silo-supporting articles with non-null siloService and parentPillarLink', () => {
    const siloArticles = ALL_BLOG_ARTICLES.filter(
      (a) => a.siloService !== null && a.parentPillarLink !== null,
    );
    expect(siloArticles.length).toBeGreaterThanOrEqual(5);
  });

  it('should have at least 3 standalone articles with null siloService', () => {
    const standaloneArticles = ALL_BLOG_ARTICLES.filter(
      (a) => a.siloService === null,
    );
    expect(standaloneArticles.length).toBeGreaterThanOrEqual(3);
  });

  it('each article should have 5+ FAQs', () => {
    ALL_BLOG_ARTICLES.forEach((article) => {
      expect(
        article.faqs.length,
        `${article.slug} has ${article.faqs.length} FAQs, expected 5+`,
      ).toBeGreaterThanOrEqual(5);
    });
  });

  it('each article should have 5+ sections', () => {
    ALL_BLOG_ARTICLES.forEach((article) => {
      expect(
        article.sections.length,
        `${article.slug} has ${article.sections.length} sections, expected 5+`,
      ).toBeGreaterThanOrEqual(5);
    });
  });

  it('silo-supporting articles should have valid parentPillarLink paths starting with /services/', () => {
    const siloArticles = ALL_BLOG_ARTICLES.filter(
      (a) => a.parentPillarLink !== null,
    );
    siloArticles.forEach((article) => {
      expect(
        article.parentPillarLink,
        `${article.slug} parentPillarLink should start with /services/`,
      ).toMatch(/^\/services\//);
    });
  });

  it('each article heading hierarchy: first section starts at H2, H3 only after H2', () => {
    ALL_BLOG_ARTICLES.forEach((article) => {
      if (article.sections.length === 0) return;
      // First section must be H2
      expect(
        article.sections[0].headingLevel,
        `${article.slug} first section should be H2`,
      ).toBe(2);
      // H3 can only appear after an H2
      let lastH2Seen = false;
      article.sections.forEach((section) => {
        if (section.headingLevel === 2) {
          lastH2Seen = true;
        }
        if (section.headingLevel === 3) {
          expect(
            lastH2Seen,
            `${article.slug} has H3 before any H2`,
          ).toBe(true);
        }
      });
    });
  });

  it('each article readingTimeMinutes should be >= 10', () => {
    ALL_BLOG_ARTICLES.forEach((article) => {
      expect(
        article.readingTimeMinutes,
        `${article.slug} readingTimeMinutes is ${article.readingTimeMinutes}, expected >= 10`,
      ).toBeGreaterThanOrEqual(10);
    });
  });

  it('all article slugs should be unique', () => {
    const slugs = ALL_BLOG_ARTICLES.map((a) => a.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});
