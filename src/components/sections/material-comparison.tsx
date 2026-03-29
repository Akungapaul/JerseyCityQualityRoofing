import { CheckCircle, XCircle, Check, X } from "lucide-react";

interface MaterialComparisonProps {
  pros: string[];
  cons: string[];
}

export function MaterialComparison({ pros, cons }: MaterialComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pros / Advantages */}
      <div className="bg-secondary rounded-lg p-6 border border-[#4a5040]">
        <span className="inline-flex items-center gap-2 text-lg font-heading font-bold text-success">
          <CheckCircle size={20} aria-hidden="true" />
          Advantages
        </span>
        <ul className="space-y-3 mt-4">
          {pros.map((pro) => (
            <li key={pro} className="flex items-start gap-2">
              <Check
                size={16}
                className="text-success shrink-0 mt-1"
                aria-hidden="true"
              />
              <span className="text-lg text-text-secondary">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons / Considerations */}
      <div className="bg-secondary rounded-lg p-6 border border-[#4a5040]">
        <span className="inline-flex items-center gap-2 text-lg font-heading font-bold text-destructive">
          <XCircle size={20} aria-hidden="true" />
          Considerations
        </span>
        <ul className="space-y-3 mt-4">
          {cons.map((con) => (
            <li key={con} className="flex items-start gap-2">
              <X
                size={16}
                className="text-destructive shrink-0 mt-1"
                aria-hidden="true"
              />
              <span className="text-lg text-text-secondary">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
