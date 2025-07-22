import React, { useState, useEffect, useRef } from 'react';
import customerAvatar from '../assets/images/customer-avatar.png';

const AIConversationDemo = ({ currentLanguage = 'is' }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [actionBar, setActionBar] = useState(null);
  const [isRestarting, setIsRestarting] = useState(false);
  const chatContainerRef = useRef(null);

  // Enterprise-grade AI Icon
  const AIIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L18 9L12 15L6 9L12 3Z" fill="#4A90E2"/>
      <path d="M12 9L18 15L12 21L6 15L12 9Z" fill="#26C5D9" opacity="0.8"/>
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
          className="h-[500px] overflow-y-auto p-8 pt-6"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#475569 transparent'
          }}
        >
          <div className="space-y-5">
            {messages.map((message) => (
              <div key={message.id} className="mb-6">
                {/* Customer Messages - Clean Inline Text (Left) */}
                {message.type === 'user' && (
                  <div className="flex items-center justify-start gap-3">
                    <img 
                      src={customerAvatar} 
                      alt="Customer" 
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                      style={{display: 'none'}}
                    >
                      K
                    </div>
                    <p 
                      className="text-slate-100 font-medium leading-tight"
                      style={{
                        fontFamily: 'Inter, Helvetica Neue, sans-serif',
                        fontSize: '16px',
                        fontWeight: '500',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale'
                      }}
                    >
                      {message.content}
                    </p>
                  </div>
                )}

                {/* Bot Messages - White Bubbles (Right) */}
                {message.type === 'ai' && (
                  <div className="flex items-center justify-end gap-3">
                    <div 
                      className="bg-white rounded-xl shadow-md p-4 max-w-[70%] text-slate-900 leading-relaxed"
                      style={{
                        fontFamily: 'Inter, Helvetica Neue, sans-serif',
                        fontSize: '16px',
                        fontWeight: '500',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale'
                      }}
                    >
                      {message.content}
                      
                      {/* Enterprise-Grade Buttons */}
                      {message.hasButtons && message.buttons && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.buttons.map((buttonText, buttonIndex) => (
                            <button 
                              key={buttonIndex}
                              className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors duration-150"
                              style={{
                                fontFamily: 'Inter, Helvetica Neue, sans-serif',
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
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <AIIcon />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="mb-6">
                <div className="flex items-center justify-end gap-3">
                  <div className="bg-white rounded-xl shadow-md p-4 max-w-[70%]">
                    <div className="flex gap-1.5 items-center">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <AIIcon />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Bar */}
          {actionBar && (
            <div className="flex justify-center mt-6">
              <div 
                className="bg-teal-500/20 border border-teal-400/30 text-teal-300 px-4 py-2 rounded-xl flex items-center gap-2"
                style={{
                  fontFamily: 'Inter, Helvetica Neue, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-spin"></div>
                {actionBar}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        
        div::-webkit-scrollbar-thumb {
          background: #64748b;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default AIConversationDemo;