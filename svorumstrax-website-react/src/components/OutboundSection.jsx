import { 
  PhoneIcon, 
  ChartBarIcon,
  CheckCircleIcon,
  BuildingOffice2Icon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
// You'll need to add a mobile CRM mockup image to assets/images/
// import crmMobileImage from '../assets/images/crm-mobile.png'

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
      ],
      services: [
        {
          title: 'Sölusamtöl',
          description: 'Bein sala á vörum og þjónustu með þjálfuðum sérfræðingum'
        },
        {
          title: 'Fundabókanir',
          description: 'Bókum fundi fyrir þitt söluteymi við hæfustu viðskiptavini'
        },
        {
          title: 'Markaðsrannsóknir',
          description: 'Söfnum upplýsingum og endurfærum viðskiptavinaskrár'
        }
      ],
      benefits: [
        'Hentar best fyrir',
        'Sölu, fundabókanir og markaðsrannsóknir',
        'B2B sérþekking',
        'B2C reynsla', 
        'CRM samþætting',
        'Öflugt sölufólk'
      ],
      button: 'Frekari upplýsingar'
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
      ],
      services: [
        {
          title: 'Sales calls',
          description: 'Direct sales of products and services with trained specialists'
        },
        {
          title: 'Meeting bookings',
          description: 'We book meetings for your sales team with qualified customers'
        },
        {
          title: 'Market research',
          description: 'We collect information and update customer databases'
        }
      ],
      benefits: [
        'Best suited for',
        'Sales, meeting bookings and market research',
        'B2B expertise',
        'B2C experience',
        'CRM integration', 
        'Experienced sales team'
      ],
      button: 'Learn More'
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
        
        {/* Main Content with Mobile CRM Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Mobile Phone Image - Your custom image */}
          <div className="relative order-1 lg:order-1">
            <div className="relative max-w-sm mx-auto">
              <img 
                src="/src/assets/images/outbound-phone.png" 
                alt="Outbound Call Interface" 
                className="w-full h-auto max-w-xs mx-auto"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))'
                }}
              />
            </div>
            
            {/* Stats overlay - positioned to not interfere with phone */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg border border-slate-200/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <ChartBarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">8/10</div>
                  <div className="text-sm text-gray-600">Dagleg markmið</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
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

        {/* Services Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Þjónusta sem skilar árangri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentContent.services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg transition-shadow duration-300">
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/70 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {currentContent.benefits[0]}
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed text-center">
              {currentContent.benefits[1]}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {currentContent.benefits.slice(2).map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2 justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-center">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={() => onContactClick('outbound-service')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {currentContent.button}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OutboundSection
