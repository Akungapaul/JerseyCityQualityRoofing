# Phase 3: Lead Capture System - Research

**Researched:** 2026-03-23
**Domain:** Form handling, email delivery, spam protection, client-server validation
**Confidence:** HIGH

## Summary

Phase 3 builds the lead capture infrastructure: two form variants (compact 3-field, full 6-field) that submit via Server Actions, validate with Zod v4 + React Hook Form, send business notification emails through Resend + React Email, and block spam with Cloudflare Turnstile invisible captcha plus honeypot fields. All packages required for this phase are already specified in the project's technology stack with verified versions.

The critical integration point is React Hook Form with Zod v4. A known type compatibility issue existed between `@hookform/resolvers` 5.x and Zod v4 where explicitly specifying `useForm<z.infer<typeof schema>>` causes type errors. The fix is straightforward: do not pass a generic parameter to `useForm()` -- types are inferred automatically from the resolver. This is confirmed by the Zod maintainer. The current `@hookform/resolvers` 5.2.2 supports Zod v4 natively with automatic version detection.

**Primary recommendation:** Build form components as `"use client"` components using React Hook Form for client UX (field-level errors, onBlur validation, pending states) and Server Actions for secure server-side processing (Zod re-validation, Turnstile verification, Resend email delivery). Keep both form variants composable via shared Zod schemas and a shared input component library.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Two-tier form system: compact 3-field form near hero section + full 6-field form near bottom of page, before footer
- **D-02:** Compact form fields: name, phone, service type (3 fields only). Quick-capture for high-intent visitors.
- **D-03:** Full form fields: name, phone, email, service type, address, message (6 fields)
- **D-04:** Both forms submit independently -- compact form is a valid standalone lead submission, not a precursor to the full form
- **D-05:** Header "Get Free Quote" CTA button smooth-scrolls to the compact top form section
- **D-06:** Contact page uses the same full 6-field QuoteForm component (consistent experience, one component)
- **D-07:** CTA buttons throughout page content anchor-link to the appropriate form section
- **D-08:** Inline success message replaces the form in-place after submission: "Thank you! We'll contact you within 24 hours." No redirect, no page navigation.
- **D-09:** Same inline success message for both compact and full form
- **D-10:** On error: inline error message above the form with retry prompt and phone fallback: "Something went wrong. Please try again or call us at (201) 555-0123." Form data preserved.
- **D-11:** Styled HTML email via React Email (@react-email/components) sent to business via Resend
- **D-12:** Email includes: all submitted form fields + page context (source URL, page title, timestamp, IP-based approximate location)
- **D-13:** Business-only notification -- no confirmation email sent to the visitor
- **D-14:** Notification recipient: info@jerseycityqualityroofing.com (from business-info.ts registry)
- **D-15:** Service type dropdown auto-selects based on current page context (e.g., on /services/residential/roof-repair/ pre-selects "Roof Repair"). Editable -- user can change selection. Defaults to placeholder on non-service pages.
- **D-16:** Required fields: name, phone number, service type. Optional fields: email, address, message.
- **D-17:** Flexible US phone validation -- accepts (201) 555-0123, 201-555-0123, 2015550123, +1 201 555 0123. Strips formatting on submit, stores as digits. Rejects obviously invalid (too short, too long, all same digit).
- **D-18:** Validation timing: on blur (per-field as user leaves) + on submit (all fields). React Hook Form with "onBlur" mode. Inline error messages below each field.
- **D-19:** Zod schema for both compact and full form validation (shared base schema extended)
- **D-20:** Cloudflare Turnstile invisible captcha on both form variants -- completely invisible to real users
- **D-21:** Honeypot hidden field as secondary spam filter (zero-dependency technique, defense in depth)
- **D-22:** Turnstile verification happens server-side in the Server Action before processing the form
- **D-23:** (Implied) Server Actions preferred over API routes

### Claude's Discretion
- Exact success/error message copy and styling
- React Email template design (layout, colors, spacing)
- Server Action implementation details (error handling, retry logic)
- Turnstile widget placement and configuration
- Honeypot field naming and implementation
- Form component internal architecture (shared base vs. two separate components)
- Loading/submitting state UI (spinner, disabled button, etc.)
- Zod schema internal structure and error messages

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CRO-01 | Quote request form embedded on every service page, location page, and service-in-city page (5-6 fields max) | React Hook Form + Zod v4 validation, cva+cn() input components, SectionWrapper for consistent placement. Two variants: CompactQuoteForm (3 fields) and QuoteForm (6 fields). Both are reusable components that accept a `defaultServiceType` prop for page-context auto-selection. |
| CRO-10 | Form submission sends notification email via Resend and returns confirmation to user | Resend SDK `emails.send()` with `react` property for React Email templates. Server Action validates with Zod, verifies Turnstile token, sends email, returns `{ success: true }` or `{ success: false, error: string }`. Inline success/error messages replace form or appear above form. |
| CRO-11 | Cloudflare Turnstile invisible captcha on all forms for spam protection | Turnstile client script loaded via `next/script`, explicit rendering in React via `turnstile.render()` with invisible appearance. Server-side token verification via POST to `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Honeypot hidden field as secondary defense. |

</phase_requirements>

## Standard Stack

### Core (Phase 3 specific -- packages to install)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-hook-form | 7.72.0 | Form state management | 8.6 KB gzipped, zero deps. Uncontrolled components minimize re-renders. onBlur mode for field-level validation per D-18. Works alongside Server Actions. |
| @hookform/resolvers | 5.2.2 | Zod-to-RHF bridge | Connects Zod v4 schemas to React Hook Form. Auto-detects Zod version at runtime. |
| zod | 4.3.6 | Schema validation (client + server) | Same schema validates on client (via resolver) and server (in Server Action). v4 has 14x faster parsing, 57% smaller bundle than v3. |
| resend | 6.9.4 | Transactional email API | Developer-first, purpose-built for Next.js. Free tier: 100 emails/day. Server-only -- used in Server Actions. |
| @react-email/components | 1.0.10 | React-based email templates | Build HTML email templates with React components. Includes Tailwind component for styling. Supports Tailwind CSS v4 natively. |

### Already Installed (from Phase 1-2)

| Library | Version | Role in Phase 3 |
|---------|---------|-----------------|
| class-variance-authority | 0.7.1 | Input/select/textarea component variants |
| clsx | 2.1.1 | Conditional class composition |
| tailwind-merge | 3.5.0 | Class conflict resolution |
| lucide-react | 1.0.1+ | Form icons (CheckCircle, AlertCircle, Loader, Phone) |
| motion | 12.38.0 | Success/error message animations (AnimatePresence) |
| next | 16.2.1 | Server Actions, next/script for Turnstile |

### External (no npm package)

| Dependency | Integration | Notes |
|------------|------------|-------|
| Cloudflare Turnstile | Client script via `next/script` + server-side verification | Loaded from `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit`. Requires Cloudflare dashboard setup for site key + secret key. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| React Hook Form | React 19 useActionState alone | useActionState lacks client-side field-level validation, onBlur mode, and touched state tracking. RHF provides superior UX for multi-field forms. |
| Zod v4 | Zod v3 | v3 works but is 57% larger bundle and 14x slower parsing. v4 is already in the project stack. The type inference fix (no generic on useForm) is well-documented. |
| Custom Turnstile hook | @marsidev/react-turnstile | Third-party wrapper adds a dependency for something achievable in ~40 lines of custom hook code. Custom approach gives full control over invisible mode and reset behavior. |
| Resend | SendGrid, Nodemailer | SendGrid requires complex setup and paid tiers for transactional email. Nodemailer needs SMTP server management. Resend is the project-specified stack choice. |

**Installation:**
```bash
pnpm add react-hook-form @hookform/resolvers zod resend @react-email/components
```

## Architecture Patterns

### Recommended File Structure
```
src/
  app/
    actions/
      submit-quote.ts              # Server Action: validate, verify turnstile, send email
    (marketing)/
      contact/
        page.tsx                    # Uses QuoteForm component
  components/
    forms/
      quote-form.tsx               # Full 6-field form (use client)
      compact-quote-form.tsx       # Compact 3-field form (use client)
      form-input.tsx               # Reusable text input with label/error
      form-select.tsx              # Reusable select with label/error
      form-textarea.tsx            # Reusable textarea with label/error
      turnstile-widget.tsx         # Cloudflare Turnstile React wrapper (use client)
      submit-button.tsx            # Button with loading state
    emails/
      lead-notification.tsx        # React Email template for business notification
  lib/
    schemas/
      quote-form.ts                # Zod schemas: compactQuoteSchema, fullQuoteSchema
    turnstile.ts                   # Server-side Turnstile token verification
  types/
    form.ts                        # Form-related TypeScript types
```

### Pattern 1: Two-Tier Form with Shared Schema

**What:** Both form variants share a base Zod schema. The compact form schema is a subset of the full form schema.
**When to use:** When multiple form variants share overlapping fields (D-01, D-19).

```typescript
// src/lib/schemas/quote-form.ts
import { z } from "zod";

// Flexible US phone regex: accepts various formats, 10 digits min
const phoneRegex = /^[+]?1?\s*[-.]?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

// Strip all non-digit characters, keeping only digits
function normalizePhone(val: string): string {
  const digits = val.replace(/\D/g, "");
  // Remove leading 1 if 11 digits (US country code)
  return digits.length === 11 && digits.startsWith("1")
    ? digits.slice(1)
    : digits;
}

// Shared field schemas
const nameField = z.string().min(2, "Name must be at least 2 characters").max(100);
const phoneField = z
  .string()
  .regex(phoneRegex, "Please enter a valid phone number")
  .transform(normalizePhone)
  .refine((digits) => digits.length === 10, { message: "Phone number must be 10 digits" })
  .refine((digits) => !/^(\d)\1{9}$/.test(digits), { message: "Please enter a valid phone number" });
const serviceTypeField = z.string().min(1, "Please select a service type");

// Compact form: 3 required fields (D-02, D-16)
export const compactQuoteSchema = z.object({
  name: nameField,
  phone: phoneField,
  serviceType: serviceTypeField,
  honeypot: z.string().max(0).optional(), // D-21: honeypot
  turnstileToken: z.string().min(1, "Security verification required"),
});

// Full form: 6 fields, 3 required + 3 optional (D-03, D-16)
export const fullQuoteSchema = z.object({
  name: nameField,
  phone: phoneField,
  serviceType: serviceTypeField,
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  address: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
  honeypot: z.string().max(0).optional(),
  turnstileToken: z.string().min(1, "Security verification required"),
});

export type CompactQuoteFormData = z.infer<typeof compactQuoteSchema>;
export type FullQuoteFormData = z.infer<typeof fullQuoteSchema>;
```

### Pattern 2: React Hook Form + Zod v4 (No Generic on useForm)

**What:** Client-side form with RHF and Zod v4 resolver, using onBlur validation mode.
**When to use:** All form components in this phase (D-18).

**CRITICAL: Zod v4 type fix** -- Do NOT pass a generic parameter to `useForm()`. Types are inferred from the resolver automatically. This is the official fix from the Zod maintainer for the v4 type incompatibility.

```typescript
// src/components/forms/quote-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fullQuoteSchema, type FullQuoteFormData } from "@/lib/schemas/quote-form";

export function QuoteForm({ defaultServiceType }: { defaultServiceType?: string }) {
  // DO NOT specify generic: useForm<FullQuoteFormData>()
  // Types are inferred from the resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(fullQuoteSchema),
    mode: "onBlur", // D-18: validate on blur
    defaultValues: {
      serviceType: defaultServiceType ?? "",
    },
  });

  // handleSubmit validates client-side, then calls server action
  const onSubmit = async (data: FullQuoteFormData) => {
    // Call server action, handle response...
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* form fields with register() */}
    </form>
  );
}
```

### Pattern 3: Server Action with Dual Validation

**What:** Server Action re-validates with Zod (defense in depth), verifies Turnstile token, sends email.
**When to use:** Form submission handler (D-22, CRO-10).

```typescript
// src/app/actions/submit-quote.ts
"use server";

import { fullQuoteSchema, compactQuoteSchema } from "@/lib/schemas/quote-form";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendLeadNotification } from "@/lib/email";

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function submitQuote(
  formVariant: "compact" | "full",
  data: Record<string, unknown>,
): Promise<ActionResult> {
  // 1. Check honeypot (D-21)
  if (data.honeypot) {
    // Bot detected -- return success to not reveal detection
    return { success: true };
  }

  // 2. Server-side Zod validation
  const schema = formVariant === "compact" ? compactQuoteSchema : fullQuoteSchema;
  const result = schema.safeParse(data);
  if (!result.success) {
    return { success: false, error: "Please check your form and try again." };
  }

  // 3. Verify Turnstile token (D-22)
  const turnstileValid = await verifyTurnstileToken(result.data.turnstileToken);
  if (!turnstileValid) {
    return { success: false, error: "Security verification failed. Please try again." };
  }

  // 4. Send email notification (D-11)
  const emailResult = await sendLeadNotification(result.data, formVariant);
  if (!emailResult.success) {
    return { success: false, error: "Something went wrong. Please try again or call us." };
  }

  return { success: true };
}
```

### Pattern 4: Cloudflare Turnstile Custom Hook

**What:** Custom React hook for managing Turnstile widget lifecycle in invisible mode.
**When to use:** Both form variants (D-20).

```typescript
// src/components/forms/turnstile-widget.tsx
"use client";

import { useEffect, useRef, useCallback, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
      isExpired: (widgetId: string) => boolean;
    };
  }
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

export function TurnstileWidget({ onVerify, onExpire }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !window.turnstile) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      appearance: "interaction-only", // invisible until needed
      callback: (token: string) => onVerify(token),
      "expired-callback": () => onExpire?.(),
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [onVerify, onExpire]);

  return <div ref={containerRef} />;
}
```

### Pattern 5: Resend Email with React Email Template

**What:** Styled HTML email built with React Email components, sent via Resend.
**When to use:** Business notification email (D-11, D-12).

```typescript
// src/components/emails/lead-notification.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Tailwind,
} from "@react-email/components";

interface LeadNotificationProps {
  name: string;
  phone: string;
  serviceType: string;
  email?: string;
  address?: string;
  message?: string;
  sourceUrl: string;
  pageTitle: string;
  timestamp: string;
}

export function LeadNotification(props: LeadNotificationProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto max-w-xl bg-white p-8 rounded">
            <Heading className="text-xl font-bold text-gray-900">
              New Lead: {props.serviceType}
            </Heading>
            <Hr />
            <Section>
              <Text className="text-base text-gray-800">
                <strong>Name:</strong> {props.name}
              </Text>
              <Text className="text-base text-gray-800">
                <strong>Phone:</strong> {props.phone}
              </Text>
              {/* ... remaining fields ... */}
            </Section>
            <Hr />
            <Section>
              <Text className="text-sm text-gray-500">
                Submitted from: {props.sourceUrl}
              </Text>
              <Text className="text-sm text-gray-500">
                Page: {props.pageTitle}
              </Text>
              <Text className="text-sm text-gray-500">
                Time: {props.timestamp}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
```

### Pattern 6: Smooth Scroll from Header CTA

**What:** Header CTA button smooth-scrolls to form section instead of navigating.
**When to use:** D-05 -- Header "Get Free Quote" button scrolls to compact form section.

The approach uses standard anchor links with `id` attributes. The compact form section gets `id="quote-form"`. The header CTA changes from `<Link href="/contact">` to an anchor that scrolls. On pages without the form (if any), fall back to `/contact` navigation.

```typescript
// In header.tsx -- change CTA from Link to scroll behavior:
// onClick handler scrolls to #quote-form if element exists, else navigates to /contact
const handleQuoteCTA = () => {
  const el = document.getElementById("quote-form");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = "/contact";
  }
};
```

### Anti-Patterns to Avoid
- **Passing generic to useForm with Zod v4:** `useForm<z.infer<typeof schema>>()` causes type errors with Zod v4. Let the resolver infer types.
- **Exposing Turnstile secret key client-side:** Secret key must only exist in Server Action / server-side code. Use `TURNSTILE_SECRET_KEY` (not `NEXT_PUBLIC_`).
- **Sending email from client component:** Resend API key must never reach the client. All email sending happens in Server Actions.
- **Trusting client-side validation alone:** Server Action MUST re-validate with Zod. Client validation is UX only.
- **Blocking form render on Turnstile load:** Turnstile script loads async. Form should be usable immediately; token is obtained before submission.
- **Using `useActionState` with React Hook Form:** These are competing paradigms. Use RHF for client-side UX (register, handleSubmit, errors) and call the Server Action directly from the onSubmit handler. Do not mix RHF with useActionState's form action pattern.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form state management | Custom useState for each field | React Hook Form | Handles touched/dirty/error state, re-render optimization, uncontrolled inputs, onBlur mode. Reimplementing this is 200+ lines of buggy code. |
| Schema validation | Manual if/else validation | Zod v4 schemas | Type inference, composable schemas (.extend), .safeParse for server-side, same schema client and server. |
| Email delivery | Raw fetch to SMTP/API | Resend SDK | Handles retries, rate limiting, bounce tracking, React component rendering to HTML. The `react` property on `emails.send()` renders React Email templates automatically. |
| Email HTML rendering | String concatenation HTML | @react-email/components | Email client compatibility (Outlook, Gmail, Apple Mail) requires specific HTML/CSS patterns. React Email handles inline styles, table layouts, and client quirks. |
| CAPTCHA verification | Custom bot detection | Cloudflare Turnstile | Invisible, free to 1M/month, no user-hostile puzzles. Custom bot detection is an arms race you will lose. |
| Phone number formatting | Custom regex per format | Zod .regex() + .transform() | The flexible regex + normalize-to-digits pattern handles all common US formats. Adding formats later is trivial. |

**Key insight:** This phase has zero novel problems. Every component (form handling, validation, email, captcha) has a mature, well-tested solution. The value is in correct integration, not custom implementation.

## Common Pitfalls

### Pitfall 1: Zod v4 Type Error with React Hook Form
**What goes wrong:** TypeScript compile error when using `useForm<z.infer<typeof schema>>()` with Zod v4.
**Why it happens:** Zod v4 introduced stricter separation between input and output types. Specifying a fixed generic on `useForm` conflicts with schemas that transform data (like the phone number `.transform()`).
**How to avoid:** Never pass a generic parameter to `useForm()`. Let the zodResolver infer types automatically. Use `z.infer<typeof schema>` only where you need the type separately (e.g., function parameter types).
**Warning signs:** TypeScript error about `Resolver` type incompatibility mentioning input/output types.

### Pitfall 2: Turnstile Token Expiry
**What goes wrong:** User fills form slowly (5+ minutes), token expires, server-side verification fails silently.
**Why it happens:** Turnstile tokens expire after 300 seconds (5 minutes). Each token can only be validated once.
**How to avoid:** Use Turnstile's `expired-callback` to reset the widget and obtain a fresh token. Store the latest token in React state via the `onVerify` callback. Reset the widget after each submission attempt (success or failure).
**Warning signs:** Server logs showing `timeout-or-duplicate` errors from Turnstile siteverify API.

### Pitfall 3: Honeypot Field Visible to Screen Readers
**What goes wrong:** Screen reader users fill the honeypot field, thinking it is a real form field. Their submissions are silently rejected.
**Why it happens:** Using `display: none` or `visibility: hidden` hides from both bots AND assistive technology, but some implementations use CSS that is still readable. Or the field has a visible label.
**How to avoid:** Use `aria-hidden="true"` on the honeypot field, `tabIndex={-1}` to remove from tab order, position it absolutely off-screen with `sr-only`-style CSS, and use an obviously-bot-targeted name like `website` or `url` (fields bots love to fill).
**Warning signs:** Legitimate form submissions being silently dropped.

### Pitfall 4: Resend API Key in Client Bundle
**What goes wrong:** `RESEND_API_KEY` leaks into client JavaScript bundle, exposing the API key.
**Why it happens:** Using the Resend client in a `"use client"` component or importing it in a file that gets bundled client-side.
**How to avoid:** Only import `resend` in Server Actions (files with `"use server"` directive) or `src/lib/` files that are never imported from client components. Use `RESEND_API_KEY` without `NEXT_PUBLIC_` prefix. Next.js only exposes `NEXT_PUBLIC_*` vars to the client.
**Warning signs:** Build output includes `resend` in client chunks.

### Pitfall 5: Form Data Preserved but Turnstile Token Stale on Retry
**What goes wrong:** User sees error (D-10), form data is preserved, but the Turnstile token was already consumed. Retry fails with duplicate token error.
**Why it happens:** Turnstile tokens are single-use. After a failed email send, the previously validated token cannot be reused.
**How to avoid:** After every server action call (success or failure), reset the Turnstile widget to obtain a fresh token. The reset call is: `window.turnstile?.reset(widgetId)`.
**Warning signs:** Second submission always fails with Turnstile verification error.

### Pitfall 6: Service Type Dropdown Empty on Non-Service Pages
**What goes wrong:** The service type dropdown has no default selection on pages like the homepage or contact page, but the field is required.
**Why it happens:** `defaultServiceType` prop is only available on service-specific pages.
**How to avoid:** Use a placeholder option: "Select a service..." that has an empty string value. The Zod schema's `z.string().min(1)` will reject the empty placeholder. Pass `defaultServiceType` from service page layouts that know the current service context.
**Warning signs:** Required field has no way to be filled on non-service pages.

### Pitfall 7: Email Template Not Rendering in All Clients
**What goes wrong:** React Email Tailwind classes render in Gmail/Apple Mail but break in Outlook.
**Why it happens:** Outlook uses the Word rendering engine, which ignores many CSS properties. Tailwind utilities like flexbox, grid, and certain spacing don't work.
**How to avoid:** Use React Email's `pixelBasedPreset` for the Tailwind component (email clients don't support `rem`). Stick to simple layouts: single-column, explicit widths, table-based alignment for Outlook. Test with `@react-email/components` preview server or Resend's preview feature.
**Warning signs:** Email looks correct in web preview but broken when received in Outlook.

## Code Examples

### Form Input Component with cva Variants

Following the project's established cva+cn() pattern (from Button/Badge components):

```typescript
// src/components/forms/form-input.tsx
"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "w-full rounded-md border bg-dominant text-text-primary font-body",
    "placeholder:text-text-secondary/60",
    "transition-colors duration-[--duration-fast]",
    "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-dominant",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        default: "border-secondary/50 hover:border-accent/50",
        error: "border-red-500 focus:ring-red-500",
      },
      inputSize: {
        default: "px-4 py-3 text-lg",
        compact: "px-3 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  },
);

interface FormInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, variant, inputSize, label, error, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1">
        <label
          htmlFor={inputId}
          className="block text-lg font-body font-medium text-text-primary"
        >
          {label}
          {props.required && <span className="text-accent ml-1" aria-hidden="true">*</span>}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn(inputVariants({ variant: error ? "error" : variant, inputSize, className }))}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-red-400 text-sm" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
FormInput.displayName = "FormInput";

export { FormInput, inputVariants };
```

### Server-Side Turnstile Verification

```typescript
// src/lib/turnstile.ts
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes": string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
      signal: AbortSignal.timeout(10_000), // 10s timeout
    });

    const result: TurnstileVerifyResponse = await response.json();
    return result.success;
  } catch (error) {
    console.error("Turnstile verification failed:", error);
    return false;
  }
}
```

### Resend Email Send Pattern

```typescript
// src/lib/email.ts
import { Resend } from "resend";
import { LeadNotification } from "@/components/emails/lead-notification";
import { BUSINESS_INFO } from "@/data/business-info";

const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadData {
  name: string;
  phone: string;
  serviceType: string;
  email?: string;
  address?: string;
  message?: string;
}

interface PageContext {
  sourceUrl: string;
  pageTitle: string;
}

export async function sendLeadNotification(
  lead: LeadData,
  pageContext: PageContext,
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Jersey City Quality Roofing <leads@jerseycityqualityroofing.com>",
      to: [BUSINESS_INFO.email],
      subject: `New Lead: ${lead.serviceType} - ${lead.name}`,
      react: LeadNotification({
        ...lead,
        ...pageContext,
        timestamp: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error: "Email delivery failed" };
  }
}
```

### Honeypot Field Implementation

```typescript
// Inside any form component -- honeypot field hidden from real users
<div
  aria-hidden="true"
  className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden"
>
  <label htmlFor="website">Website</label>
  <input
    id="website"
    type="text"
    tabIndex={-1}
    autoComplete="off"
    {...register("honeypot")}
  />
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| useFormState (react-dom) | useActionState (react) | React 19 (Dec 2024) | useFormState is deprecated. useActionState is the replacement. However, we use RHF instead of either, calling Server Actions directly from onSubmit. |
| Zod v3 `z.string().email()` | Zod v4 `z.email()` (top-level) | Zod v4 (June 2025) | Top-level validators available but `z.string().email()` still works. Use whichever reads clearer in schema context. |
| @react-email/components 0.0.x | @react-email/components 1.0.x | React Email 5.0 (2025) | Stable 1.0 release. Tailwind component supports v4 natively. pixelBasedPreset recommended for email rendering. |
| reCAPTCHA v3 | Cloudflare Turnstile | Turnstile GA (2023) | reCAPTCHA free tier now 10K/month. Turnstile is 1M/month free, smaller script, no user interaction needed. |

**Deprecated/outdated:**
- `useFormState` from `react-dom`: Replaced by `useActionState` from `react` in React 19
- `@hookform/resolvers` < 5.2: Zod v4 support requires 5.2.0+
- `@react-email/components` 0.0.x: The CLAUDE.md stack reference lists 0.0.x but current npm version is 1.0.10

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Cloudflare Turnstile (runtime) | D-20, CRO-11 | N/A (external script) | v0 API | Turnstile loads client-side from CDN. Needs site key + secret key from Cloudflare dashboard. For local dev, use Turnstile test keys. |
| Resend API (runtime) | D-11, CRO-10 | N/A (external API) | REST API | Needs RESEND_API_KEY env var. For local dev, use Resend test mode or mock the send function. |
| SMTP/Domain verification | D-14 | Unknown | -- | Resend requires domain verification for custom "from" addresses. During dev, use `onboarding@resend.dev` as sender. |

**Missing dependencies with no fallback:**
- None that block development. Both Turnstile and Resend have test/development modes.

**Missing dependencies with fallback:**
- Cloudflare Turnstile site key: Use official test keys for development (`1x00000000000000000000AA` always passes, `2x00000000000000000000AB` always fails)
- Resend API key: Use Resend test mode (free signup, no domain verification needed for testing)
- Custom domain email: Use `onboarding@resend.dev` during development, switch to `leads@jerseycityqualityroofing.com` in production after domain verification

**Environment variables required:**
```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=   # Public: embedded in client script
TURNSTILE_SECRET_KEY=              # Server-only: used in Server Action
RESEND_API_KEY=                    # Server-only: used in Server Action
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | `vitest.config.ts` |
| Quick run command | `pnpm test` |
| Full suite command | `pnpm test` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CRO-01 | Zod schemas validate correct/invalid data for both form variants | unit | `pnpm vitest run src/lib/__tests__/quote-form-schema.test.ts -x` | Wave 0 |
| CRO-01 | Phone number normalization handles all accepted formats | unit | `pnpm vitest run src/lib/__tests__/quote-form-schema.test.ts -x` | Wave 0 |
| CRO-10 | Server Action returns success/error for valid/invalid submissions | unit | `pnpm vitest run src/app/actions/__tests__/submit-quote.test.ts -x` | Wave 0 |
| CRO-10 | Email template renders with all required fields | unit | `pnpm vitest run src/components/emails/__tests__/lead-notification.test.ts -x` | Wave 0 |
| CRO-11 | Turnstile server verification handles success/failure/timeout | unit | `pnpm vitest run src/lib/__tests__/turnstile.test.ts -x` | Wave 0 |
| CRO-11 | Honeypot detection silently rejects bot submissions | unit | `pnpm vitest run src/app/actions/__tests__/submit-quote.test.ts -x` | Wave 0 |
| CRO-01 | Form components render, accept input, show errors | manual-only | Manual browser test | -- |
| CRO-10 | End-to-end form submission sends email | manual-only | Manual with Resend test mode | -- |

### Sampling Rate
- **Per task commit:** `pnpm test`
- **Per wave merge:** `pnpm test && pnpm lint && pnpm type-check`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/__tests__/quote-form-schema.test.ts` -- covers CRO-01 (schema validation, phone normalization)
- [ ] `src/app/actions/__tests__/submit-quote.test.ts` -- covers CRO-10, CRO-11 (server action, honeypot)
- [ ] `src/lib/__tests__/turnstile.test.ts` -- covers CRO-11 (Turnstile server verification)
- [ ] `src/components/emails/__tests__/lead-notification.test.ts` -- covers CRO-10 (email template rendering)

## Open Questions

1. **Resend Domain Verification Status**
   - What we know: Resend requires domain verification for custom "from" addresses. The project plans to use `leads@jerseycityqualityroofing.com`.
   - What's unclear: Whether the domain is already registered with Resend or if this is a placeholder domain.
   - Recommendation: Use `onboarding@resend.dev` as the "from" address during development. Add a `RESEND_FROM_EMAIL` env var so production can override to the verified domain.

2. **Cloudflare Turnstile Dashboard Setup**
   - What we know: Need a Cloudflare account with Turnstile enabled, a site key, and a secret key.
   - What's unclear: Whether the Cloudflare account exists and has Turnstile configured.
   - Recommendation: Use Turnstile test keys for development (always-pass: `1x00000000000000000000AA`, always-fail: `2x00000000000000000000AB`, secret: `1x0000000000000000000000000000000AA`). Document production setup in a README section.

3. **Page Context for Source URL (D-12)**
   - What we know: Email should include the source URL and page title where the form was submitted.
   - What's unclear: How to pass this from a Server Component page to a Client Component form to a Server Action.
   - Recommendation: Pass `sourceUrl` and `pageTitle` as props to the form component from the page. The form passes them as hidden data to the Server Action. Alternatively, read `window.location.href` on the client and include it in the submission data. The prop approach is cleaner since it works with SSR.

## Project Constraints (from CLAUDE.md)

Directives relevant to Phase 3 implementation:

- **TypeScript strict mode:** All form types, action return types, and schema types must be fully typed. No `any`.
- **`"use client"` only when needed:** Form components need it (hooks, browser APIs). Server Action files, schemas, Turnstile verification, email send logic are all server-only.
- **Component organization:** Form components go in `src/components/forms/`. Email templates in `src/components/emails/`. Schemas in `src/lib/schemas/`. Server actions in `src/app/actions/`.
- **Naming conventions:** kebab-case files (`quote-form.tsx`), PascalCase components (`QuoteForm`), camelCase hooks.
- **cva+cn() pattern:** Form inputs, selects, and textareas should follow the same cva variant pattern established by Button and Badge components.
- **Semantic HTML:** Forms use `<label>`, `<fieldset>`, `aria-invalid`, `aria-describedby` for errors, `role="alert"` on error messages.
- **Accessibility:** All form fields keyboard-accessible, focus-visible ring styles, WCAG AA contrast on labels/errors.
- **Phone numbers:** Wrapped in `tel:` links in error messages (D-10 phone fallback).
- **Cormorant Garamond / Cormorant typography:** Form labels and text follow the project's font system. Minimum 18px body text applies to form labels.
- **No shadcn:** The project does not use shadcn/ui. Components are custom-built with cva+cn().

## Sources

### Primary (HIGH confidence)
- [Next.js Forms Guide (v16.2.1)](https://nextjs.org/docs/app/guides/forms) - Server Actions, useActionState, form validation patterns
- [Cloudflare Turnstile Server-Side Validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) - Siteverify API, token expiry, request format
- [Cloudflare Turnstile Client-Side Rendering](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/) - Widget embedding, explicit rendering, invisible mode
- [Resend Next.js Integration](https://resend.com/docs/send-with-nextjs) - Server Action pattern, React Email usage, error handling
- [Zod v4 API Reference](https://zod.dev/api) - Schema definition, .regex(), .transform(), .refine(), .safeParse()
- [@hookform/resolvers GitHub](https://github.com/react-hook-form/resolvers) - Zod v4 support, Standard Schema, version detection
- [Zod v4 + RHF Type Fix (Issue #4992)](https://github.com/colinhacks/zod/issues/4992) - Official fix: do not specify generic on useForm

### Secondary (MEDIUM confidence)
- [React Email Tailwind Component](https://react.email/docs/components/tailwind) - Tailwind v4 support, pixelBasedPreset
- [React Email 5.0 Release](https://resend.com/blog/react-email-5) - @react-email/components 1.0, Tailwind 4 support
- [How to Send Emails in Next.js (2026) - Sequenzy](https://www.sequenzy.com/blog/send-emails-nextjs) - Current patterns for Resend + Server Actions
- [Adding Cloudflare Turnstile to Next.js - Jed Patterson](https://medium.com/@jedpatterson/adding-cloudflare-turnstile-to-a-next-js-app-78121bf4d7e3) - Practical integration guide

### npm Registry (HIGH confidence - verified 2026-03-23)
- react-hook-form: 7.72.0
- @hookform/resolvers: 5.2.2
- zod: 4.3.6
- resend: 6.9.4
- @react-email/components: 1.0.10 (corrects CLAUDE.md listing of 0.0.x)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries specified in project stack, versions verified on npm
- Architecture: HIGH - Patterns well-documented in official docs, Zod v4 fix confirmed by maintainer
- Pitfalls: HIGH - Zod v4 type issue is widely reported and has a definitive fix; Turnstile token behavior documented in official docs

**Research date:** 2026-03-23
**Valid until:** 2026-04-23 (30 days -- all libraries are stable releases)
