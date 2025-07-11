
// Svörum strax Premium Chat Widget - Enhanced Version
(function() {
    'use strict';

    // Premium brand theme with Claude AI-inspired colors
    const theme = {
        colors: {
            primary: "#8B7355", // Warm taupe (replacing orange)
            secondary: "#A39A8D", // Lighter taupe
            gradient: "linear-gradient(135deg, rgba(139, 115, 85, 0.95) 0%, rgba(163, 154, 141, 0.85) 100%)", // Translucent taupe
            solidGradient: "linear-gradient(135deg, #8B7355 0%, #A39A8D 100%)", // Solid for buttons
            headerBg: "linear-gradient(135deg, #0A0E27 0%, #1B2735 100%)", // Keep dark header
            text: "#333333",
            background: "#FFFFFF",
            messageBg: "#F5F5F5",
            userMessage: "#8B7355", // Taupe for user messages
            botMessage: "#F0F0F0",
            lightAccent: "rgba(139, 115, 85, 0.1)",
            darkBg: "#1A1F2E",
            // Claude AI inspired colors
            iconBg: "linear-gradient(135deg, rgba(250, 247, 244, 0.95) 0%, rgba(245, 240, 234, 0.9) 100%)",
            iconColor: "#2D3748",
            inputBorder: "rgba(139, 115, 85, 0.3)",
            inputFocus: "rgba(139, 115, 85, 0.5)",
        },
        fonts: {
            body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
    };

    // Configuration for premium effects
    const CHUNK_REVEAL_DELAY = 250;
    const FADE_IN_DURATION = 300;
    const MOBILE_BREAKPOINT = 768;
    const PREVIEW_SHOW_DELAY = 3000;
    const PREVIEW_HIDE_DELAY = 10000;

    // Session management
    const SESSION_ID_KEY = "svorumChatSessionId";
    const SESSION_TIMEOUT = 30 * 60 * 1000;

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'svorum-premium-chat-widget';
    document.body.appendChild(widgetContainer);

    // Widget state
    let isMinimized = true;
    let showOptions = false;
    let messages = [];
    let inputValue = '';
    let isTyping = false;
    let sessionId = '';
    let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    let typingMessages = {};
    let previewShown = false;
    const isMobile = windowWidth <= MOBILE_BREAKPOINT;

    // Get current language
    function getCurrentLanguage() {
        return localStorage.getItem('language') || 'is';
    }

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

    // Function to position the preview bar dynamically
    function positionPreviewBar() {
        const previewBar = document.getElementById('svorum-preview-bar');
        if (!previewBar) return;
        
        const chatBubble = document.querySelector('.svorum-premium-bubble');
        
        if (chatBubble) {
            const rect = chatBubble.getBoundingClientRect();
            
            previewBar.style.position = 'fixed';
            previewBar.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
            previewBar.style.right = '20px';
            
            if (isMobile) {
                previewBar.style.right = '10px';
                previewBar.style.maxWidth = 'calc(100vw - 100px)';
            }
        } else {
            previewBar.style.position = 'fixed';
            previewBar.style.bottom = '90px';
            previewBar.style.right = '20px';
        }
    }

    // Create widget HTML with premium structure
    function createWidget() {
        const lang = getCurrentLanguage();
        const t = translations[lang];
        
        const html = `
            <div class="svorum-premium-container ${isMinimized ? 'minimized' : ''}">
                <!-- Preview bar -->
                <div class="svorum-preview-bar" id="svorum-preview-bar" onclick="toggleChat()">
                    <div class="svorum-preview-content">
                        <div class="svorum-preview-avatar">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#8B7355" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="8" cy="10" r="1" fill="#8B7355"/>
                                <circle cx="12" cy="10" r="1" fill="#8B7355"/>
                                <circle cx="16" cy="10" r="1" fill="#8B7355"/>
                            </svg>
                        </div>
                        <span class="svorum-preview-text">${t.preview}</span>
                        <button class="svorum-preview-close" onclick="hidePreview(event)">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <div class="svorum-preview-pointer"></div>
                    <div class="svorum-preview-pointer-border"></div>
                </div>

                <!-- Minimized state - Premium circular button -->
                <div class="svorum-premium-bubble" onclick="toggleChat()">
                    <div class="svorum-premium-ring">
                        <div class="svorum-premium-avatar">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28 20a2.67 2.67 0 0 1-2.67 2.67H9.33L4 28V6.67A2.67 2.67 0 0 1 6.67 4h18.66A2.67 2.67 0 0 1 28 6.67V20z" fill="#2D3748"/>
                                <circle cx="10.67" cy="13.33" r="1.33" fill="white"/>
                                <circle cx="16" cy="13.33" r="1.33" fill="white"/>
                                <circle cx="21.33" cy="13.33" r="1.33" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Expanded state - Premium chat window -->
                <div class="svorum-premium-window">
                    <!-- Premium header -->
                    <div class="svorum-premium-header" onclick="toggleChat()">
                        <div class="svorum-premium-header-content">
                            <div class="svorum-premium-header-avatar">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="40" height="40" rx="20" fill="white" fill-opacity="0.95"/>
                                    <path d="M30 23.33a2 2 0 0 1-2 2H14l-4 4V11.33a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12z" fill="#8B7355"/>
                                    <circle cx="16" cy="17.33" r="1" fill="white"/>
                                    <circle cx="20" cy="17.33" r="1" fill="white"/>
                                    <circle cx="24" cy="17.33" r="1" fill="white"/>
                                </svg>
                            </div>
                            <div class="svorum-premium-header-info">
                                <div class="svorum-premium-title">${t.title}</div>
                                <div class="svorum-premium-subtitle">${t.subtitle}</div>
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
                        <div class="svorum-premium-chat-area" style="display: flex; flex-direction: column; flex: 1; min-height: 0;">
                            <div class="svorum-premium-messages" id="svorum-messages">
                                <!-- Messages will be inserted here -->
                            </div>

                            <!-- Typing indicator -->
                            <div class="svorum-premium-typing" id="svorum-typing" style="display: none;">
                                <div class="svorum-typing-avatar">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24.5 17.5a1.75 1.75 0 0 1-1.75 1.75H8.75L5.25 22.75V7a1.75 1.75 0 0 1 1.75-1.75h15.75A1.75 1.75 0 0 1 24.5 7v10.5z" fill="#8B7355"/>
                                        <circle cx="10.5" cy="12.25" r="0.875" fill="white"/>
                                        <circle cx="14" cy="12.25" r="0.875" fill="white"/>
                                        <circle cx="17.5" cy="12.25" r="0.875" fill="white"/>
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

                    <!-- Input area -->
                    <div class="svorum-premium-input-container" style="display: flex;">
                        <input 
                            type="text" 
                            class="svorum-premium-input" 
                            id="svorum-input"
                            placeholder="${t.placeholder}"
                            onkeypress="handleKeyPress(event)"
                        >
                        <button class="svorum-premium-send" onclick="sendMessage()">
                            <span>${t.send}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        widgetContainer.innerHTML = html;

        // Position preview bar after widget is created
        setTimeout(() => {
            positionPreviewBar();
            
            // Show preview bar after delay
            if (isMinimized && !previewShown) {
                showPreview();
            }
        }, 100);
    }

    // Show preview bar
    function showPreview() {
        const previewBar = document.getElementById('svorum-preview-bar');
        if (previewBar && isMinimized) {
            positionPreviewBar();
            
            previewBar.classList.add('show');
            previewShown = true;
            
            // Auto-hide after delay
            setTimeout(() => {
                if (isMinimized) {
                    hidePreview();
                }
            }, PREVIEW_HIDE_DELAY);
        }
    }

    // Hide preview bar
    window.hidePreview = function(event) {
        if (event) {
            event.stopPropagation();
        }
        const previewBar = document.getElementById('svorum-preview-bar');
        if (previewBar) {
            previewBar.classList.remove('show');
        }
    };

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

    // Toggle chat window - Made more responsive
    window.toggleChat = function() {
        isMinimized = !isMinimized;
        const container = document.querySelector('.svorum-premium-container');
        
        if (isMinimized) {
            container.classList.add('minimized');
        } else {
            container.classList.remove('minimized');
        }
        
        // Hide preview when chat opens
        if (!isMinimized) {
            hidePreview();
            if (messages.length === 0) {
                showWelcomeMessage();
            }
            // Focus input on desktop
            if (!isMobile) {
                setTimeout(() => {
                    const input = document.getElementById('svorum-input');
                    if (input) input.focus();
                }, 100);
            }
        } else {
            // Show preview again after delay when minimized
            setTimeout(() => {
                if (isMinimized) {
                    showPreview();
                }
            }, PREVIEW_SHOW_DELAY);
        }
    };

    // Show welcome message
    function showWelcomeMessage() {
        const lang = getCurrentLanguage();
        const welcomeMsg = translations[lang].welcome;
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
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.5 17.5a1.75 1.75 0 0 1-1.75 1.75H8.75L5.25 22.75V7a1.75 1.75 0 0 1 1.75-1.75h15.75A1.75 1.75 0 0 1 24.5 7v10.5z" fill="#8B7355"/>
                            <circle cx="10.5" cy="12.25" r="0.875" fill="white"/>
                            <circle cx="14" cy="12.25" r="0.875" fill="white"/>
                            <circle cx="17.5" cy="12.25" r="0.875" fill="white"/>
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
        
        // Show typing indicator
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
            
            const lang = getCurrentLanguage();
            const errorMsg = translations[lang].error;
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
        positionPreviewBar();
    });

    // Update widget when language changes
    window.addEventListener('languageChanged', function() {
        updateWidgetLanguage();
    });

    // Also listen for storage events for cross-tab language sync
    window.addEventListener('storage', function(e) {
        if (e.key === 'language') {
            updateWidgetLanguage();
        }
    });

    // Function to update all widget text
    function updateWidgetLanguage() {
        const lang = getCurrentLanguage();
        const t = translations[lang];
        
        // Update input placeholder
        const input = document.getElementById('svorum-input');
        if (input) input.placeholder = t.placeholder;
        
        // Update send button
        const sendBtn = document.querySelector('.svorum-premium-send span');
        if (sendBtn) sendBtn.textContent = t.send;
        
        // Update title
        const title = document.querySelector('.svorum-premium-title');
        if (title) title.textContent = t.title;
        
        // Update preview text
        const previewText = document.querySelector('.svorum-preview-text');
        if (previewText) previewText.textContent = t.preview;
        
        // Update welcome message if it exists
        if (messages.length > 0 && messages[0].type === 'bot') {
            const isWelcomeIS = messages[0].content === translations.is.welcome;
            const isWelcomeEN = messages[0].content === translations.en.welcome;
            
            if (isWelcomeIS || isWelcomeEN) {
                messages[0].content = t.welcome;
                
                const firstMessageEl = document.querySelector('.svorum-message-bot .svorum-message-text');
                if (firstMessageEl) {
                    firstMessageEl.textContent = t.welcome;
                }
            }
        }
    }

    // Initialize widget
    initializeSession();
    createWidget();

    // Check for language changes periodically (fallback)
    let lastLang = getCurrentLanguage();
    setInterval(() => {
        const currentLang = getCurrentLanguage();
        if (currentLang !== lastLang) {
            lastLang = currentLang;
            updateWidgetLanguage();
        }
    }, 500);
})();