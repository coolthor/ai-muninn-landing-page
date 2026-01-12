'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const screenshots = [
  {
    key: 'performance',
    src: '/screenshots/performance-summary.JPG',
  },
  {
    key: 'position',
    src: '/screenshots/position-detail.JPG',
  },
  {
    key: 'closed',
    src: '/screenshots/closed-position.JPG',
  },
];

export default function Screenshots() {
  const t = useTranslations('screenshots');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const mobileViewerRef = useRef<HTMLDivElement>(null);

  // Handle vertical scroll within mobile viewer
  const handleScroll = (direction: 'up' | 'down') => {
    if (mobileViewerRef.current) {
      const scrollAmount = 200;
      mobileViewerRef.current.scrollBy({
        top: direction === 'down' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Update scroll position for indicator
  useEffect(() => {
    const viewer = mobileViewerRef.current;
    if (!viewer) return;

    const handleScrollEvent = () => {
      const maxScroll = viewer.scrollHeight - viewer.clientHeight;
      const scrollPercent = maxScroll > 0 ? (viewer.scrollTop / maxScroll) * 100 : 0;
      setScrollY(scrollPercent);
    };

    viewer.addEventListener('scroll', handleScrollEvent);
    return () => viewer.removeEventListener('scroll', handleScrollEvent);
  }, [activeIndex]);

  // Reset scroll when switching screenshots
  useEffect(() => {
    if (mobileViewerRef.current) {
      mobileViewerRef.current.scrollTop = 0;
      setScrollY(0);
    }
  }, [activeIndex]);

  return (
    <section id="screenshots" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Gradient orbs */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--accent-primary)] rounded-full blur-[250px] opacity-[0.05]" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[var(--accent-tertiary)] rounded-full blur-[200px] opacity-[0.03]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-accent)] bg-[var(--accent-muted)] mb-6"
          >
            <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

        {/* Desktop Screenshots */}
        <div className="hidden md:flex justify-center items-end gap-6 lg:gap-10">
          {screenshots.map((screenshot, index) => {
            const isCenter = index === 1;
            return (
              <motion.div
                key={screenshot.key}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`relative group ${isCenter ? 'z-20' : 'z-10'}`}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-4 bg-[var(--accent-primary)] rounded-[40px] blur-2xl transition-opacity duration-500 ${isCenter ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'
                  }`} />

                {/* Screenshot frame */}
                <div className={`relative rounded-[32px] overflow-hidden border-2 transition-all duration-500 ${isCenter
                    ? 'border-[var(--border-accent)] shadow-2xl'
                    : 'border-[var(--border-subtle)] group-hover:border-[var(--border-accent)]'
                  }`}>
                  <Image
                    src={screenshot.src}
                    alt={t(screenshot.key)}
                    width={isCenter ? 280 : 240}
                    height={isCenter ? 600 : 520}
                    className="object-cover"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-30" />
                </div>

                {/* Caption */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`mt-6 text-center text-sm max-w-[240px] mx-auto ${isCenter ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'
                    }`}
                >
                  {t(screenshot.key)}
                </motion.p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Carousel with vertical scroll */}
        <div className="md:hidden">
          <div className="relative">
            {/* Phone Frame Container */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-[var(--accent-primary)] rounded-[48px] blur-2xl opacity-30" />

                {/* Phone Frame */}
                <div className="relative rounded-[36px] overflow-hidden border-2 border-[var(--border-accent)] shadow-2xl bg-[var(--bg-secondary)]">
                  {/* Screenshot Viewer - Scrollable Area */}
                  <div
                    ref={mobileViewerRef}
                    className="relative w-[280px] h-[500px] overflow-y-auto overflow-x-hidden scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={screenshots[activeIndex].src}
                          alt={t(screenshots[activeIndex].key)}
                          width={280}
                          height={600}
                          className="object-cover w-full"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Scroll Progress Indicator */}
                  <div className="absolute right-2 top-4 bottom-4 w-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                    <motion.div
                      className="w-full bg-[var(--accent-primary)] rounded-full"
                      style={{
                        height: '30%',
                        marginTop: `${scrollY * 0.7}%`
                      }}
                    />
                  </div>

                  {/* Top/Bottom Gradient Overlays */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[var(--bg-secondary)] to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent pointer-events-none" />
                </div>

                {/* Vertical Scroll Hint */}
                <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden xs:flex flex-col gap-2">
                  <button
                    onClick={() => handleScroll('up')}
                    className="p-2 rounded-full border border-[var(--border-accent)] text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300"
                    aria-label="Scroll up"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleScroll('down')}
                    className="p-2 rounded-full border border-[var(--border-accent)] text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300"
                    aria-label="Scroll down"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Caption */}
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center text-sm text-[var(--accent-primary)] px-4"
            >
              {t(screenshots[activeIndex].key)}
            </motion.p>

            {/* Horizontal Navigation - Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex
                      ? 'bg-[var(--accent-primary)] w-8'
                      : 'bg-[var(--border-accent)] hover:bg-[var(--accent-tertiary)] w-2.5'
                    }`}
                  aria-label={`View screenshot ${index + 1}`}
                />
              ))}
            </div>

            {/* Left/Right Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setActiveIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))}
                className="p-3 rounded-full border border-[var(--border-accent)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300"
                aria-label="Previous screenshot"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1))}
                className="p-3 rounded-full border border-[var(--border-accent)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300"
                aria-label="Next screenshot"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Swipe Hint */}
            <p className="text-center text-xs text-[var(--text-muted)] mt-4">
              ← 左右切換截圖 · 上下滾動查看細節 →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
