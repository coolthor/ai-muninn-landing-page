'use client';

export default function IVRMeter({ lang = 'zh' }: { lang?: 'zh' | 'en' }) {
  const zones = [
    {
      range: lang === 'zh' ? '0–20%' : '0–20%',
      label: lang === 'zh' ? '低 IV' : 'Low IV',
      sub: lang === 'zh' ? '期權便宜，賣方少收' : 'Options cheap, thin premium',
      color: '#00DE94',
      bg: 'rgba(0,222,148,0.08)',
      border: 'rgba(0,222,148,0.25)',
      icon: '🟢',
      width: '20%',
    },
    {
      range: lang === 'zh' ? '20–60%' : '20–60%',
      label: lang === 'zh' ? '中等 IV' : 'Moderate IV',
      sub: lang === 'zh' ? '正常區間，其他條件為主' : 'Normal range, check other signals',
      color: '#F5C842',
      bg: 'rgba(245,200,66,0.07)',
      border: 'rgba(245,200,66,0.25)',
      icon: '🟡',
      width: '40%',
    },
    {
      range: lang === 'zh' ? '60–100%' : '60–100%',
      label: lang === 'zh' ? '高 IV' : 'High IV',
      sub: lang === 'zh' ? '期權貴，賣方有利' : 'Options rich, seller\'s advantage',
      color: '#FF456B',
      bg: 'rgba(255,69,107,0.07)',
      border: 'rgba(255,69,107,0.2)',
      icon: '🔴',
      width: '40%',
    },
  ];

  return (
    <div
      className="rounded-xl p-6 my-8"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(0,255,200,0.12)',
      }}
    >
      <p
        className="text-xs mb-5"
        style={{ color: 'rgba(160,160,176,0.5)', fontFamily: 'JetBrains Mono, monospace' }}
      >
        {lang === 'zh' ? 'IV Rank 區間解讀' : 'IV Rank Zone Reference'}
      </p>

      {/* Gradient bar */}
      <div className="h-3 rounded-full mb-6 overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div
          className="h-full w-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #00DE94 0%, #F5C842 35%, #FF456B 100%)',
            opacity: 0.7,
          }}
        />
      </div>

      {/* Zone cards */}
      <div className="grid grid-cols-3 gap-3">
        {zones.map((z) => (
          <div
            key={z.range}
            className="rounded-lg p-4"
            style={{ background: z.bg, border: `1px solid ${z.border}` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{z.icon}</span>
              <span
                className="text-xs font-bold"
                style={{ color: z.color, fontFamily: 'JetBrains Mono, monospace' }}
              >
                {z.range}
              </span>
            </div>
            <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {z.label}
            </div>
            <div className="text-xs leading-tight" style={{ color: 'rgba(160,160,176,0.7)' }}>
              {z.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
