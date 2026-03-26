import { describe, it, expect } from 'vitest';
import { buildCityRoofingContractorJsonLd } from '@/lib/seo/json-ld';
import { getMunicipality, getAllMunicipalitySlugs } from '@/data/municipalities';
import { getServicesByCategory } from '@/data/services';
import { BASE_URL } from '@/lib/constants';
import { BUSINESS_INFO } from '@/data/business-info';
import type { Service } from '@/data/types';

function getAllServices(): Service[] {
  return [
    ...getServicesByCategory('residential'),
    ...getServicesByCategory('commercial'),
  ];
}

// Cast JSON-LD result to a generic record for property access in tests.
// The builder returns WithContext<RoofingContractor> which is a strict union
// type from schema-dts that doesn't expose extended properties directly.
type JsonLdRecord = Record<string, unknown>;

describe('city roofing contractor JSON-LD', () => {
  describe('jersey-city schema', () => {
    const city = getMunicipality('jersey-city')!;
    const services = getAllServices();
    const result = buildCityRoofingContractorJsonLd(city, services) as unknown as JsonLdRecord;

    it('has @type RoofingContractor', () => {
      expect(result['@type']).toBe('RoofingContractor');
    });

    it('has @id pointing to organization', () => {
      expect(result['@id']).toBe(`${BASE_URL}/#organization`);
    });

    it('has areaServed with @type City, name Jersey City, and @id', () => {
      const areaServed = result['areaServed'] as Record<string, unknown>;
      expect(areaServed['@type']).toBe('City');
      expect(areaServed['name']).toBe('Jersey City');
      expect(areaServed['@id']).toBe(`${BASE_URL}/service-areas/jersey-city#city`);
    });

    it('has knowsAbout array with length > 0 containing city-specific entry', () => {
      const knowsAbout = result['knowsAbout'] as string[];
      expect(knowsAbout.length).toBeGreaterThan(0);
      expect(knowsAbout).toContain('Roofing services in Jersey City');
    });

    it('has makesOffer array with 8 entries (4 residential + 4 commercial)', () => {
      const makesOffer = result['makesOffer'] as Array<Record<string, unknown>>;
      expect(makesOffer.length).toBe(8);
    });

    it('each makesOffer[].itemOffered has @id matching service pattern', () => {
      const makesOffer = result['makesOffer'] as Array<{ itemOffered: Record<string, unknown> }>;
      const serviceIdPattern = new RegExp(
        `^${BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/services/(residential|commercial)/[a-z-]+#service$`
      );
      makesOffer.forEach((offer) => {
        expect(offer.itemOffered['@id']).toMatch(serviceIdPattern);
      });
    });

    it('has address.streetAddress matching BUSINESS_INFO (NAP consistency)', () => {
      const address = result['address'] as Record<string, unknown>;
      expect(address['streetAddress']).toBe(BUSINESS_INFO.address.street);
    });

    it('has telephone matching BUSINESS_INFO (NAP consistency)', () => {
      expect(result['telephone']).toBe(BUSINESS_INFO.phone);
    });
  });

  describe('all 12 cities produce valid JSON-LD', () => {
    const allSlugs = getAllMunicipalitySlugs();
    const services = getAllServices();

    it.each(allSlugs.map((slug) => ({ slug })))(
      '$slug produces valid JSON-LD with no undefined values',
      ({ slug }) => {
        const city = getMunicipality(slug)!;
        const result = buildCityRoofingContractorJsonLd(city, services) as unknown as JsonLdRecord;

        // Serialize and check for undefined (JSON.stringify drops undefined keys)
        const serialized = JSON.stringify(result);
        expect(serialized).not.toContain('undefined');

        // Check @id format
        expect(result['@id']).toBe(`${BASE_URL}/#organization`);

        // Check areaServed has proper @id
        const areaServed = result['areaServed'] as Record<string, unknown>;
        expect(areaServed['@id']).toBe(`${BASE_URL}/service-areas/${slug}#city`);
        expect(areaServed['name']).toBe(city.name);
      }
    );
  });

  describe('entity consistency across all cities', () => {
    const allSlugs = getAllMunicipalitySlugs();
    const services = getAllServices();

    it('@id for the organization is identical across all 12 cities', () => {
      const orgIds = allSlugs.map((slug) => {
        const city = getMunicipality(slug)!;
        const result = buildCityRoofingContractorJsonLd(city, services) as unknown as JsonLdRecord;
        return result['@id'];
      });

      const uniqueIds = new Set(orgIds);
      expect(uniqueIds.size).toBe(1);
      expect(orgIds[0]).toBe(`${BASE_URL}/#organization`);
    });
  });
});
