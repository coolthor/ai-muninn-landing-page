# BPS Tracker Website (ai-muninn-landing-page)

> **Shared Documentation:** For infrastructure, API endpoints, and cross-repo info, see:
> `/Users/coolthor/ai-muninn-docs/CLAUDE.md`
>
> This file contains website-specific details only.

Product landing page for BPS Tracker - an iOS app for tracking Bull Put Spread options positions.

---

## ⚠️ Domain Architecture — 重要背景

### 現狀（2026-03-12）

```
ai-muninn.com        → 這個 Next.js 專案（BPSTracker 官網，歷史命名遺留）
bpstracker.com       → 同一個 Vercel deployment（剛補註冊的）
api.ai-muninn.com    → BPSTracker-API 後端（iOS app 硬編碼，不要隨便改）
bpstracker.app       → 已購入，尚未設定
bfproof.com          → BFProof 新專案，尚未設定
bfproof.app          → BFProof 新專案，尚未設定
```

### 規劃方向：渡鴉工作室架構（方案 A，未著急執行）

```
ai-muninn.com        → 長期目標：渡鴉 (Raven) studio 首頁，展示旗下所有 app
bpstracker.com       → BPSTracker 產品頁（已設定，指向同一個 Vercel deployment）
bfproof.com          → BFProof 產品頁（待建）
api.ai-muninn.com    → 維持，待下一個 iOS 大版本才考慮遷移至 api.bpstracker.com
```

### 目前什麼都不用動

- `bpstracker.com` 現在 CNAME/指向同一個 Vercel deployment 就好
- studio 首頁（`ai-muninn.com` 改版）**沒有排程**，等有空再說
- `api.ai-muninn.com` 動了要改 iOS app，成本高，先不動
- OAuth redirect URI 也還是 `https://ai-muninn.com/bpstracker/callback`，不動

### 注意事項

- `info@ai-muninn.com` 是目前的 contact email，還沒換
- 如果要加 `bfproof.com` 的 landing page，另開一個 repo，不要放在這個 repo 裡

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Internationalization**: next-intl (zh-TW / en)
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Project Structure

```
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx    # Locale-specific layout with SEO
│   │   └── page.tsx      # Main landing page
│   ├── api/
│   │   └── alpaca/
│   │       └── token/
│   │           └── route.ts  # OAuth token exchange endpoint
│   ├── bpstracker/
│   │   ├── callback/
│   │   │   └── page.tsx  # OAuth callback handler (redirects to app)
│   │   ├── privacy/
│   │   │   └── page.tsx  # Privacy Policy page
│   │   └── terms/
│   │       └── page.tsx  # Terms of Use page
│   ├── globals.css       # Global styles & design tokens
│   └── layout.tsx        # Root layout
├── components/
│   ├── Header.tsx        # Fixed navigation with language switcher
│   ├── Hero.tsx          # Hero section with floating screenshots
│   ├── Features.tsx      # 6 feature cards in 2x3 grid
│   ├── Screenshots.tsx   # App screenshots carousel
│   ├── HowItWorks.tsx    # 3-step process timeline
│   ├── ComingSoon.tsx    # App Store badge + status
│   └── Footer.tsx        # Footer with links
├── i18n/
│   ├── navigation.ts     # i18n navigation helpers
│   ├── request.ts        # Server-side i18n config
│   └── routing.ts        # Locale routing config
├── messages/
│   ├── en.json           # English translations
│   └── zh-TW.json        # Traditional Chinese translations
├── public/
│   ├── logo.svg          # Main logo with "TRACKER" text
│   ├── logo-small.svg    # Small logo (icon only)
│   └── screenshots/      # App screenshots (JPG)
├── middleware.ts         # i18n middleware (excludes /bpstracker, /api)
└── next.config.ts        # Next.js + next-intl config
```

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Design System

### Colors
```css
--bg-primary: #0a0a0f       /* Main background */
--bg-secondary: #12121a     /* Secondary background */
--bg-card: #1a1a24          /* Card background */
--accent-primary: #00ffc8   /* Cyan accent */
--accent-secondary: #00e0b0 /* Secondary accent */
--text-primary: #ffffff     /* Primary text */
--text-secondary: #a0a0b0   /* Secondary text */
```

### Fonts
- **Headings**: Space Grotesk
- **Body**: Inter
- **Monospace**: JetBrains Mono

### Design Style
- Dark trading terminal aesthetic
- Glassmorphism cards
- Neon glow effects
- Grid pattern backgrounds
- Subtle animations

## Internationalization

- Default locale: `zh-TW` (Traditional Chinese)
- Supported: `en`, `zh-TW`
- Language switcher in header
- URL structure: `/` (zh-TW), `/en` (English)

## Key Files to Edit

| Task | File(s) |
|------|---------|
| Add/edit translations | `messages/en.json`, `messages/zh-TW.json` |
| Modify design tokens | `app/globals.css` |
| Update SEO metadata | `app/[locale]/layout.tsx` |
| Add new sections | `components/` + `app/[locale]/page.tsx` |
| Change screenshots | `public/screenshots/` |
| Update OAuth callback | `app/bpstracker/callback/page.tsx` |
| Update legal pages | `app/bpstracker/privacy/page.tsx`, `app/bpstracker/terms/page.tsx` |
| Modify OAuth token exchange | `app/api/alpaca/token/route.ts` |

## API Routes

### POST /api/alpaca/token
OAuth token exchange endpoint for Alpaca authentication.

**Request:**
```json
{ "code": "authorization_code", "redirect_uri": "https://..." }
```

**Response:**
```json
{ "access_token": "...", "token_type": "Bearer", "scope": "..." }
```

**Security:** Client secret is stored server-side in environment variables.

## Deployment

The site deploys automatically to Vercel when pushing to the main branch.

### Environment Variables
Required for OAuth functionality:

| Variable | Description |
|----------|-------------|
| `ALPACA_CLIENT_ID` | Alpaca OAuth application client ID |
| `ALPACA_CLIENT_SECRET` | Alpaca OAuth application client secret |

Set these in Vercel Dashboard → Settings → Environment Variables.

## Future Updates

When the app launches:
1. Replace greyed App Store badge with live link
2. Update "Coming Soon" status to "Available Now"
3. Optionally add testimonials section
4. Optionally add FAQ section

## BPS Tracker App Routes

Routes under `/bpstracker/` are excluded from i18n middleware and serve the iOS app:

| Route | Purpose |
|-------|---------|
| `/bpstracker/callback` | OAuth callback - redirects to `bpstracker://` deep link |
| `/bpstracker/privacy` | Privacy Policy (required for Alpaca OAuth registration) |
| `/bpstracker/terms` | Terms of Use (required for Alpaca OAuth registration) |

These pages use a standalone dark theme (not the main landing page layout).

## Notes

- Screenshots are in JPG format (iOS screenshots)
- The app is available on the App Store (v1.1)
- Contact: info@ai-muninn.com
- OAuth redirect URI: `https://ai-muninn.com/bpstracker/callback`
