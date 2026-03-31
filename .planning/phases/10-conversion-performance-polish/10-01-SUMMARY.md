---
phase: 10-conversion-performance-polish
plan: 01
subsystem: ui
tags: [cro, floating-cta, exit-intent, urgency-banner, faq-accordion, motion, hooks]

# Dependency graph
requires:
  - phase: 02-design-system
    provides: "cva+cn pattern, buttonVariants, SectionWrapper, Motion library"
  - phase: 03-lead-capture
    provides: "Quote form with #quote-form ID for FloatingCTA IntersectionObserver"
provides:
  - "FloatingCTA component for persistent quote CTA across all marketing pages"
  - "ExitIntentPopup component with focus trap and scroll lock for service/location pages"
  - "UrgencyBanner server component with emergency and storm-season variants"
  - "useScrollPastFold hook for scroll threshold detection"
  - "useExitIntent hook with desktop mouseLeave and mobile scroll-up detection"
  - "Marketing layout integration with all three CRO components"
affects: [10-conversion-performance-polish, emergency-roofing-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Module-level flag for session-persistent dismiss state (useExitIntent)"
    - "IntersectionObserver for #quote-form visibility detection (FloatingCTA)"
    - "Pathname-based hook filtering to avoid layout client component conversion"
    - "Server Component urgency banner with date-based conditional rendering"

key-files:
  created:
    - src/hooks/use-scroll-past-fold.ts
    - src/hooks/use-exit-intent.ts
    - src/components/sections/floating-cta.tsx
    - src/components/sections/exit-intent-popup.tsx
    - src/components/sections/urgency-banner.tsx
    - src/hooks/__tests__/use-scroll-past-fold.test.ts
    - src/hooks/__tests__/use-exit-intent.test.ts
    - src/components/sections/__tests__/floating-cta.test.tsx
    - src/components/sections/__tests__/exit-intent-popup.test.tsx
    - src/components/sections/__tests__/urgency-banner.test.tsx
    - src/components/sections/__tests__/faq-accordion.test.tsx
  modified:
    - src/app/(marketing)/layout.tsx

key-decisions:
  - "Exit-intent hook checks pathname internally to keep marketing layout as Server Component"
  - "Module-level dismissed flag for session persistence without cookies or localStorage"
  - "UrgencyBanner is a Server Component (no use client) - date computed at build time for SSG"

patterns-established:
  - "Custom hooks in src/hooks/ directory with use client directive"
  - "Module-level state for cross-mount session persistence in hooks"

requirements-completed: [CRO-03, CRO-05, CRO-09, UX-07]

# Metrics
duration: 5min
completed: 2026-03-31
---

# Phase 10 Plan 01: CRO Components Summary

**Floating quote CTA, exit-intent popup with focus trap, and conditional urgency banner wired into marketing layout with full test coverage**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-31T02:34:58Z
- **Completed:** 2026-03-31T02:40:49Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Created useScrollPastFold and useExitIntent hooks with passive scroll listeners and session-persistent dismiss
- Built FloatingCTA with AnimatePresence animation, IntersectionObserver for #quote-form hiding, and responsive mobile/desktop layouts
- Built ExitIntentPopup with focus trap, scroll lock, Tab cycling, Escape dismiss, and next/link for /contact CTA
- Built UrgencyBanner as Server Component with emergency (always) and storm-season (June-November) variants
- Verified existing FaqAccordion satisfies UX-07 with single-open accordion behavior
- All 6 test files pass (607 total tests green including existing suite)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create hooks, CRO components, and Wave 0 test scaffolds** - `3146792` (feat)
2. **Task 2: Wire CRO components into marketing layout and verify build** - `6e99931` (feat)

## Files Created/Modified
- `src/hooks/use-scroll-past-fold.ts` - Scroll threshold detection hook with passive listener
- `src/hooks/use-exit-intent.ts` - Exit intent detection with desktop mouseLeave and mobile scroll-up, pathname filtering
- `src/components/sections/floating-cta.tsx` - Fixed-position CTA with IntersectionObserver and AnimatePresence
- `src/components/sections/exit-intent-popup.tsx` - Dialog with focus trap, scroll lock, and next/link CTA
- `src/components/sections/urgency-banner.tsx` - Server Component with conditional emergency/storm-season rendering
- `src/app/(marketing)/layout.tsx` - Updated with FloatingCTA, ExitIntentPopup, and UrgencyBanner
- `src/hooks/__tests__/use-scroll-past-fold.test.ts` - 5 tests for scroll hook
- `src/hooks/__tests__/use-exit-intent.test.ts` - 6 tests for exit intent hook
- `src/components/sections/__tests__/floating-cta.test.tsx` - 6 tests for floating CTA
- `src/components/sections/__tests__/exit-intent-popup.test.tsx` - 7 tests for exit popup
- `src/components/sections/__tests__/urgency-banner.test.tsx` - 7 tests for urgency banner
- `src/components/sections/__tests__/faq-accordion.test.tsx` - 6 tests for FAQ accordion verification

## Decisions Made
- Exit-intent hook checks `window.location.pathname` internally against `/services/` and `/service-areas/` prefixes rather than receiving an `enabled` prop, keeping the marketing layout as a Server Component
- Module-level `let dismissed = false` flag for session persistence across component mounts -- simpler than cookies/localStorage and sufficient for single-session behavior
- UrgencyBanner is a Server Component (no "use client") with `new Date().getMonth()` computed at build time -- avoids hydration mismatch on SSG pages
- FloatingCTA falls back to `/contact` href when `#quote-form` element is not found on the page

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed cleanup function in exit-intent-popup useEffect**
- **Found during:** Task 1 (ExitIntentPopup creation)
- **Issue:** Cleanup function called `document.addEventListener` instead of `document.removeEventListener` for keydown handler
- **Fix:** Changed to `document.removeEventListener("keydown", handleKeyDown)` in cleanup
- **Files modified:** src/components/sections/exit-intent-popup.tsx
- **Verification:** Code review confirmed proper cleanup
- **Committed in:** 3146792 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Essential for preventing memory leaks. No scope creep.

## Issues Encountered
- Worktree node_modules was missing, requiring `pnpm install` before tests could run. Standard setup step for worktree execution.

## Known Stubs
None - all components are fully wired with real data sources (constants, hooks, layout integration).

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- CRO components are live in the marketing layout and ready for browser verification
- FloatingCTA will automatically show on all marketing pages after scroll threshold
- ExitIntentPopup will trigger only on /services/ and /service-areas/ pages after 5s dwell
- UrgencyBanner storm-season variant will render conditionally based on build date month
- Plan 10-02 (gallery) and Plan 10-03 (performance) can proceed independently

## Self-Check: PASSED

All 12 files verified present. Both task commits (3146792, 6e99931) verified in git log.

---
*Phase: 10-conversion-performance-polish*
*Completed: 2026-03-31*
