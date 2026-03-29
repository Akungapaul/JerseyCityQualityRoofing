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
import { ALL_PROBLEMS, getProblem } from '@/data/content/problems';
import {
  initializeContentRegistry,
  getProblemRelatedServices,
  getRelatedGuides,
} from '@/lib/internal-links';

// Section components
import { GuideHero } from '@/components/sections/guide-hero';
import { BadgeStrip } from '@/components/sections/badge-strip';
import { ServiceContentSection } from '@/components/sections/service-content-section';
import { IdentificationSignsList } from '@/components/sections/identification-signs-list';
import { ProblemSolutionCTA } from '@/components/sections/problem-solution-cta';
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
  return ALL_PROBLEMS.map((problem) => ({ slug: problem.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem) return {};

  return generatePageMetadata({
    title: `${problem.title} - Roofing Problem Guide`,
    description: problem.subtitle,
    path: `/problems/${slug}`,
  });
}

// ---------------------------------------------------------------------------
// Helper: count words for JSON-LD
// ---------------------------------------------------------------------------

function countWords(problem: NonNullable<ReturnType<typeof getProblem>>): number {
  let total = problem.introNarrative.split(/\s+/).length;
  total += problem.causesNarrative.split(/\s+/).length;
  total += problem.diyVsProfessional.split(/\s+/).length;
  total += problem.professionalSolution.split(/\s+/).length;
  total += problem.preventionStrategies.split(/\s+/).length;
  total += problem.hudsonCountyContext.split(/\s+/).length;
  total += problem.closingNarrative.split(/\s+/).length;
  return total;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = getProblem(slug);

  if (!problem) {
    notFound();
  }

  // Initialize internal linking
  initializeContentRegistry();
  const serviceLinks = getProblemRelatedServices(slug);
  const relatedGuides = getRelatedGuides(slug, 3);

  const wordCount = countWords(problem);

  return (
    <>
      {/* JSON-LD: Article + FAQPage + RoofingContractor + Breadcrumb */}
      <JsonLd
        data={
          buildBlogPostingJsonLd({
            title: problem.title,
            slug: problem.slug,
            description: problem.subtitle,
            publishDate: '2026-01-01',
            updatedDate: null,
            authorName: 'Jersey City Quality Roofing Team',
            siloService: null,
            wordCount,
            basePath: '/problems',
            schemaType: 'Article',
          }) as unknown as Record<string, unknown>
        }
      />
      <JsonLd
        data={buildFaqPageJsonLd([...problem.faqs]) as unknown as Record<string, unknown>}
      />
      <JsonLd
        data={buildRoofingContractorJsonLd() as unknown as Record<string, unknown>}
      />
      <JsonLd
        data={
          buildBreadcrumbJsonLd([
            { name: 'Home', url: BASE_URL },
            { name: 'Common Roofing Problems', url: `${BASE_URL}/problems` },
            { name: problem.title, url: `${BASE_URL}/problems/${problem.slug}` },
          ]) as unknown as Record<string, unknown>
        }
      />

      {/* 1. GuideHero (dominant) */}
      <GuideHero
        headline={problem.headline}
        subtitle={problem.subtitle}
        categoryBadgeLabel="COMMON PROBLEM"
        showCTA
      />

      {/* 2. BadgeStrip */}
      <BadgeStrip />

      {/* 3. Intro Narrative (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading={problem.problemName}
            content={problem.introNarrative}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. Identification Signs (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <IdentificationSignsList
            signs={problem.identificationSigns}
            problemName={problem.problemName}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. Causes Narrative (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading={`What Causes ${problem.problemName}`}
            content={problem.causesNarrative}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 6. DIY vs Professional (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <ServiceContentSection
            heading="DIY vs. Professional Assessment"
            content={problem.diyVsProfessional}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 7. MidPageCTA (secondary) */}
      <MidPageCTA />

      {/* 8. Professional Solution / ProblemSolutionCTA (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ProblemSolutionCTA
            problemName={problem.problemName}
            narrative={problem.professionalSolution}
            serviceLinks={serviceLinks}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 9. Prevention Strategies (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <ServiceContentSection
            heading="Prevention Strategies"
            content={problem.preventionStrategies}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 10. Hudson County Context (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading="Hudson County Context"
            content={problem.hudsonCountyContext}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 11. FAQ Accordion (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
            Frequently Asked Questions About {problem.problemName}
          </h2>
          <FaqAccordion faqs={problem.faqs} defaultOpenIndex={0} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 12. Related Guides (dominant) */}
      {relatedGuides.length > 0 && (
        <SectionWrapper tone="dominant">
          <ScrollReveal>
            <RelatedGuides guides={relatedGuides} />
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* 13. Quote Form */}
      <div id="quote-form">
        <QuoteForm />
      </div>

      {/* 14. CTA Banner */}
      <CTABanner
        heading="Do Not Let Roof Problems Get Worse"
        subtext="Early intervention saves thousands. Call now or request your free inspection."
      />
    </>
  );
}
