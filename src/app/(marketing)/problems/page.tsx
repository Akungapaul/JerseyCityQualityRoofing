import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildCollectionPageJsonLd,
  buildRoofingContractorJsonLd,
  buildBreadcrumbJsonLd,
} from '@/lib/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { ALL_PROBLEMS } from '@/data/content/problems';
import { GuideHero } from '@/components/sections/guide-hero';
import { BadgeStrip } from '@/components/sections/badge-strip';
import { GuideCard } from '@/components/sections/guide-card';
import { CTABanner } from '@/components/sections/cta-banner';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';

export const metadata: Metadata = generatePageMetadata({
  title: 'Common Roofing Problems — Identification & Solutions',
  description:
    'Identify and solve common roofing problems. Expert guidance on leaks, storm damage, ice dams, and more from Hudson County roofing specialists.',
  path: '/problems',
});

export default function ProblemsPage() {
  return (
    <>
      {/* JSON-LD: CollectionPage + RoofingContractor + Breadcrumb */}
      <JsonLd
        data={
          buildCollectionPageJsonLd({
            name: 'Common Roofing Problems — Identification & Solutions',
            description:
              'Identify and solve common roofing problems with expert guidance from Hudson County roofing specialists.',
            path: '/problems',
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
            { name: 'Common Roofing Problems', url: `${BASE_URL}/problems` },
          ]) as unknown as Record<string, unknown>
        }
      />

      {/* 1. Hub Hero (dominant) */}
      <GuideHero
        headline="Common Roofing Problems — Identification & Solutions"
        subtitle="Every roofing problem has a solution. Learn how to identify the warning signs, understand the causes, and know when to call a professional for your Hudson County home or business."
        categoryBadgeLabel="COMMON PROBLEMS"
      />

      {/* 2. Hub Intro (dominant) */}
      <SectionWrapper tone="dominant">
        <div className="max-w-3xl">
          <p className="text-lg text-text-secondary leading-relaxed">
            Hudson County roofs face a unique set of challenges: salt air from the Hudson River accelerates material degradation, freeze-thaw cycles crack and lift roofing membranes, nor&apos;easter winds tear at shingles and flashing, and the urban heat island effect bakes flat roofs through the summer months. Understanding the most common roofing problems in our region helps you catch issues early, prevent costly damage, and make informed decisions about when to repair and when to replace.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mt-4">
            Each problem guide below walks through the identification signs, root causes, DIY versus professional assessment, and the professional solutions available. We include honest guidance on what you can handle yourself and what requires a licensed roofing contractor.
          </p>
        </div>
      </SectionWrapper>

      {/* 3. Problems Grid (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_PROBLEMS.map((problem) => (
              <GuideCard
                key={problem.slug}
                href={`/problems/${problem.slug}`}
                title={problem.title}
                description={problem.subtitle}
                icon={AlertTriangle}
              />
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. CTABanner */}
      <CTABanner
        heading="Dealing With a Roof Problem?"
        subtext="Do not wait for the next storm. Call us now or request your free inspection."
      />
    </>
  );
}
