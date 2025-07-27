// Import logo images
import flyoverLogo from '../assets/images/logos/Flyover-Iceland-Logo.webp'
import epalLogo from '../assets/images/logos/Epal-Logo.png'
import rafalLogo from '../assets/images/logos/Rafal-Logo.png'

const TrustSection = ({ currentLanguage }) => {
  const content = {
    is: {
      title: 'Meðhöndlum 240.000+ símtöl árlega fyrir 100+ íslensk fyrirtæki',
      subtitle: 'Treyst af leiðandi fyrirtækjum'
    },
    en: {
      title: 'Handling 240,000+ calls annually for 100+ Icelandic companies',
      subtitle: 'Trusted by leading companies'
    }
  }

  const currentContent = content[currentLanguage]

  const logos = [
    {
      src: flyoverLogo,
      alt: 'FlyOver Iceland',
      name: 'FlyOver Iceland',
      isLight: false
    },
    {
      src: epalLogo,
      alt: 'Epal',
      name: 'Epal',
      isLight: true // This logo is already light/white
    },
    {
      src: rafalLogo,
      alt: 'Rafal',
      name: 'Rafal',
      isLight: false
    }
  ]

  return (
    <section 
      id="about" 
      className="py-16 sm:py-20 relative overflow-hidden"
      style={{
        background: 'rgba(10, 14, 39, 0.95)' // True navy like vanilla JS
      }}
    >
      {/* Navy background with subtle texture - matching vanilla */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)' }}></div>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Mobile optimized with stats */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-medium">
            {currentContent.subtitle}
          </p>
        </div>
        
        {/* Logos Grid - Mobile optimized */}
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
          {logos.map((logo, index) => (
            <div 
              key={index}
              className="flex items-center justify-center w-40 sm:w-48 h-20 sm:h-24 p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/5 hover:-translate-y-2 group"
            >
              <img 
                src={logo.src}
                alt={logo.alt}
                className={`
                  max-h-12 sm:max-h-16 max-w-32 sm:max-w-40 w-auto h-auto object-contain transition-all duration-300
                  ${logo.isLight 
                    ? 'opacity-90 group-hover:opacity-100' 
                    : 'brightness-0 invert opacity-90 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0'
                  }
                  group-hover:scale-110
                `}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustSection