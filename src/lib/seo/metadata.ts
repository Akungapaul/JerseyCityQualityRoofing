import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import { buildCanonicalUrl } from './canonical';

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
}

const BRAND_SUFFIX_PATTERN = /\s*\|\s*Jersey City Quality Roofing\s*$/i;
const MAX_META_DESCRIPTION_LENGTH = 155;

function normalizeTitle(title: string): string {
  return title.replace(BRAND_SUFFIX_PATTERN, '').trim();
}

function normalizeDescription(description: string): string {
  const clean = description.replace(/\s+/g, ' ').trim();
  if (clean.length <= MAX_META_DESCRIPTION_LENGTH) return clean;

  const clipped = clean.slice(0, MAX_META_DESCRIPTION_LENGTH - 1);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, lastSpace > 120 ? lastSpace : clipped.length).trim()}…`;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogType = 'website',
}: PageMetadataInput): Metadata {
  const canonicalUrl = buildCanonicalUrl(path);
  const normalizedTitle = normalizeTitle(title);
  const normalizedDescription = normalizeDescription(description);

  return {
    title: normalizedTitle,
    description: normalizedDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${normalizedTitle} | ${SITE_NAME}`,
      description: normalizedDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: ogType,
      locale: 'en_US',
    },
  };
}
