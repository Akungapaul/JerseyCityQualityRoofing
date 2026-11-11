import { serviceCityPath } from '@/lib/paths';

// Jersey City service-in-city content (the pages the cards point at)
import { JERSEY_CITY_ROOF_REPAIR_CONTENT } from './content/service-cities/jersey-city/roof-repair';
import { JERSEY_CITY_ROOF_REPLACEMENT_CONTENT } from './content/service-cities/jersey-city/roof-replacement';
import { JERSEY_CITY_ROOF_INSPECTION_CONTENT } from './content/service-cities/jersey-city/roof-inspection';
import { JERSEY_CITY_EMERGENCY_ROOFING_CONTENT } from './content/service-cities/jersey-city/emergency-roofing';
import { JERSEY_CITY_FLAT_ROOF_SYSTEMS_CONTENT } from './content/service-cities/jersey-city/flat-roof-systems';
import { JERSEY_CITY_ROOF_MAINTENANCE_CONTENT } from './content/service-cities/jersey-city/roof-maintenance';
import { JERSEY_CITY_COMMERCIAL_REPAIR_CONTENT } from './content/service-cities/jersey-city/commercial-repair';
import { JERSEY_CITY_COMMERCIAL_REPLACEMENT_CONTENT } from './content/service-cities/jersey-city/commercial-replacement';
import { ROOF_REPLACEMENT_COST } from './content/cost-guides/roof-replacement-cost';

/**
 * Card data for the two flat Rule 7 service hubs and the homepage
 * service-family grids (Toms River treatment, 2026-11-10).
 *
 * Card rule (Paul's brief): the whole card is the link, the card title
 * is the target page's exact H1 phrase, and the blurb is the first
 * complete sentence from that page. Both fields are pulled from the
 * target page's own content data so they can never drift from the
 * pages themselves:
 * - service pages: heroHeadline (the H1) + heroSubtitle (the first
 *   sentence under the H1, a single complete sentence);
 * - the roof replacement cost guide: headline (its H1) + subtitle
 *   (the first sentence under its H1).
 */
export interface ServiceHubCard {
  href: string;
  title: string;
  blurb: string;
}

function serviceCard(
  serviceSlug: string,
  content: { heroHeadline: string; heroSubtitle: string },
): ServiceHubCard {
  return {
    href: serviceCityPath(serviceSlug, 'jersey-city'),
    title: content.heroHeadline,
    blurb: content.heroSubtitle,
  };
}

export const SERVICE_CARDS: Record<string, ServiceHubCard> = {
  'roof-repair': serviceCard('roof-repair', JERSEY_CITY_ROOF_REPAIR_CONTENT),
  'roof-replacement': serviceCard(
    'roof-replacement',
    JERSEY_CITY_ROOF_REPLACEMENT_CONTENT,
  ),
  'roof-inspection': serviceCard(
    'roof-inspection',
    JERSEY_CITY_ROOF_INSPECTION_CONTENT,
  ),
  'emergency-roofing': serviceCard(
    'emergency-roofing',
    JERSEY_CITY_EMERGENCY_ROOFING_CONTENT,
  ),
  'flat-roof-systems': serviceCard(
    'flat-roof-systems',
    JERSEY_CITY_FLAT_ROOF_SYSTEMS_CONTENT,
  ),
  'roof-maintenance': serviceCard(
    'roof-maintenance',
    JERSEY_CITY_ROOF_MAINTENANCE_CONTENT,
  ),
  'commercial-repair': serviceCard(
    'commercial-repair',
    JERSEY_CITY_COMMERCIAL_REPAIR_CONTENT,
  ),
  'commercial-replacement': serviceCard(
    'commercial-replacement',
    JERSEY_CITY_COMMERCIAL_REPLACEMENT_CONTENT,
  ),
};

/** Residential hub: ALL residential-side services (brief Step 4). */
export const RESIDENTIAL_HUB_CARDS: ServiceHubCard[] = [
  SERVICE_CARDS['roof-repair'],
  SERVICE_CARDS['roof-replacement'],
  SERVICE_CARDS['roof-inspection'],
  SERVICE_CARDS['emergency-roofing'],
  SERVICE_CARDS['flat-roof-systems'],
  SERVICE_CARDS['roof-maintenance'],
];

/** Commercial hub: the two commercial services (brief Step 4). */
export const COMMERCIAL_HUB_CARDS: ServiceHubCard[] = [
  SERVICE_CARDS['commercial-repair'],
  SERVICE_CARDS['commercial-replacement'],
];

/**
 * The roof replacement cost guide card. It belongs to the Replacement
 * family on the homepage (brief Step 5). Title = the guide page's
 * exact H1 (its `headline`); blurb = the first complete sentence on
 * that page (its `subtitle`, rendered directly under the H1).
 */
export const ROOF_REPLACEMENT_COST_CARD: ServiceHubCard = {
  href: `/guides/cost/${ROOF_REPLACEMENT_COST.slug}`,
  title: ROOF_REPLACEMENT_COST.headline,
  blurb: ROOF_REPLACEMENT_COST.subtitle,
};
