import logo from './assets/image2.png'
import HeroCardsSection from './components/HeroCardsSection'

const App = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-night text-porcelain">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-center px-6 py-4 sm:px-10 lg:px-16">
        <div className="pointer-events-auto flex items-center">
          <img
            src={logo}
            className="h-auto w-[200px] object-contain sm:w-[260px] lg:w-[320px]"
          />
        </div>
      </header>

      <main className="relative flex flex-col">
        <HeroCardsSection />
        <section className="relative z-10 px-6 pb-32 pt-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-display text-3xl text-champagne sm:text-4xl">
              Bespoke configurations available upon private consultation.
            </p>
            <p className="mt-6 text-base text-porcelain/70 sm:text-lg">
              Each Kronomods chronometer is assembled to order within our Neuchâtel atelier. Reserve a session to
              commission yours, tailored to your cadence and story.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
