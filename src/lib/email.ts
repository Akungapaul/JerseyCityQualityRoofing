import { Resend } from "resend";
import { LeadNotification } from "@/components/emails/lead-notification";
import type { LeadNotificationPayload } from "@/types/form";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotification(
  payload: LeadNotificationPayload,
): Promise<{ success: boolean; error?: string }> {
  const recipient =
    process.env.NOTIFICATION_EMAIL || "info@jerseycityqualityroofing.com";

  try {
    const { error } = await resend.emails.send({
      from: "Jersey City Quality Roofing <onboarding@resend.dev>",
      to: [recipient],
      subject: `New Lead: ${payload.serviceType} - ${payload.name}`,
      react: LeadNotification(payload),
    });

    if (error) {
      console.error("[Email] Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("[Email] Send failed:", error);
    return { success: false, error: "Email delivery failed" };
  }
}
