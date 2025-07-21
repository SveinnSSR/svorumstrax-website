import { 
  ClockIcon, 
  CogIcon, 
  ChartBarIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import mobileChatbotImage from '../assets/images/mobile-chatbot.png'
import AIConversationDemo from './AIConversationDemo'

const AIAgentsSection = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Gervigreindarfulltrúar',
      subtitle: 'Gervigreind þjálfuð í þínu fyrirtæki sem svarar allan sólarhringinn. Veitir nákvæmar upplýsingar, framkvæmir aðgerðir og hjálpar til við sölu.',
      mainDescription: 'Sérhæfð gervigreind sem þekkir þinn rekstur út og inn. Tekur við pöntunum, bókar tíma og veitir innsýn í hvað viðskiptavinir þurfa.',
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
          title: 'Þjálfuð í þínu fyrirtæki',
          description: 'Þekkir þínar vörur, verð og reglur. Aukin sala og betri þjónusta.'
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
      benefits: [
        'Hentar best fyrir',
        'Upplýsingagjöf, bókanir, sala og fyrstu samskipti',
        '24/7 Þjónusta',
        'Aukin sala',
        'Betri þjónusta',
        'Samþætt við kerfi'
      ],
      button: 'Frekari upplýsingar'
    },
    en: {
      title: 'AI Agents',
      subtitle: 'AI trained in your business that answers around the clock. Provides accurate information, executes actions and helps with sales.',
      mainDescription: 'Specialized AI that knows your business inside and out. Takes orders, books appointments and provides insights into what customers need.',
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
          title: 'Trained in your business',
          description: 'Knows your products, prices and rules. Increased sales and better service.'
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
      benefits: [
        'Best suited for',
        'Information sharing, bookings, sales and first contact',
        '24/7 Service',
        'Increased sales',
        'Better service',
        'System integration'
      ],
      button: 'Learn More'
    }
  }

  const currentContent = content[currentLanguage]

  // Chat SVG component - NOW matches the feature icon gradient (orange)
  const ChatSVG = ({ className }) => (
    <svg 
      width="36" 
      height="36" 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
    >
      <defs>
        <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9A3C" />
          <stop offset="50%" stopColor="#FFA947" />
          <stop offset="100%" stopColor="#FFB84D" />
        </linearGradient>
      </defs>
      <path 
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" 
        fill="url(#chatGradient)"
      />
      <circle cx="9" cy="10" r="1" fill="white"/>
      <circle cx="12" cy="10" r="1" fill="white"/>
      <circle cx="15" cy="10" r="1" fill="white"/>
    </svg>
  )

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            {currentContent.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content with Live Conversation Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <ChatSVG className="w-8 h-8 text-white" />
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {currentContent.mainDescription}
            </h3>
            
            <div className="space-y-6">
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
          </div>
          
          {/* Live Conversation Demo */}
          <div className="relative">
            <AIConversationDemo currentLanguage={currentLanguage} />
            
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <ChartBarIcon className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Platforms Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Virkar á öllum samskiptaleiðum
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentContent.platforms.map((platform, index) => {
              const IconComponent = platform.icon
              return (
                <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{platform.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{platform.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Chatbot + Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mobile Chatbot Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative max-w-sm mx-auto">
              <img 
                src={mobileChatbotImage} 
                alt="Mobile Chatbot" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent rounded-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <DevicePhoneMobileIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          
          {/* Benefits */}
          <div className="order-1 lg:order-2">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              {currentContent.benefits[0]}
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {currentContent.benefits[1]}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {currentContent.benefits.slice(2).map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => onContactClick('ai-service')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {currentContent.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIAgentsSection