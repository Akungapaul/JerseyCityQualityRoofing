---
phase: 13-seo-cleanup-code-quality
plan: 02
subsystem: testing, types, forms
tags: [typescript, eslint, vitest, react-hooks, react-compare-slider]

# Dependency graph
requires:
  - phase: 10-conversion-performance-polish
    provides: UrgencyBanner component, GalleryComparisonCard, form components
provides:
  - Clean type-check with zero TS errors across codebase
  - Clean react-hooks/refs lint suppression in form components
  - Fixed vi.useFakeTimers Date mock pattern in urgency-banner tests
  - Single NeighborhoodSection interface (removed duplicate)
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "vi.useFakeTimers() + vi.setSystemTime() for Date mocking in Server Component tests"
    - "JS comment (not JSX) for eslint-disable-next-line inside JSX element attributes"

key-files:
  created: []
  modified:
    - src/data/types.ts
    - src/components/forms/compact-quote-form.tsx
    - src/components/forms/quote-form.tsx
    - src/components/sections/__tests__/urgency-banner.test.tsx

key-decisions:
  - "JS comment syntax for eslint-disable inside JSX attributes -- JSX comments produce false 'unused directive' warnings"
  - "vi.useFakeTimers replaces custom MockDate class -- eliminates TS2367 and TS2578 strict mode errors"

patterns-established:
  - "Date mocking: use vi.useFakeTimers() + vi.setSystemTime() before vi.resetModules() + dynamic import for Server Components"
  - "ESLint disable in JSX: use // comment on attribute line, not {/* */} JSX comment on element line"

requirements-completed: [SEO-06]

# Metrics
duration: 5min
completed: 2026-04-02
---

# Phase 13 Plan 02: Code Quality Fixes Summary

**Removed duplicate NeighborhoodSection interface, fixed react-hooks/refs lint errors in form components, replaced broken MockDate pattern with vi.useFakeTimers in urgency-banner tests, confirmed react-compare-slider dependency installed**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-02T02:23:34Z
- **Completed:** 2026-04-02T02:28:22Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Removed duplicate NeighborhoodSection interface from types.ts (lines 203-208), leaving single definition at lines 2-7
- Fixed react-hooks/refs false-positive lint errors in compact-quote-form.tsx and quote-form.tsx using JS comment eslint-disable
- Replaced custom MockDate class pattern with vi.useFakeTimers()/vi.setSystemTime() in urgency-banner.test.tsx, eliminating 6 TS strict-mode errors
- Confirmed react-compare-slider already declared in package.json and installed via pnpm install

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix duplicate interface, lint errors, and TS errors** - `b7fae02` (fix)
   - Followup fix for eslint-disable comment syntax: `50dba1f` (fix)
2. **Task 2: Install missing react-compare-slider dependency** - No commit needed (dependency was already in package.json; pnpm install resolved it)

## Files Created/Modified
- `src/data/types.ts` - Removed duplicate NeighborhoodSection interface (lines 203-208)
- `src/components/forms/compact-quote-form.tsx` - Added eslint-disable for react-hooks/refs on handleSubmit line
- `src/components/forms/quote-form.tsx` - Added eslint-disable for react-hooks/refs on handleSubmit line
- `src/components/sections/__tests__/urgency-banner.test.tsx` - Replaced MockDate with vi.useFakeTimers, removed unused beforeEach import

## Decisions Made
- **JS comment for eslint-disable in JSX attributes:** The plan specified `{/* eslint-disable-next-line */}` as a JSX comment before the `<form>` element. This was flagged as an "unused directive" by ESLint because JSX comments are treated differently. Using a JS comment (`// eslint-disable-next-line`) directly on the attribute line correctly suppresses the error.
- **Task 2 required no file changes:** The `react-compare-slider` package was already declared in `package.json`. The TS2307 error existed only because `node_modules` was missing in the worktree. Running `pnpm install` (necessary for any verification) resolved it.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] JSX comment eslint-disable produced false "unused directive" warning**
- **Found during:** Task 1 (lint verification)
- **Issue:** The plan specified `{/* eslint-disable-next-line react-hooks/refs */}` as a JSX comment. ESLint reported it as "unused" even though the error was present, because JSX comments don't apply to attributes on subsequent lines.
- **Fix:** Changed to JS comment `// eslint-disable-next-line react-hooks/refs` directly before the `onSubmit` attribute
- **Files modified:** src/components/forms/compact-quote-form.tsx, src/components/forms/quote-form.tsx
- **Verification:** `pnpm lint` shows zero react-hooks/refs errors
- **Committed in:** 50dba1f

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minor syntax difference in eslint-disable comment. No scope creep.

## Issues Encountered
- Pre-existing lint errors in `src/components/sections/floating-cta.tsx` (react-hooks/set-state-in-effect) and `src/hooks/use-exit-intent.ts` (react-hooks/purity) prevent `pnpm lint` from exiting 0. These are NOT related to this plan's changes and exist in unmodified files. Zero lint errors in files modified by this plan.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All 5 tech debt items from the v1.0 milestone audit are resolved
- Type-check passes cleanly (zero TS errors)
- All 628 tests pass across 30 test files
- Two pre-existing lint errors in floating-cta.tsx and use-exit-intent.ts remain for a future cleanup plan

## Self-Check: PASSED

All modified files exist. All commit hashes verified in git log.

---
*Phase: 13-seo-cleanup-code-quality*
*Completed: 2026-04-02*
