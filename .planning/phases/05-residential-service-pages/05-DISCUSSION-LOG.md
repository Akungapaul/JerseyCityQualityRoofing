# Phase 5: Residential Service Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md -- this log preserves the alternatives considered.

**Date:** 2026-03-24
**Phase:** 05-residential-service-pages
**Areas discussed:** Page section flow, Content depth strategy, Emergency page template, Schema & SEO details

---

## Page Section Flow

### Hero style for standard pages

| Option | Description | Selected |
|--------|-------------|----------|
| Content hero | Headline + subtext + dual CTA + compact form inline. No image. | Yes |
| Split hero | Left: headline + CTAs. Right: image/icon placeholder. | |
| Stat hero | Headline + 3-4 key stats strip + CTAs below. | |

**User's choice:** Content hero (Recommended)
**Notes:** Service-specific headline, compact 3-field form inline in hero.

### Section order

| Option | Description | Selected |
|--------|-------------|----------|
| Trust-then-content | BadgeStrip first, then deep content, conversion at end | Yes |
| Content-first flow | Content first, trust signals as mid-page break | |
| You decide | Claude picks | |

**User's choice:** Trust-then-content (Recommended)
**Notes:** Hero → BadgeStrip → Service Intro → Process → Materials → Cost → Mid-CTA → Testimonials → FAQ → QuoteForm → CTABanner

### Mid-page CTA break

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, inline CTA strip | Compact strip with phone + quote button between sections | Yes |
| No mid-page CTA | Hero form and bottom form are enough | |
| You decide | Claude decides | |

**User's choice:** Yes, inline CTA strip (Recommended)
**Notes:** Between Cost Factors and Testimonials.

---

## Content Depth Strategy

### Content file location

| Option | Description | Selected |
|--------|-------------|----------|
| New content data files | src/data/content/ with per-service prose files | Yes |
| Expand services.ts | Add prose fields to existing registry | |
| Inline in components | Write content directly in page JSX | |
| You decide | Claude picks | |

**User's choice:** New content data files (Recommended)
**Notes:** Separate from structured data in services.ts. Page pulls from both.

### Content voice

| Option | Description | Selected |
|--------|-------------|----------|
| Expert neighbor | First-person "we", conversational + authoritative, local scenarios | Yes |
| Professional authority | Third-person, formal, institutional tone | |
| You decide | Claude calibrates | |

**User's choice:** Expert neighbor (Recommended)
**Notes:** Hudson County-specific real-world scenarios. Knowledgeable local roofer explaining to homeowner.

### Word budget distribution

| Option | Description | Selected |
|--------|-------------|----------|
| Balanced distribution | ~500w intro, ~600w process, ~500w materials, ~400w cost, ~500w signs, ~300w local, ~400w FAQ | Yes |
| Front-loaded depth | ~800w intro, ~800w process, lighter other sections | |
| You decide | Claude distributes per service | |

**User's choice:** Balanced distribution (Recommended)
**Notes:** ~3200 total words plus hero text, CTAs, and headers.

### Warning Signs section

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, dedicated section | 5-6 real-world scenarios per service, Hudson County-specific | Yes |
| Fold into intro | Mention warning signs within intro narrative | |
| You decide | Claude decides | |

**User's choice:** Yes, dedicated section (Recommended)
**Notes:** Drives organic traffic from problem-search queries.

### Related Services cross-links

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, card row | 2-3 related service cards linking within residential silo | Yes |
| No, skip for now | Internal linking deferred to Phase 9 | |
| You decide | Claude decides | |

**User's choice:** Yes, card row (Recommended)
**Notes:** Uses existing relatedServices field from services.ts.

### Local context approach

| Option | Description | Selected |
|--------|-------------|----------|
| Woven throughout | Local references in every content block naturally | Yes |
| Dedicated local section | Separate "Roofing in Hudson County" section | |
| Both | Woven + dedicated section | |

**User's choice:** Woven throughout (Recommended)
**Notes:** Salt air, nor'easters, brownstones, building codes woven into all blocks.

### Process explainer UI

| Option | Description | Selected |
|--------|-------------|----------|
| Vertical timeline | Numbered steps with connector lines, duration badges | Yes |
| Card grid | 2-column grid of step cards | |
| Accordion steps | Collapsible like FAQ | |
| You decide | Claude picks | |

**User's choice:** Vertical timeline (Recommended)
**Notes:** Works well for 7 steps with expanded descriptions.

### Materials presentation

| Option | Description | Selected |
|--------|-------------|----------|
| Comparison cards | Grid with lifespan badges, price ranges, pros/cons | Yes |
| Prose with inline specs | Narrative paragraphs with specs woven in | |
| You decide | Claude picks | |

**User's choice:** Comparison cards (Recommended)
**Notes:** 2-col desktop, 1-col mobile. Renders existing materials data from services.ts.

---

## Emergency Page Template

### Emergency hero style

| Option | Description | Selected |
|--------|-------------|----------|
| Phone-first crisis hero | Oversized phone, no form, 2x larger CTA, urgency accent | Yes |
| Dual-path crisis hero | Phone + compact form side by side | |
| Same as standard + urgency styling | Minimal divergence | |

**User's choice:** Phone-first crisis hero (Recommended)
**Notes:** Phone call is primary conversion for emergencies. No compact form in hero.

### Emergency page body order

| Option | Description | Selected |
|--------|-------------|----------|
| Urgency-first reorder | What To Do → Response Process → Storm Damage → Insurance → Testimonials → FAQ | Yes |
| Same flow, urgency styling only | Standard section order with urgency colors | |
| You decide | Claude designs | |

**User's choice:** Urgency-first reorder (Recommended)
**Notes:** New sections: "What To Do Right Now" and "Insurance Claims Help" unique to emergency page.

### Urgency color accent

| Option | Description | Selected |
|--------|-------------|----------|
| Warm amber/red-gold accent | Shift from gold to ~#d4782f or ~#c45a3c for emergency elements | Yes |
| Same gold, urgency via layout | Keep exact gold, urgency from typography/layout only | |
| You decide | Claude picks | |

**User's choice:** Warm amber/red-gold accent (Recommended)
**Notes:** Applied to hero phone, CTA buttons, urgency badges, timeline dots. Rest stays olive.

---

## Schema & SEO Details

### Service schema approach

| Option | Description | Selected |
|--------|-------------|----------|
| Service + Offer + FAQ bundle | 3 JSON-LD blocks: Service, FAQPage, BreadcrumbList | Yes |
| Minimal Service only | Just Service + existing FAQ/Breadcrumb | |
| You decide | Claude picks | |

**User's choice:** Service + Offer + FAQ bundle (Recommended)
**Notes:** New buildServicePageJsonLd() function in json-ld.tsx.

### Metadata strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Template with service data | generateMetadata pulls from service registry | Yes |
| Hand-crafted per page | Unique title/desc written per content file | |
| You decide | Claude decides | |

**User's choice:** Template with service data (Recommended)
**Notes:** Title, desc, canonical, OG all driven by existing data.

### Dynamic OG images

| Option | Description | Selected |
|--------|-------------|----------|
| Include now | /api/og route with dark bg + gold text + service name | Yes |
| Defer to Phase 10 | Skip for now, add in Performance Polish phase | |
| You decide | Claude decides | |

**User's choice:** Include now (Recommended)
**Notes:** next/og (ImageResponse) is built-in. Each page gets unique social card.

### Testimonial filtering

| Option | Description | Selected |
|--------|-------------|----------|
| Service-filtered | Filter carousel to service-tagged testimonials, fallback to all if < 3 | Yes |
| Show all testimonials | Same carousel as homepage | |
| You decide | Claude decides | |

**User's choice:** Service-filtered (Recommended)
**Notes:** testimonials.ts already has service type tags.

### FAQ source strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Extend in content files | 5 base FAQs (services.ts) + 3-5 extended FAQs (content files) = 8-10 total | Yes |
| Use services.ts only | Only existing 5+ FAQs | |
| You decide | Claude decides | |

**User's choice:** Extend in content files (Recommended)
**Notes:** More FAQ content = more rich snippet eligibility + word count.

---

## Claude's Discretion

- Exact content prose and storytelling per service
- Emergency-specific section content (What To Do, Insurance, Storm Damage)
- Warning signs scenarios per service type
- Visual styling details (timeline, material cards, mid-page CTA)
- OG image template layout
- Emergency accent exact hex value
- ScrollReveal animation timing

## Deferred Ideas

None -- discussion stayed within phase scope.
