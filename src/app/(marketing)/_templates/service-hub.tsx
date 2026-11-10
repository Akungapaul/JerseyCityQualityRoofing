import Link from 'next/link';
import {
  JsonLd,
  buildCollectionPageJsonLd,
  buildRoofingContractorJsonLd,
} from '@/lib/seo/json-ld';
import type { ServiceHubCard as ServiceHubCardData } from '@/data/service-hubs';
import { GuideHero } from '@/components/sections/guide-hero';
import { BadgeStrip } from '@/components/sections/badge-strip';
import { ServiceHubCard } from '@/components/sections/service-hub-card';
import { QuoteForm } from '@/components/forms/quote-form';
import { CTABanner } from '@/components/sections/cta-banner';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';

/**
 * Shared template for the two flat Rule 7 service hubs (Toms River
 * treatment, 2026-11-10): /residential-roofing-jersey-city-nj and
 * /commercial-roofing-jersey-city-nj.
 *
 * Pattern follows the site's other hub pages (problems, guides):
 * GuideHero carries the H1, the layout supplies the breadcrumb and
 * its BreadcrumbList schema, and the page emits CollectionPage +
 * RoofingContractor JSON-LD in the same form as the problems hub.
 * The quote form section and CTA banner close the page the way the
 * service-in-city pages close. No AggregateRating: the site has no
 * verified review source (CRO Phase 4, 2026-11-06).
 */
export interface ServiceHubConfig {
  /** Rule 7 phrase, e.g. "Residential Roofing Jersey City, NJ". */
  phrase: string;
  /** Flat hub path, e.g. "/residential-roofing-jersey-city-nj". */
  path: string;
  /** Meta description / CollectionPage description. */
  description: string;
  /** First sentence of the page, rendered under the H1. Carries the phrase. */
  firstSentence: string;
  /** Hero badge label, e.g. "RESIDENTIAL ROOFING". */
  badgeLabel: string;
  /** H2 over the card grid. */
  gridHeading: string;
  /** Cards for this hub's services, in display order. */
  cards: ServiceHubCardData[];
  /** The other hub, cross-linked from this page. */
  otherHub: {
    phrase: string;
    path: string;
    heading: string;
    text: string;
  };
}

export default function ServiceHubPage({ hub }: { hub: ServiceHubConfig }) {
  return (
    <>
      {/* JSON-LD: CollectionPage + RoofingContractor (same form as
          the problems hub; the breadcrumb schema comes from the
          layout's Breadcrumbs component). */}
      <JsonLd
        data={
          buildCollectionPageJsonLd({
            name: hub.phrase,
            description: hub.description,
            path: hub.path,
          }) as unknown as Record<string, unknown>
        }
      />
      <JsonLd
        data={buildRoofingContractorJsonLd() as unknown as Record<string, unknown>}
      />

      {/* 1. Hero: H1 + first sentence (Rule 7) */}
      <GuideHero
        headline={hub.phrase}
        subtitle={hub.firstSentence}
        categoryBadgeLabel={hub.badgeLabel}
        showCTA
      />

      {/* 2. BadgeStrip */}
      <BadgeStrip />

      {/* 3. Service cards: whole card is the link, title = the service
          page's exact H1, blurb = its first complete sentence. */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-8">
            {hub.gridHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hub.cards.map((card) => (
              <ServiceHubCard key={card.href} card={card} />
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. Cross-link to the other hub */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-3">
              {hub.otherHub.heading}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              {hub.otherHub.text}
            </p>
            <Link
              href={hub.otherHub.path}
              className="inline-flex items-center gap-2 font-bold text-accent min-h-[44px] hover:opacity-80 transition-opacity"
            >
              View {hub.otherHub.phrase}
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. Quote form (same closing pattern as the service pages) */}
      <QuoteForm />

      {/* 6. CTA Banner */}
      <CTABanner
        heading={`Your Trusted ${hub.phrase} Experts`}
        subtext="Request a free inspection and your no-obligation quote."
      />
    </>
  );
}
