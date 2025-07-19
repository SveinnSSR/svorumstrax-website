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
      title: 'What Our Customers Say',
      testimonials: [
        {
          text: 'I can highly recommend Svörum strax, they have provided Rafal with reliable and good service from day one. Svörum strax took over our phone support in 2022. We are really satisfied with the arrangement and our communication. They are quick and got into our operations right away. Sometimes we feel like they are one of our staff - the communication is excellent.',
          author: 'Hulda Símonardóttir',
          role: 'Service and Event Manager, Rafal'
        },
        {
          text: 'FlyOver Iceland uses Svörum Strax services and we are really satisfied with this arrangement. Svörum Strax staff was very quick to learn our service and all communication is characterized by professional work methods and good attitude. This service has clearly increased guest satisfaction and enhanced our service.',
          author: 'Erla Björg Hafsteinsdóttir',
          role: 'Guest Experience Manager, FlyOver Iceland'
        }
      ]
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.3)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_80%,_rgba(34,197,94,0.3)_0%,_transparent_50%)]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-100 mb-8 leading-tight">
            {currentContent.title}
          </h2>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {currentContent.testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-8 text-6xl text-orange-500/30 font-serif leading-none">
                "
              </div>
              
              {/* Testimonial Text */}
              <div className="pt-8">
                <p className="text-lg text-slate-200 leading-relaxed mb-8 relative z-10">
                  {testimonial.text}
                </p>
                
                {/* Author Info */}
                <div className="border-t border-white/10 pt-6">
                  <div className="text-orange-400 font-semibold text-lg mb-1">
                    {testimonial.author}
                  </div>
                  <div className="text-slate-400 text-sm">
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
