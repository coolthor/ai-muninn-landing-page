'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const APP_STORE_URL = 'https://apps.apple.com/tw/app/bpstracker/id6757736273';

function CheckIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Pricing() {
  const t = useTranslations('pricing');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isYearly, setIsYearly] = useState(false);

  const freeFeatures: string[] = t.raw('free.features') as string[];
  const proFeatures: string[] = t.raw('pro.features') as string[];

  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Gradient orb */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[var(--accent-tertiary)] rounded-full blur-[250px] opacity-[0.04]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-accent)] bg-[var(--accent-muted)] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span className="text-sm font-medium text-[var(--accent-primary)]">
              {t('badge')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span className={`text-sm font-medium transition-colors duration-200 ${!isYearly ? 'text-white' : 'text-[var(--text-muted)]'}`}>
              {t('monthly')}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-secondary)] ${isYearly ? 'bg-[var(--accent-primary)]' : 'bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]'}`}
              aria-label="Toggle billing period"
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${isYearly ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-medium transition-colors duration-200 ${isYearly ? 'text-white' : 'text-[var(--text-muted)]'}`}>
              {t('yearly')}
            </span>
            {isYearly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              >
                {t('pro.savingLabel')}
              </motion.span>
            )}
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
          >
            <div className="mb-6">
              <h3 className="font-heading text-xl font-bold text-white mb-1">{t('free.name')}</h3>
              <div className="flex items-baseline gap-1 mt-3">
                <span className="font-heading text-4xl font-bold text-white">{t('free.price')}</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-1">{t('free.period')}</p>
            </div>

            <ul className="space-y-3 mb-8">
              {freeFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="text-[var(--text-muted)] mt-0.5">
                    <CheckIcon />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-6 text-center rounded-xl border border-[var(--border-accent)] text-[var(--accent-primary)] font-semibold text-sm hover:bg-[var(--accent-muted)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            >
              {t('free.cta')}
            </a>
          </motion.div>

          {/* Pro Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative group"
          >
            {/* Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-tertiary)] rounded-2xl opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-accent)]">
              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-xl font-bold text-white">{t('pro.name')}</h3>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                  {t('pro.badge')}
                </span>
              </div>

              <div className="flex items-baseline gap-1 mt-3">
                <span className="font-heading text-4xl font-bold text-[var(--accent-primary)]">
                  {isYearly ? t('pro.priceYearly') : t('pro.priceMonthly')}
                </span>
                <span className="text-[var(--text-muted)] text-sm">
                  {isYearly ? t('pro.periodYearly') : t('pro.periodMonthly')}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-1 h-5">
                {isYearly ? t('pro.savingLabel') : ''}
              </p>

              <ul className="space-y-3 mb-8 mt-6">
                {proFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="text-[var(--accent-primary)] mt-0.5">
                      <CheckIcon />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-6 text-center rounded-xl bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold text-sm hover:brightness-110 transition-all duration-200 shadow-[var(--glow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-card)]"
              >
                {t('pro.cta')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
