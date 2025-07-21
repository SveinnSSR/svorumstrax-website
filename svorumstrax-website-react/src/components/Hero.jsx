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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[600px]">
              
              {/* Left Column - Content */}
              <div className="text-left">
                {/* Premium subtitle badge */}
                <div className="inline-block bg-orange-500/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-orange-400/20">
                  <span className="text-orange-300 font-semibold text-sm tracking-wide uppercase">
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
                <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed mb-12 max-w-2xl">
                  {currentContent.subtitle}
                </p>
                
                {/* Premium buttons */}
                <div className="flex flex-col sm:flex-row gap-6">
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
              
              {/* Right Column - Phone Image Container */}
              <div className="relative flex items-center justify-center lg:justify-end">
                {/* Perfect container for your phone mockup image */}
                <div className="relative w-full max-w-lg h-[600px] flex items-center justify-center">
                  {/* Placeholder for your phone image - replace with your image */}
                  <div className="relative">
                    {/* Add your phone image here */}
                    <img 
                      src="/src/assets/images/hero-phones.png" 
                      alt="Phone Mockups" 
                      className="w-full h-auto max-w-md lg:max-w-lg"
                      style={{
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
                      }}
                    />
                    
                    {/* Fallback if no image - you can remove this once you add the image */}
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm font-medium">
                      {/* This will be hidden once you add the image */}
                      <div className="text-center p-8 border-2 border-dashed border-white/10 rounded-2xl backdrop-blur-sm">
                        <p>Add your phone mockup image here:</p>
                        <p className="mt-2 font-mono text-xs">hero-phones.png</p>
                        <p className="mt-2 text-xs opacity-60">Recommended size: 400-600px width</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle glow effect behind phone */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-orange-400/5 rounded-full blur-3xl scale-150 -z-10"></div>
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