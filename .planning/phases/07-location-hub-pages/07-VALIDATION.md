---
phase: 7
slug: location-hub-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | vitest.config.ts |
| **Quick run command** | `pnpm vitest run --reporter=verbose` |
| **Full suite command** | `pnpm vitest run --reporter=verbose` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm vitest run --reporter=verbose`
- **After every plan wave:** Run `pnpm vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 1 | LOC-01 | unit | `pnpm vitest run` | ❌ W0 | ⬜ pending |
| 07-01-02 | 01 | 1 | LOC-05 | unit | `pnpm vitest run` | ❌ W0 | ⬜ pending |
| 07-02-01 | 02 | 2 | SEO-01 | unit | `pnpm vitest run` | ❌ W0 | ⬜ pending |
| 07-02-02 | 02 | 2 | SEO-04 | unit | `pnpm vitest run` | ❌ W0 | ⬜ pending |
| 07-03-01 | 03 | 3 | LOC-01 | build | `pnpm build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/__tests__/phase-07/city-hub-content.test.ts` — stubs for LOC-01 (city content completeness, word count, uniqueness)
- [ ] `src/__tests__/phase-07/city-testimonials.test.ts` — stubs for LOC-05 (city-tagged testimonials render)
- [ ] `src/__tests__/phase-07/city-schema.test.ts` — stubs for SEO-01 (RoofingContractor JSON-LD) and SEO-04 (knowledge graph entity relationships)

*Existing vitest infrastructure covers framework setup. Only test files needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual layout of city hub pages | LOC-01 | Design/layout review requires browser | Run `pnpm dev`, navigate to `/service-areas/jersey-city/`, verify sections render correctly |
| Google Map embed per city | LOC-01 | External API visual check | Verify map loads and shows correct city |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
