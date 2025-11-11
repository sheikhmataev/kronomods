import HeroCardsSection from './components/HeroCardsSection'

const App = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-night text-porcelain">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <div className="pointer-events-auto flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-auric/40 bg-onyx/60 backdrop-blur">
            <span className="font-display text-lg tracking-[0.4em] text-champagne">K</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg uppercase tracking-[0.4em] text-champagne">Kronomods</span>
            <span className="text-xs uppercase tracking-[0.5em] text-porcelain/40">Swiss Atelier</span>
          </div>
        </div>

        <button
          type="button"
          aria-label="Open navigation"
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-onyx/50 backdrop-blur"
        >
          <span className="sr-only">Open navigation</span>
          <div className="flex flex-col gap-1.5">
            <span className="block h-[2px] w-6 rounded-full bg-porcelain" />
            <span className="block h-[2px] w-6 rounded-full bg-porcelain" />
            <span className="block h-[2px] w-6 rounded-full bg-porcelain" />
          </div>
        </button>
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
