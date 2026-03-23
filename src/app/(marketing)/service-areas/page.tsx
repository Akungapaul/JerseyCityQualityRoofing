import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Service Areas',
  description:
    'Jersey City Quality Roofing serves all 12 Hudson County municipalities including Jersey City, Hoboken, Bayonne, and North Bergen.',
  path: '/service-areas',
});

export default function ServiceAreasPage() {
  return (
    <main>
      <h1>Service Areas</h1>
      <p>This page is under construction. Content coming soon.</p>
    </main>
  );
}
