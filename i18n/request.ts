import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Import messages statically to avoid __dirname issues in Edge Runtime
import en from '../messages/en.json';
import zhTW from '../messages/zh-TW.json';

const messages = {
  en,
  'zh-TW': zhTW
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages]
  };
});
