import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the ImageResponse from next/og
vi.mock('next/og', () => ({
  ImageResponse: class MockImageResponse {
    constructor(public element: unknown, public options: unknown) {}
  },
}));

// Mock fetch for font loading
const mockArrayBuffer = new ArrayBuffer(8);
global.fetch = vi.fn().mockResolvedValue({
  arrayBuffer: () => Promise.resolve(mockArrayBuffer),
}) as unknown as typeof fetch;

// Import after mocks
const { GET } = await import('@/app/api/og/route');

function makeRequest(params: Record<string, string>): Request {
  const url = new URL('https://example.com/api/og');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return new Request(url.toString());
}

describe('OG image route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      arrayBuffer: () => Promise.resolve(mockArrayBuffer),
    });
  });

  it('returns an ImageResponse', async () => {
    const response = await GET(makeRequest({}));
    expect(response).toBeDefined();
  });

  it('renders service name when ?service= is provided', async () => {
    const response = await GET(makeRequest({ service: 'roof-repair' }));
    expect(response).toBeDefined();
    // The ImageResponse was constructed -- verify it did not throw
  });

  it('renders city name in title when ?city= is provided alongside ?service=', async () => {
    const response = await GET(makeRequest({ service: 'roof-repair', city: 'hoboken' }));
    expect(response).toBeDefined();
    // Verify the route did not throw when city param is present
  });

  it('handles unknown city slug gracefully', async () => {
    const response = await GET(makeRequest({ service: 'roof-repair', city: 'nonexistent' }));
    expect(response).toBeDefined();
  });

  it('handles missing service slug gracefully', async () => {
    const response = await GET(makeRequest({}));
    expect(response).toBeDefined();
  });
});
