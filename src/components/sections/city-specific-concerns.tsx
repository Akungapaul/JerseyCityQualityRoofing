import { AlertTriangle } from "lucide-react";

interface CitySpecificConcernsProps {
  concerns: string[];
  heading: string;
  intro?: string;
}

export function CitySpecificConcerns({
  concerns,
  heading,
  intro,
}: CitySpecificConcernsProps) {
  return (
    <div>
      <h2 className={`font-heading font-bold text-[1.75rem] text-text-primary${!intro ? " mb-6" : ""}`}>
        {heading}
      </h2>
      {intro && (
        <p className="text-lg text-text-secondary mt-2 mb-6 leading-relaxed">
          {intro}
        </p>
      )}
      <ul className="space-y-3">
        {concerns.map((concern) => (
          <li key={concern} className="flex items-start gap-3 py-2">
            <AlertTriangle
              size={20}
              className="text-accent shrink-0 mt-1"
              aria-hidden="true"
            />
            <span className="text-lg text-text-secondary">{concern}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
