const Services = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Símsvörun',
      subtitle: 'Áreiðanleg og persónuleg símsvörun síðan 2019. Við bjóðum upp á sérhæfða símsvörun, vöktun tölvupósts og gervigreindarlausnir sem bæta þjónustu og auka afköst.',
      services: [
        {
          title: 'Almenn símsvörun',
          description: 'Einföld og áreiðanleg þjónusta fyrir öll fyrirtæki. Við svörum í þínu nafni, sendum símtöl áfram á réttan starfsmann og tökum niður ítarleg skilaboð. Léttir álag á starfsfólki og hægt að setja upp með stuttum fyrirvara.'
        },
        {
          title: 'Þjónustuver',
          description: 'Heildarlausn með fullkomlega þjálfuðum starfsmönnum sem þekkja þitt fyrirtæki, vörur og þjónustu. Sérhæfðir starfsmenn sem verða hluti af þínu teymi og geta svarað flóknum spurningum, leyst vandamál og veitt tæknilega aðstoð byggða á þínum upplýsingakerfum.'
        },
        {
          title: 'Gervigreindarsvörun',
          description: 'Gervigreindarlausnir sem svara símtölum allan sólarhringinn. AI símsvörun sem þekkir þitt fyrirtæki, svarar fyrirspurnum, tekur pöntun og veitir upplýsingar með hraða og nákvæmni. Áframsendir mál á mannlega þjónustufulltrúa (okkar eða þína) eftir þörfum.'
        }
      ]
    },
    en: {
      title: 'Customer Support Solutions',
      subtitle: 'Professional customer service since 2019. We deliver specialized phone support, email management, and AI-powered solutions that enhance customer experience and boost efficiency.',
      services: [
        {
          title: 'Phone Answering Service',
          description: 'Reliable support for businesses of all sizes. We answer in your company name, route calls to the right team member, and capture detailed messages. Reduces staff workload and can be implemented immediately.'
        },
        {
          title: 'Dedicated Contact Center',
          description: 'Complete solution with expertly trained agents who become an extension of your team. Our specialists learn your business inside-out, handle complex inquiries, resolve issues, and provide technical support using your systems and processes.'
        },
        {
          title: 'AI-Powered Support',
          description: 'Smart automation that works 24/7. Our AI learns your business, handles customer inquiries, processes orders, and provides instant information. Seamlessly escalates to human agents when needed for the perfect customer experience.'
        }
      ]
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background gradient hints - matching hero section */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-50/30 via-teal-50/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-50/30 via-amber-50/20 to-transparent"></div>
        
        {/* Subtle floating elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-orange-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>
        
        {/* Three services in one horizontal line - transparent cards like Retell AI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Almenn símsvörun */}
          <div className="border border-gray-300 rounded-2xl p-8 hover:border-gray-400 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {currentContent.services[0].title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {currentContent.services[0].description}
            </p>
          </div>

          {/* Þitt eigið þjónustuver */}
          <div className="border border-gray-300 rounded-2xl p-8 hover:border-gray-400 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {currentContent.services[1].title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {currentContent.services[1].description}
            </p>
          </div>

          {/* Gervigreindarsvörun í síma */}
          <div className="border border-gray-300 rounded-2xl p-8 hover:border-gray-400 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {currentContent.services[2].title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {currentContent.services[2].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services