# Session: Blog SEO + Charts + api.bpstracker.com

**Date:** 2026-03-09
**Project:** ai-muninn-landing-page

## Session Summary

Built a complete /blog section on bpstracker.com with SEO articles, data visualization charts, and GEO (llms.txt). Fixed table rendering, rewrote articles for accessibility, added Vercel Analytics. Also set up api.bpstracker.com CNAME in Cloudflare — DNS works, nginx not yet updated.

## Key Decisions

- **next-mdx-remote + gray-matter** (not @next/mdx): better for bilingual dynamic content in [locale] route
- **remark-gfm required**: MDX tables won't render without it — add to MDXRemote options
- **Chart components injected via makeMdxComponents(locale)**: locale-aware, no imports in MDX
- **@lancedb/lancedb in openclaw main node_modules** (not extension subdir) — from previous session, documented here for reference
- **Removed Alpaca attribution from backtest articles**: "歷史選擇權資料" not "Alpaca 歷史選擇權資料"
- **api.bpstracker.com**: CNAME set in Cloudflare → points to api.ai-muninn.com. DNS resolves correctly. Backend nginx needs server_name update.

## Current State

### Working
- /blog section live: 7 articles total (4 zh-TW, 3 en)
- Data viz charts: IVRFilterChart, DeltaStopChart, SB2CompareChart, ThetaDecayCurve, IVRMeter
- Vercel Analytics installed (@vercel/analytics in app/layout.tsx)
- Google sitemap submitted (takes 1-4 weeks to index)
- api.bpstracker.com DNS resolves (Cloudflare CNAME)

### Pending / Broken
- **api.bpstracker.com returns 404**: nginx on Mac Mini needs `server_name api.ai-muninn.com api.bpstracker.com;` + reload
- **ai-muninn.com tech blog**: not built yet, future project
- **BPS Tracker 1.3**: not started, planned after v1.2 assessment

## Files Modified

- `app/[locale]/blog/page.tsx` — blog index page
- `app/[locale]/blog/[slug]/page.tsx` — blog post page with MDX + remark-gfm + chart components
- `lib/blog.ts` — getAllPosts, getPost, getAllSlugs helpers
- `components/blog/IVRFilterChart.tsx` — bar chart: IVR filter impact on CAGR
- `components/blog/DeltaStopChart.tsx` — red/green ratio: 12,553 vs 2,990
- `components/blog/SB2CompareChart.tsx` — SB vs SB2 all metrics
- `components/blog/ThetaDecayCurve.tsx` — SVG curve with sweet spot + danger zone
- `components/blog/IVRMeter.tsx` — three-zone reference card
- `app/layout.tsx` — added <Analytics /> from @vercel/analytics/next
- `app/sitemap.ts` — dynamic blog post URLs via getAllSlugs
- `messages/en.json` + `messages/zh-TW.json` — added "blog" nav key
- `components/Header.tsx` — added blog nav link
- `public/llms.txt` — GEO file for AI engine discoverability

## Blog Articles

| File | Status |
|------|--------|
| `zh-TW/bull-put-spread-complete-guide.mdx` | ✅ |
| `zh-TW/iv-rank-options-trading.mdx` | ✅ rewritten (umbrella analogy, IVRMeter chart) |
| `zh-TW/options-greeks-explained.mdx` | ✅ rewritten (plain English, ThetaDecayCurve) |
| `zh-TW/bps-backtest-insights.mdx` | ✅ charts embedded, Alpaca removed |
| `en/bull-put-spread-complete-guide.mdx` | ✅ |
| `en/iv-rank-options-trading.mdx` | ✅ rewritten (umbrella analogy, IVRMeter, backtest table) |
| `en/options-greeks-explained.mdx` | ✅ rewritten (plain English, ThetaDecayCurve, cross-link) |
| `en/bps-backtest-insights.mdx` | ✅ charts embedded, Alpaca removed |

## Article Draft (not published)

openclaw/小唯 setup article — key framing decisions:
- **NOT** "replace ChatGPT" — wrong angle
- **YES** "autonomous agent in closed private hardware environment"
- Target audience: people with real GPU hardware (GX10-class)
- Ollama on Mac without GPU = painfully slow, not recommended
- vLLM + prefix cache (prefill) is what makes it viable
- Model: Qwen 3.5-35B via vLLM (fixed, no multi-model routing for 小唯)
- Memory: wrong to say "cloud AI has no memory" — ChatGPT/Claude both have memory now
- Real differentiator: agent can access private systems (BPSTracker API, screener, local files)

## Next Steps (Priority Order)

1. **Fix nginx on Mac Mini**: `ssh coolthor@100.68.171.125` → update server_name in nginx config → `sudo nginx -t && sudo nginx -s reload`
2. **BPS Tracker 1.3**: start planning — OAuth URL migration (ai-muninn.com → bpstracker.com), API base URL change
3. **More blog articles**: "Theta Decay 策略", "選擇權賣方 vs 買方", "BPS 出場時機"
4. **ai-muninn.com tech blog**: build after 1.3 ships — openclaw setup article as first post
5. **ai-muninn.com 301 redirect**: set after 1.3 is live (currently still serves OAuth pages)

## Strategic Notes

- bpstracker.com = product landing page (BPS Tracker users)
- ai-muninn.com = future tech blog (developer/homelab audience)
- api.ai-muninn.com → api.bpstracker.com migration: keep both alive during v1.2→v1.3 transition
- openclaw tutorial article target: homelab/GPU owners, not "cheap ChatGPT" seekers

## Corrections Log

- Vercel Agent claimed to install @vercel/analytics automatically — didn't actually touch local files. Had to install manually.
- Article initially said "cloud AI has no memory" — incorrect. ChatGPT has Memory, Claude has Projects. Corrected framing.
- Article draft described multi-model routing for 小唯 — incorrect. 小唯 uses fixed Qwen 3.5-35B via vLLM. Multi-model routing is PAL MCP (for Claude Code), not openclaw.
