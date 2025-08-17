const Hero = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Snjallar lausnir fyrir nútíma þjónustu',
      subtitle: 'Yfir 100 fyrirtæki treysta Svörum strax fyrir þjónustu við viðskiptavini. Þú velur hvort gervigreind eða mannlegur fulltrúi svari - eða blöndu af hvoru tveggja.',
      primaryButton: 'Sjá alla þjónustu',
      secondaryButton: 'Fá ókeypis ráðgjöf',
      badge: 'Lausnir fyrir þjónustuver',
      stats: {
        calls: '240K+ símtöl árlega', 
        staff: '35+ starfsmenn',
        experience: 'Síðan 2019'
      }
    },
    en: {
      title: 'Next-generation customer service',
      subtitle: 'Trusted by 100+ companies across Iceland. Get the perfect blend of human expertise and AI efficiency - exactly when your customers need it.',
      primaryButton: 'Explore Services',
      secondaryButton: 'Get Free Consultation',
      badge: 'Customer Service Solutions',
      stats: {
        calls: '240K+ calls annually',
        staff: '35+ remote workers', 
        experience: 'Since 2019'
      }
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <div className="min-h-screen relative pt-8 bg-white overflow-hidden">
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px]">
              
              {/* Left side - Text content (unchanged) */}
              <div className="flex flex-col justify-center">
                {/* Clean badge - consistent with button system */}
                <div className="inline-block bg-white rounded-xl px-6 py-2 mb-8 border border-gray-300 w-fit shadow-sm">
                  <span className="text-gray-700 font-semibold text-sm tracking-wide uppercase">
                    {currentContent.badge}
                  </span>
                </div>
                
                {/* Clean black title without dot */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight text-slate-900">
                  {currentContent.title}
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-8">
                  {currentContent.subtitle}
                </p>

                {/* Stats Bar - 3 clean stats in a row */}
                <div className="flex flex-wrap justify-start gap-6 sm:gap-8 mb-12 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="font-medium">{currentContent.stats.calls}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="font-medium">{currentContent.stats.staff}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="font-medium">{currentContent.stats.experience}</span>
                  </div>
                </div>
                
                {/* Updated buttons - consistent with navbar and choice section style */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <button
                    onClick={() => onContactClick('services')}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    {currentContent.primaryButton}
                  </button>
                  
                  <button
                    onClick={() => onContactClick('consultation')}
                    className="px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 hover:shadow-lg hover:-translate-y-1"
                  >
                    {currentContent.secondaryButton}
                  </button>
                </div>
              </div>
              
              {/* Right side - Abstract Gradient Visualization */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-lg mx-auto">
                  
                  {/* Abstract gradient composition */}
                  <div className="relative h-[500px] flex items-center justify-center">
                    
                    {/* Main gradient orb - blue to orange */}
                    <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-[#4A90E2] via-[#6BA5E7] to-[#FFA947] opacity-20 blur-3xl animate-pulse"></div>
                    
                    {/* Secondary gradient orb - offset */}
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-tl from-[#FFA947] to-[#4A90E2] opacity-15 blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
                    
                    {/* Tertiary gradient orb - bottom left */}
                    <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-gradient-to-tr from-[#4A90E2] via-teal-400 to-transparent opacity-20 blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                    
                    {/* Central geometric shape - more defined */}
                    <div className="relative">
                      {/* Rotating gradient ring */}
                      <div className="absolute inset-0 w-72 h-72 rounded-full bg-gradient-to-r from-[#4A90E2]/30 via-transparent to-[#FFA947]/30 animate-spin" style={{animationDuration: '20s'}}></div>
                      
                      {/* Inner gradient sphere */}
                      <div className="relative w-72 h-72 rounded-full bg-gradient-to-br from-[#4A90E2]/10 via-white/5 to-[#FFA947]/10 backdrop-blur-sm border border-white/10"></div>
                      
                      {/* Floating accent dots */}
                      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#4A90E2] rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-[#FFA947] rounded-full opacity-50 animate-bounce" style={{animationDelay: '1.5s'}}></div>
                      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-teal-400 rounded-full opacity-40 animate-bounce" style={{animationDelay: '2.5s'}}></div>
                    </div>
                    
                    {/* Subtle mesh gradient overlay */}
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `
                          radial-gradient(circle at 20% 50%, rgba(74, 144, 226, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 50%, rgba(255, 169, 71, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 50% 30%, rgba(106, 165, 231, 0.08) 0%, transparent 40%)
                        `
                      }}
                    ></div>
                  </div>
                  
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