# Phase 7: Location Hub Pages - Research

**Researched:** 2026-03-25
**Domain:** Location-specific content pages, local SEO structured data, city hub page architecture
**Confidence:** HIGH

## Summary

Phase 7 builds 12 city hub pages at `/service-areas/[city]` -- one for each Hudson County municipality. The routing scaffold already exists (stub page at `src/app/(marketing)/service-areas/[city]/page.tsx` with `generateStaticParams` wired to `getAllMunicipalitySlugs()`). The municipality data registry (`src/data/municipalities.ts`) contains rich structured data for all 12 cities including landmarks, housing stock, building codes, weather patterns, architecture styles, neighborhoods, and roofing concerns. Testimonials are already tagged by `citySlug` with a `getTestimonialsByCity()` helper. The core task is: (1) create city-specific content data files analogous to the Phase 5/6 `ServiceContent` pattern, (2) build city hub section components, (3) implement RoofingContractor + BreadcrumbList JSON-LD with `@id` entity relationships, and (4) assemble the full pages.

The established patterns from Phases 5-6 (commercial/residential service pages) provide a clear blueprint. Each page follows a multi-section Server Component template using `SectionWrapper`, `ScrollReveal`, existing form/CTA components, and a CONTENT_MAP lookup pattern. Phase 7 mirrors this but with city-specific content instead of service-specific content. The main new element is the knowledge graph JSON-LD (SEO-04) which requires `@id`-based entity cross-referencing between the RoofingContractor, Service entities, and city-specific Place/AdministrativeArea entities.

**Primary recommendation:** Follow the exact data-content-components-assembly plan structure established in Phases 5-6. Create a `CityHubContent` interface for the 3000+ word content data files, build 4-6 new section components specific to location pages (city hero, local expertise narrative, housing stock data, weather/climate section, services-in-city link grid, neighborhood breakdown), and assemble using the standard SectionWrapper/ScrollReveal pattern. JSON-LD builders should use `@id` hash-URIs for entity cross-referencing (SEO-04).

## Project Constraints (from CLAUDE.md)

### Hard Requirements
- Minimum 3000 words per city hub page -- non-negotiable for topical authority
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
- Service pages use 13-section layout with standard template function (Phase 5-6)
- JSON-LD builders live in `src/lib/seo/json-ld.tsx` with `JsonLd` renderer component (Phase 1/4)
- Testimonial filtering: use city-specific if 3+, else fallback to all (established in Phase 5)
- BreadcrumbList JSON-LD already built via `buildBreadcrumbJsonLd()` (Phase 2)

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LOC-01 | City hub pages for all 12 Hudson County municipalities with unique local content, services overview, testimonials, and FAQ | Municipality data registry provides structured data for all 12 cities. CityHubContent data files provide 3000+ word narratives. Existing section components (TestimonialCarousel, FaqAccordion, QuoteForm) are reusable. New components needed for city-specific sections (local expertise, housing stock, weather, neighborhood breakdown, services grid). |
| LOC-05 | Each location page includes city-specific testimonials tagged by municipality | `getTestimonialsByCity()` already exists in `src/data/testimonials.ts`. All 48 testimonials are tagged with `citySlug`. Each city has exactly 4 testimonials. Testimonial filtering pattern established in Phase 5: use city-specific if 3+, else fallback to all. |
| SEO-01 | JSON-LD structured data on every page: RoofingContractor (LocalBusiness subtype), BreadcrumbList | `buildRoofingContractorJsonLd()` exists but needs city-scoped variant. `buildBreadcrumbJsonLd()` exists and can be called with city-specific breadcrumb items. New builder needed: `buildCityRoofingContractorJsonLd(city)` that scopes areaServed to the specific city and adds `@id` for entity cross-referencing. |
| SEO-04 | Knowledge graph JSON-LD mapping entity relationships: Service -> Location -> Materials -> Problems -> Solutions | Requires `@id` hash-URI pattern across entities. RoofingContractor `@id` = `${BASE_URL}/#organization`. Each city page's LocalBusiness variant uses `@id` = `${BASE_URL}/service-areas/${slug}#local-business`. Service entities reference back via `provider.@id`. `knowsAbout` property declares roofing expertise topics. `makesOffer` connects to Service entities. |
</phase_requirements>

## Standard Stack

### Core (Already Installed -- No New Dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.x | App Router, generateStaticParams, generateMetadata | Routing scaffold already exists at `/service-areas/[city]/page.tsx` |
| React | 19.2.x | Server Components for content-heavy pages | City hub pages are 100% static -- Server Components only, no `"use client"` |
| TypeScript | 5.7.x | Strict typing for city content data interfaces | `satisfies` pattern for content data, `Municipality` type already defined |
| Tailwind CSS | 4.1.x | Utility-first styling for section components | Existing design tokens and tone system |
| Motion | 12.x | ScrollReveal animations | Already integrated via `ScrollReveal` wrapper |
| schema-dts | 1.1.x | TypeScript types for JSON-LD | `RoofingContractor`, `BreadcrumbList`, `Service` types available |

### No New Dependencies Required

Phase 7 requires zero new npm packages. All needed functionality exists in the current dependency tree:
- `schema-dts` for JSON-LD types (installed)
- `lucide-react` for icons in new section components (installed)
- `next/link` for internal navigation (built-in)
- `embla-carousel-react` for testimonial carousel (installed, component exists)
- All form components from Phase 3 (QuoteForm, CompactQuoteForm) exist

**Installation:** None required.

## Architecture Patterns

### Recommended Project Structure (New Files)

```
src/
  data/
    content/
      cities/                       # NEW: City hub content data files
        jersey-city.ts              # ~3000 words of city-specific content
        hoboken.ts
        bayonne.ts
        north-bergen.ts
        union-city.ts
        west-new-york.ts
        secaucus.ts
        kearny.ts
        harrison.ts
        east-newark.ts
        guttenberg.ts
        weehawken.ts
    types.ts                        # EXTEND: Add CityHubContent interface
  components/
    sections/
      city-hub-hero.tsx             # NEW: City-specific hero with population/tagline
      local-expertise-section.tsx   # NEW: ~500w narrative on local roofing knowledge
      housing-stock-section.tsx     # NEW: Data-rich section with housing stats
      weather-climate-section.tsx   # NEW: Weather patterns and roofing implications
      neighborhood-breakdown.tsx    # NEW: Neighborhood-by-neighborhood overview
      services-in-city-grid.tsx     # NEW: 8 service cards linking to child pages
      city-landmarks-section.tsx    # NEW: Local landmarks with roofing significance
  lib/
    seo/
      json-ld.tsx                   # EXTEND: Add buildCityRoofingContractorJsonLd()
  app/
    (marketing)/
      service-areas/
        [city]/
          page.tsx                  # REWRITE: From stub to full assembled page
```

### Pattern 1: CityHubContent Data Interface

**What:** TypeScript interface defining the structure for city-specific long-form content, analogous to `ServiceContent` from Phase 5.

**When to use:** Every city hub content data file implements this interface.

```typescript
// Add to src/data/types.ts

export interface CityHubContent {
  slug: string;                          // Municipality slug (e.g., 'jersey-city')
  heroHeadline: string;                  // City-specific H1
  heroSubtitle: string;                  // Supporting tagline
  localExpertiseNarrative: string;       // ~500 words: first-person expert voice about this city
  housingStockNarrative: string;         // ~400 words: architecture, building ages, roof types
  weatherClimateNarrative: string;       // ~400 words: weather patterns, seasonal concerns
  neighborhoodBreakdown: NeighborhoodSection[]; // Per-neighborhood roofing insights
  landmarksNarrative: string;            // ~300 words: how local landmarks reflect roofing needs
  buildingCodeNarrative: string;         // ~200 words: permits, inspections, special requirements
  whyChooseUsNarrative: string;          // ~300 words: why this company for this city
  closingNarrative: string;              // ~200 words: final call to action
  cityFaqs: FAQ[];                       // 8-10 city-specific FAQs
}

export interface NeighborhoodSection {
  name: string;                          // Neighborhood name
  description: string;                   // ~100 words: roofing concerns in this neighborhood
  commonRoofTypes: string[];             // Prevalent roof types in this neighborhood
  keyChallenge: string;                  // Primary roofing challenge
}
```

### Pattern 2: CONTENT_MAP Lookup (Established Pattern)

**What:** Record mapping city slugs to imported content objects.

**When to use:** Page component resolves content at build time.

```typescript
// In page.tsx
import { JERSEY_CITY_CONTENT } from '@/data/content/cities/jersey-city';
import { HOBOKEN_CONTENT } from '@/data/content/cities/hoboken';
// ... all 12 imports

const CITY_CONTENT_MAP: Record<string, CityHubContent> = {
  'jersey-city': JERSEY_CITY_CONTENT,
  'hoboken': HOBOKEN_CONTENT,
  // ... all 12 entries
};

function getCityContent(slug: string): CityHubContent | undefined {
  return CITY_CONTENT_MAP[slug];
}
```

### Pattern 3: City-Scoped JSON-LD with @id Entity Relationships (SEO-01, SEO-04)

**What:** RoofingContractor JSON-LD scoped to a specific city with `@id` hash-URIs enabling cross-page entity linking for the knowledge graph.

**When to use:** Every city hub page emits this schema.

```typescript
// Add to src/lib/seo/json-ld.tsx

export function buildCityRoofingContractorJsonLd(
  city: Municipality,
  services: Service[]
): WithContext<RoofingContractor> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': `${BASE_URL}/#organization`,       // Same @id across all pages
    name: BUSINESS_INFO.name,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    url: BASE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.zip,
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      '@id': `${BASE_URL}/service-areas/${city.slug}#city`,
    },
    knowsAbout: [
      `Roofing services in ${city.name}`,
      ...city.commonRoofTypes,
      ...city.architectureStyles.slice(0, 3).map(s => `${s} roof repair`),
    ],
    makesOffer: services.map(s => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': `${BASE_URL}/services/${s.category}/${s.slug}#service`,
        name: s.name,
        description: s.shortDescription,
        areaServed: {
          '@type': 'City',
          name: city.name,
        },
      },
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
  };
}
```

### Pattern 4: Forward Links to Service-in-City Pages (Phase 8 Prep)

**What:** Each city hub page includes a grid of 8 cards linking to `/services/residential/[service]/[city]` and `/services/commercial/[service]/[city]` URLs.

**When to use:** The services-in-city grid section on every city hub page.

```typescript
// services-in-city-grid.tsx
import Link from 'next/link';
import { getServicesByCategory } from '@/data/services';

export function ServicesInCityGrid({ citySlug, cityName }: {
  citySlug: string;
  cityName: string;
}) {
  const residential = getServicesByCategory('residential');
  const commercial = getServicesByCategory('commercial');

  return (
    <div>
      <h2>Roofing Services in {cityName}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {residential.map(service => (
          <Link
            key={service.slug}
            href={`/services/residential/${service.slug}/${citySlug}`}
          >
            {service.name} in {cityName}
          </Link>
        ))}
        {commercial.map(service => (
          <Link
            key={service.slug}
            href={`/services/commercial/${service.slug}/${citySlug}`}
          >
            {service.name} in {cityName}
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Note:** These links will 404 until Phase 8 builds the service-in-city pages. This is expected -- the links establish the URL structure and internal link graph ahead of Phase 8. Consider using `prefetch={false}` on these links until Phase 8 is complete.

### Pattern 5: City Hub Page Template (Server Component Assembly)

**What:** The full page template following the established multi-section layout pattern.

**Recommended section order for city hub pages (12-14 sections):**

1. **City Hero** (dominant) -- H1 with city name, population, county, tagline
2. **Badge Strip** (secondary) -- Reuse existing component
3. **Local Expertise Narrative** (dominant) -- ~500 words, first-person expert voice
4. **Housing Stock & Architecture** (secondary) -- Data-rich section with stats cards
5. **Weather & Climate Impact** (dominant) -- Weather data with roofing implications
6. **City Landmarks** (secondary) -- Landmarks with roofing significance connections
7. **Neighborhood Breakdown** (dominant) -- Per-neighborhood roofing insights
8. **Mid-Page CTA** -- Reuse existing MidPageCTA component
9. **Services in City Grid** (secondary) -- 8 service cards with forward links
10. **Building Codes & Permits** (dominant) -- Permit requirements, code editions
11. **City-Specific Testimonials** -- Reuse TestimonialCarousel with city-filtered data
12. **FAQ Accordion** (secondary) -- City-specific FAQs (8-10 questions)
13. **Quote Form** -- Reuse existing QuoteForm
14. **CTA Banner** -- Reuse existing CTABanner with city-specific copy

### Anti-Patterns to Avoid

- **Thin doorway pages:** Each city page MUST have genuinely unique 3000+ word content. Simply swapping the city name in a template is a Google penalty risk. The municipality data (landmarks, housing stock, weather, neighborhoods) provides the raw material for unique content, but the narratives must be written specifically for each city.
- **Duplicate JSON-LD:** Do not copy the same RoofingContractor JSON-LD across all pages without city-scoping. Each city page's `areaServed` should be scoped to THAT specific city, not all 12.
- **Client-side rendering for static content:** City hub pages are purely informational content. Zero `"use client"` directives. Every component should be a Server Component.
- **Hardcoded content in page.tsx:** Content belongs in data files (`src/data/content/cities/[slug].ts`), not inline in the page component. This keeps the page template clean and testable.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Testimonial display | Custom testimonial rendering | Existing `TestimonialCarousel` + `getTestimonialsByCity()` | Already built in Phase 4, handles carousel, star ratings, responsiveness |
| FAQ sections | Custom accordion | Existing `FaqAccordion` component | Built in Phase 4, handles open/close state, keyboard accessibility |
| Quote forms | New form component | Existing `QuoteForm` component | Built in Phase 3, handles validation, Turnstile, Server Action |
| Breadcrumb JSON-LD | Manual JSON construction | Existing `buildBreadcrumbJsonLd()` | Built in Phase 2, handles proper ListItem nesting |
| Scroll animations | Manual IntersectionObserver | Existing `ScrollReveal` wrapper | Built in Phase 2, handles motion library integration |
| Section layout | Custom padding/spacing | Existing `SectionWrapper` with tone prop | Built in Phase 2, handles alternating dominant/secondary backgrounds |
| SEO metadata | Manual metadata object | Existing `generatePageMetadata()` | Built in Phase 1, handles canonical URLs, OG data |
| Google Map embed | Custom iframe | Existing `GoogleMapEmbed` component | Built in Phase 4, handles responsive sizing and title |

**Key insight:** Phase 7's unique work is content creation and 4-6 new city-specific section components. The page assembly pattern, form/CTA/testimonial infrastructure, SEO metadata, and JSON-LD rendering framework all exist from previous phases. Reuse aggressively.

## Common Pitfalls

### Pitfall 1: Thin Content Triggering Doorway Page Classification
**What goes wrong:** Google classifies city pages as doorway pages because content is templated with only city name swapped out. Pages are demoted or deindexed.
**Why it happens:** 12 cities x same template = algorithmically detected as thin/duplicate content.
**How to avoid:** Each city's content data file must contain genuinely unique narratives referencing that city's specific landmarks, neighborhoods, housing stock characteristics, building code quirks, and weather patterns. The municipality data registry provides the raw facts; the content files transform those facts into unique 3000+ word narratives. Target 70%+ uniqueness between any two city pages.
**Warning signs:** Multiple city pages ranking for the same keywords instead of city-specific terms. Google Search Console showing "Duplicate, submitted URL not selected as canonical."

### Pitfall 2: JSON-LD Entity Fragmentation (SEO-04)
**What goes wrong:** Each page emits a standalone RoofingContractor JSON-LD with no entity connections. Google cannot build a knowledge graph because entities are disconnected.
**Why it happens:** Using different `@id` values (or no `@id`) on each page's RoofingContractor entity.
**How to avoid:** Use a SINGLE consistent `@id` for the organization (`${BASE_URL}/#organization`) across ALL pages. City-specific scoping goes into `areaServed`, not into the organization identity. Service references use their canonical URL + `#service` as `@id`. Cities use `${BASE_URL}/service-areas/${slug}#city` as `@id`.
**Warning signs:** Google's Rich Results Test shows valid markup but no entity connections. Structured Data report shows fragmented entities.

### Pitfall 3: Forward Links to Non-Existent Phase 8 Pages
**What goes wrong:** City hub pages link to 96 service-in-city URLs that return 404 because Phase 8 has not built them yet.
**Why it happens:** Success criteria #5 requires forward links to all 8 service-in-city child pages per city.
**How to avoid:** Two options: (a) Include the forward links with `prefetch={false}` and accept temporary 404s during development (they will resolve in Phase 8), or (b) conditionally render the links based on whether the target pages exist. Option (a) is simpler and acceptable since the site is not yet in production.
**Warning signs:** `pnpm build` may warn about invalid links during static generation if `dynamicParams = false` is set on service-in-city routes.

### Pitfall 4: Word Count Shortfall
**What goes wrong:** Content data files do not reach the 3000-word minimum per page.
**Why it happens:** Underestimating how much narrative content is needed when structured data (housing stock stats, weather numbers) feels like "enough" content.
**How to avoid:** Budget content across sections: local expertise (~500w) + housing stock (~400w) + weather/climate (~400w) + neighborhood breakdown (6 neighborhoods x ~100w = ~600w) + landmarks (~300w) + building codes (~200w) + why choose us (~300w) + closing (~200w) + FAQ answers (10 x ~80w = ~800w) = ~3700 words. Build word count validation into tests.
**Warning signs:** Test suite reporting word counts below 3000 per city content file.

### Pitfall 5: Inconsistent NAP Data in City-Scoped JSON-LD
**What goes wrong:** City-specific JSON-LD uses different address/phone than the global business info, creating NAP inconsistency.
**Why it happens:** Creating separate address objects per city instead of using the single business address.
**How to avoid:** Always import `BUSINESS_INFO` from `src/data/business-info.ts` for address, phone, email. The business has ONE physical address. `areaServed` indicates the SERVICE area, not the business location.
**Warning signs:** Google Search Console showing NAP discrepancy warnings. Rich Results Test showing different addresses across pages.

## Code Examples

### City Hub Content Data File Pattern

```typescript
// src/data/content/cities/jersey-city.ts
import type { CityHubContent } from '@/data/types';

// Word count: ~3500
export const JERSEY_CITY_CONTENT: CityHubContent = {
  slug: 'jersey-city',
  heroHeadline: 'Trusted Roofing Contractor in Jersey City, NJ',
  heroSubtitle:
    'From Downtown brownstones to Heights colonials, we protect every roof in New Jersey\'s second-largest city.',

  localExpertiseNarrative: `When a homeowner in the Paulus Hook Historic District calls us about...
  [~500 words of genuinely unique first-person narrative about roofing in Jersey City]`,

  housingStockNarrative: `Jersey City's 120,000 housing units tell the story of...
  [~400 words about architecture, building ages, common roof types]`,

  // ... remaining fields per CityHubContent interface
};
```

### City-Scoped generateMetadata Pattern

```typescript
// In service-areas/[city]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getMunicipality(citySlug);
  if (!city) return {};

  return generatePageMetadata({
    title: `Roofing Services in ${city.name}, NJ | Jersey City Quality Roofing`,
    description: `Expert residential and commercial roofing in ${city.name}. ${city.description} Serving all ${city.neighborhoods.length} neighborhoods. Call for a free estimate.`,
    path: `/service-areas/${city.slug}`,
  });
}
```

### Breadcrumb JSON-LD for City Hub Pages

```typescript
// City hub pages sit at: Home > Service Areas > [City Name]
const breadcrumbs = buildBreadcrumbJsonLd([
  { name: 'Home', url: BASE_URL },
  { name: 'Service Areas', url: `${BASE_URL}/service-areas` },
  { name: city.name, url: `${BASE_URL}/service-areas/${city.slug}` },
]);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Flat JSON-LD per page | `@id` entity graph across pages | 2024-2025 | Google/Bing can traverse entity relationships across the site |
| `serviceArea` property | `areaServed` property | schema.org deprecation | `serviceArea` is superseded by `areaServed` |
| One LocalBusiness schema sitewide | City-scoped `areaServed` per location page | 2024 best practice | More precise geo-targeting for local pack results |
| Template city pages with name swap | 3000+ word unique content per city | Google 2023 helpful content update | Thin location pages are actively penalized |
| Separate JSON-LD blocks | `@graph` array for multi-entity pages | 2024-2025 | Cleaner entity relationships, single context declaration |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | `vitest.config.ts` |
| Quick run command | `pnpm exec vitest run src/data/__tests__/city-content.test.ts` |
| Full suite command | `pnpm exec vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LOC-01 | All 12 city content files exist with 3000+ words | unit | `pnpm exec vitest run src/data/__tests__/city-content.test.ts -x` | Wave 0 |
| LOC-01 | All 12 city pages build without error at correct URLs | smoke | `pnpm build` | N/A (build) |
| LOC-01 | Each city content includes landmarks, housing stock, weather, building codes, neighborhoods | unit | `pnpm exec vitest run src/data/__tests__/city-content.test.ts -x` | Wave 0 |
| LOC-05 | City-specific testimonials render (getTestimonialsByCity returns 4 per city) | unit | `pnpm exec vitest run src/data/__tests__/testimonials.test.ts -x` | Exists |
| SEO-01 | RoofingContractor and BreadcrumbList JSON-LD present on every city page | unit | `pnpm exec vitest run src/data/__tests__/city-jsonld.test.ts -x` | Wave 0 |
| SEO-04 | JSON-LD uses @id entity relationships correctly | unit | `pnpm exec vitest run src/data/__tests__/city-jsonld.test.ts -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `pnpm exec vitest run src/data/__tests__/city-content.test.ts`
- **Per wave merge:** `pnpm exec vitest run`
- **Phase gate:** Full suite green + `pnpm build` succeeds before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/data/__tests__/city-content.test.ts` -- covers LOC-01 (word count, field completeness, uniqueness per city)
- [ ] `src/data/__tests__/city-jsonld.test.ts` -- covers SEO-01, SEO-04 (JSON-LD structure, @id consistency, entity relationships)
- [ ] `CityHubContent` interface addition to `src/data/types.ts` -- needed before content files

## Open Questions

1. **Forward link handling for Phase 8 pages**
   - What we know: Success criteria #5 requires each city page to link to all 8 service-in-city child pages. Those pages do not exist yet (Phase 8).
   - What's unclear: Whether `pnpm build` will fail when static pages link to non-existent routes. The service-in-city route stubs exist at `src/app/(marketing)/services/[category]/[service]/[city]/page.tsx` but their `generateStaticParams` may not cover all city slugs yet.
   - Recommendation: Include the forward links. The stub pages at `[city]/page.tsx` already exist with `generateStaticParams` wired to municipality slugs. Verify during build. If build fails, add `prefetch={false}` to suppress preloading warnings.

2. **Google Map embed per city page**
   - What we know: `GoogleMapEmbed` component exists and is used on the service-areas hub page. SEO-15 mentions "Google Map embed on contact page and city hub pages."
   - What's unclear: Whether each city page should have its own map zoomed to that municipality, or if this is already satisfied by the service-areas hub.
   - Recommendation: Include a `GoogleMapEmbed` on each city page zoomed to that specific municipality (e.g., query="Jersey City, NJ" zoom=13). This adds local relevance and satisfies SEO-15 for city pages.

3. **Content voice consistency across 12 cities**
   - What we know: Phase 5 established the content voice (first-person expert, conversational, real-world scenarios). STATE.md mentions "content voice calibration" as a blocker concern.
   - What's unclear: Whether 12 separate content files will maintain consistent voice quality.
   - Recommendation: Write content data files in batches (Tier 1 cities first, then Tier 2, then Tier 3). Establish the voice pattern in the first file (Jersey City) and use it as the reference for the remaining 11.

## Sources

### Primary (HIGH confidence)
- [Schema.org RoofingContractor type](https://schema.org/RoofingContractor) -- Full property inheritance chain verified
- [Schema.org Service type](https://schema.org/Service) -- provider, areaServed, hasOfferCatalog properties verified
- [Schema.org LocalBusiness type](https://schema.org/LocalBusiness) -- areaServed, geo, address, makesOffer confirmed
- [Next.js generateStaticParams docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- async params pattern confirmed
- [Next.js Metadata API docs](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) -- generateMetadata pattern confirmed
- Codebase analysis: `src/data/municipalities.ts`, `src/data/testimonials.ts`, `src/data/types.ts`, `src/lib/seo/json-ld.tsx`, `src/app/(marketing)/services/commercial/[service]/page.tsx` -- Established patterns verified

### Secondary (MEDIUM confidence)
- [Momentic: Using @id in Schema.org for Knowledge Graphs](https://momenticmarketing.com/blog/id-schema-for-seo-llms-knowledge-graphs) -- @id hash-URI pattern, @graph technique, cross-page entity linking
- [Schema App: LocalBusiness Schema Markup](https://www.schemaapp.com/schema-markup/how-to-do-schema-markup-for-local-business/) -- areaServed best practices for multi-location
- [INSIDEA: Local SEO Guide for Roofing Companies 2026](https://insidea.com/blog/marketing/roofing-companies/ultimate-local-seo-guide/) -- One city per page, unique content strategy
- [Eseospace: Schema Markup for Contractor Websites](https://eseospace.com/blog/schema-markup-for-contractor-websites/) -- RoofingContractor implementation examples

### Tertiary (LOW confidence -- flagged for validation)
- None. All findings verified against Schema.org official types or codebase analysis.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- No new dependencies. All libraries already installed and patterns established.
- Architecture: HIGH -- Follows exact same data-content-components-assembly pattern from Phases 5-6. Codebase analysis confirms all reusable components exist.
- Pitfalls: HIGH -- Doorway page risk is well-documented. JSON-LD entity patterns verified against Schema.org official types. Word count budgeting based on Phase 5 precedent (2200+ words per service content file, expanded to 3000+ for city pages).
- JSON-LD/SEO: MEDIUM -- `@id` entity relationship pattern is best-practice from multiple credible sources but not officially mandated by Google. `knowsAbout` property support is broad but Google's explicit consumption is unclear.

**Research date:** 2026-03-25
**Valid until:** 2026-04-25 (stable domain -- schema.org types rarely change, Next.js patterns established)
