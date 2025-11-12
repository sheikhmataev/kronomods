// Instructions:
// 1. Install GSAP: npm install gsap
// 2. Import the component where needed: import HeroCardsSection from './components/HeroCardsSection'
// 3. Render in your page: <HeroCardsSection />

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type HeroCardsSectionProps = {
  /** Enable or disable ScrollTrigger pinning. Defaults to true. */
  pin?: boolean
}

type CardRole = 'center' | 'left' | 'right'

type CardConfig = {
  role: CardRole
  title: string
  subtitle: string
  accent: string
}

const cards: CardConfig[] = [
  {
    role: 'center',
    title: 'Chrono Apex',
    subtitle: 'Flagship tourbillon · 120h reserve',
    accent: 'KA',
  },
  {
    role: 'left',
    title: 'Obsidian GMT',
    subtitle: 'Dual timezone · Meteorite dial',
    accent: 'KG',
  },
  {
    role: 'right',
    title: 'Eclipse No. 8',
    subtitle: 'Skeleton calibre · Night lume',
    accent: 'KE',
  },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isMobileViewport = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

const HeroCardsSection = ({ pin = true }: HeroCardsSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])
  const headingRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const shouldReduceMotion = prefersReducedMotion() || isMobileViewport()

    if (shouldReduceMotion) {
      cardsRef.current.forEach((card) => {
        if (!card) return
        card.style.opacity = '1'
        card.style.transform = 'none'
      })
      if (headingRef.current) {
        headingRef.current.style.opacity = '0'
        headingRef.current.style.transform = 'translate3d(0, 220px, 0)'
      }
      return undefined
    }

    const ctx = gsap.context(() => {
      const getCardByRole = (role: CardRole) =>
        cardsRef.current.find((card) => card?.dataset.role === role) ?? null

      const centerCard = getCardByRole('center')
      const leftCard = getCardByRole('left')
      const rightCard = getCardByRole('right')
      const heading = headingRef.current

      if (!centerCard || !leftCard || !rightCard || !heading) {
        return
      }

      gsap.set(centerCard, {
        transformOrigin: 'center center',
        y: 300,
        scale: 1.45,
        opacity: 1,
        boxShadow: '0 64px 160px rgba(40, 80, 160, 0.45)',
      })
      gsap.set(leftCard, {
        transformOrigin: 'center center',
        xPercent: -120,
        y: 300,
        scale: 0.8,
        opacity: 0,
      })
      gsap.set(rightCard, {
        transformOrigin: 'center center',
        xPercent: 120,
        y: 300,
        scale: 0.8,
        opacity: 0,
      })
      gsap.set(heading, { y: 0, opacity: 1 })

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=600',
          scrub: 0.75,
          anticipatePin: 1,
          pin,
        },
      })

      timeline
        .to(
          centerCard,
          {
            y: 280,
            scale: 1.08,
            ease: 'power3.out',
            boxShadow: '0 48px 120px rgba(36, 72, 138, 0.5)',
          },
          0,
        )
        .to(
          centerCard,
          {
            y: 300,
            scale: 1,
            ease: 'power2.inOut',
            boxShadow: '0 32px 80px rgba(28, 60, 112, 0.45)',
          },
          0.4,
        )

      timeline.to(
        leftCard,
        {
          xPercent: 0,
          y: 280,
          scale: 1.02,
          opacity: 1,
        },
        0,
      )

      timeline.to(
        rightCard,
        {
          xPercent: 0,
          y: 280,
          scale: 1.02,
          opacity: 1,
        },
        0,
      )

      timeline.to(
        [leftCard, rightCard],
        {
          scale: 0.88,
          y: 300,
        },
        0.45,
      )

      timeline.to(
        heading,
        {
          y: 220,
          opacity: 0,
        },
        0.15,
      )

      timelineRef.current = timeline
    }, sectionRef)

    return () => {
      timelineRef.current?.scrollTrigger?.kill()
      timelineRef.current?.kill()
      ctx.revert()
    }
  }, [pin])

  return (
    <section ref={sectionRef} className="relative min-h-[220vh]">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.06]" aria-hidden="true" />
      <div className="sticky top-[-12vh] flex h-screen flex-col items-center justify-start overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
        <div className="relative mt-6 flex w-full flex-col items-center gap-6 md:mt-10 md:grid md:max-w-6xl md:grid-cols-3 md:gap-10">
          {cards.map((card, index) => {
            const baseClasses =
              'glass-card will-change-transform flex h-[440px] w-full max-w-sm flex-col items-center justify-center gap-5 p-8 text-center transition-transform transition-shadow duration-300'

            const roleClasses: Record<CardRole, string> = {
              center:
                'md:col-start-2 md:col-end-3 md:row-start-1 md:self-start shadow-[0_32px_80px_rgba(28,60,112,0.45)]',
              left: 'md:col-start-1 md:col-end-2 md:row-start-1 md:justify-self-end md:opacity-0',
              right: 'md:col-start-3 md:col-end-4 md:row-start-1 md:justify-self-start md:opacity-0',
            }

            return (
              <div
                key={card.role}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                data-role={card.role}
                className={`${baseClasses} ${roleClasses[card.role]}`}
              >
                <span className="text-xs uppercase tracking-[0.4em] text-champagne/70">{card.title}</span>
                <div className="accent-gradient flex h-24 w-24 items-center justify-center rounded-full text-night">
                  <span className="font-display text-2xl">{card.accent}</span>
                </div>
                <h3 className="font-display text-3xl text-champagne sm:text-4xl">{card.title}</h3>
                <p className="max-w-sm text-sm text-porcelain/60 sm:text-base">{card.subtitle}</p>
              </div>
            )
          })}
        </div>

        <div
          ref={headingRef}
          className="mt-auto w-full max-w-3xl text-center pb-6 md:pb-12"
        >
          <h2 className="font-display text-4xl text-porcelain sm:text-5xl md:text-6xl translate-y-[2rem]">
            Time converges where precision finds its counterpart.
          </h2>
        </div>
      </div>
    </section>
  )
}

export default HeroCardsSection