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
    {
      src: flyoverLogo,
      alt: 'FlyOver Iceland',
      name: 'FlyOver Iceland'
    },
    {
      src: epalLogo,
      alt: 'Epal',
      name: 'Epal'
    },
    {
      src: rafalLogo,
      alt: 'Rafal',
      name: 'Rafal'
    },
    {
      src: islandsbilarLogo,
      alt: 'Íslandsbílar',
      name: 'Íslandsbílar'
    },
    {
      src: ntcLogo,
      alt: 'NTC',
      name: 'NTC'
    }
  ]

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos]

  return (
    <section 
      id="about" 
      className="py-20 sm:py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white"
    >
      {/* Very subtle background texture for premium feel */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Clean and minimal */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-base sm:text-lg text-gray-500 font-medium tracking-wide uppercase">
            {currentContent.title}
          </h2>
        </div>
        
        {/* Infinite scrolling logo carousel */}
        <div className="relative">
          {/* Gradient masks for fade effect on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          
          {/* Logo container with animation */}
          <div className="flex overflow-hidden">
            <div 
              className="flex items-center gap-16 sm:gap-20 lg:gap-24 animate-scroll"
              style={{
                animation: 'scroll 30s linear infinite'
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <div 
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center w-32 sm:w-40 lg:w-48 h-16 sm:h-20"
                >
                  <img 
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-12 sm:max-h-14 lg:max-h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                    style={{
                      filter: 'contrast(0.9) brightness(0.7)',
                      mixBlendMode: 'multiply'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.filter = 'contrast(1) brightness(1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.filter = 'contrast(0.9) brightness(0.7)';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for infinite scroll animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        @media (max-width: 640px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        }
      `}</style>
    </section>
  )
}

export default TrustSection