# Project Research Summary

**Project:** Jersey City Quality Roofing
**Domain:** Local roofing lead generation website with programmatic SEO (150+ pages, siloed content architecture)
**Researched:** 2026-03-22
**Confidence:** HIGH

## Executive Summary

Jersey City Quality Roofing is a local lead generation website for a roofing contractor serving Hudson County, NJ. The goal is to rank for "[service] + [city]" keyword combinations across 12 municipalities while converting visitors into phone calls and form submissions. Research confirms this is a well-understood domain with a clear winning playbook: build a siloed content architecture that generates 150+ pages of deep, unique content organized around service-type and location topic clusters. This approach creates an unfair competitive advantage because most roofing competitors have 5-10 thin pages while this site targets 8 service pillar pages, 12 city hub pages, and 96 service-in-city pages — each at 3000+ words with 70%+ unique content.

The recommended technical approach is Next.js 16 (App Router) with static generation at build time via `generateStaticParams`. All pages are pre-rendered as static HTML and served from Vercel's edge CDN — delivering best-possible Core Web Vitals (a ranking factor) and lowest cost. TypeScript data files in `src/data/` act as the content layer for all 150+ pages, with a centralized content resolver, schema generator, and link graph engine composing pages from service registry and municipality registry data. Forms are handled via React Hook Form + Zod validation, submitted via Server Actions to a Resend-backed email delivery system, with Cloudflare Turnstile for bot protection.

The primary risk is Google's scaled content abuse detection and doorway page classification. The August 2025 Spam Update specifically targeted city-based landing page spam, and the February-December 2025 Core Updates targeted AI-generated content at scale. Mitigating this requires: (1) a 70/30 rule — 70% unique content per service-in-city page, not just city name swaps; (2) a genuine municipality data registry with local landmarks, housing stock, building codes, and weather patterns feeding content uniqueness; (3) incremental page launches in batches of 20-30 with indexing validation before expanding; and (4) human editorial oversight that introduces voice variation and eliminates AI content fingerprints before publishing.

---

## Key Findings

### Recommended Stack

The full stack is specified in the project constraints and confirmed by research as optimal. Next.js 16 with React 19 provides the cleanest path from structured data to statically generated HTML at scale. Tailwind CSS 4 (Rust-powered engine, CSS-first config) handles styling across the component library without the overhead of CSS-in-JS. The `cn()` utility pattern (clsx + tailwind-merge) is the standard for variant-driven components.

**Core technologies:**
- **Next.js 16.2 (App Router):** Full-stack framework — `generateStaticParams` powers programmatic page generation, Server Actions handle form submissions, built-in Metadata API handles SEO metadata and OG images
- **React 19.2:** Server Components as default reduces client JS; `use()` hook and Server Actions eliminate need for external state management on forms
- **TypeScript 5.7 (strict):** Type-safe content data objects with `satisfies` operator prevent drift between data layer and component contracts across 150+ pages
- **Tailwind CSS 4.1:** CSS-first configuration, container queries built-in, 5x faster builds — scales across shared component library
- **Motion 12.x:** Scroll-linked animations for hero parallax, page transitions, swipe galleries — replaces Framer Motion (same library, renamed)
- **React Hook Form 7.72 + Zod 4.3:** Lightweight client-side form UX with schema-based validation; Zod v4 is 14x faster with native `.toJSONSchema()`
- **Resend 6.9:** Developer-first email delivery for lead notifications; free tier covers local business volume
- **Cloudflare Turnstile:** Invisible bot protection, 1M requests/month free — superior to reCAPTCHA (10K/month free tier, heavier script, user-hostile)
- **schema-dts 1.1:** Google-maintained TypeScript types for Schema.org JSON-LD — compile-time validation of structured data
- **Embla Carousel 8.6:** 800-byte headless carousel for before/after gallery and testimonial sliders
- **Vercel Analytics + Speed Insights:** Zero-config web analytics and Core Web Vitals monitoring in production

**Critical version requirements:** Zod must be v4 (not v3 — breaking changes but massive performance gains). Motion imports from `motion/react` not `framer-motion`. Tailwind 4 uses `@import "tailwindcss"` not `tailwind.config.js`.

**Rejected alternatives:** No CMS (TypeScript data files are simpler, type-safe, and zero-overhead at this scale). No MDX for programmatic pages (maintenance nightmare). No next-seo or next-sitemap (both superseded by App Router built-ins). No dark mode (doubles design surface for a lead gen site with no conversion benefit).

---

### Expected Features

See full analysis in `.planning/research/FEATURES.md`.

**Must have (table stakes — launch blockers):**
- Mobile-first responsive design with sub-2s page load on 4G
- Persistent click-to-call phone number visible at all viewports and scroll positions
- Homepage with hero CTA, trust signal proof strip, services grid, testimonials, FAQ, final CTA
- 8 service pillar pages (4 residential: repair, replacement, inspection, emergency; 4 commercial: flat roof, maintenance, commercial repair, commercial replacement) — 3000+ words each
- 12 city hub pages for every Hudson County municipality — unique local content per city
- Contact page with form, phone, embedded Google Map, and NAP data
- Quote request form on every service page (5 fields max — more fields reduce conversion by 34%)
- JSON-LD structured data on every page: RoofingContractor, Service, FAQ, BreadcrumbList
- Breadcrumb navigation on all pages except homepage
- Technical SEO: metadata, canonical URLs, XML sitemap, robots.txt, Core Web Vitals optimization
- Internal linking system respecting silo boundaries with breadcrumbs as structural backbone
- Testimonials with star ratings above the fold on homepage and service pages
- Certification/insurance badge strip (GAF, Owens Corning, BBB, license numbers)
- FAQ sections (5-10 unique questions per page) for FAQ rich snippet eligibility

**Should have (competitive differentiators — add in v1.x):**
- 96 service-in-city pages (8 services x 12 municipalities) — the topical authority scale play
- Cost guide pages ("How much does roof replacement cost in Hoboken?") — high-intent, low-competition
- Blog with topic clusters (8-12 supporting articles per service silo, all linking back to pillars)
- Material deep-dive guides (asphalt, TPO, EPDM, metal, slate, etc.)
- Before/after project gallery filterable by service and city
- Problem-to-solution content (ice dams, ponding, flashing failure — captures problem-aware searchers)
- Sticky floating CTA button for 3000+ word pages
- Exit-intent popup (trigger after 500+ monthly visitors with measurable bounce data)
- Emergency roofing conditional banner (toggle on seasonally)

**Explicit anti-features (do not build):**
- Live chat / AI chatbot — credibility destroyer for a specialty trade; add only after 50+ leads/month with staff to manage
- Online instant estimate calculator — roofing estimates require inspection; inaccurate estimates create friction; third-party tools (Roofr, InstantRoofer) capture your leads into their platform
- Thin city pages beyond the 12 municipalities actually served — doorway page risk
- Multiple popups per session — Google penalizes intrusive interstitials; one exit-intent popup maximum
- Auto-playing video backgrounds — guaranteed Core Web Vitals failure on mobile
- Social media feed embeds — 500KB-2MB of third-party JavaScript for non-indexable content
- Blog comment system — spam magnet with zero SEO value

**Defer to v2+:**
- Insurance claim guide (high value but requires depth to get right)
- Financing options page (depends on actual business partnership)
- Video testimonials (requires real video content)
- Case study pages (requires genuine project narratives)
- Multi-step form (A/B test only after sufficient traffic)
- Entity knowledge graph schema (advanced; validate basic schema first)
- Spanish language support (defer; doubles maintenance burden for 150+ pages)

---

### Architecture Approach

The architecture is a four-layer system: Presentation Layer (layout shell, page templates, section components, UI primitives) — Data Composition Layer (content resolver, schema generator, link graph engine) — Data Layer (municipality registry, service registry, content templates) — SEO Infrastructure Layer (metadata generator, sitemap generator, robots.ts, canonical URL logic). This separation means page templates are content-agnostic shells; data files are the intelligence. Adding a new city or service requires only a data file change, not component changes.

**Major components:**
1. **Municipality Registry** (`data/municipalities/`) — 12 TypeScript files, one per Hudson County city, each containing landmarks, housing stock, building codes, weather patterns, neighborhood names, and local demographic data. This is the primary mechanism for content uniqueness across service-in-city pages. Without rich data here, 96 location pages become doorway pages.
2. **Service Registry** (`data/services/`) — 8 TypeScript files (4 residential, 4 commercial) with service metadata, applicable materials, related problems, and FAQs. Parent of the silo hierarchy.
3. **Content Resolver** (`lib/content.ts`) — Pure functions that take a service slug + city slug and return fully composed page content by merging templates with city-specific data slots. This is where the 70/30 rule is enforced programmatically.
4. **Schema Generator** (`lib/schema.ts`) — Type-safe JSON-LD builders using `schema-dts`. Every page calls these builders with its data — schema is never hardcoded. Single source of truth for NAP data prevents GBP mismatches.
5. **Link Graph Engine** (`lib/linking.ts`) — Deterministic functions that compute breadcrumb paths, related services, sibling cities, and within-silo links. Enforces silo boundaries in code — cross-silo links must be explicitly declared.
6. **Page Templates** — Server Components at `app/(marketing)/services/residential/[service]/[city]/page.tsx` and equivalent paths. Call content resolver, schema generator, and link graph engine. No business logic lives in templates.
7. **Lead Capture System** (`components/forms/`) — Client Components: quote-request-form.tsx, contact-form.tsx, exit-intent-modal.tsx. Use React Hook Form + Zod. Submitted via Server Actions to contact API route.
8. **Layout Shell** (`app/(marketing)/layout.tsx`) — Sticky header with phone number, footer, mega-menu navigation with silo structure, sticky CTA button. Wraps all marketing pages via route group without affecting URLs.

**Key routing pattern:** Physical directories for silos (not route groups) — `/services/residential/[service]` and `/services/commercial/[service]` appear in URLs, creating URL-level topical signals. Nested dynamic segments `[service]/[city]/` cascade `generateStaticParams` for the full service-city matrix.

---

### Critical Pitfalls

Full details in `.planning/research/PITFALLS.md`.

1. **Doorway page classification** — Google has explicitly warned that "[keyword] + [city]" page patterns constitute doorway page spam. The August 2025 Spam Update targeted this exact pattern. Prevention: enforce 70% unique content per service-in-city page via city-specific data slots in the Municipality Registry; use the "city name removal test" (remove city name — can you still tell which city the page is for?); launch in batches of 20-30 pages and validate indexing before expanding. Recovery is 3-6 months — prevent this at the architecture stage.

2. **Scaled content abuse on AI-generated text** — Google's 2024-2025 Core Updates aggressively target AI-generated content at scale. With 150+ pages at 3000+ words (450,000+ total words), statistical fingerprints compound. Prevention: build a voice bible for the roofing contractor persona; human editorial pass on every page to introduce sentence fragments, varied paragraph lengths, colloquialisms; run Originality.ai on every page before publish (target below 30% AI-detected); vary content structure across pages (not every page should have the same H2 order).

3. **Thin content despite high word count** — Google's December 2025 Core Update specifically targeted long-but-padded content. A 3000-word page can still receive a thin content penalty if it says nothing useful in many words. Prevention: define a content density rubric requiring 5+ unique data points per city-service combination, 2+ specific cost ranges, 1 detailed local process walkthrough, 3+ city-specific FAQs; apply the "delete test" (remove any paragraph — did the page lose something city-specific?).

4. **Silo structure leakage** — Automated internal linking based on keyword matching creates cross-silo links that dilute topical authority. Blog posts without silo assignment become orphan pages that drain link equity. Prevention: encode silo rules in `lib/linking.ts`; every blog post assigned to exactly one silo at creation; footer links limited to top-level silo pages only; audit monthly that within-silo links outnumber cross-silo at 4:1 ratio.

5. **Schema/NAP inconsistency across 150+ pages** — Hardcoded or template-drifted schema creates NAP mismatches between website and Google Business Profile, which can filter the GBP listing from local pack results. Prevention: single constants file (`lib/constants.ts`) feeds both page content and schema; schema is generated programmatically from page data (never hardcoded); FAQ schema derived from same data array that renders FAQ component; validate schema in CI pipeline before deploy.

6. **Canonical URL chaos on dynamic routes** — `router.pathname` returns route pattern not actual URL; trailing slash inconsistency creates duplicate content. Prevention: implement `alternates.canonical` in `generateMetadata` for every dynamic route; lock trailing slash policy in `next.config.js` on day one; noindex all Vercel preview deployments.

7. **SEO-content vs. conversion conflict** — 3000-word pages designed for Google ranking push conversion elements (phone, form, trust signals) below the fold, costing leads. Prevention: design the "conversion sandwich" — conversion elements at top (above fold), SEO content in middle, conversion elements at bottom; sticky header with phone always visible; CTAs within first viewport on every page template; emergency service pages get a separate "crisis mode" template with phone number as the hero.

---

## Implications for Roadmap

Based on combined research, the following phase structure is recommended. Dependencies are strict: Phase 1 must complete before Phase 2 can begin; Phase 3 requires Phase 2 data files to be populated; Phase 4 requires Phase 3 pages to be indexed.

### Phase 1: Technical Foundation and Architecture Setup

**Rationale:** Architecture decisions made here cannot be changed later without massive cost. URL structure is permanent once indexed. Silo rules must be in code before any content pages exist. Schema generation infrastructure must be built before pages are created. Canonical URL strategy must be locked before any pages go live. All 7 critical pitfalls have their prevention roots in this phase.

**Delivers:**
- Next.js project scaffold with TypeScript strict mode
- Tailwind CSS 4 + design token system
- TypeScript type definitions (`types/municipality.ts`, `types/service.ts`, `types/content.ts`)
- Municipality Registry stub files (12 cities with data schema, placeholder data)
- Service Registry stub files (8 services with data schema)
- `lib/constants.ts` — single source of truth for NAP, phone, base URL
- `lib/schema.ts` — type-safe JSON-LD builders with schema-dts, all schema types
- `lib/linking.ts` — silo rules encoded, breadcrumb computation, within-silo link logic
- `lib/content.ts` — content resolver scaffolding
- `lib/metadata.ts` — shared metadata generation helpers
- Root layout with fonts (Cormorant, Cormorant Garamond), global CSS
- `robots.ts`, `sitemap.ts` stubs
- `next.config.js` with trailing slash policy locked
- Vercel project setup with noindex on preview deployments
- CI schema validation step

**Features from FEATURES.md addressed:** Technical SEO foundation (metadata, canonical URLs, XML sitemap, robots.txt), JSON-LD schema system, internal linking system foundation

**Pitfalls avoided:** Canonical URL chaos, Schema/NAP inconsistency, Silo structure leakage (prevention infrastructure only — enforcement comes in later phases)

**Research flag:** Standard patterns — no additional research needed. Well-documented Next.js App Router patterns.

---

### Phase 2: UI Component Library and Layout Shell

**Rationale:** Components must exist before pages are assembled. The layout shell (header with phone, footer, sticky CTAs, mega-menu with silo navigation) wraps all marketing pages and must be built before any page templates. The form components (React Hook Form + Zod + Server Actions + Resend) are the primary conversion mechanism and must be validated before appearing on 8 service pages.

**Delivers:**
- UI primitives (`components/ui/`): Button, Card, Input, Badge, StarRating, PhoneLink — with CVA variant system
- Layout shell (`components/layout/`): Header with sticky phone, Footer, Navigation mega-menu (silo-structured), Breadcrumbs, StickyCTA, PhoneBar (mobile)
- Section components (`components/sections/`): HeroSection, ServiceGrid, TestimonialsSection, FAQSection, TrustSignals, ProcessSteps, RelatedServices, EmergencyBanner
- Lead capture forms (`components/forms/`): QuoteRequestForm, ContactForm — React Hook Form + Zod + Server Actions
- Resend email notification integration
- Cloudflare Turnstile + honeypot fields on all forms
- `cn()` utility, `components/ui/` design system
- Motion animations for hero and scroll-triggered elements

**Features from FEATURES.md addressed:** Click-to-call on every page, quote request form on every page, trust signals system, mobile-first responsive design, above-the-fold CTA, FAQ accordion UI

**Pitfalls avoided:** CRO failures (conversion elements designed into layout shell, cannot be pushed below fold), Mobile conversion element visibility tested at 375px viewport

**Research flag:** Standard patterns. React Hook Form + Zod + Server Actions is well-documented. Resend integration straightforward.

---

### Phase 3: Core Pages and Content Launch (v1 MVP)

**Rationale:** This is the minimum viable site to begin indexing and capturing leads. The homepage, 8 service pillar pages, 12 city hub pages, About, and Contact create the silo skeleton that all future content hangs from. Service-in-city pages cannot exist without city hub parent pages being indexed first. Blog posts cannot be effective without service pillar pages to link back to. The content here is the hardest to produce (3000+ words each, genuinely unique) and must be built before any scale-up.

**Delivers:**
- Homepage (hero with conversion flow, services grid, testimonials, FAQ, service areas, CTAs)
- 8 service pillar pages (4 residential + 4 commercial) — 3000+ words each, unique FAQs, process explainers, cost ranges
- 12 city hub pages — 3000+ words each with unique local content from Municipality Registry
- About page (company story, certifications, insurance, team)
- Contact page (form, phone, map, NAP data)
- Service areas overview page (county map, links to city hubs)
- All page metadata, canonical URLs, and schema markup via generators from Phase 1
- XML sitemap segmented by content type (services, locations, core pages)
- Municipality Registry fully populated with real data (landmarks, housing stats, building codes) for all 12 cities

**Features from FEATURES.md addressed:** Homepage with conversion flow, all 8 service pages, all 12 city hub pages, About, Contact, testimonials display, certification badges, breadcrumb navigation, FAQ sections

**Pitfalls avoided:** Thin content (content density rubric enforced before writing), CRO failures (conversion sandwich template), schema inconsistency (generators, not hardcoded)

**Research flag:** Needs research-phase attention during planning. Content strategy for 3000-word pages needs a clear rubric. Municipality data collection (12 cities, actual local data) is a research task distinct from development. Content variation system (voice bible) must be established before any AI-assisted content generation.

---

### Phase 4: Programmatic Scale-Up — Service-in-City Pages

**Rationale:** The 96 service-in-city pages (8 services x 12 municipalities) are the topical authority scale play and the biggest competitive differentiator. They must come after Phase 3 for two reasons: (1) city hub pages must exist and be indexed as parent pages first; (2) the 70/30 content uniqueness requirement demands a fully populated Municipality Registry (Phase 3 prerequisite). Launch incrementally — start with the 4 largest markets (Jersey City, Hoboken, Bayonne, North Bergen) for all services (32 pages), validate indexing, then expand.

**Delivers:**
- 96 service-in-city pages (`/services/residential/[service]/[city]/` and `/services/commercial/[service]/[city]/`)
- `generateStaticParams` for nested dynamic routes
- Content resolver (`lib/content.ts`) fully implemented with 70/30 enforcement
- Per-city FAQ generation from city data
- Cost ranges localized per city
- City-specific testimonials display
- Sitemap segments for service-in-city pages
- Incremental launch plan: 32 pages per batch with Search Console monitoring between batches

**Features from FEATURES.md addressed:** 96 service-in-city pages (P2 differentiator), location-specific testimonials, cost guide content per location

**Pitfalls avoided:** Doorway page classification (70% unique content enforced via content resolver, city name removal test applied to all pages before launch), scaled content abuse (human editorial QA with AI detection scoring before each batch), thin content (content density rubric enforced)

**Research flag:** HIGH priority for research-phase during planning. Content quality and uniqueness is the single biggest risk. Needs a defined QA process (city name removal test, AI detection scoring, content density audit) before any pages are published.

---

### Phase 5: Content Depth and Blog Ecosystem

**Rationale:** With service pillar pages and city hub pages indexed and ranking, the blog topic clusters, cost guides, material guides, and problem-to-solution pages extend topical authority into informational query territory. These require the silo structure to be established first (blog posts must link back to a published pillar page) and need evidence of what queries are driving impressions (Search Console data from Phase 3-4).

**Delivers:**
- Blog system (`app/(marketing)/blog/`) with silo assignment per post
- 8-12 supporting blog articles per service silo (minimum 40 posts at launch)
- Cost guide pages per service and location (template-driven from service + city data)
- Material deep-dive guides (asphalt, TPO, EPDM, metal, slate, modified bitumen, cedar shake, tile)
- Problem-to-solution pages (ice dam damage, ponding water, flashing failure, hail damage, wind uplift)
- All blog posts assigned to exactly one silo, linking back to silo pillar pages
- Blog sitemap segment

**Features from FEATURES.md addressed:** Blog with topic clusters, cost guide pages, material deep-dive guides, problem-to-solution content

**Pitfalls avoided:** Orphaned blog content (silo assignment enforced at creation; every post gets 2+ inbound silo links), silo structure leakage (blog categories mirror service silos exactly)

**Research flag:** Standard blog patterns for Next.js are well-documented. Content strategy for topic clusters is the risk area — needs a defined linking plan before writing begins.

---

### Phase 6: Conversion Optimization and Advanced Features

**Rationale:** These features are data-driven optimizations that require traffic and conversion data before they can be meaningfully implemented. Exit-intent popup requires 500+ monthly visitors to validate. Sticky floating CTA requires scroll depth analytics to confirm the problem. Google Reviews widget requires an established GBP with review volume. Before/after gallery requires actual project photos.

**Delivers:**
- Before/after project gallery (filterable by service and city, lazy-loaded, Embla Carousel)
- Exit-intent popup (targeted offer based on page type — emergency vs. informational)
- Sticky/floating CTA button (scroll-triggered, page-type aware)
- Emergency roofing banner component (conditional, toggleable)
- Google Reviews widget integration
- Vercel Analytics + Speed Insights in production
- GA4 via `@next/third-parties` with event tracking (form submissions, phone clicks, CTA clicks per service/city)
- Dynamic OG images per page via `next/og`
- Lighthouse CI on heaviest page (not just homepage)

**Features from FEATURES.md addressed:** Before/after gallery, exit-intent popup, sticky floating CTA, emergency banner, Google reviews widget, analytics tracking

**Research flag:** Standard patterns. Before/after gallery implementation with Embla is straightforward. Analytics event tracking setup is well-documented.

---

### Phase Ordering Rationale

- **Phase 1 before everything:** URL structure, silo rules, and schema generation are architectural decisions that cannot be changed after indexing begins. Retrofitting costs months of re-crawl time.
- **Phase 2 before Phase 3:** Components must exist before pages are assembled. The form system must be validated end-to-end (Server Action -> Resend -> email delivery) before it appears on 8 service pages.
- **Phase 3 before Phase 4:** City hub pages must be indexed as parent pages before service-in-city child pages link up to them. The silo hierarchy is built top-down.
- **Phase 4 in batches:** The doorway page risk is too severe to launch all 96 pages simultaneously. Batch validation (20-30 pages, monitor Search Console, check indexing rate, then expand) is non-negotiable.
- **Phase 5 after Phase 3-4:** Blog posts can only strengthen silo authority if pillar pages already rank and provide link equity to pass. Building the blog before pillar pages are indexed is creating orphan content.
- **Phase 6 after traffic data:** Conversion optimizations are most effective when targeted at observed user behavior, not theoretical patterns. The data must exist before optimizing for it.

---

### Research Flags

**Phases needing deeper research during planning:**

- **Phase 3 (Core Content):** Content strategy requires pre-production research — defining the voice bible, content density rubric (minimum data points per page), and Municipality data collection plan for all 12 cities. This is a significant research and data collection effort separate from development. Recommend a dedicated content research sprint before Phase 3 development begins.

- **Phase 4 (Service-in-City Scale-Up):** Content quality QA process must be defined and tested on a small batch (4-8 pages) before the full 96-page build. The doorway page pitfall is severe enough (3-6 month recovery) that a QA gate with the city name removal test and AI detection scoring is mandatory. Research the specific city data for each of the 12 municipalities (housing stock, building codes, landmarks) before Phase 4 begins.

**Phases with standard patterns (skip research-phase):**

- **Phase 1 (Foundation):** Next.js App Router, TypeScript strict mode, Tailwind CSS 4 — all well-documented with official sources. schema-dts and linking logic are custom but straightforward.
- **Phase 2 (UI Components):** React Hook Form + Zod + Server Actions is extremely well-documented. CVA + tailwind-merge pattern is standard. Resend integration has official Next.js docs.
- **Phase 5 (Blog/Content):** Blog implementation in Next.js App Router is standard. The risk is content strategy (covered by Phase 5 rationale), not technical implementation.
- **Phase 6 (Conversion Optimization):** Analytics integration, Embla Carousel, and exit-intent popup are all well-documented.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies are current stable releases verified against official documentation. Version numbers confirmed against npm registry as of March 2026. No pre-1.0 or experimental dependencies in critical path (schema-dts is stable despite infrequent releases; @react-email/components is MEDIUM). |
| Features | HIGH | Roofing industry best practices are well-documented. Local SEO for service businesses has authoritative sources (Sterling Sky, Search Engine Land). CRO patterns are research-backed. Anti-features list is grounded in documented Google policies and documented conversion data. |
| Architecture | HIGH | The four-layer architecture (Presentation > Composition > Data > SEO Infrastructure) is a clean application of standard Next.js App Router patterns to the specific data model of this site. No novel patterns — proven approach adapted to the service/city matrix. |
| Pitfalls | HIGH | Primary pitfalls sourced from official Google documentation (Spam Policies), documented manual action case studies (Sterling Sky), and John Mueller's explicit statements about city landing pages. The doorway page and scaled content abuse risks are well-documented and current as of 2025-2026. |

**Overall confidence:** HIGH

### Gaps to Address

- **Municipality data completeness:** The Municipality Registry needs real data (landmarks, housing stock, building codes, weather patterns, demographics) for all 12 Hudson County municipalities. This data must be researched and entered before Phase 4 content generation can produce genuinely unique pages. A data collection sprint is needed — likely 1-2 weeks of research per phase.

- **Actual business information:** Company NAP data (exact address format, phone number format, license numbers, certifications, insurance information) must be obtained from the client before any schema or page content can be finalized. This is a client deliverable, not a development task.

- **Content voice calibration:** The "voice bible" for roofing contractor persona — specific vocabulary, acceptable colloquialisms, technical terms, tone guidelines — must be created before any AI-assisted content generation. Without this, scaled content abuse risk is high.

- **GBP alignment:** The exact business name, address format, and phone number as listed on Google Business Profile must be obtained and matched exactly in `lib/constants.ts`. This cannot be assumed or templated.

- **Photo and media assets:** Before/after gallery (Phase 6) and video testimonials (v2+) require real project photos from the client. Placeholder architecture can be built, but the visual trust signals require actual client assets.

---

## Sources

### Primary (HIGH confidence)

- [Next.js 16 Official Documentation](https://nextjs.org/docs) — App Router, generateStaticParams, Metadata API, Server Actions, sitemap convention
- [React 19.2 Official Documentation](https://react.dev) — Server Components, use() hook, Actions API
- [Tailwind CSS v4 Official Release](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first config, new engine
- [Zod v4 Release Notes](https://zod.dev/v4) — performance improvements, breaking changes
- [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies) — scaled content abuse, doorway pages definition
- [Sterling Sky: Service Area Pages SEO](https://www.sterlingsky.ca/how-to-create-unique-and-helpful-service-area-pages-for-local-businesses/) — canonical source on location page best practices
- [Sterling Sky: Thin Content Manual Penalties](https://www.sterlingsky.ca/thin-content-manual-penalty/) — documented case studies
- [Search Engine Roundtable: Google Warns City Landing Pages Can Be Doorway Pages](https://www.seroundtable.com/google-city-landing-pages-doorway-pages-28670.html) — John Mueller's explicit statement
- [Search Engine Land: Local SEO Sprints 90-day Plan 2026](https://searchengineland.com/local-seo-sprints-a-90-day-plan-for-service-businesses-in-2026-469059) — authoritative industry publication

### Secondary (MEDIUM confidence)

- [schema-dts GitHub (Google-maintained)](https://github.com/google/schema-dts) — TypeScript Schema.org types
- [Resend Next.js Integration](https://resend.com/nextjs) — official integration documentation
- [Schema App: LocalBusiness Schema Guide](https://www.schemaapp.com/schema-markup/how-to-do-schema-markup-for-local-business/) — specialized schema authority
- [Hook Agency: Best Roofing Websites](https://hookagency.com/blog/best-roofing-websites/) — industry design patterns
- [WebFX: Roofing Lead Generation Guide](https://www.webfx.com/blog/home-services/roofing-lead-generation-guide/) — conversion optimization data
- [Breakline: Guide to Google's Scaled Content Abuse Policies](https://www.breaklineagency.com/guide-to-googles-scaled-content-abuse/) — enforcement examples through 2025
- [Local Dominator: Google August 2025 Spam Update](https://localdominator.co/google-august-2025-spam-update/) — update targeting location page spam
- [Zadro Web: Topical Authority and SILO Architecture](https://zadroweb.com/blog/topical-authority-silo-architecture/) — topical authority patterns

### Tertiary (needs validation)

- Reported statistics (67% more organic traffic from content clusters, 2.5x longer ranking retention with silos) — cited by multiple sources but based on industry studies; treat as directional, not precise
- AI detection scoring thresholds (below 30% AI-detected) — derived from community consensus, not official Google policy

---

*Research completed: 2026-03-22*
*Ready for roadmap: yes*
