// Import logo images
import flyoverLogo from '../assets/images/logos/Flyover-Iceland-Logo.webp'
import epalLogo from '../assets/images/logos/Epal-Logo.png'
import rafalLogo from '../assets/images/logos/Rafal-Logo.png'

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
    <section id="about" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Navy background with subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xl text-slate-300 font-medium">
            {currentContent.title}
          </p>
        </div>
        
        {/* Logos Grid */}
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
          {logos.map((logo, index) => (
            <div 
              key={index}
              className="flex items-center justify-center w-48 h-24 p-4 rounded-lg transition-all duration-300 hover:bg-white/5 hover:-translate-y-2 group"
            >
              <img 
                src={logo.src}
                alt={logo.alt}
                className={`
                  max-h-16 max-w-40 w-auto h-auto object-contain transition-all duration-300
                  ${logo.isLight 
                    ? 'opacity-70 group-hover:opacity-100' 
                    : 'brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0'
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