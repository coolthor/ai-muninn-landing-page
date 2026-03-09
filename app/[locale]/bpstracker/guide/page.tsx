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
      { id: 'add-position',    title: 'Add Position',    icon: '➕' },
      { id: 'tracking',        title: 'Position Tracking', icon: '📊' },
      { id: 'market-view',     title: 'Market View',     icon: '🌍' },
      { id: 'ai-analysis',     title: 'AI Analysis',     icon: '🤖' },
      { id: 'close-position',  title: 'Close Position',  icon: '✅' },
      { id: 'performance',     title: 'Performance',     icon: '📈' },
      { id: 'settings',        title: 'Settings',        icon: '⚙️' },
    ],
    gettingStarted: {
      title: 'Getting Started',
      download: {
        title: 'Download & Install',
        desc: 'Download BPS Tracker from the App Store. Requires iOS 17 or later. Open the app after installation to get started.',
        tip: 'On first launch, Demo mode displays sample data to help you explore all app features before entering real trades.',
      },
      bpsApi: {
        title: 'Works Out of the Box — No Account Needed',
        desc: 'BPS Tracker connects to the official BPS API to deliver real-time option prices and Greeks. No broker account connection or registration is required.',
        free: { name: 'Free', desc: 'Prices refresh every 15 minutes. Up to 3 open positions.' },
        pro:  { name: 'Pro',  desc: 'Prices refresh every 1 minute. Up to 20 open positions, plus all advanced features.' },
        tip: 'Upgrade to Pro at any time from the Settings screen or via the upgrade banner.',
      },
      overview: {
        title: 'Main Screen Overview',
        desc: 'The main screen is your trading dashboard:',
        items: [
          { name: 'Portfolio Summary', desc: 'Capital at Risk, Max Profit, Unrealized P&L, and daily Theta income — aggregated across all open positions.' },
          { name: 'Position Cards', desc: 'Each card shows the underlying symbol, strike prices, expiry, DTE badge, current P&L, and live option price.' },
          { name: 'Filter Tabs', desc: 'Switch between All / Open / Closed positions.' },
          { name: 'Market Tab', desc: 'Tap the second tab for real-time VIX, Fear & Greed, SKEW, and earnings calendar.' },
          { name: '+ Button', desc: 'Add a position manually or import from a broker screenshot.' },
        ],
      },
    },
    addPosition: {
      title: 'Add Position',
      manual: {
        title: 'Add Manually',
        desc: 'Tap "+" → "Add Manually" to open the position entry form.',
        fields: [
          { name: 'Symbol',      desc: 'Stock ticker (e.g. AAPL, SPY, QQQ). The app validates the symbol.' },
          { name: 'Short Strike', desc: 'The Put you SELL — the higher strike. This is where your risk begins.' },
          { name: 'Long Strike',  desc: 'The Put you BUY for protection — the lower strike.' },
          { name: 'Credit',       desc: 'Net premium received per share. $1.50 = $150 per contract.' },
          { name: 'Contracts',    desc: 'Number of contracts. 1 contract = 100 shares.' },
          { name: 'Open Date / Expiry Date', desc: 'Used to calculate DTE (Days to Expiry) and holding period.' },
        ],
        preview: {
          title: 'Real-Time Preview',
          desc: 'As you type, a live preview calculates:',
          items: [
            { name: 'Max Loss',      formula: '(Width − Credit) × 100 × Contracts' },
            { name: 'Max Profit',    formula: 'Credit × 100 × Contracts' },
            { name: 'Breakeven',     formula: 'Short Strike − Credit' },
            { name: 'Potential RoR', formula: 'Max Profit ÷ Max Loss' },
          ],
        },
      },
      screenshot: {
        title: 'Import from Screenshot',
        desc: 'Tap "+" → "Import from Screenshot" to use AI-powered OCR to extract position details from a broker screenshot.',
        steps: [
          'Tap "+" then choose "Import from Screenshot"',
          'Upload a photo or take a live screenshot of your broker\'s position screen',
          'AI extracts the symbol, strikes, credit, contracts, and expiry automatically',
          'Review the parsed results, correct if needed, then save',
        ],
        limits: 'Free: 8 imports / month    Pro: 80 imports / month',
        tip: 'Works best with clear, unobstructed screenshots of the order confirmation or position details screen.',
      },
      csv: {
        title: 'Import from CSV',
        desc: 'Go to Settings → Import CSV to batch-add positions. Import is additive — existing data is preserved.',
        format: 'CSV format:',
      },
    },
    tracking: {
      title: 'Position Tracking',
      detail: {
        title: 'Position Detail — 4-Block Layout',
        desc: 'Tap any position card to open the detail view, which is organized into 4 sections:',
        items: [
          { name: 'Combined Card', desc: 'Symbol, spread strikes, Status badge, DTE, current P&L, and net Theta income.' },
          { name: 'Risk Indicators', desc: 'Delta vs opening value, IV vs yesterday, and visual Risk Bar. Pro: historical IV for a more accurate Risk Bar.' },
          { name: 'Position Details', desc: 'Collapsible section with all Greeks (Delta, Gamma, Theta, Vega), OTM%, Breakeven, Max Loss, and Spread Cost.' },
          { name: 'Alerts (Pro)', desc: 'Set personalized thresholds for Delta, DTE, OTM%, and P&L. Get notified when a threshold is breached.' },
        ],
      },
      greeks: {
        title: 'Greeks Explained',
        desc: 'Greeks measure options risk. BPS Tracker shows Net Greeks (Net = Long − Short):',
        items: [
          { symbol: 'Δ', name: 'Delta', color: 'blue',   desc: 'Sensitivity to a $1 move in the underlying. Ideal range for BPS: −0.10 to +0.10 (near neutral).', formula: null },
          { symbol: 'Γ', name: 'Gamma', color: 'purple', desc: 'Rate of Delta change per $1 move. Low gamma = more stable Delta. Ideal: −0.01 to 0.', formula: null },
          { symbol: 'Θ', name: 'Theta', color: 'green',  desc: 'Daily time decay — your main profit source as a premium seller. Should be positive.', formula: 'Daily Theta Income = Net Theta × 100 × Contracts' },
          { symbol: 'ν', name: 'Vega',  color: 'orange', desc: 'Sensitivity to 1% change in implied volatility. Short spreads have negative vega. Ideal: −0.05 to 0.', formula: null },
        ],
      },
      trendCharts: {
        title: 'Greeks Trend Charts (Pro)',
        desc: 'Pro subscribers can view historical charts for each position — Delta, IV, Theta, and Spread Cost — plotted from open date to today. Useful for spotting creeping risk before it becomes a problem.',
        tabs: ['Delta', 'IV', 'Theta', 'Spread Cost'],
      },
      pnl: {
        title: 'P&L Display',
        unrealized: {
          name: 'Unrealized P&L',
          formula: '(Credit Received − Current Spread Cost) × 100 × Contracts',
          desc: 'The percentage in parentheses shows what share of Max Profit you\'ve captured. "$150 (75%)" means 75% of max profit already secured.',
        },
        colors: { name: 'Color Coding', green: 'Green = Profit', red: 'Red = Loss' },
      },
      warnings: {
        title: 'Status Badges & Risk Labels',
        items: [
          { label: 'Near Expiry', color: 'yellow', desc: 'DTE ≤ 7 days. Consider closing or rolling.' },
          { label: 'Expired',     color: 'red',    desc: 'DTE < 0. Position has passed expiry date.' },
          { label: 'ITM Warning', color: 'red',    desc: 'Stock price has breached the Short Strike — assignment risk.' },
        ],
      },
      alerts: {
        title: 'Custom Alert Thresholds (Pro)',
        desc: 'Set personalized thresholds on the Position Detail screen. The app sends a local notification when any threshold is crossed:',
        items: [
          { name: 'Delta Threshold',  desc: 'Alert when net Delta exceeds your chosen value (e.g., > 0.20).' },
          { name: 'DTE Threshold',    desc: 'Alert when Days to Expiry drops below your limit (e.g., < 5).' },
          { name: 'OTM% Threshold',   desc: 'Alert when OTM% narrows below your safety margin.' },
          { name: 'P&L Threshold',    desc: 'Alert when unrealized loss exceeds a dollar amount.' },
        ],
        note: 'Notifications fire once per breach and reset after the position recovers past the threshold.',
      },
    },
    marketView: {
      title: 'Market View',
      desc: 'The Market tab gives you a real-time pulse on overall market conditions — essential context for managing BPS positions.',
      items: [
        {
          name: 'VIX Gauge',
          color: 'blue',
          desc: 'The CBOE Volatility Index. Higher VIX = higher option premiums and wider spreads available. BPS sellers generally prefer VIX above 15–20 for meaningful credit.',
        },
        {
          name: 'Fear & Greed Index',
          color: 'orange',
          desc: 'CNN\'s composite sentiment indicator. Extreme Fear often signals elevated put premiums — a potential opportunity for BPS sellers. Extreme Greed suggests complacency and thinner premiums.',
        },
        {
          name: 'CBOE SKEW Index',
          color: 'purple',
          desc: 'Measures demand for out-of-the-money puts relative to calls. High SKEW (> 130) indicates the market is paying up for downside protection — relevant when choosing strike width.',
        },
        {
          name: 'Earnings & Dividend Calendar',
          color: 'cyan',
          desc: 'Upcoming earnings announcements and ex-dividend dates for your tracked symbols. Avoid holding BPS positions through earnings unless you understand the binary risk.',
        },
      ],
    },
    aiAnalysis: {
      title: 'AI Analysis',
      desc: 'Powered by Gemini AI, the analysis feature reviews your entire portfolio and delivers personalized risk insights.',
      howTo: {
        title: 'How to Use',
        steps: [
          'Open the main Positions screen',
          'Tap the "AI Analysis" button (sparkle icon)',
          'Wait a few seconds while Gemini evaluates your portfolio',
          'Review the report — high-risk positions are flagged, recommendations are provided',
        ],
      },
      whatItDoes: {
        title: 'What the Analysis Covers',
        items: [
          { name: 'High-Risk Position Detection', desc: 'Identifies positions approaching strikes, near expiry, or with elevated Delta.' },
          { name: 'Earnings Event Tracking', desc: 'Warns if any open position has an earnings release before expiry.' },
          { name: 'Portfolio-Level Assessment', desc: 'Evaluates concentration risk and overall portfolio health.' },
          { name: 'Actionable Recommendations', desc: 'Suggests whether to hold, close, or roll specific positions.' },
        ],
      },
      limits: {
        title: 'Usage Limits',
        free: '10 analyses / month',
        pro:  '200 analyses / month',
        tip: 'Best used after major market moves, before earnings season, or when VIX spikes — not necessarily every day.',
      },
    },
    closePosition: {
      title: 'Close Position',
      howTo: {
        title: 'How to Close',
        steps: [
          'Tap the position card to open Position Detail',
          'Tap the "Close Position" button',
          'Enter the close date and close price (the debit you paid to buy back the spread)',
          'Optionally select a close reason',
          'Review the P&L preview, then tap "Confirm Close"',
        ],
      },
      reasons: {
        title: 'Close Reasons (Optional)',
        desc: 'Logging why you closed helps you review your process over time:',
        categories: [
          { name: 'Trading',  color: 'green',  items: ['Profit target reached', 'Stop loss triggered', 'Early profit lock', 'Risk management'] },
          { name: 'Time',     color: 'orange', items: ['Approaching expiration', 'Theta target reached', 'DTE too low'] },
          { name: 'Market',   color: 'blue',   items: ['High volatility', 'Trend reversal', 'IV expansion'] },
        ],
      },
      calculations: {
        title: 'P&L Calculations After Closing',
        items: [
          { name: 'Realized P&L',   formula: '(Credit − Close Price) × 100 × Contracts' },
          { name: 'Return on Risk (RoR)', formula: 'Realized P&L ÷ Max Loss × 100%' },
          { name: 'Annualized RoR', formula: 'RoR × (365 ÷ Holding Days)' },
        ],
      },
    },
    performance: {
      title: 'Performance',
      history: {
        title: 'Trading History',
        desc: 'Tap the "History" tab to view all closed trades and performance statistics.',
        metrics: {
          title: 'Statistics',
          items: [
            { name: 'Total Trades',      desc: 'Total number of closed positions' },
            { name: 'Win Rate',          desc: 'Profitable trades ÷ Total trades' },
            { name: 'Total P&L',         desc: 'Sum of all realized P&L' },
            { name: 'Avg RoR',           desc: 'Average Return on Risk per trade' },
            { name: 'Avg Holding Days',  desc: 'Average days held before closing' },
          ],
        },
      },
      csv: {
        title: 'CSV Export / Import',
        export: { name: 'Export CSV', desc: 'Tap the export icon on the History or main screen to save all position data as a CSV file. Uses the standard OCC option symbol format.' },
        import: { name: 'Import CSV', desc: 'Go to Settings → Import CSV to batch-add positions from a file. Import is additive — it never overwrites existing data.' },
        format: 'CSV format:',
      },
    },
    settings: {
      title: 'Settings',
      subscription: {
        title: 'Subscription',
        desc: 'View your current plan and upgrade to Pro directly from Settings.',
        free: { name: 'Free', features: ['Up to 3 open positions', '15-minute price refresh', '10 AI analyses / month', '8 screenshot imports / month', 'Basic Greeks display'] },
        pro:  { name: 'Pro',  features: ['Up to 20 open positions', '1-minute price refresh', '200 AI analyses / month', '80 screenshot imports / month', 'Greeks Trend Charts (Delta / IV / Theta)', 'Historical IV & advanced Risk Bar', 'Custom alert thresholds'] },
        manage: 'To cancel or manage your subscription, go to iOS Settings → Apple ID → Subscriptions.',
      },
      language: {
        title: 'Language',
        desc: 'Switch between English and Traditional Chinese. The language setting also changes the app interface language.',
      },
      data: {
        title: 'Data & Export',
        items: [
          { name: 'Import CSV',  desc: 'Batch-import positions from a CSV file. Existing data is preserved.' },
          { name: 'Export CSV',  desc: 'Save all your position and history data as a CSV file for external analysis.' },
        ],
      },
      demo: {
        title: 'Demo Mode',
        desc: 'Toggle Demo Mode to display pre-loaded sample positions. Useful for exploring features without entering real trades.',
        note: 'Demo data is completely separate from your real position data.',
      },
      delete: {
        title: 'Delete All Data',
        desc: '"Delete All Data" permanently removes all local data, including:',
        items: ['All open and closed positions', 'Complete trade history', 'All settings and preferences'],
        warning: 'This action cannot be undone.',
      },
    },
  },

  'zh-TW': {
    backToHome: '返回首頁',
    pageTitle: 'BPS Tracker 使用教學',
    contact: '有問題？聯繫我們：',
    sections: [
      { id: 'getting-started', title: '快速開始',   icon: '🚀' },
      { id: 'add-position',    title: '新增持倉',   icon: '➕' },
      { id: 'tracking',        title: '持倉追蹤',   icon: '📊' },
      { id: 'market-view',     title: '市場視圖',   icon: '🌍' },
      { id: 'ai-analysis',     title: 'AI 分析',    icon: '🤖' },
      { id: 'close-position',  title: '平倉操作',   icon: '✅' },
      { id: 'performance',     title: '績效分析',   icon: '📈' },
      { id: 'settings',        title: '設定',       icon: '⚙️' },
    ],
    gettingStarted: {
      title: '快速開始',
      download: {
        title: '下載與安裝',
        desc: '從 App Store 下載 BPS Tracker，支援 iOS 17 以上版本。安裝完成後開啟 App 即可開始使用。',
        tip: '首次開啟會顯示 Demo 模式的範例數據，讓你在輸入真實交易前先探索所有功能。',
      },
      bpsApi: {
        title: '開箱即用 — 不需要連結任何帳戶',
        desc: 'BPS Tracker 透過官方 BPS API 提供即時選擇權報價和 Greeks。不需要連結券商帳戶，也不需要註冊任何服務。',
        free: { name: 'Free', desc: '報價每 15 分鐘更新一次，最多 3 個開倉。' },
        pro:  { name: 'Pro',  desc: '報價每 1 分鐘更新一次，最多 20 個開倉，並解鎖所有進階功能。' },
        tip: '可以隨時在 Settings 畫面或透過升級橫幅升級至 Pro。',
      },
      overview: {
        title: '主畫面總覽',
        desc: '主畫面是你的交易儀表板：',
        items: [
          { name: 'Portfolio Summary（持倉摘要）', desc: '顯示 Capital at Risk（風險資金）、Max Profit（最大利潤）、Unrealized P&L（未實現損益）、每日 Theta 收益，橫跨所有開倉的加總。' },
          { name: 'Position Cards（持倉卡片）', desc: '每張卡片顯示標的代碼、履約價、到期日、DTE 標籤、目前 P&L 與即時報價。' },
          { name: 'Filter Tabs（篩選標籤）', desc: '切換顯示 All / Open / Closed 持倉。' },
          { name: 'Market Tab（市場標籤）', desc: '點擊第二個 Tab 查看即時 VIX、Fear & Greed、SKEW 和財報日曆。' },
          { name: '+ 按鈕', desc: '手動新增持倉或從券商截圖匯入。' },
        ],
      },
    },
    addPosition: {
      title: '新增持倉',
      manual: {
        title: '手動新增',
        desc: '點擊「+」→「Add Manually」開啟新增持倉表單。',
        fields: [
          { name: 'Symbol（標的代碼）', desc: '輸入股票代碼，如 AAPL、SPY、QQQ。App 會自動驗證代碼是否有效。' },
          { name: 'Short Strike（賣出履約價）', desc: '你賣出的 Put 的履約價（較高的價格），這是你的風險起點。' },
          { name: 'Long Strike（買入履約價）', desc: '你買入的保護 Put 的履約價（較低的價格）。' },
          { name: 'Credit（收取權利金）', desc: '每股收到的淨權利金。$1.50 表示每口收取 $150。' },
          { name: 'Contracts（口數）', desc: '交易的合約數量。1 口 = 100 股。' },
          { name: 'Open Date / Expiry Date', desc: '開倉日期和到期日，用於計算 DTE（Days to Expiry）和持有天數。' },
        ],
        preview: {
          title: '即時預覽計算',
          desc: '輸入資料時，下方會即時顯示：',
          items: [
            { name: 'Max Loss（最大虧損）',   formula: '(價差 − 權利金) × 100 × 口數' },
            { name: 'Max Profit（最大獲利）', formula: '權利金 × 100 × 口數' },
            { name: 'Breakeven（損益平衡）',  formula: 'Short Strike − 權利金' },
            { name: 'Potential RoR（風報比）', formula: 'Max Profit ÷ Max Loss' },
          ],
        },
      },
      screenshot: {
        title: '截圖匯入',
        desc: '點擊「+」→「Import from Screenshot」，使用 AI OCR 自動從券商截圖擷取持倉細節。',
        steps: [
          '點擊「+」選擇「Import from Screenshot」',
          '上傳相片或直接拍攝券商的持倉確認或訂單畫面',
          'AI 自動擷取標的代碼、履約價、權利金、口數和到期日',
          '確認解析結果（如需修正可直接編輯），然後儲存',
        ],
        limits: 'Free：每月 8 次    Pro：每月 80 次',
        tip: '建議使用清晰、無遮擋的訂單確認或持倉明細截圖，識別準確率最高。',
      },
      csv: {
        title: '從 CSV 匯入',
        desc: '在 Settings → Import CSV 頁面，可批量匯入持倉。匯入為累加模式，不會覆蓋現有資料。',
        format: 'CSV 格式：',
      },
    },
    tracking: {
      title: '持倉追蹤',
      detail: {
        title: '持倉詳情 — 四區塊佈局',
        desc: '點擊任一持倉卡片進入詳情頁面，分為四個區塊：',
        items: [
          { name: 'Combined Card（綜合卡）', desc: '標的代碼、履約價、狀態標籤、DTE、目前 P&L 及淨 Theta 收益。' },
          { name: 'Risk Indicators（風險指標）', desc: 'Delta 對比開倉時的變化、IV 對比昨日、以及視覺化 Risk Bar。Pro 版使用歷史 IV，使 Risk Bar 更精準。' },
          { name: 'Position Details（持倉細節）', desc: '可收合的詳情區塊，包含完整 Greeks（Delta、Gamma、Theta、Vega）、OTM%、損益平衡點、Max Loss 與目前 Spread Cost。' },
          { name: 'Alerts（告警）（Pro）', desc: '針對 Delta、DTE、OTM%、P&L 設定個人化門檻。門檻被突破時發送本地通知。' },
        ],
      },
      greeks: {
        title: 'Greeks 說明',
        desc: 'Greeks 是衡量選擇權風險的重要指標。BPS Tracker 顯示淨 Greeks（Net = Long − Short）：',
        items: [
          { symbol: 'Δ', name: 'Delta（方向風險）', color: 'blue',   desc: '標的每變動 $1，選擇權價值的變化量。BPS 策略理想範圍：−0.10 ~ +0.10（接近中性）。', formula: null },
          { symbol: 'Γ', name: 'Gamma（Delta 變化率）', color: 'purple', desc: '標的每變動 $1，Delta 的變化量。Gamma 越低代表 Delta 越穩定。理想範圍：−0.01 ~ 0。', formula: null },
          { symbol: 'Θ', name: 'Theta（時間衰減）', color: 'green',  desc: '每天因時間流逝賺取的價值，是賣出 premium 策略的核心獲利來源。應保持正值。', formula: 'Daily Theta Income = Net Theta × 100 × Contracts' },
          { symbol: 'ν', name: 'Vega（波動率敏感度）', color: 'orange', desc: '隱含波動率（IV）每變動 1%，選擇權價值的變化量。理想範圍：−0.05 ~ 0。', formula: null },
        ],
      },
      trendCharts: {
        title: 'Greeks 趨勢圖（Pro）',
        desc: 'Pro 版用戶可以查看每個持倉的歷史走勢圖，包含 Delta、IV、Theta 和 Spread Cost，從開倉日到今天的完整軌跡。有助於在風險惡化前及早察覺。',
        tabs: ['Delta', 'IV', 'Theta', 'Spread Cost'],
      },
      pnl: {
        title: 'P&L 顯示說明',
        unrealized: {
          name: 'Unrealized P&L（未實現損益）',
          formula: '(收取權利金 − 目前 Spread Cost) × 100 × 口數',
          desc: '括號內的百分比顯示已賺取 Max Profit 的比例。「$150 (75%)」代表已鎖定最大利潤的 75%。',
        },
        colors: { name: '顏色意義', green: '綠色 = 獲利', red: '紅色 = 虧損' },
      },
      warnings: {
        title: '狀態標籤與風險提示',
        items: [
          { label: 'Near Expiry', color: 'yellow', desc: 'DTE ≤ 7 天，接近到期。考慮平倉或 Roll。' },
          { label: 'Expired',     color: 'red',    desc: 'DTE < 0，持倉已過到期日。' },
          { label: 'ITM Warning', color: 'red',    desc: '股價已跌破 Short Strike，有被履約風險。' },
        ],
      },
      alerts: {
        title: '自訂告警門檻（Pro）',
        desc: '在持倉詳情頁面設定個人化門檻，觸發時發送本地通知：',
        items: [
          { name: 'Delta 門檻',   desc: '當淨 Delta 超過設定值時告警（例如 > 0.20）。' },
          { name: 'DTE 門檻',     desc: '當到期天數低於設定值時告警（例如 < 5 天）。' },
          { name: 'OTM% 門檻',    desc: '當 OTM% 收窄至安全邊際以下時告警。' },
          { name: 'P&L 損失門檻', desc: '當未實現虧損超過設定金額時告警。' },
        ],
        note: '每個門檻僅在初次突破時發送通知，待持倉恢復後重置。',
      },
    },
    marketView: {
      title: '市場視圖',
      desc: 'Market Tab 提供即時市場情緒數據，是管理 BPS 持倉不可或缺的背景資訊。',
      items: [
        {
          name: 'VIX 儀表盤',
          color: 'blue',
          desc: 'CBOE 波動率指數。VIX 越高，選擇權 premium 越肥、可用的履約價間距越大。BPS 賣方通常偏好 VIX 在 15–20 以上才開倉。',
        },
        {
          name: 'Fear & Greed 指數',
          color: 'orange',
          desc: 'CNN 綜合情緒指標。「極度恐慌」往往伴隨 put premium 飆升，是 BPS 賣方的潛在機會；「極度貪婪」則意味著 premium 偏薄。',
        },
        {
          name: 'CBOE SKEW 指數',
          color: 'purple',
          desc: '衡量市場對 OTM put 的需求相對於 call 的程度。SKEW > 130 表示市場積極買入下行保護，選擇履約價間距時值得參考。',
        },
        {
          name: '財報與股息日曆',
          color: 'cyan',
          desc: '追蹤標的的即將財報發布日和除息日。除非充分理解二元風險，否則應避免讓 BPS 持倉跨越財報日。',
        },
      ],
    },
    aiAnalysis: {
      title: 'AI 分析',
      desc: '由 Gemini AI 驅動，分析功能會檢視你的整個投資組合，提供個人化的風險洞察。',
      howTo: {
        title: '如何使用',
        steps: [
          '開啟主持倉畫面',
          '點擊「AI 分析」按鈕（星星圖示）',
          '等待數秒，Gemini 評估你的投資組合',
          '查看報告 — 高風險持倉會被標記，並附上建議行動',
        ],
      },
      whatItDoes: {
        title: '分析涵蓋範圍',
        items: [
          { name: '高風險持倉偵測', desc: '識別接近履約價、快到期或 Delta 偏高的持倉。' },
          { name: '財報事件追蹤', desc: '警告是否有持倉的到期日跨越財報發布日。' },
          { name: '投資組合層面評估', desc: '評估集中度風險與整體組合健康狀況。' },
          { name: '可執行建議', desc: '針對特定持倉建議是否繼續持有、平倉或 Roll。' },
        ],
      },
      limits: {
        title: '使用次數',
        free: '每月 10 次',
        pro:  '每月 200 次',
        tip: '建議在大盤大幅波動後、財報季前或 VIX 急升時使用，不需要每天運行。',
      },
    },
    closePosition: {
      title: '平倉操作',
      howTo: {
        title: '如何平倉',
        steps: [
          '點擊持倉卡片進入詳情頁面',
          '點擊「Close Position」按鈕',
          '輸入平倉日期和平倉價格（買回 Spread 支付的 Debit）',
          '（可選）選擇平倉理由',
          '確認 P&L 預覽後點擊「Confirm Close」',
        ],
      },
      reasons: {
        title: '平倉理由（可選）',
        desc: '記錄平倉理由有助於事後回顧交易決策：',
        categories: [
          { name: '交易相關', color: 'green',  items: ['Profit target reached', 'Stop loss triggered', 'Early profit lock', 'Risk management'] },
          { name: '時間相關', color: 'orange', items: ['Approaching expiration', 'Theta target reached', 'DTE too low'] },
          { name: '市場相關', color: 'blue',   items: ['High volatility', 'Trend reversal', 'IV expansion'] },
        ],
      },
      calculations: {
        title: '平倉後的 P&L 計算',
        items: [
          { name: 'Realized P&L（已實現損益）',  formula: '(收取權利金 − 平倉價格) × 100 × 口數' },
          { name: 'Return on Risk（RoR）',        formula: 'Realized P&L ÷ Max Loss × 100%' },
          { name: 'Annualized RoR（年化風報比）', formula: 'RoR × (365 ÷ 持有天數)' },
        ],
      },
    },
    performance: {
      title: '績效分析',
      history: {
        title: '交易紀錄',
        desc: '點擊「History」Tab 查看完整的平倉交易歷史和績效統計。',
        metrics: {
          title: '統計指標',
          items: [
            { name: 'Total Trades（總交易數）',  desc: '已平倉的交易總數' },
            { name: 'Win Rate（勝率）',           desc: '獲利交易數 ÷ 總交易數' },
            { name: 'Total P&L（總損益）',        desc: '所有已實現損益的加總' },
            { name: 'Avg RoR（平均風報比）',      desc: '每筆交易的平均 Return on Risk' },
            { name: 'Avg Holding Days（平均持有天數）', desc: '平均持有天數' },
          ],
        },
      },
      csv: {
        title: 'CSV 匯出 / 匯入',
        export: { name: '匯出 CSV', desc: '在 History 或主畫面點擊匯出圖示，可將所有持倉和歷史資料儲存為 CSV 檔案。使用標準 OCC 選擇權代碼格式。' },
        import: { name: '匯入 CSV', desc: '在 Settings → Import CSV 可批量匯入持倉。匯入為累加模式，不會覆蓋現有資料。' },
        format: 'CSV 格式：',
      },
    },
    settings: {
      title: '設定',
      subscription: {
        title: '訂閱方案',
        desc: '在 Settings 查看目前方案，或直接升級至 Pro。',
        free: { name: 'Free', features: ['最多 3 個開倉', '15 分鐘報價更新', '每月 10 次 AI 分析', '每月 8 次截圖匯入', '基本 Greeks 顯示'] },
        pro:  { name: 'Pro',  features: ['最多 20 個開倉', '1 分鐘即時報價更新', '每月 200 次 AI 分析', '每月 80 次截圖匯入', 'Greeks 趨勢圖（Delta / IV / Theta）', '歷史 IV 與進階 Risk Bar', '自訂風險告警門檻'] },
        manage: '如需取消或管理訂閱，請前往 iOS 設定 → Apple ID → 訂閱。',
      },
      language: {
        title: '語言',
        desc: '切換中文（繁體）或英文。語言設定同時套用至 App 介面。',
      },
      data: {
        title: '資料管理',
        items: [
          { name: '匯入 CSV', desc: '從 CSV 檔案批量匯入持倉，現有資料不受影響。' },
          { name: '匯出 CSV', desc: '將所有持倉和交易歷史儲存為 CSV 檔案，供外部分析使用。' },
        ],
      },
      demo: {
        title: 'Demo Mode（示範模式）',
        desc: '開啟 Demo Mode 顯示預設範例持倉，方便探索功能。關閉後可輸入自己的真實交易。',
        note: 'Demo 資料與你的真實持倉資料完全分開，不會相互影響。',
      },
      delete: {
        title: '刪除所有資料',
        desc: '「Delete All Data」會永久刪除所有本地資料，包括：',
        items: ['所有開倉和平倉記錄', '完整交易歷史', '所有設定與偏好'],
        warning: '此操作無法復原。',
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
        {/* Sidebar */}
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

        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 lg:py-12">
          {/* Mobile Nav */}
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

          {/* ── Section 1: Getting Started ── */}
          <section id="getting-started" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🚀</span>
              <h2 className="text-3xl font-bold text-white">{t.gettingStarted.title}</h2>
            </div>
            <div className="space-y-6 text-gray-300">
              {/* Download */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.gettingStarted.download.title}</h3>
                <p className="mb-4">{t.gettingStarted.download.desc}</p>
                <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-cyan-500">
                  <p className="text-sm text-gray-400"><strong className="text-cyan-400">Tip:</strong> {t.gettingStarted.download.tip}</p>
                </div>
              </div>

              {/* BPS API */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.gettingStarted.bpsApi.title}</h3>
                <p className="mb-4">{t.gettingStarted.bpsApi.desc}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm font-bold text-white mb-1">{t.gettingStarted.bpsApi.free.name}</p>
                    <p className="text-sm text-gray-400">{t.gettingStarted.bpsApi.free.desc}</p>
                  </div>
                  <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/30">
                    <p className="text-sm font-bold text-cyan-400 mb-1">{t.gettingStarted.bpsApi.pro.name}</p>
                    <p className="text-sm text-gray-400">{t.gettingStarted.bpsApi.pro.desc}</p>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-sm text-gray-400"><strong className="text-green-400">Tip:</strong> {t.gettingStarted.bpsApi.tip}</p>
                </div>
              </div>

              {/* Overview */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.gettingStarted.overview.title}</h3>
                <p className="mb-4">{t.gettingStarted.overview.desc}</p>
                <ul className="space-y-3">
                  {t.gettingStarted.overview.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 rounded-full bg-cyan-400 shrink-0" />
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

          {/* ── Section 2: Add Position ── */}
          <section id="add-position" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">➕</span>
              <h2 className="text-3xl font-bold text-white">{t.addPosition.title}</h2>
            </div>
            <div className="space-y-6 text-gray-300">
              {/* Manual */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.addPosition.manual.title}</h3>
                <p className="mb-4">{t.addPosition.manual.desc}</p>
                <div className="space-y-3 mb-6">
                  {t.addPosition.manual.fields.map((item, i) => (
                    <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <h4 className="font-semibold text-white mb-3">{t.addPosition.manual.preview.title}</h4>
                <p className="text-sm text-gray-400 mb-3">{t.addPosition.manual.preview.desc}</p>
                <div className="grid grid-cols-2 gap-3">
                  {t.addPosition.manual.preview.items.map((item, i) => {
                    const colors = ['red', 'green', 'yellow', 'blue'];
                    const c = colors[i];
                    return (
                      <div key={i} className={`bg-${c}-500/10 rounded-lg p-3 border border-${c}-500/30`}>
                        <h5 className={`font-semibold text-${c}-400 mb-1 text-sm`}>{item.name}</h5>
                        <p className="text-xs text-gray-400">{item.formula}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Screenshot Import */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-semibold text-cyan-400">{t.addPosition.screenshot.title}</h3>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">AI</span>
                </div>
                <p className="mb-4">{t.addPosition.screenshot.desc}</p>
                <div className="space-y-3 mb-4">
                  {t.addPosition.screenshot.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-0.5 shrink-0">{i + 1}.</span>
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30 mb-3">
                  <p className="text-sm text-purple-300 font-mono">{t.addPosition.screenshot.limits}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-cyan-500">
                  <p className="text-sm text-gray-400"><strong className="text-cyan-400">Tip:</strong> {t.addPosition.screenshot.tip}</p>
                </div>
              </div>

              {/* CSV Import */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.addPosition.csv.title}</h3>
                <p className="mb-4">{t.addPosition.csv.desc}</p>
                <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                  <p className="text-xs text-gray-500 mb-2">{t.addPosition.csv.format}</p>
                  <pre className="text-xs text-cyan-400 font-mono whitespace-pre">
{`ShortPutSymbol,LongPutSymbol,OpenDate,Contracts,Credit,Status,CloseDate,ClosePrice,RealizedPnL
AAPL260117P00175000,AAPL260117P00170000,2026-01-01,5,1.50,open,,,
SPY260117P00580000,SPY260117P00575000,2026-01-01,3,0.55,closed,2026-01-15,0.25,90.00`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 3: Position Tracking ── */}
          <section id="tracking" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📊</span>
              <h2 className="text-3xl font-bold text-white">{t.tracking.title}</h2>
            </div>
            <div className="space-y-6 text-gray-300">
              {/* 4-block layout */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.tracking.detail.title}</h3>
                <p className="mb-4">{t.tracking.detail.desc}</p>
                <div className="space-y-3">
                  {t.tracking.detail.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-4">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <div>
                        <strong className="text-white">{item.name}</strong>
                        <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Greeks */}
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
                      {item.formula && (
                        <div className="bg-green-500/10 rounded p-2 border border-green-500/20">
                          <p className="text-sm text-green-400">💰 {item.formula}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trend Charts (Pro) */}
              <div className="bg-purple-500/5 rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-semibold text-purple-400">{t.tracking.trendCharts.title}</h3>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">PRO</span>
                </div>
                <p className="text-gray-300 mb-4">{t.tracking.trendCharts.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {t.tracking.trendCharts.tabs.map((tab) => (
                    <span key={tab} className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">{tab}</span>
                  ))}
                </div>
              </div>

              {/* P&L */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.tracking.pnl.title}</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">{t.tracking.pnl.unrealized.name}</h4>
                    <p className="text-sm text-gray-400 mb-2 font-mono">{t.tracking.pnl.unrealized.formula}</p>
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

              {/* Status badges */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.tracking.warnings.title}</h3>
                <div className="space-y-3">
                  {t.tracking.warnings.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full bg-${item.color}-500/20 text-${item.color}-400 border border-${item.color}-500/30 shrink-0`}>
                        {item.label}
                      </span>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Alerts (Pro) */}
              <div className="bg-purple-500/5 rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-semibold text-purple-400">{t.tracking.alerts.title}</h3>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">PRO</span>
                </div>
                <p className="text-gray-300 mb-4">{t.tracking.alerts.desc}</p>
                <div className="space-y-3 mb-4">
                  {t.tracking.alerts.items.map((item, i) => (
                    <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border-l-4 border-purple-500">
                  <p className="text-sm text-gray-400">{t.tracking.alerts.note}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 4: Market View ── */}
          <section id="market-view" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🌍</span>
              <h2 className="text-3xl font-bold text-white">{t.marketView.title}</h2>
            </div>
            <div className="space-y-6 text-gray-300">
              <p className="text-gray-300">{t.marketView.desc}</p>
              {t.marketView.items.map((item, i) => (
                <div key={i} className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-3 h-3 rounded-full bg-${item.color}-400`} />
                    <h3 className={`text-xl font-semibold text-${item.color}-400`}>{item.name}</h3>
                  </div>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Section 5: AI Analysis ── */}
          <section id="ai-analysis" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🤖</span>
              <h2 className="text-3xl font-bold text-white">{t.aiAnalysis.title}</h2>
            </div>
            <div className="space-y-6 text-gray-300">
              <p>{t.aiAnalysis.desc}</p>

              {/* How to use */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.aiAnalysis.howTo.title}</h3>
                <div className="space-y-3">
                  {t.aiAnalysis.howTo.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-0.5 shrink-0">{i + 1}.</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What it does */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.aiAnalysis.whatItDoes.title}</h3>
                <div className="space-y-3">
                  {t.aiAnalysis.whatItDoes.items.map((item, i) => (
                    <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Limits */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.aiAnalysis.limits.title}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm font-bold text-white mb-1">Free</p>
                    <p className="text-lg font-mono text-gray-300">{t.aiAnalysis.limits.free}</p>
                  </div>
                  <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/30">
                    <p className="text-sm font-bold text-cyan-400 mb-1">Pro</p>
                    <p className="text-lg font-mono text-gray-300">{t.aiAnalysis.limits.pro}</p>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-400"><strong className="text-yellow-400">Tip:</strong> {t.aiAnalysis.limits.tip}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 6: Close Position ── */}
          <section id="close-position" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">✅</span>
              <h2 className="text-3xl font-bold text-white">{t.closePosition.title}</h2>
            </div>
            <div className="space-y-6 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.closePosition.howTo.title}</h3>
                <div className="space-y-3">
                  {t.closePosition.howTo.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-0.5 shrink-0">{i + 1}.</span>
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
                <div className="space-y-3">
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

          {/* ── Section 7: Performance ── */}
          <section id="performance" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📈</span>
              <h2 className="text-3xl font-bold text-white">{t.performance.title}</h2>
            </div>
            <div className="space-y-6 text-gray-300">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.performance.history.title}</h3>
                <p className="mb-4">{t.performance.history.desc}</p>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">{t.performance.history.metrics.title}</h4>
                  <ul className="space-y-2 text-sm">
                    {t.performance.history.metrics.items.map((item, i) => (
                      <li key={i} className="flex justify-between gap-4">
                        <span className="text-gray-400 shrink-0">{item.name}</span>
                        <span className="text-white text-right">{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.performance.csv.title}</h3>
                <div className="space-y-3 mb-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">{t.performance.csv.export.name}</h4>
                    <p className="text-sm text-gray-400">{t.performance.csv.export.desc}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">{t.performance.csv.import.name}</h4>
                    <p className="text-sm text-gray-400">{t.performance.csv.import.desc}</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                  <p className="text-xs text-gray-500 mb-2">{t.performance.csv.format}</p>
                  <pre className="text-xs text-cyan-400 font-mono whitespace-pre">
{`ShortPutSymbol,LongPutSymbol,OpenDate,Contracts,Credit,Status,CloseDate,ClosePrice,RealizedPnL
AAPL260117P00175000,AAPL260117P00170000,2026-01-01,5,1.50,open,,,
SPY260117P00580000,SPY260117P00575000,2026-01-01,3,0.55,closed,2026-01-15,0.25,90.00`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 8: Settings ── */}
          <section id="settings" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">⚙️</span>
              <h2 className="text-3xl font-bold text-white">{t.settings.title}</h2>
            </div>
            <div className="space-y-6 text-gray-300">
              {/* Subscription */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.settings.subscription.title}</h3>
                <p className="mb-4">{t.settings.subscription.desc}</p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-800/50 rounded-xl p-5">
                    <p className="text-lg font-bold text-white mb-3">{t.settings.subscription.free.name}</p>
                    <ul className="space-y-2">
                      {t.settings.subscription.free.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-gray-500 mt-0.5">✓</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-cyan-500/10 rounded-xl p-5 border border-cyan-500/30">
                    <p className="text-lg font-bold text-cyan-400 mb-3">{t.settings.subscription.pro.name}</p>
                    <ul className="space-y-2">
                      {t.settings.subscription.pro.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-cyan-300">
                          <span className="text-cyan-400 mt-0.5">✓</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-gray-600">
                  <p className="text-sm text-gray-400">{t.settings.subscription.manage}</p>
                </div>
              </div>

              {/* Language */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.settings.language.title}</h3>
                <p>{t.settings.language.desc}</p>
              </div>

              {/* Data */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.settings.data.title}</h3>
                <div className="space-y-3">
                  {t.settings.data.items.map((item, i) => (
                    <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.settings.demo.title}</h3>
                <p className="mb-4">{t.settings.demo.desc}</p>
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30">
                  <p className="text-sm text-yellow-400"><strong>Note:</strong> {t.settings.demo.note}</p>
                </div>
              </div>

              {/* Delete */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t.settings.delete.title}</h3>
                <p className="mb-4">{t.settings.delete.desc}</p>
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1 ml-4 mb-4">
                  {t.settings.delete.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                  <p className="text-sm text-red-400"><strong>Warning:</strong> {t.settings.delete.warning}</p>
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
