import type { Landmark } from "@/data/types";

interface CityLandmarksSectionProps {
  narrative: string;
  landmarks: Landmark[];
  cityName: string;
}

export function CityLandmarksSection({
  narrative,
  landmarks,
  cityName,
}: CityLandmarksSectionProps) {
  const paragraphs = narrative.includes("\n\n")
    ? narrative.split("\n\n")
    : [narrative];

  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary">
        Local Landmarks &amp; Roofing Heritage in {cityName}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-lg text-text-secondary leading-relaxed mt-4"
        >
          {paragraph}
        </p>
      ))}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {landmarks.map((landmark) => (
          <div
            key={landmark.name}
            className="bg-dominant rounded-lg p-5 border border-[#4a5040]"
          >
            <h3 className="text-lg font-heading font-bold text-text-primary">
              {landmark.name}
            </h3>
            <p className="text-lg text-text-secondary mt-2">
              {landmark.description}
            </p>
            <span className="inline-flex mt-3 bg-secondary rounded-full px-3 py-1 text-accent text-[0.875rem] font-bold">
              {landmark.significance}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
