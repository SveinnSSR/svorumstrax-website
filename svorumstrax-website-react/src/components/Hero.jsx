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
    <div className="min-h-screen relative pt-16">
      {/* Phone Mockup Inspired Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient inspired by your phone mockups - blue to orange flow */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800"></div>
        
        {/* Main gradient flow - inspired by your phone screens */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-teal-800/30 to-orange-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-800/20 to-orange-700/30"></div>
        
        {/* Additional flowing elements for depth - matching phone gradient style */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-blue-600/15 via-teal-600/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tl from-orange-600/15 via-amber-600/10 to-transparent"></div>
        
        {/* Subtle animated elements */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-blue-500/8 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-tl from-orange-500/8 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center min-h-[600px] flex flex-col justify-center">
              
              {/* Premium subtitle badge */}
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20 mx-auto">
                <span className="text-white font-semibold text-sm tracking-wide uppercase">
                  Lausnir fyrir þjónustuver
                </span>
              </div>
              
              {/* Premium title with gradient text */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
                  {currentContent.title}
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed mb-12 max-w-4xl mx-auto">
                {currentContent.subtitle}
              </p>
              
              {/* Premium buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => onContactClick('services')}
                  className="bg-white hover:bg-gray-100 text-slate-900 font-semibold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg"
                >
                  {currentContent.primaryButton}
                </button>
                
                <button
                  onClick={() => onContactClick('consultation')}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-10 rounded-full border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg"
                >
                  {currentContent.secondaryButton}
                </button>
              </div>
              
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Hero