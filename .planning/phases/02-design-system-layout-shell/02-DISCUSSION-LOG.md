# Phase 2: Design System & Layout Shell - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-23
**Phase:** 02-design-system-layout-shell
**Areas discussed:** Color palette direction, Navigation & header, Footer & layout density, Animation approach

---

## Color Palette Direction

| Option | Description | Selected |
|--------|-------------|----------|
| Dark & authoritative | Deep navies, charcoals, slate grays with warm accent. Signals trust, expertise, premium quality. | :heavy_check_mark: |
| Warm & approachable | Earth tones, warm grays, terracotta accents. Feels neighborly and local-first. | |
| Clean & modern | White/light backgrounds, bold accent colors, high contrast. | |

**User's choice:** Dark & authoritative
**Notes:** None

### Base Colors

| Option | Description | Selected |
|--------|-------------|----------|
| Keep navy + orange base | Variations explore shades around existing #1a365d + #c05621 | |
| Start fresh | Discard current colors, explore completely different palettes | :heavy_check_mark: |
| Keep navy, explore accents | Lock navy, vary accent colors | |

**User's choice:** Start fresh
**Notes:** User wants completely new palette exploration, not constrained by existing colors

### Dark Style

| Option | Description | Selected |
|--------|-------------|----------|
| Deep-toned colors | Deep blues, slates, dark greens, dark warm grays as backgrounds | :heavy_check_mark: |
| True dark / near-black | Charcoal and near-black backgrounds with bright contrast | |
| Mix of both | Some variations deep-toned, others true dark | |

**User's choice:** Deep-toned colors
**Notes:** None

### Color Preferences

| Option | Description | Selected |
|--------|-------------|----------|
| You decide | Claude picks 10 diverse palettes | :heavy_check_mark: |
| Must include specific colors | User has specific references | |
| Exclude certain colors | Colors to avoid | |

**User's choice:** You decide
**Notes:** None

### Dark Extent

| Option | Description | Selected |
|--------|-------------|----------|
| Full dark site | Dark backgrounds throughout all sections | :heavy_check_mark: |
| Dark chrome, light content | Dark header/footer, light content areas | |
| Section alternating | Alternate dark and light sections | |

**User's choice:** Full dark site
**Notes:** None

### CTA Accents

| Option | Description | Selected |
|--------|-------------|----------|
| Warm accent | Gold, amber, copper for CTAs | :heavy_check_mark: |
| Cool accent | Bright blue, teal, cyan | |
| Include both in variations | Mix of warm and cool across variations | |

**User's choice:** Warm accent
**Notes:** None

### Typography Feel

| Option | Description | Selected |
|--------|-------------|----------|
| Modern-elegant | Clean spacing, lighter weights, generous whitespace | :heavy_check_mark: |
| Traditional/classic | Tighter spacing, heavier weights, ornate feel | |
| You decide | Claude determines per variation | |

**User's choice:** Modern-elegant
**Notes:** None

### Texture

| Option | Description | Selected |
|--------|-------------|----------|
| Flat with depth via shadows | Clean flat colors, layered depth through shadows | :heavy_check_mark: |
| Subtle texture | Faint noise, grain, or geometric patterns | |
| You decide | Claude chooses per variation | |

**User's choice:** Flat with depth via shadows
**Notes:** None

---

## Navigation & Header

| Option | Description | Selected |
|--------|-------------|----------|
| Mega-menu flyout | Wide dropdown panels showing all services per silo | :heavy_check_mark: |
| Simple dropdowns | Standard vertical dropdown lists | |
| Sidebar navigation | Fixed/collapsible sidebar with full silo tree | |

**User's choice:** Mega-menu flyout
**Notes:** None

### Scroll Header Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Shrink on scroll | Full header -> compact bar on scroll | :heavy_check_mark: |
| Always full-size | Same height at all positions | |
| Hide nav, keep CTA bar | Thin bar with phone + CTA only | |

**User's choice:** Shrink on scroll
**Notes:** None

### Mobile Navigation

| Option | Description | Selected |
|--------|-------------|----------|
| Full-screen overlay | Dark overlay with accordion silo sections | :heavy_check_mark: |
| Slide-in drawer | Nav slides from right side | |
| Bottom sheet | Nav slides up from bottom | |

**User's choice:** Full-screen overlay
**Notes:** None

### Header CTA

| Option | Description | Selected |
|--------|-------------|----------|
| Phone + CTA button | Both click-to-call and 'Get Free Quote' button | :heavy_check_mark: |
| Phone number only | Just phone, CTAs in page content | |
| CTA button only | Phone in dropdown/menu | |

**User's choice:** Phone + CTA button
**Notes:** None

---

## Footer & Layout Density

| Option | Description | Selected |
|--------|-------------|----------|
| Full sitemap footer | Multi-column with all service/location/company links | :heavy_check_mark: |
| Compact footer | Company info, key links, social icons | |
| Two-tier footer | Upper nav columns, lower corporate info | |

**User's choice:** Full sitemap footer
**Notes:** None

### Footer CTA

| Option | Description | Selected |
|--------|-------------|----------|
| CTA banner above links | Full-width call-to-action strip above link columns | :heavy_check_mark: |
| No CTA in footer | Footer purely navigational | |
| Mini quote form | Compact form embedded in footer | |

**User's choice:** CTA banner above links
**Notes:** None

### Above-Fold CTA Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Within hero section | CTA integrated into each page's hero | :heavy_check_mark: |
| Separate CTA strip below hero | Dedicated full-width bar below hero | |
| You decide | Claude determines per page type | |

**User's choice:** Within hero section
**Notes:** None

### Long-Form Content Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Sectioned with visual breaks | Alternating tones, dividers, embedded CTAs every 800-1000 words | :heavy_check_mark: |
| Single column, clean flow | Continuous column with headings | |
| Content + sticky sidebar | Main content with sticky TOC/CTA sidebar | |

**User's choice:** Sectioned with visual breaks
**Notes:** None

---

## Animation Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle & polished | Gentle fade-in-up, smooth transitions, micro-interactions | :heavy_check_mark: |
| Bold & dramatic | Parallax, staggered reveals, animated counters | |
| Minimal / almost none | Only essential transitions | |

**User's choice:** Subtle & polished
**Notes:** None

### Page Transitions

| Option | Description | Selected |
|--------|-------------|----------|
| No page transitions | Instant page loads, fresh scroll animations per page | :heavy_check_mark: |
| Subtle cross-fade | Brief fade between pages | |
| You decide | Claude determines if worth complexity | |

**User's choice:** No page transitions
**Notes:** None

### Reduced Motion

| Option | Description | Selected |
|--------|-------------|----------|
| Respect prefers-reduced-motion | All animations disabled when OS setting enabled | :heavy_check_mark: |
| Reduce but don't eliminate | Replace complex with simple fades | |
| You decide | Claude implements best approach | |

**User's choice:** Respect prefers-reduced-motion
**Notes:** None

### Specific Effects

| Option | Description | Selected |
|--------|-------------|----------|
| You decide | Claude selects appropriate subtle animations | :heavy_check_mark: |
| I have specific ideas | User has references | |
| Counter animations for stats | Animated number counters for trust signals | |

**User's choice:** You decide
**Notes:** None

---

## Claude's Discretion

- Specific 10 color palette selections
- Specific scroll animation effects and timing
- Exact responsive breakpoints
- Component variant definitions
- Breadcrumb styling
- Icon sizing and placement
- Spacing scale and design token values

## Deferred Ideas

None — discussion stayed within phase scope.
