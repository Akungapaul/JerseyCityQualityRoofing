import type { Metadata } from 'next';
import { Layers } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildCollectionPageJsonLd,
  buildRoofingContractorJsonLd,
} from '@/lib/seo/json-ld';
import { ALL_MATERIAL_GUIDES } from '@/data/content/material-guides';
import { GuideHero } from '@/components/sections/guide-hero';
import { GuideCard } from '@/components/sections/guide-card';
import { CTABanner } from '@/components/sections/cta-banner';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';

export const metadata: Metadata = generatePageMetadata({
  title: 'Roofing Material Guides — Compare Roofing Materials for Hudson County',
  description:
    'Roofing material guides for Hudson County: compare asphalt shingles, TPO, EPDM, slate, metal, and modified bitumen for durability, cost, and best applications.',
  path: '/guides/materials',
});

export default function MaterialGuidesPage() {
  return (
    <>
      {/* JSON-LD: CollectionPage + RoofingContractor */}
      <JsonLd
        data={
          buildCollectionPageJsonLd({
            name: 'Roofing Material Guides — Compare Roofing Materials for Hudson County',
            description:
              'Roofing material guides for Hudson County homeowners and property managers.',
            path: '/guides/materials',
          }) as unknown as Record<string, unknown>
        }
      />
      <JsonLd
        data={buildRoofingContractorJsonLd() as unknown as Record<string, unknown>}
      />
      {/* 1. Hub Hero (dominant) */}
      <GuideHero
        headline="Roofing Material Guides"
        subtitle="Compare the roofing materials used across Hudson County — properties, durability, and best applications, with recommendations for our salt air, nor'easter wind loads, and freeze-thaw cycles."
        categoryBadgeLabel="MATERIAL GUIDES"
      />

      {/* 2. Hub Intro (dominant, same tone as hero) */}
      <SectionWrapper tone="dominant">
        <div className="max-w-3xl">
          <p className="text-lg text-text-secondary leading-relaxed">
            Choosing the right roofing material matters more in Hudson County
            than in most regions. Salt air accelerates corrosion on metal
            components, waterfront wind exposure tests every attachment, and
            dense urban construction limits what can be installed and where.
            Each guide below compares one material in depth — lifespan, cost,
            maintenance, and the building types it suits best across Jersey
            City, Hoboken, Bayonne, North Bergen, and the surrounding
            municipalities.
          </p>
        </div>
      </SectionWrapper>

      {/* 3. Material Guides Grid (secondary) */}
      <SectionWrapper tone="secondary">
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

      {/* 4. CTABanner */}
      <CTABanner
        heading="Need Help Choosing?"
        subtext="Our team can recommend the right materials and solutions for your property. Call or request a free estimate."
      />
    </>
  );
}
