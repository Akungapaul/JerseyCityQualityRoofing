import type { GalleryProject } from "./types";

/**
 * Placeholder before image SVG data URI.
 * Darker gradient with "Before" text overlay.
 */
function beforePlaceholder(label: string): string {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#4a5040"/>
          <stop offset="100%" stop-color="#33382b"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg)"/>
      <text x="200" y="140" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="bold" fill="#b0ae9e" letter-spacing="4">BEFORE</text>
      <text x="200" y="175" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#b0ae9e">${label}</text>
    </svg>`,
  )}`;
}

/**
 * Placeholder after image SVG data URI.
 * Lighter gradient with "After" text overlay and accent color.
 */
function afterPlaceholder(label: string): string {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#3e4435"/>
          <stop offset="100%" stop-color="#2a2e22"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg)"/>
      <text x="200" y="140" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="bold" fill="#c89640" letter-spacing="4">AFTER</text>
      <text x="200" y="175" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#c89640">${label}</text>
    </svg>`,
  )}`;
}

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: "project-1",
    title: "Brownstone Roof Repair in Jersey City Heights",
    description:
      "Emergency leak repair on a century-old brownstone after a spring nor'easter tore off ridge cap shingles and exposed the underlayment. We replaced the damaged ridge line and sealed three flashing failures around the chimney.",
    serviceSlug: "roof-repair",
    citySlug: "jersey-city",
    beforeImage: beforePlaceholder("Damaged Ridge Cap"),
    afterImage: afterPlaceholder("Restored Ridge Line"),
    beforeAlt:
      "Damaged asphalt shingle ridge cap on brownstone rooftop in Jersey City Heights after storm",
    afterAlt:
      "Completed ridge cap repair with new architectural shingles on brownstone in Jersey City Heights",
    completionDate: "2025-03-15",
    projectDetails: [
      "Architectural Shingles",
      "2-Day Project",
      "Jersey City Heights",
      "Storm Damage Repair",
    ],
  },
  {
    id: "project-2",
    title: "Victorian Home Roof Repair in Hoboken",
    description:
      "Targeted repair on a three-story Victorian row house with persistent valley leaks. We removed deteriorated flashing along both valleys and installed new step flashing with ice and water shield underlayment.",
    serviceSlug: "roof-repair",
    citySlug: "hoboken",
    beforeImage: beforePlaceholder("Corroded Valley Flashing"),
    afterImage: afterPlaceholder("New Step Flashing Installed"),
    beforeAlt:
      "Corroded copper valley flashing on Victorian row house rooftop in midtown Hoboken",
    afterAlt:
      "Completed valley flashing replacement with ice and water shield on Victorian home in Hoboken",
    completionDate: "2025-05-10",
    projectDetails: [
      "Copper Flashing",
      "1-Day Project",
      "Midtown Hoboken",
      "Valley Leak Repair",
    ],
  },
  {
    id: "project-3",
    title: "Full Roof Replacement on Cape Cod in Bayonne",
    description:
      "Complete tear-off and replacement on a 1950s Cape Cod with three layers of old shingles. We stripped to the deck, replaced rotted sheathing, and installed a new GAF Timberline HDZ system with lifetime warranty.",
    serviceSlug: "roof-replacement",
    citySlug: "bayonne",
    beforeImage: beforePlaceholder("Three-Layer Tear-Off"),
    afterImage: afterPlaceholder("New GAF Timberline HDZ"),
    beforeAlt:
      "Deteriorated three-layer asphalt shingle roof on Cape Cod home in Bergen Point, Bayonne",
    afterAlt:
      "Completed GAF Timberline HDZ roof replacement on Cape Cod home in Bergen Point, Bayonne",
    completionDate: "2025-06-20",
    projectDetails: [
      "GAF Timberline HDZ",
      "4-Day Project",
      "Bergen Point",
      "Full Tear-Off",
    ],
  },
  {
    id: "project-4",
    title: "Colonial Roof Replacement in North Bergen",
    description:
      "Full replacement on a two-story Colonial along the Palisades ridge. High wind exposure required impact-resistant shingles rated for 130 mph winds. We also added continuous ridge ventilation to reduce attic heat buildup.",
    serviceSlug: "roof-replacement",
    citySlug: "north-bergen",
    beforeImage: beforePlaceholder("Wind-Damaged Shingles"),
    afterImage: afterPlaceholder("Impact-Resistant System"),
    beforeAlt:
      "Wind-damaged curling shingles on Colonial home along Palisades ridge in North Bergen",
    afterAlt:
      "Completed impact-resistant roof replacement with ridge vent on Colonial in North Bergen",
    completionDate: "2025-07-08",
    projectDetails: [
      "Impact-Resistant Shingles",
      "3-Day Project",
      "Palisades Ridge",
      "Ridge Vent Added",
    ],
  },
  {
    id: "project-5",
    title: "Annual Roof Inspection in Union City",
    description:
      "Comprehensive annual inspection on a multi-family property with a flat-to-sloped transition roof. We documented minor ponding on the flat section and recommended drainage improvements before the next storm season.",
    serviceSlug: "roof-inspection",
    citySlug: "union-city",
    beforeImage: beforePlaceholder("Ponding Detected"),
    afterImage: afterPlaceholder("Inspection Report Delivered"),
    beforeAlt:
      "Standing water ponding on flat roof section of multi-family building in Union City",
    afterAlt:
      "Completed professional roof inspection with documented report for multi-family building in Union City",
    completionDate: "2025-04-22",
    projectDetails: [
      "Multi-Family Property",
      "Half-Day Inspection",
      "Union City",
      "Drainage Assessment",
    ],
  },
  {
    id: "project-6",
    title: "Emergency Storm Tarping in West New York",
    description:
      "Emergency response within two hours of a severe thunderstorm that ripped a 10-foot section off a two-family home. We secured the exposed decking with heavy-duty tarps and returned the following week for permanent repairs.",
    serviceSlug: "emergency-roofing",
    citySlug: "west-new-york",
    beforeImage: beforePlaceholder("Exposed Roof Deck"),
    afterImage: afterPlaceholder("Emergency Tarp Secured"),
    beforeAlt:
      "Exposed roof decking on two-family home after severe storm damage in West New York",
    afterAlt:
      "Completed emergency tarp installation protecting exposed roof deck on home in West New York",
    completionDate: "2025-08-03",
    projectDetails: [
      "Emergency Response",
      "2-Hour Arrival",
      "West New York",
      "Temporary Tarp + Permanent Repair",
    ],
  },
  {
    id: "project-7",
    title: "TPO Flat Roof System in Secaucus",
    description:
      "Full TPO membrane installation on a 4,000 sq ft commercial warehouse roof. We removed the failing modified bitumen membrane, repaired insulation, and installed a 60-mil TPO system with 20-year warranty.",
    serviceSlug: "flat-roof-systems",
    citySlug: "secaucus",
    beforeImage: beforePlaceholder("Failing Modified Bitumen"),
    afterImage: afterPlaceholder("New 60-mil TPO Membrane"),
    beforeAlt:
      "Deteriorated modified bitumen membrane on commercial warehouse roof in Secaucus industrial district",
    afterAlt:
      "Completed 60-mil TPO flat roof membrane installation on commercial warehouse in Secaucus",
    completionDate: "2025-09-12",
    projectDetails: [
      "60-mil TPO Membrane",
      "5-Day Project",
      "Secaucus Industrial",
      "20-Year Warranty",
    ],
  },
  {
    id: "project-8",
    title: "Commercial Roof Repair on Office Building in Kearny",
    description:
      "Targeted commercial repair on a three-story office building with multiple leak points around rooftop HVAC units. We replaced deteriorated pitch pans, resealed all penetration boots, and applied a reflective coating to extend membrane life.",
    serviceSlug: "commercial-repair",
    citySlug: "kearny",
    beforeImage: beforePlaceholder("Leaking HVAC Penetrations"),
    afterImage: afterPlaceholder("Sealed and Coated"),
    beforeAlt:
      "Deteriorated pitch pans around HVAC units on commercial office building roof in Kearny",
    afterAlt:
      "Completed commercial roof repair with new pitch pans and reflective coating on office building in Kearny",
    completionDate: "2025-10-05",
    projectDetails: [
      "HVAC Penetration Repair",
      "3-Day Project",
      "South Kearny",
      "Reflective Coating Applied",
    ],
  },
] satisfies GalleryProject[];
