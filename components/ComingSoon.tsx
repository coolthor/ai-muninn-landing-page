'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ComingSoon() {
  const t = useTranslations('cta');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="coming-soon" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-primary)] rounded-full blur-[300px] opacity-[0.08]" />

      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent"
            style={{
              top: `${30 + i * 20}%`,
              left: 0,
              right: 0,
              opacity: 0.1,
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--accent-primary)]" />
          <span className="font-mono text-sm text-[var(--accent-primary)] tracking-wider">
            {t('subtitle')}
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--accent-primary)]" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-12"
        >
          {t('title')}
        </motion.h2>

        {/* App Store Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block"
        >
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-[var(--accent-primary)] rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

            {/* Badge */}
            <div className="relative px-8 py-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] group-hover:border-[var(--border-accent)] transition-all duration-300">
              <div className="flex items-center gap-4 opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                {/* Apple Logo */}
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>

                {/* Text */}
                <div className="text-left">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                    Download on the
                  </p>
                  <p className="text-xl font-semibold text-white -mt-0.5">
                    App Store
                  </p>
                </div>
              </div>

              {/* Coming soon overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-card)]/80 rounded-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-heading text-lg font-semibold text-[var(--accent-primary)]">
                  {t('subtitle')}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-center gap-4"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[var(--accent-primary)]"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Terminal-style status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 inline-block"
        >
          <div className="px-6 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
            <div className="flex items-center gap-3 font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span className="text-[var(--text-muted)]">status:</span>
              <span className="text-[var(--accent-primary)]">in_development</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
