import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Customer Testimonials',
  description:
    'Read reviews from homeowners and businesses across Hudson County who trust Jersey City Quality Roofing for their roofing needs.',
  path: '/testimonials',
});

export default function TestimonialsPage() {
  return (
    <main>
      <h1>Customer Testimonials</h1>
      <p>This page is under construction. Content coming soon.</p>
    </main>
  );
}
