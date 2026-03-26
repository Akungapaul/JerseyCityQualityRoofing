import type { NeighborhoodServiceInsight } from "@/data/types";

interface NeighborhoodServiceInsightsProps {
  neighborhoods: NeighborhoodServiceInsight[];
  serviceName: string;
  cityName: string;
}

export function NeighborhoodServiceInsights({
  neighborhoods,
  serviceName,
  cityName,
}: NeighborhoodServiceInsightsProps) {
  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
        {serviceName} Across {cityName} Neighborhoods
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {neighborhoods.map((n) => (
          <div
            key={n.neighborhoodName}
            className="bg-secondary rounded-lg p-6 border border-[#4a5040]"
          >
            <h3 className="text-lg font-heading font-bold text-text-primary">
              {n.neighborhoodName}
            </h3>
            <p className="text-lg text-text-secondary mt-2">{n.insight}</p>
            <p className="text-[0.875rem] font-bold uppercase tracking-wider text-text-secondary mt-4">
              Most Common Issue
            </p>
            <p className="text-lg text-accent mt-1">{n.commonIssue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
