import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Screenshots from '@/components/Screenshots';
import HowItWorks from '@/components/HowItWorks';
import ComingSoon from '@/components/ComingSoon';
import Footer from '@/components/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main className="relative">
      <Header />
      <Hero />
      <Features />
      <Screenshots />
      <HowItWorks />
      <ComingSoon />
      <Footer />
    </main>
  );
}
