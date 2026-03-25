import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildServicePageJsonLd,
  buildFaqPageJsonLd,
} from '@/lib/seo/json-ld';
import { getService, getCommercialServiceSlugs } from '@/data/services';
import { getTestimonialsByService, TESTIMONIALS } from '@/data/testimonials';
import { BASE_URL } from '@/lib/constants';
import type {
  Service,
  FAQ,
  Testimonial,
  ServiceContent,
} from '@/data/types';

// Content data imports (4 commercial files from Plan 01)
import { FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/flat-roof-systems';
import { ROOF_MAINTENANCE_CONTENT } from '@/data/content/roof-maintenance';
import { COMMERCIAL_REPAIR_CONTENT } from '@/data/content/commercial-repair';
import { COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/commercial-replacement';

// Section components (reused from Phase 5, NO emergency components)
import { ServiceHero } from '@/components/sections/service-hero';
import { ProcessTimeline } from '@/components/sections/process-timeline';
import { MaterialCards } from '@/components/sections/material-cards';
import { CostFactorsSection } from '@/components/sections/cost-factors-section';
import { WarningSignsSection } from '@/components/sections/warning-signs-section';
import { ServiceContentSection } from '@/components/sections/service-content-section';
import { MidPageCTA } from '@/components/sections/mid-page-cta';
import { CommercialRelatedServicesRow } from '@/components/sections/commercial-related-services-row';

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

const CONTENT_MAP: Record<string, ServiceContent> = {
  'flat-roof-systems': FLAT_ROOF_SYSTEMS_CONTENT,
  'roof-maintenance': ROOF_MAINTENANCE_CONTENT,
  'commercial-repair': COMMERCIAL_REPAIR_CONTENT,
  'commercial-replacement': COMMERCIAL_REPLACEMENT_CONTENT,
};

function getServiceContent(slug: string): ServiceContent | undefined {
  return CONTENT_MAP[slug];
}

// ---------------------------------------------------------------------------
// Static params and metadata
// ---------------------------------------------------------------------------

export const dynamicParams = false;

export function generateStaticParams() {
  return getCommercialServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getService(serviceSlug);
  if (!service) return {};

  const canonicalPath = `/services/commercial/${service.slug}`;
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

export default async function CommercialServicePage({
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

  const canonicalUrl = `${BASE_URL}/services/commercial/${service.slug}`;

  // Combine FAQs: base from services.ts + extended from content files
  const combinedFaqs: FAQ[] = [...service.faqs, ...content.extendedFaqs];

  // Filter testimonials: use service-specific if 3+, else fallback to all
  const serviceTestimonials = getTestimonialsByService(service.slug);
  const displayTestimonials: readonly Testimonial[] =
    serviceTestimonials.length >= 3 ? serviceTestimonials : TESTIMONIALS;

  return (
    <>
      {/* JSON-LD schemas */}
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

      {/* Always standard template -- no emergency branching for commercial */}
      <StandardTemplate
        service={service}
        content={content}
        combinedFaqs={combinedFaqs}
        displayTestimonials={displayTestimonials}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Standard template -- 13-section layout for commercial service pages
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

      {/* 4. Process Explainer (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Our {service.name} Process
          </h2>
          <ProcessTimeline steps={service.processSteps} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. Materials Section (dominant) */}
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

      {/* 7. Warning Signs (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <WarningSignsSection
            signs={content.warningSigns}
            serviceName={service.name}
            intro={content.warningSignsIntro}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 8. Mid-page CTA */}
      <MidPageCTA />

      {/* 9. Testimonials */}
      <TestimonialCarousel testimonials={displayTestimonials} />

      {/* 10. Related Services (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <CommercialRelatedServicesRow serviceSlugs={service.relatedServices} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 11. FAQ Accordion (secondary) */}
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
        heading="Ready to Protect Your Building?"
        subtext="Call now for a free commercial roof assessment or request your no-obligation quote."
      />
    </>
  );
}
