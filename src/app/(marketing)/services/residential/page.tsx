import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Hammer,
  RefreshCw,
  Search,
  Siren,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildCollectionPageJsonLd,
  buildRoofingContractorJsonLd,
} from '@/lib/seo/json-ld';
import { getServicesByCategory } from '@/data/services';
import { GuideHero } from '@/components/sections/guide-hero';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';
import { CTABanner } from '@/components/sections/cta-banner';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'roof-repair': Hammer,
  'roof-replacement': RefreshCw,
  'roof-inspection': Search,
  'emergency-roofing': Siren,
};

export const metadata: Metadata = generatePageMetadata({
  title: 'Residential Roofing Services | Jersey City Quality Roofing',
  description:
    'Expert roof repair, replacement, inspection, and emergency services for Hudson County homeowners. Licensed, insured, and locally trusted.',
  path: '/services/residential',
});

export default function ResidentialServicesPage() {
  const services = getServicesByCategory('residential');

  return (
    <>
      {/* JSON-LD: CollectionPage + RoofingContractor */}
      <JsonLd
        data={
          buildCollectionPageJsonLd({
            name: 'Residential Roofing Services',
            description:
              'Expert roof repair, replacement, inspection, and emergency services for Hudson County homeowners.',
            path: '/services/residential',
          }) as unknown as Record<string, unknown>
        }
      />
      <JsonLd
        data={buildRoofingContractorJsonLd() as unknown as Record<string, unknown>}
      />
      {/* 1. Hero (dominant) */}
      <GuideHero
        headline="Residential Roofing Services"
        subtitle="Expert roof repair, replacement, inspection, and emergency services for Hudson County homeowners."
        categoryBadgeLabel="RESIDENTIAL"
      />

      {/* 2. Intro prose (dominant) */}
      <SectionWrapper tone="dominant">
        <div className="max-w-3xl">
          <p className="text-lg text-text-secondary leading-relaxed">
            Hudson County&apos;s residential landscape ranges from historic brownstones in downtown Jersey City to modern single-family homes in suburban Secaucus. Each property type presents unique roofing challenges &mdash; and each deserves a team that understands the specific materials, techniques, and building codes that apply.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mt-4">
            Our residential roofing division handles every aspect of home roof care. Whether you need a few shingles replaced after a storm, a complete tear-off and reroof before winter, a pre-purchase inspection for your real estate transaction, or an emergency tarp at two in the morning, we respond with the same professionalism and attention to detail.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mt-4">
            Every residential project begins with a thorough inspection and honest assessment. We document our findings with photos, explain your options in plain language, and provide written estimates with no hidden costs. Our workmanship warranty backs every repair and installation we perform.
          </p>
        </div>
      </SectionWrapper>

      {/* 3. Service cards (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service) => {
              const ServiceIcon = SERVICE_ICONS[service.slug] ?? Hammer;
              return (
                <Link
                  key={service.slug}
                  href={`/services/residential/${service.slug}`}
                  className="group bg-dominant rounded-lg p-6 flex flex-col gap-3 hover:bg-[#4a5040] transition-colors duration-[150ms]"
                >
                  <ServiceIcon
                    size={24}
                    className="text-accent"
                    aria-hidden="true"
                  />
                  <span className="font-heading font-bold text-[1.75rem] text-text-primary">
                    {service.name}
                  </span>
                  <p className="text-text-secondary text-lg">
                    {service.shortDescription}
                  </p>
                  <ArrowRight
                    size={16}
                    className="text-accent mt-auto group-hover:translate-x-1 transition-transform duration-[150ms]"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. CTA Banner */}
      <CTABanner
        heading="Need Help With Your Roof?"
        subtext="Our residential roofing experts are ready. Call now or request your free estimate."
      />
    </>
  );
}
