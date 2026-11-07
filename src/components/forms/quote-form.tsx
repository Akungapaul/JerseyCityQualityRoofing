"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { fullQuoteSchema } from "@/lib/schemas/quote-form";
import { submitQuote } from "@/app/actions/submit-quote";
import { trackGenerateLead } from "@/lib/analytics";
import { SERVICES } from "@/data/services";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { FormInput } from "@/components/forms/form-input";
import { FormSelect } from "@/components/forms/form-select";
import { FormTextarea } from "@/components/forms/form-textarea";
import { SubmitButton } from "@/components/forms/submit-button";
import {
  FormErrorBanner,
  FormPrivacyNote,
  FormSuccessPanel,
  FormTurnstileError,
} from "@/components/forms/form-result-panels";
import { cn } from "@/lib/utils";
import {
  TurnstileWidget,
  type TurnstileWidgetRef,
} from "@/components/forms/turnstile-widget";

interface QuoteFormProps {
  defaultServiceType?: string;
}

const serviceOptions = Object.values(SERVICES).map((service) => ({
  value: service.name,
  label: service.name,
}));

const TURNSTILE_ERROR_MESSAGE =
  "The security check did not finish. Please wait a moment and try again, or reload the page.";

export function QuoteForm({ defaultServiceType }: QuoteFormProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  // CRO Phase 2 (2026-11-06): server error passthrough + visible
  // Turnstile failure state; CRO Phase 1: lead ID for the reference
  // display and the GA4 generate_lead event.
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  // CRO Phase 5 / audit 5.4: progressive disclosure. The required
  // fields (name, phone, service) stay visible; the optional fields
  // (email, address, project details) sit behind an "Add details
  // (optional)" expander. The optional fields stay MOUNTED while
  // collapsed (hidden with CSS) so react-hook-form values and
  // validation are unaffected.
  const [showDetails, setShowDetails] = useState(false);
  const turnstileRef = useRef<TurnstileWidgetRef>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(fullQuoteSchema),
    mode: "onBlur",
    defaultValues: {
      serviceType: defaultServiceType ?? "",
      name: "",
      phone: "",
      email: "",
      address: "",
      message: "",
      honeypot: "",
      turnstileToken: "",
    },
  });

  // Focus management: focus the success container on success
  useEffect(() => {
    if (formStatus === "success" && successRef.current) {
      successRef.current.focus();
    }
  }, [formStatus]);

  // If validation fails on a collapsed optional field, expand the
  // details section so the visitor can actually see the error.
  useEffect(() => {
    if (errors.email || errors.address || errors.message) {
      setShowDetails(true);
    }
  }, [errors.email, errors.address, errors.message]);

  const onSubmit = async (data: Record<string, unknown>) => {
    setFormStatus("idle");
    setServerError(null);

    try {
      const result = await submitQuote("full", data, {
        sourceUrl: window.location.href,
        pageTitle: document.title,
      });

      // Reset Turnstile after every attempt (tokens are single-use)
      turnstileRef.current?.reset();

      if (result.success) {
        setLeadId(result.leadId ?? null);
        // Fire generate_lead ONLY for a real, server-confirmed lead
        // (honeypot successes return no leadId and fire nothing).
        if (result.leadId) {
          trackGenerateLead({
            formVariant: "full",
            serviceType: String(data.serviceType ?? ""),
            pagePath: window.location.pathname,
            leadId: result.leadId,
          });
        }
        setFormStatus("success");
      } else {
        setServerError(
          result.error ?? "Something went wrong. Please try again.",
        );
        setFormStatus("error");
      }
    } catch {
      turnstileRef.current?.reset();
      setServerError(
        "Something went wrong while sending your request. Please try again.",
      );
      setFormStatus("error");
    }
  };

  return (
    <SectionWrapper tone="secondary" id="full-quote-form">
      <AnimatePresence mode="wait">
        {formStatus === "success" ? (
          <FormSuccessPanel key="success" ref={successRef} leadId={leadId} />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-secondary rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="font-heading text-[1.75rem] font-bold text-text-primary">
                Request a Detailed Quote
              </h2>
              <p className="text-lg text-text-secondary mt-2">
                Tell us about your project and we&apos;ll prepare a
                comprehensive estimate. We&apos;ll call you back within 24
                hours. Every estimate is free and includes a full roof
                inspection and a written, itemized proposal.
              </p>

              <AnimatePresence>
                {formStatus === "error" && (
                  <FormErrorBanner
                    message={
                      serverError ?? "Something went wrong. Please try again."
                    }
                  />
                )}
              </AnimatePresence>

              <form
                // eslint-disable-next-line react-hooks/refs -- handleSubmit only invokes onSubmit in event handler context, never during render
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <FormInput
                  label="Your Name"
                  required
                  placeholder="John Smith"
                  autoComplete="name"
                  error={errors.name?.message}
                  {...register("name")}
                />
                <FormInput
                  label="Phone Number"
                  required
                  type="tel"
                  placeholder="(201) 000-0000"
                  autoComplete="tel"
                  inputMode="tel"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
                <FormSelect
                  label="Service Type"
                  required
                  options={serviceOptions}
                  placeholder="Select a service"
                  error={errors.serviceType?.message}
                  {...register("serviceType")}
                />

                {/* Optional details toggle (progressive disclosure) */}
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => setShowDetails((prev) => !prev)}
                    aria-expanded={showDetails}
                    className="inline-flex items-center gap-2 font-body text-lg font-bold text-accent hover:underline underline-offset-4 min-h-[44px]"
                  >
                    Add details (optional)
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={cn(
                        "transition-transform duration-300",
                        showDetails && "rotate-180",
                      )}
                    />
                  </button>
                </div>

                {/* Optional fields: mounted but hidden while collapsed,
                    so values and validation keep working. */}
                <div
                  className={cn(
                    "sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4",
                    !showDetails && "hidden",
                  )}
                >
                  <FormInput
                    label="Email Address (Optional)"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    inputMode="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                  <FormInput
                    label="Property Address (Optional)"
                    placeholder="123 Main St, Jersey City, NJ"
                    autoComplete="street-address"
                    error={errors.address?.message}
                    {...register("address")}
                  />
                  <div className="sm:col-span-2">
                    <FormTextarea
                      label="Tell Us About Your Project (Optional)"
                      placeholder="Describe the work you need done, any issues you've noticed, or questions you have..."
                      error={errors.message?.message}
                      {...register("message")}
                    />
                  </div>
                </div>

                {/* Honeypot -- invisible to humans and screen readers */}
                <input
                  type="text"
                  {...register("honeypot")}
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden"
                  name="website"
                />

                <TurnstileWidget
                  ref={turnstileRef}
                  onVerify={(token) => {
                    setTurnstileError(null);
                    setValue("turnstileToken", token);
                  }}
                  onExpire={() => setValue("turnstileToken", "")}
                  onError={() => {
                    setValue("turnstileToken", "");
                    setTurnstileError(TURNSTILE_ERROR_MESSAGE);
                  }}
                />
                <FormTurnstileError
                  message={turnstileError ?? errors.turnstileToken?.message}
                />

                <div className="sm:col-span-2">
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    variant="primary"
                    size="default"
                    className="w-full sm:w-auto"
                  >
                    Request Free Quote
                  </SubmitButton>
                </div>

                <FormPrivacyNote />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
