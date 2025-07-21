import { ChatBubbleLeftRightIcon, UsersIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const ChoiceSection = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Snjöll samþætting mannauðs og tækni',
      description: 'Þú velur hvort gervigreind eða mannlegur þjónustufulltrúi svari - eða blöndu af hvoru tveggja. Við aðlögum okkur að þínum þörfum og veitum nákvæmlega þá þjónustu sem hentar þínu fyrirtæki best.',
      additional: 'Margir af okkar viðskiptavinum nota báðar lausnir - AI sér um einfaldar spurningar, sérfræðingar sjá um það flókna.',
      subtitle: 'Sérhæfð þjónusta síðan 2019',
      button: 'Komdu í samband'
    },
    en: {
      title: 'Smart Integration of People and Technology',
      description: 'You choose whether AI or human service representatives answer - or a combination of both. We adapt to your needs and provide exactly the service that best suits your business.',
      additional: 'Many of our customers use both solutions - AI handles simple questions, specialists handle the complex ones.',
      subtitle: 'Specialized service since 2019',
      button: 'Get in Touch'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-pink-500 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,255,255,0.3)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_75%_75%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Subtitle */}
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <span className="text-white/90 font-semibold text-sm tracking-wide uppercase">
              {currentContent.subtitle}
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-8 leading-tight">
            {currentContent.title}
          </h2>
          
          <p className="text-xl text-white/90 mb-6 leading-relaxed max-w-4xl mx-auto">
            {currentContent.description}
          </p>
          
          <p className="text-lg text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
            {currentContent.additional}
          </p>
          
          {/* Visual representation */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-12">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
              </div>
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            
            <div className="text-4xl text-white/70 font-light">+</div>
            
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <span className="text-white font-bold text-xl">Mannauður</span>
            </div>
            
            <div className="text-4xl text-white/70 font-light">=</div>
            
            <div className="text-center">
              <div className="text-2xl font-black text-white">Fullkomin lausn</div>
              <div className="text-white/80 font-medium">fyrir þitt fyrirtæki</div>
            </div>
          </div>
          
          {/* Call to Action */}
          <button
            onClick={() => onContactClick('consultation')}
            className="bg-white hover:bg-gray-50 text-orange-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center space-x-2"
          >
            <span>{currentContent.button}</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ChoiceSection