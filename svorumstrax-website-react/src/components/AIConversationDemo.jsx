import React, { useState, useEffect, useRef } from 'react';
import customerAvatar from '../assets/images/customer-avatar.png';

const AIConversationDemo = ({ currentLanguage = 'is' }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [actionBar, setActionBar] = useState(null);
  const [isRestarting, setIsRestarting] = useState(false);
  const chatContainerRef = useRef(null);

  // Professional AI Icon - Clean and Sharp
  const AIIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L18 9L12 15L6 9L12 3Z" fill="#4A90E2"/>
      <path d="M12 9L18 15L12 21L6 15L12 9Z" fill="#26C5D9" opacity="0.8"/>
    </svg>
  );

  // Auto-scroll chat container
  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollChatToBottom();
  }, [messages, isTyping, actionBar]);

  // Conversation content
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

  // Auto-play conversation
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
        }, 600);
      } else {
        setMessages(prev => [...prev, {
          ...step,
          id: `${step.type}-${Date.now()}-${Math.random()}`
        }]);
        setCurrentStep(prev => prev + 1);
      }
    }, currentStep === 0 ? 300 : step.delay);

    return () => clearTimeout(timer);
  }, [currentStep, steps, currentLanguage]);

  // Smooth restart
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
      {/* Professional Chat Container */}
      <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700/30 overflow-hidden transition-all duration-500 ${
        isRestarting ? 'transform translate-y-8 opacity-0' : 'transform translate-y-0 opacity-100'
      }`}>
        
        {/* Messages Area - Consistent Spacing */}
        <div 
          ref={chatContainerRef}
          className="h-[500px] overflow-y-auto p-8"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#475569 transparent'
          }}
        >
          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-center gap-4 ${
                  message.type === 'user' ? 'flex-row' : 'flex-row-reverse'
                }`}
                style={{ 
                  animation: 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Profile Pictures - Perfectly Centered */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700' 
                    : 'bg-white'
                }`}>
                  {message.type === 'user' ? (
                    <>
                      <img 
                        src={customerAvatar} 
                        alt="Customer" 
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold rounded-full" style={{display: 'none'}}>
                        K
                      </div>
                    </>
                  ) : (
                    <AIIcon />
                  )}
                </div>

                {/* Message Content - High Quality Typography */}
                <div className={`flex-1 max-w-[75%] ${
                  message.type === 'user' ? 'ml-3' : 'mr-3'
                }`}>
                  {message.type === 'user' ? (
                    // User messages: LEFT side, crisp white text
                    <div 
                      className="text-slate-100 font-medium leading-relaxed"
                      style={{
                        fontSize: '16px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", "SF Pro Display", system-ui, sans-serif',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        letterSpacing: '-0.005em'
                      }}
                    >
                      {message.content}
                    </div>
                  ) : (
                    // AI messages: RIGHT side, professional white bubble
                    <div className="bg-white border border-slate-200/40 px-4 py-4 rounded-xl shadow-md">
                      <div 
                        className="text-slate-800 font-medium leading-relaxed"
                        style={{
                          fontSize: '16px',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", "SF Pro Display", system-ui, sans-serif',
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale',
                          letterSpacing: '-0.005em'
                        }}
                      >
                        {message.content}
                      </div>
                      
                      {/* Action Buttons - Refined Size */}
                      {message.hasButtons && message.buttons && (
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {message.buttons.map((buttonText, buttonIndex) => (
                            <button 
                              key={buttonIndex}
                              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transform hover:scale-[1.01] transition-all duration-200"
                              style={{
                                fontSize: '14px',
                                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", "SF Pro Display", system-ui, sans-serif',
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
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator - Perfect Alignment */}
            {isTyping && (
              <div className="flex items-center gap-4 flex-row-reverse" style={{ animation: 'slideInUp 0.2s ease-out' }}>
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <AIIcon />
                </div>
                <div className="bg-white border border-slate-200/40 px-4 py-4 rounded-xl shadow-md mr-3 flex-1 max-w-[75%]">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Bar - Centered */}
          {actionBar && (
            <div className="flex justify-center mt-5" style={{ animation: 'fadeInScale 0.2s ease-out' }}>
              <div className="bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 text-teal-300 px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5 shadow-md">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-spin"></div>
                {actionBar}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS Animations - Smooth & Professional */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Professional scrollbar */
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