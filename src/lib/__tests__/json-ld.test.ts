import { describe, it, expect } from 'vitest';
import { buildRoofingContractorJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo/json-ld';

describe('JSON-LD generators', () => {
  describe('buildRoofingContractorJsonLd', () => {
    it('returns schema with @context and @type', () => {
      const schema = buildRoofingContractorJsonLd() as unknown as Record<string, unknown>;
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('RoofingContractor');
    });

    it('includes business name', () => {
      const schema = buildRoofingContractorJsonLd() as unknown as Record<string, unknown>;
      expect(schema.name).toBe('Jersey City Quality Roofing');
    });

    it('includes telephone', () => {
      const schema = buildRoofingContractorJsonLd() as unknown as Record<string, unknown>;
      expect(schema.telephone).toBeDefined();
      expect(typeof schema.telephone).toBe('string');
    });

    it('includes postal address', () => {
      const schema = buildRoofingContractorJsonLd() as unknown as Record<string, unknown>;
      expect(schema.address).toBeDefined();
    });

    it('includes area served with multiple cities', () => {
      const schema = buildRoofingContractorJsonLd() as unknown as Record<string, unknown>;
      expect(Array.isArray(schema.areaServed)).toBe(true);
      expect((schema.areaServed as unknown[]).length).toBeGreaterThanOrEqual(12);
    });

    it('includes opening hours', () => {
      const schema = buildRoofingContractorJsonLd() as unknown as Record<string, unknown>;
      expect(schema.openingHoursSpecification).toBeDefined();
    });
  });

  describe('buildBreadcrumbJsonLd', () => {
    it('returns BreadcrumbList schema', () => {
      const schema = buildBreadcrumbJsonLd([
        { name: 'Home', url: 'https://example.com' },
        { name: 'About', url: 'https://example.com/about' },
      ]) as unknown as Record<string, unknown>;
      expect(schema['@type']).toBe('BreadcrumbList');
    });

    it('generates correct position numbers', () => {
      const schema = buildBreadcrumbJsonLd([
        { name: 'Home', url: 'https://example.com' },
        { name: 'Services', url: 'https://example.com/services' },
        { name: 'Roof Repair', url: 'https://example.com/services/residential/roof-repair' },
      ]) as unknown as Record<string, unknown>;
      const items = schema.itemListElement as Array<{ position: number }>;
      expect(items[0].position).toBe(1);
      expect(items[1].position).toBe(2);
      expect(items[2].position).toBe(3);
    });
  });
});
