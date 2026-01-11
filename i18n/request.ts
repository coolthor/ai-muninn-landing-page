import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as 'en' | 'zh-TW')) {
    locale = routing.defaultLocale;
  }

  // Load messages based on locale
  let messages;
  if (locale === 'zh-TW') {
    messages = (await import('../messages/zh-TW.json')).default;
  } else {
    messages = (await import('../messages/en.json')).default;
  }

  return {
    locale,
    messages
  };
});
