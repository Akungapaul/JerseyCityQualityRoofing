# Phase 3: Lead Capture System - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-23
**Phase:** 03-lead-capture-system
**Areas discussed:** Form placement & trigger, Post-submission experience, Email notification format, Form field behavior

---

## Form Placement & Trigger

| Option | Description | Selected |
|--------|-------------|----------|
| Inline embedded | Form is directly visible on the page, embedded within the content flow. Lowest friction. | ✓ |
| Modal/drawer on CTA click | Form lives in a modal or slide-out drawer, triggered by CTA buttons. | |
| Both — inline + modal | Inline form AND modal form. Two access paths. | |

**User's choice:** Inline embedded
**Notes:** Standard approach for local service sites.

### Form Position

| Option | Description | Selected |
|--------|-------------|----------|
| Near bottom, before footer | Form sits after main content, before footer CTA banner. | |
| In a dedicated section mid-page | Form appears roughly halfway through content. | |
| Both top and bottom | Short-form CTA near hero + full form near bottom. | ✓ |

**User's choice:** Both top and bottom
**Notes:** Two conversion points for different intent levels.

### Top Form Fields

| Option | Description | Selected |
|--------|-------------|----------|
| 3 fields: name, phone, service | Quick-capture for high-intent visitors. Service auto-selected from page context. | ✓ |
| Same full form as bottom | Both locations show identical 6-field form. | |
| Just a CTA that scrolls to bottom form | No form at top, just a button that scrolls down. | |

**User's choice:** 3 fields: name, phone, service
**Notes:** Low friction, high conversion potential.

### Header CTA Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Scroll to top form section | Header CTA smooth-scrolls to the compact 3-field form near the hero. | ✓ |
| Scroll to bottom full form | Header CTA jumps to the complete 6-field form at the bottom. | |
| You decide | Let Claude determine best scroll target. | |

**User's choice:** Scroll to top form section

### Form Submission Independence

| Option | Description | Selected |
|--------|-------------|----------|
| Independent submissions | Top form submits directly with 3 fields. Bottom form submits with 6 fields. | ✓ |
| Top form expands to full form | Filling top 3 fields reveals remaining fields inline. | |
| Top form pre-fills bottom form | Submitting top form scrolls to full form with fields pre-filled. | |

**User's choice:** Independent submissions
**Notes:** Business gets the lead either way — top form trades completeness for speed.

### Contact Page Form

| Option | Description | Selected |
|--------|-------------|----------|
| Same full form as bottom section | Contact page uses same 6-field QuoteForm component. | ✓ |
| Expanded form with more fields | Extended form with additional fields (preferred contact method, urgency). | |
| You decide | Let Claude determine best contact page layout. | |

**User's choice:** Same full form as bottom section
**Notes:** Consistent experience, one component to maintain.

---

## Post-Submission Experience

### Success Display

| Option | Description | Selected |
|--------|-------------|----------|
| Inline success message | Form replaced with success message in-place. No navigation. | ✓ |
| Redirect to thank-you page | User redirected to /thank-you. Enables GA4 destination goal tracking. | |
| Inline message + redirect after delay | Show inline success for 3-5s, then redirect. | |

**User's choice:** Inline success message
**Notes:** User can continue reading the page.

### Error Display

| Option | Description | Selected |
|--------|-------------|----------|
| Inline error with retry | Error message above form with retry prompt + phone fallback. Form data preserved. | ✓ |
| Toast notification | Toast at top/bottom of screen. Less intrusive but potentially missed. | |
| You decide | Let Claude pick based on design constraints. | |

**User's choice:** Inline error with retry

### Success Message Differentiation

| Option | Description | Selected |
|--------|-------------|----------|
| Same message, both inline | Both forms show same "Thank you" message. | ✓ |
| Top form: brief, Bottom form: detailed | Different messaging per form context. | |
| You decide | Let Claude determine appropriate messaging. | |

**User's choice:** Same message, both inline

---

## Email Notification Format

### Email Format

| Option | Description | Selected |
|--------|-------------|----------|
| Styled HTML via React Email | Clean, branded HTML email with structured lead details. | ✓ |
| Plain text | Simple plain-text email. No styling. | |
| You decide | Let Claude pick best format. | |

**User's choice:** Styled HTML via React Email

### Visitor Confirmation

| Option | Description | Selected |
|--------|-------------|----------|
| No confirmation email | Only business gets notified. Visitor sees inline success message. | ✓ |
| Yes, send confirmation to visitor | Send "We received your request" email to visitor. | |
| You decide | Let Claude determine based on Resend free tier. | |

**User's choice:** No confirmation email
**Notes:** Simpler, no spam risk, no verified sending domain needed for customer-facing email.

### Email Content

| Option | Description | Selected |
|--------|-------------|----------|
| All fields + page context | All submitted fields + source URL, page title, timestamp, approximate location. | ✓ |
| Submitted fields only | Only what the visitor filled in. | |
| You decide | Let Claude determine right balance. | |

**User's choice:** All fields + page context
**Notes:** Helps business prioritize and personalize follow-up.

---

## Form Field Behavior

### Service Type Auto-Selection

| Option | Description | Selected |
|--------|-------------|----------|
| Auto-select + editable | Pre-selects based on page context but user can change. | ✓ |
| Always blank — user picks | Dropdown always starts empty. | |
| Auto-select + locked | Pre-filled and read-only on service pages. | |

**User's choice:** Auto-select + editable
**Notes:** Uses existing service data registry.

### Required Fields

| Option | Description | Selected |
|--------|-------------|----------|
| Name + Phone + Service required | Email, address, message optional. Minimum viable lead. | ✓ |
| All fields required except message | Higher completion barrier. | |
| Only name + phone required | Absolute minimum friction. | |

**User's choice:** Name + Phone + Service required

### Phone Validation

| Option | Description | Selected |
|--------|-------------|----------|
| Flexible US format | Accept any reasonable format, strip on submit, store as digits. | ✓ |
| Strict formatted input | Input mask (___) ___-____. | |
| Minimal — just not empty | Any non-empty string accepted. | |

**User's choice:** Flexible US format

### Validation Timing

| Option | Description | Selected |
|--------|-------------|----------|
| On blur + on submit | Validate on field blur, re-validate all on submit. React Hook Form onBlur mode. | ✓ |
| Only on submit | No errors until user clicks Submit. | |
| You decide | Let Claude pick based on React Hook Form best practices. | |

**User's choice:** On blur + on submit

---

## Claude's Discretion

- Exact success/error message copy and styling
- React Email template design
- Server Action implementation details
- Turnstile widget placement and configuration
- Honeypot field naming and implementation
- Form component internal architecture
- Loading/submitting state UI
- Zod schema internal structure and error messages

## Deferred Ideas

None — discussion stayed within phase scope.
