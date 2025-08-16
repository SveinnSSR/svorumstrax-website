import { useEffect, useRef } from 'react'

// Import logo images
import flyoverLogo from '../assets/images/logos/Flyover-Iceland-Logo.webp'
import epalLogo from '../assets/images/logos/Epal-Logo.png'
import rafalLogo from '../assets/images/logos/Rafal-Logo.png'
import islandsbilarLogo from '../assets/images/logos/islandsbilar-logo.svg'
import ntcLogo from '../assets/images/logos/ntc-logo.svg'

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
    { src: flyoverLogo, alt: 'FlyOver Iceland' },
    { src: epalLogo, alt: 'Epal' },
    { src: rafalLogo, alt: 'Rafal' },
    { src: islandsbilarLogo, alt: 'Íslandsbílar' },
    { src: ntcLogo, alt: 'NTC' }
  ]

  return (
    <section 
      id="about" 
      className="relative bg-white py-20 sm:py-24 border-y border-gray-100"
    >
      {/* Very subtle gradient background for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 via-white to-gray-50/20"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean, small title */}
        <div className="text-center mb-14">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
            {currentContent.title}
          </h3>
        </div>
        
        {/* Desktop: Flowing logos */}
        <div className="hidden md:block relative overflow-hidden">
          <div className="flex items-center justify-between animate-gentle-flow">
            {[...logos, ...logos].map((logo, index) => (
              <div 
                key={index}
                className="flex-shrink-0 px-10 lg:px-14"
              >
                <img 
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 lg:h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile: Static grid */}
        <div className="md:hidden">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {logos.map((logo) => (
              <div key={logo.alt} className="flex items-center justify-center">
                <img 
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 w-auto object-contain opacity-80"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gentle-flow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-gentle-flow {
          animation: gentle-flow 45s linear infinite;
        }
        
        .animate-gentle-flow:hover {
          animation-play-state: paused;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-gentle-flow {
            animation: none;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}

export default TrustSection