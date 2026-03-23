import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us',
  description:
    'Get a free roofing estimate in Jersey City and Hudson County. Call us or fill out our quote request form for fast, professional service.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <main>
      <h1>Contact Us</h1>
      <p>This page is under construction. Content coming soon.</p>
    </main>
  );
}
