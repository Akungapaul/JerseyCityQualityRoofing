import type { Service, ServiceCategory } from './types';

export const SERVICES = {
  'roof-repair': {
    name: 'Roof Repair',
    slug: 'roof-repair',
    category: 'residential',
    shortDescription:
      'Professional roof repair services to fix leaks, damaged shingles, flashing failures, and storm damage before small problems become costly replacements.',
    fullDescription:
      'Our roof repair team diagnoses and fixes the full spectrum of residential roofing issues across Hudson County. From a single missing shingle after a nor\'easter to chronic valley leaks on aging brownstones, we trace every leak to its source and apply lasting repairs using manufacturer-specified techniques. We handle asphalt shingle repairs, flat roof patching, flashing replacement, gutter reattachment, and emergency tarping — all backed by our workmanship warranty.',
    processSteps: [
      {
        step: 1,
        title: 'Initial Assessment',
        description:
          'A certified technician inspects the roof from both exterior and interior (attic space) to identify all damage points, moisture intrusion paths, and underlying causes.',
        duration: '1-2 hours',
      },
      {
        step: 2,
        title: 'Damage Documentation',
        description:
          'Detailed photo documentation and written report of all findings, including measurements and material specifications, for homeowner records and insurance claims.',
        duration: '1 hour',
      },
      {
        step: 3,
        title: 'Repair Plan & Estimate',
        description:
          'A written scope of work with itemized costs, material options, and timeline. We explain what caused the damage and how our repair prevents recurrence.',
        duration: 'Same day',
      },
      {
        step: 4,
        title: 'Material Procurement',
        description:
          'Sourcing exact-match or compatible materials including shingles, underlayment, flashing, sealants, and fasteners from our supplier network.',
        duration: '1-2 days',
      },
      {
        step: 5,
        title: 'Surface Preparation',
        description:
          'Removing damaged materials, cleaning the substrate, inspecting decking for rot or moisture damage, and replacing any compromised sheathing.',
        duration: '1-2 hours',
      },
      {
        step: 6,
        title: 'Repair Execution',
        description:
          'Installing replacement materials per manufacturer specifications — proper nailing patterns, sealant application, flashing integration, and ice-and-water shield where required.',
        duration: '2-8 hours',
      },
      {
        step: 7,
        title: 'Quality Inspection & Cleanup',
        description:
          'Final walkthrough with the homeowner, water testing of repaired areas, magnetic nail sweep of the property, and complete debris removal.',
        duration: '30-60 minutes',
      },
    ],
    materials: [
      {
        name: 'Asphalt Architectural Shingles',
        description:
          'Multi-layered dimensional shingles that provide a textured appearance and superior wind resistance compared to 3-tab shingles.',
        lifespan: '25-30 years',
        priceRange: '$3.50-$5.50 per sq ft installed',
        pros: [
          'Wide color selection for matching existing roof',
          'Class A fire rating',
          'Wind resistance up to 130 mph',
          'Cost-effective for partial repairs',
        ],
        cons: [
          'Color match can be difficult on aged roofs',
          'Susceptible to algae growth near waterfront',
          'Shorter lifespan than premium materials',
        ],
      },
      {
        name: 'EPDM Rubber Membrane',
        description:
          'Synthetic rubber membrane used for flat and low-slope roof repairs, available in peel-and-stick patches or full sheets.',
        lifespan: '20-25 years',
        priceRange: '$4.00-$8.00 per sq ft installed',
        pros: [
          'Excellent for flat roof repairs common in Hudson County',
          'UV and weather resistant',
          'Flexible in cold temperatures',
          'Easy to patch for localized damage',
        ],
        cons: [
          'Black color absorbs heat',
          'Seams can separate over time',
          'Not suitable for high-traffic roofs without protection layer',
        ],
      },
      {
        name: 'Galvanized Steel Flashing',
        description:
          'Pre-formed or custom-bent metal flashing used to seal transitions between roof planes, walls, chimneys, and vents.',
        lifespan: '20-30 years',
        priceRange: '$5.00-$12.00 per linear ft installed',
        pros: [
          'Critical component in leak prevention',
          'Can be custom fabricated on-site',
          'Durable in freeze-thaw cycles',
          'Compatible with all roofing materials',
        ],
        cons: [
          'Salt air corrosion in waterfront areas',
          'Requires proper sealant application',
          'Aluminum or copper may be needed for historic properties',
        ],
      },
      {
        name: 'Modified Bitumen Patch',
        description:
          'Torch-applied or peel-and-stick modified asphalt membrane for repairing flat roofs and low-slope areas.',
        lifespan: '15-20 years',
        priceRange: '$5.50-$9.00 per sq ft installed',
        pros: [
          'Strong adhesion to existing flat roof surfaces',
          'Good for multi-layer repairs',
          'Handles ponding water better than many alternatives',
          'Self-healing properties in warm weather',
        ],
        cons: [
          'Torch application requires fire safety precautions',
          'Limited color options',
          'Can become brittle in extreme cold',
        ],
      },
    ],
    costFactors: [
      {
        factor: 'Damage Extent',
        description:
          'A single missing shingle costs far less than repairing a 10-foot section of damaged decking with rot. The scope of underlying damage is the primary cost driver.',
        impact: 'high',
      },
      {
        factor: 'Roof Accessibility',
        description:
          'Multi-story brownstones and row houses in Jersey City and Hoboken require scaffolding or specialized access equipment that adds to project cost.',
        impact: 'moderate',
      },
      {
        factor: 'Material Matching',
        description:
          'Matching existing shingle color, style, and profile on a partial repair can require sourcing discontinued products or blending multiple SKUs.',
        impact: 'low',
      },
      {
        factor: 'Permit Requirements',
        description:
          'Historic district overlays in Hoboken and Jersey City may require additional permits and architectural review for exterior modifications.',
        impact: 'moderate',
      },
      {
        factor: 'Underlying Deck Damage',
        description:
          'If roof decking (plywood or OSB sheathing) is rotted or water-damaged, it must be replaced before new roofing material can be installed.',
        impact: 'high',
      },
    ],
    faqs: [
      {
        question: 'How long does a typical roof repair take?',
        answer:
          'Most residential roof repairs in Hudson County are completed in a single day. Simple repairs like replacing a few shingles or patching a small flat roof area take 2-4 hours. More extensive repairs involving decking replacement, multiple flashing areas, or historic district coordination may take 2-3 days.',
      },
      {
        question: 'Will my homeowner\'s insurance cover roof repair?',
        answer:
          'Insurance typically covers roof damage caused by sudden events — storms, fallen trees, hail, and wind. It generally does not cover damage from normal wear, aging, or deferred maintenance. We provide detailed damage documentation and photos that support insurance claims, and we can work directly with your adjuster.',
      },
      {
        question: 'How do I know if I need a repair or a full replacement?',
        answer:
          'If your roof is less than 15 years old and the damage is localized (a small leak, a few missing shingles, isolated flashing failure), repair is usually the right choice. If your roof is 20+ years old with widespread granule loss, multiple leak points, or sagging decking, replacement is more cost-effective long term. Our inspection report will provide an honest recommendation.',
      },
      {
        question: 'Can you repair my flat roof without a full replacement?',
        answer:
          'Yes, in many cases. Flat roof repairs using EPDM patches, modified bitumen overlays, or liquid-applied membranes can extend the life of an existing roof by 5-10 years. We assess the overall membrane condition to determine if localized repair is viable or if the substrate has deteriorated beyond repair.',
      },
      {
        question: 'Do I need a permit for roof repair in New Jersey?',
        answer:
          'In New Jersey, minor repairs that don\'t alter the roof structure (replacing shingles, patching a flat roof) typically do not require a permit. However, repairs involving structural work (decking replacement, framing modifications) do require a permit. Historic districts in Hoboken and Jersey City have additional review requirements.',
      },
      {
        question: 'What happens if you find more damage once the repair starts?',
        answer:
          'We contact you immediately with photos of the additional damage and a revised estimate before proceeding. We never perform work beyond the agreed scope without your approval. Our initial assessment is thorough to minimize surprises, but hidden damage under shingles or behind flashing is sometimes only visible after removal.',
      },
    ],
    commonProblems: [
      'Leaking roof from storm damage or aging materials',
      'Missing, cracked, or curling shingles',
      'Damaged or deteriorated flashing around chimneys and vents',
      'Flat roof membrane punctures and seam failures',
      'Ice dam damage along eaves and valleys',
    ],
    relatedServices: ['roof-inspection', 'emergency-roofing', 'roof-replacement'],
    emergencyAvailable: false,
    typicalDuration: '1-3 days',
    warrantyInfo:
      '5-year workmanship warranty on all repairs. Manufacturer material warranties apply where new materials are installed (typically 25-30 years for architectural shingles).',
  },

  'roof-replacement': {
    name: 'Roof Replacement',
    slug: 'roof-replacement',
    category: 'residential',
    shortDescription:
      'Complete roof replacement with premium materials and expert installation, transforming aging or damaged roofs into durable, weather-resistant systems built for Hudson County conditions.',
    fullDescription:
      'A full roof replacement removes every layer of existing roofing material down to the deck, addresses any structural issues, and installs a complete new roofing system from underlayment to ridge cap. We specialize in replacing aging roofs on Hudson County\'s diverse housing stock — from brownstone mansard roofs in Hoboken to Cape Cod gable roofs in Bayonne. Every replacement includes ice-and-water shield in valleys and eaves, synthetic underlayment, proper ventilation assessment, and new flashing at all penetrations.',
    processSteps: [
      {
        step: 1,
        title: 'Pre-Installation Inspection',
        description:
          'Comprehensive roof, attic, and structural assessment to identify decking condition, ventilation adequacy, and any code compliance issues before material selection.',
        duration: '2-3 hours',
      },
      {
        step: 2,
        title: 'Material Selection & Ordering',
        description:
          'Guided material consultation covering shingle style, color, warranty tier, and performance characteristics. We provide physical samples to evaluate against your home\'s exterior.',
        duration: '1-3 days',
      },
      {
        step: 3,
        title: 'Permitting',
        description:
          'Filing all required municipal permits, historic district applications (if applicable), and coordinating HOA approval where needed.',
        duration: '3-10 business days',
      },
      {
        step: 4,
        title: 'Tear-Off & Deck Inspection',
        description:
          'Complete removal of all existing roofing layers to expose the deck. Thorough inspection for rot, soft spots, and structural issues. Replacement of damaged sheathing.',
        duration: '1 day',
      },
      {
        step: 5,
        title: 'Underlayment & Ice Shield',
        description:
          'Installation of ice-and-water shield along eaves, valleys, and penetrations per NJ code. Synthetic underlayment across the entire deck for secondary water protection.',
        duration: '0.5 day',
      },
      {
        step: 6,
        title: 'Roofing Installation',
        description:
          'Precise installation of starter strip, field shingles, hip and ridge caps, and all flashing per manufacturer specifications for warranty compliance.',
        duration: '1-3 days',
      },
      {
        step: 7,
        title: 'Final Inspection & Warranty Registration',
        description:
          'Quality inspection with the homeowner, municipal final inspection coordination, manufacturer warranty registration, and complete site cleanup with magnetic nail sweep.',
        duration: '2-4 hours',
      },
    ],
    materials: [
      {
        name: 'Asphalt Architectural Shingles',
        description:
          'The most popular residential roofing choice in Hudson County. Multi-layered dimensional shingles providing enhanced aesthetics, durability, and wind resistance.',
        lifespan: '25-30 years',
        priceRange: '$3.50-$5.50 per sq ft installed',
        pros: [
          'Best value for complete replacement',
          'Extensive color and style options',
          'Class A fire rating standard',
          'Wind resistance ratings up to 130 mph',
          'Compatible with all standard roof pitches',
        ],
        cons: [
          'Shorter lifespan than metal or slate',
          'Susceptible to algae in humid waterfront areas',
          'Can be damaged by extreme hail',
        ],
      },
      {
        name: 'Metal Standing Seam Roofing',
        description:
          'Interlocking metal panels with raised seams that provide exceptional weather resistance and a clean modern appearance.',
        lifespan: '40-70 years',
        priceRange: '$7.00-$14.00 per sq ft installed',
        pros: [
          'Exceptional lifespan reduces long-term cost',
          'Superior wind resistance (up to 160 mph)',
          'Fire resistant and non-combustible',
          'Snow and ice shed naturally',
          'Recyclable at end of life',
        ],
        cons: [
          'Higher upfront cost',
          'Requires specialized installation crew',
          'Can be noisy in heavy rain without proper underlayment',
          'Expansion and contraction require proper fastening',
        ],
      },
      {
        name: 'Synthetic Slate',
        description:
          'Engineered composite material that replicates the appearance of natural slate at a fraction of the weight and cost.',
        lifespan: '40-50 years',
        priceRange: '$9.00-$16.00 per sq ft installed',
        pros: [
          'Authentic slate appearance for historic properties',
          'Much lighter than natural slate (no structural reinforcement needed)',
          'Class 4 impact resistance',
          'Approved for many historic district renovations',
        ],
        cons: [
          'Higher cost than asphalt',
          'Limited track record compared to natural slate',
          'Some products may fade over time',
        ],
      },
      {
        name: 'Natural Slate',
        description:
          'Quarried stone tiles offering unmatched durability and timeless beauty, traditional on many Hudson County historic properties.',
        lifespan: '75-150 years',
        priceRange: '$15.00-$30.00 per sq ft installed',
        pros: [
          'Century-plus lifespan',
          'Unmatched historic authenticity',
          'Fire and weather resistant',
          'Increases property value',
        ],
        cons: [
          'Heaviest option — requires structural verification',
          'Very high upfront cost',
          'Fragile to foot traffic during maintenance',
          'Requires specialized slate roofers',
          'Long lead times for sourcing',
        ],
      },
      {
        name: 'Cedar Shake',
        description:
          'Natural wood shingles or shakes hand-split from cedar logs, offering a rustic appearance.',
        lifespan: '30-40 years',
        priceRange: '$8.00-$14.00 per sq ft installed',
        pros: [
          'Natural beauty and character',
          'Excellent insulation properties',
          'Weathers to an attractive silver-gray',
        ],
        cons: [
          'Requires regular maintenance (cleaning, treatment)',
          'Fire risk without treatment (not Class A without additives)',
          'Susceptible to rot in humid Hudson County climate',
          'Not permitted in all jurisdictions without fire treatment',
        ],
      },
    ],
    costFactors: [
      {
        factor: 'Roof Size and Complexity',
        description:
          'Measured in roofing squares (100 sq ft each). Multi-gable brownstones with dormers, valleys, and hips require significantly more labor and material than a simple gable ranch.',
        impact: 'high',
      },
      {
        factor: 'Material Choice',
        description:
          'The range from basic 3-tab shingles to natural slate spans a 5-8x cost difference. Most Hudson County homeowners choose architectural shingles or metal for the best value-to-lifespan ratio.',
        impact: 'high',
      },
      {
        factor: 'Deck Condition',
        description:
          'Rotted or damaged roof decking discovered during tear-off must be replaced before new roofing. Older Hudson County homes frequently need 10-30% deck replacement.',
        impact: 'high',
      },
      {
        factor: 'Roof Pitch and Access',
        description:
          'Steep-slope roofs require additional safety equipment and slow installation pace. Urban row houses with limited ground access add staging complexity.',
        impact: 'moderate',
      },
      {
        factor: 'Ventilation Upgrades',
        description:
          'Bringing an older home\'s attic ventilation up to current code during replacement prevents moisture damage and ice dams. May require adding ridge vents, soffit vents, or powered exhaust.',
        impact: 'moderate',
      },
      {
        factor: 'Permit and Historic Review Fees',
        description:
          'Municipal permit fees vary by jurisdiction. Historic district review in Hoboken and Jersey City adds both cost and timeline.',
        impact: 'low',
      },
    ],
    faqs: [
      {
        question: 'How long does a full roof replacement take?',
        answer:
          'Most residential roof replacements in Hudson County take 3-5 days of on-site work. A simple gable roof on a single-family home can be completed in 2-3 days. Complex brownstone or Victorian roofs with multiple planes, dormers, and historic considerations may take 5-7 days. Weather delays can extend the timeline.',
      },
      {
        question: 'Can I stay in my home during a roof replacement?',
        answer:
          'Yes. While the work is noisy and involves vibration, it is safe to remain in your home. We recommend removing fragile items from walls and shelves on the top floor. We maintain clean, safe access to your home throughout the project.',
      },
      {
        question: 'What happens to my old roof materials?',
        answer:
          'All old roofing materials are removed and hauled away in a dumpster. We arrange dumpster delivery before tear-off day. Asphalt shingles are recycled into road paving material at approved facilities when possible. We leave your property completely clean.',
      },
      {
        question: 'How do I know when my roof needs replacement vs. repair?',
        answer:
          'Key replacement indicators: roof is 20+ years old, widespread granule loss visible in gutters, multiple active leaks, sagging or wavy roof planes, daylight visible through attic boards, or storm damage affecting more than 30% of the surface. Our inspection provides a clear recommendation with supporting evidence.',
      },
      {
        question: 'What warranty comes with a new roof?',
        answer:
          'You receive two warranties: our 10-year workmanship warranty covering installation quality, and the manufacturer\'s material warranty (typically 25-50 years depending on the product line). As GAF Master Elite contractors, we offer enhanced manufacturer warranties that cover both materials and workmanship.',
      },
      {
        question: 'Will a new roof increase my home\'s value?',
        answer:
          'Yes. According to industry data, a new roof replacement recovers 60-70% of its cost in increased home value. In Hudson County\'s competitive real estate market, a new roof is one of the top improvements for both value and buyer confidence.',
      },
    ],
    commonProblems: [
      'Roof beyond its expected service life (20+ years for asphalt)',
      'Widespread storm damage affecting more than 30% of the surface',
      'Chronic leaks that repairs can no longer address',
      'Sagging or structurally compromised roof deck',
      'Failed previous roof installation requiring complete redo',
    ],
    relatedServices: ['roof-inspection', 'roof-repair', 'emergency-roofing'],
    emergencyAvailable: false,
    typicalDuration: '3-7 days',
    warrantyInfo:
      '10-year workmanship warranty. Manufacturer material warranties range from 25-50 years depending on product line. GAF Master Elite enhanced warranty available.',
  },

  'roof-inspection': {
    name: 'Roof Inspection',
    slug: 'roof-inspection',
    category: 'residential',
    shortDescription:
      'Comprehensive professional roof inspections for homeowners, buyers, sellers, and insurance purposes — identifying issues before they become emergencies.',
    fullDescription:
      'Our certified roof inspections provide a thorough evaluation of your entire roofing system — from ridge to foundation. We inspect the roof surface, flashing, gutters, ventilation, attic space, and structural components. We provide a detailed written report with photos documenting every finding, along with prioritized recommendations for maintenance or repair. Inspections are essential for real estate transactions, insurance claims, post-storm assessment, and proactive maintenance planning.',
    processSteps: [
      {
        step: 1,
        title: 'Exterior Visual Assessment',
        description:
          'Ground-level and roof-level examination of shingle condition, flashing integrity, gutter function, chimney and vent condition, and overall roof geometry.',
        duration: '30-45 minutes',
      },
      {
        step: 2,
        title: 'Interior/Attic Inspection',
        description:
          'Assessment of attic ventilation, insulation condition, moisture presence (stains, mold, rot), structural member integrity, and daylight penetration.',
        duration: '20-30 minutes',
      },
      {
        step: 3,
        title: 'Moisture Detection',
        description:
          'Use of infrared camera and moisture meter to detect hidden water intrusion not visible to the naked eye, particularly around penetrations and valleys.',
        duration: '15-20 minutes',
      },
      {
        step: 4,
        title: 'Photo Documentation',
        description:
          'Comprehensive photography of all findings — both problem areas and areas in good condition — to create a complete record of the roof\'s current state.',
        duration: '15-20 minutes',
      },
      {
        step: 5,
        title: 'Report Generation',
        description:
          'Detailed written report with numbered photos, condition ratings for each component, estimated remaining lifespan, and prioritized repair/maintenance recommendations.',
        duration: '1-2 business days',
      },
    ],
    materials: [
      {
        name: 'Infrared Camera',
        description:
          'Thermal imaging technology that detects temperature differentials indicating hidden moisture intrusion behind roofing materials.',
        lifespan: 'N/A (inspection tool)',
        priceRange: 'Included in inspection fee',
        pros: [
          'Detects hidden moisture damage invisible to the eye',
          'Non-invasive testing method',
          'Identifies energy loss areas',
          'Particularly effective on flat roofs common in Hudson County',
        ],
        cons: [
          'Requires specific weather conditions for accuracy',
          'Cannot determine moisture source, only presence',
        ],
      },
      {
        name: 'Moisture Meter',
        description:
          'Electronic device that measures moisture content in wood decking, framing, and insulation to quantify water damage severity.',
        lifespan: 'N/A (inspection tool)',
        priceRange: 'Included in inspection fee',
        pros: [
          'Provides quantitative moisture readings',
          'Pinpoints exact moisture locations',
          'Helps assess decking replacement needs',
        ],
        cons: [
          'Requires physical contact with the material',
          'Limited to accessible areas',
        ],
      },
      {
        name: 'Drone Aerial Photography',
        description:
          'UAV-mounted cameras providing high-resolution aerial views of the entire roof surface, especially useful for steep or inaccessible roofs.',
        lifespan: 'N/A (inspection tool)',
        priceRange: 'Included in comprehensive inspection',
        pros: [
          'Safe inspection of steep or high roofs',
          'Complete coverage of every roof plane',
          'High-resolution detail for documentation',
          'Ideal for Jersey City and Hoboken brownstones with limited access',
        ],
        cons: [
          'FAA regulations in some Hudson County airspace near airports',
          'Weather-dependent (no rain or high winds)',
        ],
      },
    ],
    costFactors: [
      {
        factor: 'Inspection Type',
        description:
          'Basic visual inspections cost less than comprehensive inspections with infrared, moisture meters, and drone photography. Real estate transaction inspections are typically comprehensive.',
        impact: 'moderate',
      },
      {
        factor: 'Roof Size and Complexity',
        description:
          'Larger roofs with multiple planes, dormers, and penetrations take more time to inspect thoroughly.',
        impact: 'moderate',
      },
      {
        factor: 'Roof Accessibility',
        description:
          'Steep-slope roofs or multi-story buildings requiring ladder extensions or drone deployment add to inspection scope.',
        impact: 'low',
      },
      {
        factor: 'Report Detail Level',
        description:
          'Insurance claim reports and real estate reports require more detailed documentation than routine maintenance inspections.',
        impact: 'low',
      },
    ],
    faqs: [
      {
        question: 'How often should I have my roof inspected?',
        answer:
          'We recommend a professional roof inspection every 2-3 years for roofs under 15 years old, and annually for roofs over 15 years. Additionally, schedule an inspection after any major storm, before listing your home for sale, or before purchasing a property.',
      },
      {
        question: 'What does a roof inspection cover?',
        answer:
          'A comprehensive inspection covers: shingle/membrane condition, flashing at all penetrations (chimney, vents, skylights), gutter and downspout condition, soffit and fascia integrity, attic ventilation and insulation, moisture detection, structural assessment, and estimated remaining lifespan.',
      },
      {
        question: 'Can a roof inspection help with my insurance claim?',
        answer:
          'Absolutely. Our inspection reports are designed to support insurance claims with detailed photo documentation, damage descriptions, and estimated repair costs. We identify storm-caused damage versus pre-existing wear, which is critical for successful claims.',
      },
      {
        question: 'How long does a roof inspection take?',
        answer:
          'On-site inspection typically takes 1-2 hours depending on roof size and complexity. The written report is delivered within 1-2 business days. For urgent real estate transactions, we offer expedited same-day reports.',
      },
      {
        question: 'Is a roof inspection required when buying a home?',
        answer:
          'While not legally required in New Jersey, we strongly recommend a dedicated roof inspection for any home purchase — especially for homes over 15 years old. A general home inspection often provides only a cursory roof evaluation. In Hudson County where many homes have aging roofs, a professional roof inspection can save you from a surprise $15,000-$30,000 replacement shortly after purchase.',
      },
    ],
    commonProblems: [
      'Hidden moisture damage behind intact-looking shingles',
      'Inadequate attic ventilation causing premature shingle aging',
      'Deteriorated flashing at chimneys and plumbing vents',
      'Previous improper repairs masking underlying structural issues',
      'Ice dam susceptibility on under-insulated older homes',
    ],
    relatedServices: ['roof-repair', 'roof-replacement', 'roof-maintenance'],
    emergencyAvailable: false,
    typicalDuration: '1-2 hours on-site, 1-2 days for report',
    warrantyInfo:
      'Inspection reports are guaranteed accurate at the time of inspection. If a recommended repair is performed by us within 30 days, the inspection fee is credited toward the repair cost.',
  },

  'emergency-roofing': {
    name: 'Emergency Roofing',
    slug: 'emergency-roofing',
    category: 'residential',
    shortDescription:
      '24/7 emergency roof repair for storm damage, fallen trees, active leaks, and structural failures — rapid response across Hudson County when you cannot wait.',
    fullDescription:
      'When a nor\'easter tears off shingles, a tree limb punches through your roof, or you wake up to water pouring through your ceiling, our emergency team responds within 60 minutes across Hudson County. We provide immediate tarping and water mitigation to stop active damage, followed by permanent repair scheduling. Our emergency crews carry tarps, plywood, fasteners, and sealants for rapid stabilization of any residential roof system.',
    processSteps: [
      {
        step: 1,
        title: 'Emergency Call Intake',
        description:
          'Phone assessment of the situation to determine severity, safety concerns, and immediate response needs. We dispatch a crew and provide interim safety instructions.',
        duration: '5-15 minutes',
      },
      {
        step: 2,
        title: 'Rapid On-Site Response',
        description:
          'Emergency crew arrives with tarping materials, plywood, fasteners, and sealants. Immediate assessment of danger (structural collapse risk, electrical hazards, water proximity).',
        duration: '30-60 minutes to arrive',
      },
      {
        step: 3,
        title: 'Water Mitigation',
        description:
          'Interior water containment (buckets, plastic sheeting), moving valuables away from active leaks, and identifying the primary water entry point.',
        duration: '15-30 minutes',
      },
      {
        step: 4,
        title: 'Emergency Tarping & Stabilization',
        description:
          'Installing heavy-duty tarps secured with lumber battens and fasteners over damaged areas. Board-up of any structural openings. Temporary flashing or sealant application.',
        duration: '1-3 hours',
      },
      {
        step: 5,
        title: 'Damage Assessment & Documentation',
        description:
          'Once the emergency is stabilized, full damage documentation for insurance purposes including photos, measurements, and written descriptions of all affected areas.',
        duration: '1 hour',
      },
      {
        step: 6,
        title: 'Permanent Repair Scheduling',
        description:
          'Detailed scope of work for permanent repair or replacement, insurance claim support, and scheduling the follow-up work at the earliest available date.',
        duration: 'Next business day',
      },
    ],
    materials: [
      {
        name: 'Heavy-Duty Tarps',
        description:
          'Industrial-grade polyethylene tarps (minimum 10-mil thickness) with reinforced grommets for emergency roof covering.',
        lifespan: '3-6 months (temporary)',
        priceRange: '$2.00-$4.00 per sq ft installed',
        pros: [
          'Immediate water protection',
          'Available in any size needed',
          'Can be installed in adverse weather',
          'Lightweight for rapid deployment',
        ],
        cons: [
          'Temporary solution only',
          'Can be dislodged by subsequent storms',
          'Requires periodic re-securing',
          'UV degradation over time',
        ],
      },
      {
        name: 'Emergency Board-Up Materials',
        description:
          'Plywood sheets, OSB, and lumber for covering structural openings where tree impact or collapse has breached the roof deck.',
        lifespan: '1-3 months (temporary)',
        priceRange: '$5.00-$10.00 per sq ft installed',
        pros: [
          'Structural stability for compromised openings',
          'Weather-tight when properly sealed',
          'Available immediately from local suppliers',
        ],
        cons: [
          'Temporary — permanent repair required',
          'Heavy for manual lifting to roof level',
          'Not aesthetically pleasing',
        ],
      },
      {
        name: 'Roof Sealant & Caulk',
        description:
          'Elastomeric roof sealants and polyurethane caulk for emergency sealing of small holes, gaps, and flashing separations.',
        lifespan: '1-5 years depending on product',
        priceRange: '$1.00-$3.00 per linear ft',
        pros: [
          'Quick application in emergency conditions',
          'Adheres to wet surfaces',
          'Flexible — handles thermal movement',
          'Stops small leaks immediately',
        ],
        cons: [
          'Not a permanent structural repair',
          'Limited effectiveness on large openings',
          'Requires surface preparation for best adhesion',
        ],
      },
    ],
    costFactors: [
      {
        factor: 'Time of Call',
        description:
          'After-hours, weekend, and holiday emergency calls involve premium labor rates. Calls during regular business hours receive standard emergency pricing.',
        impact: 'moderate',
      },
      {
        factor: 'Damage Severity',
        description:
          'A blown-off shingle section costs far less to stabilize than a tree-strike penetration requiring structural board-up and interior water mitigation.',
        impact: 'high',
      },
      {
        factor: 'Access Conditions',
        description:
          'Working in active storms, at night, or on ice-covered roofs requires additional safety equipment and crew members.',
        impact: 'moderate',
      },
      {
        factor: 'Materials Required',
        description:
          'Tarping a small area uses minimal materials. Board-up of a large structural opening uses significantly more plywood, lumber, and fasteners.',
        impact: 'moderate',
      },
    ],
    faqs: [
      {
        question: 'How quickly can you respond to a roof emergency?',
        answer:
          'We maintain a 60-minute response time across Hudson County for true emergencies (active leaks, structural breaches, tree strikes). Our dispatch team is available 24/7/365. During major storm events, response times may extend to 2-4 hours due to high call volume.',
      },
      {
        question: 'What qualifies as a roof emergency?',
        answer:
          'Active water intrusion into living spaces, tree or debris impact that has penetrated the roof, structural sagging or collapse risk, and any situation where delay will cause progressive damage to the interior. Missing shingles without active leaking are urgent but typically handled next business day.',
      },
      {
        question: 'Will insurance cover emergency roof repair?',
        answer:
          'Yes, homeowner\'s insurance typically covers emergency stabilization and temporary protection (tarping, board-up) as part of your duty to mitigate further damage. We document everything for your claim and can bill your insurance directly in many cases.',
      },
      {
        question: 'Is emergency tarping a permanent fix?',
        answer:
          'No. Emergency tarping is a temporary measure designed to prevent further water damage until a permanent repair or replacement can be performed. Tarps typically provide protection for 3-6 months but should be replaced with permanent repairs as soon as weather and scheduling allow.',
      },
      {
        question: 'What should I do while waiting for the emergency crew?',
        answer:
          'Move valuables away from leak areas, place buckets or containers under active drips, avoid going onto the roof yourself (especially in storms), turn off electricity to rooms with active water intrusion, and keep people and pets away from areas with ceiling sagging.',
      },
    ],
    commonProblems: [
      'Storm-caused shingle blow-off exposing roof deck',
      'Fallen tree or large branch penetrating the roof',
      'Active interior water intrusion from sudden leak',
      'Ice dam backup causing ceiling and wall damage',
      'Flat roof membrane failure during heavy rain',
    ],
    relatedServices: ['roof-repair', 'roof-replacement', 'roof-inspection'],
    emergencyAvailable: true,
    typicalDuration: '2-6 hours for stabilization, permanent repair scheduled separately',
    warrantyInfo:
      'Emergency stabilization work is warranted to remain intact until permanent repair is performed. Permanent repairs carry our standard 5-year workmanship warranty.',
  },

  'flat-roof-systems': {
    name: 'Flat Roof Systems',
    slug: 'flat-roof-systems',
    category: 'commercial',
    shortDescription:
      'Expert installation and replacement of commercial flat roof systems — TPO, EPDM, PVC, and modified bitumen — engineered for Hudson County\'s commercial buildings.',
    fullDescription:
      'Commercial flat roofs require specialized materials, techniques, and experience that differ fundamentally from residential pitched roofs. We design and install complete flat roof systems for commercial, industrial, and institutional buildings across Hudson County. From single-ply TPO and PVC membranes to multi-layer built-up roofing, we match the system to your building\'s use, budget, energy goals, and maintenance plan. Our commercial crews are trained in hot-air welding, adhesive application, and mechanical fastening for every major flat roof platform.',
    processSteps: [
      {
        step: 1,
        title: 'Building Assessment & Core Sampling',
        description:
          'Comprehensive evaluation of the existing roof system including core samples to determine layer composition, insulation condition, and deck type. Moisture survey to map wet areas.',
        duration: '0.5-1 day',
      },
      {
        step: 2,
        title: 'System Design & Specification',
        description:
          'Engineering the optimal roof system for the building including membrane selection, insulation R-value, drainage design, flashing details, and edge termination. Energy code compliance review.',
        duration: '3-5 days',
      },
      {
        step: 3,
        title: 'Permit Filing & Approvals',
        description:
          'Submitting construction documents, system specifications, and wind uplift calculations to the local building department. Coordinating with building management for logistics.',
        duration: '5-15 business days',
      },
      {
        step: 4,
        title: 'Tear-Off & Deck Preparation',
        description:
          'Removal of existing roof system (if full replacement), deck repair or replacement, and preparation of the substrate for new system installation.',
        duration: '2-5 days',
      },
      {
        step: 5,
        title: 'Insulation & Tapered System Installation',
        description:
          'Installing rigid insulation board to meet energy code R-values and creating positive drainage slope using tapered insulation to eliminate ponding.',
        duration: '2-4 days',
      },
      {
        step: 6,
        title: 'Membrane Installation',
        description:
          'Precision installation of the selected membrane system — heat-welded TPO/PVC seams, fully-adhered EPDM, or torch-applied modified bitumen — with quality control checks at every seam.',
        duration: '3-7 days',
      },
      {
        step: 7,
        title: 'Flashing, Penetrations & Edge Details',
        description:
          'Installation of membrane flashing at all penetrations (HVAC units, drains, vents, pipes), parapet walls, expansion joints, and perimeter edge metal.',
        duration: '1-3 days',
      },
      {
        step: 8,
        title: 'Final Inspection & Warranty Issuance',
        description:
          'Manufacturer representative inspection (for warranty systems), municipal final inspection, and issuance of both workmanship and manufacturer warranties.',
        duration: '1-2 days',
      },
    ],
    materials: [
      {
        name: 'TPO (Thermoplastic Polyolefin)',
        description:
          'A single-ply reflective membrane heat-welded at seams, offering excellent energy efficiency and chemical resistance.',
        lifespan: '20-30 years',
        priceRange: '$5.50-$9.00 per sq ft installed',
        pros: [
          'Energy Star rated — reflects UV and reduces cooling costs',
          'Heat-welded seams stronger than the membrane itself',
          'Excellent chemical and puncture resistance',
          'Lightweight — suitable for most deck types',
          'Lower cost than PVC with similar performance',
        ],
        cons: [
          'Relatively newer technology (30-year track record)',
          'Quality varies significantly between manufacturers',
          'Can shrink over time if not properly installed',
        ],
      },
      {
        name: 'EPDM (Ethylene Propylene Diene Monomer)',
        description:
          'A synthetic rubber membrane available in large sheets, ideal for covering large flat roof areas with minimal seams.',
        lifespan: '25-30 years',
        priceRange: '$4.50-$8.00 per sq ft installed',
        pros: [
          'Proven 50+ year track record',
          'Excellent flexibility in cold weather',
          'Large sheet sizes minimize seam count',
          'Lower material cost than TPO/PVC',
          'Easy to repair',
        ],
        cons: [
          'Black color absorbs heat (white available at premium)',
          'Adhesive and tape seams weaker than heat-welded',
          'Susceptible to puncture from foot traffic',
          'Seam failures are the most common issue',
        ],
      },
      {
        name: 'PVC (Polyvinyl Chloride)',
        description:
          'A premium single-ply membrane with heat-welded seams, offering the highest chemical and fire resistance among flat roof options.',
        lifespan: '25-35 years',
        priceRange: '$6.50-$11.00 per sq ft installed',
        pros: [
          'Superior chemical resistance (ideal near restaurants, kitchens)',
          'Fire resistant — meets FM and UL standards',
          'Heat-welded seams with excellent long-term integrity',
          'Reflective surface for energy efficiency',
        ],
        cons: [
          'Higher cost than TPO and EPDM',
          'Can become brittle in extreme cold over time',
          'Requires proper thickness specification (minimum 60-mil recommended)',
        ],
      },
      {
        name: 'Modified Bitumen',
        description:
          'Multi-layer asphalt-based membrane system applied by torch, hot mop, or cold adhesive, providing redundant waterproofing layers.',
        lifespan: '15-25 years',
        priceRange: '$4.00-$7.50 per sq ft installed',
        pros: [
          'Multi-layer redundancy for waterproofing',
          'Self-healing properties in warm weather',
          'Compatible with existing BUR systems',
          'Handles ponding water well',
          'Can be applied over existing modified bitumen',
        ],
        cons: [
          'Torch application requires hot-work permits and fire watch',
          'Shorter lifespan than single-ply alternatives',
          'Heavier than single-ply systems',
          'Multiple layers increase installation time',
        ],
      },
    ],
    costFactors: [
      {
        factor: 'Roof Area',
        description:
          'Commercial roofs are measured in squares (100 sq ft). A 10,000 sq ft warehouse roof is 100 squares — material and labor scale linearly with area.',
        impact: 'high',
      },
      {
        factor: 'Membrane System Selection',
        description:
          'TPO and EPDM are cost-effective. PVC is premium. Modified bitumen falls in between. The choice depends on building use, energy goals, and maintenance budget.',
        impact: 'high',
      },
      {
        factor: 'Existing Roof Condition',
        description:
          'A recover (new membrane over existing) costs 30-40% less than a full tear-off and replacement. Core sample analysis determines if recover is viable.',
        impact: 'high',
      },
      {
        factor: 'Insulation Requirements',
        description:
          'NJ energy code requires minimum R-30 for commercial roofs. Adding tapered insulation for drainage increases both material and labor costs.',
        impact: 'moderate',
      },
      {
        factor: 'Rooftop Equipment',
        description:
          'HVAC units, exhaust fans, satellite dishes, and other penetrations require individual flashing details that add to the scope and cost.',
        impact: 'moderate',
      },
      {
        factor: 'Access and Logistics',
        description:
          'Urban commercial buildings with limited parking and staging area require crane lifts for material delivery, increasing mobilization costs.',
        impact: 'moderate',
      },
    ],
    faqs: [
      {
        question: 'What is the best flat roof system for a commercial building?',
        answer:
          'There is no single best system — it depends on your building. TPO is the most popular choice for its balance of performance and cost. PVC is recommended for buildings with commercial kitchens or chemical exposure. EPDM is proven and cost-effective for large warehouses. Modified bitumen works well as an overlay on existing BUR systems. We recommend the system that matches your building\'s specific needs.',
      },
      {
        question: 'How long does a commercial flat roof installation take?',
        answer:
          'A typical 10,000-20,000 sq ft commercial roof takes 2-4 weeks from tear-off to final inspection. Larger projects (50,000+ sq ft) may take 6-8 weeks. Recover projects (new membrane over existing) are 30-40% faster than full replacements.',
      },
      {
        question: 'Can a new roof be installed over my existing flat roof?',
        answer:
          'Possibly. A core sample analysis determines if the existing system is dry and structurally sound enough to support an additional layer. NJ code limits total roof layers to two. If the existing insulation is dry and the deck is sound, a recover can save 30-40% compared to full tear-off.',
      },
      {
        question: 'How do you prevent ponding water on a flat roof?',
        answer:
          'We design tapered insulation systems that create positive slope toward drains, eliminating standing water. Industry standard is 1/4 inch per foot minimum slope. Proper drain placement, scupper sizing, and overflow protection are all part of our drainage design.',
      },
      {
        question: 'What warranty options are available for commercial roofs?',
        answer:
          'We offer manufacturer NDL (No Dollar Limit) warranties of 15-30 years from major manufacturers (GAF, Carlisle, Firestone, Johns Manville). These cover both materials and labor. Our own workmanship warranty is 10 years. The warranty level depends on the system specified and the manufacturer\'s inspection requirements.',
      },
    ],
    commonProblems: [
      'Ponding water due to insufficient drainage slope',
      'Membrane seam failures and splitting',
      'Flashing separation at parapet walls and penetrations',
      'Insulation saturation from undetected leaks',
      'UV degradation and membrane shrinkage',
    ],
    relatedServices: ['roof-maintenance', 'commercial-repair', 'commercial-replacement'],
    emergencyAvailable: false,
    typicalDuration: '2-6 weeks depending on building size',
    warrantyInfo:
      '10-year workmanship warranty. Manufacturer NDL warranties available from 15-30 years covering materials and labor.',
  },

  'roof-maintenance': {
    name: 'Roof Maintenance',
    slug: 'roof-maintenance',
    category: 'commercial',
    shortDescription:
      'Preventive maintenance programs for commercial and industrial roofs — scheduled inspections, cleaning, minor repairs, and documentation to maximize roof lifespan.',
    fullDescription:
      'Proactive roof maintenance extends the life of a commercial roof by 25-50% compared to reactive repair-only approaches. Our maintenance programs include semi-annual inspections, debris clearing, drain maintenance, sealant renewal, minor membrane repairs, and detailed condition reporting. We create a maintenance log for each building that tracks condition over time, projects replacement timing, and supports capital planning. For property managers and building owners across Hudson County, our maintenance contracts provide predictable costs and fewer emergency calls.',
    processSteps: [
      {
        step: 1,
        title: 'Initial Baseline Assessment',
        description:
          'Comprehensive first inspection establishing the current condition of every roof section, drain, flashing detail, and penetration. Creates the benchmark for future comparisons.',
        duration: '0.5-1 day',
      },
      {
        step: 2,
        title: 'Maintenance Plan Design',
        description:
          'Custom maintenance schedule based on roof age, system type, condition, and building use. Defines inspection frequency, preventive tasks, and budget projections.',
        duration: '2-3 days',
      },
      {
        step: 3,
        title: 'Semi-Annual Inspection (Spring)',
        description:
          'Post-winter inspection checking for freeze-thaw damage, ice dam effects, membrane integrity after snow load, drain function, and flashing condition.',
        duration: '2-4 hours per visit',
      },
      {
        step: 4,
        title: 'Semi-Annual Inspection (Fall)',
        description:
          'Pre-winter preparation including debris clearing, drain cleaning, sealant touch-up, fastener re-securing, and verification that the roof is winter-ready.',
        duration: '2-4 hours per visit',
      },
      {
        step: 5,
        title: 'Minor Repairs & Preventive Work',
        description:
          'Addressing small issues found during inspections before they become major problems: re-sealing flashings, patching small membrane damage, clearing blocked drains.',
        duration: 'Varies by scope',
      },
      {
        step: 6,
        title: 'Annual Condition Report',
        description:
          'Year-end summary comparing current condition to baseline, documenting all work performed, projecting remaining lifespan, and recommending capital planning timelines.',
        duration: '1-2 days',
      },
    ],
    materials: [
      {
        name: 'Roof Sealants & Caulks',
        description:
          'Elastomeric and polyurethane sealants used to renew aging seals around flashings, penetrations, and membrane edges during maintenance visits.',
        lifespan: '3-7 years per application',
        priceRange: '$1.50-$4.00 per linear ft applied',
        pros: [
          'Prevents leak development at critical junctures',
          'Flexible — accommodates thermal movement',
          'Quick application during scheduled visits',
          'Compatible with all membrane types',
        ],
        cons: [
          'Requires periodic renewal (not permanent)',
          'Surface must be clean and dry for proper adhesion',
          'UV exposure degrades some formulations',
        ],
      },
      {
        name: 'EPDM/TPO Patch Kits',
        description:
          'Pre-cut membrane patches with adhesive or heat-weld compatibility for repairing small punctures, cuts, and worn areas found during inspections.',
        lifespan: '10-15 years when properly applied',
        priceRange: '$3.00-$8.00 per sq ft applied',
        pros: [
          'Prevents small damage from becoming major leaks',
          'Color and material matched to existing membrane',
          'Quick application during maintenance visits',
        ],
        cons: [
          'Only effective for small, localized damage',
          'Heat welding requires proper equipment',
          'Not suitable for membrane with widespread deterioration',
        ],
      },
      {
        name: 'Roof Coating',
        description:
          'Reflective elastomeric coating applied over aging membranes to extend service life, improve energy efficiency, and seal minor surface defects.',
        lifespan: '5-10 years per application',
        priceRange: '$2.00-$5.00 per sq ft applied',
        pros: [
          'Extends roof life by 5-10 years',
          'Improves energy efficiency (reflective)',
          'Seals minor cracks and surface defects',
          'Can be recoated multiple times',
        ],
        cons: [
          'Requires sound underlying membrane',
          'Cannot address structural issues',
          'Application is weather-dependent',
          'Must be applied at proper thickness',
        ],
      },
    ],
    costFactors: [
      {
        factor: 'Roof Size',
        description:
          'Larger roofs require more inspection time, more materials for maintenance tasks, and more labor for cleaning and minor repairs.',
        impact: 'high',
      },
      {
        factor: 'Roof Age and Condition',
        description:
          'Older roofs in fair condition require more frequent attention and more minor repairs per visit than newer roofs in good condition.',
        impact: 'moderate',
      },
      {
        factor: 'Number of Penetrations',
        description:
          'HVAC units, drains, vents, and other penetrations each require individual inspection and sealant maintenance, adding time per visit.',
        impact: 'moderate',
      },
      {
        factor: 'Contract Term',
        description:
          'Multi-year maintenance contracts receive discounted per-visit rates compared to one-time service calls. 3-year agreements offer the best value.',
        impact: 'moderate',
      },
    ],
    faqs: [
      {
        question: 'How often should a commercial roof be maintained?',
        answer:
          'We recommend semi-annual maintenance visits — once in spring (post-winter assessment) and once in fall (pre-winter preparation). Additional visits may be scheduled after severe storms. This twice-yearly cadence catches developing issues before they cause interior damage.',
      },
      {
        question: 'What is the ROI of a roof maintenance program?',
        answer:
          'Studies show that every $1 spent on proactive maintenance saves $4-$5 in emergency repairs and premature replacement costs. A well-maintained commercial roof lasts 25-50% longer than a neglected one, which can mean 5-15 extra years of service — representing significant capital savings.',
      },
      {
        question: 'Will maintenance void my existing roof warranty?',
        answer:
          'No — in fact, most manufacturer warranties require regular maintenance as a condition of coverage. Our maintenance documentation provides proof of compliance that protects your warranty. Neglecting maintenance is one of the most common reasons manufacturers deny warranty claims.',
      },
      {
        question: 'What does a maintenance visit include?',
        answer:
          'Each visit includes: full roof surface inspection, drain and scupper cleaning, debris removal, flashing and sealant assessment, minor repairs (included up to a defined scope), photo documentation, and a written condition report with recommendations.',
      },
      {
        question: 'Can you maintain a roof that another company installed?',
        answer:
          'Yes. We maintain roofs installed by any contractor and using any major membrane system. Our initial baseline assessment evaluates the entire system regardless of who installed it. If we identify warranty-related issues, we can coordinate with the original installer or manufacturer.',
      },
    ],
    commonProblems: [
      'Clogged drains causing ponding water and membrane stress',
      'Deteriorating sealant at flashings and penetrations',
      'Debris accumulation promoting biological growth and membrane damage',
      'Undetected small punctures from maintenance workers or birds',
      'Membrane shrinkage pulling flashings away from edges',
    ],
    relatedServices: ['flat-roof-systems', 'commercial-repair', 'roof-inspection'],
    emergencyAvailable: false,
    typicalDuration: 'Semi-annual visits, 2-4 hours each; ongoing annual program',
    warrantyInfo:
      'Maintenance work carries a 1-year workmanship warranty per visit. Annual maintenance contracts include priority emergency response and discounted repair rates.',
  },

  'commercial-repair': {
    name: 'Commercial Roof Repair',
    slug: 'commercial-repair',
    category: 'commercial',
    shortDescription:
      'Targeted repairs for commercial flat roof systems — membrane patches, flashing restoration, drain repairs, and leak elimination without full replacement.',
    fullDescription:
      'Commercial roof repairs address specific failures in flat roof membrane systems without the cost and disruption of full replacement. Our commercial repair team handles membrane punctures, seam failures, flashing separations, drain blockages, and parapet wall leaks on TPO, EPDM, PVC, modified bitumen, and built-up roof systems. We use infrared moisture scanning to precisely map damage extent, ensuring repairs address the full problem — not just the visible symptom. For Hudson County\'s commercial building owners and property managers, targeted repairs can extend roof life by years at a fraction of replacement cost.',
    processSteps: [
      {
        step: 1,
        title: 'Leak Investigation & Moisture Mapping',
        description:
          'Infrared scanning and visual inspection to trace the leak path from the interior water stain back to the actual roof penetration point. Moisture mapping to define the wet area boundary.',
        duration: '2-4 hours',
      },
      {
        step: 2,
        title: 'Scope Definition & Estimate',
        description:
          'Written repair scope based on moisture map findings, including all materials, labor, and any required decking or insulation replacement within the damaged area.',
        duration: '1-2 days',
      },
      {
        step: 3,
        title: 'Wet Insulation Removal',
        description:
          'Cutting and removing the membrane and wet insulation within the mapped damage area. Inspection of the deck beneath for deterioration.',
        duration: '0.5-1 day',
      },
      {
        step: 4,
        title: 'Deck Repair & Insulation Replacement',
        description:
          'Replacing any damaged deck boards, installing new insulation matched to existing R-value and thickness, and preparing the surface for membrane.',
        duration: '0.5-1 day',
      },
      {
        step: 5,
        title: 'Membrane Repair & Seam Welding',
        description:
          'Installing new membrane patch extending minimum 6 inches beyond the repair area on all sides, heat-welding or adhering seams to the existing membrane for a watertight bond.',
        duration: '0.5-1 day',
      },
      {
        step: 6,
        title: 'Flood Test & Documentation',
        description:
          'Controlled water test of the repaired area to verify watertight integrity, followed by photo documentation and repair report for building records.',
        duration: '2-4 hours',
      },
    ],
    materials: [
      {
        name: 'TPO Membrane Patch',
        description:
          'Heat-weldable thermoplastic membrane for patching TPO roof systems, matching the existing membrane thickness and color.',
        lifespan: '15-20 years (matches system life)',
        priceRange: '$6.00-$10.00 per sq ft installed',
        pros: [
          'Heat-welded seams are as strong as the field membrane',
          'Color and thickness matched to existing system',
          'Watertight immediately after welding',
        ],
        cons: [
          'Requires hot-air welding equipment and trained operators',
          'Existing membrane must be clean and compatible',
        ],
      },
      {
        name: 'EPDM Patch with Bonding Adhesive',
        description:
          'Rubber membrane patch applied with contact adhesive or seam tape for repairing EPDM roof systems.',
        lifespan: '10-15 years',
        priceRange: '$4.50-$8.00 per sq ft installed',
        pros: [
          'No heat required — safe for occupied buildings',
          'Flexible in all temperatures',
          'Large patches can cover significant areas',
        ],
        cons: [
          'Adhesive seams not as strong as heat-welded',
          'Requires proper surface preparation and priming',
          'Installation must be in dry conditions',
        ],
      },
      {
        name: 'Polyiso Insulation Board',
        description:
          'Rigid foam insulation board used to replace wet insulation sections within the repair area, maintaining the roof system\'s thermal performance.',
        lifespan: '25+ years',
        priceRange: '$3.00-$5.00 per sq ft installed',
        pros: [
          'Highest R-value per inch of common insulation types',
          'Restores energy efficiency in repaired area',
          'Lightweight and easy to cut to fit',
        ],
        cons: [
          'Must match existing insulation thickness exactly',
          'R-value decreases slightly at very low temperatures',
          'Absorbs moisture if membrane is not properly sealed',
        ],
      },
    ],
    costFactors: [
      {
        factor: 'Damage Area Size',
        description:
          'Repair costs scale with the area of wet insulation and damaged membrane. A 50 sq ft repair is significantly less than a 500 sq ft section replacement.',
        impact: 'high',
      },
      {
        factor: 'Membrane System Type',
        description:
          'TPO and PVC repairs require heat-welding equipment and specialized labor. EPDM and modified bitumen repairs use adhesives and are somewhat less labor-intensive.',
        impact: 'moderate',
      },
      {
        factor: 'Deck Damage',
        description:
          'If the structural deck (steel, concrete, or wood) is damaged by prolonged moisture exposure, deck repair adds significant cost and time.',
        impact: 'high',
      },
      {
        factor: 'Building Access',
        description:
          'Material delivery to a 3-story commercial building in urban Jersey City requires crane or hoist, adding mobilization cost versus a single-story warehouse.',
        impact: 'moderate',
      },
    ],
    faqs: [
      {
        question: 'How do you find the source of a commercial roof leak?',
        answer:
          'We use infrared thermal imaging to detect moisture trapped under the membrane — wet insulation appears as a different temperature than dry insulation. This creates a moisture map showing exactly where water has entered, which may be far from where the interior stain appears. Water travels along deck flutes and insulation joints before dripping into the building.',
      },
      {
        question: 'Is it better to repair or replace a commercial roof?',
        answer:
          'If the roof is less than 15 years old and damage is localized (less than 25% of the total area), repair is usually the right choice. If the roof is nearing end of life with widespread moisture infiltration, membrane shrinkage, or multiple repair areas, replacement provides better long-term value. Our moisture survey quantifies the extent to support this decision.',
      },
      {
        question: 'Can you repair a roof while the building is occupied?',
        answer:
          'Yes. Commercial roof repairs are typically non-disruptive to building occupants. We coordinate with building management for access, material staging, and scheduling to minimize impact. Interior water protection measures are maintained until repairs are verified.',
      },
      {
        question: 'How long will a commercial roof repair last?',
        answer:
          'A properly executed repair using matching materials and correct techniques should last as long as the surrounding roof system. For a 20-year-old TPO roof with 10 years of expected life remaining, a quality repair in that same membrane will also last those 10 years.',
      },
      {
        question: 'Do you warranty commercial roof repairs?',
        answer:
          'Yes. All commercial repairs carry our 5-year workmanship warranty. If the repair fails within that period due to workmanship, we will re-repair at no additional cost. For larger section replacements, manufacturer warranty extensions may also be available.',
      },
    ],
    commonProblems: [
      'Active leaks causing interior ceiling and wall damage',
      'Membrane seam failure from thermal cycling',
      'Flashing separation at HVAC curbs and drain connections',
      'Ponding water from clogged or damaged drains',
      'Wind-lifted membrane edges along parapets',
    ],
    relatedServices: ['flat-roof-systems', 'roof-maintenance', 'commercial-replacement'],
    emergencyAvailable: true,
    typicalDuration: '1-5 days depending on damage extent',
    warrantyInfo:
      '5-year workmanship warranty on all commercial repairs. Manufacturer warranty extensions available for section replacements.',
  },

  'commercial-replacement': {
    name: 'Commercial Roof Replacement',
    slug: 'commercial-replacement',
    category: 'commercial',
    shortDescription:
      'Full commercial roof system replacement — tear-off, deck repair, insulation, and new membrane installation — engineered for maximum lifespan and energy efficiency.',
    fullDescription:
      'When a commercial roof has reached end of life or suffered irreparable damage, a full replacement provides the opportunity to upgrade to a modern high-performance system. We manage commercial roof replacements from initial engineering through final warranty issuance on buildings from 5,000 to 200,000+ square feet across Hudson County. Our replacement process addresses every layer: deck structural repair, vapor barrier, rigid insulation to current energy code, tapered drainage system, and premium membrane installation with manufacturer-backed NDL warranties.',
    processSteps: [
      {
        step: 1,
        title: 'Pre-Construction Engineering',
        description:
          'Structural assessment, core sampling, wind uplift calculations, energy code analysis, and system specification development by our in-house team.',
        duration: '1-2 weeks',
      },
      {
        step: 2,
        title: 'Bid Package & Manufacturer Coordination',
        description:
          'Final system specification, material procurement from selected manufacturer, and coordination for manufacturer warranty requirements including project registration.',
        duration: '1-2 weeks',
      },
      {
        step: 3,
        title: 'Permitting & Logistics',
        description:
          'Building department submittals, material staging plans, crane scheduling, dumpster placement, and building tenant notification coordination.',
        duration: '2-4 weeks',
      },
      {
        step: 4,
        title: 'Tear-Off Phase',
        description:
          'Systematic removal of all existing roof layers in manageable sections, with nightly temporary waterproofing of opened areas. Continuous debris removal.',
        duration: '1-3 weeks',
      },
      {
        step: 5,
        title: 'Deck Repair & Preparation',
        description:
          'Structural deck inspection, repair of deteriorated areas, welding or fastening reinforcement, and preparation for new roof system installation.',
        duration: '3-7 days',
      },
      {
        step: 6,
        title: 'Insulation & Drainage System',
        description:
          'Installation of vapor barrier, rigid insulation to code-required R-values, and tapered insulation crickets for positive drainage to all roof drains.',
        duration: '1-2 weeks',
      },
      {
        step: 7,
        title: 'Membrane & Flashing Installation',
        description:
          'Precision installation of the new membrane system with all seams, flashings, edge details, and penetration wraps executed per manufacturer specifications.',
        duration: '2-4 weeks',
      },
      {
        step: 8,
        title: 'Final Inspections & Warranty',
        description:
          'Manufacturer representative inspection, municipal final inspection, flood testing of critical areas, and issuance of workmanship and manufacturer NDL warranties.',
        duration: '1-2 weeks',
      },
    ],
    materials: [
      {
        name: 'TPO Membrane (60-80 mil)',
        description:
          'Premium-thickness thermoplastic polyolefin membrane, heat-welded at all seams and details, for commercial roof replacement with maximum durability.',
        lifespan: '25-30 years',
        priceRange: '$6.00-$10.00 per sq ft installed',
        pros: [
          'Energy Star rated — significant cooling cost reduction',
          'Heat-welded seams provide permanent watertight bonds',
          'Thicker gauges offer superior puncture and hail resistance',
          'Compatible with standard NDL warranty programs',
        ],
        cons: [
          'Quality varies by manufacturer — specify premium brands',
          'White surface shows dirt and requires periodic cleaning',
        ],
      },
      {
        name: 'PVC Membrane (60-80 mil)',
        description:
          'Premium polyvinyl chloride membrane for commercial buildings requiring superior chemical resistance, fire performance, or restaurant/kitchen roof applications.',
        lifespan: '25-35 years',
        priceRange: '$7.50-$12.00 per sq ft installed',
        pros: [
          'Highest chemical resistance of any single-ply membrane',
          'FM-approved for superior fire performance',
          'Excellent long-term seam strength',
          'Self-extinguishing fire characteristics',
        ],
        cons: [
          'Highest cost single-ply option',
          'Can become brittle in extreme cold at thinner gauges',
          'Limited color options compared to TPO',
        ],
      },
      {
        name: 'Built-Up Roofing (BUR)',
        description:
          'Multi-layer system of alternating bitumen and reinforcing fabric plies, topped with aggregate or a cap sheet. The original flat roof technology.',
        lifespan: '20-30 years',
        priceRange: '$5.50-$9.50 per sq ft installed',
        pros: [
          'Proven 100+ year track record',
          'Multiple redundant waterproofing layers',
          'Excellent foot traffic resistance',
          'Aggregate surfacing provides UV and fire protection',
        ],
        cons: [
          'Heaviest flat roof option — requires structural verification',
          'Hot asphalt application creates fumes and fire risk',
          'Difficult to locate leaks through multiple layers',
          'Longer installation time than single-ply',
        ],
      },
      {
        name: 'Polyiso Insulation (Tapered System)',
        description:
          'Rigid polyisocyanurate insulation boards factory-cut to create positive drainage slope, combined with flat boards to achieve required R-value.',
        lifespan: '25+ years (matches roof system)',
        priceRange: '$3.00-$6.00 per sq ft installed',
        pros: [
          'Eliminates ponding water through engineered slope',
          'Highest R-value per inch of rigid insulation',
          'Custom tapered layouts match any drain configuration',
          'Meets NJ energy code requirements',
        ],
        cons: [
          'Complex layout requires engineering',
          'R-value decreases slightly at very cold temperatures',
          'Must remain dry — any moisture infiltration degrades performance',
        ],
      },
    ],
    costFactors: [
      {
        factor: 'Building Size',
        description:
          'Total roof area is the primary cost driver. Larger roofs benefit from economies of scale in material procurement and crew efficiency.',
        impact: 'high',
      },
      {
        factor: 'System Selection',
        description:
          'TPO is the most cost-effective single-ply. PVC commands a 15-25% premium. BUR costs vary with the number of plies specified.',
        impact: 'high',
      },
      {
        factor: 'Structural Deck Repairs',
        description:
          'Deteriorated steel or concrete decking from years of leaks can add substantial cost. Old wood-deck buildings may need full deck replacement.',
        impact: 'high',
      },
      {
        factor: 'Rooftop Equipment Coordination',
        description:
          'HVAC units often need temporary disconnection and curb raising/rebuilding during roof replacement. Coordination with mechanical contractors adds cost and scheduling complexity.',
        impact: 'moderate',
      },
      {
        factor: 'Warranty Level',
        description:
          'Standard manufacturer warranties (10-year) are included. Premium NDL (No Dollar Limit) warranties of 20-30 years require thicker membrane, additional manufacturer inspections, and premium pricing.',
        impact: 'moderate',
      },
      {
        factor: 'Phased Installation',
        description:
          'Buildings that cannot have the entire roof opened simultaneously (hospitals, data centers) require phased tear-off with nightly temporary waterproofing, increasing labor.',
        impact: 'moderate',
      },
    ],
    faqs: [
      {
        question: 'How long does a commercial roof replacement take?',
        answer:
          'Timeline depends on building size and system complexity. A 10,000 sq ft building typically takes 3-5 weeks. A 50,000 sq ft building takes 8-12 weeks. A 100,000+ sq ft project can take 3-6 months. Weather delays are common in Hudson County\'s variable climate.',
      },
      {
        question: 'Can the building remain occupied during replacement?',
        answer:
          'Yes. We design our phasing plan to minimize disruption. Tear-off is done in sections with nightly temporary waterproofing. Interior protection measures are maintained throughout. We coordinate with building management for noise-sensitive tenants and access requirements.',
      },
      {
        question: 'What is an NDL warranty and is it worth it?',
        answer:
          'An NDL (No Dollar Limit) warranty from the membrane manufacturer covers 100% of material and labor costs for any warranty-covered failure for the full warranty period (typically 20-30 years). It is absolutely worth it for any building you plan to own long-term. The premium over a standard warranty is typically 5-10% of total project cost.',
      },
      {
        question: 'How do you handle occupied retail or office spaces below?',
        answer:
          'We install interior protection (plastic sheeting, floor protection) in sensitive areas. Tear-off is scheduled in sections to minimize exposure time. Any water intrusion during construction is addressed immediately with our standby interior crew. We maintain 24-hour emergency contact throughout the project.',
      },
      {
        question: 'What happens to rooftop HVAC equipment during replacement?',
        answer:
          'HVAC units are temporarily disconnected and either raised on temporary supports or moved. New curbs are built at the correct height for the new roof system. We coordinate with your mechanical contractor to minimize downtime. Some units can remain operational during phased sections.',
      },
    ],
    commonProblems: [
      'End-of-life roof system with widespread membrane failure',
      'Extensive moisture infiltration saturating insulation throughout',
      'Structural deck deterioration from prolonged leaking',
      'Energy code non-compliance requiring insulation upgrades',
      'Failed previous roof installation beyond repair',
    ],
    relatedServices: ['flat-roof-systems', 'commercial-repair', 'roof-maintenance'],
    emergencyAvailable: false,
    typicalDuration: '3-12 weeks depending on building size and complexity',
    warrantyInfo:
      '10-year workmanship warranty. Manufacturer NDL warranties from 15-30 years available from GAF, Carlisle, Firestone, and Johns Manville.',
  },
} as const satisfies Record<string, Service>;

export function getService(slug: string): Service | undefined {
  return SERVICES[slug as keyof typeof SERVICES];
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(SERVICES);
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return Object.values(SERVICES).filter((s) => s.category === category);
}

export function getResidentialServiceSlugs(): string[] {
  return Object.values(SERVICES)
    .filter((s) => s.category === 'residential')
    .map((s) => s.slug);
}

export function getCommercialServiceSlugs(): string[] {
  return Object.values(SERVICES)
    .filter((s) => s.category === 'commercial')
    .map((s) => s.slug);
}
