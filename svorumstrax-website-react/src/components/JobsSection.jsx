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
          
          {/* CTA Card - Refined Scandinavian Muted Style */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 sm:p-10 h-full flex flex-col justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mb-8">
                {/* No icon - clean minimal approach */}
                <h3 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight text-gray-900">
                  {currentContent.button}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {currentContent.subtitle}
                </p>
              </div>
              <button
                onClick={() => onContactClick('job')}
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-sm w-full sm:w-auto"
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
              {/* Lighter gradient overlay to brighten image */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-slate-900/25 to-slate-800/45"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              
              {/* Stats Overlay - Back to original visibility */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/25 shadow-lg">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 drop-shadow-sm">
                    35+
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {currentContent.statsTitle}
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {currentContent.statsDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Translucent Benefits Cards - Same style as 35+ card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {currentContent.benefits.map((benefit, index) => {
            // Smart icon mapping instead of emojis
            const iconMap = {
              0: ( // Barcelona lifestyle
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ),
              1: ( // Flexibility
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              ),
              2: ( // Career development
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              )
            }

            return (
              <div 
                key={index}
                className="rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{
                      background: 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    {iconMap[index]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default JobsSection
