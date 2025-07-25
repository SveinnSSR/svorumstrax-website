const TestimonialsSection = ({ currentLanguage }) => {
  const content = {
    is: {
      title: 'Hvað segja viðskiptavinir okkar?',
      testimonials: [
        {
          text: 'Ég get hiklaust mælt með Svörum strax, þau hafa veitt Rafal trausta og góða þjónustu frá fyrsta degi. Svörum strax tók við símsvörun hjá okkur 2022. Við erum virkilega ánægð með fyrirkomulagið og samskiptin okkar á milli. Þau eru með hraðar hendur og komust vel inn í starfsemina strax. Okkur finnst stundum eins og þau séu ein af okkar starfsfólki - samskiptin eru alveg frábær.',
          author: 'Hulda Símonardóttir',
          role: 'Þjónustu- og viðburðarstjóri, Rafal'
        },
        {
          text: 'FlyOver Iceland nýtir sér þjónustu Svörum Strax og erum við virkilega ánægð með þetta fyrirkomulag. Starfsfólk Svörum Strax var mjög fljótt að læra inn á þjónustu okkar og einkennast öll samskipti af faglegum vinnubrögðum og góðu viðmóti. Þessi þjónusta hefur klárlega aukið ánægju gesta og aukið þjónustu okkar.',
          author: 'Erla Björg Hafsteinsdóttir',
          role: 'Guest Experience Manager, FlyOver Iceland'
        }
      ]
    },
    en: {
      title: 'What our clients say',
      testimonials: [
        {
          text: 'I can wholeheartedly recommend Svörum strax—they\'ve provided Rafal with reliable, exceptional service from day one. When they took over our phone support in 2022, the transition was seamless. We\'re incredibly satisfied with the partnership and communication. They\'re incredibly responsive and understood our operations immediately. Sometimes it feels like they\'re part of our own team—the collaboration is outstanding.',
          author: 'Hulda Símonardóttir',
          role: 'Service & Events Manager, Rafal'
        },
        {
          text: 'FlyOver Iceland relies on Svörum Strax services, and we couldn\'t be happier with this partnership. Their team quickly mastered our service standards, and every interaction reflects their professional approach and positive attitude. This service has significantly enhanced our guest satisfaction and elevated our overall customer experience.',
          author: 'Erla Björg Hafsteinsdóttir',
          role: 'Guest Experience Manager, FlyOver Iceland'
        }
      ]
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.3)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_80%,_rgba(34,197,94,0.3)_0%,_transparent_50%)]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 mb-8 leading-tight">
            {currentContent.title}
          </h2>
        </div>
        
        {/* Testimonials Grid - Mobile optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {currentContent.testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 sm:top-6 left-6 sm:left-8 text-4xl sm:text-6xl text-orange-500/30 font-serif leading-none">
                "
              </div>
              
              {/* Testimonial Text */}
              <div className="pt-6 sm:pt-8">
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6 sm:mb-8 relative z-10">
                  {testimonial.text}
                </p>
                
                {/* Author Info */}
                <div className="border-t border-white/10 pt-4 sm:pt-6">
                  <div className="text-orange-400 font-semibold text-base sm:text-lg mb-1">
                    {testimonial.author}
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
