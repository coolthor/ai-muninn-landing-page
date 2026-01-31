# BPS Tracker Website

> **Shared Documentation:** For infrastructure, API endpoints, and cross-repo info, see:
> `/Users/coolthor/ai-muninn-docs/CLAUDE.md`
>
> This file contains website-specific details only.

Product landing page for BPS Tracker - an iOS app for tracking Bull Put Spread options positions.

---

## Related Repos (AI Muninn Project)

| Repo | Path | Description |
|------|------|-------------|
| **BPSTracker** | `/Users/coolthor/BPSTracker` | iOS App (Swift/SwiftUI) |
| **ai-muninn-landing-page** | `/Users/coolthor/ai-muninn-landing-page` | Marketing Website (Next.js) |

### Shared Constants

```yaml
App Store URL: https://apps.apple.com/tw/app/bpstracker/id6757736273
Bundle ID: com.ai-muninn.BPSTracker
Current Version: 1.0.0
OAuth Redirect: https://ai-muninn.com/bpstracker/callback
Contact: info@ai-muninn.com

Brand Colors:
  - Cyan (Primary): #00DEDE / #00ffc8
  - Purple: #A361F5 / #C084FC
  - Teal: #2DD4BF
  - Background: #0a0a0f / #141618
```

### Cross-Repo Tasks

| Task | Update In |
|------|-----------|
| Version bump | iOS `Info.plist` + Website `Footer.tsx` |
| New feature | iOS app + Website `Features.tsx` + `messages/*.json` |
| Screenshots | Export from iOS → `public/screenshots/` |
| App Store URL | Both repos if changed |

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
- The app is currently in development (Coming 2025)
- Contact: info@ai-muninn.com
- OAuth redirect URI: `https://ai-muninn.com/bpstracker/callback`
