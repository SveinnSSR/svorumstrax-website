import React, { useState, useEffect } from 'react';

const AIConversationDemo = ({ currentLanguage = 'is' }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [actionBar, setActionBar] = useState(null);

  // Conversation content for both languages
  const conversationSteps = {
    is: [
      {
        type: 'user',
        content: 'Hæ! Er þjónustuverin þinn opinn um helgar?',
        delay: 1000
      },
      {
        type: 'ai',
        content: 'Hæ! Já, við erum opin alla daga vikunnar. Um helgar erum við opin 10:00-16:00. Get ég hjálpað þér frekar?',
        delay: 2000
      },
      {
        type: 'user',
        content: 'Frábært! Get ég bókað tíma á laugardaginn?',
        delay: 1500
      },
      {
        type: 'action',
        content: 'Tengist bókunarkerfi...',
        delay: 1000
      },
      {
        type: 'ai',
        content: 'Auðvitað! Ég sé að það eru laus tímabil á laugardaginn. Viltu 11:00 eða 14:30? 📅',
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
        delay: 2000
      },
      {
        type: 'user',
        content: 'Great! Can I book an appointment for Saturday?',
        delay: 1500
      },
      {
        type: 'action',
        content: 'Connecting to booking system...',
        delay: 1000
      },
      {
        type: 'ai',
        content: 'Of course! I can see available slots for Saturday. Would you prefer 11:00 or 14:30? 📅',
        delay: 2000,
        hasButton: true,
        buttonText: 'Choose 11:00'
      }
    ]
  };

  const steps = conversationSteps[currentLanguage];

  // Auto-play conversation
  useEffect(() => {
    if (currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      const step = steps[currentStep];
      
      if (step.type === 'action') {
        setActionBar(step.content);
        setTimeout(() => {
          setActionBar(null);
          setCurrentStep(prev => prev + 1);
        }, step.delay);
      } else {
        if (step.type === 'ai') {
          setIsTyping(true);
        }
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            ...step,
            id: Date.now() + Math.random()
          }]);
          setIsTyping(false);
          setCurrentStep(prev => prev + 1);
        }, step.type === 'ai' ? step.delay / 2 : 0);
      }
    }, currentStep === 0 ? 500 : steps[currentStep - 1]?.delay || 1000);

    return () => clearTimeout(timer);
  }, [currentStep, steps]);

  // Reset and replay conversation
  const resetConversation = () => {
    setMessages([]);
    setCurrentStep(0);
    setIsTyping(false);
    setActionBar(null);
  };

  useEffect(() => {
    resetConversation();
  }, [currentLanguage]);

  // Auto-reset after completion
  useEffect(() => {
    if (currentStep >= steps.length) {
      const resetTimer = setTimeout(resetConversation, 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep, steps.length]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">
            {currentLanguage === 'is' ? 'Bein tenging' : 'Live Chat'}
          </span>
        </div>
        <button
          onClick={resetConversation}
          className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded"
        >
          ↻
        </button>
      </div>

      {/* Messages Container */}
      <div className="space-y-4 h-80 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
            style={{ 
              animation: 'fadeInUp 0.3s ease-out' 
            }}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white text-sm font-semibold' 
                : 'bg-gradient-to-r from-orange-500 to-orange-600'
            }`}>
              {message.type === 'user' ? (
                'K'
              ) : (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path 
                    d="M17.5 12.5a1.25 1.25 0 0 1-1.25 1.25H6.25L3.75 16.25V5a1.25 1.25 0 0 1 1.25-1.25h11.25A1.25 1.25 0 0 1 17.5 5v7.5z" 
                    fill="white"
                  />
                  <circle cx="6" cy="8.5" r="1" fill="#FF9A3C"/>
                  <circle cx="10" cy="8.5" r="1" fill="#FF9A3C"/>
                  <circle cx="14" cy="8.5" r="1" fill="#FF9A3C"/>
                </svg>
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white rounded-tr-sm'
                  : 'bg-gray-100 text-gray-800 rounded-tl-sm'
              }`}
            >
              {message.content}
              
              {/* Button for AI message with button */}
              {message.hasButton && (
                <div className="mt-3">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded-full font-medium transition-colors duration-200">
                    {message.buttonText}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M17.5 12.5a1.25 1.25 0 0 1-1.25 1.25H6.25L3.75 16.25V5a1.25 1.25 0 0 1 1.25-1.25h11.25A1.25 1.25 0 0 1 17.5 5v7.5z" 
                  fill="white"
                />
                <circle cx="6" cy="8.5" r="1" fill="#FF9A3C"/>
                <circle cx="10" cy="8.5" r="1" fill="#FF9A3C"/>
                <circle cx="14" cy="8.5" r="1" fill="#FF9A3C"/>
              </svg>
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Action Bar */}
        {actionBar && (
          <div className="flex justify-center">
            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 animate-pulse">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-spin"></div>
              {actionBar}
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AIConversationDemo;
