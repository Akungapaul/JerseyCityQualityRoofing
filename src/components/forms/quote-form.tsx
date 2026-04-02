"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { fullQuoteSchema } from "@/lib/schemas/quote-form";
import { submitQuote } from "@/app/actions/submit-quote";
import { SERVICES } from "@/data/services";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { FormInput } from "@/components/forms/form-input";
import { FormSelect } from "@/components/forms/form-select";
import { FormTextarea } from "@/components/forms/form-textarea";
import { SubmitButton } from "@/components/forms/submit-button";
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

export function QuoteForm({ defaultServiceType }: QuoteFormProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
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

  const onSubmit = async (data: Record<string, unknown>) => {
    setFormStatus("idle");

    const result = await submitQuote("full", data, {
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

  return (
    <SectionWrapper tone="secondary" id="full-quote-form">
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
            <div className="bg-secondary rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="font-heading text-[1.75rem] font-bold text-text-primary">
                Request a Detailed Quote
              </h2>
              <p className="text-lg text-text-secondary mt-2">
                Tell us about your project and we&apos;ll prepare a
                comprehensive estimate.
              </p>

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
                        Something went wrong. Please try again or call us at{" "}
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
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <FormInput
                  label="Your Name"
                  required
                  placeholder="John Smith"
                  error={errors.name?.message}
                  {...register("name")}
                />
                <FormInput
                  label="Phone Number"
                  required
                  type="tel"
                  placeholder="(201) 555-0123"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <FormSelect
                  label="Service Type"
                  required
                  options={serviceOptions}
                  placeholder="Select a service"
                  error={errors.serviceType?.message}
                  {...register("serviceType")}
                />
                <div className="sm:col-span-2">
                  <FormInput
                    label="Property Address"
                    placeholder="123 Main St, Jersey City, NJ"
                    error={errors.address?.message}
                    {...register("address")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FormTextarea
                    label="Tell Us About Your Project"
                    placeholder="Describe the work you need done, any issues you've noticed, or questions you have..."
                    error={errors.message?.message}
                    {...register("message")}
                  />
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
                  onVerify={(token) => setValue("turnstileToken", token)}
                  onExpire={() => setValue("turnstileToken", "")}
                />

                <div className="sm:col-span-2">
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    variant="primary"
                    size="default"
                  >
                    Request Free Quote
                  </SubmitButton>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
