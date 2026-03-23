export const dynamicParams = false;

const RESIDENTIAL_SERVICES = [
  'roof-repair',
  'roof-replacement',
  'roof-inspection',
  'emergency-roofing',
];

const CITIES = [
  'jersey-city', 'hoboken', 'bayonne', 'north-bergen',
  'union-city', 'west-new-york', 'secaucus', 'kearny',
  'harrison', 'east-newark', 'guttenberg', 'weehawken',
];

export function generateStaticParams() {
  return RESIDENTIAL_SERVICES.flatMap((service) =>
    CITIES.map((city) => ({ service, city }))
  );
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
