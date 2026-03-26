import { describe, it, expect } from 'vitest';
import { buildServiceInCityJsonLd, buildBreadcrumbJsonLd, buildFaqPageJsonLd } from '@/lib/seo/json-ld';
import { getService } from '@/data/services';
import { getMunicipality } from '@/data/municipalities';
import { BASE_URL } from '@/lib/constants';
import { BUSINESS_INFO } from '@/data/business-info';

describe('service-in-city SEO', () => {
  const service = getService('roof-repair')!;
  const city = getMunicipality('jersey-city')!;
  const canonicalUrl = `${BASE_URL}/services/residential/roof-repair/jersey-city`;

  describe('buildServiceInCityJsonLd', () => {
    const jsonLd = buildServiceInCityJsonLd(service, city, canonicalUrl);

    it('has @context https://schema.org', () => {
      expect(jsonLd['@context']).toBe('https://schema.org');
    });

    it('has @type Service', () => {
      expect(jsonLd['@type']).toBe('Service');
    });

    it('has @id with #service fragment', () => {
      expect(jsonLd['@id']).toBe(`${canonicalUrl}#service`);
    });

    it('name combines service and city', () => {
      expect(jsonLd.name).toBe('Roof Repair in Jersey City');
    });

    it('description includes service and city names', () => {
      const desc = jsonLd.description as string;
      expect(desc).toContain('roof repair');
      expect(desc).toContain('Jersey City');
    });

    it('areaServed is a City with @id referencing city hub', () => {
      const area = jsonLd.areaServed as Record<string, string>;
      expect(area['@type']).toBe('City');
      expect(area.name).toBe('Jersey City');
      expect(area['@id']).toBe(`${BASE_URL}/service-areas/jersey-city#city`);
    });

    it('provider references organization @id', () => {
      const provider = jsonLd.provider as Record<string, string>;
      expect(provider['@type']).toBe('RoofingContractor');
      expect(provider['@id']).toBe(`${BASE_URL}/#organization`);
      expect(provider.name).toBe(BUSINESS_INFO.name);
    });

    it('url matches canonical', () => {
      expect(jsonLd.url).toBe(canonicalUrl);
    });
  });

  describe('breadcrumb chain for service-in-city', () => {
    const items = [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Residential', url: `${BASE_URL}/services/residential` },
      { name: 'Roof Repair', url: `${BASE_URL}/services/residential/roof-repair` },
      { name: 'Jersey City', url: canonicalUrl },
    ];
    const breadcrumbs = buildBreadcrumbJsonLd(items);

    it('has 5 items in the breadcrumb chain', () => {
      const elements = breadcrumbs.itemListElement as unknown as Array<Record<string, unknown>>;
      expect(elements).toHaveLength(5);
    });

    it('positions are sequential 1-5', () => {
      const elements = breadcrumbs.itemListElement as unknown as Array<Record<string, unknown>>;
      elements.forEach((el, i) => {
        expect(el.position).toBe(i + 1);
      });
    });

    it('last item is the city name', () => {
      const elements = breadcrumbs.itemListElement as unknown as Array<Record<string, unknown>>;
      expect(elements[4].name).toBe('Jersey City');
    });
  });

  describe('FAQ schema for service-in-city', () => {
    const faqs = [
      { question: 'Test Q1?', answer: 'Test A1' },
      { question: 'Test Q2?', answer: 'Test A2' },
    ];
    const faqJsonLd = buildFaqPageJsonLd(faqs);

    it('has @type FAQPage', () => {
      expect(faqJsonLd['@type']).toBe('FAQPage');
    });

    it('mainEntity has correct number of questions', () => {
      const entities = faqJsonLd.mainEntity as unknown as Array<Record<string, unknown>>;
      expect(entities).toHaveLength(2);
    });
  });
});
