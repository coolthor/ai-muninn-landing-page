# User Guide — Full Rewrite After App Version Change

**Date:** 2026-02-18
**Context:** BPS Tracker v1.2 refactored to BPS-API-only model, hiding Alpaca OAuth UI. User Guide still documented the old Alpaca flow.
**Collection:** muninn-landing

## Problem

After a major app refactor (v1.2), the User Guide `/bpstracker/guide` had:
- A full "Alpaca Account Connection" section telling users to tap "Login with Alpaca" — a button that no longer exists in the UI (`if false` in SettingsView)
- Status label "✓ Real Price = Using real Alpaca option quotes" — wrong, now BPS API
- Settings section documenting Alpaca connect/disconnect — irrelevant
- Missing entirely: Screenshot Import (AI OCR), AI Analysis, Market View tab, Pro subscription details, Custom Alerts, Greeks Trend Charts

## Solution

Full rewrite of `app/[locale]/bpstracker/guide/page.tsx`:

**Sections before (6):** Getting Started, Add Position, Tracking, Close Position, Performance, Settings

**Sections after (8):** Getting Started, Add Position, Tracking, **Market View**, **AI Analysis**, Close Position, Performance, Settings

Key changes per section:
- **Getting Started**: Remove Alpaca section → Replace with "Works Out of the Box — No Account Needed" explaining BPS API + Free/Pro refresh rates
- **Add Position**: Add Screenshot Import subsection (AI OCR steps, Free 8/Pro 80 per month limits) alongside Manual entry
- **Tracking**: Add 4-block Position Detail layout explanation, Greeks Trend Charts (Pro), Custom Alert Thresholds (Pro), fix status badges
- **Market View** (new): VIX gauge, Fear & Greed, CBOE SKEW, Earnings Calendar
- **AI Analysis** (new): Gemini-powered, how to use, what it covers, usage limits (Free 10/Pro 200 per month)
- **Settings**: Complete rewrite → Subscription plans (Free/Pro feature comparison), Language, Data Management, Demo Mode, Delete All Data

## Key Takeaway

After any app refactor that changes or hides UI features, immediately audit the User Guide for:
1. Features that reference hidden/removed UI elements (buttons that no longer exist)
2. Missing sections for newly added features
3. Wrong data source attributions (e.g., "Alpaca" when it's now "BPS API")

The guide lives in a single `page.tsx` with a `content` object containing both `en` and `zh-TW` keys — update both in the same pass.

## Keywords

user guide, version sync, app refactor, Alpaca removal, BPS API, screenshot import, AI analysis, market view, pro features, next-intl
