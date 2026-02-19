import React from 'react'
import { 
  ShieldCheckIcon,
  CogIcon,
  UserGroupIcon,
  DocumentTextIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'
import TrustSectionAI from '../components/TrustSectionAI'

// Import images.
import analyticsDashboard from '../assets/images/analytics-dashboard.png'
import finalCall from '../assets/images/final-call.svg'
import logoYellow from '../assets/images/logo_yellow.png'
// Import icons (PNG for better rendering at small sizes)
import icon1 from '../assets/images/icon_1.svg'
import icon2 from '../assets/images/icon_2.svg'
import icon3 from '../assets/images/icon_3.svg'

const GervigreindarlausnirPage = ({ currentLanguage = 'is', onContactClick }) => {
  const content = {
    is: {
      // Hero
      title: 'Gervigreindarlausnir',
      subtitle: 'Gervigreind fyrir fyrirtæki',
      intro1: 'Við komum upp gervigreindarlausn sem byggir á þínum gögnum og verkferlum. Hún er nýtt bæði í samskiptum við viðskiptavini og sem stuðningskerfi fyrir starfsfólk og léttir á daglegum rekstri.',
      intro2: 'Lausnin er sett upp sérstaklega fyrir hvert fyrirtæki og byggir á skjölum, stefnum og verkferlum.',
      ctaButton: 'Fá ókeypis ráðgjöf',
      
      // Solutions section
      solutionsTitle: 'Lausnirnar',
      solutions: [
        {
          title: 'Gervigreindarfulltrúi',
          subtitle: '01',
          description: 'Gervigreind sem svarar viðskiptavinum á grundvelli þinna gagna og verkferla.',
          features: [
            'Sérhæft í þínu fyrirtæki og þjónustu',
            'Svarar stöðugt og á samræmdan hátt',
            'Léttir á álagi þjónustuvers',
            'Tengist þínum kerfum — tímabókanir, pantanir og fleira'
          ],
          icon: icon1
        },
        {
          title: 'Aðstoðarkerfi fyrir starfsfólk',
          subtitle: '02',
          description: 'Þekkingarkerfi sem styður starfsfólk í rauntíma, leiðbeinir í verkferlum og bendir á næstu skref í meðhöndlun erinda.',
          features: [
            'Svör byggð á verklagi, reglum og samþykktum ferlum',
            'Samræmi í svörum, óháð reynslu starfsmanns',
            'Flýtir aðlögun nýs starfsfólks',
            'Dregur úr óvissu og mistökum'
          ],
          icon: icon2
        },
        {
          title: 'Gervigreind fyrir tölvupóst',
          subtitle: '03',
          description: 'Gervigreind sem er þjálfuð á þínum gögnum og notuð til að útbúa nákvæm, samræmd svör í tölvupósti.',
          features: [
            'Starfsmaður setur inn fyrirspurn',
            'Kerfið skilar tillögu að svari',
            'Byggt á reglum og samþykktu verklagi',
            'Engin sjálfvirk sending nema þú viljir'
          ],
          icon: icon3
        }
      ],
      
      // Training section
      trainingTitle: 'Hvernig lausnirnar eru settar upp',
      trainingSubtitle: 'Sérlausn fyrir hvert fyrirtæki',
      trainingDescription: 'Gervigreindin er sett upp sérstaklega fyrir hvert fyrirtæki og byggð á:',
      trainingPoints: [
        'Skjölum og samþykktu verklagi',
        'Stefnum, reglum og samningum',
        'Sérhæfðu samhengi rekstursins'
      ],
      trainingNote: 'Gögnin þín eru einungis notuð í þínu umhverfi. Ekki til almennrar líkanaþjálfunar og alltaf undir þinni stjórn.',
      
      // Security section
      securityTitle: 'Gagnaöryggi',
      securityFeatures: [
        {
          icon: LockClosedIcon,
          title: 'Gögn eru aðskilin milli fyrirtækja',
          description: 'Algjör aðskilnaður á milli viðskiptavina'
        },
        {
          icon: UserGroupIcon,
          title: 'Aðgangsstýring eftir hlutverkum',
          description: 'Nákvæm stýring á því hver hefur aðgang að hverju'
        },
        {
          icon: ShieldCheckIcon,
          title: 'Dulkóðun í flutningi og geymslu',
          description: 'Gögn dulkóðuð innan ESB — undir þinni stjórn'
        },
        {
          icon: DocumentTextIcon,
          title: 'Rekjanleiki samskipta í bakenda',
          description: 'Full yfirsýn yfir alla notkun og samskipti'
        }
      ],
      securityNote: 'Hannað með trúnað og rekstraröryggi í forgangi',
      
      // CTA
      ctaTitle: 'Viltu sjá hvernig þetta myndi virka hjá þínu fyrirtæki?',
      ctaDescription: 'Hafðu samband og við förum yfir möguleika — án skuldbindinga.',
      ctaButtonFinal: 'Hafðu samband'
    },
    en: {
      // Hero
      title: 'AI Solutions',
      subtitle: 'AI trained on your business',
      intro1: 'We train AI to know your business — products, pricing, policies, and systems. It serves customers, supports staff, and handles tasks.',
      intro2: 'The AI is set up specifically for each company and trained on your documents, policies, and workflows.',
      ctaButton: 'Get free consultation',
      
      // Solutions section
      solutionsTitle: 'Solutions',
      solutions: [
        {
          title: 'AI Agents',
          subtitle: 'Chat & Service',
          description: 'AI that answers customer questions based on your data and processes.',
          features: [
            'Specialized in your company and services',
            'Responds consistently and with confidence',
            'Reduces service center workload',
            'Connects to your systems — bookings, orders and more'
          ],
          icon: icon1
        },
        {
          title: 'Staff Assistant',
          subtitle: 'Daily Work Support',
          description: 'Knowledge system that supports staff in real-time, guides through procedures and suggests next steps.',
          features: [
            'Answers based on procedures, rules and approved processes',
            'Consistency regardless of employee experience',
            'Shortens new hire training time',
            'Reduces mistakes and uncertainty'
          ],
          icon: icon2
        },
        {
          title: 'Email Assistant',
          subtitle: 'Written Responses',
          description: 'AI trained on your data and used to prepare accurate, consistent email responses.',
          features: [
            'Employee enters inquiry',
            'System provides suggested response',
            'Built on rules and approved procedures',
            'No automatic sending unless you want'
          ],
          icon: icon3
        }
      ],
      
      // Training section
      trainingTitle: 'How Solutions Are Trained',
      trainingSubtitle: 'Trained on your data — not others',
      trainingDescription: 'The AI is set up specifically for each company and trained on:',
      trainingPoints: [
        'Documents and procedures',
        'Policies, rules and contracts',
        'Specialized operational context'
      ],
      trainingNote: 'No data is used for general AI model training. No vendor lock-in — your data is always yours.',
      
      // Security section
      securityTitle: 'Security & Separation',
      securityFeatures: [
        {
          icon: LockClosedIcon,
          title: 'Data separated between companies',
          description: 'Complete separation between clients'
        },
        {
          icon: UserGroupIcon,
          title: 'Access control by role',
          description: 'Precise control over who has access to what'
        },
        {
          icon: ShieldCheckIcon,
          title: 'Encryption in transit and storage',
          description: 'Data encrypted within the EU — under your control'
        },
        {
          icon: DocumentTextIcon,
          title: 'Communication traceability in backend',
          description: 'Full overview of all usage and interactions'
        }
      ],
      securityNote: 'Designed with confidentiality and operational security as priority',
      
      // CTA
      ctaTitle: 'Want to see how this would work at your company?',
      ctaDescription: 'Contact us and we\'ll review the possibilities — no commitment required.',
      ctaButtonFinal: 'Get in Touch'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Title + Subtitle + Text Content + CTA */}
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

          {/* Text paragraphs - centered */}
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>{currentContent.intro1}</p>
              <p>{currentContent.intro2}</p>
            </div>

            {/* CTA Button */}
            <div className="mt-10 text-center">
              <button
                onClick={() => onContactClick && onContactClick('ai-service')}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
              >
                {currentContent.ctaButton}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section - AI clients (commented out until more logos ready) */}
      {/* <TrustSectionAI currentLanguage={currentLanguage} /> */}

      {/* Solutions Section - Clean with MASSIVE icons */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              {currentContent.solutionsTitle}
            </h2>
          </div>

          <div className="space-y-16">
            {currentContent.solutions.map((solution, index) => (
              <div 
                key={index}
                className="max-w-6xl mx-auto"
              >
                <div className="grid md:grid-cols-[400px_1fr] gap-8 items-start">
                  {/* MASSIVE Icon - Left */}
                  <div className="flex justify-center md:justify-start">
                    <div className="w-[350px] h-[350px] flex items-center justify-center">
                      <img 
                        src={solution.icon}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Content - Right */}
                  <div className="flex flex-col justify-center">
                    <div className="mb-3">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        {solution.subtitle}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                      {solution.title}
                    </h3>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {solution.description}
                    </p>
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              {currentContent.trainingTitle}
            </h2>
            <p className="text-xl font-semibold text-gray-700 mb-8">
              {currentContent.trainingSubtitle}
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-8 border border-gray-200/50">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {currentContent.trainingDescription}
            </p>
            <ul className="space-y-3 mb-6">
              {currentContent.trainingPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CogIcon className="w-6 h-6 text-gray-700 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 font-medium bg-white/60 p-4 rounded-lg">
              {currentContent.trainingNote}
            </p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              {currentContent.securityTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentContent.securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
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

          <div className="text-center">
            <p className="text-gray-600 font-medium italic">
              {currentContent.securityNote}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Light version matching homepage style */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            {currentContent.ctaTitle}
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {currentContent.ctaDescription}
          </p>
          <button 
            onClick={() => onContactClick && onContactClick('ai-service')}
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            {currentContent.ctaButtonFinal}
          </button>
        </div>
      </section>
    </div>
  )
}

export default GervigreindarlausnirPage