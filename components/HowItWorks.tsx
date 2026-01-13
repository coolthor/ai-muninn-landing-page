'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const steps = [
  {
    key: 'step1',
    number: '01',
    image: '/how-it-works-1.png',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
    gradient: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.3)',
  },
  {
    key: 'step2',
    number: '02',
    image: '/how-it-works-3.jpg',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(6, 182, 212, 0.3)',
  },
  {
    key: 'step3',
    number: '03',
    image: '/how-it-works-2.jpg',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-violet-500 to-purple-500',
    glowColor: 'rgba(139, 92, 246, 0.3)',
  },
];

// Phone mockup component
function PhoneMockup({
  image,
  gradient,
  glowColor,
  isInView,
  delay
}: {
  image: string;
  gradient: string;
  glowColor: string;
  isInView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative mx-auto"
      style={{ maxWidth: '280px' }}
    >
      {/* Glow effect behind phone */}
      <div
        className="absolute inset-0 blur-3xl opacity-40 scale-110"
        style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
      />

      {/* Phone frame */}
      <div className="relative rounded-[40px] p-2 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 shadow-2xl shadow-black/50">
        {/* Gradient border effect */}
        <div className={`absolute inset-0 rounded-[40px] bg-gradient-to-br ${gradient} opacity-20`} />

        {/* Inner black bezel */}
        <div className="relative rounded-[32px] bg-black overflow-hidden">
          {/* Dynamic island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

          {/* Screen content */}
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[32px]">
            <Image
              src={image}
              alt="App screenshot"
              fill
              className="object-cover object-top"
              sizes="280px"
            />

            {/* Screen reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Side button highlights */}
        <div className="absolute right-0 top-24 w-[2px] h-12 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-600 rounded-full" />
        <div className="absolute left-0 top-20 w-[2px] h-8 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-600 rounded-full" />
        <div className="absolute left-0 top-32 w-[2px] h-12 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-600 rounded-full" />
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl" />

      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-20" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-20" />

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

        {/* Steps Grid */}
        <div className="space-y-24 lg:space-y-32">
          {steps.map((step, index) => (
            <div
              key={step.key}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              {/* Phone mockup */}
              <div className="flex-1 w-full max-w-sm lg:max-w-none">
                <PhoneMockup
                  image={step.image}
                  gradient={step.gradient}
                  glowColor={step.glowColor}
                  isInView={isInView}
                  delay={0.3 + index * 0.15}
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                >
                  {/* Step indicator */}
                  <div className="inline-flex items-center gap-4 mb-6">
                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                      <span className="text-white">{step.icon}</span>
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} blur-xl opacity-50`} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                        Step
                      </span>
                      <span className={`text-3xl font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
                    {t(`${step.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                    {t(`${step.key}.description`)}
                  </p>

                  {/* Feature tags based on step */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6">
                    {step.key === 'step1' && (
                      <>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Symbol
                        </span>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Strike Prices
                        </span>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Expiry Date
                        </span>
                      </>
                    )}
                    {step.key === 'step2' && (
                      <>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          Win Rate
                        </span>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          Total P&L
                        </span>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          Avg RoR
                        </span>
                      </>
                    )}
                    {step.key === 'step3' && (
                      <>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          Greeks
                        </span>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          Risk Metrics
                        </span>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          P&L Analysis
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom connector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex justify-center mt-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 blur-xl opacity-30" />
            <div className="relative px-8 py-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-accent)]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  Ready to start tracking
                </span>
                <svg className="w-5 h-5 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
