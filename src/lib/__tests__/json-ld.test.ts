import { describe, it, expect } from 'vitest';
import {
  buildRoofingContractorJsonLd,
  buildBreadcrumbJsonLd,
  buildAggregateRatingJsonLd,
  buildFaqPageJsonLd,
  buildContactPageJsonLd,
  buildServicePageJsonLd,
} from '@/lib/seo/json-ld';
import { TESTIMONIALS } from '@/data/testimonials';
import { BUSINESS_INFO } from '@/data/business-info';
import { BASE_URL } from '@/lib/constants';
import { getService } from '@/data/services';

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

    it('includes @id entity anchor for cross-page graph resolution', () => {
      const schema = buildRoofingContractorJsonLd() as unknown as Record<string, unknown>;
      expect(schema['@id']).toBe(`${BASE_URL}/#organization`);
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

  describe('buildAggregateRatingJsonLd', () => {
    it('returns schema with @context and @type RoofingContractor', () => {
      const schema = buildAggregateRatingJsonLd(TESTIMONIALS) as unknown as Record<string, unknown>;
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('RoofingContractor');
    });

    it('includes aggregateRating with @type AggregateRating', () => {
      const schema = buildAggregateRatingJsonLd(TESTIMONIALS) as unknown as Record<string, unknown>;
      const aggregateRating = schema.aggregateRating as Record<string, unknown>;
      expect(aggregateRating).toBeDefined();
      expect(aggregateRating['@type']).toBe('AggregateRating');
    });

    it('computes ratingValue as average of all testimonial ratings', () => {
      const schema = buildAggregateRatingJsonLd(TESTIMONIALS) as unknown as Record<string, unknown>;
      const aggregateRating = schema.aggregateRating as Record<string, unknown>;
      const expectedAvg = (
        TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length
      ).toFixed(1);
      expect(aggregateRating.ratingValue).toBe(expectedAvg);
    });

    it('includes reviewCount equal to testimonials length as string', () => {
      const schema = buildAggregateRatingJsonLd(TESTIMONIALS) as unknown as Record<string, unknown>;
      const aggregateRating = schema.aggregateRating as Record<string, unknown>;
      expect(aggregateRating.reviewCount).toBe(String(TESTIMONIALS.length));
    });

    it('includes bestRating "5" and worstRating "1"', () => {
      const schema = buildAggregateRatingJsonLd(TESTIMONIALS) as unknown as Record<string, unknown>;
      const aggregateRating = schema.aggregateRating as Record<string, unknown>;
      expect(aggregateRating.bestRating).toBe('5');
      expect(aggregateRating.worstRating).toBe('1');
    });

    it('includes name matching BUSINESS_INFO.name', () => {
      const schema = buildAggregateRatingJsonLd(TESTIMONIALS) as unknown as Record<string, unknown>;
      expect(schema.name).toBe(BUSINESS_INFO.name);
    });
  });

  describe('buildFaqPageJsonLd', () => {
    const testFaqs = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ];

    it('returns FAQPage schema with @context', () => {
      const schema = buildFaqPageJsonLd(testFaqs) as unknown as Record<string, unknown>;
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('FAQPage');
    });

    it('has mainEntity array with correct number of Question objects', () => {
      const schema = buildFaqPageJsonLd(testFaqs) as unknown as Record<string, unknown>;
      const mainEntity = schema.mainEntity as Array<Record<string, unknown>>;
      expect(Array.isArray(mainEntity)).toBe(true);
      expect(mainEntity).toHaveLength(2);
    });

    it('each Question has name matching question and acceptedAnswer.text matching answer', () => {
      const schema = buildFaqPageJsonLd(testFaqs) as unknown as Record<string, unknown>;
      const mainEntity = schema.mainEntity as Array<Record<string, unknown>>;

      mainEntity.forEach((q, i) => {
        expect(q['@type']).toBe('Question');
        expect(q.name).toBe(testFaqs[i].question);
        const answer = q.acceptedAnswer as Record<string, unknown>;
        expect(answer['@type']).toBe('Answer');
        expect(answer.text).toBe(testFaqs[i].answer);
      });
    });
  });

  describe('buildContactPageJsonLd', () => {
    it('returns RoofingContractor schema', () => {
      const schema = buildContactPageJsonLd() as unknown as Record<string, unknown>;
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('RoofingContractor');
    });

    it('includes telephone, email, and url', () => {
      const schema = buildContactPageJsonLd() as unknown as Record<string, unknown>;
      expect(schema.telephone).toBe(BUSINESS_INFO.phone);
      expect(schema.email).toBe(BUSINESS_INFO.email);
      expect(schema.url).toBe(BASE_URL);
    });

    it('includes PostalAddress with all fields', () => {
      const schema = buildContactPageJsonLd() as unknown as Record<string, unknown>;
      const address = schema.address as Record<string, unknown>;
      expect(address['@type']).toBe('PostalAddress');
      expect(address.streetAddress).toBe(BUSINESS_INFO.address.street);
      expect(address.addressLocality).toBe(BUSINESS_INFO.address.city);
      expect(address.addressRegion).toBe(BUSINESS_INFO.address.state);
      expect(address.postalCode).toBe(BUSINESS_INFO.address.zip);
      expect(address.addressCountry).toBe('US');
    });

    it('includes openingHoursSpecification as array with 2 entries (weekday and Saturday)', () => {
      const schema = buildContactPageJsonLd() as unknown as Record<string, unknown>;
      const hours = schema.openingHoursSpecification as Array<Record<string, unknown>>;
      expect(Array.isArray(hours)).toBe(true);
      expect(hours).toHaveLength(2);

      // Weekday entry
      expect(hours[0]['@type']).toBe('OpeningHoursSpecification');
      expect(hours[0].dayOfWeek).toEqual(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
      expect(hours[0].opens).toBe('07:00');
      expect(hours[0].closes).toBe('18:00');

      // Saturday entry
      expect(hours[1]['@type']).toBe('OpeningHoursSpecification');
      expect(hours[1].dayOfWeek).toEqual(['Saturday']);
      expect(hours[1].opens).toBe('08:00');
      expect(hours[1].closes).toBe('14:00');
    });

    it('includes areaServed array with 12 cities', () => {
      const schema = buildContactPageJsonLd() as unknown as Record<string, unknown>;
      const areaServed = schema.areaServed as Array<Record<string, unknown>>;
      expect(Array.isArray(areaServed)).toBe(true);
      expect(areaServed).toHaveLength(12);
      areaServed.forEach((area) => {
        expect(area['@type']).toBe('City');
        expect(typeof area.name).toBe('string');
      });
    });

    it('includes paymentAccepted field', () => {
      const schema = buildContactPageJsonLd() as unknown as Record<string, unknown>;
      expect(schema.paymentAccepted).toBeDefined();
      expect(typeof schema.paymentAccepted).toBe('string');
    });
  });

  describe('buildServicePageJsonLd', () => {
    const service = getService('roof-repair')!;
    const canonicalUrl = 'https://www.jerseycityqualityroofing.com/services/residential/roof-repair';

    it('returns Service schema with @context and @type', () => {
      const schema = buildServicePageJsonLd(service, canonicalUrl) as unknown as Record<string, unknown>;
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Service');
    });

    it('includes service name and description', () => {
      const schema = buildServicePageJsonLd(service, canonicalUrl) as unknown as Record<string, unknown>;
      expect(schema.name).toBe('Roof Repair');
      expect(schema.description).toBe(service.fullDescription);
    });

    it('includes serviceType matching service name', () => {
      const schema = buildServicePageJsonLd(service, canonicalUrl) as unknown as Record<string, unknown>;
      expect(schema.serviceType).toBe('Roof Repair');
    });

    it('includes canonical URL', () => {
      const schema = buildServicePageJsonLd(service, canonicalUrl) as unknown as Record<string, unknown>;
      expect(schema.url).toBe(canonicalUrl);
    });

    it('includes provider with @type RoofingContractor', () => {
      const schema = buildServicePageJsonLd(service, canonicalUrl) as unknown as Record<string, unknown>;
      const provider = schema.provider as Record<string, unknown>;
      expect(provider['@type']).toBe('RoofingContractor');
      expect(provider.name).toBe(BUSINESS_INFO.name);
      expect(provider.telephone).toBe(BUSINESS_INFO.phone);
    });

    it('includes provider PostalAddress', () => {
      const schema = buildServicePageJsonLd(service, canonicalUrl) as unknown as Record<string, unknown>;
      const provider = schema.provider as Record<string, unknown>;
      const address = provider.address as Record<string, unknown>;
      expect(address['@type']).toBe('PostalAddress');
      expect(address.streetAddress).toBe(BUSINESS_INFO.address.street);
    });

    it('includes areaServed with 12 cities', () => {
      const schema = buildServicePageJsonLd(service, canonicalUrl) as unknown as Record<string, unknown>;
      expect(Array.isArray(schema.areaServed)).toBe(true);
      expect((schema.areaServed as unknown[]).length).toBe(12);
    });

    it('includes hasOfferCatalog with OfferCatalog type', () => {
      const schema = buildServicePageJsonLd(service, canonicalUrl) as unknown as Record<string, unknown>;
      const catalog = schema.hasOfferCatalog as Record<string, unknown>;
      expect(catalog['@type']).toBe('OfferCatalog');
      expect(catalog.name).toBe('Roof Repair Services');
    });

    it('OfferCatalog has itemListElement with Offer', () => {
      const schema = buildServicePageJsonLd(service, canonicalUrl) as unknown as Record<string, unknown>;
      const catalog = schema.hasOfferCatalog as Record<string, unknown>;
      const items = catalog.itemListElement as Array<Record<string, unknown>>;
      expect(items).toHaveLength(1);
      expect(items[0]['@type']).toBe('Offer');
      const offered = items[0].itemOffered as Record<string, unknown>;
      expect(offered['@type']).toBe('Service');
      expect(offered.name).toBe('Roof Repair');
    });
  });
});
