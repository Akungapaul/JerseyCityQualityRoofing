import type { BusinessInfo } from "./types";

export const BUSINESS_INFO: BusinessInfo = {
  name: "Jersey City Quality Roofing",
  phone: "(201) 555-0123",
  email: "info@jerseycityqualityroofing.com",
  address: {
    street: "123 Summit Avenue",
    city: "Jersey City",
    state: "NJ",
    zip: "07304",
  },
  serviceAreas: [
    "Jersey City",
    "Hoboken",
    "Bayonne",
    "North Bergen",
    "Union City",
    "West New York",
    "Secaucus",
    "Kearny",
    "Harrison",
    "East Newark",
    "Guttenberg",
    "Weehawken",
  ],
  foundedYear: 2003,
  licenseNumber: "NJ-HIC-13VH12345678",
  insuranceProvider: "Liberty Mutual",
  insurancePolicyNumber: "LM-2024-ROOF-789456",
  certifications: [
    {
      name: "GAF Master Elite Contractor",
      issuer: "GAF",
      year: 2020,
    },
    {
      name: "CertainTeed SELECT ShingleMaster",
      issuer: "CertainTeed",
      year: 2019,
    },
    {
      name: "OSHA 30-Hour Safety Certified",
      issuer: "OSHA",
      year: 2022,
    },
    {
      name: "EPA Lead-Safe Certified Firm",
      issuer: "EPA",
      year: 2021,
    },
  ],
  operatingHours: "Mon-Fri 7:00 AM - 6:00 PM, Sat 8:00 AM - 2:00 PM",
  emergencyAvailable: true,
};
