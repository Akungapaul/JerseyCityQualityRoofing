---
phase: 13-seo-cleanup-code-quality
plan: 01
subsystem: seo
tags: [json-ld, breadcrumbs, sitemap, structured-data, noindex]

# Dependency graph
requires:
  - phase: 11-silo-index-pages
    provides: Silo index pages with BreadcrumbList JSON-LD (now duplicate)
  - phase: 09-blog-supporting-content
    provides: Blog, guides, problems pages with BreadcrumbList JSON-LD (now duplicate)
provides:
  - Zero duplicate BreadcrumbList JSON-LD across 13 page files
  - Testimonials stub excluded from sitemap and marked noindex
  - Updated sitemap test with correct URL count (154)
affects: [seo-validation, structured-data-audit]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Layout Breadcrumbs component is sole BreadcrumbList JSON-LD source (page-level removed)"
    - "Stub pages use robots noindex + sitemap exclusion as defense-in-depth"

key-files:
  created: []
  modified:
    - src/app/(marketing)/services/page.tsx
    - src/app/(marketing)/services/residential/page.tsx
    - src/app/(marketing)/services/commercial/page.tsx
    - src/app/(marketing)/services/residential/[service]/[city]/page.tsx
    - src/app/(marketing)/services/commercial/[service]/[city]/page.tsx
    - src/app/(marketing)/service-areas/[city]/page.tsx
    - src/app/(marketing)/blog/page.tsx
    - src/app/(marketing)/blog/[slug]/page.tsx
    - src/app/(marketing)/guides/page.tsx
    - src/app/(marketing)/guides/cost/[slug]/page.tsx
    - src/app/(marketing)/guides/materials/[slug]/page.tsx
    - src/app/(marketing)/problems/page.tsx
    - src/app/(marketing)/problems/[slug]/page.tsx
    - src/app/sitemap.ts
    - src/lib/__tests__/sitemap.test.ts
    - src/app/(marketing)/testimonials/page.tsx

key-decisions:
  - "Removed unused BASE_URL imports from 5 files where it was only used for breadcrumb arrays"

patterns-established:
  - "BreadcrumbList JSON-LD emitted only by layout Breadcrumbs component, never by individual pages"
  - "Stub/placeholder pages excluded from sitemap AND marked noindex for defense-in-depth"

requirements-completed: [SEO-06]

# Metrics
duration: 8min
completed: 2026-04-02
---

# Phase 13 Plan 01: Duplicate BreadcrumbList JSON-LD Removal and Testimonials Sitemap Exclusion Summary

**Removed duplicate BreadcrumbList JSON-LD from 13 page files and excluded testimonials stub from sitemap with noindex metadata**

## Performance

- **Duration:** 8 min
- **Started:** 2026-04-02T02:23:31Z
- **Completed:** 2026-04-02T02:31:50Z
- **Tasks:** 2
- **Files modified:** 16

## Accomplishments
- Eliminated duplicate BreadcrumbList JSON-LD from all 13 page files (layout Breadcrumbs component now sole source)
- Excluded testimonials stub page from sitemap XML (154 URLs, down from 155)
- Added noindex robots directive to testimonials page as defense-in-depth
- Updated sitemap test with correct URL count and explicit testimonials exclusion assertion

## Task Commits

Each task was committed atomically:

1. **Task 1: Remove duplicate BreadcrumbList JSON-LD from 13 page files** - `0ba55de` (fix)
2. **Task 2: Exclude testimonials from sitemap and add noindex metadata** - `5eaf0c1` (fix)

## Files Created/Modified
- `src/app/(marketing)/services/page.tsx` - Removed buildBreadcrumbJsonLd import and JSX
- `src/app/(marketing)/services/residential/page.tsx` - Removed buildBreadcrumbJsonLd import and JSX
- `src/app/(marketing)/services/commercial/page.tsx` - Removed buildBreadcrumbJsonLd import and JSX
- `src/app/(marketing)/services/residential/[service]/[city]/page.tsx` - Removed buildBreadcrumbJsonLd import, JSX, and breadcrumbItems variable
- `src/app/(marketing)/services/commercial/[service]/[city]/page.tsx` - Removed buildBreadcrumbJsonLd import, JSX, and breadcrumbItems variable
- `src/app/(marketing)/service-areas/[city]/page.tsx` - Removed buildBreadcrumbJsonLd import, JSX, breadcrumbItems variable, and unused BASE_URL import
- `src/app/(marketing)/blog/page.tsx` - Removed buildBreadcrumbJsonLd import, JSX, and unused BASE_URL import
- `src/app/(marketing)/blog/[slug]/page.tsx` - Removed buildBreadcrumbJsonLd import, JSX, and unused BASE_URL import
- `src/app/(marketing)/guides/page.tsx` - Removed buildBreadcrumbJsonLd import, JSX, and unused BASE_URL import
- `src/app/(marketing)/guides/cost/[slug]/page.tsx` - Removed buildBreadcrumbJsonLd import, JSX, and unused BASE_URL import
- `src/app/(marketing)/guides/materials/[slug]/page.tsx` - Removed buildBreadcrumbJsonLd import, JSX, and unused BASE_URL import
- `src/app/(marketing)/problems/page.tsx` - Removed buildBreadcrumbJsonLd import, JSX, and unused BASE_URL import
- `src/app/(marketing)/problems/[slug]/page.tsx` - Removed buildBreadcrumbJsonLd import, JSX, and unused BASE_URL import
- `src/app/sitemap.ts` - Removed testimonials entry from static pages array
- `src/lib/__tests__/sitemap.test.ts` - Updated URL count to 154, added testimonials exclusion test
- `src/app/(marketing)/testimonials/page.tsx` - Added robots: { index: false, follow: true } metadata

## Decisions Made
- Removed unused BASE_URL imports from 5 files where it was exclusively used for breadcrumb data (blog/[slug], guides/cost/[slug], guides/materials/[slug], problems/[slug], service-areas/[city]) -- avoids unused-import lint errors
- All other JSON-LD (RoofingContractor, CollectionPage, FAQPage, BlogPosting, Service, CityRoofingContractor) preserved intact

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Removed unused BASE_URL imports from 5 additional files**
- **Found during:** Task 1 (BreadcrumbList JSON-LD removal)
- **Issue:** After removing buildBreadcrumbJsonLd and breadcrumbItems, 5 files had BASE_URL imports that were no longer referenced anywhere in the file
- **Fix:** Removed the unused `import { BASE_URL } from '@/lib/constants'` line from: service-areas/[city], blog/[slug], guides/cost/[slug], guides/materials/[slug], problems/[slug]
- **Files modified:** 5 page files (listed above)
- **Verification:** grep confirmed no remaining BASE_URL usage in those files; type-check confirmed no errors from our changes
- **Committed in:** 0ba55de (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 2 - unused import cleanup)
**Impact on plan:** Necessary to prevent TypeScript/lint unused-import errors. No scope creep.

## Issues Encountered
- Pre-existing type errors in urgency-banner.test.tsx (unrelated to our changes, not in scope)
- Pre-existing lint errors in exit-intent hook (unrelated to our changes, not in scope)

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - no stubs created or left unresolved by this plan.

## Next Phase Readiness
- All duplicate BreadcrumbList JSON-LD eliminated; Google Search Console should stop flagging duplicates
- Testimonials page safely hidden from search until real content is added
- Ready for Plan 02 (code quality improvements)

## Self-Check: PASSED

- All 16 modified/created files verified present on disk
- Both task commits (0ba55de, 5eaf0c1) verified in git history
- SUMMARY.md verified present at expected path

---
*Phase: 13-seo-cleanup-code-quality*
*Completed: 2026-04-02*
