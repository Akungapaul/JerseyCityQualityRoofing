export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { city: 'jersey-city' },
    { city: 'hoboken' },
    { city: 'bayonne' },
    { city: 'north-bergen' },
    { city: 'union-city' },
    { city: 'west-new-york' },
    { city: 'secaucus' },
    { city: 'kearny' },
    { city: 'harrison' },
    { city: 'east-newark' },
    { city: 'guttenberg' },
    { city: 'weehawken' },
  ];
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
