import React, { useState, useEffect, useRef, useCallback, Component } from 'react';

// Constants for session management
const SESSION_ID_KEY = 'svorumChatSessionId';

// Configuration for response effects
const CHUNK_REVEAL_DELAY = 250;
const FADE_IN_DURATION = 300;
const MOBILE_BREAKPOINT = 768;

// Message interfaces
interface Message {
  type: 'user' | 'bot';
  content: string;
  id?: string;
  timestamp?: number;
}

interface TypingMessage {
  text: string;
  visibleChars: number;
  currentChunk?: number;
  totalChunks?: number;
  isComplete: boolean;
  fadeIn: boolean;
}

interface MessageFeedback {
  isPositive: boolean;
  submitted: boolean;
}

// Error boundary for graceful error handling
class ErrorBoundary extends Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
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
              backgroundColor: '#8B7355',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
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
const MessageFormatter: React.FC<{ message: string }> = ({ message }) => {
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
                    style={{ color: '#8B7355', textDecoration: 'underline' }}
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

const ChatWidget = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [typingMessages, setTypingMessages] = useState<{[key: string]: TypingMessage}>({});
  const [messageFeedback, setMessageFeedback] = useState<{[key: string]: MessageFeedback}>({});
  const isMobile = windowWidth <= MOBILE_BREAKPOINT;

  // Get current language
  const getCurrentLanguage = useCallback(() => {
    return localStorage.getItem('language') || 'is';
  }, []);

  // Enhanced translations with professional messaging
  const translations = {
    is: {
      title: "AI þjónustufulltrúi",
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
      welcome: "Hello! I'm your AI assistant at Svörum strax. Are you a business interested in our services? Or are you looking to join our team in Barcelona?",
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
  const renderMessage = useCallback((messageId: string, fullText: string) => {
    if (!fullText) return null;
    
    const safeText = typeof fullText === 'string' ? fullText : String(fullText || '');
    
    if (isMobile) {
      return startSimpleRender(messageId, safeText);
    } else {
      return startChunkedReveal(messageId, safeText);
    }
  }, [isMobile]);

  const startSimpleRender = (messageId: string, fullText: string) => {
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

  const startChunkedReveal = (messageId: string, fullText: string) => {
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

  const shouldShowFeedback = (message: Message) => {
    if (!message.content) return false;
    
    // Skip welcome messages
    if (message.content.includes("I'm your AI assistant") || message.content.includes("Ég er AI spjallmenni")) return false;
    
    // Skip error messages
    if (message.content.includes("I'm sorry, I'm having trouble") || message.content.includes("Fyrirgefðu, eitthvað")) return false;
    
    // Skip very short responses
    if (message.content.length < 50) return false;
    
    return true;
  };

  const handleMessageFeedback = async (messageId: string, isPositive: boolean) => {
    if (messageFeedback[messageId]) return;
    
    setMessageFeedback(prev => ({
      ...prev,
      [messageId]: { isPositive, submitted: true }
    }));
    
    // Here you would send feedback to your backend
    console.log('Feedback submitted:', { messageId, isPositive });
  };

  const TypingIndicator = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px', alignItems: 'flex-start', gap: '8px' }}>
      <div style={{ position: 'relative', height: '32px', width: '32px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(250, 247, 244, 0.95) 0%, rgba(245, 240, 234, 0.9) 100%)',
          borderRadius: '50%',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M17.5 12.5a1.25 1.25 0 0 1-1.25 1.25H6.25L3.75 16.25V5a1.25 1.25 0 0 1 1.25-1.25h11.25A1.25 1.25 0 0 1 17.5 5v7.5z" fill="#8B7355"/>
            <circle cx="7.5" cy="8.75" r="0.625" fill="white"/>
            <circle cx="10" cy="8.75" r="0.625" fill="white"/>
            <circle cx="12.5" cy="8.75" r="0.625" fill="white"/>
          </svg>
        </div>
      </div>
      <div style={{
        padding: '12px 16px',
        borderRadius: '16px',
        background: '#f0f0f0',
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <span style={{
          height: '8px',
          width: '8px',
          background: '#8B7355',
          borderRadius: '50%',
          opacity: '0.6',
          animation: 'typing 1.4s infinite'
        }} />
        <span style={{
          height: '8px',
          width: '8px',
          background: '#8B7355',
          borderRadius: '50%',
          opacity: '0.6',
          animation: 'typing 1.4s infinite',
          animationDelay: '0.15s'
        }} />
        <span style={{
          height: '8px',
          width: '8px',
          background: '#8B7355',
          borderRadius: '50%',
          opacity: '0.6',
          animation: 'typing 1.4s infinite',
          animationDelay: '0.3s'
        }} />
      </div>
    </div>
  );

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const messageText = inputValue.trim();
    setInputValue('');

    const userMsgId = 'user-' + Date.now();
    setMessages(prev => [...prev, {
      type: 'user',
      content: messageText,
      id: userMsgId,
      timestamp: Date.now()
    }]);
    
    setIsTyping(true);

    try {
      const response = await fetch('https://svorumstrax-chatbot-api.vercel.app/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [
            { role: 'user', content: messageText }
          ],
          sessionId: sessionId
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

  const lang = getCurrentLanguage();
  const t = translations[lang];

  return (
    <ErrorBoundary>
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: isMinimized ? (windowWidth <= 768 ? '60px' : '70px') : '400px',
        height: isMinimized ? (windowWidth <= 768 ? '60px' : '70px') : 'auto',
        maxHeight: isMinimized ? 'auto' : 'calc(100vh - 40px)',
        backgroundColor: isMinimized ? 'rgba(139, 115, 85, 0.95)' : 'rgba(250, 247, 244, 0.98)',
        borderRadius: isMinimized ? '50%' : '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        transformOrigin: 'bottom right',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        maxWidth: isMinimized ? 'auto' : '90vw'
      }}>
        {/* Header - Click anywhere to toggle */}
        <div 
          onClick={() => setIsMinimized(!isMinimized)}
          style={{
            padding: isMinimized ? '0' : '20px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMinimized ? 'center' : 'flex-start',
            cursor: 'pointer',
            gap: '12px',
            backgroundColor: isMinimized ? 'transparent' : 'rgba(139, 115, 85, 1)',
            width: '100%',
            height: isMinimized ? '100%' : 'auto',
            boxSizing: 'border-box',
            flexDirection: isMinimized ? 'row' : 'column',
            boxShadow: isMinimized ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{
            position: 'relative',
            height: isMinimized ? (windowWidth <= 768 ? '40px' : '50px') : '60px',
            width: isMinimized ? (windowWidth <= 768 ? '40px' : '50px') : '60px',
            borderRadius: '50%',
            backgroundColor: 'white',
            padding: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width={isMinimized ? '24' : '32'} height={isMinimized ? '24' : '32'} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 20a2.67 2.67 0 0 1-2.67 2.67H9.33L4 28V6.67A2.67 2.67 0 0 1 6.67 4h18.66A2.67 2.67 0 0 1 28 6.67V20z" fill="#8B7355"/>
              <circle cx="10.67" cy="13.33" r="1.33" fill="white"/>
              <circle cx="16" cy="13.33" r="1.33" fill="white"/>
              <circle cx="21.33" cy="13.33" r="1.33" fill="white"/>
            </svg>
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
                fontWeight: '500',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}>
                {t.subtitle}
              </span>
              <span style={{ 
                color: '#e0e0e0',
                fontSize: '14px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}>
                {t.title}
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
            backgroundColor: 'white',
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
                      background: 'linear-gradient(135deg, rgba(250, 247, 244, 0.95) 0%, rgba(245, 240, 234, 0.9) 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M17.5 12.5a1.25 1.25 0 0 1-1.25 1.25H6.25L3.75 16.25V5a1.25 1.25 0 0 1 1.25-1.25h11.25A1.25 1.25 0 0 1 17.5 5v7.5z" fill="#8B7355"/>
                        <circle cx="7.5" cy="8.75" r="0.625" fill="white"/>
                        <circle cx="10" cy="8.75" r="0.625" fill="white"/>
                        <circle cx="12.5" cy="8.75" r="0.625" fill="white"/>
                      </svg>
                    </div>
                  )}
                  
                  <div
                    style={{
                      maxWidth: '70%',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      backgroundColor: msg.type === 'user' ? '#8B7355' : '#f0f0f0',
                      color: msg.type === 'user' ? 'white' : '#333333',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      border: msg.type === 'user' ? 
                        '1px solid rgba(255, 255, 255, 0.1)' : 
                        '1px solid rgba(0, 0, 0, 0.05)',
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
                
                {/* Feedback buttons */}
                {msg.type === 'bot' && 
                 msg.id &&
                 typingMessages[msg.id] && 
                 typingMessages[msg.id].isComplete && 
                 shouldShowFeedback(msg) && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '4px',
                    marginLeft: '38px',
                    gap: '8px'
                  }}>
                    {messageFeedback[msg.id] ? (
                      <div style={{
                        fontSize: '12px',
                        color: '#8B7355',
                        fontStyle: 'italic',
                        opacity: 0.8,
                        padding: '4px 8px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(139, 115, 85, 0.08)'
                      }}>
                        Thank you for your feedback!
                      </div>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleMessageFeedback(msg.id || '', true)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#8B7355',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '12px',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease',
                            opacity: 0.8,
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(139, 115, 85, 0.1)';
                            e.currentTarget.style.opacity = '1';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.opacity = '0.8';
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Helpful
                        </button>
                        
                        <button 
                          onClick={() => handleMessageFeedback(msg.id || '', false)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#8B7355',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '12px',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease',
                            opacity: 0.8,
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(139, 115, 85, 0.1)';
                            e.currentTarget.style.opacity = '1';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.opacity = '0.8';
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M17 2H20C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V11C22 11.5304 21.7893 12.0391 21.4142 12.4142C21.0391 12.7893 20.5304 13 20 13H17M10 15V19C10 19.7956 10.3161 20.5587 10.8787 21.1213C11.4413 21.6839 12.2044 22 13 22L17 13V2H5.72C5.23964 1.99453 4.77175 2.16359 4.40125 2.47599C4.03075 2.78839 3.78958 3.22309 3.72 3.7L2.34 12.7C2.29651 12.9866 2.31583 13.2793 2.39666 13.5577C2.4775 13.8362 2.61788 14.0937 2.80812 14.3125C2.99836 14.5313 3.23395 14.7061 3.49843 14.8248C3.76291 14.9435 4.05009 15.0033 4.34 15H10Z" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Not helpful
                        </button>
                      </>
                    )}
                  </div>
                )}
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
            backgroundColor: 'white',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
              placeholder={t.placeholder}
              style={{
                flex: 1,
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #ddd',
                outline: 'none',
                fontSize: '14px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            />
            <button
              onClick={handleSend}
              disabled={isTyping}
              style={{
                backgroundColor: isTyping ? '#a0a0a0' : '#8B7355',
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '20px',
                cursor: isTyping ? 'default' : 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                opacity: isTyping ? 0.7 : 1,
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
              opacity: 0.6;
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