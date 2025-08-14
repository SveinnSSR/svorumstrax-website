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
    <div className="min-h-screen relative pt-8">
      {/* Premium full-screen gradient background - exact colors from screenshot */}
      <div className="absolute inset-0" 
        style={{
          background: `
            radial-gradient(ellipse at 0% 0%, #d3d9e3 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, #b0bbb4 0%, transparent 50%),
            radial-gradient(ellipse at 100% 100%, #7d7873 0%, transparent 50%),
            linear-gradient(135deg, #d3d9e3 0%, #b0bbb4 50%, #7d7873 100%)
          `
        }}
      >
        {/* Optional subtle shimmer animation overlay */}
        <div className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)
            `,
            animation: 'shimmer 15s ease-in-out infinite'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-center justify-center min-h-[600px]">
              
              {/* Centered content */}
              <div className="flex flex-col justify-center items-center text-center max-w-5xl">
                {/* Clean badge */}
                <div className="inline-block bg-white/95 backdrop-blur-md rounded-xl px-6 py-2 mb-8 border border-gray-200/60 shadow-sm">
                  <span className="text-gray-700 font-semibold text-sm tracking-wide uppercase">
                    {currentContent.badge}
                  </span>
                </div>
                
                {/* Clean black title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight text-slate-900">
                  {currentContent.title}
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 leading-relaxed mb-8 max-w-4xl">
                  {currentContent.subtitle}
                </p>

                {/* Stats Bar - 3 clean stats in a row */}
                <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-12 text-sm text-gray-700">
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
                
                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <button
                    onClick={() => onContactClick('services')}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    {currentContent.primaryButton}
                  </button>
                  
                  <button
                    onClick={() => onContactClick('consultation')}
                    className="px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 text-gray-600 hover:text-gray-900 bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 hover:shadow-lg hover:-translate-y-1"
                  >
                    {currentContent.secondaryButton}
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
      
      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% {
            transform: translateX(-100%) translateY(100%);
          }
          50% {
            transform: translateX(100%) translateY(-100%);
          }
        }
      `}</style>
    </div>
  )
}

export default Hero