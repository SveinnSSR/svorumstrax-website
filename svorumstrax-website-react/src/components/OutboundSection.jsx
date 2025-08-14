import { 
  PhoneIcon, 
  ChartBarIcon,
  BuildingOffice2Icon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const OutboundSection = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Úthringingar',
      subtitle: 'Sérhæfð söluteymi með reynslu af B2B og B2C markaði. Notum nýjustu tækni og CRM kerfi til að hámarka árangur.',
      mainDescription: 'Reynsla sem skilar árangri. Við höfum séð um úthringiverkefni fyrir mörg af stærstu fyrirtækjum landsins.',
      features: [
        {
          icon: BuildingOffice2Icon,
          title: 'B2B og B2C reynsla',
          description: 'Sérhæfð teymi fyrir báða markaði með djúpa þekkingu á íslenskum viðskiptum'
        },
        {
          icon: ChartBarIcon,
          title: 'Nýjasta CRM tækni',
          description: 'Tengumst við þín kerfi og mælum árangur í rauntíma'
        },
        {
          icon: UserGroupIcon,
          title: 'Öflugt sölufólk með reynslu',
          description: 'Þjálfað í þínum vörum og þjónustu með áralanga söluþjálfun'
        },
        {
          icon: PhoneIcon,
          title: 'Persónuleg og árangursrík samskipti',
          description: 'Byggjum traust og sköpum varanlegt gildi í hverju samtali'
        }
      ],
      button: 'Fá tilboð'
    },
    en: {
      title: 'Outbound Sales',
      subtitle: 'Expert sales teams with proven B2B and B2C market experience. We leverage advanced technology and CRM systems to maximize your results.',
      mainDescription: 'Results-driven experience you can trust. We\'ve managed outbound campaigns for many of Iceland\'s largest companies, delivering measurable growth.',
      features: [
        {
          icon: BuildingOffice2Icon,
          title: 'B2B & B2C expertise',
          description: 'Specialized teams for each market with deep understanding of Icelandic business culture'
        },
        {
          icon: ChartBarIcon,
          title: 'Advanced CRM integration',
          description: 'Seamless connection to your existing systems with real-time performance tracking'
        },
        {
          icon: UserGroupIcon,
          title: 'Professional sales specialists',
          description: 'Extensively trained on your products and services with proven sales experience'
        },
        {
          icon: PhoneIcon,
          title: 'Personal and effective communication',
          description: 'Building trust and creating lasting value in every conversation'
        }
      ],
      button: 'Get Quote'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
      {/* Very subtle background effects - matching AIAgentsSection style */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,_rgba(100,116,139,0.03)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_75%_75%,_rgba(148,163,184,0.04)_0%,_transparent_50%)]"></div>
        
        {/* Subtle floating elements using blue tones for outbound theme */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tl from-indigo-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Centered like AIAgentsSection */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-8 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Main Content - Centered and Full Width like AIAgentsSection */}
        <div className="max-w-5xl mx-auto">
          {/* Main Description - Centered */}
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
              {currentContent.mainDescription}
            </h3>
          </div>
          
          {/* Features Grid - 2x2 Layout like AIAgentsSection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-16">
            {currentContent.features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Call to Action - Centered like AIAgentsSection */}
          <div className="text-center">
            <button
              onClick={() => onContactClick('outbound')}
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

export default OutboundSection