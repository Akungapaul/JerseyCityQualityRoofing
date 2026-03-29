import type { ProblemSolution } from '@/data/types';
import { ICE_DAMS_PROBLEM } from './ice-dams';
import { PONDING_WATER_PROBLEM } from './ponding-water';
import { FLASHING_FAILURE_PROBLEM } from './flashing-failure';
import { WIND_DAMAGE_PROBLEM } from './wind-damage';
import { MISSING_SHINGLES_PROBLEM } from './missing-shingles';

export const ALL_PROBLEMS: ProblemSolution[] = [
  ICE_DAMS_PROBLEM,
  PONDING_WATER_PROBLEM,
  FLASHING_FAILURE_PROBLEM,
  WIND_DAMAGE_PROBLEM,
  MISSING_SHINGLES_PROBLEM,
];

export function getProblem(slug: string): ProblemSolution | undefined {
  return ALL_PROBLEMS.find((p) => p.slug === slug);
}
