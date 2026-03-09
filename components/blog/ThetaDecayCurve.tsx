'use client';

export default function ThetaDecayCurve({ lang = 'zh' }: { lang?: 'zh' | 'en' }) {
  // Theta decay follows roughly sqrt(t) curve - generate points
  const width = 480;
  const height = 160;
  const padL = 48;
  const padR = 20;
  const padT = 20;
  const padB = 36;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  // DTE from 60 down to 0
  const maxDTE = 60;
  const points: { x: number; y: number; dte: number }[] = [];
  for (let dte = maxDTE; dte >= 0; dte--) {
    const t = dte / maxDTE;
    // Theta accelerates: proportional to 1/sqrt(t), normalized
    const thetaVal = dte === 0 ? 1 : 1 - Math.sqrt(t);
    const x = padL + ((maxDTE - dte) / maxDTE) * chartW;
    const y = padT + (1 - thetaVal) * chartH;
    points.push({ x, y, dte });
  }

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Zone highlights
  const sweetSpotStartX = padL + ((maxDTE - 40) / maxDTE) * chartW;
  const sweetSpotEndX = padL + ((maxDTE - 30) / maxDTE) * chartW;
  const dangerZoneX = padL + ((maxDTE - 7) / maxDTE) * chartW;

  return (
    <div
      className="rounded-xl p-6 my-8"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(0,255,200,0.12)',
      }}
    >
      <p
        className="text-xs mb-4"
        style={{ color: 'rgba(160,160,176,0.5)', fontFamily: 'JetBrains Mono, monospace' }}
      >
        {lang === 'zh' ? 'Theta 衰減曲線（以到期日遠近為橫軸）' : 'Theta Decay Curve (by Days to Expiration)'}
      </p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          style={{ maxWidth: width }}
        >
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((frac) => {
            const y = padT + (1 - frac) * chartH;
            return (
              <line
                key={frac}
                x1={padL}
                y1={y}
                x2={width - padR}
                y2={y}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />
            );
          })}

          {/* Sweet spot zone (DTE 30-40) */}
          <rect
            x={sweetSpotStartX}
            y={padT}
            width={sweetSpotEndX - sweetSpotStartX}
            height={chartH}
            fill="rgba(0,255,200,0.06)"
          />

          {/* Danger zone (DTE < 7) */}
          <rect
            x={dangerZoneX}
            y={padT}
            width={width - padR - dangerZoneX}
            height={chartH}
            fill="rgba(255,69,107,0.07)"
          />

          {/* Area fill under curve */}
          <path
            d={`${pathD} L ${points[points.length - 1].x} ${padT + chartH} L ${padL} ${padT + chartH} Z`}
            fill="rgba(0,255,200,0.04)"
          />

          {/* Main curve */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(0,255,200,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X axis */}
          <line
            x1={padL}
            y1={padT + chartH}
            x2={width - padR}
            y2={padT + chartH}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />

          {/* Y axis */}
          <line
            x1={padL}
            y1={padT}
            x2={padL}
            y2={padT + chartH}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />

          {/* X axis labels */}
          {[60, 40, 30, 14, 7, 0].map((dte) => {
            const x = padL + ((maxDTE - dte) / maxDTE) * chartW;
            return (
              <text
                key={dte}
                x={x}
                y={height - 6}
                textAnchor="middle"
                fontSize="9"
                fill="rgba(160,160,176,0.5)"
                fontFamily="JetBrains Mono, monospace"
              >
                {dte}
              </text>
            );
          })}

          {/* Y axis label */}
          <text
            x={padL - 6}
            y={padT + chartH / 2}
            textAnchor="middle"
            fontSize="8"
            fill="rgba(160,160,176,0.4)"
            fontFamily="JetBrains Mono, monospace"
            transform={`rotate(-90, ${padL - 6}, ${padT + chartH / 2})`}
          >
            Theta
          </text>

          {/* X axis label */}
          <text
            x={padL + chartW / 2}
            y={height - 2}
            textAnchor="middle"
            fontSize="8"
            fill="rgba(160,160,176,0.4)"
            fontFamily="JetBrains Mono, monospace"
          >
            DTE
          </text>

          {/* Sweet spot label */}
          <text
            x={(sweetSpotStartX + sweetSpotEndX) / 2}
            y={padT + 12}
            textAnchor="middle"
            fontSize="8"
            fill="rgba(0,255,200,0.7)"
            fontFamily="JetBrains Mono, monospace"
          >
            {lang === 'zh' ? '甜蜜點' : 'Sweet spot'}
          </text>

          {/* Danger zone label */}
          <text
            x={(dangerZoneX + width - padR) / 2}
            y={padT + 12}
            textAnchor="middle"
            fontSize="8"
            fill="rgba(255,69,107,0.8)"
            fontFamily="JetBrains Mono, monospace"
          >
            {lang === 'zh' ? 'Gamma 危險區' : 'Gamma risk'}
          </text>
        </svg>
      </div>

      <p
        className="text-xs mt-2"
        style={{ color: 'rgba(160,160,176,0.4)', fontFamily: 'JetBrains Mono, monospace' }}
      >
        {lang === 'zh'
          ? '↑ Theta 衰減加速，越接近到期日每天收到的時間價值越多，但 Gamma 風險也越高'
          : '↑ Theta accelerates near expiry — more daily decay, but Gamma risk spikes too'}
      </p>
    </div>
  );
}
