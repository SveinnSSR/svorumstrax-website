
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
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-white relative overflow-hidden">
      {/* Subtle Background Effects - Light and minimal */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,_rgba(156,163,175,0.2)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_80%,_rgba(209,213,219,0.3)_0%,_transparent_50%)]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-tight">
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
                          className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 rounded-2xl p-8 sm:p-10 relative shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          {/* Quote Icon - Light contrast against dark background */}
                          <div className="absolute top-6 sm:top-8 left-8 sm:left-10 text-5xl sm:text-6xl text-slate-500 font-serif leading-none opacity-40">
                            "
                          </div>
                          
                          {/* Testimonial Text */}
                          <div className="pt-10 sm:pt-12">
                            <p className="text-base sm:text-lg text-slate-100 leading-relaxed mb-8 sm:mb-10 relative z-10">
                              {testimonial.text}
                            </p>
                            
                            {/* Author Info - Light text on dark */}
                            <div className="border-t-2 border-slate-600 pt-6">
                              <div className="text-white font-semibold text-base sm:text-lg mb-2">
                                {testimonial.author}
                              </div>
                              <div className="text-slate-300 text-sm">
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

          {/* Navigation Arrows - Updated for light theme */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 rounded-full p-3 transition-all duration-300 hover:-translate-x-5 border border-gray-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
            disabled={totalSlides <= 1}
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 rounded-full p-3 transition-all duration-300 hover:translate-x-5 border border-gray-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
            disabled={totalSlides <= 1}
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Dots Navigation - Updated for light theme */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 ${
                  currentSlide === index 
                    ? 'bg-gray-900 scale-125' 
                    : 'bg-gray-400 hover:bg-gray-600'
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
