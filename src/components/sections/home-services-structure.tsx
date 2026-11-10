import Link from "next/link";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";
import { ServiceHubCard } from "./service-hub-card";
import {
  SERVICE_CARDS,
  ROOF_REPLACEMENT_COST_CARD,
} from "@/data/service-hubs";
import {
  serviceCityPath,
  RESIDENTIAL_HUB_PATH,
  COMMERCIAL_HUB_PATH,
} from "@/lib/paths";

/**
 * Homepage services structure (Toms River treatment, 2026-11-10;
 * brief Step 5). Replaces the generic services grid and the priority
 * links section. Family pattern: a linked H2 for the head service, an
 * intro paragraph reusing the site's own copy, the bold "These are
 * the..." sentence, then the rest of the family as H3 whole-card
 * links (card title = the target page's exact H1, blurb = its first
 * complete sentence; see src/data/service-hubs.ts). Services that fit
 * neither family (inspection, maintenance) get their own linked H2
 * sections. All H2s are bold, matching the site's heading style.
 */

const H2_CLASS =
  "font-heading font-bold text-[1.75rem] text-text-primary mb-4";
const INTRO_CLASS = "text-lg text-text-secondary leading-relaxed max-w-3xl";
const BOLD_SENTENCE_CLASS = "text-lg font-bold text-text-primary mt-4 mb-6";
const CARD_GRID_CLASS = "grid grid-cols-1 md:grid-cols-2 gap-4";

function LinkedH2({ href, children }: { href: string; children: string }) {
  return (
    <h2 className={H2_CLASS}>
      <Link
        href={href}
        className="hover:text-accent transition-colors duration-[150ms]"
      >
        {children}
      </Link>
    </h2>
  );
}

export function HomeServicesStructure() {
  return (
    <>
      {/* 1. Roofing Contractor Jersey City, NJ — the homepage IS this
          phrase's page, so the H2 is not linked. The words
          "residential" and "commercial" link to the two hubs. */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className={H2_CLASS}>Roofing Contractor Jersey City, NJ</h2>
          <p className={INTRO_CLASS}>
            Jersey City Quality Roofing provides{" "}
            <Link
              href={RESIDENTIAL_HUB_PATH}
              className="text-accent font-bold hover:opacity-80 transition-opacity"
            >
              residential
            </Link>{" "}
            roofing for homes and{" "}
            <Link
              href={COMMERCIAL_HUB_PATH}
              className="text-accent font-bold hover:opacity-80 transition-opacity"
            >
              commercial
            </Link>{" "}
            roofing for businesses across Jersey City and Hudson County. Our
            crews handle roof replacement, roof repair, roof inspections,
            flat roofs, emergency leaks, and roof maintenance for the
            brownstones, row houses, and commercial buildings that make up
            the city.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      {/* 2. Roof Repair family. Head service is the H2; emergency
          roofing is the family's H3 card. Intro reuses the repair
          service's own description and the homepage's existing repair
          summary line. */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <LinkedH2 href={serviceCityPath("roof-repair", "jersey-city")}>
            Roof Repair Jersey City, NJ
          </LinkedH2>
          <p className={INTRO_CLASS}>
            Our roof repair team diagnoses and fixes the full spectrum of
            residential roofing issues across Hudson County, including leak
            tracing, storm damage repair, flashing fixes, and brownstone
            parapet repairs.
          </p>
          <p className={BOLD_SENTENCE_CLASS}>
            These are the roof repair services we provide in Jersey City, NJ.
          </p>
          <div className={CARD_GRID_CLASS}>
            <ServiceHubCard card={SERVICE_CARDS["emergency-roofing"]} />
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 3. Roof Replacement family. Flat roof systems (material
          systems) and the replacement cost guide belong to this
          family. Intro is the replacement service's own first
          sentence. */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <LinkedH2 href={serviceCityPath("roof-replacement", "jersey-city")}>
            Roof Replacement Jersey City, NJ
          </LinkedH2>
          <p className={INTRO_CLASS}>
            A full roof replacement removes every layer of existing roofing
            material down to the deck, addresses any structural issues, and
            installs a complete new roofing system from underlayment to
            ridge cap.
          </p>
          <p className={BOLD_SENTENCE_CLASS}>
            These are the roof replacement services we provide in Jersey
            City, NJ.
          </p>
          <div className={CARD_GRID_CLASS}>
            <ServiceHubCard card={SERVICE_CARDS["flat-roof-systems"]} />
            <ServiceHubCard card={ROOF_REPLACEMENT_COST_CARD} />
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. Roof Inspection — fits neither family; own H2 section.
          Paragraph is the inspection page's own first sentence. */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <LinkedH2 href={serviceCityPath("roof-inspection", "jersey-city")}>
            Roof Inspection Jersey City, NJ
          </LinkedH2>
          <p className={INTRO_CLASS}>{SERVICE_CARDS["roof-inspection"].blurb}</p>
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. Roof Maintenance — fits neither family; own H2 section.
          Paragraph is the maintenance page's own first sentence. */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <LinkedH2 href={serviceCityPath("roof-maintenance", "jersey-city")}>
            Roof Maintenance Jersey City, NJ
          </LinkedH2>
          <p className={INTRO_CLASS}>{SERVICE_CARDS["roof-maintenance"].blurb}</p>
        </ScrollReveal>
      </SectionWrapper>

      {/* 6. Commercial Roofing — H2 links to the commercial HUB; all
          commercial services follow as H3 cards in one grid. Intro
          reuses the flat roof service's own opening sentences. */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <LinkedH2 href={COMMERCIAL_HUB_PATH}>
            Commercial Roofing Jersey City, NJ
          </LinkedH2>
          <p className={`${INTRO_CLASS} mb-6`}>
            Commercial flat roofs require specialized materials, techniques,
            and experience that differ fundamentally from residential
            pitched roofs. We design and install complete flat roof systems
            for commercial, industrial, and institutional buildings across
            Hudson County.
          </p>
          <div className={CARD_GRID_CLASS}>
            <ServiceHubCard card={SERVICE_CARDS["commercial-repair"]} />
            <ServiceHubCard card={SERVICE_CARDS["commercial-replacement"]} />
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
