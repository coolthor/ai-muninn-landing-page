'use client'

interface VideoEmbedProps {
  src: string
  caption?: string
}

export default function VideoEmbed({ src, caption }: VideoEmbedProps) {
  return (
    <div className="my-8">
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(0,255,200,0.15)' }}
      >
        <video
          src={src}
          controls
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', display: 'block', background: '#0a0a0f' }}
        />
      </div>
      {caption && (
        <p
          className="text-xs text-center mt-2"
          style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}
        >
          {caption}
        </p>
      )}
    </div>
  )
}
