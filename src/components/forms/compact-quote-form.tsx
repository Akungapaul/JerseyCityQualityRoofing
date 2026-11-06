"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import { compactQuoteSchema } from "@/lib/schemas/quote-form";
import { submitQuote } from "@/app/actions/submit-quote";
import { SERVICES } from "@/data/services";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { FormInput } from "@/components/forms/form-input";
import { FormSelect } from "@/components/forms/form-select";
import { SubmitButton } from "@/components/forms/submit-button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  TurnstileWidget,
  type TurnstileWidgetRef,
} from "@/components/forms/turnstile-widget";

interface CompactQuoteFormProps {
  defaultServiceType?: string;
  /**
   * Render the bare card without the SectionWrapper chrome. Use when the
   * form sits inside another section (the service-city hero), where the
   * wrapper's container padding + section padding would otherwise nest
   * inside the hero's own padding and crush the fields on mobile
   * (2026-11-06 mobile pass, finding S2).
   */
  embedded?: boolean;
}

const serviceOptions = Object.values(SERVICES).map((service) => ({
  value: service.name,
  label: service.name,
}));

export function CompactQuoteForm({
  defaultServiceType,
  embedded = false,
}: CompactQuoteFormProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const turnstileRef = useRef<TurnstileWidgetRef>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Mobile tap-collapse (Paul's standing direction, Oct 2026: the hero
  // form is minimized on mobile). On viewports <= 768px the form starts
  // collapsed to its heading + a "Get My Free Quote" tap target; one tap
  // expands the full form in place. Desktop is unaffected: isMobile only
  // becomes true after mount on a small viewport, and the collapsed state
  // never renders above 768px. The form fields (and the Turnstile widget)
  // mount only when expanded, so Turnstile never has to render hidden.
  const [isMobile, setIsMobile] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const collapsedOnMobile =
    isMobile && !mobileExpanded && formStatus === "idle";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(compactQuoteSchema),
    mode: "onBlur",
    defaultValues: {
      serviceType: defaultServiceType ?? "",
      name: "",
      phone: "",
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

  const onSubmit = async (data: Record<string, unknown>) => {
    setFormStatus("idle");

    const result = await submitQuote("compact", data, {
      sourceUrl: window.location.href,
      pageTitle: document.title,
    });

    // Reset Turnstile after every attempt (tokens are single-use)
    turnstileRef.current?.reset();

    if (result.success) {
      setFormStatus("success");
    } else {
      setFormStatus("error");
    }
  };

  const content = (
    <AnimatePresence mode="wait">
      {formStatus === "success" ? (
        <motion.div
          key="success"
          ref={successRef}
          tabIndex={-1}
          className="bg-secondary rounded-lg p-6 border-l-4 border-success outline-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <CheckCircle
              size={32}
              className="text-success"
              aria-hidden="true"
            />
            <h2 className="font-heading text-[1.75rem] font-bold text-text-primary">
              Thank You!
            </h2>
            <p className="font-body text-lg text-text-secondary">
              We&apos;ve received your request and will contact you within 24
              hours.
            </p>
            <p className="font-body text-lg text-text-secondary">
              Need immediate help? Call us at{" "}
              <a
                href={PHONE_HREF}
                className="text-accent hover:underline underline-offset-4"
              >
                {PHONE_NUMBER}
              </a>
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-secondary rounded-lg p-4 sm:p-6">
            <h2 className="font-heading text-[1.75rem] font-bold text-text-primary">
              Get Your Free Quote
            </h2>
            <p className="text-lg text-text-secondary mt-2">
              Quick response -- we&apos;ll call you back within 24 hours.
            </p>

            {collapsedOnMobile ? (
              <button
                type="button"
                onClick={() => setMobileExpanded(true)}
                aria-expanded={false}
                className={cn(
                  buttonVariants({ variant: "primary", size: "default" }),
                  "mt-4 w-full",
                )}
              >
                Get My Free Quote
                <ChevronDown size={20} aria-hidden="true" />
              </button>
            ) : (
              <motion.div
                initial={isMobile ? { height: 0, opacity: 0 } : false}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <AnimatePresence>
                  {formStatus === "error" && (
                    <motion.div
                      role="alert"
                      className="bg-destructive/10 rounded-md p-4 border-l-4 border-destructive mt-4"
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle
                          size={20}
                          className="text-destructive shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <p className="font-body text-lg text-text-primary">
                          Something went wrong. Please try again or call us
                          at{" "}
                          <a
                            href={PHONE_HREF}
                            className="text-accent hover:underline underline-offset-4"
                          >
                            {PHONE_NUMBER}
                          </a>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form
                  // eslint-disable-next-line react-hooks/refs -- handleSubmit only invokes onSubmit in event handler context, never during render
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className={cn(
                    "mt-4 grid grid-cols-1 gap-3",
                    // Embedded (hero card) lays out for the CARD's width,
                    // not the viewport's: stacked single column at every
                    // width, so fields never squeeze side-by-side inside
                    // the ~470px hero card (2026-11-06, finding A). The
                    // full-width homepage instance keeps its viewport row.
                    !embedded &&
                      "sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]",
                  )}
                >
                  <FormInput
                    label="Your Name"
                    required
                    placeholder="John Smith"
                    inputSize="compact"
                    autoComplete="name"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <FormInput
                    label="Phone Number"
                    required
                    type="tel"
                    placeholder="(201) 000-0000"
                    inputSize="compact"
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
                    inputSize="compact"
                    error={errors.serviceType?.message}
                    {...register("serviceType")}
                  />

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
                    onVerify={(token) => setValue("turnstileToken", token)}
                    onExpire={() => setValue("turnstileToken", "")}
                  />

                  <div className="flex items-end">
                    <SubmitButton
                      isSubmitting={isSubmitting}
                      variant="primary"
                      size="compact"
                      className={embedded ? "w-full" : "w-full lg:w-auto"}
                    >
                      Get Free Quote
                    </SubmitButton>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (embedded) {
    // Bare variant: the host section owns the spacing. Keep the
    // #quote-form anchor (header CTA + hero CTA scroll to it).
    return <div id="quote-form">{content}</div>;
  }

  return (
    <SectionWrapper tone="secondary" id="quote-form">
      {content}
    </SectionWrapper>
  );
}
