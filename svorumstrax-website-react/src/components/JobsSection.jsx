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
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-orange-50/20 relative overflow-hidden"
    >
      {/* Subtle background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,_rgba(251,146,60,0.08)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_75%_75%,_rgba(30,58,138,0.06)_0%,_transparent_50%)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12">
          
          {/* CTA Card - Top Left */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-8 sm:p-10 h-full flex flex-col justify-center text-white shadow-lg">
              <div className="mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                  {currentContent.button}
                </h3>
                <p className="text-orange-50 opacity-90 mb-6 leading-relaxed">
                  {currentContent.subtitle}
                </p>
              </div>
              <button
                onClick={() => onContactClick('job')}
                className="bg-white hover:bg-gray-50 text-orange-500 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
              >
                {currentContent.button}
              </button>
            </div>
          </div>

          {/* Barcelona Image Card - Top Right */}
          <div className="lg:col-span-7">
            <div className="relative h-[300px] sm:h-[350px] lg:h-full min-h-[280px] rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={barcelonaImage}
                alt="Barcelona skyline"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent"></div>
              
              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-2">
                    35+
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                    {currentContent.statsTitle}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {currentContent.statsDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Cards - Bottom Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentContent.benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl p-6 sm:p-8 hover:bg-white/80 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
                  {benefit.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default JobsSection
