import { DollarSign, Layers, AlertTriangle, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { InternalLink } from "@/lib/internal-links";
import { GuideCard } from "@/components/sections/guide-card";

const TYPE_ICON_MAP: Record<string, LucideIcon> = {
  "cost-guide": DollarSign,
  "material-guide": Layers,
  problem: AlertTriangle,
};

interface RelatedGuidesProps {
  guides: InternalLink[];
  heading?: string;
}

export function RelatedGuides({
  guides,
  heading = "Related Guides",
}: RelatedGuidesProps) {
  const displayed = guides.slice(0, 3);

  if (displayed.length === 0) return null;

  return (
    <div>
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
        {heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map((guide) => {
          const Icon = TYPE_ICON_MAP[guide.type] ?? BookOpen;

          return (
            <GuideCard
              key={guide.path}
              href={guide.path}
              title={guide.title}
              description={guide.description ?? ""}
              icon={Icon}
            />
          );
        })}
      </div>
    </div>
  );
}
