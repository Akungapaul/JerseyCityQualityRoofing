import type { MaterialGuide } from '@/data/types';
import { ASPHALT_SHINGLES_GUIDE } from './asphalt-shingles';
import { TPO_MEMBRANE_GUIDE } from './tpo-membrane';
import { EPDM_RUBBER_GUIDE } from './epdm-rubber';
import { SLATE_ROOFING_GUIDE } from './slate-roofing';
import { METAL_ROOFING_GUIDE } from './metal-roofing';
import { MODIFIED_BITUMEN_GUIDE } from './modified-bitumen';

export const ALL_MATERIAL_GUIDES: MaterialGuide[] = [
  ASPHALT_SHINGLES_GUIDE,
  TPO_MEMBRANE_GUIDE,
  EPDM_RUBBER_GUIDE,
  SLATE_ROOFING_GUIDE,
  METAL_ROOFING_GUIDE,
  MODIFIED_BITUMEN_GUIDE,
];

export function getMaterialGuide(slug: string): MaterialGuide | undefined {
  return ALL_MATERIAL_GUIDES.find((g) => g.slug === slug);
}
