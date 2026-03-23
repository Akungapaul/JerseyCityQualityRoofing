import { BASE_URL } from '@/lib/constants';

export function buildCanonicalUrl(path: string): string {
  // Ensure path starts with / and has no trailing slash (except root)
  const normalizedPath = path === '/' ? '' : path.replace(/\/+$/, '');
  return `${BASE_URL}${normalizedPath}`;
}
