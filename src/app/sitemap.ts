import type { MetadataRoute } from 'next';
import { getAllServiceSlugs } from '@/data/services';
import { serviceCityPath, getPublishedCitySlugs } from '@/lib/paths';
import { ALL_BLOG_ARTICLES } from '@/data/content/blog';
import { ALL_COST_GUIDES } from '@/data/content/cost-guides';
import { ALL_MATERIAL_GUIDES } from '@/data/content/material-guides';
import { ALL_PROBLEMS } from '@/data/content/problems';
import { BASE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-city restructure (2026-11-06): only Jersey City combo pages
  // are generated. City hubs, /service-areas, and the /services index
  // layer are retired (308 via vercel.json) and out of the sitemap.
  const cities = getPublishedCitySlugs();
  const services = getAllServiceSlugs();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/gallery`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/guides`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/guides/cost`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/guides/materials`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/problems`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Service-in-city pages (flat: /<service>-<city>-nj, priority 0.7)
  const serviceCityPages: MetadataRoute.Sitemap = services.flatMap((service) =>
    cities.map((city) => ({
      url: `${BASE_URL}${serviceCityPath(service, city)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
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
    ...serviceCityPages,
    ...blogPages,
    ...costGuidePages,
    ...materialGuidePages,
    ...problemPages,
  ];
}
