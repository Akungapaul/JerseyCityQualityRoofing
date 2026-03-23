export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: 'roof-replacement-cost' }];
}

export default async function CostGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug
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
