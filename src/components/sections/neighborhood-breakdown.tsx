import type { NeighborhoodSection } from "@/data/types";

interface NeighborhoodBreakdownProps {
  neighborhoods: NeighborhoodSection[];
  cityName: string;
}

export function NeighborhoodBreakdown({
  neighborhoods,
  cityName,
}: NeighborhoodBreakdownProps) {
  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary">
        Neighborhood Roofing Guide: {cityName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {neighborhoods.map((neighborhood) => (
          <div
            key={neighborhood.name}
            className="bg-secondary rounded-lg p-6 border border-[#4a5040]"
          >
            <h3 className="text-lg font-heading font-bold text-text-primary">
              {neighborhood.name}
            </h3>
            <p className="text-lg text-text-secondary mt-2">
              {neighborhood.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {neighborhood.commonRoofTypes.map((type) => (
                <span
                  key={type}
                  className="inline-flex bg-dominant rounded-full px-3 py-1 text-text-secondary text-[0.875rem]"
                >
                  {type}
                </span>
              ))}
            </div>
            <div className="mt-3">
              <span className="text-text-secondary text-[0.875rem] font-bold uppercase tracking-wider">
                Key Challenge
              </span>
              <p className="text-lg text-accent mt-1">
                {neighborhood.keyChallenge}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
