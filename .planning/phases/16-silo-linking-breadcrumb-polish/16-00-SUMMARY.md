---
phase: 16-silo-linking-breadcrumb-polish
plan: 00
subsystem: testing
tags: [vitest, seo, internal-links, breadcrumbs, tdd, wave-0]

# Dependency graph
requires:
  - phase: 09-blog-supporting-content
    provides: internal-links.ts content registry with all 7 content types
  - phase: 02-design-system-core-layout
    provides: breadcrumbs.tsx with SEGMENT_LABELS
provides:
  - Wave 0 test stubs for silo forward link coverage (SEO-05)
  - Wave 0 test stubs for SEGMENT_LABELS completeness (SEO-06)
affects: [16-01-PLAN, 16-02-PLAN]

# Tech tracking
tech-stack:
  added: []
  patterns: [file-read structural testing for non-exported constants, describe.each for parameterized service slug testing]

key-files:
  created:
    - src/lib/__tests__/silo-forward-links.test.ts
    - src/components/layout/__tests__/breadcrumbs-labels.test.ts
  modified: []

key-decisions:
  - "Silo forward links test uses resetRegistry() before initializeContentRegistry() to ensure clean state"
  - "Breadcrumb labels test uses source file reading (fs.readFileSync) since SEGMENT_LABELS is not exported"
  - "Entry-counting regex matches both quoted and unquoted JS object keys for accurate count"

patterns-established:
  - "Wave 0 TDD: tests that validate data relationships pass immediately when data exists (silo links)"
  - "Wave 0 TDD: tests that validate missing production code fail immediately (breadcrumb labels)"
  - "Structural source testing: readFileSync + regex for testing non-exported constants"

requirements-completed: [SEO-05, SEO-06]

# Metrics
duration: 2min
completed: 2026-04-02
---

# Phase 16 Plan 00: Wave 0 Test Stubs Summary

**TDD Wave 0 test stubs for silo forward link coverage (32 tests passing) and breadcrumb SEGMENT_LABELS completeness (6 tests failing -- expected RED state)**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-02T17:41:56Z
- **Completed:** 2026-04-02T17:44:05Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created silo forward links test covering all 8 service slugs with 32 passing tests validating cost guides and blog articles exist per service
- Created breadcrumb SEGMENT_LABELS test with 6 failing tests (RED state) asserting 5 missing labels (guides, cost, materials, problems, gallery) and minimum entry count of 12
- Established Wave 0 behavioral contracts for Plans 01 and 02 to implement against

## Task Commits

Each task was committed atomically:

1. **Task 1: Create silo forward links test stub** - `dae5166` (test)
2. **Task 2: Create breadcrumb SEGMENT_LABELS completeness test stub** - `5ed44ee` (test)

## Files Created/Modified
- `src/lib/__tests__/silo-forward-links.test.ts` - 32 tests validating all 8 services have forward links (cost guides and/or blog articles) with valid InternalLink shapes
- `src/components/layout/__tests__/breadcrumbs-labels.test.ts` - 6 tests validating SEGMENT_LABELS has entries for guides, cost, materials, problems, gallery and at least 12 total entries

## Decisions Made
- Used `resetRegistry()` before `initializeContentRegistry()` in silo forward links test to ensure clean registry state and avoid interference from other test files
- Used `readFileSync` source file inspection for breadcrumb labels test since `SEGMENT_LABELS` is a non-exported `const` -- this avoids needing to mock `usePathname` and `headers()` for rendering
- Updated entry-counting regex to match both quoted keys (`"service-areas"`) and unquoted keys (`services`) for accurate current entry count

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed entry-counting regex for mixed key styles**
- **Found during:** Task 2 (breadcrumbs labels test)
- **Issue:** Plan's regex `["'][^"']+["']\s*:` only matched quoted keys, but breadcrumbs.tsx uses mostly unquoted keys (e.g., `services:` not `"services":`). Initial count showed 1 instead of 7.
- **Fix:** Updated regex to `(?:["'][^"']+["']|[a-zA-Z_]\w*)\s*:` to match both quoted and unquoted keys. Also updated individual label pattern to use `(?:["']key["']|key)` for robustness.
- **Files modified:** src/components/layout/__tests__/breadcrumbs-labels.test.ts
- **Verification:** Test correctly identifies 7 current entries (fails at >= 12 threshold as expected)
- **Committed in:** 5ed44ee (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Regex fix necessary for accurate entry counting. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - these are test files only, no production stubs.

## Next Phase Readiness
- Wave 0 tests establish the behavioral contract for Plans 01 and 02
- Plan 01 (SiloContentLinks component) can verify forward link rendering against the passing silo tests
- Plan 02 (breadcrumb label additions) will turn the 6 failing breadcrumb tests green

## Self-Check: PASSED

- [x] src/lib/__tests__/silo-forward-links.test.ts - FOUND
- [x] src/components/layout/__tests__/breadcrumbs-labels.test.ts - FOUND
- [x] 16-00-SUMMARY.md - FOUND
- [x] Commit dae5166 - FOUND
- [x] Commit 5ed44ee - FOUND

---
*Phase: 16-silo-linking-breadcrumb-polish*
*Completed: 2026-04-02*
