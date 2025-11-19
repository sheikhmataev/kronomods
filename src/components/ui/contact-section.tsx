import React from 'react'

export interface ContactSectionProps {
  className?: string
}

export const ContactSection: React.FC<ContactSectionProps> = ({ className = '' }) => {
  const contactMethods = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
        </svg>
      ),
      title: 'Follow us on Instagram',
      desc: 'Connect with our community of watch enthusiasts and collectors.',
      link: {
        name: 'Visit our Instagram',
        href: 'javascript:void(0)',
      },
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: 'Shop on Tise',
      desc: 'Discover our exclusive watch collection and limited editions.',
      link: {
        name: 'Visit our Tise shop',
        href: 'javascript:void(0)',
      },
    },
  ]

  return (
    <div className={className} style={{ backgroundColor: '#1C181E', minHeight: '100%' }}>
      {/* Contact Methods Section */}
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 gap-12 md:px-8 lg:flex">
          <div className="max-w-md">
            <h3 className="text-porcelain text-3xl font-semibold sm:text-4xl font-display">
              Let's connect
            </h3>
            <p className="mt-3 text-porcelain/60">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </div>
          <div>
            <ul className="mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0">
              {contactMethods.map((item, idx) => (
                <li
                  key={idx}
                  className="space-y-3 border-t border-onyx/30 py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:border-onyx/30 lg:px-12 lg:max-w-none"
                >
                  <div className="w-12 h-12 rounded-full border border-onyx/30 flex items-center justify-center text-champagne">
                    {item.icon}
                  </div>
                  <h4 className="text-porcelain text-lg font-medium xl:text-xl font-display">
                    {item.title}
                  </h4>
                  <p className="text-porcelain/60">{item.desc}</p>
                  <a
                    href={item.link.href}
                    className="flex items-center gap-1 text-sm text-champagne duration-150 hover:text-auric font-medium"
                  >
                    {item.link.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="max-w-lg mx-auto space-y-3 sm:text-center">
            <h3 className="text-champagne font-semibold font-display">Contact</h3>
            <p className="text-porcelain text-3xl font-semibold sm:text-4xl font-display">
              Get in touch
            </p>
            <p className="text-porcelain/60">
              We'd love to hear from you! Please fill out the form below.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div>
                  <label className="font-medium text-porcelain">First name</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-2 px-3 py-2 text-porcelain bg-onyx/20 backdrop-blur-sm outline-none border border-onyx/30 focus:border-champagne shadow-lg rounded-lg transition-colors placeholder:text-porcelain/40"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="font-medium text-porcelain">Last name</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-2 px-3 py-2 text-porcelain bg-onyx/20 backdrop-blur-sm outline-none border border-onyx/30 focus:border-champagne shadow-lg rounded-lg transition-colors placeholder:text-porcelain/40"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium text-porcelain">Email</label>
                <input
                  type="email"
                  required
                  className="w-full mt-2 px-3 py-2 text-porcelain bg-onyx/20 backdrop-blur-sm outline-none border border-onyx/30 focus:border-champagne shadow-lg rounded-lg transition-colors placeholder:text-porcelain/40"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="font-medium text-porcelain">Phone number</label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r border-onyx/30 pr-2 z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 480"
                      className="w-6 h-4"
                      style={{ filter: 'none', backdropFilter: 'none', imageRendering: 'crisp-edges' }}
                    >
                      <rect width="640" height="480" fill="#ba0c2f" />
                      <rect x="180" width="140" height="480" fill="#fff" />
                      <rect y="180" width="640" height="140" fill="#fff" />
                      <rect x="200" width="100" height="480" fill="#00205b" />
                      <rect y="200" width="640" height="100" fill="#00205b" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    placeholder="912 34 567"
                    pattern="[0-9 ]{9,11}"
                    maxLength={11}
                    required
                    className="w-full pl-[3.5rem] pr-3 py-2 appearance-none bg-onyx/20 backdrop-blur-sm outline-none border border-onyx/30 focus:border-champagne shadow-lg rounded-lg text-porcelain transition-colors placeholder:text-porcelain/40"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement
                      let value = target.value.replace(/\D/g, '') // Remove all non-digits
                      if (value.length > 8) value = value.slice(0, 8) // Limit to 8 digits (Norwegian format)
                      // Format: XXX XX XXX (spaces after 3rd and 6th digit)
                      if (value.length > 6) {
                        value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`
                      } else if (value.length > 3) {
                        value = `${value.slice(0, 3)} ${value.slice(3)}`
                      }
                      target.value = value
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="font-medium text-porcelain">Message</label>
                <textarea
                  required
                  className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-onyx/20 backdrop-blur-sm outline-none border border-onyx/30 focus:border-champagne shadow-lg rounded-lg text-porcelain transition-colors placeholder:text-porcelain/40"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-night font-medium bg-champagne hover:bg-auric active:bg-champagne rounded-lg duration-150 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
