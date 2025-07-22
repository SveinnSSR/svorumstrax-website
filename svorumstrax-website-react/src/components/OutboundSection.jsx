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
      mainDescription: 'Reynsla og tækni sem skilar árangri. Við höfum séð um úthringiátök og verkefni fyrir mörg af stærstu fyrirtækjum landsins.',
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
        }
      ]
    },
    en: {
      title: 'Outbound Calls',
      subtitle: 'Specialized sales teams with B2B and B2C market experience. We use the latest technology and CRM systems to maximize results.',
      mainDescription: 'Experience and technology that delivers results. We have handled outbound campaigns and projects for many of the country\'s largest companies.',
      features: [
        {
          icon: BuildingOffice2Icon,
          title: 'B2B and B2C experience',
          description: 'Specialized teams for both markets with deep knowledge of Icelandic business'
        },
        {
          icon: ChartBarIcon,
          title: 'Latest CRM technology',
          description: 'We connect to your systems and measure results in real-time'
        },
        {
          icon: UserGroupIcon,
          title: 'Experienced sales professionals',
          description: 'Trained in your products and services with years of sales training'
        }
      ]
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>
        
        {/* Main Content with CRM Mobile Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* CRM Mobile Interface Placeholder - Left Side */}
          <div className="relative order-1 lg:order-1">
            <div className="relative max-w-sm mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl">
              {/* Phone mockup placeholder */}
              <div className="bg-white rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PhoneIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-600 mb-4">CRM Mobile Interface</div>
                  <div className="space-y-2 text-xs text-left">
                    <div className="bg-green-100 p-2 rounded text-green-800">✓ Símtal lokið - Fundur bókaður</div>
                    <div className="bg-blue-100 p-2 rounded text-blue-800">📞 Næsta símtal: 14:30</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content - Right Side */}
          <div className="order-2 lg:order-2">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <PhoneIcon className="w-8 h-8 text-white" />
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {currentContent.mainDescription}
            </h3>
            
            <div className="space-y-6">
              {currentContent.features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

export default OutboundSection