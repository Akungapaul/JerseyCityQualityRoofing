import { describe, it, expect, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Mock motion/react
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
  X: () => createElement('svg', { 'data-testid': 'x-icon' }),
  Phone: () => createElement('svg', { 'data-testid': 'phone-icon' }),
}));

// Mock Button component
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: Record<string, unknown>) =>
    createElement('button', props, children as React.ReactNode),
}));

import { MobileNav } from '../mobile-nav';

describe('MobileNav', () => {
  const defaultProps = { isOpen: true, onClose: vi.fn() };

  it('renders when isOpen is true', () => {
    const html = renderToStaticMarkup(createElement(MobileNav, defaultProps));
    expect(html).toBeDefined();
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains Resources accordion section', () => {
    const html = renderToStaticMarkup(createElement(MobileNav, defaultProps));
    expect(html).toContain('Resources');
  });

  it('contains all 4 accordion section titles', () => {
    const html = renderToStaticMarkup(createElement(MobileNav, defaultProps));
    expect(html).toContain('Residential Services');
    expect(html).toContain('Commercial Services');
    expect(html).toContain('Service Areas');
    expect(html).toContain('Resources');
  });
});
