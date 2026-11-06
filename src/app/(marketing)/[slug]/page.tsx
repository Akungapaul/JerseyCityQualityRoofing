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

/**
 * Flat URL structure (2026-10-17): every service x city combo page lives
 * at a single root-level slug: /<public-service>-<city>-nj.
 * Single-city restructure (2026-11-06): only the 8 Jersey City combos
 * are generated. The city hub pages (/roofing-contractor-<city>-nj) are
 * retired for all cities — the homepage is the Jersey City hub — and the
 * other towns' combos are retired; all of them 308 via vercel.json.
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
