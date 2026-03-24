# Jersey City Quality Roofing

## What This Is

A topical-authority lead generation website for a local roofing company serving Jersey City and all 12 Hudson County, NJ municipalities. The site is designed to dominate local search through comprehensive siloed content architecture, deep 3000+ word pages, and full semantic SEO — covering both residential and commercial roofing services. Currently using placeholder content structured for easy swap with real business details.

## Core Value

Every visitor within Hudson County searching for roofing services finds this site, trusts it as the local authority, and converts into a lead (phone call or form submission).

## Requirements

### Validated

- [x] Dual lead capture: phone (click-to-call) and quote request forms, equally weighted — Validated in Phase 3: Lead Capture System
- [x] Sticky/persistent CTAs: phone number header, floating quote button, exit-intent forms — Partially validated in Phase 3 (header CTA scroll-to-form; floating button and exit-intent deferred to Phase 10)

### Active

- [ ] Siloed site architecture with service-type silos and location branches
- [x] Residential service pages: Roof Repair, Roof Replacement, Roof Inspection, Emergency Roofing — Validated in Phase 5: residential-service-pages
- [ ] Commercial service pages: Flat Roof Systems, Roof Maintenance, Commercial Repair, Commercial Replacement
- [ ] City hub pages for all 12 Hudson County municipalities (Jersey City, Hoboken, Bayonne, North Bergen, Union City, West New York, Secaucus, Kearny, Harrison, East Newark, Guttenberg, Weehawken)
- [ ] Service-in-city pages (~96 pages: each service x each municipality)
- [~] 3000+ words per page with unique, humanized content — Partially validated: residential pages have 2200+ words content + ~1000 words structured data (Phase 5)
- [ ] Content uniqueness per location: local context, landmarks, city-specific stats, unique FAQs
- [~] Humanized content voice: storytelling tone, conversational, real-world scenarios, expert authority — Partially validated: residential pages use expert-neighbor voice with Hudson County context (Phase 5)
- [x] Dual lead capture: phone (click-to-call) and quote request forms, equally weighted
- [ ] Homepage optimized for Jersey City anchor city
- [ ] About page (company story, team, certifications, insurance)
- [ ] Contact page with form and map
- [ ] Testimonials/reviews section with social proof on every page
- [ ] Gallery/portfolio with before/after project photos
- [ ] Blog — dual purpose: silo-supporting articles + standalone educational content
- [ ] Cost guides per service and location
- [ ] Material deep-dive guides (asphalt, TPO, EPDM, slate, metal)
- [ ] Process explainer pages (what to expect, timelines, step-by-step)
- [ ] Problem-to-solution mapping content (ice dams, ponding, flashing failure -> services)
- [ ] Schema markup on every page: LocalBusiness, Service, FAQ, Review, BreadcrumbList
- [ ] JSON-LD knowledge graph mapping entities: Service -> Location -> Materials -> Problems -> Solutions
- [ ] Google Business Profile alignment: NAP consistency, map embeds, GBP-aligned content
- [ ] Automated internal linking across silos + breadcrumbs + related content
- [ ] Technical SEO: Core Web Vitals, XML sitemap, robots.txt, canonical URLs, meta optimization
- [ ] Semantic SEO: entity mapping, exhaustive topic clusters, NLP-optimized copy, co-occurring terms
- [ ] Trust signals: certifications, insurance badges, guarantees, years in business
- [ ] Sticky/persistent CTAs: phone number header, floating quote button, exit-intent forms
- [ ] Urgency elements: emergency banners, seasonal promotions
- [ ] Star ratings and review displays on service and location pages

### Out of Scope

- Google indexing budget management — operational concern, not build scope
- Real business content — placeholder content for now, structured for future swap
- Paid advertising landing pages — organic-first strategy
- Multi-language support — English only for v1
- Customer portal / login area — lead gen only, no accounts
- E-commerce / online payments — service business, not product sales

## Context

- **Domain:** Local service business (roofing) in Hudson County, NJ
- **Market:** 12 municipalities in Hudson County — Jersey City is the anchor city and largest market
- **Competition:** Local roofers competing for "roofing + city" keywords; most have thin, template sites
- **Opportunity:** Topical authority through comprehensive deep content is rare in local roofing — most competitors have 5-10 shallow pages
- **Scale:** 150+ pages planned across service silos, location hubs, service-in-city pages, and supporting blog/resource content
- **Content differentiation:** Each location page uses city-specific data (housing stock age, architecture styles, weather patterns, landmarks, local building codes) to ensure uniqueness and avoid duplicate content penalties
- **Humanization approach:** First-person storytelling, conversational neighbor tone, real-world scenarios specific to each city, deep technical authority that signals genuine roofing expertise

## Constraints

- **Tech stack**: Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4, Motion library, Vercel deployment, pnpm — per CLAUDE.md
- **Typography**: Cormorant Garamond (medium) for body, Cormorant for headings, minimum 18px body font — per CLAUDE.md
- **Content depth**: Minimum 3000 words per page — non-negotiable for topical authority
- **Content style**: Placeholder content must be realistic and structured identically to final content (not lorem ipsum)
- **SEO**: Every page must have metadata exports, one h1, strict heading hierarchy, descriptive alt text, canonical URLs, JSON-LD structured data
- **Accessibility**: Semantic HTML, keyboard navigation, WCAG AA contrast, focus-visible styles

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Service-type silos with location branches | Best for topical authority — each service pillar builds depth, locations extend reach | -- Pending |
| Both residential and commercial categories | Doubles addressable market and content surface area | -- Pending |
| All 12 Hudson County municipalities | Maximum local coverage for the county; no partial approach | -- Pending |
| 3000+ words per page | Necessary depth for topical authority in competitive local SEO | -- Pending |
| Dual CTA (phone + form equally) | Different visitors prefer different conversion methods | -- Pending |
| Placeholder content (not real business) | Allows building the full site structure now, swap content later | -- Pending |
| Full semantic SEO with entity mapping | Differentiator vs competitor sites that rely on keyword stuffing | -- Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-24 after Phase 3 completion*
