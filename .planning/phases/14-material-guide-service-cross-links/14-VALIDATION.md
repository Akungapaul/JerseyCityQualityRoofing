---
phase: 14
slug: material-guide-service-cross-links
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-01
---

# Phase 14 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.1 |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run src/lib/__tests__/internal-links.test.ts` |
| **Full suite command** | `npx vitest run && pnpm type-check && pnpm build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/lib/__tests__/internal-links.test.ts`
- **After every plan wave:** Run `npx vitest run && pnpm type-check && pnpm build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 14-01-01 | 01 | 1 | SEO-05 | unit | `npx vitest run src/lib/__tests__/internal-links.test.ts -x` | ✅ | ⬜ pending |
| 14-01-02 | 01 | 1 | SEO-05 | smoke | `pnpm type-check` | ✅ | ⬜ pending |
| 14-01-03 | 01 | 1 | SEO-05 | integration | `pnpm build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements:
- `src/lib/__tests__/internal-links.test.ts` — already covers `getMaterialRelatedServices` unit tests (22/22 passing)
- `vitest.config.ts` — test framework already configured
- `pnpm type-check` — TypeScript compilation already set up
- `pnpm build` — SSG build renders all 6 material guide pages, catches runtime errors

*No new test files or framework setup needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual rendering of service links on material guide pages | SEO-05 | Layout, styling, and visual placement cannot be verified by automated tests | 1. Start dev server (`pnpm dev`) 2. Navigate to `/guides/materials/asphalt-shingles` 3. Verify service links section appears between FAQ and Related Guides 4. Verify links are clickable and navigate to correct service pages 5. Spot-check 1-2 more materials (e.g., `/guides/materials/tpo-membrane` for commercial services) |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
