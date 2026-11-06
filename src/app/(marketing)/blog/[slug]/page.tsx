import type { Metadata } from 'next';
import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildBlogPostingJsonLd,
  buildFaqPageJsonLd,
  buildRoofingContractorJsonLd,
} from '@/lib/seo/json-ld';
import { ALL_BLOG_ARTICLES, getBlogArticle } from '@/data/content/blog';
import {
  initializeContentRegistry,
  getRelatedBlogArticles,
  getRelatedGuides,
} from '@/lib/internal-links';

// Section components
import { BlogHero } from '@/components/sections/blog-hero';
import { BadgeStrip } from '@/components/sections/badge-strip';
import { ServiceContentSection } from '@/components/sections/service-content-section';
import { TableOfContents } from '@/components/sections/table-of-contents';
import { BlogArticleBody } from '@/components/sections/blog-article-body';
import { SiloPillarLink } from '@/components/sections/silo-pillar-link';
import { RelatedGuides } from '@/components/sections/related-guides';
import { FaqAccordion } from '@/components/sections/faq-accordion';
import { RelatedArticles } from '@/components/sections/related-articles';
import { AuthorBio } from '@/components/sections/author-bio';
import { BlogMidArticleCta } from '@/components/sections/blog-mid-article-cta';
import { QuoteForm } from '@/components/forms/quote-form';
import { getService } from '@/data/services';
import { serviceCityPath } from '@/lib/paths';
import { CTABanner } from '@/components/sections/cta-banner';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';

// ---------------------------------------------------------------------------
// Static params and metadata
// ---------------------------------------------------------------------------

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return {};

  return generatePageMetadata({
    title: article.title,
    description: article.subtitle,
    path: `/blog/${slug}`,
    ogType: 'article',
  });
}

// ---------------------------------------------------------------------------
// Helper: slugify heading text for anchor IDs
// ---------------------------------------------------------------------------

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ---------------------------------------------------------------------------
// Helper: count total words for JSON-LD
// ---------------------------------------------------------------------------

function countWords(article: NonNullable<ReturnType<typeof getBlogArticle>>): number {
  let total = article.introNarrative.split(/\s+/).length;
  for (const section of article.sections) {
    total += section.content.split(/\s+/).length;
  }
  total += article.closingNarrative.split(/\s+/).length;
  return total;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    notFound();
  }

  // Initialize internal linking registry
  initializeContentRegistry();

  const relatedArticles = getRelatedBlogArticles(slug, 3);
  const relatedGuides = getRelatedGuides(slug, 3);

  const isSiloArticle = article.siloService !== null && article.parentPillarLink !== null;
  const siloBadgeLabel = article.siloService
    ? article.siloService
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Roofing Education';

  // Prepare TOC data with slugified heading IDs
  const tocSections = article.sections.map((s) => ({
    heading: s.heading,
    headingLevel: s.headingLevel,
    headingId: slugifyHeading(s.heading),
  }));

  const wordCount = countWords(article);

  // Compute tone alternation for article sections
  // Sections 5-N start at dominant, alternating
  let articleToneIndex = 0;

  return (
    <article>
      {/* JSON-LD: BlogPosting + FAQPage + RoofingContractor */}
      <JsonLd
        data={
          buildBlogPostingJsonLd({
            title: article.title,
            slug: article.slug,
            description: article.subtitle,
            publishDate: article.publishDate,
            updatedDate: article.updatedDate,
            authorName: article.author,
            siloService: article.siloService,
            wordCount,
          }) as unknown as Record<string, unknown>
        }
      />
      <JsonLd
        data={buildFaqPageJsonLd([...article.faqs]) as unknown as Record<string, unknown>}
      />
      <JsonLd
        data={buildRoofingContractorJsonLd() as unknown as Record<string, unknown>}
      />
      {/* 1. BlogHero (dominant, own section wrapper) */}
      <BlogHero
        headline={article.headline}
        subtitle={article.subtitle}
        siloBadgeLabel={siloBadgeLabel.toUpperCase()}
        author={article.author}
        publishDate={article.publishDate}
        readingTimeMinutes={article.readingTimeMinutes}
      />

      {/* 2. BadgeStrip */}
      <BadgeStrip />

      {/* 3. Intro (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <ServiceContentSection
            heading={article.headline}
            content={article.introNarrative}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. Table of Contents (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <TableOfContents sections={tocSections} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 5-N. Article sections (alternating tones, start dominant).
          CRO Phase 5 (2026-11-06, audit finding 11): a mid-article CTA
          is inserted after the second section (or the last section of
          a short article) so readers are not asked for the lead only
          at the very end of the page. */}
      {article.sections.map((section, sectionIndex) => {
        const tone = articleToneIndex % 2 === 0 ? 'dominant' : 'secondary';
        articleToneIndex++;
        const headingId = slugifyHeading(section.heading);
        const isCtaInsertionPoint =
          sectionIndex === Math.min(1, article.sections.length - 1);

        return (
          <Fragment key={headingId}>
            <SectionWrapper tone={tone as 'dominant' | 'secondary'}>
              <ScrollReveal>
                <BlogArticleBody
                  heading={section.heading}
                  headingLevel={section.headingLevel}
                  content={section.content}
                  headingId={headingId}
                />
              </ScrollReveal>
            </SectionWrapper>
            {isCtaInsertionPoint && (
              <SectionWrapper tone="dominant">
                <ScrollReveal>
                  <BlogMidArticleCta
                    serviceName={
                      article.siloService
                        ? getService(article.siloService)?.name
                        : undefined
                    }
                    serviceHref={
                      article.siloService
                        ? serviceCityPath(article.siloService, 'jersey-city')
                        : undefined
                    }
                  />
                </ScrollReveal>
              </SectionWrapper>
            )}
          </Fragment>
        );
      })}

      {/* N+1. SiloPillarLink (secondary, silo articles only) */}
      {isSiloArticle && article.parentPillarLink && (
        <SectionWrapper tone="secondary">
          <ScrollReveal>
            <SiloPillarLink
              label="FROM OUR SERVICE LIBRARY"
              linkText={`Read More About ${siloBadgeLabel}`}
              href={article.parentPillarLink}
            />
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* N+2. Related Guides (dominant) */}
      {relatedGuides.length > 0 && (
        <SectionWrapper tone="dominant">
          <ScrollReveal>
            <RelatedGuides guides={relatedGuides} />
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* N+3. FAQ Accordion (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <FaqAccordion faqs={article.faqs} defaultOpenIndex={0} />
        </ScrollReveal>
      </SectionWrapper>

      {/* N+4. Related Articles (dominant) */}
      {relatedArticles.length > 0 && (
        <SectionWrapper tone="dominant">
          <ScrollReveal>
            <RelatedArticles articles={relatedArticles} />
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* N+5. Author Bio (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <AuthorBio name={article.author} />
        </ScrollReveal>
      </SectionWrapper>

      {/* N+6. Quote Form (dominant) -- CRO Phase 5: prefilled with the
          article's silo service when it has one. */}
      <div id="quote-form">
        <QuoteForm
          defaultServiceType={
            article.siloService
              ? (getService(article.siloService)?.name ?? '')
              : ''
          }
        />
      </div>

      {/* N+7. CTA Banner (secondary) */}
      <CTABanner
        heading="Ready to Protect Your Roof?"
        subtext="Request a free inspection and your no-obligation quote."
      />
    </article>
  );
}
