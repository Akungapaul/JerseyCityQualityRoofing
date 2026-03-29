import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildCollectionPageJsonLd,
  buildRoofingContractorJsonLd,
  buildBreadcrumbJsonLd,
} from '@/lib/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { ALL_BLOG_ARTICLES } from '@/data/content/blog';
import { GuideHero } from '@/components/sections/guide-hero';
import { BadgeStrip } from '@/components/sections/badge-strip';
import { BlogCard } from '@/components/sections/blog-card';
import { CTABanner } from '@/components/sections/cta-banner';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';

export const metadata: Metadata = generatePageMetadata({
  title: 'Roofing Blog — Expert Tips & Guides',
  description:
    'Expert roofing tips, maintenance guides, and industry insights from Jersey City Quality Roofing. Stay informed about roof care for your Hudson County home or business.',
  path: '/blog',
});

export default function BlogPage() {
  // Sort articles by publish date descending (newest first)
  const sortedArticles = [...ALL_BLOG_ARTICLES].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );

  return (
    <>
      {/* JSON-LD: CollectionPage + RoofingContractor + Breadcrumb */}
      <JsonLd
        data={
          buildCollectionPageJsonLd({
            name: 'Roofing Blog — Expert Tips & Guides',
            description:
              'Expert roofing tips, maintenance guides, and industry insights from Jersey City Quality Roofing.',
            path: '/blog',
          }) as unknown as Record<string, unknown>
        }
      />
      <JsonLd
        data={buildRoofingContractorJsonLd() as unknown as Record<string, unknown>}
      />
      <JsonLd
        data={
          buildBreadcrumbJsonLd([
            { name: 'Home', url: BASE_URL },
            { name: 'Blog', url: `${BASE_URL}/blog` },
          ]) as unknown as Record<string, unknown>
        }
      />

      {/* 1. Hero (dominant) */}
      <GuideHero
        headline="Roofing Blog — Expert Tips & Guides"
        subtitle="Stay ahead of roof problems with professional insights from our Hudson County roofing team. From seasonal maintenance checklists to in-depth material comparisons, our blog covers everything homeowners and property managers need to know about protecting their investment."
        categoryBadgeLabel="ROOFING BLOG"
      />

      {/* 2. BadgeStrip */}
      <BadgeStrip />

      {/* 3. Intro prose (dominant) */}
      <SectionWrapper tone="dominant">
        <div className="max-w-3xl">
          <p className="text-lg text-text-secondary leading-relaxed">
            Whether you are dealing with a leaking roof after a nor&apos;easter, planning a full replacement before winter, or simply trying to understand what is happening on top of your building, our blog provides the answers you need. Each article is written by our experienced roofing team and grounded in the specific challenges that Hudson County homes and businesses face every day.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mt-4">
            We cover topics across the roofing spectrum: roof repair warning signs, replacement planning, inspection best practices, emergency preparedness, commercial flat roof maintenance, and everything in between. Our silo-specific articles tie directly into our service expertise, while our standalone educational content helps you make informed decisions regardless of where you are in the process.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mt-4">
            Hudson County&apos;s unique combination of aging housing stock, salt air exposure, freeze-thaw cycles, and intense wind loads from the Hudson River corridor means generic roofing advice often does not apply. We focus on what actually matters for roofs in Jersey City, Hoboken, Bayonne, North Bergen, and the surrounding municipalities.
          </p>
        </div>
      </SectionWrapper>

      {/* 4. Article grid (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article) => (
              <BlogCard
                key={article.slug}
                slug={article.slug}
                title={article.title}
                description={article.subtitle}
                siloBadgeLabel={
                  article.siloService
                    ? article.siloService
                        .split('-')
                        .map((w) => w.toUpperCase())
                        .join(' ')
                    : 'ROOFING EDUCATION'
                }
                publishDate={article.publishDate}
                readingTimeMinutes={article.readingTimeMinutes}
              />
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. CTABanner */}
      <CTABanner
        heading="Have a Roofing Question?"
        subtext="Our team is ready to help. Call now or request your free estimate."
      />
    </>
  );
}
