const CTASection = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Viltu bæta þjónustu og fá betri rekstrarinnsýn?',
      subtitle: 'Við getum byrjað að svara fyrir þig innan viku. Fáðu ókeypis greiningu á því hvernig við getum bætt þína þjónustu og veitt þér betri yfirsýn.',
      primaryButton: 'Bóka fund',
      secondaryButton: 'Sjá verðskrá'
    },
    en: {
      title: 'Want to improve service and get better operational insights?',
      subtitle: 'We can start answering for you within a week. Get a free analysis of how we can improve your service and provide you with better oversight.',
      primaryButton: 'Book a Meeting',
      secondaryButton: 'See Pricing'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title - much more modest sizing */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {currentContent.title}
        </h2>
        
        {/* Subtitle - more refined */}
        <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
          {currentContent.subtitle}
        </p>
        
        {/* Updated buttons - perfectly consistent with navbar and other sections */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => onContactClick('meeting')}
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            {currentContent.primaryButton}
          </button>
          
          <button
            onClick={() => onContactClick('pricing')}
            className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 hover:shadow-lg hover:-translate-y-1"
          >
            {currentContent.secondaryButton}
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTASection