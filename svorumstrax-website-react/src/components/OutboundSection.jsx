import { 
  PhoneIcon, 
  ChartBarIcon,
  BuildingOffice2Icon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import barcelonaOfficeImage from '../assets/images/barcelona-office.png'

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
          description: 'Specialized teams for each market with deep understanding of Icelandic business culture and consumer behavior'
        },
        {
          icon: ChartBarIcon,
          title: 'Advanced CRM integration',
          description: 'Seamless connection to your existing systems with real-time performance tracking and detailed analytics'
        },
        {
          icon: UserGroupIcon,
          title: 'Professional sales specialists',
          description: 'Extensively trained on your products and services, with years of proven sales experience and ongoing coaching'
        }
      ],
      button: 'Get Quote'
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
        
        {/* Main Content with Barcelona Office Image - Mobile optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Barcelona Office Image - Left Side - Mobile optimized */}
          <div className="relative order-2 lg:order-1">
            <div className="relative max-w-sm mx-auto lg:max-w-md">
              <img 
                src={barcelonaOfficeImage} 
                alt="Barcelona Office" 
                className="w-full h-auto object-contain mix-blend-multiply"
                style={{
                  filter: 'contrast(1.1) saturate(1.1)'
                }}
              />
            </div>
          </div>
          
          {/* Content - Right Side - Mobile optimized */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                <PhoneIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {currentContent.mainDescription}
            </h3>
            
            <div className="space-y-4 sm:space-y-6 mb-8">
              {currentContent.features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Call to Action Button */}
            <button
              onClick={() => onContactClick('outbound')}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 w-full sm:w-auto"
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