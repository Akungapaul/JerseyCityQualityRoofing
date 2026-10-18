import { getAllServiceSlugs } from '@/data/services';
import { getAllMunicipalitySlugs } from '@/data/municipalities';

/**
 * Flat URL structure (restructure 2026-10-17).
 *
 * Public URLs are flat:
 *   service x city combo: /<public-service-slug>-<city>-nj
 *   city hub:             /roofing-contractor-<city>-nj
 *
 * Internal data slugs stay unchanged; two services publish under a
 * different public slug (emergency-roofing, commercial-repair/replacement).
 * The old service pillar (hub) pages were merged into each service's
 * Jersey City combo page, so "pillar" links resolve there.
 */
export const PUBLIC_SERVICE_SLUGS: Record<string, string> = {
  'roof-repair': 'roof-repair',
  'roof-replacement': 'roof-replacement',
  'roof-inspection': 'roof-inspection',
  'emergency-roofing': 'emergency-roof-repair',
  'flat-roof-systems': 'flat-roof-systems',
  'roof-maintenance': 'roof-maintenance',
  'commercial-repair': 'commercial-roof-repair',
  'commercial-replacement': 'commercial-roof-replacement',
};

export const INTERNAL_SERVICE_SLUGS: Record<string, string> = Object.fromEntries(
  Object.entries(PUBLIC_SERVICE_SLUGS).map(([internal, pub]) => [pub, internal]),
);

export function getPublicServiceSlug(serviceSlug: string): string {
  return PUBLIC_SERVICE_SLUGS[serviceSlug] ?? serviceSlug;
}

/** Flat combo path: /<public-service>-<city>-nj */
export function serviceCityPath(serviceSlug: string, citySlug: string): string {
  return `/${getPublicServiceSlug(serviceSlug)}-${citySlug}-nj`;
}

/**
 * Former service pillar/hub URL target. The hub pages were merged into the
 * Jersey City combo pages, so pillar links point at that combo page.
 */
export function servicePillarPath(serviceSlug: string): string {
  return serviceCityPath(serviceSlug, 'jersey-city');
}

/** Flat city hub path: /roofing-contractor-<city>-nj */
export function cityHubPath(citySlug: string): string {
  return `/roofing-contractor-${citySlug}-nj`;
}

export type FlatRoute =
  | { type: 'combo'; serviceSlug: string; citySlug: string }
  | { type: 'city'; citySlug: string };

/**
 * Parse a flat root-level slug back into its route target.
 * Returns null for anything that is not a generated flat page.
 */
export function parseFlatSlug(slug: string): FlatRoute | null {
  const cities = getAllMunicipalitySlugs();

  if (slug.startsWith('roofing-contractor-') && slug.endsWith('-nj')) {
    const citySlug = slug.slice('roofing-contractor-'.length, slug.length - '-nj'.length);
    return cities.includes(citySlug) ? { type: 'city', citySlug } : null;
  }

  if (!slug.endsWith('-nj')) return null;
  const rest = slug.slice(0, slug.length - '-nj'.length);

  // Longest city slug first so multi-word cities win unambiguously.
  for (const citySlug of [...cities].sort((a, b) => b.length - a.length)) {
    if (rest.endsWith(`-${citySlug}`)) {
      const publicService = rest.slice(0, rest.length - citySlug.length - 1);
      const serviceSlug = INTERNAL_SERVICE_SLUGS[publicService];
      if (serviceSlug) return { type: 'combo', serviceSlug, citySlug };
    }
  }
  return null;
}

/** All flat page slugs (without leading slash): 96 combos + 12 city hubs. */
export function getAllFlatSlugs(): string[] {
  const slugs: string[] = [];
  for (const serviceSlug of getAllServiceSlugs()) {
    for (const citySlug of getAllMunicipalitySlugs()) {
      slugs.push(serviceCityPath(serviceSlug, citySlug).slice(1));
    }
  }
  for (const citySlug of getAllMunicipalitySlugs()) {
    slugs.push(cityHubPath(citySlug).slice(1));
  }
  return slugs;
}

/** True for root-level flat page paths like /roof-repair-hoboken-nj. */
export function isFlatPagePath(pathname: string): boolean {
  return /^\/[a-z0-9-]+-nj$/.test(pathname);
}
