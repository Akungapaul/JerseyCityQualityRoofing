export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { service: 'roof-repair' },
    { service: 'roof-replacement' },
    { service: 'roof-inspection' },
    { service: 'emergency-roofing' },
  ];
}

export default async function ResidentialServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const title = service
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <main>
      <h1>{title}</h1>
      <p>This page is under construction. Content coming soon.</p>
    </main>
  );
}
