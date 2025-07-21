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
        
        {/* Additional subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/5 to-slate-900/10"></div>
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
    </div>
  )
}

export default Hero