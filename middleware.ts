import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh-TW'],
  defaultLocale: 'zh-TW',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/', '/(en|zh-TW)/:path*']
};
