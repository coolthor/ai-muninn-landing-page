import { getPost, getAllSlugs } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import IVRFilterChart from '@/components/blog/IVRFilterChart';
import DeltaStopChart from '@/components/blog/DeltaStopChart';
import ThetaDecayCurve from '@/components/blog/ThetaDecayCurve';
import IVRMeter from '@/components/blog/IVRMeter';
import SB2CompareChart from '@/components/blog/SB2CompareChart';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales = ['zh-TW', 'en'];
  return locales.flatMap((locale) =>
    getAllSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};

  const baseUrl = 'https://bpstracker.com';
  const isZh = locale === 'zh-TW';
  const url = isZh ? `${baseUrl}/blog/${slug}` : `${baseUrl}/en/blog/${slug}`;
  const otherLocale = isZh ? 'en' : 'zh-TW';
  const otherPost = getPost(otherLocale, slug);
  const otherUrl = isZh ? `${baseUrl}/en/blog/${slug}` : `${baseUrl}/blog/${slug}`;
  const ogImage = `${baseUrl}/${locale}/opengraph-image`;

  return {
    title: `${post.title} | BPS Tracker`,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: url,
      ...(otherPost && {
        languages: {
          [locale]: url,
          [otherLocale]: otherUrl,
        },
      }),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

// chart components are injected per-render with locale bound
function makeMdxComponents(locale: string) {
  const lang = locale === 'zh-TW' ? 'zh' : 'en';
  return {
    IVRFilterChart: () => <IVRFilterChart lang={lang} />,
    DeltaStopChart: () => <DeltaStopChart lang={lang} />,
    ThetaDecayCurve: () => <ThetaDecayCurve lang={lang} />,
    IVRMeter: () => <IVRMeter lang={lang} />,
    SB2CompareChart: () => <SB2CompareChart lang={lang} />,
    ...mdxComponents,
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-bold mt-10 mb-4"
      style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-semibold mt-8 mb-3"
      style={{ color: 'var(--text-primary)' }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-5 space-y-2 pl-5 list-disc" style={{ color: 'var(--text-secondary)' }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-5 space-y-2 pl-5 list-decimal" style={{ color: 'var(--text-secondary)' }} {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ color: 'var(--text-primary)' }} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="pl-4 py-1 my-6 rounded-r-lg"
      style={{
        borderLeft: '3px solid var(--accent-primary)',
        background: 'rgba(0,255,200,0.05)',
        color: 'var(--text-secondary)',
      }}
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="px-1.5 py-0.5 rounded text-sm"
      style={{
        background: 'rgba(0,255,200,0.1)',
        color: 'var(--accent-primary)',
        fontFamily: 'JetBrains Mono, monospace',
      }}
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="p-4 rounded-lg overflow-x-auto mb-6 text-sm"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(0,255,200,0.1)',
        fontFamily: 'JetBrains Mono, monospace',
        color: 'var(--accent-primary)',
      }}
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-8" style={{ borderColor: 'rgba(0,255,200,0.1)' }} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table
        className="w-full text-sm border-collapse"
        style={{ borderColor: 'rgba(0,255,200,0.15)' }}
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead style={{ background: 'rgba(0,255,200,0.06)' }} {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-2 text-left font-semibold"
      style={{
        color: 'var(--accent-primary)',
        borderBottom: '1px solid rgba(0,255,200,0.2)',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.8rem',
      }}
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-2"
      style={{
        color: 'var(--text-secondary)',
        borderBottom: '1px solid rgba(0,255,200,0.06)',
      }}
      {...props}
    />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="transition-colors"
      style={{ background: 'transparent' }}
      {...props}
    />
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(locale, slug);
  if (!post) notFound();

  const isZh = locale === 'zh-TW';

  const baseUrl = 'https://bpstracker.com';
  const articleUrl = isZh ? `${baseUrl}/blog/${slug}` : `${baseUrl}/en/blog/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'BPS Tracker' },
    publisher: {
      '@type': 'Organization',
      name: 'BPS Tracker',
      url: baseUrl,
    },
    keywords: post.tags.join(', '),
    inLanguage: locale,
    url: articleUrl,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isZh ? '首頁' : 'Home',
        item: isZh ? baseUrl : `${baseUrl}/en`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isZh ? '部落格' : 'Blog',
        item: isZh ? `${baseUrl}/blog` : `${baseUrl}/en/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(0,255,200,0.1)' }}>
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center gap-4">
          <Link href="/blog" className="text-sm" style={{ color: 'var(--accent-primary)' }}>
            ← {isZh ? '所有文章' : 'All Posts'}
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(0,255,200,0.1)',
                color: 'var(--accent-primary)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="text-4xl font-bold mb-4 leading-tight"
          style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-10 text-sm" style={{ color: 'rgba(160,160,176,0.6)' }}>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime} {isZh ? '分鐘閱讀' : 'min read'}</span>
        </div>

        {/* Description */}
        <p className="text-lg mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {post.description}
        </p>

        <hr style={{ borderColor: 'rgba(0,255,200,0.1)', marginBottom: '2.5rem' }} />

        {/* Content */}
        <div className="prose-custom">
          <MDXRemote
            source={post.content}
            components={makeMdxComponents(locale)}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {/* CTA */}
        <div
          className="mt-16 p-8 rounded-2xl text-center"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid rgba(0,255,200,0.15)',
          }}
        >
          <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {isZh ? '想用工具追蹤你的 BPS 倉位？' : 'Ready to track your BPS positions?'}
          </p>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
            {isZh
              ? 'BPS Tracker 提供即時 Greeks、IV Rank、和 AI 分析，讓你的交易更有依據。'
              : 'BPS Tracker gives you real-time Greeks, IV Rank, and AI analysis — trade with data.'}
          </p>
          <a
            href="https://apps.apple.com/app/id6757736273"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
            style={{
              background: 'var(--accent-primary)',
              color: '#0a0a0f',
            }}
          >
            {isZh ? '免費下載 App Store' : 'Download on App Store — Free'}
          </a>
        </div>
      </article>
    </div>
  );
}
