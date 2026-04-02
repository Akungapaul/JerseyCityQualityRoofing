# Phase 16: Silo Linking & Breadcrumb Polish - Research

**Researched:** 2026-04-02
**Domain:** Internal linking, breadcrumb navigation, TypeScript type cleanup
**Confidence:** HIGH

## Summary

Phase 16 closes the three remaining low-priority advisory integration gaps identified in the v1.0 milestone audit. All three issues are well-scoped modifications to existing files with no new dependencies, no new pages, and no architectural changes. The internal linking infrastructure (`internal-links.ts`) already provides `getSiloArticles()`, `getCostGuideForService()`, and `getBlogArticlesForService()` -- these functions are tested and working but are never called from the 8 service pillar pages. The breadcrumbs component (`breadcrumbs.tsx`) has a `SEGMENT_LABELS` map that is missing entries for 5 content route segments. The `ContentNode` type union includes `'service-in-city'` which is never populated in the registry.

This phase requires zero new libraries, zero new pages, and zero new components (though a small reusable "SiloContentLinks" section component is recommended for DRY rendering of forward links). The work is entirely about wiring existing functions into existing page templates and cleaning up incomplete mappings.

**Primary recommendation:** Wire `initializeContentRegistry()` + `getSiloArticles()` / `getCostGuideForService()` into both `[service]/page.tsx` files, add 5 missing SEGMENT_LABELS entries, and remove `'service-in-city'` from the ContentNode type union (removing is cleaner than populating 96 unused nodes).

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-08 | All content written in humanized voice: first-person storytelling, conversational tone, real-world scenarios, expert technical authority | Forward silo links from pillar pages to blog articles strengthen content authority by creating bidirectional content relationships. Blog articles already link back to pillars via SiloPillarLink; this phase completes the reverse direction. |
| SEO-05 | Automated internal linking system: contextual links between related services, locations, and blog posts within and across silos | `getSiloArticles()` and `getCostGuideForService()` exist in internal-links.ts but are uncalled from service pillar pages. Wiring them in completes the silo linking graph. |
| SEO-06 | Breadcrumb navigation on every page (auto-generated from route hierarchy) with BreadcrumbList schema | SEGMENT_LABELS map is missing entries for `guides`, `cost`, `materials`, `problems`, and `gallery`. These segments currently render via `slugToTitle()` fallback producing "Cost" instead of "Cost Guides". |
</phase_requirements>

## Standard Stack

No new dependencies. This phase uses only existing project infrastructure:

### Core (already installed)
| Library | Version | Purpose | Role in This Phase |
|---------|---------|---------|-------------------|
| Next.js | 16.2.x | App Router | Service pillar pages are Server Components in App Router |
| React | 19.2.x | UI library | Server Components render silo link sections |
| TypeScript | 5.7.x | Type safety | ContentNode type union modification |
| Tailwind CSS | 4.1.x | Styling | Style the silo links section (reuse existing patterns) |
| Lucide React | 0.477.x | Icons | ArrowRight, BookOpen, DollarSign for link cards |
| Vitest | 4.1.1 | Testing | Validate breadcrumb labels, silo link wiring, type cleanup |

### No New Dependencies

This phase adds zero npm packages. All functions and components needed already exist.

## Architecture Patterns

### Current Silo Linking Architecture

The internal linking system is a module-level singleton registry (`internal-links.ts`) that must be initialized before use:

```
initializeContentRegistry()  <-- idempotent, populates CONTENT_REGISTRY array
  |
  +-- getSiloArticles(serviceSlug)       --> InternalLink[] (blog articles in this silo)
  +-- getBlogArticlesForService(slug)    --> InternalLink[] (articles with relatedServiceSlugs match, max 3)
  +-- getCostGuideForService(slug)       --> InternalLink | null (cost guide whose slug contains serviceSlug)
  +-- getRelatedBlogArticles(slug, n)    --> InternalLink[] (relevance-scored, used by blog pages)
  +-- getRelatedGuides(slug, n)          --> InternalLink[] (relevance-scored, used by blog pages)
```

**Current call sites:** Blog, cost guide, material guide, and problem pages all call `initializeContentRegistry()` at the top of their page component. Service pillar pages do NOT.

### Pattern: How Content Pages Wire Internal Links

Every content page follows the same pattern (established in Phase 9):

```typescript
// In page component (Server Component)
export default async function SomePage({ params }) {
  const { slug } = await params;
  // ... get page data ...

  // Initialize registry (idempotent)
  initializeContentRegistry();

  // Get related content
  const relatedArticles = getRelatedBlogArticles(slug, 3);
  const relatedGuides = getRelatedGuides(slug, 3);

  return (
    <>
      {/* ... page sections ... */}
      {relatedGuides.length > 0 && (
        <SectionWrapper tone="dominant">
          <ScrollReveal>
            <RelatedGuides guides={relatedGuides} />
          </ScrollReveal>
        </SectionWrapper>
      )}
    </>
  );
}
```

### Recommended Approach: Service Pillar Forward Links

Add a new section to each service pillar page (residential + commercial) between the FAQ accordion and the quote form. This section renders:

1. **Related Blog Articles** -- from `getSiloArticles(service.slug)` (silo-matched) OR `getBlogArticlesForService(service.slug)` (broader match)
2. **Cost Guide Link** -- from `getCostGuideForService(service.slug)` (1:1 mapping, every service has one)

**Key decision:** Use `getBlogArticlesForService()` rather than `getSiloArticles()` for broader coverage. `getSiloArticles` only returns articles where `siloService === serviceSlug` (direct silo match). `getBlogArticlesForService` returns articles where `relatedServiceSlugs` includes the service slug, which catches more articles (e.g., the insurance claims article is related to roof-repair, roof-replacement, and emergency-roofing but is not in any silo).

However, the success criteria specifically mentions `getSiloArticles()` and/or `getCostGuideForService()`. Use `getSiloArticles()` first (silo-specific), then fall back to `getBlogArticlesForService()` if no silo articles exist. This gives the tightest silo linking for services with dedicated articles, and broader coverage for services without.

### Service-to-Content Mapping (verified from data files)

| Service Slug | Silo Blog Article | Cost Guide | Additional Related Articles |
|-------------|-------------------|------------|---------------------------|
| roof-repair | signs-you-need-roof-repair | roof-repair-cost | insurance-claims, anatomy, weather |
| roof-replacement | complete-roof-replacement-guide | roof-replacement-cost | insurance-claims, anatomy |
| roof-inspection | why-annual-roof-inspections | roof-inspection-cost | anatomy, maintenance |
| emergency-roofing | (none) | emergency-roofing-cost | signs-repair, insurance-claims, weather |
| flat-roof-systems | choosing-commercial-flat-roof | flat-roof-systems-cost | (none additional) |
| roof-maintenance | preventative-roof-maintenance | roof-maintenance-cost | inspections, weather |
| commercial-repair | (none) | commercial-repair-cost | flat-roof (via relatedServiceSlugs) |
| commercial-replacement | (none) | commercial-replacement-cost | (none) |

**Key insight:** 3 services (emergency-roofing, commercial-repair, commercial-replacement) have NO silo article but DO have related articles via `relatedServiceSlugs`. Using the fallback to `getBlogArticlesForService()` ensures these pages still get forward links.

### Breadcrumb Segment Labels

Current SEGMENT_LABELS:
```typescript
const SEGMENT_LABELS: Record<string, string> = {
  services: "Services",
  residential: "Residential Services",
  commercial: "Commercial Services",
  "service-areas": "Service Areas",
  about: "About Us",
  contact: "Contact",
  blog: "Blog",
};
```

Missing entries needed:
```typescript
  guides: "Guides",
  cost: "Cost Guides",
  materials: "Material Guides",
  problems: "Common Roofing Problems",
  gallery: "Project Gallery",
```

**Affected routes:**
- `/guides` -- renders "Guides" (currently "Guides" via slugToTitle -- actually correct by accident)
- `/guides/cost/[slug]` -- "Cost" segment renders as "Cost" instead of "Cost Guides"
- `/guides/materials/[slug]` -- "Materials" segment renders as "Materials" instead of "Material Guides"
- `/problems/[slug]` -- "Problems" segment renders as "Problems" instead of "Common Roofing Problems"
- `/gallery` -- "Gallery" segment renders as "Gallery" instead of "Project Gallery"

### ContentNode Type Cleanup

The `ContentNode` type in `internal-links.ts` line 11:
```typescript
type: 'service' | 'city' | 'service-in-city' | 'blog' | 'cost-guide' | 'material-guide' | 'problem';
```

`'service-in-city'` is listed but never registered in `initializeContentRegistry()`. Options:

1. **Remove it** (recommended) -- There are 96 service-in-city pages. Registering them would add 96 nodes to the registry but they are never queried by any function. No function filters for `type === 'service-in-city'`. Removing the dead type is cleaner.
2. **Populate it** -- Would require importing the service-city content map (large import) for zero functional benefit.

**Recommendation:** Remove `'service-in-city'` from the type union. This is a one-line change with zero functional impact.

### Recommended Project Structure Changes

No new directories. Files modified:

```
src/
  components/
    layout/
      breadcrumbs.tsx                    # ADD 5 SEGMENT_LABELS entries
    sections/
      silo-content-links.tsx             # NEW: reusable forward-link section
  lib/
    internal-links.ts                    # REMOVE 'service-in-city' from type union
  app/(marketing)/services/
    residential/[service]/page.tsx       # ADD initializeContentRegistry + silo links section
    commercial/[service]/page.tsx        # ADD initializeContentRegistry + silo links section
```

### Component Design: SiloContentLinks

Create a small Server Component that renders blog article cards and a cost guide link. Reuses existing `BlogCard` and `GuideCard` patterns from `RelatedArticles` and `RelatedGuides`.

```typescript
// src/components/sections/silo-content-links.tsx
interface SiloContentLinksProps {
  articles: InternalLink[];
  costGuide: InternalLink | null;
  serviceName: string;
}
```

This is a Server Component (no `"use client"`) matching the project convention that interactive elements are the exception.

### Anti-Patterns to Avoid

- **Do NOT add `initializeContentRegistry()` at module scope** -- It must be called inside the page component function, matching the established pattern in blog/cost-guide/material-guide/problem pages.
- **Do NOT create separate silo link components for residential vs. commercial** -- One `SiloContentLinks` component serves both. The Phase 6 decision to create `CommercialRelatedServicesRow` was domain-specific (commercial terminology). Silo links have identical rendering for both.
- **Do NOT add `'use client'` to the silo links component** -- It renders static links with no interactivity.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Blog article lookup for service | Custom query logic | `getSiloArticles()` + `getBlogArticlesForService()` | Already tested and in the registry |
| Cost guide lookup for service | Custom filter on cost guide array | `getCostGuideForService()` | Already tested, handles slug matching |
| Related content card rendering | Custom card layout | Adapt `RelatedArticles` / `RelatedGuides` patterns | Consistent UI across the site |
| Breadcrumb label resolution | Custom breadcrumb logic | Add to existing `SEGMENT_LABELS` map | One-line additions to existing system |

## Common Pitfalls

### Pitfall 1: Registry Initialization Order
**What goes wrong:** `getSiloArticles()` returns empty array because `initializeContentRegistry()` was not called first.
**Why it happens:** The registry is lazy-initialized. Unlike blog pages which call it explicitly, service pages currently don't import it at all.
**How to avoid:** Always call `initializeContentRegistry()` before any query function, inside the page component body (not at module level).
**Warning signs:** Empty silo links section on service pages despite data existing.

### Pitfall 2: getSiloArticles vs getBlogArticlesForService Coverage Gaps
**What goes wrong:** 3 of 8 service pages (emergency-roofing, commercial-repair, commercial-replacement) show no blog links because they have no silo article.
**Why it happens:** `getSiloArticles()` matches on `siloService === serviceSlug`. Those 3 services have no article with matching `siloService`.
**How to avoid:** Use `getSiloArticles()` first, then fall back to `getBlogArticlesForService()` if empty. Or just use `getBlogArticlesForService()` directly which checks `relatedServiceSlugs` (broader match).
**Warning signs:** Some service pages show blog links, others don't.

### Pitfall 3: Breadcrumb "guides" Segment Shows Twice
**What goes wrong:** For `/guides/cost/roof-repair-cost`, breadcrumb shows "Home > Guides > Cost Guides > Roof Repair Cost" -- but if you add a label for "guides" that says "Cost Guides", it conflicts.
**Why it happens:** Confusing `guides` (the parent segment) with `cost` (the child segment). Each needs its own label.
**How to avoid:** Map `guides` to "Guides" and `cost` to "Cost Guides". The breadcrumb renders each segment independently.
**Warning signs:** Duplicate or confusing breadcrumb text.

### Pitfall 4: Forgetting to Update Both Page Templates
**What goes wrong:** Only residential service pages get silo links, commercial pages don't.
**Why it happens:** The two page files are separate (`residential/[service]/page.tsx` and `commercial/[service]/page.tsx`). Easy to update one and forget the other.
**How to avoid:** Both page templates must receive identical changes. The shared `SiloContentLinks` component ensures rendering is consistent.
**Warning signs:** Audit finds commercial pages still missing forward links.

### Pitfall 5: Section Placement Breaks Tone Alternation
**What goes wrong:** New silo links section disrupts the dominant/secondary tone alternation pattern.
**Why it happens:** Inserting a section between existing sections shifts all subsequent tones.
**How to avoid:** Place the silo links section between FAQ Accordion and Quote Form (matching the Phase 14 pattern for MaterialServiceCTA placement). Use `tone="dominant"` for the silo links section since it follows a secondary-toned FAQ section.
**Warning signs:** Two consecutive sections with the same background tone.

## Code Examples

### Example 1: Adding Silo Links to Residential Service Page

```typescript
// In residential/[service]/page.tsx, add imports:
import {
  initializeContentRegistry,
  getSiloArticles,
  getBlogArticlesForService,
  getCostGuideForService,
} from '@/lib/internal-links';
import { SiloContentLinks } from '@/components/sections/silo-content-links';

// In page component, after getting service data:
initializeContentRegistry();
const siloArticles = getSiloArticles(service.slug);
const blogArticles = siloArticles.length > 0
  ? siloArticles
  : getBlogArticlesForService(service.slug);
const costGuide = getCostGuideForService(service.slug);

// In JSX, between FAQ and QuoteForm:
{(blogArticles.length > 0 || costGuide) && (
  <SectionWrapper tone="dominant">
    <ScrollReveal>
      <SiloContentLinks
        articles={blogArticles}
        costGuide={costGuide}
        serviceName={service.name}
      />
    </ScrollReveal>
  </SectionWrapper>
)}
```

### Example 2: Updated SEGMENT_LABELS

```typescript
const SEGMENT_LABELS: Record<string, string> = {
  services: "Services",
  residential: "Residential Services",
  commercial: "Commercial Services",
  "service-areas": "Service Areas",
  about: "About Us",
  contact: "Contact",
  blog: "Blog",
  guides: "Guides",
  cost: "Cost Guides",
  materials: "Material Guides",
  problems: "Common Roofing Problems",
  gallery: "Project Gallery",
};
```

### Example 3: Removing Dead Type Variant

```typescript
// Before:
type: 'service' | 'city' | 'service-in-city' | 'blog' | 'cost-guide' | 'material-guide' | 'problem';

// After:
type: 'service' | 'city' | 'blog' | 'cost-guide' | 'material-guide' | 'problem';
```

### Example 4: SiloContentLinks Component Pattern

```typescript
// Server Component -- no "use client"
import Link from "next/link";
import { ArrowRight, BookOpen, DollarSign } from "lucide-react";
import type { InternalLink } from "@/lib/internal-links";

interface SiloContentLinksProps {
  articles: InternalLink[];
  costGuide: InternalLink | null;
  serviceName: string;
}

export function SiloContentLinks({
  articles,
  costGuide,
  serviceName,
}: SiloContentLinksProps) {
  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-4">
        {serviceName} Resources & Guides
      </h2>
      <p className="text-lg text-text-secondary mb-6 leading-relaxed">
        Explore our in-depth articles and cost guides related to {serviceName.toLowerCase()}.
      </p>
      {/* Cost guide prominent card */}
      {/* Blog article cards in a grid */}
    </div>
  );
}
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-05-a | Service pillar pages call getSiloArticles/getBlogArticlesForService | integration | `npx vitest run src/lib/__tests__/internal-links.test.ts -x` | Extend existing |
| SEO-05-b | All 8 services return at least 1 blog article or cost guide | unit | `npx vitest run src/lib/__tests__/silo-forward-links.test.ts -x` | Wave 0 |
| SEO-06 | SEGMENT_LABELS covers guides, cost, materials, problems, gallery | unit | `npx vitest run src/components/layout/__tests__/breadcrumbs.test.ts -x` | Wave 0 |
| SEO-05-c | ContentNode type union does not include service-in-city | unit (type check) | `npx tsc --noEmit` | Existing (tsc) |

### Sampling Rate
- **Per task commit:** `npx vitest run`
- **Per wave merge:** `npx vitest run && npx tsc --noEmit`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/__tests__/silo-forward-links.test.ts` -- covers SEO-05 (all 8 services have forward link data)
- [ ] `src/components/layout/__tests__/breadcrumbs-labels.test.ts` -- covers SEO-06 (SEGMENT_LABELS completeness)

## Open Questions

1. **Section placement within emergency template**
   - What we know: Standard template has 13 sections. Emergency template has 12 sections. Both need silo links.
   - What's unclear: Should emergency template place silo links in the same relative position (before quote form)?
   - Recommendation: Yes, place between FAQ and QuoteForm in both templates. This is the consistent pattern (MaterialServiceCTA in Phase 14 also placed between FAQ and Related Guides).

2. **"commercial-replacement" has zero related blog articles**
   - What we know: No blog article has `relatedServiceSlugs` including `commercial-replacement`. `commercial-repair` has one match (choosing-commercial-flat-roof via relatedServiceSlugs).
   - What's unclear: Should a service page with only a cost guide and no blog articles still render the silo links section?
   - Recommendation: Yes. Show the cost guide link alone. Every service has a cost guide. The section heading can adapt: "Cost Guide" vs "Resources & Guides" based on content availability.

## Sources

### Primary (HIGH confidence)
- Codebase analysis: `src/lib/internal-links.ts` -- full registry implementation, all query functions
- Codebase analysis: `src/lib/__tests__/internal-links.test.ts` -- 649 passing tests including silo article queries
- Codebase analysis: `src/components/layout/breadcrumbs.tsx` -- current SEGMENT_LABELS map
- Codebase analysis: `src/app/(marketing)/services/residential/[service]/page.tsx` -- residential template (13 sections)
- Codebase analysis: `src/app/(marketing)/services/commercial/[service]/page.tsx` -- commercial template (13 sections)
- Codebase analysis: `src/data/content/blog/index.ts` -- 8 blog articles, 5 silo-mapped
- Codebase analysis: `src/data/content/cost-guides/index.ts` -- 8 cost guides, 1:1 with services
- `.planning/v1.0-MILESTONE-AUDIT.md` -- gap definitions, advisory integration improvements #4, #5, #6

### Secondary (MEDIUM confidence)
- `.planning/ROADMAP.md` -- Phase 16 success criteria
- `.planning/REQUIREMENTS.md` -- CONT-08, SEO-05, SEO-06 requirement definitions

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- No new dependencies, all existing infrastructure
- Architecture: HIGH -- All functions exist and are tested; only wiring needed
- Pitfalls: HIGH -- Verified data mappings show exactly which services have coverage gaps
- Breadcrumb labels: HIGH -- Verified current SEGMENT_LABELS map against all route segments

**Research date:** 2026-04-02
**Valid until:** 2026-05-02 (stable -- no moving parts, code-only changes)
