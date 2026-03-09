import { getAllPosts } from '@/lib/blog';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  const baseUrl = 'https://bpstracker.com';

  return {
    title: isZh ? 'Bull Put Spread 教學部落格 | BPS Tracker' : 'Options Trading Blog | BPS Tracker',
    description: isZh
      ? '深入淺出的選擇權教學：Bull Put Spread 策略、IV Rank 分析、Greeks 解讀、Theta Decay 實戰。'
      : 'In-depth options trading guides: Bull Put Spread strategy, IV Rank analysis, Greeks explained, Theta Decay tactics.',
    alternates: {
      canonical: isZh ? `${baseUrl}/blog` : `${baseUrl}/en/blog`,
      languages: {
        'zh-TW': `${baseUrl}/blog`,
        'en': `${baseUrl}/en/blog`,
      },
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts(locale);
  const isZh = locale === 'zh-TW';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(0,255,200,0.1)' }}>
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
          <Link href="/" className="text-sm" style={{ color: 'var(--accent-primary)' }}>
            ← BPS Tracker
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
          {isZh ? '選擇權交易教學' : 'Options Trading Guides'}
        </h1>
        <p className="text-lg mb-12" style={{ color: 'var(--text-secondary)' }}>
          {isZh
            ? 'Bull Put Spread 策略深度解析，讓你用資料做決策'
            : 'Deep dives into Bull Put Spread strategy — trade with data, not emotion'}
        </p>

        {posts.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>
            {isZh ? '文章即將上線…' : 'Articles coming soon…'}
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}` as '/blog/[slug]'}
                className="block rounded-xl p-6 transition-all duration-200 hover:scale-[1.01]"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(0,255,200,0.08)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {post.tags.slice(0, 3).map((tag) => (
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
                <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {post.title}
                </h2>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(160,160,176,0.6)' }}>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readingTime} {isZh ? '分鐘閱讀' : 'min read'}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
