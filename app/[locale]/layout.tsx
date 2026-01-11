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

  return {
    metadataBase: new URL('https://ai-muninn.com'),
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
      url: 'https://ai-muninn.com',
      siteName: 'BPS Tracker',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'BPS Tracker App',
        },
      ],
      locale: isZh ? 'zh_TW' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? 'BPS Tracker - Bull Put Spread 持倉管理' : 'BPS Tracker - Master Your Bull Put Spreads',
      description: isZh
        ? '專為選擇權交易者設計的持倉追蹤工具'
        : 'Track your Bull Put Spread positions with real-time Greeks and risk analysis.',
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
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

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="icon" href="/logo-small.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
