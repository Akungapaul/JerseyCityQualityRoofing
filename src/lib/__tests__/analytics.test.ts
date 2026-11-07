import { describe, it, expect, vi, afterEach } from "vitest";
import { trackGenerateLead } from "@/lib/analytics";

// CRO Phase 1 (2026-11-06, audit 2.2): the generate_lead event must
// carry the form variant, service type, page path, and the server
// lead ID so GA4 conversions can be reconciled with stored leads.
describe("trackGenerateLead (CRO Phase 1)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("calls gtag with the generate_lead event and all params", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });

    trackGenerateLead({
      formVariant: "full",
      serviceType: "Roof Repair",
      pagePath: "/contact",
      leadId: "JCQR-ABCDEF12",
    });

    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", {
      form_variant: "full",
      service_type: "Roof Repair",
      page_path: "/contact",
      lead_id: "JCQR-ABCDEF12",
    });
  });

  it("falls back to dataLayer.push when gtag is unavailable", () => {
    const dataLayer: Record<string, unknown>[] = [];
    vi.stubGlobal("window", { dataLayer });

    trackGenerateLead({
      formVariant: "compact",
      serviceType: "Roof Replacement",
      pagePath: "/roof-repair-jersey-city-nj",
      leadId: "JCQR-12345678",
    });

    expect(dataLayer).toHaveLength(1);
    expect(dataLayer[0]).toEqual({
      event: "generate_lead",
      form_variant: "compact",
      service_type: "Roof Replacement",
      page_path: "/roof-repair-jersey-city-nj",
      lead_id: "JCQR-12345678",
    });
  });

  it("is a no-op (does not throw) when window is undefined", () => {
    // Vitest runs in Node: window is undefined unless stubbed.
    expect(() =>
      trackGenerateLead({
        formVariant: "compact",
        serviceType: "Roof Repair",
        pagePath: "/",
        leadId: "JCQR-87654321",
      })
    ).not.toThrow();
  });
});
