
import barcelonaOfficeImage from '../assets/images/barcelona-office.png'

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
        calls: '240K+ calls annually',
        staff: '35+ remote workers', 
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
              
              {/* Right side - Barcelona Office Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-lg mx-auto">
                  {/* Subtle glow effect behind the image - using logo colors */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/10 to-[#FFA947]/10 rounded-3xl blur-2xl transform scale-110"></div>
                  
                  {/* Barcelona Office Image - clean and professional */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={barcelonaOfficeImage} 
                      alt="Barcelona Office - Our team serving Icelandic businesses"
                      className="w-full h-auto object-contain mix-blend-multiply"
                      style={{
                        filter: 'contrast(1.05) saturate(1.05)'
                      }}
                    />
                    
                    {/* Optional subtle overlay to enhance the image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Floating elements around the image - subtle and professional */}
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