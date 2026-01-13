import createMiddleware from 'next-intl/middleware';

// Inline config to avoid Edge Runtime import issues
export default createMiddleware({
  locales: ['en', 'zh-TW'],
  defaultLocale: 'zh-TW',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|bpstracker|_next|_vercel|.*\\..*).*)']
};
