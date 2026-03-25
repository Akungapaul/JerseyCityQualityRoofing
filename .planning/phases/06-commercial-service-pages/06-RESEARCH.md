# Phase 6: Commercial Service Pages - Research

**Researched:** 2026-03-25
**Domain:** Commercial roofing service page implementation, content data architecture, component reuse from Phase 5
**Confidence:** HIGH

## Summary

Phase 6 builds 4 comprehensive commercial service pillar pages (Flat Roof Systems, Roof Maintenance, Commercial Repair, Commercial Replacement), each with 3000+ words of unique humanized content. This phase is a direct parallel to Phase 5 (residential service pages) and reuses the same template architecture, section components, and data patterns. The codebase is well-prepared: the stub page at `src/app/(marketing)/services/commercial/[service]/page.tsx` already has `generateStaticParams` wired to `getCommercialServiceSlugs()`, the `SERVICES` object in `services.ts` contains complete structured data for all 4 commercial services, and all 16+ reusable section components from Phase 5 are built and tested.

The primary work is: (1) creating 4 commercial content data files in `src/data/content/` following the `ServiceContent` type, (2) building one new component (`CommercialRelatedServicesRow`) to link between commercial services instead of residential, (3) rewriting the stub page.tsx into a full commercial service template using the exact StandardTemplate pattern from residential, and (4) extending the existing test suite to cover commercial content data. No new dependencies, no type changes, no emergency template logic -- all 4 commercial pages use the standard template.

**Primary recommendation:** Execute in 3-4 focused plans: (1) content data files for all 4 commercial services with tests, (2) CommercialRelatedServicesRow component, (3) page assembly wiring content + components + SEO metadata into the commercial page.tsx.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| COMM-01 | Flat Roof Systems service page (3000+ words) covering TPO, EPDM, modified bitumen, with process explainer, FAQ, testimonials, and quote form | Content data file `flat-roof-systems.ts` + standard template assembly; services.ts has processSteps (8), materials (4: TPO, EPDM, PVC, Modified Bitumen), costFactors (6), faqs (5). EPDM and modified bitumen are already in materials data. PVC is a bonus 4th material card. |
| COMM-02 | Roof Maintenance Programs service page (3000+ words) with preventative plans, inspection schedules, FAQ, and quote form | Content data file `roof-maintenance.ts` + standard template; services.ts has processSteps (6), materials (3: sealants, patch kits, coatings), costFactors (4), faqs (5) |
| COMM-03 | Commercial Repair service page (3000+ words) with large-scale repair, restoration, FAQ, testimonials, and quote form | Content data file `commercial-repair.ts` + standard template; services.ts has processSteps (6), materials (3: TPO patch, EPDM patch, polyiso), costFactors (4), faqs (5). Note: commercial-repair has `emergencyAvailable: true` but uses standard template per UI-SPEC (not emergency template) |
| COMM-04 | Commercial Replacement service page (3000+ words) with full tear-off process, material options, FAQ, testimonials, and quote form | Content data file `commercial-replacement.ts` + standard template; services.ts has processSteps (8), materials (4: TPO 60-80mil, PVC 60-80mil, BUR, polyiso tapered), costFactors (6), faqs (5) |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack**: Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4, Motion library, pnpm
- **Typography**: Cormorant Garamond (medium) for body, Cormorant for headings, minimum 18px body font
- **Content depth**: Minimum 3000 words per page -- non-negotiable for topical authority
- **Content style**: Placeholder content must be realistic and structured identically to final content (not lorem ipsum)
- **SEO**: Every page must have metadata exports, one h1, strict heading hierarchy, descriptive alt text, canonical URLs, JSON-LD structured data
- **Accessibility**: Semantic HTML, keyboard navigation, WCAG AA contrast, focus-visible styles
- **Component patterns**: Default to Server Components, `"use client"` only when needed
- **Naming**: kebab-case files, PascalCase components, camelCase hooks
- **No `any`**: Use `unknown` and narrow, or define proper types
- **Images**: `next/image` with explicit width/height and descriptive alt text
- **Links**: Internal links use `next/link`, phone numbers use `tel:` links
- **JSON-LD**: LocalBusiness JSON-LD on every page
- **GSD Workflow**: All edits through GSD commands

## Standard Stack

This phase uses no new dependencies. All libraries are already installed and verified.

### Core (already installed)

| Library | Version | Purpose | Phase 6 Usage |
|---------|---------|---------|---------------|
| next | 16.2.1 | Framework | App Router page, generateStaticParams, generateMetadata |
| react | 19.2.x | UI | Server Component page, Client Components for interactive sections |
| typescript | 5.7.x | Type safety | ServiceContent type for content files, Service type from data |
| tailwindcss | 4.1.x | Styling | All component styling via utility classes |
| motion | 12.x | Animation | ScrollReveal, FaqAccordion height animation, carousel |
| lucide-react | 0.477.x | Icons | CommercialRelatedServicesRow icon map, warning sign icons |
| schema-dts | 1.1.5 | JSON-LD types | Service + FAQPage schema types |
| embla-carousel-react | 8.6.0 | Carousel | TestimonialCarousel (reused) |

### No New Packages

No packages need to be installed. Phase 6 is entirely content + page assembly using existing infrastructure.

## Architecture Patterns

### Content Data File Pattern (established Phase 5)

Each commercial service gets a content data file in `src/data/content/` exporting a `const` satisfying `ServiceContent`:

```
src/data/content/
  flat-roof-systems.ts      # NEW (Phase 6)
  roof-maintenance.ts        # NEW (Phase 6)
  commercial-repair.ts       # NEW (Phase 6)
  commercial-replacement.ts  # NEW (Phase 6)
  roof-repair.ts             # Existing (Phase 5)
  roof-replacement.ts        # Existing (Phase 5)
  roof-inspection.ts         # Existing (Phase 5)
  emergency-roofing.ts       # Existing (Phase 5)
```

Each file follows the exact pattern from `roof-repair.ts`:
```typescript
import type { ServiceContent } from '@/data/types';

export const FLAT_ROOF_SYSTEMS_CONTENT: ServiceContent = {
  slug: 'flat-roof-systems',
  heroHeadline: '...',
  heroSubtitle: '...',
  introNarrative: `...`,       // ~500 words
  processNarrative: `...`,     // ~600 words
  materialsIntro: `...`,       // ~100 words
  costFactorsIntro: `...`,     // ~50 words
  warningSignsIntro: `...`,    // ~50 words
  warningSigns: [...],         // 5-6 WarningSign entries
  extendedFaqs: [...],         // 3-5 FAQ entries
};
```

**Export naming convention**: `SCREAMING_SNAKE_CASE` matching the service slug (e.g., `ROOF_MAINTENANCE_CONTENT`, `COMMERCIAL_REPAIR_CONTENT`, `COMMERCIAL_REPLACEMENT_CONTENT`).

### Page Assembly Pattern (established Phase 5)

The commercial page at `src/app/(marketing)/services/commercial/[service]/page.tsx` replaces the existing stub with:

1. Import all section components (same as residential minus emergency components)
2. Import 4 commercial content data files
3. Define `CONTENT_MAP: Record<string, ServiceContent>` mapping commercial slugs to content objects (no EmergencyContent union needed)
4. Define `getServiceContent()` helper for O(1) lookup
5. `generateStaticParams()` uses `getCommercialServiceSlugs()` (already wired in stub)
6. `generateMetadata()` uses service data with path `/services/commercial/[slug]`
7. Page component renders `StandardTemplate` directly (no emergency branching)
8. JSON-LD: `buildServicePageJsonLd()` + `buildFaqPageJsonLd()` (reuse from Phase 5)
9. OG image: `/api/og?service=[slug]` (existing route, works with any service slug)

### Key Differences from Residential Page

| Aspect | Residential | Commercial |
|--------|------------|------------|
| Slug helper | `getResidentialServiceSlugs()` | `getCommercialServiceSlugs()` |
| Canonical path | `/services/residential/[slug]` | `/services/commercial/[slug]` |
| Template branching | Standard + Emergency | Standard only (always) |
| Related services component | `RelatedServicesRow` | `CommercialRelatedServicesRow` (NEW) |
| Content data files | 4 residential | 4 commercial (NEW) |
| Emergency handling | `isEmergencyContent()` check | None needed |
| CTA Banner copy | "Ready to Protect Your Roof?" | "Ready to Protect Your Building?" |
| Content type | `ServiceContent \| EmergencyContent` | `ServiceContent` only |

### CommercialRelatedServicesRow Component

This is the only new component in Phase 6. It parallels `RelatedServicesRow` (74 lines) but with:

- Commercial URL prefix: `/services/commercial/[slug]` instead of `/services/residential/[slug]`
- Commercial icon map: `Layers` (flat-roof-systems), `ClipboardCheck` (roof-maintenance), `Wrench` (commercial-repair), `Building2` (commercial-replacement)
- Heading: "Related Commercial Services"

The component follows the exact structure and styling of the existing `RelatedServicesRow`. Server Component (no `"use client"` needed).

### Testimonial Availability per Commercial Service

Critical data for the planner -- determines whether testimonials section shows service-specific or all testimonials (fallback triggers at < 3):

| Service Slug | Testimonial Count | Behavior |
|-------------|-------------------|----------|
| flat-roof-systems | 4 | Shows service-specific (4 >= 3) |
| roof-maintenance | 3 | Shows service-specific (3 >= 3, exactly at threshold) |
| commercial-repair | 4 | Shows service-specific (4 >= 3) |
| commercial-replacement | 1 | Falls back to ALL testimonials (1 < 3) |

This is handled by the same logic in the residential page: `serviceTestimonials.length >= 3 ? serviceTestimonials : TESTIMONIALS`.

### FAQ Combination Pattern

Each commercial page combines FAQs from two sources (same pattern as residential):
- Base FAQs from `services.ts`: 5 per service
- Extended FAQs from content data file: 3-5 per service
- Combined total: 8-10 per page (matching UI-SPEC requirement)

```typescript
const combinedFaqs: FAQ[] = [...service.faqs, ...content.extendedFaqs];
```

### Breadcrumb Auto-Generation

The existing `Breadcrumbs` component auto-generates from pathname. For `/services/commercial/flat-roof-systems`:
- Home > Services > Commercial Services > Flat Roof Systems

The `SEGMENT_LABELS` record already maps `commercial` to "Commercial Services". The dynamic `[service]` segment falls through to `slugToTitle()` which converts kebab-case to Title Case. BreadcrumbList JSON-LD is auto-generated. No changes needed.

### OG Image Route Reuse

The existing `/api/og?service=[slug]` route at `src/app/api/og/route.tsx` already works with any service slug because it calls `getService(serviceSlug)` which looks up from the full `SERVICES` record (residential + commercial). No changes needed.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Page metadata | Custom meta tags | `generateMetadata()` + `generatePageMetadata()` | Already built and tested in residential |
| JSON-LD Service schema | Manual JSON construction | `buildServicePageJsonLd()` from `src/lib/seo/json-ld.tsx` | Type-safe, XSS-safe, already tested |
| JSON-LD FAQ schema | Manual FAQ JSON | `buildFaqPageJsonLd()` from `src/lib/seo/json-ld.tsx` | Already tested in Phase 5 |
| OG image generation | New OG route | Existing `/api/og?service=[slug]` route | Works with all services, residential and commercial |
| Breadcrumbs | Custom breadcrumb per page | Auto-generated `Breadcrumbs` component in marketing layout | Handles all routes automatically |
| Testimonial filtering | Custom filter logic | `getTestimonialsByService()` from `src/data/testimonials.ts` | Already handles all service slugs |
| Section wrappers | Custom containers per section | `SectionWrapper` with `tone` prop | Established pattern, consistent spacing |
| Scroll animations | Custom IntersectionObserver | `ScrollReveal` component | Handles prefers-reduced-motion, established pattern |
| Form integration | New form components | Existing `CompactQuoteForm` + `QuoteForm` with `defaultServiceType` prop | Already wired to Server Actions, Turnstile, Resend |

## Common Pitfalls

### Pitfall 1: Content Distinctiveness Between Commercial and Residential
**What goes wrong:** Commercial content reads like a rewrite of residential content with "building" swapped for "home." Google detects thin content and duplicate patterns.
**Why it happens:** Same writer, same service domain, tempting to reuse phrasing.
**How to avoid:** Commercial content must focus on: flat roof membrane systems (not pitched shingle roofs), property manager concerns (business continuity, tenant impact, capital budgets), commercial-specific problems (ponding water, HVAC curb leaks, drain failures, membrane shrinkage), and commercial materials (TPO, EPDM, PVC, modified bitumen, BUR) rather than residential materials (asphalt shingles, slate, metal).
**Warning signs:** Content mentions "homeowners" instead of "building owners/property managers", discusses pitched roof issues on a flat-roof page, or references residential neighborhoods instead of commercial areas.

### Pitfall 2: commercial-repair Using Emergency Template
**What goes wrong:** `commercial-repair` has `emergencyAvailable: true` in services.ts, which could trigger emergency template logic if code checks `emergencyAvailable` flag.
**Why it happens:** The residential page uses `service.emergencyAvailable === true && isEmergencyContent(content)` to decide template. The content type guard (`'whatToDoSteps' in content`) would correctly prevent emergency template since commercial-repair uses `ServiceContent` not `EmergencyContent`. But the cleaner approach is to not include the branch at all.
**How to avoid:** The commercial page should render `StandardTemplate` directly with no emergency branching. Do not import `EmergencyHero`, `WhatToDoSection`, `InsuranceClaimsSection`, or `StormDamageTypes`. Do not import `EmergencyContent` type.
**Warning signs:** The commercial page.tsx imports any emergency-specific components.

### Pitfall 3: Word Count Falling Short of 3000
**What goes wrong:** Content data file has ~2500 words, and the page totals less than 3000 when combined with services.ts structured data.
**Why it happens:** The 3000-word requirement counts total rendered words on the page, not just the content data file. services.ts contributes process step descriptions (~200 words), material descriptions (~300-500 words from materials array), cost factor descriptions (~150 words), and base FAQ answers (~400 words). But the content data file must still contribute ~2200-2500 words of prose.
**How to avoid:** The existing test pattern checks content data files for 2200+ words across all prose fields. Apply the same tests to commercial content files.
**Warning signs:** Content data file `introNarrative` is under 400 words, or `processNarrative` is under 450 words.

### Pitfall 4: RelatedServicesRow Instead of CommercialRelatedServicesRow
**What goes wrong:** Using the existing `RelatedServicesRow` component makes commercial pages link to `/services/residential/[slug]` instead of `/services/commercial/[slug]`.
**Why it happens:** Copy-paste from residential page template.
**How to avoid:** The commercial page must import and use `CommercialRelatedServicesRow`. The planner should make the new component a prerequisite before page assembly.
**Warning signs:** Commercial service pages have "Related Services" linking to residential routes.

### Pitfall 5: Metadata Title Missing "Services" Suffix
**What goes wrong:** Commercial pages get title "Flat Roof Systems | Jersey City Quality Roofing" instead of "Flat Roof Systems Services | Jersey City Quality Roofing".
**Why it happens:** The residential page uses `title: \`${service.name} Services\`` but the existing commercial stub just uses `title: service.name`.
**How to avoid:** Use the same pattern: `title: \`${service.name} Services\``.
**Warning signs:** HTML title tag missing "Services" keyword.

### Pitfall 6: CONTENT_MAP Keys Not Matching Service Slugs
**What goes wrong:** Content data file exports use a different slug than what `getCommercialServiceSlugs()` returns, causing `getServiceContent()` to return undefined and `notFound()` to fire.
**Why it happens:** Typo in slug field or CONTENT_MAP key.
**How to avoid:** Use the exact slugs from services.ts: `flat-roof-systems`, `roof-maintenance`, `commercial-repair`, `commercial-replacement`. The content data test suite should verify `content.slug` matches.
**Warning signs:** 404 errors on commercial service pages during dev testing.

## Code Examples

### Commercial Content Data File (exemplar)

Follow the exact structure of the residential content files. Source: `src/data/content/roof-repair.ts`.

```typescript
import type { ServiceContent } from '@/data/types';

// Word count: ~2500

export const FLAT_ROOF_SYSTEMS_CONTENT: ServiceContent = {
  slug: 'flat-roof-systems',
  heroHeadline: 'Commercial Flat Roof Systems for Hudson County Buildings',
  heroSubtitle:
    'TPO, EPDM, PVC, and modified bitumen systems engineered for your building\'s performance, budget, and longevity.',

  introNarrative: `[~500 words of first-person commercial expert voice...]`,
  processNarrative: `[~600 words expanding on the 8 process steps...]`,
  materialsIntro: `[~100 words about commercial flat roof material selection...]`,
  costFactorsIntro: `[~50 words about commercial pricing transparency...]`,
  warningSignsIntro: `[~50 words about commercial roof warning signs...]`,

  warningSigns: [
    {
      icon: 'Droplets',
      title: 'Ponding Water After 48 Hours',
      description: '[2-3 sentences about commercial ponding water scenario...]',
    },
    // ... 4-5 more commercial-specific warning signs
  ],

  extendedFaqs: [
    {
      question: 'How do you minimize disruption to building tenants during installation?',
      answer: '[3+ sentence answer about phased installation and tenant coordination...]',
    },
    // ... 2-4 more commercial-specific extended FAQs
  ],
};
```

### Commercial Page Template (target structure)

Source: `src/app/(marketing)/services/residential/[service]/page.tsx` (StandardTemplate function).

```typescript
// Key structural differences from residential:
// 1. No EmergencyContent imports or emergency template branching
// 2. CONTENT_MAP uses only ServiceContent (no union type)
// 3. Uses CommercialRelatedServicesRow instead of RelatedServicesRow
// 4. CTABanner has commercial-specific copy
// 5. Canonical URL uses /services/commercial/ prefix

const CONTENT_MAP: Record<string, ServiceContent> = {
  'flat-roof-systems': FLAT_ROOF_SYSTEMS_CONTENT,
  'roof-maintenance': ROOF_MAINTENANCE_CONTENT,
  'commercial-repair': COMMERCIAL_REPAIR_CONTENT,
  'commercial-replacement': COMMERCIAL_REPLACEMENT_CONTENT,
};

// StandardTemplate renders identically to residential standard template
// with two copy changes:
// - CTABanner heading: "Ready to Protect Your Building?"
// - CTABanner subtext: "Call now for a free commercial roof assessment
//   or request your no-obligation quote."
// - Related services: <CommercialRelatedServicesRow> instead of <RelatedServicesRow>
```

### CommercialRelatedServicesRow Component

Source: `src/components/sections/related-services-row.tsx` (74 lines).

```typescript
import Link from "next/link";
import { Layers, ClipboardCheck, Wrench, Building2, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getService } from "@/data/services";

const COMMERCIAL_ICON_MAP: Record<string, LucideIcon> = {
  "flat-roof-systems": Layers,
  "roof-maintenance": ClipboardCheck,
  "commercial-repair": Wrench,
  "commercial-replacement": Building2,
};

// Same structure as RelatedServicesRow but:
// - href uses /services/commercial/ prefix
// - heading says "Related Commercial Services"
// - icon map uses commercial icons
```

### Commercial Content Test Pattern

Source: `src/data/__tests__/service-content.test.ts` (158 lines).

```typescript
// Extend the existing test file by adding commercial content imports
// and including them in the STANDARD_CONTENTS and ALL_CONTENTS arrays.
// All existing test assertions (slug match, word counts, warning signs,
// extended FAQs, voice, local context) apply identically to commercial content.

import { FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/flat-roof-systems';
import { ROOF_MAINTENANCE_CONTENT } from '@/data/content/roof-maintenance';
import { COMMERCIAL_REPAIR_CONTENT } from '@/data/content/commercial-repair';
import { COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/commercial-replacement';

// Add to STANDARD_CONTENTS array:
{ name: 'flat-roof-systems', content: FLAT_ROOF_SYSTEMS_CONTENT },
{ name: 'roof-maintenance', content: ROOF_MAINTENANCE_CONTENT },
{ name: 'commercial-repair', content: COMMERCIAL_REPAIR_CONTENT },
{ name: 'commercial-replacement', content: COMMERCIAL_REPLACEMENT_CONTENT },
```

## Commercial Roofing Domain Knowledge

Essential context for writing realistic commercial content that differentiates from residential.

### Commercial vs Residential Roofing Differences

| Aspect | Residential | Commercial |
|--------|------------|------------|
| Roof type | Mostly pitched (sloped) | Mostly flat or low-slope |
| Materials | Asphalt shingles, slate, metal, tile | TPO, EPDM, PVC, modified bitumen, BUR |
| Scale | 1,000-3,000 sq ft | 5,000-200,000+ sq ft |
| Decision maker | Homeowner | Property manager, building owner, condo board |
| Cost structure | Per-project | Per-square-foot, often capital expense vs operating expense |
| Warranty | Workmanship + manufacturer | NDL (No Dollar Limit) manufacturer warranties |
| Drainage | Natural gravity on slope | Engineered: tapered insulation, interior drains, scuppers |
| Key concern | Aesthetics + leak prevention | Business continuity + lifecycle cost |
| Code requirements | Residential building code | Commercial building code (stricter wind uplift, energy R-value) |
| Process duration | 1-5 days | 2-12 weeks |
| Common problems | Missing shingles, ice dams, flashing failure | Ponding water, membrane shrinkage, drain clogs, HVAC curb leaks |

### Commercial Content Terminology

Use these terms in commercial content (NOT residential terms):

- "Building owner" / "property manager" (NOT "homeowner")
- "Membrane system" / "roof system" (NOT "shingles" / "roofing")
- "Flat roof" / "low-slope roof" (NOT "pitched roof")
- "Square foot" / "per square foot" (NOT "per square" for pricing)
- "NDL warranty" / "manufacturer warranty" (NOT just "warranty")
- "Core sampling" / "moisture mapping" (NOT "visual inspection only")
- "Tapered insulation" / "positive drainage" (NOT "gutters")
- "Membrane seam failure" / "ponding water" (NOT "missing shingles")
- "Building envelope" / "thermal performance" (NOT "attic ventilation")
- "Capital planning" / "lifecycle cost" (NOT just "repair cost")

### Commercial Warning Sign Categories (for content files)

Each service needs 5-6 unique warning signs. Commercial-specific scenarios:

**Flat Roof Systems:**
- Ponding water remaining 48+ hours after rain
- Membrane bubbling/blistering from trapped moisture
- Visible seam separation or fish-mouths
- HVAC curb flashing pulling away from membrane
- Interior water stains below drain locations
- Granule loss or bare spots on modified bitumen

**Roof Maintenance:**
- Debris accumulation around drains and scuppers
- Sealant cracking at flashings and penetrations
- Biological growth (algae, moss) on membrane surface
- Loose or displaced edge metal
- Increased energy costs indicating insulation degradation
- Tenant reports of ceiling stains or musty odors

**Commercial Repair:**
- Active leak during or after rain
- Visible membrane puncture or tear
- Flashing separation at parapet walls
- Drain backing up or ponding around drain bowl
- Membrane lifting at wind-exposed edges
- Interior mold growth indicating chronic moisture

**Commercial Replacement:**
- Multiple failed repair attempts
- Widespread moisture in core samples (>25% of roof area)
- Membrane beyond manufacturer's expected lifespan
- Energy bills increasing despite maintenance
- Structural deck deterioration visible
- Building code compliance issues (insulation R-value)

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | vitest.config.ts |
| Quick run command | `pnpm vitest run` |
| Full suite command | `pnpm vitest run --reporter=verbose` |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| COMM-01 | Flat Roof Systems content has 2200+ words, correct structure, commercial voice | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -x` | Exists -- needs commercial entries added |
| COMM-02 | Roof Maintenance content has 2200+ words, correct structure, commercial voice | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -x` | Exists -- needs commercial entries added |
| COMM-03 | Commercial Repair content has 2200+ words, correct structure, commercial voice | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -x` | Exists -- needs commercial entries added |
| COMM-04 | Commercial Replacement content has 2200+ words, correct structure, commercial voice | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -x` | Exists -- needs commercial entries added |
| COMM-01 | Flat Roof Systems page has TPO, EPDM, modified bitumen material cards | unit | `pnpm vitest run src/data/__tests__/services.test.ts -x` | Partially covered (services.ts data already tested) |
| ALL | Each commercial page has generateMetadata, JSON-LD, canonical URL | unit | `pnpm vitest run src/lib/__tests__/seo.test.ts -x` | Existing SEO tests cover metadata generation |
| ALL | Build succeeds with all 4 commercial pages | smoke | `pnpm build` | N/A (manual) |
| ALL | TypeScript compilation passes | smoke | `pnpm type-check` | N/A (manual) |

### Sampling Rate
- **Per task commit:** `pnpm vitest run`
- **Per wave merge:** `pnpm vitest run --reporter=verbose && pnpm type-check`
- **Phase gate:** Full suite green + `pnpm build` succeeds before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] Extend `src/data/__tests__/service-content.test.ts` -- add imports and entries for 4 commercial content files in STANDARD_CONTENTS and ALL_CONTENTS arrays
- [ ] Add commercial-specific voice test -- content should reference "building owners", "property managers", "flat roof", "membrane" rather than residential terminology
- [ ] No new test file needed -- existing test infrastructure covers all assertions

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate emergency branching per category | Category-specific templates (residential has standard+emergency; commercial has standard-only) | Phase 5 (2026-03-24) | Commercial page is simpler -- no template branching needed |
| Content in services.ts only | Dual-source: services.ts (structured data) + content files (prose) | Phase 5 (2026-03-24) | Separation of structured data from long-form prose. Pages pull from BOTH. |
| Custom metadata per page | `generatePageMetadata()` utility | Phase 1 (2026-03-22) | Consistent metadata across all pages with one function call |

## Open Questions

1. **Commercial-specific voice test assertions**
   - What we know: The existing voice test checks for "we"/"our" and Hudson County references, which will pass for commercial content too.
   - What's unclear: Should the test also assert commercial terminology ("building", "property manager", "membrane", "flat roof") to prevent residential-sounding content?
   - Recommendation: Add a light commercial voice check alongside the existing voice tests. Not a blocker -- just improves content quality assurance.

2. **commercial-replacement has only 1 testimonial**
   - What we know: The fallback logic shows all testimonials when < 3 match. This is the established behavior.
   - What's unclear: Whether having only 1 commercial-replacement testimonial looks odd in terms of SEO credibility.
   - Recommendation: Not a Phase 6 concern. The fallback to all testimonials is the correct behavior. Additional commercial-replacement testimonials can be added to `testimonials.ts` in a future phase if desired.

## Environment Availability

Step 2.6: SKIPPED (no external dependencies identified). Phase 6 is purely code and content changes using existing installed packages. All dependencies verified in prior phases. Tests confirmed passing (146/146).

## Sources

### Primary (HIGH confidence)
- **Codebase inspection** -- residential page template (`src/app/(marketing)/services/residential/[service]/page.tsx`), all 16+ section components, content data files, types.ts, services.ts, testimonials.ts, json-ld.tsx, OG route, breadcrumbs component
- **Phase 5 RESEARCH.md** -- established patterns and decisions
- **Phase 6 UI-SPEC.md** -- visual and interaction contract, component inventory, file map

### Secondary (MEDIUM confidence)
- **Commercial roofing domain knowledge** -- from training data, consistent with services.ts structured data already in the codebase (process steps, materials, cost factors, FAQs all use correct commercial terminology)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - no new dependencies, all verified and installed
- Architecture: HIGH - direct parallel of Phase 5 residential with minor variations fully documented in UI-SPEC
- Pitfalls: HIGH - patterns established in Phase 5, risks are well-understood copy-paste errors
- Content domain: HIGH - commercial roofing data already structured correctly in services.ts

**Research date:** 2026-03-25
**Valid until:** 2026-04-25 (stable -- no moving targets in this phase)
