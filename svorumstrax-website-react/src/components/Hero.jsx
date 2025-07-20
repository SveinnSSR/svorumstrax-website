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
          color: 'text-emerald-600'
        },
        {
          title: 'Gervigreindarfulltrúi',
          description: 'AI þjálfuð í þínu fyrirtæki - spjall og raddþjónusta allan sólarhringinn.',
          icon: 'ChatBubbleLeftRightIcon',
          color: 'text-orange-600'
        },
        {
          title: 'Úthringingar',
          description: 'Sérhæfð söluteymi fyrir B2B og B2C með nýjustu tækni og CRM.',
          icon: 'MegaphoneIcon',
          color: 'text-blue-600'
        },
        {
          title: 'Stöðugildi',
          description: 'Leigðu sérhæfðan starfsmann án umsýslu sem verður hluti af þínu teymi.',
          icon: 'UserGroupIcon',
          color: 'text-purple-600'
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
          color: 'text-emerald-600'
        },
        {
          title: 'AI Agents',
          description: 'AI trained in your business - chat and voice service available 24/7.',
          icon: 'ChatBubbleLeftRightIcon',
          color: 'text-orange-600'
        },
        {
          title: 'Outbound Sales',
          description: 'Specialized sales teams for B2B and B2C with latest technology and CRM.',
          icon: 'MegaphoneIcon',
          color: 'text-blue-600'
        },
        {
          title: 'Dedicated Staff',
          description: 'Rent specialized employee without administration who becomes part of your team.',
          icon: 'UserGroupIcon',
          color: 'text-purple-600'
        }
      ]
    }
  }

  const currentContent = content[currentLanguage]

  // Icon components mapping - Clean vanilla CSS style
  const iconComponents = {
    PhoneIcon: () => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    ChatBubbleLeftRightIcon: () => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <circle cx="9" cy="10" r="1" fill="currentColor"/>
        <circle cx="12" cy="10" r="1" fill="currentColor"/>
        <circle cx="15" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
    MegaphoneIcon: () => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2 11 13"></path>
        <path d="M22 2 15 22 11 13 2 9z"></path>
      </svg>
    ),
    UserGroupIcon: () => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 1 0-16 0"/>
        <path d="M16 11l2 2 4-4"/>
      </svg>
    )
  }

  return (
    <section className="pt-16 bg-gray-50">
      {/* Hero Banner */}
      <div 
        className="relative overflow-hidden professional-shadow"
        style={{
          width: "100%",
          height: "500px",
          background: "linear-gradient(135deg, #4A90E2 0%, #357ABD 50%, #2563EB 100%)",
          margin: "40px 0 0 0",
        }}
      >
        {/* Background decoration effects */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1))"
          }}
        />
        <div 
          className="absolute -top-4 -right-4 w-32 h-32 rounded-full blur-3xl"
          style={{ background: "rgba(255, 255, 255, 0.15)" }}
        />
        <div 
          className="absolute -bottom-4 -left-4 w-40 h-40 rounded-full blur-3xl"
          style={{ background: "rgba(255, 255, 255, 0.15)" }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div 
            className="px-8 sm:px-12 lg:px-16 max-w-4xl"
            style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}
          >
            <h1 
              className="font-black text-white leading-tight tracking-tight mb-6"
              style={{ 
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: "1.1",
                fontWeight: "900"
              }}
            >
              {currentContent.title}
            </h1>
            <p 
              className="text-white mb-8 leading-relaxed font-medium"
              style={{ 
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                opacity: "0.95",
                maxWidth: "900px",
                lineHeight: "1.6"
              }}
            >
              {currentContent.subtitle}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onContactClick('services')}
                className="btn-primary"
                style={{
                  background: "white",
                  color: "#FF9A3C",
                  fontWeight: "700",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
                }}
              >
                {currentContent.primaryButton}
              </button>
              
              <button
                onClick={() => onContactClick('consultation')}
                className="btn-secondary"
                style={{
                  borderWidth: "2px",
                  borderColor: "white",
                  fontWeight: "700",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)"
                }}
              >
                {currentContent.secondaryButton}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Cards - Integrated underneath hero */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentContent.services.map((service, index) => {
              const IconComponent = iconComponents[service.icon]
              
              return (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                  onClick={() => onContactClick('service-info')}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div className={`${service.color} group-hover:scale-110 transition-transform duration-300 flex justify-center`}>
                      <IconComponent />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero