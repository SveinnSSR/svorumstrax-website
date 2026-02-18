
import React, { useState, useEffect, useRef, useCallback, Component } from 'react';
import logoYellow from '../assets/images/logo_yellow.png';

// Theme: Green accent kept for FAB only, neutral everywhere else
const WIDGET_THEME = {
  color: '#66D893',  // Beautiful ELKO green - kept for FAB - ATT: We don't use green anymore - colour is controlled somewhere else.
  gradient: 'linear-gradient(135deg, rgba(102, 216, 147, 0.85) 0%, rgba(52, 211, 153, 0.9) 100%)', // FAB only
  solidGradient: 'linear-gradient(135deg, #66D893 0%, #34D399 100%)', // FAB only
  headerBg: '#F3F4F6', // Light grey - matches message area
  headerBorder: '#E5E7EB',
  headerText: '#1f2937',
  headerSubtext: '#6B7280',
  sendBg: '#1f2937', // Dark send button — prompt-box style
  sendBgHover: '#374151',
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

// Simple chat bubble icon - clean and recognizable
const ChatIcon = ({ size = 24, color = WIDGET_THEME.color }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 20a2.67 2.67 0 0 1-2.67 2.67H9.33L4 28V6.67A2.67 2.67 0 0 1 6.67 4h18.66A2.67 2.67 0 0 1 28 6.67V20z" fill={color}/>
    <circle cx="10" cy="14" r="2" fill="white"/>
    <circle cx="16" cy="14" r="2" fill="white"/>
    <circle cx="22" cy="14" r="2" fill="white"/>
  </svg>
);

// Three-dots (kebab) menu icon — borrowed from internal widget
const KebabIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="5" r="2" fill="currentColor"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <circle cx="12" cy="19" r="2" fill="currentColor"/>
  </svg>
);

// SIMPLIFIED External Text Bar Component - EXACTLY like Sky Lagoon (Minimal & Fast)
const ExternalTextBar = ({ isVisible, onClose, onOpenChat, getCurrentLanguage }) => {
  if (!isVisible) return null;

  const currentLang = getCurrentLanguage();
  const message = currentLang === 'is' 
    ? "Hæ! Hvernig getum við aðstoðað?"
    : "Ask us anything";

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

// ─── Image compression helper — matches AssistantPage implementation ───
async function compressImage(file, targetSizeKB = 400) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxWidth = 1200;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        let quality = 0.85;
        let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        let attempts = 0;
        const maxAttempts = 10;
        const targetBytes = targetSizeKB * 1024;
        while (compressedDataUrl.length > targetBytes && quality > 0.3 && attempts < maxAttempts) {
          quality -= 0.1;
          compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          attempts++;
        }
        const base64Data = compressedDataUrl.split(',')[1];
        resolve({
          filename: file.name,
          mimeType: 'image/jpeg',
          data: base64Data,
          size: base64Data.length,
          preview: compressedDataUrl
        });
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

// ─── File to base64 helper ───
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
  });
}

// ─── File icon helper ───
function getFileIcon(mimeType) {
  if (mimeType.includes('pdf')) return '📄';
  if (mimeType.includes('word') || mimeType.includes('document')) return '📝';
  if (mimeType.includes('excel') || mimeType.includes('sheet')) return '📊';
  if (mimeType.includes('text')) return '📃';
  if (mimeType.startsWith('image/')) return '🖼️';
  return '📎';
}

const ChatWidget = () => {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const kebabMenuRef = useRef(null); // Ref for kebab menu to detect outside clicks
  const uploadMenuRef = useRef(null); // Ref for upload menu to detect outside clicks
  const fileInputRef = useRef(null); // Hidden file input for images + documents
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
  const [showKebabMenu, setShowKebabMenu] = useState(false); // Kebab menu state
  const [isExpanded, setIsExpanded] = useState(false); // Resize state — expanded mode
  const [uploadedFiles, setUploadedFiles] = useState([]); // Files/images queued for sending
  const [showUploadMenu, setShowUploadMenu] = useState(false); // Upload menu visibility
  const [isDraggingOver, setIsDraggingOver] = useState(false); // Drag-and-drop visual feedback
  const isMobile = windowWidth <= MOBILE_BREAKPOINT;

  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Get current language - derived from URL path (syncs with Navigation)
  const getCurrentLanguage = useCallback(() => {
    return window.location.pathname.startsWith('/en') ? 'en' : 'is';
  }, []);

  // Track language state so widget re-renders on language change
  const [widgetLang, setWidgetLang] = useState(getCurrentLanguage());

  // Enhanced translations with professional messaging
  const translations = {
    is: {
      title: "Gervigreindarfulltrúi",
      subtitle: "Gervigreindarfulltrúi",
      placeholder: "Skrifaðu skilaboð...",
      send: "Senda",
      welcome: "Hæ! Ég er AI spjallmenni hjá Svörum strax. Ertu með fyrirtæki og hefur áhuga á þjónustu okkar? Eða hefur þú áhuga á að ganga til liðs við okkur í Barcelona?",
      error: "Fyrirgefðu, eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.",
      newChat: "Nýtt spjall",
      close: "Loka",
      addFiles: "Bæta við skrám eða myndum",
    },
    en: {
      title: "AI Assistant",
      subtitle: "AI Assistant",
      placeholder: "Type a message...",
      send: "Send",
      welcome: "Hello! I'm your AI assistant at Svörum strax. Are you a business looking to enhance your customer service? Or perhaps you're interested in joining our Barcelona team?",
      error: "Sorry, something went wrong. Please try again.",
      newChat: "New chat",
      close: "Close",
      addFiles: "Add files or photos",
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

  // Watch for language changes via URL path (Navigation language toggle)
  useEffect(() => {
    const checkLanguage = () => {
      const newLang = getCurrentLanguage();
      if (newLang !== widgetLang) {
        console.log(`🌐 Language changed: ${widgetLang} → ${newLang}`);
        setWidgetLang(newLang);
        // Clear messages so welcome re-renders in new language
        setMessages([]);
      }
    };

    // Listen for popstate (back/forward) and also poll for SPA navigation
    window.addEventListener('popstate', checkLanguage);
    const intervalId = setInterval(checkLanguage, 500);

    return () => {
      window.removeEventListener('popstate', checkLanguage);
      clearInterval(intervalId);
    };
  }, [widgetLang, getCurrentLanguage]);

  // Close kebab menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (kebabMenuRef.current && !kebabMenuRef.current.contains(event.target) && showKebabMenu) {
        setShowKebabMenu(false);
      }
    };

    if (showKebabMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showKebabMenu]);

  // Close upload menu when clicking outside
  useEffect(() => {
    const handleClickOutsideUpload = (event) => {
      if (uploadMenuRef.current && !uploadMenuRef.current.contains(event.target) && showUploadMenu) {
        setShowUploadMenu(false);
      }
    };

    if (showUploadMenu) {
      document.addEventListener('mousedown', handleClickOutsideUpload);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideUpload);
    };
  }, [showUploadMenu]);

  // Close entire widget when clicking outside (ultra utility feel)
  const widgetRef = useRef(null);
  useEffect(() => {
    const handleClickOutsideWidget = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target) && !isMinimized) {
        // Don't close if clicking the external text bar
        if (event.target.closest('[data-textbar]')) return;
        setIsMinimized(true);
      }
    };

    if (!isMinimized) {
      // Small delay so the opening click doesn't immediately close it
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutsideWidget);
      }, 100);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutsideWidget);
      };
    }
  }, [isMinimized]);

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

  // Welcome message — DISABLED: now using embedded background text instead
  // useEffect(() => {
  //   if (!isMinimized && messages.length === 0) {
  //     const lang = getCurrentLanguage();
  //     const welcomeMessage = translations[lang].welcome;
  //     const welcomeId = 'welcome-' + Date.now();
  //     
  //     setMessages([{
  //       type: 'bot',
  //       content: welcomeMessage,
  //       id: welcomeId
  //     }]);
  //     
  //     renderMessage(welcomeId, welcomeMessage);
  //   }
  // }, [isMinimized, messages.length, renderMessage, getCurrentLanguage]);

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

  // Send message via SSE (Vercel compatible!) — ENHANCED: now supports images and files
  const sendSSEMessage = async (messageText, filesToSend = []) => {
    console.log('📡 Starting SSE stream for message:', messageText);

    // Separate images from documents for the backend
    const images = filesToSend.filter(f => f.mimeType.startsWith('image/'));
    const documents = filesToSend.filter(f => !f.mimeType.startsWith('image/'));
    
    try {
      const response = await fetch(`${getBackendUrl()}/chat-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'svorum2025_sk3j8k4j5k6j7k8j9k0j1k2',
        },
        body: JSON.stringify({
          message: messageText,
          sessionId: sessionId,
          // Only include images/files if present (keeps payload small for text-only messages)
          ...(images.length > 0 && { images }),
          ...(documents.length > 0 && { files: documents }),
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
            const data = line.slice(6);
            
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

  // Typing indicator — no avatar, just dots (prompt-box style)
  const TypingIndicator = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
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
          background: '#9CA3AF',
          borderRadius: '50%',
          opacity: '0.8',
          animation: 'typing 1.4s infinite'
        }} />
        <span style={{
          height: '8px',
          width: '8px',
          background: '#9CA3AF',
          borderRadius: '50%',
          opacity: '0.8',
          animation: 'typing 1.4s infinite',
          animationDelay: '0.15s'
        }} />
        <span style={{
          height: '8px',
          width: '8px',
          background: '#9CA3AF',
          borderRadius: '50%',
          opacity: '0.8',
          animation: 'typing 1.4s infinite',
          animationDelay: '0.3s'
        }} />
      </div>
    </div>
  );

  // Handle new chat — clears conversation and starts fresh
  const handleNewChat = () => {
    console.log('🆕 Starting new chat');
    setMessages([]);
    setCurrentStreamMessage('');
    setIsTyping(false);
    setIsLoading(false);
    setIsStreaming(false);
    setShowKebabMenu(false);
    setUploadedFiles([]); // Clear any queued files

    // Generate new session ID
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    localStorage.setItem(SESSION_ID_KEY, newSessionId);

    // Welcome message removed — now using embedded background text
    // Previous welcome bubble logic preserved in translations if needed

  };

  // ─── File selection handler — single input accepts both images and documents ───
  const handleFileSelection = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selectedFiles = Array.from(e.target.files);

    try {
      const newUploads = [];

      for (const file of selectedFiles) {
        const sizeMB = file.size / (1024 * 1024);

        if (file.type.startsWith('image/')) {
          // Image: max 10MB, compress to ~400KB
          if (sizeMB > 10) continue;
          const currentImages = uploadedFiles.filter(f => f.mimeType.startsWith('image/'));
          if (currentImages.length + newUploads.filter(f => f.mimeType.startsWith('image/')).length >= 3) continue; // max 3 images
          const compressed = await compressImage(file, 400);
          newUploads.push(compressed);
        } else {
          // Document: max 5MB, allowed types only
          if (sizeMB > 5) continue;
          const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/plain'
          ];
          if (!allowedTypes.includes(file.type)) continue;
          const currentDocs = uploadedFiles.filter(f => !f.mimeType.startsWith('image/'));
          if (currentDocs.length + newUploads.filter(f => !f.mimeType.startsWith('image/')).length >= 2) continue; // max 2 docs
          const b64 = await fileToBase64(file);
          newUploads.push({ filename: file.name, mimeType: file.type, data: b64, size: file.size });
        }
      }

      if (newUploads.length > 0) {
        setUploadedFiles(prev => [...prev, ...newUploads]);
        console.log(`📎 ${newUploads.length} file(s) queued for sending`);
      }
    } catch (error) {
      console.error('❌ File upload failed:', error);
    }

    // Reset the input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowUploadMenu(false);
  };

  // Remove a queued file by index
  const removeUploadedFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // ─── Drag-and-drop handlers — matches AssistantPage implementation ───
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length === 0) return;

    const allowedDocTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];

    try {
      const newUploads = [];

      for (const file of droppedFiles) {
        const sizeMB = file.size / (1024 * 1024);

        if (file.type.startsWith('image/')) {
          // Image: max 10MB, compress to ~400KB, max 3 total
          if (sizeMB > 10) continue;
          const currentImages = uploadedFiles.filter(f => f.mimeType.startsWith('image/'));
          if (currentImages.length + newUploads.filter(f => f.mimeType.startsWith('image/')).length >= 3) continue;
          const compressed = await compressImage(file, 400);
          newUploads.push(compressed);
        } else if (allowedDocTypes.includes(file.type)) {
          // Document: max 5MB, max 2 total
          if (sizeMB > 5) continue;
          const currentDocs = uploadedFiles.filter(f => !f.mimeType.startsWith('image/'));
          if (currentDocs.length + newUploads.filter(f => !f.mimeType.startsWith('image/')).length >= 2) continue;
          const b64 = await fileToBase64(file);
          newUploads.push({ filename: file.name, mimeType: file.type, data: b64, size: file.size });
        }
        // Skip unsupported file types silently
      }

      if (newUploads.length > 0) {
        setUploadedFiles(prev => [...prev, ...newUploads]);
        console.log(`📎 ${newUploads.length} file(s) dropped and queued`);
      }
    } catch (error) {
      console.error('❌ File drop failed:', error);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() && uploadedFiles.length === 0) return;

    const messageText = inputValue.trim();
    const filesToSend = [...uploadedFiles]; // Snapshot current files
    setInputValue('');
    setUploadedFiles([]); // Clear file queue immediately
    setHasInteracted(true);
    setShowTextBar(false);

    const userMsgId = 'user-' + Date.now();
    setMessages(prev => [...prev, {
      id: userMsgId,
      text: messageText || `[${filesToSend.length} file${filesToSend.length > 1 ? 's' : ''} attached]`,
      sender: 'user',
      timestamp: Date.now(),
      attachedFiles: filesToSend, // Store files with message for display
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
          await sendSSEMessage(messageText, filesToSend);
        } else {
          console.log('🔄 Using WebSocket streaming (development mode)...');
          // WebSocket doesn't support files — use SSE if files are present
          if (filesToSend.length > 0) {
            await sendSSEMessage(messageText, filesToSend);
          } else {
            await sendStreamingMessage(messageText);
          }
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
            threadId: sessionId
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

  const lang = widgetLang;
  const t = translations[lang];

  // Dynamic dimensions based on expanded state
  const widgetWidth = isExpanded ? (isMobile ? '95vw' : '640px') : (isMobile ? '90vw' : '480px');
  const chatHeight = isExpanded ? (isMobile ? '75vh' : '620px') : (isMobile ? '65vh' : '520px');

  return (
    <ErrorBoundary>
      {/* OPTIMIZED External Text Bar */}
      <ExternalTextBar 
        isVisible={showTextBar && isMinimized} 
        onClose={() => setShowTextBar(false)}
        onOpenChat={handleOpenChatFromTextBar}
        getCurrentLanguage={getCurrentLanguage}
      />

      {/* Hidden file input — accepts both images and documents */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
        multiple
        onChange={handleFileSelection}
        style={{ display: 'none' }}
      />

      <div ref={widgetRef} style={{
        position: 'fixed',
        bottom: isMobile ? '10px' : '20px',
        right: isMobile ? '10px' : '20px',
        width: isMinimized ? (isMobile ? '60px' : '70px') : widgetWidth,
        height: isMinimized ? (isMobile ? '60px' : '70px') : 'auto',
        maxHeight: isMinimized ? 'auto' : (isMobile ? '85vh' : 'calc(100vh - 40px)'),
        background: isMinimized ? '#FFFFFF' : '#FAFAFA',
        borderRadius: isMinimized ? '50%' : (isMobile ? '16px' : '16px'),
        boxShadow: isMinimized
          ? '0 2px 12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.04)'
          : '0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
        transformOrigin: 'bottom right',
        transition: 'all 0.3s ease',
        zIndex: 9999,
        maxWidth: isMinimized ? 'auto' : (isMobile ? '95vw' : '90vw')
      }}>
        {/* ── HEADER — Compact toolbar with kebab menu ── */}
        <div 
          style={{
            padding: isMinimized ? '0' : (isMobile ? '14px 16px' : '16px 20px'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMinimized ? 'center' : 'space-between',
            cursor: 'pointer',
            background: isMinimized ? '#FFFFFF' : WIDGET_THEME.headerBg,
            width: '100%',
            height: isMinimized ? '100%' : 'auto',
            boxSizing: 'border-box',
            borderBottom: isMinimized ? 'none' : `1px solid ${WIDGET_THEME.headerBorder}`,
          }}
          onClick={isMinimized ? handleToggleChat : handleToggleChat}
        >
          {/* FAB state — white circle with up-arrow prompt icon (minimized) */}
          {isMinimized && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isMobile ? '32px' : '38px',
              height: isMobile ? '32px' : '38px',
              borderRadius: '10px',
              backgroundColor: '#9CA3AF',
            }}>
              <svg 
                width={isMobile ? 16 : 20} 
                height={isMobile ? 16 : 20} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 10l7-7m0 0l7 7m-7-7v18"/>
              </svg>
            </div>
          )}

          {/* Open state — compact toolbar with chat icon + kebab menu */}
          {!isMinimized && (
            <>
              {/* Left side: empty, entire header is clickable to close */}
              <div style={{ flex: 1 }} />

              {/* Right side: resize + kebab menu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {!isMobile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent header close
                      console.log('↔️ Resize toggled:', !isExpanded ? 'expanded' : 'compact');
                      setIsExpanded(!isExpanded);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: WIDGET_THEME.headerSubtext,
                      transition: 'background 0.15s ease',
                      outline: 'none',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    title={isExpanded ? 'Minna' : 'Stærra'}
                  >
                    {isExpanded ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 14 10 14 10 20" />
                        <polyline points="20 10 14 10 14 4" />
                        <line x1="14" y1="10" x2="21" y2="3" />
                        <line x1="3" y1="21" x2="10" y2="14" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9" />
                        <polyline points="9 21 3 21 3 15" />
                        <line x1="21" y1="3" x2="14" y2="10" />
                        <line x1="3" y1="21" x2="10" y2="14" />
                      </svg>
                    )}
                  </button>
                )}

                {/* Kebab menu — three dots */}
                <div ref={kebabMenuRef} style={{ position: 'relative' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowKebabMenu(!showKebabMenu);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: WIDGET_THEME.headerSubtext,
                      transition: 'background 0.15s ease',
                      outline: 'none',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <KebabIcon size={18} />
                  </button>

                  {/* Kebab dropdown menu */}
                  {showKebabMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '36px',
                      right: '0',
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                      minWidth: '140px',
                      zIndex: 10000,
                      overflow: 'hidden'
                    }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNewChat();
                        }}
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          border: 'none',
                          background: 'white',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: '#374151',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#F3F4F6'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                      >
                        {t.newChat}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowKebabMenu(false);
                          setIsMinimized(true);
                        }}
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          border: 'none',
                          background: 'white',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: '#374151',
                          borderTop: '1px solid #F3F4F6',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#F3F4F6'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                      >
                        {t.close}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── CHAT AREA ── */}
        {!isMinimized && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
            height: chatHeight,
            backgroundColor: '#FAFAFA',
            overflowY: 'auto',
            padding: isMobile ? '12px' : '16px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}>
            {/* Drag-and-drop overlay — subtle visual feedback */}
            {isDraggingOver && (
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(243, 244, 246, 0.85)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                border: '2px dashed #D1D5DB',
                margin: '8px',
                pointerEvents: 'none',
              }}>
                <div style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500' }}>
                  {getCurrentLanguage() === 'is' ? 'Slepptu skrám hér' : 'Drop files here'}
                </div>
              </div>
            )}
            {/* Branding — always visible at top of chat area */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: isMobile ? '24px' : '36px',
              paddingBottom: isMobile ? '16px' : '24px',
              flexShrink: 0,
            }}>
              <img 
                src={logoYellow} 
                alt="Svörum strax" 
                style={{
                  height: isMobile ? '36px' : '42px',
                  width: 'auto',
                  opacity: 0.8,
                }}
              />
            </div>

            {/* Embedded background text — always visible (like internal assistant) */}
            <div style={{
              textAlign: 'center',
              paddingBottom: isMobile ? '24px' : '32px',
              flexShrink: 0,
            }}>
              <div style={{
                fontSize: isMobile ? '13px' : '14px',
                color: '#9CA3AF',
              }}>
                {getCurrentLanguage() === 'is' ? 'Hvernig getum við aðstoðað?' : 'How can we help?'}
              </div>
            </div> 

            {messages.map((msg) => {
              const isUser = msg.type === 'user' || msg.sender === 'user';
              const isBot = msg.type === 'bot' || msg.sender === 'bot';

              return (
                <div 
                  key={msg.id || Math.random()} 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    marginBottom: '16px'
                  }}
                >
                  {/* Attached file indicators — shown above user bubbles */}
                  {isUser && msg.attachedFiles && msg.attachedFiles.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px',
                      marginBottom: '4px',
                      justifyContent: 'flex-end',
                      maxWidth: isMobile ? '80%' : '75%',
                    }}>
                      {msg.attachedFiles.map((f, i) => (
                        <div key={i} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          backgroundColor: 'rgba(10, 14, 39, 0.08)',
                          borderRadius: '6px',
                          fontSize: '11px',
                          color: '#6B7280',
                        }}>
                          {f.preview ? (
                            <img src={f.preview} alt="" style={{ width: '16px', height: '16px', borderRadius: '3px', objectFit: 'cover' }} />
                          ) : (
                            <span style={{ fontSize: '11px' }}>{getFileIcon(f.mimeType)}</span>
                          )}
                          <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.filename}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message bubble — no avatars */}
                  <div
                    style={{
                      maxWidth: isMobile ? '80%' : '75%',
                      padding: isMobile ? '10px 14px' : '12px 16px',
                      borderRadius: '16px',
                      backgroundColor: isUser ? '#0A0E27' : 'rgba(229, 231, 235, 0.95)',
                      color: isUser ? 'white' : '#1f2937',
                      fontSize: isMobile ? '13px' : '14px',
                      lineHeight: '1.5',
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
                      border: isUser
                        ? 'none'
                        : '1px solid rgba(0, 0, 0, 0.06)',
                      position: 'relative',
                      overflowWrap: 'break-word',
                      wordWrap: 'break-word',
                      wordBreak: 'break-word'
                    }}
                  >
                    {isBot ? (
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
              );
            })}

            {/* Streaming message preview (no cursor for premium feel) */}
            {isStreaming && currentStreamMessage && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div style={{
                  maxWidth: isMobile ? '80%' : '75%',
                  padding: isMobile ? '10px 14px' : '12px 16px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(229, 231, 235, 0.95)',
                  color: '#1f2937',
                  fontSize: isMobile ? '13px' : '14px',
                  lineHeight: '1.5',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  position: 'relative',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word',
                  wordBreak: 'break-word'
                }}>
                  {currentStreamMessage}
                </div>
              </div>
            )}

            {/* TYPING INDICATOR: Show during dead air before first chunk arrives */}
            {isTyping && !currentStreamMessage && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        )}

      {/* ── INPUT AREA — Unified prompt bar ── */}
      {!isMinimized && (
        <div style={{
          padding: isMobile ? '10px 12px' : '12px 16px',
          backgroundColor: '#FAFAFA',
          borderTop: '1px solid #E5E7EB',
          flexShrink: 0
        }}>
          {/* File preview chips — shown above prompt bar when files are queued */}
          {uploadedFiles.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '8px',
            }}>
              {uploadedFiles.map((file, index) => (
                <div key={index} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 8px',
                  backgroundColor: '#F3F4F6',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#374151',
                }}>
                  {file.preview ? (
                    <img src={file.preview} alt={file.filename} style={{ width: '24px', height: '24px', borderRadius: '4px', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '13px' }}>{getFileIcon(file.mimeType)}</span>
                  )}
                  <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.filename}</span>
                  <button
                    onClick={() => removeUploadedFile(index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9CA3AF',
                      fontSize: '14px',
                      lineHeight: 1,
                      padding: '0 2px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#374151'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Unified input container — + button + textarea + send in one bar */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: isMobile ? '4px' : '6px',
            backgroundColor: '#F3F4F6',
            border: '1px solid #D1D5DB',
            borderRadius: '22px',
            padding: isMobile ? '6px 6px 6px 6px' : '8px 8px 8px 8px',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
          onFocus={() => {}}
          >
            {/* ── + Upload button (left side, inside prompt bar) ── */}
            <div ref={uploadMenuRef} style={{ position: 'relative', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setShowUploadMenu(!showUploadMenu)}
                disabled={isLoading}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '50%',
                  width: isMobile ? '28px' : '32px',
                  height: isMobile ? '28px' : '32px',
                  cursor: isLoading ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9CA3AF',
                  transition: 'color 0.15s ease, background 0.15s ease',
                  opacity: isLoading ? 0.4 : 1,
                  padding: 0,
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
                onMouseEnter={(e) => { if (!isLoading) { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; } }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.background = 'transparent'; }}
              >
                <svg width={isMobile ? 16 : 18} height={isMobile ? 16 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>

              {/* Upload dropdown — single option with paperclip, like AssistantPage */}
              {showUploadMenu && (
                <div style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 8px)',
                  left: '0',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                  minWidth: '180px',
                  zIndex: 10001,
                  overflow: 'hidden',
                }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: 'none',
                      background: 'white',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: '#374151',
                      transition: 'background 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F3F4F6'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                  >
                    {/* Paperclip SVG icon — clean and subtle */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                    {t.addFiles}
                  </button>
                </div>
              )}
            </div>

            {/* Textarea — no border, transparent bg, auto-grows on shift+enter */}
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                // Auto-resize textarea to fit content (up to ~5 lines)
                const el = e.target;
                el.style.height = 'auto';
                const maxH = isMobile ? 100 : 120; // ~5 lines
                el.style.height = Math.min(el.scrollHeight, maxH) + 'px';
                el.style.overflowY = el.scrollHeight > maxH ? 'auto' : 'hidden';
              }}
              onKeyDown={(e) => {
                // Shift+Enter → newline (allow default behavior)
                if (e.key === 'Enter' && e.shiftKey) {
                  return;
                }

                // Enter → send
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (!isLoading && (inputValue.trim() || uploadedFiles.length > 0)) {
                    handleSend();
                    // Reset textarea height after send
                    if (inputRef.current) {
                      inputRef.current.style.height = 'auto';
                    }
                  }
                }
              }}
              placeholder={t.placeholder}
              rows={1}
              style={{
                flex: 1,
                minHeight: isMobile ? '24px' : '28px',
                maxHeight: isMobile ? '100px' : '120px',
                height: 'auto',
                padding: '0',
                border: 'none',
                outline: 'none',
                fontSize: isMobile ? '13px' : '14px',
                backgroundColor: 'transparent',
                color: '#374151',
                resize: 'none',
                fontFamily: 'inherit',
                lineHeight: '1.5',
                overflowY: 'hidden',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              onFocus={(e) => {
                // Style the parent container on focus
                const container = e.target.parentElement;
                if (container) {
                  container.style.borderColor = '#9CA3AF';
                  container.style.boxShadow = '0 0 0 1px rgba(156, 163, 175, 0.3)';
                }
              }}
              onBlur={(e) => {
                const container = e.target.parentElement;
                if (container) {
                  container.style.borderColor = '#D1D5DB';
                  container.style.boxShadow = 'none';
                }
              }}
            />

            {/* Send button — always rendered for stable layout, invisible when empty */}
            <button
              onClick={() => {
                if ((!inputValue.trim() && uploadedFiles.length === 0) || isLoading) return;
                handleSend();
                // Reset textarea height after send
                if (inputRef.current) {
                  inputRef.current.style.height = 'auto';
                }
              }}
              disabled={(!inputValue.trim() && uploadedFiles.length === 0) || isLoading}
              style={{
                background: (inputValue.trim() || uploadedFiles.length > 0) ? WIDGET_THEME.sendBg : 'transparent',
                color: 'white',
                border: 'none',
                width: isMobile ? '32px' : '36px',
                height: isMobile ? '32px' : '36px',
                borderRadius: '50%',
                cursor: ((!inputValue.trim() && uploadedFiles.length === 0) || isLoading) ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: (inputValue.trim() || uploadedFiles.length > 0) ? (isLoading ? 0.3 : 1) : 0,
                flexShrink: 0,
                pointerEvents: ((!inputValue.trim() && uploadedFiles.length === 0) || isLoading) ? 'none' : 'auto',
              }}
              onMouseEnter={(e) => {
                if ((inputValue.trim() || uploadedFiles.length > 0) && !isLoading) {
                  e.currentTarget.style.background = WIDGET_THEME.sendBgHover;
                }
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim() || uploadedFiles.length > 0) {
                  e.currentTarget.style.background = WIDGET_THEME.sendBg;
                }
              }}
            >
              {/* Up arrow — matches internal assistant style */}
              <svg width={isMobile ? '16' : '18'} height={isMobile ? '16' : '18'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 10l7-7m0 0l7 7m-7-7v18"/>
              </svg>
            </button>
          </div>
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
          
          textarea::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
};

export default ChatWidget;