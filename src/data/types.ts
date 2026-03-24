// Sub-types
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

export interface WarningSign {
  icon: string;
  title: string;
  description: string;
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
