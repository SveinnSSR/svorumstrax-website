import { 
  ClockIcon, 
  CogIcon, 
  ChartBarIcon
} from '@heroicons/react/24/outline'
import chatbotUiDemo from '../assets/images/chatbot-ui-demo.png'

// Import platform icons
import whatsappIcon from '../assets/images/platform-icons/whatsapp.svg'
import messengerIcon from '../assets/images/platform-icons/messenger.svg'
import instagramIcon from '../assets/images/platform-icons/instagram.svg'
import gmailIcon from '../assets/images/platform-icons/gmail.svg'

const AIAgentsSection = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Gervigreindarfulltrúar',
      subtitle: 'Gervigreind þjálfuð í þínu fyrirtæki sem svarar allan sólarhringinn. Veitir nákvæmar upplýsingar, framkvæmir aðgerðir og hjálpar til við sölu.',
      mainDescription: 'Við sérhæfum gervigreind í að svara fyrir þinn rekstur. Tekur við pöntunum, bókar tíma og gefur nákvæm svör - eins og þinn besti starfsmaður.',
      features: [
        {
          icon: ClockIcon,
          title: '24/7 þjónusta - aldrei í fríi',
          description: 'Svarar á íslensku, ensku og öðrum tungumálum. Vinnur þegar þú sefur.'
        },
        {
          icon: CogIcon,
          title: 'Samþætt við þín kerfi',
          description: 'Tengist við bókunarkerfið þitt og framkvæmir aðgerðir í rauntíma.'
        },
        {
          icon: ChartBarIcon,
          title: 'Greiningarkerfi með innsýn',
          description: 'Yfirsýn í rauntíma þar sem þú fylgist með öllum samskiptum og færð greiningu á viðskiptavinum.'
        }
      ],
      platformsTitle: 'Virkar á öllum samskiptaleiðum',
      platformsSubtitle: 'Ein gervigreind sem svarar þínum viðskiptavinum hvar sem þeir eru - og getur einnig þjálfað starfsfólkið þitt',
      platforms: [
        {
          icon: whatsappIcon,
          name: 'WhatsApp',
          description: 'WhatsApp Business og WhatsApp Web samþætting'
        },
        {
          icon: messengerIcon,
          name: 'Messenger',
          description: 'Facebook Messenger fyrir viðskiptasíður'
        },
        {
          icon: instagramIcon,
          name: 'Instagram',
          description: 'Instagram Direct Messages og kommentakerfið'
        },
        {
          icon: gmailIcon,
          name: 'Tölvupóstur',
          description: 'Gmail, Outlook og öll helstu póstkerfin'
        }
      ],
      button: 'Frekari upplýsingar'
    },
    en: {
      title: 'AI Customer Agents',
      subtitle: 'Intelligent agents trained specifically for your business, working around the clock. They provide accurate information, take actions, and drive sales - just like your best team member.',
      mainDescription: 'Our AI agents are custom-trained on your business. They handle orders, book appointments, and provide expert answers with the knowledge and personality of your top performer.',
      features: [
        {
          icon: ClockIcon,
          title: 'Always-on service',
          description: 'Responds in multiple languages including Icelandic and English. Works while your team sleeps.'
        },
        {
          icon: CogIcon,
          title: 'Integrated with your systems',
          description: 'Connects directly to your booking system, CRM, and tools to take real-time actions.'
        },
        {
          icon: ChartBarIcon,
          title: 'Advanced analytics dashboard',
          description: 'Real-time insights into all customer interactions with detailed analytics and performance metrics.'
        }
      ],
      platformsTitle: 'Works across all communication channels',
      platformsSubtitle: 'One AI that serves your customers wherever they are - and can also train your staff',
      platforms: [
        {
          icon: whatsappIcon,
          name: 'WhatsApp',
          description: 'WhatsApp Business and WhatsApp Web integration'
        },
        {
          icon: messengerIcon,
          name: 'Messenger',
          description: 'Facebook Messenger for business pages'
        },
        {
          icon: instagramIcon,
          name: 'Instagram',
          description: 'Instagram Direct Messages and comment management'
        },
        {
          icon: gmailIcon,
          name: 'Email',
          description: 'Gmail, Outlook and all major email providers'
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

        {/* Main Content - Split Layout - Mobile optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Left side - Content */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">
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
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => onContactClick('ai-service')}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 w-full sm:w-auto"
            >
              {currentContent.button}
            </button>
          </div>
          
          {/* Right side - Static Chatbot UI Image - Mobile optimized */}
          <div className="relative order-first lg:order-last">
            <div className="relative max-w-xs mx-auto lg:max-w-sm">
              <img 
                src={chatbotUiDemo} 
                alt="Chatbot UI Demo"
                className="w-full h-auto drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dark Platforms Section */}
      <div className="relative" style={{ background: 'rgba(10, 14, 39, 0.95)' }}>
        {/* Navy background with subtle texture */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)' }}></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_75%_75%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {currentContent.platformsTitle}
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              {currentContent.platformsSubtitle}
            </p>
          </div>
          
          {/* Platform Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {currentContent.platforms.map((platform, index) => (
              <div 
                key={index} 
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 text-center"
              >
                {/* Platform Icon */}
                <div className="w-12 h-12 mx-auto mb-4 p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300 flex items-center justify-center">
                  <img 
                    src={platform.icon} 
                    alt={platform.name}
                    className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                  />
                </div>
                
                {/* Platform Info */}
                <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">
                  {platform.name}
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-slate-400 text-sm">
              {currentLanguage === 'is' 
                ? '+ Vefsíður, símforrit, innri starfsmannakerfi og önnur samskiptakerfi' 
                : '+ Websites, mobile apps, internal staff systems and other platforms'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIAgentsSection