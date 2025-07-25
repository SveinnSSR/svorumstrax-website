import barcelonaImage from '../assets/images/barcelona-skyline.jpg'

const JobsSection = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Störf fyrir Íslendinga á Spáni',
      subtitle: 'Ertu Íslendingur búsettur á Spáni? Við leitum alltaf að hæfileikaríku fólki sem vill vinna í skemmtilegu alþjóðlegu umhverfi í Barcelona, víðar á Spáni eða í fjarvinnu.',
      benefits: [
        {
          icon: '☀️',
          title: 'Lífsgæði í Barcelona',
          description: 'Njóttu sólarinnar og menningarinnar á meðan þú vinnur fyrir íslenskan markað'
        },
        {
          icon: '🏠',
          title: 'Sveigjanleiki',
          description: 'Fjarvinna og sveigjanlegar vaktir sem henta þínu lífi'
        },
        {
          icon: '📈',
          title: 'Þróunarmöguleikar',
          description: 'Lærðu nýja hluti og þróaðu þig í starfi með frábæru teymi'
        }
      ],
      statsTitle: 'Íslenskir sérfræðingar í Barcelona',
      statsDescription: 'Við erum stolt af að vera einn stærsti íslenski vinnustaðurinn á Spáni og skapa störf fyrir Íslendinga erlendis.',
      button: 'Sækja um starf'
    },
    en: {
      title: 'Careers for Icelanders in Spain',
      subtitle: 'Are you an Icelander living in Spain? We\'re always seeking talented individuals who want to work in an exciting international environment in Barcelona, elsewhere in Spain, or remotely.',
      benefits: [
        {
          icon: '☀️',
          title: 'Barcelona lifestyle',
          description: 'Enjoy Mediterranean living while working with Icelandic businesses and maintaining your career growth'
        },
        {
          icon: '🏠',
          title: 'Work flexibility',
          description: 'Remote work options and flexible scheduling that fits your life in Spain'
        },
        {
          icon: '📈',
          title: 'Career development',
          description: 'Grow your skills in customer service, AI, and technology with ongoing training and mentorship'
        }
      ],
      statsTitle: 'Icelandic professionals in Barcelona',
      statsDescription: 'We\'re proud to be one of the largest Icelandic employers in Spain, creating meaningful career opportunities for Icelanders abroad.',
      button: 'Apply Now'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <section 
      id="jobs"
      className="relative min-h-[600px] flex items-center justify-center"
      style={{
        backgroundImage: `url(${barcelonaImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Navy Overlay */}
      <div className="absolute inset-0 bg-slate-900/85"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Benefits - Mobile optimized */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
                {currentContent.title}
              </h2>
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed">
                {currentContent.subtitle}
              </p>
            </div>
            
            {/* Benefits Cards - Mobile optimized */}
            <div className="space-y-4 sm:space-y-6">
              {currentContent.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 sm:gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 text-lg sm:text-xl">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Button - Mobile optimized */}
            <button
              onClick={() => onContactClick('job')}
              className="bg-white hover:bg-gray-50 text-slate-900 font-semibold py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-md w-full sm:w-auto"
            >
              {currentContent.button}
            </button>
          </div>
          
          {/* Right Side - Stats - Mobile optimized */}
          <div className="text-center lg:text-left">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-12">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-3 sm:mb-4">
                35+
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
                {currentContent.statsTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {currentContent.statsDescription}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default JobsSection
