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
import { ALL_MATERIAL_GUIDES, getMaterialGuide } from '@/data/content/material-guides';
import {
  initializeContentRegistry,
  getRelatedGuides,
} from '@/lib/internal-links';

// Section components
import { GuideHero } from '@/components/sections/guide-hero';
import { BadgeStrip } from '@/components/sections/badge-strip';
import { ServiceContentSection } from '@/components/sections/service-content-section';
import { MaterialComparison } from '@/components/sections/material-comparison';
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
  return ALL_MATERIAL_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getMaterialGuide(slug);
  if (!guide) return {};

  return generatePageMetadata({
    title: guide.title,
    description: guide.subtitle,
    path: `/guides/materials/${slug}`,
  });
}

// ---------------------------------------------------------------------------
// Helper: count words for JSON-LD
// ---------------------------------------------------------------------------

function countWords(guide: NonNullable<ReturnType<typeof getMaterialGuide>>): number {
  let total = guide.introNarrative.split(/\s+/).length;
  total += guide.materialProperties.split(/\s+/).length;
  total += guide.lifespanAndDurability.split(/\s+/).length;
  total += guide.costAnalysis.split(/\s+/).length;
  total += guide.bestApplications.split(/\s+/).length;
  total += guide.hudsonCountySuitability.split(/\s+/).length;
  total += guide.installationProcess.split(/\s+/).length;
  total += guide.maintenanceRequirements.split(/\s+/).length;
  total += guide.closingNarrative.split(/\s+/).length;
  return total;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function MaterialsGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getMaterialGuide(slug);

  if (!guide) {
    notFound();
  }

  // Initialize internal linking
  initializeContentRegistry();
  const relatedGuides = getRelatedGuides(slug, 3);

  const wordCount = countWords(guide);

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
            siloService: null,
            wordCount,
            basePath: '/guides/materials',
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
            { name: 'Material Guides', url: `${BASE_URL}/guides` },
            { name: guide.title, url: `${BASE_URL}/guides/materials/${guide.slug}` },
          ]) as unknown as Record<string, unknown>
        }
      />

      {/* 1. GuideHero (dominant) */}
      <GuideHero
        headline={guide.headline}
        subtitle={guide.subtitle}
        categoryBadgeLabel="MATERIAL GUIDE"
        showCTA
      />

      {/* 2. BadgeStrip */}
      <BadgeStrip />

      {/* 3. Intro Narrative (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading={`${guide.materialName}: Complete Guide`}
            content={guide.introNarrative}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. Material Properties (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <ServiceContentSection
            heading="Material Properties"
            content={guide.materialProperties}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. Lifespan & Durability (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading="Lifespan & Durability"
            content={guide.lifespanAndDurability}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 6. Cost Analysis (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <ServiceContentSection
            heading="Cost Analysis"
            content={guide.costAnalysis}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 7. Pros and Cons (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
            Advantages & Considerations
          </h2>
          <MaterialComparison
            pros={guide.prosAndCons.pros}
            cons={guide.prosAndCons.cons}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 8. MidPageCTA (secondary) */}
      <MidPageCTA />

      {/* 9. Best Applications (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading="Best Applications"
            content={guide.bestApplications}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 10. Hudson County Suitability (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <ServiceContentSection
            heading="Hudson County Suitability"
            content={guide.hudsonCountySuitability}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 11. Installation Process (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading="Installation Process"
            content={guide.installationProcess}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 12. Maintenance Requirements (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <ServiceContentSection
            heading="Maintenance Requirements"
            content={guide.maintenanceRequirements}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 13. FAQ Accordion (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
            Frequently Asked Questions About {guide.materialName}
          </h2>
          <FaqAccordion faqs={guide.faqs} defaultOpenIndex={0} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 14. Related Guides (secondary) */}
      {relatedGuides.length > 0 && (
        <SectionWrapper tone="secondary">
          <ScrollReveal>
            <RelatedGuides guides={relatedGuides} />
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* 15. Quote Form */}
      <div id="quote-form">
        <QuoteForm />
      </div>

      {/* 16. CTA Banner */}
      <CTABanner
        heading="Ready to Choose Your Roofing Material?"
        subtext="Our experts can help you select the best material for your property and budget."
      />
    </>
  );
}
