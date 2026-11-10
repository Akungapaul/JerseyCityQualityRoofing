import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { RESIDENTIAL_HUB_PATH, COMMERCIAL_HUB_PATH } from '@/lib/paths';
import { RESIDENTIAL_HUB_CARDS } from '@/data/service-hubs';
import ServiceHubPage from '../_templates/service-hub';

/**
 * Residential Roofing Jersey City, NJ — flat Rule 7 service hub
 * (Toms River treatment, 2026-11-10). Lists every residential-side
 * service as a whole-card link. Rule 7: the phrase is in the title
 * tag, the H1, the first sentence, and the slug.
 */

const PHRASE = 'Residential Roofing Jersey City, NJ';

const DESCRIPTION =
  'Residential Roofing Jersey City, NJ services for homes: roof repair, replacement, inspection, emergency roofing, flat roof systems, and maintenance.';

export const metadata: Metadata = generatePageMetadata({
  title: PHRASE,
  description: DESCRIPTION,
  path: RESIDENTIAL_HUB_PATH,
});

export default function ResidentialRoofingHubPage() {
  return (
    <ServiceHubPage
      hub={{
        phrase: PHRASE,
        path: RESIDENTIAL_HUB_PATH,
        description: DESCRIPTION,
        firstSentence:
          'Residential Roofing Jersey City, NJ covers every roofing service Jersey City Quality Roofing provides for homes, from roof repair and roof replacement to inspections, emergency repairs, flat roof systems, and maintenance.',
        badgeLabel: 'RESIDENTIAL ROOFING',
        gridHeading: 'Residential Roofing Services in Jersey City, NJ',
        cards: RESIDENTIAL_HUB_CARDS,
        otherHub: {
          phrase: 'Commercial Roofing Jersey City, NJ',
          path: COMMERCIAL_HUB_PATH,
          heading: 'Roofing for Jersey City Businesses',
          text: 'Jersey City Quality Roofing also roofs commercial buildings. Our commercial services cover commercial roof repair and commercial roof replacement for offices, warehouses, storefronts, and mixed-use properties across Jersey City.',
        },
      }}
    />
  );
}
