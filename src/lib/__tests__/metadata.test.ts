import { describe, it, expect } from 'vitest';
import { generatePageMetadata } from '@/lib/seo/metadata';

describe('metadata generators', () => {
  it('generates metadata with correct title', () => {
    const meta = generatePageMetadata({
      title: 'Roof Repair',
      description: 'Professional roof repair services',
      path: '/services/residential/roof-repair',
    });
    expect(meta.title).toBe('Roof Repair');
  });

  it('generates metadata with canonical URL', () => {
    const meta = generatePageMetadata({
      title: 'About',
      description: 'About us',
      path: '/about',
    });
    expect(meta.alternates?.canonical).toContain('/about');
    expect(meta.alternates?.canonical).toMatch(/^https:\/\//);
  });

  it('generates openGraph with site name', () => {
    const meta = generatePageMetadata({
      title: 'Contact',
      description: 'Contact us',
      path: '/contact',
    });
    const og = meta.openGraph as { siteName?: string; title?: string };
    expect(og?.siteName).toBe('Jersey City Quality Roofing');
    expect(og?.title).toContain('Contact');
  });

  it('supports article ogType', () => {
    const meta = generatePageMetadata({
      title: 'Blog Post',
      description: 'A blog post',
      path: '/blog/test',
      ogType: 'article',
    });
    const og = meta.openGraph as { type?: string };
    expect(og?.type).toBe('article');
  });

  it('defaults to website ogType', () => {
    const meta = generatePageMetadata({
      title: 'Home',
      description: 'Homepage',
      path: '/',
    });
    const og = meta.openGraph as { type?: string };
    expect(og?.type).toBe('website');
  });
});
