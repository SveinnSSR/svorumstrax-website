import { useEffect } from 'react'

// Import logo images
import brimborLogo from '../assets/images/logos/brimborg-logo.png'
import skylagoonLogo from '../assets/images/logos/skylagoon-logo.jpg'
import elkoLogo from '../assets/images/logos/elko-logo.svg'
import flyoverLogo from '../assets/images/logos/Flyover-Iceland-Logo.webp'
import epalLogo from '../assets/images/logos/Epal-Logo.png'
import rafalLogo from '../assets/images/logos/Rafal-Logo.png'
import islandsbilarLogo from '../assets/images/logos/islandsbilar-logo.svg'
import ntcLogo from '../assets/images/logos/ntc-logo.svg'
import icewearLogo from '../assets/images/logos/Icewear-Logo.jpg'
import fjallakofinnLogo from '../assets/images/logos/fjallakofinn-logo.png'
import happdraettiLogo from '../assets/images/logos/happdraetti_das-logo.jpeg'
import logthingLogo from '../assets/images/logos/logthing-logo.png'
import febaeturLogo from '../assets/images/logos/febaetur-logo.png'

const TrustSection = ({ currentLanguage }) => {
  const content = {
    is: {
      title: 'Treyst af leiðandi fyrirtækjum'
    },
    en: {
      title: 'Trusted by leading companies'
    }
  }

  const currentContent = content[currentLanguage]

  const logos = [
    // New prominent clients first
    { src: brimborLogo, alt: 'Brimborg', name: 'brimborg' },
    { src: skylagoonLogo, alt: 'Sky Lagoon', name: 'skylagoon' },
    { src: elkoLogo, alt: 'ELKO', name: 'elko' },
    // Existing clients
    { src: flyoverLogo, alt: 'FlyOver Iceland', name: 'flyover' },
    { src: epalLogo, alt: 'Epal', name: 'epal' },
    { src: rafalLogo, alt: 'Rafal', name: 'rafal' },
    { src: islandsbilarLogo, alt: 'Íslandsbílar', name: 'islandsbilar' },
    // NTC SVG has issues, show as text fallback for now
    { src: null, alt: 'NTC', name: 'ntc', isText: true },
    { src: icewearLogo, alt: 'Icewear', name: 'icewear' },
    { src: fjallakofinnLogo, alt: 'Fjallakofinn', name: 'fjallakofinn' },
    { src: happdraettiLogo, alt: 'Happdrætti DAS', name: 'happdraetti' },
    { src: logthingLogo, alt: 'Lögþing', name: 'logthing' },
    { src: febaeturLogo, alt: 'Fébætur', name: 'febaetur' }
  ]

  // Double the logos for seamless infinite scroll
  const scrollingLogos = [...logos, ...logos]

  return (
    <section 
      id="about" 
      className="relative bg-white py-20 sm:py-24 border-y border-gray-100"
    >
      {/* Very subtle gradient background for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 via-white to-gray-50/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean title */}
        <div className="text-center mb-14">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.15em]">
            {currentContent.title}
          </h3>
        </div>
        
        {/* Desktop: Flowing logos with tight spacing */}
        <div className="hidden md:block relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex items-center animate-logo-scroll">
            {scrollingLogos.map((logo, index) => (
              <div 
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 px-2 lg:px-3 flex items-center justify-center"
              >
                <div className="w-24 lg:w-28 h-12 flex items-center justify-center">
                  {logo.isText ? (
                    // Text fallback for NTC
                    <span className="text-gray-500 font-bold text-xl tracking-wider">NTC</span>
                  ) : (
                    <img 
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-full max-w-full w-auto h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500"
                      style={{
                        maxHeight: '48px',
                        maxWidth: '112px'
                      }}
                      onError={(e) => {
                        console.error(`Failed to load: ${logo.alt}`)
                        // Show text fallback
                        const span = document.createElement('span')
                        span.className = 'text-gray-400 font-medium text-sm'
                        span.textContent = logo.alt
                        e.target.parentElement.replaceChild(span, e.target)
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile: Static grid with all logos */}
        <div className="md:hidden">
          <div className="flex flex-wrap justify-center gap-3">
            {logos.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center">
                <div className="w-20 h-10 flex items-center justify-center">
                  {logo.isText ? (
                    <span className="text-gray-500 font-bold text-base">NTC</span>
                  ) : (
                    <img 
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-full max-w-full w-auto h-auto object-contain opacity-80"
                      style={{
                        maxHeight: '40px',
                        maxWidth: '80px'
                      }}
                      onError={(e) => {
                        const span = document.createElement('span')
                        span.className = 'text-gray-400 text-xs'
                        span.textContent = logo.alt
                        e.target.parentElement.replaceChild(span, e.target)
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes logo-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-logo-scroll {
          animation: logo-scroll 32s linear infinite;
          width: max-content;
        }
        
        .animate-logo-scroll:hover {
          animation-play-state: paused;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-logo-scroll {
            animation: none;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}

export default TrustSection