---
phase: 02-design-system-layout-shell
plan: 01
subsystem: ui
tags: [tailwind-css-4, cva, design-tokens, color-palette, button, badge, cormorant, accessibility]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: project scaffold, cn() utility, constants, layout.tsx with font CSS variables
provides:
  - Tailwind 4 @theme block with approved Deep Olive Sage color palette (10 color tokens)
  - 9-step spacing scale (4px to 120px)
  - 3 animation duration tokens (fast/base/slow)
  - Button component with primary/secondary/phone variants via cva
  - Badge component with certification/status variants via cva
  - Base body/heading typography styles with 18px minimum
  - Focus ring utility, reduced-motion media query, skip-to-content styles
affects: [02-02, 02-03, 03-homepage, 04-service-pages, 05-content]

# Tech tracking
tech-stack:
  added: [motion@12.x, lucide-react@0.477.x, class-variance-authority@0.7.x]
  patterns: [cva-variant-pattern, cn-utility-pattern, tailwind-4-theme-tokens]

key-files:
  created:
    - color-variations/palette-01.html through palette-10.html
    - src/components/ui/button.tsx
    - src/components/ui/badge.tsx
  modified:
    - src/styles/globals.css
    - package.json

key-decisions:
  - "User selected palette-10 (Deep Olive Sage) as the approved color palette"
  - "Deep olive dominant (#2a2e22) with warm gold accent (#c89640) provides dark authoritative mood"
  - "Button phone variant uses no-background styling with underline-on-hover for tel: link integration"
  - "Badge uses span element (not button) since badges are display-only, not interactive"

patterns-established:
  - "cva + cn() pattern: Define variants with cva(), merge with cn() in component render"
  - "Export both component and variants: e.g., export { Button, buttonVariants } for composability"
  - "44px minimum touch target on all interactive elements via min-h-[44px] min-w-[44px]"
  - "Focus ring via focus-visible:ring-2 ring-accent ring-offset-2 ring-offset-dominant"
  - "Color tokens via @theme block: use bg-dominant, text-accent, etc. as Tailwind utilities"

requirements-completed: [FNDN-06, UX-01, UX-02, UX-05, UX-06]

# Metrics
duration: 2min
completed: 2026-03-23
---

# Phase 02 Plan 01: Design Tokens and Primitives Summary

**Deep Olive Sage color palette with 10-token @theme system, Button (primary/secondary/phone) and Badge (certification/status) components via cva**

## Performance

- **Duration:** 2 min (Task 3 only; Tasks 1-2 completed in prior session)
- **Started:** 2026-03-23T23:25:58Z
- **Completed:** 2026-03-23T23:28:06Z
- **Tasks:** 3 (1 auto + 1 checkpoint + 1 auto)
- **Files modified:** 5 (package.json, globals.css, button.tsx, badge.tsx, + 10 HTML palette files)

## Accomplishments

- Generated 10 standalone HTML color palette variations exploring deep slate, forest green, warm gray, navy-slate, plum, and olive directions -- user selected palette-10 (Deep Olive Sage)
- Applied approved palette hex values to globals.css @theme block, replacing old navy/burnt-orange tokens with 10 color roles
- Built full design token system: 9-step spacing scale (4px-120px), 3 animation durations (150ms/300ms/600ms)
- Created Button component with 3 variants (primary accent CTA, secondary outline, phone tel: link) -- all with 44px touch targets and focus-visible rings
- Created Badge component with 2 variants (certification for GAF/CertainTeed, status for Licensed/Insured) -- 18px minimum text
- Added base styles for body (18px Cormorant Garamond), headings (Cormorant bold), focus ring utility, reduced-motion media query, and skip-to-content accessibility link

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies and generate 10 color palette HTML variations** - `361fa32` (feat)
2. **Task 2: User selects color palette** - CHECKPOINT (user selected palette-10)
3. **Task 3: Apply approved palette to globals.css and build Button + Badge components** - `6c9f2d5` (feat)

## Files Created/Modified

- `color-variations/palette-01.html` through `palette-10.html` - 10 standalone HTML color palette demos for user review
- `src/styles/globals.css` - Tailwind 4 @theme block with approved color tokens, spacing scale, animation tokens, base styles
- `src/components/ui/button.tsx` - Button component with primary/secondary/phone variants via cva
- `src/components/ui/badge.tsx` - Badge component with certification/status variants via cva
- `package.json` - Added motion, lucide-react, class-variance-authority dependencies

## Decisions Made

- **Palette-10 (Deep Olive Sage) selected:** Deep olive dominant (#2a2e22) with warm gold accent (#c89640). Provides the dark, authoritative mood required by D-01 while feeling natural and premium. The olive tones distinguish the site from typical corporate blue/gray palettes.
- **Button phone variant is minimal:** No background, no border, just accent-colored text with underline on hover. This matches how phone numbers should look in headers/CTAs -- visually linked but not competing with primary CTA buttons.
- **Badge uses span not button:** Badges display certification/status information and are not interactive. Using `<span>` is semantically correct.
- **No asChild/Slot pattern:** Kept Button simple with standard `<button>` element. Layout components that need button styling on `<a>` or `<Link>` can import and apply `buttonVariants` directly to their className.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Pre-existing ESLint error in `_bmad/wds/workflows/5-agentic-development/templates/components/dev-mode.js` (missing rule definition for `n/no-unsupported-features/node-builtins`). Out of scope -- unrelated to this plan's files. Our files lint cleanly.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all components are fully implemented with real color values and complete variant definitions.

## Next Phase Readiness

- Color tokens, spacing, and animation tokens are ready for layout components (Plan 02: Header, Footer, MegaMenu)
- Button and Badge primitives are ready for composition in section components (Plan 03: SectionWrapper, CTABanner, ScrollReveal)
- The `buttonVariants` export enables layout components to style `<Link>` elements with button appearance

## Self-Check: PASSED

All files verified present. All commits verified in git log.

- globals.css: FOUND
- button.tsx: FOUND
- badge.tsx: FOUND
- palette-10.html: FOUND
- Commit 361fa32: FOUND
- Commit 6c9f2d5: FOUND

---
*Phase: 02-design-system-layout-shell*
*Completed: 2026-03-23*
