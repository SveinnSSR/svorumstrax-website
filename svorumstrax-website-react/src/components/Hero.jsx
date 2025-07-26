import outboundPhone from '../assets/images/outbound-phone.png'

const Hero = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Snjallar lausnir fyrir nútíma þjónustu',
      subtitle: 'Yfir 100 fyrirtæki treysta Svörum strax fyrir þjónustu við viðskiptavini. Þú velur hvort gervigreind eða mannlegur fulltrúi svari - eða blöndu af hvoru tveggja.',
      primaryButton: 'Sjá alla þjónustu',
      secondaryButton: 'Fá ókeypis ráðgjöf',
      badge: 'Lausnir fyrir þjónustuver',
      incomingCalls: [
        '+354 581-2345',
        '+354 692-7834', 
        '+354 456-9012',
        '+354 773-5681'
      ]
    },
    en: {
      title: 'Next-generation customer service',
      subtitle: 'Trusted by 100+ companies across Iceland. Get the perfect blend of human expertise and AI efficiency - exactly when your customers need it.',
      primaryButton: 'Explore Services',
      secondaryButton: 'Get Free Consultation',
      badge: 'Customer Service Solutions',
      incomingCalls: [
        '+354 581-2345',
        '+354 692-7834',
        '+354 456-9012', 
        '+354 773-5681'
      ]
    }
  }

  const currentContent = content[currentLanguage]

  // Subtle activity indicator - just small notification dots
  const ActivityDot = ({ phoneNumber, position, delay = 0, type = 'incoming' }) => {
    const dotStyle = {
      position: 'absolute',
      ...position,
      animation: `subtleFloat 8s ease-in-out infinite ${delay}s, fadeIn 1.5s ease-out ${delay}s both`,
      zIndex: 12
    }

    return (
      <div 
        className="flex items-center space-x-2 bg-gray-900/5 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-200/40"
        style={dotStyle}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${type === 'incoming' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></div>
        <span className="text-gray-700 font-medium text-xs">
          {phoneNumber}
        </span>
      </div>
    )
  }

  // Subtle activity indicator
  const ActivityPulse = ({ position, delay = 0 }) => {
    const pulseStyle = {
      position: 'absolute',
      ...position,
      animation: `activityPulse 3s ease-in-out infinite ${delay}s, fadeInScale 1s ease-out ${delay}s both`,
      zIndex: 5
    }

    return (
      <div 
        className="w-8 h-8 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full blur-sm"
        style={pulseStyle}
      />
    )
  }

  return (
    <div className="min-h-screen relative pt-8 bg-white">
      {/* Subtle gradient background hints */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-50/40 via-teal-50/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-50/40 via-amber-50/20 to-transparent"></div>
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-orange-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px]">
              
              {/* Left side - Text content */}
              <div className="flex flex-col justify-center">
                <div className="inline-block bg-white rounded-xl px-6 py-2 mb-8 border border-gray-300 w-fit shadow-sm">
                  <span className="text-gray-700 font-semibold text-sm tracking-wide uppercase">
                    {currentContent.badge}
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight text-slate-900">
                  {currentContent.title}
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-12">
                  {currentContent.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <button
                    onClick={() => onContactClick('services')}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    {currentContent.primaryButton}
                  </button>
                  
                  <button
                    onClick={() => onContactClick('consultation')}
                    className="px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 hover:shadow-lg hover:-translate-y-1"
                  >
                    {currentContent.secondaryButton}
                  </button>
                </div>
              </div>
              
              {/* Right side - Phone with subtle call indicators */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md mx-auto">
                  {/* Enhanced glow behind phone */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/15 to-[#FFA947]/15 rounded-3xl blur-3xl transform scale-110"></div>
                  
                  {/* Subtle activity indicators */}
                  <ActivityDot 
                    phoneNumber={currentContent.incomingCalls[0]}
                    position={{ top: '40px', left: '-25px' }}
                    delay={0}
                    type="incoming"
                  />
                  
                  <ActivityDot 
                    phoneNumber={currentContent.incomingCalls[1]}
                    position={{ top: '120px', right: '-30px' }}
                    delay={2}
                    type="outgoing"
                  />
                  
                  <ActivityDot 
                    phoneNumber={currentContent.incomingCalls[2]}
                    position={{ bottom: '140px', left: '-20px' }}
                    delay={4}
                    type="incoming"
                  />
                  
                  <ActivityDot 
                    phoneNumber={currentContent.incomingCalls[3]}
                    position={{ bottom: '80px', right: '-25px' }}
                    delay={6}
                    type="outgoing"
                  />
                  
                  {/* Main phone image */}
                  <div className="relative flex justify-center items-center py-12 px-6 z-10">
                    <img 
                      src={outboundPhone} 
                      alt="Professional phone interface"
                      className="w-full h-auto max-w-xs drop-shadow-2xl"
                    />
                  </div>
                  
                  {/* Subtle ambient elements */}
                  <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-gradient-to-br from-[#4A90E2]/10 to-transparent rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-gradient-to-tr from-[#FFA947]/10 to-transparent rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>

      {/* Refined CSS Animations */}
      <style jsx>{`
        @keyframes subtleFloat {
          0%, 100% { 
            transform: translateY(0px); 
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-4px); 
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 0.8;
            transform: translateY(0);
          }
        }

        /* Mobile responsive */
        @media (max-width: 1024px) {
          .absolute[style*="left: -25px"] {
            left: -15px !important;
          }
          .absolute[style*="right: -30px"] {
            right: -20px !important;
          }
          .absolute[style*="left: -20px"] {
            left: -10px !important;
          }
          .absolute[style*="right: -25px"] {
            right: -15px !important;
          }
        }
        
        @media (max-width: 768px) {
          .absolute[style*="left: -"] {
            display: none;
          }
          .absolute[style*="right: -"] {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Hero