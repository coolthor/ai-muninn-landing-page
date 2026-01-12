'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent-primary)] rounded-full blur-[200px] opacity-[0.07]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent-tertiary)] rounded-full blur-[180px] opacity-[0.05]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left Content - with mobile background screenshot */}
          <div className="relative text-center lg:text-left min-h-[450px] sm:min-h-0 flex flex-col justify-center">
            {/* Mobile Background Screenshot - decorative, sits behind content */}
            <div className="sm:hidden absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[220px]"
              >
                <div className="relative rounded-[28px] overflow-hidden border border-[var(--border-subtle)]">
                  <Image
                    src="/screenshots/position-detail.JPG"
                    alt=""
                    width={220}
                    height={475}
                    className="object-cover"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[var(--bg-primary)]/60 to-[var(--bg-primary)]" />
                </div>
              </motion.div>
            </div>

            {/* Content with relative z-index to stay above background */}
            <div className="relative z-10">
              {/* Logo Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 mb-8"
              >
                <div className="relative w-14 h-14">
                  <Image
                    src="/logo.svg"
                    alt="BPS Tracker"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              >
                <span className="text-white">BPS</span>
                <span className="text-accent"> Tracker</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl sm:text-2xl text-[var(--text-secondary)] font-light mb-6"
              >
                {t('tagline')}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[var(--text-muted)] text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
              >
                {t('description')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a
                  href="#coming-soon"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent-primary)] text-[var(--bg-primary)] font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[var(--glow-lg)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <svg className="relative w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="relative">{t('cta')}</span>
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[var(--border-accent)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] rounded-full transition-all duration-300 hover:shadow-[var(--glow-sm)]"
                >
                  {t('learnMore')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right Content - Screenshots (Desktop only) */}
          <div className="hidden sm:flex relative items-center justify-center h-[500px] lg:h-[600px]">
            {/* Screenshot 1 - Back Left */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -15 }}
              animate={{ opacity: 1, x: 0, rotate: -8 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[200px] sm:w-[240px] z-10"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-[var(--accent-primary)] opacity-20 blur-2xl rounded-3xl" />
                <div className="relative rounded-[32px] overflow-hidden border-2 border-[var(--border-subtle)] shadow-2xl">
                  <Image
                    src="/screenshots/performance-summary.JPG"
                    alt="Performance Summary"
                    width={240}
                    height={520}
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Screenshot 2 - Center Front */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[280px] z-20"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-6 bg-[var(--accent-primary)] opacity-30 blur-3xl rounded-3xl" />
                <div className="relative rounded-[36px] overflow-hidden border-2 border-[var(--border-accent)] shadow-2xl">
                  <Image
                    src="/screenshots/position-detail.JPG"
                    alt="Position Detail"
                    width={280}
                    height={600}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-20" />
                </div>
              </motion.div>
            </motion.div>

            {/* Screenshot 3 - Back Right */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 15 }}
              animate={{ opacity: 1, x: 0, rotate: 8 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[200px] sm:w-[240px] z-10"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-[var(--accent-tertiary)] opacity-20 blur-2xl rounded-3xl" />
                <div className="relative rounded-[32px] overflow-hidden border-2 border-[var(--border-subtle)] shadow-2xl">
                  <Image
                    src="/screenshots/closed-position.JPG"
                    alt="Closed Position"
                    width={240}
                    height={520}
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[var(--border-accent)] rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ height: ['20%', '60%', '20%'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 bg-[var(--accent-primary)] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
