import Link from "next/link";

interface LocalServiceContextProps {
  heading: string;
  narrative: string;
  servicePageLink: string;
  cityPageLink: string;
  serviceName: string;
  cityName: string;
}

export function LocalServiceContext({
  heading,
  narrative,
  servicePageLink,
  cityPageLink,
  serviceName,
  cityName,
}: LocalServiceContextProps) {
  const paragraphs = narrative.includes("\n\n")
    ? narrative.split("\n\n")
    : [narrative];

  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-4">
        {heading}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={`text-lg text-text-secondary leading-relaxed${index > 0 ? " mt-4" : ""}`}
        >
          {paragraph}
        </p>
      ))}
      <div className="flex flex-wrap gap-4 mt-6">
        <Link
          href={servicePageLink}
          className="text-accent hover:text-accent-hover text-lg font-bold underline"
        >
          Learn more about our {serviceName} services
        </Link>
        <Link
          href={cityPageLink}
          className="text-accent hover:text-accent-hover text-lg font-bold underline"
        >
          All roofing services in {cityName}
        </Link>
      </div>
    </div>
  );
}
