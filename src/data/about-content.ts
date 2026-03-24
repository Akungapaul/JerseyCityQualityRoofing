import { BUSINESS_INFO } from '@/data/business-info';

export const ABOUT_CONTENT = {
  companyStory: {
    heading: 'Our Story',
    paragraphs: [
      'Jersey City Quality Roofing was founded in 2003 by [Founder Name], a third-generation roofer who grew up watching his father and grandfather repair the brownstone rooftops of Hudson County. After earning his contractor license and spending a decade working for large commercial roofing firms across the tristate area, he returned to Jersey City with a clear mission: bring honest, high-quality roofing work back to the neighborhoods he grew up in.',
      'What started as a two-person crew operating out of a single van has grown into one of Hudson County\u2019s most trusted roofing companies. Over two decades, we\u2019ve completed more than 2,500 projects across all 12 municipalities in the county \u2014 from brownstone restorations in the Heights to warehouse roof replacements in Secaucus, from emergency tarping in Hoboken to flat roof installations on Bergenline Avenue.',
      'Our growth has always been driven by referrals, not advertising. When a homeowner in Bayonne calls because their neighbor recommended us, or a property manager in West New York renews their maintenance contract for the fifth year in a row, that tells us we\u2019re doing something right. Every roof we install carries our name, and we treat it that way.',
      'Today, our team includes certified estimators, experienced foremen, and trained crew members who all live and work in Hudson County. We understand the unique challenges of roofing in one of the most densely populated counties in America \u2014 tight lot access, shared party walls, historic district requirements, Palisades wind exposure, and the salt air that comes with being minutes from the waterfront.',
    ],
  },
  team: [
    {
      name: '[Team Member]',
      role: 'Founder & Lead Estimator',
      bio: 'Over 20 years of roofing experience across residential and commercial projects. Holds GAF Master Elite and CertainTeed SELECT certifications. Personally inspects every roof before providing an estimate and oversees quality control on every project.',
      placeholder: true,
    },
    {
      name: '[Team Member]',
      role: 'Operations Manager',
      bio: 'Manages scheduling, material procurement, and crew coordination across all active projects. Ensures every job stays on timeline and on budget. Background in construction management with a focus on customer communication.',
      placeholder: true,
    },
    {
      name: '[Team Member]',
      role: 'Lead Foreman',
      bio: '15 years of hands-on roofing experience specializing in flat roof systems and historic building restoration. OSHA 30-Hour certified. Leads our largest commercial projects and trains new crew members on safety and installation standards.',
      placeholder: true,
    },
  ],
  stats: {
    yearsInBusiness: new Date().getFullYear() - BUSINESS_INFO.foundedYear,
    projectsCompleted: '2,500+',
    municipalitiesServed: 12,
    averageRating: '4.8',
  },
  insurance: {
    provider: 'Liberty Mutual',
    coverageTypes: ['General Liability', 'Workers\u2019 Compensation', 'Commercial Auto'],
    policyNote: 'Certificates of insurance available upon request.',
  },
} as const;
