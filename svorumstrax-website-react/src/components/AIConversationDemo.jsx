import React, { useState, useEffect, useRef } from 'react';
import customerAvatar from '../assets/images/customer-avatar.jpg';

const AIConversationDemo = ({ currentLanguage = 'is' }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [actionBar, setActionBar] = useState(null);
  const [isRestarting, setIsRestarting] = useState(false);
  const chatContainerRef = useRef(null);

  // Professional AI Icon - Simple Blue Diamond (Freddy AI Style)
  const AIIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L15 7L10 12L5 7L10 2Z" fill="#4A90E2"/>
      <path d="M10 8L15 13L10 18L5 13L10 8Z" fill="#26C5D9" opacity="0.8"/>
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

  // Auto-play conversation with sharp text appearance
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
        }, 600); // Shorter typing duration for sharper feel
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
        
        {/* Messages Area */}
        <div 
          ref={chatContainerRef}
          className="h-[500px] overflow-y-auto p-8 space-y-6"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#475569 transparent'
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex items-start gap-4"
              style={{ 
                animation: 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)', // Faster, sharper animation
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {/* Avatar - Only show for AI messages, positioned properly */}
              {message.type === 'ai' && (
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <AIIcon />
                </div>
              )}

              {/* Message Content */}
              <div className={`max-w-[70%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                {message.type === 'user' ? (
                  // User messages: No background, just text (Freddy AI style)
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={customerAvatar} 
                        alt="Customer" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold rounded-full" style={{display: 'none'}}>
                        K
                      </div>
                    </div>
                    <div className="text-slate-100 text-base leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  // AI messages: Professional bubble
                  <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600/30 px-6 py-4 rounded-2xl rounded-tl-lg shadow-lg">
                    <div className="text-slate-100 text-base leading-relaxed">
                      {message.content}
                    </div>
                    
                    {/* Action Buttons */}
                    {message.hasButtons && message.buttons && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {message.buttons.map((buttonText, buttonIndex) => (
                          <button 
                            key={buttonIndex}
                            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
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

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-4" style={{ animation: 'slideInUp 0.2s ease-out' }}>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <AIIcon />
              </div>
              <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600/30 px-6 py-4 rounded-2xl rounded-tl-lg shadow-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          {actionBar && (
            <div className="flex justify-center" style={{ animation: 'fadeInScale 0.2s ease-out' }}>
              <div className="bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 text-teal-300 px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-3 shadow-lg">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-spin"></div>
                {actionBar}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS Animations - Faster and Sharper */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Custom scrollbar */
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