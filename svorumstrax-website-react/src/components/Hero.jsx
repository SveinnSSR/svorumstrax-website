import outboundPhone from '../assets/images/outbound-phone.png'
import customerAvatar from '../assets/images/customer-avatar.png'

const Hero = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      title: 'Snjallar lausnir fyrir nútíma þjónustu',
      subtitle: 'Yfir 100 fyrirtæki treysta Svörum strax fyrir þjónustu við viðskiptavini. Þú velur hvort gervigreind eða mannlegur fulltrúi svari - eða blöndu af hvoru tveggja.',
      primaryButton: 'Sjá alla þjónustu',
      secondaryButton: 'Fá ókeypis ráðgjöf',
      badge: 'Lausnir fyrir þjónustuver',
      callCards: [
        {
          name: 'Guðrún Jónsdóttir',
          company: 'Rafal ehf.',
          time: 'Núna'
        },
        {
          name: 'Magnús Ólafsson', 
          company: 'FlyOver Iceland',
          time: '2 mín'
        },
        {
          name: 'Elísabet Þórsdóttir',
          company: 'Epal',
          time: 'Núna'
        },
        {
          name: 'Kristján Helgason',
          company: 'Fyrirtæki ehf.',
          time: '1 mín'
        }
      ]
    },
    en: {
      title: 'Next-generation customer service',
      subtitle: 'Trusted by 100+ companies across Iceland. Get the perfect blend of human expertise and AI efficiency - exactly when your customers need it.',
      primaryButton: 'Explore Services',
      secondaryButton: 'Get Free Consultation',
      badge: 'Customer Service Solutions',
      callCards: [
        {
          name: 'Guðrún Jónsdóttir',
          company: 'Rafal ehf.',
          time: 'Now'
        },
        {
          name: 'Magnús Ólafsson',
          company: 'FlyOver Iceland', 
          time: '2 min'
        },
        {
          name: 'Elísabet Þórsdóttir',
          company: 'Epal',
          time: 'Now'
        },
        {
          name: 'Kristján Helgason',
          company: 'Company Ltd.',
          time: '1 min'
        }
      ]
    }
  }

  const currentContent = content[currentLanguage]

  // Phone call interface component
  const PhoneCallCard = ({ caller, position, delay = 0, isActive = false }) => {
    const cardStyle = {
      position: 'absolute',
      ...position,
      animation: `floatCall 4s ease-in-out infinite ${delay}s, fadeInScale 0.8s ease-out ${delay}s both`,
      zIndex: 20
    }

    return (
      <div 
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 w-80 max-w-sm"
        style={cardStyle}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-600">
              Incoming call • {caller.time}
            </span>
          </div>
          <div className="text-xs text-gray-500">+354 537-0800</div>
        </div>

        {/* Caller Info */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img 
              src={customerAvatar} 
              alt={caller.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm"
              style={{display: 'none'}}
            >
              {caller.name.charAt(0)}
            </div>
            {isActive && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 text-base truncate">
              {caller.name}
            </div>
            <div className="text-sm text-gray-600 truncate">
              {caller.company}
            </div>
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex justify-center space-x-8">
          {/* Decline */}
          <button className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 9c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm0-7C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5.293 14.707L12 11.414 6.707 16.707c-.391.391-1.023.391-1.414 0s-.391-1.023 0-1.414L10.586 10 5.293 4.707c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0L12 8.586l5.293-5.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414L13.414 10l5.293 5.293c.391.391.391 1.023 0 1.414s-1.023.391-1.414 0z"/>
            </svg>
          </button>

          {/* Accept */}
          <button className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative pt-8 bg-white">
      {/* Subtle gradient background hints - updated to match logo colors */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Very subtle gradient elements using logo colors */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-50/40 via-teal-50/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-50/40 via-amber-50/20 to-transparent"></div>
        
        {/* Subtle floating elements with logo colors */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-orange-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px]">
              
              {/* Left side - Text content */}
              <div className="flex flex-col justify-center">
                {/* Clean badge - consistent with button system */}
                <div className="inline-block bg-white rounded-xl px-6 py-2 mb-8 border border-gray-300 w-fit shadow-sm">
                  <span className="text-gray-700 font-semibold text-sm tracking-wide uppercase">
                    {currentContent.badge}
                  </span>
                </div>
                
                {/* Clean black title without dot */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight text-slate-900">
                  {currentContent.title}
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-12">
                  {currentContent.subtitle}
                </p>
                
                {/* Updated buttons - consistent with navbar and choice section style */}
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
              
              {/* Right side - Phone image with floating call mockups */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md mx-auto">
                  {/* Subtle glow effect behind the phone - using logo colors */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/20 to-[#FFA947]/20 rounded-3xl blur-2xl transform scale-110"></div>
                  
                  {/* Phone Call Mockups - positioned around the phone */}
                  
                  {/* Call 1 - Top left - Active call */}
                  <PhoneCallCard 
                    caller={currentContent.callCards[0]}
                    position={{ top: '-10px', left: '-120px' }}
                    delay={0}
                    isActive={true}
                  />
                  
                  {/* Call 2 - Top right */}
                  <PhoneCallCard 
                    caller={currentContent.callCards[1]}
                    position={{ top: '20px', right: '-140px' }}
                    delay={1.5}
                    isActive={false}
                  />
                  
                  {/* Call 3 - Bottom left */}
                  <PhoneCallCard 
                    caller={currentContent.callCards[2]}
                    position={{ bottom: '60px', left: '-100px' }}
                    delay={3}
                    isActive={true}
                  />
                  
                  {/* Call 4 - Bottom right - smaller, partially visible */}
                  <div 
                    className="absolute bottom-10 right-[-80px] z-15"
                    style={{
                      animation: 'floatCall 4s ease-in-out infinite 4.5s, fadeInScale 0.8s ease-out 4.5s both',
                      transform: 'scale(0.8)'
                    }}
                  >
                    <PhoneCallCard 
                      caller={currentContent.callCards[3]}
                      position={{ position: 'relative' }}
                      delay={0}
                      isActive={false}
                    />
                  </div>
                  
                  {/* Phone image - centered in the container */}
                  <div className="relative flex justify-center items-center py-12 px-6 z-10">
                    <img 
                      src={outboundPhone} 
                      alt="Phone interface showing customer service features"
                      className="w-full h-auto max-w-xs drop-shadow-2xl"
                    />
                  </div>
                  
                  {/* Floating elements around the phone - using logo colors */}
                  <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-[#4A90E2]/20 to-transparent rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-tr from-[#FFA947]/20 to-transparent rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes floatCall {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          50% { 
            transform: translateY(-15px) scale(1.02); 
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Mobile responsive adjustments */
        @media (max-width: 1024px) {
          .absolute[style*="left: -120px"] {
            left: -80px !important;
          }
          .absolute[style*="right: -140px"] {
            right: -80px !important;
          }
          .absolute[style*="left: -100px"] {
            left: -60px !important;
          }
          .absolute[style*="right: -80px"] {
            right: -40px !important;
          }
        }
        
        @media (max-width: 768px) {
          .absolute[style*="left:"] {
            display: none;
          }
          .absolute[style*="right:"] {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Hero