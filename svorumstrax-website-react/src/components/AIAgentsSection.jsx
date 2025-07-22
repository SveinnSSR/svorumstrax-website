import { 
  ClockIcon, 
  CogIcon, 
  ChartBarIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

const AIAgentsSection = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Gervigreindarfulltrúar',
      subtitle: 'Gervigreind þjálfuð í þínu fyrirtæki sem svarar allan sólarhringinn. Veitir nákvæmar upplýsingar, framkvæmir aðgerðir og hjálpar til við sölu.',
      mainDescription: 'Fullkomlega þjálfuð í þínum vörum og þjónustu. Tekur við pöntunum, bókar tíma og gefur nákvæm svör - eins og þinn besti starfsmaður.',
      features: [
        {
          icon: ClockIcon,
          title: '24/7 þjónusta - aldrei í fríi',
          description: 'Svarar á íslensku, ensku og öðrum tungumálum. Vinnur þegar þú sefur.'
        },
        {
          icon: CogIcon,
          title: 'Samþætt við þín kerfi',
          description: 'Tengist bókunarkerfum, CRM og öðrum kerfum. Framkvæmir aðgerðir í rauntíma.'
        },
        {
          icon: ChartBarIcon,
          title: 'Greiningarkerfi með innsýn',
          description: 'Yfirsýn í rauntíma þar sem þú fylgist með öllum samskiptum og færð greiningu á viðskiptavinum.'
        }
      ],
      platforms: [
        {
          icon: DevicePhoneMobileIcon,
          title: 'Vefsíða og símforrit',
          description: 'Spjallgluggi á vefsíðuna þína eða samþætting í þitt eigið app'
        },
        {
          icon: ComputerDesktopIcon,
          title: 'Samskiptamiðlar',
          description: 'Facebook, WhatsApp, Instagram og aðrir miðlar'
        },
        {
          icon: EnvelopeIcon,
          title: 'Tölvupóstur',
          description: 'Svarar póstkerfinu þínu og sendir upplýsingar sjálfkrafa'
        }
      ],
      button: 'Frekari upplýsingar'
    },
    en: {
      title: 'AI Agents',
      subtitle: 'AI trained in your business that answers around the clock. Provides accurate information, executes actions and helps with sales.',
      mainDescription: 'Perfectly trained in your products and services. Takes orders, books appointments and provides accurate answers - like your best employee.',
      features: [
        {
          icon: ClockIcon,
          title: '24/7 service - never off duty',
          description: 'Answers in Icelandic, English and other languages. Works while you sleep.'
        },
        {
          icon: CogIcon,
          title: 'Integrated with your systems',
          description: 'Connects to booking systems, CRM and other systems. Executes actions in real-time.'
        },
        {
          icon: ChartBarIcon,
          title: 'Analytics system with insights',
          description: 'Real-time overview where you monitor all communications and get customer insights.'
        }
      ],
      platforms: [
        {
          icon: DevicePhoneMobileIcon,
          title: 'Website and mobile apps',
          description: 'Chat widget on your website or integration into your own app'
        },
        {
          icon: ComputerDesktopIcon,
          title: 'Social media',
          description: 'Facebook, WhatsApp, Instagram and other platforms'
        },
        {
          icon: EnvelopeIcon,
          title: 'Email',
          description: 'Responds to your email system and sends information automatically'
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
        {/* Header - White background like other sections */}
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          
          {/* Left side - Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {currentContent.mainDescription}
            </h3>
            
            <div className="space-y-6 mb-8">
              {currentContent.features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => onContactClick('ai-service')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {currentContent.button}
            </button>
          </div>
          
          {/* Right side - AI Phone Mockups showing chat interfaces */}
          <div className="relative flex justify-center">
            <div className="grid grid-cols-2 gap-6 items-end">
              {/* Phone 1 - AI Chat Interface */}
              <div className="relative">
                <div className="w-40 h-72 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-1 shadow-2xl">
                  <div className="w-full h-full bg-black rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-2 bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-teal-900/40 rounded-2xl p-3">
                      {/* Chat messages */}
                      <div className="space-y-2 text-xs">
                        <div className="bg-blue-600/80 text-white p-2 rounded-lg text-right ml-4">
                          Hæ! Get ég bókað tíma?
                        </div>
                        <div className="bg-white/90 text-gray-800 p-2 rounded-lg mr-4">
                          Já! Hvað hentar þér best - 11:00 eða 14:30?
                        </div>
                        <div className="flex gap-1 justify-center">
                          <div className="bg-orange-500 px-2 py-1 rounded-full text-white text-xs">11:00</div>
                          <div className="bg-orange-500 px-2 py-1 rounded-full text-white text-xs">14:30</div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 text-white/60 text-xs text-center">
                        AI Spjallmenni
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 2 - AI Voice Interface */}
              <div className="relative">
                <div className="w-44 h-80 bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-1 shadow-2xl">
                  <div className="w-full h-full bg-black rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-2 bg-gradient-to-br from-teal-900/40 via-teal-800/30 to-orange-900/40 rounded-2xl flex flex-col items-center justify-center p-3">
                      {/* AI Voice Waveform */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-gradient-to-t from-teal-400 to-orange-400 rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 25 + 8}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                      <div className="text-white/80 text-xs font-medium mb-2">AI Símsvörun</div>
                      <div className="text-white/60 text-xs text-center">
                        "Hæ! Þakka þér fyrir að hringja í..."
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platforms Section - Simple Grid */}
        <div className="border-t border-gray-200 pt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Virkar á öllum samskiptaleiðum
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentContent.platforms.map((platform, index) => {
              const IconComponent = platform.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-gray-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{platform.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{platform.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIAgentsSection