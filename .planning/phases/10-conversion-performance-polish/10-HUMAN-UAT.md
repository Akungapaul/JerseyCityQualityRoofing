---
status: partial
phase: 10-conversion-performance-polish
source: [10-VERIFICATION.md]
started: 2026-03-31T03:05:00Z
updated: 2026-03-31T03:05:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Core Web Vitals — Lighthouse on heaviest page
expected: LCP < 2.5s, INP < 200ms, CLS < 0.1 on /services/residential/roof-repair/jersey-city/ (mobile)
result: [pending]

### 2. Core Web Vitals — Lighthouse on gallery page
expected: CLS < 0.1 (comparison sliders must not shift layout on load)
result: [pending]

### 3. Floating CTA scroll behavior
expected: Button appears bottom-right after scrolling past one viewport height; dismiss X hides it permanently
result: [pending]

### 4. Exit-intent popup trigger
expected: Popup with "Before You Go..." appears on /services/ pages after 5s + cursor to top of browser
result: [pending]

### 5. Exit-intent session persistence
expected: Popup never re-appears after dismiss within same browser session
result: [pending]

### 6. Gallery filter URL updates
expected: URL updates to ?service=X&city=Y, cards filter, Clear Filters resets, empty state on no-match
result: [pending]

### 7. Gallery comparison slider interaction
expected: Before/after images reveal on drag; keyboard arrows increment by 5%
result: [pending]

## Summary

total: 7
passed: 0
issues: 0
pending: 7
skipped: 0
blocked: 0

## Gaps
