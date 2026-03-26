import { GoogleMapEmbed } from "@/components/sections/google-map-embed";

interface LocalExpertiseSectionProps {
  narrative: string;
  cityName: string;
  citySlug: string;
}

export function LocalExpertiseSection({
  narrative,
  cityName,
}: LocalExpertiseSectionProps) {
  const paragraphs = narrative.includes("\n\n")
    ? narrative.split("\n\n")
    : [narrative];

  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary">
        Local Roofing Expertise in {cityName}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-lg text-text-secondary leading-relaxed mt-4"
        >
          {paragraph}
        </p>
      ))}
      <GoogleMapEmbed
        query={`${cityName}, NJ`}
        title={`Map of ${cityName}`}
        zoom={13}
        className="mt-8 rounded-lg overflow-hidden"
      />
    </div>
  );
}
