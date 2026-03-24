import {
  Wind,
  CloudRain,
  Snowflake,
  Zap,
  TreePine,
  CloudLightning,
  Haze,
  AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { StormDamageType } from "@/data/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Wind,
  CloudRain,
  Snowflake,
  Zap,
  TreePine,
  CloudLightning,
  Haze,
  AlertTriangle,
};

interface StormDamageTypesProps {
  damageTypes: readonly StormDamageType[];
}

export function StormDamageTypes({ damageTypes }: StormDamageTypesProps) {
  return (
    <div>
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary">
        Types of Storm Damage We Repair
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {damageTypes.map((damageType) => {
          const Icon = ICON_MAP[damageType.icon] ?? AlertTriangle;

          return (
            <div
              key={damageType.name}
              className="bg-secondary rounded-lg p-6"
            >
              <Icon
                size={24}
                strokeWidth={1.5}
                className="text-[#d4782f] mb-2"
                aria-hidden="true"
              />
              <h3 className="text-lg font-heading font-bold text-text-primary mt-2">
                {damageType.name}
              </h3>
              <p className="text-lg text-text-secondary mt-1">
                {damageType.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
