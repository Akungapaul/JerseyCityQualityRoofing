import { z } from "zod";

// Flexible US phone regex per D-17: accepts (201) 555-0123, 201-555-0123, 2015550123, +1 201 555 0123
const phoneRegex = /^[+]?1?\s*[-.]?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

// Strip all non-digit characters, keep only digits per D-17
function normalizePhone(val: string): string {
  const digits = val.replace(/\D/g, "");
  // Remove leading 1 if 11 digits (US country code)
  return digits.length === 11 && digits.startsWith("1")
    ? digits.slice(1)
    : digits;
}

// Shared field schemas
const nameField = z.string().min(2, "Name must be at least 2 characters").max(100);
const phoneField = z
  .string()
  .regex(phoneRegex, "Please enter a valid phone number")
  .transform(normalizePhone)
  .refine((digits) => digits.length === 10, { message: "Phone number must be 10 digits" })
  .refine((digits) => !/^(\d)\1{9}$/.test(digits), { message: "Please enter a valid phone number" });
const serviceTypeField = z.string().min(1, "Please select a service type");
// D-21: honeypot -- any content means bot
const honeypotField = z.string().max(0).optional();
const turnstileTokenField = z.string().min(1, "Security verification required");

// Compact form: 3 required fields per D-02, D-16
export const compactQuoteSchema = z.object({
  name: nameField,
  phone: phoneField,
  serviceType: serviceTypeField,
  honeypot: honeypotField,
  turnstileToken: turnstileTokenField,
});

// Full form: 6 fields (3 required + 3 optional) per D-03, D-16
export const fullQuoteSchema = z.object({
  name: nameField,
  phone: phoneField,
  serviceType: serviceTypeField,
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  address: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
  honeypot: honeypotField,
  turnstileToken: turnstileTokenField,
});

export type CompactQuoteFormData = z.infer<typeof compactQuoteSchema>;
export type FullQuoteFormData = z.infer<typeof fullQuoteSchema>;
