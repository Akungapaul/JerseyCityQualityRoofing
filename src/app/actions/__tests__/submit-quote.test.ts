import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the action's collaborators (CRO Phases 0/1, 2026-11-06):
// the action must generate a lead ID, store FIRST, then email, return
// no lead ID for honeypot submissions, and succeed when either
// channel captured the lead.
const mockStoreLead = vi.fn();
const mockSendLeadNotification = vi.fn();
const mockVerifyTurnstileToken = vi.fn();

vi.mock("next/headers", () => ({
  headers: vi.fn(async () => ({
    get: (name: string) =>
      name === "user-agent" ? "vitest-user-agent" : null,
  })),
}));

vi.mock("@/lib/turnstile", () => ({
  verifyTurnstileToken: (...args: unknown[]) =>
    mockVerifyTurnstileToken(...args),
}));

vi.mock("@/lib/email", () => ({
  sendLeadNotification: (...args: unknown[]) =>
    mockSendLeadNotification(...args),
}));

vi.mock("@/lib/lead-store", () => ({
  generateLeadId: () => "JCQR-TEST1234",
  storeLead: (...args: unknown[]) => mockStoreLead(...args),
}));

const { submitQuote } = await import("../submit-quote");

const METADATA = {
  sourceUrl: "/roof-repair-jersey-city-nj",
  pageTitle: "Roof Repair Jersey City, NJ",
};

const VALID_COMPACT: Record<string, unknown> = {
  name: "Jane Smith",
  phone: "(201) 555-0134",
  serviceType: "Roof Repair",
  turnstileToken: "valid-token",
  honeypot: "",
};

function dataWith(overrides: Record<string, unknown> = {}) {
  return { ...VALID_COMPACT, ...overrides };
}

describe("submitQuote (CRO Phases 0/1)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVerifyTurnstileToken.mockResolvedValue(true);
    mockStoreLead.mockResolvedValue({ stored: true, configured: true });
    mockSendLeadNotification.mockResolvedValue({
      success: true,
      messageId: "resend-msg-1",
    });
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("honeypot submission returns success with NO lead ID and touches no channel", async () => {
    const result = await submitQuote(
      "compact",
      dataWith({ honeypot: "http://spam.example" }),
      METADATA
    );
    expect(result.success).toBe(true);
    expect(result.leadId).toBeUndefined();
    expect(mockStoreLead).not.toHaveBeenCalled();
    expect(mockSendLeadNotification).not.toHaveBeenCalled();
  });

  it("valid submission returns the generated lead ID", async () => {
    const result = await submitQuote("compact", dataWith(), METADATA);
    expect(result.success).toBe(true);
    expect(result.leadId).toBe("JCQR-TEST1234");
  });

  it("stores the lead BEFORE sending the email notification", async () => {
    await submitQuote("compact", dataWith(), METADATA);
    expect(mockStoreLead).toHaveBeenCalledTimes(1);
    expect(mockSendLeadNotification).toHaveBeenCalledTimes(1);
    expect(mockStoreLead.mock.invocationCallOrder[0]).toBeLessThan(
      mockSendLeadNotification.mock.invocationCallOrder[0]
    );
  });

  it("passes the lead ID, source page, and user agent to both channels", async () => {
    await submitQuote("compact", dataWith(), METADATA);
    const storedLead = mockStoreLead.mock.calls[0][0];
    expect(storedLead.leadId).toBe("JCQR-TEST1234");
    expect(storedLead.sourceUrl).toBe("/roof-repair-jersey-city-nj");
    expect(storedLead.userAgent).toBe("vitest-user-agent");
    expect(storedLead.name).toBe("Jane Smith");
    expect(storedLead.formVariant).toBe("compact");

    const payload = mockSendLeadNotification.mock.calls[0][0];
    expect(payload.leadId).toBe("JCQR-TEST1234");
    expect(payload.sourceUrl).toBe("/roof-repair-jersey-city-nj");
  });

  it("logs the lead ID together with the captured Resend message ID", async () => {
    const logSpy = vi.spyOn(console, "log");
    await submitQuote("compact", dataWith(), METADATA);
    const lines = logSpy.mock.calls.map((call) => String(call[0]));
    const submission = lines
      .map((line) => {
        try {
          return JSON.parse(line) as Record<string, unknown>;
        } catch {
          return null;
        }
      })
      .find((entry) => entry?.event === "lead_submission");
    expect(submission).toBeDefined();
    expect(submission?.leadId).toBe("JCQR-TEST1234");
    expect(submission?.resendMessageId).toBe("resend-msg-1");
  });

  it("fails when Turnstile verification fails", async () => {
    mockVerifyTurnstileToken.mockResolvedValue(false);
    const result = await submitQuote("compact", dataWith(), METADATA);
    expect(result.success).toBe(false);
    expect(mockStoreLead).not.toHaveBeenCalled();
    expect(mockSendLeadNotification).not.toHaveBeenCalled();
  });

  it("fails validation for a missing name", async () => {
    const result = await submitQuote(
      "compact",
      dataWith({ name: "" }),
      METADATA
    );
    expect(result.success).toBe(false);
    expect(result.error).toBe("Please check your form and try again.");
    expect(mockStoreLead).not.toHaveBeenCalled();
  });

  it("still succeeds when the email fails but the lead was stored", async () => {
    mockSendLeadNotification.mockResolvedValue({
      success: false,
      error: "Resend down",
    });
    const result = await submitQuote("compact", dataWith(), METADATA);
    expect(result.success).toBe(true);
    expect(result.leadId).toBe("JCQR-TEST1234");
  });

  it("still succeeds when the store is unconfigured but the email went out", async () => {
    mockStoreLead.mockResolvedValue({ stored: false, configured: false });
    const result = await submitQuote("compact", dataWith(), METADATA);
    expect(result.success).toBe(true);
    expect(result.leadId).toBe("JCQR-TEST1234");
  });

  it("fails when BOTH channels fail to capture the lead", async () => {
    mockStoreLead.mockResolvedValue({
      stored: false,
      configured: true,
      error: "db down",
    });
    mockSendLeadNotification.mockResolvedValue({
      success: false,
      error: "Resend down",
    });
    const result = await submitQuote("compact", dataWith(), METADATA);
    expect(result.success).toBe(false);
    expect(result.error).toBe(
      "We could not deliver your request. Please try again."
    );
    expect(result.leadId).toBeUndefined();
  });
});
