// Import logo images
import flyoverLogo from '../assets/images/logos/Flyover-Iceland-Logo.webp'
import epalLogo from '../assets/images/logos/Epal-Logo.png'
import rafalLogo from '../assets/images/logos/Rafal-Logo.png'
import islandsbilarLogo from '../assets/images/logos/islandsbilar-logo.svg'
import ntcLogo from '../assets/images/logos/ntc-logo.svg'
import icewearLogo from '../assets/images/logos/Icewear-Logo.jpg'

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
    { src: icewearLogo, alt: 'Icewear', name: 'icewear' }
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
        
        {/* Desktop: Flowing logos with tighter spacing */}
        <div className="hidden md:block relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex items-center animate-logo-scroll">
            {scrollingLogos.map((logo, index) => (
              <div 
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 px-6 lg:px-8 flex items-center justify-center"
              >
                <div className="w-32 lg:w-36 h-14 flex items-center justify-center">
                  <img 
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full w-auto h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      maxHeight: '56px',
                      maxWidth: '144px'
                    }}
                    onError={(e) => {
                      console.error(`Failed to load: ${logo.alt}`)
                      // Fallback to show logo name if image fails
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = `<span class="text-gray-400 font-medium">${logo.alt}</span>`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile: Static grid with all 6 logos */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {logos.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center">
                <div className="w-24 h-10 flex items-center justify-center">
                  <img 
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full w-auto h-auto object-contain opacity-80"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = `<span class="text-gray-400 text-sm">${logo.alt}</span>`
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
          animation: logo-scroll 20s linear infinite;
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