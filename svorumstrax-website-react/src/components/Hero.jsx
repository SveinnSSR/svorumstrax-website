const Hero = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Snjallar lausnir fyrir nútíma þjónustu',
      subtitle: 'Yfir 100 fyrirtæki treysta Svörum strax fyrir samskiptum við sína viðskiptavini. Þjónustuver í Barcelona með 35+ íslenskum sérfræðingum í fjarvinnu og gervigreind. Heildarlausn með umsjón alls eða hluta þjónustuvers þíns.',
      primaryButton: 'Sjá alla þjónustu',
      secondaryButton: 'Fá ókeypis ráðgjöf',
      services: [
        {
          title: 'Símsvörun',
          description: 'Íslenskir sérfræðingar svara í þínu nafni með þjálfun í þínum rekstri',
          highlight: 'Mannleg þjónusta'
        },
        {
          title: 'Gervigreindarfulltrúi',
          description: 'AI þjálfuð í þínu fyrirtæki vinnur allan sólarhringinn',
          highlight: '24/7 þjónusta'
        },
        {
          title: 'Úthringingar',
          description: 'Sérhæfð söluteymi í Barcelona með nýjustu tækni',
          highlight: 'Söluaukning'
        },
        {
          title: 'Stöðugildi',
          description: 'Þjálfaðir starfsmenn án umsýslu sem hluti af þínu teymi',
          highlight: 'Fullur stjórn'
        }
      ]
    },
    en: {
      title: 'Smart solutions for modern customer service',
      subtitle: 'Over 100 companies trust us for phone support and AI. The only company in Iceland offering both - experienced Icelandic specialists and advanced AI technology.',
      primaryButton: 'See All Services',
      secondaryButton: 'Get Free Consultation',
      services: [
        {
          title: 'Phone Support',
          description: 'Icelandic specialists answer on your behalf with training in your business',
          highlight: 'Human Service'
        },
        {
          title: 'AI Agents',
          description: 'AI trained in your business works around the clock',
          highlight: '24/7 Service'
        },
        {
          title: 'Outbound Sales',
          description: 'Specialized sales teams in Barcelona with latest technology',
          highlight: 'Sales Growth'
        },
        {
          title: 'Dedicated Staff',
          description: 'Trained employees without administration as part of your team',
          highlight: 'Full Control'
        }
      ]
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <div className="min-h-screen relative pt-16">
      {/* Flowing Gradient Background - Inspired by Menni/Retell AI */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient similar to Menni's dark with colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Flowing gradient shapes - blended colors */}
        <div className="absolute inset-0">
          {/* Orange flow - top right */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-bl from-orange-400/30 via-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          
          {/* Blue flow - middle left */}
          <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/25 via-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Green flow - bottom center */}
          <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-emerald-400/20 via-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Purple accent - top left */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-purple-400/20 via-purple-500/10 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Additional flowing shapes for depth */}
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-bl from-indigo-400/15 via-indigo-500/8 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="27" cy="7" r="1"/%3E%3Ccircle cx="47" cy="7" r="1"/%3E%3Ccircle cx="7" cy="27" r="1"/%3E%3Ccircle cx="27" cy="27" r="1"/%3E%3Ccircle cx="47" cy="27" r="1"/%3E%3Ccircle cx="7" cy="47" r="1"/%3E%3Ccircle cx="27" cy="47" r="1"/%3E%3Ccircle cx="47" cy="47" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Premium Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
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
              <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed max-w-5xl mx-auto mb-12">
                {currentContent.subtitle}
              </p>
              
              {/* Premium buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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

      {/* Professional Services Overview - More business-focused */}
      <section className="relative bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              {currentLanguage === 'is' ? 'Þjónustulausnir sem skila árangri' : 'Service Solutions That Deliver Results'}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {currentLanguage === 'is' 
                ? 'Veljið á milli mannlegrar þjónustu, gervigreindar eða blöndu af hvoru tveggja. Við aðlögum okkur að þínum þörfum.'
                : 'Choose between human service, AI, or a combination of both. We adapt to your needs.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {currentContent.services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-xl p-8 shadow-sm border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => onContactClick('service-info')}
              >
                {/* Service highlight badge */}
                <div className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {service.highlight}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-6">
                  {service.description}
                </p>
                
                {/* Learn more link */}
                <div className="flex items-center text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
                  <span className="text-sm font-medium">
                    {currentLanguage === 'is' ? 'Frekari upplýsingar' : 'Learn more'}
                  </span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-slate-200 to-slate-300 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero