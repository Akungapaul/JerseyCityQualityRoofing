import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Breadcrumb SEGMENT_LABELS (SEO-06)', () => {
  const breadcrumbsSource = readFileSync(
    join(process.cwd(), 'src/components/layout/breadcrumbs.tsx'),
    'utf-8'
  );

  const REQUIRED_LABELS = {
    guides: 'Guides',
    cost: 'Cost Guides',
    materials: 'Material Guides',
    problems: 'Common Roofing Problems',
    gallery: 'Project Gallery',
  } as const;

  it.each(Object.entries(REQUIRED_LABELS))(
    'SEGMENT_LABELS contains "%s" mapped to "%s"',
    (key, value) => {
      // Check that the source file contains the key-value pair in SEGMENT_LABELS
      // Matches both quoted keys ("guides": "Guides") and unquoted keys (guides: "Guides")
      const pattern = new RegExp(`(?:["']${key}["']|${key})\\s*:\\s*["']${value}["']`);
      expect(breadcrumbsSource).toMatch(pattern);
    }
  );

  it('SEGMENT_LABELS has at least 12 entries', () => {
    // Extract the SEGMENT_LABELS block and count key-value pairs
    const labelsBlock = breadcrumbsSource.match(
      /SEGMENT_LABELS[^{]*\{([^}]+)\}/s
    );
    expect(labelsBlock).not.toBeNull();
    // Match both quoted keys ("service-areas":) and unquoted keys (services:)
    const entries = labelsBlock![1].match(/(?:["'][^"']+["']|[a-zA-Z_]\w*)\s*:/g);
    expect(entries).not.toBeNull();
    expect(entries!.length).toBeGreaterThanOrEqual(12);
  });
});
