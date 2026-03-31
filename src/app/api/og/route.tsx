import { ImageResponse } from 'next/og';
import { getService } from '@/data/services';
import { PHONE_NUMBER, SITE_NAME } from '@/lib/constants';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceSlug = searchParams.get('service');
  const service = serviceSlug ? getService(serviceSlug) : null;

  // Load Cormorant Bold font for the OG image
  const fontData = await fetch(
    new URL('https://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIq75u9.ttf')
  ).then((res) => res.arrayBuffer());

  const title = service?.name ?? 'Professional Roofing Services';
  const subtitle = service?.shortDescription ?? 'Licensed, insured, and locally trusted across Hudson County.';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2a2e22',
          padding: '60px 80px',
        }}
      >
        {/* Gold accent line at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            backgroundColor: '#c89640',
          }}
        />

        {/* Service name */}
        <div
          style={{
            fontFamily: 'Cormorant',
            fontSize: '56px',
            fontWeight: 700,
            color: '#c89640',
            textAlign: 'center',
            lineHeight: 1.1,
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Short description */}
        <div
          style={{
            fontFamily: 'Cormorant',
            fontSize: '24px',
            fontWeight: 500,
            color: '#b0ae9e',
            textAlign: 'center',
            marginTop: '24px',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>

        {/* Company name */}
        <div
          style={{
            fontFamily: 'Cormorant',
            fontSize: '28px',
            fontWeight: 700,
            color: '#f0ede6',
            marginTop: '48px',
          }}
        >
          {SITE_NAME}
        </div>

        {/* Phone number */}
        <div
          style={{
            fontFamily: 'Cormorant',
            fontSize: '20px',
            fontWeight: 500,
            color: '#b0ae9e',
            marginTop: '12px',
          }}
        >
          {PHONE_NUMBER}
        </div>

        {/* Gold accent line at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            backgroundColor: '#c89640',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Cormorant',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
}
