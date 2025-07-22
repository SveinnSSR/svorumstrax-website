import React, { useState, useEffect, useRef, memo } from 'react';
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L16 8L12 14L8 8L12 2Z" fill="#4f46e5"/>
      <path d="M12 10L16 16L12 22L8 16L12 10Z" fill="#3730a3"/>
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
  const visibleMessages = messages.slice(-3);

  // Memoized Message Component for Performance
  const MemoizedMessage = memo(({ message, index }) => (
    <div
      className={`flex items-start gap-3 ${
        message.type === 'user' ? 'flex-row' : 'flex-row-reverse'
      } opacity-0`}
      style={{ 
        animation: `smoothSlideIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s forwards`,
        transform: 'translate3d(0,0,0)',
        willChange: 'transform, opacity'
      }}
    >
      {/* Refined Avatar */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
        message.type === 'user' 
          ? 'bg-white shadow-sm' 
          : 'bg-white shadow-sm'
      }`}>
        {message.type === 'user' ? (
          <img 
            src={customerAvatar} 
            alt="Customer" 
            className="w-full h-full rounded-xl object-cover"
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
            className="w-full h-full rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm font-semibold"
            style={{display: 'none'}}
          >
            K
          </div>
        )}
      </div>

      {/* Professional Message Bubble */}
      <div className="max-w-[75%] min-w-[30%]">
        <div
          className={`px-5 py-3 rounded-xl shadow-sm ${
            message.type === 'user'
              ? 'bg-blue-600 text-white'
              : 'bg-white/95 backdrop-blur-sm border border-gray-100 text-gray-800'
          }`}
          style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
            fontSize: '15px',
            lineHeight: '1.4',
            fontWeight: '500',
            WebkitFontSmoothing: 'subpixel-antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            letterSpacing: '-0.005em'
          }}
        >
          {message.content}
          
          {/* Refined Action Buttons */}
          {message.hasButtons && message.buttons && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.buttons.map((buttonText, buttonIndex) => (
                <button 
                  key={buttonIndex}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm shadow-sm transition-all duration-150 hover:shadow-md transform hover:scale-[1.02]"
                  style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    WebkitFontSmoothing: 'subpixel-antialiased'
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
  ));

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
        isRestarting ? 'transform translate-y-4 opacity-0 scale-98' : 'transform translate-y-0 opacity-100 scale-100'
      }`}>
        
        <div 
          ref={chatContainerRef}
          className="h-[500px] overflow-y-auto p-8 flex flex-col justify-end"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#475569 transparent'
          }}
        >
          <div className="space-y-8 flex-1 flex flex-col justify-center min-h-full">
            {visibleMessages.map((message, index) => (
              <MemoizedMessage key={message.id} message={message} index={index} />
            ))}

            {/* Smooth Typing Indicator */}
            {isTyping && (
              <div 
                className="flex items-start gap-3 flex-row-reverse opacity-0" 
                style={{ 
                  animation: 'smoothSlideIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                  transform: 'translate3d(0,0,0)'
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <AIIcon />
                </div>
                <div className="bg-white/95 backdrop-blur-sm border border-gray-100 px-5 py-3 rounded-xl shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Refined Action Bar */}
            {actionBar && (
              <div 
                className="flex justify-center opacity-0" 
                style={{ animation: 'smoothFade 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}
              >
                <div 
                  className="bg-indigo-600/15 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-sm"
                  style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
                    fontSize: '13px',
                    fontWeight: '500',
                    WebkitFontSmoothing: 'subpixel-antialiased'
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></div>
                  {actionBar}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes smoothSlideIn {
          from {
            opacity: 0;
            transform: translate3d(0, 12px, 0) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        
        @keyframes smoothFade {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Smooth scrollbar */
        div::-webkit-scrollbar {
          width: 4px;
        }
        
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        
        div::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 2px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
};

export default AIConversationDemo;