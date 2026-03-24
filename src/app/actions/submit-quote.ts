"use server";

import { compactQuoteSchema, fullQuoteSchema } from "@/lib/schemas/quote-form";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendLeadNotification } from "@/lib/email";
import type { ActionResult, LeadNotificationPayload } from "@/types/form";

export async function submitQuote(
  formVariant: "compact" | "full",
  data: Record<string, unknown>,
  metadata: { sourceUrl: string; pageTitle: string },
): Promise<ActionResult> {
  // 1. Honeypot check -- silent success to not reveal detection
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
      error: "Security verification failed. Please try again.",
    };
  }

  // 4. Build notification payload
  const payload: LeadNotificationPayload = {
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
  };

  // 5. Send email notification
  const emailResult = await sendLeadNotification(payload);
  if (!emailResult.success) {
    return {
      success: false,
      error: "Something went wrong. Please try again or call us.",
    };
  }

  // 6. Return success
  return { success: true };
}
