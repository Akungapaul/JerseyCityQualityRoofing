import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildCityRoofingContractorJsonLd,
  buildFaqPageJsonLd,
} from '@/lib/seo/json-ld';
import { getMunicipality, getAllMunicipalitySlugs } from '@/data/municipalities';
import { getTestimonialsByCity, TESTIMONIALS } from '@/data/testimonials';
import { getServicesByCategory } from '@/data/services';
import type { CityHubContent, Testimonial } from '@/data/types';

// City content data imports (all 12)
import { JERSEY_CITY_CONTENT } from '@/data/content/cities/jersey-city';
import { HOBOKEN_CONTENT } from '@/data/content/cities/hoboken';
import { BAYONNE_CONTENT } from '@/data/content/cities/bayonne';
import { NORTH_BERGEN_CONTENT } from '@/data/content/cities/north-bergen';
import { UNION_CITY_CONTENT } from '@/data/content/cities/union-city';
import { WEST_NEW_YORK_CONTENT } from '@/data/content/cities/west-new-york';
import { SECAUCUS_CONTENT } from '@/data/content/cities/secaucus';
import { KEARNY_CONTENT } from '@/data/content/cities/kearny';
import { HARRISON_CONTENT } from '@/data/content/cities/harrison';
import { EAST_NEWARK_CONTENT } from '@/data/content/cities/east-newark';
import { GUTTENBERG_CONTENT } from '@/data/content/cities/guttenberg';
import { WEEHAWKEN_CONTENT } from '@/data/content/cities/weehawken';

// Section components (new for Phase 7)
import { CityHubHero } from '@/components/sections/city-hub-hero';
import { LocalExpertiseSection } from '@/components/sections/local-expertise-section';
import { HousingStockSection } from '@/components/sections/housing-stock-section';
import { WeatherClimateSection } from '@/components/sections/weather-climate-section';
import { NeighborhoodBreakdown } from '@/components/sections/neighborhood-breakdown';
import { ServicesInCityGrid } from '@/components/sections/services-in-city-grid';
import { CityLandmarksSection } from '@/components/sections/city-landmarks-section';

// Existing reusable components
import { BadgeStrip } from '@/components/sections/badge-strip';
import { MidPageCTA } from '@/components/sections/mid-page-cta';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { FaqAccordion } from '@/components/sections/faq-accordion';
import { QuoteForm } from '@/components/forms/quote-form';
import { CTABanner } from '@/components/sections/cta-banner';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';
import { ServiceContentSection } from '@/components/sections/service-content-section';

// ---------------------------------------------------------------------------
// Content data map
// ---------------------------------------------------------------------------

const CITY_CONTENT_MAP: Record<string, CityHubContent> = {
  'jersey-city': JERSEY_CITY_CONTENT,
  'hoboken': HOBOKEN_CONTENT,
  'bayonne': BAYONNE_CONTENT,
  'north-bergen': NORTH_BERGEN_CONTENT,
  'union-city': UNION_CITY_CONTENT,
  'west-new-york': WEST_NEW_YORK_CONTENT,
  'secaucus': SECAUCUS_CONTENT,
  'kearny': KEARNY_CONTENT,
  'harrison': HARRISON_CONTENT,
  'east-newark': EAST_NEWARK_CONTENT,
  'guttenberg': GUTTENBERG_CONTENT,
  'weehawken': WEEHAWKEN_CONTENT,
};

function getCityContent(slug: string): CityHubContent | undefined {
  return CITY_CONTENT_MAP[slug];
}

// ---------------------------------------------------------------------------
// Static params and metadata
// ---------------------------------------------------------------------------

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllMunicipalitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getMunicipality(citySlug);
  if (!city) return {};

  return generatePageMetadata({
    title: `Roofing Services in ${city.name}, NJ`,
    description: `Expert residential and commercial roofing in ${city.name}, NJ. Serving all ${city.neighborhoods.length} neighborhoods with ${city.population.toLocaleString()} residents. Roof repair, replacement, inspection & emergency services. Call for a free estimate.`,
    path: `/service-areas/${city.slug}`,
  });
}

// ---------------------------------------------------------------------------
// Page component with 14 sections
// ---------------------------------------------------------------------------

export default async function CityHubPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getMunicipality(citySlug);
  const content = getCityContent(citySlug);

  if (!city || !content) {
    notFound();
  }

  // Get all services for JSON-LD makesOffer
  const allServices = [
    ...getServicesByCategory('residential'),
    ...getServicesByCategory('commercial'),
  ];

  // City-specific testimonials (per LOC-05): use city-specific if 3+, else fallback
  const cityTestimonials = getTestimonialsByCity(city.slug);
  const displayTestimonials: readonly Testimonial[] =
    cityTestimonials.length >= 3 ? cityTestimonials : TESTIMONIALS;

  return (
    <>
      {/* JSON-LD: RoofingContractor with @id entity relationships (SEO-01, SEO-04) */}
      <JsonLd
        data={
          buildCityRoofingContractorJsonLd(city, allServices) as unknown as Record<string, unknown>
        }
      />
      {/* JSON-LD: FAQPage for city-specific FAQs */}
      <JsonLd
        data={
          buildFaqPageJsonLd([...content.cityFaqs]) as unknown as Record<string, unknown>
        }
      />

      {/* 1. City Hero (dominant) -- NO ScrollReveal, above fold */}
      {/* CityHubHero renders its own <section> with bg-dominant and container -- no SectionWrapper to avoid double-wrapping */}
      <CityHubHero
        heroHeadline={content.heroHeadline}
        heroSubtitle={content.heroSubtitle}
        cityName={city.name}
        population={city.population}
      />

      {/* 2. Badge Strip (secondary) -- NO ScrollReveal */}
      <BadgeStrip />

      {/* 3. Local Expertise Narrative (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <LocalExpertiseSection
            narrative={content.localExpertiseNarrative}
            cityName={city.name}
            citySlug={city.slug}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. Housing Stock & Architecture (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <HousingStockSection
            narrative={content.housingStockNarrative}
            housingStock={city.housingStock}
            cityName={city.name}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. Weather & Climate Impact (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <WeatherClimateSection
            narrative={content.weatherClimateNarrative}
            weather={city.weatherPatterns}
            cityName={city.name}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 6. City Landmarks (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <CityLandmarksSection
            narrative={content.landmarksNarrative}
            landmarks={city.landmarks}
            cityName={city.name}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 7. Neighborhood Breakdown (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <NeighborhoodBreakdown
            neighborhoods={content.neighborhoodBreakdown}
            cityName={city.name}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 8. Mid-Page CTA (secondary) -- NO ScrollReveal */}
      <MidPageCTA heading={`Ready to Protect Your ${city.name} Roof?`} />

      {/* 9. Services in City Grid (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <ServicesInCityGrid
            citySlug={city.slug}
            cityName={city.name}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 10. Building Codes & Permits (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading={`Building Codes & Permit Requirements in ${city.name}`}
            content={content.buildingCodeNarrative}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 11. City Testimonials (dominant) -- NO ScrollReveal (has own animation) */}
      <TestimonialCarousel testimonials={displayTestimonials} />

      {/* 12. FAQ Accordion (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Frequently Asked Questions About Roofing in {city.name}
          </h2>
          <FaqAccordion faqs={content.cityFaqs} defaultOpenIndex={0} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 13. Quote Form -- NO ScrollReveal */}
      <div id="quote-form">
        <QuoteForm defaultServiceType="Roofing Services" />
      </div>

      {/* 14. CTA Banner -- NO ScrollReveal */}
      <CTABanner
        heading={`Your Trusted ${city.name} Roofing Partner`}
        subtext="Call now for a free inspection or request your no-obligation quote."
      />
    </>
  );
}
