import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Project Gallery',
  description:
    'Browse before-and-after photos of our roofing projects across Hudson County. See our craftsmanship on residential and commercial roofs.',
  path: '/gallery',
});

export default function GalleryPage() {
  return (
    <main>
      <h1>Project Gallery</h1>
      <p>This page is under construction. Content coming soon.</p>
    </main>
  );
}
