---
phase: 09-blog-supporting-content
plan: 05
subsystem: ui, seo, content
tags: [next-app-router, generateStaticParams, json-ld, internal-linking, server-components, sitemap]

# Dependency graph
requires:
  - phase: 09-01
    provides: Internal linking utility (internal-links.ts), JSON-LD builders, section components stubs
  - phase: 09-02
    provides: Section components (BlogHero, GuideHero, CostTable, MaterialComparison, etc.)
  - phase: 09-03
    provides: Blog article content data, cost guide content data
  - phase: 09-04
    provides: Material guide content data, problem-solution content data
provides:
  - 7 fully implemented page templates (blog hub, blog article, guides hub, cost guide, material guide, problems hub, problem page)
  - Wired initializeContentRegistry() populating internal linking from all 4 content registries
  - Extended sitemap with 27 new dynamic URLs (blog, cost guide, material guide, problem pages)
  - All Wave 0 test scaffolds activated and passing (570 total tests green)
affects: [phase-10, seo-verification, content-audit]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "initializeContentRegistry() idempotent pattern with module-level initialized flag"
    - "slugifyHeading() for TOC anchor IDs from heading text"
    - "countWords() helper for JSON-LD wordCount per content type"

key-files:
  created: []
  modified:
    - src/app/(marketing)/blog/page.tsx
    - src/app/(marketing)/blog/[slug]/page.tsx
    - src/app/(marketing)/guides/page.tsx
    - src/app/(marketing)/guides/cost/[slug]/page.tsx
    - src/app/(marketing)/guides/materials/[slug]/page.tsx
    - src/app/(marketing)/problems/page.tsx
    - src/app/(marketing)/problems/[slug]/page.tsx
    - src/lib/internal-links.ts
    - src/app/sitemap.ts
    - src/data/__tests__/blog-content.test.ts
    - src/data/__tests__/cost-guide-content.test.ts
    - src/data/__tests__/material-guide-content.test.ts
    - src/data/__tests__/problem-content.test.ts
    - src/lib/__tests__/sitemap.test.ts

key-decisions:
  - "Blog article template uses <article> wrapper (not <main>) per HTML5 semantics and UI-SPEC"
  - "initializeContentRegistry() uses idempotent pattern (initialized flag) to avoid duplicate registrations across page renders"
  - "Cost guide SiloPillarLink placed after saving strategies section for natural reading flow to service page"
  - "Hub pages use GuideHero component (not BlogHero) with categoryBadgeLabel for consistent guide-style presentation"

patterns-established:
  - "Content page template pattern: generateStaticParams from ALL_* array, generateMetadata from getter, initializeContentRegistry before link functions"
  - "Multi-schema JSON-LD pattern: each content page emits Article/BlogPosting + FAQPage + RoofingContractor + Breadcrumb"
  - "Hub page pattern: GuideHero + BadgeStrip + intro prose + card grid + CTABanner"

requirements-completed: [CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, SEO-05]

# Metrics
duration: 8min
completed: 2026-03-29
---

# Phase 9 Plan 05: Page Templates & Integration Summary

**Full page templates wiring blog, guide, material, and problem content to 7 static pages with JSON-LD, internal linking, and tone alternation**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-29T16:22:03Z
- **Completed:** 2026-03-29T16:30:03Z
- **Tasks:** 4
- **Files modified:** 14

## Accomplishments
- All 7 page templates rewritten from stubs to full implementations with section alternation per UI-SPEC
- Internal linking registry populated from all 4 content registries (blog, cost guides, material guides, problems)
- Sitemap extended from 125 to 152 URLs with all new content pages
- All Wave 0 test scaffolds activated: 570 tests pass with 0 failures
- Production build succeeds with all pages statically generated

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite blog page templates (hub + article page)** - `1d095cb` (feat)
2. **Task 2: Rewrite guide page templates (guides hub + cost guide + material guide)** - `c48cd4e` (feat)
3. **Task 3: Rewrite problem page templates (problems hub + problem page)** - `de811fd` (feat)
4. **Task 4: Wire internal-links registry, update sitemap, and activate Wave 0 tests** - `f0e0acd` (feat)

## Files Created/Modified
- `src/app/(marketing)/blog/page.tsx` - Blog hub with article grid sorted by publish date
- `src/app/(marketing)/blog/[slug]/page.tsx` - Blog article with silo linking, TOC, full section alternation
- `src/app/(marketing)/guides/page.tsx` - Guides hub with cost and material guide grids
- `src/app/(marketing)/guides/cost/[slug]/page.tsx` - Cost guide with pricing table, location pricing, silo link
- `src/app/(marketing)/guides/materials/[slug]/page.tsx` - Material guide with pros/cons comparison
- `src/app/(marketing)/problems/page.tsx` - Problems hub with AlertTriangle card grid
- `src/app/(marketing)/problems/[slug]/page.tsx` - Problem page with identification signs and service CTAs
- `src/lib/internal-links.ts` - Wired initializeContentRegistry() with all 4 content registries
- `src/app/sitemap.ts` - Added blog, cost guide, material guide, and problem dynamic entries
- `src/data/__tests__/blog-content.test.ts` - Activated with real imports
- `src/data/__tests__/cost-guide-content.test.ts` - Activated with real imports
- `src/data/__tests__/material-guide-content.test.ts` - Activated with real imports
- `src/data/__tests__/problem-content.test.ts` - Activated with real imports
- `src/lib/__tests__/sitemap.test.ts` - Updated URL count from 125 to 152

## Decisions Made
- Blog article uses `<article>` wrapper, not `<main>`, per HTML5 semantics (marketing layout provides `<main>`)
- `initializeContentRegistry()` uses idempotent pattern with module-level `initialized` flag to prevent duplicate registrations
- Cost guide `SiloPillarLink` placed after saving strategies section for natural content flow
- Hub pages all use `GuideHero` component with `categoryBadgeLabel` for consistent badge styling
- `buildBlogPostingJsonLd` reused for cost/material/problem pages with `schemaType: 'Article'` and `basePath` override

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Updated stale sitemap test URL count**
- **Found during:** Task 4 (test verification)
- **Issue:** Sitemap test hardcoded 125 URLs but plan added 27 new content pages, making total 152
- **Fix:** Updated test expectation from 125 to 152 with comment documenting the breakdown
- **Files modified:** src/lib/__tests__/sitemap.test.ts
- **Verification:** All 570 tests pass
- **Committed in:** f0e0acd (Task 4 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Minor test count update. No scope creep.

## Issues Encountered
- Node modules were not installed in the worktree; ran `pnpm install` before test execution

## Known Stubs
None -- all page templates are fully wired to content data with no placeholder text, hardcoded empty values, or TODO markers.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 9 blog & supporting content is now complete across all 5 plans
- All 7 page types render full content with JSON-LD, metadata, and internal linking
- 570 tests pass, production build succeeds with all pages statically generated
- Ready for Phase 10 or verification

---
*Phase: 09-blog-supporting-content*
*Completed: 2026-03-29*
