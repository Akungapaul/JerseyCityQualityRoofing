export const dynamicParams = false;

const COMMERCIAL_SERVICES = [
  'flat-roof-systems',
  'roof-maintenance',
  'commercial-repair',
  'commercial-replacement',
];

const CITIES = [
  'jersey-city', 'hoboken', 'bayonne', 'north-bergen',
  'union-city', 'west-new-york', 'secaucus', 'kearny',
  'harrison', 'east-newark', 'guttenberg', 'weehawken',
];

export function generateStaticParams() {
  return COMMERCIAL_SERVICES.flatMap((service) =>
    CITIES.map((city) => ({ service, city }))
  );
}

export default async function CommercialServiceCityPage({
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
