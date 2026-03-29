---
phase: 09-blog-supporting-content
plan: 01
subsystem: content-infrastructure
tags: [typescript, interfaces, vitest, json-ld, internal-linking, seo, schema-dts]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: types.ts, json-ld.tsx, constants.ts, business-info.ts, vitest config
  - phase: 05-residential-service-pages
    provides: ServiceContent, EmergencyContent interfaces, content data pattern
provides:
  - BlogArticle, CostGuide, MaterialGuide, ProblemSolution, ArticleSection, CostRange, LocationPricing interfaces
  - Wave 0 test scaffolds for all Phase 9 content types (4 files with describe.skip)
  - Internal linking utility (src/lib/internal-links.ts) with 10 exported functions
  - BlogPosting and CollectionPage JSON-LD schema builders
affects: [09-02-blog-system, 09-03-content-data, 09-04-guides-problems, 09-05-hub-sitemap]

# Tech tracking
tech-stack:
  added: []
  patterns: [content-registry-pattern, relevance-score-algorithm, silo-boundary-linking]

key-files:
  created:
    - src/lib/internal-links.ts
    - src/lib/__tests__/internal-links.test.ts
    - src/data/__tests__/blog-content.test.ts
    - src/data/__tests__/cost-guide-content.test.ts
    - src/data/__tests__/material-guide-content.test.ts
    - src/data/__tests__/problem-content.test.ts
  modified:
    - src/data/types.ts
    - src/lib/seo/json-ld.tsx

key-decisions:
  - "Internal linking uses module-level registry with registerContent/registerBulk pattern for lazy initialization"
  - "Relevance scoring: same silo +10, shared tags +2, shared services +3, shared materials +2, shared problems +2"
  - "Cross-silo links prefer standalone (siloService=null) articles over other-silo articles"
  - "Wave 0 test scaffolds use describe.skip with placeholder empty arrays, activated when content arrives"

patterns-established:
  - "ContentNode registry pattern: module-level array populated via registerContent/registerBulk, cleared via clearRegistry for tests"
  - "Relevance-based linking: computeRelevanceScore multi-dimensional scoring for content relationships"
  - "Wave 0 test scaffold: describe.skip blocks with TODO import comments, placeholder data arrays"

requirements-completed: [CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, SEO-05]

# Metrics
duration: 4min
completed: 2026-03-29
---

# Phase 9 Plan 01: Foundation Infrastructure Summary

**Content type interfaces (7 types), Wave 0 test scaffolds (4 files), internal linking utility (10 functions with silo-aware relevance scoring), and BlogPosting/CollectionPage JSON-LD builders**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-29T15:36:15Z
- **Completed:** 2026-03-29T15:41:06Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Added 7 content type interfaces to types.ts: BlogArticle, CostGuide, MaterialGuide, ProblemSolution, ArticleSection, CostRange, LocationPricing
- Created 4 Wave 0 test scaffold files with describe.skip blocks covering requirements CONT-01 through CONT-06
- Built internal linking utility with 10 exported functions, silo boundary awareness, and multi-dimensional relevance scoring
- Extended json-ld.tsx with buildBlogPostingJsonLd and buildCollectionPageJsonLd schema builders
- All 543 existing tests pass, 27 Wave 0 tests properly skipped, zero regressions

## Task Commits

Each task was committed atomically:

1. **Task 1: Add content type interfaces and Wave 0 test scaffolds** - `01bda1b` (feat)
2. **Task 2: Build internal linking utility and JSON-LD extensions** - `ee4af98` (feat)

## Files Created/Modified
- `src/data/types.ts` - Added BlogArticle, CostGuide, MaterialGuide, ProblemSolution, ArticleSection, CostRange, LocationPricing interfaces
- `src/lib/internal-links.ts` - Content registry with 10 exported linking functions and relevance scoring algorithm
- `src/lib/__tests__/internal-links.test.ts` - 14 active test cases for internal linking utility
- `src/lib/seo/json-ld.tsx` - Added buildBlogPostingJsonLd and buildCollectionPageJsonLd builders with BlogPosting/CollectionPage schema-dts imports
- `src/data/__tests__/blog-content.test.ts` - Wave 0 scaffold for blog articles (9 tests in describe.skip)
- `src/data/__tests__/cost-guide-content.test.ts` - Wave 0 scaffold for cost guides (6 tests in describe.skip)
- `src/data/__tests__/material-guide-content.test.ts` - Wave 0 scaffold for material guides (6 tests in describe.skip)
- `src/data/__tests__/problem-content.test.ts` - Wave 0 scaffold for problem pages (6 tests in describe.skip)

## Decisions Made
- Internal linking uses module-level registry array with registerContent/registerBulk pattern -- simple and testable with clearRegistry for test isolation
- Relevance scoring weights: same silo +10, shared tags +2 each, shared services +3 each, shared materials +2 each, shared problems +2 each -- ensures silo affinity dominates
- Cross-silo links sort standalone articles (siloService=null) before other-silo articles -- prevents silo contamination while allowing educational content to bridge silos
- Wave 0 test scaffolds use placeholder empty arrays with TODO import comments -- tests will be activated by swapping imports when content data files arrive in Plans 03-06
- makeBlogNode test helper derives path from slug automatically -- prevents path/slug mismatch bugs in test fixtures

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed test fixture path derivation in makeBlogNode helper**
- **Found during:** Task 2 (internal-links tests)
- **Issue:** makeBlogNode used static path `/blog/test-blog` regardless of slug override, causing 2 test failures where results compared paths against dynamically-named nodes
- **Fix:** Changed makeBlogNode to derive path from slug: `path: /blog/${slug}`
- **Files modified:** src/lib/__tests__/internal-links.test.ts
- **Verification:** All 14 internal-links tests pass
- **Committed in:** ee4af98 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Minor test fixture correction. No scope creep.

## Issues Encountered
- node_modules missing in worktree -- resolved by running `pnpm install` before test execution

## User Setup Required
None - no external service configuration required.

## Known Stubs
- `initializeContentRegistry()` in src/lib/internal-links.ts has empty body with TODO comment -- will be wired in Plan 07 when all content data files exist
- Wave 0 test scaffolds use placeholder empty arrays instead of real imports -- will be activated in Plans 03-06

## Next Phase Readiness
- All 7 content type interfaces ready for content data files in Plans 03-06
- Internal linking utility ready for consumption by page templates
- JSON-LD builders ready for blog article and hub page templates
- Wave 0 test scaffolds ready to be activated when content arrives

---
*Phase: 09-blog-supporting-content*
*Completed: 2026-03-29*
