import React, { useState, useEffect, useRef, useCallback } from 'react';

// Configuration for premium effects
const CHUNK_REVEAL_DELAY = 250;
const FADE_IN_DURATION = 300;
const MOBILE_BREAKPOINT = 768;

// Session management
const SESSION_ID_KEY = "svorumChatSessionId";

const ChatWidget = () => {
    const messagesEndRef = useRef(null);
    const [isMinimized, setIsMinimized] = useState(true);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const [typingMessages, setTypingMessages] = useState({});
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
            preview: "Þarftu aðstoð? Spjallaðu við mig!",
            welcome: "Hæ! Ég er AI spjallmenni hjá Svörum strax. Ertu með fyrirtæki og hefur áhuga á þjónustu okkar? Eða hefur þú áhuga á að ganga til liðs við okkur í Barcelona?",
            error: "Fyrirgefðu, eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur."
        },
        en: {
            title: "AI Assistant",
            subtitle: "Svörum strax",
            placeholder: "Type a message...",
            send: "Send",
            preview: "Need assistance? Chat with me!",
            welcome: "Hello! I'm your AI assistant at Svörum strax. Are you a business interested in our services? Or are you looking to join our team in Barcelona?",
            error: "Sorry, something went wrong. Please try again."
        }
    };

    // Generate session ID
    const generateSessionId = useCallback(() => {
        return `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    }, []);

    // Initialize session
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

    // Scroll to bottom
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

    // Toggle chat window - RE-style with dimension changes
    const toggleChat = () => {
        setIsMinimized(!isMinimized);
    };

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
                                            style={{ color: '#FF6B35', textDecoration: 'underline' }}
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

    const TypingIndicator = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ position: 'relative', height: '32px', width: '32px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                        borderRadius: '50%',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)'
                    }}>
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                            <path d="M17.5 12.5a1.25 1.25 0 0 1-1.25 1.25H6.25L3.75 16.25V5a1.25 1.25 0 0 1 1.25-1.25h11.25A1.25 1.25 0 0 1 17.5 5v7.5z" fill="white"/>
                            <circle cx="7.5" cy="8.75" r="0.625" fill="#FF6B35"/>
                            <circle cx="10" cy="8.75" r="0.625" fill="#FF6B35"/>
                            <circle cx="12.5" cy="8.75" r="0.625" fill="#FF6B35"/>
                        </svg>
                    </div>
                </div>
                <div style={{
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: '#f8f9fa',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.05)'
                }}>
                    <span style={{
                        height: '8px',
                        width: '8px',
                        background: '#FF6B35',
                        borderRadius: '50%',
                        opacity: '0.4',
                        animation: 'typing 1.4s infinite'
                    }} />
                    <span style={{
                        height: '8px',
                        width: '8px',
                        background: '#FF6B35',
                        borderRadius: '50%',
                        opacity: '0.4',
                        animation: 'typing 1.4s infinite',
                        animationDelay: '0.15s'
                    }} />
                    <span style={{
                        height: '8px',
                        width: '8px',
                        background: '#FF6B35',
                        borderRadius: '50%',
                        opacity: '0.4',
                        animation: 'typing 1.4s infinite',
                        animationDelay: '0.3s'
                    }} />
                </div>
            </div>
        );
    };

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
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: isMinimized ? (windowWidth <= 768 ? '60px' : '70px') : '400px',
            height: isMinimized ? (windowWidth <= 768 ? '60px' : '70px') : 'auto',
            maxHeight: isMinimized ? 'auto' : 'calc(100vh - 40px)',
            backgroundColor: isMinimized ? 'rgba(255, 107, 53, 0.95)' : '#FAF7F2',
            borderRadius: isMinimized ? '50%' : '16px',
            boxShadow: isMinimized 
                ? '0 4px 20px rgba(255, 107, 53, 0.3), 0 0 15px rgba(255, 255, 255, 0.1)' 
                : '0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 107, 53, 0.1)',
            overflow: 'hidden',
            transformOrigin: 'bottom right',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            maxWidth: isMinimized ? 'auto' : '90vw',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Minimized state bubble */}
            {isMinimized && (
                <div 
                    onClick={toggleChat}
                    style={{
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}
                >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28 20a2.67 2.67 0 0 1-2.67 2.67H9.33L4 28V6.67A2.67 2.67 0 0 1 6.67 4h18.66A2.67 2.67 0 0 1 28 6.67V20z" fill="white"/>
                        <circle cx="10.67" cy="13.33" r="1.33" fill="#FF6B35"/>
                        <circle cx="16" cy="13.33" r="1.33" fill="#FF6B35"/>
                        <circle cx="21.33" cy="13.33" r="1.33" fill="#FF6B35"/>
                    </svg>
                </div>
            )}

            {/* Expanded state */}
            {!isMinimized && (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <div 
                        onClick={toggleChat}
                        style={{
                            background: 'linear-gradient(135deg, #0A0E27 0%, #1B2735 100%)',
                            padding: '20px 16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            borderRadius: '16px 16px 0 0',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            position: 'relative',
                            height: '50px',
                            width: '50px',
                            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" fill="white"/>
                                <circle cx="9" cy="10" r="1" fill="#FF6B35"/>
                                <circle cx="12" cy="10" r="1" fill="#FF6B35"/>
                                <circle cx="15" cy="10" r="1" fill="#FF6B35"/>
                            </svg>
                        </div>
                        
                        <div style={{ flex: 1 }}>
                            <div style={{ 
                                color: 'white',
                                fontSize: '18px',
                                fontWeight: '600',
                                marginBottom: '4px'
                            }}>
                                {t.title}
                            </div>
                            <div style={{ 
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '14px'
                            }}>
                                {t.subtitle}
                            </div>
                        </div>
                        
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: 'white', opacity: 0.8 }}>
                            <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    {/* Chat area */}
                    <div style={{
                        flex: 1,
                        background: '#FAF7F2',
                        overflowY: 'auto',
                        padding: '16px',
                        minHeight: '300px',
                        maxHeight: '400px'
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
                                            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)'
                                        }}>
                                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                                <path d="M17.5 12.5a1.25 1.25 0 0 1-1.25 1.25H6.25L3.75 16.25V5a1.25 1.25 0 0 1 1.25-1.25h11.25A1.25 1.25 0 0 1 17.5 5v7.5z" fill="white"/>
                                                <circle cx="7.5" cy="8.75" r="0.625" fill="#FF6B35"/>
                                                <circle cx="10" cy="8.75" r="0.625" fill="#FF6B35"/>
                                                <circle cx="12.5" cy="8.75" r="0.625" fill="#FF6B35"/>
                                            </svg>
                                        </div>
                                    )}
                                    
                                    <div style={{
                                        maxWidth: '70%',
                                        padding: '12px 16px',
                                        borderRadius: '16px',
                                        backgroundColor: msg.type === 'user' 
                                            ? 'linear-gradient(135deg, #2D3561 0%, #3B4A7A 100%)'
                                            : 'white',
                                        background: msg.type === 'user' 
                                            ? 'linear-gradient(135deg, #2D3561 0%, #3B4A7A 100%)'
                                            : 'white',
                                        color: msg.type === 'user' ? 'white' : '#333333',
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        boxShadow: msg.type === 'user' 
                                            ? '0 2px 8px rgba(45, 53, 97, 0.3)'
                                            : '0 2px 8px rgba(0, 0, 0, 0.1)',
                                        border: msg.type === 'user' 
                                            ? '1px solid rgba(255, 255, 255, 0.15)' 
                                            : '1px solid rgba(0, 0, 0, 0.05)',
                                        position: 'relative',
                                        overflowWrap: 'break-word',
                                        wordWrap: 'break-word',
                                        wordBreak: 'break-word'
                                    }}>
                                        {msg.type === 'bot' ? (
                                            typingMessages[msg.id] ? (
                                                <div style={{ 
                                                    position: 'relative',
                                                    opacity: typingMessages[msg.id].fadeIn ? 0.99 : 1,
                                                    transition: `opacity ${FADE_IN_DURATION}ms ease-in-out`
                                                }}>
                                                    <MessageFormatter 
                                                        message={typingMessages[msg.id].text.substring(0, typingMessages[msg.id].visibleChars)} 
                                                    />
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

                    {/* Input area */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '16px',
                        background: 'white',
                        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                        gap: '12px',
                        borderRadius: '0 0 16px 16px'
                    }}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                            placeholder={t.placeholder}
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                border: '2px solid rgba(255, 107, 53, 0.2)',
                                borderRadius: '25px',
                                outline: 'none',
                                fontSize: '14px',
                                transition: 'all 0.2s ease',
                                background: '#FAF7F2'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'rgba(255, 107, 53, 0.5)';
                                e.target.style.background = 'white';
                                e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 107, 53, 0.2)';
                                e.target.style.background = '#FAF7F2';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isTyping}
                            style={{
                                background: isTyping 
                                    ? 'linear-gradient(135deg, #ccc 0%, #aaa 100%)'
                                    : 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '12px 20px',
                                borderRadius: '25px',
                                cursor: isTyping ? 'default' : 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.2s ease',
                                boxShadow: isTyping 
                                    ? 'none'
                                    : '0 2px 8px rgba(255, 107, 53, 0.3)',
                                opacity: isTyping ? 0.7 : 1
                            }}
                            onMouseOver={(e) => {
                                if (!isTyping) {
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.4)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isTyping) {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 2px 8px rgba(255, 107, 53, 0.3)';
                                }
                            }}
                        >
                            {t.send}
                        </button>
                    </div>
                </div>
            )}

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes typing {
                    0%, 60%, 100% {
                        transform: translateY(0);
                        opacity: 0.4;
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
    );
};

export default ChatWidget;