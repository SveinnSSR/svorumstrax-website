import outboundPhone from '../assets/images/outbound-phone.png'

const Hero = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Snjallar lausnir fyrir nútíma þjónustu',
      subtitle: 'Yfir 100 fyrirtæki treysta Svörum strax fyrir þjónustu við viðskiptavini. Þú velur hvort gervigreind eða mannlegur fulltrúi svari - eða blöndu af hvoru tveggja.',
      primaryButton: 'Sjá alla þjónustu',
      secondaryButton: 'Fá ókeypis ráðgjöf',
      badge: 'Lausnir fyrir þjónustuver',
      stats: {
        companies: '100+ fyrirtæki',
        calls: '240K+ símtöl árlega', 
        staff: '35+ sérfræðingar',
        experience: 'Síðan 2019'
      },
      quotes: [
        "Hæ! Er hægt að bóka tíma hjá ykkur um helgina?",
        "Getið þið hjálpað mér með pöntunina mína?",
        "Hvenær eruð þið opin á morgun?",
        "Get ég fengið verðtilboð?"
      ]
    },
    en: {
      title: 'Next-generation customer service',
      subtitle: 'Trusted by 100+ companies across Iceland. Get the perfect blend of human expertise and AI efficiency - exactly when your customers need it.',
      primaryButton: 'Explore Services',
      secondaryButton: 'Get Free Consultation',
      badge: 'Customer Service Solutions',
      stats: {
        companies: '100+ companies',
        calls: '240K+ calls annually',
        staff: '35+ specialists', 
        experience: 'Since 2019'
      },
      quotes: [
        "Can I book an appointment for this weekend?",
        "Could you help me with my order?",
        "What are your hours tomorrow?",
        "Can I get a quote?"
      ]
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <div className="min-h-screen relative pt-8 bg-white">
      {/* Subtle gradient background hints - updated to match logo colors */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Very subtle gradient elements using logo colors */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-50/40 via-teal-50/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-50/40 via-amber-50/20 to-transparent"></div>
        
        {/* Subtle floating elements with logo colors */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-orange-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px]">
              
              {/* Left side - Text content */}
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

                {/* Stats Bar - NEW */}
                <div className="flex flex-wrap justify-start gap-6 sm:gap-8 mb-12 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">{currentContent.stats.companies}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="font-medium">{currentContent.stats.calls}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">{currentContent.stats.staff}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
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
              
              {/* Right side - Phone image with floating quotes */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md mx-auto">
                  {/* Subtle glow effect behind the phone - using logo colors */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/20 to-[#FFA947]/20 rounded-3xl blur-2xl transform scale-110"></div>
                  
                  {/* Floating customer quotes - positioned in a circle around the phone */}
                  {/* Quote 1 - Top left */}
                  <div className="absolute -top-2 -left-6 bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100 max-w-56 transform -rotate-2 animate-pulse hidden md:block z-10">
                    <div className="text-sm text-gray-700 font-medium">
                      "{currentContent.quotes[0]}"
                    </div>
                    <div className="absolute bottom-0 left-6 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white transform translate-y-1.5"></div>
                  </div>
                  
                  {/* Quote 2 - Top right - using logo blue */}
                  <div className="absolute top-0 right-2 bg-[#4A90E2]/10 rounded-2xl px-4 py-3 shadow-lg border border-[#4A90E2]/20 max-w-48 transform rotate-1 animate-pulse hidden lg:block z-10" style={{animationDelay: '1s'}}>
                    <div className="text-sm text-gray-700 font-medium">
                      "{currentContent.quotes[1]}"
                    </div>
                    <div className="absolute bottom-0 right-6 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-[#4A90E2]/10 transform translate-y-1.5"></div>
                  </div>
                  
                  {/* Quote 3 - Bottom left - using logo orange */}
                  <div className="absolute bottom-6 left-6 bg-[#FFA947]/10 rounded-2xl px-4 py-3 shadow-lg border border-[#FFA947]/20 max-w-52 transform rotate-1 animate-pulse hidden md:block z-10" style={{animationDelay: '2s'}}>
                    <div className="text-sm text-gray-700 font-medium">
                      "{currentContent.quotes[2]}"
                    </div>
                    <div className="absolute top-0 left-6 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-[#FFA947]/10 transform -translate-y-1.5"></div>
                  </div>
                  
                  {/* Quote 4 - Bottom right */}
                  <div className="absolute bottom-2 right-6 bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100 max-w-44 transform -rotate-2 animate-pulse hidden lg:block z-10" style={{animationDelay: '3s'}}>
                    <div className="text-sm text-gray-700 font-medium">
                      "{currentContent.quotes[3]}"
                    </div>
                    <div className="absolute top-0 right-6 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-white transform -translate-y-1.5"></div>
                  </div>
                  
                  {/* Phone image - centered in the container, now smaller */}
                  <div className="relative flex justify-center items-center py-12 px-6">
                    <img 
                      src={outboundPhone} 
                      alt="Phone interface showing customer service features"
                      className="w-full h-auto max-w-xs drop-shadow-2xl z-20"
                    />
                  </div>
                  
                  {/* Floating elements around the phone - using logo colors */}
                  <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-[#4A90E2]/20 to-transparent rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-tr from-[#FFA947]/20 to-transparent rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
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