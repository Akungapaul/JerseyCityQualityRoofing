// Sub-types
export interface NeighborhoodSection {
  name: string;
  description: string;
  commonRoofTypes: string[];
  keyChallenge: string;
}

export interface Landmark {
  name: string;
  description: string;
  significance: string;
}

export interface HousingStock {
  medianAge: number;
  dominantTypes: string[];
  averageValue: number;
  totalUnits: number;
  ownerOccupied: number;
  renterOccupied: number;
}

export interface WeatherData {
  annualSnowfall: number;
  annualRainfall: number;
  avgSummerHigh: number;
  avgWinterLow: number;
  hurricaneRisk: "low" | "moderate" | "high";
  norEasterFrequency: string;
  commonWeatherConcerns: string[];
}

export interface BuildingCode {
  jurisdictionName: string;
  codeEdition: string;
  windSpeedRequirement: string;
  permitRequired: boolean;
  inspectionRequired: boolean;
  specialRequirements: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

export interface Material {
  name: string;
  description: string;
  lifespan: string;
  priceRange: string;
  pros: string[];
  cons: string[];
}

export interface CostFactor {
  factor: string;
  description: string;
  impact: "low" | "moderate" | "high";
}

export interface FAQ {
  question: string;
  answer: string;
}


// Main entity interfaces (per D-11, D-12)
export interface Municipality {
  name: string;
  slug: string;
  county: string;
  population: number;
  zipCodes: string[];
  neighborhoods: string[];
  landmarks: Landmark[];
  housingStock: HousingStock;
  architectureStyles: string[];
  weatherPatterns: WeatherData;
  buildingCodes: BuildingCode;
  commonRoofTypes: string[];
  roofingConcerns: string[];
  nearbyHighways: string[];
  description: string;
  tier: 1 | 2 | 3;
}

export type ServiceCategory = "residential" | "commercial";

export interface Service {
  name: string;
  slug: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  processSteps: ProcessStep[];
  materials: Material[];
  costFactors: CostFactor[];
  faqs: FAQ[];
  commonProblems: string[];
  relatedServices: string[];
  emergencyAvailable: boolean;
  typicalDuration: string;
  warrantyInfo: string;
}

export interface Testimonial {
  id: string;
  name: string;
  citySlug: string;
  serviceSlug: string;
  rating: 4 | 5;
  text: string;
  date: string;
  projectType: string;
}

export interface ServiceCityContent {
  serviceSlug: string;
  citySlug: string;
  localContext: string;
  specificConcerns: string[];
  localStats: string;
  neighborhoodMention: string;
  uniqueFaqs: FAQ[];
}

export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}

export interface BusinessInfo {
  name: string;
  phone: string;
  email: string;
  address: BusinessAddress;
  serviceAreas: string[];
  foundedYear: number;
  licenseNumber: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  certifications: Certification[];
  operatingHours: string;
  emergencyAvailable: boolean;
}

// Phase 5: Service content data types
export interface WarningSign {
  icon: string; // Lucide icon name (e.g., 'Droplets', 'AlertTriangle')
  title: string;
  description: string; // 2-3 sentence real-world scenario
}

export interface ServiceContent {
  slug: string;
  heroHeadline: string;
  heroSubtitle: string;
  introNarrative: string; // ~500 words, first-person expert voice
  processNarrative: string; // ~600 words, expanded per-step storytelling
  materialsIntro: string; // ~100 words intro before material cards
  costFactorsIntro: string; // ~50 words intro
  warningSignsIntro: string; // ~50 words intro
  warningSigns: WarningSign[]; // 5-6 per service
  extendedFaqs: FAQ[]; // 3-5 additional FAQs beyond services.ts
}

export interface EmergencyStep {
  title: string;
  description: string;
}

export interface StormDamageType {
  icon: string; // Lucide icon name
  name: string;
  description: string;
}

export interface InsuranceClaimsContent {
  intro: string;
  whatWeHandle: string[];
  whatToDocument: string[];
}

export interface EmergencyContent extends ServiceContent {
  whatToDoSteps: EmergencyStep[];
  stormDamageTypes: StormDamageType[];
  insuranceClaims: InsuranceClaimsContent;
}

// Phase 7: City hub content data types
export interface NeighborhoodSection {
  name: string;
  description: string;      // ~100 words: roofing concerns in this neighborhood
  commonRoofTypes: string[];
  keyChallenge: string;
}

export interface CityHubContent {
  slug: string;                          // Municipality slug (e.g., 'jersey-city')
  heroHeadline: string;                  // City-specific H1
  heroSubtitle: string;                  // Supporting tagline
  localExpertiseNarrative: string;       // ~500 words: first-person expert voice about this city
  housingStockNarrative: string;         // ~400 words: architecture, building ages, roof types
  weatherClimateNarrative: string;       // ~400 words: weather patterns, seasonal concerns
  neighborhoodBreakdown: NeighborhoodSection[]; // Per-neighborhood roofing insights
  landmarksNarrative: string;            // ~300 words: how local landmarks reflect roofing needs
  buildingCodeNarrative: string;         // ~200 words: permits, inspections, special requirements
  whyChooseUsNarrative: string;          // ~300 words: why this company for this city
  closingNarrative: string;              // ~200 words: final call to action
  cityFaqs: FAQ[];                       // 8-10 city-specific FAQs
}

// Phase 8: Service-in-city component types
export interface NeighborhoodServiceInsight {
  neighborhoodName: string;
  insight: string;
  commonIssue: string;
}
