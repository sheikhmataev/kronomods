import React from 'react'

export interface ContactSectionProps {
  className?: string
}

export const ContactSection: React.FC<ContactSectionProps> = ({ className = '' }) => {
  const contactMethods = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
        </svg>
      ),
      title: 'Follow us on Instagram',
      link: { name: 'Visit Instagram', href: 'https://www.instagram.com/kronomods_norge/' },
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: 'Shop on Tise',
      link: { name: 'Visit Tise shop', href: 'https://tise.com/kronomods_norge' },
    },
  ]

  return (
    <div
      className={`${className} w-full flex flex-col px-3 sm:px-0 pb-[calc(env(safe-area-inset-bottom)+96px)]`}
      style={{ backgroundColor: 'transparent' }}
    >
      
      {/* Social Links Section - Compact Padding */}
      <section className="py-2 min-[400px]:py-4 sm:py-6 flex items-center justify-center">
        <div className="max-w-screen-xl mx-auto px-3 w-full">
          <div className="text-center mb-2 min-[400px]:mb-3 sm:mb-4">
            <h3 className="text-porcelain text-base min-[400px]:text-xl sm:text-2xl font-semibold font-display mb-1">
              Let's connect
            </h3>
            <p className="text-porcelain/60 text-xs sm:text-sm max-w-md mx-auto hidden sm:block">
              We're here to help and answer any question you might have.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-[400px]:gap-3 sm:gap-4 max-w-3xl mx-auto">
            {contactMethods.map((item, idx) => (
              <a
                key={idx}
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-2 min-[400px]:p-3 sm:p-4 border border-onyx/30 rounded-md hover:border-champagne/50 transition-all duration-300 hover:shadow-md bg-onyx/10"
              >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded border border-onyx/30 flex items-center justify-center text-champagne transition-colors duration-300 group-hover:border-champagne group-hover:text-auric group-hover:bg-champagne/10 shrink-0">
                      {item.icon}
                    </div>
                    <div className="text-left flex-1 flex items-center justify-between">
                        <h4 className="text-porcelain text-sm sm:text-base font-medium font-display group-hover:text-champagne">
                          {item.title}
                        </h4>
                        <span className="text-xs text-champagne group-hover:text-auric">Open &rarr;</span>
                    </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section - Compact Layout for Mobile */}
      <section className="py-3 min-[400px]:py-5 sm:py-6 flex items-start justify-center pb-2">
        <div className="max-w-screen-xl mx-auto px-3 w-full">
          <div className="text-center mb-2 min-[400px]:mb-3 sm:mb-4">
            <h3 className="text-champagne text-xs min-[400px]:text-sm sm:text-sm font-semibold font-display mb-1">Contact</h3>
            <p className="text-porcelain text-base min-[400px]:text-xl sm:text-3xl font-semibold font-display mb-1">
              Get in touch
            </p>
          </div>
          
          <div className="max-w-lg mx-auto">
            {/* Reduced space-y from 4 to 2 for tighter mobile layout */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2 min-[400px]:space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <label htmlFor="firstName" className="font-medium text-porcelain text-xs block mb-1 ml-1">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    type="text"
                    required
                    className="w-full px-2 py-2 text-porcelain bg-onyx/20 backdrop-blur-sm outline-none border border-onyx/30 focus:border-champagne rounded-md text-base sm:text-sm"
                    placeholder="First"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="font-medium text-porcelain text-xs block mb-1 ml-1">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    type="text"
                    required
                    className="w-full px-2 py-2 text-porcelain bg-onyx/20 backdrop-blur-sm outline-none border border-onyx/30 focus:border-champagne rounded-md text-base sm:text-sm"
                    placeholder="Last"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="font-medium text-porcelain text-xs block mb-1 ml-1">Email</label>
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  className="w-full px-2 py-2 text-porcelain bg-onyx/20 backdrop-blur-sm outline-none border border-onyx/30 focus:border-champagne rounded-md text-base sm:text-sm"
                  placeholder="name@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="font-medium text-porcelain text-xs block mb-1 ml-1">Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-2 my-auto h-5 flex items-center border-r border-onyx/30 pr-2 z-10">
                    <span className="text-xs text-porcelain/60 mr-1">🇳🇴</span>
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    type="tel"
                    placeholder="912 34 567"
                    className="w-full pl-9 pr-2 py-2 bg-onyx/20 backdrop-blur-sm outline-none border border-onyx/30 focus:border-champagne rounded-md text-porcelain text-base sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="font-medium text-porcelain text-xs block mb-1 ml-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full h-[88px] min-[400px]:h-[104px] sm:h-32 px-2 py-2 resize-none bg-onyx/20 backdrop-blur-sm outline-none border border-onyx/30 focus:border-champagne rounded-md text-porcelain text-base sm:text-sm"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-2 min-[400px]:py-2.5 text-night font-bold bg-champagne hover:bg-auric active:bg-champagne rounded-md transition-colors text-sm mt-1"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
