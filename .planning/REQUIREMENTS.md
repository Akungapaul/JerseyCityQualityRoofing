# Requirements: Jersey City Quality Roofing

**Defined:** 2026-03-22
**Core Value:** Every visitor within Hudson County searching for roofing services finds this site, trusts it as the local authority, and converts into a lead.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation (FNDN)

- [ ] **FNDN-01**: Next.js 16 App Router project scaffolded with TypeScript strict mode, Tailwind CSS 4, pnpm
- [ ] **FNDN-02**: Siloed URL architecture with nested dynamic segments for service-type and location branches
- [ ] **FNDN-03**: TypeScript data registries for all 12 municipalities (landmarks, housing stock, building codes, weather patterns, architecture styles, population, common roof types)
- [ ] **FNDN-04**: TypeScript data registries for all 8 services (residential: repair, replacement, inspection, emergency; commercial: flat roof, maintenance, repair, replacement)
- [ ] **FNDN-05**: Reusable page layout shell with sticky header (phone number), footer, breadcrumbs, and navigation
- [ ] **FNDN-06**: Design system with Cormorant Garamond typography (medium weight body, 18px min), color theme, component variants
- [ ] **FNDN-07**: Mobile-first responsive design across all viewports (mobile, tablet, desktop)

### Core Pages (CORE)

- [ ] **CORE-01**: Homepage with hero section, proof strip (certifications/badges), services grid, testimonials, service areas overview, FAQ, and dual CTAs (phone + form)
- [ ] **CORE-02**: About page with company story, team section, certifications, insurance info, license numbers, and years-in-business callout
- [ ] **CORE-03**: Contact page with multi-field quote form (name, phone, email, service type, address, message), embedded Google Map, and full NAP data
- [ ] **CORE-04**: Service area overview hub page listing all 12 Hudson County municipalities with map visualization and links to city pages

### Residential Services (RESI)

- [ ] **RESI-01**: Roof Repair service page (3000+ words) with process explainer, materials covered, FAQ section, testimonials, cost factors, and quote form
- [ ] **RESI-02**: Roof Replacement service page (3000+ words) with process explainer, materials options, FAQ section, testimonials, cost factors, and quote form
- [ ] **RESI-03**: Roof Inspection service page (3000+ words) with inspection types (pre-purchase, insurance, annual), FAQ section, testimonials, and quote form
- [ ] **RESI-04**: Emergency Roofing service page (3000+ words) with 24/7 availability emphasis, storm damage response process, FAQ section, and prominent phone CTA

### Commercial Services (COMM)

- [ ] **COMM-01**: Flat Roof Systems service page (3000+ words) covering TPO, EPDM, modified bitumen, with process explainer, FAQ, testimonials, and quote form
- [ ] **COMM-02**: Roof Maintenance Programs service page (3000+ words) with preventative maintenance plans, inspection schedules, FAQ, and quote form
- [ ] **COMM-03**: Commercial Repair service page (3000+ words) with large-scale leak repair, restoration services, FAQ, testimonials, and quote form
- [ ] **COMM-04**: Commercial Replacement service page (3000+ words) with full tear-off process, material options, FAQ, testimonials, and quote form

### Location Pages (LOC)

- [ ] **LOC-01**: City hub pages for all 12 Hudson County municipalities (Jersey City, Hoboken, Bayonne, North Bergen, Union City, West New York, Secaucus, Kearny, Harrison, East Newark, Guttenberg, Weehawken) — each with unique local content, services overview, testimonials, and FAQ
- [ ] **LOC-02**: Service-in-city pages (~96 pages) generated programmatically via generateStaticParams, each service x each municipality
- [ ] **LOC-03**: Each service-in-city page achieves 70%+ content uniqueness using municipality data registries (local landmarks, housing stock data, city-specific stats, building codes, weather patterns)
- [ ] **LOC-04**: Each service-in-city page includes unique FAQ section tailored to that city's specific roofing concerns
- [ ] **LOC-05**: Each location page includes city-specific testimonials (tagged by municipality)

### Content & Authority (CONT)

- [ ] **CONT-01**: Blog system with article pages supporting silo-linking (articles link back into service silos)
- [ ] **CONT-02**: At least 5 initial silo-supporting blog articles (one per major service category)
- [ ] **CONT-03**: At least 3 standalone educational articles for topical authority
- [ ] **CONT-04**: Cost guide pages per service type ("How much does roof replacement cost in Jersey City?")
- [ ] **CONT-05**: Material deep-dive guides for major roofing materials (asphalt shingles, TPO, EPDM, slate, metal, modified bitumen)
- [ ] **CONT-06**: Problem-to-solution pages mapping common roofing problems (ice dams, ponding water, flashing failure, wind damage, missing shingles) to relevant services
- [ ] **CONT-07**: Process explainer content on each service page (step-by-step timelines, what to expect)
- [ ] **CONT-08**: All content written in humanized voice: first-person storytelling, conversational tone, real-world scenarios, expert technical authority
- [ ] **CONT-09**: Minimum 3000 words per service page, city hub page, and service-in-city page

### Conversion Optimization (CRO)

- [ ] **CRO-01**: Quote request form embedded on every service page, location page, and service-in-city page (5-6 fields max)
- [ ] **CRO-02**: Sticky header with click-to-call phone number visible at all scroll positions on all pages
- [ ] **CRO-03**: Floating quote request button (persistent CTA) on all pages
- [ ] **CRO-04**: Above-the-fold CTA on every page (visible without scrolling)
- [ ] **CRO-05**: Exit-intent popup with quote offer on service and location pages
- [ ] **CRO-06**: Customer testimonials with star ratings displayed on homepage, service pages, and location pages
- [ ] **CRO-07**: Certification and license badge strip on homepage and in footer across all pages
- [ ] **CRO-08**: Before/after project gallery with comparison sliders, filterable by service type and city
- [ ] **CRO-09**: Emergency/urgency banner for storm season and emergency service pages
- [ ] **CRO-10**: Form submission sends notification email via Resend and returns confirmation to user
- [ ] **CRO-11**: Cloudflare Turnstile invisible captcha on all forms for spam protection

### SEO Infrastructure (SEO)

- [ ] **SEO-01**: JSON-LD structured data on every page: RoofingContractor (LocalBusiness subtype), BreadcrumbList
- [ ] **SEO-02**: Service schema on all service pages with FAQ schema for rich snippets
- [ ] **SEO-03**: Review/AggregateRating schema on pages displaying testimonials
- [ ] **SEO-04**: Knowledge graph JSON-LD mapping entity relationships: Service -> Location -> Materials -> Problems -> Solutions
- [ ] **SEO-05**: Automated internal linking system: contextual links between related services, locations, and blog posts within and across silos
- [ ] **SEO-06**: Breadcrumb navigation on every page (auto-generated from route hierarchy) with BreadcrumbList schema
- [ ] **SEO-07**: XML sitemap auto-generated covering all service, location, service-in-city, blog, and content pages
- [ ] **SEO-08**: robots.txt properly configured
- [ ] **SEO-09**: Canonical URLs set via alternates.canonical in metadata on every page
- [ ] **SEO-10**: generateMetadata() on every page with title, description, openGraph, and alternates
- [ ] **SEO-11**: One H1 per page with strict heading hierarchy (H1 > H2 > H3, no skipping)
- [ ] **SEO-12**: All images use next/image with descriptive alt text (not filenames)
- [ ] **SEO-13**: Core Web Vitals optimized: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **SEO-14**: NAP (Name, Address, Phone) consistency across all pages, aligned with Google Business Profile
- [ ] **SEO-15**: Google Map embed on contact page and city hub pages
- [ ] **SEO-16**: Semantic SEO: entity mapping, NLP-optimized copy with co-occurring terms, comprehensive topic coverage per silo

### Design & UX (UX)

- [ ] **UX-01**: Cormorant Garamond (medium weight) for body text, Cormorant for headings, minimum 18px body
- [ ] **UX-02**: Dark/professional color theme appropriate for roofing industry (10 variations generated for approval before implementation)
- [ ] **UX-03**: Motion animations for scroll reveals, page transitions, and interactive elements (Motion library)
- [ ] **UX-04**: Semantic HTML throughout (main, nav, section, article, aside)
- [ ] **UX-05**: All interactive elements keyboard-accessible with focus-visible ring styles
- [ ] **UX-06**: WCAG AA color contrast compliance
- [ ] **UX-07**: Collapsible accordion UI for FAQ sections
- [ ] **UX-08**: Internal links use next/link, phone numbers use tel: links

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Advanced Conversion

- **CRO-V2-01**: Multi-step quote form (wizard-style) with conditional fields based on service type
- **CRO-V2-02**: A/B testing framework for CTA copy, form placement, and page layouts
- **CRO-V2-03**: Live chat widget with after-hours scheduling

### Enhanced Content

- **CONT-V2-01**: Video testimonials embedded on service and location pages
- **CONT-V2-02**: Interactive roofing material comparison tool
- **CONT-V2-03**: Seasonal content calendar with automatic promotion banners
- **CONT-V2-04**: Case study pages with full project narratives and photo documentation

### Advanced SEO

- **SEO-V2-01**: IndexNow / Google Indexing API integration for proactive page submission
- **SEO-V2-02**: Automated content freshness updates (last-updated dates, seasonal content swaps)
- **SEO-V2-03**: Hreflang tags for potential multi-language expansion

### Analytics & Tracking

- **ANLYT-V2-01**: Vercel Analytics and Speed Insights integration
- **ANLYT-V2-02**: Form submission conversion tracking with UTM parameter support
- **ANLYT-V2-03**: Phone call tracking integration
- **ANLYT-V2-04**: Heatmap integration for CRO analysis

## Out of Scope

| Feature | Reason |
|---------|--------|
| Customer portal / login area | Lead gen only — no user accounts needed |
| E-commerce / online payments | Service business, not product sales |
| Online cost calculator | Creates false expectations, captures leads for third-party platforms (anti-feature per research) |
| AI chatbot | Adds JS weight, destroys credibility when unable to answer roofing questions (anti-feature per research) |
| Auto-playing video backgrounds | Guarantees failed Core Web Vitals (anti-feature per research) |
| Multiple popups per session | Feels desperate, triggers Google interstitial penalties (anti-feature per research) |
| Multi-language support | English only for v1 |
| Mobile app | Web-first strategy |
| Paid advertising landing pages | Organic-first strategy |
| Google indexing budget management | Operational concern, not build scope |
| Real business content | Placeholder content structured for future swap |
| OAuth / social login | No user accounts |
| CMS integration | TypeScript data files are the right content layer at 150 pages |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FNDN-01 | Phase 1 | Pending |
| FNDN-02 | Phase 1 | Pending |
| FNDN-03 | Phase 1 | Pending |
| FNDN-04 | Phase 1 | Pending |
| FNDN-05 | Phase 2 | Pending |
| FNDN-06 | Phase 2 | Pending |
| FNDN-07 | Phase 2 | Pending |
| CORE-01 | Phase 4 | Pending |
| CORE-02 | Phase 4 | Pending |
| CORE-03 | Phase 4 | Pending |
| CORE-04 | Phase 4 | Pending |
| RESI-01 | Phase 5 | Pending |
| RESI-02 | Phase 5 | Pending |
| RESI-03 | Phase 5 | Pending |
| RESI-04 | Phase 5 | Pending |
| COMM-01 | Phase 6 | Pending |
| COMM-02 | Phase 6 | Pending |
| COMM-03 | Phase 6 | Pending |
| COMM-04 | Phase 6 | Pending |
| LOC-01 | Phase 7 | Pending |
| LOC-02 | Phase 8 | Pending |
| LOC-03 | Phase 8 | Pending |
| LOC-04 | Phase 8 | Pending |
| LOC-05 | Phase 7 | Pending |
| CONT-01 | Phase 9 | Pending |
| CONT-02 | Phase 9 | Pending |
| CONT-03 | Phase 9 | Pending |
| CONT-04 | Phase 9 | Pending |
| CONT-05 | Phase 9 | Pending |
| CONT-06 | Phase 9 | Pending |
| CONT-07 | Phase 5 | Pending |
| CONT-08 | Phase 5 | Pending |
| CONT-09 | Phase 5 | Pending |
| CRO-01 | Phase 3 | Pending |
| CRO-02 | Phase 2 | Pending |
| CRO-03 | Phase 10 | Pending |
| CRO-04 | Phase 2 | Pending |
| CRO-05 | Phase 10 | Pending |
| CRO-06 | Phase 4 | Pending |
| CRO-07 | Phase 4 | Pending |
| CRO-08 | Phase 10 | Pending |
| CRO-09 | Phase 10 | Pending |
| CRO-10 | Phase 3 | Pending |
| CRO-11 | Phase 3 | Pending |
| SEO-01 | Phase 7 | Pending |
| SEO-02 | Phase 5 | Pending |
| SEO-03 | Phase 4 | Pending |
| SEO-04 | Phase 7 | Pending |
| SEO-05 | Phase 9 | Pending |
| SEO-06 | Phase 2 | Pending |
| SEO-07 | Phase 1 | Pending |
| SEO-08 | Phase 1 | Pending |
| SEO-09 | Phase 1 | Pending |
| SEO-10 | Phase 1 | Pending |
| SEO-11 | Phase 1 | Pending |
| SEO-12 | Phase 10 | Pending |
| SEO-13 | Phase 10 | Pending |
| SEO-14 | Phase 4 | Pending |
| SEO-15 | Phase 4 | Pending |
| SEO-16 | Phase 8 | Pending |
| UX-01 | Phase 2 | Pending |
| UX-02 | Phase 2 | Pending |
| UX-03 | Phase 2 | Pending |
| UX-04 | Phase 2 | Pending |
| UX-05 | Phase 2 | Pending |
| UX-06 | Phase 2 | Pending |
| UX-07 | Phase 10 | Pending |
| UX-08 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 68 total
- Mapped to phases: 68
- Unmapped: 0

---
*Requirements defined: 2026-03-22*
*Last updated: 2026-03-22 after roadmap creation*
