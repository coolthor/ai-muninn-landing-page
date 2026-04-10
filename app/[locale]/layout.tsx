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
  const baseUrl = 'https://www.bpstracker.com';

  return {
    metadataBase: new URL(baseUrl),
    title: isZh ? 'BPS Tracker - Bull Put Spread 持倉管理' : 'BPS Tracker - Master Your Bull Put Spreads',
    description: isZh
      ? '專為選擇權交易者設計的持倉追蹤工具。即時監控 Greeks、風險評估、獲利追蹤。'
      : 'Track Bull Put Spread positions with real-time Greeks, IV Rank, risk analysis, and profit tracking. The iOS app for serious options traders.',
    keywords: ['options trading', 'bull put spread', 'BPS', 'options tracker', 'Greeks', 'theta decay', 'options portfolio', '選擇權', 'Bull Put Spread', '期權', 'iv rank', 'implied volatility', 'options Greeks tracker', 'theta decay tracker', 'put spread tracker', 'options position tracker', 'bull put spread app', 'iOS options app', '選擇權追蹤', '期權持倉', 'BPS追蹤器', '波動率', 'bull put spread tracker', 'options income', 'premium selling', 'options income strategy', 'systematic options trading', 'sell puts for income', 'options premium income', 'defined risk options', 'BPS screener', 'options income app', '選擇權被動收入', '賣 Put 策略', '選擇權收入', '系統化選擇權', '權金收入'],
    icons: {
      icon: [
        { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: '/favicon-192.png',
    },
    authors: [{ name: 'BPS Tracker' }],
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
    '@type': 'SoftwareApplication',
    name: 'BPS Tracker',
    operatingSystem: 'iOS',
    applicationCategory: 'FinanceApplication',
    description: isZh
      ? '專為選擇權交易者設計的 Bull Put Spread 持倉追蹤工具'
      : 'Track your Bull Put Spread positions with real-time Greeks and risk analysis',
    softwareVersion: '1.1',
    downloadUrl: 'https://apps.apple.com/app/id6757736273',
    screenshot: [
      'https://www.bpstracker.com/screenshots/screenshot-1.jpg',
    ],
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
      name: 'BPS Tracker',
      url: 'https://www.bpstracker.com',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '什麼是 Bull Put Spread？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bull Put Spread 是一種選擇權策略，透過賣出較高履約價的 Put + 買入較低履約價的 Put，在標的穩漲或盤整時獲取權金收入，風險和報酬都有限制。',
        },
      },
      {
        '@type': 'Question',
        name: 'BPS Tracker 是免費的嗎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BPS Tracker 提供免費版本，可追蹤最多 3 個倉位，並享有每月 10 次 AI 分析。Pro 版解鎖 20 個倉位、200 次 AI 分析、Greeks 趨勢圖表和警報功能。',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Bull Put Spread?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Bull Put Spread is an options strategy where you sell a higher-strike put and buy a lower-strike put to collect premium income when the underlying is stable or rising. Both risk and reward are limited.',
        },
      },
    ],
  };

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/favicon-192.png" />
        <link rel="icon" href="/logo-small.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="apple-itunes-app" content="app-id=6757736273, app-argument=bpstracker://" />
        <meta name="theme-color" content="#0a0a0f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
