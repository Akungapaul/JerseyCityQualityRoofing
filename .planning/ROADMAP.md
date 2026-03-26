# Roadmap: Jersey City Quality Roofing

## Overview

This roadmap delivers a topical-authority lead generation website for a local roofing company serving all 12 Hudson County municipalities. The build progresses from architectural foundation through design system, lead capture, core pages, service pages (residential then commercial), location pages, programmatic service-in-city pages, blog/content ecosystem, and finally conversion optimization. Each phase delivers a coherent, verifiable capability. The service-in-city pages (Phase 8) are built incrementally in validated batches to avoid Google doorway page classification -- the single biggest risk to this project.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Project Scaffold & Data Architecture** - Next.js project, URL routing, data registries, SEO infrastructure stubs
- [x] **Phase 2: Design System & Layout Shell** - Typography, color theme, components, layout shell with header/footer/nav/breadcrumbs (completed 2026-03-24)
- [ ] **Phase 3: Lead Capture System** - Quote forms, Resend email delivery, Cloudflare Turnstile spam protection
- [ ] **Phase 4: Core Marketing Pages** - Homepage, About, Contact, Service Areas hub with trust signals and schema
- [ ] **Phase 5: Residential Service Pages** - Four 3000+ word residential service pillar pages with process explainers and FAQs
- [ ] **Phase 6: Commercial Service Pages** - Four 3000+ word commercial service pillar pages
- [ ] **Phase 7: Location Hub Pages** - Twelve city hub pages with unique local content and full schema markup
- [ ] **Phase 8: Service-in-City Pages** - 96 programmatic pages launched in validated batches with content uniqueness enforcement
- [ ] **Phase 9: Blog & Supporting Content** - Blog system, silo articles, cost guides, material guides, problem-solution pages
- [ ] **Phase 10: Conversion & Performance Polish** - Gallery, exit-intent, floating CTAs, emergency banners, Core Web Vitals

## Phase Details

### Phase 1: Project Scaffold & Data Architecture
**Goal**: Developers can build pages on a properly scaffolded Next.js project with siloed URL routing, type-safe data registries, and SEO metadata infrastructure
**Depends on**: Nothing (first phase)
**Requirements**: FNDN-01, FNDN-02, FNDN-03, FNDN-04, SEO-07, SEO-08, SEO-09, SEO-10, SEO-11
**Success Criteria** (what must be TRUE):
  1. Running `pnpm dev` starts a working Next.js 16 dev server with TypeScript strict mode and Tailwind CSS 4
  2. URL structure `/services/residential/[service]/[city]/` and `/services/commercial/[service]/[city]/` resolves correctly with dynamic segments
  3. Municipality data registry returns structured data (landmarks, housing stock, building codes, weather) for all 12 Hudson County cities
  4. Service data registry returns structured data (metadata, materials, FAQs) for all 8 services (4 residential, 4 commercial)
  5. Every route generates metadata with title, description, openGraph, and canonical URL via shared helpers
**Plans**: 4 plans

Plans:
- [x] 01-01-PLAN.md -- Scaffold Next.js 16 project with types, utilities, fonts, and foundation files
- [x] 01-02-PLAN.md -- Create all App Router stub pages with complete URL routing skeleton
- [x] 01-03-PLAN.md -- Data registries for 12 municipalities, 8 services, testimonials, and service-city-content resolver
- [x] 01-04-PLAN.md -- SEO infrastructure: metadata generators, JSON-LD, sitemap, robots, data-driven routes, vitest setup, and validation

### Phase 2: Design System & Layout Shell
**Goal**: Every page on the site shares a consistent visual identity and layout with persistent conversion elements visible at all scroll positions
**Depends on**: Phase 1
**Requirements**: FNDN-05, FNDN-06, FNDN-07, UX-01, UX-02, UX-03, UX-04, UX-05, UX-06, UX-08, SEO-06, CRO-02, CRO-04
**Success Criteria** (what must be TRUE):
  1. All text renders in Cormorant Garamond (medium weight body, Cormorant headings) at minimum 18px body size across all viewports
  2. Sticky header displays click-to-call phone number that remains visible at all scroll positions on mobile and desktop
  3. Navigation mega-menu reflects the silo structure (Residential Services, Commercial Services, Locations) with proper links
  4. Breadcrumb navigation auto-generates from route hierarchy and renders BreadcrumbList JSON-LD schema
  5. All interactive elements are keyboard-accessible with visible focus rings, and color contrast meets WCAG AA
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md -- Install dependencies, generate 10 color palette variations for approval, apply approved palette + design tokens, build Button and Badge primitives
- [x] 02-02-PLAN.md -- Build layout components: sticky Header with shrink-on-scroll, MegaMenu, MobileNav overlay, Footer with CTA banner, Breadcrumbs with JSON-LD
- [x] 02-03-PLAN.md -- Build section utilities (SectionWrapper, CTABanner, ScrollReveal), wire marketing layout, visual verification

### Phase 3: Lead Capture System
**Goal**: Visitors can submit quote requests from any page and the business receives email notification with all lead details
**Depends on**: Phase 2
**Requirements**: CRO-01, CRO-10, CRO-11
**Success Criteria** (what must be TRUE):
  1. Quote request form (name, phone, email, service type, address, message) validates input and submits successfully via Server Action
  2. Form submission triggers email notification to business via Resend with all submitted fields
  3. Cloudflare Turnstile invisible captcha blocks automated bot submissions while remaining invisible to real users
  4. User receives on-page confirmation after successful form submission
**Plans**: 2 plans
**UI hint**: yes

Plans:
- [x] 03-01-PLAN.md -- Install dependencies, create Zod validation schemas, form types, Turnstile server verification, Resend email sender, React Email notification template
- [ ] 03-02-PLAN.md -- Build form input primitives, CompactQuoteForm, QuoteForm, TurnstileWidget, Server Action, wire header CTA scroll-to-form

### Phase 4: Core Marketing Pages
**Goal**: Visitors landing on the site can understand what the business offers, see proof of credibility, contact the company, and browse all service areas
**Depends on**: Phase 3
**Requirements**: CORE-01, CORE-02, CORE-03, CORE-04, CRO-06, CRO-07, SEO-03, SEO-14, SEO-15
**Success Criteria** (what must be TRUE):
  1. Homepage displays hero with dual CTA (phone + form), certification badge strip, services grid, testimonials with star ratings, service areas overview, and FAQ section
  2. About page presents company story, team section, certifications, insurance info, and license numbers
  3. Contact page has working multi-field quote form, embedded Google Map, and consistent NAP data matching all other pages
  4. Service area hub page lists all 12 Hudson County municipalities with links to individual city hub pages
  5. NAP (Name, Address, Phone) data is identical across header, footer, contact page, and schema markup on every page
**Plans**: 3 plans
**UI hint**: yes

Plans:
- [x] 04-01-PLAN.md -- JSON-LD schema builders (AggregateRating, FAQPage, RoofingContractor), content data files (homepage FAQ, about content), Wave 0 test scaffolds (NAP consistency, testimonial completeness)
- [x] 04-02-PLAN.md -- Build all 16 section components: HeroSection, BadgeStrip, ServicesGrid, WhyChooseUs, TestimonialCarousel, StarRating, FaqAccordion, GoogleMapEmbed, CityCard, CityCardGrid, ContactInfoColumn, BusinessHoursTable, About sections
- [ ] 04-03-PLAN.md -- Assemble 4 complete pages: Homepage (10 sections + 2 JSON-LD schemas), About, Contact (two-column + map + schema), Service Areas hub (map + tiered grid)

### Phase 5: Residential Service Pages
**Goal**: Homeowners searching for residential roofing services find comprehensive, authoritative pages that answer all their questions and convert them into leads
**Depends on**: Phase 4
**Requirements**: RESI-01, RESI-02, RESI-03, RESI-04, CONT-07, CONT-08, CONT-09, SEO-02
**Success Criteria** (what must be TRUE):
  1. Each of the 4 residential service pages (Repair, Replacement, Inspection, Emergency) contains 3000+ words of unique, humanized content
  2. Every service page includes a step-by-step process explainer, materials section, cost factors, FAQ with 5+ questions, testimonials, and embedded quote form
  3. Emergency Roofing page prominently features 24/7 availability with phone CTA as the hero element (crisis mode template)
  4. Service schema and FAQ schema JSON-LD renders correctly on each service page for rich snippet eligibility
  5. Content reads as conversational and expert -- first-person storytelling, real-world scenarios, no generic filler
**Plans**: 5 plans
**UI hint**: yes

Plans:
- [x] 05-01-PLAN.md -- Content types, Wave 0 test scaffold, and 4 residential service content data files (2200+ words each)
- [x] 05-02-PLAN.md -- Standard template section components: ServiceHero, ProcessTimeline, MaterialCards, CostFactorsSection, WarningSignsSection, ServiceContentSection
- [x] 05-03-PLAN.md -- Emergency + shared components: EmergencyHero, WhatToDoSection, InsuranceClaimsSection, StormDamageTypes, MidPageCTA, RelatedServicesRow
- [x] 05-04-PLAN.md -- JSON-LD Service schema builder, dynamic OG image route, emergency accent CSS variable
- [ ] 05-05-PLAN.md -- Page assembly: wire standard and emergency templates into [service]/page.tsx with full build verification

### Phase 6: Commercial Service Pages
**Goal**: Property managers and commercial building owners searching for commercial roofing services find comprehensive pages that establish expertise in commercial systems
**Depends on**: Phase 5
**Requirements**: COMM-01, COMM-02, COMM-03, COMM-04
**Success Criteria** (what must be TRUE):
  1. Each of the 4 commercial service pages (Flat Roof Systems, Maintenance Programs, Commercial Repair, Commercial Replacement) contains 3000+ words of unique content
  2. Flat Roof Systems page covers TPO, EPDM, and modified bitumen with material-specific content differentiating it from residential pages
  3. Each commercial page includes process explainer, FAQ, testimonials, cost factors, and embedded quote form following the same standards established in Phase 5
  4. Commercial pages are reachable via the silo navigation at `/services/commercial/[service]` with correct breadcrumbs and schema
**Plans**: 3 plans
**UI hint**: yes

Plans:
- [x] 06-01-PLAN.md -- Commercial content data files (4 services, 2200+ words each) with test suite extension for commercial voice validation
- [x] 06-02-PLAN.md -- CommercialRelatedServicesRow component with commercial icon map and /services/commercial/ link prefix
- [x] 06-03-PLAN.md -- Page assembly: wire content data, components, and SEO into commercial [service]/page.tsx with full build verification

### Phase 7: Location Hub Pages
**Goal**: Visitors searching for roofing in any Hudson County municipality find a dedicated, locally-relevant page that establishes the company as a local expert in their specific city
**Depends on**: Phase 6
**Requirements**: LOC-01, LOC-05, SEO-01, SEO-04
**Success Criteria** (what must be TRUE):
  1. All 12 city hub pages render at their correct URLs with 3000+ words of content unique to each municipality
  2. Each city page includes local landmarks, housing stock data, building code references, weather pattern insights, and neighborhood-specific roofing concerns
  3. City-specific testimonials display on each location page (tagged by municipality)
  4. RoofingContractor (LocalBusiness) and BreadcrumbList JSON-LD schema renders correctly on every location page with proper entity relationships
  5. Each city page links to all 8 service-in-city child pages (forward links ready for Phase 8)
**Plans**: 5 plans
**UI hint**: yes

Plans:
- [x] 07-01-PLAN.md -- CityHubContent interface, JSON-LD builder with @id entities, Wave 0 test scaffolds, Tier 1 city content (Jersey City, Hoboken, Bayonne, North Bergen)
- [x] 07-02-PLAN.md -- 7 new city hub section components (CityHubHero, HousingStockSection, WeatherClimateSection, NeighborhoodBreakdown, ServicesInCityGrid, CityLandmarksSection, LocalExpertiseSection)
- [x] 07-03-PLAN.md -- Tier 2 city content data files (Union City, West New York, Secaucus, Kearny)
- [x] 07-04-PLAN.md -- Tier 3 city content data files (Harrison, East Newark, Guttenberg, Weehawken)
- [x] 07-05-PLAN.md -- Page assembly: wire content, components, JSON-LD into [city]/page.tsx with full build verification

### Phase 8: Service-in-City Pages
**Goal**: Every "[service] in [city]" search query across all 8 services and 12 municipalities has a dedicated, genuinely unique page that ranks without triggering doorway page classification
**Depends on**: Phase 7
**Requirements**: LOC-02, LOC-03, LOC-04, SEO-16
**Success Criteria** (what must be TRUE):
  1. All 96 service-in-city pages generate via generateStaticParams and render at `/services/[category]/[service]/[city]/`
  2. Each page passes the "city name removal test" -- content remains identifiably about a specific city even with the city name removed
  3. Each page achieves 70%+ content uniqueness vs. the same service in other cities (verified by content resolver enforcement)
  4. Each service-in-city page includes unique FAQ section with 5+ questions tailored to that city's specific roofing concerns
  5. Pages are launched in batches (Tier 1: Jersey City, Hoboken, Bayonne, North Bergen first) with Search Console indexing validation before expanding
**Plans**: 15 plans
**UI hint**: yes

Plans:
- [ ] 08-01-PLAN.md -- Foundation: ServiceInCityContent interface, buildServiceInCityJsonLd builder, Wave 0 test scaffolds (uniqueness, structure, SEO, cumulative word count)
- [x] 08-02-PLAN.md -- 5 new section components + unit tests: CityServiceHero, LocalServiceContext, NeighborhoodServiceInsights, CitySpecificConcerns, SiblingCitiesNav
- [ ] 08-03-PLAN.md -- Tier 1 content: Jersey City (8 services) = 8 content data files
- [ ] 08-04-PLAN.md -- Tier 1 content: Hoboken (8 services) = 8 content data files
- [ ] 08-05-PLAN.md -- Tier 1 content: Bayonne (8 services) = 8 content data files
- [ ] 08-06-PLAN.md -- Tier 1 content: North Bergen (8 services) = 8 content data files
- [ ] 08-07-PLAN.md -- Tier 2 content: Union City (8 services) = 8 content data files
- [ ] 08-08-PLAN.md -- Tier 2 content: West New York (8 services) = 8 content data files
- [ ] 08-09-PLAN.md -- Tier 2 content: Secaucus (8 services) = 8 content data files
- [ ] 08-10-PLAN.md -- Tier 2 content: Kearny (8 services) = 8 content data files
- [ ] 08-11-PLAN.md -- Tier 3 content: Harrison (8 services) = 8 content data files
- [ ] 08-12-PLAN.md -- Tier 3 content: East Newark (8 services) = 8 content data files
- [ ] 08-13-PLAN.md -- Tier 3 content: Guttenberg (8 services) = 8 content data files
- [ ] 08-14-PLAN.md -- Tier 3 content: Weehawken (8 services) = 8 content data files
- [ ] 08-15-PLAN.md -- Page assembly: wire templates, add parent service page city downlinks, activate tests, full build verification

### Phase 9: Blog & Supporting Content
**Goal**: The site covers the full informational search landscape for roofing topics, with every blog post and content page strengthening the authority of its parent silo
**Depends on**: Phase 8
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, SEO-05
**Success Criteria** (what must be TRUE):
  1. Blog system at `/blog/` supports article pages with silo assignment, and each article links back to its service silo pillar page
  2. At least 5 silo-supporting articles and 3 standalone educational articles are published
  3. Cost guide pages exist for each service type with location-specific pricing data (e.g., "How much does roof replacement cost in Jersey City?")
  4. Material deep-dive guides exist for at least 6 roofing materials (asphalt, TPO, EPDM, slate, metal, modified bitumen)
  5. Automated internal linking connects related services, locations, and blog posts within and across silos following silo boundary rules
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 09-01: TBD
- [ ] 09-02: TBD
- [ ] 09-03: TBD

### Phase 10: Conversion & Performance Polish
**Goal**: The site maximizes lead conversion through persistent CTAs, social proof gallery, urgency elements, and meets Core Web Vitals targets for ranking advantage
**Depends on**: Phase 9
**Requirements**: CRO-03, CRO-05, CRO-08, CRO-09, UX-07, SEO-12, SEO-13
**Success Criteria** (what must be TRUE):
  1. Floating quote request button appears on all pages after scrolling past the first viewport, and dismisses cleanly
  2. Exit-intent popup triggers on service and location pages when cursor moves toward browser chrome (desktop) or after back-button intent (mobile)
  3. Before/after project gallery displays with comparison sliders, filterable by service type and city, using lazy-loaded optimized images
  4. Emergency/urgency banner renders conditionally on emergency service pages and during storm season
  5. All pages score LCP < 2.5s, FID < 100ms, CLS < 0.1 on mobile (Lighthouse CI on heaviest page, not just homepage)
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 10-01: TBD
- [ ] 10-02: TBD
- [ ] 10-03: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Scaffold & Data Architecture | 4/4 | Complete | - |
| 2. Design System & Layout Shell | 3/3 | Complete   | 2026-03-24 |
| 3. Lead Capture System | 0/2 | Not started | - |
| 4. Core Marketing Pages | 0/3 | Planned    |  |
| 5. Residential Service Pages | 0/5 | Planned | - |
| 6. Commercial Service Pages | 0/3 | Planned | - |
| 7. Location Hub Pages | 0/5 | Planned | - |
| 8. Service-in-City Pages | 1/15 | In Progress|  |
| 9. Blog & Supporting Content | 0/3 | Not started | - |
| 10. Conversion & Performance Polish | 0/3 | Not started | - |
