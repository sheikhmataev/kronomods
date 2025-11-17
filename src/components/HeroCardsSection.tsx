import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MacbookPro } from '@/components/ui/macbook-pro'
import watchVideo from '@/assets/watch.mp4'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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
  const macbookRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return
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
        // Show Macbook and video immediately for reduced motion
        if (macbookRef.current) {
          macbookRef.current.style.opacity = '1'
          macbookRef.current.style.transform = 'none'
          const video = macbookRef.current.querySelector('video') as HTMLVideoElement
          if (video) {
            video.style.opacity = '1'
            video.play().catch((error) => {
              console.warn('Video autoplay failed:', error)
            })
          }
        }
        return
      }

      const getCardByRole = (role: CardRole) =>
        cardsRef.current.find((card) => card?.dataset.role === role) ?? null

      const centerCard = getCardByRole('center')
      const leftCard = getCardByRole('left')
      const rightCard = getCardByRole('right')
      const heading = headingRef.current
      const macbook = macbookRef.current

      if (!centerCard || !leftCard || !rightCard || !heading) {
        return
      }

      // Enhanced initial setup with 3D transforms and GPU acceleration
      gsap.set(centerCard, {
        transformOrigin: 'center center',
        y: 300,
        scale: 1.45,
        opacity: 1,
        rotationY: 0,
        rotationX: 0,
        z: 0,
        filter: 'blur(0px)',
        force3D: true,
        transformStyle: 'preserve-3d',
      })

      gsap.set(leftCard, {
        transformOrigin: 'center center',
        xPercent: -120,
        y: 300,
        scale: 0.8,
        opacity: 0,
        rotationY: -25,
        rotationX: 5,
        z: -50,
        filter: 'blur(0px)', // Start with no blur
        force3D: true,
        transformStyle: 'preserve-3d',
      })

      gsap.set(rightCard, {
        transformOrigin: 'center center',
        xPercent: 120,
        y: 300,
        scale: 0.8,
        opacity: 0,
        rotationY: 25,
        rotationX: 5,
        z: -50,
        filter: 'blur(0px)', // Start with no blur
        force3D: true,
        transformStyle: 'preserve-3d',
      })

      gsap.set(heading, {
        y: 0,
        opacity: 1,
        force3D: true,
        // Ensure smooth text rendering
        willChange: 'transform, opacity',
      })

      // Initialize Macbook Pro - hidden and scaled down initially
      if (macbook) {
        gsap.set(macbook, {
          opacity: 0,
          scale: 0.8,
          y: 100,
          rotationY: -10,
          rotationX: 5,
          z: -50,
          filter: 'blur(8px)',
          force3D: true,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity, filter',
        })

        // Initialize video inside Macbook - hidden initially
        const video = macbook.querySelector('video') as HTMLVideoElement
        if (video) {
          gsap.set(video, {
            opacity: 0,
            scale: 1.05, // Slight zoom for premium reveal
            force3D: true,
          })
        }
      }

      // Enhanced timeline with refined easing and 3D transforms
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin,
          anticipatePin: 1,
          scrub: 1, // Smoother scrub to reduce glitches
          invalidateOnRefresh: true,
          refreshPriority: -1, // Refresh after other animations
        },
      })

      // Phase 1: Spawn-in with 3D transforms and staggered timing
      timeline
        .to(
          centerCard,
          {
            y: 360,
            scale: 1.08,
            rotationY: 0,
            rotationX: 0,
            z: 20,
            filter: 'blur(0px)',
            ease: 'power3.out',
          },
          0,
        )
        .to(
          centerCard,
          {
            y: 360,
            scale: 1,
            ease: 'power2.inOut',
          },
          0.4,
        )

      // Staggered reveal for side cards with 3D rotation - clear and sharp when visible
      timeline.to(
        leftCard,
        {
          xPercent: 0,
          y: 360,
          scale: 1.02,
          opacity: 1,
          rotationY: -10,
          rotationX: 0,
          z: -20,
          filter: 'blur(0px)', // Clear when visible
          ease: 'power3.out',
        },
        0.1, // Slight delay for staggered effect
      )

      timeline.to(
        rightCard,
        {
          xPercent: 0,
          y: 360,
          scale: 1.02,
          opacity: 1,
          rotationY: 10,
          rotationX: 0,
          z: -20,
          filter: 'blur(0px)', // Clear when visible
          ease: 'power3.out',
        },
        0.2, // Slightly more delay for orchestrated reveal
      )

      // Phase 2: Side cards scale down with 3D depth - keep them clear while visible
      timeline.to(
        [leftCard, rightCard],
        {
          scale: 0.88,
          y: 360,
          rotationY: (_index, target) => (target === leftCard ? -15 : 15),
          z: -40,
          filter: 'blur(0px)', // Keep clear, only blur when fading out
          ease: 'power2.inOut',
        },
        0.45,
      )

      // Heading fade out
      timeline.to(
        heading,
        {
          y: 360,
          opacity: 0,
          ease: 'power2.in',
        },
        0.15,
      )

      // Phase 3: Staged Move & Fade with enhanced depth
      const fadeTargets = [centerCard, leftCard, rightCard]

      // Continuous move with refined easing
      timeline.to(
        fadeTargets,
        {
          y: 240,
          ease: 'power2.out',
        },
        0.6,
      )

      // Fade out with depth-based blur increase - only blur during fade
      timeline.to(
        centerCard,
        {
          autoAlpha: 0,
          scale: 0.95,
          z: -30,
          filter: 'blur(4px)', // Light blur during fade only
          ease: 'power2.in',
        },
        0.6,
      )

      timeline.to(
        [leftCard, rightCard],
        {
          autoAlpha: 0,
          scale: 0.85,
          z: -60,
          filter: 'blur(4px)', // Light blur during fade only
          ease: 'power2.in',
        },
        0.65, // Slight delay for layered fade
      )

      // Phase 4: Macbook Pro spawn-in - appears after cards are completely gone
      if (macbook) {
        const video = macbook.querySelector('video') as HTMLVideoElement

        // Phase 4a: Macbook container spawns in with premium 3D animation
        timeline.to(
          macbook,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            filter: 'blur(0px)',
            ease: 'power3.out',
            duration: 1.2,
          },
          0.85, // Start after cards are 100% faded
        )

        // Phase 4b: Video fades in smoothly after Macbook is fully visible
        // Macbook animation: starts at 0.85, duration 1.2, ends at 2.05
        // Video fade starts right after Macbook completes (2.05) for clean separation
        if (video) {
          // Start video playback slightly before fade-in so it's ready
          timeline.call(
            () => {
              if (video) {
                video.play().catch((error) => {
                  console.warn('Video autoplay failed:', error)
                })
              }
            },
            [],
            1.9, // Start playing video 0.15s before fade-in (prepares for smooth reveal)
          )

          // Smooth video fade-in with subtle zoom-out effect (premium reveal)
          timeline.to(
            video,
            {
              opacity: 1,
              scale: 1, // Zoom out from 1.05 to 1.0
              ease: 'power2.out',
              duration: 0.9,
            },
            2.05, // Start right after Macbook animation completes
          )
        }
      }

      timelineRef.current = timeline
    },
    { scope: sectionRef, dependencies: [pin] },
  )

  return (
    <section ref={sectionRef} className="relative min-h-[300vh]">
      {/* Background texture - removed parallax to prevent conflicts */}
      <div
        className="pointer-events-none absolute inset-0 bg-grain opacity-[0.06]"
        aria-hidden="true"
      />
      <div className="sticky top-[-12vh] flex h-screen flex-col items-center justify-start overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
        <div className="relative mt-6 flex w-full flex-col items-center gap-6 md:mt-10 md:grid md:max-w-6xl md:grid-cols-3 md:gap-10">
          {cards.map((card, index) => {
            // Enhanced CSS classes with 3D transform hints
            const baseClasses =
              'glass-card will-change-transform will-change-opacity flex h-[440px] w-full max-w-sm flex-col items-center justify-center gap-5 p-8 text-center transition-transform duration-300'
            
            // Preserve 3D transforms for enhanced depth
            const transformStyle = {
              transformStyle: 'preserve-3d' as const,
              backfaceVisibility: 'hidden' as const,
              perspective: 1000,
            }

            const roleClasses: Record<CardRole, string> = {
              center: 'md:col-start-2 md:col-end-3 md:row-start-1 md:self-start',
              left: 'md:col-start-1 md:col-end-2 md:row-start-1 md:justify-self-end md:opacity-0',
              right: 'md:col-start-3 md:col-end-4 md:row-start-1 md:justify-self-start md:opacity-0',
            }

            // Remove parallax from cards as it conflicts with ScrollTrigger animations
            // Parallax is handled by GSAP animations, not data-speed attributes
            
            return (
              <div
                key={card.role}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                data-role={card.role}
                className={`${baseClasses} ${roleClasses[card.role]}`}
                style={
                  card.role === 'center'
                    ? {
                        boxShadow:
                          '0 42px 120px rgba(206, 168, 116, 0.32), 0 18px 40px rgba(255, 214, 170, 0.24)',
                        ...transformStyle,
                      }
                    : transformStyle
                }
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

        {/* Heading - removed parallax to prevent text glitches, GSAP handles animation */}
        <div
          ref={headingRef}
          className="mt-auto w-full max-w-3xl text-center pb-6 md:pb-12"
        >
          <h2 className="font-display text-4xl text-porcelain sm:text-5xl md:text-6xl">
            Time converges where precision finds its counterpart.
          </h2>
        </div>

        {/* Macbook Pro - appears after cards disappear */}
        <div
          ref={macbookRef}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-full max-w-4xl">
            <MacbookPro
              width={650}
              height={400}
              videoSrc={watchVideo}
              className="w-full h-auto max-w-full"
              style={{
                color: '#05060A', // Night color for screen background
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroCardsSection