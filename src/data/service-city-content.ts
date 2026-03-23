import type { ServiceCityContent, FAQ, Municipality, Service } from './types';
import { getMunicipality } from './municipalities';
import { getService } from './services';

/**
 * Cross-reference resolver: generates city-specific content fragments
 * for service-in-city pages. Uses structured municipality and service
 * data to ensure each page has unique, locally relevant content.
 */
export function getCityServiceContent(
  serviceSlug: string,
  citySlug: string,
): ServiceCityContent | null {
  const city = getMunicipality(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) return null;

  return {
    serviceSlug,
    citySlug,
    localContext: buildLocalContext(city, service),
    specificConcerns: buildSpecificConcerns(city, service),
    localStats: buildLocalStats(city),
    neighborhoodMention: city.neighborhoods[0] || city.name,
    uniqueFaqs: buildUniqueFaqs(city, service),
  };
}

/**
 * Builds a paragraph of local context combining the city's architecture,
 * neighborhoods, and the service's relevance to that building stock.
 */
function buildLocalContext(city: Municipality, service: Service): string {
  const archStyles = city.architectureStyles.slice(0, 3).join(', ');
  const neighborhoods = city.neighborhoods.slice(0, 2).join(' and ');
  const roofTypes = city.commonRoofTypes.slice(0, 2).join(' and ');

  const categoryContext =
    service.category === 'residential'
      ? `residential buildings featuring ${archStyles} architecture`
      : `commercial and industrial buildings with flat roof systems`;

  return (
    `In ${city.name}, where neighborhoods like ${neighborhoods} feature ${categoryContext}, ` +
    `${service.name.toLowerCase()} requires specialized knowledge of local building characteristics. ` +
    `The predominant roof types here — ${roofTypes} — reflect a housing stock with a median age of ${city.housingStock.medianAge} years. ` +
    `With ${city.buildingCodes.jurisdictionName} enforcing ${city.buildingCodes.codeEdition} and ` +
    `wind speed requirements of ${city.buildingCodes.windSpeedRequirement}, every ${service.name.toLowerCase()} project ` +
    `must meet stringent local standards while addressing the specific challenges of ${city.name}'s building environment.`
  );
}

/**
 * Builds an array of city-specific concerns by combining the city's
 * unique roofing challenges with the service's common problems.
 */
function buildSpecificConcerns(city: Municipality, service: Service): string[] {
  const concerns: string[] = [];

  // Pull from city-specific roofing concerns
  const cityRoofingConcerns = city.roofingConcerns.slice(0, 2);
  concerns.push(...cityRoofingConcerns);

  // Pull from weather-related concerns specific to this city
  const weatherConcern = city.weatherPatterns.commonWeatherConcerns[0];
  if (weatherConcern) {
    concerns.push(weatherConcern);
  }

  // Add a service-specific concern contextualized to the city
  if (service.commonProblems.length > 0) {
    concerns.push(
      `${service.commonProblems[0]} — a common issue in ${city.name} due to the area's ${city.weatherPatterns.hurricaneRisk} hurricane risk and ${city.weatherPatterns.norEasterFrequency} nor'easters`,
    );
  }

  // Add building code special requirements if relevant
  if (city.buildingCodes.specialRequirements.length > 0) {
    concerns.push(city.buildingCodes.specialRequirements[0]);
  }

  return concerns;
}

/**
 * Builds a statistics paragraph using the city's population,
 * housing stock data, and weather patterns.
 */
function buildLocalStats(city: Municipality): string {
  const { housingStock, population, weatherPatterns } = city;
  const ownerPct = housingStock.ownerOccupied;
  const renterPct = housingStock.renterOccupied;

  return (
    `With a population of approximately ${population.toLocaleString()} residents and ` +
    `${housingStock.totalUnits.toLocaleString()} housing units — ${ownerPct}% owner-occupied and ` +
    `${renterPct}% renter-occupied — ${city.name}'s roofing market serves a diverse mix of homeowners ` +
    `and property managers. The housing stock, averaging ${housingStock.medianAge} years old with a ` +
    `median value of $${housingStock.averageValue.toLocaleString()}, faces ` +
    `${weatherPatterns.annualSnowfall} inches of annual snowfall and ` +
    `${weatherPatterns.annualRainfall} inches of rainfall, making proactive roof maintenance essential ` +
    `for protecting these investments.`
  );
}

/**
 * Builds 5 unique FAQs combining city-specific building codes,
 * weather patterns, and the service's domain expertise.
 */
function buildUniqueFaqs(city: Municipality, service: Service): FAQ[] {
  const faqs: FAQ[] = [];

  // FAQ 1: Permit requirements for this service in this city
  faqs.push({
    question: `Do I need a permit for ${service.name.toLowerCase()} in ${city.name}?`,
    answer:
      `${city.buildingCodes.jurisdictionName} requires permits for most roofing work. ` +
      `${city.buildingCodes.permitRequired ? 'Yes, a permit is required' : 'Permit requirements vary'} ` +
      `for ${service.name.toLowerCase()} projects in ${city.name}. ` +
      `The municipality follows ${city.buildingCodes.codeEdition} with wind speed requirements of ` +
      `${city.buildingCodes.windSpeedRequirement}. ` +
      (city.buildingCodes.specialRequirements.length > 0
        ? `Additional requirements include: ${city.buildingCodes.specialRequirements[0].toLowerCase()}.`
        : ''),
  });

  // FAQ 2: Weather-related concern for this city
  const primaryWeatherConcern =
    city.weatherPatterns.commonWeatherConcerns[0] || 'seasonal weather exposure';
  faqs.push({
    question: `How does ${city.name}'s weather affect my roof?`,
    answer:
      `${city.name} experiences ${city.weatherPatterns.annualSnowfall} inches of snow annually, ` +
      `${city.weatherPatterns.annualRainfall} inches of rain, and ${city.weatherPatterns.norEasterFrequency} ` +
      `nor'easters. The area has a ${city.weatherPatterns.hurricaneRisk} hurricane risk level. ` +
      `A key local concern is: ${primaryWeatherConcern.toLowerCase()}. ` +
      `Regular ${service.name.toLowerCase()} helps mitigate these weather-related risks and extends your roof's lifespan.`,
  });

  // FAQ 3: Cost factors specific to this city
  faqs.push({
    question: `What affects the cost of ${service.name.toLowerCase()} in ${city.name}?`,
    answer:
      `Several factors specific to ${city.name} influence ${service.name.toLowerCase()} costs: ` +
      `the predominant ${city.commonRoofTypes[0]?.toLowerCase() || 'roof types'} found on ` +
      `${city.architectureStyles[0]?.toLowerCase() || 'local'} architecture, ` +
      `${city.housingStock.medianAge}-year average building age requiring careful material matching, ` +
      `and ${city.roofingConcerns[0]?.toLowerCase() || 'local building conditions'}. ` +
      `Contact us for a free estimate tailored to your ${city.name} property.`,
  });

  // FAQ 4: Neighborhood-specific question
  const primaryNeighborhood = city.neighborhoods[0] || city.name;
  faqs.push({
    question: `Do you service the ${primaryNeighborhood} area of ${city.name}?`,
    answer:
      `Yes, we provide ${service.name.toLowerCase()} throughout all ${city.name} neighborhoods ` +
      `including ${city.neighborhoods.slice(0, 3).join(', ')}${city.neighborhoods.length > 3 ? ', and more' : ''}. ` +
      `Our team is familiar with the specific roofing challenges in each area — from the ` +
      `${city.architectureStyles[0]?.toLowerCase() || 'traditional'} homes to ` +
      `${city.architectureStyles[city.architectureStyles.length - 1]?.toLowerCase() || 'modern'} construction. ` +
      `We serve all ${city.zipCodes.join(', ')} ZIP codes.`,
  });

  // FAQ 5: Duration/timeline question for this city
  faqs.push({
    question: `How long does ${service.name.toLowerCase()} take in ${city.name}?`,
    answer:
      `${service.name} in ${city.name} typically takes ${service.typicalDuration}. ` +
      `However, factors unique to ${city.name} can affect timing: ` +
      `${city.roofingConcerns.length > 1 ? city.roofingConcerns[1]?.toLowerCase() || 'local conditions' : 'local building conditions'} ` +
      `may require additional planning. ` +
      `Permit processing through ${city.buildingCodes.jurisdictionName} ` +
      `${city.buildingCodes.inspectionRequired ? 'includes mandatory inspection' : 'varies by project scope'}. ` +
      `We provide a detailed timeline during your free consultation.`,
  });

  return faqs;
}
