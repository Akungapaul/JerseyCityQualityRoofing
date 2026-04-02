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

// Phase 8: Service-in-city content data types
export interface NeighborhoodServiceInsight {
  neighborhoodName: string;
  insight: string;       // ~100 words: what's unique about this service in this neighborhood
  commonIssue: string;   // The #1 issue seen in this neighborhood
}

export interface ServiceInCityContent {
  serviceSlug: string;
  citySlug: string;
  heroHeadline: string;                              // City-specific H1, e.g., "Expert Roof Repair in Jersey City, NJ"
  heroSubtitle: string;                              // Unique supporting tagline
  cityServiceNarrative: string;                      // ~600 words: first-person expert narrative about doing THIS service in THIS city
  neighborhoodServiceInsights: NeighborhoodServiceInsight[]; // 3-5 per-neighborhood insights for this service
  localCaseScenario: string;                         // ~400 words: realistic case study / scenario for this service in this city
  cityMaterialsAdvice: string;                       // ~300 words: which materials work best in this city for this service
  cityCostContext: string;                           // ~200 words: cost factors specific to this city
  citySpecificProcess: string;                       // ~300 words: how the process differs in this city
  extendedFaqs: FAQ[];                               // 3-5 additional FAQs beyond the resolver's 5
  closingNarrative: string;                          // ~200 words: city-specific closing CTA
}

// Phase 9: Blog & Supporting Content types

export interface ArticleSection {
  heading: string;
  headingLevel: 2 | 3;
  content: string; // ~400-600 words per section, \n\n paragraph splits
}

export interface BlogArticle {
  slug: string;
  title: string;
  headline: string;
  subtitle: string;
  siloService: string | null;
  siloCategory: ServiceCategory | null;
  parentPillarLink: string | null;
  author: string;
  publishDate: string; // ISO 8601
  updatedDate: string | null;
  readingTimeMinutes: number;
  tags: string[];
  introNarrative: string; // ~300 words
  sections: ArticleSection[];
  closingNarrative: string; // ~200 words
  faqs: FAQ[];
  relatedServiceSlugs: string[];
  relatedCitySlugs: string[];
  relatedMaterialSlugs: string[];
  relatedProblemSlugs: string[];
}

export interface CostRange {
  item: string;
  lowEstimate: string;
  highEstimate: string;
  notes: string;
}

export interface LocationPricing {
  cityName: string;
  citySlug: string;
  priceContext: string; // ~100 words
}

export interface CostGuide {
  slug: string;
  serviceSlug: string;
  serviceCategory: ServiceCategory;
  title: string;
  headline: string;
  subtitle: string;
  introNarrative: string; // ~500 words
  costOverview: CostRange[];
  costFactorsNarrative: string; // ~500 words
  locationPricing: LocationPricing[];
  savingStrategies: string; // ~300 words
  whenToInvest: string; // ~300 words
  financingOptions: string; // ~200 words
  closingNarrative: string; // ~200 words
  faqs: FAQ[];
}

export interface MaterialGuide {
  slug: string;
  materialName: string;
  title: string;
  headline: string;
  subtitle: string;
  introNarrative: string; // ~500 words
  materialProperties: string; // ~400 words
  lifespanAndDurability: string; // ~300 words
  costAnalysis: string; // ~300 words
  prosAndCons: { pros: string[]; cons: string[] };
  bestApplications: string; // ~400 words
  hudsonCountySuitability: string; // ~300 words
  installationProcess: string; // ~300 words
  maintenanceRequirements: string; // ~200 words
  closingNarrative: string; // ~200 words
  faqs: FAQ[];
  relatedServiceSlugs: string[];
}

export interface ProblemSolution {
  slug: string;
  problemName: string;
  title: string;
  headline: string;
  subtitle: string;
  introNarrative: string; // ~500 words
  causesNarrative: string; // ~400 words
  identificationSigns: string[];
  diyVsProfessional: string; // ~300 words
  professionalSolution: string; // ~400 words
  preventionStrategies: string; // ~300 words
  hudsonCountyContext: string; // ~200 words
  closingNarrative: string; // ~200 words
  faqs: FAQ[];
  relatedServiceSlugs: string[];
}

// Phase 10: Gallery project data types
export interface GalleryProject {
  id: string;
  title: string;
  description: string;
  serviceSlug: string;
  citySlug: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  completionDate: string;
  projectDetails: string[];
}
