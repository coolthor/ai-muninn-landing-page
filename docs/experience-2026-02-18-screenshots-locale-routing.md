# Landing Page Screenshots — Locale Routing & Hero Image Update

**Date:** 2026-02-18
**Context:** Updating landing page to use new v1.2 App Store screenshots (16 PNG files: 8 EN + 8 ZH)
**Collection:** muninn-landing

## Problem

1. `Screenshots.tsx` had a broken zh-TW fallback: `locale === 'en' ? /screenshots/en/${file} : /screenshots/${file}`. The root `/screenshots/` folder never had zh files, so Chinese users always got 404s on screenshot images — silently falling back to `onError` handler showing English images.

2. `Hero.tsx` had hardcoded old JPG paths (`performance-summary.JPG`, `position-detail.JPG`, `closed-position.JPG`) with no locale awareness — both EN and ZH showed the same English UI screenshots.

## Solution

**Screenshots.tsx** — change locale routing logic:
```ts
const folder = locale === 'en' ? 'en' : 'zh';
return screenshotKeys.map(({ key, file }) => ({
  key,
  src: `/screenshots/${folder}/${file}`,
  fallbackSrc: `/screenshots/en/${file}`,  // EN as safe fallback
}));
```

**Hero.tsx** — add `useLocale()` and use template strings:
```tsx
import { useTranslations, useLocale } from 'next-intl';

const locale = useLocale();
const screenshotFolder = locale === 'en' ? 'en' : 'zh';

// Then in JSX:
src={`/screenshots/${screenshotFolder}/01_positions_list.png`}
```

**File structure:**
```
public/screenshots/
├── en/   ← new PNGs (01_positions_list.png ... 08_paywall.png)
└── zh/   ← new PNGs (same filenames)
```

## Key Takeaway

Next-intl locale values are `'en'` and `'zh-TW'` — map them to folder names explicitly (`zh-TW` → `'zh'`). Never use locale string directly as folder name. Always add `useLocale()` to any component that renders locale-specific images.

## Keywords

next-intl, useLocale, locale image routing, screenshots, bilingual, zh-TW, hero image, public folder
