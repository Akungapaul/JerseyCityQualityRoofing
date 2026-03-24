import {
  AlertTriangle,
  Droplets,
  Eye,
  Thermometer,
  Wind,
  CloudRain,
  Home,
  DollarSign,
  Sun,
  Snowflake,
  Shield,
  Clock,
  Search,
  Wrench,
  Zap,
  Camera,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { WarningSign } from "@/data/types";

interface WarningSectionProps {
  signs: readonly WarningSign[];
  serviceName: string;
  intro: string;
}

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Droplets,
  Eye,
  Thermometer,
  Wind,
  CloudRain,
  Home,
  DollarSign,
  Sun,
  Snowflake,
  Shield,
  Clock,
  Search,
  Wrench,
  Zap,
  Camera,
  FileText,
};

export function WarningSignsSection({
  signs,
  serviceName,
  intro,
}: WarningSectionProps) {
  return (
    <div>
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary">
        Warning Signs You Need {serviceName}
      </h2>
      <p className="text-lg text-text-secondary mt-2">{intro}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {signs.map((sign) => {
          const IconComponent = iconMap[sign.icon] ?? AlertTriangle;

          return (
            <div
              key={sign.title}
              className="bg-secondary rounded-lg p-6 flex gap-4"
            >
              <div className="shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <IconComponent
                  size={20}
                  className="text-accent"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-bold text-text-primary">
                  {sign.title}
                </h3>
                <p className="text-lg text-text-secondary mt-1">
                  {sign.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
