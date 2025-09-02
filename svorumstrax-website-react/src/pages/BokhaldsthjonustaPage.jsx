import React from 'react'
import { 
  CalculatorIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/outline'
import joelKristinssonImg from '../assets/images/staff/joel-kristinsson.jpeg'

const BokhaldsthjonustaPage = ({ currentLanguage = 'is', onContactClick }) => {
  const content = {
    is: {
      title: 'Bókhaldsþjónusta',
      subtitle: 'Viltu koma bókhaldinu þínu í nútímalegra form?',
      description: 'Við sjáum um bókhaldið í nánu samráði við þig og nýtum nútímatækni til að skjala og varðveita reikninga og skjöl í skýinu. Þannig færðu skilvirka og örugga þjónustu sem sparar tíma og einfaldar daglega starfsemi.',
      servicesTitle: 'Við bjóðum upp á',
      services: [
        {
          icon: CalculatorIcon,
          title: 'Færsla bókhalds',
          description: 'Við tökum að okkur alla almenna bókhaldsþjónustu þar sem bókhaldið er fært í Uniconta bókhaldskerfi. Fjárhagskerfið veitir heildaryfirsýn yfir rekstur og efnahag og styður allar aðgerðir sem tengjast skýrslugerð og fjármálastjórnun.',
          category: 'almenn'
        },
        {
          icon: DocumentTextIcon,
          title: 'Sölureikningagerð',
          description: 'Við stofnum og sendum út sölureikninga fyrir viðskiptavini okkar.',
          category: 'almenn'
        },
        {
          icon: CurrencyDollarIcon,
          title: 'Virðisaukaskattskil',
          description: 'Við sendum virðisaukaskattsskýrslur í rafrænu formi til Skattsins og höldum sambandi við viðskiptavini um greiðslu á virðisaukaskattskröfum þegar það á við.',
          category: 'almenn'
        },
        {
          icon: ChartBarIcon,
          title: 'Afstemmingar og uppgjör',
          description: 'Við framkvæmum hinar ýmsu afstemmingar, þar á meðal banka-, viðskiptavina- og lánardrottnaafstemmingar, auk árslokaafstemminga á öllum liðum fjárhagsins.',
          category: 'serfraedi'
        },
        {
          icon: ClipboardDocumentListIcon,
          title: 'Reikningsskil',
          description: 'Við sjáum um afstemmingar og ársreikningagerð og skilum afriti ársreiknings til fyrirtækjaskrár.',
          category: 'serfraedi'
        },
        {
          icon: PresentationChartBarIcon,
          title: 'Skattskil',
          description: 'Við tökum að okkur framtalsgerð fyrir fyrirtæki og einstaklinga ásamt skilum á launa-, verktaka- og hlutafjármiðum. Framtali og ársreikningi er skilað til Skattsins á réttum tíma.',
          category: 'serfraedi'
        }
      ],
      packagesTitle: 'Þjónustusvið',
      packages: [
        {
          title: 'Almenn Bókhaldsþjónusta',
          description: 'Grunnþjónusta fyrir dagleg bókhaldsverkefni',
          features: [
            'Færsla bókhalds',
            'Sölureikningagerð',
            'Virðisaukaskattskil',
            'Dagleg uppgjör og skýrslur'
          ]
        },
        {
          title: 'Sérfræðiþjónusta',
          description: 'Ítarleg þjónusta fyrir flóknar bókhaldslegar þarfir',
          features: [
            'Afstemmingar og uppgjör',
            'Reikningsskil',
            'Skattskil',
            'Árslokauppgjör',
            'Ráðgjöf um fjármál'
          ]
        }
      ],
      expertTitle: 'Rekstrarstjóri Bókhaldssviðs',
      expert: {
        name: 'Jóel Kristinsson',
        title: 'Viðskiptafræðingur, M.acc í reikningshaldi og endurskoðun',
        description: 'Jóel er með mastersgráðu í reikningshaldi og endurskoðun frá Háskóli Íslands. Hann hefur unnið við bókhald, reikningsskil, ársreikninga, skattframtöl einstaklinga og félaga frá árinu 2007. Hann hefur meðal annars starfað í 6 ár hjá Deloitte. Fjármálastjóri RadissonBlu 1919 hótels 2013-2016. Samhliða námi og starfi kenndi hann við Háskóla Íslands og var í 6 ár prófgerðarmaður hjá Atvinnuvegaráðuneytinu fyrir viðurkenningar bókara.',
        email: 'svorumstrax@svorumstrax.is'
      },
      ctaTitle: 'Komdu bókhaldinu í nútímalegra form',
      ctaDescription: 'Við greinum þínar þarfir og setjum upp lausn sem einfaldar bókhaldið og sparar tíma.',
      ctaButton: 'Fá tilboð'
    },
    en: {
      title: 'Accounting Services',
      subtitle: 'Ready to modernize your accounting?',
      description: 'By letting us handle your accounting, we set up the service in consultation with you so that we utilize the technology available today to document all invoices and important matters in the cloud.',
      servicesTitle: 'What we offer',
      services: [
        {
          icon: CalculatorIcon,
          title: 'Bookkeeping Services',
          description: 'Comprehensive bookkeeping services using the Uniconta accounting system. Uniconta provides a complete overview of operations and finances, with full support for reporting and financial management.',
          category: 'general'
        },
        {
          icon: DocumentTextIcon,
          title: 'Sales Invoice Creation',
          description: 'Creation and distribution of sales invoices on behalf of your company.',
          category: 'general'
        },
        {
          icon: CurrencyDollarIcon,
          title: 'VAT Returns',
          description: 'Preparation and electronic submission of VAT reports to the tax authorities, with follow-up on payment requirements when applicable.',
          category: 'general'
        },
        {
          icon: ChartBarIcon,
          title: 'Reconciliations and Settlements',
          description: 'Full range of reconciliations, including bank, customer, and supplier reconciliations, as well as year-end reconciliations across all financial items.',
          category: 'specialist'
        },
        {
          icon: ClipboardDocumentListIcon,
          title: 'Financial Statements',
          description: 'Preparation of annual financial statements, including reconciliations, and submission of statements to the company registry.',
          category: 'specialist'
        },
        {
          icon: PresentationChartBarIcon,
          title: 'Tax Returns',
          description: 'Preparation of tax returns for companies and individuals, including wage, contractor, and dividend forms, with submission of returns and financial statements to the tax authorities.',
          category: 'specialist'
        }
      ],
      packagesTitle: 'Service Areas',
      packages: [
        {
          title: 'General Accounting Services',
          description: 'Basic services for daily accounting tasks',
          features: [
            'Bookkeeping entries',
            'Sales invoice creation',
            'VAT returns',
            'Daily reports and summaries'
          ]
        },
        {
          title: 'Specialist Services',
          description: 'Comprehensive services for complex accounting needs',
          features: [
            'Reconciliations and settlements',
            'Financial statements',
            'Tax returns',
            'Year-end closings',
            'Financial consulting'
          ]
        }
      ],
      expertTitle: 'Head of Accounting Department',
      expert: {
        name: 'Jóel Kristinsson',
        title: 'Business graduate, M.Acc in Accounting and Auditing',
        description: 'Jóel holds a master\'s degree in accounting and auditing from the University of Iceland. He has worked with accounting, financial statements, annual reports, and tax returns for individuals and companies since 2007. He worked for 6 years at Deloitte, among others. He was CFO of RadissonBlu 1919 hotel from 2013-2016. Alongside his studies and work, he taught at the University of Iceland and was an examiner for the Ministry of Industries for 6 years for bookkeeper certifications.',
        email: 'svorumstrax@svorumstrax.is'
      },
      ctaTitle: 'Modernize your accounting',
      ctaDescription: 'Let us assess your accounting needs and create a customized solution for your business.',
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
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              {currentContent.subtitle}
            </p>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
              {currentContent.description}
            </p>
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

      {/* Service Packages Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              {currentContent.packagesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentContent.packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {pkg.title}
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

      {/* Expert Section - Jóel Kristinsson */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Photo */}
              <div className="lg:col-span-1 p-8 flex justify-center lg:justify-start">
                <div className="relative">
                  <img 
                    src={joelKristinssonImg} 
                    alt={currentContent.expert.name}
                    className="w-64 h-64 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-2 p-8 lg:pl-0">
                <div className="mb-4">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {currentContent.expertTitle}
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentContent.expert.name}
                </h3>
                
                <p className="text-lg text-gray-600 mb-6 font-medium">
                  {currentContent.expert.title}
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {currentContent.expert.description}
                </p>
                
                <a 
                  href={`mailto:${currentContent.expert.email}`}
                  className="text-gray-900 hover:text-gray-700 font-medium transition-colors duration-200 underline underline-offset-2"
                >
                  {currentContent.expert.email}
                </a>
              </div>
            </div>
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
          <button 
            onClick={() => onContactClick && onContactClick('accounting-service')}
            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            {currentContent.ctaButton}
          </button>
        </div>
      </section>
    </div>
  )
}

export default BokhaldsthjonustaPage
