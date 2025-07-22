import barcelonaOfficeImage from '../assets/images/barcelona-office.png'

const Services = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Símsvörun',
      subtitle: 'Áreiðanleg og persónuleg símsvörun síðan 2019. Við bjóðum upp á sérhæfða símsvörun, vöktun tölvupósts og gervigreindarlausnir sem bæta þjónustu og auka afköst.',
      services: [
        {
          title: 'Almenn símsvörun',
          description: 'Einföld og áreiðanleg þjónusta. Við svörum í þínu nafni, sendum símtöl áfram á réttan starfsmann og tökum skilaboð. Léttir álag á starfsfólki og hægt að setja upp með stuttum fyrirvara.',
          accent: 'border-l-teal-500'
        },
        {
          title: 'Þitt eigið þjónustuver',
          description: 'Heildarlausn með fullkomlega þjálfuðum starfsmönnum sem þekkja þitt fyrirtæki, vörur og þjónustu. Sérhæfðir starfsmenn sem verða hluti af þínu teymi og geta svarað flóknum spurningum, leyst vandamál og veitt tæknilega aðstoð byggða á þínum upplýsingakerfum.',
          accent: 'border-l-blue-500'
        },
        {
          title: 'Gervigreindarsvörun í síma',
          description: 'Nýjustu gervigreindarlausnir sem svara símtölum allan sólarhringinn. AI símsvörun sem þekkir þitt fyrirtæki, svarar fyrirspurnum, tekur pöntun og veitir upplýsingar með hraða og nákvæmni. Ef þörf krefur, getur hún alltaf tengt við okkar eða þína þjónustufulltrúa til að tryggja hámarks þjónustugæði.',
          accent: 'border-l-orange-500'
        }
      ]
    },
    en: {
      title: 'Phone Support',
      subtitle: 'Reliable and personal phone service since 2019. We offer specialized phone support, email monitoring and AI solutions that improve service and increase efficiency.',
      services: [
        {
          title: 'General Phone Support',
          description: 'Simple and reliable service. We answer in your name, forward calls to the right employee and take messages. Reduces staff burden and can be set up with short notice.',
          accent: 'border-l-teal-500'
        },
        {
          title: 'Your Own Service Center',
          description: 'Complete solution with perfectly trained staff who know your business, products and services. Specialized staff who become part of your team and can answer complex questions, solve problems and provide technical assistance based on your information systems.',
          accent: 'border-l-blue-500'
        },
        {
          title: 'AI Phone Support',
          description: 'Latest AI solutions that answer phone calls around the clock. AI phone support that knows your business, answers inquiries, takes orders and provides information with speed and accuracy. When needed, it can always connect to our or your service representatives to ensure maximum service quality.',
          accent: 'border-l-orange-500'
        }
      ]
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background gradient hints - matching hero section */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-50/30 via-teal-50/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-50/30 via-amber-50/20 to-transparent"></div>
        
        {/* Subtle floating elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-orange-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>
        
        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Top Left - Almenn símsvörun */}
          <div className={`bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 ${currentContent.services[0].accent} border-l-4`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {currentContent.services[0].title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {currentContent.services[0].description}
            </p>
          </div>

          {/* Top Right - Þitt eigið þjónustuver */}
          <div className={`bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 ${currentContent.services[1].accent} border-l-4`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {currentContent.services[1].title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {currentContent.services[1].description}
            </p>
          </div>

          {/* Bottom Left - Gervigreindarsvörun í síma */}
          <div className={`bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 ${currentContent.services[2].accent} border-l-4`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {currentContent.services[2].title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {currentContent.services[2].description}
            </p>
          </div>

          {/* Bottom Right - Barcelona Office Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={barcelonaOfficeImage} 
                alt="Barcelona Office" 
                className="w-full h-full object-cover min-h-[280px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services