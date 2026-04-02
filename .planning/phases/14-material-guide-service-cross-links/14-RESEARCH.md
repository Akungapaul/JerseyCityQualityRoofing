# Phase 14: Material Guide Service Cross-Links - Research

**Researched:** 2026-04-01
**Domain:** Internal linking integration (wiring existing function to existing page template)
**Confidence:** HIGH

## Summary

Phase 14 is a surgical gap-closure task. The `getMaterialRelatedServices` function already exists at `src/lib/internal-links.ts` line 215, is fully tested (22/22 tests pass including a dedicated test at line 437), and works correctly after the Phase 12 `initializeContentRegistry` fix. The material guide page template at `src/app/(marketing)/guides/materials/[slug]/page.tsx` already calls `initializeContentRegistry()` and `getRelatedGuides()` -- it simply never imports or calls `getMaterialRelatedServices`. All 6 material guide data files already have populated `relatedServiceSlugs` arrays mapping to valid service slugs.

The fix is a 3-file-change task: (1) add the `getMaterialRelatedServices` import to the page template, (2) call it with the slug, (3) render the service links using either the existing `ProblemSolutionCTA` component (which accepts `{ title: string; path: string }[]`) or a new/adapted component appropriate for the material guide context. The problem page (`src/app/(marketing)/problems/[slug]/page.tsx`) provides the exact working pattern to follow.

**Primary recommendation:** Import `getMaterialRelatedServices` alongside the existing `getRelatedGuides` import in the material guide page, call it with the slug, and render the links. The `ProblemSolutionCTA` component can be reused directly since its `serviceLinks` prop type (`{ title: string; path: string }[]`) is compatible with `InternalLink[]`. However, the heading "How We Solve {problemName}" is problem-specific -- either pass a custom heading/narrative or create a thin wrapper that recontextualizes the CTA for material guides. Given the minimal scope, adapting `ProblemSolutionCTA` to accept an optional heading override (or creating a `MaterialServiceLinks` wrapper) is the cleanest approach.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SEO-05 | Automated internal linking system: contextual links between related services, locations, and blog posts within and across silos | `getMaterialRelatedServices` function exists at internal-links.ts:215, tested, and returns correct `InternalLink[]` for all 6 materials. All 6 data files have `relatedServiceSlugs` populated. Only the page template wiring is missing. |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack**: Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4
- **SEO**: Every page must have metadata exports, one h1, strict heading hierarchy, descriptive alt text, canonical URLs, JSON-LD structured data
- **Internal links**: Use `next/link`, not raw `<a>` tags with full URLs
- **Components**: Default to Server Components -- only add `"use client"` when needed
- **Naming**: kebab-case files, PascalCase components
- **Accessibility**: Semantic HTML, keyboard navigation, WCAG AA contrast, focus-visible styles

## Standard Stack

No new dependencies needed. This phase uses only existing project infrastructure:

| Component | Location | Purpose |
|-----------|----------|---------|
| `getMaterialRelatedServices` | `src/lib/internal-links.ts:215` | Returns `InternalLink[]` for a material slug |
| `initializeContentRegistry` | `src/lib/internal-links.ts:266` | Populates content registry (already called in page) |
| `ProblemSolutionCTA` | `src/components/sections/problem-solution-cta.tsx` | Renders service links with CTA (reusable) |
| Material guide page template | `src/app/(marketing)/guides/materials/[slug]/page.tsx` | Target file to modify |
| `next/link` | Built-in | For service cross-links (used by ProblemSolutionCTA) |

**No new packages to install.**

## Architecture Patterns

### Working Reference Pattern (Problem Pages)

The problem page at `src/app/(marketing)/problems/[slug]/page.tsx` demonstrates the exact pattern to replicate:

```typescript
// 1. Import the function
import {
  initializeContentRegistry,
  getProblemRelatedServices,  // <-- analogous to getMaterialRelatedServices
  getRelatedGuides,
} from '@/lib/internal-links';

// 2. Call it in the page component
initializeContentRegistry();
const serviceLinks = getProblemRelatedServices(slug);  // <-- returns InternalLink[]

// 3. Render with ProblemSolutionCTA
<SectionWrapper tone="dominant">
  <ScrollReveal>
    <ProblemSolutionCTA
      problemName={problem.problemName}
      narrative={problem.professionalSolution}
      serviceLinks={serviceLinks}
    />
  </ScrollReveal>
</SectionWrapper>
```

### Material Guide Page Current State

The material guide page already has these pieces in place:
- Line 12-14: Imports `initializeContentRegistry` and `getRelatedGuides`
- Line 89: Calls `initializeContentRegistry()`
- Line 90: Calls `getRelatedGuides(slug, 3)`
- Lines 237-243: Renders `RelatedGuides` component

**What is missing:** No import of `getMaterialRelatedServices`, no call to it, no rendering of the service links.

### Recommended Insertion Point

The material guide page has this section flow:
1. GuideHero
2. BadgeStrip
3. Intro Narrative (dominant)
4. Material Properties (secondary)
5. Lifespan & Durability (dominant)
6. Cost Analysis (secondary)
7. Pros and Cons (dominant)
8. **MidPageCTA** (secondary)
9. Best Applications (dominant)
10. Hudson County Suitability (secondary)
11. Installation Process (dominant)
12. Maintenance Requirements (secondary)
13. FAQ Accordion (dominant)
14. Related Guides (secondary)
15. Quote Form
16. CTA Banner

The service cross-links should appear between the Closing Narrative / FAQ section and the Related Guides section -- this places them in the "what to do next" flow where the reader has finished learning about the material and is ready to take action. Inserting at position 13.5 (between FAQ and Related Guides) or replacing/augmenting the MidPageCTA at position 8 are both viable. The most natural placement is after FAQ and before Related Guides, matching the problem page pattern where `ProblemSolutionCTA` appears mid-page.

**Note:** The material guide page has no closing narrative section rendered despite the data having a `closingNarrative` field. This is a pre-existing condition and NOT in scope for Phase 14.

### Component Reuse Decision

**Option A: Reuse ProblemSolutionCTA directly**
- Props: `problemName`, `narrative`, `serviceLinks`
- Issue: `problemName` is semantically wrong for materials, "How We Solve {problemName}" heading is problem-specific
- Could pass `materialName` as `problemName` and it renders "How We Solve Asphalt Shingles" -- odd phrasing

**Option B: Create a `MaterialServiceCTA` component (recommended)**
- Thin component following the same pattern as `ProblemSolutionCTA`
- Heading: "Professional {materialName} Services" or "Our {materialName} Services"
- Brief narrative introducing the services
- Same link rendering pattern (Link components with ArrowRight icon)
- Same phone CTA at bottom
- Server Component (no `"use client"` needed)

**Option C: Generalize ProblemSolutionCTA with optional heading prop**
- Add optional `heading` prop to ProblemSolutionCTA
- Default to current "How We Solve {problemName}" behavior
- Override for material pages

**Recommendation: Option B** -- A dedicated `MaterialServiceCTA` component keeps the code clean and avoids overloading `ProblemSolutionCTA` with conditional logic. The component is ~40 lines and follows established patterns exactly. However, Option C is also acceptable for its simplicity -- either approach works with this minimal scope.

### Data Flow Verification

All 6 material guides have populated `relatedServiceSlugs`:

| Material | Related Service Slugs | Expected Service Links |
|----------|-----------------------|----------------------|
| asphalt-shingles | `['roof-replacement', 'roof-repair']` | 2 residential services |
| tpo-membrane | `['flat-roof-systems', 'commercial-replacement']` | 2 commercial services |
| epdm-rubber | `['flat-roof-systems', 'commercial-repair']` | 2 commercial services |
| slate-roofing | `['roof-replacement', 'roof-repair']` | 2 residential services |
| metal-roofing | `['roof-replacement', 'commercial-replacement']` | 1 residential + 1 commercial |
| modified-bitumen | `['flat-roof-systems', 'commercial-repair', 'commercial-replacement']` | 3 commercial services |

All these slugs match service nodes registered by `initializeContentRegistry()` (verified: 8 services registered from `SERVICES` data). The `getMaterialRelatedServices` function filters for `type === 'service'` and matches against the material's `relatedServiceSlugs` -- all paths will resolve correctly.

**Service node paths are constructed as `/services/${category}/${slug}` during registration** (line 342 of internal-links.ts). These match the actual route structure.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Material-to-service mapping | Custom lookup logic | `getMaterialRelatedServices()` | Already exists, tested, handles registry lookup correctly |
| Content registry population | Manual registration | `initializeContentRegistry()` | Already called on the page, idempotent |
| Service link rendering | Custom link list | Adapt `ProblemSolutionCTA` or create thin `MaterialServiceCTA` | Pattern is established and proven on problem pages |

## Common Pitfalls

### Pitfall 1: Calling getMaterialRelatedServices Before initializeContentRegistry
**What goes wrong:** Function returns empty array because registry is empty.
**Why it happens:** The material guide page already calls `initializeContentRegistry()` on line 89, so this is unlikely -- but the call order matters.
**How to avoid:** Keep the `getMaterialRelatedServices(slug)` call AFTER `initializeContentRegistry()`, just like `getRelatedGuides(slug, 3)` is on line 90.
**Warning signs:** Empty service links on all 6 pages.

### Pitfall 2: Reusing ProblemSolutionCTA Without Adjusting Context
**What goes wrong:** Material guide pages display "How We Solve Asphalt Shingles" -- grammatically odd and semantically incorrect.
**Why it happens:** `ProblemSolutionCTA` was designed for problem pages with a "How We Solve {problemName}" heading.
**How to avoid:** Either create a `MaterialServiceCTA` component with appropriate heading, or add a `heading` prop override to `ProblemSolutionCTA`.
**Warning signs:** Review the rendered heading text on any material guide page.

### Pitfall 3: Hardcoding Service Paths with Wrong Category
**What goes wrong:** Links point to `/services/residential/flat-roof-systems` instead of `/services/commercial/flat-roof-systems`.
**Why it happens:** The `RelatedServicesRow` component hardcodes `/services/residential/` prefix for all links (line 48 of related-services-row.tsx). This would break for commercial materials like TPO, EPDM, and modified bitumen.
**How to avoid:** Use `getMaterialRelatedServices()` which returns `InternalLink[]` with correctly constructed `path` from the service node's registered path. Do NOT use `RelatedServicesRow` which hardcodes the residential prefix.
**Warning signs:** 404 errors on service links from commercial material guide pages.

### Pitfall 4: Rendering Empty Service Links Section
**What goes wrong:** An empty "Related Services" section renders when a material has no related services.
**Why it happens:** Not checking array length before rendering.
**How to avoid:** Wrap the section in a conditional: `{serviceLinks.length > 0 && (...)}` -- same pattern used for Related Guides on line 237.
**Warning signs:** Empty sections on the page. (In practice, all 6 materials have 2-3 services, so this is defensive.)

## Code Examples

### Current Material Guide Page Imports (lines 11-14)
```typescript
import { ALL_MATERIAL_GUIDES, getMaterialGuide } from '@/data/content/material-guides';
import {
  initializeContentRegistry,
  getRelatedGuides,
} from '@/lib/internal-links';
```

### Required Change to Imports
```typescript
import { ALL_MATERIAL_GUIDES, getMaterialGuide } from '@/data/content/material-guides';
import {
  initializeContentRegistry,
  getRelatedGuides,
  getMaterialRelatedServices,
} from '@/lib/internal-links';
```

### Required Change to Page Component Body (after line 90)
```typescript
initializeContentRegistry();
const relatedGuides = getRelatedGuides(slug, 3);
const serviceLinks = getMaterialRelatedServices(slug);  // ADD THIS LINE
```

### Example MaterialServiceCTA Component (~40 lines)
```typescript
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business-info";

interface MaterialServiceCTAProps {
  materialName: string;
  serviceLinks: { title: string; path: string }[];
}

export function MaterialServiceCTA({
  materialName,
  serviceLinks,
}: MaterialServiceCTAProps) {
  if (serviceLinks.length === 0) return null;

  return (
    <div className="bg-secondary rounded-lg p-8 border border-accent">
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary">
        Professional {materialName} Services
      </h2>
      <p className="text-lg text-text-secondary mt-4 leading-relaxed">
        Our team specializes in {materialName.toLowerCase()} installation, repair,
        and maintenance across Hudson County. Explore our related services:
      </p>
      <div className="flex flex-wrap gap-3 mt-6">
        {serviceLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="inline-flex items-center gap-2 bg-accent text-dominant font-bold px-4 py-2 rounded-lg min-h-[44px] hover:bg-accent-hover transition-colors duration-[150ms]"
          >
            {link.title}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ))}
      </div>
      <a
        href={`tel:${BUSINESS_INFO.phone.replace(/[^+\d]/g, "")}`}
        className="flex items-center gap-2 mt-4 text-accent text-lg font-bold"
      >
        <Phone size={20} aria-hidden="true" />
        {BUSINESS_INFO.phone}
      </a>
    </div>
  );
}
```

### Rendering in Page Template (insert between FAQ and Related Guides)
```typescript
{/* 13.5. Related Services CTA (dominant) */}
{serviceLinks.length > 0 && (
  <SectionWrapper tone="dominant">
    <ScrollReveal>
      <MaterialServiceCTA
        materialName={guide.materialName}
        serviceLinks={serviceLinks}
      />
    </ScrollReveal>
  </SectionWrapper>
)}
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run src/lib/__tests__/internal-links.test.ts` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-05 | `getMaterialRelatedServices` returns correct service links for all 6 materials | unit | `npx vitest run src/lib/__tests__/internal-links.test.ts -x` | Yes (test at line 347, line 437) |
| SEO-05 | Material guide page imports and calls `getMaterialRelatedServices` | smoke | `npx vitest run` (TypeScript compilation check via `pnpm type-check`) | No -- Wave 0 |
| SEO-05 | All 6 material guide pages render service links | integration | Manual browser verification or `pnpm build` (SSG renders all pages) | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run src/lib/__tests__/internal-links.test.ts -x`
- **Per wave merge:** `npx vitest run && pnpm type-check && pnpm build`
- **Phase gate:** Full suite green + successful build + manual spot-check of 2-3 material guide pages

### Wave 0 Gaps
- [ ] `pnpm type-check` -- verify TypeScript compilation passes after import changes
- [ ] `pnpm build` -- verify all 6 material guide pages build successfully with service links (SSG renders catch runtime errors)

*(Existing test infrastructure at `src/lib/__tests__/internal-links.test.ts` already covers the `getMaterialRelatedServices` function unit tests. No new test files needed unless an integration/E2E test is desired.)*

## Open Questions

1. **Component choice: ProblemSolutionCTA reuse vs. new MaterialServiceCTA?**
   - What we know: ProblemSolutionCTA works but has problem-specific heading. The milestone audit recommends it. Creating MaterialServiceCTA is ~40 lines and gives cleaner semantics.
   - What's unclear: Whether the project prefers minimal file creation (reuse) or semantic clarity (new component).
   - Recommendation: Create `MaterialServiceCTA` -- the extra 40 lines are worth the semantic clarity, and it follows the project pattern of domain-specific components (e.g., `CommercialRelatedServicesRow` vs `RelatedServicesRow`).

2. **Section placement within the page template?**
   - What we know: Problem pages put service CTA mid-page (section 8 of 14). Material guide pages have 16 sections.
   - What's unclear: Whether to place after MidPageCTA (section 8) or after FAQ (section 13).
   - Recommendation: After FAQ and before Related Guides (section 13.5) -- the reader has absorbed the material information and is ready for action-oriented navigation. This also avoids disrupting the existing content flow.

## Sources

### Primary (HIGH confidence)
- `src/lib/internal-links.ts` -- `getMaterialRelatedServices` function at line 215, `initializeContentRegistry` at line 266
- `src/app/(marketing)/guides/materials/[slug]/page.tsx` -- current material guide page template (257 lines)
- `src/app/(marketing)/problems/[slug]/page.tsx` -- working reference pattern for `getProblemRelatedServices`
- `src/components/sections/problem-solution-cta.tsx` -- component that renders service links (54 lines)
- `src/lib/__tests__/internal-links.test.ts` -- 22 passing tests including `getMaterialRelatedServices` coverage
- `src/data/content/material-guides/*.ts` -- all 6 material data files with `relatedServiceSlugs`
- `.planning/v1.0-MILESTONE-AUDIT.md` -- gap identification and recommended fix

### Secondary (MEDIUM confidence)
- `src/components/sections/related-services-row.tsx` -- NOT recommended due to hardcoded residential path prefix

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all components exist and are verified working
- Architecture: HIGH - direct replication of proven problem-page pattern
- Pitfalls: HIGH - identified from direct codebase analysis (hardcoded paths, empty arrays, heading mismatch)

**Research date:** 2026-04-01
**Valid until:** No expiry -- this is internal codebase analysis, not dependent on external library changes
