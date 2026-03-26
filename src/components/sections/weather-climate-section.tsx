import {
  Snowflake,
  CloudRain,
  Thermometer,
  Wind,
  AlertTriangle,
  Cloud,
} from "lucide-react";
import type { WeatherData } from "@/data/types";

interface WeatherClimateSectionProps {
  narrative: string;
  weather: WeatherData;
  cityName: string;
}

export function WeatherClimateSection({
  narrative,
  weather,
  cityName,
}: WeatherClimateSectionProps) {
  const paragraphs = narrative.includes("\n\n")
    ? narrative.split("\n\n")
    : [narrative];

  const weatherStats = [
    {
      icon: Snowflake,
      value: `${weather.annualSnowfall} inches`,
      label: "Annual Snowfall",
    },
    {
      icon: CloudRain,
      value: `${weather.annualRainfall} inches`,
      label: "Annual Rainfall",
    },
    {
      icon: Thermometer,
      value: `${weather.avgSummerHigh}\u00B0F`,
      label: "Average Summer High",
    },
    {
      icon: Wind,
      value: `${weather.avgWinterLow}\u00B0F`,
      label: "Average Winter Low",
    },
    {
      icon: AlertTriangle,
      value:
        weather.hurricaneRisk.charAt(0).toUpperCase() +
        weather.hurricaneRisk.slice(1),
      label: "Hurricane Risk",
    },
    {
      icon: Cloud,
      value: weather.norEasterFrequency,
      label: "Nor'easter Frequency",
    },
  ];

  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary">
        Weather &amp; Climate Impact on {cityName} Roofs
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-lg text-text-secondary leading-relaxed mt-4"
        >
          {paragraph}
        </p>
      ))}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {weatherStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-secondary rounded-lg p-5">
              <Icon size={24} className="text-accent" aria-hidden="true" />
              <p className="text-[1.5rem] font-heading font-bold text-text-primary mt-2">
                {stat.value}
              </p>
              <p className="text-lg text-text-secondary mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>
      <ul className="mt-6 space-y-2">
        {weather.commonWeatherConcerns.map((concern) => (
          <li
            key={concern}
            className="text-lg text-text-secondary flex items-start gap-2"
          >
            <span className="text-accent mt-1" aria-hidden="true">
              &#8226;
            </span>
            {concern}
          </li>
        ))}
      </ul>
    </div>
  );
}
