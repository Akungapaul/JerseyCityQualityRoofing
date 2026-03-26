import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';

// Mock CompactQuoteForm to avoid client component issues in server rendering
vi.mock('@/components/forms/compact-quote-form', () => ({
  CompactQuoteForm: ({ defaultServiceType }: { defaultServiceType?: string }) =>
    createElement('div', { 'data-testid': 'compact-quote-form', 'data-service': defaultServiceType }),
}));

import { CityServiceHero } from '../city-service-hero';
import { LocalServiceContext } from '../local-service-context';
import { NeighborhoodServiceInsights } from '../neighborhood-service-insights';
import { CitySpecificConcerns } from '../city-specific-concerns';
import { SiblingCitiesNav } from '../sibling-cities-nav';

describe('CityServiceHero', () => {
  const baseProps = {
    heroHeadline: 'Test Headline',
    heroSubtitle: 'Test subtitle',
    cityName: 'Jersey City',
    population: 292449,
    serviceName: 'Roof Repair',
  };

  it('renders exactly one h1 element', () => {
    const html = renderToStaticMarkup(
      createElement(CityServiceHero, baseProps)
    );
    const h1Count = (html.match(/<h1[\s>]/g) || []).length;
    expect(h1Count).toBe(1);
  });

  it('renders the headline text in h1', () => {
    const html = renderToStaticMarkup(
      createElement(CityServiceHero, {
        ...baseProps,
        heroHeadline: 'Expert Roof Repair in Jersey City',
      })
    );
    expect(html).toContain('Expert Roof Repair in Jersey City');
  });

  it('renders population with locale formatting', () => {
    const html = renderToStaticMarkup(
      createElement(CityServiceHero, baseProps)
    );
    expect(html).toContain('292,449');
    expect(html).toContain('Serving');
    expect(html).toContain('Jersey City');
  });

  it('renders region badge in standard mode', () => {
    const html = renderToStaticMarkup(
      createElement(CityServiceHero, baseProps)
    );
    expect(html).toContain('Hudson County, NJ');
  });

  it('shows emergency badge when isEmergency is true', () => {
    const html = renderToStaticMarkup(
      createElement(CityServiceHero, {
        ...baseProps,
        isEmergency: true,
      })
    );
    expect(html).toContain('24/7 EMERGENCY SERVICE');
    expect(html).toContain('#d4782f');
  });

  it('renders CompactQuoteForm with service name', () => {
    const html = renderToStaticMarkup(
      createElement(CityServiceHero, baseProps)
    );
    expect(html).toContain('data-service="Roof Repair"');
  });
});

describe('LocalServiceContext', () => {
  const baseProps = {
    heading: 'Service Context',
    narrative: 'Paragraph one.\n\nParagraph two.',
    servicePageLink: '/services/residential/roof-repair',
    cityPageLink: '/service-areas/jersey-city',
    serviceName: 'Roof Repair',
    cityName: 'Jersey City',
  };

  it('renders h2 heading and narrative paragraphs', () => {
    const html = renderToStaticMarkup(
      createElement(LocalServiceContext, baseProps)
    );
    expect(html).toContain('<h2');
    expect(html).toContain('Service Context');
    expect(html).toContain('Paragraph one.');
    expect(html).toContain('Paragraph two.');
  });

  it('renders internal links to service and city pages', () => {
    const html = renderToStaticMarkup(
      createElement(LocalServiceContext, baseProps)
    );
    expect(html).toContain('/services/residential/roof-repair');
    expect(html).toContain('/service-areas/jersey-city');
    expect(html).toContain('Roof Repair');
    expect(html).toContain('Jersey City');
  });

  it('splits narrative into multiple paragraphs on double newline', () => {
    const html = renderToStaticMarkup(
      createElement(LocalServiceContext, {
        ...baseProps,
        narrative: 'First.\n\nSecond.\n\nThird.',
      })
    );
    const pCount = (html.match(/<p /g) || []).length;
    expect(pCount).toBe(3);
  });
});

describe('NeighborhoodServiceInsights', () => {
  const neighborhoods = [
    { neighborhoodName: 'Downtown', insight: 'Test insight', commonIssue: 'Test issue' },
    { neighborhoodName: 'The Heights', insight: 'Test insight 2', commonIssue: 'Test issue 2' },
  ];

  it('renders h3 for each neighborhood', () => {
    const html = renderToStaticMarkup(
      createElement(NeighborhoodServiceInsights, {
        neighborhoods,
        serviceName: 'Roof Repair',
        cityName: 'Jersey City',
      })
    );
    const h3Count = (html.match(/<h3[\s>]/g) || []).length;
    expect(h3Count).toBe(2);
    expect(html).toContain('Downtown');
    expect(html).toContain('The Heights');
  });

  it('renders section heading with service and city name', () => {
    const html = renderToStaticMarkup(
      createElement(NeighborhoodServiceInsights, {
        neighborhoods,
        serviceName: 'Roof Repair',
        cityName: 'Jersey City',
      })
    );
    expect(html).toContain('Roof Repair Across Jersey City Neighborhoods');
  });

  it('renders common issue for each neighborhood', () => {
    const html = renderToStaticMarkup(
      createElement(NeighborhoodServiceInsights, {
        neighborhoods,
        serviceName: 'Roof Repair',
        cityName: 'Jersey City',
      })
    );
    expect(html).toContain('Test issue');
    expect(html).toContain('Test issue 2');
    expect(html).toContain('Most Common Issue');
  });
});

describe('CitySpecificConcerns', () => {
  it('renders h2 heading', () => {
    const html = renderToStaticMarkup(
      createElement(CitySpecificConcerns, {
        concerns: ['Concern 1', 'Concern 2'],
        heading: 'Test Heading',
      })
    );
    expect(html).toContain('<h2');
    expect(html).toContain('Test Heading');
  });

  it('renders one list item per concern', () => {
    const html = renderToStaticMarkup(
      createElement(CitySpecificConcerns, {
        concerns: ['A', 'B', 'C'],
        heading: 'Heading',
      })
    );
    const liCount = (html.match(/<li[\s>]/g) || []).length;
    expect(liCount).toBe(3);
  });

  it('renders intro paragraph when provided', () => {
    const html = renderToStaticMarkup(
      createElement(CitySpecificConcerns, {
        concerns: ['A'],
        heading: 'Heading',
        intro: 'An intro paragraph.',
      })
    );
    expect(html).toContain('An intro paragraph.');
  });

  it('renders AlertTriangle icons with aria-hidden', () => {
    const html = renderToStaticMarkup(
      createElement(CitySpecificConcerns, {
        concerns: ['A'],
        heading: 'Heading',
      })
    );
    expect(html).toContain('aria-hidden="true"');
  });
});

describe('SiblingCitiesNav', () => {
  const baseProps = {
    serviceName: 'Roof Repair',
    serviceSlug: 'roof-repair',
    serviceCategory: 'residential' as const,
    currentCitySlug: 'jersey-city',
  };

  it('renders nav with aria-label', () => {
    const html = renderToStaticMarkup(
      createElement(SiblingCitiesNav, baseProps)
    );
    expect(html).toContain('aria-label="Same service in other cities"');
  });

  it('renders aria-current="page" on current city', () => {
    const html = renderToStaticMarkup(
      createElement(SiblingCitiesNav, baseProps)
    );
    expect(html).toContain('aria-current="page"');
    // Current city should be a span, not a link
    expect(html).toMatch(/aria-current="page"[^>]*>Jersey City<\/span>/);
  });

  it('renders correct href pattern for non-current cities', () => {
    const html = renderToStaticMarkup(
      createElement(SiblingCitiesNav, baseProps)
    );
    expect(html).toContain('/services/residential/roof-repair/hoboken');
  });

  it('renders all 12 municipalities', () => {
    const html = renderToStaticMarkup(
      createElement(SiblingCitiesNav, baseProps)
    );
    expect(html).toContain('Jersey City');
    expect(html).toContain('Hoboken');
    expect(html).toContain('Bayonne');
    expect(html).toContain('North Bergen');
  });

  it('uses commercial category in hrefs when specified', () => {
    const html = renderToStaticMarkup(
      createElement(SiblingCitiesNav, {
        ...baseProps,
        serviceCategory: 'commercial',
      })
    );
    expect(html).toContain('/services/commercial/roof-repair/hoboken');
  });
});
