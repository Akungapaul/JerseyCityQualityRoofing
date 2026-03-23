import type { Municipality } from './types';

export const MUNICIPALITIES = {
  'jersey-city': {
    name: 'Jersey City',
    slug: 'jersey-city',
    county: 'Hudson',
    population: 292449,
    zipCodes: ['07302', '07304', '07305', '07306', '07307', '07310', '07311'],
    neighborhoods: [
      'Downtown',
      'Journal Square',
      'The Heights',
      'Greenville',
      'Bergen-Lafayette',
      'West Side',
    ],
    landmarks: [
      {
        name: 'Liberty State Park',
        description:
          'A 1,212-acre state park on Upper New York Bay offering sweeping views of the Statue of Liberty and Ellis Island.',
        significance:
          'Waterfront proximity exposes nearby roofs to salt air, high winds, and accelerated material degradation.',
      },
      {
        name: 'Colgate Clock',
        description:
          'A 50-foot octagonal clock on the Jersey City waterfront, one of the largest in the world.',
        significance:
          'Located in the Exchange Place waterfront district where modern high-rises require specialized commercial roofing maintenance.',
      },
      {
        name: 'Loew\'s Jersey Theatre',
        description:
          'A 1929 Baroque-style movie palace on Journal Square, restored and still operating as a performing arts venue.',
        significance:
          'Iconic example of the historic architecture in Journal Square that requires preservation-sensitive roof work.',
      },
      {
        name: 'Hamilton Park',
        description:
          'A Victorian-era park surrounded by restored brownstones in the Paulus Hook Historic District.',
        significance:
          'The surrounding historic district has strict guidelines for roofing materials and techniques on landmarked properties.',
      },
      {
        name: 'Central Railroad of New Jersey Terminal',
        description:
          'A restored 1889 railroad terminal within Liberty State Park, listed on the National Register of Historic Places.',
        significance:
          'Represents the historic industrial architecture that defines many Jersey City neighborhoods and their roofing needs.',
      },
      {
        name: 'Journal Square Transportation Center',
        description:
          'A major PATH train station and transit hub serving the Journal Square neighborhood.',
        significance:
          'The surrounding commercial district contains diverse building types requiring both flat commercial and pitched residential roofing.',
      },
    ],
    housingStock: {
      medianAge: 75,
      dominantTypes: [
        'Brownstones',
        'Pre-war walk-ups',
        'Modern high-rises',
        'Row houses',
        'Multi-family homes',
      ],
      averageValue: 520000,
      totalUnits: 120000,
      ownerOccupied: 30,
      renterOccupied: 70,
    },
    architectureStyles: [
      'Brownstone',
      'Victorian',
      'Art Deco',
      'Modern glass high-rise',
      'Industrial loft conversion',
    ],
    weatherPatterns: {
      annualSnowfall: 28,
      annualRainfall: 50,
      avgSummerHigh: 86,
      avgWinterLow: 26,
      hurricaneRisk: 'moderate',
      norEasterFrequency: '2-3 per year',
      commonWeatherConcerns: [
        'Waterfront wind exposure accelerates shingle wear',
        'Salt air corrosion on metal roofing components',
        'Ice dam formation on older brownstones with poor insulation',
        'Hurricane-driven rain on high-rise flat roofs',
        'Freeze-thaw cycles cracking aging flat roof membranes',
      ],
    },
    buildingCodes: {
      jurisdictionName: 'Jersey City Division of Construction',
      codeEdition: '2021 IRC/IBC as adopted by NJ DCA',
      windSpeedRequirement: '115 mph per ASCE 7-22',
      permitRequired: true,
      inspectionRequired: true,
      specialRequirements: [
        'Historic district overlay permits for Paulus Hook, Van Vorst Park, and Hamilton Park',
        'Waterfront zone wind load calculations required for Exchange Place corridor',
        'Fire-rated roofing required within 3 feet of property lines on attached row houses',
        'Asbestos inspection required for pre-1980 buildings before tear-off',
      ],
    },
    commonRoofTypes: [
      'Asphalt architectural shingles',
      'Flat EPDM membrane',
      'Modified bitumen',
      'TPO single-ply (commercial)',
      'Slate (historic properties)',
    ],
    roofingConcerns: [
      'Waterfront salt air corrosion on metal flashing and fasteners',
      'Historic district permit requirements for landmarked brownstones',
      'Dense urban access challenges for equipment and materials delivery',
      'Aging flat roofs on pre-war multi-family buildings with ponding issues',
      'High-rise wind load demands exceeding standard residential specifications',
    ],
    nearbyHighways: ['I-78', 'NJ Turnpike (I-95)', 'Route 1/9', 'Route 139'],
    description:
      'Jersey City is the second-largest city in New Jersey and the largest municipality in Hudson County. Its diverse neighborhoods range from historic brownstone districts along the waterfront to pre-war residential areas in the Heights, creating a wide spectrum of roofing needs from heritage preservation to modern commercial flat-roof systems.',
    tier: 1,
  },

  'hoboken': {
    name: 'Hoboken',
    slug: 'hoboken',
    county: 'Hudson',
    population: 60419,
    zipCodes: ['07030'],
    neighborhoods: [
      'Hoboken Historic District',
      'Midtown',
      'Uptown',
      'Northwest Hoboken',
      'Southwest Hoboken',
    ],
    landmarks: [
      {
        name: 'Hoboken Terminal',
        description:
          'A 1907 Beaux-Arts railroad terminal and ferry landing on the National Register of Historic Places, serving NJ Transit and PATH trains.',
        significance:
          'Represents the ornate early 20th-century architecture common throughout Hoboken that demands skilled roof restoration.',
      },
      {
        name: 'Stevens Institute of Technology',
        description:
          'A prestigious engineering university founded in 1870, situated on Castle Point overlooking the Hudson River.',
        significance:
          'Its hilltop campus experiences higher wind exposure, reflecting the wind challenges faced by elevated properties citywide.',
      },
      {
        name: 'Sinatra Park',
        description:
          'A waterfront park named after Hoboken\'s most famous native son, Frank Sinatra, offering Manhattan skyline views.',
        significance:
          'The waterfront esplanade area features newer residential construction with flat and green roof systems.',
      },
      {
        name: 'Pier A Park',
        description:
          'A public park built on a renovated pier extending into the Hudson River at the southern tip of Hoboken.',
        significance:
          'Adjacent waterfront buildings face direct storm exposure and require enhanced wind-rated roofing systems.',
      },
      {
        name: 'Elysian Park',
        description:
          'A historic park in northern Hoboken, the site of the first organized baseball game in 1846.',
        significance:
          'Surrounded by some of Hoboken\'s oldest residential buildings with original slate and copper roofing systems.',
      },
    ],
    housingStock: {
      medianAge: 85,
      dominantTypes: [
        'Brownstones',
        'Pre-war walk-ups',
        'Row houses',
        'Modern luxury condos',
      ],
      averageValue: 680000,
      totalUnits: 28000,
      ownerOccupied: 35,
      renterOccupied: 65,
    },
    architectureStyles: [
      'Brownstone',
      'Federal',
      'Italianate',
      'Queen Anne Victorian',
      'Modern waterfront',
    ],
    weatherPatterns: {
      annualSnowfall: 28,
      annualRainfall: 50,
      avgSummerHigh: 86,
      avgWinterLow: 26,
      hurricaneRisk: 'moderate',
      norEasterFrequency: '2-3 per year',
      commonWeatherConcerns: [
        'Direct Hudson River wind exposure on waterfront properties',
        'Flood zone considerations for low-lying southern blocks',
        'Ice dam buildup on century-old brownstones with minimal insulation',
        'Nor\'easter-driven rain penetration on aging masonry parapets',
        'Salt air corrosion on copper and metal roofing details',
      ],
    },
    buildingCodes: {
      jurisdictionName: 'City of Hoboken Building Department',
      codeEdition: '2021 IRC/IBC as adopted by NJ DCA',
      windSpeedRequirement: '115 mph per ASCE 7-22',
      permitRequired: true,
      inspectionRequired: true,
      specialRequirements: [
        'Hoboken Historic District Commission review for exterior alterations on designated properties',
        'Rooftop deck permits require structural engineering review',
        'Green roof incentive program with expedited permitting',
        'Stormwater management requirements for rooftop drainage modifications',
      ],
    },
    commonRoofTypes: [
      'Flat EPDM membrane',
      'Modified bitumen',
      'Architectural asphalt shingles',
      'Standing seam copper (historic)',
      'TPO single-ply (new construction)',
    ],
    roofingConcerns: [
      'Historic district permit requirements for the Hoboken Historic District',
      'Dense row house shared-wall flashing challenges',
      'Waterfront wind and salt exposure on east-facing facades',
      'Rooftop deck integration without compromising roof integrity',
      'Aging brownstone parapets allowing water infiltration',
    ],
    nearbyHighways: ['NJ Route 139', 'Hoboken-Jersey City border via Observer Highway'],
    description:
      'Hoboken is a one-square-mile city known for its dense brownstone-lined streets, vibrant waterfront, and historic character. With a housing stock averaging 85+ years old and a designated Historic District covering much of the city, roofing work in Hoboken demands expertise in heritage preservation, flat roof membrane systems, and navigating strict permitting requirements.',
    tier: 1,
  },

  'bayonne': {
    name: 'Bayonne',
    slug: 'bayonne',
    county: 'Hudson',
    population: 71852,
    zipCodes: ['07002'],
    neighborhoods: [
      'Bergen Point',
      'Constable Hook',
      'Centerville',
      'Midtown Bayonne',
      'South Bayonne',
    ],
    landmarks: [
      {
        name: 'Bayonne Bridge',
        description:
          'A steel arch bridge connecting Bayonne to Staten Island, one of the longest steel arch bridges in the world when built in 1931.',
        significance:
          'Properties near the bridge approaches experience increased traffic vibration and industrial airborne particulate that accelerates roof degradation.',
      },
      {
        name: 'Stephen R. Gregg Park',
        description:
          'A 27-acre waterfront park along Newark Bay offering sports facilities and harbor views.',
        significance:
          'The surrounding residential area near the bay faces waterfront weather exposure similar to Jersey City and Hoboken.',
      },
      {
        name: 'Cape Liberty Cruise Port',
        description:
          'A cruise ship terminal on the Bayonne waterfront servicing Royal Caribbean and Celebrity cruise lines.',
        significance:
          'The port development has brought new commercial and hotel construction requiring modern flat roofing systems to the area.',
      },
      {
        name: 'Bayonne Dry Dock',
        description:
          'A historic shipyard and drydock facility dating to the early 1900s on the eastern shore of Bayonne.',
        significance:
          'Industrial heritage buildings in this zone require specialized commercial roof maintenance for large-span structures.',
      },
      {
        name: 'Kill Van Kull Waterfront',
        description:
          'The tidal strait between Bayonne and Staten Island, lined with parks, industrial sites, and residential neighborhoods.',
        significance:
          'Waterfront properties face salt spray exposure and heightened wind loads that reduce roofing material lifespan.',
      },
    ],
    housingStock: {
      medianAge: 65,
      dominantTypes: [
        'Two-family homes',
        'Cape Cod cottages',
        'Row houses',
        'Low-rise apartment buildings',
        'Single-family colonials',
      ],
      averageValue: 420000,
      totalUnits: 27000,
      ownerOccupied: 42,
      renterOccupied: 58,
    },
    architectureStyles: [
      'Cape Cod',
      'Colonial Revival',
      'Row house',
      'Post-war ranch',
      'Tudor Revival',
    ],
    weatherPatterns: {
      annualSnowfall: 28,
      annualRainfall: 50,
      avgSummerHigh: 86,
      avgWinterLow: 26,
      hurricaneRisk: 'moderate',
      norEasterFrequency: '2-3 per year',
      commonWeatherConcerns: [
        'Peninsula geography exposes roofs to wind from multiple directions',
        'Kill Van Kull salt spray accelerates flashing corrosion',
        'Ice dams on Cape Cod-style roofs with limited attic ventilation',
        'Storm surge flooding risk in low-lying Bergen Point area',
        'Heavy snow loads on low-pitched post-war ranch roofs',
      ],
    },
    buildingCodes: {
      jurisdictionName: 'City of Bayonne Construction Office',
      codeEdition: '2021 IRC/IBC as adopted by NJ DCA',
      windSpeedRequirement: '115 mph per ASCE 7-22',
      permitRequired: true,
      inspectionRequired: true,
      specialRequirements: [
        'Flood zone compliance for properties in FEMA-designated areas near Bergen Point',
        'Enhanced wind resistance documentation for waterfront zone properties',
        'Asbestos abatement required for pre-1978 residential tear-offs',
      ],
    },
    commonRoofTypes: [
      'Asphalt architectural shingles',
      '3-tab asphalt shingles',
      'Flat modified bitumen',
      'EPDM rubber membrane',
      'Metal standing seam (newer homes)',
    ],
    roofingConcerns: [
      'Peninsula wind exposure from Newark Bay and Kill Van Kull on three sides',
      'Aging two-family home roofs with deferred maintenance',
      'Cape Cod dormers prone to ice dam formation and valley leaks',
      'Industrial area soot and particulate buildup reducing roof reflectivity',
      'Flood zone properties requiring documentation for insurance compliance',
    ],
    nearbyHighways: ['NJ Turnpike Extension (I-78)', 'Route 440', 'Route 169'],
    description:
      'Bayonne is a peninsula city surrounded by water on three sides — Newark Bay to the west, the Kill Van Kull to the south, and New York Bay to the east. This unique geography exposes the city\'s predominantly residential roofs to wind, salt spray, and moisture from multiple directions, making weatherproofing and material selection critical for longevity.',
    tier: 1,
  },

  'north-bergen': {
    name: 'North Bergen',
    slug: 'north-bergen',
    county: 'Hudson',
    population: 64793,
    zipCodes: ['07047'],
    neighborhoods: [
      'Woodcliff',
      'Tyler Park',
      'Fairview',
      'Nungessers',
      'North Bergen Heights',
    ],
    landmarks: [
      {
        name: 'James J. Braddock North Hudson Park',
        description:
          'A 167-acre county park offering lakes, walking trails, and sports facilities, named after the famous boxer.',
        significance:
          'Homes surrounding this hilltop park sit on the Palisades ridge and face elevated wind exposure requiring enhanced roof anchoring.',
      },
      {
        name: 'Braddock Park',
        description:
          'A 19-acre park on the edge of the Palisades cliff with panoramic views of the Manhattan skyline.',
        significance:
          'The cliff-edge location demonstrates the extreme wind conditions that affect roofs in the elevated western sections of the township.',
      },
      {
        name: 'Tonnelle Avenue Commercial Corridor',
        description:
          'A major commercial strip running through North Bergen with auto dealerships, warehouses, and retail centers.',
        significance:
          'Contains the largest concentration of commercial flat-roof buildings in the township, requiring ongoing maintenance and repair services.',
      },
      {
        name: 'North Bergen Performing Arts Center',
        description:
          'A state-of-the-art performing arts venue within the North Bergen school complex on Kennedy Boulevard.',
        significance:
          'Represents the mix of institutional and commercial flat-roof structures that serve the community.',
      },
      {
        name: 'Palisades Cliff Ridge',
        description:
          'The dramatic geological escarpment running along the western edge of North Bergen, rising 300+ feet above the Hackensack River.',
        significance:
          'Properties along the Palisades ridge are exposed to significantly higher wind speeds, often exceeding code minimums during storms.',
      },
    ],
    housingStock: {
      medianAge: 55,
      dominantTypes: [
        'Multi-family apartment buildings',
        'Two-family homes',
        'Garden apartments',
        'Single-family colonials',
        'Townhouse developments',
      ],
      averageValue: 440000,
      totalUnits: 23000,
      ownerOccupied: 32,
      renterOccupied: 68,
    },
    architectureStyles: [
      'Post-war garden apartment',
      'Colonial',
      'Split-level',
      'Mid-century modern',
      'Contemporary townhouse',
    ],
    weatherPatterns: {
      annualSnowfall: 30,
      annualRainfall: 50,
      avgSummerHigh: 85,
      avgWinterLow: 25,
      hurricaneRisk: 'moderate',
      norEasterFrequency: '2-3 per year',
      commonWeatherConcerns: [
        'Palisades ridge wind acceleration creating uplift hazards',
        'Greater snowfall accumulation at higher elevations',
        'Rapid temperature swings between ridge and lowland areas',
        'Ice dam formation on split-level and colonial rooflines',
        'Wind-driven rain penetration on west-facing slopes',
      ],
    },
    buildingCodes: {
      jurisdictionName: 'Township of North Bergen Construction Department',
      codeEdition: '2021 IRC/IBC as adopted by NJ DCA',
      windSpeedRequirement: '115 mph per ASCE 7-22',
      permitRequired: true,
      inspectionRequired: true,
      specialRequirements: [
        'Enhanced wind resistance requirements for Palisades ridge properties',
        'Commercial flat roof inspections for Tonnelle Avenue corridor buildings',
        'Stormwater management review for large roof area modifications',
      ],
    },
    commonRoofTypes: [
      'Asphalt architectural shingles',
      'Flat EPDM membrane',
      'Modified bitumen',
      'TPO commercial systems',
      'Metal standing seam',
    ],
    roofingConcerns: [
      'Palisades ridge wind exposure exceeding standard specifications',
      'Large inventory of aging garden apartment flat roofs needing replacement',
      'Split-level and colonial roof complexity with multiple valleys and hips',
      'Commercial corridor flat roofs on Tonnelle Avenue requiring regular maintenance',
      'Elevation-driven temperature differentials causing accelerated thermal cycling',
    ],
    nearbyHighways: ['NJ Turnpike (I-95)', 'Route 1/9', 'Route 495 (Lincoln Tunnel approach)'],
    description:
      'North Bergen is a township perched on the Palisades ridge with significant elevation changes that create unique roofing challenges. The mix of residential neighborhoods on the heights and commercial corridors along Tonnelle Avenue at lower elevation means roofing contractors must handle everything from wind-rated residential shingle work to large commercial flat-roof systems.',
    tier: 1,
  },

  'union-city': {
    name: 'Union City',
    slug: 'union-city',
    county: 'Hudson',
    population: 73999,
    zipCodes: ['07087'],
    neighborhoods: [
      'West Hoboken',
      'Union Hill',
      'Heights',
      'Transfer Station area',
    ],
    landmarks: [
      {
        name: 'Bergenline Avenue',
        description:
          'One of the busiest commercial streets in New Jersey, stretching through Union City with hundreds of small businesses.',
        significance:
          'The dense commercial corridor features mixed-use buildings with flat roofs over retail storefronts and residential units above.',
      },
      {
        name: 'Park Theatre',
        description:
          'A historic vaudeville-era theater on Bergenline Avenue, part of Union City\'s rich performing arts heritage.',
        significance:
          'Example of the early 20th-century commercial architecture with ornate parapets and flat roofs requiring preservation-aware maintenance.',
      },
      {
        name: 'William Musto Cultural Center',
        description:
          'A community cultural center offering arts programming in a renovated historic building.',
        significance:
          'Represents the adaptive reuse of older buildings where roof upgrades must balance modern performance with structural limitations.',
      },
      {
        name: 'Union City Reservoir',
        description:
          'A historic water supply reservoir that once served the community, now a neighborhood landmark.',
        significance:
          'The surrounding residential area features some of the densest row house construction in Hudson County.',
      },
      {
        name: 'Palisade Avenue',
        description:
          'A major north-south avenue running along the Palisades cliff edge with views of the Meadowlands.',
        significance:
          'Properties along this avenue experience elevated wind conditions due to the cliff-edge topography.',
      },
    ],
    housingStock: {
      medianAge: 80,
      dominantTypes: [
        'Row houses',
        'Multi-family walk-ups',
        'Mixed-use commercial/residential',
        'Pre-war apartment buildings',
      ],
      averageValue: 395000,
      totalUnits: 25000,
      ownerOccupied: 22,
      renterOccupied: 78,
    },
    architectureStyles: [
      'Row house',
      'Pre-war walk-up',
      'Victorian',
      'Mixed-use commercial',
      'Early 20th-century brick',
    ],
    weatherPatterns: {
      annualSnowfall: 28,
      annualRainfall: 50,
      avgSummerHigh: 86,
      avgWinterLow: 26,
      hurricaneRisk: 'moderate',
      norEasterFrequency: '2-3 per year',
      commonWeatherConcerns: [
        'Dense row house construction trapping heat and moisture between shared walls',
        'Flat roof ponding on aging multi-family buildings',
        'Parapet wall deterioration allowing water infiltration at roof edges',
        'Limited ventilation in row house attics causing condensation damage',
        'Ice dam formation along shared-wall party lines',
      ],
    },
    buildingCodes: {
      jurisdictionName: 'City of Union City Construction Department',
      codeEdition: '2021 IRC/IBC as adopted by NJ DCA',
      windSpeedRequirement: '115 mph per ASCE 7-22',
      permitRequired: true,
      inspectionRequired: true,
      specialRequirements: [
        'Shared-wall fire separation compliance for row house roofing',
        'Commercial occupancy requirements for mixed-use building roofs',
        'Lead paint assessment for pre-1978 buildings during roof tear-off',
      ],
    },
    commonRoofTypes: [
      'Flat EPDM membrane',
      'Modified bitumen',
      '3-tab asphalt shingles',
      'Built-up roofing (BUR)',
      'TPO single-ply',
    ],
    roofingConcerns: [
      'Densest municipality in NJ makes equipment access extremely difficult',
      'Shared-wall row house construction complicates individual roof repairs',
      'High percentage of flat roofs on aging multi-family buildings',
      'Deferred maintenance on renter-occupied buildings with absentee landlords',
      'Mixed-use buildings requiring both commercial and residential roofing expertise',
    ],
    nearbyHighways: ['Route 495 (Lincoln Tunnel approach)', 'JFK Boulevard East'],
    description:
      'Union City is the most densely populated city in New Jersey, with tightly packed row houses and walk-up apartment buildings lining its steep hillside streets. The extreme density creates unique roofing challenges — limited access for equipment, shared-wall complexities, and a high concentration of aging flat roofs on multi-family buildings that need expert maintenance and replacement.',
    tier: 2,
  },

  'west-new-york': {
    name: 'West New York',
    slug: 'west-new-york',
    county: 'Hudson',
    population: 54399,
    zipCodes: ['07093'],
    neighborhoods: [
      'Bergenline',
      'Boulevard East',
      'Park Avenue area',
      'Palisades',
    ],
    landmarks: [
      {
        name: 'Boulevard East',
        description:
          'A scenic boulevard running along the top of the Palisades cliffs with direct views of the Manhattan skyline.',
        significance:
          'Properties on Boulevard East face extreme wind exposure from the cliff edge that tests roof integrity during storms.',
      },
      {
        name: 'Old Glory Park',
        description:
          'A small park on Boulevard East featuring panoramic views of the Hudson River and New York City skyline.',
        significance:
          'The park\'s cliff-top location illustrates the wind corridor effect that impacts nearby residential roofing.',
      },
      {
        name: 'Bergenline Avenue (West New York section)',
        description:
          'The continuation of the major commercial corridor through West New York, dense with shops and restaurants.',
        significance:
          'Mixed-use buildings along this stretch require flat roof maintenance for both commercial and residential functions.',
      },
      {
        name: 'James J. Braddock Park (south section)',
        description:
          'The southern portion of the large county park extends into West New York with sports fields and picnic areas.',
        significance:
          'The park creates a wind buffer for nearby homes but also channels wind through adjacent streets.',
      },
      {
        name: 'West New York Waterfront',
        description:
          'The developing waterfront area along the Hudson River at the base of the Palisades cliffs.',
        significance:
          'New luxury construction in this zone uses modern roofing systems designed for waterfront conditions.',
      },
    ],
    housingStock: {
      medianAge: 70,
      dominantTypes: [
        'Multi-family walk-ups',
        'High-rise apartments',
        'Row houses',
        'Garden apartments',
      ],
      averageValue: 410000,
      totalUnits: 22000,
      ownerOccupied: 20,
      renterOccupied: 80,
    },
    architectureStyles: [
      'Pre-war walk-up',
      'Mid-century high-rise',
      'Row house',
      'Garden apartment',
      'Modern luxury',
    ],
    weatherPatterns: {
      annualSnowfall: 28,
      annualRainfall: 50,
      avgSummerHigh: 86,
      avgWinterLow: 26,
      hurricaneRisk: 'moderate',
      norEasterFrequency: '2-3 per year',
      commonWeatherConcerns: [
        'Palisades cliff-edge wind acceleration on Boulevard East properties',
        'Flat roof ponding on high-rise apartment buildings',
        'Wind-driven rain penetration on west-facing walls and roof junctions',
        'Ice formation on exposed cliff-side roofs',
        'Storm debris impact from Palisades tree line',
      ],
    },
    buildingCodes: {
      jurisdictionName: 'Town of West New York Building Department',
      codeEdition: '2021 IRC/IBC as adopted by NJ DCA',
      windSpeedRequirement: '115 mph per ASCE 7-22',
      permitRequired: true,
      inspectionRequired: true,
      specialRequirements: [
        'High-rise roofing requires registered design professional sign-off',
        'Palisade cliff setback compliance for roof-mounted equipment',
        'Enhanced drainage requirements for Boulevard East properties',
      ],
    },
    commonRoofTypes: [
      'Flat EPDM membrane',
      'Modified bitumen',
      'TPO single-ply',
      'Asphalt architectural shingles',
      'Built-up roofing (BUR)',
    ],
    roofingConcerns: [
      'Palisades cliff-edge wind exposure on east-facing properties',
      'High-rise apartment roof systems requiring specialized access equipment',
      'Dense multi-family construction limiting ground-level staging areas',
      'Aging walk-up flat roofs with chronic ponding and drainage issues',
      'Boulevard East luxury properties demanding premium roofing aesthetics',
    ],
    nearbyHighways: ['Route 495', 'Boulevard East', 'JFK Boulevard'],
    description:
      'West New York sits atop the Palisades cliffs overlooking the Hudson River, offering dramatic Manhattan views but also exposing roofs to powerful winds funneled along the cliff edge. The town\'s mix of aging walk-up apartments, mid-century high-rises, and newer luxury developments creates demand for the full range of roofing services from emergency flat roof repair to premium residential installations.',
    tier: 2,
  },

  'secaucus': {
    name: 'Secaucus',
    slug: 'secaucus',
    county: 'Hudson',
    population: 21305,
    zipCodes: ['07094'],
    neighborhoods: [
      'Harmon Cove',
      'Clarendon',
      'Riverside',
      'Millridge',
      'The Bluffs',
    ],
    landmarks: [
      {
        name: 'Meadowlands',
        description:
          'An expansive wetland ecosystem bordering Secaucus, once marshland now partially developed with commercial centers.',
        significance:
          'The Meadowlands humidity and proximity to wetlands creates persistent moisture conditions that challenge roof longevity.',
      },
      {
        name: 'Secaucus Junction',
        description:
          'A major NJ Transit rail transfer station providing access to multiple train lines across northern New Jersey.',
        significance:
          'The transit hub is surrounded by large commercial and hotel properties with extensive flat-roof systems.',
      },
      {
        name: 'Harmon Cove',
        description:
          'A planned townhouse community of over 1,600 units built in the 1970s-80s on the banks of the Hackensack River.',
        significance:
          'The largest residential development in Secaucus, its waterfront townhouses face unique moisture and wind challenges.',
      },
      {
        name: 'The Outlets at Secaucus',
        description:
          'A major outlet shopping destination attracting visitors from across the tri-state area.',
        significance:
          'Large retail commercial roofs require ongoing maintenance, drainage management, and periodic membrane replacement.',
      },
      {
        name: 'Mill Creek Point Park',
        description:
          'A waterfront park along the Hackensack River with walking trails and wildlife viewing areas.',
        significance:
          'The riverfront environment creates high humidity conditions that promote algae and moss growth on roofing materials.',
      },
    ],
    housingStock: {
      medianAge: 40,
      dominantTypes: [
        'Townhouses',
        'Condominiums',
        'Single-family homes',
        'Garden apartments',
        'Planned communities',
      ],
      averageValue: 500000,
      totalUnits: 8200,
      ownerOccupied: 55,
      renterOccupied: 45,
    },
    architectureStyles: [
      'Contemporary townhouse',
      'Colonial Revival',
      'Planned community modern',
      'Commercial warehouse',
      'Post-war ranch',
    ],
    weatherPatterns: {
      annualSnowfall: 28,
      annualRainfall: 50,
      avgSummerHigh: 87,
      avgWinterLow: 25,
      hurricaneRisk: 'moderate',
      norEasterFrequency: '2-3 per year',
      commonWeatherConcerns: [
        'Meadowlands humidity promoting algae and moss growth on shingles',
        'Low-lying terrain increasing flood and moisture exposure',
        'Persistent dampness reducing roof material lifespan',
        'Wind channeling through Meadowlands open terrain',
        'Standing water conditions around foundations affecting roof drainage systems',
      ],
    },
    buildingCodes: {
      jurisdictionName: 'Town of Secaucus Building Department',
      codeEdition: '2021 IRC/IBC as adopted by NJ DCA',
      windSpeedRequirement: '115 mph per ASCE 7-22',
      permitRequired: true,
      inspectionRequired: true,
      specialRequirements: [
        'Wetlands buffer zone compliance for properties adjacent to Meadowlands',
        'HOA coordination required for Harmon Cove and planned community roof work',
        'Commercial warehouse roofing requires fire-rated assemblies',
      ],
    },
    commonRoofTypes: [
      'Asphalt architectural shingles',
      'TPO commercial systems',
      'EPDM flat membrane',
      'Metal standing seam',
      'Modified bitumen (commercial)',
    ],
    roofingConcerns: [
      'Meadowlands moisture promoting algae, moss, and mildew on roof surfaces',
      'Townhouse HOA requirements for uniform roofing materials and colors',
      'Large commercial warehouse roofs requiring specialized maintenance equipment',
      'Low-lying terrain with poor natural drainage stressing roof drainage systems',
      'Harmon Cove waterfront townhouses facing humidity and wind exposure',
    ],
    nearbyHighways: ['NJ Turnpike (I-95)', 'Route 3', 'Route 1/9'],
    description:
      'Secaucus occupies a unique position within Hudson County, surrounded by the Meadowlands wetlands rather than perched on the urban waterfront. Its lower-density suburban character features townhouse communities like Harmon Cove, commercial warehouse districts, and planned residential developments — all facing persistent moisture challenges from the surrounding marshland that demand moisture-resistant roofing solutions.',
    tier: 2,
  },

  'kearny': {
    name: 'Kearny',
    slug: 'kearny',
    county: 'Hudson',
    population: 43671,
    zipCodes: ['07032'],
    neighborhoods: [
      'Kearny Center',
      'North Arlington border',
      'South Kearny',
      'West Kearny',
      'Gunnell Oval area',
    ],
    landmarks: [
      {
        name: 'Kearny Point',
        description:
          'A 130-acre former shipyard and industrial complex being redeveloped into a creative and commercial hub on the Hackensack River.',
        significance:
          'The adaptive reuse of massive industrial buildings requires specialized commercial roofing for large-span structures.',
      },
      {
        name: 'Gunnell Oval',
        description:
          'A historic recreational oval in the center of town, home to the Kearny Scots soccer tradition.',
        significance:
          'The surrounding residential neighborhood features classic early 20th-century homes with aging roofs in need of replacement.',
      },
      {
        name: 'Passaic Avenue',
        description:
          'The main commercial corridor of Kearny, running north-south through the center of town.',
        significance:
          'Mixed-use buildings along this corridor represent typical commercial flat-roof maintenance needs.',
      },
      {
        name: 'Kearny Marsh',
        description:
          'A section of the Meadowlands wetlands bordering South Kearny, home to diverse bird species and ongoing environmental remediation.',
        significance:
          'Industrial and commercial properties near the marsh face extreme humidity and environmental contamination challenges.',
      },
      {
        name: 'West Hudson Park',
        description:
          'A 46-acre county park shared between Kearny and Harrison, featuring sports fields and an Olympic-sized pool.',
        significance:
          'The park district contains a mix of residential styles from Victorian to modern, reflecting the diverse roofing needs of the community.',
      },
    ],
    housingStock: {
      medianAge: 60,
      dominantTypes: [
        'Single-family homes',
        'Two-family homes',
        'Cape Cod cottages',
        'Multi-family apartment buildings',
        'Industrial conversions',
      ],
      averageValue: 430000,
      totalUnits: 16000,
      ownerOccupied: 48,
      renterOccupied: 52,
    },
    architectureStyles: [
      'Colonial Revival',
      'Cape Cod',
      'Victorian',
      'Industrial loft',
      'Post-war ranch',
    ],
    weatherPatterns: {
      annualSnowfall: 28,
      annualRainfall: 50,
      avgSummerHigh: 87,
      avgWinterLow: 25,
      hurricaneRisk: 'moderate',
      norEasterFrequency: '2-3 per year',
      commonWeatherConcerns: [
        'Meadowlands proximity creating persistent high humidity',
        'Industrial heat island effect in South Kearny raising roof temperatures',
        'Hackensack River flood risk for low-lying properties',
        'Ice dam formation on older colonial and Cape Cod roof designs',
        'Wind exposure in flat, open terrain near the Meadowlands',
      ],
    },
    buildingCodes: {
      jurisdictionName: 'Town of Kearny Construction Department',
      codeEdition: '2021 IRC/IBC as adopted by NJ DCA',
      windSpeedRequirement: '115 mph per ASCE 7-22',
      permitRequired: true,
      inspectionRequired: true,
      specialRequirements: [
        'Environmental remediation compliance for South Kearny industrial zone roof work',
        'Flood zone building requirements for properties near Hackensack River',
        'Historic district considerations for Kearny center residential area',
      ],
    },
    commonRoofTypes: [
      'Asphalt architectural shingles',
      '3-tab asphalt shingles',
      'Flat EPDM membrane',
      'Metal standing seam (industrial)',
      'Modified bitumen',
    ],
    roofingConcerns: [
      'Industrial zone contaminants and soot buildup on roof surfaces',
      'Meadowlands humidity promoting biological growth on shingles',
      'Aging housing stock with original roofing materials past useful life',
      'Large industrial buildings requiring specialized commercial roofing contractors',
      'Hackensack River flood zone properties needing insurance-compliant documentation',
    ],
    nearbyHighways: ['NJ Turnpike (I-95)', 'Route 7', 'Route 1/9'],
    description:
      'Kearny straddles the line between suburban residential and industrial, with traditional neighborhoods of colonial and Cape Cod homes in the north and large industrial complexes in South Kearny near the Meadowlands. This dual character means roofing contractors need expertise in both residential shingle systems and large-scale commercial flat-roof installations.',
    tier: 2,
  },

  'harrison': {
    name: 'Harrison',
    slug: 'harrison',
    county: 'Hudson',
    population: 19284,
    zipCodes: ['07029'],
    neighborhoods: [
      'Harrison Center',
      'Waterfront District',
      'Red Bull Arena area',
      'Riverbend District',
    ],
    landmarks: [
      {
        name: 'Red Bull Arena',
        description:
          'A 25,000-seat soccer-specific stadium, home to the New York Red Bulls of Major League Soccer.',
        significance:
          'The arena and surrounding development have transformed the waterfront, bringing modern construction with contemporary roofing systems.',
      },
      {
        name: 'Harrison PATH Station',
        description:
          'A PATH train station providing direct service to Newark, Jersey City, Hoboken, and Manhattan.',
        significance:
          'Transit-oriented development around the station features new residential construction requiring modern roofing installation.',
      },
      {
        name: 'Harrison Waterfront',
        description:
          'A rapidly developing waterfront area along the Passaic River with luxury apartments, retail, and parks.',
        significance:
          'New luxury buildings along the Passaic River use modern flat and low-slope roofing systems designed for waterfront conditions.',
      },
      {
        name: 'West Hudson Park',
        description:
          'A 46-acre park shared with Kearny, one of the largest green spaces in the West Hudson area.',
        significance:
          'The park neighborhood features older homes that contrast with the new waterfront development, showing the town\'s transition.',
      },
      {
        name: 'Harrison Avenue Historic District',
        description:
          'The traditional main street of Harrison with early 20th-century commercial and residential buildings.',
        significance:
          'Older brick and frame buildings along Harrison Avenue require traditional roofing repair and maintenance expertise.',
      },
    ],
    housingStock: {
      medianAge: 45,
      dominantTypes: [
        'New luxury apartments',
        'Traditional two-family homes',
        'Townhouses',
        'Pre-war row houses',
        'Garden apartments',
      ],
      averageValue: 460000,
      totalUnits: 8500,
      ownerOccupied: 28,
      renterOccupied: 72,
    },
    architectureStyles: [
      'Modern luxury',
      'Traditional colonial',
      'Row house',
      'Industrial conversion',
      'Contemporary townhouse',
    ],
    weatherPatterns: {
      annualSnowfall: 28,
      annualRainfall: 50,
      avgSummerHigh: 87,
      avgWinterLow: 25,
      hurricaneRisk: 'moderate',
      norEasterFrequency: '2-3 per year',
      commonWeatherConcerns: [
        'Passaic River flood risk for waterfront development properties',
        'Industrial heat retention in the former factory district',
        'Moisture migration from river proximity into older building envelopes',
        'Construction zone debris during ongoing waterfront development',
        'Wind tunneling between new high-rise residential buildings',
      ],
    },
    buildingCodes: {
      jurisdictionName: 'Town of Harrison Construction Department',
      codeEdition: '2021 IRC/IBC as adopted by NJ DCA',
      windSpeedRequirement: '115 mph per ASCE 7-22',
      permitRequired: true,
      inspectionRequired: true,
      specialRequirements: [
        'Redevelopment zone compliance for waterfront district construction',
        'Flood zone FEMA compliance for Passaic River-adjacent properties',
        'New construction energy code requirements including roof insulation R-values',
      ],
    },
    commonRoofTypes: [
      'TPO single-ply (new construction)',
      'Asphalt architectural shingles',
      'Flat EPDM membrane',
      'Modified bitumen',
      'Green roof systems (new development)',
    ],
    roofingConcerns: [
      'New construction warranty coordination with general contractors',
      'Passaic River flood zone documentation requirements',
      'Transitional neighborhood mixing old and new roofing needs',
      'Waterfront humidity challenging both new and existing roof systems',
      'HOA and management company requirements for luxury apartment roofing',
    ],
    nearbyHighways: ['I-280', 'Route 1/9', 'NJ Turnpike (I-95)'],
    description:
      'Harrison is undergoing a dramatic transformation from a quiet industrial town to a vibrant waterfront community. New luxury apartment complexes along the Passaic River sit alongside traditional two-family homes on tree-lined streets, creating a dual roofing market: modern flat-roof systems for new construction and traditional repair and replacement for the established residential neighborhoods.',
    tier: 3,
  },

  'east-newark': {
    name: 'East Newark',
    slug: 'east-newark',
    county: 'Hudson',
    population: 2906,
    zipCodes: ['07029'],
    neighborhoods: [
      'East Newark Center',
      'Grant Avenue area',
      'Third Street corridor',
    ],
    landmarks: [
      {
        name: 'East Newark Borough Hall',
        description:
          'The municipal government building serving the smallest borough in Hudson County.',
        significance:
          'The compact borough has a concentrated inventory of residential roofs that can be efficiently served by a local roofing contractor.',
      },
      {
        name: 'Passaic River Bridge (Raymond Boulevard)',
        description:
          'The bridge connecting East Newark to Newark across the Passaic River.',
        significance:
          'Properties near the bridge approach face traffic vibration and urban air quality conditions affecting roof materials.',
      },
      {
        name: 'Grant Avenue',
        description:
          'The main commercial street of East Newark, a short corridor with local businesses and residences.',
        significance:
          'Mixed-use buildings along this street represent the borough\'s commercial roofing needs concentrated in a small area.',
      },
      {
        name: 'East Newark Elementary School',
        description:
          'The borough\'s public elementary school, one of the few institutional buildings in the small community.',
        significance:
          'Institutional flat-roof maintenance is a key part of the small borough\'s infrastructure needs.',
      },
      {
        name: 'Passaic River Waterfront',
        description:
          'A narrow strip of waterfront along the Passaic River at the eastern edge of the borough.',
        significance:
          'River-adjacent properties face moisture and humidity conditions that affect roofing material choices.',
      },
    ],
    housingStock: {
      medianAge: 75,
      dominantTypes: [
        'Two-family homes',
        'Row houses',
        'Small multi-family buildings',
        'Single-family homes',
      ],
      averageValue: 350000,
      totalUnits: 1200,
      ownerOccupied: 35,
      renterOccupied: 65,
    },
    architectureStyles: [
      'Row house',
      'Victorian',
      'Pre-war frame',
      'Early 20th-century brick',
    ],
    weatherPatterns: {
      annualSnowfall: 28,
      annualRainfall: 50,
      avgSummerHigh: 87,
      avgWinterLow: 25,
      hurricaneRisk: 'moderate',
      norEasterFrequency: '2-3 per year',
      commonWeatherConcerns: [
        'Passaic River humidity affecting older frame construction roofs',
        'Aging roofing materials on 75+ year old housing stock',
        'Limited drainage infrastructure compounding flat roof ponding',
        'Dense building proximity creating moisture retention between structures',
        'Industrial air quality from surrounding areas depositing particulate on roofs',
      ],
    },
    buildingCodes: {
      jurisdictionName: 'Borough of East Newark Construction Office',
      codeEdition: '2021 IRC/IBC as adopted by NJ DCA',
      windSpeedRequirement: '115 mph per ASCE 7-22',
      permitRequired: true,
      inspectionRequired: true,
      specialRequirements: [
        'Small lot coverage requiring careful material staging plans',
        'Shared-wall construction compliance for row house roofing',
      ],
    },
    commonRoofTypes: [
      'Asphalt 3-tab shingles',
      'Asphalt architectural shingles',
      'Flat modified bitumen',
      'EPDM rubber membrane',
    ],
    roofingConcerns: [
      'Aging housing stock with many roofs past their expected lifespan',
      'Shared-wall row house construction complicating individual repairs',
      'Limited street access for large roofing equipment in the compact borough',
      'High renter-occupancy leading to deferred maintenance',
      'Passaic River moisture affecting building envelope integrity',
    ],
    nearbyHighways: ['Route 1/9', 'I-280'],
    description:
      'East Newark is the smallest borough in Hudson County, just 0.11 square miles, but its tightly packed residential streets contain a concentrated inventory of aging two-family homes and row houses. The small footprint and proximity to the Passaic River create a microenvironment where moisture management and access logistics are primary roofing considerations.',
    tier: 3,
  },

  'guttenberg': {
    name: 'Guttenberg',
    slug: 'guttenberg',
    county: 'Hudson',
    population: 12016,
    zipCodes: ['07093'],
    neighborhoods: [
      'Boulevard East',
      'Park Avenue area',
      'Galaxy Towers area',
      'Central Guttenberg',
    ],
    landmarks: [
      {
        name: 'Galaxy Towers',
        description:
          'Three distinctive Y-shaped residential towers built in the 1970s, one of the tallest structures in Hudson County outside Jersey City.',
        significance:
          'High-rise flat-roof systems on these towers require specialized maintenance, waterproofing, and wind-rated repair techniques.',
      },
      {
        name: 'Boulevard East Promenade',
        description:
          'The continuation of the scenic Palisades cliff-top boulevard through Guttenberg with Manhattan skyline views.',
        significance:
          'Cliff-edge properties on Boulevard East experience the highest wind loads in the town, testing roof system integrity.',
      },
      {
        name: 'Guttenberg Town Hall',
        description:
          'The municipal government center of the small, densely populated town.',
        significance:
          'As the densest municipality in the United States, every roof project in Guttenberg faces extreme access and staging challenges.',
      },
      {
        name: 'Guttenberg Steamboat Ferry',
        description:
          'Historic site of a 19th-century ferry operation that connected Guttenberg to Manhattan before the bridges and tunnels.',
        significance:
          'The waterfront location speaks to the town\'s long exposure to Hudson River weather that impacts roofing longevity.',
      },
      {
        name: 'Park Avenue Commercial District',
        description:
          'A small but active commercial corridor serving the dense residential population of Guttenberg.',
        significance:
          'Mixed-use buildings with commercial ground floors and residential upper floors require dual roofing expertise.',
      },
    ],
    housingStock: {
      medianAge: 50,
      dominantTypes: [
        'High-rise apartments',
        'Mid-rise apartment buildings',
        'Multi-family walk-ups',
        'Mixed-use commercial/residential',
      ],
      averageValue: 380000,
      totalUnits: 5500,
      ownerOccupied: 25,
      renterOccupied: 75,
    },
    architectureStyles: [
      '1970s high-rise',
      'Mid-century apartment',
      'Pre-war walk-up',
      'Mixed-use commercial',
    ],
    weatherPatterns: {
      annualSnowfall: 28,
      annualRainfall: 50,
      avgSummerHigh: 86,
      avgWinterLow: 26,
      hurricaneRisk: 'moderate',
      norEasterFrequency: '2-3 per year',
      commonWeatherConcerns: [
        'Palisades cliff-edge wind acceleration on Boulevard East properties',
        'High-rise wind loads exceeding standard residential calculations',
        'Flat roof membrane stress from thermal cycling on exposed high-rises',
        'Salt air corrosion on high-elevation rooftop mechanical equipment',
        'Storm debris accumulation on flat roofs from cliff-top tree line',
      ],
    },
    buildingCodes: {
      jurisdictionName: 'Town of Guttenberg Building Department',
      codeEdition: '2021 IRC/IBC as adopted by NJ DCA',
      windSpeedRequirement: '115 mph per ASCE 7-22',
      permitRequired: true,
      inspectionRequired: true,
      specialRequirements: [
        'High-rise roofing requires licensed PE structural sign-off',
        'Rooftop equipment screening and setback requirements',
        'HOA and condo association approval process for shared roof work',
      ],
    },
    commonRoofTypes: [
      'Flat EPDM membrane',
      'TPO single-ply',
      'Modified bitumen',
      'Built-up roofing (BUR)',
      'Asphalt shingles (low-rise only)',
    ],
    roofingConcerns: [
      'High-rise flat roof systems requiring crane and specialized access equipment',
      'Extreme density limiting staging and material storage options',
      'Condo and co-op board approval processes slowing repair timelines',
      'Palisades wind exposure testing roof membrane adhesion and fastening',
      'Rooftop mechanical equipment complicating roof maintenance access',
    ],
    nearbyHighways: ['Boulevard East', 'JFK Boulevard'],
    description:
      'Guttenberg is often cited as the most densely populated municipality in the United States, with approximately 57,000 people per square mile. Dominated by high-rise and mid-rise apartment buildings along the Palisades cliff edge, nearly all roofing work here involves flat commercial systems — EPDM, TPO, and modified bitumen — maintained under extreme density and wind conditions.',
    tier: 3,
  },

  'weehawken': {
    name: 'Weehawken',
    slug: 'weehawken',
    county: 'Hudson',
    population: 16538,
    zipCodes: ['07086'],
    neighborhoods: [
      'Weehawken Waterfront',
      'The Heights',
      'King Avenue area',
      'Gregory Avenue area',
      'Lincoln Harbor',
    ],
    landmarks: [
      {
        name: 'Hamilton Park (Weehawken)',
        description:
          'The site of the famous 1804 duel between Alexander Hamilton and Aaron Burr on the Palisades cliff overlooking the Hudson River.',
        significance:
          'The historic Palisades cliff location exposes surrounding residential properties to severe wind uplift conditions.',
      },
      {
        name: 'Lincoln Harbor',
        description:
          'A waterfront mixed-use development featuring the former Hartz Mountain headquarters, hotels, and residential towers.',
        significance:
          'Large commercial and residential buildings in this development require ongoing commercial flat-roof maintenance and waterproofing.',
      },
      {
        name: 'Port Imperial Ferry Terminal',
        description:
          'A NY Waterway ferry terminal providing commuter ferry service between Weehawken and Midtown Manhattan.',
        significance:
          'The waterfront transit area is surrounded by luxury development with modern roofing systems exposed to river weather.',
      },
      {
        name: 'Weehawken Water Tower',
        description:
          'A distinctive brick water tower in the Heights neighborhood, a local landmark visible from many surrounding streets.',
        significance:
          'The Heights neighborhood around the tower features traditional homes with aging roofs on steep terrain.',
      },
      {
        name: 'Lincoln Tunnel Helix',
        description:
          'The famous spiraling approach road to the Lincoln Tunnel, one of the most recognizable infrastructure features in the area.',
        significance:
          'Properties near the helix experience elevated noise, vibration, and air quality conditions that affect roofing material selection.',
      },
    ],
    housingStock: {
      medianAge: 50,
      dominantTypes: [
        'Luxury waterfront condos',
        'Traditional single-family homes',
        'Two-family homes',
        'Mid-rise apartments',
        'Townhouses',
      ],
      averageValue: 550000,
      totalUnits: 7000,
      ownerOccupied: 40,
      renterOccupied: 60,
    },
    architectureStyles: [
      'Modern luxury waterfront',
      'Victorian',
      'Colonial Revival',
      'Contemporary townhouse',
      'Mid-century apartment',
    ],
    weatherPatterns: {
      annualSnowfall: 28,
      annualRainfall: 50,
      avgSummerHigh: 86,
      avgWinterLow: 26,
      hurricaneRisk: 'moderate',
      norEasterFrequency: '2-3 per year',
      commonWeatherConcerns: [
        'Palisades cliff wind exposure on Heights neighborhood properties',
        'Waterfront storm surge risk for Lincoln Harbor and Port Imperial areas',
        'Steep terrain creating differential snow load and ice dam conditions',
        'Salt spray from Hudson River affecting waterfront building roof components',
        'Wind tunneling between luxury high-rises along the waterfront',
      ],
    },
    buildingCodes: {
      jurisdictionName: 'Township of Weehawken Building Department',
      codeEdition: '2021 IRC/IBC as adopted by NJ DCA',
      windSpeedRequirement: '115 mph per ASCE 7-22',
      permitRequired: true,
      inspectionRequired: true,
      specialRequirements: [
        'Waterfront zone construction requires enhanced wind resistance documentation',
        'Steep slope access safety plans required for Heights neighborhood roof work',
        'Luxury condo HOA approval required before exterior roof modifications',
      ],
    },
    commonRoofTypes: [
      'TPO single-ply (waterfront)',
      'Asphalt architectural shingles',
      'Flat EPDM membrane',
      'Standing seam metal',
      'Modified bitumen',
    ],
    roofingConcerns: [
      'Dramatic elevation change between waterfront and Heights creating diverse wind conditions',
      'Luxury waterfront properties demanding premium materials and workmanship',
      'Steep terrain in the Heights making roof access and safety logistics complex',
      'Aging traditional homes in the Heights contrasting with new waterfront construction',
      'Lincoln Tunnel traffic corridor vibration affecting nearby building roofs',
    ],
    nearbyHighways: ['Route 495 (Lincoln Tunnel approach)', 'Boulevard East', 'JFK Boulevard'],
    description:
      'Weehawken is split dramatically between its waterfront — home to luxury high-rise developments at Lincoln Harbor and Port Imperial — and its Heights neighborhood of traditional homes perched atop the Palisades. This topographic divide creates two distinct roofing markets: modern commercial systems for waterfront properties and traditional residential services for the established hilltop community.',
    tier: 3,
  },
} as const satisfies Record<string, Municipality>;

export function getMunicipality(slug: string): Municipality | undefined {
  return MUNICIPALITIES[slug as keyof typeof MUNICIPALITIES];
}

export function getAllMunicipalitySlugs(): string[] {
  return Object.keys(MUNICIPALITIES);
}

export function getMunicipalitiesByTier(tier: 1 | 2 | 3): Municipality[] {
  return Object.values(MUNICIPALITIES).filter((m) => m.tier === tier);
}

export function getAllMunicipalities(): Municipality[] {
  return Object.values(MUNICIPALITIES);
}
