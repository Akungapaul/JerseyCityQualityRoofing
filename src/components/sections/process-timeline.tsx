import type { ProcessStep } from "@/data/types";

interface ProcessTimelineProps {
  steps: readonly ProcessStep[];
  accentColor?: string;
}

export function ProcessTimeline({
  steps,
  accentColor = "bg-accent",
}: ProcessTimelineProps) {
  return (
    <div>
      {steps.map((step, index) => (
        <div key={step.step} className="flex gap-4">
          {/* Left column: step marker and connector line */}
          <div className="w-12 shrink-0 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-dominant ${accentColor}`}
            >
              {step.step}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 w-0.5 bg-secondary-lighter mt-2" />
            )}
          </div>

          {/* Right column: step content */}
          <div className={index < steps.length - 1 ? "flex-1 pb-8" : "flex-1"}>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-heading font-bold text-text-primary">
                {step.title}
              </h3>
              <span className="text-sm text-accent bg-secondary px-3 py-1 rounded-full">
                {step.duration}
              </span>
            </div>
            <p className="text-lg text-text-secondary mt-2 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
