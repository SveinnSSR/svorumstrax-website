
// Import outbound client logos
import hhiLogo from '../assets/images/logos/hhi.svg'
import hsiLogo from '../assets/images/logos/hsi.svg'
import gjaldskilLogo from '../assets/images/logos/gjaldskil.png'
import tryggjaLogo from '../assets/images/logos/tryggja.png'
import lifandivisindiLogo from '../assets/images/logos/lifandivisindi.png'
import eddaLogo from '../assets/images/logos/edda.jpg'

const TrustSectionOutbound = ({ currentLanguage }) => {
  const content = {
    is: {
      title: 'Treyst af leiðandi fyrirtækjum'
    },
    en: {
      title: 'Trusted by leading companies'
    }
  }

  const currentContent = content[currentLanguage]

  // Per-logo size tweaks if needed
  const sizeOverrides = {
    // Add specific overrides here if needed
    // hhi: { maxHeight: '65px', maxWidth: '150px' },
  }

  const logos = [
    { src: hhiLogo, alt: 'Happdrætti Háskóla Íslands', name: 'hhi' },
    { src: hsiLogo, alt: 'Handknattleikssamband Íslands', name: 'hsi' },
    { src: gjaldskilLogo, alt: 'Gjaldskil Debitum', name: 'gjaldskil' },
    { src: tryggjaLogo, alt: 'Tryggja', name: 'tryggja' },
    { src: lifandivisindiLogo, alt: 'Lifandi Vísindi', name: 'lifandi' },
    { src: eddaLogo, alt: 'Edda útgáfa', name: 'edda' },
  ]

  // NOTE: With only 4 logos, we're using STATIC display (no scrolling animation)
  // Once you have 6+ logos, uncomment the scrolling version below and comment out the static version
  
  // For scrolling animation with many logos:
  // const scrollingLogos = [...logos, ...logos]

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
        
        {/* STATIC VERSION - Currently active for 4 logos */}
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center">
              <div className="w-32 lg:w-36 h-16 flex items-center justify-center">
                <img 
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full w-auto h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500"
                  style={{
                    maxHeight: '64px',
                    maxWidth: '144px',
                    ...(sizeOverrides[logo.name] || {})
                  }}
                  onError={(e) => {
                    console.error(`Failed to load: ${logo.alt}`)
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

        {/* SCROLLING VERSION - Uncomment when you have 6+ logos, then comment out the static version above */}
        {/* 
        <div className="hidden md:block relative overflow-hidden">
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
                      maxWidth: '112px',
                      ...(sizeOverrides[logo.name] || {})
                    }}
                    onError={(e) => {
                      console.error(`Failed to load: ${logo.alt}`)
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
                      maxWidth: '80px',
                      ...(sizeOverrides[logo.name] || {})
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
        */}
      </div>

      {/* Animation styles - Only needed when scrolling version is active */}
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
          animation: logo-scroll 28s linear infinite;
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

export default TrustSectionOutbound