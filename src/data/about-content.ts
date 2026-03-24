export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface CompanyStory {
  heading: string;
  paragraphs: string[];
}

export interface AboutContent {
  companyStory: CompanyStory;
  team: TeamMember[];
}

export const ABOUT_CONTENT: AboutContent = {
  companyStory: {
    heading: "Our Story",
    paragraphs: [
      "Jersey City Quality Roofing started in 2003 with a simple belief: homeowners and property managers in Hudson County deserve a roofer they can trust completely. Our founder grew up in the Heights neighborhood of Jersey City, working summers on roofing crews throughout the county. He saw firsthand how many contractors cut corners, used substandard materials, and disappeared when problems arose.",
      "That experience shaped everything about how we operate. We built this company on transparent pricing, manufacturer-certified installations, and the kind of follow-through that turns first-time customers into lifelong referral sources. More than two decades later, we have completed over 2,500 roofing projects across all 12 Hudson County municipalities.",
      "What sets us apart is our deep understanding of the local building stock. Jersey City brownstones have different roofing needs than Hoboken row houses or Bayonne single-family homes. The waterfront properties in Weehawken face salt air exposure that inland buildings in Kearny never encounter. We have spent 20 years learning every neighborhood, every building code variation, and every weather pattern that affects roofs in this county.",
      "Today, we are a GAF Master Elite Contractor and CertainTeed SELECT ShingleMaster -- designations held by fewer than 3% of roofing contractors nationwide. Our crew members average 12 years of experience, and every project is supervised by a licensed foreman. We carry full liability and workers compensation insurance because we believe protecting our customers and our team is non-negotiable.",
      "Whether you need a single shingle repair on a Saturday morning or a complete commercial roof replacement on a 10,000-square-foot warehouse, we bring the same commitment to quality, safety, and communication. That is why our customers rate us 4.8 out of 5 stars and why more than 60% of our business comes from referrals and repeat customers.",
    ],
  },
  team: [
    {
      name: "Marco DiStefano",
      role: "Founder & Lead Estimator",
      bio: "Jersey City Heights native with 25+ years in roofing. GAF Master Elite certified. Personally inspects every project before and after completion. Known for honest assessments -- he has talked more homeowners out of unnecessary replacements than into them.",
    },
    {
      name: "Carlos Reyes",
      role: "Operations Manager",
      bio: "Former union roofer with 18 years of field experience across residential and commercial projects. OSHA 30 certified. Manages crew scheduling, material logistics, and quality control for all active projects in Hudson County.",
    },
    {
      name: "Jennifer Walsh",
      role: "Customer Relations Manager",
      bio: "15 years of experience in home improvement project management. Coordinates all customer communications, permit applications, insurance claim documentation, and post-project follow-up. Your single point of contact from first call to final inspection.",
    },
  ],
};
