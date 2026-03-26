# Phase 8: Service-in-City Pages - Research

**Researched:** 2026-03-26
**Domain:** Programmatic SEO location pages, content uniqueness enforcement, anti-doorway-page strategies, Next.js generateStaticParams at scale
**Confidence:** HIGH

## Summary

Phase 8 builds 96 service-in-city pages (8 services x 12 municipalities) at `/services/[category]/[service]/[city]/`. The routing scaffold already exists as stub pages in both `src/app/(marketing)/services/residential/[service]/[city]/page.tsx` and `src/app/(marketing)/services/commercial/[service]/[city]/page.tsx`, with `generateStaticParams` already correctly wiring residential and commercial service slugs against all municipality slugs. The current stubs have working `generateMetadata`, `dynamicParams = false`, and placeholder `<main>` content.

The core challenge is NOT technical routing (that is solved) -- it is content uniqueness at scale. The existing `service-city-content.ts` resolver generates approximately 527 words of city-specific content per page by cross-referencing municipality data with service data. However, the requirement is 3000+ words per page (CONT-09) with 70%+ content uniqueness (LOC-03). This means the resolver output alone is insufficient -- each page needs approximately 2500+ additional words of unique content that combines service expertise with city-specific context. The gap must be filled by: (1) a new `ServiceCityContent` extended data interface with long-form prose fields analogous to `CityHubContent` and `ServiceContent`, (2) per-city-per-service content data files that provide genuinely unique narratives, and (3) a template that blends service-level components (reused from Phase 5/6) with city-level context (reused from Phase 7) plus new hybrid sections.

The single biggest risk to this phase is Google's doorway page classification. Google's August 2025 algorithm update explicitly targets "auto-generated pages, doorway sites that target slight variations of the same keyword, thin AI-written content." The success criteria explicitly require a "city name removal test" (content remains identifiably about a specific city even with the city name removed) and 70%+ content uniqueness. This demands genuinely different narratives per city, not template-and-replace patterns.

**Primary recommendation:** Create a `ServiceInCityContent` interface with ~2500 words of long-form prose fields per page. Organize content data files in `src/data/content/service-cities/[city]/[service].ts` (96 files). Build a hybrid page template that reuses service-level section components (ProcessTimeline, MaterialCards, CostFactors) from Phases 5/6 with city-contextualized headings and intros, plus new sections (CityServiceHero, LocalServiceContext, CitySpecificConcerns, NeighborhoodServiceInsights). Execute in tiered batches: Tier 1 (Jersey City, Hoboken, Bayonne, North Bergen = 32 pages) first, then Tier 2 and Tier 3.

## Project Constraints (from CLAUDE.md)

### Hard Requirements
- Minimum 3000 words per service-in-city page -- non-negotiable for topical authority
- Content must be realistic placeholder structured identically to final content (not lorem ipsum)
- Every page must export `metadata` or `generateMetadata()` with `title`, `description`, and `openGraph`
- One `<h1>` per page, strict heading hierarchy (h1 > h2 > h3, no skipping)
- All images have descriptive `alt` text
- Canonical URL set via `alternates.canonical` in metadata
- Internal links use `next/link`, not raw `<a>` tags
- Default to Server Components -- only `"use client"` when needed
- Files: kebab-case, Components: PascalCase, Constants: SCREAMING_SNAKE_CASE
- Semantic HTML (`<main>`, `<nav>`, `<section>`, `<article>`)
- WCAG AA color contrast, keyboard-accessible interactive elements, focus-visible rings
- Cormorant Garamond (medium) body, Cormorant headings, minimum 18px body font
- LocalBusiness JSON-LD on every page
- Phone numbers wrapped in `tel:` links

### Locked Decisions from Previous Phases
- `as const satisfies Record` pattern for type-safe data registries (Phase 1)
- `cn()` utility pattern with clsx + twMerge (Phase 2)
- SectionWrapper tone="dominant"|"secondary" alternating pattern (Phase 2)
- ScrollReveal wrapping for scroll-linked animations (Phase 2)
- Content data files in `src/data/content/` complement structured data in `src/data/*.ts` (Phase 5)
- CONTENT_MAP record maps slugs to imported content objects for O(1) lookup (Phase 5)
- Service pages use 13-section layout with standard/emergency templates (Phase 5-6)
- City hub pages use 14-section layout with city-specific content (Phase 7)
- JSON-LD builders live in `src/lib/seo/json-ld.tsx` with `JsonLd` renderer component (Phase 1/4)
- `buildServicePageJsonLd()` for Service schema (Phase 5)
- `buildCityRoofingContractorJsonLd()` with `@id` entities (Phase 7)
- `buildFaqPageJsonLd()` for FAQ schema (Phase 4)
- Testimonial filtering: use specific if 3+, else fallback to all (Phases 5/7)
- `getTestimonialsByCityAndService()` helper already exists in testimonials.ts
- BreadcrumbList JSON-LD via `buildBreadcrumbJsonLd()` (Phase 2)
- Tiered municipality batching: Tier 1 (JC, Hoboken, Bayonne, NB), Tier 2 (UC, WNY, Secaucus, Kearny), Tier 3 (Harrison, East Newark, Guttenberg, Weehawken) (Phase 7)

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LOC-02 | Service-in-city pages (~96 pages) generated programmatically via generateStaticParams, each service x each municipality | Stub pages already exist at both residential and commercial `[city]/page.tsx` routes with working `generateStaticParams`. `dynamicParams = false` is set. Both stubs wire `getResidentialServiceSlugs()`/`getCommercialServiceSlugs()` x `getAllMunicipalitySlugs()`. Total: 48 residential + 48 commercial = 96 pages. |
| LOC-03 | Each service-in-city page achieves 70%+ content uniqueness using municipality data registries | Current `getCityServiceContent()` resolver generates ~527 words of cross-referenced content. This is insufficient for 70% uniqueness on a 3000+ word page. Solution: new `ServiceInCityContent` interface with ~2500 words of unique long-form prose per page (city-specific service narrative, neighborhood service insights, local case scenario, city-specific materials advice, city-specific cost context). Combined with resolver output, yields ~3000+ words where ~80% is city-specific. |
| LOC-04 | Each service-in-city page includes unique FAQ section with 5+ questions tailored to that city's specific roofing concerns | `buildUniqueFaqs()` in `service-city-content.ts` already generates 5 city-specific FAQs per service-city combination. These are genuinely unique (different permit authorities, weather data, neighborhoods, cost factors per city). Additional 3-5 extended FAQs can be added in the content data files for 8-10 total. |
| SEO-16 | Semantic SEO: entity mapping, NLP-optimized copy with co-occurring terms, comprehensive topic coverage per silo | Service-in-city pages are the leaf nodes of the content silo. Each page needs: (1) Service + FAQPage JSON-LD with city-scoped `areaServed`, (2) breadcrumb chain linking back through the silo (Home > Services > [Category] > [Service] > [City]), (3) internal links to parent service page and sibling city pages, (4) entity-rich content mentioning specific materials, building codes, neighborhoods, and landmarks as co-occurring terms. |
</phase_requirements>

## Standard Stack

### Core (Already Installed -- No New Dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.x | App Router, generateStaticParams, generateMetadata | Routing scaffold exists. Static generation handles 96 pages at build time. |
| React | 19.2.x | Server Components for content-heavy pages | Service-in-city pages are 100% static -- Server Components only, no `"use client"` |
| TypeScript | 5.7.x | Strict typing for content data interfaces | `satisfies` pattern for 96 content data files |
| Tailwind CSS | 4.1.x | Utility-first styling | Existing design tokens and SectionWrapper tone system |
| Motion | 12.x | ScrollReveal animations | Already integrated via ScrollReveal wrapper |
| schema-dts | 1.1.x | TypeScript types for JSON-LD | Service, RoofingContractor, FAQPage, BreadcrumbList types |

### No New Dependencies Required

Phase 8 requires zero new npm packages. All needed functionality exists:
- `schema-dts` for JSON-LD types (installed)
- `lucide-react` for icons (installed)
- `next/link` for internal navigation (built-in)
- All section components from Phases 5-7 are reusable
- All form components from Phase 3 exist (QuoteForm)
- `embla-carousel-react` for testimonial carousel (installed, component exists)

**Installation:** None required.

## Architecture Patterns

### Recommended Project Structure (New Files)

```
src/
  data/
    types.ts                           # ADD: ServiceInCityContent interface
    service-city-content.ts            # EXISTING: resolver (getCityServiceContent)
    content/
      service-cities/                  # NEW: 96 content data files
        jersey-city/                   # Tier 1
          roof-repair.ts
          roof-replacement.ts
          roof-inspection.ts
          emergency-roofing.ts
          flat-roof-systems.ts
          roof-maintenance.ts
          commercial-repair.ts
          commercial-replacement.ts
        hoboken/                       # Tier 1
          [8 files]
        bayonne/                       # Tier 1
          [8 files]
        north-bergen/                  # Tier 1
          [8 files]
        union-city/                    # Tier 2
          [8 files]
        west-new-york/                 # Tier 2
          [8 files]
        secaucus/                      # Tier 2
          [8 files]
        kearny/                        # Tier 2
          [8 files]
        harrison/                      # Tier 3
          [8 files]
        east-newark/                   # Tier 3
          [8 files]
        guttenberg/                    # Tier 3
          [8 files]
        weehawken/                     # Tier 3
          [8 files]
  components/
    sections/
      city-service-hero.tsx            # NEW: Hero combining service + city
      local-service-context.tsx        # NEW: City-specific service intro narrative
      city-specific-concerns.tsx       # NEW: Local roofing concerns for this service
      neighborhood-service-insights.tsx # NEW: Per-neighborhood service advice
      sibling-cities-nav.tsx           # NEW: Links to same service in other cities
  lib/
    seo/
      json-ld.tsx                      # EXTEND: buildServiceInCityJsonLd()
  app/
    (marketing)/
      services/
        residential/[service]/[city]/
          page.tsx                      # REPLACE stub with full template
        commercial/[service]/[city]/
          page.tsx                      # REPLACE stub with full template
```

### Pattern 1: ServiceInCityContent Data Interface

**What:** New content type that provides ~2500 words of long-form prose per service-city combination, complementing the existing resolver's ~527 words.

**When to use:** Every service-in-city page requires a content data file that exports this type.

**Example:**
```typescript
// src/data/types.ts -- ADD this interface
export interface ServiceInCityContent {
  serviceSlug: string;
  citySlug: string;
  heroHeadline: string;                    // City-specific H1, e.g., "Roof Repair in Jersey City, NJ"
  heroSubtitle: string;                    // Unique supporting tagline
  cityServiceNarrative: string;            // ~600 words: first-person expert narrative about doing THIS service in THIS city
  neighborhoodServiceInsights: NeighborhoodServiceInsight[]; // Per-neighborhood insights for this service
  localCaseScenario: string;              // ~400 words: realistic case study / scenario for this service in this city
  cityMaterialsAdvice: string;            // ~300 words: which materials work best in this city for this service
  cityCostContext: string;                // ~200 words: cost factors specific to this city
  citySpecificProcess: string;            // ~300 words: how the process differs in this city
  extendedFaqs: FAQ[];                    // 3-5 additional FAQs beyond the resolver's 5
  closingNarrative: string;               // ~200 words: city-specific closing CTA
}

export interface NeighborhoodServiceInsight {
  neighborhoodName: string;
  insight: string;                         // ~100 words: what's unique about this service in this neighborhood
  commonIssue: string;                     // The #1 issue we see here
}
```

### Pattern 2: Hybrid Page Template (Service + City)

**What:** The service-in-city page template reuses components from both service pages (Phase 5/6) and city hub pages (Phase 7), with new hybrid sections that combine both dimensions.

**When to use:** All 96 service-in-city pages use a single shared template with content data driving the variation.

**Template section order (14-16 sections):**
1. CityServiceHero (dominant) -- combines service name + city name in H1, city-specific subtitle
2. BadgeStrip (secondary) -- reused from Phase 2
3. LocalServiceContext (dominant) -- ~600 word city-specific service narrative
4. ProcessTimeline (secondary) -- reused from Phase 5, with city-contextualized heading
5. NeighborhoodServiceInsights (dominant) -- NEW: per-neighborhood service advice
6. MaterialCards (secondary) -- reused from Phase 5, with city-specific intro
7. CitySpecificConcerns (dominant) -- NEW: resolver's specificConcerns + data enrichment
8. MidPageCTA (secondary) -- reused, city-specific heading
9. CostFactorsSection (dominant) -- reused, with city-specific cost context intro
10. Local Case Scenario (secondary) -- NEW: realistic city-specific case study
11. TestimonialCarousel (dominant) -- filtered by city+service, fallback to city, then all
12. SiblingCitiesNav (secondary) -- NEW: links to same service in other cities
13. FaqAccordion (dominant) -- resolver's 5 + extended FAQs = 8-10 total
14. QuoteForm -- reused, default service type pre-filled
15. CTABanner -- reused, city-specific heading

### Pattern 3: Content Data File Structure

**What:** Each of the 96 files follows an identical pattern, exporting a typed const.

**Example:**
```typescript
// src/data/content/service-cities/jersey-city/roof-repair.ts
import type { ServiceInCityContent } from '@/data/types';

export const JERSEY_CITY_ROOF_REPAIR_CONTENT: ServiceInCityContent = {
  serviceSlug: 'roof-repair',
  citySlug: 'jersey-city',
  heroHeadline: 'Expert Roof Repair in Jersey City, NJ',
  heroSubtitle: 'From Downtown brownstone parapets to Heights colonial ice dams, we fix every roof leak in the second-largest city in New Jersey.',
  cityServiceNarrative: `[~600 words of first-person narrative about roof repair specifically in Jersey City...]`,
  neighborhoodServiceInsights: [
    {
      neighborhoodName: 'Downtown',
      insight: '[~100 words about roof repair challenges specific to Downtown JC]',
      commonIssue: 'Parapet wall flashing failure on century-old brownstones',
    },
    // ... 3-5 neighborhoods
  ],
  localCaseScenario: `[~400 words: realistic scenario of a roof repair job in Jersey City]`,
  cityMaterialsAdvice: `[~300 words: which repair materials work best given JC's salt air, aging brownstones, etc.]`,
  cityCostContext: `[~200 words: cost factors specific to Jersey City]`,
  citySpecificProcess: `[~300 words: how the repair process differs in JC due to permits, access, historic district rules]`,
  extendedFaqs: [
    // 3-5 additional FAQs specific to roof repair in Jersey City
  ],
  closingNarrative: `[~200 words: city-specific closing call to action]`,
};
```

### Pattern 4: Batch Build Verification

**What:** Pages are built and verified in tiers to catch issues early before scaling to all 96.

**Structure:**
- **Tier 1 (32 pages):** Jersey City, Hoboken, Bayonne, North Bergen x 8 services
- **Tier 2 (32 pages):** Union City, West New York, Secaucus, Kearny x 8 services
- **Tier 3 (32 pages):** Harrison, East Newark, Guttenberg, Weehawken x 8 services

Each tier includes content creation, page assembly, and build verification before proceeding to the next tier. This matches the Phase 7 tiered approach and the roadmap's batch deployment strategy.

### Pattern 5: JSON-LD for Service-in-City Pages

**What:** Each page gets three JSON-LD blocks: Service (city-scoped), FAQPage, and BreadcrumbList.

```typescript
// New builder in json-ld.tsx
export function buildServiceInCityJsonLd(
  service: ServiceData,
  city: Municipality,
  canonicalUrl: string
): WithContext<ServiceSchema> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: `${service.name} in ${city.name}`,
    description: `Professional ${service.name.toLowerCase()} services in ${city.name}, NJ.`,
    serviceType: service.name,
    url: canonicalUrl,
    areaServed: {
      '@type': 'City',
      name: city.name,
      '@id': `${BASE_URL}/service-areas/${city.slug}#city`,
    },
    provider: {
      '@type': 'RoofingContractor',
      '@id': `${BASE_URL}/#organization`,
      name: BUSINESS_INFO.name,
    },
  };
}
```

### Anti-Patterns to Avoid

- **Template-and-replace content:** Do NOT generate content by taking a service page's prose and replacing "Hudson County" with a city name. Each city narrative must reference specific neighborhoods, landmarks, architecture styles, building codes, and weather patterns that are different per city.
- **Identical FAQ questions with swapped city names:** While the resolver does generate FAQs with city names swapped, the content data files must add 3-5 GENUINELY different FAQs that address issues unique to each city.
- **Orphaned pages:** Every service-in-city page must be linked FROM the parent service page, FROM the city hub page (already done via `ServicesInCityGrid`), and from sibling city navigation. No orphaned pages.
- **Identical section ordering with no variation:** The template should be consistent, but section headings, intros, and emphasis should vary based on city characteristics (e.g., emergency service pages for waterfront cities emphasize storm response differently than inland cities).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Content uniqueness validation | Manual word-by-word comparison | Vitest test that measures Jaccard similarity between same-service pages across cities | Automated enforcement catches regression; manual review does not scale to 96 pages |
| FAQ generation | Manually writing 480+ FAQ answers (96 pages x 5 FAQs) | Existing `buildUniqueFaqs()` resolver for base 5 FAQs + manually authored extended FAQs | The resolver already produces genuinely unique FAQs using city data; only the extended set needs manual authoring |
| Testimonial filtering | Custom filter logic | Existing `getTestimonialsByCityAndService()` with fallback chain | Already built in `testimonials.ts` |
| Breadcrumb construction | Manual breadcrumb arrays | Existing `buildBreadcrumbJsonLd()` with computed items | Pattern established in Phase 7 |
| Page metadata | Custom title/description strings | Existing `generatePageMetadata()` with service+city interpolation | Pattern established in Phase 1 stub |

## Common Pitfalls

### Pitfall 1: Google Doorway Page Classification
**What goes wrong:** Google classifies 96 location pages as doorway pages and deindexes or penalizes them. This is the single biggest risk to this phase and to the entire site's SEO strategy.
**Why it happens:** Pages that are "substantially similar" except for city name swaps trigger Google's SpamBrain detection. The August 2025 algorithm update specifically targets "auto-generated pages, doorway sites that target slight variations of the same keyword."
**How to avoid:**
- Each page MUST pass the "city name removal test": if you remove every mention of the city name, the remaining content should still be identifiably about a specific place (referencing specific neighborhoods, landmarks, building types, weather patterns, building codes).
- 70%+ content uniqueness between same-service pages for different cities. This means the `cityServiceNarrative`, `localCaseScenario`, `neighborhoodServiceInsights`, and `cityMaterialsAdvice` fields must contain genuinely different content referencing different facts.
- Internal linking must be natural and bidirectional (service page -> city page -> service-in-city page -> back up the chain).
- Pages must be accessible through site navigation, not orphaned URL-only pages.
**Warning signs:** Build a vitest test that computes Jaccard word-set similarity between the same service across different cities. If similarity exceeds 30%, the content is too similar.

### Pitfall 2: Content Volume Burnout (96 Files x ~2500 Words)
**What goes wrong:** The content data files become progressively more generic as the author (AI or human) runs out of unique things to say about the 12th city's roof repair service.
**Why it happens:** 96 x 2500 = 240,000 words of prose. Maintaining genuine uniqueness at this scale requires deliberate differentiation strategies.
**How to avoid:**
- Each city has rich municipality data (5+ neighborhoods, 5+ landmarks, 5+ roofing concerns, 5+ weather concerns, specific building codes, specific architecture styles). Content MUST reference these specific data points.
- The `NeighborhoodServiceInsight` pattern ensures at least 3-5 genuinely unique paragraphs per page because each city has different neighborhoods.
- The `localCaseScenario` field should describe a realistic scenario that could ONLY happen in that city (e.g., a row house in Bergen-Lafayette where leaks travel through shared party walls vs. a waterfront condo in Weehawken where salt air corroded the flashing).
- Build content in tiers (Tier 1 first, verify quality, then proceed). This catches quality degradation early.
**Warning signs:** Multiple pages using the same phrases, scenarios, or neighborhood names.

### Pitfall 3: Build Time Explosion
**What goes wrong:** 96 additional static pages significantly increase build time on Vercel.
**Why it happens:** `generateStaticParams` generates all 96 pages at build time. Each page imports content data and renders multiple section components.
**How to avoid:** At 96 pages with static content, this should be manageable (Vercel handles hundreds of static pages routinely). However:
- Use tree-shakable imports (import specific content files, not a barrel export of all 96).
- Do NOT create a barrel `index.ts` that imports all 96 content files -- this defeats tree shaking and loads everything into memory at once.
- Instead, use a CONTENT_MAP per-route file that imports only the content files for that category (residential or commercial), similar to the existing pattern in service pages.
**Warning signs:** Build time exceeding 2 minutes on Vercel; memory warnings during build.

### Pitfall 4: Shared Template Without City-Specific Variation
**What goes wrong:** All 96 pages look identical in structure with only the text content varying. This fails the doorway page test visually as well as textually.
**Why it happens:** Using a single rigid template for all 96 pages without any conditional rendering.
**How to avoid:**
- Emergency service pages in cities should emphasize phone CTA more prominently (reuse EmergencyHero pattern).
- Waterfront cities (Jersey City, Hoboken, Weehawken) should surface salt air and wind concerns more prominently.
- Cities with historic districts (Jersey City, Hoboken) should include building code/permit emphasis.
- The section headings should be city-specific, not generic.
**Warning signs:** Taking screenshots of 3 different city pages for the same service and being unable to tell them apart visually.

### Pitfall 5: Broken Internal Linking / Silo Integrity
**What goes wrong:** Service-in-city pages become disconnected from the silo structure, functioning as orphaned pages rather than integrated silo leaf nodes.
**Why it happens:** Not implementing bidirectional internal links between service-in-city pages and their parent pages.
**How to avoid:**
- Each service-in-city page MUST link back to its parent service page (`/services/[category]/[service]/`).
- Each service-in-city page MUST link back to its parent city hub page (`/service-areas/[city]/`).
- The `ServicesInCityGrid` component in city hub pages ALREADY links down to service-in-city pages (verified in codebase).
- Add a `SiblingCitiesNav` component that links to the same service in other cities (horizontal silo navigation).
- The parent service page should link down to its city variants (add a "We serve these locations" section or similar).
**Warning signs:** Google Search Console showing service-in-city pages as orphaned or with low internal link count.

## Code Examples

### Existing Stub Page (to be replaced)
```typescript
// src/app/(marketing)/services/residential/[service]/[city]/page.tsx (CURRENT)
// Already has: generateStaticParams, generateMetadata, dynamicParams = false
// Missing: full template, content data, JSON-LD, section components
export function generateStaticParams() {
  const services = getResidentialServiceSlugs();
  const cities = getAllMunicipalitySlugs();
  return services.flatMap((service) =>
    cities.map((city) => ({ service, city }))
  );
}
```

### Existing Content Resolver (to be augmented, not replaced)
```typescript
// src/data/service-city-content.ts (EXISTING -- generates ~527 words)
// getCityServiceContent(serviceSlug, citySlug) returns:
//   localContext: string (~96 words)
//   specificConcerns: string[] (5 items)
//   localStats: string (~64 words)
//   neighborhoodMention: string
//   uniqueFaqs: FAQ[] (5 items, ~305 words total)
```

### Existing Testimonial Helper (ready to use)
```typescript
// src/data/testimonials.ts
export function getTestimonialsByCityAndService(
  citySlug: string,
  serviceSlug: string,
): Testimonial[] {
  return TESTIMONIALS.filter(
    (t) => t.citySlug === citySlug && t.serviceSlug === serviceSlug,
  );
}
```

### Content Uniqueness Test Pattern
```typescript
// src/data/__tests__/service-city-content.test.ts
import { describe, it, expect } from 'vitest';

function jaccardSimilarity(a: string, b: string): number {
  const setA = new Set(a.toLowerCase().split(/\s+/));
  const setB = new Set(b.toLowerCase().split(/\s+/));
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

describe('service-in-city content uniqueness', () => {
  it('same service across different cities has < 30% word-set similarity', () => {
    // Compare cityServiceNarrative between Jersey City and Hoboken for roof-repair
    const jcContent = JERSEY_CITY_ROOF_REPAIR_CONTENT.cityServiceNarrative;
    const hobokenContent = HOBOKEN_ROOF_REPAIR_CONTENT.cityServiceNarrative;
    const similarity = jaccardSimilarity(jcContent, hobokenContent);
    expect(similarity).toBeLessThan(0.30);
  });
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Boilerplate city pages with name swaps | Genuinely unique content per location using structured data | Google August 2025 update | Pages with < 40% unique content risk deindexing |
| 50+ location pages launched simultaneously | Batch deployment with indexing validation | 2025 SEO best practice | Reduces risk of bulk penalty; allows quality iteration |
| City pages as standalone content | City pages as silo leaf nodes with bidirectional internal linking | 2025 programmatic SEO | Orphaned pages are flagged as lower quality |
| Generic FAQ sections with city name swaps | FAQs generated from city-specific data (building codes, weather, neighborhoods) | Project Phase 1 resolver design | Each FAQ references different permit authorities, weather stats, neighborhoods |

## Open Questions

1. **Content data file organization: 96 individual files vs. per-city aggregate files**
   - What we know: Phase 7 used one file per city (12 files). Phase 5/6 used one file per service (8 files). Phase 8 is the cross-product.
   - What's unclear: Is `service-cities/jersey-city/roof-repair.ts` (96 files in 12 dirs) better than `service-cities/jersey-city.ts` (12 files each exporting 8 content objects)?
   - Recommendation: Use per-city directories with per-service files (`service-cities/[city]/[service].ts`). This keeps each file under 200 lines and enables parallel authoring. The alternative (one file per city with 8 exports) would create files of ~1500 lines each that are harder to review and maintain. 96 files is manageable in a directory tree with 12 subdirectories.

2. **Should residential and commercial use the same page template or separate templates?**
   - What we know: Phase 5 (residential) uses standard + emergency templates. Phase 6 (commercial) uses standard-only template. Both follow the same section pattern.
   - What's unclear: Whether commercial service-in-city pages need different section emphasis (e.g., "property manager" voice vs. "homeowner" voice).
   - Recommendation: Use a single template with a `isCommercial` flag that adjusts voice cues in headings and CTA copy. The section structure should be identical. This is consistent with how the service pages share a template with minor voice adjustments.

3. **How to handle the emergency roofing service-in-city pages?**
   - What we know: Phase 5 has an emergency template variant with EmergencyHero, WhatToDoSection, etc. The question is whether emergency service-in-city pages also need a different template.
   - What's unclear: Whether the emergency emphasis is needed at the city-level or only at the service-level.
   - Recommendation: Use the standard service-in-city template for emergency pages but with a `isEmergency` flag that swaps the hero to an emergency variant (prominent phone CTA, amber accent). Emergency-specific sections (WhatToDoSection, InsuranceClaimsSection) are NOT needed on city pages since the parent service page covers those in depth. The city page should emphasize local emergency response time, local storm patterns, and city-specific emergency contacts.

4. **Batch deployment for SEO: should pages be withheld from sitemap until batch is verified?**
   - What we know: The success criteria say "launched in batches with Search Console indexing validation before expanding."
   - What's unclear: Whether "batch launch" means literally withholding pages from the sitemap or simply building content in tiers.
   - Recommendation: Build and deploy content in tiers, but all pages can be in the sitemap from the start. "Batch validation" means verifying that Tier 1 pages are indexed and not penalized before investing effort in Tier 2/3 content. If Tier 1 triggers a doorway page concern, the content strategy can be adjusted before 64 more pages are created. This is a content authoring strategy, not a deployment gating strategy.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.x |
| Config file | `vitest.config.ts` (exists) |
| Quick run command | `pnpm test` |
| Full suite command | `pnpm test` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LOC-02 | All 96 pages generate and render | build | `pnpm build` (generateStaticParams produces 96 routes) | N/A -- build verification |
| LOC-03 | 70%+ content uniqueness per service across cities | unit | `pnpm test -- src/data/__tests__/service-city-uniqueness.test.ts` | Wave 0 |
| LOC-04 | 5+ unique FAQs per page | unit | `pnpm test -- src/data/__tests__/service-city-content-data.test.ts` | Wave 0 |
| SEO-16 | Semantic SEO: JSON-LD, breadcrumbs, entity mapping | unit | `pnpm test -- src/data/__tests__/service-city-seo.test.ts` | Wave 0 |

### Sampling Rate
- **Per task commit:** `pnpm test`
- **Per wave merge:** `pnpm test && pnpm build`
- **Phase gate:** Full suite green + successful build before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/data/__tests__/service-city-uniqueness.test.ts` -- Jaccard similarity test across same-service different-city content; covers LOC-03
- [ ] `src/data/__tests__/service-city-content-data.test.ts` -- validates ServiceInCityContent structure, word counts, FAQ counts, voice/local-context checks; covers LOC-04
- [ ] `src/data/__tests__/service-city-seo.test.ts` -- validates buildServiceInCityJsonLd output, breadcrumb chain, metadata generation; covers SEO-16

## Sources

### Primary (HIGH confidence)
- Codebase inspection: `src/app/(marketing)/services/residential/[service]/[city]/page.tsx` -- stub page with working generateStaticParams
- Codebase inspection: `src/app/(marketing)/services/commercial/[service]/[city]/page.tsx` -- stub page with working generateStaticParams
- Codebase inspection: `src/data/service-city-content.ts` -- existing resolver generating ~527 words per page
- Codebase inspection: `src/data/types.ts` -- existing ServiceCityContent, CityHubContent, ServiceContent interfaces
- Codebase inspection: `src/data/municipalities.ts` -- all 12 municipalities with rich differentiation data
- Codebase inspection: `src/data/testimonials.ts` -- getTestimonialsByCityAndService() helper exists
- Codebase inspection: `src/lib/seo/json-ld.tsx` -- existing JSON-LD builders
- Codebase inspection: `src/app/(marketing)/services/residential/[service]/page.tsx` -- service page template (13 sections)
- Codebase inspection: `src/app/(marketing)/service-areas/[city]/page.tsx` -- city hub page template (14 sections)
- Phase 7 research: `.planning/phases/07-location-hub-pages/07-RESEARCH.md`
- Phase 5 research: `.planning/phases/05-residential-service-pages/05-RESEARCH.md`

### Secondary (MEDIUM confidence)
- [Google Search Central: Doorway Pages](https://support.google.com/webmasters/thread/121665985/are-cities-landing-pages-doorway-pages?hl=en) -- Google confirming city landing pages can be doorway pages
- [Google: City Landing Pages Can Be Doorway Pages](https://www.seroundtable.com/google-city-landing-pages-doorway-pages-28670.html) -- Google's explicit warning
- [Programmatic SEO: Scale Without Google Penalties (2025)](https://guptadeepak.com/the-programmatic-seo-paradox-why-your-fear-of-creating-thousands-of-pages-is-both-valid-and-obsolete/) -- 40% unique content minimum threshold
- [Doorway Pages Vs Landing Pages: Hidden SEO Risks In 2026](https://www.bigredseo.com/doorway-pages-vs-landing-pages/) -- August 2025 update impact on doorway pages
- [How to Prevent Duplicate Content in Programmatic SEO Systems](https://hashmeta.com/blog/how-to-prevent-duplicate-content-in-programmatic-seo-systems-a-strategic-guide/) -- uniqueness thresholds and strategies
- [Location Pages: What Crosses the Line to Doorway Abuse](https://ricketyroo.com/blog/location-page-spam/) -- city name removal test concept
- [Programmatic SEO Best Practices](https://seomatic.ai/blog/programmatic-seo-best-practices) -- template variation strategies
- [Service area pages: Boost local SEO across locations](https://searchengineland.com/guide/service-area-pages) -- location page best practices

### Tertiary (LOW confidence)
- None -- all findings verified through codebase inspection and multiple sources.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- zero new dependencies, all patterns established in Phases 5-7
- Architecture: HIGH -- direct extension of existing patterns with clear content data + component + template structure
- Content uniqueness strategy: HIGH -- municipality data richness verified (12 cities, each with 5+ neighborhoods, 5+ landmarks, 5+ concerns, unique building codes); Jaccard similarity testing provides automated enforcement
- Doorway page avoidance: MEDIUM -- strategies are based on current SEO best practices and Google's public guidance, but Google's classification algorithms are opaque; batch deployment mitigates risk
- Pitfalls: HIGH -- based on codebase analysis and verified SEO industry guidance

**Research date:** 2026-03-26
**Valid until:** 2026-04-25 (30 days -- stable domain, established codebase patterns)
