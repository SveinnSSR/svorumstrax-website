import { 
  ClockIcon, 
  CogIcon, 
  ChartBarIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon
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
      subtitle: 'Gervigreind þjálfuð í þínu fyrirtæki sem svarar allan sólarhringinn og þjálfar starfsfólkið þitt. Veitir viðskiptavinum nákvæmar upplýsingar og hjálpar teyminu þínu að læra verkferla og reglur.',
      mainDescription: 'Við búum til tvær gervigreindir fyrir þig: eina sem svarar viðskiptavinum þínum og aðra sem þjálfar starfsfólkið þitt í verkferlum og reglum fyrirtækisins.',
      features: [
        {
          icon: ClockIcon,
          title: '24/7 þjónusta viðskiptavina',
          description: 'Svarar á íslensku, ensku og öðrum tungumálum. Tekur við pöntunum og bókar tíma allan sólarhringinn.'
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
        },
        {
          icon: AcademicCapIcon,
          title: 'Starfsmannaþjálfun með AI',
          description: 'Innri AI sem þekkir allar verklagsreglur þínar og þjálfar nýtt fólk strax.'
        },
        {
          icon: UserGroupIcon,
          title: 'Þekkingamiðlun',
          description: 'Varðveitir þekkingu reynslumikilla starfsmanna og gerir hana aðgengilega öllum.'
        },
        {
          icon: BookOpenIcon,
          title: 'Verkferlaráðgjöf',
          description: 'Starfsfólk getur spurt AI um stefnur, verkferla og reglur og fengið tafarlaus svör.'
        }
      ],
      platformsTitle: 'Virkar á öllum samskiptaleiðum',
      platformsSubtitle: 'Ein gervigreind sem svarar þínum viðskiptavinum hvar sem þeir eru',
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
      subtitle: 'Intelligent agents trained specifically for your business, working around the clock to serve customers and train your team. They provide accurate customer service while helping your staff master company procedures and policies.',
      mainDescription: 'We create two AI systems for you: one that serves your customers with expert support, and another that trains your staff on procedures and company knowledge.',
      features: [
        {
          icon: ClockIcon,
          title: 'Always-on customer service',
          description: 'Responds in multiple languages including Icelandic and English. Handles orders and bookings 24/7.'
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
        },
        {
          icon: AcademicCapIcon,
          title: 'AI-powered staff training',
          description: 'Internal AI that knows all your procedures and trains new employees instantly.'
        },
        {
          icon: UserGroupIcon,
          title: 'Knowledge preservation',
          description: 'Captures expertise from experienced staff and makes it accessible to everyone.'
        },
        {
          icon: BookOpenIcon,
          title: 'Procedure assistance',
          description: 'Staff can ask AI about policies, procedures, and rules for immediate answers.'
        }
      ],
      platformsTitle: 'Works across all communication channels',
      platformsSubtitle: 'One AI that meets your customers wherever they are',
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
    <section className="py-24 relative overflow-hidden" style={{ background: 'rgba(10, 14, 39, 0.95)' }}>
      {/* Navy background with subtle texture */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)' }}></div>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]"></div>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_75%_75%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-8 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Main Content - Split Layout - Mobile optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Left side - Content */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight">
              {currentContent.mainDescription}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentContent.features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400/20 to-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <IconComponent className="w-4 h-4 text-orange-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-white mb-1 text-sm">{feature.title}</h4>
                        <p className="text-slate-300 leading-relaxed text-xs">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => onContactClick('ai-service')}
              className="bg-white hover:bg-gray-50 text-slate-900 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/20 w-full sm:w-auto"
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
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Platforms Section */}
        <div className="border-t border-white/10 pt-16">
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
                className="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                {/* Platform Icon */}
                <div className="w-12 h-12 mx-auto mb-4 p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                  <img 
                    src={platform.icon} 
                    alt={platform.name}
                    className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                
                {/* Platform Info */}
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  {platform.name}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-slate-400 text-sm">
              {currentLanguage === 'is' 
                ? '+ Vefsíður, símforrit, innri kerfi og önnur samskiptakerfi' 
                : '+ Websites, mobile apps, internal systems and other platforms'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIAgentsSection