const CTASection = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Viltu bæta þjónustu og fá betri rekstrarinnsýn?',
      subtitle: 'Við getum byrjað að svara fyrir þig innan viku. Fáðu ókeypis greiningu á því hvernig við getum bætt þína þjónustu og veitt þér betri yfirsýn.',
      primaryButton: 'Bóka fund',
      secondaryButton: 'Sjá verðskrá'
    },
    en: {
      title: 'Ready to transform your customer service?',
      subtitle: 'We can have your solution up and running within a week. Get a free consultation on how we can enhance your customer experience and provide valuable business insights.',
      primaryButton: 'Schedule Consultation',
      secondaryButton: 'View Pricing'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title - Mobile optimized */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          {currentContent.title}
        </h2>
        
        {/* Subtitle - Mobile optimized */}
        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
          {currentContent.subtitle}
        </p>
        
        {/* Buttons - Mobile optimized */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => onContactClick('meeting')}
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 w-full sm:w-auto"
          >
            {currentContent.primaryButton}
          </button>
          
          <button
            onClick={() => onContactClick('pricing')}
            className="px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
          >
            {currentContent.secondaryButton}
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTASection