import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildServicePageJsonLd,
  buildFaqPageJsonLd,
} from '@/lib/seo/json-ld';
import { getService, getResidentialServiceSlugs } from '@/data/services';
import { getAllMunicipalities } from '@/data/municipalities';
import { getTestimonialsByService, TESTIMONIALS } from '@/data/testimonials';
import { PHONE_NUMBER, PHONE_HREF, BASE_URL } from '@/lib/constants';
import type {
  Service,
  FAQ,
  Testimonial,
  ServiceContent,
  EmergencyContent,
} from '@/data/types';

// Content data imports
import { ROOF_REPAIR_CONTENT } from '@/data/content/roof-repair';
import { ROOF_REPLACEMENT_CONTENT } from '@/data/content/roof-replacement';
import { ROOF_INSPECTION_CONTENT } from '@/data/content/roof-inspection';
import { EMERGENCY_ROOFING_CONTENT } from '@/data/content/emergency-roofing';

// New section components (Plan 02)
import { ServiceHero } from '@/components/sections/service-hero';
import { ProcessTimeline } from '@/components/sections/process-timeline';
import { MaterialCards } from '@/components/sections/material-cards';
import { CostFactorsSection } from '@/components/sections/cost-factors-section';
import { WarningSignsSection } from '@/components/sections/warning-signs-section';
import { ServiceContentSection } from '@/components/sections/service-content-section';

// Emergency + shared components (Plan 03)
import { EmergencyHero } from '@/components/sections/emergency-hero';
import { WhatToDoSection } from '@/components/sections/what-to-do-section';
import { InsuranceClaimsSection } from '@/components/sections/insurance-claims-section';
import { StormDamageTypes } from '@/components/sections/storm-damage-types';
import { MidPageCTA } from '@/components/sections/mid-page-cta';
import { RelatedServicesRow } from '@/components/sections/related-services-row';

// Existing reusable components
import { BadgeStrip } from '@/components/sections/badge-strip';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { FaqAccordion } from '@/components/sections/faq-accordion';
import { QuoteForm } from '@/components/forms/quote-form';
import { CTABanner } from '@/components/sections/cta-banner';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';

// ---------------------------------------------------------------------------
// Content data map and helpers
// ---------------------------------------------------------------------------

const CONTENT_MAP: Record<string, ServiceContent | EmergencyContent> = {
  'roof-repair': ROOF_REPAIR_CONTENT,
  'roof-replacement': ROOF_REPLACEMENT_CONTENT,
  'roof-inspection': ROOF_INSPECTION_CONTENT,
  'emergency-roofing': EMERGENCY_ROOFING_CONTENT,
};

function getServiceContent(
  slug: string,
): ServiceContent | EmergencyContent | undefined {
  return CONTENT_MAP[slug];
}

function isEmergencyContent(
  content: ServiceContent | EmergencyContent,
): content is EmergencyContent {
  return 'whatToDoSteps' in content;
}

// ---------------------------------------------------------------------------
// Static params and metadata
// ---------------------------------------------------------------------------

export const dynamicParams = false;

export function generateStaticParams() {
  return getResidentialServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getService(serviceSlug);
  if (!service) return {};

  const canonicalPath = `/services/residential/${service.slug}`;
  const metadata = generatePageMetadata({
    title: `${service.name} Services`,
    description: service.shortDescription,
    path: canonicalPath,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [
        {
          url: `/api/og?service=${service.slug}`,
          width: 1200,
          height: 630,
          alt: `${service.name} - Jersey City Quality Roofing`,
        },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ResidentialServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = getService(slug);
  const content = getServiceContent(slug);

  if (!service || !content) {
    notFound();
  }

  const isEmergency =
    service.emergencyAvailable === true && isEmergencyContent(content);
  const canonicalUrl = `${BASE_URL}/services/residential/${service.slug}`;

  // Combine FAQs: base from services.ts + extended from content files (per D-19)
  const combinedFaqs: FAQ[] = [...service.faqs, ...content.extendedFaqs];

  // Filter testimonials per D-18: use service-specific if 3+, else fallback to all
  const serviceTestimonials = getTestimonialsByService(service.slug);
  const displayTestimonials: readonly Testimonial[] =
    serviceTestimonials.length >= 3 ? serviceTestimonials : TESTIMONIALS;

  return (
    <>
      {/* JSON-LD schemas (per D-15, SEO-02) */}
      <JsonLd
        data={
          buildServicePageJsonLd(service, canonicalUrl) as unknown as Record<
            string,
            unknown
          >
        }
      />
      <JsonLd
        data={
          buildFaqPageJsonLd([...combinedFaqs]) as unknown as Record<
            string,
            unknown
          >
        }
      />

      {isEmergency ? (
        <EmergencyTemplate
          service={service}
          content={content as EmergencyContent}
          combinedFaqs={combinedFaqs}
          displayTestimonials={displayTestimonials}
        />
      ) : (
        <StandardTemplate
          service={service}
          content={content}
          combinedFaqs={combinedFaqs}
          displayTestimonials={displayTestimonials}
        />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Standard template — D-02 section order (13 sections)
// ---------------------------------------------------------------------------

function StandardTemplate({
  service,
  content,
  combinedFaqs,
  displayTestimonials,
}: {
  service: Service;
  content: ServiceContent;
  combinedFaqs: FAQ[];
  displayTestimonials: readonly Testimonial[];
}) {
  return (
    <>
      {/* 1. Hero (dominant) */}
      <SectionWrapper tone="dominant">
        <ServiceHero
          headline={content.heroHeadline}
          subtitle={content.heroSubtitle}
          serviceName={service.name}
        />
      </SectionWrapper>

      {/* 2. Badge Strip (secondary) */}
      <BadgeStrip />

      {/* 3. Service Intro (~500w, dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading={service.name}
            content={content.introNarrative}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. Process Explainer (secondary, per D-10) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Our {service.name} Process
          </h2>
          <ProcessTimeline steps={service.processSteps} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. Materials Section (dominant, per D-11) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-2">
            Roofing Materials We Work With
          </h2>
          <p className="text-lg text-text-secondary mb-6">
            {content.materialsIntro}
          </p>
          <MaterialCards materials={service.materials} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 6. Cost Factors (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <CostFactorsSection
            factors={service.costFactors}
            serviceName={service.name}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 7. Warning Signs (dominant, per D-07) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <WarningSignsSection
            signs={content.warningSigns}
            serviceName={service.name}
            intro={content.warningSignsIntro}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 8. Mid-page CTA (per D-03) */}
      <MidPageCTA />

      {/* 9. Testimonials (per D-18) */}
      <TestimonialCarousel testimonials={displayTestimonials} />

      {/* 10. Related Services (dominant, per D-08) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <RelatedServicesRow serviceSlugs={service.relatedServices} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 10b. Cities We Serve (secondary, per RESEARCH.md Pitfall 5 — parent links to city variants) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-4">
            {service.name} in Hudson County Cities
          </h2>
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            We provide expert {service.name.toLowerCase()} services across all 12 Hudson County municipalities. Select your city for location-specific information, pricing, and FAQs.
          </p>
          <nav aria-label="Service available in these cities" className="flex flex-wrap gap-3">
            {getAllMunicipalities().map((city) => (
              <Link
                key={city.slug}
                href={`/services/residential/${service.slug}/${city.slug}`}
                prefetch={false}
                className="inline-flex items-center bg-secondary rounded-lg px-4 py-2 text-lg text-text-primary border border-[#4a5040] hover:border-accent transition-colors duration-[150ms] min-h-[44px]"
              >
                {city.name}
              </Link>
            ))}
          </nav>
        </ScrollReveal>
      </SectionWrapper>

      {/* 11. FAQ Accordion (secondary, per D-19) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Frequently Asked Questions About {service.name}
          </h2>
          <FaqAccordion faqs={combinedFaqs} defaultOpenIndex={0} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 12. Full Quote Form */}
      <div id="quote-form">
        <QuoteForm defaultServiceType={service.name} />
      </div>

      {/* 13. CTA Banner */}
      <CTABanner
        heading="Ready to Protect Your Roof?"
        subtext="Call now for a free inspection or request your no-obligation quote."
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Emergency template — D-13 section order (12 sections)
// ---------------------------------------------------------------------------

function EmergencyTemplate({
  service,
  content,
  combinedFaqs,
  displayTestimonials,
}: {
  service: Service;
  content: EmergencyContent;
  combinedFaqs: FAQ[];
  displayTestimonials: readonly Testimonial[];
}) {
  return (
    <>
      {/* 1. Emergency Hero (per D-12) */}
      <EmergencyHero phoneNumber={PHONE_NUMBER} phoneHref={PHONE_HREF} />

      {/* 2. Badge Strip */}
      <BadgeStrip />

      {/* 3. What To Do Right Now (dominant, per D-13) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <WhatToDoSection
            steps={content.whatToDoSteps}
            phoneNumber={PHONE_NUMBER}
            phoneHref={PHONE_HREF}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. Emergency Response Process (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Our Emergency Response Process
          </h2>
          <ProcessTimeline
            steps={service.processSteps}
            accentColor="bg-[#d4782f]"
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. Storm Damage Types (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <StormDamageTypes damageTypes={content.stormDamageTypes} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 6. Insurance Claims Help (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <InsuranceClaimsSection content={content.insuranceClaims} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 7. Service Intro / Emergency Context (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading="Emergency Roofing Services"
            content={content.introNarrative}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 8. Mid-page CTA (emergency accent, per D-03) */}
      <MidPageCTA accentColor="bg-[#d4782f] hover:bg-[#e08a3f]" />

      {/* 9. Testimonials */}
      <TestimonialCarousel testimonials={displayTestimonials} />

      {/* 9b. Cities We Serve (secondary, per RESEARCH.md Pitfall 5) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-4">
            {service.name} in Hudson County Cities
          </h2>
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            We provide expert {service.name.toLowerCase()} services across all 12 Hudson County municipalities. Select your city for location-specific information, pricing, and FAQs.
          </p>
          <nav aria-label="Service available in these cities" className="flex flex-wrap gap-3">
            {getAllMunicipalities().map((city) => (
              <Link
                key={city.slug}
                href={`/services/residential/${service.slug}/${city.slug}`}
                prefetch={false}
                className="inline-flex items-center bg-secondary rounded-lg px-4 py-2 text-lg text-text-primary border border-[#4a5040] hover:border-accent transition-colors duration-[150ms] min-h-[44px]"
              >
                {city.name}
              </Link>
            ))}
          </nav>
        </ScrollReveal>
      </SectionWrapper>

      {/* 10. FAQ Accordion (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Frequently Asked Questions About Emergency Roofing
          </h2>
          <FaqAccordion faqs={combinedFaqs} defaultOpenIndex={0} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 11. Full Quote Form */}
      <div id="quote-form">
        <QuoteForm defaultServiceType={service.name} />
      </div>

      {/* 12. CTA Banner */}
      <CTABanner
        heading="Ready to Protect Your Roof?"
        subtext="Call now for a free inspection or request your no-obligation quote."
      />
    </>
  );
}
