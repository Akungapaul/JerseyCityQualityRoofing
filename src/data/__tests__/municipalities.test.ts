import { describe, it, expect } from 'vitest';
import {
  getMunicipality,
  getAllMunicipalitySlugs,
  getMunicipalitiesByTier,
  getAllMunicipalities,
} from '@/data/municipalities';

describe('municipalities registry', () => {
  it('contains exactly 12 municipalities', () => {
    expect(getAllMunicipalitySlugs()).toHaveLength(12);
  });

  it('contains all expected city slugs', () => {
    const slugs = getAllMunicipalitySlugs();
    const expected = [
      'jersey-city', 'hoboken', 'bayonne', 'north-bergen',
      'union-city', 'west-new-york', 'secaucus', 'kearny',
      'harrison', 'east-newark', 'guttenberg', 'weehawken',
    ];
    expected.forEach((slug) => {
      expect(slugs).toContain(slug);
    });
  });

  it('getMunicipality returns data for valid slug', () => {
    const jc = getMunicipality('jersey-city');
    expect(jc).toBeDefined();
    expect(jc?.name).toBe('Jersey City');
    expect(jc?.tier).toBe(1);
  });

  it('getMunicipality returns undefined for invalid slug', () => {
    expect(getMunicipality('nonexistent')).toBeUndefined();
  });

  it('every municipality has 5+ landmarks', () => {
    getAllMunicipalities().forEach((m) => {
      expect(m.landmarks.length).toBeGreaterThanOrEqual(5);
    });
  });

  it('every municipality has populated housingStock', () => {
    getAllMunicipalities().forEach((m) => {
      expect(m.housingStock.medianAge).toBeGreaterThan(0);
      expect(m.housingStock.totalUnits).toBeGreaterThan(0);
    });
  });

  it('every municipality has populated weatherPatterns', () => {
    getAllMunicipalities().forEach((m) => {
      expect(m.weatherPatterns.annualSnowfall).toBeGreaterThan(0);
      expect(m.weatherPatterns.commonWeatherConcerns.length).toBeGreaterThan(0);
    });
  });

  it('every municipality has populated buildingCodes', () => {
    getAllMunicipalities().forEach((m) => {
      expect(m.buildingCodes.permitRequired).toBe(true);
    });
  });

  it('tier 1 contains exactly 4 cities', () => {
    expect(getMunicipalitiesByTier(1)).toHaveLength(4);
  });

  it('tier 2 contains exactly 4 cities', () => {
    expect(getMunicipalitiesByTier(2)).toHaveLength(4);
  });

  it('tier 3 contains exactly 4 cities', () => {
    expect(getMunicipalitiesByTier(3)).toHaveLength(4);
  });
});
