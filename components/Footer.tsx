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

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-secondary)]"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-secondary)]"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
              </div>
            </div>
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
