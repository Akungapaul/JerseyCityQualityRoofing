export interface ActionResult {
  success: boolean;
  error?: string;
}

export interface LeadNotificationPayload {
  name: string;
  phone: string;
  serviceType: string;
  email?: string;
  address?: string;
  message?: string;
  sourceUrl: string;
  pageTitle: string;
  timestamp: string;
  formVariant: "compact" | "full";
}
