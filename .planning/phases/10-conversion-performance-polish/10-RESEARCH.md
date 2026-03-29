# Phase 10: Conversion & Performance Polish - Research

**Researched:** 2026-03-29
**Domain:** CRO components (floating CTA, exit-intent popup, before/after gallery, urgency banners), image optimization, Core Web Vitals performance
**Confidence:** HIGH

## Summary

Phase 10 delivers five distinct capabilities: (1) a floating quote-request button that appears after the first viewport scroll, (2) an exit-intent popup on service and location pages, (3) a before/after project gallery with comparison sliders and filtering, (4) an emergency/urgency banner for storm season, and (5) Core Web Vitals optimization across all 150+ pages. Additionally, it retrofits the existing FAQ accordion to be collapsible (UX-07) and audits all images for proper `next/image` usage with descriptive alt text (SEO-12).

The project already has a robust component library (60+ section components), a consistent design system (Deep Olive Sage palette, cva+cn pattern, SectionWrapper tone alternation), and Motion library for animations. Phase 10 builds on these foundations without introducing major new dependencies. The before/after slider is the only new npm package needed (`react-compare-slider` at 4.0.0, zero dependencies). Exit-intent detection should be hand-rolled (a ~40-line hook) rather than adding the `use-exit-intent` package, because the mobile strategy for this project (scroll-up detection, not idle timeout) diverges from what that package offers, and the desktop mouseLeave detection is trivial.

**Primary recommendation:** Build all CRO components as client components using existing Motion + cva + cn patterns. The gallery page (`/gallery`) already exists as a stub -- populate it. For Core Web Vitals, the primary risk is the Cormorant Garamond serif font (LCP blocker if not optimized) and any hero images added without `priority`/`preload`. Run Lighthouse on the heaviest page (a service-in-city page with 15 sections) not just the homepage.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CRO-03 | Floating quote request button (persistent CTA) on all pages | Floating CTA pattern in Architecture section; implemented as client component in marketing layout with IntersectionObserver scroll trigger |
| CRO-05 | Exit-intent popup with quote offer on service and location pages | Exit-intent hook research; desktop mouseLeave + mobile scroll-up detection; Google interstitial compliance guidelines |
| CRO-08 | Before/after project gallery with comparison sliders, filterable by service type and city | react-compare-slider 4.0.0 package; gallery data structure; filtering UI pattern |
| CRO-09 | Emergency/urgency banner for storm season and emergency service pages | Conditional banner component using existing emergency accent color system |
| UX-07 | Collapsible accordion UI for FAQ sections | Existing FaqAccordion already implements this -- verification needed, minor tweaks possible |
| SEO-12 | All images use next/image with descriptive alt text (not filenames) | next/image audit pattern; priority/preload for LCP images; responsive sizes attribute |
| SEO-13 | Core Web Vitals optimized: LCP < 2.5s, INP < 200ms, CLS < 0.1 | Lighthouse CI setup; font optimization; CLS prevention patterns; INP replaces FID |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | 12.38.0 | Animation for floating CTA, popup, banner transitions | Already in project; GPU-accelerated AnimatePresence for enter/exit |
| embla-carousel-react | 8.6.0 | Gallery thumbnail navigation (if needed) | Already in project for testimonial carousel |
| next/image | (built-in) | All gallery images, hero images, before/after pairs | Built into Next.js; automatic WebP/AVIF, lazy loading, responsive sizing |
| lucide-react | 1.0.1+ | Icons for CTA button, close buttons, filter controls | Already in project |

### New Dependencies
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-compare-slider | 4.0.0 | Before/after image comparison slider | Gallery page comparison UI; zero deps, 82KB unpacked, accessible with keyboard + screen reader |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-compare-slider | img-comparison-slider (web component) | Web component has broader framework support but requires `useRef` + `useEffect` wiring in React; react-compare-slider is React-native with better DX |
| react-compare-slider | Hand-rolled slider | Deceptively complex: needs pointer capture, touch events, keyboard navigation, RTL, screen reader announcements. Don't hand-roll. |
| use-exit-intent package | Custom useExitIntent hook | Package's mobile strategy is idle-timeout only. This project needs scroll-up detection. Custom hook is ~40 lines and gives full control. Use custom. |
| @lhci/cli | Vercel Speed Insights only | LHCI gives CI-gated assertions; Vercel Speed Insights is RUM (post-deploy). Use BOTH: LHCI in CI, Speed Insights in production. |

**Installation:**
```bash
pnpm add react-compare-slider
```

**No other new production dependencies needed.**

**Version verification:**
- react-compare-slider: 4.0.0 (verified 2026-03-29 via `npm view`)
- use-exit-intent: 1.1.0 (evaluated but NOT recommended -- custom hook preferred)

## Architecture Patterns

### Component Placement

```
src/
  components/
    sections/
      floating-cta.tsx           # CRO-03: Fixed-position quote button
      exit-intent-popup.tsx      # CRO-05: Exit popup with quote offer
      urgency-banner.tsx         # CRO-09: Emergency/storm season banner
      gallery-hero.tsx           # CRO-08: Gallery page hero
      gallery-grid.tsx           # CRO-08: Filterable gallery grid
      gallery-comparison.tsx     # CRO-08: Before/after comparison card
      gallery-filter-bar.tsx     # CRO-08: Service type + city filter
  hooks/
    use-exit-intent.ts           # Custom exit-intent detection hook
    use-scroll-past-fold.ts      # IntersectionObserver for floating CTA
  data/
    gallery-projects.ts          # Gallery project data (before/after pairs)
  types/
    gallery.ts                   # GalleryProject type (or add to data/types.ts)
```

### Pattern 1: Floating CTA (CRO-03)

**What:** A fixed-position button that appears after the user scrolls past the first viewport. Stays visible until dismissed or until the user scrolls to the footer quote form.

**When to use:** All pages, rendered in the marketing layout.

**Implementation approach:**
```typescript
// src/hooks/use-scroll-past-fold.ts
"use client";
import { useState, useEffect } from "react";

export function useScrollPastFold(threshold = 1.0): boolean {
  const [isPastFold, setIsPastFold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPastFold(window.scrollY > window.innerHeight * threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isPastFold;
}
```

```typescript
// src/components/sections/floating-cta.tsx
"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone, X } from "lucide-react";
import { useScrollPastFold } from "@/hooks/use-scroll-past-fold";
import { PHONE_HREF } from "@/lib/constants";

export function FloatingCTA() {
  const isPastFold = useScrollPastFold();
  const [isDismissed, setIsDismissed] = useState(false);

  return (
    <AnimatePresence>
      {isPastFold && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
          role="complementary"
          aria-label="Quick quote request"
        >
          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss quote button"
            className="..."
          >
            <X size={16} />
          </button>
          {/* CTA button linking to #quote-form or /contact */}
          <a href="#quote-form" className="...">
            Get Free Quote
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Placement:** Add `<FloatingCTA />` to the marketing layout (`src/app/(marketing)/layout.tsx`) after `<Footer />`.

**Key decisions:**
- Use `position: fixed` with `z-40` (below the sticky header at `z-50`)
- Dismiss state is session-only (useState, not localStorage) -- reappears on next page
- Disappear when `#quote-form` is visible (use second IntersectionObserver or check scroll position)
- Bottom-right position avoids obscuring content; small size (< 15% viewport per Google guidelines)

### Pattern 2: Exit-Intent Popup (CRO-05)

**What:** A popup that triggers when the user shows intent to leave. Desktop: mouse moves toward browser chrome (top of viewport). Mobile: user scrolls up quickly (back-navigation intent).

**When to use:** Service pages (`/services/**`) and location pages (`/service-areas/**`) only. NOT on contact page or blog pages.

**Implementation approach -- custom hook:**
```typescript
// src/hooks/use-exit-intent.ts
"use client";
import { useState, useEffect, useCallback, useRef } from "react";

interface UseExitIntentOptions {
  enabled?: boolean;
  delayMs?: number;        // Min time on page before triggering (default: 5000)
  cooldownMs?: number;     // Min time between triggers (default: Infinity for once-per-session)
}

export function useExitIntent(options: UseExitIntentOptions = {}) {
  const { enabled = true, delayMs = 5000 } = options;
  const [isTriggered, setIsTriggered] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const mountTime = useRef(Date.now());
  const lastScrollY = useRef(0);

  // Desktop: mouseLeave on document
  useEffect(() => {
    if (!enabled || isDismissed) return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && Date.now() - mountTime.current > delayMs) {
        setIsTriggered(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [enabled, isDismissed, delayMs]);

  // Mobile: rapid scroll-up detection
  useEffect(() => {
    if (!enabled || isDismissed) return;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = lastScrollY.current - currentY;
      // Rapid upward scroll of 300+ px suggests back-navigation intent
      if (delta > 300 && Date.now() - mountTime.current > delayMs) {
        setIsTriggered(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled, isDismissed, delayMs]);

  const dismiss = useCallback(() => {
    setIsDismissed(true);
    setIsTriggered(false);
  }, []);

  return { isTriggered: isTriggered && !isDismissed, dismiss };
}
```

**Popup component:**
- Uses `AnimatePresence` + `motion.div` for fade-in overlay
- Contains a compact version of the quote form or a strong CTA linking to `/contact`
- Has a clear close button (X) with `aria-label="Close popup"`
- Uses `role="dialog"` and `aria-modal="true"` with focus trap
- Session-based dismissal (once dismissed, stays dismissed for the page session)

**Google interstitial compliance:**
- The popup is NOT full-screen -- it is a centered dialog covering < 50% of viewport
- It does NOT trigger on page load -- requires 5+ seconds of engagement
- It has a clear and easy dismiss mechanism
- It is NOT shown on every page -- only service and location pages

### Pattern 3: Before/After Gallery (CRO-08)

**What:** A gallery page at `/gallery` showing roofing project before/after comparisons with draggable sliders. Filterable by service type and city.

**Data structure:**
```typescript
// src/data/types.ts (add to existing)
export interface GalleryProject {
  id: string;
  title: string;                  // e.g., "Brownstone Roof Replacement"
  description: string;            // 2-3 sentences about the project
  serviceSlug: string;            // Links to service registry
  citySlug: string;               // Links to municipality registry
  beforeImage: string;            // Path in /public/gallery/
  afterImage: string;             // Path in /public/gallery/
  beforeAlt: string;              // Descriptive alt text
  afterAlt: string;               // Descriptive alt text
  completionDate: string;         // ISO date
  projectDetails: string[];       // Bullet points: materials, scope, duration
}
```

**react-compare-slider usage:**
```typescript
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

<ReactCompareSlider
  itemOne={
    <ReactCompareSliderImage
      src="/gallery/project-1-before.webp"
      alt="Damaged brownstone roof with missing shingles in Jersey City Heights"
    />
  }
  itemTwo={
    <ReactCompareSliderImage
      src="/gallery/project-1-after.webp"
      alt="Completed architectural shingle roof replacement on Jersey City Heights brownstone"
    />
  }
  defaultPosition={50}
  keyboardIncrement={5}
/>
```

**Important:** Since this project uses placeholder content, the gallery will use placeholder images (gradient SVG placeholders or very small sample images). The data structure and component wiring must be production-ready for real image swap.

**Filtering pattern:**
- Use URL search params (`?service=roof-repair&city=jersey-city`) for shareable filter state
- `useSearchParams()` hook from `next/navigation` to read filters
- Filter bar renders as a row of select dropdowns or button toggles
- "All Services" and "All Cities" default options
- No external state management needed

### Pattern 4: Emergency/Urgency Banner (CRO-09)

**What:** A conditional banner that renders on emergency service pages and optionally during storm season (date-based).

**Implementation approach:**
```typescript
// src/components/sections/urgency-banner.tsx
import { AlertTriangle, Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";

interface UrgencyBannerProps {
  variant: "emergency" | "storm-season";
  className?: string;
}

// Storm season: June 1 - November 30 (Atlantic hurricane season)
function isStormSeason(): boolean {
  const month = new Date().getMonth(); // 0-indexed
  return month >= 5 && month <= 10;
}

export function UrgencyBanner({ variant, className }: UrgencyBannerProps) {
  // For storm-season variant, only render during hurricane season
  if (variant === "storm-season" && !isStormSeason()) return null;

  return (
    <div
      role="alert"
      className="bg-[#d4782f] text-dominant py-3 px-4 ..."
    >
      <AlertTriangle size={20} />
      <span>{variant === "emergency"
        ? "24/7 Emergency Service Available"
        : "Storm Season Alert: Schedule Your Inspection Now"
      }</span>
      <a href={PHONE_HREF}>{PHONE_NUMBER}</a>
    </div>
  );
}
```

**Placement:**
- Emergency pages: Render `<UrgencyBanner variant="emergency" />` above the hero section
- All pages (during storm season): Render `<UrgencyBanner variant="storm-season" />` in marketing layout, conditionally

**CLS consideration:** The banner must have a fixed height or use CSS `min-height` to prevent layout shift. Since it renders server-side (no hydration mismatch risk for the emergency variant), it won't cause CLS. The storm-season variant is also deterministic (date-based, computed server-side).

### Pattern 5: FAQ Accordion Verification (UX-07)

**What:** The existing `FaqAccordion` component already implements collapsible accordion behavior with Motion's AnimatePresence. UX-07 requires "collapsible accordion UI for FAQ sections."

**Current state:** The existing component at `src/components/sections/faq-accordion.tsx` already:
- Opens/closes items on click
- Uses AnimatePresence for smooth height transitions
- Has `aria-expanded`, `aria-controls`, proper `role="region"`
- Has keyboard accessibility via native `<button>` elements
- Has `defaultOpenIndex` prop (defaults to 0, opening first item)

**Gap analysis:** The current implementation may need verification that:
1. Only one item is open at a time (accordion pattern, not disclosure pattern) -- CONFIRMED: `openIndex` is a single number
2. All FAQ usages across the site use this component -- needs audit
3. The component works correctly in all contexts (service pages, city pages, service-in-city pages, blog pages)

**Recommendation:** Minimal work needed. Verify usage across pages and add test coverage.

### Anti-Patterns to Avoid

- **Full-screen exit popup:** Google penalizes interstitials that cover the main content entirely. Use a centered dialog with clear dismiss.
- **Multiple popups per session:** The requirements explicitly exclude this (Out of Scope table). One exit-intent trigger per session max.
- **Eager-loading gallery images:** Gallery could have 20+ before/after pairs. ALL must be lazy-loaded except the first visible row.
- **Floating CTA obscuring content on mobile:** Position bottom-right, keep to a single button (not a bar), ensure it doesn't overlap scroll-to-top or other fixed elements.
- **Date-based rendering causing hydration mismatch:** The storm season banner uses `new Date()` which could differ between server and client render. Compute on server only (Server Component) or use a consistent approach.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Before/after comparison slider | Custom drag/touch/keyboard slider | react-compare-slider 4.0.0 | Pointer capture, touch events, keyboard nav, RTL support, screen reader announcements -- too many edge cases |
| Image lazy loading | Custom IntersectionObserver for images | next/image built-in lazy loading | next/image handles responsive sizing, format selection (WebP/AVIF), blur-up placeholders, and proper loading attributes |
| Carousel for gallery thumbnails | Custom scroll container | embla-carousel-react (already installed) | Touch physics, momentum scrolling, snap points, accessibility |

**Key insight:** The CRO components (floating CTA, exit popup, urgency banner) are simple enough to hand-roll. The gallery comparison slider is not -- pointer capture across browsers, touch normalization, and accessibility make it a "buy not build" decision.

## Common Pitfalls

### Pitfall 1: FID vs INP in Requirements
**What goes wrong:** The requirements say "FID < 100ms" but FID was deprecated and replaced by Interaction to Next Paint (INP) as a Core Web Vital on March 12, 2024.
**Why it happens:** Requirements were written before INP replaced FID.
**How to avoid:** Target INP < 200ms (the "good" threshold per Google). This is more demanding than FID was, since INP measures ALL interactions, not just the first one.
**Warning signs:** Lighthouse 12+ reports INP, not FID. If testing tools still show FID, the tool version is outdated.

### Pitfall 2: CLS from Floating CTA Appearance
**What goes wrong:** The floating CTA button appears after scroll, causing elements below to shift.
**Why it happens:** Using `position: fixed` should NOT cause CLS (fixed elements are out of document flow). But if implemented as a bottom bar that pushes footer up, it will.
**How to avoid:** Always use `position: fixed` for the floating CTA, never `position: sticky` at the bottom. Fixed elements don't affect document flow.
**Warning signs:** CLS score increases on pages with the floating CTA.

### Pitfall 3: Exit Popup Triggering on Page Load
**What goes wrong:** Users arriving from Google immediately see a popup before engaging with content.
**Why it happens:** No delay gate in exit-intent detection.
**How to avoid:** Enforce a minimum 5-second dwell time before the exit-intent handler activates. This is both UX-respectful and Google-compliant (intrusive interstitials on page arrival are penalized).
**Warning signs:** High bounce rate from organic traffic.

### Pitfall 4: Hydration Mismatch with Date-Based Rendering
**What goes wrong:** Storm season banner renders on server but not on client (or vice versa) because `new Date()` returns different values.
**Why it happens:** Server renders at build time (SSG), client hydrates at runtime.
**How to avoid:** The `UrgencyBanner` for storm-season should be a Server Component OR compute the season at build time and pass as a prop. Since these are statically generated pages, `new Date()` during build is deterministic.
**Warning signs:** React hydration error in console.

### Pitfall 5: Gallery Page Without Images Looks Broken
**What goes wrong:** The gallery page is designed for real project photos, but the project uses placeholder content.
**Why it happens:** No actual before/after photos exist yet.
**How to avoid:** Create visually distinct placeholder images -- use gradient SVGs with overlay text ("Before" / "After") or generate placeholder images with distinct visual treatments. The component must look intentional, not broken.
**Warning signs:** Gallery page looks empty or confusing to reviewers.

### Pitfall 6: LCP Regression from Font Loading
**What goes wrong:** Cormorant Garamond is a decorative serif font with large file sizes. If the font blocks rendering, LCP will exceed 2.5s on mobile.
**Why it happens:** `font-display: swap` is set (good), but the font files themselves may be large.
**How to avoid:** The project already uses `next/font/google` with `display: "swap"` -- this is correct. Verify that `font-display: swap` is actually being applied in the generated CSS. Also ensure no `@font-face` override accidentally sets `font-display: block`.
**Warning signs:** LCP > 2.5s on mobile Lighthouse with "Ensure text remains visible during webfont load" warning.

### Pitfall 7: react-compare-slider CLS on Image Load
**What goes wrong:** The comparison slider has no explicit dimensions, so it collapses to 0 height until images load, then jumps.
**Why it happens:** No `aspect-ratio` or explicit `width`/`height` set on the container.
**How to avoid:** Wrap each comparison slider in a container with `aspect-ratio: 4/3` (or appropriate ratio) and a background-color placeholder. Use `next/image` with explicit dimensions inside the slider if possible, or set the container size.
**Warning signs:** CLS > 0.1 on gallery page.

## Code Examples

### react-compare-slider with Placeholder Images
```typescript
"use client";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface ComparisonCardProps {
  title: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

export function ComparisonCard({
  title,
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: ComparisonCardProps) {
  return (
    <div className="rounded-lg overflow-hidden bg-secondary">
      <div className="aspect-[4/3]">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage src={beforeSrc} alt={beforeAlt} />
          }
          itemTwo={
            <ReactCompareSliderImage src={afterSrc} alt={afterAlt} />
          }
          defaultPosition={50}
          keyboardIncrement={5}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-heading font-bold text-lg text-text-primary">
          {title}
        </h3>
      </div>
    </div>
  );
}
```

### Gallery Filter Using URL Search Params
```typescript
"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function GalleryFilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentService = searchParams.get("service") ?? "all";
  const currentCity = searchParams.get("city") ?? "all";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-4">
      <select
        value={currentService}
        onChange={(e) => updateFilter("service", e.target.value)}
        className="..."
        aria-label="Filter by service type"
      >
        <option value="all">All Services</option>
        {/* Map over SERVICES */}
      </select>
      <select
        value={currentCity}
        onChange={(e) => updateFilter("city", e.target.value)}
        className="..."
        aria-label="Filter by city"
      >
        <option value="all">All Cities</option>
        {/* Map over MUNICIPALITIES */}
      </select>
    </div>
  );
}
```

### Focus Trap for Exit-Intent Dialog
```typescript
// Minimal focus trap for modal dialogs
// No external dependency needed for a single-dialog use case
useEffect(() => {
  if (!isOpen) return;
  const dialog = dialogRef.current;
  if (!dialog) return;

  const focusables = dialog.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  first?.focus();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") { dismiss(); return; }
    if (e.key !== "Tab") return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, [isOpen, dismiss]);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| FID (First Input Delay) | INP (Interaction to Next Paint) | March 12, 2024 | INP measures ALL interactions, not just first. Good threshold: 200ms |
| next/image `priority` prop | next/image `preload` prop | Next.js 16 | `priority` deprecated; use `preload`, `loading="eager"`, or `fetchPriority="high"` |
| Full-screen exit popups | Small dialog overlays (< 50% viewport) | Ongoing Google enforcement | Full-screen interstitials penalized in mobile search |
| IntersectionObserver polyfill | Native browser support | 2020+ | All modern browsers support IntersectionObserver natively |
| CSS `scroll-behavior: smooth` only | Motion scroll animations | Ongoing | Motion provides `useScroll`, `useMotionValueEvent` for fine-grained scroll tracking |

**Deprecated/outdated:**
- **FID metric**: Replaced by INP. Requirements text says "FID < 100ms" -- interpret as "INP < 200ms"
- **next/image `priority` prop**: Use `preload` in Next.js 16+
- **`next-sitemap` package**: Not needed; built-in `sitemap.ts` convention used (already in project)

## Open Questions

1. **Gallery placeholder images**
   - What we know: The project uses placeholder content; no real before/after photos exist
   - What's unclear: Should we generate SVG placeholders or use stock-style colored rectangles
   - Recommendation: Create gradient SVG placeholders with "Before" / "After" text overlay, matching the project's color scheme. This is consistent with the hero image placeholder pattern already used in `hero-section.tsx`

2. **Storm season date range**
   - What we know: Atlantic hurricane season is June 1 - November 30
   - What's unclear: Should the site use a different date range for Hudson County (e.g., nor'easter season extends further)
   - Recommendation: Use June 1 - November 30 for hurricane season. Nor'easters are year-round but peak November-April. Consider making the date range configurable via constants.

3. **Exit popup frequency**
   - What we know: Requirements say "no multiple popups per session" (Out of Scope)
   - What's unclear: Should dismissal persist across page navigations within the session
   - Recommendation: Use a module-level variable (not state per component mount). Once dismissed on any page, it stays dismissed for the entire browser session. No cookies needed for v1.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| pnpm | Package management | Assumed available | 10.32.1 (in packageManager field) | -- |
| Node.js | Runtime | Assumed available | 18+ required by Next.js 16 | -- |
| Lighthouse CI | SEO-13 performance testing | Not installed (dev tool) | @lhci/cli 0.15.1 latest | Manual Lighthouse via Chrome DevTools |

**Missing dependencies with no fallback:** None blocking.

**Missing dependencies with fallback:**
- @lhci/cli: Not installed. Can test with Chrome DevTools Lighthouse instead. LHCI is optional CI integration for automated regression prevention.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | vitest.config.ts |
| Quick run command | `pnpm test` |
| Full suite command | `pnpm test` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CRO-03 | Floating CTA renders after scroll threshold | unit | `pnpm test -- src/components/sections/__tests__/floating-cta.test.tsx -x` | Wave 0 |
| CRO-05 | Exit-intent hook triggers on mouseLeave / scroll-up | unit | `pnpm test -- src/hooks/__tests__/use-exit-intent.test.ts -x` | Wave 0 |
| CRO-08 | Gallery data has correct structure, filtering works | unit | `pnpm test -- src/data/__tests__/gallery-projects.test.ts -x` | Wave 0 |
| CRO-09 | Urgency banner renders conditionally | unit | `pnpm test -- src/components/sections/__tests__/urgency-banner.test.tsx -x` | Wave 0 |
| UX-07 | FaqAccordion collapses/expands correctly | unit | `pnpm test -- src/components/sections/__tests__/faq-accordion.test.tsx -x` | Wave 0 |
| SEO-12 | All image usages have descriptive alt text | audit | Manual code audit (grep for `<img` without next/image) | Manual |
| SEO-13 | Core Web Vitals pass thresholds | manual-only | Lighthouse in Chrome DevTools on heaviest page | Manual |

### Sampling Rate
- **Per task commit:** `pnpm test`
- **Per wave merge:** `pnpm test && pnpm build`
- **Phase gate:** Full suite green + Lighthouse audit on heaviest page before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/hooks/__tests__/use-exit-intent.test.ts` -- covers CRO-05 hook logic
- [ ] `src/hooks/__tests__/use-scroll-past-fold.test.ts` -- covers CRO-03 scroll detection
- [ ] `src/data/__tests__/gallery-projects.test.ts` -- covers CRO-08 data validation
- [ ] `src/components/sections/__tests__/urgency-banner.test.tsx` -- covers CRO-09
- [ ] `src/components/sections/__tests__/faq-accordion.test.tsx` -- covers UX-07
- [ ] `src/hooks/` directory creation -- does not exist yet

## Project Constraints (from CLAUDE.md)

### Enforced by CLAUDE.md
- Use **Cormorant Garamond** (medium weight) for body text, **Cormorant** for headings
- Minimum body font size: **18px**
- Every page must export `metadata` or `generateMetadata()` with `title`, `description`, and `openGraph`
- One `<h1>` per page -- headings follow strict hierarchy
- All images have descriptive `alt` text -- not filenames, not empty unless decorative
- Canonical URL set via `alternates.canonical` on every page
- `<html lang="en">` on root element
- Internal links use `next/link`
- Default to **Server Components** -- only add `"use client"` when needed
- Motion library for animations
- cva + cn() pattern for component variants
- No `any` -- use `unknown` and narrow

### Project-Specific Constraints
- **Tech stack**: Next.js 16, React 19, TypeScript strict, Tailwind CSS 4, Motion, pnpm
- **Content depth**: Minimum 3000 words per page (not applicable to gallery but applies to service pages)
- **Content style**: Placeholder content structured for easy swap
- **Accessibility**: Semantic HTML, keyboard navigation, WCAG AA contrast, focus-visible styles
- **No shadcn**: Project uses custom cva + cn pattern, not shadcn/ui

## Sources

### Primary (HIGH confidence)
- react-compare-slider npm (4.0.0) -- https://www.npmjs.com/package/react-compare-slider
- react-compare-slider GitHub README -- https://github.com/nerdyman/react-compare-slider
- Google Intrusive Interstitials Guide -- https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials
- INP Core Web Vital official announcement -- https://web.dev/blog/inp-cwv-launch
- Next.js Image Component docs -- https://nextjs.org/docs/app/api-reference/components/image
- use-exit-intent docs -- https://daltonmenezes.github.io/use-exit-intent/docs/getting-started/overview

### Secondary (MEDIUM confidence)
- Before/after slider library comparison (Croct blog 2026) -- https://blog.croct.com/post/best-react-before-after-image-comparison-slider-libraries
- Next.js 16 LCP optimization guide -- https://markaicode.com/optimize-core-web-vitals-nextjs-16-lighthouse-12/
- Exit-intent mobile best practices -- https://wisepops.com/blog/mobile-exit-intent
- SEO-friendly popups guide -- https://wisepops.com/blog/SEO-friendly-popups

### Tertiary (LOW confidence)
- use-exit-intent npm (1.1.0) -- https://www.npmjs.com/package/use-exit-intent (evaluated but not recommended)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All packages verified via npm registry, zero new deps except react-compare-slider
- Architecture: HIGH - Patterns follow established project conventions (cva, cn, SectionWrapper, Motion)
- Pitfalls: HIGH - Google interstitial guidelines verified via official docs; INP replacement confirmed via web.dev
- Gallery implementation: MEDIUM - react-compare-slider 4.0.0 is new major version; API verified via GitHub README
- Performance optimization: MEDIUM - LCP/CLS guidance from multiple sources, but actual performance depends on content weight

**Research date:** 2026-03-29
**Valid until:** 2026-04-28 (30 days -- stable domain, no fast-moving dependencies)
