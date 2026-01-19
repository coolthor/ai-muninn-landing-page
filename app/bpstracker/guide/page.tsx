'use client';

import Link from 'next/link';
import { useState } from 'react';

const sections = [
  { id: 'getting-started', title: '快速開始', icon: '🚀' },
  { id: 'add-position', title: '新增持倉', icon: '➕' },
  { id: 'tracking', title: '持倉追蹤', icon: '📊' },
  { id: 'close-position', title: '平倉操作', icon: '✅' },
  { id: 'performance', title: '績效分析', icon: '📈' },
  { id: 'settings', title: '設定與進階', icon: '⚙️' },
];

export default function GuidePage() {
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
          <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>返回首頁</span>
          </Link>
          <h1 className="text-xl font-bold text-white">BPS Tracker 使用教學</h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="hidden lg:block w-64 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-800 p-4">
          <ul className="space-y-2">
            {sections.map((section) => (
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
              {sections.map((section) => (
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
              <h2 className="text-3xl font-bold text-white">快速開始</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">下載與安裝</h3>
                <p className="mb-4">
                  從 App Store 下載 BPS Tracker，支援 iOS 17 以上版本。安裝完成後開啟 App 即可開始使用。
                </p>
                <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-cyan-500">
                  <p className="text-sm text-gray-400">
                    <strong className="text-cyan-400">提示：</strong>
                    首次開啟會顯示 Demo 模式的範例數據，讓你快速了解 App 功能。
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Alpaca 帳戶連結（可選）</h3>
                <p className="mb-4">
                  連結 Alpaca 帳戶可以獲得即時市場價格和 Greeks 數據。這是<strong className="text-yellow-400">選擇性</strong>功能，不連結也可以正常使用 App。
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">1.</span>
                    <p>前往 Settings（設定）頁面</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">2.</span>
                    <p>點擊「Login with Alpaca」按鈕</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">3.</span>
                    <p>在 Alpaca 網站完成 OAuth 授權</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">4.</span>
                    <p>授權完成後自動返回 App</p>
                  </div>
                </div>
                <div className="mt-4 bg-gray-800/50 rounded-lg p-4 border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-400">
                    <strong className="text-yellow-400">注意：</strong>
                    Alpaca 提供的市場數據有 15 分鐘延遲，不是即時報價。
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">主畫面總覽</h3>
                <p className="mb-4">主畫面分為幾個區塊：</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-cyan-400"></span>
                    <div>
                      <strong className="text-white">Portfolio Summary</strong>
                      <p className="text-sm text-gray-400">顯示 Capital at Risk、Max Profit、Unrealized P&L、Theta/Day</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-cyan-400"></span>
                    <div>
                      <strong className="text-white">Position Cards</strong>
                      <p className="text-sm text-gray-400">每個持倉的卡片，顯示標的、履約價、到期日、P&L</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-cyan-400"></span>
                    <div>
                      <strong className="text-white">Filter Tabs</strong>
                      <p className="text-sm text-gray-400">切換顯示 All / Open / Closed 持倉</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Add Position */}
          <section id="add-position" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">➕</span>
              <h2 className="text-3xl font-bold text-white">新增持倉</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">輸入欄位說明</h3>
                <p className="mb-4">點擊右上角的「+」按鈕新增持倉，需填入以下資訊：</p>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Symbol（標的代碼）</h4>
                    <p className="text-sm text-gray-400">
                      輸入股票代碼，如 AAPL、SPY、QQQ。系統會驗證代碼是否有效。
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Short Strike（賣出履約價）</h4>
                    <p className="text-sm text-gray-400">
                      Bull Put Spread 中<strong className="text-red-400">賣出</strong>的 Put 履約價，這是較高的價格。
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Long Strike（買入履約價）</h4>
                    <p className="text-sm text-gray-400">
                      Bull Put Spread 中<strong className="text-green-400">買入</strong>的 Put 履約價，這是較低的價格，用於保護。
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Credit（收取權利金）</h4>
                    <p className="text-sm text-gray-400">
                      開倉時收到的淨權利金（每股），例如 $1.50 表示每口收取 $150。
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Contracts（口數）</h4>
                    <p className="text-sm text-gray-400">
                      交易的合約數量，1 口 = 100 股。
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Open Date / Expiry Date</h4>
                    <p className="text-sm text-gray-400">
                      開倉日期和到期日期，用於計算 DTE（Days to Expiry）和持有天數。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">即時預覽計算</h3>
                <p className="mb-4">輸入資料時，下方會即時顯示預覽：</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                    <h4 className="font-semibold text-red-400 mb-1">Max Loss</h4>
                    <p className="text-sm text-gray-400">
                      (價差 - 權利金) × 100 × 口數
                    </p>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                    <h4 className="font-semibold text-green-400 mb-1">Max Profit</h4>
                    <p className="text-sm text-gray-400">
                      權利金 × 100 × 口數
                    </p>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30">
                    <h4 className="font-semibold text-yellow-400 mb-1">Breakeven</h4>
                    <p className="text-sm text-gray-400">
                      Short Strike - 權利金
                    </p>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                    <h4 className="font-semibold text-blue-400 mb-1">Potential RoR</h4>
                    <p className="text-sm text-gray-400">
                      Max Profit ÷ Max Loss
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-xl font-semibold text-white mb-4">範例：AAPL Bull Put Spread</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Symbol</p>
                    <p className="font-mono text-cyan-400">AAPL</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Contracts</p>
                    <p className="font-mono text-cyan-400">5</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Short Strike</p>
                    <p className="font-mono text-red-400">$175</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Long Strike</p>
                    <p className="font-mono text-green-400">$170</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Credit</p>
                    <p className="font-mono text-green-400">$1.50</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Width</p>
                    <p className="font-mono text-white">$5.00</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Max Profit</p>
                    <p className="font-mono text-green-400">$750</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Max Loss</p>
                    <p className="font-mono text-red-400">$1,750</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Position Tracking */}
          <section id="tracking" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📊</span>
              <h2 className="text-3xl font-bold text-white">持倉追蹤</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Greeks 說明</h3>
                <p className="mb-4">
                  Greeks 是衡量選擇權風險的重要指標。BPS Tracker 顯示 Bull Put Spread 的淨 Greeks（Net Greeks = Long - Short）：
                </p>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-blue-400">Δ</span>
                      <h4 className="font-semibold text-white">Delta（方向風險）</h4>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      標的每變動 $1，選擇權價值的變化量。
                    </p>
                    <p className="text-sm">
                      <span className="text-green-400">理想範圍：-0.10 ~ +0.10</span>（接近中性）
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-purple-400">Γ</span>
                      <h4 className="font-semibold text-white">Gamma（Delta 變化率）</h4>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      標的每變動 $1，Delta 的變化量。
                    </p>
                    <p className="text-sm">
                      <span className="text-green-400">理想範圍：-0.01 ~ 0</span>（低曲率風險）
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-green-400">Θ</span>
                      <h4 className="font-semibold text-white">Theta（時間衰減）</h4>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      每天因時間流逝而獲得/損失的價值。這是賣方策略的主要獲利來源。
                    </p>
                    <p className="text-sm">
                      <span className="text-green-400">理想範圍：正值</span>（每天賺取時間價值）
                    </p>
                    <div className="mt-2 bg-green-500/10 rounded p-2 border border-green-500/20">
                      <p className="text-sm text-green-400">
                        💰 Daily Theta Value = Net Theta × 100 × Contracts
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-orange-400">ν</span>
                      <h4 className="font-semibold text-white">Vega（波動率敏感度）</h4>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      隱含波動率（IV）每變動 1%，選擇權價值的變化量。
                    </p>
                    <p className="text-sm">
                      <span className="text-green-400">理想範圍：-0.05 ~ 0</span>（低 IV 風險）
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">P&L 顯示說明</h3>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Unrealized P&L（未實現損益）</h4>
                    <p className="text-sm text-gray-400 mb-2">
                      (收取權利金 - 目前平倉成本) × 100 × 口數
                    </p>
                    <p className="text-sm">
                      括號內的百分比顯示<strong className="text-cyan-400">已賺取 Max Profit 的比例</strong>。
                      例如「$150 (75%)」表示已賺取最大利潤的 75%。
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">顏色意義</h4>
                    <div className="flex gap-4 mt-2">
                      <span className="text-green-400">🟢 綠色 = 獲利</span>
                      <span className="text-red-400">🔴 紅色 = 虧損</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">風險警示標籤</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      Near Expiry
                    </span>
                    <p className="text-sm text-gray-400">DTE ≤ 7 天，接近到期</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      ITM Warning
                    </span>
                    <p className="text-sm text-gray-400">目前股價低於 Short Strike，有被履約風險</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      ✓ Real Price
                    </span>
                    <p className="text-sm text-gray-400">使用 Alpaca 真實選擇權報價</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Close Position */}
          <section id="close-position" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">✅</span>
              <h2 className="text-3xl font-bold text-white">平倉操作</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">如何平倉</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">1.</span>
                    <p>點擊持倉卡片進入詳情頁面</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">2.</span>
                    <p>點擊「Close Position」按鈕</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">3.</span>
                    <p>輸入平倉日期和平倉價格（Debit paid）</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">4.</span>
                    <p>（可選）選擇平倉理由</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">5.</span>
                    <p>確認 P&L 預覽後點擊「Close Position」</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">平倉理由（可選）</h3>
                <p className="mb-4">
                  記錄平倉理由可以幫助你事後檢討交易決策。系統提供預設選項：
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">交易相關</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                        Profit target reached
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                        Stop loss triggered
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                        Early profit lock
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                        Risk management
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-400 mb-2">時間相關</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        Approaching expiration
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        Theta target reached
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        DTE too low
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">市場相關</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        High volatility
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Trend reversal
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        IV change
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">平倉後的 P&L 計算</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Realized P&L</h4>
                    <p className="text-sm font-mono text-gray-400">
                      (收取權利金 - 平倉價格) × 100 × 口數
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Return on Risk (RoR)</h4>
                    <p className="text-sm font-mono text-gray-400">
                      Realized P&L ÷ Max Loss × 100%
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Annualized RoR</h4>
                    <p className="text-sm font-mono text-gray-400">
                      RoR × (365 ÷ 持有天數)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Performance Analysis */}
          <section id="performance" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📈</span>
              <h2 className="text-3xl font-bold text-white">績效分析</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">History 頁面</h3>
                <p className="mb-4">
                  點擊導航列的「History」按鈕查看完整的交易歷史和績效統計。
                </p>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">統計指標</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-gray-400">Total Trades</span>
                        <span className="text-white">已平倉的交易總數</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Win Rate</span>
                        <span className="text-white">獲利交易數 ÷ 總交易數</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Total P&L</span>
                        <span className="text-white">所有已實現損益的加總</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Avg RoR</span>
                        <span className="text-white">平均 Return on Risk</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Avg Holding Days</span>
                        <span className="text-white">平均持有天數</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">CSV 匯出 / 匯入</h3>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">匯出 CSV</h4>
                    <p className="text-sm text-gray-400 mb-2">
                      在 History 或主畫面點擊匯出按鈕，可將持倉資料匯出為 CSV 檔案。
                    </p>
                    <p className="text-sm text-gray-400">
                      使用標準 OCC 選擇權代碼格式，可用於其他分析工具。
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">匯入 CSV</h4>
                    <p className="text-sm text-gray-400 mb-2">
                      在 Settings 頁面可匯入 CSV 檔案，批量新增持倉。
                    </p>
                    <p className="text-sm text-gray-400">
                      匯入為<strong className="text-cyan-400">累加</strong>模式，不會覆蓋現有資料。
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-gray-800 rounded-lg p-4 overflow-x-auto">
                  <p className="text-xs text-gray-500 mb-2">CSV 格式範例：</p>
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
              <h2 className="text-3xl font-bold text-white">設定與進階</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Alpaca 帳戶管理</h3>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">連結帳戶</h4>
                    <p className="text-sm text-gray-400">
                      點擊「Login with Alpaca」進行 OAuth 授權，獲取即時市場數據。
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">斷開連結</h4>
                    <p className="text-sm text-gray-400">
                      已連結時，點擊「Disconnect」可斷開 Alpaca 帳戶連結。
                      斷開後仍可繼續使用 App，但無法取得即時價格和 Greeks。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Demo Mode</h3>
                <p className="text-sm text-gray-400 mb-4">
                  開啟 Demo Mode 會顯示範例持倉資料，方便了解 App 功能。
                  關閉 Demo Mode 可以開始輸入自己的真實交易。
                </p>
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30">
                  <p className="text-sm text-yellow-400">
                    <strong>注意：</strong>Demo Mode 的資料不會影響你的真實持倉資料。
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">刪除帳戶</h3>
                <p className="text-sm text-gray-400 mb-4">
                  「Delete Account」會清除所有本機資料，包括：
                </p>
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1 ml-4">
                  <li>所有持倉記錄</li>
                  <li>交易歷史</li>
                  <li>Alpaca 授權 token</li>
                  <li>所有設定</li>
                </ul>
                <div className="mt-4 bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                  <p className="text-sm text-red-400">
                    <strong>警告：</strong>此操作無法復原，請確認後再執行。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回首頁
              </Link>
              <p className="text-gray-500 text-sm">
                有問題？聯繫我們：
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
