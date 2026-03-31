---
phase: 12
slug: content-data-linking-fixes
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-31
---

# Phase 12 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.1 |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run src/lib/__tests__/internal-links.test.ts` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/lib/__tests__/internal-links.test.ts`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 12-01-01 | 01 | 1 | CONT-01 | unit | `npx vitest run src/data/__tests__/blog-silo-links.test.ts -x` | ❌ W0 | ⬜ pending |
| 12-01-02 | 01 | 1 | SEO-05 | unit | `npx vitest run src/lib/__tests__/internal-links.test.ts -x` | ✅ (needs new cases) | ⬜ pending |
| 12-01-03 | 01 | 1 | CRO-03 | unit | `npx vitest run src/app/__tests__/contact-quote-form-id.test.tsx -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/data/__tests__/blog-silo-links.test.ts` — validates all blog articles have correct siloCategory matching their service's category in services.ts, and parentPillarLink resolves to a valid route
- [ ] New test cases in `src/lib/__tests__/internal-links.test.ts` — test that `initializeContentRegistry()` registers 8 service nodes and 12 city nodes, and that `getProblemRelatedServices`/`getMaterialRelatedServices` return results when called after initialization
- [ ] `src/app/__tests__/contact-quote-form-id.test.tsx` — verifies contact page renders `id="quote-form"` element

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| FloatingCTA does not self-link on /contact | CRO-03 | IntersectionObserver requires real browser | Visit /contact, verify "Get a Free Quote" button scrolls to form instead of navigating to /contact |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
