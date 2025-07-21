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
          description: 'Sérhæfum okkur í símsvörun fyrir íslensk fyrirtæki með þjálfuðum sérfræðingum.',
          icon: 'PhoneIcon',
          gradient: 'from-emerald-400 to-emerald-600',
          background: 'from-emerald-50 to-emerald-100/50'
        },
        {
          title: 'Gervigreindarfulltrúi',
          description: 'AI þjálfuð í þínu fyrirtæki - spjall og raddþjónusta allan sólarhringinn.',
          icon: 'ChatBubbleLeftRightIcon',
          gradient: 'from-orange-400 to-orange-600',
          background: 'from-orange-50 to-orange-100/50'
        },
        {
          title: 'Úthringingar',
          description: 'Sérhæfð söluteymi fyrir B2B og B2C með nýjustu tækni og CRM.',
          icon: 'MegaphoneIcon',
          gradient: 'from-blue-400 to-blue-600',
          background: 'from-blue-50 to-blue-100/50'
        },
        {
          title: 'Stöðugildi',
          description: 'Leigðu sérhæfðan starfsmann án umsýslu sem verður hluti af þínu teymi.',
          icon: 'UserGroupIcon',
          gradient: 'from-purple-400 to-purple-600',
          background: 'from-purple-50 to-purple-100/50'
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
          description: 'We specialize in phone support for Icelandic companies with trained specialists.',
          icon: 'PhoneIcon',
          gradient: 'from-emerald-400 to-emerald-600',
          background: 'from-emerald-50 to-emerald-100/50'
        },
        {
          title: 'AI Agents',
          description: 'AI trained in your business - chat and voice service available 24/7.',
          icon: 'ChatBubbleLeftRightIcon',
          gradient: 'from-orange-400 to-orange-600',
          background: 'from-orange-50 to-orange-100/50'
        },
        {
          title: 'Outbound Sales',
          description: 'Specialized sales teams for B2B and B2C with latest technology and CRM.',
          icon: 'MegaphoneIcon',
          gradient: 'from-blue-400 to-blue-600',
          background: 'from-blue-50 to-blue-100/50'
        },
        {
          title: 'Dedicated Staff',
          description: 'Rent specialized employee without administration who becomes part of your team.',
          icon: 'UserGroupIcon',
          gradient: 'from-purple-400 to-purple-600',
          background: 'from-purple-50 to-purple-100/50'
        }
      ]
    }
  }

  const currentContent = content[currentLanguage]

  // Icon components mapping - Professional style
  const iconComponents = {
    PhoneIcon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    ChatBubbleLeftRightIcon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <circle cx="9" cy="10" r="1" fill="currentColor"/>
        <circle cx="12" cy="10" r="1" fill="currentColor"/>
        <circle cx="15" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
    MegaphoneIcon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2 11 13"></path>
        <path d="M22 2 15 22 11 13 2 9z"></path>
      </svg>
    ),
    UserGroupIcon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 1 0-16 0"/>
        <path d="M16 11l2 2 4-4"/>
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 pt-16">
      {/* Premium Hero Section - Inspired by Freddy AI */}
      <section className="relative overflow-hidden">
        {/* Subtle background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.05)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(251,146,60,0.05)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,_rgba(139,92,246,0.05)_0%,_transparent_50%)]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            {/* Premium subtitle badge */}
            <div className="inline-block bg-gradient-to-r from-orange-100/80 to-orange-200/60 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-orange-200/30">
              <span className="text-orange-800 font-semibold text-sm tracking-wide uppercase">
                Lausnir fyrir þjónustuver
              </span>
            </div>
            
            {/* Premium title with gradient text effect - like Freddy AI */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                {currentContent.title}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-5xl mx-auto mb-12">
              {currentContent.subtitle}
            </p>
            
            {/* Premium buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <button
                onClick={() => onContactClick('services')}
                className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg"
              >
                {currentContent.primaryButton}
              </button>
              
              <button
                onClick={() => onContactClick('consultation')}
                className="bg-white hover:bg-gray-50 text-slate-800 font-semibold py-4 px-10 rounded-full border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg"
              >
                {currentContent.secondaryButton}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Service Cards - Much more professional */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {currentContent.services.map((service, index) => {
              const IconComponent = iconComponents[service.icon]
              
              return (
                <div 
                  key={index}
                  className={`relative bg-gradient-to-br ${service.background} backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer group overflow-hidden`}
                  onClick={() => onContactClick('service-info')}
                >
                  {/* Subtle background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon with premium gradient */}
                  <div className="relative mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Subtle accent line */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero