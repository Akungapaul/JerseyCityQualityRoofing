import type { HousingStock } from "@/data/types";

interface HousingStockSectionProps {
  narrative: string;
  housingStock: HousingStock;
  cityName: string;
}

export function HousingStockSection({
  narrative,
  housingStock,
  cityName,
}: HousingStockSectionProps) {
  const paragraphs = narrative.includes("\n\n")
    ? narrative.split("\n\n")
    : [narrative];

  const stats = [
    { value: `${housingStock.medianAge} Years`, label: "Median Home Age" },
    {
      value: housingStock.totalUnits.toLocaleString(),
      label: "Housing Units",
    },
    { value: `${housingStock.ownerOccupied}%`, label: "Owner Occupied" },
    { value: `${housingStock.renterOccupied}%`, label: "Renter Occupied" },
  ];

  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary">
        Housing &amp; Architecture in {cityName}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-lg text-text-secondary leading-relaxed mt-4"
        >
          {paragraph}
        </p>
      ))}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-dominant rounded-lg p-5 border border-[#4a5040]"
          >
            <p className="text-[1.75rem] font-heading font-bold text-accent">
              {stat.value}
            </p>
            <p className="text-lg text-text-secondary mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-6">
        {housingStock.dominantTypes.map((type) => (
          <span
            key={type}
            className="inline-flex bg-secondary rounded-full px-3 py-1 text-lg text-text-secondary"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
