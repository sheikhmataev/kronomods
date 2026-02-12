import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative z-10 px-6 pt-8 pb-[calc(env(safe-area-inset-bottom)+24px)] sm:px-10 lg:px-16"
      style={{ backgroundColor: '#5F5A56' }}
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm text-porcelain/60 font-sans">
          Designet for Kronomods - laget av{' '}
          <span className="text-champagne/80 hover:text-champagne transition-colors">
            MASH Partners AS
          </span>{' '}
          - © 2025
        </p>
      </div>
    </footer>
  )
}

