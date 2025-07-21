import React, { useState, useEffect, useRef } from 'react';

const AIConversationDemo = ({ currentLanguage = 'is' }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [actionBar, setActionBar] = useState(null);
  const [isRestarting, setIsRestarting] = useState(false);
  const chatContainerRef = useRef(null);

  // Sparkle SVG Component for Bot Avatar - Orange theme
  const SparkleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 0L13.09 8.26L22 9L13.09 9.74L12 18L10.91 9.74L2 9L10.91 8.26L12 0Z" fill="white"/>
      <path d="M19 4L19.74 6.26L22 7L19.74 7.74L19 10L18.26 7.74L16 7L18.26 6.26L19 4Z" fill="white" opacity="0.8"/>
      <path d="M5 14L5.74 16.26L8 17L5.74 17.74L5 20L4.26 17.74L2 17L4.26 16.26L5 14Z" fill="white" opacity="0.6"/>
    </svg>
  );

  // Auto-scroll chat container only - NOT the whole page
  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Scroll chat when messages change - ONLY the chat container
  useEffect(() => {
    scrollChatToBottom();
  }, [messages, isTyping, actionBar]);

  // Conversation content with FASTER timing and MULTIPLE BUTTONS
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

  // Auto-play conversation with FASTER timing
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

      // Show typing indicator for AI messages - FASTER
      if (step.type === 'ai') {
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            ...step,
            id: `${step.type}-${Date.now()}-${Math.random()}`
          }]);
          setIsTyping(false);
          setCurrentStep(prev => prev + 1);
        }, 400);  // Much faster typing
      } else {
        // User messages appear instantly
        setMessages(prev => [...prev, {
          ...step,
          id: `${step.type}-${Date.now()}-${Math.random()}`
        }]);
        setCurrentStep(prev => prev + 1);
      }
    }, currentStep === 0 ? 500 : step.delay);

    return () => clearTimeout(timer);
  }, [currentStep, steps, currentLanguage]);

  // Smooth restart with fade out/in animation
  const resetConversation = () => {
    setIsRestarting(true);
    
    // Fade out current messages
    setTimeout(() => {
      setMessages([]);
      setCurrentStep(0);
      setIsTyping(false);
      setActionBar(null);
      
      // Fade back in
      setTimeout(() => {
        setIsRestarting(false);
      }, 200);
    }, 300);
  };

  // Reset when language changes
  useEffect(() => {
    resetConversation();
  }, [currentLanguage]);

  // Auto-reset after completion - FASTER restart
  useEffect(() => {
    if (currentStep >= steps.length) {
      const resetTimer = setTimeout(resetConversation, 4000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep, steps.length]);

  return (
    <div className="relative max-w-lg mx-auto">
      {/* Seamless Chat Container - No Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        
        {/* Messages Area - Scrollable Container */}
        <div 
          ref={chatContainerRef}
          className={`h-96 overflow-y-auto p-6 space-y-4 scrollbar-hide transition-opacity duration-300 ${
            isRestarting ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-3 ${
                message.type === 'user' ? 'flex-row' : 'flex-row-reverse'
              }`}
              style={{ 
                animation: 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Avatar - User on LEFT, Bot on RIGHT */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                message.type === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700' 
                  : 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600'
              }`}>
                {message.type === 'user' ? (
                  <span className="text-white text-sm font-bold">K</span>
                ) : (
                  <SparkleIcon />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[75%] relative ${
                message.type === 'user' ? 'mr-12' : 'ml-12'
              }`}>
                <div
                  className={`px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-lg border backdrop-blur-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white border-blue-200/20 rounded-bl-md'
                      : 'bg-white/90 text-slate-700 border-gray-200/50 rounded-br-md'
                  }`}
                >
                  {message.content}
                  
                  {/* Multiple Action Buttons - Orange theme */}
                  {message.hasButtons && message.buttons && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {message.buttons.map((buttonText, buttonIndex) => (
                        <button 
                          key={buttonIndex}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
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

          {/* Typing Indicator - Orange theme */}
          {isTyping && (
            <div className="flex items-end gap-3 flex-row-reverse" style={{ animation: 'slideInUp 0.2s ease-out' }}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <SparkleIcon />
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 px-5 py-3 rounded-2xl rounded-br-md shadow-lg ml-12">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar - Orange theme */}
          {actionBar && (
            <div className="flex justify-center" style={{ animation: 'fadeInScale 0.2s ease-out' }}>
              <div className="bg-gradient-to-r from-orange-100/80 via-orange-50/80 to-orange-100/80 backdrop-blur-sm border border-orange-200/50 text-orange-700 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-spin"></div>
                {actionBar}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
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