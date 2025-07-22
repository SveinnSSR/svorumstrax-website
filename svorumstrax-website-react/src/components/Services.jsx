import { PhoneIcon, UsersIcon, SparklesIcon } from '@heroicons/react/24/outline'
import barcelonaOfficeImage from '../assets/images/barcelona-office.png'

const Services = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Símsvörun',
      subtitle: 'Áreiðanleg og persónuleg símsvörun síðan 2019. Við bjóðum upp á sérhæfða símsvörun, vöktun tölvupósts og gervigreindarlausnir sem bæta þjónustu og auka afköst.',
      services: [
        {
          icon: PhoneIcon,
          title: 'Almenn símsvörun',
          description: 'Einföld og áreiðanleg þjónusta. Við svörum í þínu nafni, sendum símtöl áfram á réttan starfsmann og tökum skilaboð. Léttir álag á starfsfólki og hægt að setja upp með stuttum fyrirvara.',
          gradient: 'from-teal-500 to-teal-600',
          iconBg: 'from-teal-50 to-teal-100',
          iconColor: 'text-teal-600',
          borderColor: 'border-teal-200'
        },
        {
          icon: UsersIcon,
          title: 'Þitt eigið þjónustuver',
          description: 'Heildarlausn með fullkomlega þjálfuðum starfsmönnum sem þekkja þitt fyrirtæki, vörur og þjónustu. Sérhæfðir starfsmenn sem verða hluti af þínu teymi og geta svarað flóknum spurningum, leyst vandamál og veitt tæknilega aðstoð byggða á þínum upplýsingakerfum.',
          gradient: 'from-blue-500 to-blue-600',
          iconBg: 'from-blue-50 to-blue-100',
          iconColor: 'text-blue-600',
          borderColor: 'border-blue-200'
        },
        {
          icon: SparklesIcon,
          title: 'Gervigreindarsvörun í síma',
          description: 'Nýjustu gervigreindarlausnir sem svara símtölum allan sólarhringinn. AI símsvörun sem þekkir þitt fyrirtæki, svarar fyrirspurnum, tekur pöntun og veitir upplýsingar með hraða og nákvæmni. Ef þörf krefur, getur hún alltaf tengt við okkar eða þína þjónustufulltrúa til að tryggja hámarks þjónustugæði.',
          gradient: 'from-orange-500 to-orange-600',
          iconBg: 'from-orange-50 to-orange-100',
          iconColor: 'text-orange-600',
          borderColor: 'border-orange-200'
        }
      ]
    },
    en: {
      title: 'Phone Support',
      subtitle: 'Reliable and personal phone service since 2019. We offer specialized phone support, email monitoring and AI solutions that improve service and increase efficiency.',
      services: [
        {
          icon: PhoneIcon,
          title: 'General Phone Support',
          description: 'Simple and reliable service. We answer in your name, forward calls to the right employee and take messages. Reduces staff burden and can be set up with short notice.',
          gradient: 'from-teal-500 to-teal-600',
          iconBg: 'from-teal-50 to-teal-100',
          iconColor: 'text-teal-600',
          borderColor: 'border-teal-200'
        },
        {
          icon: UsersIcon,
          title: 'Your Own Service Center',
          description: 'Complete solution with perfectly trained staff who know your business, products and services. Specialized staff who become part of your team and can answer complex questions, solve problems and provide technical assistance based on your information systems.',
          gradient: 'from-blue-500 to-blue-600',
          iconBg: 'from-blue-50 to-blue-100',
          iconColor: 'text-blue-600',
          borderColor: 'border-blue-200'
        },
        {
          icon: SparklesIcon,
          title: 'AI Phone Support',
          description: 'Latest AI solutions that answer phone calls around the clock. AI phone support that knows your business, answers inquiries, takes orders and provides information with speed and accuracy. When needed, it can always connect to our or your service representatives to ensure maximum service quality.',
          gradient: 'from-orange-500 to-orange-600',
          iconBg: 'from-orange-50 to-orange-100',
          iconColor: 'text-orange-600',
          borderColor: 'border-orange-200'
        }
      ]
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background gradient hints - matching hero section */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-teal-50/30 via-blue-50/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-50/30 via-amber-50/20 to-transparent"></div>
        
        {/* Subtle floating elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-orange-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-orange-800 bg-clip-text text-transparent">
              {currentContent.title}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>
        
        {/* Three Professional Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {currentContent.services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div 
                key={index}
                className={`group bg-white/80 backdrop-blur-sm border ${service.borderColor}/50 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500 hover:border-${service.borderColor.split('-')[1]}-300/70 relative overflow-hidden`}
              >
                {/* Subtle card gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.iconBg}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.iconBg} border ${service.borderColor}/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                  
                  {/* Gradient accent line */}
                  <div className={`w-16 h-1 bg-gradient-to-r ${service.gradient} rounded-full mb-4 group-hover:w-24 transition-all duration-300`}></div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                    {service.description}
                  </p>
                  
                  {/* CTA Button */}
                  <button
                    onClick={() => onContactClick('phone-support')}
                    className={`text-${service.iconColor.split('-')[1]}-600 hover:text-${service.iconColor.split('-')[1]}-700 font-semibold text-sm transition-colors duration-200 group-hover:translate-x-1 inline-flex items-center`}
                  >
                    {currentLanguage === 'is' ? 'Frekari upplýsingar' : 'Learn More'}
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Clean Phone Interface Visual - No People Banner */}
        <div className="flex justify-center">
          <div className="relative max-w-2xl mx-auto">
            {/* Multiple phone mockups showing the service in action */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-end">
              {/* Phone 1 - Teal theme */}
              <div className="relative group">
                <div className="w-48 h-80 mx-auto bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-1 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-black rounded-3xl overflow-hidden relative">
                    {/* Phone screen with audio waveform */}
                    <div className="absolute inset-4 bg-gradient-to-br from-teal-900/40 via-teal-800/30 to-orange-900/40 rounded-2xl flex flex-col items-center justify-center">
                      {/* Audio waveform */}
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(15)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-gradient-to-t from-teal-400 to-orange-400 rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 30 + 10}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                      <div className="text-white/80 text-xs font-medium">Almenn símsvörun</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 2 - Blue theme (taller/main) */}
              <div className="relative group">
                <div className="w-52 h-96 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-1 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-black rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-4 bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-orange-900/40 rounded-2xl flex flex-col items-center justify-center">
                      {/* Audio waveform */}
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(18)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-gradient-to-t from-blue-400 to-orange-400 rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 40 + 15}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                      <div className="text-white/80 text-xs font-medium">Þjónustuver</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 3 - Orange theme */}
              <div className="relative group">
                <div className="w-48 h-80 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-1 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-black rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-4 bg-gradient-to-br from-orange-900/40 via-orange-800/30 to-teal-900/40 rounded-2xl flex flex-col items-center justify-center">
                      {/* Audio waveform */}
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(15)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-gradient-to-t from-orange-400 to-teal-400 rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 30 + 10}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                      <div className="text-white/80 text-xs font-medium">AI símsvörun</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services