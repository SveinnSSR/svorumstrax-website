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
        
        {/* Main Content with Barcelona Office Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Barcelona Office Image - Left Side - UPDATED for better blending */}
          <div className="relative order-1 lg:order-1">
            <div className="relative">
              <img 
                src={barcelonaOfficeImage} 
                alt="Barcelona Office" 
                className="w-full h-auto object-contain mix-blend-multiply"
                style={{
                  filter: 'contrast(1.1) saturate(1.1)',
                  maxWidth: '100%'
                }}
              />
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