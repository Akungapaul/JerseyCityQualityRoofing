import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllFlatSlugs, parseFlatSlug } from '@/lib/paths';
import { getService } from '@/data/services';
import ResidentialServiceCityPage, {
  getResidentialComboMetadata,
} from '../_templates/residential-service-city';
import CommercialServiceCityPage, {
  getCommercialComboMetadata,
} from '../_templates/commercial-service-city';
import CityHubPage, { getCityHubMetadata } from '../_templates/city-hub';

/**
 * Flat URL structure (2026-10-17): every service x city combo page and
 * every city hub page lives at a single root-level slug:
 *   /<public-service>-<city>-nj   (96 combos)
 *   /roofing-contractor-<city>-nj (12 city hubs)
 * Rendering is delegated to the templates under ../_templates, which hold
 * the exact page components that used to live at the nested routes.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllFlatSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = parseFlatSlug(slug);
  if (!route) return {};

  if (route.type === 'city') {
    return getCityHubMetadata(route.citySlug);
  }

  const service = getService(route.serviceSlug);
  if (!service) return {};
  return service.category === 'residential'
    ? getResidentialComboMetadata(route.serviceSlug, route.citySlug)
    : getCommercialComboMetadata(route.serviceSlug, route.citySlug);
}

export default async function FlatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const route = parseFlatSlug(slug);
  if (!route) notFound();

  if (route.type === 'city') {
    return <CityHubPage citySlug={route.citySlug} />;
  }

  const service = getService(route.serviceSlug);
  if (!service) notFound();

  return service.category === 'residential' ? (
    <ResidentialServiceCityPage
      serviceSlug={route.serviceSlug}
      citySlug={route.citySlug}
    />
  ) : (
    <CommercialServiceCityPage
      serviceSlug={route.serviceSlug}
      citySlug={route.citySlug}
    />
  );
}
