import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: 'asphalt-shingles' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return generatePageMetadata({
    title: `${title} Roofing Guide`,
    description: `Everything you need to know about ${title.toLowerCase()} roofing. Material properties, costs, pros and cons for Hudson County homes.`,
    path: `/guides/materials/${slug}`,
  });
}

export default async function MaterialsGuidePage({
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
