import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Expert Roofing Services in Hudson County NJ',
  description:
    'Professional roofing services in Jersey City and all Hudson County municipalities. Licensed and insured residential and commercial roof repair, replacement, and inspection.',
  path: '/',
});

export default function HomePage() {
  return (
    <main>
      <h1>Jersey City Quality Roofing</h1>
      <p>
        Professional roofing services in Jersey City and all Hudson County
        municipalities. This page is under construction. Content coming soon.
      </p>
    </main>
  );
}
