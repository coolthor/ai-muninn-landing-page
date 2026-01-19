import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateImageMetadata({ params }: { params: { locale: string } }) {
  const isZh = params.locale === 'zh-TW';
  return [
    {
      contentType: 'image/png',
      size: { width: 1200, height: 630 },
      alt: isZh ? 'BPS Tracker - Bull Put Spread 持倉追蹤工具' : 'BPS Tracker - Bull Put Spread Position Tracker',
    },
  ];
}

export default async function OGImage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const isZh = locale === 'zh-TW';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #1a1a24 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(0,255,200,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0,222,222,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo bars */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', marginBottom: '40px' }}>
          <div style={{ width: '100px', height: '24px', background: 'linear-gradient(90deg, #C084FC, #818CF8, #2DD4BF)', borderRadius: '6px' }} />
          <div style={{ width: '150px', height: '24px', background: 'linear-gradient(90deg, #C084FC, #818CF8, #2DD4BF)', borderRadius: '6px' }} />
          <div style={{ width: '200px', height: '24px', background: 'linear-gradient(90deg, #C084FC, #818CF8, #2DD4BF)', borderRadius: '6px' }} />
          <div style={{ width: '230px', height: '24px', background: 'linear-gradient(90deg, #C084FC, #818CF8, #2DD4BF)', borderRadius: '6px' }} />
        </div>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px' }}>
          <span style={{ fontSize: '72px', fontWeight: 'bold', color: 'white' }}>BPS</span>
          <span style={{ fontSize: '72px', fontWeight: 'bold', color: '#00DEDE' }}>Tracker</span>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: '28px', color: '#a0a0b0', textAlign: 'center', maxWidth: '800px' }}>
          {isZh ? '專為選擇權交易者設計的 Bull Put Spread 持倉追蹤工具' : 'Track Your Bull Put Spread Positions with Real-time Greeks'}
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 24px',
            background: 'rgba(0,222,222,0.1)',
            border: '1px solid rgba(0,222,222,0.3)',
            borderRadius: '100px',
          }}
        >
          <span style={{ fontSize: '18px', color: '#00DEDE' }}>{isZh ? '現已在 App Store 上架' : 'Available on App Store'}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
