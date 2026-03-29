import type { Metadata } from 'next';
import { DollarSign, Layers } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildCollectionPageJsonLd,
  buildRoofingContractorJsonLd,
  buildBreadcrumbJsonLd,
} from '@/lib/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { ALL_COST_GUIDES } from '@/data/content/cost-guides';
import { ALL_MATERIAL_GUIDES } from '@/data/content/material-guides';
import { GuideHero } from '@/components/sections/guide-hero';
import { BadgeStrip } from '@/components/sections/badge-strip';
import { GuideCard } from '@/components/sections/guide-card';
import { CTABanner } from '@/components/sections/cta-banner';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';

export const metadata: Metadata = generatePageMetadata({
  title: 'Roofing Guides — Cost, Materials & Expert Advice',
  description:
    'Comprehensive roofing guides covering costs, materials, and maintenance for Hudson County homeowners and property managers.',
  path: '/guides',
});

export default function GuidesPage() {
  return (
    <>
      {/* JSON-LD: CollectionPage + RoofingContractor + Breadcrumb */}
      <JsonLd
        data={
          buildCollectionPageJsonLd({
            name: 'Roofing Guides — Cost, Materials & Expert Advice',
            description:
              'Comprehensive roofing guides covering costs, materials, and maintenance for Hudson County homeowners.',
            path: '/guides',
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
            { name: 'Guides', url: `${BASE_URL}/guides` },
          ]) as unknown as Record<string, unknown>
        }
      />

      {/* 1. Hub Hero (dominant) */}
      <GuideHero
        headline="Roofing Guides — Cost, Materials & Expert Advice"
        subtitle="Everything you need to know about roofing costs, material options, and maintenance strategies for Hudson County properties. Written by our experienced roofing team."
        categoryBadgeLabel="ROOFING GUIDES"
      />

      {/* 2. Hub Intro (dominant, same tone as hero) */}
      <SectionWrapper tone="dominant">
        <div className="max-w-3xl">
          <p className="text-lg text-text-secondary leading-relaxed">
            Making informed decisions about your roof starts with understanding the options, the costs, and the tradeoffs involved. Our guide library covers two essential categories: cost guides that break down what you can expect to pay for each type of roofing service in Hudson County, and material guides that compare the properties, durability, and best applications for the roofing materials most commonly used in our region.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mt-4">
            Each guide is grounded in our experience serving Jersey City, Hoboken, Bayonne, North Bergen, and the surrounding municipalities. Pricing reflects real-world Hudson County conditions, and material recommendations account for our specific climate challenges: salt air corrosion, nor&apos;easter wind loads, freeze-thaw cycling, and urban heat island effects.
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

      {/* 4. Material Guides Grid (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
            Material Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_MATERIAL_GUIDES.map((guide) => (
              <GuideCard
                key={guide.slug}
                href={`/guides/materials/${guide.slug}`}
                title={guide.title}
                description={guide.subtitle}
                icon={Layers}
              />
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. CTABanner */}
      <CTABanner
        heading="Need Help Choosing?"
        subtext="Our team can recommend the right materials and solutions for your property. Call or request a free estimate."
      />
    </>
  );
}
