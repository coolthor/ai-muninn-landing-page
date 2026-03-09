'use client';

const data = [
  { label: '不篩選', labelEn: 'No filter', cagr: 133.5, trades: 846 },
  { label: 'IVR > 10%', labelEn: 'IVR > 10%', cagr: 128.3, trades: 789 },
  { label: 'IVR > 20%', labelEn: 'IVR > 20%', cagr: 101.4, trades: 547 },
  { label: 'IVR > 30%', labelEn: 'IVR > 30%', cagr: 79.2, trades: 391 },
];

const MAX_CAGR = 150;

export default function IVRFilterChart({ lang = 'zh' }: { lang?: 'zh' | 'en' }) {
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
        {lang === 'zh' ? 'IVR 門檻 vs 年化報酬（CAGR）' : 'IVR Threshold vs. Annualized Return (CAGR)'}
      </p>

      <div className="space-y-4">
        {data.map((d, i) => {
          const pct = (d.cagr / MAX_CAGR) * 100;
          const isFirst = i === 0;
          return (
            <div key={d.label}>
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-sm"
                  style={{
                    color: isFirst ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: isFirst ? 600 : 400,
                  }}
                >
                  {lang === 'zh' ? d.label : d.labelEn}
                </span>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs"
                    style={{ color: 'rgba(160,160,176,0.5)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {d.trades} {lang === 'zh' ? '筆' : 'trades'}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{
                      color: isFirst ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontFamily: 'JetBrains Mono, monospace',
                      minWidth: '52px',
                      textAlign: 'right',
                    }}
                  >
                    {d.cagr}%
                  </span>
                </div>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    background: isFirst
                      ? 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))'
                      : `rgba(0,255,200,${0.5 - i * 0.1})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p
        className="text-xs mt-5 pt-4"
        style={{
          color: 'rgba(160,160,176,0.4)',
          borderTop: '1px solid rgba(0,255,200,0.06)',
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        {lang === 'zh'
          ? '↑ IVR 篩選門檻越高，可用交易越少，年化報酬越低'
          : '↑ Higher IVR filter = fewer trades, lower annualized return'}
      </p>
    </div>
  );
}
