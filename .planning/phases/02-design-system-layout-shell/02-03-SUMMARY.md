---
phase: 02-design-system-layout-shell
plan: 03
subsystem: ui
tags: [section-wrapper, cta-banner, scroll-reveal, marketing-layout, motion, server-components, accessibility]

# Dependency graph
requires:
  - phase: 02-design-system-layout-shell
    plan: 01
    provides: Tailwind 4 @theme color tokens, Button/Badge via cva, cn() utility, globals.css base styles
  - phase: 02-design-system-layout-shell
    plan: 02
    provides: Header (sticky shrink-on-scroll), MegaMenu, MobileNav, Footer (CTA banner + sitemap), Breadcrumbs (JSON-LD)
  - phase: 01-foundation
    provides: constants (PHONE_NUMBER, PHONE_HREF), types, json-ld builders
provides:
  - SectionWrapper component with alternating dark tone backgrounds and responsive padding
  - CTABanner full-width conversion strip with phone link and quote button
  - ScrollReveal motion-powered fade-in-up animation wrapper respecting prefers-reduced-motion
  - MarketingLayout composing Header + Breadcrumbs + main + Footer for every marketing page
  - Homepage test layout proving all layout shell components work end-to-end
  - buttonVariants extracted to shared server-compatible module
affects: [03-lead-capture, 04-core-pages, 05-residential-services, 06-commercial-services, 07-location-hubs, 08-service-in-city]

# Tech tracking
tech-stack:
  added: []
  patterns: [section-wrapper-alternating-tones, cta-banner-conversion-strip, scroll-reveal-whileInView, marketing-layout-composition, button-variants-server-compat]

key-files:
  created:
    - src/components/sections/section-wrapper.tsx
    - src/components/sections/cta-banner.tsx
    - src/components/sections/scroll-reveal.tsx
    - src/components/ui/button-variants.ts
  modified:
    - src/app/(marketing)/layout.tsx
    - src/app/(marketing)/page.tsx
    - src/components/ui/button.tsx
    - src/components/layout/footer.tsx
    - src/styles/globals.css

key-decisions:
  - "Extracted buttonVariants to src/components/ui/button-variants.ts for server component import compatibility"
  - "Removed custom --spacing-2xl through --spacing-5xl from @theme to prevent hijacking Tailwind v4 max-w-* utilities"
  - "CTABanner uses p elements (not h2) for heading text to avoid breaking heading hierarchy when placed mid-page"
  - "ScrollReveal uses Motion whileInView with once:true and amount:0.2 for 20% viewport trigger"

patterns-established:
  - "SectionWrapper: tone prop ('dominant'|'secondary') for alternating section backgrounds with responsive py-12/16/20 and max-w-[1280px] container"
  - "CTABanner: reusable conversion strip with phone tel: link + Get Free Quote button, usable at mid-page and above footer"
  - "ScrollReveal: motion.div with fade-in-up (opacity 0->1, y 24->0) at 600ms, delay prop for stagger support"
  - "MarketingLayout: Fragment wrapper composing Header + Breadcrumbs + main#main-content + Footer"
  - "Server-compatible variant exports: CVA variants in separate .ts files when 'use client' components cannot be imported by server components"

requirements-completed: [FNDN-05, FNDN-07, UX-03, UX-04, UX-06, UX-08]

# Metrics
duration: 8min
completed: 2026-03-24
---

# Phase 02 Plan 03: Section Utilities & Marketing Layout Summary

**SectionWrapper with alternating dark tones, CTABanner conversion strip, ScrollReveal fade-in-up animation, and MarketingLayout wiring Header + Breadcrumbs + main + Footer on every marketing page**

## Performance

- **Duration:** 8 min (execution) + visual verification checkpoint
- **Started:** 2026-03-23T23:40:00Z
- **Completed:** 2026-03-24T00:12:00Z
- **Tasks:** 2 (1 build task + 1 visual verification checkpoint)
- **Files created:** 4
- **Files modified:** 5

## Accomplishments

- Built SectionWrapper component applying consistent spacing (py-12/16/20 responsive) and alternating dominant/secondary dark tone backgrounds for long content pages
- Built CTABanner full-width conversion strip with click-to-call phone link and "Get Free Quote" button, reusable at mid-page and above footer
- Built ScrollReveal client component wrapping content with Motion whileInView fade-in-up animation (600ms, 20% viewport trigger, respects prefers-reduced-motion)
- Wired complete MarketingLayout composing Header + Breadcrumbs + main#main-content + Footer on every marketing page
- Updated homepage with test layout exercising SectionWrapper alternating tones, ScrollReveal animations, and mid-page CTABanner -- proving the full layout shell end-to-end
- Homepage exports metadata (title, description, openGraph) per CLAUDE.md SEO requirements
- User visually verified the complete layout shell in browser and approved

## Task Commits

Each task was committed atomically:

1. **Task 1: Build section components and wire marketing layout** - `164625f` (feat)
2. **Task 1 fix: Extract buttonVariants for server component compatibility** - `afd6cc8` (fix)
3. **Task 1 fix: Remove custom --spacing-* tokens hijacking Tailwind v4 max-w** - `3c92456` (fix)
4. **Task 2: Visual verification** - CHECKPOINT APPROVED (no files)

## Files Created/Modified

- `src/components/sections/section-wrapper.tsx` - Server component wrapping sections with tone-based backgrounds and responsive padding
- `src/components/sections/cta-banner.tsx` - Full-width conversion strip with phone link and quote CTA button
- `src/components/sections/scroll-reveal.tsx` - Client component with Motion whileInView fade-in-up animation
- `src/components/ui/button-variants.ts` - Extracted CVA buttonVariants for server component import compatibility
- `src/app/(marketing)/layout.tsx` - MarketingLayout composing Header + Breadcrumbs + main + Footer
- `src/app/(marketing)/page.tsx` - Homepage test layout with metadata, sections, animations, and CTA
- `src/components/ui/button.tsx` - Updated to re-export from button-variants.ts
- `src/components/layout/footer.tsx` - Updated to import buttonVariants from shared file
- `src/styles/globals.css` - Removed custom --spacing-2xl through --spacing-5xl tokens

## Decisions Made

- **buttonVariants extraction:** The Button component uses "use client" for interactivity, which prevented server components (CTABanner, Footer) from importing buttonVariants. Extracted to a separate button-variants.ts file without "use client" directive. Both button.tsx and server components now import from the shared file.
- **Spacing token removal:** Custom --spacing-2xl through --spacing-5xl tokens in @theme hijacked Tailwind v4's internal spacing resolution, causing max-w-3xl to resolve to 64px instead of 768px. Removed the custom tokens; Tailwind v4 natively provides spacing values and max-w-* utilities do not need manual registration.
- **CTABanner uses p not h2:** The CTABanner appears mid-page where injecting an h2 would break heading hierarchy. Uses p with font-heading styling instead. The footer's own CTA strip uses h2 correctly since it sits at document bottom.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Extracted buttonVariants to shared server-compatible file**
- **Found during:** Task 1 (CTABanner implementation)
- **Issue:** button.tsx has "use client" directive. Server components (CTABanner, Footer) cannot import from a client module. Importing buttonVariants from button.tsx caused a build error.
- **Fix:** Created src/components/ui/button-variants.ts containing the CVA variant definitions without "use client". Updated button.tsx to re-export from it. Updated footer.tsx and cta-banner.tsx to import from the new shared file.
- **Files modified:** src/components/ui/button-variants.ts (created), src/components/ui/button.tsx, src/components/layout/footer.tsx, src/components/sections/cta-banner.tsx
- **Verification:** pnpm type-check passes
- **Committed in:** `afd6cc8`

**2. [Rule 3 - Blocking] Removed custom --spacing-* tokens hijacking Tailwind v4 max-w utilities**
- **Found during:** Task 2 visual verification
- **Issue:** Custom --spacing-2xl through --spacing-5xl tokens in globals.css @theme block overwrote Tailwind v4's internal spacing resolution. This caused max-w-3xl (which resolves through spacing tokens in v4) to produce 64px instead of 768px, collapsing all text into a narrow column.
- **Fix:** Removed the custom --spacing-2xl, --spacing-3xl, --spacing-4xl, --spacing-5xl definitions from @theme. Tailwind v4 provides its own spacing scale and max-w-* utilities function correctly without manual token registration.
- **Files modified:** src/styles/globals.css
- **Verification:** Visual verification confirmed text flows at full width; user approved layout
- **Committed in:** `3c92456`

---

**Total deviations:** 2 auto-fixed (both Rule 3 - blocking issues)
**Impact on plan:** Both fixes were necessary for the layout to render correctly. The buttonVariants extraction improves the component architecture by cleanly separating variant definitions from client-side interactivity. No scope creep.

## Issues Encountered

None beyond the deviations documented above.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all components are fully implemented. The homepage content is intentionally a test layout (not the final homepage, which will be built in Phase 4), but it exercises all section components with realistic placeholder content.

## Next Phase Readiness

- Complete design system and layout shell ready for content phases
- Every marketing page automatically gets: sticky header with phone/CTA, breadcrumbs with JSON-LD, main content area, footer with CTA banner and sitemap
- Section components (SectionWrapper, CTABanner, ScrollReveal) are ready for Phase 3-10 page construction
- Phase 3 (Lead Capture System) can build quote forms knowing the layout shell is complete and verified

## Self-Check: PASSED

All files verified present. All commits verified in git log.

- section-wrapper.tsx: FOUND
- cta-banner.tsx: FOUND
- scroll-reveal.tsx: FOUND
- button-variants.ts: FOUND
- (marketing)/layout.tsx: FOUND
- (marketing)/page.tsx: FOUND
- button.tsx: FOUND
- footer.tsx: FOUND
- globals.css: FOUND
- Commit 164625f: FOUND
- Commit afd6cc8: FOUND
- Commit 3c92456: FOUND

---
*Phase: 02-design-system-layout-shell*
*Completed: 2026-03-24*
