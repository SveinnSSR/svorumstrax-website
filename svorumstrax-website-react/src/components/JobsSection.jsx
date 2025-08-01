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
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 50%, rgba(254, 252, 232, 0.6) 100%)'
      }}
    >
      {/* Soft gradient background for warmth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white/60 to-amber-50/40"></div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,_rgba(244,185,96,0.08)_0%,_transparent_50%)]"></div>
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
          
          {/* CTA Card - Sterile Minimal Tech Style */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 sm:p-10 h-full flex flex-col justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mb-8">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 border border-gray-200/50">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.294a7.707 7.707 0 01-2-.933" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4 leading-tight text-gray-900">
                  {currentContent.button}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  {currentContent.subtitle}
                </p>
              </div>
              <button
                onClick={() => onContactClick('job')}
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto text-sm tracking-wide"
              >
                {currentContent.button}
              </button>
            </div>
          </div>

          {/* Barcelona Image Card with Gradient Overlay */}
          <div className="lg:col-span-7">
            <div className="relative h-[300px] sm:h-[350px] lg:h-full min-h-[280px] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={barcelonaImage}
                alt="Barcelona skyline"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay like original design */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-slate-800/70"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              
              {/* Glassmorphic Stats Overlay - More Transparent */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/12 backdrop-blur-lg rounded-xl p-6 border border-white/15 shadow-xl">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 drop-shadow-lg">
                    35+
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {currentContent.statsTitle}
                  </h3>
                  <p className="text-sm text-white/95 leading-relaxed">
                    {currentContent.statsDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Tech Benefits Cards - Bottom Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {currentContent.benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-lg border border-gray-200/40 rounded-xl p-6 sm:p-8 hover:bg-white/90 hover:border-gray-300/50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50/80 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 text-lg border border-gray-200/50 shadow-sm">
                  {benefit.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
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
