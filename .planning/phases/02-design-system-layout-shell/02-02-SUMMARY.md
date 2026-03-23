---
phase: 02-design-system-layout-shell
plan: 02
subsystem: ui
tags: [header, footer, mega-menu, mobile-nav, breadcrumbs, json-ld, motion, accessibility, sticky-header, shrink-on-scroll]

# Dependency graph
requires:
  - phase: 02-design-system-layout-shell
    plan: 01
    provides: Tailwind 4 @theme color tokens, Button (primary/secondary/phone) and Badge (certification/status) via cva, cn() utility, globals.css base styles
  - phase: 01-foundation
    provides: data registries (services, municipalities, business-info), constants, types, json-ld builders
provides:
  - Header component with sticky shrink-on-scroll behavior, phone link, CTA button
  - MegaMenu desktop flyout with 3 panels (Residential, Commercial, Locations) and full keyboard support
  - MobileNav full-screen overlay with accordion sections, phone/CTA, focus trap, body scroll lock
  - Footer with CTA banner strip, 4-column sitemap, certification badges, copyright bar
  - Breadcrumbs with route-aware auto-generation and BreadcrumbList JSON-LD injection
affects: [02-03, 03-homepage, 04-service-pages, 05-content]

# Tech tracking
tech-stack:
  added: []
  patterns: [sticky-header-shrink-pattern, mega-menu-hover-keyboard-pattern, mobile-nav-focus-trap-pattern, breadcrumb-jsonld-pattern, server-component-footer-pattern]

key-files:
  created:
    - src/components/layout/header.tsx
    - src/components/layout/mega-menu.tsx
    - src/components/layout/mobile-nav.tsx
    - src/components/layout/footer.tsx
    - src/components/layout/breadcrumbs.tsx
  modified: []

key-decisions:
  - "Footer is a Server Component (no 'use client') since it has no interactivity, only static links and data"
  - "MegaMenu uses 100ms close delay on mouse-leave to prevent accidental dismissal during cursor travel"
  - "Breadcrumbs use slug-to-title conversion with SEGMENT_LABELS lookup for known route segments"
  - "buttonVariants used directly on Link elements instead of wrapping Button component around anchors"
  - "MobileNav accordion resets automatically via React remount (AnimatePresence unmounts on close)"

patterns-established:
  - "Sticky header shrink: useScroll + useMotionValueEvent threshold at 100px, motion.header animate height"
  - "MegaMenu hover/keyboard: onMouseEnter/Leave + setTimeout delay, Enter/Space/Escape handlers, click-outside via document listener"
  - "Mobile nav focus trap: query focusable elements, Tab/Shift+Tab wrap-around, Escape to close"
  - "Body scroll lock: document.body.style.overflow toggle in useEffect with cleanup"
  - "Server Component footer: no use client needed for static link grids sourced from data registries"
  - "Breadcrumb JSON-LD: buildBreadcrumbJsonLd cast to Record<string, unknown> for JsonLd component"

requirements-completed: [FNDN-05, FNDN-07, UX-03, UX-04, UX-05, UX-08, SEO-06, CRO-02, CRO-04]

# Metrics
duration: 5min
completed: 2026-03-23
---

# Phase 02 Plan 02: Layout Components Summary

**Sticky Header with shrink-on-scroll, MegaMenu flyout with 3 service/location panels, full-screen MobileNav with accordion, Footer with CTA banner and 4-column sitemap, and route-aware Breadcrumbs with BreadcrumbList JSON-LD**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-23T23:31:19Z
- **Completed:** 2026-03-23T23:36:21Z
- **Tasks:** 2
- **Files created:** 5

## Accomplishments

- Built sticky Header that shrinks from 80px to 56px on scroll past 100px, with phone link and CTA button visible at all scroll positions
- Built MegaMenu with 3 flyout panels populated from data registries (4 residential + 4 commercial services + 12 municipalities) with full hover/keyboard support
- Built full-screen MobileNav overlay with accordion sections, phone/CTA at top, body scroll lock, and focus trap
- Built Footer with CTA banner ("Ready to Protect Your Roof?"), 4-column sitemap linking all services and locations, certification badges, and copyright bar
- Built route-aware Breadcrumbs that auto-generate from pathname and inject BreadcrumbList JSON-LD schema
- All interactive elements have 44px minimum touch targets, aria attributes, and visible focus rings

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Header, MegaMenu, and MobileNav** - `c1fb357` (feat)
2. **Task 2: Build Footer and Breadcrumbs** - `3556ab1` (feat)
3. **Lint fix: Remove redundant useEffect setState in MobileNav** - `56877f4` (fix)

## Files Created/Modified

- `src/components/layout/header.tsx` - Sticky header with shrink-on-scroll, phone link, CTA, hamburger trigger
- `src/components/layout/mega-menu.tsx` - Desktop flyout navigation with 3 panels (Residential, Commercial, Locations)
- `src/components/layout/mobile-nav.tsx` - Full-screen overlay with accordion sections, phone/CTA, focus trap
- `src/components/layout/footer.tsx` - CTA banner strip, 4-column sitemap, certification badges, copyright
- `src/components/layout/breadcrumbs.tsx` - Route-aware breadcrumb trail with BreadcrumbList JSON-LD

## Decisions Made

- **Footer as Server Component:** Footer has no interactivity (no hover state management, no click handlers beyond links). Keeping it as a Server Component reduces client JS. All links use next/link which works in Server Components.
- **buttonVariants on Links:** Header and Footer use `buttonVariants()` applied to `<Link>` className instead of wrapping `<Button>` around anchors. This follows the pattern established in Plan 01 and avoids nested interactive elements.
- **100ms mega-menu close delay:** Prevents accidental panel dismissal when users move cursor between trigger and panel. Industry-standard UX pattern for mega-menus.
- **Accordion reset via remount:** Instead of a useEffect to reset expanded section on close, the MobileNav relies on AnimatePresence unmounting the overlay content. When reopened, useState reinitializes to null. Cleaner and avoids React 19 lint warnings about setState in effects.
- **Slug-to-title conversion in breadcrumbs:** SEGMENT_LABELS handles known route segments; unknown segments get title-cased from slug ("roof-repair" becomes "Roof Repair"). This scales to all future pages without manual registration.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed setState inside useEffect in MobileNav**
- **Found during:** Verification (lint check after Task 2)
- **Issue:** React 19 ESLint rule `react-hooks/set-state-in-effect` flagged `setExpandedSection(null)` inside a useEffect that watched `isOpen`. This pattern causes cascading renders.
- **Fix:** Removed the useEffect entirely. The reset is unnecessary because AnimatePresence unmounts overlay content on close, and useState reinitializes to null on next mount.
- **Files modified:** src/components/layout/mobile-nav.tsx
- **Verification:** pnpm lint passes (only pre-existing _bmad error remains)
- **Committed in:** `56877f4`

---

**Total deviations:** 1 auto-fixed (Rule 1 - bug)
**Impact on plan:** Minor lint compliance fix. No scope creep.

## Issues Encountered

- Pre-existing ESLint error in `_bmad/wds/workflows/5-agentic-development/templates/components/dev-mode.js` (missing rule definition for `n/no-unsupported-features/node-builtins`). Out of scope -- unrelated to this plan's files. Our files lint cleanly.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all components are fully implemented with real data from registries and complete interaction handlers.

## Next Phase Readiness

- All 5 layout components ready for composition in MarketingLayout (Plan 03)
- Header, MegaMenu, MobileNav, Footer, and Breadcrumbs can be imported and composed
- Plan 03 will create SectionWrapper, CTABanner, ScrollReveal section components and the MarketingLayout wrapper

## Self-Check: PASSED

All files verified present. All commits verified in git log.

- header.tsx: FOUND
- mega-menu.tsx: FOUND
- mobile-nav.tsx: FOUND
- footer.tsx: FOUND
- breadcrumbs.tsx: FOUND
- Commit c1fb357: FOUND
- Commit 3556ab1: FOUND
- Commit 56877f4: FOUND

---
*Phase: 02-design-system-layout-shell*
*Completed: 2026-03-23*
