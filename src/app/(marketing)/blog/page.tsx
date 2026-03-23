import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Roofing Blog',
  description:
    'Expert roofing tips, maintenance guides, and industry insights from Jersey City Quality Roofing.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <main>
      <h1>Blog</h1>
      <p>This page is under construction. Content coming soon.</p>
    </main>
  );
}
