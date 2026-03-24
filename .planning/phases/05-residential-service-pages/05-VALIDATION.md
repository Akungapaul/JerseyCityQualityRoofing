---
phase: 5
slug: residential-service-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-24
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.1 |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `pnpm test` |
| **Full suite command** | `pnpm test` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm test`
- **After every plan wave:** Run `pnpm test && pnpm lint && pnpm type-check`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | RESI-01 | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -t "roof-repair"` | Wave 0 | ⬜ pending |
| 05-01-02 | 01 | 1 | RESI-02 | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -t "roof-replacement"` | Wave 0 | ⬜ pending |
| 05-01-03 | 01 | 1 | RESI-03 | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -t "roof-inspection"` | Wave 0 | ⬜ pending |
| 05-01-04 | 01 | 1 | RESI-04 | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -t "emergency"` | Wave 0 | ⬜ pending |
| 05-01-05 | 01 | 1 | CONT-07 | unit | `pnpm vitest run src/data/__tests__/services.test.ts -t "processSteps"` | Exists | ⬜ pending |
| 05-01-06 | 01 | 1 | CONT-08 | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -t "voice"` | Wave 0 | ⬜ pending |
| 05-01-07 | 01 | 1 | CONT-09 | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -t "word count"` | Wave 0 | ⬜ pending |
| 05-02-01 | 02 | 2 | SEO-02 | unit | `pnpm vitest run src/lib/__tests__/json-ld.test.ts -t "buildServicePageJsonLd"` | Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/data/__tests__/service-content.test.ts` — stubs for RESI-01 through RESI-04, CONT-08, CONT-09
- [ ] `src/lib/__tests__/json-ld.test.ts` — extend with buildServicePageJsonLd tests for SEO-02

*Existing infrastructure covers CONT-07 (services.test.ts already exists).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Emergency page phone CTA is visually dominant | RESI-04 | Visual hierarchy requires browser rendering | Load `/services/residential/emergency-roofing`, verify phone number is largest element in hero |
| Content reads as conversational expert voice | CONT-08 | Subjective quality check beyond keyword matching | Read each service page intro; verify first-person storytelling with local context |
| FAQ rich snippets render in Google test | SEO-02 | External tool validation | Paste page URL into Google Rich Results Test; verify FAQ and Service schema detected |
| OG images render correctly per service | SEO-02 | Visual quality check | Visit `/api/og?service=roof-repair` (and each slug); verify dark bg, gold text, service name visible |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
