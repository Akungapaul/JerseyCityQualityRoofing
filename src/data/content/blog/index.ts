import type { BlogArticle } from '@/data/types';
import { SIGNS_YOU_NEED_ROOF_REPAIR } from './signs-you-need-roof-repair';
import { COMPLETE_ROOF_REPLACEMENT_GUIDE } from './complete-roof-replacement-guide';
import { WHY_ANNUAL_ROOF_INSPECTIONS } from './why-annual-roof-inspections-save-thousands';
import { CHOOSING_COMMERCIAL_FLAT_ROOF } from './choosing-commercial-flat-roof-system';
import { PREVENTATIVE_ROOF_MAINTENANCE } from './preventative-roof-maintenance-checklist';
import { HOMEOWNERS_ROOF_ANATOMY } from './homeowners-roof-anatomy-guide';
import { HUDSON_COUNTY_WEATHER_EFFECTS } from './hudson-county-weather-roof-effects';
import { ROOFING_INSURANCE_CLAIMS } from './roofing-insurance-claims-nj-guide';

export const ALL_BLOG_ARTICLES: BlogArticle[] = [
  SIGNS_YOU_NEED_ROOF_REPAIR,
  COMPLETE_ROOF_REPLACEMENT_GUIDE,
  WHY_ANNUAL_ROOF_INSPECTIONS,
  CHOOSING_COMMERCIAL_FLAT_ROOF,
  PREVENTATIVE_ROOF_MAINTENANCE,
  HOMEOWNERS_ROOF_ANATOMY,
  HUDSON_COUNTY_WEATHER_EFFECTS,
  ROOFING_INSURANCE_CLAIMS,
];

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return ALL_BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getSiloSupportingArticles(): BlogArticle[] {
  return ALL_BLOG_ARTICLES.filter((a) => a.siloService !== null);
}

export function getStandaloneArticles(): BlogArticle[] {
  return ALL_BLOG_ARTICLES.filter((a) => a.siloService === null);
}

export function getArticlesForService(serviceSlug: string): BlogArticle[] {
  return ALL_BLOG_ARTICLES.filter(
    (a) => a.siloService === serviceSlug || a.relatedServiceSlugs.includes(serviceSlug)
  );
}
