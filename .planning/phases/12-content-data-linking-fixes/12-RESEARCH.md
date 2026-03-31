# Phase 12: Content Data & Linking Fixes - Research

**Researched:** 2026-03-31
**Domain:** Content data integrity, internal linking system, CTA integration
**Confidence:** HIGH

## Summary

Phase 12 is a targeted gap-closure phase that addresses three specific integration issues identified in the v1.0 milestone audit. All three issues have been precisely diagnosed with exact file locations, root causes, and verified fix paths. No new libraries, architecture decisions, or design patterns are needed -- this is purely corrective work on existing code.

**Issue 1 (CONT-01/SEO-05 data error):** The blog article `preventative-roof-maintenance-checklist.ts` has `siloCategory: 'residential'` and `parentPillarLink: '/services/residential/roof-maintenance'`, but `roof-maintenance` is defined as `category: 'commercial'` in `services.ts`. Since `dynamicParams = false` on service pages, `/services/residential/roof-maintenance` returns 404. Fix: change two field values.

**Issue 2 (SEO-05 partial implementation):** `initializeContentRegistry()` in `src/lib/internal-links.ts` populates blog, cost-guide, material-guide, and problem nodes but never registers service or city nodes. Functions `getProblemRelatedServices()` and `getMaterialRelatedServices()` query for `type === 'service'` and always return empty arrays. Fix: add service and city node registration loops to `initializeContentRegistry()`.

**Issue 3 (CRO-03 integration gap):** `FloatingCTA` searches for `document.getElementById('quote-form')`. On `/contact`, the `QuoteForm` component renders `<SectionWrapper id="full-quote-form">` (not `id="quote-form"`). The IntersectionObserver finds no element, falls back to `href="/contact"`, creating a self-link. Fix: add an `id="quote-form"` wrapper on the contact page around the QuoteForm, matching the pattern used on all other pages.

**Primary recommendation:** Three isolated, well-scoped fixes -- one data field correction, one function enhancement, one DOM id alignment. Total code changes across 3 files, with tests to confirm each fix.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-01 | Blog system with silo-linking (articles link back into service silos) | Fix 1: Correct `siloCategory` and `parentPillarLink` in `preventative-roof-maintenance-checklist.ts` so the SiloPillarLink resolves to `/services/commercial/roof-maintenance` (a valid route) instead of `/services/residential/roof-maintenance` (404) |
| SEO-05 | Automated internal linking system: contextual links between related services, locations, and blog posts within and across silos | Fix 2: Register all 8 service nodes and 12 city nodes in `initializeContentRegistry()` so `getProblemRelatedServices()` and `getMaterialRelatedServices()` return non-empty arrays. Currently these return `[]` because no `type: 'service'` nodes exist in the registry |
| CRO-03 | Floating quote request button (persistent CTA) on all pages | Fix 3: Add `id="quote-form"` wrapper on `/contact` page so FloatingCTA's IntersectionObserver can detect the form's visibility and show `#quote-form` anchor instead of self-linking to `/contact` |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

### Coding Conventions
- TypeScript strict mode, no `any`, prefer `interface` for object shapes
- Files: kebab-case, Components: PascalCase
- Default to Server Components -- `"use client"` only when needed
- `as const satisfies Record<...>` pattern for data registries
- All pages must have proper `metadata` exports
- Internal links use `next/link`, phone numbers use `tel:` links

### Testing
- Vitest 4.1.1 with node environment
- Tests in `src/**/__tests__/**/*.test.{ts,tsx}`
- Path alias: `@` -> `./src`

### Content & SEO
- JSON-LD on every page
- Strict heading hierarchy (H1 > H2 > H3)
- One H1 per page

## Architecture Patterns

### Fix 1: Blog Article Data Correction

**File:** `src/data/content/blog/preventative-roof-maintenance-checklist.ts`

**Current (wrong):**
```typescript
siloService: 'roof-maintenance',
siloCategory: 'residential',                                    // WRONG
parentPillarLink: '/services/residential/roof-maintenance',     // 404
```

**Fixed:**
```typescript
siloService: 'roof-maintenance',
siloCategory: 'commercial',                                     // CORRECT
parentPillarLink: '/services/commercial/roof-maintenance',      // resolves
```

**Verification:** In `services.ts`, `roof-maintenance` is defined at line 1018 with `category: 'commercial'`. All other silo articles have correct category-to-path mapping:
- `signs-you-need-roof-repair` -> `residential` / `/services/residential/roof-repair` -- CORRECT
- `complete-roof-replacement-guide` -> `residential` / `/services/residential/roof-replacement` -- CORRECT
- `why-annual-roof-inspections` -> `residential` / `/services/residential/roof-inspection` -- CORRECT
- `choosing-commercial-flat-roof` -> `commercial` / `/services/commercial/flat-roof-systems` -- CORRECT
- `preventative-roof-maintenance-checklist` -> `residential` / `/services/residential/roof-maintenance` -- WRONG (should be `commercial`)

**Impact:** 1 file, 2 lines changed.

### Fix 2: Content Registry Service & City Node Registration

**File:** `src/lib/internal-links.ts` -- function `initializeContentRegistry()`

**Current state:** Registers 4 content types:
- Blog articles (8 articles from `ALL_BLOG_ARTICLES`)
- Cost guides (from `ALL_COST_GUIDES`)
- Material guides (6 guides from `ALL_MATERIAL_GUIDES`)
- Problem pages (5 problems from `ALL_PROBLEMS`)

**Missing:** Service nodes and city nodes.

**Why it matters:** `getProblemRelatedServices(slug)` (line 198) filters for `n.type === 'service'`. Since no service nodes are registered, it always returns `[]`. This silently breaks the `ProblemSolutionCTA` component on all 5 problem pages -- the "How We Solve [Problem]" section renders zero service links. The same applies to `getMaterialRelatedServices()` which is defined and tested but not yet consumed in any page template (material guide pages only call `getRelatedGuides`).

**Fix pattern -- register service nodes:**
```typescript
import { SERVICES } from '@/data/services';

// Inside initializeContentRegistry(), after problem registration:
for (const service of Object.values(SERVICES)) {
  registerContent({
    slug: service.slug,
    type: 'service',
    title: service.name,
    path: `/services/${service.category}/${service.slug}`,
    siloService: service.slug,
    siloCategory: service.category,
    tags: [],
    relatedServiceSlugs: service.relatedServices,
    relatedCitySlugs: [],
    relatedMaterialSlugs: [],
    relatedProblemSlugs: [],
  });
}
```

**Fix pattern -- register city nodes:**
```typescript
import { MUNICIPALITIES } from '@/data/municipalities';

for (const city of Object.values(MUNICIPALITIES)) {
  registerContent({
    slug: city.slug,
    type: 'city',
    title: city.name,
    path: `/service-areas/${city.slug}`,
    siloService: null,
    siloCategory: null,
    tags: [],
    relatedServiceSlugs: [],
    relatedCitySlugs: [city.slug],
    relatedMaterialSlugs: [],
    relatedProblemSlugs: [],
  });
}
```

**Node counts after fix:**
- 8 service nodes (4 residential + 4 commercial)
- 12 city nodes (all Hudson County municipalities)
- Blog, cost-guide, material-guide, and problem nodes unchanged

**Affected pages (where service links now populate):**
- 5 problem pages (`/problems/[slug]`) -- `ProblemSolutionCTA` receives non-empty `serviceLinks`
- Material guide pages could consume `getMaterialRelatedServices()` in a future phase but currently do not call it

**Impact:** 1 file modified (`internal-links.ts`), 2 new imports added, ~24 lines of new registration code.

### Fix 3: FloatingCTA Contact Page ID Alignment

**Current state analysis:**

The `FloatingCTA` component (line 16 of `floating-cta.tsx`) looks for `document.getElementById("quote-form")`. If not found, it falls back to `href="/contact"`:

```typescript
const formEl = document.getElementById("quote-form");
if (!formEl) {
  setCtaHref("/contact");
  return;
}
```

**ID inventory across pages:**

| Page | How `id="quote-form"` is set | FloatingCTA works? |
|------|-----------------------------|--------------------|
| Service pages (residential + commercial) | `<div id="quote-form">` wrapper around `<QuoteForm />` | YES |
| Service-in-city pages | `<div id="quote-form">` wrapper | YES |
| City hub pages | `<div id="quote-form">` wrapper | YES |
| Blog article pages | `<div id="quote-form">` wrapper | YES |
| Cost guide pages | `<div id="quote-form">` wrapper | YES |
| Material guide pages | `<div id="quote-form">` wrapper | YES |
| Problem pages | `<div id="quote-form">` wrapper | YES |
| Homepage | `CompactQuoteForm` has `<SectionWrapper id="quote-form">` | YES |
| **Contact page** | `<QuoteForm />` renders `<SectionWrapper id="full-quote-form">` -- NO `id="quote-form"` wrapper | **NO -- self-link** |

**Fix:** Add `<div id="quote-form">` wrapper around `<QuoteForm />` in `/contact/page.tsx`, matching the pattern used on every other page:

```tsx
{/* Contact page fix */}
<div id="quote-form">
  <QuoteForm />
</div>
```

**Why not change QuoteForm itself?** The `QuoteForm` component renders its own `<SectionWrapper id="full-quote-form">`. Changing this to `id="quote-form"` would work but could break other integrations or deep-linking that targets `#full-quote-form`. The wrapper pattern is already the established convention on 13+ other pages.

**Impact:** 1 file modified (`contact/page.tsx`), 2 lines changed (add wrapper div).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Service slug-to-category mapping | A lookup table or switch statement | `SERVICES[slug].category` | Already exists in the data registry; the service type stores its category |
| Content node deduplication | Custom dedup logic | The idempotent `initialized` flag | `initializeContentRegistry()` already has a module-level guard that prevents double-registration |

## Common Pitfalls

### Pitfall 1: Forgetting the Idempotent Guard After Adding Imports
**What goes wrong:** Adding new imports (`SERVICES`, `MUNICIPALITIES`) to `internal-links.ts` creates circular dependency risk if those files import from `internal-links.ts`.
**Why it happens:** The data files (`services.ts`, `municipalities.ts`) are pure data exports with no imports from `lib/`. No circular dependency risk exists in this case.
**How to avoid:** Verify that `services.ts` and `municipalities.ts` do not import from `@/lib/internal-links` before adding the import. (Confirmed: they do not.)
**Warning signs:** Build-time "Maximum call stack size exceeded" or undefined exports.

### Pitfall 2: Breaking the `resetRegistry()` Test Utility
**What goes wrong:** If the `initialized` flag is not properly reset when `resetRegistry()` is called, subsequent test calls to `initializeContentRegistry()` will skip registration due to the idempotent guard.
**Why it happens:** The `resetRegistry()` function already resets both `CONTENT_REGISTRY.length = 0` and `initialized = false`. No change needed here.
**How to avoid:** Existing `resetRegistry()` handles this correctly. Tests that call `initializeContentRegistry()` should call `resetRegistry()` in `beforeEach`.
**Warning signs:** Tests that manually register nodes pass, but tests using `initializeContentRegistry()` find an empty registry.

### Pitfall 3: The Contact Page SectionWrapper Nesting
**What goes wrong:** Adding a `<div id="quote-form">` wrapper inside the existing `<SectionWrapper tone="secondary">` on the contact page could disrupt the grid layout if placed at the wrong level.
**Why it happens:** The contact page uses a 2-column grid: `<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">`. The QuoteForm is inside the left column `<div className="order-2 lg:order-1">`.
**How to avoid:** Place the `id="quote-form"` wrapper around the entire grid's parent `<SectionWrapper>`, or around the specific column div containing QuoteForm. The cleanest approach is to add `id="quote-form"` to the `<SectionWrapper>` that wraps the two-column layout -- this is exactly where FloatingCTA needs IntersectionObserver visibility.
**Warning signs:** FloatingCTA scrolls to the wrong position or the form section is not fully in the viewport when the user clicks the anchor link.

### Pitfall 4: Service Node `relatedServices` vs `relatedServiceSlugs`
**What goes wrong:** The `Service` type uses `relatedServices: string[]` but the `ContentNode` interface uses `relatedServiceSlugs: string[]`. Using the wrong field name causes type errors.
**How to avoid:** Map `service.relatedServices` to `relatedServiceSlugs` in the registration code.
**Warning signs:** TypeScript compilation error on the `registerContent` call.

## Code Examples

### Verified: How Other Pages Set quote-form ID
```typescript
// Source: src/app/(marketing)/services/residential/[service]/page.tsx:317
<div id="quote-form">
  <QuoteForm defaultServiceType={service.name} />
</div>
```

### Verified: FloatingCTA ID Lookup Logic
```typescript
// Source: src/components/sections/floating-cta.tsx:16-19
const formEl = document.getElementById("quote-form");
if (!formEl) {
  setCtaHref("/contact");
  return;
}
```

### Verified: Current initializeContentRegistry Pattern
```typescript
// Source: src/lib/internal-links.ts:264-336
// Blog articles, cost guides, material guides, and problems are registered.
// Service and city nodes are NOT registered -- this is the gap.
```

### Verified: Service Data Shape for Registration
```typescript
// Source: src/data/services.ts:1018-1021
'roof-maintenance': {
  name: 'Roof Maintenance',
  slug: 'roof-maintenance',
  category: 'commercial',  // <-- The authoritative source of truth
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run src/lib/__tests__/internal-links.test.ts` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | Blog article `preventative-roof-maintenance-checklist` has `siloCategory: 'commercial'` and `parentPillarLink: '/services/commercial/roof-maintenance'` | unit | `npx vitest run src/data/__tests__/blog-silo-links.test.ts -x` | No -- Wave 0 |
| SEO-05 | `initializeContentRegistry()` registers service and city nodes; `getProblemRelatedServices()` and `getMaterialRelatedServices()` return non-empty arrays | unit | `npx vitest run src/lib/__tests__/internal-links.test.ts -x` | Yes (needs new test cases) |
| CRO-03 | Contact page renders an element with `id="quote-form"` | unit (static markup) | `npx vitest run src/app/__tests__/contact-quote-form-id.test.tsx -x` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run src/lib/__tests__/internal-links.test.ts`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/data/__tests__/blog-silo-links.test.ts` -- validates all blog articles have correct siloCategory matching their service's category in services.ts, and parentPillarLink resolves to a valid route
- [ ] New test cases in `src/lib/__tests__/internal-links.test.ts` -- test that `initializeContentRegistry()` registers 8 service nodes and 12 city nodes, and that `getProblemRelatedServices`/`getMaterialRelatedServices` return results when called after initialization
- [ ] `src/app/__tests__/contact-quote-form-id.test.tsx` -- verifies contact page renders `id="quote-form"` element (may be complex due to Server Component rendering; could alternatively be a data-level assertion)

## State of the Art

No architectural changes needed. This phase uses established patterns already present in the codebase:

| Current Pattern | Where Used | Apply To |
|-----------------|-----------|----------|
| `<div id="quote-form">` wrapper | 13+ page templates | Contact page |
| `registerContent()` in `initializeContentRegistry()` | 4 content types (blog, cost, material, problem) | Add 2 content types (service, city) |
| `siloCategory: 'commercial'` + `/services/commercial/` path | `choosing-commercial-flat-roof-system.ts` | `preventative-roof-maintenance-checklist.ts` |

## Open Questions

1. **Should `getMaterialRelatedServices()` be consumed in material guide pages?**
   - What we know: The function is defined, tested, and would return service links after Fix 2. But `src/app/(marketing)/guides/materials/[slug]/page.tsx` does not currently call it or render service links.
   - What's unclear: Whether this was intentional (material guides focus on guide-to-guide links) or an oversight.
   - Recommendation: Out of scope for Phase 12. The function will work correctly after the registry fix. A future phase can wire it into the page template if desired.

2. **Should city nodes have `relatedServiceSlugs` populated?**
   - What we know: City hub pages link to all services. Registering cities with empty `relatedServiceSlugs` means city nodes will never appear in service-related queries.
   - What's unclear: Whether city-to-service cross-linking is needed for any current page component.
   - Recommendation: Register with empty arrays for now (matches the pattern for problem nodes that also have minimal cross-references). The data is available in `MUNICIPALITIES` if enrichment is needed later.

## Sources

### Primary (HIGH confidence)
- `src/data/services.ts:1018-1021` -- roof-maintenance category is 'commercial' (verified in source)
- `src/lib/internal-links.ts:264-336` -- initializeContentRegistry() registers 4 types, missing service/city (verified in source)
- `src/components/sections/floating-cta.tsx:16-19` -- FloatingCTA getElementById('quote-form') logic (verified in source)
- `src/app/(marketing)/contact/page.tsx:46` -- QuoteForm rendered without id="quote-form" wrapper (verified in source)
- `src/components/forms/quote-form.tsx:84` -- QuoteForm uses id="full-quote-form" (verified in source)
- `.planning/v1.0-MILESTONE-AUDIT.md` -- All 3 gaps documented with evidence and fix directions

### Secondary (MEDIUM confidence)
- None needed -- all findings are from direct source code inspection

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Fix 1 (blog silo data): HIGH -- exact 2-line change, verified against services.ts
- Fix 2 (registry nodes): HIGH -- pattern matches existing code, 8 services + 12 cities, existing tests validate the query functions
- Fix 3 (FloatingCTA id): HIGH -- exact pattern used on 13+ other pages, root cause confirmed via source inspection

**Research date:** 2026-03-31
**Valid until:** Indefinite (fixes are against stable, version-controlled source code)
