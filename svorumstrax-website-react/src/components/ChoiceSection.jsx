import { ChatBubbleLeftRightIcon, UsersIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const ChoiceSection = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Snjöll samþætting mannauðs og tækni',
      description: 'Þú velur hvort gervigreind eða mannlegur þjónustufulltrúi svari - eða blöndu af hvoru tveggja. Við aðlögum okkur að þínum þörfum og veitum nákvæmlega þá þjónustu sem hentar þínu fyrirtæki best.',
      additional: 'Margir af okkar viðskiptavinum nota báðar lausnir - AI sér um einfaldar spurningar, sérfræðingar sjá um það flókna.',
      button: 'Komdu í samband'
    },
    en: {
      title: 'Smart Integration of People and Technology',
      description: 'You choose whether AI or human service representatives answer - or a combination of both. We adapt to your needs and provide exactly the service that best suits your business.',
      additional: 'Many of our customers use both solutions - AI handles simple questions, specialists handle the complex ones.',
      button: 'Get in Touch'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">
            {currentContent.title}
          </h2>
        </div>
        
        {/* Content Box */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/70 rounded-2xl shadow-lg border border-orange-200/50 p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {currentContent.description}
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {currentContent.additional}
            </p>
            
            {/* Visual representation */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-700 font-medium text-lg">AI</span>
              </div>
              
              <div className="text-3xl text-gray-400 font-light">+</div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <UsersIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-700 font-medium text-lg">Mannauður</span>
              </div>
              
              <div className="text-3xl text-gray-400 font-light">=</div>
              
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">Fullkomin lausn</div>
                <div className="text-gray-600">fyrir þitt fyrirtæki</div>
              </div>
            </div>
            
            {/* Call to Action */}
            <button
              onClick={() => onContactClick('consultation')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center space-x-2"
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