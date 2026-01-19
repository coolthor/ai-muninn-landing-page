import createMiddleware from 'next-intl/middleware';

// Inline config to avoid Edge Runtime import issues
export default createMiddleware({
  locales: ['en', 'zh-TW'],
  defaultLocale: 'zh-TW',
  localePrefix: 'as-needed'
});

export const config = {
  // Exclude: api, _next, _vercel, static files, and non-localized bpstracker pages (privacy, terms, callback)
  // Include: localized bpstracker paths (like /[locale]/bpstracker/guide)
  matcher: ['/((?!api|_next|_vercel|bpstracker/privacy|bpstracker/terms|bpstracker/callback|.*\\..*).*)']
};
