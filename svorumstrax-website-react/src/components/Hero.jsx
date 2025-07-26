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
        { name: 'Guðrún Jónsdóttir', location: 'Reykjavík' },
        { name: 'Magnús Ólafsson', location: 'Akureyri' }, 
        { name: 'Elísabet Þórsdóttir', location: 'Kópavogur' },
        { name: 'Kristján Helgason', location: 'Hafnarfjörður' }
      ]
    },
    en: {
      title: 'Next-generation customer service',
      subtitle: 'Trusted by 100+ companies across Iceland. Get the perfect blend of human expertise and AI efficiency - exactly when your customers need it.',
      primaryButton: 'Explore Services',
      secondaryButton: 'Get Free Consultation',
      badge: 'Customer Service Solutions',
      incomingCalls: [
        { name: 'Guðrún Jónsdóttir', location: 'Reykjavík' },
        { name: 'Magnús Ólafsson', location: 'Akureyri' },
        { name: 'Elísabet Þórsdóttir', location: 'Kópavogur' }, 
        { name: 'Kristján Helgason', location: 'Hafnarfjörður' }
      ]
    }
  }

  const currentContent = content[currentLanguage]

  // Incoming call notification like smith.ai
  const IncomingCall = ({ caller, position, delay = 0 }) => {
    const callStyle = {
      position: 'absolute',
      ...position,
      animation: `gentleFloat 6s ease-in-out infinite ${delay}s, slideInCall 1s ease-out ${delay}s both`,
      zIndex: 15
    }

    return (
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 w-72 max-w-sm"
        style={callStyle}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-600">Incoming call</span>
          </div>
          <span className="text-xs text-gray-500">+354 537-0800</span>
        </div>

        {/* Caller Info */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
            {caller.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 text-sm truncate">
              {caller.name}
            </div>
            <div className="text-xs text-gray-600 truncate">
              {caller.location}
            </div>
          </div>
        </div>

        {/* Call Actions */}
        <div className="flex justify-center space-x-6">
          <button className="w-11 h-11 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <button className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center shadow-md hover:bg-green-600 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </button>
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
                  
                  {/* Incoming call notifications like smith.ai */}
                  <IncomingCall 
                    caller={currentContent.incomingCalls[0]}
                    position={{ top: '10px', left: '-120px' }}
                    delay={0}
                  />
                  
                  <IncomingCall 
                    caller={currentContent.incomingCalls[1]}
                    position={{ top: '80px', right: '-130px' }}
                    delay={1.5}
                  />
                  
                  <IncomingCall 
                    caller={currentContent.incomingCalls[2]}
                    position={{ bottom: '120px', left: '-110px' }}
                    delay={3}
                  />
                  
                  {/* Smaller call indicator */}
                  <div 
                    className="absolute z-15"
                    style={{
                      bottom: '50px',
                      right: '-100px',
                      animation: 'gentleFloat 6s ease-in-out infinite 4.5s, slideInCall 1s ease-out 4.5s both',
                      transform: 'scale(0.85)',
                      zIndex: 15
                    }}
                  >
                    <IncomingCall 
                      caller={currentContent.incomingCalls[3]}
                      position={{ position: 'relative' }}
                      delay={0}
                    />
                  </div>
                  
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
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-10px) rotate(1deg); 
          }
        }
        
        @keyframes slideInCall {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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
          .absolute[style*="left: -120px"] {
            left: -80px !important;
          }
          .absolute[style*="right: -130px"] {
            right: -90px !important;
          }
          .absolute[style*="left: -110px"] {
            left: -70px !important;
          }
          div[style*="right: -100px"] {
            right: -60px !important;
          }
        }
        
        @media (max-width: 768px) {
          .absolute[style*="left: -"] {
            display: none;
          }
          .absolute[style*="right: -"] {
            display: none;
          }
          div[style*="right: -"] {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Hero