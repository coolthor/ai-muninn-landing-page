'use client'

import { useState } from 'react'

const ICONS = {
  copy: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  reddit: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 13.71c.148.473.222.965.222 1.29 0 2.652-3.107 4.803-6.93 4.803S4.43 17.652 4.43 15c0-.326.074-.818.222-1.29a1.414 1.414 0 0 1-.655-1.187c0-.783.635-1.418 1.418-1.418.39 0 .742.157.999.412C7.728 10.61 9.534 10.024 11.5 10l1.253-3.912.01-.026a.474.474 0 0 1 .569-.334l2.79.642a1.07 1.07 0 0 1 2.034.463 1.07 1.07 0 0 1-1.963.458l-2.416-.555-1.08 3.373c1.903.038 3.644.617 4.928 1.51a1.41 1.41 0 0 1 .998-.412c.783 0 1.418.635 1.418 1.418 0 .49-.249.921-.655 1.187zM9.073 14.07a1.07 1.07 0 1 0 0 2.14 1.07 1.07 0 0 0 0-2.14zm5.854 0a1.07 1.07 0 1 0 0 2.14 1.07 1.07 0 0 0 0-2.14zm-1.281 3.478c-.072 0-.145-.024-.204-.073a.286.286 0 0 1-.011-.404c.029-.033.725-.793 1.57-.793.843 0 1.54.76 1.57.793a.286.286 0 0 1-.216.477.286.286 0 0 1-.215-.097s-.547-.602-1.14-.602c-.591 0-1.14.602-1.14.602a.286.286 0 0 1-.215.097z" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  x: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
}

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    { label: 'Reddit', icon: ICONS.reddit, href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}` },
    { label: 'LinkedIn', icon: ICONS.linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: 'X', icon: ICONS.x, href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
  ]

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid rgba(0,255,200,0.15)',
    color: 'var(--text-secondary)',
    fontSize: '12px',
    textDecoration: 'none',
    transition: 'all 0.15s',
    cursor: 'pointer',
    background: 'transparent',
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span style={{ color: 'var(--text-secondary)', fontSize: '12px', marginRight: '4px' }}>Share</span>
      <button onClick={handleCopy} style={btnStyle} className="hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]">
        {copied ? ICONS.check : ICONS.copy}
        {copied ? 'Copied' : 'Copy'}
      </button>
      {links.map(({ label, icon, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={btnStyle} className="hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]">
          {icon}
          {label}
        </a>
      ))}
    </div>
  )
}
