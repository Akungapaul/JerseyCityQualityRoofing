import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { getMunicipality, getAllMunicipalitySlugs } from '@/data/municipalities';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllMunicipalitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getMunicipality(citySlug);
  if (!city) return {};
  return generatePageMetadata({
    title: `Roofing Services in ${city.name}`,
    description: `Expert residential and commercial roofing services in ${city.name}, NJ. ${city.description}`,
    path: `/service-areas/${city.slug}`,
  });
}

export default async function CityHubPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityTitle = city
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <main>
      <h1>Roofing Services in {cityTitle}</h1>
      <p>This page is under construction. Content coming soon.</p>
    </main>
  );
}
