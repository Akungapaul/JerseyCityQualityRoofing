import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business-info";

interface ProblemSolutionCTAProps {
  problemName: string;
  narrative: string;
  serviceLinks: { title: string; path: string }[];
}

export function ProblemSolutionCTA({
  problemName,
  narrative,
  serviceLinks,
}: ProblemSolutionCTAProps) {
  const paragraphs = narrative.includes("\n\n")
    ? narrative.split("\n\n")
    : [narrative];

  return (
    <div className="bg-secondary rounded-lg p-8 border border-accent">
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary">
        How We Solve {problemName}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-lg text-text-secondary mt-4 leading-relaxed"
        >
          {paragraph}
        </p>
      ))}
      <div className="flex flex-wrap gap-3 mt-6">
        {serviceLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="inline-flex items-center gap-2 bg-accent text-dominant font-bold px-4 py-2 rounded-lg min-h-[44px] hover:bg-accent-hover transition-colors duration-[150ms]"
          >
            {link.title}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ))}
      </div>
      <a
        href={`tel:${BUSINESS_INFO.phone.replace(/[^+\d]/g, "")}`}
        className="flex items-center gap-2 mt-4 text-accent text-lg font-bold"
      >
        <Phone size={20} aria-hidden="true" />
        {BUSINESS_INFO.phone}
      </a>
    </div>
  );
}
