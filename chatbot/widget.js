// Svörum strax Premium Chat Widget - Matching Sky Lagoon/ELKO Brand Standards
(function() {
    'use strict';

    // Premium brand theme with sophisticated navy/purple
    const theme = {
        colors: {
            primary: "#1A2B4D", // Deep sophisticated navy
            secondary: "#7C4DFF", // Modern purple accent
            headerBg: "linear-gradient(135deg, #1A2B4D 0%, #2C3E66 100%)", // Premium gradient
            text: "#333333",
            background: "#FFFFFF",
            messageBg: "#F5F5F5",
            userMessage: "#1A2B4D",
            botMessage: "#F0F0F0",
            lightAccent: "rgba(124, 77, 255, 0.1)",
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

    // Widget state
    let isMinimized = true;
    let showOptions = true;
    let messages = [];
    let inputValue = '';
    let isTyping = false;
    let sessionId = '';
    let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    let typingMessages = {};
    const isMobile = windowWidth <= MOBILE_BREAKPOINT;

    // Create widget HTML with Sky Lagoon/ELKO structure
    function createWidget() {
        const html = `
            <div class="svorum-premium-container ${isMinimized ? 'minimized' : ''}">
                <!-- Minimized state - Premium circular button with ring -->
                <div class="svorum-premium-bubble" onclick="toggleChat()">
                    <div class="svorum-premium-ring-outer"></div>
                    <div class="svorum-premium-ring">
                        <div class="svorum-premium-avatar">
                            <div class="svorum-logo-circle">S</div>
                        </div>
                    </div>
                </div>

                <!-- Expanded state - Premium chat window -->
                <div class="svorum-premium-window">
                    <!-- Premium header with large clickable area -->
                    <div class="svorum-premium-header" onclick="toggleChat()">
                        <div class="svorum-premium-header-content">
                            <div class="svorum-premium-header-avatar">
                                <div class="svorum-logo-circle">S</div>
                            </div>
                            <div class="svorum-premium-header-info">
                                <div class="svorum-premium-title">Svörum strax</div>
                                <div class="svorum-premium-subtitle">AI Þjónusturáðgjafi</div>
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
                        <!-- Options screen -->
                        <div class="svorum-premium-options" style="display: ${showOptions ? 'block' : 'none'};">
                            <h2>Hvernig getum við aðstoðað?</h2>
                            
                            <div class="svorum-option-button disabled">
                                <div class="option-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                        <circle cx="12" cy="13" r="4"></circle>
                                    </svg>
                                </div>
                                <div class="option-content">
                                    <div class="option-title">Sölufulltrúi</div>
                                    <div class="option-desc">Talaðu við sölufulltrúa í gegnum myndspjall</div>
                                </div>
                            </div>

                            <div class="svorum-option-button active" onclick="handleAIClick()">
                                <div class="option-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        <circle cx="9" cy="10" r="1" fill="currentColor"></circle>
                                        <circle cx="12" cy="10" r="1" fill="currentColor"></circle>
                                        <circle cx="15" cy="10" r="1" fill="currentColor"></circle>
                                    </svg>
                                </div>
                                <div class="option-content">
                                    <div class="option-title">AI Aðstoð</div>
                                    <div class="option-desc">Spjallaðu við gervigreind sem svarar samstundis</div>
                                </div>
                            </div>

                            <div class="svorum-option-button disabled">
                                <div class="option-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                    </svg>
                                </div>
                                <div class="option-content">
                                    <div class="option-title">Mannleg þjónusta</div>
                                    <div class="option-desc">Talaðu við þjónustufulltrúa</div>
                                </div>
                            </div>

                            <div class="svorum-premium-footer">
                                Opnunartími þjónustuvers: 9-17 alla virka daga
                            </div>
                        </div>

                        <!-- Chat messages area -->
                        <div class="svorum-premium-messages" id="svorum-messages" style="display: ${showOptions ? 'none' : 'flex'};">
                            <!-- Messages will be inserted here -->
                        </div>

                        <!-- Typing indicator -->
                        <div class="svorum-premium-typing" id="svorum-typing" style="display: none;">
                            <div class="svorum-typing-avatar">
                                <div class="svorum-logo-circle-small">S</div>
                            </div>
                            <div class="svorum-typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>

                    <!-- Input area -->
                    <div class="svorum-premium-input-container" style="display: ${showOptions ? 'none' : 'flex'};">
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
        
        if (!isMinimized && messages.length === 0 && !showOptions) {
            showWelcomeMessage();
        }
    };

    // Handle AI option click
    window.handleAIClick = function() {
        showOptions = false;
        document.querySelector('.svorum-premium-options').style.display = 'none';
        document.querySelector('.svorum-premium-messages').style.display = 'flex';
        document.querySelector('.svorum-premium-input-container').style.display = 'flex';
        
        showWelcomeMessage();
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
                        <div class="svorum-logo-circle-small">S</div>
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
        
        scrollToBottom();
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
                }
                
                scrollToBottom();
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
        document.getElementById('svorum-typing').style.display = 'flex';
        
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
            document.getElementById('svorum-typing').style.display = 'none';
            isTyping = false;
            
            // Add bot response
            addMessage('bot', data.message);
            
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('svorum-typing').style.display = 'none';
            isTyping = false;
            
            const errorMsg = 'Fyrirgefðu, eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.';
            addMessage('bot', errorMsg);
        }
    };

    // Scroll to bottom
    function scrollToBottom() {
        const messagesContainer = document.getElementById('svorum-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Window resize listener
    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth;
    });

    // Initialize widget
    initializeSession();
    createWidget();
})();