# Phase 4: Core Marketing Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-23
**Phase:** 04-core-marketing-pages
**Areas discussed:** Homepage sections & flow, Trust & social proof, Contact page & map, Service areas hub

---

## Homepage sections & flow

### Hero structure

| Option | Description | Selected |
|--------|-------------|----------|
| Split hero | Left: headline, subtext, dual CTAs. Right: hero image/illustration. Full-width dark bg with warm accent CTAs. | ✓ |
| Full-width text hero | Centered headline, subtext, dual CTAs spanning full width. No image. Compact form below. | |
| Hero with background image | Full-width bg image with dark overlay. Text/CTAs centered over image. | |

**User's choice:** Split hero (Recommended)
**Notes:** None

### Services grid

| Option | Description | Selected |
|--------|-------------|----------|
| Icon cards in 2x4 grid | Each service gets icon card with Lucide icon, name, description, link. 2 cols mobile, 4 desktop. Grouped Residential/Commercial. | ✓ |
| Two-column silo blocks | Two large blocks (Residential left, Commercial right) each listing 4 services. | |
| Alternating feature rows | Each service gets full-width row with icon, name, 2-line description, CTA. | |

**User's choice:** Icon cards in 2x4 grid (Recommended)
**Notes:** None

### Page flow

| Option | Description | Selected |
|--------|-------------|----------|
| Trust-first flow | Hero → Badges → Services → Why Us → Testimonials → Service Areas → FAQ → Form → CTA Banner | ✓ |
| Services-first flow | Hero → Services → Badges → Testimonials → Why Us → Service Areas → FAQ → Form → CTA Banner | |
| You decide | Claude determines optimal ordering | |

**User's choice:** Trust-first flow (Recommended)
**Notes:** None

### FAQ format

| Option | Description | Selected |
|--------|-------------|----------|
| Accordion | 5-7 collapsible questions, one open by default, FAQ schema JSON-LD | ✓ |
| Open list | All Q&As visible at once, no expand/collapse | |
| You decide | Claude picks format | |

**User's choice:** Accordion (Recommended)
**Notes:** None

---

## Trust & social proof

### Testimonial display

| Option | Description | Selected |
|--------|-------------|----------|
| Card carousel | 3 cards desktop, 1 mobile via Embla. Stars, quote, name, city. AggregateRating schema. | ✓ |
| Static card grid | 3-column grid, no carousel, all visible at once | |
| Inline quote blocks | Full-width alternating quote blocks with large quotation marks | |

**User's choice:** Card carousel (Recommended)
**Notes:** None

### Badge strip design

| Option | Description | Selected |
|--------|-------------|----------|
| Horizontal icon row | Full-width strip with Lucide icons + text labels. Dark bg, subtle dividers. | ✓ |
| Badge cards in grid | Small cards in grid, each with icon and label. More prominent. | |
| You decide | Claude picks format | |

**User's choice:** Horizontal icon row (Recommended)
**Notes:** None

### Testimonial placement scope

| Option | Description | Selected |
|--------|-------------|----------|
| Homepage + About | Testimonials on homepage and about page only. Other pages don't need them. | ✓ |
| All four pages | Testimonials on every core page. Maximum coverage. | |
| Homepage only | Only homepage gets testimonials. | |

**User's choice:** Homepage + About (Recommended)
**Notes:** None

---

## Contact page & map

### Google Map embed

| Option | Description | Selected |
|--------|-------------|----------|
| Interactive iframe | Google Maps iframe, zoomable/pannable, lazy-loaded below fold | ✓ |
| Static map image | Static Google Maps image with link to full maps. Faster loading. | |
| You decide | Claude picks based on performance tradeoff | |

**User's choice:** Interactive iframe (Recommended)
**Notes:** None

### Contact page layout

| Option | Description | Selected |
|--------|-------------|----------|
| Two-column: form + info | Left: QuoteForm. Right: NAP, hours, licenses, map below. Mobile: info stacks above form. | ✓ |
| Full-width stacked | Hero with NAP → full-width form → map section below | |
| You decide | Claude picks layout | |

**User's choice:** Two-column: form + info (Recommended)
**Notes:** None

### Business hours

| Option | Description | Selected |
|--------|-------------|----------|
| Hours table + emergency | Mon-Fri 7-6, Sat 8-2, Sun Closed. Plus 24/7 emergency callout with phone. | ✓ |
| Emergency callout only | No regular hours, just 24/7 emergency service callout. | |
| You decide | Claude decides | |

**User's choice:** Yes with hours table (Recommended)
**Notes:** None

---

## Service areas hub

### Municipality presentation

| Option | Description | Selected |
|--------|-------------|----------|
| Tiered card grid | Tier 1 cities get larger featured cards. Tier 2/3 standard size. Reflects data tiers. | ✓ |
| Equal grid, all same size | 12 cards in uniform 3x4 grid. All cities equal. | |
| Map + sidebar list | Left: visual map with clickable markers. Right: scrollable city list. | |

**User's choice:** Tiered card grid (Recommended)
**Notes:** None

### City card content

| Option | Description | Selected |
|--------|-------------|----------|
| Name + tagline + key stat | City name heading, roofing-relevant tagline, one key stat, "View Services" link | ✓ |
| Name + services count + link | City name, "8 services available", link. Minimal. | |
| Name + description paragraph | City name and 2-3 sentence description. More SEO content. | |

**User's choice:** Name + tagline + key stat (Recommended)
**Notes:** None

### Hub page map

| Option | Description | Selected |
|--------|-------------|----------|
| Map above cards | Google Maps iframe showing Hudson County with 12 pins. Lazy-loaded. Below: tiered card grid. | ✓ |
| No map, cards only | Skip map, cards are enough. Faster loading. | |
| You decide | Claude decides | |

**User's choice:** Yes, map above cards (Recommended)
**Notes:** None

---

## Claude's Discretion

- Hero image/illustration placeholder approach
- Exact "Why Choose Us" section content and stats
- About page company story narrative
- Testimonial carousel autoplay/transition config
- Badge strip Lucide icon selection
- Service areas hub intro content
- Google Maps API key handling
- Responsive breakpoints
- ScrollReveal animation timing

## Deferred Ideas

None — discussion stayed within phase scope.
