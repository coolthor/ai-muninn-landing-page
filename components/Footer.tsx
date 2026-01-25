'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo-small.svg"
                  alt="BPS Tracker"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading text-xl font-semibold">
                <span className="text-white">BPS</span>
                <span className="text-[var(--accent-primary)]"> Tracker</span>
              </span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm max-w-sm mb-6">
              {t('description')}
            </p>
            <p className="text-[var(--text-muted)] text-sm">
              {t('tagline')}
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <NextLink
                  href={locale === 'zh-TW' ? '/bpstracker/guide' : `/${locale}/bpstracker/guide`}
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:text-[var(--accent-primary)] focus-visible:underline"
                >
                  {t('guide')}
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/bpstracker/privacy"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:text-[var(--accent-primary)] focus-visible:underline"
                >
                  {t('privacy')}
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/bpstracker/terms"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:text-[var(--accent-primary)] focus-visible:underline"
                >
                  {t('terms')}
                </NextLink>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('contact')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@ai-muninn.com"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] text-sm transition-colors duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:text-[var(--accent-primary)] focus-visible:underline"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  info@ai-muninn.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-[var(--border-subtle)]"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[var(--text-muted)] text-sm">
              &copy; {currentYear} AI Muninn. {t('rights')}
            </p>
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[var(--color-profit)] animate-pulse" />
              <span>v1.0.0</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
