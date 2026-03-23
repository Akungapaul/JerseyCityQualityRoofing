# Phase 2: Design System & Layout Shell - Research

**Researched:** 2026-03-23
**Domain:** Design system (typography, color, component variants), layout shell (header, navigation, footer, breadcrumbs), scroll animations, accessibility
**Confidence:** HIGH

## Summary

Phase 2 transforms the bare Next.js scaffold into a fully styled, accessible layout shell that wraps every marketing page. The work divides into five clear domains: (1) design token system in Tailwind CSS 4 via `@theme`, (2) primitive UI components with cva variant definitions, (3) layout components (sticky header with shrink, mega-menu, mobile overlay nav, sitemap footer with CTA banner), (4) route-aware breadcrumb navigation with BreadcrumbList JSON-LD, and (5) Motion-powered scroll reveal animations with reduced-motion support.

The existing codebase provides strong foundations: Cormorant/Cormorant Garamond fonts already configured via CSS variables in `layout.tsx`, the `cn()` utility ready in `src/lib/utils.ts`, data registries for services (8 services, 2 categories) and municipalities (12 cities) available for navigation link generation, `BUSINESS_INFO` constant with phone/NAP data, and an existing `buildBreadcrumbJsonLd()` function in `json-ld.tsx`. The `(marketing)/layout.tsx` is a pass-through shell ready to receive the header/footer/breadcrumb composition.

A critical prerequisite is the color palette approval workflow: CLAUDE.md mandates generating 10 color variation HTML files for user review before any color implementation. This must be the first task in the phase, as every subsequent component depends on the approved tokens.

**Primary recommendation:** Structure the phase as: color palette approval first, then design tokens in globals.css, then primitive UI components (Button, Badge), then layout components (Header with shrink, MegaMenu, MobileNav, Footer with CTA banner, Breadcrumbs), then section utilities (SectionWrapper, CTABanner, ScrollReveal), then wire into (marketing)/layout.tsx.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Dark & authoritative mood -- 10 color variations will explore this direction
- **D-02:** Start fresh -- discard existing navy (#1a365d) + burnt orange (#c05621). Generate 10 completely new palette options. Current globals.css values will be replaced after approval.
- **D-03:** Deep-toned color backgrounds (deep blues, slates, dark greens, dark warm grays) -- not near-black/charcoal
- **D-04:** Full dark site -- dark backgrounds throughout ALL sections (header, content areas, footer). Light text on dark. Content sections use slightly lighter dark tones for depth.
- **D-05:** Warm accent colors (gold, amber, copper, warm orange family) for CTA buttons and interactive elements -- strong contrast on dark backgrounds
- **D-06:** Modern-elegant typographic treatment -- clean spacing, lighter weights where possible, generous whitespace. Cormorant serif reads as refined/premium, not old-fashioned.
- **D-07:** Flat backgrounds with depth via shadows and elevation changes -- no texture, noise, or grain patterns. Clean, fast-loading, easy to maintain in Tailwind.
- **D-08:** Mega-menu flyout navigation reflecting silo structure (Residential Services, Commercial Services, Locations). Wide dropdown panels showing all services in each silo on hover/click.
- **D-09:** Shrink-on-scroll sticky header -- full header on page load (logo, nav, phone number, CTA button), shrinks to compact bar on scroll (logo, condensed nav/hamburger, phone, CTA). Keeps conversion elements visible while saving viewport space.
- **D-10:** Full-screen dark overlay mobile navigation -- hamburger opens full-screen overlay with expandable accordion sections for each silo. Phone number and CTA prominent at top.
- **D-11:** Header includes BOTH click-to-call phone number AND a "Get Free Quote" CTA button (warm accent color). Dual conversion paths per CRO-02/CRO-04.
- **D-12:** Full sitemap footer with multi-column layout -- all service links, location links, company links, and contact info (NAP). Functions as secondary navigation and SEO internal linking booster.
- **D-13:** CTA banner above footer link columns -- full-width call-to-action strip with phone number and quote button. Last conversion opportunity before page end.
- **D-14:** Above-the-fold CTA within hero section on every page -- naturally integrated into page design, visible without scrolling. Different pages can have different hero styles.
- **D-15:** 3000+ word pages structured with sectioned visual breaks -- alternating dark tones, section dividers, and embedded CTAs every 800-1000 words. Prevents wall-of-text fatigue.
- **D-16:** Subtle & polished animation intensity -- gentle fade-in-up on scroll for sections, smooth header transitions, micro-interactions on buttons/links. Professional, doesn't distract from content.
- **D-17:** No page transitions between routes -- instant page loads. Scroll-triggered animations fire fresh on each page.
- **D-18:** Respect prefers-reduced-motion -- all scroll animations and transitions disabled when OS has reduced-motion enabled. Elements appear instantly.

### Claude's Discretion
- Specific 10 color palette selections (within dark/authoritative, deep-toned, warm accent constraints)
- Specific scroll animation effects (fade-in-up, hover effects, header shrink timing, mega-menu slide-in)
- Exact breakpoints for mobile/tablet/desktop responsive behavior
- Component variant definitions (Button, Card, Badge sizes and states)
- Breadcrumb component styling and BreadcrumbList JSON-LD integration
- Icon sizing and placement within navigation and footer
- Exact spacing scale and design token values

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FNDN-05 | Reusable page layout shell with sticky header (phone number), footer, breadcrumbs, and navigation | Layout component architecture: Header, Footer, MegaMenu, MobileNav, Breadcrumbs composed in MarketingLayout. Existing (marketing)/layout.tsx is the integration point. |
| FNDN-06 | Design system with Cormorant Garamond typography (medium weight body, 18px min), color theme, component variants | Tailwind CSS 4 @theme tokens for colors/typography, cva for Button/Badge variants, cn() utility already exists. Font CSS variables already configured. |
| FNDN-07 | Mobile-first responsive design across all viewports | Tailwind responsive prefixes (sm/md/lg/xl), breakpoints defined in UI-SPEC, container max-width 1280px. |
| UX-01 | Cormorant Garamond (medium weight) for body text, Cormorant for headings, minimum 18px body | 4-size typography scale (18/28/40/56px) defined in UI-SPEC. Font CSS variables --font-heading and --font-body already in layout.tsx. |
| UX-02 | Dark/professional color theme with 10 variations generated for approval | 10-variation HTML generation workflow documented. @theme block in globals.css receives approved palette. OKLCH color format recommended. |
| UX-03 | Motion animations for scroll reveals and interactive elements | Motion library useScroll for header shrink, whileInView for scroll-triggered reveals, MotionConfig reducedMotion="user" for accessibility. |
| UX-04 | Semantic HTML throughout (main, nav, section, article, aside) | Header uses <header>, navigation uses <nav aria-label>, main content uses <main id="main-content">, footer uses <footer>. Skip-to-content link. |
| UX-05 | All interactive elements keyboard-accessible with focus-visible ring styles | Focus ring pattern: focus-visible:ring-2 with accent color. Mega-menu: Enter/Space to open, Escape to close. Mobile nav: focus trap. |
| UX-06 | WCAG AA color contrast compliance | 4.5:1 for normal text, 3:1 for large text (18px+ bold or 24px+). All text at 18px minimum means 3:1 applies for bold, 4.5:1 for medium weight. Accent on dark must be verified. |
| UX-08 | Internal links use next/link, phone numbers use tel: links | Phone Button variant wraps tel: href. All nav links use next/link. Constants PHONE_NUMBER and PHONE_HREF already exist in src/lib/constants.ts. |
| SEO-06 | Breadcrumb navigation on every page with BreadcrumbList schema | buildBreadcrumbJsonLd() already exists in json-ld.tsx. Breadcrumb component uses usePathname() to auto-generate from route hierarchy. JSON-LD injected server-side via JsonLd component. |
| CRO-02 | Sticky header with click-to-call phone number visible at all scroll positions | Header component with position:sticky, phone number always visible in both full (80px) and shrunk (56px) states. |
| CRO-04 | Above-the-fold CTA on every page | Header CTA button ("Get Free Quote") visible without scrolling. CTA banner component available for hero sections. |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Typography:** Cormorant Garamond (medium/500) body, Cormorant headings, minimum 18px body -- no text smaller than 18px anywhere
- **Color approval:** Generate 10 color variations as standalone HTML files for user review before implementation
- **SEO metadata:** Every page must export metadata with title, description, openGraph
- **Heading hierarchy:** One h1 per page, strict h1 > h2 > h3 (layout shell must NOT render any h1)
- **Accessibility:** Semantic HTML, keyboard navigation, WCAG AA contrast, focus-visible styles, aria-label on icon-only buttons
- **Internal links:** Use next/link, not raw <a> tags
- **Phone numbers:** Wrap in tel: links
- **Images:** Use next/image with descriptive alt text
- **Component patterns:** Default to Server Components, only "use client" when needed
- **Naming:** kebab-case files, PascalCase components, SCREAMING_SNAKE_CASE constants
- **TypeScript:** strict mode, interface for objects, type for unions, no any, use satisfies
- **Tech stack locked:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS 4, Motion library, pnpm

## Standard Stack

### Core (Phase 2 Specific)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS 4 | 4.2.2 | Design tokens via @theme, utility classes | Already installed. CSS-first config with @theme block for color/font/spacing tokens. No tailwind.config.js needed. |
| class-variance-authority | 0.7.1 | Component variant definitions | Standard pattern for Button/Badge/component variants with Tailwind. Provides typed variant API with defaultVariants and compoundVariants. |
| clsx | 2.1.1 | Conditional class composition | Already installed. 239 bytes, zero deps. Used inside cn() utility. |
| tailwind-merge | 3.5.0 | Merge Tailwind classes without conflicts | Already installed. Prevents class conflicts when composing components. Powers cn(). |
| Motion | 12.38.0 | Scroll animations, header transitions | Import from `motion/react`. useScroll for header shrink detection, whileInView for scroll-triggered reveals, MotionConfig for reduced-motion. |
| Lucide React | 1.0.1 | Icons for navigation, CTAs, breadcrumbs | Tree-shakable, TypeScript typed. Import individual icons: `import { Phone, ChevronRight, Menu, X } from 'lucide-react'`. |
| schema-dts | 1.1.5 | TypeScript types for BreadcrumbList JSON-LD | Already installed. Google-maintained. buildBreadcrumbJsonLd() already exists. |

### Not Yet Installed (Needs Addition)

| Library | Version | Purpose | When to Install |
|---------|---------|---------|-----------------|
| class-variance-authority | 0.7.1 | cva variant definitions | First task -- needed for all component variants |
| motion | 12.38.0 | Animation library | First task -- needed for header shrink and scroll reveal |
| lucide-react | 1.0.1 | Icon library | First task -- needed for navigation icons |

**Installation:**
```bash
pnpm add class-variance-authority motion lucide-react
```

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| cva | Manual variant objects | cva provides typed VariantProps, defaultVariants, compoundVariants. Manual objects lose these. Use cva. |
| Custom focus trap | focus-trap-react (12.0.0) | focus-trap-react adds a dependency for a pattern implementable in ~30 lines. For a single mobile nav overlay, custom implementation is sufficient. |
| Custom breadcrumb | nextjs-breadcrumbs npm | The npm package is for Pages Router. Custom component with usePathname + route segment lookup is simpler for App Router. |

## Architecture Patterns

### Recommended Project Structure

```
src/
  components/
    ui/                           # Primitive components with cva variants
      button.tsx                  # Button (primary, secondary, phone variants)
      badge.tsx                   # Badge (certification, status variants)
      breadcrumb.tsx             # Breadcrumb item primitives
    layout/                       # Layout shell components
      header.tsx                  # Sticky header with shrink behavior ("use client")
      mega-menu.tsx              # Desktop mega-menu navigation ("use client")
      mobile-nav.tsx             # Full-screen mobile overlay ("use client")
      footer.tsx                  # Sitemap footer with CTA banner (Server Component)
      breadcrumbs.tsx            # Route-aware breadcrumb generator ("use client")
      skip-to-content.tsx        # Accessibility skip link
    sections/                     # Section-level utilities
      section-wrapper.tsx        # Consistent spacing + alternating tones (Server Component)
      cta-banner.tsx             # Full-width conversion strip (Server Component)
      scroll-reveal.tsx          # Motion scroll animation wrapper ("use client")
  styles/
    globals.css                   # @theme block with approved color tokens
  lib/
    utils.ts                      # cn() utility (already exists)
    constants.ts                  # PHONE_NUMBER, PHONE_HREF, etc. (already exists)
    hooks/
      use-scroll-shrink.ts       # Custom hook for header shrink detection
  app/
    (marketing)/
      layout.tsx                  # Composes Header + Breadcrumbs + {children} + Footer
```

### Pattern 1: Tailwind CSS 4 @theme Design Tokens

**What:** Define all design tokens in the `@theme` block of globals.css. These generate both CSS variables and Tailwind utility classes.

**When to use:** Always -- this is the single source of truth for the design system.

**Example:**
```css
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  /* Color tokens -- values replaced after palette approval */
  --color-dominant: oklch(0.25 0.03 250);      /* Deep blue-slate background */
  --color-secondary: oklch(0.30 0.03 250);     /* Slightly lighter dark tone */
  --color-accent: oklch(0.75 0.15 70);         /* Warm gold/amber */
  --color-text-primary: oklch(0.95 0.01 250);  /* Near-white */
  --color-text-secondary: oklch(0.75 0.02 250); /* Muted light */
  --color-destructive: oklch(0.55 0.2 25);     /* Red for errors */
  --color-success: oklch(0.55 0.15 150);       /* Green for confirmation */

  /* Typography */
  --font-heading: 'Cormorant', serif;
  --font-body: 'Cormorant Garamond', serif;

  /* Shadows for depth on flat dark backgrounds (D-07) */
  --shadow-card: 0 2px 8px oklch(0 0 0 / 0.3);
  --shadow-elevated: 0 4px 16px oklch(0 0 0 / 0.4);
  --shadow-mega-menu: 0 8px 32px oklch(0 0 0 / 0.5);
}
```

**Key insight:** Tailwind 4 uses `--color-*` namespace to auto-generate utility classes. Defining `--color-accent` creates `bg-accent`, `text-accent`, `border-accent`, `ring-accent` automatically. No separate `@layer` or `extend` needed.

### Pattern 2: cva Component Variants with cn()

**What:** Define component variant API using cva, wrap with cn() for class merging.

**When to use:** Every UI primitive that has visual variants (Button, Badge, etc.).

**Example:**
```typescript
// Source: https://cva.style/docs/getting-started/variants
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles applied to all variants
  [
    "inline-flex items-center justify-center",
    "font-body font-bold text-lg",
    "rounded transition-colors duration-fast",
    "min-h-[44px] min-w-[44px]",  // WCAG touch target
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-accent focus-visible:ring-offset-2",
    "focus-visible:ring-offset-dominant",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: "bg-accent text-dominant hover:bg-accent/90",
        secondary: "border border-text-secondary text-text-primary hover:bg-secondary",
        phone: "text-accent hover:text-accent/80 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-3",
        compact: "px-4 py-2",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

### Pattern 3: Motion Scroll-Triggered Reveal

**What:** Wrap section content in a Motion component that fades in when entering viewport, fires once, respects reduced motion.

**When to use:** Any content section that should animate on scroll entry.

**Example:**
```typescript
// Source: https://motion.dev/docs/react-scroll-animations
"use client";

import { motion } from "motion/react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Reduced motion handling:** Wrap the app (or marketing layout) in `<MotionConfig reducedMotion="user">`. When the OS has reduced motion enabled, Motion automatically disables transform animations (the y movement) while preserving opacity. Elements appear at their final position.

### Pattern 4: Header Scroll Shrink with useScroll

**What:** Detect scroll position via Motion's useScroll to toggle between full and compact header states.

**When to use:** The sticky header component.

**Example:**
```typescript
// Source: https://motion.dev/docs/react-use-scroll
"use client";

import { useScroll, useMotionValueEvent, motion } from "motion/react";
import { useState } from "react";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100); // 100px threshold per UI-SPEC
  });

  return (
    <motion.header
      className="sticky top-0 z-50 bg-dominant"
      animate={{ height: isScrolled ? 56 : 80 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Phone number and CTA always visible in both states */}
    </motion.header>
  );
}
```

### Pattern 5: Route-Aware Breadcrumbs with JSON-LD

**What:** Auto-generate breadcrumb trail from current pathname, map URL segments to human-readable labels, inject BreadcrumbList JSON-LD.

**When to use:** The Breadcrumbs layout component rendered on every page.

**Example:**
```typescript
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { buildBreadcrumbJsonLd, JsonLd } from "@/lib/seo/json-ld";
import { BASE_URL } from "@/lib/constants";

// Lookup table for URL segments -> human-readable labels
const SEGMENT_LABELS: Record<string, string> = {
  services: "Services",
  residential: "Residential Services",
  commercial: "Commercial Services",
  "service-areas": "Service Areas",
  // Dynamic segments resolved from data registries
};

export function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return null; // No breadcrumbs on homepage

  const segments = pathname.split("/").filter(Boolean);
  const items = [
    { name: "Home", url: BASE_URL },
    ...segments.map((segment, index) => ({
      name: SEGMENT_LABELS[segment] || formatSegment(segment),
      url: `${BASE_URL}/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];

  const jsonLd = buildBreadcrumbJsonLd(items);

  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={jsonLd as unknown as Record<string, unknown>} />
      <ol className="flex items-center gap-2 text-lg text-text-secondary">
        {items.map((item, index) => (/* render breadcrumb items */))}
      </ol>
    </nav>
  );
}
```

**BreadcrumbList JSON-LD best practices (from Google):**
- Must contain at least 2 ListItems
- Each item needs `@type: ListItem`, `position` (1-indexed), `name`, `item` (full URL)
- Breadcrumb trail must match visual breadcrumbs exactly
- Represent typical user navigation path, not just URL structure

### Pattern 6: Mega-Menu Accessibility

**What:** Desktop flyout navigation with proper keyboard handling and ARIA attributes.

**When to use:** The MegaMenu component for Residential Services, Commercial Services, Locations silos.

**Key ARIA pattern:**
```
<nav aria-label="Main navigation">
  <ul role="list">
    <li>
      <button
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggle}
        onKeyDown={handleKeyDown}  // Enter/Space: open, Escape: close
      >
        Residential Services
      </button>
      {isOpen && (
        <div role="region" aria-label="Residential Services submenu">
          {/* Grid of service links */}
        </div>
      )}
    </li>
  </ul>
</nav>
```

**Do NOT use role="menu" / role="menuitem"** for navigation links. WAI-ARIA Menu pattern is for application menus (like File/Edit/View), not website navigation. Screen readers cannot recognize navigation links when they are marked as menuitems. Use semantic `<nav>`, `<ul>`, `<li>`, `<a>` with `aria-expanded` and `aria-haspopup` on trigger buttons.

### Anti-Patterns to Avoid

- **Using role="menu" for site navigation:** This prevents screen readers from recognizing links. Use `<nav>` with `<ul>/<li>/<a>` instead.
- **Putting h1 in the layout shell:** The layout must NOT render any `<h1>`. Each page provides its own. Header/footer use spans, divs, or nav-level text.
- **Hardcoding phone numbers:** Always source from `BUSINESS_INFO` / `PHONE_NUMBER` / `PHONE_HREF` constants. Single source of truth for NAP consistency (SEO-14).
- **Using text smaller than 18px:** The entire site has an 18px floor. Differentiate with weight, tracking, color, and font-family -- never size.
- **Client Components by default:** Header, MegaMenu, MobileNav, Breadcrumbs, and ScrollReveal need "use client" (they use hooks/browser APIs). Footer, SectionWrapper, CTABanner, and Badge can be Server Components.
- **Importing all Lucide icons:** Always import individual icons (`import { Phone } from 'lucide-react'`), never `import * from 'lucide-react'`.
- **CSS gradients or textures for depth:** Decision D-07 locks flat backgrounds. Use box-shadow and tone variation only.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Component variant API | Manual className conditionals | cva + cn() | cva provides typed variants, defaultVariants, compoundVariants. Manual conditionals are error-prone and untyped. |
| Class conflict resolution | Custom merge logic | tailwind-merge via cn() | Tailwind class conflicts (e.g., `p-4` vs `p-2`) need last-wins resolution. tailwind-merge handles all edge cases. |
| Scroll position detection | Manual window.addEventListener | Motion useScroll + useMotionValueEvent | Motion handles RAF scheduling, passive listeners, cleanup. Manual scroll listeners cause jank and memory leaks. |
| Scroll-triggered animations | IntersectionObserver + CSS | Motion whileInView | Motion handles viewport detection, animation orchestration, staggering, and reduced-motion in one API. |
| Reduced motion handling | Custom media query hooks | MotionConfig reducedMotion="user" | Single wrapper disables transform/layout animations site-wide. Custom hooks miss edge cases. |
| BreadcrumbList JSON-LD | Manual JSON.stringify | Existing buildBreadcrumbJsonLd() + JsonLd component | Already built in Phase 1. Type-safe with schema-dts. XSS-safe rendering. |
| Icon system | Custom SVG sprites | Lucide React | Tree-shakable, typed, accessible, 1500+ icons. Custom SVGs are unmaintainable at scale. |

**Key insight:** The Phase 1 codebase already provides buildBreadcrumbJsonLd(), JsonLd renderer, BUSINESS_INFO, service/municipality data registries, cn() utility, and font configuration. Phase 2 extends these -- it does not rebuild them.

## Common Pitfalls

### Pitfall 1: Color Palette Skipping Approval
**What goes wrong:** Starting component implementation before the 10 color variations are approved. All work must be redone when palette changes.
**Why it happens:** Developers want to see "real" progress before the design decision is made.
**How to avoid:** Generate 10 HTML files as the very first task. Block all component work until approval. Use placeholder tokens in globals.css that match the UI-SPEC role contract.
**Warning signs:** Components being built with hardcoded hex values instead of Tailwind token classes.

### Pitfall 2: Gold/Amber Accent Failing WCAG AA
**What goes wrong:** Warm accent colors (gold, amber) often fail the 4.5:1 contrast ratio against dark backgrounds. Standard gold (#FFD700) on a dark blue (#1a365d) passes, but lighter golds fail.
**Why it happens:** Warm colors in the yellow-orange range have inherently low perceived contrast against dark backgrounds.
**How to avoid:** Test every accent color combination with WebAIM Contrast Checker during the 10-variation generation. Since all body text is 18px+ (which counts as "large text" at bold weight), the threshold drops to 3:1 for bold/heading text. But medium-weight body text at 18px still needs 4.5:1.
**Warning signs:** Accent text looking "washed out" or hard to read on dark backgrounds.

### Pitfall 3: Mega-Menu Keyboard Trap
**What goes wrong:** Users can tab into the mega-menu panel but cannot escape back to the trigger or close it with Escape.
**Why it happens:** Focus management not implemented -- only mouse hover is handled.
**How to avoid:** Implement full keyboard protocol: Enter/Space opens panel, Tab cycles through panel links, Escape closes and returns focus to trigger button. Test with keyboard-only navigation.
**Warning signs:** Cannot close mega-menu without clicking. Focus jumps past the panel entirely.

### Pitfall 4: Mobile Nav Not Trapping Focus
**What goes wrong:** When the full-screen mobile overlay is open, Tab key moves focus to elements behind the overlay (header, page content).
**Why it happens:** No focus trap implemented -- the overlay is just a positioned div.
**How to avoid:** Implement focus trap: capture first/last focusable elements, redirect Tab from last to first and Shift+Tab from first to last. Lock body scroll. Restore focus to hamburger button on close.
**Warning signs:** Pressing Tab repeatedly while mobile nav is open causes focus to leave the overlay.

### Pitfall 5: Breadcrumb JSON-LD Not Matching Visual
**What goes wrong:** The BreadcrumbList JSON-LD schema contains different items than what the user sees on screen. Google may remove rich results for discrepancies.
**Why it happens:** Visual breadcrumbs and JSON-LD are generated from different sources or with different label logic.
**How to avoid:** Both visual breadcrumbs and JSON-LD must be generated from the same data/function. The existing buildBreadcrumbJsonLd() function takes an items array -- use that same array for both rendering and schema.
**Warning signs:** Google Rich Results Test shows different breadcrumbs than what appears on the page.

### Pitfall 6: Header Shrink Causing Layout Shift
**What goes wrong:** When the header shrinks from 80px to 56px, the page content jumps up by 24px, causing CLS (Cumulative Layout Shift).
**Why it happens:** The header is in normal flow and its height change affects document layout.
**How to avoid:** Use `position: sticky` (not fixed). Sticky headers don't cause layout shift because they remain in the document flow. The header occupies its full 80px in flow, and sticky positioning keeps it visible on scroll. The visual shrink is purely cosmetic (changing padding/logo scale), not a layout change.
**Warning signs:** Content visibly jumping when scrolling past the 100px threshold.

### Pitfall 7: Motion Import Path Wrong
**What goes wrong:** Using `import { motion } from "framer-motion"` instead of `import { motion } from "motion/react"`.
**Why it happens:** Framer Motion was renamed to Motion. Old documentation and examples still reference the old import path.
**How to avoid:** Always use `motion/react` for React imports. The npm package is `motion` (not `framer-motion`).
**Warning signs:** Module not found errors or duplicate bundle.

## Code Examples

### Complete Button Component with cva + cn()

```typescript
// src/components/ui/button.tsx
// Source: https://cva.style/docs/getting-started/variants + UI-SPEC
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-body font-bold text-lg leading-tight",
    "rounded transition-colors",
    "min-h-[44px]",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-accent focus-visible:ring-offset-2",
    "focus-visible:ring-offset-dominant",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-accent text-dominant",
          "hover:bg-accent/90",
        ],
        secondary: [
          "border border-text-secondary text-text-primary",
          "hover:bg-secondary",
        ],
        phone: [
          "text-accent",
          "hover:underline underline-offset-4",
        ],
      },
      size: {
        default: "px-6 py-3",
        compact: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

export function Button({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant, size }), className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

export { buttonVariants };
```

### MotionConfig Wrapper for Reduced Motion

```typescript
// In src/app/(marketing)/layout.tsx
// Source: https://motion.dev/docs/react-accessibility
import { MotionConfig } from "motion/react";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute ...">
        Skip to main content
      </a>
      <Header />
      <Breadcrumbs />
      <main id="main-content">{children}</main>
      <Footer />
    </MotionConfig>
  );
}
```

### Tailwind 4 @theme Block (Template for After Approval)

```css
/* src/styles/globals.css */
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  /* Fonts (match CSS variables from next/font/google in layout.tsx) */
  --font-heading: var(--font-heading), 'Cormorant', serif;
  --font-body: var(--font-body), 'Cormorant Garamond', serif;

  /* Color roles -- REPLACE with approved palette values */
  --color-dominant: oklch(/* approved value */);
  --color-secondary: oklch(/* approved value */);
  --color-accent: oklch(/* approved value */);
  --color-text-primary: oklch(/* approved value */);
  --color-text-secondary: oklch(/* approved value */);
  --color-destructive: oklch(/* approved value */);
  --color-success: oklch(/* approved value */);

  /* Shadows for depth on flat dark backgrounds */
  --shadow-card: 0 2px 8px oklch(0 0 0 / 0.3);
  --shadow-elevated: 0 4px 16px oklch(0 0 0 / 0.4);
  --shadow-mega-menu: 0 8px 32px oklch(0 0 0 / 0.5);

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}
```

### SectionWrapper for Alternating Dark Tones

```typescript
// src/components/sections/section-wrapper.tsx (Server Component)
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  tone?: "dominant" | "secondary";
  id?: string;
  className?: string;
}

export function SectionWrapper({
  children,
  tone = "dominant",
  id,
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 sm:py-16 lg:py-20",  // 2xl/3xl/4xl spacing
        tone === "dominant" ? "bg-dominant" : "bg-secondary",
        className
      )}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js | CSS-first @theme block | Tailwind 4.0 (Jan 2025) | No JS config file. All tokens in CSS. Simpler, faster builds. |
| framer-motion package | motion package, import from motion/react | 2024 rebrand | Different import path. Same API surface. |
| role="menu" for nav | Semantic nav + aria-expanded | WAI-ARIA clarification | Menu role blocks screen reader link recognition. Use nav element. |
| rgb/hex colors | oklch() color space | Tailwind 4 default | Perceptually uniform steps. Wider gamut. Better for programmatic palette generation. |
| useEffect + window scroll | useScroll + useMotionValueEvent | Motion best practice | No manual listener setup/cleanup. Performance-optimized via ScrollTimeline API. |
| IntersectionObserver + useState | whileInView prop | Motion scroll animations | Declarative, handles cleanup, stagger, reduced motion automatically. |

**Deprecated/outdated:**
- `framer-motion` npm package: Use `motion` instead. Import from `motion/react`.
- `tailwind.config.js` / `tailwind.config.ts`: Use `@theme` block in CSS for Tailwind 4.
- `@apply` for component styles: Use cva instead. `@apply` is still valid but cva is more maintainable for variant-heavy components.

## Open Questions

1. **Font token bridging: CSS variable from next/font vs @theme**
   - What we know: next/font/google creates CSS variables `--font-heading` and `--font-body` on the `<html>` element via className. Tailwind 4 @theme defines `--font-heading` and `--font-body` as theme tokens.
   - What's unclear: Whether referencing `var(--font-heading)` inside @theme correctly bridges the next/font variable to Tailwind's font-heading utility class, or if the names collide.
   - Recommendation: Test during token setup. If names collide, use a different namespace in @theme (e.g., `--font-display` for headings) or let @theme override with the same font stack plus fallbacks.

2. **OKLCH browser support for color palette HTML files**
   - What we know: OKLCH is supported in all modern browsers (Chrome 111+, Firefox 113+, Safari 16.4+). Tailwind 4 uses OKLCH by default.
   - What's unclear: Whether the user reviewing HTML color palette files will view them in a modern browser.
   - Recommendation: Use OKLCH in @theme but include hex fallbacks in the standalone HTML palette files for maximum compatibility.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | vitest.config.ts (exists, node environment) |
| Quick run command | `pnpm test` |
| Full suite command | `pnpm test` |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FNDN-05 | Layout shell renders Header, Footer, Breadcrumbs | smoke | `pnpm build` (compile check) | N/A -- build verification |
| FNDN-06 | Design tokens defined in @theme block | unit | `vitest run src/components/__tests__/design-tokens.test.ts -x` | Wave 0 |
| FNDN-07 | Responsive breakpoints applied correctly | manual-only | Browser resize testing | N/A |
| UX-01 | Typography uses correct fonts and sizes | unit | `vitest run src/components/__tests__/typography.test.ts -x` | Wave 0 |
| UX-02 | Color palette approved and applied | manual-only | Visual review of 10 HTML files | N/A |
| UX-03 | Scroll animations fire on viewport entry | manual-only | Browser scroll testing | N/A |
| UX-04 | Semantic HTML elements used | unit | `vitest run src/components/__tests__/semantic-html.test.ts -x` | Wave 0 |
| UX-05 | Keyboard navigation works on interactive elements | manual-only | Keyboard-only testing | N/A |
| UX-06 | WCAG AA contrast met | manual-only | WebAIM Contrast Checker on approved palette | N/A |
| UX-08 | Phone numbers use tel: links, internal links use next/link | unit | `vitest run src/components/__tests__/links.test.ts -x` | Wave 0 |
| SEO-06 | BreadcrumbList JSON-LD renders correctly | unit | `vitest run src/lib/__tests__/json-ld.test.ts -x` | Exists (extend) |
| CRO-02 | Phone number visible in sticky header | manual-only | Browser scroll testing | N/A |
| CRO-04 | CTA button visible above fold | manual-only | Browser viewport testing | N/A |

### Sampling Rate

- **Per task commit:** `pnpm type-check && pnpm lint` (fast, catches compilation errors)
- **Per wave merge:** `pnpm test && pnpm build` (full suite + build verification)
- **Phase gate:** Full suite green + manual browser verification before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `src/components/__tests__/button.test.ts` -- covers FNDN-06 (Button variant renders correct classes)
- [ ] `src/components/__tests__/breadcrumb.test.ts` -- covers SEO-06 (breadcrumb generation from pathname)
- [ ] Extend `src/lib/__tests__/json-ld.test.ts` -- add BreadcrumbList tests for the breadcrumb integration
- [ ] Vitest config may need `environment: 'jsdom'` for component tests (currently `node` only)

Note: Phase 2 is heavily visual. Most requirements (responsive design, animations, contrast, keyboard navigation) require manual browser testing. Automated tests cover data logic and class generation. Build success (`pnpm build`) is the primary automated validation.

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS Theme Variables](https://tailwindcss.com/docs/theme) -- @theme directive, --color-* namespace, design token patterns
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first config, OKLCH colors, Rust engine
- [Motion useScroll](https://motion.dev/docs/react-use-scroll) -- scroll-linked animation hook API
- [Motion Scroll Animations](https://motion.dev/docs/react-scroll-animations) -- whileInView, viewport options, scroll-triggered patterns
- [Motion Accessibility](https://motion.dev/docs/react-accessibility) -- MotionConfig reducedMotion, useReducedMotion
- [Motion Scroll Hide Header](https://motion.dev/tutorials/react-scroll-hide-header) -- useMotionValueEvent pattern for scroll detection
- [CVA Variants](https://cva.style/docs/getting-started/variants) -- cva API, variants, compoundVariants, defaultVariants
- [CVA React + Tailwind Example](https://cva.style/docs/examples/react/tailwind-css) -- VariantProps type, React integration
- [Lucide React Guide](https://lucide.dev/guide/packages/lucide-react) -- tree-shaking, TypeScript support, Server Component compatibility
- [Google BreadcrumbList Structured Data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) -- JSON-LD requirements, ListItem format
- [WAI-ARIA Menu Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) -- when to use menu role (applications, not navigation)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) -- WCAG AA 4.5:1 and 3:1 thresholds
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) -- next/font/google, CSS variable injection

### Secondary (MEDIUM confidence)
- [Level Access: Accessible Navigation Menus](https://www.levelaccess.com/blog/accessible-navigation-menus-pitfalls-and-best-practices/) -- mega-menu ARIA patterns, do not use role="menu"
- [LogRocket: Accessible Menubar](https://blog.logrocket.com/building-accessible-menubar-component-react/) -- keyboard navigation implementation
- [LogRocket: Focus Trap Modal](https://blog.logrocket.com/build-accessible-modal-focus-trap-react/) -- focus trap patterns for overlays
- [Breadcrumbs SEO Guide](https://www.glukhov.org/post/2025/12/breadcrumbs-for-seo/) -- Google removed breadcrumbs from mobile search results Jan 2025, still shows on desktop
- [Next.js Dynamic Breadcrumbs](https://leejjon.medium.com/building-flexible-breadcrumbs-in-a-next-js-app-using-the-app-router-48720e833cb5) -- usePathname approach for App Router
- [BuildUI Fixed Header](https://buildui.com/recipes/fixed-header) -- shrink-on-scroll header recipe

### Tertiary (LOW confidence)
- None -- all findings verified against primary or secondary sources.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already decided in CLAUDE.md stack research, versions verified against npm registry
- Architecture: HIGH -- patterns documented in official docs (Tailwind @theme, cva variants, Motion scroll APIs), existing codebase provides integration points
- Pitfalls: HIGH -- accessibility pitfalls well-documented by WAI-ARIA and WebAIM, color contrast pitfalls verified by WCAG spec, Motion import path change documented officially

**Research date:** 2026-03-23
**Valid until:** 2026-04-23 (stable domain -- design system patterns change slowly)
