import React, { useState, useEffect, useRef } from 'react';
import customerAvatar from '../assets/images/customer-avatar.png';

const AIConversationDemo = ({ currentLanguage = 'is' }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [actionBar, setActionBar] = useState(null);
  const [isRestarting, setIsRestarting] = useState(false);
  const chatContainerRef = useRef(null);

  // Clean Professional AI Icon
  const AIIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L16 8L12 14L8 8L12 2Z" fill="#3B82F6"/>
      <path d="M12 10L16 16L12 22L8 16L12 10Z" fill="#1E40AF"/>
    </svg>
  );

  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollChatToBottom();
  }, [messages, isTyping, actionBar]);

  const conversationSteps = {
    is: [
      {
        type: 'user',
        content: 'Hæ! Er hægt að bóka tíma hjá ykkur um helgina?',
        delay: 600
      },
      {
        type: 'ai',
        content: 'Hæ! Já, við erum opin alla daga vikunnar. Um helgar erum við opin 10:00-16:00. Get ég hjálpað þér frekar?',
        delay: 1200
      },
      {
        type: 'user',
        content: 'Frábært! Get ég bókað tíma á laugardaginn?',
        delay: 800
      },
      {
        type: 'action',
        content: 'Tengist bókunarkerfi...',
        delay: 600
      },
      {
        type: 'ai',
        content: 'Auðvitað! Ég sé að það eru laus tímabil á laugardaginn. Viltu klukkan 11:00 eða 14:30?',
        delay: 1000,
        hasButtons: true,
        buttons: ['Velja 11:00', 'Velja 14:30']
      }
    ],
    en: [
      {
        type: 'user',
        content: 'Hi! Is it possible to book an appointment with you over the weekend?',
        delay: 600
      },
      {
        type: 'ai',
        content: 'Hi! Yes, we are open every day of the week. On weekends we are open 10:00-16:00. Can I help you further?',
        delay: 1200
      },
      {
        type: 'user',
        content: 'Great! Can I book an appointment for Saturday?',
        delay: 800
      },
      {
        type: 'action',
        content: 'Connecting to booking system...',
        delay: 600
      },
      {
        type: 'ai',
        content: 'Of course! I can see available slots for Saturday. Would you prefer 11:00 or 14:30?',
        delay: 1000,
        hasButtons: true,
        buttons: ['Choose 11:00', 'Choose 14:30']
      }
    ]
  };

  const steps = conversationSteps[currentLanguage];

  // Keep only 3 messages max
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
        }, 700);
      } else {
        setMessages(prev => [...prev, {
          ...step,
          id: `${step.type}-${Date.now()}-${Math.random()}`
        }]);
        setCurrentStep(prev => prev + 1);
      }
    }, currentStep === 0 ? 400 : step.delay);

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
      }, 300);
    }, 500);
  };

  useEffect(() => {
    resetConversation();
  }, [currentLanguage]);

  useEffect(() => {
    if (currentStep >= steps.length) {
      const resetTimer = setTimeout(resetConversation, 5000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep, steps.length]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700/30 overflow-hidden transition-all duration-500 ${
        isRestarting ? 'transform translate-y-8 opacity-0' : 'transform translate-y-0 opacity-100'
      }`}>
        
        <div 
          ref={chatContainerRef}
          className="h-[500px] overflow-y-auto p-8"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#475569 transparent'
          }}
        >
          <div className="space-y-6">
            {visibleMessages.map((message, index) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${
                  message.type === 'user' ? 'flex-row' : 'flex-row-reverse'
                } opacity-0`}
                style={{ 
                  animation: `slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s forwards`
                }}
              >
                {/* Profile Pictures */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700' 
                    : 'bg-white border border-gray-200'
                }`}>
                  {message.type === 'user' ? (
                    <img 
                      src={customerAvatar} 
                      alt="Customer" 
                      className="w-full h-full rounded-2xl object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <AIIcon />
                  )}
                  {message.type === 'user' && (
                    <div 
                      className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center text-white text-lg font-bold"
                      style={{display: 'none'}}
                    >
                      K
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[70%] ${
                  message.type === 'user' ? 'mr-16' : 'ml-16'
                }`}>
                  <div
                    className={`px-6 py-4 rounded-2xl shadow-xl border ${
                      message.type === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-500/30 rounded-bl-lg'
                        : 'bg-white text-gray-900 border-gray-200 rounded-br-lg'
                    }`}
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "Helvetica Neue", Arial, sans-serif',
                      fontSize: '16px',
                      lineHeight: '1.5',
                      fontWeight: '500',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      textRendering: 'optimizeLegibility',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {message.content}
                    
                    {/* Action Buttons */}
                    {message.hasButtons && message.buttons && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {message.buttons.map((buttonText, buttonIndex) => (
                          <button 
                            key={buttonIndex}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            style={{
                              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "Helvetica Neue", Arial, sans-serif',
                              fontSize: '15px',
                              fontWeight: '600',
                              WebkitFontSmoothing: 'antialiased',
                              MozOsxFontSmoothing: 'grayscale'
                            }}
                          >
                            {buttonText}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-4 flex-row-reverse opacity-0" style={{ animation: 'slideInUp 0.3s ease-out forwards' }}>
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-xl">
                  <AIIcon />
                </div>
                <div 
                  className="bg-white border border-gray-200 px-6 py-4 rounded-2xl rounded-br-lg shadow-xl ml-16"
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar */}
            {actionBar && (
              <div className="flex justify-center opacity-0" style={{ animation: 'fadeInScale 0.4s ease-out forwards' }}>
                <div 
                  className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "Helvetica Neue", Arial, sans-serif',
                    fontSize: '14px',
                    fontWeight: '600',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
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
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        
        div::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
};

export default AIConversationDemo;