import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import { buildCanonicalUrl } from './canonical';

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogType = 'website',
}: PageMetadataInput): Metadata {
  const canonicalUrl = buildCanonicalUrl(path);
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: ogType,
      locale: 'en_US',
    },
  };
}
