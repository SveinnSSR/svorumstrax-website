import React, { useState, useEffect, useRef } from 'react';
import customerAvatar from '../assets/images/customer-avatar.png';

const AIConversationDemo = ({ currentLanguage = 'is' }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [actionBar, setActionBar] = useState(null);
  const [isRestarting, setIsRestarting] = useState(false);
  const chatContainerRef = useRef(null);

  // Premium AI Icon - Clean and Professional
  const AIIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L16 8L12 14L8 8L12 2Z" fill="#2563EB"/>
      <path d="M12 10L16 16L12 22L8 16L12 10Z" fill="#1D4ED8"/>
    </svg>
  );

  const conversationSteps = {
    is: [
      {
        type: 'user',
        content: 'Hæ! Er hægt að bóka tíma hjá ykkur um helgina?',
        delay: 800
      },
      {
        type: 'ai',
        content: 'Hæ! Já, við erum opin alla daga vikunnar. Um helgar erum við opin 10:00-16:00. Get ég hjálpað þér frekar?',
        delay: 1400
      },
      {
        type: 'user',
        content: 'Frábært! Get ég bókað tíma á laugardaginn?',
        delay: 1000
      },
      {
        type: 'action',
        content: 'Tengist bókunarkerfi...',
        delay: 700
      },
      {
        type: 'ai',
        content: 'Auðvitað! Ég sé að það eru laus tímabil á laugardaginn. Viltu klukkan 11:00 eða 14:30?',
        delay: 1200,
        hasButtons: true,
        buttons: ['Velja 11:00', 'Velja 14:30']
      }
    ],
    en: [
      {
        type: 'user',
        content: 'Hi! Is it possible to book an appointment with you over the weekend?',
        delay: 800
      },
      {
        type: 'ai',
        content: 'Hi! Yes, we are open every day of the week. On weekends we are open 10:00-16:00. Can I help you further?',
        delay: 1400
      },
      {
        type: 'user',
        content: 'Great! Can I book an appointment for Saturday?',
        delay: 1000
      },
      {
        type: 'action',
        content: 'Connecting to booking system...',
        delay: 700
      },
      {
        type: 'ai',
        content: 'Of course! I can see available slots for Saturday. Would you prefer 11:00 or 14:30?',
        delay: 1200,
        hasButtons: true,
        buttons: ['Choose 11:00', 'Choose 14:30']
      }
    ]
  };

  const steps = conversationSteps[currentLanguage];

  // Keep only the last 3 messages visible
  const visibleMessages = messages.slice(-3);

  useEffect(() => {
    if (currentStep >= steps.length) return;

    const step = steps[currentStep];
    const timer = setTimeout(() => {
      
      if (step.type === 'action') {
        setActionBar(step.content);
        setTimeout(() => {
          setActionBar(null);
          setCurrentStep(prev => prev + 1);
        }, step.delay);
        return;
      }

      if (step.type === 'ai') {
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            ...step,
            id: `${step.type}-${Date.now()}-${Math.random()}`
          }]);
          setIsTyping(false);
          setCurrentStep(prev => prev + 1);
        }, 800);
      } else {
        setMessages(prev => [...prev, {
          ...step,
          id: `${step.type}-${Date.now()}-${Math.random()}`
        }]);
        setCurrentStep(prev => prev + 1);
      }
    }, currentStep === 0 ? 500 : step.delay);

    return () => clearTimeout(timer);
  }, [currentStep, steps, currentLanguage]);

  const resetConversation = () => {
    setIsRestarting(true);
    
    setTimeout(() => {
      setMessages([]);
      setCurrentStep(0);
      setIsTyping(false);
      setActionBar(null);
      
      setTimeout(() => {
        setIsRestarting(false);
      }, 400);
    }, 600);
  };

  useEffect(() => {
    resetConversation();
  }, [currentLanguage]);

  useEffect(() => {
    if (currentStep >= steps.length) {
      const resetTimer = setTimeout(resetConversation, 6000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep, steps.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className={`bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl shadow-2xl border border-slate-700/40 overflow-hidden transition-all duration-600 ${
        isRestarting ? 'transform scale-95 opacity-0' : 'transform scale-100 opacity-100'
      }`}>
        
        <div 
          ref={chatContainerRef}
          className="h-[520px] flex flex-col justify-center px-8 py-8"
          style={{
            background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          }}
        >
          
          {/* Messages Container - Centered */}
          <div className="flex-1 flex flex-col justify-center space-y-8 max-w-5xl mx-auto w-full">
            
            {visibleMessages.map((message, index) => (
              <div 
                key={message.id} 
                className="opacity-0 animate-[slideUp_0.6s_ease-out_forwards]"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animation: `slideUp 0.6s ease-out ${index * 0.2}s forwards`
                }}
              >
                
                {/* Customer Messages - Left Side */}
                {message.type === 'user' && (
                  <div className="flex items-center gap-4 justify-start">
                    <img 
                      src={customerAvatar} 
                      alt="Customer" 
                      className="w-12 h-12 rounded-full object-cover shadow-lg flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg flex-shrink-0"
                      style={{display: 'none'}}
                    >
                      K
                    </div>
                    <div 
                      className="text-white font-semibold leading-relaxed max-w-[70%]"
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        fontSize: '17px',
                        lineHeight: '1.5',
                        fontWeight: '600',
                        letterSpacing: '-0.01em',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'optimizeLegibility'
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                )}

                {/* Bot Messages - Right Side */}
                {message.type === 'ai' && (
                  <div className="flex items-start gap-4 justify-end">
                    <div 
                      className="bg-white rounded-2xl shadow-xl px-6 py-5 max-w-[75%] border border-gray-100"
                      style={{
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <div 
                        className="text-gray-900 font-semibold leading-relaxed"
                        style={{
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                          fontSize: '17px',
                          lineHeight: '1.5',
                          fontWeight: '600',
                          letterSpacing: '-0.01em',
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale',
                          textRendering: 'optimizeLegibility'
                        }}
                      >
                        {message.content}
                      </div>
                      
                      {/* Premium Action Buttons */}
                      {message.hasButtons && message.buttons && (
                        <div className="flex gap-3 mt-4">
                          {message.buttons.map((buttonText, buttonIndex) => (
                            <button 
                              key={buttonIndex}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                              style={{
                                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                fontSize: '15px',
                                fontWeight: '600',
                                letterSpacing: '-0.01em',
                                WebkitFontSmoothing: 'antialiased',
                                MozOsxFontSmoothing: 'grayscale',
                              }}
                            >
                              {buttonText}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <AIIcon />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div 
                className="flex items-start gap-4 justify-end opacity-0 animate-[slideUp_0.4s_ease-out_forwards]"
              >
                <div className="bg-white rounded-2xl shadow-xl px-6 py-5 max-w-[75%] border border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
                
                <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <AIIcon />
                </div>
              </div>
            )}

            {/* Action Status */}
            {actionBar && (
              <div className="flex justify-center animate-[fadeIn_0.4s_ease-out]">
                <div 
                  className="bg-blue-500/20 border border-blue-400/30 text-blue-300 px-5 py-3 rounded-2xl flex items-center gap-3 backdrop-blur-sm"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontSize: '15px',
                    fontWeight: '600',
                    letterSpacing: '-0.01em'
                  }}
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-spin"></div>
                  {actionBar}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AIConversationDemo;