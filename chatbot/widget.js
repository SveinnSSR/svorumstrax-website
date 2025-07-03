// Svörum strax Premium Chat Widget
(function() {
    'use strict';

    // Configuration
    const TYPING_SPEED = 20;
    const CHUNK_REVEAL_DELAY = 250;
    const FADE_IN_DURATION = 300;
    const API_URL = 'https://svorumstrax-chatbot-api.vercel.app/api/';

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'svorum-chat-widget';
    document.body.appendChild(widgetContainer);

    // Widget state
    let isMinimized = true;
    let messages = [];
    let isTyping = false;
    let typingMessages = {};
    let currentLanguage = document.documentElement.lang === 'is' ? 'is' : 'en';

    // Create widget HTML
    function createWidget() {
        const html = `
            <div class="svorum-chat-container ${isMinimized ? 'minimized' : ''}">
                <!-- Minimized state - circular button with ring -->
                <div class="svorum-chat-bubble" onclick="toggleChat()">
                    <div class="svorum-chat-ring">
                        <div class="svorum-chat-ring-outer"></div>
                        <div class="svorum-chat-ring-inner">
                            <svg class="svorum-logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="svorum-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#FF6B35" />
                                        <stop offset="100%" style="stop-color:#F7931E" />
                                    </linearGradient>
                                </defs>
                                <text x="50" y="65" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="800" fill="white">S</text>
                            </svg>
                        </div>
                        <div class="svorum-chat-pulse"></div>
                    </div>
                </div>

                <!-- Expanded state -->
                <div class="svorum-chat-window">
                    <!-- Header -->
                    <div class="svorum-chat-header" onclick="toggleChat()">
                        <div class="svorum-chat-header-content">
                            <div class="svorum-chat-avatar">
                                <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="30" cy="30" r="30" fill="url(#svorum-gradient)"/>
                                    <text x="30" y="40" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="800" fill="white">S</text>
                                </svg>
                            </div>
                            <div class="svorum-chat-header-text">
                                <div class="svorum-chat-title">Svörum strax</div>
                                <div class="svorum-chat-subtitle">AI Þjónusturáðgjafi</div>
                            </div>
                            <div class="svorum-chat-status">
                                <span class="svorum-status-dot"></span>
                                <span class="svorum-status-text">Virk</span>
                            </div>
                        </div>
                        <div class="svorum-chat-minimize">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>

                    <!-- Messages area -->
                    <div class="svorum-chat-messages" id="svorum-messages">
                        <!-- Messages will be inserted here -->
                    </div>

                    <!-- Typing indicator -->
                    <div class="svorum-typing-indicator" id="svorum-typing" style="display: none;">
                        <div class="svorum-typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <!-- Input area -->
                    <div class="svorum-chat-input-container">
                        <input 
                            type="text" 
                            class="svorum-chat-input" 
                            id="svorum-input"
                            placeholder="${currentLanguage === 'is' ? 'Skrifaðu skilaboð...' : 'Type your message...'}"
                            onkeypress="handleKeyPress(event)"
                        >
                        <button class="svorum-chat-send" onclick="sendMessage()">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        widgetContainer.innerHTML = html;
    }

    // Toggle chat window
    window.toggleChat = function() {
        isMinimized = !isMinimized;
        const container = document.querySelector('.svorum-chat-container');
        container.classList.toggle('minimized');
        
        if (!isMinimized && messages.length === 0) {
            showWelcomeMessage();
        }
    };

    // Show welcome message
    function showWelcomeMessage() {
        const welcomeMsg = currentLanguage === 'is' 
            ? "Halló! Ég er AI þjónusturáðgjafi Svörum strax. Hvernig get ég aðstoðað þig í dag?"
            : "Hello! I'm the Svörum strax AI service advisor. How can I help you today?";
        
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
                <div class="svorum-message-avatar">
                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill="url(#svorum-gradient)"/>
                        <text x="20" y="28" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="white">S</text>
                    </svg>
                </div>
                <div class="svorum-message-content">
                    <div class="svorum-message-bubble">
                        <span class="svorum-message-text"></span>
                    </div>
                </div>
            `;
        } else {
            messageEl.innerHTML = `
                <div class="svorum-message-content">
                    <div class="svorum-message-bubble">
                        <span class="svorum-message-text">${content}</span>
                    </div>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageEl);
        
        if (type === 'bot' && !skipEffect) {
            startChunkReveal(messageId, content);
        }
        
        scrollToBottom();
    }

    // Premium chunk reveal effect
    function startChunkReveal(messageId, fullText) {
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
        typingMessages[messageId] = {
            text: fullText,
            visibleChars: 0,
            currentChunk: 0,
            totalChunks: numberOfChunks
        };
        
        // Add fade-in effect
        messageEl.style.opacity = '0';
        messageEl.style.animation = 'svorumFadeIn 0.3s ease forwards';
        
        let currentChunk = 0;
        
        const revealNextChunk = () => {
            if (currentChunk < numberOfChunks) {
                const charsToReveal = Math.min(
                    (currentChunk + 1) * chunkSize,
                    fullText.length
                );
                
                typingMessages[messageId].visibleChars = charsToReveal;
                textEl.textContent = fullText.substring(0, charsToReveal);
                
                currentChunk++;
                
                if (currentChunk < numberOfChunks) {
                    setTimeout(revealNextChunk, CHUNK_REVEAL_DELAY);
                } else {
                    delete typingMessages[messageId];
                }
                
                scrollToBottom();
            }
        };
        
        setTimeout(revealNextChunk, 100);
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
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'user', content: message }
                    ]
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
            
            const errorMsg = currentLanguage === 'is' 
                ? 'Fyrirgefðu, eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.'
                : 'Sorry, something went wrong. Please try again.';
            
            addMessage('bot', errorMsg);
        }
    };

    // Scroll to bottom
    function scrollToBottom() {
        const messagesContainer = document.getElementById('svorum-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Initialize widget
    createWidget();
    
    // Listen for language changes
    window.addEventListener('languagechange', function() {
        currentLanguage = document.documentElement.lang === 'is' ? 'is' : 'en';
        document.getElementById('svorum-input').placeholder = 
            currentLanguage === 'is' ? 'Skrifaðu skilaboð...' : 'Type your message...';
    });
})();
