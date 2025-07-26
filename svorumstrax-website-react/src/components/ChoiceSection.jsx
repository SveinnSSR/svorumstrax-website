import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline'

const ChoiceSection = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Sérsniðin þjónusta fyrir öll fyrirtæki',
      mainDescription: 'Við sameinum áralanga reynslu í símsvörun við nýjustu gervigreindartækni og búum til lausnir sem laga sig að þínum rekstri. Hvort sem þú ert að taka fyrstu skrefin með AI eða vilt bæta núverandi þjónustu, hjálpum við þér að greina tilgang samtala, leysa málin strax – og tryggja að öll mál lendi á réttum stað.',
      intelligenceDescription: 'Við hjálpum þér að skilja viðskiptavini þína betur. Með því að svara fyrir þig daglega umbreytum við þúsundum samskipta í viðskiptalega innsýn sem hjálpar þér að taka betri ákvarðanir, bæta þjónustu og auka tekjur.',
      benefits: [
        'Greinum hvað viðskiptavinir þínir raunverulega spyrja um',
        'Finnum tækifæri til tekjuaukningar sem þú sérð ekki',
        'Beinum athygli að vandamálum áður en þau verða kostnaðarsöm'
      ],
      teamDescription: 'Hjá okkur starfa yfir 35 íslenskir sérfræðingar – bæði í Barcelona og í fjarvinnu – sem sinna þjónustu fyrir meira en 100 fyrirtæki. Við sjáum um uppsetningu, þjálfun og stuðning – svo þú getur einbeitt þér að þínu rekstri.',
      button: 'Komdu í samband'
    },
    en: {
      title: 'Custom solutions for every business',
      mainDescription: 'We blend years of customer service expertise with cutting-edge AI technology to create solutions that adapt to your business. Whether you\'re exploring AI for the first time or enhancing existing support, we help you understand customer intent, resolve issues instantly, and ensure every interaction reaches the right destination.',
      intelligenceDescription: 'We help you understand your customers better. By answering for you daily, we transform thousands of customer interactions into business intelligence that helps you make better decisions, improve service, and increase revenue.',
      benefits: [
        'Analyze what your customers actually ask about',
        'Find revenue opportunities you don\'t see',
        'Identify problems before they become expensive'
      ],
      teamDescription: 'Our team of 35+ Icelandic specialists—working from Barcelona and remotely—serves over 100 companies. We handle setup, training, and ongoing support, so you can focus on growing your business.',
      button: 'Get in Touch'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
      {/* Very subtle background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,_rgba(100,116,139,0.03)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_75%_75%,_rgba(148,163,184,0.04)_0%,_transparent_50%)]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Title - Mobile optimized */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-tight">
            {currentContent.title}
          </h2>
        </div>

        {/* Content Grid - Mobile optimized */}
        <div className="space-y-8 sm:space-y-12">
          
          {/* Main Description Block - Mobile optimized */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center">
              {currentContent.mainDescription}
            </p>
          </div>

          {/* Intelligence & Benefits Section - NEW */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
            <p className="text-lg sm:text-xl text-gray-800 leading-relaxed text-center mb-8 font-medium">
              {currentContent.intelligenceDescription}
            </p>
            
            {/* Benefits List */}
            <div className="grid gap-4 sm:gap-6 max-w-3xl mx-auto">
              {currentContent.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-100/50">
                  <div className="flex-shrink-0 mt-1">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Team Strength - Highlighted - Mobile optimized */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-gray-200/50 shadow-sm">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {currentContent.teamDescription}
              </p>
            </div>
          </div>

          {/* Call to Action - Mobile optimized */}
          <div className="text-center">
            <button
              onClick={() => onContactClick('consultation')}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <span>{currentContent.button}</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChoiceSection