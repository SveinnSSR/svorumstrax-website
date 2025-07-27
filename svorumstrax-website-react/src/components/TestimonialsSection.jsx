import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const TestimonialsSection = ({ currentLanguage }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const content = {
    is: {
      title: 'Hvað segja viðskiptavinir okkar?',
      testimonials: [
        {
          text: 'FlyOver Iceland nýtir sér þjónustu Svörum strax og erum við virkilega ánægð með þetta fyrirkomulag. Starfsfólk Svörum strax var mjög fljótt að læra inn á þjónustu okkar og einkennast öll samskipti af faglegum vinnubrögðum og góðu viðmóti. Þessi þjónusta hefur klárlega aukið ánægju gesta og aukið þjónustu okkar.',
          author: 'Erla Björg Hafsteinsdóttir',
          role: 'Guest Experience Manager, FlyOver Iceland'
        },
        {
          text: 'Ég get hiklaust mælt með Svörum strax, þau hafa veitt Rafal trausta og góða þjónustu frá fyrsta degi. Svörum strax tók við símsvörun hjá okkur 2022. Við erum virkilega ánægð með fyrirkomulagið og samskiptin okkar á milli. Þau eru með hraðar hendur og komust vel inn í starfsemina strax. Okkur finnst stundum eins og þau séu ein af okkar starfsfólki - samskiptin eru alveg frábær.',
          author: 'Hulda Símonardóttir',
          role: 'Þjónustu- og viðburðarstjóri, Rafal'
        },
        {
          text: 'Epal hefur nýtt sér yfirfallsþjónustu hjá Svörum strax síðan í lok árs 2022 en þjónustan hefur verið til fyrirmyndar og einkennist af fagmannlegum vinnubrögðum. Samstarf okkar hefur verið mjög gott og hjálpað okkur mikið á álagstímum við símsvörun.',
          author: 'Kjartan Páll Eyjólfsson',
          role: 'Framkvæmdastjóri, Epal'
        },
        {
          text: 'Svörum strax hefur frá upphafi sýnt mikinn sveigjanleika hvað varðar þjónustuna sem þau bjóða upp á. Þau eiga létt með að aðlaga sig eftir okkar þörfum – sem eru frekar sveiflukenndar því Icewear er með viðskiptavini út um allan heim. Það er mikill kostur að Svörum strax er íslenskt fyrirtæki og geta svarað frekari spurningum um Ísland sem eru fyrir utan hefðbundna retail ramman.',
          author: 'Robert van Spanje',
          role: 'Vefstjóri, Icewear'
        },
        {
          text: 'Svörum strax hefur staðið sig frábærlega við að svara símtölum sem annars hefðu hringt út hjá okkur á álagstímum. Það er líka góð tilfinning að vita að öllum viðskiptavinum sé svarað og öllum skilaboðum komið til skila.',
          author: 'Skúli Þór Johnsen',
          role: 'Íslandsbílar'
        },
        {
          text: 'Við hjá Lögþing lögmannsstofu erum mjög ánægð með þjónustuna frá Svörum strax - hvort sem það lítur að samskiptum á netspjalli stofunnar eða svara í borðsíma stofunnar. Felur þjónustan í sér mikið hagræði og einföldun fyrir okkar vinnustað.',
          author: 'Guðbrandur Jóhannesson hrl.',
          role: 'Hæstaréttarlögmaður, Lögþing'
        }
      ]
    },
    en: {
      title: 'What our clients say',
      testimonials: [
        {
          text: 'FlyOver Iceland relies on Svörum strax services, and we couldn\'t be happier with this partnership. Their team quickly mastered our service standards, and every interaction reflects their professional approach and positive attitude. This service has significantly enhanced our guest satisfaction and elevated our overall customer experience.',
          author: 'Erla Björg Hafsteinsdóttir',
          role: 'Guest Experience Manager, FlyOver Iceland'
        },
        {
          text: 'I can wholeheartedly recommend Svörum strax—they\'ve provided Rafal with reliable, exceptional service from day one. When they took over our phone support in 2022, the transition was seamless. We\'re incredibly satisfied with the partnership and communication. They\'re incredibly responsive and understood our operations immediately. Sometimes it feels like they\'re part of our own team—the collaboration is outstanding.',
          author: 'Hulda Símonardóttir',
          role: 'Service & Events Manager, Rafal'
        },
        {
          text: 'Epal has utilized overflow service from Svörum strax since late 2022, and the service has been exemplary, characterized by professional work methods. Our collaboration has been very good and has helped us greatly during busy periods with phone answering.',
          author: 'Kjartan Páll Eyjólfsson',
          role: 'Managing Director, Epal'
        },
        {
          text: 'Svörum strax has shown great flexibility from the beginning regarding the service they offer. They easily adapt to our needs – which are quite variable since Icewear has customers all over the world. It\'s a great advantage that Svörum strax is an Icelandic company and can answer further questions about Iceland that are outside the traditional retail framework.',
          author: 'Robert van Spanje',
          role: 'Web Manager, Icewear'
        },
        {
          text: 'Svörum strax has performed excellently in answering calls that would otherwise have gone unanswered during our busy periods. It\'s also a good feeling to know that all customers are answered and all messages are delivered.',
          author: 'Skúli Þór Johnsen',
          role: 'Íslandsbílar'
        },
        {
          text: 'We at Lögþing law firm are very satisfied with the service from Svörum strax - whether it concerns communication on the firm\'s web chat or answering the firm\'s desk phone. The service provides significant efficiency and simplification for our workplace.',
          author: 'Guðbrandur Jóhannesson',
          role: 'Supreme Court Attorney, Lögþing'
        }
      ]
    }
  }

  const currentContent = content[currentLanguage]
  const totalSlides = Math.ceil(currentContent.testimonials.length / 2)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

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
        
        {/* Slider Container */}
        <div className="relative">
          {/* Testimonials Slider */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {currentContent.testimonials
                      .slice(slideIndex * 2, slideIndex * 2 + 2)
                      .map((testimonial, index) => (
                        <div 
                          key={slideIndex * 2 + index}
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
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:-translate-x-5 border border-white/20"
            disabled={totalSlides <= 1}
          >
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:translate-x-5 border border-white/20"
            disabled={totalSlides <= 1}
          >
            <ChevronRightIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Dots Navigation */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-12 space-x-3">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-orange-500 scale-110' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TestimonialsSection
