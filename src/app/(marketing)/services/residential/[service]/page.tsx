import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { getService } from '@/data/services';
import { getResidentialServiceSlugs } from '@/data/services';

export const dynamicParams = false;

export function generateStaticParams() {
  return getResidentialServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getService(serviceSlug);
  if (!service) return {};
  return generatePageMetadata({
    title: service.name,
    description: service.shortDescription,
    path: `/services/residential/${service.slug}`,
  });
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
