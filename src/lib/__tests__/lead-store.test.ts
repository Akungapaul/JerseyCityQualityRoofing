import { describe, it, expect, vi, afterEach } from "vitest";
import {
  generateLeadId,
  isLeadStoreConfigured,
  storeLead,
} from "@/lib/lead-store";
import type { LeadNotificationPayload } from "@/types/form";

const SAMPLE_LEAD: LeadNotificationPayload = {
  leadId: "JCQR-TEST1234",
  name: "Jane Smith",
  phone: "2015550134",
  serviceType: "Roof Repair",
  email: "jane@example.com",
  address: "123 Main St",
  message: "Leak.",
  sourceUrl: "/contact",
  pageTitle: "Contact",
  timestamp: "2026-11-06T12:00:00.000Z",
  formVariant: "full",
  userAgent: "vitest",
};

describe("lead-store (CRO Phase 0)", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("generates JCQR- prefixed IDs with 8 hex characters", () => {
    for (let i = 0; i < 50; i++) {
      expect(generateLeadId()).toMatch(/^JCQR-[0-9A-F]{8}$/);
    }
  });

  it("generates unique IDs in practice", () => {
    const ids = new Set(Array.from({ length: 500 }, () => generateLeadId()));
    expect(ids.size).toBe(500);
  });

  it("isLeadStoreConfigured is false without LEAD_DATABASE_URL", () => {
    vi.stubEnv("LEAD_DATABASE_URL", "");
    expect(isLeadStoreConfigured()).toBe(false);
  });

  it("storeLead reports unconfigured and does not throw without the env", async () => {
    vi.stubEnv("LEAD_DATABASE_URL", "");
    const result = await storeLead(SAMPLE_LEAD);
    expect(result.configured).toBe(false);
    expect(result.stored).toBe(false);
  });
});
