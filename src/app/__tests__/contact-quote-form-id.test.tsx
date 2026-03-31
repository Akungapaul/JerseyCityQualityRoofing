import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('contact page quote-form id', () => {
  const contactPageSource = readFileSync(
    resolve(__dirname, '../../app/(marketing)/contact/page.tsx'),
    'utf-8'
  );

  it('contains id="quote-form" attribute', () => {
    expect(contactPageSource).toContain('id="quote-form"');
  });

  it('does not only have id="full-quote-form" (which FloatingCTA cannot find)', () => {
    // The page must have id="quote-form" in addition to whatever QuoteForm provides internally
    const quoteFormMatches = contactPageSource.match(/id="quote-form"/g);
    expect(quoteFormMatches).not.toBeNull();
    expect(quoteFormMatches!.length).toBeGreaterThanOrEqual(1);
  });
});
