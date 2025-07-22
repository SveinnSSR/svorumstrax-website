import React, { useState, useEffect, useRef } from 'react';
import customerAvatar from '../assets/images/customer-avatar.png';

const AIConversationDemo = ({ currentLanguage = 'is' }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [actionBar, setActionBar] = useState(null);
  const [isRestarting, setIsRestarting] = useState(false);
  const chatContainerRef = useRef(null);

  // Professional AI Icon - Simple and Clean
  const AIIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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

  // Keep only 3 messages visible - smooth transition
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
        }, 400);
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
      }, 200);
    }, 300);
  };

  useEffect(() => {
    resetConversation();
  }, [currentLanguage]);

  useEffect(() => {
    if (currentStep >= steps.length) {
      const resetTimer = setTimeout(resetConversation, 4000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep, steps.length]);

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Clean Chat Container */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700/30 overflow-hidden">
        
        {/* Messages Area */}
        <div 
          ref={chatContainerRef}
          className={`h-[450px] overflow-y-auto p-8 space-y-6 transition-opacity duration-300 ${
            isRestarting ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {visibleMessages.map((message, index) => (
            <div
              key={message.id}
              className={`flex items-end gap-3 ${
                message.type === 'user' ? 'flex-row' : 'flex-row-reverse'
              }`}
              style={{ 
                animation: `slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both`
              }}
            >
              {/* Avatar - Professional Size */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                message.type === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700' 
                  : 'bg-white border border-gray-200/50'
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
                  <span 
                    className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center text-white text-sm font-bold"
                    style={{display: 'none'}}
                  >
                    K
                  </span>
                )}
              </div>

              {/* Message Bubble - Clean & Simple */}
              <div className={`max-w-[70%] relative ${
                message.type === 'user' ? 'mr-12' : 'ml-12'
              }`}>
                <div
                  className={`px-4 py-3 rounded-xl text-sm font-medium leading-relaxed shadow-sm border ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white border-blue-200/20 rounded-bl-md'
                      : 'bg-white text-slate-700 border-gray-200/30 rounded-br-md'
                  }`}
                >
                  {message.content}
                  
                  {/* Action Buttons - Clean Design */}
                  {message.hasButtons && message.buttons && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.buttons.map((buttonText, buttonIndex) => (
                        <button 
                          key={buttonIndex}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200"
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
            <div className="flex items-end gap-3 flex-row-reverse" style={{ animation: 'slideInUp 0.2s ease-out' }}>
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/50 flex items-center justify-center shadow-sm">
                <AIIcon />
              </div>
              <div className="bg-white border border-gray-200/30 px-4 py-3 rounded-xl rounded-br-md shadow-sm ml-12">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          {actionBar && (
            <div className="flex justify-center" style={{ animation: 'fadeInScale 0.2s ease-out' }}>
              <div className="bg-blue-500/20 border border-blue-400/30 text-blue-300 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 shadow-sm">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                {actionBar}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AIConversationDemo;