import React, { useState, useEffect, useRef, useCallback, Component } from 'react';

// Back to the beautiful green translucent theme
const WIDGET_THEME = {
  color: '#66D893',  // Beautiful ELKO green
  gradient: 'linear-gradient(135deg, rgba(102, 216, 147, 0.85) 0%, rgba(52, 211, 153, 0.9) 100%)', // Translucent green gradient
  solidGradient: 'linear-gradient(135deg, #66D893 0%, #34D399 100%)', // Solid fallback if needed
};

// Constants for session management
const SESSION_ID_KEY = 'svorumChatSessionId';

// Configuration for response effects
const CHUNK_REVEAL_DELAY = 250;
const FADE_IN_DURATION = 300;
const MOBILE_BREAKPOINT = 768;

// Error boundary for graceful error handling
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Chat error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '8px',
          backgroundColor: '#f8f8f8',
          border: '1px solid #ddd',
          borderRadius: '4px',
          margin: '8px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '4px 8px',
              backgroundColor: WIDGET_THEME.color,
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Reload Chat
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Message formatter component
const MessageFormatter = ({ message }) => {
  // Simple URL regex for Google Maps links
  const urlRegex = /https:\/\/www\.google\.com\/maps\/[^"\s]+/g;
  const paragraphs = message.split('\n\n').filter(Boolean);

  if (paragraphs.length <= 1 && !message.includes('https://www.google.com/maps/')) {
    return <>{message}</>;
  }

  return (
    <>
      {paragraphs.map((paragraph, index) => {
        const parts = paragraph.split(urlRegex);
        const matches = paragraph.match(urlRegex) || [];

        if (parts.length <= 1) {
          return <p key={index} style={{ marginBottom: '16px' }}>{paragraph}</p>;
        }

        return (
          <p key={index} style={{ marginBottom: '16px' }}>
            {parts.map((part, partIndex) => (
              <React.Fragment key={partIndex}>
                {part}
                {matches[partIndex] && (
                  <a 
                    href={matches[partIndex]}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: WIDGET_THEME.color, textDecoration: 'underline' }}
                  >
                    View location on Google Maps 📍
                  </a>
                )}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
};

// Flowing soundwave icon component - much more elegant
const SoundwaveIcon = ({ size = 24, color = WIDGET_THEME.color }) => (
  <svg 
    width={size} 
    height={size * 0.6} 
    viewBox="0 0 40 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <rect x="0" y="11" width="1.5" height="2" rx="0.75" fill={color} opacity="0.4"/>
      <rect x="2.5" y="9" width="1.5" height="6" rx="0.75" fill={color} opacity="0.6"/>
      <rect x="5" y="7" width="1.5" height="10" rx="0.75" fill={color} opacity="0.8"/>
      <rect x="7.5" y="4" width="1.5" height="16" rx="0.75" fill={color}/>
      <rect x="10" y="6" width="1.5" height="12" rx="0.75" fill={color}/>
      <rect x="12.5" y="8" width="1.5" height="8" rx="0.75" fill={color}/>
      <rect x="15" y="5" width="1.5" height="14" rx="0.75" fill={color}/>
      <rect x="17.5" y="3" width="1.5" height="18" rx="0.75" fill={color}/>
      <rect x="20" y="1" width="1.5" height="22" rx="0.75" fill={color}/>
      <rect x="22.5" y="3" width="1.5" height="18" rx="0.75" fill={color}/>
      <rect x="25" y="5" width="1.5" height="14" rx="0.75" fill={color}/>
      <rect x="27.5" y="8" width="1.5" height="8" rx="0.75" fill={color}/>
      <rect x="30" y="6" width="1.5" height="12" rx="0.75" fill={color}/>
      <rect x="32.5" y="4" width="1.5" height="16" rx="0.75" fill={color}/>
      <rect x="35" y="7" width="1.5" height="10" rx="0.75" fill={color} opacity="0.8"/>
      <rect x="37.5" y="9" width="1.5" height="6" rx="0.75" fill={color} opacity="0.6"/>
      <rect x="40" y="11" width="1.5" height="2" rx="0.75" fill={color} opacity="0.4"/>
    </g>
  </svg>
);

// External Text Bar Component
const ExternalTextBar = ({ isVisible, onClose, onOpenChat, getCurrentLanguage }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(getCurrentLanguage());
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, [getCurrentLanguage]);

  const textBarTranslations = {
    is: {
      message: "Hæ! Ég er AI þjónustufulltrúi hjá Svörum strax. Get ég hjálpað?",
      close: "Loka"
    },
    en: {
      message: "Hi! I'm an AI specialist at Svörum strax. How can I help your business today?",
      close: "Close"
    }
  };

  const handleClose = (e) => {
    e.stopPropagation(); // Prevent opening chat when closing
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      onOpenChat();
    }, 150);
  };

  if (!isVisible) return null;

  const t = textBarTranslations[currentLang];

  return (
    <div 
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '110px', // Position above the chat widget
        right: '20px',
        maxWidth: '320px',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '16px 20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        zIndex: 9998,
        transform: isClosing ? 'translateY(10px)' : 'translateY(0)',
        opacity: isClosing ? 0 : 1,
        transition: 'all 0.3s ease',
        animation: !isClosing ? 'slideInFromBottom 0.4s ease-out' : 'none',
        cursor: 'pointer'
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          color: '#666',
          padding: '4px',
          borderRadius: '4px',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.color = '#333'}
        onMouseLeave={(e) => e.target.style.color = '#666'}
      >
        ×
      </button>

      {/* Message content */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        paddingRight: '24px'
      }}>
        {/* AI Avatar with green gradient and soundwave */}
        <div style={{
          width: '32px',
          height: '32px',
          background: WIDGET_THEME.gradient,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px'
        }}>
          <SoundwaveIcon size={18} color="white" />
        </div>

        {/* Message text */}
        <div style={{
          flex: 1,
          color: '#2D3748',
          fontSize: '14px',
          lineHeight: '1.4',
          fontWeight: '500'
        }}>
          {t.message}
        </div>
      </div>

      {/* Pointer arrow */}
      <div style={{
        position: 'absolute',
        bottom: '-8px',
        right: '60px',
        width: '16px',
        height: '16px',
        background: 'rgba(255, 255, 255, 0.98)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderTop: 'none',
        borderLeft: 'none',
        transform: 'rotate(45deg)',
        borderRadius: '0 0 4px 0'
      }} />

      {/* Keyframe animation styles */}
      <style jsx>{`
        @keyframes slideInFromBottom {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

const ChatWidget = () => {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [typingMessages, setTypingMessages] = useState({});
  const [showTextBar, setShowTextBar] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const isMobile = windowWidth <= MOBILE_BREAKPOINT;

  // Get current language - updated to work with React state
  const getCurrentLanguage = useCallback(() => {
    return localStorage.getItem('language') || 'is';
  }, []);

  // Enhanced translations with professional messaging
  const translations = {
    is: {
      title: "Gervigreindarfulltrúi",
      subtitle: "Svörum strax",
      placeholder: "Skrifaðu skilaboð...",
      send: "Senda",
      welcome: "Hæ! Ég er AI spjallmenni hjá Svörum strax. Ertu með fyrirtæki og hefur áhuga á þjónustu okkar? Eða hefur þú áhuga á að ganga til liðs við okkur í Barcelona?",
      error: "Fyrirgefðu, eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur."
    },
    en: {
      title: "AI Assistant",
      subtitle: "Svörum strax",
      placeholder: "Type a message...",
      send: "Send",
      welcome: "Hello! I'm your AI assistant at Svörum strax. Are you a business looking to enhance your customer service? Or perhaps you're interested in joining our Barcelona team?",
      error: "Sorry, something went wrong. Please try again."
    }
  };

  // Session management
  const generateSessionId = useCallback(() => {
    return `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }, []);
  
  const initializeSession = useCallback(() => {
    let existingSessionId = localStorage.getItem(SESSION_ID_KEY);
    
    if (!existingSessionId) {
      existingSessionId = generateSessionId();
      localStorage.setItem(SESSION_ID_KEY, existingSessionId);
    }
    
    setSessionId(existingSessionId);
  }, [generateSessionId]);

  // Initialize session on mount
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  // Handle interactions
  useEffect(() => {
    if (!isMinimized && !hasInteracted) {
      setHasInteracted(true);
      setShowTextBar(false);
    }
  }, [isMinimized, hasInteracted]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.parentElement;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingMessages]);

  // Chunked reveal effect (premium feel)
  const renderMessage = useCallback((messageId, fullText) => {
    if (!fullText) return null;
    
    const safeText = typeof fullText === 'string' ? fullText : String(fullText || '');
    
    if (isMobile) {
      return startSimpleRender(messageId, safeText);
    } else {
      return startChunkedReveal(messageId, safeText);
    }
  }, [isMobile]);

  const startSimpleRender = (messageId, fullText) => {
    try {
      setTypingMessages(prev => ({
        ...prev,
        [messageId]: { 
          text: fullText,
          visibleChars: fullText.length,
          isComplete: true,
          fadeIn: true
        }
      }));
      
      setTimeout(() => scrollToBottom(), 50);
      return messageId;
    } catch (error) {
      console.error('Error in simple render:', error);
      return null;
    }
  };

  const startChunkedReveal = (messageId, fullText) => {
    try {
      let numberOfChunks = 1;
      
      if (fullText.length < 100) {
        numberOfChunks = 1;
      } else if (fullText.length < 300) {
        numberOfChunks = 2;
      } else {
        numberOfChunks = 3;
      }
      
      const chunkSize = Math.ceil(fullText.length / numberOfChunks);
      
      setTypingMessages(prev => ({
        ...prev,
        [messageId]: { 
          text: fullText,
          visibleChars: 0,
          currentChunk: 0,
          totalChunks: numberOfChunks,
          isComplete: false,
          fadeIn: true
        }
      }));
      
      setTimeout(() => scrollToBottom(), 50);
      
      let currentChunk = 0;
      
      const revealNextChunk = () => {
        if (currentChunk < numberOfChunks) {
          const charsToReveal = Math.min(
            (currentChunk + 1) * chunkSize,
            fullText.length
          );
          
          setTypingMessages(prev => ({
            ...prev,
            [messageId]: {
              ...prev[messageId],
              visibleChars: charsToReveal,
              currentChunk: currentChunk + 1,
              isComplete: charsToReveal === fullText.length
            }
          }));
          
          currentChunk++;
          
          setTimeout(() => scrollToBottom(), 50);
          
          if (currentChunk < numberOfChunks) {
            setTimeout(revealNextChunk, CHUNK_REVEAL_DELAY);
          }
        }
      };
      
      setTimeout(revealNextChunk, 100);
      return messageId;
    } catch (error) {
      console.error('Error in chunked reveal:', error);
      return null;
    }
  };

  // Welcome message
  useEffect(() => {
    if (!isMinimized && messages.length === 0) {
      const lang = getCurrentLanguage();
      const welcomeMessage = translations[lang].welcome;
      const welcomeId = 'welcome-' + Date.now();
      
      setMessages([{
        type: 'bot',
        content: welcomeMessage,
        id: welcomeId
      }]);
      
      renderMessage(welcomeId, welcomeMessage);
    }
  }, [isMinimized, messages.length, renderMessage, getCurrentLanguage]);

  const TypingIndicator = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px', alignItems: 'flex-start', gap: '8px' }}>
      <div style={{ position: 'relative', height: '32px', width: '32px' }}>
        <div style={{
          background: `linear-gradient(135deg, white 0%, #FAFAFA 100%)`,
          borderRadius: '50%',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid rgba(0, 0, 0, 0.06)`,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)'
        }}>
          <SoundwaveIcon size={14} color={WIDGET_THEME.color} />
        </div>
      </div>
      <div style={{
        padding: '12px 16px',
        borderRadius: '16px',
        background: 'rgba(229, 231, 235, 0.95)',
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.08)'
      }}>
        <span style={{
          height: '8px',
          width: '8px',
          background: WIDGET_THEME.color,
          borderRadius: '50%',
          opacity: '0.8',
          animation: 'typing 1.4s infinite'
        }} />
        <span style={{
          height: '8px',
          width: '8px',
          background: WIDGET_THEME.color,
          borderRadius: '50%',
          opacity: '0.8',
          animation: 'typing 1.4s infinite',
          animationDelay: '0.15s'
        }} />
        <span style={{
          height: '8px',
          width: '8px',
          background: WIDGET_THEME.color,
          borderRadius: '50%',
          opacity: '0.8',
          animation: 'typing 1.4s infinite',
          animationDelay: '0.3s'
        }} />
      </div>
    </div>
  );

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const messageText = inputValue.trim();
    setInputValue('');
    setHasInteracted(true);
    setShowTextBar(false);

    const userMsgId = 'user-' + Date.now();
    setMessages(prev => [...prev, {
      type: 'user',
      content: messageText,
      id: userMsgId,
      timestamp: Date.now()
    }]);
    
    setIsTyping(true);

    try {
      const response = await fetch('https://svorumstrax-chatbot-api.vercel.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [
            { role: 'user', content: messageText }
          ],
          threadId: sessionId  // ✅ Use threadId with messages array
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem(SESSION_ID_KEY, data.sessionId);
      }

      const botMsgId = 'bot-' + Date.now();
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: data.message,
        id: botMsgId,
        timestamp: Date.now()
      }]);
      
      renderMessage(botMsgId, data.message);
    } catch (error) {
      console.error('Chat request failed:', error);
      
      const errorMsgId = 'error-' + Date.now();
      const lang = getCurrentLanguage();
      const errorMessage = translations[lang].error;
      
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: errorMessage,
        id: errorMsgId
      }]);
      
      renderMessage(errorMsgId, errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const handleToggleChat = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setHasInteracted(true);
      setShowTextBar(false);
    }
  };

  const handleOpenChatFromTextBar = () => {
    setIsMinimized(false);
    setHasInteracted(true);
    setShowTextBar(false);
  };

  const lang = getCurrentLanguage();
  const t = translations[lang];

  return (
    <ErrorBoundary>
      {/* External Text Bar */}
      <ExternalTextBar 
        isVisible={showTextBar && isMinimized} 
        onClose={() => setShowTextBar(false)}
        onOpenChat={handleOpenChatFromTextBar}
        getCurrentLanguage={getCurrentLanguage}
      />

      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: isMinimized ? (windowWidth <= 768 ? '60px' : '70px') : '400px',
        height: isMinimized ? (windowWidth <= 768 ? '60px' : '70px') : 'auto',
        maxHeight: isMinimized ? 'auto' : 'calc(100vh - 40px)',
        background: isMinimized ? WIDGET_THEME.gradient : 'rgba(250, 250, 250, 0.98)',
        borderRadius: isMinimized ? '50%' : '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        transformOrigin: 'bottom right',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        maxWidth: isMinimized ? 'auto' : '90vw'
      }}>
        {/* Header - Translucent Green Glassmorphic Style with Soundwave */}
        <div 
          onClick={handleToggleChat}
          style={{
            padding: isMinimized ? '0' : '20px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMinimized ? 'center' : 'flex-start',
            cursor: 'pointer',
            gap: '12px',
            background: isMinimized ? WIDGET_THEME.gradient : WIDGET_THEME.gradient,
            backdropFilter: isMinimized ? 'none' : 'blur(10px)',
            width: '100%',
            height: isMinimized ? '100%' : 'auto',
            boxSizing: 'border-box',
            flexDirection: isMinimized ? 'row' : 'column',
            boxShadow: isMinimized ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.06)',
            borderBottom: isMinimized ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <div style={{
            position: 'relative',
            height: isMinimized ? (windowWidth <= 768 ? '40px' : '50px') : '60px',
            width: isMinimized ? (windowWidth <= 768 ? '40px' : '50px') : '60px',
            borderRadius: '50%',
            backgroundColor: isMinimized ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            padding: '8px',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)'
          }}>
            <SoundwaveIcon 
              size={isMinimized ? (windowWidth <= 768 ? 24 : 28) : 32} 
              color={WIDGET_THEME.color} 
            />
          </div>
          
          {!isMinimized && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ 
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}>
                {t.subtitle}
              </span>
            </div>
          )}
          
          {!isMinimized && (
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              style={{ 
                color: 'white',
                position: 'absolute',
                right: '16px',
                top: '16px'
              }}
            >
              <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        {/* Chat area */}
        {!isMinimized && (
          <div style={{
            height: '400px',
            backgroundColor: '#FAFAFA',
            overflowY: 'auto',
            padding: '16px'
          }}>
            {messages.map((msg) => (
              <div 
                key={msg.id || Math.random()} 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '16px'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                  width: '100%',
                  gap: '8px'
                }}>
                  {msg.type === 'bot' && (
                    <div style={{
                      position: 'relative',
                      height: '32px',
                      width: '32px',
                      background: `linear-gradient(135deg, white 0%, #FAFAFA 100%)`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: `1px solid rgba(0, 0, 0, 0.06)`,
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)'
                    }}>
                      <SoundwaveIcon size={14} color={WIDGET_THEME.color} />
                    </div>
                  )}
                  
                  <div
                    style={{
                      maxWidth: '70%',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      backgroundColor: msg.type === 'user' ? '#0A0E27' : 'rgba(229, 231, 235, 0.95)',
                      color: msg.type === 'user' ? 'white' : '#1f2937',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      border: msg.type === 'user' ? 
                        `1px solid ${WIDGET_THEME.color}40` : 
                        '1px solid rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      overflowWrap: 'break-word',
                      wordWrap: 'break-word',
                      wordBreak: 'break-word'
                    }}
                  >
                    {msg.type === 'bot' ? (
                      typingMessages[msg.id || ''] ? (
                        <div style={{ 
                          position: 'relative',
                          opacity: typingMessages[msg.id || ''].fadeIn ? '0.99' : '1',
                          transition: `opacity ${FADE_IN_DURATION}ms ease-in-out`
                        }}>
                          <div style={{ 
                            visibility: 'hidden', 
                            position: 'absolute', 
                            width: '100%',
                            height: 0,
                            overflow: 'hidden' 
                          }}>
                            <MessageFormatter message={typingMessages[msg.id || ''].text} />
                          </div>
                          
                          <div style={{ animation: typingMessages[msg.id || ''].fadeIn ? `fadeIn ${FADE_IN_DURATION}ms ease-in-out` : 'none' }}>
                            <MessageFormatter 
                              message={typingMessages[msg.id || ''].text.substring(0, typingMessages[msg.id || ''].visibleChars)} 
                            />
                          </div>
                        </div>
                      ) : (
                        <MessageFormatter message={msg.content} />
                      )
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input area */}
        {!isMinimized && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#FAFAFA',
            borderTop: '1px solid #E5E7EB',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              placeholder={t.placeholder}
              style={{
                flex: 1,
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #D1D5DB',
                outline: 'none',
                fontSize: '14px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.2s ease',
                backgroundColor: '#F3F4F6',
                color: '#374151'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = WIDGET_THEME.color;
                e.target.style.boxShadow = `0 0 0 2px ${WIDGET_THEME.color}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D1D5DB';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: WIDGET_THEME.gradient,
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              {t.send}
            </button>
          </div>
        )}

        {/* Styles */}
        <style jsx>{`
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes typing {
            0%, 60%, 100% {
              transform: translateY(0);
              opacity: 0.8;
            }
            30% {
              transform: translateY(-6px);
              opacity: 1;
            }
          }
          
          @media (max-width: 768px) {
            input, button {
              font-size: 16px !important;
            }
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
};

export default ChatWidget;
