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
        '+354 773-5681',
        '+354 824-1907'
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
        '+354 773-5681',
        '+354 824-1907'
      ]
    }
  }

  const currentContent = content[currentLanguage]

  // Minimal phone call indicator
  const CallIndicator = ({ phoneNumber, position, delay = 0, isActive = false }) => {
    const indicatorStyle = {
      position: 'absolute',
      ...position,
      animation: `gentleFloat 6s ease-in-out infinite ${delay}s, fadeInUp 1.2s ease-out ${delay}s both`,
      zIndex: 15
    }

    return (
      <div 
        className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 shadow-lg"
        style={indicatorStyle}
      >
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-orange-400'}`}></div>
          <span className="text-white font-medium text-sm tracking-wide">
            {phoneNumber}
          </span>
        </div>
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
                  
                  {/* Subtle call indicators floating around */}
                  <CallIndicator 
                    phoneNumber={currentContent.incomingCalls[0]}
                    position={{ top: '20px', left: '-45px' }}
                    delay={0}
                    isActive={true}
                  />
                  
                  <CallIndicator 
                    phoneNumber={currentContent.incomingCalls[1]}
                    position={{ top: '100px', right: '-50px' }}
                    delay={2}
                    isActive={false}
                  />
                  
                  <CallIndicator 
                    phoneNumber={currentContent.incomingCalls[2]}
                    position={{ bottom: '140px', left: '-40px' }}
                    delay={4}
                    isActive={true}
                  />
                  
                  <CallIndicator 
                    phoneNumber={currentContent.incomingCalls[3]}
                    position={{ bottom: '60px', right: '-45px' }}
                    delay={6}
                    isActive={false}
                  />
                  
                  {/* Activity pulses for extra subtle movement */}
                  <ActivityPulse 
                    position={{ top: '30%', left: '-15px' }}
                    delay={1}
                  />
                  
                  <ActivityPulse 
                    position={{ bottom: '35%', right: '-15px' }}
                    delay={3}
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
        @keyframes gentleFloat {
          0%, 100% { 
            transform: translateY(0px); 
            opacity: 1;
          }
          50% { 
            transform: translateY(-8px); 
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes activityPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.6;
          }
        }

        /* Mobile responsive */
        @media (max-width: 1024px) {
          .absolute[style*="left: -45px"] {
            left: -30px !important;
          }
          .absolute[style*="right: -50px"] {
            right: -35px !important;
          }
          .absolute[style*="left: -40px"] {
            left: -25px !important;
          }
          .absolute[style*="right: -45px"] {
            right: -30px !important;
          }
        }
        
        @media (max-width: 768px) {
          .absolute[style*="left: -"] {
            left: -20px !important;
            opacity: 0.7;
          }
          .absolute[style*="right: -"] {
            right: -20px !important;
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}

export default Hero