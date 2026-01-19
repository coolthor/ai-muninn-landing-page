'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';

const content = {
  en: {
    backToHome: 'Back to Home',
    pageTitle: 'BPS Tracker User Guide',
    contact: 'Questions? Contact us:',
    sections: [
      { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
      { id: 'add-position', title: 'Add Position', icon: '➕' },
      { id: 'tracking', title: 'Position Tracking', icon: '📊' },
      { id: 'close-position', title: 'Close Position', icon: '✅' },
      { id: 'performance', title: 'Performance Analysis', icon: '📈' },
      { id: 'settings', title: 'Settings', icon: '⚙️' },
    ],
    gettingStarted: {
      title: 'Getting Started',
      download: {
        title: 'Download & Install',
        desc: 'Download BPS Tracker from the App Store. Requires iOS 17 or later. Open the app after installation to get started.',
        tip: 'On first launch, Demo mode displays sample data to help you explore the app features.',
      },
      alpaca: {
        title: 'Alpaca Account Connection (Optional)',
        desc: 'Connect your Alpaca account to get real-time market prices and Greeks data. This is an',
        optional: 'optional',
        descEnd: 'feature - the app works without it.',
        steps: [
          'Go to Settings page',
          'Tap "Login with Alpaca" button',
          'Complete OAuth authorization on Alpaca website',
          'You\'ll be redirected back to the app automatically',
        ],
        note: 'Alpaca market data has a 15-minute delay, not real-time quotes.',
      },
      overview: {
        title: 'Main Screen Overview',
        desc: 'The main screen has several sections:',
        items: [
          { name: 'Portfolio Summary', desc: 'Shows Capital at Risk, Max Profit, Unrealized P&L, Theta/Day' },
          { name: 'Position Cards', desc: 'Each position card displays underlying, strikes, expiry, and P&L' },
          { name: 'Filter Tabs', desc: 'Switch between All / Open / Closed positions' },
        ],
      },
    },
    addPosition: {
      title: 'Add Position',
      fields: {
        title: 'Field Descriptions',
        desc: 'Tap the "+" button in the top right to add a new position. Fill in the following:',
        items: [
          { name: 'Symbol', desc: 'Stock ticker symbol (e.g., AAPL, SPY, QQQ). The system validates the symbol.' },
          { name: 'Short Strike', desc: 'The strike price of the Put you SELL in the Bull Put Spread. This is the higher price.' },
          { name: 'Long Strike', desc: 'The strike price of the Put you BUY for protection. This is the lower price.' },
          { name: 'Credit', desc: 'Net premium received per share (e.g., $1.50 means $150 per contract).' },
          { name: 'Contracts', desc: 'Number of contracts traded. 1 contract = 100 shares.' },
          { name: 'Open Date / Expiry Date', desc: 'Used to calculate DTE (Days to Expiry) and holding days.' },
        ],
      },
      preview: {
        title: 'Real-time Preview',
        desc: 'As you enter data, a preview shows:',
        items: [
          { name: 'Max Loss', formula: '(Width - Credit) × 100 × Contracts' },
          { name: 'Max Profit', formula: 'Credit × 100 × Contracts' },
          { name: 'Breakeven', formula: 'Short Strike - Credit' },
          { name: 'Potential RoR', formula: 'Max Profit ÷ Max Loss' },
        ],
      },
      example: {
        title: 'Example: AAPL Bull Put Spread',
      },
    },
    tracking: {
      title: 'Position Tracking',
      greeks: {
        title: 'Greeks Explained',
        desc: 'Greeks measure options risk. BPS Tracker shows Net Greeks for Bull Put Spreads (Net = Long - Short):',
        items: [
          { symbol: 'Δ', name: 'Delta', color: 'blue', desc: 'Price sensitivity - how much the option value changes per $1 move in underlying.', ideal: 'Ideal range: -0.10 to +0.10 (near neutral)' },
          { symbol: 'Γ', name: 'Gamma', color: 'purple', desc: 'Rate of Delta change per $1 move in underlying.', ideal: 'Ideal range: -0.01 to 0 (low curvature risk)' },
          { symbol: 'Θ', name: 'Theta', color: 'green', desc: 'Daily time decay value. Main profit source for sellers.', ideal: 'Ideal range: Positive (earning time value daily)', formula: 'Daily Theta Value = Net Theta × 100 × Contracts' },
          { symbol: 'ν', name: 'Vega', color: 'orange', desc: 'Sensitivity to 1% change in implied volatility (IV).', ideal: 'Ideal range: -0.05 to 0 (controlled IV risk)' },
        ],
      },
      pnl: {
        title: 'P&L Display',
        unrealized: {
          name: 'Unrealized P&L',
          formula: '(Credit Received - Current Close Cost) × 100 × Contracts',
          desc: 'The percentage in parentheses shows how much of Max Profit has been earned. E.g., "$150 (75%)" means 75% of max profit achieved.',
        },
        colors: {
          name: 'Color Meaning',
          green: 'Green = Profit',
          red: 'Red = Loss',
        },
      },
      warnings: {
        title: 'Risk Warning Labels',
        items: [
          { label: 'Near Expiry', color: 'yellow', desc: 'DTE ≤ 7 days, approaching expiration' },
          { label: 'ITM Warning', color: 'red', desc: 'Current price below Short Strike, assignment risk' },
          { label: '✓ Real Price', color: 'cyan', desc: 'Using real Alpaca option quotes' },
        ],
      },
    },
    closePosition: {
      title: 'Close Position',
      howTo: {
        title: 'How to Close',
        steps: [
          'Tap a position card to open details',
          'Tap "Close Position" button',
          'Enter close date and close price (Debit paid)',
          '(Optional) Select a close reason',
          'Review P&L preview and tap "Close Position"',
        ],
      },
      reasons: {
        title: 'Close Reasons (Optional)',
        desc: 'Recording close reasons helps review trading decisions. Default options:',
        categories: [
          { name: 'Trading Related', color: 'green', items: ['Profit target reached', 'Stop loss triggered', 'Early profit lock', 'Risk management'] },
          { name: 'Time Related', color: 'orange', items: ['Approaching expiration', 'Theta target reached', 'DTE too low'] },
          { name: 'Market Related', color: 'blue', items: ['High volatility', 'Trend reversal', 'IV change'] },
        ],
      },
      calculations: {
        title: 'P&L Calculations After Close',
        items: [
          { name: 'Realized P&L', formula: '(Credit - Close Price) × 100 × Contracts' },
          { name: 'Return on Risk (RoR)', formula: 'Realized P&L ÷ Max Loss × 100%' },
          { name: 'Annualized RoR', formula: 'RoR × (365 ÷ Holding Days)' },
        ],
      },
    },
    performance: {
      title: 'Performance Analysis',
      history: {
        title: 'History Page',
        desc: 'Tap "History" in the navigation to view complete trade history and performance stats.',
        metrics: {
          title: 'Statistics',
          items: [
            { name: 'Total Trades', desc: 'Total number of closed trades' },
            { name: 'Win Rate', desc: 'Profitable trades ÷ Total trades' },
            { name: 'Total P&L', desc: 'Sum of all realized P&L' },
            { name: 'Avg RoR', desc: 'Average Return on Risk' },
            { name: 'Avg Holding Days', desc: 'Average days held' },
          ],
        },
      },
      csv: {
        title: 'CSV Export / Import',
        export: {
          name: 'Export CSV',
          desc: 'Export position data to CSV from History or main screen. Uses standard OCC option symbol format for use with other tools.',
        },
        import: {
          name: 'Import CSV',
          desc: 'Import CSV files from Settings to batch add positions. Import is additive - existing data is preserved.',
        },
        example: 'CSV format example:',
      },
    },
    settings: {
      title: 'Settings',
      alpaca: {
        title: 'Alpaca Account Management',
        connect: { name: 'Connect Account', desc: 'Tap "Login with Alpaca" for OAuth authorization to get real-time market data.' },
        disconnect: { name: 'Disconnect', desc: 'When connected, tap "Disconnect" to unlink your Alpaca account. App continues to work but without real-time prices and Greeks.' },
      },
      demo: {
        title: 'Demo Mode',
        desc: 'Enable Demo Mode to display sample positions for exploring app features. Disable to enter your own real trades.',
        note: 'Demo Mode data does not affect your real position data.',
      },
      delete: {
        title: 'Delete Account',
        desc: '"Delete Account" clears all local data including:',
        items: ['All position records', 'Trade history', 'Alpaca authorization token', 'All settings'],
        warning: 'This action cannot be undone. Please confirm before proceeding.',
      },
    },
  },
  'zh-TW': {
    backToHome: '返回首頁',
    pageTitle: 'BPS Tracker 使用教學',
    contact: '有問題？聯繫我們：',
    sections: [
      { id: 'getting-started', title: '快速開始', icon: '🚀' },
      { id: 'add-position', title: '新增持倉', icon: '➕' },
      { id: 'tracking', title: '持倉追蹤', icon: '📊' },
      { id: 'close-position', title: '平倉操作', icon: '✅' },
      { id: 'performance', title: '績效分析', icon: '📈' },
      { id: 'settings', title: '設定與進階', icon: '⚙️' },
    ],
    gettingStarted: {
      title: '快速開始',
      download: {
        title: '下載與安裝',
        desc: '從 App Store 下載 BPS Tracker，支援 iOS 17 以上版本。安裝完成後開啟 App 即可開始使用。',
        tip: '首次開啟會顯示 Demo 模式的範例數據，讓你快速了解 App 功能。',
      },
      alpaca: {
        title: 'Alpaca 帳戶連結（可選）',
        desc: '連結 Alpaca 帳戶可以獲得即時市場價格和 Greeks 數據。這是',
        optional: '選擇性',
        descEnd: '功能，不連結也可以正常使用 App。',
        steps: [
          '前往 Settings（設定）頁面',
          '點擊「Login with Alpaca」按鈕',
          '在 Alpaca 網站完成 OAuth 授權',
          '授權完成後自動返回 App',
        ],
        note: 'Alpaca 提供的市場數據有 15 分鐘延遲，不是即時報價。',
      },
      overview: {
        title: '主畫面總覽',
        desc: '主畫面分為幾個區塊：',
        items: [
          { name: 'Portfolio Summary', desc: '顯示 Capital at Risk、Max Profit、Unrealized P&L、Theta/Day' },
          { name: 'Position Cards', desc: '每個持倉的卡片，顯示標的、履約價、到期日、P&L' },
          { name: 'Filter Tabs', desc: '切換顯示 All / Open / Closed 持倉' },
        ],
      },
    },
    addPosition: {
      title: '新增持倉',
      fields: {
        title: '輸入欄位說明',
        desc: '點擊右上角的「+」按鈕新增持倉，需填入以下資訊：',
        items: [
          { name: 'Symbol（標的代碼）', desc: '輸入股票代碼，如 AAPL、SPY、QQQ。系統會驗證代碼是否有效。' },
          { name: 'Short Strike（賣出履約價）', desc: 'Bull Put Spread 中賣出的 Put 履約價，這是較高的價格。' },
          { name: 'Long Strike（買入履約價）', desc: 'Bull Put Spread 中買入的 Put 履約價，這是較低的價格，用於保護。' },
          { name: 'Credit（收取權利金）', desc: '開倉時收到的淨權利金（每股），例如 $1.50 表示每口收取 $150。' },
          { name: 'Contracts（口數）', desc: '交易的合約數量，1 口 = 100 股。' },
          { name: 'Open Date / Expiry Date', desc: '開倉日期和到期日期，用於計算 DTE（Days to Expiry）和持有天數。' },
        ],
      },
      preview: {
        title: '即時預覽計算',
        desc: '輸入資料時，下方會即時顯示預覽：',
        items: [
          { name: 'Max Loss', formula: '(價差 - 權利金) × 100 × 口數' },
          { name: 'Max Profit', formula: '權利金 × 100 × 口數' },
          { name: 'Breakeven', formula: 'Short Strike - 權利金' },
          { name: 'Potential RoR', formula: 'Max Profit ÷ Max Loss' },
        ],
      },
      example: {
        title: '範例：AAPL Bull Put Spread',
      },
    },
    tracking: {
      title: '持倉追蹤',
      greeks: {
        title: 'Greeks 說明',
        desc: 'Greeks 是衡量選擇權風險的重要指標。BPS Tracker 顯示 Bull Put Spread 的淨 Greeks（Net Greeks = Long - Short）：',
        items: [
          { symbol: 'Δ', name: 'Delta（方向風險）', color: 'blue', desc: '標的每變動 $1，選擇權價值的變化量。', ideal: '理想範圍：-0.10 ~ +0.10（接近中性）' },
          { symbol: 'Γ', name: 'Gamma（Delta 變化率）', color: 'purple', desc: '標的每變動 $1，Delta 的變化量。', ideal: '理想範圍：-0.01 ~ 0（低曲率風險）' },
          { symbol: 'Θ', name: 'Theta（時間衰減）', color: 'green', desc: '每天因時間流逝而獲得/損失的價值。這是賣方策略的主要獲利來源。', ideal: '理想範圍：正值（每天賺取時間價值）', formula: 'Daily Theta Value = Net Theta × 100 × Contracts' },
          { symbol: 'ν', name: 'Vega（波動率敏感度）', color: 'orange', desc: '隱含波動率（IV）每變動 1%，選擇權價值的變化量。', ideal: '理想範圍：-0.05 ~ 0（低 IV 風險）' },
        ],
      },
      pnl: {
        title: 'P&L 顯示說明',
        unrealized: {
          name: 'Unrealized P&L（未實現損益）',
          formula: '(收取權利金 - 目前平倉成本) × 100 × 口數',
          desc: '括號內的百分比顯示已賺取 Max Profit 的比例。例如「$150 (75%)」表示已賺取最大利潤的 75%。',
        },
        colors: {
          name: '顏色意義',
          green: '綠色 = 獲利',
          red: '紅色 = 虧損',
        },
      },
      warnings: {
        title: '風險警示標籤',
        items: [
          { label: 'Near Expiry', color: 'yellow', desc: 'DTE ≤ 7 天，接近到期' },
          { label: 'ITM Warning', color: 'red', desc: '目前股價低於 Short Strike，有被履約風險' },
          { label: '✓ Real Price', color: 'cyan', desc: '使用 Alpaca 真實選擇權報價' },
        ],
      },
    },
    closePosition: {
      title: '平倉操作',
      howTo: {
        title: '如何平倉',
        steps: [
          '點擊持倉卡片進入詳情頁面',
          '點擊「Close Position」按鈕',
          '輸入平倉日期和平倉價格（Debit paid）',
          '（可選）選擇平倉理由',
          '確認 P&L 預覽後點擊「Close Position」',
        ],
      },
      reasons: {
        title: '平倉理由（可選）',
        desc: '記錄平倉理由可以幫助你事後檢討交易決策。系統提供預設選項：',
        categories: [
          { name: '交易相關', color: 'green', items: ['Profit target reached', 'Stop loss triggered', 'Early profit lock', 'Risk management'] },
          { name: '時間相關', color: 'orange', items: ['Approaching expiration', 'Theta target reached', 'DTE too low'] },
          { name: '市場相關', color: 'blue', items: ['High volatility', 'Trend reversal', 'IV change'] },
        ],
      },
      calculations: {
        title: '平倉後的 P&L 計算',
        items: [
          { name: 'Realized P&L', formula: '(收取權利金 - 平倉價格) × 100 × 口數' },
          { name: 'Return on Risk (RoR)', formula: 'Realized P&L ÷ Max Loss × 100%' },
          { name: 'Annualized RoR', formula: 'RoR × (365 ÷ 持有天數)' },
        ],
      },
    },
    performance: {
      title: '績效分析',
      history: {
        title: 'History 頁面',
        desc: '點擊導航列的「History」按鈕查看完整的交易歷史和績效統計。',
        metrics: {
          title: '統計指標',
          items: [
            { name: 'Total Trades', desc: '已平倉的交易總數' },
            { name: 'Win Rate', desc: '獲利交易數 ÷ 總交易數' },
            { name: 'Total P&L', desc: '所有已實現損益的加總' },
            { name: 'Avg RoR', desc: '平均 Return on Risk' },
            { name: 'Avg Holding Days', desc: '平均持有天數' },
          ],
        },
      },
      csv: {
        title: 'CSV 匯出 / 匯入',
        export: {
          name: '匯出 CSV',
          desc: '在 History 或主畫面點擊匯出按鈕，可將持倉資料匯出為 CSV 檔案。使用標準 OCC 選擇權代碼格式，可用於其他分析工具。',
        },
        import: {
          name: '匯入 CSV',
          desc: '在 Settings 頁面可匯入 CSV 檔案，批量新增持倉。匯入為累加模式，不會覆蓋現有資料。',
        },
        example: 'CSV 格式範例：',
      },
    },
    settings: {
      title: '設定與進階',
      alpaca: {
        title: 'Alpaca 帳戶管理',
        connect: { name: '連結帳戶', desc: '點擊「Login with Alpaca」進行 OAuth 授權，獲取即時市場數據。' },
        disconnect: { name: '斷開連結', desc: '已連結時，點擊「Disconnect」可斷開 Alpaca 帳戶連結。斷開後仍可繼續使用 App，但無法取得即時價格和 Greeks。' },
      },
      demo: {
        title: 'Demo Mode',
        desc: '開啟 Demo Mode 會顯示範例持倉資料，方便了解 App 功能。關閉 Demo Mode 可以開始輸入自己的真實交易。',
        note: 'Demo Mode 的資料不會影響你的真實持倉資料。',
      },
      delete: {
        title: '刪除帳戶',
        desc: '「Delete Account」會清除所有本機資料，包括：',
        items: ['所有持倉記錄', '交易歷史', 'Alpaca 授權 token', '所有設定'],
        warning: '此操作無法復原，請確認後再執行。',
      },
    },
  },
};

type Locale = 'en' | 'zh-TW';

export default function GuidePage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const t = content[locale] || content.en;

  const [activeSection, setActiveSection] = useState('getting-started');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{t.backToHome}</span>
          </Link>
          <h1 className="text-xl font-bold text-white">{t.pageTitle}</h1>
          <div className="w-24" />
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="hidden lg:block w-64 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-800 p-4">
          <ul className="space-y-2">
            {t.sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                    activeSection === section.id
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span>{section.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 lg:py-12">
          {/* Mobile Navigation */}
          <div className="lg:hidden mb-8 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {t.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {section.icon} {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Section 1: Getting Started */}
          <section id="getting-started" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🚀</span>
              <h2 className="text-3xl font-bold text-white">{t.gettingStarted.title}</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.gettingStarted.download.title}</h3>
                <p className="mb-4">{t.gettingStarted.download.desc}</p>
                <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-cyan-500">
                  <p className="text-sm text-gray-400">
                    <strong className="text-cyan-400">Tip:</strong> {t.gettingStarted.download.tip}
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.gettingStarted.alpaca.title}</h3>
                <p className="mb-4">
                  {t.gettingStarted.alpaca.desc} <strong className="text-yellow-400">{t.gettingStarted.alpaca.optional}</strong> {t.gettingStarted.alpaca.descEnd}
                </p>
                <div className="space-y-3">
                  {t.gettingStarted.alpaca.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">{i + 1}.</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-gray-800/50 rounded-lg p-4 border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-400">
                    <strong className="text-yellow-400">Note:</strong> {t.gettingStarted.alpaca.note}
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.gettingStarted.overview.title}</h3>
                <p className="mb-4">{t.gettingStarted.overview.desc}</p>
                <ul className="space-y-3">
                  {t.gettingStarted.overview.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 rounded-full bg-cyan-400"></span>
                      <div>
                        <strong className="text-white">{item.name}</strong>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Add Position */}
          <section id="add-position" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">➕</span>
              <h2 className="text-3xl font-bold text-white">{t.addPosition.title}</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.addPosition.fields.title}</h3>
                <p className="mb-4">{t.addPosition.fields.desc}</p>
                <div className="space-y-4">
                  {t.addPosition.fields.items.map((item, i) => (
                    <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">{item.name}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.addPosition.preview.title}</h3>
                <p className="mb-4">{t.addPosition.preview.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                  {t.addPosition.preview.items.map((item, i) => {
                    const colors = ['red', 'green', 'yellow', 'blue'];
                    const color = colors[i];
                    return (
                      <div key={i} className={`bg-${color}-500/10 rounded-lg p-4 border border-${color}-500/30`}>
                        <h4 className={`font-semibold text-${color}-400 mb-1`}>{item.name}</h4>
                        <p className="text-sm text-gray-400">{item.formula}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-xl font-semibold text-white mb-4">{t.addPosition.example.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-gray-400">Symbol</p><p className="font-mono text-cyan-400">AAPL</p></div>
                  <div><p className="text-gray-400">Contracts</p><p className="font-mono text-cyan-400">5</p></div>
                  <div><p className="text-gray-400">Short Strike</p><p className="font-mono text-red-400">$175</p></div>
                  <div><p className="text-gray-400">Long Strike</p><p className="font-mono text-green-400">$170</p></div>
                  <div><p className="text-gray-400">Credit</p><p className="font-mono text-green-400">$1.50</p></div>
                  <div><p className="text-gray-400">Width</p><p className="font-mono text-white">$5.00</p></div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-gray-400">Max Profit</p><p className="font-mono text-green-400">$750</p></div>
                  <div><p className="text-gray-400">Max Loss</p><p className="font-mono text-red-400">$1,750</p></div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Position Tracking */}
          <section id="tracking" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📊</span>
              <h2 className="text-3xl font-bold text-white">{t.tracking.title}</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.tracking.greeks.title}</h3>
                <p className="mb-4">{t.tracking.greeks.desc}</p>
                <div className="space-y-4">
                  {t.tracking.greeks.items.map((item, i) => (
                    <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-2xl font-bold text-${item.color}-400`}>{item.symbol}</span>
                        <h4 className="font-semibold text-white">{item.name}</h4>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{item.desc}</p>
                      <p className="text-sm"><span className="text-green-400">{item.ideal}</span></p>
                      {item.formula && (
                        <div className="mt-2 bg-green-500/10 rounded p-2 border border-green-500/20">
                          <p className="text-sm text-green-400">💰 {item.formula}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.tracking.pnl.title}</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">{t.tracking.pnl.unrealized.name}</h4>
                    <p className="text-sm text-gray-400 mb-2">{t.tracking.pnl.unrealized.formula}</p>
                    <p className="text-sm">{t.tracking.pnl.unrealized.desc}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">{t.tracking.pnl.colors.name}</h4>
                    <div className="flex gap-4 mt-2">
                      <span className="text-green-400">🟢 {t.tracking.pnl.colors.green}</span>
                      <span className="text-red-400">🔴 {t.tracking.pnl.colors.red}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.tracking.warnings.title}</h3>
                <div className="space-y-3">
                  {t.tracking.warnings.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full bg-${item.color}-500/20 text-${item.color}-400 border border-${item.color}-500/30`}>
                        {item.label}
                      </span>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Close Position */}
          <section id="close-position" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">✅</span>
              <h2 className="text-3xl font-bold text-white">{t.closePosition.title}</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.closePosition.howTo.title}</h3>
                <div className="space-y-3">
                  {t.closePosition.howTo.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">{i + 1}.</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.closePosition.reasons.title}</h3>
                <p className="mb-4">{t.closePosition.reasons.desc}</p>
                <div className="space-y-4">
                  {t.closePosition.reasons.categories.map((cat, i) => (
                    <div key={i}>
                      <h4 className={`font-semibold text-${cat.color}-400 mb-2`}>{cat.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item, j) => (
                          <span key={j} className={`px-3 py-1 text-xs rounded-full bg-${cat.color}-500/10 text-${cat.color}-400 border border-${cat.color}-500/20`}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.closePosition.calculations.title}</h3>
                <div className="space-y-4">
                  {t.closePosition.calculations.items.map((item, i) => (
                    <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">{item.name}</h4>
                      <p className="text-sm font-mono text-gray-400">{item.formula}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Performance Analysis */}
          <section id="performance" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📈</span>
              <h2 className="text-3xl font-bold text-white">{t.performance.title}</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.performance.history.title}</h3>
                <p className="mb-4">{t.performance.history.desc}</p>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">{t.performance.history.metrics.title}</h4>
                  <ul className="space-y-2 text-sm">
                    {t.performance.history.metrics.items.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span className="text-gray-400">{item.name}</span>
                        <span className="text-white">{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.performance.csv.title}</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">{t.performance.csv.export.name}</h4>
                    <p className="text-sm text-gray-400">{t.performance.csv.export.desc}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">{t.performance.csv.import.name}</h4>
                    <p className="text-sm text-gray-400">{t.performance.csv.import.desc}</p>
                  </div>
                </div>
                <div className="mt-4 bg-gray-800 rounded-lg p-4 overflow-x-auto">
                  <p className="text-xs text-gray-500 mb-2">{t.performance.csv.example}</p>
                  <pre className="text-xs text-cyan-400 font-mono">
ShortPutSymbol,LongPutSymbol,OpenDate,Contracts,Credit,Status
AAPL250117P00175000,AAPL250117P00170000,2024-12-01,5,1.50,open</pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Settings */}
          <section id="settings" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">⚙️</span>
              <h2 className="text-3xl font-bold text-white">{t.settings.title}</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.settings.alpaca.title}</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">{t.settings.alpaca.connect.name}</h4>
                    <p className="text-sm text-gray-400">{t.settings.alpaca.connect.desc}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">{t.settings.alpaca.disconnect.name}</h4>
                    <p className="text-sm text-gray-400">{t.settings.alpaca.disconnect.desc}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.settings.demo.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{t.settings.demo.desc}</p>
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30">
                  <p className="text-sm text-yellow-400">
                    <strong>Note:</strong> {t.settings.demo.note}
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.settings.delete.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{t.settings.delete.desc}</p>
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1 ml-4">
                  {t.settings.delete.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="mt-4 bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                  <p className="text-sm text-red-400">
                    <strong>Warning:</strong> {t.settings.delete.warning}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link href={`/${locale}`} className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t.backToHome}
              </Link>
              <p className="text-gray-500 text-sm">
                {t.contact}
                <a href="mailto:support@ai-muninn.com" className="text-cyan-400 hover:underline ml-1">
                  support@ai-muninn.com
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
