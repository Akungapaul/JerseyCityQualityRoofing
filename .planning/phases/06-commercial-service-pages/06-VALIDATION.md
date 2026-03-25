---
phase: 6
slug: commercial-service-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.1 |
| **Config file** | vitest.config.ts |
| **Quick run command** | `pnpm vitest run` |
| **Full suite command** | `pnpm vitest run --reporter=verbose` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm vitest run`
- **After every plan wave:** Run `pnpm vitest run --reporter=verbose && pnpm type-check`
- **Before `/gsd:verify-work`:** Full suite must be green + `pnpm build` succeeds
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 1 | COMM-01 | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -x` | Exists (needs commercial entries) | ⬜ pending |
| 06-01-02 | 01 | 1 | COMM-02 | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -x` | Exists (needs commercial entries) | ⬜ pending |
| 06-01-03 | 01 | 1 | COMM-03 | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -x` | Exists (needs commercial entries) | ⬜ pending |
| 06-01-04 | 01 | 1 | COMM-04 | unit | `pnpm vitest run src/data/__tests__/service-content.test.ts -x` | Exists (needs commercial entries) | ⬜ pending |
| 06-02-01 | 02 | 1 | ALL | unit | `pnpm vitest run` | N/A (new component) | ⬜ pending |
| 06-03-01 | 03 | 2 | ALL | smoke | `pnpm build && pnpm type-check` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Extend `src/data/__tests__/service-content.test.ts` — add imports and entries for 4 commercial content files in STANDARD_CONTENTS and ALL_CONTENTS arrays
- [ ] Add commercial-specific voice test — content should reference "building owners", "property managers", "flat roof", "membrane" rather than residential terminology
- [ ] No new test file needed — existing test infrastructure covers all assertions

*Existing infrastructure covers most phase requirements. Wave 0 extends test arrays only.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Build succeeds with all 4 pages | ALL | Full Next.js build is a smoke test | `pnpm build` — verify exit 0 and no errors |
| Pages reachable at correct URLs | ALL | Route resolution requires running server | Start dev server, navigate to /services/commercial/[each-slug] |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
