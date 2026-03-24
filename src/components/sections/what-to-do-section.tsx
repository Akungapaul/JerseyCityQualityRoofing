import { Phone } from "lucide-react";
import type { EmergencyStep } from "@/data/types";

interface WhatToDoSectionProps {
  steps: readonly EmergencyStep[];
  phoneNumber: string;
  phoneHref: string;
}

export function WhatToDoSection({
  steps,
  phoneNumber,
  phoneHref,
}: WhatToDoSectionProps) {
  return (
    <div>
      {/* Section heading */}
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary">
        What To Do Right Now
      </h2>
      <p className="text-lg text-text-secondary mt-2">
        If you have an active roof emergency, follow these steps:
      </p>

      {/* Numbered steps */}
      <ol className="mt-6 space-y-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex items-start gap-4 py-3">
            {/* Number circle */}
            <span
              className="w-8 h-8 rounded-full bg-[#d4782f] text-dominant font-bold flex items-center justify-center shrink-0 text-sm"
              aria-hidden="true"
            >
              {index + 1}
            </span>

            {/* Step content */}
            <div className="flex-1">
              <h3 className="text-lg font-heading font-bold text-text-primary">
                {step.title}
              </h3>
              <p className="text-lg text-text-secondary mt-1">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Emergency CTA */}
      <div className="mt-6 text-center">
        <p className="text-lg text-text-primary">
          Don&apos;t wait &mdash; call us now:
        </p>
        <div className="mt-2">
          <a
            href={phoneHref}
            className="text-[1.75rem] font-heading text-[#d4782f] font-bold hover:opacity-80 transition-opacity"
          >
            {phoneNumber}
          </a>
        </div>
        <div className="mt-4">
          <a
            href={phoneHref}
            className="inline-flex items-center justify-center bg-[#d4782f] hover:bg-[#e08a3f] text-dominant font-bold px-8 py-3 min-h-[44px] rounded-lg transition-colors duration-[150ms] focus-ring"
          >
            <Phone size={20} strokeWidth={1.5} aria-hidden="true" className="mr-2" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
