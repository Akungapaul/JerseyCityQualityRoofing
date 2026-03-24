---
phase: 03-lead-capture-system
plan: 01
subsystem: forms
tags: [zod, react-hook-form, resend, react-email, cloudflare-turnstile, validation, email]

# Dependency graph
requires:
  - phase: 01-project-scaffold-data-architecture
    provides: data registries (services.ts, business-info.ts), TypeScript types, project structure
  - phase: 02-design-system-layout-shell
    provides: cva+cn() component pattern, color palette, button variants
provides:
  - Zod v4 validation schemas for compact (3-field) and full (6-field) quote forms
  - TypeScript types for form action results and email payloads
  - Server-side Cloudflare Turnstile token verification function
  - Resend email sender wrapper with LeadNotification React Email template
  - Environment variable template with Turnstile test keys for development
affects: [03-02-PLAN, lead-capture-forms, server-actions, contact-page]

# Tech tracking
tech-stack:
  added: [react-hook-form@7.72.0, "@hookform/resolvers@5.2.2", zod@4.3.6, resend@6.9.4, "@react-email/components@1.0.10"]
  patterns: [two-tier-form-schema, phone-normalization, honeypot-spam-filter, server-side-turnstile-verification]

key-files:
  created:
    - src/lib/schemas/quote-form.ts
    - src/types/form.ts
    - src/lib/turnstile.ts
    - src/lib/email.ts
    - src/components/emails/lead-notification.tsx
    - .env.example
  modified:
    - package.json
    - pnpm-lock.yaml

key-decisions:
  - "Zod schemas share field definitions (nameField, phoneField, etc.) between compact and full forms for consistency"
  - "Phone validation normalizes to 10 digits after stripping formatting, rejects all-same-digit patterns"
  - "Honeypot field named 'honeypot' with z.string().max(0).optional() -- any content means bot"
  - "Email template uses inline styles with pixel values (not Tailwind rem) for Outlook compatibility"
  - "Resend sender uses onboarding@resend.dev as from address until domain verification"

patterns-established:
  - "Two-tier schema pattern: compactQuoteSchema and fullQuoteSchema share field validators via const variables"
  - "Phone normalization: regex accepts flexible US formats, transform strips to 10 digits"
  - "Server-only secrets: TURNSTILE_SECRET_KEY and RESEND_API_KEY never exposed to client (no NEXT_PUBLIC_ prefix)"
  - "React Email template pattern: inline styles, email-safe fonts, pixel-based sizing, conditional field rendering"

requirements-completed: [CRO-10, CRO-11]

# Metrics
duration: 3min
completed: 2026-03-24
---

# Phase 3 Plan 01: Lead Capture Infrastructure Summary

**Zod v4 form validation schemas, Cloudflare Turnstile server verification, and Resend email notification with React Email template for two-tier lead capture system**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-24T02:06:18Z
- **Completed:** 2026-03-24T02:09:43Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Installed 5 Phase 3 dependencies (react-hook-form, @hookform/resolvers, zod, resend, @react-email/components)
- Built Zod v4 schemas for compact (3-field) and full (6-field) quote forms with shared validators, flexible US phone normalization, honeypot field, and Turnstile token
- Created Turnstile server-side verification function that POSTs to Cloudflare siteverify endpoint
- Built Resend email sender that wraps LeadNotification React Email template with error handling
- Created React Email notification template rendering all lead fields plus source metadata (URL, page title, timestamp)
- Created environment variable template with documented Turnstile test keys for development

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies, create env template, and build Zod schemas + form types** - `854490a` (feat)
2. **Task 2: Build Turnstile server verification, Resend email sender, and React Email notification template** - `f542510` (feat)

## Files Created/Modified
- `package.json` - Added 5 Phase 3 dependencies
- `pnpm-lock.yaml` - Lockfile with 444 new packages
- `.env.example` - Environment variable documentation with Turnstile test keys and Resend placeholder
- `src/types/form.ts` - ActionResult and LeadNotificationPayload interfaces
- `src/lib/schemas/quote-form.ts` - compactQuoteSchema, fullQuoteSchema, CompactQuoteFormData, FullQuoteFormData with shared validators
- `src/lib/turnstile.ts` - verifyTurnstileToken server-side function
- `src/lib/email.ts` - sendLeadNotification Resend wrapper
- `src/components/emails/lead-notification.tsx` - LeadNotification React Email template

## Decisions Made
- Shared field validators (nameField, phoneField, serviceTypeField) as const variables between compact and full schemas for consistency and DRY
- Phone normalization strips all non-digit chars, removes leading US country code (1) if 11 digits, validates to exactly 10 digits
- Honeypot field uses z.string().max(0).optional() -- any content triggers bot detection
- Email template uses inline styles with pixel-based values and Arial/Helvetica for maximum email client compatibility (especially Outlook Word rendering engine)
- Resend from address uses onboarding@resend.dev (Resend default for unverified domains) with recipient from NOTIFICATION_EMAIL env var

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - all files contain complete implementations as specified. No placeholder data, no TODO markers, no unfinished wiring.

## User Setup Required

External services require manual configuration before production use:

**Cloudflare Turnstile:**
- Create a Turnstile widget at Cloudflare Dashboard -> Turnstile -> Add Widget
- Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in environment
- Development uses test keys that always pass (already in .env.local)

**Resend:**
- Create API key at Resend Dashboard -> API Keys -> Create API Key
- Set `RESEND_API_KEY` in environment
- Verify sending domain at Resend Dashboard -> Domains -> Add Domain (or use onboarding@resend.dev for testing)
- Set `NOTIFICATION_EMAIL` to desired recipient

## Issues Encountered
None

## Next Phase Readiness
- Zod schemas ready for import by form components and Server Action (Plan 02)
- Turnstile verifier ready for Server Action integration
- Email sender + template ready for Server Action to call after form validation
- Form types (ActionResult, LeadNotificationPayload) ready for component props and action returns
- All TypeScript compiles cleanly -- zero type errors

## Self-Check: PASSED

All 7 created files verified on disk. Both task commits (854490a, f542510) verified in git log.

---
*Phase: 03-lead-capture-system*
*Completed: 2026-03-24*
