import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { getService, getResidentialServiceSlugs } from '@/data/services';
import { getMunicipality, getAllMunicipalitySlugs } from '@/data/municipalities';

export const dynamicParams = false;

export function generateStaticParams() {
  const services = getResidentialServiceSlugs();
  const cities = getAllMunicipalitySlugs();
  return services.flatMap((service) =>
    cities.map((city) => ({ service, city }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getService(serviceSlug);
  const city = getMunicipality(citySlug);
  if (!service || !city) return {};
  return generatePageMetadata({
    title: `${service.name} in ${city.name}`,
    description: `Professional ${service.name.toLowerCase()} services in ${city.name}, NJ. ${service.shortDescription}`,
    path: `/services/residential/${service.slug}/${city.slug}`,
  });
}

export default async function ResidentialServiceCityPage({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}) {
  const { service, city } = await params;
  const serviceTitle = service
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const cityTitle = city
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <main>
      <h1>{serviceTitle} in {cityTitle}</h1>
      <p>This page is under construction. Content coming soon.</p>
    </main>
  );
}
