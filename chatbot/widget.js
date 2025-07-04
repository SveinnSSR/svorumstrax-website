// Svörum strax Premium Chat Widget - Translucent Orange Tech Design
(function() {
    'use strict';

    // Premium brand theme with translucent orange gradient
    const theme = {
        colors: {
            primary: "#FF6B35", // Orange primary
            secondary: "#FF8F65", // Lighter orange
            gradient: "linear-gradient(135deg, rgba(255, 107, 53, 0.95) 0%, rgba(255, 143, 101, 0.85) 100%)", // Translucent orange
            solidGradient: "linear-gradient(135deg, #FF6B35 0%, #FF8F65 100%)", // Solid for buttons
            headerBg: "linear-gradient(135deg, #0A0E27 0%, #1B2735 100%)", // Keep dark header
            text: "#333333",
            background: "#FFFFFF",
            messageBg: "#F5F5F5",
            userMessage: "#FF6B35", // Orange for user messages
            botMessage: "#F0F0F0",
            lightAccent: "rgba(255, 107, 53, 0.1)",
            darkBg: "#1A1F2E", // Dark background from screenshot
        },
        fonts: {
            body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
    };

    // Configuration for premium effects
    const CHUNK_REVEAL_DELAY = 250;
    const FADE_IN_DURATION = 300;
    const MOBILE_BREAKPOINT = 768;

    // Session management
    const SESSION_ID_KEY = "svorumChatSessionId";
    const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'svorum-premium-chat-widget';
    document.body.appendChild(widgetContainer);

    // Widget state - showOptions now defaults to false
    let isMinimized = true;
    let showOptions = false; // Changed to false - go straight to chat
    let messages = [];
    let inputValue = '';
    let isTyping = false;
    let sessionId = '';
    let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    let typingMessages = {};
    const isMobile = windowWidth <= MOBILE_BREAKPOINT;

    // Create widget HTML with premium structure
    function createWidget() {
        const html = `
            <div class="svorum-premium-container ${isMinimized ? 'minimized' : ''}">
                <!-- Minimized state - Premium circular button with translucent orange -->
                <div class="svorum-premium-bubble" onclick="toggleChat()">
                    <div class="svorum-premium-ring">
                        <div class="svorum-premium-avatar">
                            <svg class="svorum-logo-svg" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#FF8F65;stop-opacity:1" />
                                    </linearGradient>
                                    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#FAFAFA;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:1" />
                                    </linearGradient>
                                    <filter id="glassmorphism">
                                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="glow" />
                                        <feBlend in="SourceGraphic" in2="glow" />
                                    </filter>
                                </defs>
                                <circle cx="30" cy="30" r="28" fill="url(#bgGrad)" opacity="0.9"/>
                                <!-- Modern tech chat bubble -->
                                <g filter="url(#glassmorphism)">
                                    <path d="M 20 25 Q 20 20, 25 20 L 35 20 Q 40 20, 40 25 L 40 30 Q 40 35, 35 35 L 28 35 L 23 40 L 23 35 L 25 35 Q 20 35, 20 30 Z" 
                                          fill="url(#logoGrad)" opacity="0.85"/>
                                    <circle cx="25" cy="27.5" r="1.5" fill="white"/>
                                    <circle cx="30" cy="27.5" r="1.5" fill="white"/>
                                    <circle cx="35" cy="27.5" r="1.5" fill="white"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Expanded state - Premium chat window -->
                <div class="svorum-premium-window">
                    <!-- Premium header with more space -->
                    <div class="svorum-premium-header" onclick="toggleChat()">
                        <div class="svorum-premium-header-content">
                            <div class="svorum-premium-header-avatar">
                                <svg class="svorum-logo-svg-header" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="logoGradHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
                                            <stop offset="100%" style="stop-color:#FF8F65;stop-opacity:1" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="30" cy="30" r="30" fill="white" opacity="0.95"/>
                                    <!-- Chat bubble design -->
                                    <g>
                                        <path d="M 20 25 Q 20 20, 25 20 L 35 20 Q 40 20, 40 25 L 40 30 Q 40 35, 35 35 L 28 35 L 23 40 L 23 35 L 25 35 Q 20 35, 20 30 Z" 
                                              fill="url(#logoGradHeader)" opacity="0.9"/>
                                        <circle cx="25" cy="27.5" r="1.5" fill="white"/>
                                        <circle cx="30" cy="27.5" r="1.5" fill="white"/>
                                        <circle cx="35" cy="27.5" r="1.5" fill="white"/>
                                    </g>
                                </svg>
                            </div>
                            <div class="svorum-premium-header-info">
                                <div class="svorum-premium-title">AI Aðstoð</div>
                                <div class="svorum-premium-subtitle">Svörum strax</div>
                            </div>
                        </div>
                        <div class="svorum-premium-minimize">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>

                    <!-- Content area -->
                    <div class="svorum-premium-content">
                        <!-- Chat area container - now shows by default -->
                        <div class="svorum-premium-chat-area" style="display: flex; flex-direction: column; flex: 1; min-height: 0;">
                            <!-- Chat messages area -->
                            <div class="svorum-premium-messages" id="svorum-messages">
                                <!-- Messages will be inserted here -->
                            </div>

                            <!-- Typing indicator -->
                            <div class="svorum-premium-typing" id="svorum-typing" style="display: none;">
                                <div class="svorum-typing-avatar">
                                    <svg class="svorum-logo-svg-small" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="logoGradTyping" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
                                                <stop offset="100%" style="stop-color:#FF8F65;stop-opacity:1" />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="20" cy="20" r="20" fill="white" opacity="0.95"/>
                                        <!-- Chat bubble design scaled down -->
                                        <path d="M 13 17 Q 13 14, 16 14 L 24 14 Q 27 14, 27 17 L 27 20 Q 27 23, 24 23 L 19 23 L 15 27 L 15 23 L 16 23 Q 13 23, 13 20 Z" 
                                              fill="url(#logoGradTyping)" opacity="0.9"/>
                                        <circle cx="16.5" cy="18.5" r="1" fill="white"/>
                                        <circle cx="20" cy="18.5" r="1" fill="white"/>
                                        <circle cx="23.5" cy="18.5" r="1" fill="white"/>
                                    </svg>
                                </div>
                                <div class="svorum-typing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Input area - now shows by default -->
                    <div class="svorum-premium-input-container" style="display: flex;">
                        <input 
                            type="text" 
                            class="svorum-premium-input" 
                            id="svorum-input"
                            placeholder="Skrifaðu skilaboð..."
                            onkeypress="handleKeyPress(event)"
                        >
                        <button class="svorum-premium-send" onclick="sendMessage()">
                            <span>Senda</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        widgetContainer.innerHTML = html;
    }

    // Generate session ID
    function generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    }

    // Initialize session
    function initializeSession() {
        let existingSessionId = localStorage.getItem(SESSION_ID_KEY);
        
        if (!existingSessionId) {
            existingSessionId = generateSessionId();
            localStorage.setItem(SESSION_ID_KEY, existingSessionId);
        }
        
        sessionId = existingSessionId;
    }

    // Toggle chat window
    window.toggleChat = function() {
        isMinimized = !isMinimized;
        const container = document.querySelector('.svorum-premium-container');
        container.classList.toggle('minimized');
        
        if (!isMinimized && messages.length === 0) {
            showWelcomeMessage();
        }
    };

    // Show welcome message
    function showWelcomeMessage() {
        const welcomeMsg = "Halló! Ég er AI þjónusturáðgjafi Svörum strax. Hvernig get ég aðstoðað þig í dag?";
        addMessage('bot', welcomeMsg);
    }

    // Add message to chat
    function addMessage(type, content, skipEffect = false) {
        const messageId = `msg-${Date.now()}-${Math.random()}`;
        const message = { id: messageId, type, content };
        messages.push(message);
        
        const messagesContainer = document.getElementById('svorum-messages');
        const messageEl = document.createElement('div');
        messageEl.className = `svorum-message svorum-message-${type}`;
        messageEl.id = messageId;
        
        if (type === 'bot') {
            messageEl.innerHTML = `
                <div class="svorum-message-wrapper">
                    <div class="svorum-message-avatar">
                        <svg class="svorum-logo-svg-small" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="logoGradSmall${messageId}" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#FF8F65;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <circle cx="20" cy="20" r="20" fill="white" opacity="0.95"/>
                            <!-- Chat bubble design scaled down -->
                            <path d="M 13 17 Q 13 14, 16 14 L 24 14 Q 27 14, 27 17 L 27 20 Q 27 23, 24 23 L 19 23 L 15 27 L 15 23 L 16 23 Q 13 23, 13 20 Z" 
                                  fill="url(#logoGradSmall${messageId})" opacity="0.9"/>
                            <circle cx="16.5" cy="18.5" r="1" fill="white"/>
                            <circle cx="20" cy="18.5" r="1" fill="white"/>
                            <circle cx="23.5" cy="18.5" r="1" fill="white"/>
                        </svg>
                    </div>
                    <div class="svorum-message-bubble">
                        <span class="svorum-message-text"></span>
                    </div>
                </div>
            `;
        } else {
            messageEl.innerHTML = `
                <div class="svorum-message-wrapper">
                    <div class="svorum-message-bubble">
                        <span class="svorum-message-text">${content}</span>
                    </div>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageEl);
        
        if (type === 'bot' && !skipEffect) {
            renderMessage(messageId, content);
        }
        
        // Ensure scrolling happens after DOM update
        requestAnimationFrame(() => {
            scrollToBottom();
        });
    }

    // Premium message rendering
    function renderMessage(messageId, fullText) {
        if (!fullText) return null;
        
        const safeText = typeof fullText === 'string' ? fullText : String(fullText || '');
        
        if (isMobile) {
            return startSimpleRender(messageId, safeText);
        } else {
            return startChunkedReveal(messageId, safeText);
        }
    }

    // Simple render for mobile
    function startSimpleRender(messageId, fullText) {
        const messageEl = document.getElementById(messageId);
        if (!messageEl) return;
        
        const textEl = messageEl.querySelector('.svorum-message-text');
        textEl.textContent = fullText;
        textEl.style.opacity = '0';
        
        setTimeout(() => {
            textEl.style.transition = `opacity ${FADE_IN_DURATION}ms ease-in`;
            textEl.style.opacity = '1';
        }, 50);
        
        return messageId;
    }

    // Chunked reveal for desktop
    function startChunkedReveal(messageId, fullText) {
        const messageEl = document.getElementById(messageId);
        if (!messageEl) return;
        
        const textEl = messageEl.querySelector('.svorum-message-text');
        let numberOfChunks = 1;
        
        if (fullText.length < 100) {
            numberOfChunks = 1;
        } else if (fullText.length < 300) {
            numberOfChunks = 2;
        } else {
            numberOfChunks = 3;
        }
        
        const chunkSize = Math.ceil(fullText.length / numberOfChunks);
        
        let currentChunk = 0;
        textEl.style.opacity = '0';
        
        const revealNextChunk = () => {
            if (currentChunk < numberOfChunks) {
                const charsToReveal = Math.min(
                    (currentChunk + 1) * chunkSize,
                    fullText.length
                );
                
                textEl.textContent = fullText.substring(0, charsToReveal);
                
                if (currentChunk === 0) {
                    textEl.style.transition = `opacity ${FADE_IN_DURATION}ms ease-in`;
                    textEl.style.opacity = '1';
                }
                
                currentChunk++;
                
                if (currentChunk < numberOfChunks) {
                    setTimeout(revealNextChunk, CHUNK_REVEAL_DELAY);
                } else {
                    // Final scroll after all chunks revealed
                    requestAnimationFrame(() => {
                        scrollToBottom();
                    });
                }
            }
        };
        
        setTimeout(revealNextChunk, 100);
        return messageId;
    }

    // Handle key press
    window.handleKeyPress = function(event) {
        if (event.key === 'Enter' && !isTyping) {
            sendMessage();
        }
    };

    // Send message
    window.sendMessage = async function() {
        const input = document.getElementById('svorum-input');
        const message = input.value.trim();
        
        if (!message || isTyping) return;
        
        // Add user message
        addMessage('user', message, true);
        input.value = '';
        
        // Show typing indicator inside the messages area
        isTyping = true;
        const typingIndicator = document.getElementById('svorum-typing');
        if (typingIndicator) {
            typingIndicator.style.display = 'flex';
            scrollToBottom();
        }
        
        try {
            const response = await fetch('https://svorumstrax-chatbot-api.vercel.app/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'user', content: message }
                    ],
                    sessionId: sessionId
                })
            });
            
            const data = await response.json();
            
            // Hide typing indicator
            const typingIndicator = document.getElementById('svorum-typing');
            if (typingIndicator) {
                typingIndicator.style.display = 'none';
            }
            isTyping = false;
            
            // Add bot response
            addMessage('bot', data.message);
            
        } catch (error) {
            console.error('Error:', error);
            const typingIndicator = document.getElementById('svorum-typing');
            if (typingIndicator) {
                typingIndicator.style.display = 'none';
            }
            isTyping = false;
            
            const errorMsg = 'Fyrirgefðu, eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.';
            addMessage('bot', errorMsg);
        }
    };

    // Scroll to bottom
    function scrollToBottom() {
        setTimeout(() => {
            const messagesContainer = document.getElementById('svorum-messages');
            if (messagesContainer) {
                const scrollHeight = messagesContainer.scrollHeight;
                const height = messagesContainer.clientHeight;
                const maxScrollTop = scrollHeight - height;
                messagesContainer.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
            }
        }, 100);
    }

    // Window resize listener
    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth;
    });

    // Initialize widget
    initializeSession();
    createWidget();
})();