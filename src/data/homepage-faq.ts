import type { FAQ } from '@/data/types';

export const HOMEPAGE_FAQS = [
  {
    question: 'Do you serve my city in Hudson County?',
    answer:
      'Yes, we serve all 12 municipalities in Hudson County: Jersey City, Hoboken, Bayonne, North Bergen, Union City, West New York, Secaucus, Kearny, Harrison, East Newark, Guttenberg, and Weehawken. Our crews are familiar with the unique building styles, permit requirements, and roofing challenges in every community across the county.',
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      'Yes. We hold NJ Home Improvement Contractor license NJ-HIC-13VH12345678 and are fully insured through Liberty Mutual with both general liability and workers\u2019 compensation coverage. We carry certificates of insurance and provide them to homeowners and property managers upon request before any work begins.',
  },
  {
    question: 'How fast can you get here for emergencies?',
    answer:
      'For emergency roof situations, we typically arrive within 60\u201390 minutes anywhere in Hudson County. Our emergency line is available 24/7, 365 days a year. Whether it\u2019s storm damage, a fallen tree, or an active leak, our crews carry tarps, plywood, and emergency sealants to stabilize your roof until a permanent repair can be scheduled.',
  },
  {
    question: 'What types of roofs do you work on?',
    answer:
      'Both residential and commercial. Residential: asphalt shingles, slate, metal, tile on pitched roofs. Commercial: TPO, EPDM, modified bitumen, PVC on flat roof systems. We also handle specialty work on historic brownstones, row houses with shared walls, and waterfront buildings with high wind exposure \u2014 all common across Hudson County.',
  },
  {
    question: 'Do you offer free estimates?',
    answer:
      'Yes, every estimate is free and includes a full roof inspection. We provide written proposals with itemized costs, material specifications, and project timelines. There is never a charge for us to come out, evaluate your roof, and explain your options \u2014 whether you need a minor repair or a complete replacement.',
  },
  {
    question: 'What certifications do you hold?',
    answer:
      'We are a GAF Master Elite Contractor and CertainTeed SELECT ShingleMaster \u2014 credentials held by less than 2% of roofing contractors nationwide. We are also OSHA 30-Hour Safety Certified and EPA Lead-Safe Certified, which is particularly important when working on older Hudson County homes built before 1978.',
  },
] as const satisfies readonly FAQ[];
