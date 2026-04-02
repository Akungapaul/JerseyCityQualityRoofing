import type { MetadataRoute } from 'next';
import { getAllMunicipalitySlugs } from '@/data/municipalities';
import { getResidentialServiceSlugs, getCommercialServiceSlugs } from '@/data/services';
import { ALL_BLOG_ARTICLES } from '@/data/content/blog';
import { ALL_COST_GUIDES } from '@/data/content/cost-guides';
import { ALL_MATERIAL_GUIDES } from '@/data/content/material-guides';
import { ALL_PROBLEMS } from '@/data/content/problems';
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
    { url: `${BASE_URL}/service-areas`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/guides`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/problems`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/services`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services/residential`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services/commercial`, changeFrequency: 'monthly', priority: 0.8 },
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

  // Blog article pages (priority 0.6)
  const blogPages: MetadataRoute.Sitemap = ALL_BLOG_ARTICLES.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Cost guide pages (priority 0.7)
  const costGuidePages: MetadataRoute.Sitemap = ALL_COST_GUIDES.map((guide) => ({
    url: `${BASE_URL}/guides/cost/${guide.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Material guide pages (priority 0.7)
  const materialGuidePages: MetadataRoute.Sitemap = ALL_MATERIAL_GUIDES.map((guide) => ({
    url: `${BASE_URL}/guides/materials/${guide.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Problem pages (priority 0.6)
  const problemPages: MetadataRoute.Sitemap = ALL_PROBLEMS.map((problem) => ({
    url: `${BASE_URL}/problems/${problem.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...residentialPages,
    ...commercialPages,
    ...cityPages,
    ...residentialCityPages,
    ...commercialCityPages,
    ...blogPages,
    ...costGuidePages,
    ...materialGuidePages,
    ...problemPages,
  ];
}
