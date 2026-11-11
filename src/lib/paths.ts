import { getAllServiceSlugs } from '@/data/services';
import { getAllMunicipalitySlugs } from '@/data/municipalities';

/**
 * Flat URL structure (restructure 2026-10-17).
 *
 * Public URLs are flat:
 *   service x city combo: /<public-service-slug>-<city>-nj
 *
 * Single-city restructure (2026-11-06): the site publishes Jersey City
 * pages only. City hub pages (/roofing-contractor-<city>-nj) are retired
 * for every city including Jersey City — the homepage is the Jersey City
 * hub now — and the other 11 towns' combo pages are retired. All retired
 * URLs 308 to the same service's Jersey City page or to / (see
 * vercel.json). The full municipality dataset stays in
 * src/data/municipalities.ts as reference data; it no longer drives
 * page generation.
 *
 * Internal data slugs stay unchanged; two services publish under a
 * different public slug (emergency-roofing, commercial-repair/replacement).
 * The old service pillar (hub) pages were merged into each service's
 * Jersey City combo page, so "pillar" links resolve there.
 */

/** Cities that get generated pages (single-city site since 2026-11-06). */
export const PUBLISHED_CITY_SLUGS: readonly string[] = ['jersey-city'];

/** Municipality slugs that get generated pages, in dataset order. */
export function getPublishedCitySlugs(): string[] {
  return getAllMunicipalitySlugs().filter((slug) =>
    PUBLISHED_CITY_SLUGS.includes(slug),
  );
}
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

/**
 * Flat Rule 7 service hub paths (Toms River treatment, 2026-11-10).
 * Static routes under src/app/(marketing)/ that list the Jersey City
 * services by side. They are NOT service x city combos: parseFlatSlug
 * returns null for them ("residential-roofing"/"commercial-roofing" are
 * not internal service slugs), so the [slug] route never claims them.
 */
export const RESIDENTIAL_HUB_PATH = '/residential-roofing-jersey-city-nj';
export const COMMERCIAL_HUB_PATH = '/commercial-roofing-jersey-city-nj';

export type FlatRoute = { type: 'combo'; serviceSlug: string; citySlug: string };

/**
 * Parse a flat root-level slug back into its route target.
 * Returns null for anything that is not a generated flat page.
 * Since 2026-11-06 only Jersey City combos are generated, and the
 * retired /roofing-contractor-<city>-nj hub slugs parse to null (they
 * are redirect sources in vercel.json, not pages).
 */
export function parseFlatSlug(slug: string): FlatRoute | null {
  const cities = getPublishedCitySlugs();

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

/**
 * All flat page slugs (without leading slash): the 8 Jersey City combos.
 * (Was 96 combos + 12 city hubs before the 2026-11-06 single-city cut.)
 */
export function getAllFlatSlugs(): string[] {
  const slugs: string[] = [];
  for (const serviceSlug of getAllServiceSlugs()) {
    for (const citySlug of getPublishedCitySlugs()) {
      slugs.push(serviceCityPath(serviceSlug, citySlug).slice(1));
    }
  }
  return slugs;
}

/** True for root-level flat page paths like /roof-repair-hoboken-nj. */
export function isFlatPagePath(pathname: string): boolean {
  return /^\/[a-z0-9-]+-nj$/.test(pathname);
}
