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
    <section className="py-32 bg-gradient-to-br from-orange-50 to-orange-100/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,255,255,0.8)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_75%_75%,_rgba(248,244,240,0.6)_0%,_transparent_50%)]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
          {currentContent.title}
        </h2>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
          {currentContent.subtitle}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => onContactClick('meeting')}
            className="bg-gradient-to-r from-orangeGradient-start via-orangeGradient-middle to-orangeGradient-end text-white font-semibold py-4 px-10 rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            {currentContent.primaryButton}
          </button>
          
          <button
            onClick={() => onContactClick('pricing')}
            className="bg-transparent text-gray-800 font-semibold py-4 px-10 rounded-full border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-lg"
          >
            {currentContent.secondaryButton}
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTASection