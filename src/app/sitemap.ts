import type { MetadataRoute } from 'next';
import { getAllMunicipalitySlugs } from '@/data/municipalities';
import { getResidentialServiceSlugs, getCommercialServiceSlugs } from '@/data/services';
import { BASE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const cities = getAllMunicipalitySlugs();
  const residentialServices = getResidentialServiceSlugs();
  const commercialServices = getCommercialServiceSlugs();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/gallery`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/testimonials`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/service-areas`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/guides`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/problems`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Residential service pillar pages (priority 0.9)
  const residentialPages: MetadataRoute.Sitemap = residentialServices.map(
    (slug) => ({
      url: `${BASE_URL}/services/residential/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })
  );

  // Commercial service pillar pages (priority 0.9)
  const commercialPages: MetadataRoute.Sitemap = commercialServices.map(
    (slug) => ({
      url: `${BASE_URL}/services/commercial/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })
  );

  // City hub pages (priority 0.8)
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/service-areas/${city}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Service-in-city pages (priority 0.7)
  const residentialCityPages: MetadataRoute.Sitemap = residentialServices.flatMap(
    (service) =>
      cities.map((city) => ({
        url: `${BASE_URL}/services/residential/${service}/${city}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  );

  const commercialCityPages: MetadataRoute.Sitemap = commercialServices.flatMap(
    (service) =>
      cities.map((city) => ({
        url: `${BASE_URL}/services/commercial/${service}/${city}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  );

  return [
    ...staticPages,
    ...residentialPages,
    ...commercialPages,
    ...cityPages,
    ...residentialCityPages,
    ...commercialCityPages,
  ];
}
