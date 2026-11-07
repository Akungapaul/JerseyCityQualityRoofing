/**
 * Local-first quote form navigation (CRO Phase 3, 2026-11-06).
 *
 * Estimate CTAs used to route visitors to /contact even when the
 * current page already contained a quote form. These helpers let CTA
 * components scroll to the on-page form when one exists and fall back
 * to the contact page form only when it does not.
 *
 * Form element IDs on the site:
 * - "quote-form": the compact hero form (service pages, homepage) and
 *   the contact page's form section.
 * - "full-quote-form": the detailed QuoteForm (most pages).
 */

export const CONTACT_QUOTE_FORM_URL = "/contact#quote-form";

export function findQuoteFormElement(
  preferredIds: readonly string[] = ["quote-form", "full-quote-form"],
): HTMLElement | null {
  if (typeof document === "undefined") return null;
  for (const id of preferredIds) {
    const el = document.getElementById(id);
    if (el) return el;
  }
  return null;
}

/**
 * Smooth-scroll to the first on-page quote form found. Returns true
 * when a form was found (and scrolled to), false when the caller should
 * fall back to navigating to the contact page form.
 */
export function scrollToQuoteForm(
  preferredIds?: readonly string[],
): boolean {
  const el = findQuoteFormElement(preferredIds);
  if (!el) return false;
  const headerOffset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}
