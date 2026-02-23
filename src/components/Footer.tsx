import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative z-10 px-6 pt-4 pb-[calc(env(safe-area-inset-bottom)+12px)] sm:px-10 lg:px-16"
      style={{ backgroundColor: '#5F5A56' }}
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm text-porcelain/80 font-sans">
          Designed for Kronomods · Built by{' '}
          <a
            href="http://sheikhmataev.github.io/mash/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-champagne hover:text-auric transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne rounded"
          >
            MASH Partners AS
          </a>{' '}
          · © 2026
        </p>
      </div>
    </footer>
  )
}

