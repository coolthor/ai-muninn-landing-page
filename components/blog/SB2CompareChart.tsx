'use client';

export default function SB2CompareChart({ lang = 'zh' }: { lang?: 'zh' | 'en' }) {
  const metrics = [
    {
      label: lang === 'zh' ? '勝率' : 'Win Rate',
      sb: 95,
      sb2: 96.8,
      unit: '%',
      max: 100,
    },
    {
      label: 'Profit Factor',
      sb: 3.5,
      sb2: 4.58,
      unit: 'x',
      max: 5,
    },
    {
      label: 'CAGR',
      sb: 110,
      sb2: 133.5,
      unit: '%',
      max: 150,
    },
    {
      label: lang === 'zh' ? '最大回撤' : 'Max Drawdown',
      sb: 7,
      sb2: 6.29,
      unit: '%',
      max: 10,
      lowerIsBetter: true,
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
        className="text-xs mb-2"
        style={{ color: 'rgba(160,160,176,0.5)', fontFamily: 'JetBrains Mono, monospace' }}
      >
        {lang === 'zh' ? 'SB vs SB2 出場策略比較' : 'SB vs SB2 Exit Strategy Comparison'}
      </p>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(160,160,176,0.3)' }} />
          <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
            SB {lang === 'zh' ? '（獲利 50% 出場）' : '(50% profit exit)'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--accent-primary)' }} />
          <span className="text-xs" style={{ color: 'var(--accent-primary)', fontFamily: 'JetBrains Mono, monospace' }}>
            SB2 {lang === 'zh' ? '（+ DTE ≤ 2 強制平倉）' : '(+ DTE ≤ 2 force close)'}
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {metrics.map((m) => {
          const sbPct = (m.sb / m.max) * 100;
          const sb2Pct = (m.sb2 / m.max) * 100;
          const sb2Wins = m.lowerIsBetter ? m.sb2 < m.sb : m.sb2 > m.sb;

          return (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {m.label}
                </span>
                <div className="flex items-center gap-4 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  <span style={{ color: 'rgba(160,160,176,0.5)' }}>
                    {m.sb}{m.unit}
                  </span>
                  <span
                    style={{ color: sb2Wins ? 'var(--accent-primary)' : '#FF456B', fontWeight: 600 }}
                  >
                    {m.sb2}{m.unit}
                    <span className="ml-1">{sb2Wins ? '▲' : '▼'}</span>
                  </span>
                </div>
              </div>
              <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                {/* SB bar */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    width: `${sbPct}%`,
                    background: 'rgba(160,160,176,0.25)',
                  }}
                />
                {/* SB2 bar (slightly offset to show both) */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    width: `${sb2Pct}%`,
                    background: sb2Wins
                      ? 'linear-gradient(90deg, rgba(0,255,200,0.3), var(--accent-primary))'
                      : 'rgba(255,69,107,0.6)',
                    opacity: 0.8,
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
          ? '↑ SB2 在所有指標上均優於 SB，唯一差別是多了 DTE ≤ 2 的強制平倉規則'
          : '↑ SB2 outperforms SB on all metrics — the only difference is the DTE ≤ 2 force-close rule'}
      </p>
    </div>
  );
}
