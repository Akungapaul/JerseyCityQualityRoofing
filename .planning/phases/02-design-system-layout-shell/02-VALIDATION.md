---
phase: 2
slug: design-system-layout-shell
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest 4.1.1 (already installed from Phase 1) |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `pnpm vitest run --reporter=verbose` |
| **Full suite command** | `pnpm vitest run --reporter=verbose` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm vitest run --reporter=verbose`
- **After every plan wave:** Run `pnpm vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | FNDN-05 | visual | Manual HTML review | N/A | ⬜ pending |
| 02-01-02 | 01 | 1 | FNDN-06 | unit | `pnpm vitest run` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | UX-01, UX-02 | unit+a11y | `pnpm vitest run` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 1 | UX-03, UX-04 | unit+a11y | `pnpm vitest run` | ❌ W0 | ⬜ pending |
| 02-02-03 | 02 | 1 | CRO-02, CRO-04 | unit | `pnpm vitest run` | ❌ W0 | ⬜ pending |
| 02-03-01 | 03 | 2 | SEO-06 | unit | `pnpm vitest run` | ❌ W0 | ⬜ pending |
| 02-03-02 | 03 | 2 | UX-05, UX-06 | unit | `pnpm vitest run` | ❌ W0 | ⬜ pending |
| 02-03-03 | 03 | 2 | UX-08 | unit | `pnpm vitest run` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Test infrastructure already exists from Phase 1 (vitest 4.1.1)
- [ ] Component test utilities may need `@testing-library/react` if not installed
- [ ] Breadcrumb JSON-LD output tests (schema-dts validation)
- [ ] Navigation accessibility tests (keyboard nav, aria-expanded states)

*Existing infrastructure covers framework setup. Component-specific test files created per plan.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Color palette approval | FNDN-05 | Subjective visual review | Review 10 HTML color variation files, approve one |
| Typography rendering | FNDN-05 | Visual verification across viewports | Check Cormorant Garamond renders at 18px+ on mobile/tablet/desktop |
| Sticky header scroll behavior | UX-01 | Scroll interaction | Scroll page, verify header shrinks and phone number remains visible |
| Mega-menu flyout | UX-03 | Interactive behavior | Hover/click nav items, verify mega-menu opens with silo links |
| Mobile overlay navigation | UX-04 | Touch interaction | Tap hamburger, verify full-screen overlay with accordion sections |
| WCAG AA contrast | UX-08 | Color contrast tool | Run contrast checker on all text/background combinations |
| Motion reduced-motion | D-18 | OS setting toggle | Enable reduced-motion in OS, verify animations disabled |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
