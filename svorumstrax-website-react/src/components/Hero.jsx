import outboundPhone from '../assets/images/outbound-phone.png'

const Hero = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Snjallar lausnir fyrir nútíma þjónustu',
      subtitle: 'Yfir 100 fyrirtæki treysta Svörum strax fyrir samskiptum við sína viðskiptavini. Þjónustuver í Barcelona með 35+ íslenskum sérfræðingum í fjarvinnu og gervigreind. Heildarlausn með umsjón alls eða hluta þjónustuvers þíns.',
      primaryButton: 'Sjá alla þjónustu',
      secondaryButton: 'Fá ókeypis ráðgjöf'
    },
    en: {
      title: 'Smart solutions for modern customer service',
      subtitle: 'Over 100 companies trust us for phone support and AI. The only company in Iceland offering both - experienced Icelandic specialists and advanced AI technology.',
      primaryButton: 'See All Services',
      secondaryButton: 'Get Free Consultation'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <div className="min-h-screen relative pt-16 bg-white">
      {/* Subtle gradient background hints */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Very subtle gradient elements that don't overpower the white background */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-50/40 via-teal-50/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-50/40 via-amber-50/20 to-transparent"></div>
        
        {/* Subtle floating elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-orange-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px]">
              
              {/* Left side - Text content */}
              <div className="flex flex-col justify-center">
                {/* Premium subtitle badge */}
                <div className="inline-block bg-gradient-to-r from-blue-600/10 to-orange-600/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-blue-200/50 w-fit">
                  <span className="bg-gradient-to-r from-blue-700 to-orange-700 bg-clip-text text-transparent font-semibold text-sm tracking-wide uppercase">
                    Lausnir fyrir þjónustuver
                  </span>
                </div>
                
                {/* Premium title with gradient text */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-orange-800 bg-clip-text text-transparent">
                    {currentContent.title}
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-12">
                  {currentContent.subtitle}
                </p>
                
                {/* Premium buttons */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <button
                    onClick={() => onContactClick('services')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg"
                  >
                    {currentContent.primaryButton}
                  </button>
                  
                  <button
                    onClick={() => onContactClick('consultation')}
                    className="bg-white hover:bg-gray-50 text-slate-900 font-semibold py-4 px-10 rounded-full border-2 border-slate-300 hover:border-slate-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg"
                  >
                    {currentContent.secondaryButton}
                  </button>
                </div>
              </div>
              
              {/* Right side - Phone image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Subtle glow effect behind the phone */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-orange-200/30 rounded-3xl blur-2xl transform scale-110"></div>
                  
                  {/* Phone image */}
                  <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                    <img 
                      src={outboundPhone} 
                      alt="Phone interface showing customer service features"
                      className="w-full h-auto max-w-sm mx-auto drop-shadow-lg"
                    />
                  </div>
                  
                  {/* Floating elements around the phone */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Hero