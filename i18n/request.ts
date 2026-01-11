import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Using a dynamic import for the messages is recommended.
  // This will only load the messages for the given locale.
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
