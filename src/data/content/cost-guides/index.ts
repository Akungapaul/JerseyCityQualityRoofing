import type { CostGuide } from '@/data/types';
import { ROOF_REPAIR_COST } from './roof-repair-cost';
import { ROOF_REPLACEMENT_COST } from './roof-replacement-cost';
import { ROOF_INSPECTION_COST } from './roof-inspection-cost';
import { EMERGENCY_ROOFING_COST } from './emergency-roofing-cost';
import { FLAT_ROOF_SYSTEMS_COST } from './flat-roof-systems-cost';
import { ROOF_MAINTENANCE_COST } from './roof-maintenance-cost';
import { COMMERCIAL_REPAIR_COST } from './commercial-repair-cost';
import { COMMERCIAL_REPLACEMENT_COST } from './commercial-replacement-cost';

export const ALL_COST_GUIDES: CostGuide[] = [
  ROOF_REPAIR_COST,
  ROOF_REPLACEMENT_COST,
  ROOF_INSPECTION_COST,
  EMERGENCY_ROOFING_COST,
  FLAT_ROOF_SYSTEMS_COST,
  ROOF_MAINTENANCE_COST,
  COMMERCIAL_REPAIR_COST,
  COMMERCIAL_REPLACEMENT_COST,
];

export function getCostGuide(slug: string): CostGuide | undefined {
  return ALL_COST_GUIDES.find((g) => g.slug === slug);
}

export function getCostGuideByService(serviceSlug: string): CostGuide | undefined {
  return ALL_COST_GUIDES.find((g) => g.serviceSlug === serviceSlug);
}
