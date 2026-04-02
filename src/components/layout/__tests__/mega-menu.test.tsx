import { describe, it, expect, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Mock motion/react to avoid client-side animation issues in test
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) =>
      createElement('div', props, children as React.ReactNode),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    createElement('div', null, children),
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  ChevronDown: () => createElement('svg', { 'data-testid': 'chevron-down' }),
}));

import { MegaMenu } from '../mega-menu';

describe('MegaMenu', () => {
  it('renders without crashing', () => {
    const html = renderToStaticMarkup(createElement(MegaMenu));
    expect(html).toBeDefined();
  });

  it('contains Resources trigger button', () => {
    const html = renderToStaticMarkup(createElement(MegaMenu));
    expect(html).toContain('Resources');
  });

  it('includes 4 navigation trigger buttons', () => {
    const html = renderToStaticMarkup(createElement(MegaMenu));
    expect(html).toContain('Residential Services');
    expect(html).toContain('Commercial Services');
    expect(html).toContain('Service Areas');
    expect(html).toContain('Resources');
  });
});
