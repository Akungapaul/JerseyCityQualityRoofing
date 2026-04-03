# Jersey City Quality Roofing

## What This Is

A topical-authority lead generation website for a local roofing company serving Jersey City and all 12 Hudson County, NJ municipalities. Built with comprehensive siloed content architecture (150+ pages), deep 3000+ word pages, full semantic SEO with JSON-LD entity graph, and dual lead capture (phone + form). Currently deployed with placeholder content structured for easy swap with real business details.

## Core Value

Every visitor within Hudson County searching for roofing services finds this site, trusts it as the local authority, and converts into a lead (phone call or form submission).

## Current State

**Shipped:** v1.0 MVP (2026-04-03)
**Codebase:** 36,744 LOC TypeScript across 554 files
**Tech stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS 4, Motion, Vercel
**Pages:** 150+ static pages (4 core, 8 service pillars, 12 city hubs, 96 service-in-city, 27 content pages, 3 silo indexes, gallery)
**Domain:** jerseycityqualityroofing.com

### What Shipped in v1.0
- Siloed URL architecture with residential/commercial service silos and location branches
- 8 service pillar pages (4 residential, 4 commercial) with 3000+ words each
- 12 city hub pages with unique local content per municipality
- 96 service-in-city pages with 70%+ content uniqueness and city-specific FAQs
- 27 supporting content pages (8 blog, 8 cost guides, 6 material guides, 5 problem-solution)
- Full lead capture: quote forms, Resend email, Turnstile captcha, floating CTA, exit-intent popup
- JSON-LD entity graph on every page (LocalBusiness, Service, FAQ, BreadcrumbList, AggregateRating)
- Automated silo-aware internal linking system with 7-type content registry
- Design system: Deep Olive Sage palette, Cormorant Garamond, WCAG AA, Motion animations
- SEO infrastructure: sitemap, robots.txt, canonical URLs, OG images, breadcrumbs

### Known Tech Debt (v1.0)
- Gallery placeholder images (SVG data URIs) — pending real photo swap
- Lighthouse CWV verification pending human run on production
- 2 lint false positives (floating-cta.tsx, use-exit-intent.ts) — intentional patterns

## Requirements

### Validated

- ✓ Siloed site architecture with service-type silos and location branches — v1.0
- ✓ Residential service pages: Repair, Replacement, Inspection, Emergency — v1.0
- ✓ Commercial service pages: Flat Roof, Maintenance, Commercial Repair, Commercial Replacement — v1.0
- ✓ City hub pages for all 12 Hudson County municipalities — v1.0
- ✓ 96 service-in-city pages with 70%+ content uniqueness — v1.0
- ✓ 3000+ words per page with unique, humanized content — v1.0
- ✓ Dual lead capture: phone (click-to-call) and quote request forms — v1.0
- ✓ Blog with silo-supporting and standalone articles — v1.0
- ✓ Cost guides per service type with location-specific pricing — v1.0
- ✓ Material deep-dive guides (asphalt, TPO, EPDM, slate, metal, modified bitumen) — v1.0
- ✓ Problem-to-solution mapping content — v1.0
- ✓ Before/after project gallery with comparison sliders — v1.0
- ✓ JSON-LD entity graph on every page — v1.0
- ✓ Automated internal linking across silos — v1.0
- ✓ Core Web Vitals optimization (code-level) — v1.0
- ✓ Persistent CTAs: sticky header, floating button, exit-intent — v1.0
- ✓ Emergency/urgency banners — v1.0
- ✓ Trust signals: certifications, badges, star ratings — v1.0
- ✓ NAP consistency across all pages — v1.0
- ✓ Breadcrumb navigation with schema — v1.0
- ✓ Design system with Cormorant Garamond, WCAG AA — v1.0

### Active

(None — next milestone not yet planned)

### Out of Scope

- Google indexing budget management — operational concern, not build scope
- Real business content — placeholder content for now, structured for future swap
- Paid advertising landing pages — organic-first strategy
- Multi-language support — English only for v1
- Customer portal / login area — lead gen only, no accounts
- E-commerce / online payments — service business, not product sales
- Online cost calculator — creates false expectations, anti-feature per research
- AI chatbot — adds JS weight, destroys credibility, anti-feature per research
- Auto-playing video backgrounds — guarantees failed CWV, anti-feature per research
- Multiple popups per session — triggers Google interstitial penalties
- Dark mode — no conversion benefit for local service business

## Context

- **Domain:** Local service business (roofing) in Hudson County, NJ
- **Market:** 12 municipalities — Jersey City is anchor city and largest market
- **Competition:** Local roofers with thin template sites; this site's 150+ deep pages are a significant differentiator
- **Content differentiation:** Each location page uses city-specific data (housing stock, architecture, weather, landmarks, building codes)
- **Humanization:** First-person storytelling, conversational neighbor tone, real-world city-specific scenarios

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Service-type silos with location branches | Best for topical authority — each service pillar builds depth | ✓ Good — 150+ pages with clear hierarchy |
| Both residential and commercial categories | Doubles addressable market and content surface | ✓ Good — 8 distinct service pillars |
| All 12 Hudson County municipalities | Maximum local coverage for the county | ✓ Good — 96 unique service-in-city pages |
| 3000+ words per page | Necessary depth for topical authority | ✓ Good — all pages meet target |
| Dual CTA (phone + form equally) | Different visitors prefer different methods | ✓ Good — implemented on every page |
| Placeholder content (not real business) | Build full structure now, swap later | ✓ Good — realistic structure, easy swap |
| Deep Olive Sage color palette | Professional, nature-adjacent, trust-evoking | ✓ Good — consistent across 150+ pages |
| TypeScript data files over CMS | Type-safe, zero-overhead for 150 pages | ✓ Good — compile-time validation |
| Batched service-in-city launch (Tier 1/2/3) | Avoid doorway page classification | ✓ Good — all 96 pages passed uniqueness tests |
| Resend for email | Free tier sufficient, developer-first API | ✓ Good — Server Action integration clean |
| Cloudflare Turnstile over reCAPTCHA | Free 1M/month, invisible, lighter | ✓ Good — zero user friction |
| Motion library for animations | GPU-accelerated, scroll-linked | ✓ Good — smooth on mobile |
| Embla Carousel for galleries | 800 bytes, headless, accessible | ✓ Good — clean testimonial + gallery UX |

## Constraints

- **Tech stack**: Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4, Motion library, Vercel deployment, pnpm
- **Typography**: Cormorant Garamond (medium) for body, Cormorant for headings, minimum 18px body font
- **Content depth**: Minimum 3000 words per page
- **Content style**: Placeholder content must be realistic and structured identically to final content
- **SEO**: Every page must have metadata exports, one h1, strict heading hierarchy, descriptive alt text, canonical URLs, JSON-LD structured data
- **Accessibility**: Semantic HTML, keyboard navigation, WCAG AA contrast, focus-visible styles

## Next Milestone Goals

(Not yet defined — run `/gsd:new-milestone` to plan v1.1)

---
*Last updated: 2026-04-03 after v1.0 milestone*
