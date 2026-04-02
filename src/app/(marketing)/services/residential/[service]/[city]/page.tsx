import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildServiceInCityJsonLd,
  buildFaqPageJsonLd,
} from '@/lib/seo/json-ld';
import { getService, getResidentialServiceSlugs } from '@/data/services';
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
// Residential content data imports (4 services x 12 cities = 48 files)
// ---------------------------------------------------------------------------

// Jersey City
import { JERSEY_CITY_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/jersey-city/roof-repair';
import { JERSEY_CITY_ROOF_REPLACEMENT_CONTENT } from '@/data/content/service-cities/jersey-city/roof-replacement';
import { JERSEY_CITY_ROOF_INSPECTION_CONTENT } from '@/data/content/service-cities/jersey-city/roof-inspection';
import { JERSEY_CITY_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/jersey-city/emergency-roofing';

// Hoboken
import { HOBOKEN_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/hoboken/roof-repair';
import { HOBOKEN_ROOF_REPLACEMENT_CONTENT } from '@/data/content/service-cities/hoboken/roof-replacement';
import { HOBOKEN_ROOF_INSPECTION_CONTENT } from '@/data/content/service-cities/hoboken/roof-inspection';
import { HOBOKEN_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/hoboken/emergency-roofing';

// Bayonne
import { BAYONNE_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/bayonne/roof-repair';
import { BAYONNE_ROOF_REPLACEMENT_CONTENT } from '@/data/content/service-cities/bayonne/roof-replacement';
import { BAYONNE_ROOF_INSPECTION_CONTENT } from '@/data/content/service-cities/bayonne/roof-inspection';
import { BAYONNE_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/bayonne/emergency-roofing';

// North Bergen
import { NORTH_BERGEN_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/north-bergen/roof-repair';
import { NORTH_BERGEN_ROOF_REPLACEMENT_CONTENT } from '@/data/content/service-cities/north-bergen/roof-replacement';
import { NORTH_BERGEN_ROOF_INSPECTION_CONTENT } from '@/data/content/service-cities/north-bergen/roof-inspection';
import { NORTH_BERGEN_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/north-bergen/emergency-roofing';

// Union City
import { UNION_CITY_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/union-city/roof-repair';
import { UNION_CITY_ROOF_REPLACEMENT_CONTENT } from '@/data/content/service-cities/union-city/roof-replacement';
import { UNION_CITY_ROOF_INSPECTION_CONTENT } from '@/data/content/service-cities/union-city/roof-inspection';
import { UNION_CITY_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/union-city/emergency-roofing';

// West New York
import { WEST_NEW_YORK_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/west-new-york/roof-repair';
import { WEST_NEW_YORK_ROOF_REPLACEMENT_CONTENT } from '@/data/content/service-cities/west-new-york/roof-replacement';
import { WEST_NEW_YORK_ROOF_INSPECTION_CONTENT } from '@/data/content/service-cities/west-new-york/roof-inspection';
import { WEST_NEW_YORK_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/west-new-york/emergency-roofing';

// Secaucus
import { SECAUCUS_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/secaucus/roof-repair';
import { SECAUCUS_ROOF_REPLACEMENT_CONTENT } from '@/data/content/service-cities/secaucus/roof-replacement';
import { SECAUCUS_ROOF_INSPECTION_CONTENT } from '@/data/content/service-cities/secaucus/roof-inspection';
import { SECAUCUS_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/secaucus/emergency-roofing';

// Kearny
import { KEARNY_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/kearny/roof-repair';
import { KEARNY_ROOF_REPLACEMENT_CONTENT } from '@/data/content/service-cities/kearny/roof-replacement';
import { KEARNY_ROOF_INSPECTION_CONTENT } from '@/data/content/service-cities/kearny/roof-inspection';
import { KEARNY_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/kearny/emergency-roofing';

// Harrison
import { HARRISON_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/harrison/roof-repair';
import { HARRISON_ROOF_REPLACEMENT_CONTENT } from '@/data/content/service-cities/harrison/roof-replacement';
import { HARRISON_ROOF_INSPECTION_CONTENT } from '@/data/content/service-cities/harrison/roof-inspection';
import { HARRISON_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/harrison/emergency-roofing';

// East Newark
import { EAST_NEWARK_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/east-newark/roof-repair';
import { EAST_NEWARK_ROOF_REPLACEMENT_CONTENT } from '@/data/content/service-cities/east-newark/roof-replacement';
import { EAST_NEWARK_ROOF_INSPECTION_CONTENT } from '@/data/content/service-cities/east-newark/roof-inspection';
import { EAST_NEWARK_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/east-newark/emergency-roofing';

// Guttenberg
import { GUTTENBERG_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/guttenberg/roof-repair';
import { GUTTENBERG_ROOF_REPLACEMENT_CONTENT } from '@/data/content/service-cities/guttenberg/roof-replacement';
import { GUTTENBERG_ROOF_INSPECTION_CONTENT } from '@/data/content/service-cities/guttenberg/roof-inspection';
import { GUTTENBERG_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/guttenberg/emergency-roofing';

// Weehawken
import { WEEHAWKEN_ROOF_REPAIR_CONTENT } from '@/data/content/service-cities/weehawken/roof-repair';
import { WEEHAWKEN_ROOF_REPLACEMENT_CONTENT } from '@/data/content/service-cities/weehawken/roof-replacement';
import { WEEHAWKEN_ROOF_INSPECTION_CONTENT } from '@/data/content/service-cities/weehawken/roof-inspection';
import { WEEHAWKEN_EMERGENCY_ROOFING_CONTENT } from '@/data/content/service-cities/weehawken/emergency-roofing';

// ---------------------------------------------------------------------------
// Content map: citySlug -> serviceSlug -> ServiceInCityContent
// ---------------------------------------------------------------------------

const CONTENT_MAP: Record<string, Record<string, ServiceInCityContent>> = {
  'jersey-city': {
    'roof-repair': JERSEY_CITY_ROOF_REPAIR_CONTENT,
    'roof-replacement': JERSEY_CITY_ROOF_REPLACEMENT_CONTENT,
    'roof-inspection': JERSEY_CITY_ROOF_INSPECTION_CONTENT,
    'emergency-roofing': JERSEY_CITY_EMERGENCY_ROOFING_CONTENT,
  },
  'hoboken': {
    'roof-repair': HOBOKEN_ROOF_REPAIR_CONTENT,
    'roof-replacement': HOBOKEN_ROOF_REPLACEMENT_CONTENT,
    'roof-inspection': HOBOKEN_ROOF_INSPECTION_CONTENT,
    'emergency-roofing': HOBOKEN_EMERGENCY_ROOFING_CONTENT,
  },
  'bayonne': {
    'roof-repair': BAYONNE_ROOF_REPAIR_CONTENT,
    'roof-replacement': BAYONNE_ROOF_REPLACEMENT_CONTENT,
    'roof-inspection': BAYONNE_ROOF_INSPECTION_CONTENT,
    'emergency-roofing': BAYONNE_EMERGENCY_ROOFING_CONTENT,
  },
  'north-bergen': {
    'roof-repair': NORTH_BERGEN_ROOF_REPAIR_CONTENT,
    'roof-replacement': NORTH_BERGEN_ROOF_REPLACEMENT_CONTENT,
    'roof-inspection': NORTH_BERGEN_ROOF_INSPECTION_CONTENT,
    'emergency-roofing': NORTH_BERGEN_EMERGENCY_ROOFING_CONTENT,
  },
  'union-city': {
    'roof-repair': UNION_CITY_ROOF_REPAIR_CONTENT,
    'roof-replacement': UNION_CITY_ROOF_REPLACEMENT_CONTENT,
    'roof-inspection': UNION_CITY_ROOF_INSPECTION_CONTENT,
    'emergency-roofing': UNION_CITY_EMERGENCY_ROOFING_CONTENT,
  },
  'west-new-york': {
    'roof-repair': WEST_NEW_YORK_ROOF_REPAIR_CONTENT,
    'roof-replacement': WEST_NEW_YORK_ROOF_REPLACEMENT_CONTENT,
    'roof-inspection': WEST_NEW_YORK_ROOF_INSPECTION_CONTENT,
    'emergency-roofing': WEST_NEW_YORK_EMERGENCY_ROOFING_CONTENT,
  },
  'secaucus': {
    'roof-repair': SECAUCUS_ROOF_REPAIR_CONTENT,
    'roof-replacement': SECAUCUS_ROOF_REPLACEMENT_CONTENT,
    'roof-inspection': SECAUCUS_ROOF_INSPECTION_CONTENT,
    'emergency-roofing': SECAUCUS_EMERGENCY_ROOFING_CONTENT,
  },
  'kearny': {
    'roof-repair': KEARNY_ROOF_REPAIR_CONTENT,
    'roof-replacement': KEARNY_ROOF_REPLACEMENT_CONTENT,
    'roof-inspection': KEARNY_ROOF_INSPECTION_CONTENT,
    'emergency-roofing': KEARNY_EMERGENCY_ROOFING_CONTENT,
  },
  'harrison': {
    'roof-repair': HARRISON_ROOF_REPAIR_CONTENT,
    'roof-replacement': HARRISON_ROOF_REPLACEMENT_CONTENT,
    'roof-inspection': HARRISON_ROOF_INSPECTION_CONTENT,
    'emergency-roofing': HARRISON_EMERGENCY_ROOFING_CONTENT,
  },
  'east-newark': {
    'roof-repair': EAST_NEWARK_ROOF_REPAIR_CONTENT,
    'roof-replacement': EAST_NEWARK_ROOF_REPLACEMENT_CONTENT,
    'roof-inspection': EAST_NEWARK_ROOF_INSPECTION_CONTENT,
    'emergency-roofing': EAST_NEWARK_EMERGENCY_ROOFING_CONTENT,
  },
  'guttenberg': {
    'roof-repair': GUTTENBERG_ROOF_REPAIR_CONTENT,
    'roof-replacement': GUTTENBERG_ROOF_REPLACEMENT_CONTENT,
    'roof-inspection': GUTTENBERG_ROOF_INSPECTION_CONTENT,
    'emergency-roofing': GUTTENBERG_EMERGENCY_ROOFING_CONTENT,
  },
  'weehawken': {
    'roof-repair': WEEHAWKEN_ROOF_REPAIR_CONTENT,
    'roof-replacement': WEEHAWKEN_ROOF_REPLACEMENT_CONTENT,
    'roof-inspection': WEEHAWKEN_ROOF_INSPECTION_CONTENT,
    'emergency-roofing': WEEHAWKEN_EMERGENCY_ROOFING_CONTENT,
  },
};

// ---------------------------------------------------------------------------
// Static params and metadata
// ---------------------------------------------------------------------------

export const dynamicParams = false;

export function generateStaticParams() {
  const services = getResidentialServiceSlugs();
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

  const canonicalPath = `/services/residential/${service.slug}/${city.slug}`;
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
// Page component — 15-section service-in-city template
// ---------------------------------------------------------------------------

export default async function ResidentialServiceCityPage({
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

  // Emergency detection
  const isEmergency =
    service.emergencyAvailable === true && serviceSlug === 'emergency-roofing';

  // Canonical URL
  const canonicalUrl = `${BASE_URL}/services/residential/${serviceSlug}/${citySlug}`;

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
            heading={`${service.name} in ${city.name}: What Local Homeowners Need to Know`}
            narrative={content.cityServiceNarrative}
            servicePageLink={`/services/residential/${serviceSlug}`}
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
          <ProcessTimeline
            steps={service.processSteps}
            {...(isEmergency ? { accentColor: 'bg-[#d4782f]' } : {})}
          />
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
      <MidPageCTA
        heading={`Need ${service.name} in ${city.name}?`}
        {...(isEmergency
          ? { accentColor: 'bg-[#d4782f] hover:bg-[#e08a3f]' }
          : {})}
      />

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
            serviceCategory="residential"
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
        subtext="Call now for a free inspection or request your no-obligation quote."
      />
    </>
  );
}
