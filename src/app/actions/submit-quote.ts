"use server";

import { headers } from "next/headers";
import { compactQuoteSchema, fullQuoteSchema } from "@/lib/schemas/quote-form";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendLeadNotification } from "@/lib/email";
import { generateLeadId, storeLead } from "@/lib/lead-store";
import type { ActionResult, LeadNotificationPayload } from "@/types/form";

export async function submitQuote(
  formVariant: "compact" | "full",
  data: Record<string, unknown>,
  metadata: { sourceUrl: string; pageTitle: string },
): Promise<ActionResult> {
  // 1. Honeypot check -- silent success to not reveal detection.
  // No leadId is returned, so the client shows no reference number and
  // fires no GA4 generate_lead event for a discarded bot submission.
  if (data.honeypot) {
    return { success: true };
  }

  // 2. Server-side Zod validation
  const schema =
    formVariant === "compact" ? compactQuoteSchema : fullQuoteSchema;
  const result = schema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Please check your form and try again." };
  }

  // 3. Turnstile verification
  const turnstileValid = await verifyTurnstileToken(
    result.data.turnstileToken,
  );
  if (!turnstileValid) {
    return {
      success: false,
      error:
        "Security verification failed. Please complete the security check and try again.",
    };
  }

  // 4. Assign the lead ID that joins the stored record, the
  // notification email, the server log, and the GA4 generate_lead event.
  const leadId = generateLeadId();
  const userAgent = (await headers()).get("user-agent") ?? undefined;

  // 5. Build the lead payload
  const payload: LeadNotificationPayload = {
    leadId,
    name: result.data.name,
    phone: result.data.phone,
    serviceType: result.data.serviceType,
    email: "email" in result.data ? (result.data.email as string) : undefined,
    address:
      "address" in result.data ? (result.data.address as string) : undefined,
    message:
      "message" in result.data ? (result.data.message as string) : undefined,
    sourceUrl: metadata.sourceUrl,
    pageTitle: metadata.pageTitle,
    timestamp: new Date().toISOString(),
    formVariant,
    userAgent,
  };

  // 6. Store FIRST (durable record when LEAD_DATABASE_URL is set),
  // then send the email as a notification of that record. When the
  // store is not configured this preserves the previous email-only
  // behavior, with the lead ID carried in the email and the log.
  const storeResult = await storeLead(payload);
  const emailResult = await sendLeadNotification(payload);

  // Structured log line: one per real lead, keyed by lead ID, with the
  // Resend message ID captured instead of discarded.
  console.log(
    JSON.stringify({
      event: "lead_submission",
      leadId,
      formVariant,
      serviceType: payload.serviceType,
      sourceUrl: payload.sourceUrl,
      timestamp: payload.timestamp,
      stored: storeResult.stored,
      storeConfigured: storeResult.configured,
      emailSuccess: emailResult.success,
      resendMessageId: emailResult.messageId ?? null,
    }),
  );

  // 7. The lead counts as captured when it is durable in the store OR
  // the notification email was accepted. If one channel failed, raise
  // an operator alert in the log against the lead ID -- the visitor is
  // not punished for a notification failure after a successful store.
  if (!storeResult.stored || !emailResult.success) {
    console.error(
      JSON.stringify({
        event: "lead_channel_failure",
        leadId,
        stored: storeResult.stored,
        storeError: storeResult.error ?? null,
        emailSuccess: emailResult.success,
        emailError: emailResult.error ?? null,
        resendMessageId: emailResult.messageId ?? null,
      }),
    );
  }

  if (!storeResult.stored && !emailResult.success) {
    return {
      success: false,
      // The form's error banner appends the email fallback
      // (info@jerseycityqualityroofing.com) to every server error.
      error: "We could not deliver your request. Please try again.",
    };
  }

  // 8. Return success with the lead ID for the reference display + GA4.
  return { success: true, leadId };
}
