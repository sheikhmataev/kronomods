import { useRef } from 'react'
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

const isMobileViewport = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

const HeroCardsSection = ({ pin = true }: HeroCardsSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])
  const headingRef = useRef<HTMLDivElement | null>(null)
  const macbookRef = useRef<HTMLDivElement | null>(null)
  const backgroundRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const imageSliderRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)
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
          // Responsive heading position for reduced motion
          const viewportWidth = window.innerWidth
          const isMobile = viewportWidth < 640
          const isTablet = viewportWidth >= 640 && viewportWidth < 1024
          const headingY = isMobile ? 80 : isTablet ? 120 : 160
          headingRef.current.style.transform = `translate3d(0, ${headingY}px, 0)`
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
        // Show image slider immediately for reduced motion
        if (imageSliderRef.current) {
          imageSliderRef.current.style.opacity = '1'
          imageSliderRef.current.style.transform = 'none'
        }
        // Show contact section immediately for reduced motion
        if (contactRef.current) {
          contactRef.current.style.opacity = '1'
          contactRef.current.style.transform = 'none'
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
      const container = containerRef.current

      if (!centerCard || !leftCard || !rightCard || !heading) {
        return
      }

      // Get viewport width for responsive positioning
      const viewportWidth = window.innerWidth
      const isMobile = viewportWidth < 640
      const isTablet = viewportWidth >= 640 && viewportWidth < 1024
      
      // Responsive Y positions based on device
      const getResponsiveY = (mobile: number, tablet: number, desktop: number) => {
        if (isMobile) return mobile
        if (isTablet) return tablet
        return desktop
      }
      
      // Responsive scales based on device
      const getResponsiveScale = (mobile: number, tablet: number, desktop: number) => {
        if (isMobile) return mobile
        if (isTablet) return tablet
        return desktop
      }

      // Enhanced initial setup with 3D transforms and GPU acceleration
      gsap.set(centerCard, {
        transformOrigin: 'center center',
        y: getResponsiveY(120, 160, 200),
        scale: getResponsiveScale(1.2, 1.3, 1.45),
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
        y: getResponsiveY(120, 160, 200),
        scale: getResponsiveScale(0.7, 0.75, 0.8),
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
        y: getResponsiveY(120, 160, 200),
        scale: getResponsiveScale(0.7, 0.75, 0.8),
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

      // Initialize background for smooth color transition
      const background = backgroundRef.current
      if (background) {
        gsap.set(background, {
          backgroundColor: '#05060A', // Start with night color
          force3D: true,
        })
      }

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
            end: 'bottom bottom', // CHANGED: Matches the exact end of the physical container
            pin,
            anticipatePin: 1,
            scrub: 1, // Higher scrub value = less scroll needed, smoother feel
            invalidateOnRefresh: true,
            refreshPriority: -1, // Refresh after other animations
        },
      })

      // Phase 1: Spawn-in with 3D transforms and staggered timing
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

      // Phase 1b: Side cards animate from sides to center - appear beside center card
      // They need to complete this animation BEFORE moving upward together
      timeline.to(
        leftCard,
        {
          xPercent: 0, // Move from -120 to 0 (beside center)
          y: getResponsiveY(180, 230, 280),
          scale: getResponsiveScale(0.9, 0.95, 1.02),
          opacity: 1,
          rotationY: -10,
          rotationX: 0,
          z: -20,
          filter: 'blur(0px)', // Clear when visible
          ease: 'power3.out',
          duration: 0.5, // Explicit duration for side-to-center animation
        },
        0, // Start at same time as center card spawns
      )

      timeline.to(
        rightCard,
        {
          xPercent: 0, // Move from 120 to 0 (beside center)
          y: getResponsiveY(180, 230, 280),
          scale: getResponsiveScale(0.9, 0.95, 1.02),
          opacity: 1,
          rotationY: 10,
          rotationX: 0,
          z: -20,
          filter: 'blur(0px)', // Clear when visible
          ease: 'power3.out',
          duration: 0.5, // Explicit duration for side-to-center animation
        },
        0, // Start at same time - both side cards animate together
      )

      // Phase 2: Side cards scale down with 3D depth - keep them clear while visible
      // This happens AFTER side cards have moved beside center (at 0.5 when they complete)
      // IMPORTANT: Don't set y here - let it stay at 360 so the upward animation works correctly
      timeline.to(
        [leftCard, rightCard],
        {
          scale: 0.88,
          // DO NOT set y here - keep it at 360 so upward animation works
          rotationY: (_index, target) => (target === leftCard ? -15 : 15),
          z: -40,
          filter: 'blur(0px)', // Keep clear, only blur when fading out
          ease: 'power2.inOut',
          duration: 0.2, // Quick scale down
        },
        0.5, // Start AFTER side cards have finished moving beside center
      )

      // Heading fade out
      timeline.to(
        heading,
        {
          y: getResponsiveY(180, 230, 280),
          opacity: 0,
          ease: 'power2.in',
        },
        0.15,
      )

      // Phase 3: All cards animate up and fade away simultaneously before Macbook spawns
      // This happens AFTER side cards have completed moving beside center (0.5) and scaling (0.7)
      // So we start at 0.7 to ensure all three cards are beside each other first
      const fadeTargets = [centerCard, leftCard, rightCard]

      // 1. ONE continuous move UP (eases "out", starts fast)
      // All cards are currently at responsive Y position, we move them UP to a lower position
      // Using ABSOLUTE positioning to ensure the animation works correctly
      timeline.to(
        fadeTargets,
        {
          y: getResponsiveY(80, 120, 160), // Move UP from current position
          ease: 'power2.out',
          duration: 0.4, // Explicit duration for visible upward movement
        },
        0.7, // Start AFTER side cards have completed their side-to-center animation (0.5) and scale (0.7)
      )

      // 2. The FADE (eases "in", starts slow) - starts after cards are positioned beside center
      // Cards need time to complete their side-to-center movement (0.5) and scale (0.2) = 0.7 total
      // Then give them time to be visible before fading
      timeline.to(
        fadeTargets,
        {
          autoAlpha: 0, // Fade out simultaneously - completely invisible
          ease: 'power2.inOut', // Smoother easing instead of sharp 'in'
          duration: 0.4, // Longer duration for smoother fade
        },
        1.2, // Start much later (was 0.9) to ensure cards reach their positions first
      )

      // Phase 3.5: Smooth background color transition - completes before Macbook spawns
      // Transitions to lighter color so background is already the new color when Macbook appears
      // Starts early and completes smoothly by Macbook spawn time
      if (background) {
        timeline.to(
          background,
          {
            backgroundColor: '#0B0D12', // Transition to obsidian (lighter than night)
            ease: 'power2.inOut',
            duration: 0.65, // Smooth transition that completes by 0.95
          },
          0.3, // Start early during card animations, completes at 0.95 (when Macbook spawns)
        )
      }

      // Phase 4: Macbook Pro spawn-in - appears after cards are completely gone
      // More scroll distance between card fade and Macbook spawn
      if (macbook) {
        const video = macbook.querySelector('video') as HTMLVideoElement

        // Phase 4a: Macbook container spawns in with premium 3D animation
        // Appears after cards have completely faded (starts at 1.6, after fade completes)
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
          1.6, // Start after cards fade (fade starts at 1.2, duration 0.4, completes at 1.6)
        )

        // Phase 4b: Video automatically fades in after Macbook spawns in (not tied to scroll)
        // Video fade-in happens automatically with 1.5s duration after Macbook completes
        if (video) {
          // Trigger video fade-in automatically when Macbook animation completes
          timeline.call(
            () => {
              if (video) {
                // Start video playback immediately
                video.play().catch((error) => {
                  console.warn('Video autoplay failed:', error)
                })

                // Create a separate timeline for video fade-in (not tied to scroll)
                gsap.to(video, {
                  opacity: 1,
                  scale: 1, // Zoom out from 1.05 to 1.0
                  ease: 'power2.out',
                  duration: 1.5, // 1.5 seconds as requested
                  delay: 0, // No delay - starts immediately after Macbook spawns
                })
              }
            },
            [],
            1.6 + 1.2, // Callback fires when Macbook animation completes (1.6 start + 1.2 duration = 2.8)
          )
        }
      }

      // Phase 5: Zoom into Macbook screen (inside the bezels) - makes it feel like entering the screen
      // This happens further in the scroll timeline after video has appeared
      if (macbook && container && background) {
        // Get video element which is directly inside the screen area
        const video = macbook.querySelector('video') as HTMLVideoElement
        
        if (!video) return

        // Get actual positions at runtime for accurate calculation
        // We'll use the video element's position since it's directly in the screen
        const containerRect = container.getBoundingClientRect()
        const macbookRect = macbook.getBoundingClientRect()
        
        // Screen area in SVG: x="74.52" y="21.32" width="501.22" height="323.85"
        // Calculate left side of screen for zoom focus (more to the left)
        // Screen starts at 74.52, we want to focus on left side, slightly more to the left
        const screenLeftFocusXInMacbook = (74.52 + 501.22 * 0.30) / 650 // ~30% into screen from left edge = ~31% from Macbook left
        const screenLeftFocusYInMacbook = (21.32 + 323.85 * 0.5) / 400 // Center vertically (~46% from top)
        
        // Calculate screen left-side focus position relative to container
        // Macbook is centered in container, so we need its position
        const macbookXInContainer = macbookRect.left - containerRect.left
        const macbookYInContainer = macbookRect.top - containerRect.top
        
        // Screen left-side focus position relative to container
        const screenFocusXInContainer = macbookXInContainer + (macbookRect.width * screenLeftFocusXInMacbook)
        const screenFocusYInContainer = macbookYInContainer + (macbookRect.height * screenLeftFocusYInMacbook)
        
        // Container center
        const containerCenterX = containerRect.width / 2
        const containerCenterY = containerRect.height / 2
        
        // Screen left-side focus offset from container center
        const screenXFromCenter = screenFocusXInContainer - containerCenterX
        const screenYFromCenter = screenFocusYInContainer - containerCenterY
        
        // Initialize container for zoom - start centered
        gsap.set(container, {
          transformOrigin: 'center center',
          x: 0,
          y: 0,
          scale: 1,
          force3D: true,
        })

        // Phase 5a: Initial zoom - smooth, fluid zoom into screen area
        // Formula: when zooming from center by scale S, a point at offset P moves to P*S
        // To keep point at center, shift container by -P*S
        // Macbook spawns at 0.95, completes at 2.15, video fades in until ~3.65
        const scale4 = 4
        timeline.to(
          container,
          {
            scale: scale4,
            x: -screenXFromCenter * scale4, // Shift to keep screen focus point in viewport center
            y: -screenYFromCenter * scale4,
            ease: 'power1.inOut', // Smoother easing for fluid motion
            duration: 1.4, // Longer duration for smoother feel
          },
          2.5, // Start further in the timeline (after video has faded in)
        )

        // Phase 5b: Continue zooming deeper - seamless continuation
        const scale6 = 6
        timeline.to(
          container,
          {
            scale: scale6,
            x: -screenXFromCenter * scale6,
            y: -screenYFromCenter * scale6,
            ease: 'power1.inOut', // Smooth, consistent easing
            duration: 1.2, // Longer for smoother transition
          },
          2.5 + 1.3, // Slight overlap for seamless transition
        )

        // Phase 5c: Final deep zoom - ultra-smooth finish
        const scale10 = 10
        timeline.to(
          container,
          {
            scale: scale10,
            x: -screenXFromCenter * scale10,
            y: -screenYFromCenter * scale10,
            ease: 'power1.inOut', // Smooth easing throughout
            duration: 1.0, // Longer duration for premium feel
          },
          2.5 + 2.3, // Seamless continuation
        )

        // Background transitions to screen color (inside Macbook) - synchronized with zoom
        timeline.to(
          background,
          {
            backgroundColor: '#5F5A56', // Background color after zoom - we're inside the Macbook now
            ease: 'power1.inOut', // Smoother easing to match zoom
            duration: 2.0, // Longer duration for smoother, gradual transition
          },
          2.5, // Start with zoom for synchronized effect
        )

        // Fade out Macbook frame edges as we zoom deep into the screen
        // The frame should disappear as we "enter" the screen
        timeline.to(
          macbook,
          {
            opacity: 0.3, // Make frame semi-transparent so screen content shows through
            ease: 'power1.inOut', // Smoother fade for premium feel
            duration: 1.2, // Longer duration for gradual fade
          },
          2.5 + 1.8, // Start fading as we're deep in the zoom
        )

        // Finally, fade out Macbook completely as we're fully inside
        timeline.to(
          macbook,
          {
            opacity: 0, // Completely fade out - we're inside the screen now
            ease: 'power1.inOut', // Smooth, consistent easing
            duration: 1.0, // Longer duration for smooth completion
          },
          2.5 + 2.8, // At the end of zoom sequence
        )

        // Optional: Zoom the video element separately for extra depth
        if (video) {
          timeline.to(
            video,
            {
              scale: 1.2, // Slight additional zoom on video for depth
              ease: 'power1.inOut', // Smoother easing to match overall zoom
              duration: 2.0, // Longer duration for smoother, gradual zoom
            },
            2.5, // Start with Macbook zoom
          )
        }

        // Phase 5d: Zoom out - reset container to normal scale before image slider appears
        // Phase 5c ends at 2.5 + 2.3 + 1.0 = 5.8, so start zoom-out right after
        timeline.to(
          container,
          {
            scale: 1, // Reset to normal scale
            x: 0, // Reset position
            y: 0, // Reset position
            ease: 'power2.out', // Smooth zoom out
            duration: 1.5, // Smooth transition back to normal
          },
          2.5 + 2.3 + 1.0, // Start after Phase 5c completes (2.5 + 2.3 + 1.0 = 5.8)
        )

        // Reset video scale during zoom-out for consistency
        if (video) {
          timeline.to(
            video,
            {
              scale: 1, // Reset video scale to normal
              ease: 'power2.out', // Smooth zoom out
              duration: 1.5, // Match container zoom-out duration
            },
            2.5 + 2.3 + 1.0, // Start same time as container zoom-out
          )
        }
      }

      // Phase 6: Image slider appears after zoom-out completes
      // Zoom-out ends at 5.8 + 1.5 = 7.3, so start image slider around 7.5
      const imageSlider = imageSliderRef.current
      if (imageSlider) {
        // Initialize image slider as hidden
        gsap.set(imageSlider, {
          opacity: 0,
          y: 100,
          scale: 0.95,
          force3D: true,
        })

        // Phase 6a: Image slider fades in smoothly after zoom-out completes
        timeline.to(
          imageSlider,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            duration: 1.5,
          },
          7.5, // Start after zoom-out completes (zoom-out ends at ~7.3)
        )
      }

      // Phase 7: Transition from image slider to contact section
      // Image slider completes at 7.5 + 1.5 = 9.0, add some scroll time before transition
      const contact = contactRef.current
      if (contact) {
        // Initialize contact section as hidden
        gsap.set(contact, {
          opacity: 0,
          y: 50,
          force3D: true,
        })

        // Phase 7a: Fade out image slider and fade in contact section
        // Start transition after image slider has been visible for a while
        timeline.to(
          imageSlider,
          {
            opacity: 0,
            y: -50,
            ease: 'power2.in',
            duration: 1.0,
          },
          10.0, // Start after image slider has been visible (7.5 + 1.5 + 1.0 = 10.0)
        )

        timeline.to(
          contact,
          {
            opacity: 1,
            y: 0,
            ease: 'linear',
            duration: 1.5,
          },
          10.2, // Slight overlap for smooth transition
        )
      }

      timelineRef.current = timeline
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
        className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
      >
        <div className="relative flex w-full flex-col items-center gap-4 sm:gap-6 md:grid md:max-w-6xl md:grid-cols-3 md:gap-8 lg:gap-10">
          {cards.map((card, index) => {
            // Enhanced CSS classes with 3D transform hints
            const baseClasses =
              'glass-card will-change-transform will-change-opacity flex h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] w-full max-w-xs sm:max-w-sm overflow-hidden transition-transform duration-300'
            
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
          className="w-full max-w-3xl text-center pt-8 sm:pt-12 md:pt-64 lg:pt-80 pb-4 sm:pb-6 md:pb-20 lg:pb-24"
        >
          <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-porcelain">
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
        <div
          ref={contactRef}
          className="absolute inset-0 z-50 flex flex-col items-center justify-between pointer-events-none"
        >
          <div className="w-full flex-1 flex flex-col justify-center pointer-events-auto">
            <ContactSection />
          </div>
          <div className="w-full pointer-events-auto">
            <Footer />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroCardsSection