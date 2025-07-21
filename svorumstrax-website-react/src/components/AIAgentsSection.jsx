import React, { useState, useEffect } from 'react';

const AIConversationDemo = ({ currentLanguage = 'is' }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [actionBar, setActionBar] = useState(null);

  // Sparkle SVG Component for Bot Avatar
  const SparkleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 0L13.09 8.26L22 9L13.09 9.74L12 18L10.91 9.74L2 9L10.91 8.26L12 0Z" fill="white"/>
      <path d="M19 4L19.74 6.26L22 7L19.74 7.74L19 10L18.26 7.74L16 7L18.26 6.26L19 4Z" fill="white" opacity="0.8"/>
      <path d="M5 14L5.74 16.26L8 17L5.74 17.74L5 20L4.26 17.74L2 17L4.26 16.26L5 14Z" fill="white" opacity="0.6"/>
    </svg>
  );

  // Conversation content with proper flow
  const conversationSteps = {
    is: [
      {
        type: 'user',
        content: 'Hæ! Er þjónustuverið þitt opið um helgar?',
        delay: 1000
      },
      {
        type: 'ai',
        content: 'Hæ! Já, við erum opin alla daga vikunnar. Um helgar erum við opin 10:00-16:00. Get ég hjálpað þér frekar?',
        delay: 2500
      },
      {
        type: 'user',
        content: 'Frábært! Get ég bókað tíma á laugardaginn?',
        delay: 1800
      },
      {
        type: 'action',
        content: 'Tengist bókunarkerfi...',
        delay: 1200
      },
      {
        type: 'ai',
        content: 'Auðvitað! Ég sé að það eru laus tímabil á laugardaginn. Viltu klukkan 11:00 eða 14:30?',
        delay: 2000,
        hasButton: true,
        buttonText: 'Velja 11:00'
      }
    ],
    en: [
      {
        type: 'user',
        content: 'Hi! Is your customer service open on weekends?',
        delay: 1000
      },
      {
        type: 'ai',
        content: 'Hi! Yes, we are open every day of the week. On weekends we are open 10:00-16:00. Can I help you further?',
        delay: 2500
      },
      {
        type: 'user',
        content: 'Great! Can I book an appointment for Saturday?',
        delay: 1800
      },
      {
        type: 'action',
        content: 'Connecting to booking system...',
        delay: 1200
      },
      {
        type: 'ai',
        content: 'Of course! I can see available slots for Saturday. Would you prefer 11:00 or 14:30?',
        delay: 2000,
        hasButton: true,
        buttonText: 'Choose 11:00'
      }
    ]
  };

  const steps = conversationSteps[currentLanguage];

  // Auto-play conversation with proper timing
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

      // Show typing indicator for AI messages
      if (step.type === 'ai') {
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            ...step,
            id: `${step.type}-${Date.now()}-${Math.random()}`
          }]);
          setIsTyping(false);
          setCurrentStep(prev => prev + 1);
        }, 1000);
      } else {
        // User messages appear instantly
        setMessages(prev => [...prev, {
          ...step,
          id: `${step.type}-${Date.now()}-${Math.random()}`
        }]);
        setCurrentStep(prev => prev + 1);
      }
    }, currentStep === 0 ? 800 : step.delay);

    return () => clearTimeout(timer);
  }, [currentStep, steps, currentLanguage]);

  // Reset conversation
  const resetConversation = () => {
    setMessages([]);
    setCurrentStep(0);
    setIsTyping(false);
    setActionBar(null);
  };

  // Reset when language changes
  useEffect(() => {
    resetConversation();
  }, [currentLanguage]);

  // Auto-reset after completion
  useEffect(() => {
    if (currentStep >= steps.length) {
      const resetTimer = setTimeout(resetConversation, 4000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep, steps.length]);

  return (
    <div className="relative">
      {/* Main Chat Container */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden max-w-md mx-auto relative">
        
        {/* Gradient Header */}
        <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 px-6 py-4 border-b border-gray-100/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700">
                  {currentLanguage === 'is' ? 'AI Þjónustufulltrúi' : 'AI Assistant'}
                </div>
                <div className="text-xs text-slate-500">
                  {currentLanguage === 'is' ? 'Á netinu' : 'Online'}
                </div>
              </div>
            </div>
            <button
              onClick={resetConversation}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100/50 transition-all duration-200"
              title="Restart demo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/30 to-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-3 ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
              style={{ 
                animation: 'slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
              }}
            >
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                message.type === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600' 
                  : 'bg-gradient-to-br from-orange-400 via-orange-500 to-pink-500'
              }`}>
                {message.type === 'user' ? (
                  <span className="text-white text-sm font-bold">K</span>
                ) : (
                  <SparkleIcon />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[75%] relative ${
                message.type === 'user' ? 'ml-12' : 'mr-12'
              }`}>
                <div
                  className={`px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-lg border ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white border-blue-200/20 rounded-br-md'
                      : 'bg-white text-slate-700 border-gray-200/50 rounded-bl-md'
                  }`}
                >
                  {message.content}
                  
                  {/* Action Button */}
                  {message.hasButton && (
                    <div className="mt-4">
                      <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200">
                        {message.buttonText}
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Message timestamp */}
                <div className={`text-xs text-slate-400 mt-1 ${
                  message.type === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-3" style={{ animation: 'slideInUp 0.3s ease-out' }}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-pink-500 flex items-center justify-center shadow-lg">
                <SparkleIcon />
              </div>
              <div className="bg-white border border-gray-200/50 px-5 py-3 rounded-2xl rounded-bl-md shadow-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          {actionBar && (
            <div className="flex justify-center" style={{ animation: 'fadeInScale 0.3s ease-out' }}>
              <div className="bg-gradient-to-r from-orange-100 via-orange-50 to-pink-100 border border-orange-200/50 text-orange-700 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-spin"></div>
                {actionBar}
              </div>
            </div>
          )}
        </div>

        {/* Subtle bottom gradient */}
        <div className="h-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400"></div>
      </div>

      {/* Floating elements for visual appeal */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
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
        
        /* Custom scrollbar */
        div::-webkit-scrollbar {
          width: 4px;
        }
        
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        
        div::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #ec4899);
          border-radius: 4px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ea580c, #db2777);
        }
      `}</style>
    </div>
  );
};

export default AIConversationDemo;