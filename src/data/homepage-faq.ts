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
      'We provide license and insurance documentation upon request before work begins. Homeowners and property managers should verify current credentials before approving any roofing contractor.',
  },
  {
    question: 'How fast can you get here for emergencies?',
    answer:
      'For urgent roof situations, submit the quote form with details about the leak or storm damage. We prioritize active water intrusion, fallen-tree damage, and unsafe roof conditions.',
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
      'Our crew positioning is based on manufacturer training, safe work practices, and experience with Hudson County roof systems. Ask for current documentation before work begins.',
  },
] as const satisfies readonly FAQ[];
