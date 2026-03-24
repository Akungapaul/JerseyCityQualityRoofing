---
phase: 03-lead-capture-system
plan: 02
subsystem: forms
tags: [react-hook-form, zod, server-actions, turnstile, cva, motion, lead-capture, accessibility]

# Dependency graph
requires:
  - phase: 03-lead-capture-system
    plan: 01
    provides: Zod schemas (compactQuoteSchema, fullQuoteSchema), form types (ActionResult, LeadNotificationPayload), Turnstile verifier, Resend email sender, React Email template
  - phase: 02-design-system-layout-shell
    provides: cva+cn() pattern, buttonVariants, SectionWrapper, Header component, color palette, font system
  - phase: 01-project-scaffold-data-architecture
    provides: SERVICES data registry, constants (PHONE_NUMBER, PHONE_HREF), TypeScript types
provides:
  - Reusable form primitives (FormInput, FormSelect, FormTextarea, SubmitButton) with cva variants and full accessibility
  - TurnstileWidget with invisible captcha, explicit rendering, and imperative reset
  - CompactQuoteForm (3-field inline form with id="quote-form" scroll target)
  - QuoteForm (6-field stacked form with id="full-quote-form" scroll target)
  - submitQuote Server Action (Zod validation, honeypot check, Turnstile verification, Resend email)
  - Header CTA scroll-to-form behavior with /contact fallback
affects: [contact-page, service-pages, location-pages, homepage, service-in-city-pages]

# Tech tracking
tech-stack:
  added: []
  patterns: [rhf-zod-no-generic, server-action-form-pipeline, turnstile-imperative-reset, cva-input-variants, honeypot-invisible-field, scroll-to-form-cta]

key-files:
  created:
    - src/components/forms/form-input.tsx
    - src/components/forms/form-select.tsx
    - src/components/forms/form-textarea.tsx
    - src/components/forms/submit-button.tsx
    - src/components/forms/turnstile-widget.tsx
    - src/components/forms/compact-quote-form.tsx
    - src/components/forms/quote-form.tsx
    - src/app/actions/submit-quote.ts
  modified:
    - src/components/layout/header.tsx

key-decisions:
  - "React Hook Form useForm() called without generic parameter to avoid Zod v4 type incompatibility -- types inferred from zodResolver"
  - "Form primitives use cva variants with state (default/error) and inputSize (default/compact) matching Phase 2 button-variants pattern"
  - "TurnstileWidget uses useImperativeHandle for parent-controlled reset after each submission (tokens are single-use)"
  - "Header CTA changed from Link to button with handleQuoteCTA that scrolls to #quote-form or router.push(/contact)"
  - "Honeypot input uses name='website' with absolute off-screen positioning and aria-hidden for bot-only visibility"
  - "Success state replaces form via AnimatePresence mode='wait' with focus management (tabIndex=-1, auto-focus on mount)"

patterns-established:
  - "RHF+Zod v4 pattern: no generic on useForm, mode onBlur, zodResolver(schema), setValue for Turnstile token"
  - "Form primitive pattern: forwardRef + cva variants + useId for a11y + AnimatePresence error animation"
  - "Server Action pipeline: honeypot check -> Zod safeParse -> Turnstile verify -> email send -> ActionResult return"
  - "Scroll-to-form CTA: getElementById -> getBoundingClientRect + scrollY - headerHeight -> scrollTo smooth"

requirements-completed: [CRO-01, CRO-10, CRO-11]

# Metrics
duration: 4min
completed: 2026-03-24
---

# Phase 3 Plan 02: Lead Capture UI Components Summary

**React Hook Form + Zod v4 form components with Server Action pipeline, Turnstile captcha, honeypot spam filter, and header CTA scroll-to-form behavior for complete lead capture system**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-24T02:13:40Z
- **Completed:** 2026-03-24T02:17:52Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Built 5 reusable form primitives (FormInput, FormSelect, FormTextarea, SubmitButton, TurnstileWidget) with cva variants, forwardRef, full ARIA accessibility, and AnimatePresence error animations
- Created CompactQuoteForm (3-field horizontal) and QuoteForm (6-field 2-column) with React Hook Form onBlur validation, inline success/error states, honeypot field, and Turnstile integration
- Implemented submitQuote Server Action that validates with Zod, checks honeypot silently, verifies Turnstile token server-side, and sends styled HTML email via Resend
- Modified Header CTA from Link to button with smooth scroll to #quote-form or /contact navigation fallback

## Task Commits

Each task was committed atomically:

1. **Task 1: Build form primitives and TurnstileWidget** - `7211e2b` (feat)
2. **Task 2: Build CompactQuoteForm, QuoteForm, Server Action, and header CTA scroll** - `3fd24f4` (feat)

## Files Created/Modified
- `src/components/forms/form-input.tsx` - Reusable text input with cva state/size variants, forwardRef, label, error animation, aria attributes
- `src/components/forms/form-select.tsx` - Select dropdown with custom ChevronDown arrow, placeholder option, appearance-none, forwardRef
- `src/components/forms/form-textarea.tsx` - Textarea with 120px min height, vertical resize, cva error state, forwardRef
- `src/components/forms/submit-button.tsx` - Submit button wrapping buttonVariants with Loader2 spinner and disabled state
- `src/components/forms/turnstile-widget.tsx` - Cloudflare Turnstile invisible widget with explicit rendering, polling for script load, useImperativeHandle reset
- `src/components/forms/compact-quote-form.tsx` - 3-field compact form (name, phone, service type) with horizontal desktop layout, id="quote-form"
- `src/components/forms/quote-form.tsx` - 6-field full form with 2-column desktop layout, id="full-quote-form", address and message fields
- `src/app/actions/submit-quote.ts` - Server Action: honeypot -> Zod validate -> Turnstile verify -> Resend email -> ActionResult
- `src/components/layout/header.tsx` - Modified: CTA changed from Link to button with scroll-to-form and useRouter fallback

## Decisions Made
- React Hook Form useForm() called without generic to avoid Zod v4 type errors (types inferred from resolver per Zod maintainer guidance)
- Form primitives follow Phase 2 cva+cn() pattern with state variant (default/error) and inputSize variant (default/compact)
- TurnstileWidget uses callback ref pattern (callbacksRef) to keep callbacks fresh without re-running the render effect
- Header CTA uses useCallback with isScrolled and router dependencies for stable handler reference
- Honeypot field named "website" to attract bots filling URL fields, positioned off-screen with aria-hidden="true"
- Success state uses focus management: container with tabIndex={-1} auto-focused on mount for screen reader announcement

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - all files contain complete implementations. No placeholder data, no TODO markers, no unfinished wiring. Both forms are fully functional end-to-end.

## Issues Encountered
None

## User Setup Required

External services configured in Plan 01 (.env.example). No additional setup required for Plan 02.

## Next Phase Readiness
- CompactQuoteForm ready for embedding on homepage hero section and service pages via `<CompactQuoteForm defaultServiceType="Roof Repair" />`
- QuoteForm ready for contact page and bottom-of-page placement via `<QuoteForm defaultServiceType="Roof Repair" />`
- Both forms accept defaultServiceType prop for page-context auto-selection of service dropdown
- Header CTA automatically scrolls to compact form on pages with id="quote-form" section
- All components are client components that import correctly within Next.js App Router server/client boundary
- TypeScript compiles cleanly and production build succeeds

## Self-Check: PASSED

All 9 files verified on disk. Both task commits (7211e2b, 3fd24f4) verified in git log.

---
*Phase: 03-lead-capture-system*
*Completed: 2026-03-24*
