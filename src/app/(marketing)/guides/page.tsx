import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Roofing Guides',
  description:
    'Comprehensive roofing guides covering costs, materials, and maintenance for Hudson County homeowners.',
  path: '/guides',
});

export default function GuidesPage() {
  return (
    <main>
      <h1>Guides</h1>
      <p>This page is under construction. Content coming soon.</p>
    </main>
  );
}
