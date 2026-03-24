import type { CostFactor } from "@/data/types";

interface CostFactorsSectionProps {
  factors: readonly CostFactor[];
  serviceName: string;
}

const impactBadgeClasses: Record<CostFactor["impact"], string> = {
  low: "bg-dominant text-text-secondary border border-secondary-lighter",
  moderate: "bg-dominant text-accent",
  high: "bg-dominant text-accent font-bold",
};

export function CostFactorsSection({
  factors,
  serviceName,
}: CostFactorsSectionProps) {
  return (
    <div>
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary">
        What Affects Your {serviceName} Cost
      </h2>
      <div className="divide-y divide-secondary-lighter mt-6">
        {factors.map((factor) => (
          <div
            key={factor.factor}
            className="flex items-start justify-between gap-4 py-4"
          >
            <div className="flex-1">
              <h3 className="text-lg font-heading font-bold text-text-primary">
                {factor.factor}
              </h3>
              <p className="text-lg text-text-secondary mt-1">
                {factor.description}
              </p>
            </div>
            <span
              className={`self-start ml-4 shrink-0 text-sm px-3 py-1 rounded-full uppercase ${impactBadgeClasses[factor.impact]}`}
            >
              {factor.impact}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
