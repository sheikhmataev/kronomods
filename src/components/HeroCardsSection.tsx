import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MacbookPro } from '@/components/ui/macbook-pro'
import { ImageAutoSlider } from '@/components/ui/image-auto-slider'
import { ContactSection } from '@/components/ui/contact-section'
import { Footer } from '@/components/Footer'
import watchVideo from '@/assets/Videos/watch.mp4'
import watch1Image from '@/assets/watch1/watch1.png'
import watch2Image from '@/assets/watch2/watch2.jpg'
import watch3Image from '@/assets/watch3/watch3.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Disable lag compensation — prevents GSAP from trying to "catch up" after
// a missed frame, which is the primary cause of visible animation jumps.
gsap.ticker.lagSmoothing(0)
// Force GPU compositing layer on every animated element globally.
gsap.config({ force3D: true })

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
  image: string
}

const cards: CardConfig[] = [
  {
    role: 'center',
    title: 'Chrono Apex',
    subtitle: 'Flagship tourbillon · 120h reserve',
    accent: 'KA',
    image: watch1Image,
  },
  {
    role: 'left',
    title: 'Obsidian GMT',
    subtitle: 'Dual timezone · Meteorite dial',
    accent: 'KG',
    image: watch2Image,
  },
  {
    role: 'right',
    title: 'Eclipse No. 8',
    subtitle: 'Skeleton calibre · Night lume',
    accent: 'KE',
    image: watch3Image,
  },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches


// Safari-specific video autoplay helper with user interaction detection
const attemptVideoPlay = async (video: HTMLVideoElement): Promise<boolean> => {
  if (!video) return false
  
  try {
    // Ensure video is muted (required for autoplay in Safari)
    video.muted = true
    
    // Ensure video is loaded and ready
    if (video.readyState < 2) {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          video.removeEventListener('canplay', handleCanPlay)
          video.removeEventListener('error', handleError)
          reject(new Error('Video load timeout'))
        }, 5000) // 5 second timeout
        
        const handleCanPlay = () => {
          clearTimeout(timeout)
          video.removeEventListener('canplay', handleCanPlay)
          video.removeEventListener('error', handleError)
          resolve(true)
        }
        const handleError = () => {
          clearTimeout(timeout)
          video.removeEventListener('canplay', handleCanPlay)
          video.removeEventListener('error', handleError)
          reject(new Error('Video load failed'))
        }
        video.addEventListener('canplay', handleCanPlay)
        video.addEventListener('error', handleError)
        
        // Start loading if not already
        if (video.readyState < 1) {
          video.load()
        }
      })
    }
    
    // Attempt to play with user interaction context
    const playPromise = video.play()
    if (playPromise !== undefined) {
      await playPromise
      return true
    }
    return false
  } catch (error) {
    console.warn('Video autoplay failed:', error)
    return false
  }
}

// Global user interaction tracking
let hasUserInteracted = false

// Setup user interaction listeners
const setupUserInteractionTracking = () => {
  if (typeof window === 'undefined' || hasUserInteracted) return
  
  const interactionEvents = ['click', 'touch', 'keydown', 'mousedown', 'pointerdown']
  
  const handleInteraction = () => {
    hasUserInteracted = true
    interactionEvents.forEach(event => {
      document.removeEventListener(event, handleInteraction)
    })
  }
  
  interactionEvents.forEach(event => {
    document.addEventListener(event, handleInteraction, { once: true, passive: true })
  })
}

// Detect Safari browser
const isSafari = () => {
  return typeof window !== 'undefined' && 
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

const HeroCardsSection = ({ pin = true }: HeroCardsSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])
  const headingRef = useRef<HTMLDivElement | null>(null)
  const macbookRef = useRef<HTMLDivElement | null>(null)
  const backgroundRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const imageSliderRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)
  const scrollBackCleanupRef = useRef<(() => void) | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const videoPlayAttemptedRef = useRef(false)

  // Setup user interaction tracking on mount
  useGSAP(() => {
    setupUserInteractionTracking()
  }, [])

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) {
        return
      }

      const heading = headingRef.current
      const macbook = macbookRef.current
      const background = backgroundRef.current
      const container = containerRef.current
      const imageSlider = imageSliderRef.current
      const contact = contactRef.current
      const mm = gsap.matchMedia()

      const killTimeline = () => {
        if (timelineRef.current) {
          timelineRef.current.kill()
          timelineRef.current = null
        }
      }

      const shouldReduceMotion = prefersReducedMotion()

      if (shouldReduceMotion) {
        cardsRef.current.forEach((card) => {
          if (!card) return
          card.style.opacity = '1'
          card.style.transform = 'none'
          card.style.willChange = 'auto'
        })
        if (heading) {
          heading.style.opacity = '0'
          const viewportWidth = window.innerWidth
          const isMobile = viewportWidth < 640
          const isTablet = viewportWidth >= 640 && viewportWidth < 1024
          const headingY = isMobile ? 80 : isTablet ? 120 : 160
          heading.style.transform = `translate3d(0, ${headingY}px, 0)`
          heading.style.willChange = 'auto'
        }
        if (macbook) {
          macbook.style.opacity = '1'
          macbook.style.transform = 'none'
          macbook.style.willChange = 'auto'
          const video = macbook.querySelector('video') as HTMLVideoElement
          if (video) {
            video.style.opacity = '1'
            // Safari-specific handling with immediate play attempt
            if (isSafari()) {
              // For Safari, try to play immediately on reduced motion if user has interacted
              if (hasUserInteracted) {
                attemptVideoPlay(video)
              }
            } else {
              video.play().catch((error) => {
                console.warn('Video autoplay failed:', error)
              })
            }
          }
        }
        if (imageSlider) {
          imageSlider.style.opacity = '1'
          imageSlider.style.transform = 'none'
        }
        if (contact) {
          contact.style.opacity = '1'
          contact.style.transform = 'none'
          contact.style.visibility = 'visible'
        }
        return () => {
          killTimeline()
          mm.revert()
        }
      }

      const getCardByRole = (role: CardRole) =>
        cardsRef.current.find((card) => card?.dataset.role === role) ?? null

      const primeLayersForSafari = () => {
        const cardTargets = cardsRef.current.filter(Boolean)
        // Only use preserve-3d on desktop — on mobile it forces expensive
        // 3D compositing layers that cause jitter and frame drops.
        const isDesktop = window.innerWidth >= 1024
        if (cardTargets.length) {
          gsap.set(cardTargets, {
            willChange: 'transform, opacity',
            zIndex: (index) => 30 - index,
            force3D: true,
            ...(isDesktop ? { transformStyle: 'preserve-3d' } : {}),
          })
        }
        if (heading) {
          gsap.set(heading, { willChange: 'transform, opacity', zIndex: 40, force3D: true })
        }
        if (macbook) {
          gsap.set(macbook, { willChange: 'transform, opacity, filter', zIndex: 35, force3D: true })
        }
        if (imageSlider) {
          gsap.set(imageSlider, { willChange: 'transform, opacity', zIndex: 45, force3D: true })
        }
        if (contact) {
          gsap.set(contact, { willChange: 'transform, opacity', zIndex: 50, force3D: true })
        }
      }

      primeLayersForSafari()

      mm.add('(min-width: 1024px)', () => {
        killTimeline()

        const centerCard = getCardByRole('center')
        const leftCard = getCardByRole('left')
        const rightCard = getCardByRole('right')

        if (!centerCard || !leftCard || !rightCard || !heading) {
          return
        }

        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const aspectRatio = viewportWidth / viewportHeight
        const isMobile = viewportWidth < 640
        const isTablet = viewportWidth >= 640 && viewportWidth < 1024
        const isUltraWide = aspectRatio > 2.1

        const getResponsiveY = (mobile: number, tablet: number, desktop: number) => {
          if (isMobile) return mobile
          if (isTablet) return tablet
          return desktop
        }

        const getResponsiveScale = (mobile: number, tablet: number, desktop: number) => {
          if (isMobile) return mobile
          if (isTablet) return tablet
          return desktop
        }

        gsap.set(centerCard, {
          transformOrigin: 'center center',
          y: getResponsiveY(20, 160, 200),
          scale: getResponsiveScale(1.2, 1.3, 1.45),
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          z: 10,
          filter: 'blur(0px)',
          force3D: true,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        })

        gsap.set(leftCard, {
          transformOrigin: 'center center',
          xPercent: -120,
          y: getResponsiveY(20, 160, 200),
          scale: getResponsiveScale(0.7, 0.75, 0.8),
          opacity: 0,
          rotationY: -25,
          rotationX: 5,
          z: -50,
          filter: 'blur(0px)',
          force3D: true,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        })

        gsap.set(rightCard, {
          transformOrigin: 'center center',
          xPercent: 120,
          y: getResponsiveY(20, 160, 200),
          scale: getResponsiveScale(0.7, 0.75, 0.8),
          opacity: 0,
          rotationY: 25,
          rotationX: 5,
          z: -50,
          filter: 'blur(0px)',
          force3D: true,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        })

        gsap.set(heading, {
          y: 0,
          opacity: 1,
          force3D: true,
          willChange: 'transform, opacity',
        })

        if (background) {
          gsap.set(background, {
            backgroundColor: '#05060A',
            force3D: true,
          })
        }

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

          const video = macbook.querySelector('video') as HTMLVideoElement
          if (video) {
            gsap.set(video, {
              opacity: 0,
              scale: 1.05,
              force3D: true,
            })
          }
        }

        const timeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            pin,
            anticipatePin: 1,
            // 1.5 gives a buttery trailing feel; 1 is too twitchy on desktop.
            scrub: 1.5,
            // Snap the animation to its final state after a fast flick —
            // prevents the timeline from hanging mid-tween on fast scrolls.
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        })

        timeline
          .to(
            centerCard,
            {
              y: getResponsiveY(180, 230, 280),
              scale: getResponsiveScale(1.1, 1.15, 1.08),
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
              y: getResponsiveY(180, 230, 280),
              scale: getResponsiveScale(1.0, 1.0, 1.0),
              ease: 'power2.inOut',
            },
            0.4,
          )

        timeline.to(
          leftCard,
          {
            xPercent: 0,
            y: getResponsiveY(180, 230, 280),
            scale: getResponsiveScale(0.9, 0.95, 1.02),
            opacity: 1,
            rotationY: -10,
            rotationX: 0,
            z: -20,
            filter: 'blur(0px)',
            ease: 'power3.out',
            duration: 0.5,
          },
          0,
        )

        timeline.to(
          rightCard,
          {
            xPercent: 0,
            y: getResponsiveY(180, 230, 280),
            scale: getResponsiveScale(0.9, 0.95, 1.02),
            opacity: 1,
            rotationY: 10,
            rotationX: 0,
            z: -20,
            filter: 'blur(0px)',
            ease: 'power3.out',
            duration: 0.5,
          },
          0,
        )

        timeline.to(
          [leftCard, rightCard],
          {
            scale: 0.88,
            rotationY: (_index, target) => (target === leftCard ? -15 : 15),
            z: -40,
            filter: 'blur(0px)',
            ease: 'power2.inOut',
            duration: 0.2,
          },
          0.5,
        )

        timeline.to(
          heading,
          {
            y: getResponsiveY(180, 230, 280),
            opacity: 0,
            ease: 'power2.in',
          },
          0.15,
        )

        const fadeTargets = [centerCard, leftCard, rightCard]

        // Exit: cards move UP and fade simultaneously.
        // When scrubbing backward (scroll up), the reverse plays — cards
        // descend back into position from above, which feels natural.
        timeline.to(
          fadeTargets,
          {
            y: getResponsiveY(-60, -80, -100),
            autoAlpha: 0,
            ease: 'power2.inOut',
            duration: 0.55,
          },
          0.85,
        )

        if (background) {
          timeline.to(
            background,
            {
              backgroundColor: '#0B0D12',
              ease: 'power2.inOut',
              duration: 0.65,
            },
            0.3,
          )
        }

        if (macbook) {
          const video = macbook.querySelector('video') as HTMLVideoElement

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
            1.6,
          )

          if (video) {
            timeline.call(
              () => {
                if (video && !videoPlayAttemptedRef.current) {
                  videoPlayAttemptedRef.current = true
                  
                  // Use enhanced video play helper for Safari compatibility
                  if (isSafari() && !hasUserInteracted) {
                    // For Safari without user interaction, add click handler
                    const handleClick = () => {
                      attemptVideoPlay(video).then((success) => {
                        if (success) {
                          gsap.to(video, {
                            opacity: 1,
                            scale: 1,
                            ease: 'power2.out',
                            duration: 1.5,
                          })
                        }
                      })
                      // Remove listener after successful play
                      video.removeEventListener('click', handleClick)
                    }
                    
                    video.addEventListener('click', handleClick)
                    video.style.cursor = 'pointer'
                    
                    // Show video with reduced opacity as cue
                    gsap.to(video, {
                      opacity: 0.5,
                      scale: 1,
                      ease: 'power2.out',
                      duration: 1.5,
                    })
                  } else {
                    // Normal autoplay attempt
                    attemptVideoPlay(video).then((success) => {
                      if (success) {
                        gsap.to(video, {
                          opacity: 1,
                          scale: 1,
                          ease: 'power2.out',
                          duration: 1.5,
                        })
                      } else {
                        // Fallback: show video even if play failed
                        gsap.to(video, {
                          opacity: 0.7,
                          scale: 1,
                          ease: 'power2.out',
                          duration: 1.5,
                        })
                      }
                    })
                  }
                }
              },
              [],
              2.8,
            )
          }
        }

        if (macbook && container && background) {
          const video = macbook.querySelector('video') as HTMLVideoElement
          if (!video) {
            return
          }

          const containerRect = container.getBoundingClientRect()
          const macbookRect = macbook.getBoundingClientRect()

          const getResponsiveFocusX = () => {
            if (isMobile) return 0.35
            if (isTablet) return 0.4
            return 0.45
          }

          const getResponsiveFocusY = () => {
            if (isMobile) {
              if (isUltraWide) return 0.3
              return 0.35
            }
            if (isTablet) return 0.4
            return 0.45
          }

          const focusX = getResponsiveFocusX()
          const focusY = getResponsiveFocusY()

          const screenFocusXInMacbook = (74.52 + 501.22 * focusX) / 650
          const screenFocusYInMacbook = (21.32 + 323.85 * focusY) / 400

          const macbookXInContainer = macbookRect.left - containerRect.left
          const macbookYInContainer = macbookRect.top - containerRect.top

          const screenFocusXInContainer = macbookXInContainer + macbookRect.width * screenFocusXInMacbook
          const screenFocusYInContainer = macbookYInContainer + macbookRect.height * screenFocusYInMacbook

          const containerCenterX = containerRect.width / 2
          const containerCenterY = containerRect.height / 2

          const screenXFromCenter = screenFocusXInContainer - containerCenterX
          const screenYFromCenter = screenFocusYInContainer - containerCenterY

          gsap.set(container, {
            transformOrigin: 'center center',
            x: 0,
            y: 0,
            scale: 1,
            force3D: true,
          })

          const scale4 = isMobile ? (isUltraWide ? 2.5 : 3) : isTablet ? 4 : 4
          timeline.to(
            container,
            {
              scale: scale4,
              x: -screenXFromCenter * scale4,
              y: -screenYFromCenter * scale4,
              ease: 'power1.inOut',
              duration: 1.4,
            },
            2.5,
          )

          const scale6 = isMobile ? (isUltraWide ? 4 : 5) : isTablet ? 6 : 6
          timeline.to(
            container,
            {
              scale: scale6,
              x: -screenXFromCenter * scale6,
              y: -screenYFromCenter * scale6,
              ease: 'power1.inOut',
              duration: 1.2,
            },
            3.8,
          )

          const scale10 = isMobile ? (isUltraWide ? 6 : 8) : isTablet ? 10 : 10
          timeline.to(
            container,
            {
              scale: scale10,
              x: -screenXFromCenter * scale10,
              y: -screenYFromCenter * scale10,
              ease: 'power1.inOut',
              duration: 1.0,
            },
            5.1,
          )

          timeline.to(
            background,
            {
              backgroundColor: '#5F5A56',
              ease: 'power1.inOut',
              duration: 2.0,
            },
            2.5,
          )

          timeline.to(
            macbook,
            {
              opacity: 0.3,
              ease: 'power1.inOut',
              duration: 1.2,
            },
            4.3,
          )

          timeline.to(
            macbook,
            {
              opacity: 0,
              ease: 'power1.inOut',
              duration: 1.0,
            },
            5.3,
          )

          timeline.to(
            video,
            {
              scale: 1.2,
              ease: 'power1.inOut',
              duration: 2.0,
            },
            2.5,
          )

          timeline.to(
            container,
            {
              scale: 1,
              x: 0,
              y: 0,
              ease: 'power2.out',
              duration: 1.5,
            },
            6.1,
          )

          timeline.to(
            video,
            {
              scale: 1,
              ease: 'power2.out',
              duration: 1.5,
            },
            6.1,
          )
        }

        const imageSliderTarget = imageSliderRef.current
        if (imageSliderTarget) {
          gsap.set(imageSliderTarget, {
            opacity: 0,
            y: 100,
            scale: 0.95,
            force3D: true,
          })

          timeline.to(
            imageSliderTarget,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: 'power2.out',
              duration: 1.5,
            },
            7.5,
          )
        }

        const contactTarget = contactRef.current
        if (contactTarget) {
          gsap.set(contactTarget, {
            // autoAlpha toggles both opacity + visibility.
            // visibility:hidden prevents the hidden absolute layer from capturing clicks.
            autoAlpha: 0,
            y: 50,
            force3D: true,
          })

          const contactStart = imageSliderTarget ? 10.2 : 8.0

          if (imageSliderTarget) {
            timeline.to(
              imageSliderTarget,
              {
                opacity: 0,
                y: -50,
                ease: 'power2.in',
                duration: 1.0,
              },
              10.0,
            )
          }

          timeline.to(
            contactTarget,
            {
              autoAlpha: 1,
              y: 0,
              ease: 'linear',
              duration: 1.5,
              onStart: () => {
                contactTarget.style.pointerEvents = 'auto'
                const scrollContainer = contactTarget.querySelector('div')
                if (scrollContainer) {
                  scrollContainer.style.pointerEvents = 'auto'
                }
                // ⚠️ CRITICAL iOS FIX — DO NOT REMOVE ⚠️
                // normalizeScroll attaches a non-passive touchmove listener on
                // <document> that calls preventDefault() on EVERY touch event.
                // This kills native overflow-y scrolling inside our fixed portal
                // on real iPhones/iPads (desktop simulation does NOT reproduce this).
                // Disabling it here is the ONLY way to allow touch-scrolling the
                // contact form on iOS Safari, Samsung Internet, and all mobile browsers.
                // It is re-enabled in onReverseComplete below.
                ScrollTrigger.normalizeScroll(false)
                document.body.style.overflow = 'hidden'
                const header = document.querySelector('header')
                if (header) (header as HTMLElement).style.display = 'none'

                // "Scroll-back" feature: when user is at the top of the
                // contact overlay and scrolls/swipes up again, hand control
                // back to the GSAP timeline so they can return to earlier sections.
                if (scrollContainer) {
                  const dismissContact = () => {
                    contactTarget.style.pointerEvents = 'none'
                    scrollContainer.style.pointerEvents = 'none'
                    scrollContainer.scrollTop = 0
                    // ⚠️ CRITICAL iOS FIX — DO NOT REMOVE
                    ScrollTrigger.normalizeScroll(true)
                    document.body.style.overflow = ''
                    if (header) (header as HTMLElement).style.display = ''
                    // Jump back half a viewport so GSAP's scrub timeline
                    // starts reversing. We use the ScrollTrigger instance
                    // attached to our own timeline (accessible via timelineRef)
                    // so GSAP recalculates immediately on the same frame.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const st = (timelineRef.current as any)?.scrollTrigger
                    const currentPos: number = st ? st.scroll() : window.scrollY
                    const target = Math.max(0, currentPos - Math.round(window.innerHeight * 0.5))
                    if (st) {
                      st.scroll(target)
                    } else {
                      window.scrollTo({ top: target, behavior: 'instant' as ScrollBehavior })
                    }
                    cleanup()
                  }

                  let touchStartY = 0

                  const onTouchStart = (e: TouchEvent) => {
                    touchStartY = e.touches[0].clientY
                  }

                  const onTouchMove = (e: TouchEvent) => {
                    // scrollTop can be a sub-pixel float on some browsers
                    if (scrollContainer.scrollTop < 1) {
                      const deltaY = e.touches[0].clientY - touchStartY
                      // Finger moves DOWN (positive deltaY) = swiping up = go back
                      if (deltaY > 20) {
                        dismissContact()
                      }
                    }
                  }

                  const onWheel = (e: WheelEvent) => {
                    if (scrollContainer.scrollTop < 1 && e.deltaY < 0) {
                      dismissContact()
                    }
                  }

                  scrollContainer.addEventListener('touchstart', onTouchStart, { passive: true })
                  scrollContainer.addEventListener('touchmove', onTouchMove, { passive: true })
                  scrollContainer.addEventListener('wheel', onWheel, { passive: true })

                  const cleanup = () => {
                    scrollContainer.removeEventListener('touchstart', onTouchStart)
                    scrollContainer.removeEventListener('touchmove', onTouchMove)
                    scrollContainer.removeEventListener('wheel', onWheel)
                    scrollBackCleanupRef.current = null
                  }
                  scrollBackCleanupRef.current = cleanup
                }
              },
              onReverseComplete: () => {
                // Clean up scroll-back listeners if still attached
                if (scrollBackCleanupRef.current) scrollBackCleanupRef.current()
                contactTarget.style.pointerEvents = 'none'
                const scrollContainer = contactTarget.querySelector('div')
                if (scrollContainer) {
                  scrollContainer.style.pointerEvents = 'none'
                  scrollContainer.scrollTop = 0
                }
                // ⚠️ CRITICAL iOS FIX — DO NOT REMOVE — re-enable normalizeScroll
                // that was disabled in onStart above (see comment there).
                ScrollTrigger.normalizeScroll(true)
                document.body.style.overflow = ''
                const header = document.querySelector('header')
                if (header) (header as HTMLElement).style.display = ''
              },
            },
            contactStart,
          )
        }

        timelineRef.current = timeline

        return () => killTimeline()
      })

      mm.add('(max-width: 1023px)', () => {
        killTimeline()

        const centerCard = getCardByRole('center')
        const leftCard = getCardByRole('left')
        const rightCard = getCardByRole('right')

        if (!centerCard || !leftCard || !rightCard) return
        if (!heading || !macbook || !container) return

        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const isUltraWide = viewportWidth / viewportHeight > 2.1

        if (background) gsap.set(background, { backgroundColor: '#05060A', force3D: true })

        // ✅ Initial state: ONLY center visible & big (no scroll required)
        // Mobile: pure 2D transforms only — rotationX/Y/z and preserve-3d
        // force full 3D compositing layers which cause GPU jitter on phones.
        gsap.set(centerCard, {
          transformOrigin: 'center center',
          y: 0,
          scale: 1.25,
          opacity: 1,
          force3D: true,
          willChange: 'transform, opacity',
        })

        gsap.set(leftCard, {
          transformOrigin: 'center center',
          xPercent: -140,
          y: 0,
          scale: 0.82,
          opacity: 0,
          force3D: true,
          willChange: 'transform, opacity',
        })

        gsap.set(rightCard, {
          transformOrigin: 'center center',
          xPercent: 140,
          y: 0,
          scale: 0.82,
          opacity: 0,
          force3D: true,
          willChange: 'transform, opacity',
        })

        gsap.set(heading, {
          opacity: 1,
          y: 0,
          force3D: true,
          willChange: 'transform, opacity',
        })

        gsap.set(container, {
          transformOrigin: 'center center',
          x: 0,
          y: 0,
          scale: 1,
          force3D: true,
        })

        gsap.set(macbook, {
          opacity: 0,
          scale: 0.9,
          y: 80,
          // No blur on mobile — filter animations are extremely expensive
          // on mobile GPUs and are the primary cause of frame drops.
          force3D: true,
          willChange: 'transform, opacity',
        })

        const video = macbook.querySelector('video') as HTMLVideoElement
        if (video) gsap.set(video, { opacity: 0, scale: 1.04, force3D: true })

        const timeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            pin,
            anticipatePin: 1,
            // 0.8 on mobile: tighter than desktop so touch scrolling feels
            // responsive, but enough damping to kill jitter from scroll events.
            scrub: 0.8,
            // Snaps to final state after fast swipe — prevents mid-tween hangs.
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        })

        // ✅ Phase 1 — pure 2D on mobile, no rotationX/Y/z
        timeline
          .to(
            centerCard,
            {
              scale: 1.0,
              y: 0,
              duration: 0.55,
              ease: 'power3.out',
            },
            0,
          )
          .to(
            heading,
            {
              y: 90,
              opacity: 0,
              duration: 0.45,
              ease: 'power2.in',
            },
            0.1,
          )
          .to(
            leftCard,
            {
              xPercent: 0,
              opacity: 1,
              scale: 0.92,
              duration: 0.55,
              ease: 'power3.out',
            },
            0,
          )
          .to(
            rightCard,
            {
              xPercent: 0,
              opacity: 1,
              scale: 0.92,
              duration: 0.55,
              ease: 'power3.out',
            },
            0,
          )
          .to(
            [leftCard, rightCard],
            {
              scale: 0.88,
              duration: 0.25,
              ease: 'power2.inOut',
            },
            0.55,
          )

        // ✅ Phase 2: cards move UP and fade simultaneously.
        // Reversing this (scroll up) makes cards descend back in from above.
        const fadeTargets = [centerCard, leftCard, rightCard]
        timeline.to(
          fadeTargets,
          { y: -80, autoAlpha: 0, duration: 0.45, ease: 'power2.inOut' },
          0.9,
        )

        // Background color transition
        timeline.to(
          background,
          { backgroundColor: '#0B0D12', duration: 0.6, ease: 'power2.inOut' },
          1.4,
        )

        // MacBook appearance — no blur animation on mobile
        timeline.to(
          macbook,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          1.8,
        )

        // Video appearance with Safari handling
        if (video) {
          timeline.to(
            video,
            {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'power2.out',
              onStart: () => {
                // Enhanced video play for Safari compatibility
                if (isSafari() && !hasUserInteracted) {
                  // Add click handler for Safari without user interaction
                  const handleClick = () => {
                    attemptVideoPlay(video)
                    video.removeEventListener('click', handleClick)
                    video.style.cursor = 'default'
                  }
                  video.addEventListener('click', handleClick)
                  video.style.cursor = 'pointer'
                } else {
                  attemptVideoPlay(video).then((success) => {
                    if (!success) {
                      console.warn('Mobile video autoplay failed, video will be visible but paused')
                    }
                  })
                }
              },
            },
            2.4,
          )
        }

        const containerRect = container.getBoundingClientRect()
        const macbookRect = macbook.getBoundingClientRect()

        const getResponsiveFocusX = () => 0.36
        const getResponsiveFocusY = () => (isUltraWide ? 0.28 : 0.32)

        const focusX = getResponsiveFocusX()
        const focusY = getResponsiveFocusY()

        const screenFocusXInMacbook = (74.52 + 501.22 * focusX) / 650
        const screenFocusYInMacbook = (21.32 + 323.85 * focusY) / 400

        const macbookXInContainer = macbookRect.left - containerRect.left
        const macbookYInContainer = macbookRect.top - containerRect.top

        const screenFocusXInContainer = macbookXInContainer + macbookRect.width * screenFocusXInMacbook
        const screenFocusYInContainer = macbookYInContainer + macbookRect.height * screenFocusYInMacbook

        const containerCenterX = containerRect.width / 2
        const containerCenterY = containerRect.height / 2

        const screenXFromCenter = screenFocusXInContainer - containerCenterX
        const screenYFromCenter = screenFocusYInContainer - containerCenterY

        const midZoom = Math.min(5.2, Math.max(3.6, viewportHeight / (macbookRect.height * 0.45)))
        const deepZoom = midZoom + 0.9
        const finalZoom = deepZoom + 0.7

        timeline.to(
          container,
          {
            scale: midZoom,
            x: -screenXFromCenter * midZoom,
            y: -screenYFromCenter * midZoom,
            ease: 'power1.inOut',
            duration: 1.1,
          },
          2.6,
        )

        timeline.to(
          container,
          {
            scale: deepZoom,
            x: -screenXFromCenter * deepZoom,
            y: -screenYFromCenter * deepZoom,
            ease: 'power1.inOut',
            duration: 1.1,
          },
          3.8,
        )

        timeline.to(
          container,
          {
            scale: finalZoom,
            x: -screenXFromCenter * finalZoom,
            y: -screenYFromCenter * finalZoom,
            ease: 'power1.inOut',
            duration: 1.0,
          },
          4.9,
        )

        if (video) {
          timeline.to(
            video,
            {
              scale: 1.1,
              ease: 'power1.inOut',
              duration: 1.6,
            },
            2.6,
          )
        }

        if (background) {
          timeline.to(
            background,
            {
              backgroundColor: '#5F5A56',
              ease: 'power1.inOut',
              duration: 1.6,
            },
            2.6,
          )
        }

        timeline.to(
          macbook,
          {
            opacity: 0.35,
            duration: 1.0,
            ease: 'power1.inOut',
          },
          4.2,
        )

        timeline.to(
          macbook,
          {
            opacity: 0,
            duration: 0.9,
            ease: 'power1.inOut',
          },
          5.1,
        )

        timeline.to(
          container,
          {
            scale: 1,
            x: 0,
            y: 0,
            ease: 'power2.out',
            duration: 1.2,
          },
          5.9,
        )

        if (video) {
          timeline.to(
            video,
            {
              scale: 1,
              ease: 'power2.out',
              duration: 1.0,
            },
            5.9,
          )
        }

        const imageSliderTarget = imageSliderRef.current
        if (imageSliderTarget) {
          gsap.set(imageSliderTarget, { opacity: 0, y: 60, scale: 0.98, force3D: true })

          timeline.to(
            imageSliderTarget,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: 'power2.out',
            },
            7.0,
          )
        }

        const contactTarget = contactRef.current
        if (contactTarget) {
  gsap.set(contactTarget, { autoAlpha: 0, y: 40, force3D: true })

          const contactStart = imageSliderTarget ? 9.2 : 7.8

          if (imageSliderTarget) {
            timeline.to(
              imageSliderTarget,
              {
                opacity: 0,
                y: -40,
                ease: 'power2.in',
                duration: 0.8,
              },
              9.0,
            )
          }

          timeline.to(
            contactTarget,
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.0,
              ease: 'power1.out',
              onStart: () => {
                contactTarget.style.pointerEvents = 'auto'
                const scrollContainer = contactTarget.querySelector('div')
                if (scrollContainer) {
                  scrollContainer.style.pointerEvents = 'auto'
                }
                // ⚠️ CRITICAL iOS FIX — DO NOT REMOVE ⚠️
                // normalizeScroll attaches a non-passive touchmove listener on
                // <document> that calls preventDefault() on EVERY touch event.
                // This kills native overflow-y scrolling inside our fixed portal
                // on real iPhones/iPads (desktop simulation does NOT reproduce this).
                // Disabling it here is the ONLY way to allow touch-scrolling the
                // contact form on iOS Safari, Samsung Internet, and all mobile browsers.
                // It is re-enabled in onReverseComplete below.
                ScrollTrigger.normalizeScroll(false)
                document.body.style.overflow = 'hidden'
                const header = document.querySelector('header')
                if (header) (header as HTMLElement).style.display = 'none'

                // "Scroll-back" feature: when user is at the top of the
                // contact overlay and scrolls/swipes up again, hand control
                // back to the GSAP timeline so they can return to earlier sections.
                if (scrollContainer) {
                  const dismissContact = () => {
                    contactTarget.style.pointerEvents = 'none'
                    scrollContainer.style.pointerEvents = 'none'
                    scrollContainer.scrollTop = 0
                    // ⚠️ CRITICAL iOS FIX — DO NOT REMOVE
                    ScrollTrigger.normalizeScroll(true)
                    document.body.style.overflow = ''
                    if (header) (header as HTMLElement).style.display = ''
                    // Jump back half a viewport so GSAP's scrub timeline
                    // starts reversing. We use the ScrollTrigger instance
                    // attached to our own timeline (accessible via timelineRef)
                    // so GSAP recalculates immediately on the same frame.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const st = (timelineRef.current as any)?.scrollTrigger
                    const currentPos: number = st ? st.scroll() : window.scrollY
                    const target = Math.max(0, currentPos - Math.round(window.innerHeight * 0.5))
                    if (st) {
                      st.scroll(target)
                    } else {
                      window.scrollTo({ top: target, behavior: 'instant' as ScrollBehavior })
                    }
                    cleanup()
                  }

                  let touchStartY = 0

                  const onTouchStart = (e: TouchEvent) => {
                    touchStartY = e.touches[0].clientY
                  }

                  const onTouchMove = (e: TouchEvent) => {
                    // scrollTop can be a sub-pixel float on some browsers
                    if (scrollContainer.scrollTop < 1) {
                      const deltaY = e.touches[0].clientY - touchStartY
                      // Finger moves DOWN (positive deltaY) = swiping up = go back
                      if (deltaY > 20) {
                        dismissContact()
                      }
                    }
                  }

                  const onWheel = (e: WheelEvent) => {
                    if (scrollContainer.scrollTop < 1 && e.deltaY < 0) {
                      dismissContact()
                    }
                  }

                  scrollContainer.addEventListener('touchstart', onTouchStart, { passive: true })
                  scrollContainer.addEventListener('touchmove', onTouchMove, { passive: true })
                  scrollContainer.addEventListener('wheel', onWheel, { passive: true })

                  const cleanup = () => {
                    scrollContainer.removeEventListener('touchstart', onTouchStart)
                    scrollContainer.removeEventListener('touchmove', onTouchMove)
                    scrollContainer.removeEventListener('wheel', onWheel)
                    scrollBackCleanupRef.current = null
                  }
                  scrollBackCleanupRef.current = cleanup
                }
              },
              onReverseComplete: () => {
                if (scrollBackCleanupRef.current) scrollBackCleanupRef.current()
                contactTarget.style.pointerEvents = 'none'
                const scrollContainer = contactTarget.querySelector('div')
                if (scrollContainer) {
                  scrollContainer.style.pointerEvents = 'none'
                  scrollContainer.scrollTop = 0
                }
                // ⚠️ CRITICAL iOS FIX — DO NOT REMOVE — re-enable normalizeScroll
                // that was disabled in onStart above (see comment there).
                ScrollTrigger.normalizeScroll(true)
                document.body.style.overflow = ''
                const header = document.querySelector('header')
                if (header) (header as HTMLElement).style.display = ''
              },
            },
            contactStart,
          )
        }

        timelineRef.current = timeline

        return () => killTimeline()
      })

      return () => {
        killTimeline()
        mm.revert()
      }
    },
    { scope: sectionRef, dependencies: [pin] },
  )

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      {/* Animated background color layer */}
      <div
        ref={backgroundRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundColor: '#05060A', // Initial night color
          transition: 'background-color 0.3s ease', // Fallback for reduced motion
        }}
      />
      {/* Background texture - removed parallax to prevent conflicts */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-grain opacity-[0.06]"
        aria-hidden="true"
      />
      <div 
        ref={containerRef}
        className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden px-2 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-12 sm:pb-12 lg:pt-16 lg:pb-16"
      >
        <div className="relative grid w-full grid-cols-3 lg:grid-cols-3 content-center items-center gap-2 sm:gap-6 md:max-w-6xl md:gap-8 lg:gap-10 grow md:grow-0">
          {cards.map((card, index) => {
            // Enhanced CSS classes with 3D transform hints
            const baseClasses =
              'glass-card will-change-transform will-change-opacity flex h-[150px] min-[400px]:h-[170px] sm:h-[320px] md:h-[380px] lg:h-[420px] w-full overflow-hidden transition-transform duration-300'
            
            // Preserve 3D transforms for enhanced depth
            const transformStyle = {
              transformStyle: 'preserve-3d' as const,
              backfaceVisibility: 'hidden' as const,
              perspective: 1000,
            }

            const roleClasses: Record<CardRole, string> = {
              // Mobile: explicitly place in columns 1/2/3
              // Desktop: keep your existing LG placement
              left:   'col-span-1 col-start-1 row-start-1 lg:col-start-1 lg:col-end-2 lg:justify-self-end lg:opacity-0',
              center: 'col-span-1 col-start-2 row-start-1 lg:col-start-2 lg:col-end-3 self-start z-10',
              right:  'col-span-1 col-start-3 row-start-1 lg:col-start-3 lg:col-end-4 lg:justify-self-start lg:opacity-0',
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
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          })}
        </div>

        {/* Heading - removed parallax to prevent text glitches, GSAP handles animation */}
        <div
          ref={headingRef}
          className="w-full max-w-3xl text-center pt-0 sm:pt-0 md:pt-64 lg:pt-80 pb-16 sm:pb-20 md:pb-20 lg:pb-24"
        >
          <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white sm:text-porcelain">
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

        {/* Image Auto Slider - appears after zoom completes */}
        <div
          ref={imageSliderRef}
          className="absolute inset-0 z-40 pointer-events-none"
        >
          <ImageAutoSlider className="pointer-events-auto" />
        </div>

        {/* Contact Section - appears after image slider */}
        {typeof document !== 'undefined' &&
          createPortal(
            <div
              ref={contactRef}
              className="contact-portal-container"
              style={{
                backgroundColor: '#5F5A56',
                opacity: 0,
                visibility: 'hidden',
                transform: 'translateY(50px)',
                pointerEvents: 'none',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                overscrollBehavior: 'contain',
              }}
            >
              <div
                className="h-full w-full overflow-y-auto overflow-x-hidden"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  paddingTop: 'calc(env(safe-area-inset-top) + 16px)',
                  paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)',
                  touchAction: 'pan-y',
                  overscrollBehavior: 'contain',
                  transform: 'translate3d(0,0,0)',
                  outline: 'none',
                }}
              >
                <ContactSection className="pb-2" />
                <div className="h-4 sm:hidden" />
                <Footer />
              </div>
            </div>,
            document.documentElement,
          )
        }
      </div>
    </section>
  )
}

export default HeroCardsSection
