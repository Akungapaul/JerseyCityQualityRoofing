---
phase: 4
slug: core-marketing-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.1 |
| **Config file** | `vitest.config.ts` (node environment, `src/**/__tests__/**/*.test.ts` pattern) |
| **Quick run command** | `pnpm test` |
| **Full suite command** | `pnpm test` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm test`
- **After every plan wave:** Run `pnpm test && pnpm lint && pnpm type-check`
- **Before `/gsd:verify-work`:** Full suite must be green + `pnpm build` succeeds
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | SEO-03 | unit | `pnpm test -- src/lib/__tests__/json-ld.test.ts -t "aggregate"` | Extend existing | ⬜ pending |
| 04-01-02 | 01 | 1 | D-19 | unit | `pnpm test -- src/lib/__tests__/json-ld.test.ts -t "faq"` | Extend existing | ⬜ pending |
| 04-01-03 | 01 | 1 | D-20 | unit | `pnpm test -- src/lib/__tests__/json-ld.test.ts -t "contact"` | Extend existing | ⬜ pending |
| 04-01-04 | 01 | 1 | SEO-14 | unit | `pnpm test -- src/lib/__tests__/nap-consistency.test.ts -t "nap"` | ❌ W0 | ⬜ pending |
| 04-02-01 | 02 | 1 | CRO-07 | unit | `pnpm test -- src/components/__tests__/badge-strip.test.ts` | ❌ W0 | ⬜ pending |
| 04-02-02 | 02 | 1 | CRO-06 | unit | `pnpm test -- src/data/__tests__/testimonials.test.ts` | ❌ W0 | ⬜ pending |
| 04-02-03 | 02 | 1 | D-04 | unit | `pnpm test -- src/components/__tests__/faq-accordion.test.ts -t "aria"` | ❌ W0 | ⬜ pending |
| 04-03-01 | 03 | 2 | CORE-01 | unit | `pnpm test -- src/components/__tests__/homepage-sections.test.ts -t "homepage"` | ❌ W0 | ⬜ pending |
| 04-03-02 | 03 | 2 | CORE-03 | unit | `pnpm test -- src/lib/__tests__/nap-consistency.test.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/__tests__/nap-consistency.test.ts` — verifies NAP from BUSINESS_INFO is the sole source, covers SEO-14
- [ ] `src/data/__tests__/testimonials.test.ts` — verifies testimonial data completeness (all entries have required fields)
- [ ] Extend `src/lib/__tests__/json-ld.test.ts` — add tests for buildAggregateRatingJsonLd, buildFaqPageJsonLd, buildContactPageJsonLd
- [ ] Note: Component-level tests (carousel, accordion) require jsdom environment. For this phase, test data/logic layers (node env) and verify components via browser (`agent-browser-verify`).

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Testimonial carousel swipe/autoplay | CRO-06 | Browser interaction | Use agent-browser-verify: navigate to homepage, verify carousel renders 3 cards, swipe left, verify new card appears |
| FAQ accordion keyboard navigation | D-04 | DOM interaction | Use agent-browser-verify: Tab to first FAQ, press Enter/Space to toggle, verify aria-expanded changes |
| Google Maps iframe loads | D-11 | External embed | Use agent-browser-verify: scroll to map section, verify iframe src contains google.com/maps |
| Contact page two-column layout | D-10 | Visual layout | Use agent-browser-verify: verify form and info panels render side by side on desktop viewport |
| Service areas tiered grid | D-14 | Visual hierarchy | Use agent-browser-verify: verify Tier 1 cards are visually larger than Tier 2/3 |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
