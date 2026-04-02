import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildServiceInCityJsonLd,
  buildFaqPageJsonLd,
} from '@/lib/seo/json-ld';
import { getService, getCommercialServiceSlugs } from '@/data/services';
import { getMunicipality, getAllMunicipalitySlugs } from '@/data/municipalities';
import { getCityServiceContent } from '@/data/service-city-content';
import {
  getTestimonialsByCityAndService,
  TESTIMONIALS,
} from '@/data/testimonials';
import { BASE_URL } from '@/lib/constants';
import type { ServiceInCityContent, FAQ, Testimonial } from '@/data/types';

// Section components
import { CityServiceHero } from '@/components/sections/city-service-hero';
import { BadgeStrip } from '@/components/sections/badge-strip';
import { LocalServiceContext } from '@/components/sections/local-service-context';
import { ProcessTimeline } from '@/components/sections/process-timeline';
import { NeighborhoodServiceInsights } from '@/components/sections/neighborhood-service-insights';
import { MaterialCards } from '@/components/sections/material-cards';
import { CitySpecificConcerns } from '@/components/sections/city-specific-concerns';
import { MidPageCTA } from '@/components/sections/mid-page-cta';
import { CostFactorsSection } from '@/components/sections/cost-factors-section';
import { ServiceContentSection } from '@/components/sections/service-content-section';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { SiblingCitiesNav } from '@/components/sections/sibling-cities-nav';
import { FaqAccordion } from '@/components/sections/faq-accordion';
import { QuoteForm } from '@/components/forms/quote-form';
import { CTABanner } from '@/components/sections/cta-banner';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';

// ---------------------------------------------------------------------------
// Commercial content data imports (4 services x 12 cities = 48 files)
// ---------------------------------------------------------------------------

// Jersey City
import { JERSEY_CITY_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/jersey-city/flat-roof-systems';
import { JERSEY_CITY_ROOF_MAINTENANCE_CONTENT } from '@/data/content/service-cities/jersey-city/roof-maintenance';
import { JERSEY_CITY_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/jersey-city/commercial-repair';
import { JERSEY_CITY_COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/service-cities/jersey-city/commercial-replacement';

// Hoboken
import { HOBOKEN_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/hoboken/flat-roof-systems';
import { HOBOKEN_ROOF_MAINTENANCE_CONTENT } from '@/data/content/service-cities/hoboken/roof-maintenance';
import { HOBOKEN_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/hoboken/commercial-repair';
import { HOBOKEN_COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/service-cities/hoboken/commercial-replacement';

// Bayonne
import { BAYONNE_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/bayonne/flat-roof-systems';
import { BAYONNE_ROOF_MAINTENANCE_CONTENT } from '@/data/content/service-cities/bayonne/roof-maintenance';
import { BAYONNE_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/bayonne/commercial-repair';
import { BAYONNE_COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/service-cities/bayonne/commercial-replacement';

// North Bergen
import { NORTH_BERGEN_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/north-bergen/flat-roof-systems';
import { NORTH_BERGEN_ROOF_MAINTENANCE_CONTENT } from '@/data/content/service-cities/north-bergen/roof-maintenance';
import { NORTH_BERGEN_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/north-bergen/commercial-repair';
import { NORTH_BERGEN_COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/service-cities/north-bergen/commercial-replacement';

// Union City
import { UNION_CITY_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/union-city/flat-roof-systems';
import { UNION_CITY_ROOF_MAINTENANCE_CONTENT } from '@/data/content/service-cities/union-city/roof-maintenance';
import { UNION_CITY_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/union-city/commercial-repair';
import { UNION_CITY_COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/service-cities/union-city/commercial-replacement';

// West New York
import { WEST_NEW_YORK_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/west-new-york/flat-roof-systems';
import { WEST_NEW_YORK_ROOF_MAINTENANCE_CONTENT } from '@/data/content/service-cities/west-new-york/roof-maintenance';
import { WEST_NEW_YORK_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/west-new-york/commercial-repair';
import { WEST_NEW_YORK_COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/service-cities/west-new-york/commercial-replacement';

// Secaucus
import { SECAUCUS_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/secaucus/flat-roof-systems';
import { SECAUCUS_ROOF_MAINTENANCE_CONTENT } from '@/data/content/service-cities/secaucus/roof-maintenance';
import { SECAUCUS_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/secaucus/commercial-repair';
import { SECAUCUS_COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/service-cities/secaucus/commercial-replacement';

// Kearny
import { KEARNY_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/kearny/flat-roof-systems';
import { KEARNY_ROOF_MAINTENANCE_CONTENT } from '@/data/content/service-cities/kearny/roof-maintenance';
import { KEARNY_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/kearny/commercial-repair';
import { KEARNY_COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/service-cities/kearny/commercial-replacement';

// Harrison
import { HARRISON_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/harrison/flat-roof-systems';
import { HARRISON_ROOF_MAINTENANCE_CONTENT } from '@/data/content/service-cities/harrison/roof-maintenance';
import { HARRISON_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/harrison/commercial-repair';
import { HARRISON_COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/service-cities/harrison/commercial-replacement';

// East Newark
import { EAST_NEWARK_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/east-newark/flat-roof-systems';
import { EAST_NEWARK_ROOF_MAINTENANCE_CONTENT } from '@/data/content/service-cities/east-newark/roof-maintenance';
import { EAST_NEWARK_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/east-newark/commercial-repair';
import { EAST_NEWARK_COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/service-cities/east-newark/commercial-replacement';

// Guttenberg
import { GUTTENBERG_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/guttenberg/flat-roof-systems';
import { GUTTENBERG_ROOF_MAINTENANCE_CONTENT } from '@/data/content/service-cities/guttenberg/roof-maintenance';
import { GUTTENBERG_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/guttenberg/commercial-repair';
import { GUTTENBERG_COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/service-cities/guttenberg/commercial-replacement';

// Weehawken
import { WEEHAWKEN_FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/service-cities/weehawken/flat-roof-systems';
import { WEEHAWKEN_ROOF_MAINTENANCE_CONTENT } from '@/data/content/service-cities/weehawken/roof-maintenance';
import { WEEHAWKEN_COMMERCIAL_REPAIR_CONTENT } from '@/data/content/service-cities/weehawken/commercial-repair';
import { WEEHAWKEN_COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/service-cities/weehawken/commercial-replacement';

// ---------------------------------------------------------------------------
// Content map: citySlug -> serviceSlug -> ServiceInCityContent
// ---------------------------------------------------------------------------

const CONTENT_MAP: Record<string, Record<string, ServiceInCityContent>> = {
  'jersey-city': {
    'flat-roof-systems': JERSEY_CITY_FLAT_ROOF_SYSTEMS_CONTENT,
    'roof-maintenance': JERSEY_CITY_ROOF_MAINTENANCE_CONTENT,
    'commercial-repair': JERSEY_CITY_COMMERCIAL_REPAIR_CONTENT,
    'commercial-replacement': JERSEY_CITY_COMMERCIAL_REPLACEMENT_CONTENT,
  },
  'hoboken': {
    'flat-roof-systems': HOBOKEN_FLAT_ROOF_SYSTEMS_CONTENT,
    'roof-maintenance': HOBOKEN_ROOF_MAINTENANCE_CONTENT,
    'commercial-repair': HOBOKEN_COMMERCIAL_REPAIR_CONTENT,
    'commercial-replacement': HOBOKEN_COMMERCIAL_REPLACEMENT_CONTENT,
  },
  'bayonne': {
    'flat-roof-systems': BAYONNE_FLAT_ROOF_SYSTEMS_CONTENT,
    'roof-maintenance': BAYONNE_ROOF_MAINTENANCE_CONTENT,
    'commercial-repair': BAYONNE_COMMERCIAL_REPAIR_CONTENT,
    'commercial-replacement': BAYONNE_COMMERCIAL_REPLACEMENT_CONTENT,
  },
  'north-bergen': {
    'flat-roof-systems': NORTH_BERGEN_FLAT_ROOF_SYSTEMS_CONTENT,
    'roof-maintenance': NORTH_BERGEN_ROOF_MAINTENANCE_CONTENT,
    'commercial-repair': NORTH_BERGEN_COMMERCIAL_REPAIR_CONTENT,
    'commercial-replacement': NORTH_BERGEN_COMMERCIAL_REPLACEMENT_CONTENT,
  },
  'union-city': {
    'flat-roof-systems': UNION_CITY_FLAT_ROOF_SYSTEMS_CONTENT,
    'roof-maintenance': UNION_CITY_ROOF_MAINTENANCE_CONTENT,
    'commercial-repair': UNION_CITY_COMMERCIAL_REPAIR_CONTENT,
    'commercial-replacement': UNION_CITY_COMMERCIAL_REPLACEMENT_CONTENT,
  },
  'west-new-york': {
    'flat-roof-systems': WEST_NEW_YORK_FLAT_ROOF_SYSTEMS_CONTENT,
    'roof-maintenance': WEST_NEW_YORK_ROOF_MAINTENANCE_CONTENT,
    'commercial-repair': WEST_NEW_YORK_COMMERCIAL_REPAIR_CONTENT,
    'commercial-replacement': WEST_NEW_YORK_COMMERCIAL_REPLACEMENT_CONTENT,
  },
  'secaucus': {
    'flat-roof-systems': SECAUCUS_FLAT_ROOF_SYSTEMS_CONTENT,
    'roof-maintenance': SECAUCUS_ROOF_MAINTENANCE_CONTENT,
    'commercial-repair': SECAUCUS_COMMERCIAL_REPAIR_CONTENT,
    'commercial-replacement': SECAUCUS_COMMERCIAL_REPLACEMENT_CONTENT,
  },
  'kearny': {
    'flat-roof-systems': KEARNY_FLAT_ROOF_SYSTEMS_CONTENT,
    'roof-maintenance': KEARNY_ROOF_MAINTENANCE_CONTENT,
    'commercial-repair': KEARNY_COMMERCIAL_REPAIR_CONTENT,
    'commercial-replacement': KEARNY_COMMERCIAL_REPLACEMENT_CONTENT,
  },
  'harrison': {
    'flat-roof-systems': HARRISON_FLAT_ROOF_SYSTEMS_CONTENT,
    'roof-maintenance': HARRISON_ROOF_MAINTENANCE_CONTENT,
    'commercial-repair': HARRISON_COMMERCIAL_REPAIR_CONTENT,
    'commercial-replacement': HARRISON_COMMERCIAL_REPLACEMENT_CONTENT,
  },
  'east-newark': {
    'flat-roof-systems': EAST_NEWARK_FLAT_ROOF_SYSTEMS_CONTENT,
    'roof-maintenance': EAST_NEWARK_ROOF_MAINTENANCE_CONTENT,
    'commercial-repair': EAST_NEWARK_COMMERCIAL_REPAIR_CONTENT,
    'commercial-replacement': EAST_NEWARK_COMMERCIAL_REPLACEMENT_CONTENT,
  },
  'guttenberg': {
    'flat-roof-systems': GUTTENBERG_FLAT_ROOF_SYSTEMS_CONTENT,
    'roof-maintenance': GUTTENBERG_ROOF_MAINTENANCE_CONTENT,
    'commercial-repair': GUTTENBERG_COMMERCIAL_REPAIR_CONTENT,
    'commercial-replacement': GUTTENBERG_COMMERCIAL_REPLACEMENT_CONTENT,
  },
  'weehawken': {
    'flat-roof-systems': WEEHAWKEN_FLAT_ROOF_SYSTEMS_CONTENT,
    'roof-maintenance': WEEHAWKEN_ROOF_MAINTENANCE_CONTENT,
    'commercial-repair': WEEHAWKEN_COMMERCIAL_REPAIR_CONTENT,
    'commercial-replacement': WEEHAWKEN_COMMERCIAL_REPLACEMENT_CONTENT,
  },
};

// ---------------------------------------------------------------------------
// Static params and metadata
// ---------------------------------------------------------------------------

export const dynamicParams = false;

export function generateStaticParams() {
  const services = getCommercialServiceSlugs();
  const cities = getAllMunicipalitySlugs();
  return services.flatMap((service) =>
    cities.map((city) => ({ service, city }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getService(serviceSlug);
  const city = getMunicipality(citySlug);
  if (!service || !city) return {};

  const canonicalPath = `/services/commercial/${service.slug}/${city.slug}`;
  const metadata = generatePageMetadata({
    title: `${service.name} in ${city.name}, NJ`,
    description: `Professional ${service.name.toLowerCase()} services in ${city.name}, NJ. ${service.shortDescription}`,
    path: canonicalPath,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [
        {
          url: `/api/og?service=${service.slug}&city=${city.slug}`,
          width: 1200,
          height: 630,
          alt: `${service.name} in ${city.name} - Jersey City Quality Roofing`,
        },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// Page component — 15-section service-in-city template (commercial)
// ---------------------------------------------------------------------------

export default async function CommercialServiceCityPage({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getService(serviceSlug);
  const city = getMunicipality(citySlug);
  const content = CONTENT_MAP[citySlug]?.[serviceSlug];
  const resolverContent = getCityServiceContent(serviceSlug, citySlug);

  if (!service || !city || !content || !resolverContent) {
    notFound();
  }

  // Commercial pages are never emergency
  const isEmergency = false;

  // Canonical URL
  const canonicalUrl = `${BASE_URL}/services/commercial/${serviceSlug}/${citySlug}`;

  // Merge FAQs: resolver's city-specific FAQs + content file's extended FAQs
  const mergedFaqs: FAQ[] = [
    ...resolverContent.uniqueFaqs,
    ...content.extendedFaqs,
  ];

  // Testimonials: city+service specific if 3+, else global fallback
  const cityServiceTestimonials = getTestimonialsByCityAndService(
    citySlug,
    serviceSlug,
  );
  const displayTestimonials: readonly Testimonial[] =
    cityServiceTestimonials.length >= 3
      ? cityServiceTestimonials
      : TESTIMONIALS;

  return (
    <>
      {/* JSON-LD: Service (city-scoped areaServed) */}
      <JsonLd
        data={
          buildServiceInCityJsonLd(
            service,
            city,
            canonicalUrl,
          ) as unknown as Record<string, unknown>
        }
      />
      {/* JSON-LD: FAQPage */}
      <JsonLd
        data={
          buildFaqPageJsonLd([...mergedFaqs]) as unknown as Record<
            string,
            unknown
          >
        }
      />
      {/* 1. CityServiceHero (dominant, own wrapper) */}
      <CityServiceHero
        heroHeadline={content.heroHeadline}
        heroSubtitle={content.heroSubtitle}
        cityName={city.name}
        population={city.population}
        serviceName={service.name}
        isEmergency={isEmergency}
      />

      {/* 2. BadgeStrip (secondary, own wrapper) */}
      <BadgeStrip />

      {/* 3. LocalServiceContext (dominant, SectionWrapper + ScrollReveal) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <LocalServiceContext
            heading={`${service.name} in ${city.name}: What Building Owners Need to Know`}
            narrative={content.cityServiceNarrative}
            servicePageLink={`/services/commercial/${serviceSlug}`}
            cityPageLink={`/service-areas/${citySlug}`}
            serviceName={service.name}
            cityName={city.name}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. ProcessTimeline (secondary, SectionWrapper + ScrollReveal) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Our {service.name} Process in {city.name}
          </h2>
          <ProcessTimeline steps={service.processSteps} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. NeighborhoodServiceInsights (dominant, SectionWrapper + ScrollReveal) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <NeighborhoodServiceInsights
            neighborhoods={content.neighborhoodServiceInsights}
            serviceName={service.name}
            cityName={city.name}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 6. MaterialCards (secondary, SectionWrapper + ScrollReveal) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-2">
            Roofing Materials for {city.name} {service.name}
          </h2>
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            {content.cityMaterialsAdvice}
          </p>
          <MaterialCards materials={service.materials} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 7. CitySpecificConcerns (dominant, SectionWrapper + ScrollReveal) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <CitySpecificConcerns
            heading={`Common ${service.name} Challenges in ${city.name}`}
            concerns={resolverContent.specificConcerns}
            intro={content.citySpecificProcess}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 8. MidPageCTA (secondary, own wrapper) */}
      <MidPageCTA heading={`Need ${service.name} in ${city.name}?`} />

      {/* 9. CostFactorsSection (dominant, SectionWrapper + ScrollReveal) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            {content.cityCostContext}
          </p>
          <CostFactorsSection
            factors={service.costFactors}
            serviceName={service.name}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 10. LocalCaseScenario (secondary, SectionWrapper + ScrollReveal) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <ServiceContentSection
            heading={`A Real ${service.name} Story in ${city.name}`}
            content={content.localCaseScenario}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 11. TestimonialCarousel (secondary, own wrapper) */}
      <TestimonialCarousel testimonials={displayTestimonials} />

      {/* 12. SiblingCitiesNav (dominant, SectionWrapper + ScrollReveal) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <SiblingCitiesNav
            serviceName={service.name}
            serviceSlug={serviceSlug}
            serviceCategory="commercial"
            currentCitySlug={citySlug}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 13. FaqAccordion (secondary, SectionWrapper + ScrollReveal) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Frequently Asked Questions About {service.name} in {city.name}
          </h2>
          <FaqAccordion faqs={mergedFaqs} defaultOpenIndex={0} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 14. QuoteForm (dominant, id="quote-form") */}
      <div id="quote-form">
        <QuoteForm defaultServiceType={service.name} />
      </div>

      {/* 15. CTABanner (secondary, own wrapper) */}
      <CTABanner
        heading={`Your Trusted ${city.name} ${service.name} Experts`}
        subtext="Call now for a free commercial roof assessment or request your no-obligation quote."
      />
    </>
  );
}
