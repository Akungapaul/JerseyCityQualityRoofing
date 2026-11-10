import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { COMMERCIAL_HUB_PATH, RESIDENTIAL_HUB_PATH } from '@/lib/paths';
import { COMMERCIAL_HUB_CARDS } from '@/data/service-hubs';
import ServiceHubPage from '../_templates/service-hub';

/**
 * Commercial Roofing Jersey City, NJ — flat Rule 7 service hub
 * (Toms River treatment, 2026-11-10). Lists both commercial services
 * as whole-card links. Rule 7: the phrase is in the title tag, the
 * H1, the first sentence, and the slug.
 */

const PHRASE = 'Commercial Roofing Jersey City, NJ';

const DESCRIPTION =
  'Commercial Roofing Jersey City, NJ: commercial roof repair and commercial roof replacement for Jersey City offices, warehouses, and mixed-use buildings.';

export const metadata: Metadata = generatePageMetadata({
  title: PHRASE,
  description: DESCRIPTION,
  path: COMMERCIAL_HUB_PATH,
});

export default function CommercialRoofingHubPage() {
  return (
    <ServiceHubPage
      hub={{
        phrase: PHRASE,
        path: COMMERCIAL_HUB_PATH,
        description: DESCRIPTION,
        firstSentence:
          'Commercial Roofing Jersey City, NJ covers the roofing services Jersey City Quality Roofing provides for commercial buildings: commercial roof repair and commercial roof replacement.',
        badgeLabel: 'COMMERCIAL ROOFING',
        gridHeading: 'Commercial Roofing Services in Jersey City, NJ',
        cards: COMMERCIAL_HUB_CARDS,
        otherHub: {
          phrase: 'Residential Roofing Jersey City, NJ',
          path: RESIDENTIAL_HUB_PATH,
          heading: 'Roofing for Jersey City Homes',
          text: 'Jersey City Quality Roofing also roofs homes. Our residential services cover roof repair, roof replacement, inspections, emergency repairs, flat roof systems, and maintenance for houses and residential buildings across Jersey City.',
        },
      }}
    />
  );
}
