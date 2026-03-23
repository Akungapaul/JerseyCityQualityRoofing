import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Common Roofing Problems',
  description:
    'Identify and solve common roofing problems. Expert guidance on leaks, storm damage, ice dams, and more from Hudson County roofing specialists.',
  path: '/problems',
});

export default function ProblemsPage() {
  return (
    <main>
      <h1>Common Roofing Problems</h1>
      <p>This page is under construction. Content coming soon.</p>
    </main>
  );
}
