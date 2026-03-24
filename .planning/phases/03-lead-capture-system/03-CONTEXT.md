# Phase 3: Lead Capture System - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Visitors can submit quote requests from any page on the site, and the business receives an email notification with all lead details. Quote forms are embedded inline on pages, spam is blocked via Cloudflare Turnstile invisible captcha, and form validation provides real-time feedback. This phase delivers the lead capture infrastructure — individual page content and layouts are built in subsequent phases.

</domain>

<decisions>
## Implementation Decisions

### Form placement & trigger
- **D-01:** Two-tier form system: compact 3-field form near hero section + full 6-field form near bottom of page, before footer
- **D-02:** Compact form fields: name, phone, service type (3 fields only). Quick-capture for high-intent visitors.
- **D-03:** Full form fields: name, phone, email, service type, address, message (6 fields)
- **D-04:** Both forms submit independently — compact form is a valid standalone lead submission, not a precursor to the full form
- **D-05:** Header "Get Free Quote" CTA button smooth-scrolls to the compact top form section
- **D-06:** Contact page uses the same full 6-field QuoteForm component (consistent experience, one component)
- **D-07:** CTA buttons throughout page content anchor-link to the appropriate form section

### Post-submission experience
- **D-08:** Inline success message replaces the form in-place after submission: "Thank you! We'll contact you within 24 hours." No redirect, no page navigation.
- **D-09:** Same inline success message for both compact and full form
- **D-10:** On error: inline error message above the form with retry prompt and phone fallback: "Something went wrong. Please try again or call us at (201) 555-0123." Form data preserved.

### Email notification format
- **D-11:** Styled HTML email via React Email (@react-email/components) sent to business via Resend
- **D-12:** Email includes: all submitted form fields + page context (source URL, page title, timestamp, IP-based approximate location)
- **D-13:** Business-only notification — no confirmation email sent to the visitor
- **D-14:** Notification recipient: info@jerseycityqualityroofing.com (from business-info.ts registry)

### Form field behavior
- **D-15:** Service type dropdown auto-selects based on current page context (e.g., on /services/residential/roof-repair/ pre-selects "Roof Repair"). Editable — user can change selection. Defaults to placeholder on non-service pages.
- **D-16:** Required fields: name, phone number, service type. Optional fields: email, address, message.
- **D-17:** Flexible US phone validation — accepts (201) 555-0123, 201-555-0123, 2015550123, +1 201 555 0123. Strips formatting on submit, stores as digits. Rejects obviously invalid (too short, too long, all same digit).
- **D-18:** Validation timing: on blur (per-field as user leaves) + on submit (all fields). React Hook Form with "onBlur" mode. Inline error messages below each field.
- **D-19:** Zod schema for both compact and full form validation (shared base schema extended)

### Spam protection
- **D-20:** Cloudflare Turnstile invisible captcha on both form variants — completely invisible to real users
- **D-21:** Honeypot hidden field as secondary spam filter (zero-dependency technique, defense in depth)
- **D-22:** Turnstile verification happens server-side in the Server Action before processing the form

### Claude's Discretion
- Exact success/error message copy and styling
- React Email template design (layout, colors, spacing)
- Server Action implementation details (error handling, retry logic)
- Turnstile widget placement and configuration
- Honeypot field naming and implementation
- Form component internal architecture (shared base vs. two separate components)
- Loading/submitting state UI (spinner, disabled button, etc.)
- Zod schema internal structure and error messages

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project requirements
- `.planning/REQUIREMENTS.md` — Full v1 requirements. Phase 3 covers: CRO-01, CRO-10, CRO-11
- `.planning/PROJECT.md` — Project vision, constraints, key decisions
- `.planning/ROADMAP.md` §Phase 3 — Success criteria and dependencies

### Prior phase context
- `.planning/phases/01-project-scaffold-data-architecture/01-CONTEXT.md` — URL hierarchy (D-08), data registries (D-09-D-17), app directory structure (D-21-D-23), SEO helpers (D-23)
- `.planning/phases/02-design-system-layout-shell/02-CONTEXT.md` — Color palette (D-01-D-07), header/CTA design (D-08-D-11), dark site styling, animation approach (D-16-D-18)

### Technology stack
- `CLAUDE.md` §Technology Stack — Dependency list with pinned versions. Key for Phase 3: React Hook Form (7.72.x), @hookform/resolvers (5.2.x), Zod (4.3.x), Resend (6.9.x), @react-email/components (0.0.x), Cloudflare Turnstile (client script). Also: cn() utility, component organization conventions.

### Existing code
- `src/data/business-info.ts` — Email address, phone number, NAP data for email notifications and form fallback messaging
- `src/data/services.ts` — Service names and slugs for populating service type dropdown
- `src/components/ui/button.tsx` — Button component with cva variants for form submit buttons
- `src/components/ui/button-variants.ts` — Shared button variants for server component compatibility
- `src/components/sections/cta-banner.tsx` — Existing CTA banner component (integration point for form anchoring)
- `src/components/layout/header.tsx` — Sticky header with "Get Free Quote" CTA (needs scroll-to-form behavior)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/button.tsx` — Button with cva variants (primary, secondary, etc.) for submit buttons
- `src/components/ui/button-variants.ts` — Server-safe button variant exports
- `src/components/sections/cta-banner.tsx` — CTA banner section (can anchor-link to form)
- `src/components/sections/section-wrapper.tsx` — Section wrapper for consistent spacing/styling
- `src/data/services.ts` — Service data registry with names/slugs for dropdown population
- `src/data/business-info.ts` — Phone number and email for error fallback messaging and email recipient
- `src/lib/utils.ts` — cn() utility for conditional class composition

### Established Patterns
- cva+cn() for component variants (Button, Badge) — form inputs should follow same pattern
- Server Components by default, `"use client"` only when needed — forms require client components for interactivity
- `(marketing)` route group with shared layout — forms embed within this layout
- kebab-case files, PascalCase components, camelCase hooks
- TypeScript strict mode with Zod for runtime validation

### Integration Points
- `src/components/forms/` — Empty directory, ready for QuoteForm, CompactQuoteForm components
- `src/app/api/` — Empty, available for API routes if needed (though Server Actions preferred)
- `src/app/(marketing)/contact/page.tsx` — Stub page, will embed the full QuoteForm
- `src/components/layout/header.tsx` — Header CTA button needs scroll-to-form behavior wired up
- `src/app/(marketing)/layout.tsx` — Marketing layout where form section components will be available

</code_context>

<specifics>
## Specific Ideas

- Two-tier form strategy mirrors the dual CTA philosophy from Phase 2 — give high-intent visitors a fast path (compact form) and thorough visitors a complete path (full form)
- Phone fallback in error messages ensures no lead is lost even if the form system fails
- Business notification email should include page source URL so the salesperson knows what service the visitor was researching when they submitted
- Service type auto-selection from page context reduces friction and provides better lead qualification data

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-lead-capture-system*
*Context gathered: 2026-03-23*
