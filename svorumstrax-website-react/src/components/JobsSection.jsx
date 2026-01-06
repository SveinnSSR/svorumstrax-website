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
      statsTitle: 'Íslenskir starfsmenn á Spáni',
      statsDescription: 'Við erum stolt af að vera einn stærsti íslenski vinnustaðurinn á Spáni og skapa störf fyrir Íslendinga erlendis.',
      button: 'Sækja um starf',
      ctaTagline: 'Vertu hluti af teyminu'
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
      statsTitle: 'Icelandic team members in Barcelona',
      statsDescription: 'We\'re proud to be one of the largest Icelandic employers in Spain, creating meaningful career opportunities for Icelanders abroad.',
      button: 'Apply Now',
      ctaTagline: 'Join our team'
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
          
          {/* CTA Card - Subtle Translucent Style matching the stats card */}
          <div className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group">
              {/* Light background with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
              
              {/* Very subtle animated gradient overlay using site colors */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 via-transparent to-orange-50/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative p-8 sm:p-10 h-full flex flex-col justify-between">
                {/* Translucent glassmorphic container */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 h-full flex flex-col justify-between">
                  <div>
                    {/* Tagline with subtle color */}
                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-4">
                      {currentContent.ctaTagline}
                    </p>
                    
                    {/* Title with icon */}
                    <div className="flex items-center gap-3 mb-6">
                      <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {currentContent.button}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {currentContent.subtitle}
                    </p>
                  </div>
                  
                  {/* Button matching site style */}
                  <button
                    onClick={() => onContactClick('job')}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
                  >
                    {currentContent.button}
                  </button>
                </div>
              </div>
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
              
              {/* Stats Overlay */}
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

        {/* Refined Benefit Cards - Subtle Mediterranean-inspired gradients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {currentContent.benefits.map((benefit, index) => {
            // Icon components for professional look
            const iconMap = {
              0: ( // Barcelona lifestyle - sun icon
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ),
              1: ( // Flexibility - home icon
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              ),
              2: ( // Career development - chart icon
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              )
            }

            // Subtle gradient backgrounds inspired by Mediterranean colors
            const gradientMap = {
              0: 'from-gray-50/50 via-gray-50/30 to-white/40', // Neutral professional
              1: 'from-blue-50/50 via-sky-50/30 to-cyan-50/40', // Mediterranean sea
              2: 'from-emerald-50/50 via-teal-50/30 to-green-50/40' // Growth
            }

            return (
              <div 
                key={index}
                className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 group bg-white border border-gray-200 hover:border-gray-300"
              >
                {/* Very subtle gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientMap[index]} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
                
                {/* Subtle decorative element */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-3xl"></div>
                
                {/* Content */}
                <div className="relative p-6 sm:p-8 h-full">
                  <div className="flex items-start gap-4">
                    {/* Icon with subtle colored background */}
                    <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100`}>
                      {iconMap[index]}
                    </div>
                    
                    {/* Text content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
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
