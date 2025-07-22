import React, { useState, useEffect, useRef } from 'react';
import customerAvatar from '../assets/images/customer-avatar.png';

const AIConversationDemo = ({ currentLanguage = 'is' }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [actionBar, setActionBar] = useState(null);
  const [isRestarting, setIsRestarting] = useState(false);
  const chatContainerRef = useRef(null);

  // Enhanced Sparkle SVG Component with Teal-Orange Gradient
  const SparkleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#26C5D9'}} />
          <stop offset="50%" style={{stopColor: '#4A90E2'}} />
          <stop offset="100%" style={{stopColor: '#FFA947'}} />
        </linearGradient>
      </defs>
      {/* Main star - larger and chunkier */}
      <path d="M12 1L13.5 8.5L21 10L13.5 11.5L12 19L10.5 11.5L3 10L10.5 8.5L12 1Z" fill="url(#sparkleGradient)" strokeWidth="0.5" stroke="white"/>
      {/* Secondary stars - more professional positioning */}
      <path d="M18.5 5L19 7L21 7.5L19 8L18.5 10L18 8L16 7.5L18 7L18.5 5Z" fill="url(#sparkleGradient)" opacity="0.9"/>
      <path d="M5.5 15L6 17L8 17.5L6 18L5.5 20L5 18L3 17.5L5 17L5.5 15Z" fill="url(#sparkleGradient)" opacity="0.8"/>
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

  // Conversation content - keep the existing good flow
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

  // Smooth restart with slide down/up animation
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
      {/* Enterprise Chat Container - Freddy AI Style */}
      <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700/30 overflow-hidden transition-all duration-500 ${
        isRestarting ? 'transform translate-y-8 opacity-0' : 'transform translate-y-0 opacity-100'
      }`}>
        
        {/* Messages Area - Big Window */}
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
              className={`flex items-start gap-4 ${
                message.type === 'user' ? 'flex-row' : 'flex-row-reverse'
              }`}
              style={{ 
                animation: 'slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Big Profile Pictures with Customer Avatar */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden ${
                message.type === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700' 
                  : 'bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-teal-400/30'
              }`}>
                {message.type === 'user' ? (
                  <>
                    <img 
                      src={customerAvatar} 
                      alt="Customer" 
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        // Fallback to "K" if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="text-white text-lg font-bold" style={{display: 'none'}}>K</span>
                  </>
                ) : (
                  <SparkleIcon />
                )}
              </div>

              {/* Message Bubble - Freddy AI Style */}
              <div className={`max-w-[70%] ${
                message.type === 'user' ? 'mr-16' : 'ml-16'
              }`}>
                <div
                  className={`px-6 py-4 rounded-2xl text-base leading-relaxed shadow-lg backdrop-blur-sm border ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-500/30 rounded-bl-lg'
                      : 'bg-slate-800/90 text-slate-100 border-slate-600/30 rounded-br-lg'
                  }`}
                >
                  {message.content}
                  
                  {/* Action Buttons */}
                  {message.hasButtons && message.buttons && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {message.buttons.map((buttonText, buttonIndex) => (
                        <button 
                          key={buttonIndex}
                          className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 border border-teal-400/30"
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

          {/* Typing Indicator with Enhanced Sparkle */}
          {isTyping && (
            <div className="flex items-start gap-4 flex-row-reverse" style={{ animation: 'slideInUp 0.3s ease-out' }}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-teal-400/30 flex items-center justify-center shadow-lg">
                <SparkleIcon />
              </div>
              <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600/30 px-6 py-4 rounded-2xl rounded-br-lg shadow-lg ml-16">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          {actionBar && (
            <div className="flex justify-center" style={{ animation: 'fadeInScale 0.3s ease-out' }}>
              <div className="bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 text-teal-300 px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-3 shadow-lg">
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-spin"></div>
                {actionBar}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.97);
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