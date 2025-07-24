import { ArrowRightIcon } from '@heroicons/react/24/outline'

const ChoiceSection = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Sérsniðin þjónusta fyrir öll fyrirtæki',
      mainDescription: 'Við sameinum áralanga reynslu í símsvörun við nýjustu gervigreindartækni og búum til lausnir sem laga sig að þínum rekstri. Hvort sem þú ert að taka fyrstu skrefin með AI eða vilt bæta núverandi þjónustu, hjálpum við þér að greina tilgang samtala, leysa málin strax – og tryggja að öll mál lendi á réttum stað.',
      teamDescription: 'Hjá okkur starfa yfir 35 íslenskir sérfræðingar – bæði í Barcelona og í fjarvinnu – sem sinna þjónustu fyrir meira en 100 fyrirtæki. Við sjáum um uppsetningu, þjálfun og stuðning – svo þú getur einbeitt þér að þínu rekstri.',
      button: 'Komdu í samband'
    },
    en: {
      title: 'Customized Service for All Businesses',
      mainDescription: 'We combine years of experience in phone support with the latest AI technology to create solutions that adapt to your business. Whether you\'re taking your first steps with AI or want to improve existing service, we help you identify conversation intent, solve issues immediately – and ensure all matters end up in the right place.',
      teamDescription: 'We have over 35 Icelandic specialists – both in Barcelona and working remotely – serving more than 100 companies. We handle setup, training and support – so you can focus on your business.',
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
        
        {/* Main Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8 leading-tight">
            {currentContent.title}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="space-y-12">
          
          {/* Main Description Block */}
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-xl text-gray-700 leading-relaxed text-center">
              {currentContent.mainDescription}
            </p>
          </div>

          {/* Team Strength - Highlighted */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200/50 shadow-sm">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-600 leading-relaxed">
                {currentContent.teamDescription}
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button
              onClick={() => onContactClick('consultation')}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center space-x-2"
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