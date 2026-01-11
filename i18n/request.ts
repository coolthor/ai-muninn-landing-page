import { getRequestConfig } from 'next-intl/server';

// Import messages statically to avoid __dirname issues in Edge Runtime
import en from '../messages/en.json';
import zhTW from '../messages/zh-TW.json';

// Inline locale config to avoid cross-file imports in Edge Runtime
const locales = ['en', 'zh-TW'] as const;
const defaultLocale = 'zh-TW';

const messages: Record<string, typeof en> = {
  en,
  'zh-TW': zhTW
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as typeof locales[number])) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: messages[locale]
  };
});

