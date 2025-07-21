import { PhoneIcon, UsersIcon } from '@heroicons/react/24/outline'
import barcelonaOfficeImage from '../assets/images/barcelona-office.png'

const Services = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Símsvörun',
      subtitle: 'Reynsla og áreiðanleiki þegar þú þarft á mannlegri þjónustu að halda. Íslenskir sérfræðingar í Barcelona sem þekkja þinn rekstur.',
      services: [
        {
          icon: PhoneIcon,
          title: 'Almenn símsvörun',
          description: 'Einfalt og áreiðanlegt. Við svörum í þínu nafni, sendum símtöl áfram og tökum ítarleg skilaboð. Tilbúið á stuttum tíma.',
          accentColor: 'bg-emerald-500',
          iconBg: 'bg-emerald-50',
          iconColor: 'text-emerald-600'
        },
        {
          icon: UsersIcon,
          title: 'Þitt eigið þjónustuver',
          description: 'Heildarlausn með þjálfuðum starfsmönnum sem þekkja þitt fyrirtæki. Svarað flóknum spurningum og leyst vandamál.',
          accentColor: 'bg-blue-500',
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-600'
        }
      ]
    },
    en: {
      title: 'Phone Support',
      subtitle: 'Experience and reliability when you need human service. Icelandic specialists in Barcelona who know your business.',
      services: [
        {
          icon: PhoneIcon,
          title: 'General Phone Support',
          description: 'Simple and reliable. We answer in your name, route calls and take detailed messages. Ready in no time.',
          accentColor: 'bg-emerald-500',
          iconBg: 'bg-emerald-50',
          iconColor: 'text-emerald-600'
        },
        {
          icon: UsersIcon,
          title: 'Your Own Service Center',
          description: 'Complete solution with trained staff who know your business. Handle complex questions and solve problems.',
          accentColor: 'bg-blue-500',
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-600'
        }
      ]
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-orange-50 to-orange-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>
        
        {/* Cleaner layout without busy stats overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Services Cards */}
          <div className="space-y-8">
            {currentContent.services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-orange-200/50 p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`w-16 h-1 ${service.accentColor} rounded-full mb-4`}></div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg mb-4">
                        {service.description}
                      </p>
                      <button
                        onClick={() => onContactClick('phone-support')}
                        className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
                      >
                        {currentLanguage === 'is' ? 'Frekari upplýsingar →' : 'Learn More →'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Clean Barcelona Office Image - No busy overlays */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={barcelonaOfficeImage} 
                alt="Barcelona Office" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Just one subtle accent element */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <UsersIcon className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services