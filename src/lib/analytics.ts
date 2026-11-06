/**
 * GA4 conversion events (CRO Phase 1, 2026-11-06).
 *
 * Before this module, GA4 was loaded and configured in the root layout
 * but no code anywhere fired an event, so a form conversion rate could
 * not be measured at all. `trackGenerateLead` fires exactly one
 * `generate_lead` event per server-confirmed lead. Callers must only
 * invoke it after the submitQuote Server Action returns success WITH a
 * lead ID -- never on failure, and never for honeypot submissions (the
 * action returns success without a lead ID for those).
 *
 * Parameters are non-personal only: form variant, service type, page
 * path, and the lead ID that joins the event to the stored lead record.
 */

export interface GenerateLeadParams {
  formVariant: "compact" | "full";
  serviceType: string;
  pagePath: string;
  leadId: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackGenerateLead(params: GenerateLeadParams): void {
  if (typeof window === "undefined") return;

  const eventParams = {
    form_variant: params.formVariant,
    service_type: params.serviceType,
    page_path: params.pagePath,
    lead_id: params.leadId,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", eventParams);
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: "generate_lead", ...eventParams });
}
