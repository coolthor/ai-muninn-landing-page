import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isZh = locale === 'zh-TW';
  const baseUrl = 'https://ai-muninn.com';

  return {
    metadataBase: new URL(baseUrl),
    title: isZh ? 'BPS Tracker - Bull Put Spread 持倉管理' : 'BPS Tracker - Master Your Bull Put Spreads',
    description: isZh
      ? '專為選擇權交易者設計的持倉追蹤工具。即時監控 Greeks、風險評估、獲利追蹤。'
      : 'The position tracking tool designed for options traders. Real-time Greeks monitoring, risk assessment, and profit tracking.',
    keywords: ['options trading', 'bull put spread', 'BPS', 'options tracker', 'Greeks', 'theta decay', 'options portfolio', '選擇權', 'Bull Put Spread', '期權'],
    authors: [{ name: 'AI Muninn' }],
    openGraph: {
      title: isZh ? 'BPS Tracker - Bull Put Spread 持倉管理' : 'BPS Tracker - Master Your Bull Put Spreads',
      description: isZh
        ? '專為選擇權交易者設計的持倉追蹤工具'
        : 'Track your Bull Put Spread positions with real-time Greeks and risk analysis.',
      url: isZh ? baseUrl : `${baseUrl}/en`,
      siteName: 'BPS Tracker',
      locale: isZh ? 'zh_TW' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? 'BPS Tracker - Bull Put Spread 持倉管理' : 'BPS Tracker - Master Your Bull Put Spreads',
      description: isZh
        ? '專為選擇權交易者設計的持倉追蹤工具'
        : 'Track your Bull Put Spread positions with real-time Greeks and risk analysis.',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: isZh ? baseUrl : `${baseUrl}/en`,
      languages: {
        'zh-TW': baseUrl,
        'en': `${baseUrl}/en`,
      },
    },
    itunes: {
      appId: '6757736273',
      appArgument: 'bpstracker://',
    },
    appLinks: {
      ios: {
        url: 'bpstracker://',
        app_store_id: '6757736273',
        app_name: 'BPS Tracker',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en' | 'zh-TW')) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  const isZh = locale === 'zh-TW';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'BPS Tracker',
    operatingSystem: 'iOS',
    applicationCategory: 'FinanceApplication',
    description: isZh
      ? '專為選擇權交易者設計的 Bull Put Spread 持倉追蹤工具'
      : 'Track your Bull Put Spread positions with real-time Greeks and risk analysis',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'AI Muninn',
      url: 'https://ai-muninn.com',
    },
  };

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="icon" href="/logo-small.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="apple-itunes-app" content="app-id=6757736273, app-argument=bpstracker://" />
        <meta name="theme-color" content="#0a0a0f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
