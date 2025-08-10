import { 
  ClockIcon, 
  CogIcon, 
  ChartBarIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

const AIAgentsSection = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Gervigreindarfulltrúar',
      subtitle: 'Sérfræðingar sem þekkja þínar vörur, þjónustu og kerfi. Svara flóknum spurningum og framkvæma raunverulegar aðgerðir.',
      mainDescription: 'Við þjálfum gervigreind í að vera sérfræðingur í þínum rekstri. Hún lærir verðskrá, stefnur, samstarfsaðila og tengist kerfunum þínum til að geta tekið við pöntunum og bókað tíma.',
      features: [
        {
          icon: ClockIcon,
          title: 'Sérfræðiþekking á þínum rekstri',
          description: 'Þekkir verð, tilboð, samstarfsaðila og allar reglur - eins og þinn besti starfsmaður með margra ára reynslu.'
        },
        {
          icon: CogIcon,
          title: 'Meðhöndlar flóknar spurningar',
          description: 'Svarar um greiðslukort, afsláttarkerfi og sérstaka kröfur viðskiptavina með nákvæmni og þolinmæði.'
        },
        {
          icon: ChartBarIcon,
          title: 'Framkvæmir raunverulegar aðgerðir',
          description: 'Bókar tíma, tekur við pöntunum og tengist við öll þín kerfi til að ljúka verkefnum strax.'
        },
        {
          icon: LightBulbIcon,
          title: 'Umbreytir samskiptum í viðskiptalega innsýn',
          description: 'Greinir samtöl til að hjálpa þér að taka betri ákvarðanir.'
        }
      ],
      button: 'Frekari upplýsingar'
    },
    en: {
      title: 'AI Customer Agents',
      subtitle: 'Specialists who know your products, services and systems. They handle complex questions and take real actions.',
      mainDescription: 'We train AI to become experts in your business. They learn pricing, policies, partnerships and integrate with your systems to handle orders and bookings.',
      features: [
        {
          icon: ClockIcon,
          title: 'Expert knowledge of your business',
          description: 'Knows pricing, offers, partners and all policies - like your best employee with years of experience.'
        },
        {
          icon: CogIcon,
          title: 'Handles complex questions',
          description: 'Answers about payment cards, discount systems and special customer requirements with accuracy and patience.'
        },
        {
          icon: ChartBarIcon,
          title: 'Takes real actions',
          description: 'Books appointments, processes orders and integrates with all your systems to complete tasks immediately.'
        },
        {
          icon: LightBulbIcon,
          title: 'Converts conversations into business insights',
          description: 'Analyzes conversations to help you make better decisions.'
        }
      ],
      button: 'Learn More'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background gradient hints - consistent with other sections */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-blue-50/30 via-teal-50/20 to-transparent"></div>
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tl from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Centered */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-8 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Main Content - Centered and Full Width */}
        <div className="max-w-5xl mx-auto">
          {/* Main Description - Centered */}
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
              {currentContent.mainDescription}
            </h3>
          </div>
          
          {/* Features Grid - 2x2 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-16">
            {currentContent.features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <IconComponent className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Call to Action - Centered */}
          <div className="text-center">
            <button
              onClick={() => onContactClick('ai-service')}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
            >
              {currentContent.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIAgentsSection