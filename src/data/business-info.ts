import type { BusinessInfo } from "./types";

export const BUSINESS_INFO: BusinessInfo = {
  name: "Jersey City Quality Roofing",
  phone: "Request a Free Estimate",
  email: "info@jerseycityqualityroofing.com",
  address: {
    street: "",
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
  licenseNumber: "Verification available upon request",
  insuranceProvider: "Proof of insurance available upon request",
  insurancePolicyNumber: "Available upon request",
  certifications: [
    {
      name: "Manufacturer-Trained Roofing Contractor",
      issuer: "Manufacturer training",
      year: 2020,
    },
    {
      name: "Shingle Installation Training",
      issuer: "Manufacturer training",
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
