'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    key: 'step1',
    number: '01',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    key: 'step2',
    number: '02',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    key: 'step3',
    number: '03',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-accent)] bg-[var(--accent-muted)] mb-6"
          >
            <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium text-[var(--accent-primary)]">
              {t('title')}
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
            className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-[2px]">
            <div className="h-full bg-gradient-to-r from-[var(--border-subtle)] via-[var(--border-accent)] to-[var(--border-subtle)]" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)] origin-left"
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className="relative"
              >
                {/* Step card */}
                <div className="relative p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] group hover:border-[var(--border-accent)] transition-all duration-500">
                  {/* Step number */}
                  <div className="absolute -top-4 left-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.2, type: "spring" }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-[var(--accent-primary)] blur-lg opacity-50" />
                      <div className="relative w-12 h-12 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center shadow-lg">
                        <span className="font-mono text-sm font-bold text-[var(--bg-primary)]">
                          {step.number}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-[var(--accent-muted)] flex items-center justify-center text-[var(--accent-primary)] mb-6 mt-4 group-hover:shadow-[var(--glow-sm)] transition-shadow duration-500">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                    {t(`${step.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {t(`${step.key}.description`)}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[var(--accent-primary)] opacity-30 rounded-br-xl" />
                  </div>
                </div>

                {/* Connection dot - desktop */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -mt-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.2 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-[var(--accent-primary)] rounded-full blur-md opacity-50" />
                    <div className="relative w-4 h-4 rounded-full bg-[var(--accent-primary)] border-4 border-[var(--bg-secondary)]" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
