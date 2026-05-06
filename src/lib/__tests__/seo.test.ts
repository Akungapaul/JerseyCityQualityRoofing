import { describe, it, expect } from 'vitest';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { buildCanonicalUrl } from '@/lib/seo/canonical';
import { buildRoofingContractorJsonLd } from '@/lib/seo/json-ld';
import { BUSINESS_INFO } from '@/data/business-info';

describe('SEO helpers', () => {
  describe('generatePageMetadata', () => {
    it('returns metadata with title and description', () => {
      const meta = generatePageMetadata({
        title: 'Test Page',
        description: 'Test description',
        path: '/test',
      });
      expect(meta.title).toBe('Test Page');
      expect(meta.description).toBe('Test description');
    });

    it('sets canonical URL in alternates', () => {
      const meta = generatePageMetadata({
        title: 'Test',
        description: 'Test',
        path: '/about',
      });
      expect(meta.alternates?.canonical).toContain('/about');
    });

    it('sets openGraph properties', () => {
      const meta = generatePageMetadata({
        title: 'Test',
        description: 'Test',
        path: '/test',
      });
      expect(meta.openGraph).toBeDefined();
    });
  });

  describe('buildCanonicalUrl', () => {
    it('builds full URL from path', () => {
      const url = buildCanonicalUrl('/about');
      expect(url).toMatch(/^https:\/\//);
      expect(url).toContain('/about');
    });

    it('handles root path', () => {
      const url = buildCanonicalUrl('/');
      expect(url).not.toMatch(/\/$/);
    });

    it('strips trailing slashes', () => {
      const url = buildCanonicalUrl('/about/');
      expect(url).not.toMatch(/\/$/);
    });
  });

  describe('buildRoofingContractorJsonLd', () => {
    it('returns valid JSON-LD with @context and @type', () => {
      const jsonLd = buildRoofingContractorJsonLd() as unknown as Record<string, unknown>;
      expect(jsonLd['@context']).toBe('https://schema.org');
      expect(jsonLd['@type']).toBe('RoofingContractor');
    });

    it('includes business name and only verified phone data', () => {
      const jsonLd = buildRoofingContractorJsonLd() as unknown as Record<string, unknown>;
      expect(jsonLd.name).toBe('Jersey City Quality Roofing');
      if (/^\+?[\d(]/.test(BUSINESS_INFO.phone)) {
        expect(jsonLd.telephone).toBeDefined();
      } else {
        expect(jsonLd.telephone).toBeUndefined();
      }
    });

    it('only includes address when a street address is verified', () => {
      const jsonLd = buildRoofingContractorJsonLd() as unknown as Record<string, unknown>;
      if (BUSINESS_INFO.address.street) {
        expect(jsonLd.address).toBeDefined();
      } else {
        expect(jsonLd.address).toBeUndefined();
      }
    });
  });
});
