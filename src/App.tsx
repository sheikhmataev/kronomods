import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import logo from './assets/image2.png'
import HeroCardsSection from './components/HeroCardsSection'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP)

const App = () => {
  useGSAP(() => {
    // Create ScrollSmoother for premium smooth scrolling
    // Note: ScrollSmoother is a Club GreenSock plugin that requires a license
    // It will work in development, but you'll need a Club membership for production
    ScrollSmoother.create({
      smooth: 1.2, // Reduced from 1.5 for smoother feel (less lag)
      effects: false, // Disable data-speed effects to prevent conflicts with ScrollTrigger
      smoothTouch: 0.05, // Reduced for better mobile performance
      normalizeScroll: true, // Normalize scroll across devices
      ignoreMobileResize: true, // Prevent recalculations on mobile resize
    })
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-night text-porcelain">
      {/* ScrollSmoother wrapper structure */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* Removed data-speed to prevent conflicts with smooth scrolling */}
          <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center p-0 m-0 px-6 sm:px-10 lg:px-16">
            <div className="pointer-events-auto relative p-0 m-0 -top-4 sm:-top-8 lg:-top-20">
              <img
                src={logo}
                className="h-auto w-[200px] object-contain sm:w-[260px] lg:w-[320px]"
                alt="Kronomods"
              />
            </div>
          </header>

          <main className="relative flex flex-col">
            <HeroCardsSection />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App


