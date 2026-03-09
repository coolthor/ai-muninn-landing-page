'use client';

export default function DeltaStopChart({ lang = 'zh' }: { lang?: 'zh' | 'en' }) {
  const winners = 12553;
  const losers = 2990;
  const total = winners + losers;
  const winnerPct = (winners / total) * 100;

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
        {lang === 'zh'
          ? 'Delta Stop |Δ| > 0.30 的影響（36,815 筆交易）'
          : 'Impact of Delta Stop |Δ| > 0.30 (36,815 trades)'}
      </p>

      {/* Visual ratio bar */}
      <div className="mb-6">
        <div className="h-10 rounded-lg overflow-hidden flex" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div
            className="h-full flex items-center justify-center text-xs font-bold transition-all duration-700"
            style={{
              width: `${winnerPct}%`,
              background: 'rgba(255,69,107,0.25)',
              borderRight: '2px solid rgba(255,69,107,0.5)',
              color: '#FF456B',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {lang === 'zh' ? '獲利被殺' : 'Winners killed'}
          </div>
          <div
            className="h-full flex items-center justify-center text-xs font-bold"
            style={{
              width: `${100 - winnerPct}%`,
              background: 'rgba(0,222,148,0.12)',
              color: '#00DE94',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {lang === 'zh' ? '虧損被救' : 'Losers saved'}
          </div>
        </div>
      </div>

      {/* Numbers */}
      <div className="grid grid-cols-2 gap-4">
        <div
          className="rounded-lg p-4 text-center"
          style={{ background: 'rgba(255,69,107,0.08)', border: '1px solid rgba(255,69,107,0.2)' }}
        >
          <div
            className="text-3xl font-bold mb-1"
            style={{ color: '#FF456B', fontFamily: 'JetBrains Mono, monospace' }}
          >
            12,553
          </div>
          <div className="text-xs" style={{ color: 'rgba(160,160,176,0.7)' }}>
            {lang === 'zh' ? '獲利交易被提早停損' : 'Winners stopped out early'}
          </div>
        </div>
        <div
          className="rounded-lg p-4 text-center"
          style={{ background: 'rgba(0,222,148,0.06)', border: '1px solid rgba(0,222,148,0.15)' }}
        >
          <div
            className="text-3xl font-bold mb-1"
            style={{ color: '#00DE94', fontFamily: 'JetBrains Mono, monospace' }}
          >
            2,990
          </div>
          <div className="text-xs" style={{ color: 'rgba(160,160,176,0.7)' }}>
            {lang === 'zh' ? '虧損交易被攔截' : 'Losers actually avoided'}
          </div>
        </div>
      </div>

      <div
        className="mt-4 text-center text-sm font-semibold"
        style={{ color: '#FF456B', fontFamily: 'JetBrains Mono, monospace' }}
      >
        {lang === 'zh' ? '比例 4.2 : 1 ——每救一筆，殺死四筆' : 'Ratio 4.2 : 1 — kills 4 winners for every 1 loser saved'}
      </div>
    </div>
  );
}
