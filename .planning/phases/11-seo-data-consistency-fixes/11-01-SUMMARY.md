---
phase: 11-seo-data-consistency-fixes
plan: 01
subsystem: seo
tags: [json-ld, og-image, sitemap, nap-consistency, schema-org, entity-graph]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: JSON-LD builder, sitemap generator, constants module
  - phase: 08-service-in-city-pages
    provides: City and service-in-city JSON-LD builders referencing @id anchor
provides:
  - "@id entity anchor on root RoofingContractorJsonLd for cross-page entity graph resolution"
  - "NAP-consistent OG image route using SITE_NAME and PHONE_NUMBER constants"
  - "Silo index URLs (/services, /services/residential, /services/commercial) in sitemap"
  - "Wave 0 test assertions for JSON-LD @id, OG route constants, and sitemap silo entries"
affects: [11-02-PLAN, seo-schema-markup, og-images, sitemap]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "File content assertion pattern: readFileSync in tests to validate source code uses constants (not hardcoded strings)"

key-files:
  created: []
  modified:
    - src/lib/seo/json-ld.tsx
    - src/app/api/og/route.tsx
    - src/app/sitemap.ts
    - src/lib/__tests__/json-ld.test.ts
    - src/lib/__tests__/nap-consistency.test.ts
    - src/lib/__tests__/sitemap.test.ts

key-decisions:
  - "OG route imports from @/lib/constants (not @/data/business-info) for edge runtime safety"
  - "Silo index URLs use priority 0.8 matching service-areas hub page"

patterns-established:
  - "Source file content assertions: readFileSync + resolve(__dirname) to validate constants usage vs hardcoded strings"

requirements-completed: [SEO-04, SEO-14]

# Metrics
duration: 3min
completed: 2026-03-31
---

# Phase 11 Plan 01: SEO Data Consistency Fixes Summary

**Root JSON-LD @id entity anchor for 108-page graph resolution, OG route NAP constants, and 3 silo index sitemap URLs with TDD test coverage**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-31T14:10:25Z
- **Completed:** 2026-03-31T14:13:50Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Added `@id: ${BASE_URL}/#organization` to root `buildRoofingContractorJsonLd` enabling Google to resolve the entity graph across ~108 city and service-in-city pages that reference this anchor
- Replaced hardcoded company name and phone number in OG image route with `SITE_NAME` and `PHONE_NUMBER` constant imports, eliminating NAP drift risk
- Added 3 silo index URLs to sitemap (/services, /services/residential, /services/commercial), bringing total from 152 to 155
- Wrote 7 new test assertions across 3 test files using TDD-lite approach (RED then GREEN)
- Full test suite passes: 620/620 tests, 28 files, zero regressions

## Task Commits

Each task was committed atomically:

1. **Task 1: Wave 0 test assertions + JSON-LD @id anchor fix** - `8e16c1c` (feat)
2. **Task 2: OG route constants fix + sitemap silo index entries** - `e761473` (fix)

## Files Created/Modified
- `src/lib/seo/json-ld.tsx` - Added @id entity anchor to buildRoofingContractorJsonLd
- `src/app/api/og/route.tsx` - Replaced hardcoded strings with SITE_NAME and PHONE_NUMBER imports
- `src/app/sitemap.ts` - Added 3 silo index URLs to staticPages array
- `src/lib/__tests__/json-ld.test.ts` - Added @id entity anchor test assertion
- `src/lib/__tests__/nap-consistency.test.ts` - Added 3 OG route constants test assertions
- `src/lib/__tests__/sitemap.test.ts` - Added silo index URL test + updated count from 152 to 155

## Decisions Made
- OG route imports from `@/lib/constants` (not `@/data/business-info`) for edge runtime safety per 11-RESEARCH.md Pitfall 1
- Silo index URLs use priority 0.8, matching the existing service-areas hub page priority level

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed __dirname relative path in NAP consistency test**
- **Found during:** Task 1 (RED phase - writing OG route tests)
- **Issue:** Plan specified `resolve(__dirname, '../../../app/api/og/route.tsx')` but __dirname resolves to `src/lib/__tests__/`, so 3 levels up goes to repo root instead of `src/`
- **Fix:** Changed to `resolve(__dirname, '../../app/api/og/route.tsx')` (2 levels up to `src/`, then into `app/api/og/`)
- **Files modified:** src/lib/__tests__/nap-consistency.test.ts
- **Verification:** Tests correctly read and parse the OG route file
- **Committed in:** 8e16c1c (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minor path correction. No scope creep.

## Issues Encountered
None beyond the path deviation noted above.

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all changes are fully wired to production code paths.

## Next Phase Readiness
- Plan 02 (silo index page creation) can proceed -- sitemap already includes the 3 URLs these pages will serve
- Entity graph is now complete: root JSON-LD anchors with @id, city pages and service-in-city pages reference it

## Self-Check: PASSED

All 7 files verified present. Both task commits (8e16c1c, e761473) confirmed in git log.

---
*Phase: 11-seo-data-consistency-fixes*
*Completed: 2026-03-31*
