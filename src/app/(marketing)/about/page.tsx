import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us',
  description:
    'Learn about Jersey City Quality Roofing - over 20 years serving Hudson County homeowners and businesses with expert roofing services.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main>
      <h1>About Us</h1>
      <p>This page is under construction. Content coming soon.</p>
    </main>
  );
}
