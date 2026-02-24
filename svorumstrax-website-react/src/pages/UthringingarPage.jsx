
import React from 'react'
import { 
  PhoneIcon,
  ChartBarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  PresentationChartLineIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import TrustSectionOutbound from '../components/TrustSectionOutbound'

// Import images
// import callflow from '../assets/images/callflow.svg'  // COMMENTED OUT FOR TESTING
import logoYellow from '../assets/images/logo_yellow.png'

const UthringingarPage = ({ currentLanguage = 'is', onContactClick }) => {
  const content = {
    is: {
      // Hero
      title: 'Úthringingar',
      subtitle: 'Sérhæfð söluteymi sem skila árangri',
      intro1: 'Við höfum séð um úthringiverkefni fyrir mörg af stærstu fyrirtækjum landsins. Okkar sérhæfðu söluteymi hafa reynslu af bæði B2B og B2C markaði og nota nýjustu tækni til að hámarka árangur.',
      intro2: 'Teymið okkar er þjálfað í þínum vörum og þjónustu og við tengumst við þín CRM kerfi til að mæla árangur í rauntíma. Við byggjum traust og sköpum varanlegt gildi í hverju samtali.',
      ctaButton: 'Fá tilboð',
      
      // Services section
      servicesTitle: 'Hvað gerum við?',
      services: [
        {
          icon: PhoneIcon,
          title: 'B2B Sala',
          description: 'Sérhæft teymi fyrir fyrirtækjamarkað með djúpa þekkingu á íslenskum viðskiptum. Við byggjum langtímasambönd og skilum mælanlegum árangri.'
        },
        {
          icon: UserGroupIcon,
          title: 'B2C Sala',
          description: 'Reynslumikið teymi í neytendamarkaði sem þekkir íslenskan markað vel. Persónuleg og árangursrík samskipti við hvern viðskiptavin.'
        },
        {
          icon: ChartBarIcon,
          title: 'Markaðsrannsóknir',
          description: 'Safnum gögnum og veitum innsýn í markað þinn. Framkvæmum kannanir og greiningar sem styðja við stefnumótun.'
        },
        {
          icon: PresentationChartLineIcon,
          title: 'Eftirfylgni',
          description: 'Fylgjum eftir sölu og tryggum ánægju viðskiptavina. Byggjum sterk sambönd sem skila sér í endurtekinni sölu.'
        }
      ],
      
      // Features section
      featuresTitle: 'Af hverju Svörum strax?',
      features: [
        {
          icon: UserGroupIcon,
          title: 'Öflugt sölufólk með reynslu',
          description: 'Teymi okkar er þjálfað í sölu og hefur áralanga reynslu. Við þjálfum alla í þínum vörum og þjónustu áður en verkefni hefjast.'
        },
        {
          icon: CogIcon,
          title: 'Nýjasta CRM tækni',
          description: 'Við notum fullkomna CRM lausn sem tengist við þín kerfi. Þú færð rauntíma yfirsýn yfir alla verkþætti og árangur.'
        },
        {
          icon: ChartBarIcon,
          title: 'Mæling og skýrslugerð',
          description: 'Nákvæm mæling á öllum verkþáttum. Þú færð reglulegar skýrslur og greiningar sem sýna árangur og tækifæri.'
        },
        {
          icon: CheckCircleIcon,
          title: 'Reynsla af umfangsmiklum verkefnum',
          description: 'Úthringiverkefni fyrir leiðandi fyrirtæki á íslenskum markaði.'
        }
      ],
      
      // Process section
      processTitle: 'Hvernig við vinnum',
      processSteps: [
        {
          number: '01',
          title: 'Skilningur á þörfum',
          description: 'Við byrjum á að skilja þínar þarfir, markmið og markmarkaði. Þetta tryggir að við séum samstillt frá upphafi.'
        },
        {
          number: '02',
          title: 'Þjálfun teymis',
          description: 'Teymi okkar kynna sér þínar vörur, þjónustu og gildi til hlítar. Við gerum okkur færa um að tala um þitt fyrirtæki eins og sérfræðingar.'
        },
        {
          number: '03',
          title: 'Uppsetning og samþætting',
          description: 'Við setjum upp öll nauðsynleg kerfi, tengingar við þitt CRM og mælitæki. Allt tilbúið áður en fyrsta símtalið fer af stað.'
        },
        {
          number: '04',
          title: 'Framkvæmd og fínstilling',
          description: 'Við hefjum verkefnið og fylgjum náið eftir árangri. Stöðugar umbætur byggðar á gögnum tryggja bestan árangur.'
        }
      ],
      
      // CTA
      ctaTitle: 'Tilbúinn að auka sölu?',
      ctaDescription: 'Við metum þarfir þínar og gerum sérsniðið tilboð. Hafðu samband til að fá ókeypis ráðgjöf um hvernig við getum hjálpað þér að ná sölumarkmiðum.',
      ctaButtonFinal: 'Fá tilboð'
    },
    en: {
      // Hero
      title: 'Outbound Calling',
      subtitle: 'Specialized sales teams that deliver results',
      intro1: 'We have handled outbound calling projects for many of Iceland\'s largest companies. Our specialized sales teams have experience in both B2B and B2C markets and use the latest technology to maximize results.',
      intro2: 'Our team is trained in your products and services, and we integrate with your CRM systems to measure results in real-time. We build trust and create lasting value in every conversation.',
      ctaButton: 'Get Quote',
      
      // Services section
      servicesTitle: 'What we do',
      services: [
        {
          icon: PhoneIcon,
          title: 'B2B Sales',
          description: 'Specialized team for the business market with deep knowledge of Icelandic commerce. We build long-term relationships and deliver measurable results.'
        },
        {
          icon: UserGroupIcon,
          title: 'B2C Sales',
          description: 'Experienced team in the consumer market with excellent knowledge of the Icelandic market. Personal and effective communication with each customer.'
        },
        {
          icon: ChartBarIcon,
          title: 'Market Research',
          description: 'We collect data and provide insights into your market. We conduct surveys and analyses that support strategic planning.'
        },
        {
          icon: PresentationChartLineIcon,
          title: 'Customer Service',
          description: 'We follow up on sales, gather feedback, and ensure customer satisfaction. We build strong relationships that result in repeat business.'
        }
      ],
      
      // Features section
      featuresTitle: 'Why Svörum strax?',
      features: [
        {
          icon: UserGroupIcon,
          title: 'Experienced sales professionals',
          description: 'Our team is trained in sales and has years of experience. We train everyone in your products and services before projects begin.'
        },
        {
          icon: CogIcon,
          title: 'Latest CRM technology',
          description: 'We use advanced CRM solutions that integrate with your systems. You get real-time overview of all activities and results.'
        },
        {
          icon: ChartBarIcon,
          title: 'Measurement and reporting',
          description: 'Precise measurement of all activities. You receive regular reports and analyses showing results and opportunities.'
        },
        {
          icon: CheckCircleIcon,
          title: 'Proven track record',
          description: 'We have handled projects for many of Iceland\'s largest companies with excellent results. Let\'s discuss references.'
        }
      ],
      
      // Process section
      processTitle: 'How we work',
      processSteps: [
        {
          number: '01',
          title: 'Understanding needs',
          description: 'We start by understanding your needs, goals, and target markets. This ensures we are aligned from the start.'
        },
        {
          number: '02',
          title: 'Team training',
          description: 'Our team thoroughly learns your products, services, and values. We become capable of talking about your company like experts.'
        },
        {
          number: '03',
          title: 'Setup and integration',
          description: 'We set up all necessary systems, connections to your CRM, and measurement tools. Everything ready before the first call goes out.'
        },
        {
          number: '04',
          title: 'Execution and optimization',
          description: 'We launch the project and closely monitor results. Continuous improvements based on data ensure the best results.'
        }
      ],
      
      // CTA
      ctaTitle: 'Ready to increase sales?',
      ctaDescription: 'We assess your needs and create a customized quote. Contact us for free consultation on how we can help you reach your sales goals.',
      ctaButtonFinal: 'Get Quote'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Title + Subtitle + Text Content (IMAGE COMMENTED OUT) */}
      <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 bg-white overflow-hidden">
        {/* Subtle background gradients - matching homepage */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-50/40 via-teal-50/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-50/40 via-amber-50/20 to-transparent"></div>
          
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-orange-100/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Title + Subtitle centered */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight text-slate-900">
              {currentContent.title}
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {currentContent.subtitle}
            </p>
          </div>

          {/* Text paragraphs - centered like Símsvörun */}
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>{currentContent.intro1}</p>
              <p>{currentContent.intro2}</p>
            </div>
          </div>

          {/* IMAGE + LOGO SECTION COMMENTED OUT FOR TESTING */}
          {/* 
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center mt-16">
            <div className="flex justify-center lg:justify-start -mx-4 sm:-mx-8 lg:mx-0">
              <div className="relative w-full max-w-4xl lg:-ml-16">
                <img 
                  src={callflow}
                  alt="Outbound calling workflow"
                  className="w-full h-auto scale-110 lg:scale-125"
                />
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-8">
                <p>{currentContent.intro1}</p>
                <p>{currentContent.intro2}</p>
              </div>

              <div className="mb-8">
                <img 
                  src={logoYellow}
                  alt="Svörum strax"
                  className="w-full max-w-sm opacity-85"
                />
              </div>
              
              <div>
                <button
                  onClick={() => onContactClick && onContactClick('outbound-calling')}
                  className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                >
                  {currentContent.ctaButton}
                </button>
              </div>
            </div>
          </div>
          */}
        </div>
      </section>

      {/* Trust Section - Outbound clients */}
      <TrustSectionOutbound currentLanguage={currentLanguage} />

      {/* Services Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              {currentContent.servicesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentContent.services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              {currentContent.featuresTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentContent.features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-8 border border-gray-200/50">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <IconComponent className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              {currentContent.processTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentContent.processSteps.map((step, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Light version */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            {currentContent.ctaTitle}
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {currentContent.ctaDescription}
          </p>
          <button 
            onClick={() => onContactClick && onContactClick('outbound-calling')}
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            {currentContent.ctaButtonFinal}
          </button>
        </div>
      </section>
    </div>
  )
}

export default UthringingarPage