import React from 'react'
import { 
  CalendarIcon,
  EnvelopeIcon,
  ShareIcon,
  CogIcon
} from '@heroicons/react/24/outline'

const SimsvorunPage = ({ currentLanguage = 'is' }) => {
  const content = {
    is: {
      title: 'Símsvörun',
      subtitle: 'Áreiðanleg og persónuleg símsvörun síðan 2019',
      description: 'Við hjá Svörum strax bjóðum fyrirtækjum upp á símsvörun af ýmsu tagi. Okkur þykir fátt skemmtilegra en að veita fyrsta flokks þjónustu og leggjum okkur fram við að kynnast þínu fyrirtæki vel, ásamt því að meta þarfir hvers og eins til þess að geta tengst viðskiptavinum á sem bestan hátt.',
      description2: 'Að útvista símtölum sem berast yfir allan daginn minnkar álag á annarri starfsemi fyrirtækisins og skilar sér í hærra þjónustustigi þvert á fyrirtækið. Það er hagkvæmt að útvista símsvörun til Svörum Strax, en hjá okkur starfar hópur sérfræðinga sem hefur mikla reynslu af símsvörun og samskiptum við viðskiptavini.',
      description3: 'Við erum með hágæða símkerfi auk Microsoft CRM kerfis, sem gerir þjónustuna örugga og gagnsæja. Einnig ábyrgjumst við það að við hugsum um þína viðskiptavini líkt og þeir væru okkar eigin. Við getum tengst ykkar upplýsingakerfi til að veita sem besta þjónustu.',
      servicesTitle: 'Við bjóðum upp á',
      services: [
        {
          icon: CalendarIcon,
          title: 'Tímabókanir',
          description: 'Við tökum að okkur að bóka tíma, eða skrá þá niður og senda skýrslu í lok dags. Við viljum auðvelda ykkur dagleg störf með því að leysa mál í fyrstu snertingu.'
        },
        {
          icon: EnvelopeIcon,
          title: 'Tölvupóstur',
          description: 'Við tökum að okkur að svara öllum fyrirspurnum sem að berast á ykkar tölvupóstföng í ykkar nafni. Einfalt í uppsetningu og viðskiptavinir ykkar fá svör hratt og örugglega.'
        },
        {
          icon: ShareIcon,
          title: 'Samfélagsmiðlar',
          description: 'Uppsetning á Facebook, Instagram og LinkedIn. Eða einfaldlega að vakta og svara öllum skilaboðum og athugasemdum sem að koma inn á síðurnar.'
        },
        {
          icon: CogIcon,
          title: 'Þinn þjónustufulltrúi',
          description: 'Við getum framkvæmt flóknari verkefni í samráði við þitt fyrirtæki. Hjá Svörum strax starfar mjög hæft starfsfólk með hátt menntunarstig sem geta tekið að sér flóknari sérverkefni.'
        }
      ],
      packagesTitle: 'Þjónustupakkar',
      packages: [
        {
          name: 'Almenn símsvörun',
          description: 'Frábær og þægileg lausn fyrir minni fyrirtæki og stofnanir með lítil umsvif. Eða einfaldlega þau sem að vilja fá aðstoð á álagstímum.',
          features: [
            'Símsvörun á dagvinnutíma',
            'Tímabókanir og skilaboðataka',
            'Persónuleg þjónusta í þínu nafni',
            'Daglegur uppgjör og skýrslur'
          ]
        },
        {
          name: 'Þjónustuver',
          description: 'Heildarlausn fyrir fyrirtæki sem þurfa sérhæfða þjónustu og vilja að starfsfólk okkar verði hluti af þeirra teymi.',
          features: [
            'Sérhæft og þjálfað starfsfólk',
            'Þekking á þínum vörum og þjónustu',
            'Tengingar við þín upplýsingakerfi',
            'Flóknar fyrirspurnir og vandamálalausn',
            'Mánaðarlegar skýrslur og greining'
          ]
        },
        {
          name: 'Netspjall',
          description: 'Láttu þjónustufulltrúana okkar taka á móti þínum viðskiptavinum í gegnum netspjall á þægilegan máta.',
          features: [
            'Lifandi spjall á vefsíðu þinni',
            'Svörun á Messenger og öðrum miðlum',
            'Fljót uppsetning og samþætting',
            'Skýrslur um samtöl og árangur'
          ]
        }
      ],
      ctaTitle: 'Fáðu tilboð fyrir þitt fyrirtæki',
      ctaDescription: 'Við metum þarfir hvers fyrirtækis fyrir sig og gerum sérsniðið tilboð. Hafðu samband til að fá ókeypis mat á þínum þörfum.',
      ctaButton: 'Fá tilboð'
    },
    en: {
      title: 'Phone Answering Service',
      subtitle: 'Reliable and professional phone service since 2019',
      description: 'At Svörum strax, we offer companies various types of phone answering services. Nothing pleases us more than providing first-class service, and we strive to get to know your business well while assessing each client\'s needs to connect with customers in the best possible way.',
      description2: 'Outsourcing incoming calls throughout the day reduces pressure on other business operations and results in higher service levels across the company. Outsourcing phone answering to Svörum Strax is cost-effective, as we have a team of specialists with extensive experience in phone answering and customer communication.',
      description3: 'We have high-quality phone systems along with Microsoft CRM systems, making our service secure and transparent. We also guarantee that we care for your customers as if they were our own. We can integrate with your information systems to provide the best possible service.',
      servicesTitle: 'What we offer',
      services: [
        {
          icon: CalendarIcon,
          title: 'Appointment Booking',
          description: 'We handle appointment bookings, or record them and send reports at the end of the day. We want to make your daily work easier by resolving matters at first contact.'
        },
        {
          icon: EnvelopeIcon,
          title: 'Email Management',
          description: 'We handle all inquiries that come to your email addresses in your name. Simple to set up and your customers get fast and reliable responses.'
        },
        {
          icon: ShareIcon,
          title: 'Social Media',
          description: 'Setup on Facebook, Instagram and LinkedIn. Or simply monitoring and responding to all messages and comments that come to the pages.'
        },
        {
          icon: CogIcon,
          title: 'Your Service Representative',
          description: 'We can perform more complex projects in consultation with your company. At Svörum strax, we have highly qualified staff with high education levels who can take on more complex specialized projects.'
        }
      ],
      packagesTitle: 'Service Packages',
      packages: [
        {
          name: 'Basic Phone Service',
          description: 'Great and convenient solution for smaller companies and institutions with low volume. Or simply those who want assistance during busy periods.',
          features: [
            'Phone answering during business hours',
            'Appointment booking and message taking',
            'Personal service in your name',
            'Daily reports and summaries'
          ]
        },
        {
          name: 'Customer Service Center',
          description: 'Complete solution for companies that need specialized service and want our staff to become part of their team.',
          features: [
            'Specialized and trained staff',
            'Knowledge of your products and services',
            'Integration with your information systems',
            'Complex inquiries and problem solving',
            'Monthly reports and analysis'
          ]
        },
        {
          name: 'Live Chat',
          description: 'Let our service representatives welcome your customers through live chat in a convenient way.',
          features: [
            'Live chat on your website',
            'Responses on Messenger and other platforms',
            'Quick setup and integration',
            'Reports on conversations and results'
          ]
        }
      ],
      ctaTitle: 'Get a quote for your business',
      ctaDescription: 'We assess each company\'s needs individually and create customized quotes. Contact us to get a free assessment of your requirements.',
      ctaButton: 'Get Quote'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <div className="min-h-screen bg-white">
      {/* Dark Hero Banner */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-500 to-transparent"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-500 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight">
              {currentContent.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
              {currentContent.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <p>{currentContent.description}</p>
            <p>{currentContent.description2}</p>
            <p>{currentContent.description3}</p>
          </div>
        </div>
      </section>

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
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
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

      {/* Service Packages Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              {currentContent.packagesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {currentContent.packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {currentContent.ctaTitle}
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {currentContent.ctaDescription}
          </p>
          <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg">
            {currentContent.ctaButton}
          </button>
        </div>
      </section>
    </div>
  )
}

export default SimsvorunPage
