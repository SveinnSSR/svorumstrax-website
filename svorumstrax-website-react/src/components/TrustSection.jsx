import { useEffect } from 'react'

// Import logo images
import flyoverLogo from '../assets/images/logos/Flyover-Iceland-Logo.webp'
import epalLogo from '../assets/images/logos/Epal-Logo.png'
import rafalLogo from '../assets/images/logos/Rafal-Logo.png'
import islandsbilarLogo from '../assets/images/logos/islandsbilar-logo.svg'
import ntcLogo from '../assets/images/logos/ntc-logo.svg'
import icewearLogo from '../assets/images/logos/Icewear-Logo.jpg'
import fjallakofinnLogoPng from '../assets/images/logos/fjallakofinn-logo.png'
import fjallakofinnLogoJpg from '../assets/images/logos/fjallakofinn-logo.jpg'  // Uncomment to test JPG version

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
    { src: flyoverLogo, alt: 'FlyOver Iceland', name: 'flyover' },
    { src: epalLogo, alt: 'Epal', name: 'epal' },
    { src: rafalLogo, alt: 'Rafal', name: 'rafal' },
    { src: islandsbilarLogo, alt: 'Íslandsbílar', name: 'islandsbilar' },
    { src: ntcLogo, alt: 'NTC', name: 'ntc' },
    { src: icewearLogo, alt: 'Icewear', name: 'icewear' },
    { src: fjallakofinnLogoPng, alt: 'Fjallakofinn', name: 'fjallakofinn' }  // Using PNG version
    { src: fjallakofinnLogoJpg, alt: 'Fjallakofinn', name: 'fjallakofinn' }  // Uncomment to test JPG
  ]

  // Debug logging for NTC
  useEffect(() => {
    console.log('NTC Logo path:', ntcLogo)
    console.log('All logos:', logos.map(l => ({ name: l.name, src: l.src })))
    
    // Check if NTC image loads
    const img = new Image()
    img.onload = () => console.log('NTC logo loaded successfully')
    img.onerror = (e) => console.error('NTC logo failed to load:', e)
    img.src = ntcLogo
  }, [])

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
        
        {/* Desktop: Flowing logos with minimal spacing */}
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
                  <img 
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full w-auto h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      maxHeight: '48px',
                      maxWidth: '112px'
                    }}
                    onError={(e) => {
                      console.error(`Failed to load: ${logo.alt}`, e)
                      // Show text fallback
                      const span = document.createElement('span')
                      span.className = 'text-gray-400 font-medium text-sm'
                      span.textContent = logo.alt
                      e.target.parentElement.replaceChild(span, e.target)
                    }}
                  />
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
          animation: logo-scroll 22s linear infinite;
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