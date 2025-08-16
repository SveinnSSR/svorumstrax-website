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
    { src: flyoverLogo, alt: 'FlyOver Iceland' },
    { src: epalLogo, alt: 'Epal' },
    { src: rafalLogo, alt: 'Rafal' },
    { src: islandsbilarLogo, alt: 'Íslandsbílar' },
    { src: ntcLogo, alt: 'NTC' },
    { src: icewearLogo, alt: 'Icewear' }
  ]

  return (
    <section 
      id="about" 
      className="relative bg-white py-20 sm:py-24 border-y border-gray-100"
    >
      {/* Very subtle gradient background for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 via-white to-gray-50/20"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean title - slightly more prominent */}
        <div className="text-center mb-14">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.15em]">
            {currentContent.title}
          </h3>
        </div>
        
        {/* Desktop: Flowing logos with normalized sizes */}
        <div className="hidden md:block relative overflow-hidden">
          <div className="flex items-center animate-logo-scroll">
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div 
                key={index}
                className="flex-shrink-0 px-10 lg:px-12 flex items-center justify-center"
              >
                <div className="w-28 lg:w-32 h-12 flex items-center justify-center">
                  <img 
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full w-auto h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      maxHeight: '48px',
                      maxWidth: '128px'
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
              <div key={logo.alt} className="flex items-center justify-center">
                <div className="w-24 h-10 flex items-center justify-center">
                  <img 
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full w-auto h-auto object-contain opacity-80"
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
            transform: translateX(-33.333%);
          }
        }
        
        .animate-logo-scroll {
          animation: logo-scroll 15s linear infinite;
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