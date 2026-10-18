import type { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildCollectionPageJsonLd,
  buildRoofingContractorJsonLd,
} from '@/lib/seo/json-ld';
import { ALL_COST_GUIDES } from '@/data/content/cost-guides';
import { GuideHero } from '@/components/sections/guide-hero';
import { GuideCard } from '@/components/sections/guide-card';
import { CTABanner } from '@/components/sections/cta-banner';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';

export const metadata: Metadata = generatePageMetadata({
  title: 'Roofing Cost Guides — What Roofing Services Cost in Hudson County',
  description:
    'Roofing cost guides for Hudson County: what roof repair, replacement, inspection, emergency service, and commercial roofing cost in Jersey City and the surrounding municipalities.',
  path: '/guides/cost',
});

export default function CostGuidesPage() {
  return (
    <>
      {/* JSON-LD: CollectionPage + RoofingContractor */}
      <JsonLd
        data={
          buildCollectionPageJsonLd({
            name: 'Roofing Cost Guides — What Roofing Services Cost in Hudson County',
            description:
              'Roofing cost guides for Hudson County homeowners and property managers.',
            path: '/guides/cost',
          }) as unknown as Record<string, unknown>
        }
      />
      <JsonLd
        data={buildRoofingContractorJsonLd() as unknown as Record<string, unknown>}
      />
      {/* 1. Hub Hero (dominant) */}
      <GuideHero
        headline="Roofing Cost Guides"
        subtitle="What roofing services actually cost in Hudson County — repair, replacement, inspection, emergency, and commercial pricing broken down by our experienced roofing team."
        categoryBadgeLabel="COST GUIDES"
      />

      {/* 2. Hub Intro (dominant, same tone as hero) */}
      <SectionWrapper tone="dominant">
        <div className="max-w-3xl">
          <p className="text-lg text-text-secondary leading-relaxed">
            Every cost guide below breaks down what you can expect to pay for a
            specific roofing service in Hudson County, the factors that move the
            price up or down, and how to compare estimates with confidence.
            Pricing reflects real-world conditions across Jersey City, Hoboken,
            Bayonne, North Bergen, and the surrounding municipalities —
            including the urban access, permitting, and material factors that
            make Hudson County pricing different from suburban New Jersey.
          </p>
        </div>
      </SectionWrapper>

      {/* 3. Cost Guides Grid (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
            Cost Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_COST_GUIDES.map((guide) => (
              <GuideCard
                key={guide.slug}
                href={`/guides/cost/${guide.slug}`}
                title={guide.title}
                description={guide.subtitle}
                icon={DollarSign}
              />
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. CTABanner */}
      <CTABanner
        heading="Want an Exact Number for Your Roof?"
        subtext="Every estimate is free and includes a full roof inspection with a written, itemized proposal. Call or request yours today."
      />
    </>
  );
}
