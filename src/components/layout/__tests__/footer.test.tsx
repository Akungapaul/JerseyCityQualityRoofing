import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Footer } from '../footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    const html = renderToStaticMarkup(createElement(Footer));
    expect(html).toBeDefined();
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains Resources column heading', () => {
    const html = renderToStaticMarkup(createElement(Footer));
    expect(html).toContain('Resources');
  });

  it('contains link to /blog', () => {
    const html = renderToStaticMarkup(createElement(Footer));
    expect(html).toContain('href="/blog"');
  });

  it('contains link to /guides', () => {
    const html = renderToStaticMarkup(createElement(Footer));
    expect(html).toContain('href="/guides"');
  });

  it('contains link to /problems', () => {
    const html = renderToStaticMarkup(createElement(Footer));
    expect(html).toContain('href="/problems"');
  });

  it('contains link to /gallery', () => {
    const html = renderToStaticMarkup(createElement(Footer));
    expect(html).toContain('href="/gallery"');
  });

  it('uses 5-column grid layout on large screens', () => {
    const html = renderToStaticMarkup(createElement(Footer));
    expect(html).toContain('lg:grid-cols-5');
  });

  it('contains all 5 column headings', () => {
    const html = renderToStaticMarkup(createElement(Footer));
    expect(html).toContain('Residential Services');
    expect(html).toContain('Commercial Services');
    expect(html).toContain('Service Areas');
    expect(html).toContain('Resources');
    expect(html).toContain('Contact Us');
  });
});
