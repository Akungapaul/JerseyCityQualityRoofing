import { Resend } from "resend";
import { LeadNotification } from "@/components/emails/lead-notification";
import type { LeadNotificationPayload } from "@/types/form";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotification(
  payload: LeadNotificationPayload,
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  const recipient =
    process.env.NOTIFICATION_EMAIL || "info@jerseycityqualityroofing.com";

  try {
    // NOTE (CRO 2026-11-06): the from address stays on Resend's shared
    // onboarding@resend.dev sender until the business domain is verified
    // in the Resend account. Verifying the domain is an account action
    // for Paul; do not point this at an unverified domain or sends fail.
    const { data, error } = await resend.emails.send({
      from: "Jersey City Quality Roofing <onboarding@resend.dev>",
      to: [recipient],
      subject: `New Lead [${payload.leadId}]: ${payload.serviceType} - ${payload.name}`,
      react: LeadNotification(payload),
    });

    if (error) {
      console.error("[Email] Resend error:", error);
      return { success: false, error: error.message };
    }

    // Capture the Resend message ID (previously discarded) so a lead
    // can be reconciled in Resend against its lead ID.
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error("[Email] Send failed:", error);
    return { success: false, error: "Email delivery failed" };
  }
}
