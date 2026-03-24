# Deferred Items - Phase 04

## Pre-existing Lint Errors (Out of Scope)

1. **src/components/forms/compact-quote-form.tsx:164** - `react-hooks/refs` error: "Cannot access refs during render" on `handleSubmit(onSubmit)` where `onSubmit` references a ref. Phase 3 file, not modified in Phase 4.
2. **src/components/forms/quote-form.tsx:167** - Same `react-hooks/refs` error on `handleSubmit(onSubmit)`. Phase 3 file, not modified in Phase 4.

These errors exist in the codebase from Phase 3 and are not caused by Phase 4 changes. They should be addressed in a future fix pass.
