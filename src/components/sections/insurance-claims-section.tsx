import { CheckCircle, Camera } from "lucide-react";
import type { InsuranceClaimsContent } from "@/data/types";

interface InsuranceClaimsSectionProps {
  content: InsuranceClaimsContent;
}

export function InsuranceClaimsSection({
  content,
}: InsuranceClaimsSectionProps) {
  return (
    <div>
      {/* Section heading */}
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary">
        Insurance Claims Help
      </h2>
      <p className="text-lg text-text-secondary mt-2">{content.intro}</p>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Column 1: What We Handle */}
        <div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-3">
            What We Handle
          </h3>
          <ul>
            {content.whatWeHandle.map((item) => (
              <li key={item} className="flex items-start gap-3 py-2">
                <CheckCircle
                  size={16}
                  strokeWidth={1.5}
                  className="text-success shrink-0 mt-1"
                  aria-hidden="true"
                />
                <span className="text-lg text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: What To Document */}
        <div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-3">
            What To Document
          </h3>
          <ul>
            {content.whatToDocument.map((item) => (
              <li key={item} className="flex items-start gap-3 py-2">
                <Camera
                  size={16}
                  strokeWidth={1.5}
                  className="text-accent shrink-0 mt-1"
                  aria-hidden="true"
                />
                <span className="text-lg text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
