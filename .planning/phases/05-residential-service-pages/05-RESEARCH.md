# Phase 5: Residential Service Pages - Research

**Researched:** 2026-03-24
**Domain:** Next.js service page implementation, long-form content architecture, JSON-LD structured data, dynamic OG image generation
**Confidence:** HIGH

## Summary

Phase 5 builds 4 comprehensive residential service pillar pages (Roof Repair, Roof Replacement, Roof Inspection, Emergency Roofing), each with 3000+ words of unique humanized content. The codebase is well-prepared: the stub page at `src/app/(marketing)/services/residential/[service]/page.tsx` already has `generateStaticParams` wired to the data registry, the `SERVICES` object in `services.ts` contains rich structured data (processSteps, materials, costFactors, faqs, commonProblems, relatedServices) for all 4 residential services, and all reusable section components (SectionWrapper, ScrollReveal, FaqAccordion, TestimonialCarousel, BadgeStrip, CTABanner, CompactQuoteForm, QuoteForm) are built and tested.

The primary work is: (1) creating 4 long-form content data files in `src/data/content/`, (2) building ~12 new section components per the UI-SPEC visual contract, (3) assembling the standard and emergency page templates, (4) extending the JSON-LD builder with a `buildServicePageJsonLd()` function using schema-dts types, (5) creating the `/api/og` route for dynamic OG images via `next/og` ImageResponse, and (6) adding a `serviceSlug` filter prop to TestimonialCarousel.

**Primary recommendation:** Execute in 4 waves -- (1) content data + content type definitions, (2) new section components, (3) page assembly with standard template for 3 pages + emergency template, (4) JSON-LD service schema + OG image route + metadata wiring.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Content hero style -- headline + subtext + dual CTA (phone + scroll-to-form) + compact 3-field form inline. Service-specific headline. No image -- content speaks.
- **D-02:** Trust-then-content section order: Hero (with compact form) -> BadgeStrip -> Service Intro (~500w) -> Process Explainer (vertical timeline) -> Materials Section (comparison cards) -> Cost Factors -> Mid-page CTA strip -> Testimonials (service-filtered carousel) -> Related Services (card row) -> FAQ Accordion (8-10 questions) -> Full QuoteForm -> CTABanner
- **D-03:** Mid-page inline CTA strip between Cost Factors and Testimonials
- **D-04:** New content data files in `src/data/content/` -- one per service. Long-form prose blocks. Existing `services.ts` stays as structured data. Page pulls from BOTH.
- **D-05:** Expert neighbor voice -- first-person "we", conversational but technically authoritative. Real-world Hudson County scenarios.
- **D-06:** Balanced word distribution (~3200 total): ~500w intro -> ~600w process -> ~500w materials -> ~400w cost factors -> ~500w warning signs -> ~400w+ FAQs
- **D-07:** Dedicated "Warning Signs You Need [Service]" section with 5-6 real-world scenarios per service
- **D-08:** Related Services cross-linking section -- 2-3 card links using relatedServices field
- **D-09:** Local context woven throughout all content blocks naturally
- **D-10:** Vertical timeline for process explainer -- numbered steps with connector lines, step title, duration badge
- **D-11:** Comparison cards grid for materials -- 2-col desktop, 1-col mobile, expandable pros/cons
- **D-12:** Emergency phone-first crisis hero -- oversized phone number, no compact form, "CALL NOW" 2x larger, warm amber/red-gold accent
- **D-13:** Emergency urgency-first section reorder with "What To Do Right Now" and "Insurance Claims Help" unique sections
- **D-14:** Emergency accent color (~#d4782f) for emergency-specific elements only
- **D-15:** Service + Offer + FAQ JSON-LD bundle per page with new buildServicePageJsonLd() function
- **D-16:** Template-driven metadata from service data registry via generateMetadata()
- **D-17:** Dynamic OG image via /api/og route using next/og ImageResponse
- **D-18:** Service-filtered testimonials with fallback to all if < 3 match
- **D-19:** Extended FAQ set -- 5+ base from services.ts + 3-5 additional in content files = 8-10 total

### Claude's Discretion
- Exact content prose and storytelling for each service's content data file
- Emergency page "What To Do Right Now" and "Insurance Claims Help" section content
- Specific warning signs scenarios per service type
- Storm damage types content and categories for emergency page
- Vertical timeline visual styling details (connector line thickness, step marker design)
- Material comparison card layout details (border, spacing, icon usage)
- Related Services card copy and linking logic
- Mid-page CTA strip exact copy and styling
- OG image template layout and typography
- Emergency amber accent exact hex value within the ~#d4782f to ~#c45a3c range
- Section-to-section ScrollReveal animation timing

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| RESI-01 | Roof Repair service page (3000+ words) with process explainer, materials, FAQ, testimonials, cost factors, quote form | Content data file `roof-repair.ts` + standard template assembly using all section components; services.ts already has processSteps (7), materials (4), costFactors (5), faqs (6) |
| RESI-02 | Roof Replacement service page (3000+ words) with process explainer, materials options, FAQ, testimonials, cost factors, quote form | Content data file `roof-replacement.ts` + standard template; services.ts has processSteps (7), materials (5), costFactors (6), faqs (6) |
| RESI-03 | Roof Inspection service page (3000+ words) with inspection types, FAQ, testimonials, quote form | Content data file `roof-inspection.ts` + standard template; services.ts has processSteps (5), materials/tools (3), costFactors (4), faqs (5) |
| RESI-04 | Emergency Roofing service page (3000+ words) with 24/7 emphasis, storm damage process, FAQ, prominent phone CTA | Content data file `emergency-roofing.ts` + emergency template with EmergencyHero, WhatToDoSection, StormDamageTypes, InsuranceClaimsSection; services.ts has processSteps (6), materials (3), costFactors (4), faqs (5) |
| CONT-07 | Process explainer content on each service page (step-by-step timelines) | ProcessTimeline component renders services.ts processSteps data with expanded storytelling from content data files |
| CONT-08 | All content in humanized voice: first-person storytelling, conversational, expert authority | Content data files use "expert neighbor voice" (D-05) with Hudson County local context (D-09) |
| CONT-09 | Minimum 3000 words per service page | D-06 balanced distribution targets ~3200 words; word count verifiable per content data file |
| SEO-02 | Service schema on all service pages with FAQ schema for rich snippets | buildServicePageJsonLd() function using schema-dts Service type + existing buildFaqPageJsonLd() for combined FAQ set |
</phase_requirements>

## Standard Stack

This phase uses no new dependencies. All libraries are already installed and verified.

### Core (already installed)

| Library | Version | Purpose | Phase 5 Usage |
|---------|---------|---------|---------------|
| next | 16.2.1 | Framework | App Router pages, generateStaticParams, generateMetadata, next/og ImageResponse |
| react | 19.2.4 | UI | Server Components (page), Client Components (interactive sections) |
| schema-dts | 1.1.5 | JSON-LD types | Service, OfferCatalog, FAQPage types for buildServicePageJsonLd() |
| motion | 12.38.0 | Animations | ScrollReveal, FaqAccordion, MaterialCards expand/collapse |
| embla-carousel-react | 8.6.0 | Carousel | TestimonialCarousel (existing, add filter prop) |
| lucide-react | 1.0.1+ | Icons | Section icons (AlertTriangle, Droplets, Wind, etc.) |
| tailwind-merge | 3.5.0 | Class merging | cn() utility in all components |
| clsx | 2.1.1 | Conditional classes | cn() utility |
| class-variance-authority | 0.7.1 | Variants | Button variants, impact badge variants |

### No New Dependencies Required

All 4 service pages are content-driven Server Components assembling existing and new section components. No new npm packages needed.

## Architecture Patterns

### Content Data Architecture (Two-Source Pattern)

```
src/data/
  services.ts              # Structured data: processSteps, materials, costFactors, faqs, relatedServices
  content/                  # NEW: Long-form prose content
    roof-repair.ts          # ~3200 words of narrative content
    roof-replacement.ts
    roof-inspection.ts
    emergency-roofing.ts
```

**Pattern:** Each service page pulls from BOTH sources:
- `services.ts` provides typed, structured data for components (ProcessTimeline, MaterialCards, CostFactorsSection, FaqAccordion)
- `content/*.ts` provides long-form prose strings for ServiceContentSection (intro narrative, warning signs scenarios, extended FAQs, emergency-specific sections)

**Type definition for content data files:**

```typescript
// src/data/types.ts additions
export interface WarningSign {
  icon: string;        // Lucide icon name
  title: string;
  description: string;
}

export interface ServiceContent {
  slug: string;
  heroHeadline: string;
  heroSubtitle: string;
  introNarrative: string;           // ~500 words
  processNarrative: string;         // Expanded per-step storytelling (~600w total)
  materialsIntro: string;           // ~100 word intro before material cards
  costFactorsIntro: string;         // ~50 word intro
  warningSignsIntro: string;        // ~50 word intro
  warningSigns: WarningSign[];      // 5-6 per service
  extendedFaqs: FAQ[];              // 3-5 additional FAQs beyond services.ts
}

export interface EmergencyContent extends ServiceContent {
  whatToDoSteps: EmergencyStep[];
  stormDamageTypes: StormDamageType[];
  insuranceClaims: InsuranceClaimsContent;
}

export interface EmergencyStep {
  title: string;
  description: string;
}

export interface StormDamageType {
  icon: string;
  name: string;
  description: string;
}

export interface InsuranceClaimsContent {
  intro: string;
  whatWeHandle: string[];
  whatToDocument: string[];
}
```

### Page Assembly Pattern (Server Component)

**Confidence:** HIGH -- follows the homepage pattern established in Phase 4.

The residential service page is a Server Component that:
1. Reads params to get service slug
2. Fetches service data from `getService(slug)`
3. Fetches content data from the content data file
4. Renders JsonLd blocks at top
5. Assembles sections in order per D-02 (standard) or D-13 (emergency)

```typescript
// Standard template pattern (Repair, Replacement, Inspection)
export default async function ResidentialServicePage({ params }) {
  const { service: slug } = await params;
  const service = getService(slug)!;
  const content = getServiceContent(slug);
  const combinedFaqs = [...service.faqs, ...content.extendedFaqs];
  const testimonials = getTestimonialsByService(slug);

  return (
    <>
      <JsonLd data={buildServicePageJsonLd(service) as unknown as Record<string, unknown>} />
      <JsonLd data={buildFaqPageJsonLd([...combinedFaqs]) as unknown as Record<string, unknown>} />

      <ServiceHero headline={content.heroHeadline} subtitle={content.heroSubtitle} serviceName={service.name} />
      <BadgeStrip />
      {/* ... remaining sections per D-02 order ... */}
      <CTABanner />
    </>
  );
}
```

**Emergency template diverges:** Uses `EmergencyHero` instead of `ServiceHero`, adds `WhatToDoSection`, `StormDamageTypes`, `InsuranceClaimsSection`, reorders sections per D-13, applies emergency accent color.

**Conditional rendering approach:** The page component checks `service.emergencyAvailable === true` to switch between standard and emergency templates. This avoids a separate page file while maintaining clear template separation.

### Component File Structure

```
src/components/sections/
  service-hero.tsx              # Standard service content hero
  emergency-hero.tsx            # Crisis-mode phone-first hero
  process-timeline.tsx          # Vertical timeline with steps
  material-cards.tsx            # Grid of expandable material cards
  cost-factors-section.tsx      # Cost factors list with impact badges
  warning-signs-section.tsx     # Warning signs grid cards
  mid-page-cta.tsx              # Compact CTA strip
  related-services-row.tsx      # Related service card links
  service-content-section.tsx   # Long-form prose renderer
  what-to-do-section.tsx        # Emergency only: immediate steps
  insurance-claims-section.tsx  # Emergency only: claims help
  storm-damage-types.tsx        # Emergency only: damage categories
```

### JSON-LD Service Schema Pattern

**Confidence:** HIGH -- verified against schema.org Service type documentation and existing json-ld.tsx patterns.

The `buildServicePageJsonLd()` function produces a Service schema with:
- `@type`: "Service"
- `name`: Service name
- `description`: Service full description
- `serviceType`: Category label (e.g., "Roof Repair")
- `provider`: RoofingContractor entity (reuses BUSINESS_INFO)
- `areaServed`: 12 Hudson County cities
- `hasOfferCatalog`: OfferCatalog with Offer items
- `url`: Canonical URL for the service page

The `schema-dts` package exports the `Service` type from its bundle (verified: `ServiceBase` interface includes `provider`, `areaServed`, `hasOfferCatalog`, `serviceType`, `offers`, `aggregateRating`). Use `WithContext<Service>` return type.

```typescript
import type { Service, WithContext } from 'schema-dts';

export function buildServicePageJsonLd(
  service: ServiceData,
  canonicalUrl: string
): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.fullDescription,
    serviceType: service.name,
    url: canonicalUrl,
    provider: {
      '@type': 'RoofingContractor',
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phone,
      address: { /* PostalAddress */ },
    },
    areaServed: BUSINESS_INFO.serviceAreas.map(area => ({
      '@type': 'City' as const,
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Services`,
      itemListElement: [{
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.shortDescription,
        },
      }],
    },
  };
}
```

**Important:** The existing pattern casts JSON-LD objects with `as unknown as Record<string, unknown>` when passing to the `JsonLd` component. This is necessary because the `JsonLd` component accepts `Record<string, unknown>` while schema-dts returns deeply typed objects. Follow the same cast pattern established in the homepage.

### Dynamic OG Image Pattern

**Confidence:** HIGH -- verified against official Next.js 16.2.1 ImageResponse documentation.

```typescript
// src/app/api/og/route.tsx
import { ImageResponse } from 'next/og';
import { getService } from '@/data/services';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceSlug = searchParams.get('service');
  const service = serviceSlug ? getService(serviceSlug) : null;

  // Load Cormorant font (ttf preferred for ImageResponse)
  const fontData = await fetch(
    new URL('https://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIq75u9.ttf')
  ).then(res => res.arrayBuffer());

  return new ImageResponse(
    (
      <div style={{ /* JSX layout */ }}>
        {service?.name ?? 'Jersey City Quality Roofing'}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Cormorant', data: fontData, weight: 700, style: 'normal' }],
    }
  );
}
```

**Font handling:** ImageResponse supports ttf, otf, and woff (NOT woff2). The Cormorant font from Google Fonts is available as ttf via the gstatic URL. Fetch it at runtime in the edge function. No need to store a font file locally, but for reliability and performance, downloading the ttf to `public/fonts/` and loading via `readFile` is recommended for non-edge deployments. Since this project deploys to Vercel (edge-compatible), fetching from gstatic works.

**Metadata integration:** The `generateMetadata()` function in the page file should reference the OG image route:

```typescript
openGraph: {
  images: [{
    url: `/api/og?service=${service.slug}`,
    width: 1200,
    height: 630,
    alt: `${service.name} - Jersey City Quality Roofing`,
  }],
}
```

### TestimonialCarousel Filter Pattern

The existing `TestimonialCarousel` already accepts an optional `testimonials` prop. Per D-18, the service page should:

```typescript
const serviceTestimonials = getTestimonialsByService(service.slug);
const displayTestimonials = serviceTestimonials.length >= 3
  ? serviceTestimonials
  : TESTIMONIALS;

<TestimonialCarousel testimonials={displayTestimonials} />
```

**Verified:** `getTestimonialsByService()` already exists in `testimonials.ts`. The filtering logic belongs in the page component (Server Component), not inside the carousel (Client Component), to avoid shipping the full TESTIMONIALS array to the client when only a filtered subset is needed.

### Anti-Patterns to Avoid

- **Inline content in JSX:** All prose content goes in data files, not hard-coded in component JSX. This maintains the data-driven pattern and enables future CMS migration.
- **Client Components for static sections:** ProcessTimeline, MaterialCards, CostFactorsSection, WarningSignsSection, ServiceContentSection, RelatedServicesRow should be Server Components. Only MaterialCards needs a thin client wrapper for the expand/collapse toggle (or use the `details/summary` HTML element for zero-JS expand).
- **Separate page files per service:** Use a single `[service]/page.tsx` with conditional template rendering based on `service.emergencyAvailable`, not 4 separate page files.
- **Fetching content at runtime:** All content is static TypeScript data. No `fetch()` calls, no database reads. The pages are fully static-renderable via `generateStaticParams`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| FAQ accordion | Custom collapse logic | Existing `FaqAccordion` component | Already built with Motion animations and full ARIA support in Phase 4 |
| Testimonial carousel | Custom slider | Existing `TestimonialCarousel` with filter | Embla carousel with autoplay, loop, keyboard nav already built |
| Form handling | Manual form state | Existing `CompactQuoteForm` + `QuoteForm` | React Hook Form + Zod + Turnstile already wired in Phase 3 |
| JSON-LD rendering | Manual script injection | Existing `JsonLd` component | XSS-safe renderer with proper escaping already built |
| Section spacing | Custom containers | Existing `SectionWrapper` | Consistent padding/max-width/tone system already established |
| Scroll animations | Custom Intersection Observer | Existing `ScrollReveal` | Motion-based with prefers-reduced-motion already handled |
| Schema type safety | Manual JSON objects | `schema-dts` WithContext types | Google-maintained TypeScript types prevent schema errors at compile time |
| OG image generation | Canvas/sharp manual | `next/og` ImageResponse | Built-in JSX-to-PNG with edge runtime, Satori + resvg |
| CTA banner | New component | Existing `CTABanner` with custom heading/subtext props | Already accepts heading and subtext as optional props |
| Badge strip | New component | Existing `BadgeStrip` | No modifications needed |

## Common Pitfalls

### Pitfall 1: Word Count Shortfall
**What goes wrong:** Content feels thin because the structured data in services.ts (processSteps text, material descriptions, FAQ answers) counts toward total words but the narrative content in the data files does not reach sufficient depth.
**Why it happens:** The ~3200 word target per D-06 splits across multiple sources. services.ts processSteps have ~100 words each (7 steps = ~700 words) but the expanded storytelling per step in the content file adds ~600 more. It is easy to undercount.
**How to avoid:** Each content data file should be self-contained with word counts documented in inline comments. Target: introNarrative (~500w), warningSignsIntro + 6 signs (~500w), extendedFaqs answers (~400w), processNarrative expansions (~600w in services.ts steps + storytelling). The structured data in services.ts contributes ~1000 words (steps + materials + cost factors + base FAQs). Content files must add ~2200+ words.
**Warning signs:** Any section rendering less than 3 paragraphs of prose. FAQ answers shorter than 3 sentences.

### Pitfall 2: Emergency Page Using Standard Template
**What goes wrong:** The emergency page accidentally renders the standard hero and section order instead of the crisis-mode layout.
**Why it happens:** The conditional template switch is easy to miss in a single page file.
**How to avoid:** Explicit conditional at the top of the page component: `const isEmergency = service.emergencyAvailable === true;`. Use separate JSX blocks for standard vs emergency rendering, not inline conditionals scattered throughout.
**Warning signs:** Emergency page showing CompactQuoteForm in hero instead of oversized phone number.

### Pitfall 3: schema-dts Type Casting Issues
**What goes wrong:** TypeScript errors when passing schema-dts typed objects to the `JsonLd` component which accepts `Record<string, unknown>`.
**Why it happens:** schema-dts uses deep branded types that do not satisfy `Record<string, unknown>`.
**How to avoid:** Follow the established pattern: `buildServicePageJsonLd(service) as unknown as Record<string, unknown>`. This double-cast is the project convention (used in homepage, contact page).
**Warning signs:** TypeScript errors about incompatible types on JsonLd data prop.

### Pitfall 4: OG Image Font Loading Failure
**What goes wrong:** OG images render with a fallback sans-serif font instead of Cormorant.
**Why it happens:** ImageResponse only supports ttf, otf, and woff. If the font URL returns woff2 or the fetch fails silently, the font data is invalid.
**How to avoid:** Use the direct Google Fonts ttf URL (not the CSS URL). Test the OG route locally with `curl http://localhost:3000/api/og?service=roof-repair > test.png`. Consider downloading the Cormorant ttf to `public/fonts/` as a fallback.
**Warning signs:** OG images appearing with generic font in social sharing previews.

### Pitfall 5: Testimonial Filter Returning Empty Array
**What goes wrong:** A service page shows no testimonials because `getTestimonialsByService()` returns an empty array and the fallback threshold check is wrong.
**Why it happens:** The threshold is `< 3` per D-18 but there might be exactly 0 matching testimonials for some services.
**How to avoid:** Verified: every residential service slug has testimonials in the data (roof-repair: 8+, roof-replacement: 8+, roof-inspection: 6+, emergency-roofing: 5+). The `>= 3` check is safe. Still implement the fallback as documented.
**Warning signs:** TestimonialCarousel rendering with 0 slides.

### Pitfall 6: Heading Hierarchy Violation
**What goes wrong:** Multiple h1 tags on the page, or h3 used without an enclosing h2.
**Why it happens:** Section components each render their own heading. If a component assumes h2 but is nested inside another heading context, the hierarchy breaks.
**How to avoid:** The page has exactly ONE h1 in the hero. Every section component renders h2. Items within sections (FAQ questions, material names, process steps, warning signs) render h3. This is specified in the UI-SPEC accessibility section.
**Warning signs:** Browser dev tools heading outline showing skipped levels.

## Code Examples

### Existing Homepage Page Assembly (reference pattern)

```typescript
// Source: src/app/(marketing)/page.tsx
export default function HomePage() {
  return (
    <>
      <JsonLd data={buildAggregateRatingJsonLd(TESTIMONIALS) as unknown as Record<string, unknown>} />
      <JsonLd data={buildFaqPageJsonLd([...HOMEPAGE_FAQS]) as unknown as Record<string, unknown>} />
      <HeroSection />
      <CompactQuoteForm />
      <BadgeStrip />
      <ServicesGrid />
      {/* ... more sections ... */}
      <CTABanner />
    </>
  );
}
```

### Existing JsonLd Renderer

```typescript
// Source: src/lib/seo/json-ld.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
```

### Existing TestimonialCarousel Interface

```typescript
// Source: src/components/sections/testimonial-carousel.tsx
interface TestimonialCarouselProps {
  testimonials?: readonly Testimonial[];
}
// Already accepts filtered testimonials -- no component modification needed
```

### Existing FaqAccordion Interface

```typescript
// Source: src/components/sections/faq-accordion.tsx
interface FaqAccordionProps {
  faqs: readonly FAQ[];
  defaultOpenIndex?: number;
  className?: string;
}
// Accepts combined FAQ arrays directly -- no modification needed
```

### Existing CompactQuoteForm Interface

```typescript
// Source: src/components/forms/compact-quote-form.tsx
interface CompactQuoteFormProps {
  defaultServiceType?: string;
}
// Already supports pre-selecting service type
```

### Existing Service Data Accessor

```typescript
// Source: src/data/services.ts
export function getService(slug: string): Service | undefined {
  return SERVICES[slug as keyof typeof SERVICES];
}
```

### Existing Testimonial Filter

```typescript
// Source: src/data/testimonials.ts
export function getTestimonialsByService(serviceSlug: string): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.serviceSlug === serviceSlug);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next/server` ImageResponse | `next/og` ImageResponse | Next.js 14.0.0 | Import path changed; use `import { ImageResponse } from 'next/og'` |
| Static OG images | Dynamic per-page OG images via ImageResponse | Next.js 13.0.0+ | Each of 4 service pages gets a unique social card |
| Separate Service + FAQPage schemas | Combined in single page with multiple JsonLd blocks | Current best practice | Multiple JSON-LD scripts per page are valid; Google parses all |
| `next-seo` package | Built-in Metadata API | Next.js 13+ App Router | `generateMetadata()` handles everything natively |

**Deprecated/outdated:**
- `@vercel/og` standalone package: Now bundled as `next/og` in Next.js 14+
- `ImageResponse` from `next/server`: Moved to `next/og` in v14.0.0

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | `vitest.config.ts` |
| Quick run command | `pnpm test` |
| Full suite command | `pnpm test` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| RESI-01 | Roof Repair content data exists with all required fields | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -t "roof-repair"` | Wave 0 |
| RESI-02 | Roof Replacement content data exists with all required fields | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -t "roof-replacement"` | Wave 0 |
| RESI-03 | Roof Inspection content data exists with all required fields | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -t "roof-inspection"` | Wave 0 |
| RESI-04 | Emergency content has whatToDoSteps, stormDamageTypes, insuranceClaims | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -t "emergency"` | Wave 0 |
| CONT-07 | Each service has processSteps with step > 0 | unit | `pnpm vitest run src/data/__tests__/services.test.ts -t "processSteps"` | Exists (services.test.ts) |
| CONT-08 | Content uses first-person voice (contains "we", "our") | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -t "voice"` | Wave 0 |
| CONT-09 | Each content data file exceeds 2200 words (+ ~1000 from services.ts = 3200+) | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -t "word count"` | Wave 0 |
| SEO-02 | buildServicePageJsonLd returns valid Service schema with provider, areaServed | unit | `pnpm vitest run src/lib/__tests__/json-ld.test.ts -t "buildServicePageJsonLd"` | Wave 0 (extend existing) |

### Sampling Rate
- **Per task commit:** `pnpm test`
- **Per wave merge:** `pnpm test && pnpm lint && pnpm type-check`
- **Phase gate:** Full suite green + `pnpm build` success before verification

### Wave 0 Gaps
- [ ] `src/data/__tests__/service-content.test.ts` -- covers RESI-01 through RESI-04, CONT-08, CONT-09
- [ ] `src/lib/__tests__/json-ld.test.ts` -- extend with buildServicePageJsonLd tests for SEO-02

## Open Questions

1. **Cormorant Font for OG Images**
   - What we know: ImageResponse supports ttf/otf/woff. Cormorant is available from Google Fonts as ttf via gstatic URL.
   - What is unclear: Whether the gstatic URL is stable for production use or if it changes. The edge runtime fetch may be rate-limited.
   - Recommendation: Download `Cormorant-Bold.ttf` to `public/fonts/` directory and load via URL in edge function: `fetch(new URL('/fonts/Cormorant-Bold.ttf', request.url))`. This removes the external dependency.

2. **Emergency Accent CSS Variable Scope**
   - What we know: D-14 specifies `--color-emergency-accent: #d4782f` in globals.css @theme block. UI-SPEC confirms.
   - What is unclear: Whether Tailwind CSS 4's @theme block allows variables that are only used conditionally on one page without generating unused utility classes for all pages.
   - Recommendation: Add the variable to `@theme` as specified. Tailwind 4 tree-shakes unused utilities at build time, so the variable being declared but only referenced on the emergency page is fine. The corresponding utility classes (e.g., `text-emergency-accent`, `bg-emergency-accent`) will only ship in CSS if actually used in templates.

## Environment Availability

Step 2.6: SKIPPED (no external dependencies identified). This phase is purely code/content changes using the existing Next.js + Tailwind + TypeScript stack. All dependencies are installed per package.json. Verified: `pnpm test` runs 76 tests green, `pnpm build` would use only installed packages.

## Sources

### Primary (HIGH confidence)
- schema-dts `ServiceBase` interface -- verified in `node_modules/schema-dts/dist/schema.d.ts` (line 9650+): includes `provider`, `areaServed`, `hasOfferCatalog`, `serviceType`, `offers`, `aggregateRating`
- [Next.js ImageResponse API](https://nextjs.org/docs/app/api-reference/functions/image-response) -- import from `next/og`, supports ttf/otf/woff fonts, width/height/fonts options, edge runtime recommended
- [Schema.org Service type](https://schema.org/Service) -- properties: name, description, provider, areaServed, hasOfferCatalog, serviceType, offers, category
- [Schema.org hasOfferCatalog](https://schema.org/hasOfferCatalog) -- OfferCatalog with itemListElement of Offer objects
- Existing codebase files (verified via direct read): services.ts, testimonials.ts, json-ld.tsx, metadata.ts, types.ts, homepage page.tsx, all section components

### Secondary (MEDIUM confidence)
- [Schema.org Service markup for contractors](https://www.harrisweb.ca/blog/schema-markup-for-local-business-service-page/) -- one Service schema per service page, provider as RoofingContractor subtype
- [Next.js OG image generation guide](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) -- opengraph-image.tsx convention and route handler approach

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already installed and in use across prior phases
- Architecture: HIGH -- extends established patterns (page assembly, data-driven content, JSON-LD builders)
- Content structure: HIGH -- CONTEXT.md provides extremely detailed decisions with word count targets
- JSON-LD schema: HIGH -- schema-dts types verified, Service interface confirmed
- OG image generation: HIGH -- Next.js ImageResponse API verified against official docs
- Pitfalls: HIGH -- based on actual code inspection and type system analysis

**Research date:** 2026-03-24
**Valid until:** 2026-04-24 (stable -- all technologies are production-mature)
