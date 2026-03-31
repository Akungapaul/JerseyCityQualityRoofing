# Phase 11: SEO & Data Consistency Fixes - Research

**Researched:** 2026-03-31
**Domain:** SEO infrastructure repair, JSON-LD entity graph, NAP consistency, content silo architecture
**Confidence:** HIGH

## Summary

Phase 11 closes the four remaining gaps identified in the v1.0 milestone audit. All gaps are code-level consistency issues rather than structural or architectural problems. The site's 150+ pages are complete, but three integration wiring issues and one partially-satisfied requirement prevent a clean milestone pass.

The four fixes are: (1) three missing silo index pages at `/services`, `/services/residential`, and `/services/commercial` that cause breadcrumb 404s on ~104 pages; (2) a missing `@id` anchor on the root `buildRoofingContractorJsonLd` that leaves the cross-page JSON-LD entity graph with dangling pointers on ~108 pages; (3) the OG image route hardcodes both the phone number and company name instead of importing from constants; and (4) the sitemap.ts omits the three new silo index URLs.

**Primary recommendation:** Fix all four issues in order of impact: silo index pages first (they affect 104 pages with user-facing 404s), JSON-LD anchor second (108 pages of broken entity graph for crawlers), OG route constants third, and sitemap entries fourth. Total code change is under 150 lines across 4-5 files.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SEO-14 | NAP (Name, Address, Phone) consistency across all pages, aligned with Google Business Profile | The contact page metadata description already uses `${PHONE_NUMBER}` constant (verified in current codebase). The google-map-embed.tsx noscript fallback also already uses the `query` prop (no hardcoded address). The remaining violation is the OG image route (`src/app/api/og/route.tsx` lines 86 and 99) which hardcodes both the company name and phone number instead of importing `SITE_NAME` and `PHONE_NUMBER` from `@/lib/constants`. |
| FNDN-02 | Siloed URL architecture with nested dynamic segments for service-type and location branches | Three intermediate silo index pages are missing: `/services`, `/services/residential`, `/services/commercial`. The route directories exist (`src/app/(marketing)/services/`, `services/residential/`, `services/commercial/`) but contain only `[service]/` dynamic segments with no `page.tsx` at the index level. These pages must be created to complete the siloed URL architecture. |
| SEO-06 | Breadcrumb navigation on every page (auto-generated from route hierarchy) with BreadcrumbList schema | The breadcrumb component (`src/components/layout/breadcrumbs.tsx`) correctly generates links from pathname segments using `SEGMENT_LABELS` mapping. It already has correct labels for "services", "residential", and "commercial" segments. The links resolve to paths that currently 404. Creating the three silo index pages fixes the breadcrumbs automatically -- no changes to the breadcrumb component needed. |
| SEO-04 | Knowledge graph JSON-LD mapping entity relationships | `buildCityRoofingContractorJsonLd` (line 179) and `buildServiceInCityJsonLd` (line 244) both reference `'@id': '${BASE_URL}/#organization'` as the provider identity. The root `buildRoofingContractorJsonLd` (lines 6-33) does NOT declare this `@id`. Adding `'@id': \`${BASE_URL}/#organization\`` to the root builder completes the entity graph chain so Google can resolve cross-page references. |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack**: Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4, pnpm
- **Typography**: Cormorant Garamond (medium) for body, Cormorant for headings, minimum 18px body font
- **SEO**: Every page must have metadata exports, one h1, strict heading hierarchy, descriptive alt text, canonical URLs, JSON-LD structured data
- **Accessibility**: Semantic HTML, keyboard navigation, WCAG AA contrast, focus-visible styles
- **Content depth**: Minimum 3000 words per page (applies to content pages, not applicable to silo index pages which are navigation hubs)
- **Component patterns**: Default to Server Components, `"use client"` only when needed
- **Naming**: kebab-case files, PascalCase components, camelCase hooks
- **Internal links**: Use `next/link`, not raw `<a>` tags

## Detailed Gap Analysis

### Gap 1: Missing Silo Index Pages (FNDN-02, SEO-06)

**Current state:**
- `src/app/(marketing)/services/` has NO `page.tsx` -- only `residential/` and `commercial/` subdirectories
- `src/app/(marketing)/services/residential/` has NO `page.tsx` -- only `[service]/` dynamic route
- `src/app/(marketing)/services/commercial/` has NO `page.tsx` -- only `[service]/` dynamic route

**Impact:** ~104 pages have breadcrumb links to these three URLs. Every service pillar page (8 pages) and service-in-city page (96 pages) generates breadcrumb crumbs for "Services", "Residential Services", or "Commercial Services" that link to these missing paths.

**Breadcrumb component behavior (verified):**
- `SEGMENT_LABELS` map already has correct labels: `services: "Services"`, `residential: "Residential Services"`, `commercial: "Commercial Services"`
- Links are built from pathname segments -- fixing is purely about creating destination pages
- No changes needed to the breadcrumb component itself

**Existing pattern to follow:** The blog hub page (`src/app/(marketing)/blog/page.tsx`) and service areas hub page (`src/app/(marketing)/service-areas/page.tsx`) are the closest analogues. Both:
1. Export `metadata` via `generatePageMetadata()`
2. Use `JsonLd` with `buildCollectionPageJsonLd()` + `buildRoofingContractorJsonLd()`
3. Have a hero section with `SectionWrapper` + `ScrollReveal` + `h1`
4. List child pages as card grids
5. Include `CTABanner` at the bottom

**Data access pattern:** `getServicesByCategory('residential')` and `getServicesByCategory('commercial')` already exist in `src/data/services.ts` -- they return arrays of `Service` objects with `name`, `slug`, `category`, `shortDescription`, etc.

**Sitemap gap:** `src/app/sitemap.ts` does NOT include entries for `/services`, `/services/residential`, or `/services/commercial`. These must be added to the static pages array.

### Gap 2: JSON-LD Entity Anchor (SEO-04)

**Current state:**
- `buildRoofingContractorJsonLd()` (lines 6-33 of `json-ld.tsx`) is used in the root layout (`src/app/layout.tsx` line 41) and emitted on EVERY page
- It does NOT include `'@id'` property
- `buildCityRoofingContractorJsonLd()` (line 179) DOES include `'@id': \`${BASE_URL}/#organization\``
- `buildServiceInCityJsonLd()` (line 244) references `'@id': \`${BASE_URL}/#organization\`` in its `provider` object

**Impact:** ~108 pages (12 city hubs + 96 service-in-city pages) reference the `@id` anchor that the root schema never declares. Google's structured data processor cannot resolve the cross-page entity chain.

**Fix:** Add `'@id': \`${BASE_URL}/#organization\`` to `buildRoofingContractorJsonLd()`. This is a one-line addition.

**Risk consideration:** The existing `buildCityRoofingContractorJsonLd` also declares `@id: ${BASE_URL}/#organization`. This is CORRECT behavior -- having multiple pages declare the same `@id` for the same entity is how Google reconciles entity identity across pages. The root declaration establishes the canonical anchor.

### Gap 3: OG Image Route Hardcoding (SEO-14)

**Current state (verified):**
- `src/app/api/og/route.tsx` line 86: Hardcoded `"Jersey City Quality Roofing"` instead of `SITE_NAME`
- `src/app/api/og/route.tsx` line 99: Hardcoded `"(201) 555-0123"` instead of `PHONE_NUMBER`
- Zero imports from `@/lib/constants` or `@/data/business-info`
- Route uses `export const runtime = 'edge'`

**Edge runtime compatibility:** `PHONE_NUMBER` and `SITE_NAME` from `@/lib/constants` are pure string constants with no Node.js dependencies. They are safe to import in Edge runtime.

**Important clarification:** The audit also flagged the contact page metadata description and google-map-embed noscript fallback. Verification of the current codebase shows:
- Contact page metadata (line 15): ALREADY uses `${PHONE_NUMBER}` -- this was fixed since the audit
- Google-map-embed noscript (lines 40-44): ALREADY uses the `query` prop (passed from contact page using `BUSINESS_INFO` fields) -- no hardcoded address exists
- Only the OG route remains unfixed

### Gap 4: Sitemap Completeness

**Current state:** `src/app/sitemap.ts` static pages array does not include:
- `${BASE_URL}/services` (new silo index)
- `${BASE_URL}/services/residential` (new silo index)
- `${BASE_URL}/services/commercial` (new silo index)

**Fix:** Add three entries to the `staticPages` array with appropriate `changeFrequency: 'monthly'` and `priority: 0.8` (matching service area hub).

## Architecture Patterns

### Silo Index Page Structure
```
src/app/(marketing)/services/
  page.tsx                    # NEW: /services silo root index
  residential/
    page.tsx                  # NEW: /services/residential category index
    [service]/
      page.tsx                # EXISTS: individual service pages
      [city]/
        page.tsx              # EXISTS: service-in-city pages
  commercial/
    page.tsx                  # NEW: /services/commercial category index
    [service]/
      page.tsx                # EXISTS: individual service pages
      [city]/
        page.tsx              # EXISTS: service-in-city pages
```

### Silo Index Page Pattern (from existing blog/service-areas hubs)
```typescript
// Source: verified from src/app/(marketing)/blog/page.tsx pattern
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildCollectionPageJsonLd, buildRoofingContractorJsonLd } from '@/lib/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { getServicesByCategory } from '@/data/services';
// ... section components

export const metadata: Metadata = generatePageMetadata({
  title: 'Residential Roofing Services | Jersey City Quality Roofing',
  description: '...',
  path: '/services/residential',
});

export default function ResidentialServicesPage() {
  const services = getServicesByCategory('residential');
  return (
    <>
      <JsonLd data={buildCollectionPageJsonLd({...}) as unknown as Record<string, unknown>} />
      <JsonLd data={buildRoofingContractorJsonLd() as unknown as Record<string, unknown>} />
      {/* Hero, service card grid, CTA */}
    </>
  );
}
```

### JSON-LD @id Anchor Pattern
```typescript
// Source: verified from src/lib/seo/json-ld.tsx
export function buildRoofingContractorJsonLd(): WithContext<RoofingContractor> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': `${BASE_URL}/#organization`, // ADD THIS LINE
    name: BUSINESS_INFO.name,
    // ... rest unchanged
  };
}
```

### Anti-Patterns to Avoid
- **Do NOT modify the Breadcrumbs component** -- the fix is creating destination pages, not changing breadcrumb generation logic
- **Do NOT create redirect routes** -- silo index pages must be real content pages with genuine navigation value for both users and crawlers
- **Do NOT remove `@id` from city JSON-LD** -- multiple pages declaring the same `@id` for the same entity is correct Schema.org behavior
- **Do NOT import BUSINESS_INFO in the OG route** -- it pulls in more data than needed. Import only `SITE_NAME` and `PHONE_NUMBER` from `@/lib/constants` for minimal edge bundle

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Service listing for silo index pages | Manual service arrays | `getServicesByCategory('residential')` / `getServicesByCategory('commercial')` from `src/data/services.ts` | Already exists, returns typed `Service[]` with all needed fields |
| Silo page metadata | Inline metadata objects | `generatePageMetadata()` from `src/lib/seo/metadata.ts` | Handles canonical URLs, OpenGraph, and title template consistently |
| Collection schema for index pages | Custom JSON-LD objects | `buildCollectionPageJsonLd()` from `src/lib/seo/json-ld.tsx` | Already used by blog and guides hub pages |
| Service card UI for listing pages | New card components | Existing section components from the codebase | Reuse patterns from service areas or blog hub pages |

## Common Pitfalls

### Pitfall 1: Edge Runtime Import Chain
**What goes wrong:** Importing `BUSINESS_INFO` from `@/data/business-info` in the OG route could pull in the `types.ts` module which may transitively import Node.js-only modules.
**Why it happens:** Edge runtime has a restricted API surface. Deep import chains can accidentally include Node.js built-ins.
**How to avoid:** Import only `SITE_NAME` and `PHONE_NUMBER` from `@/lib/constants`. This file exports only four simple string constants with zero dependencies.
**Warning signs:** Build error mentioning "Module not found" or "Dynamic Code Evaluation" in edge runtime.

### Pitfall 2: Silo Index Pages Too Thin
**What goes wrong:** Creating minimal skeleton pages that Google views as thin content or doorway pages.
**Why it happens:** Treating silo index pages as purely navigational with no real content value.
**How to avoid:** Each silo index page should have: a descriptive h1 and intro paragraph, a grid of child service cards with short descriptions, schema markup (CollectionPage), and a CTA. They do NOT need 3000 words (these are navigation hubs, not content pages), but they should provide genuine user value.
**Warning signs:** High bounce rate, low time-on-page.

### Pitfall 3: Root Services Page Content Overlap
**What goes wrong:** The `/services` root page duplicates content from the homepage services grid.
**Why it happens:** Both pages list all services.
**How to avoid:** The `/services` page should emphasize the residential vs. commercial categorization as its primary organizational purpose, linking to the two category index pages. The homepage services grid is a teaser; the services page is the comprehensive directory.
**Warning signs:** Google Search Console showing both pages competing for the same queries.

### Pitfall 4: Forgetting Sitemap Update
**What goes wrong:** New silo index pages are created but not added to `sitemap.ts`, delaying Google discovery.
**Why it happens:** Sitemap maintenance is easy to forget for manually-defined static entries.
**How to avoid:** Add all three URLs to the `staticPages` array in `src/app/sitemap.ts` immediately after creating the pages.
**Warning signs:** New pages not appearing in Google Search Console coverage report.

### Pitfall 5: JSON-LD Test Regression
**What goes wrong:** Adding `@id` to `buildRoofingContractorJsonLd` breaks existing test assertions that don't expect it.
**Why it happens:** Existing tests in `src/lib/__tests__/json-ld.test.ts` test properties of the root schema but may not account for the new `@id` field.
**How to avoid:** Check existing test assertions. The current tests check `@context`, `@type`, `name`, `telephone`, `address`, `areaServed`, and `openingHoursSpecification`. None assert the absence of `@id`, so adding it should not break existing tests. Add a new test assertion that verifies `@id` equals `${BASE_URL}/#organization`.
**Warning signs:** Vitest failures in `json-ld.test.ts`.

## Code Examples

### Fix 1: Root JSON-LD @id Addition
```typescript
// Source: src/lib/seo/json-ld.tsx lines 6-33 (verified)
// ADD '@id' property after '@type':
export function buildRoofingContractorJsonLd(): WithContext<RoofingContractor> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': `${BASE_URL}/#organization`, // NEW
    name: BUSINESS_INFO.name,
    telephone: BUSINESS_INFO.phone,
    // ... rest unchanged
  };
}
```

### Fix 2: OG Route Constants Import
```typescript
// Source: src/app/api/og/route.tsx (verified)
// ADD import:
import { PHONE_NUMBER, SITE_NAME } from '@/lib/constants';

// CHANGE line 86 from:
//   Jersey City Quality Roofing
// TO:
//   {SITE_NAME}

// CHANGE line 99 from:
//   (201) 555-0123
// TO:
//   {PHONE_NUMBER}
```

### Fix 3: Sitemap Addition
```typescript
// Source: src/app/sitemap.ts (verified)
// ADD to staticPages array:
{ url: `${BASE_URL}/services`, changeFrequency: 'monthly', priority: 0.8 },
{ url: `${BASE_URL}/services/residential`, changeFrequency: 'monthly', priority: 0.8 },
{ url: `${BASE_URL}/services/commercial`, changeFrequency: 'monthly', priority: 0.8 },
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| No `@id` anchors in JSON-LD | Entity identity via `@id` fragment URIs | Schema.org best practice since 2020 | Google Knowledge Graph uses `@id` to reconcile entities across pages |
| Flat service page hierarchy | Siloed architecture with index pages | SEO best practice since ~2019 | Establishes topical authority through URL hierarchy |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | `vitest.config.ts` |
| Quick run command | `pnpm vitest run --reporter=verbose` |
| Full suite command | `pnpm vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-14 | OG route uses PHONE_NUMBER and SITE_NAME constants | unit | `pnpm vitest run src/lib/__tests__/nap-consistency.test.ts -x` | Partial -- NAP test exists but does not cover OG route; needs new assertions |
| FNDN-02 | Silo index pages resolve (not 404) | smoke | Manual: `pnpm dev` then visit `/services`, `/services/residential`, `/services/commercial` | No -- Wave 0 |
| SEO-06 | Breadcrumb links on service pages resolve | smoke | Manual: verify breadcrumb navigation | No -- Wave 0 |
| SEO-04 | Root JSON-LD includes @id anchor | unit | `pnpm vitest run src/lib/__tests__/json-ld.test.ts -x` | Partial -- test file exists but has no @id assertion; needs new test |

### Sampling Rate
- **Per task commit:** `pnpm vitest run --reporter=verbose`
- **Per wave merge:** `pnpm vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/__tests__/json-ld.test.ts` -- add test: `buildRoofingContractorJsonLd` includes `@id` equal to `${BASE_URL}/#organization`
- [ ] `src/lib/__tests__/nap-consistency.test.ts` -- add test: OG route file content does not contain literal phone/company strings (or: verify constants import exists)
- [ ] `src/lib/__tests__/sitemap.test.ts` -- add test: sitemap includes `/services`, `/services/residential`, `/services/commercial` URLs

## Verified Current State Summary

| Item | Audit Claim | Current State | Action Needed |
|------|-------------|---------------|---------------|
| Contact page metadata hardcodes phone | Yes (at audit time) | FIXED -- uses `${PHONE_NUMBER}` | None |
| Google-map-embed noscript hardcodes address | Yes (at audit time) | FIXED -- uses `query` prop from `BUSINESS_INFO` | None |
| OG route hardcodes phone | Yes | CONFIRMED -- line 99 literal `(201) 555-0123` | Fix needed |
| OG route hardcodes company name | Not in audit | FOUND -- line 86 literal `Jersey City Quality Roofing` | Fix needed |
| Missing /services page | Yes | CONFIRMED -- no page.tsx | Create page |
| Missing /services/residential page | Yes | CONFIRMED -- no page.tsx | Create page |
| Missing /services/commercial page | Yes | CONFIRMED -- no page.tsx | Create page |
| Root JSON-LD missing @id | Yes | CONFIRMED -- no @id in buildRoofingContractorJsonLd | Add @id |
| Sitemap missing silo index URLs | Not in audit | FOUND -- staticPages array has no /services entries | Add 3 entries |

## Open Questions

1. **Content depth for silo index pages**
   - What we know: The 3000-word minimum applies to service pages, city hubs, and service-in-city pages. Silo index pages are navigational hubs.
   - What's unclear: Whether the user considers these "pages" subject to the 3000-word rule.
   - Recommendation: Treat as navigational hubs (like the blog index or service areas hub). Include meaningful intro copy (100-300 words) plus service card grid with descriptions. Do NOT pad to 3000 words -- that would create an unnatural user experience for a navigation page.

2. **Phone data duplication between constants.ts and business-info.ts**
   - What we know: Both files define the same phone number. The audit flagged this as tech debt.
   - What's unclear: Whether to consolidate in this phase.
   - Recommendation: Out of scope for Phase 11. The values match. Consolidation is a separate refactor task.

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection of all affected files (verified 2026-03-31)
- `src/lib/seo/json-ld.tsx` -- all JSON-LD builder functions examined
- `src/app/api/og/route.tsx` -- OG image generation route examined
- `src/components/layout/breadcrumbs.tsx` -- breadcrumb generation logic examined
- `src/app/sitemap.ts` -- sitemap generation examined
- `src/lib/constants.ts` -- constant definitions examined
- `src/data/business-info.ts` -- business info data examined
- `src/app/(marketing)/contact/page.tsx` -- contact page metadata examined
- `src/components/sections/google-map-embed.tsx` -- map embed examined

### Secondary (MEDIUM confidence)
- v1.0 Milestone Audit Report (`.planning/v1.0-MILESTONE-AUDIT.md`) -- note: two of the four audit-reported issues were already fixed since audit date

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, all fixes use existing project infrastructure
- Architecture: HIGH -- silo index page pattern is well-established in the codebase (blog hub, service areas hub)
- Pitfalls: HIGH -- all edge cases identified through direct code inspection
- Gap analysis accuracy: HIGH -- every claim verified against current codebase state (found 2 audit items already resolved)

**Research date:** 2026-03-31
**Valid until:** 2026-04-30 (stable -- fixes are internal consistency issues, not dependent on external library changes)
