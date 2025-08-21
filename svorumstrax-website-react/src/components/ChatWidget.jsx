import React, { useState, useEffect, useRef, useCallback, Component } from 'react';
import svorumLogo from '../assets/images/svorum-strax-logo-icon.png';

// Updated to beautiful orange theme matching your logo
const WIDGET_THEME = {
  color: '#F2AF57',  // Beautiful Svörum Strax orange
  gradient: 'linear-gradient(135deg, rgba(242, 175, 87, 0.85) 0%, rgba(255, 165, 0, 0.9) 100%)', // Translucent orange gradient
  solidGradient: 'linear-gradient(135deg, #F2AF57 0%, #FFA500 100%)', // Solid fallback if needed
};

// Constants for session management
const SESSION_ID_KEY = 'svorumChatSessionId';

// Configuration for response effects
const CHUNK_REVEAL_DELAY = 250;
const FADE_IN_DURATION = 300;
const MOBILE_BREAKPOINT = 768;

// Smart URL detection - automatically uses the right backend
const getBackendUrl = () => {
  // If running locally (localhost), use local backend
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8080';
  }
  // If running on Vercel (production), use production backend  
  return 'https://svorumstrax-chatbot-api.vercel.app';  // Your actual backend URL
};

const getWebSocketUrl = () => {
  // WebSocket only works locally - Vercel doesn't support WebSocket
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'ws://localhost:8080';
  }
  // Return null for production - will use SSE instead
  return null;
};

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

// Updated logo component - uses your Svörum Strax logo
const ChatIcon = ({ size = 24 }) => (
  <img 
    src={svorumLogo} 
    alt="Svörum Strax" 
    width={size} 
    height={size}
    style={{ 
      borderRadius: '4px',
      objectFit: 'contain'
    }}
  />
);

// SIMPLIFIED External Text Bar Component - EXACTLY like Sky Lagoon (Minimal & Fast)
const ExternalTextBar = ({ isVisible, onClose, onOpenChat, getCurrentLanguage }) => {
  if (!isVisible) return null;

  const currentLang = getCurrentLanguage();
  const message = currentLang === 'is' 
    ? "Hæ! Ég er AI þjónustufulltrúi hjá Svörum strax. Get ég hjálpað?"
    : "Hi! I'm your AI assistant. How can I help you today?";

  return (
    <div 
      onClick={onOpenChat}
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        maxWidth: '280px',
        backgroundColor: 'white',
        color: '#4d5a41',
        padding: '14px 18px',
        borderRadius: '12px',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
        zIndex: 9998,
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: 'Arial, sans-serif',
        cursor: 'pointer',
        userSelect: 'none',
        border: '1px solid rgba(0,0,0,0.05)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.08)';
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: 'absolute',
          top: '8px',
          right: '10px',
          cursor: 'pointer',
          fontSize: '18px',
          color: '#999',
          lineHeight: '14px',
          width: '16px',
          height: '16px',
          textAlign: 'center'
        }}
        onMouseOver={(e) => e.target.style.color = '#666'}
        onMouseOut={(e) => e.target.style.color = '#999'}
      >
        ×
      </div>

      <div style={{ paddingRight: '24px' }}>
        {message}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '-8px',
        right: '28px',
        width: '0',
        height: '0',
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderTop: '8px solid white'
      }} />
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
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMode, setStreamingMode] = useState(true);
  const [sessionId, setSessionId] = useState('');
  const [currentStreamMessage, setCurrentStreamMessage] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [typingMessages, setTypingMessages] = useState({});
  const [showTextBar, setShowTextBar] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const isMobile = windowWidth <= MOBILE_BREAKPOINT;

  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Get current language - updated to work with React state
  const getCurrentLanguage = useCallback(() => {
    return localStorage.getItem('language') || 'is';
  }, []);

  // Enhanced translations with professional messaging
  const translations = {
    is: {
      title: "Gervigreindarfulltrúi",
      subtitle: "Gervigreindarfulltrúi",
      placeholder: "Skrifaðu skilaboð...",
      send: "Senda",
      welcome: "Hæ! Ég er AI spjallmenni hjá Svörum strax. Ertu með fyrirtæki og hefur áhuga á þjónustu okkar? Eða hefur þú áhuga á að ganga til liðs við okkur í Barcelona?",
      error: "Fyrirgefðu, eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur."
    },
    en: {
      title: "AI Assistant",
      subtitle: "AI Assistant",
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
  }, [messages, typingMessages, currentStreamMessage]);

  // WebSocket connection management
  const connectWebSocket = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    // Get WebSocket URL (null in production)
    const wsUrl = getWebSocketUrl();
    if (!wsUrl) {
      console.log('WebSocket not available in production - using SSE mode');
      return;
    }

    try {
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        console.log('🔌 WebSocket connected');
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📨 WebSocket message:', data);

          switch (data.type) {
            case 'stream-connected':
              console.log('✅ Stream connected:', data.streamId);
              break;

            case 'stream-chunk':
              // TYPING INDICATOR FIX: Hide typing indicator on first chunk
              if (currentStreamMessage === '') {
                console.log('🎯 First WebSocket chunk received - hiding typing indicator');
                setIsTyping(false);
              }
              setCurrentStreamMessage(prev => prev + data.content);
              break;

            case 'stream-complete':
              console.log('✅ Stream complete');
              setMessages(prev => [...prev, {
                id: `bot-${Date.now()}`,
                text: data.completeContent,
                sender: 'bot',
                timestamp: new Date()
              }]);
              
              // Start the chunked reveal effect
              const botMsgId = `bot-${Date.now()}-complete`;
              renderMessage(botMsgId, data.completeContent);
              
              setCurrentStreamMessage('');
              setIsStreaming(false);
              setIsLoading(false);
              setIsTyping(false);
              break;

            case 'stream-error':
              console.error('❌ Stream error:', data.error);
              setMessages(prev => [...prev, {
                id: `error-${Date.now()}`,
                text: 'Sorry, there was an error with the streaming response. Please try again.',
                sender: 'bot',
                timestamp: new Date(),
                isError: true
              }]);
              setCurrentStreamMessage('');
              setIsStreaming(false);
              setIsLoading(false);
              setIsTyping(false);
              break;
          }
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      wsRef.current.onclose = () => {
        console.log('🔌 WebSocket disconnected');
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('🔄 Attempting to reconnect WebSocket...');
          connectWebSocket();
        }, 3000);
      };

      wsRef.current.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
      };

    } catch (error) {
      console.error('❌ Error creating WebSocket connection:', error);
    }
  };

  // Initialize WebSocket connection
  useEffect(() => {
    if (streamingMode) {
      connectWebSocket();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [streamingMode]);

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

  // Send message via WebSocket (streaming)
  const sendStreamingMessage = async (messageText) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.log('⚠️ WebSocket not connected, trying to connect...');
      connectWebSocket();
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        throw new Error('WebSocket connection failed');
      }
    }

    const message = {
      type: 'chat',
      message: messageText,
      sessionId: sessionId
    };

    wsRef.current.send(JSON.stringify(message));
  };

  // Send message via SSE (Vercel compatible!)
  const sendSSEMessage = async (messageText) => {
    console.log('📡 Starting SSE stream for message:', messageText);
    
    try {
      const response = await fetch(`${getBackendUrl()}/chat-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'svorum2025_sk3j8k4j5k6j7k8j9k0j1k2',
        },
        body: JSON.stringify({
          message: messageText,
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Read the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          console.log('📡 SSE stream ended');
          break;
        }

        // Decode the chunk
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6); // Remove 'data: ' prefix
            
            if (data.trim() === '[DONE]') {
              console.log('✅ SSE stream complete signal received');
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              console.log('📨 SSE message:', parsed);

              // Handle the same message types as WebSocket
              switch (parsed.type) {
                case 'stream-connected':
                  console.log('✅ SSE stream connected:', parsed.streamId);
                  break;

                case 'stream-chunk':
                  // TYPING INDICATOR FIX: Hide typing indicator on first chunk
                  if (currentStreamMessage === '') {
                    console.log('🎯 First SSE chunk received - hiding typing indicator');
                    setIsTyping(false);
                  }
                  setCurrentStreamMessage(prev => prev + parsed.content);
                  break;

                case 'stream-complete':
                  console.log('✅ SSE stream complete');
                  setMessages(prev => [...prev, {
                    id: `bot-${Date.now()}`,
                    text: parsed.completeContent,
                    sender: 'bot',
                    timestamp: new Date()
                  }]);
                  
                  // Start the chunked reveal effect (same as WebSocket)
                  const botMsgId = `bot-${Date.now()}-complete`;
                  renderMessage(botMsgId, parsed.completeContent);
                  
                  setCurrentStreamMessage('');
                  setIsStreaming(false);
                  setIsLoading(false);
                  setIsTyping(false);
                  break;

                case 'stream-error':
                  console.error('❌ SSE stream error:', parsed.error);
                  setMessages(prev => [...prev, {
                    id: `error-${Date.now()}`,
                    text: 'Sorry, there was an error with the streaming response. Please try again.',
                    sender: 'bot',
                    timestamp: new Date(),
                    isError: true
                  }]);
                  setCurrentStreamMessage('');
                  setIsStreaming(false);
                  setIsLoading(false);
                  setIsTyping(false);
                  break;
              }
            } catch (parseError) {
              console.error('❌ Error parsing SSE data:', parseError);
            }
          }
        }
      }

    } catch (error) {
      console.error('❌ SSE streaming error:', error);
      throw error;
    }
  };

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
          <ChatIcon size={14} />
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
      id: userMsgId,
      text: messageText,
      sender: 'user',
      timestamp: Date.now()
    }]);
    
    // TYPING INDICATOR FIX: Show typing indicator immediately
    console.log('🟡 Showing typing indicator immediately');
    setIsTyping(true);
    setIsLoading(true);

    try {
      if (streamingMode) {
        setIsStreaming(true);
        setCurrentStreamMessage('');
        
        // Smart mode selection - use SSE on Vercel, WebSocket locally
        const useSSE = window.location.hostname !== 'localhost';
        
        if (useSSE) {
          console.log('🔄 Using SSE streaming (production mode)...');
          await sendSSEMessage(messageText);
        } else {
          console.log('🔄 Using WebSocket streaming (development mode)...');
          await sendStreamingMessage(messageText);
        }
      } else {
        // HTTP API mode
        const response = await fetch(`${getBackendUrl()}/chat`, {
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
        setIsLoading(false);
        setIsTyping(false);
      }
    } catch (error) {
      console.error('Chat request failed:', error);
      
      const errorMsgId = 'error-' + Date.now();
      const lang = getCurrentLanguage();
      const errorMessage = streamingMode ? 
        'Sorry, I couldn\'t process your message. Streaming mode failed. Please try again.' :
        'Sorry, I couldn\'t process your message. HTTP request failed. Please try again.';
      
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: errorMessage,
        id: errorMsgId
      }]);
      
      renderMessage(errorMsgId, errorMessage);
      setIsLoading(false);
      setIsStreaming(false);
      setCurrentStreamMessage('');
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

  // Toggle between streaming and HTTP modes
  const toggleMode = () => {
    setStreamingMode(!streamingMode);
    setIsLoading(false);
    setIsStreaming(false);
    setCurrentStreamMessage('');
    setIsTyping(false);
  };

  const lang = getCurrentLanguage();
  const t = translations[lang];

  return (
    <ErrorBoundary>
      {/* OPTIMIZED External Text Bar */}
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
        {/* Header - Translucent Orange Glassmorphic Style with Soundwave */}
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
            <ChatIcon 
              size={isMinimized ? (windowWidth <= 768 ? 24 : 28) : 32} 
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
                  alignItems: msg.type === 'user' || msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '16px'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: msg.type === 'user' || msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                  width: '100%',
                  gap: '8px'
                }}>
                  {(msg.type === 'bot' || msg.sender === 'bot') && (
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
                      <ChatIcon size={14} />
                    </div>
                  )}
                  
                  <div
                    style={{
                      maxWidth: '70%',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      backgroundColor: msg.type === 'user' || msg.sender === 'user' ? '#0A0E27' : 'rgba(229, 231, 235, 0.95)',
                      color: msg.type === 'user' || msg.sender === 'user' ? 'white' : '#1f2937',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      border: msg.type === 'user' || msg.sender === 'user' ? 
                        `1px solid ${WIDGET_THEME.color}40` : 
                        '1px solid rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      overflowWrap: 'break-word',
                      wordWrap: 'break-word',
                      wordBreak: 'break-word'
                    }}
                  >
                    {(msg.type === 'bot' || msg.sender === 'bot') ? (
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
                        <MessageFormatter message={msg.text || msg.content} />
                      )
                    ) : (
                      msg.text || msg.content
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Streaming message preview (no cursor for premium feel) */}
            {isStreaming && currentStreamMessage && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: '100%',
                  gap: '8px'
                }}>
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
                    <ChatIcon size={14} />
                  </div>
                  
                  <div style={{
                    maxWidth: '70%',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(229, 231, 235, 0.95)',
                    color: '#1f2937',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    position: 'relative',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    wordBreak: 'break-word'
                  }}>
                    {currentStreamMessage}
                  </div>
                </div>
              </div>
            )}

            {/* TYPING INDICATOR: Show during dead air before first chunk arrives */}
            {isTyping && !currentStreamMessage && <TypingIndicator />}

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
                if (e.key === 'Enter' && !isLoading && inputValue.trim()) {
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
              disabled={!inputValue.trim() || isLoading}
              style={{
                background: WIDGET_THEME.gradient,
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '20px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (streamingMode ? '⚡' : '⏳') : t.send}
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

          @keyframes blink {
            0%, 50% {
              opacity: 1;
            }
            51%, 100% {
              opacity: 0;
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