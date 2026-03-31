import { describe, it, expect } from 'vitest';
import { ALL_BLOG_ARTICLES } from '@/data/content/blog';
import { SERVICES } from '@/data/services';

describe('blog silo links', () => {
  const siloArticles = ALL_BLOG_ARTICLES.filter((a) => a.siloService !== null);

  it('every silo article has siloCategory matching SERVICES[siloService].category', () => {
    for (const article of siloArticles) {
      const service = SERVICES[article.siloService as keyof typeof SERVICES];
      expect(service, `Service not found for siloService: ${article.siloService}`).toBeDefined();
      expect(article.siloCategory, `${article.slug}: siloCategory mismatch`).toBe(service.category);
    }
  });

  it('every silo article parentPillarLink follows /services/{category}/{slug} pattern', () => {
    for (const article of siloArticles) {
      const expectedLink = `/services/${article.siloCategory}/${article.siloService}`;
      expect(article.parentPillarLink, `${article.slug}: parentPillarLink mismatch`).toBe(expectedLink);
    }
  });

  it('preventative-roof-maintenance-checklist has siloCategory commercial', () => {
    const article = ALL_BLOG_ARTICLES.find((a) => a.slug === 'preventative-roof-maintenance-checklist');
    expect(article).toBeDefined();
    expect(article!.siloCategory).toBe('commercial');
    expect(article!.parentPillarLink).toBe('/services/commercial/roof-maintenance');
  });
});
