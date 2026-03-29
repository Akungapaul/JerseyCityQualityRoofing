import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildBlogPostingJsonLd,
  buildFaqPageJsonLd,
  buildRoofingContractorJsonLd,
  buildBreadcrumbJsonLd,
} from '@/lib/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { ALL_COST_GUIDES, getCostGuide } from '@/data/content/cost-guides';
import {
  initializeContentRegistry,
  getRelatedGuides,
} from '@/lib/internal-links';

// Section components
import { GuideHero } from '@/components/sections/guide-hero';
import { BadgeStrip } from '@/components/sections/badge-strip';
import { ServiceContentSection } from '@/components/sections/service-content-section';
import { CostTable } from '@/components/sections/cost-table';
import { LocationPricingSection } from '@/components/sections/location-pricing-section';
import { SiloPillarLink } from '@/components/sections/silo-pillar-link';
import { MidPageCTA } from '@/components/sections/mid-page-cta';
import { FaqAccordion } from '@/components/sections/faq-accordion';
import { RelatedGuides } from '@/components/sections/related-guides';
import { QuoteForm } from '@/components/forms/quote-form';
import { CTABanner } from '@/components/sections/cta-banner';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';

// ---------------------------------------------------------------------------
// Static params and metadata
// ---------------------------------------------------------------------------

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_COST_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getCostGuide(slug);
  if (!guide) return {};

  return generatePageMetadata({
    title: guide.title,
    description: guide.subtitle,
    path: `/guides/cost/${slug}`,
  });
}

// ---------------------------------------------------------------------------
// Helper: count words for JSON-LD
// ---------------------------------------------------------------------------

function countWords(guide: NonNullable<ReturnType<typeof getCostGuide>>): number {
  let total = guide.introNarrative.split(/\s+/).length;
  total += guide.costFactorsNarrative.split(/\s+/).length;
  total += guide.savingStrategies.split(/\s+/).length;
  total += guide.whenToInvest.split(/\s+/).length;
  total += guide.closingNarrative.split(/\s+/).length;
  if (guide.financingOptions) {
    total += guide.financingOptions.split(/\s+/).length;
  }
  return total;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function CostGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getCostGuide(slug);

  if (!guide) {
    notFound();
  }

  // Initialize internal linking
  initializeContentRegistry();
  const relatedGuides = getRelatedGuides(slug, 3);

  const wordCount = countWords(guide);
  const serviceName = guide.serviceSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <>
      {/* JSON-LD: Article + FAQPage + RoofingContractor + Breadcrumb */}
      <JsonLd
        data={
          buildBlogPostingJsonLd({
            title: guide.title,
            slug: guide.slug,
            description: guide.subtitle,
            publishDate: '2026-01-01',
            updatedDate: null,
            authorName: 'Jersey City Quality Roofing Team',
            siloService: guide.serviceSlug,
            wordCount,
            basePath: '/guides/cost',
            schemaType: 'Article',
          }) as unknown as Record<string, unknown>
        }
      />
      <JsonLd
        data={buildFaqPageJsonLd([...guide.faqs]) as unknown as Record<string, unknown>}
      />
      <JsonLd
        data={buildRoofingContractorJsonLd() as unknown as Record<string, unknown>}
      />
      <JsonLd
        data={
          buildBreadcrumbJsonLd([
            { name: 'Home', url: BASE_URL },
            { name: 'Guides', url: `${BASE_URL}/guides` },
            { name: 'Cost Guides', url: `${BASE_URL}/guides` },
            { name: guide.title, url: `${BASE_URL}/guides/cost/${guide.slug}` },
          ]) as unknown as Record<string, unknown>
        }
      />

      {/* 1. GuideHero (dominant) */}
      <GuideHero
        headline={guide.headline}
        subtitle={guide.subtitle}
        categoryBadgeLabel="COST GUIDE"
        showCTA
      />

      {/* 2. BadgeStrip */}
      <BadgeStrip />

      {/* 3. Intro Narrative (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading={guide.headline}
            content={guide.introNarrative}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. Cost Overview Table (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
            {serviceName} Cost Breakdown
          </h2>
          <CostTable
            items={guide.costOverview}
            caption={`Cost breakdown for ${serviceName.toLowerCase()} services in Hudson County`}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. Cost Factors Narrative (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading="Factors That Affect Your Cost"
            content={guide.costFactorsNarrative}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 6. Location Pricing (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <LocationPricingSection locations={guide.locationPricing} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 7. Saving Strategies (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading="How to Save on Roofing Costs"
            content={guide.savingStrategies}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* SiloPillarLink — RELATED SERVICE */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <SiloPillarLink
            label="RELATED SERVICE"
            linkText={`Learn About Our ${serviceName} Service`}
            href={`/services/${guide.serviceCategory}/${guide.serviceSlug}`}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 8. MidPageCTA (secondary) */}
      <MidPageCTA />

      {/* 9. When to Invest (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading="When to Invest in This Service"
            content={guide.whenToInvest}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 10. FAQ Accordion (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
            Frequently Asked Questions About {serviceName} Costs
          </h2>
          <FaqAccordion faqs={guide.faqs} defaultOpenIndex={0} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 11. Related Guides (dominant) */}
      {relatedGuides.length > 0 && (
        <SectionWrapper tone="dominant">
          <ScrollReveal>
            <RelatedGuides guides={relatedGuides} />
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* 12. Quote Form */}
      <div id="quote-form">
        <QuoteForm />
      </div>

      {/* 13. CTA Banner */}
      <CTABanner
        heading="Get Your Accurate Estimate"
        subtext="Every roofing project is different. Call us for a personalized estimate based on your specific needs."
      />
    </>
  );
}
