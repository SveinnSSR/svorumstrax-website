// Svörum strax Premium Chat Widget - Enhanced Version with RE-style Animation
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

    // Create and style container with RE-style inline dimensions
    function createContainer() {
        const container = document.createElement('div');
        container.className = 'svorum-premium-container';
        container.id = 'svorum-container';
        
        // Apply RE-style inline styles
        updateContainerStyle(container);
        
        return container;
    }

    // Update container style based on state (RE-style)
    function updateContainerStyle(container) {
        const styles = {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: isMinimized ? (windowWidth <= 768 ? '60px' : '70px') : (windowWidth <= 768 ? '100vw' : '400px'),
            height: isMinimized ? (windowWidth <= 768 ? '60px' : '70px') : (windowWidth <= 768 ? '85vh' : '600px'),
            maxHeight: isMinimized ? 'auto' : 'calc(100vh - 40px)',
            backgroundColor: isMinimized ? 'rgba(74, 161, 158, 0.95)' : 'transparent',
            borderRadius: isMinimized ? '50%' : (windowWidth <= 768 ? '20px 20px 0 0' : '24px'),
            boxShadow: isMinimized ? '0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 255, 255, 0.1)' : 'none',
            overflow: 'hidden',
            transformOrigin: 'bottom right',
            transition: 'all 0.3s ease',
            backdropFilter: isMinimized ? 'blur(8px)' : 'none',
            zIndex: '9999',
            maxWidth: isMinimized ? 'auto' : (windowWidth <= 768 ? '100vw' : '90vw'),
            fontFamily: theme.fonts.body
        };

        // Apply styles to container
        Object.assign(container.style, styles);
    }

    // Create widget content
    function createWidgetContent() {
        const lang = getCurrentLanguage();
        const t = translations[lang];
        
        return `
            <!-- Header - Click anywhere to toggle -->
            <div 
                class="svorum-header-clickable"
                onclick="toggleChat()"
                style="
                    padding: ${isMinimized ? '0' : '20px 16px'};
                    display: flex;
                    align-items: center;
                    justify-content: ${isMinimized ? 'center' : 'flex-start'};
                    cursor: pointer;
                    gap: 12px;
                    background: ${isMinimized ? 'transparent' : 'rgba(74, 161, 158, 1)'};
                    width: 100%;
                    height: ${isMinimized ? '100%' : 'auto'};
                    box-sizing: border-box;
                    flex-direction: ${isMinimized ? 'row' : 'column'};
                    box-shadow: ${isMinimized ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
                "
            >
                <div style="
                    position: relative;
                    height: ${isMinimized ? (windowWidth <= 768 ? '40px' : '50px') : '60px'};
                    width: ${isMinimized ? (windowWidth <= 768 ? '40px' : '50px') : '60px'};
                    border-radius: 50%;
                    background: ${isMinimized ? 'transparent' : 'white'};
                    padding: ${isMinimized ? '0' : '8px'};
                    box-shadow: ${isMinimized ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <svg width="${isMinimized ? (windowWidth <= 768 ? '40' : '50') : '44'}" height="${isMinimized ? (windowWidth <= 768 ? '40' : '50') : '44'}" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37 26.4a3.3 3.3 0 0 1-3.3 3.3H14.7L8.8 35.2V11a3.3 3.3 0 0 1 3.3-3.3h21.6A3.3 3.3 0 0 1 37 11v15.4z" fill="${isMinimized ? 'white' : '#8B7355'}"/>
                        <circle cx="18.7" cy="18.7" r="1.65" fill="${isMinimized ? '#8B7355' : 'white'}"/>
                        <circle cx="22" cy="18.7" r="1.65" fill="${isMinimized ? '#8B7355' : 'white'}"/>
                        <circle cx="25.3" cy="18.7" r="1.65" fill="${isMinimized ? '#8B7355' : 'white'}"/>
                    </svg>
                </div>
                
                ${!isMinimized ? `
                    <div style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 4px;
                    ">
                        <span style="
                            color: white;
                            font-size: 16px;
                            font-weight: 500;
                            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                        ">
                            ${t.title}
                        </span>
                        <span style="
                            color: #e0e0e0;
                            font-size: 14px;
                            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                        ">
                            ${t.subtitle}
                        </span>
                    </div>
                ` : ''}
                
                ${!isMinimized ? `
                    <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        style="
                            color: white;
                            position: absolute;
                            right: 16px;
                            top: 16px;
                        "
                    >
                        <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                ` : ''}
            </div>

            ${!isMinimized ? `
                <!-- Chat area -->
                <div style="
                    height: 400px;
                    background: white;
                    overflow-y: auto;
                    padding: 16px;
                ">
                    <div id="svorum-messages">
                        <!-- Messages will be inserted here -->
                    </div>
                    
                    <!-- Typing indicator -->
                    <div id="svorum-typing" style="display: none; margin-top: 16px;">
                        <div style="
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        ">
                            <div style="
                                width: 32px;
                                height: 32px;
                                border-radius: 50%;
                                background: #8B7355;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            ">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M17.5 12.5a1.25 1.25 0 0 1-1.25 1.25H6.25L3.75 16.25V5a1.25 1.25 0 0 1 1.25-1.25h11.25A1.25 1.25 0 0 1 17.5 5v7.5z" fill="white"/>
                                    <circle cx="7.5" cy="8.75" r="0.625" fill="#8B7355"/>
                                    <circle cx="10" cy="8.75" r="0.625" fill="#8B7355"/>
                                    <circle cx="12.5" cy="8.75" r="0.625" fill="#8B7355"/>
                                </svg>
                            </div>
                            <div style="
                                display: flex;
                                align-items: center;
                                gap: 4px;
                                padding: 8px 12px;
                                background: #f0f0f0;
                                border-radius: 16px;
                            ">
                                <span style="
                                    width: 6px;
                                    height: 6px;
                                    background: #8B7355;
                                    border-radius: 50%;
                                    animation: typing 1.4s infinite;
                                "></span>
                                <span style="
                                    width: 6px;
                                    height: 6px;
                                    background: #8B7355;
                                    border-radius: 50%;
                                    animation: typing 1.4s infinite;
                                    animation-delay: 0.2s;
                                "></span>
                                <span style="
                                    width: 6px;
                                    height: 6px;
                                    background: #8B7355;
                                    border-radius: 50%;
                                    animation: typing 1.4s infinite;
                                    animation-delay: 0.4s;
                                "></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Input area -->
                <div style="
                    padding: 12px 16px;
                    background: white;
                    border-top: 1px solid #eee;
                    display: flex;
                    gap: 8px;
                ">
                    <input
                        type="text"
                        id="svorum-input"
                        placeholder="${t.placeholder}"
                        onkeypress="handleKeyPress(event)"
                        style="
                            flex: 1;
                            padding: 8px 16px;
                            border-radius: 20px;
                            border: 1px solid rgba(139, 115, 85, 0.3);
                            outline: none;
                            font-size: 14px;
                            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                        "
                    />
                    <button
                        onclick="sendMessage()"
                        style="
                            background: linear-gradient(135deg, #8B7355 0%, #A39A8D 100%);
                            color: white;
                            border: none;
                            padding: 8px 20px;
                            border-radius: 20px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            transition: all 0.3s ease;
                        "
                    >
                        ${t.send}
                    </button>
                </div>
            ` : ''}

            <!-- Styles -->
            <style>
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
            </style>
        `;
    }

    // Create widget HTML with RE-style approach
    function createWidget() {
        const container = createContainer();
        container.innerHTML = createWidgetContent();
        widgetContainer.innerHTML = '';
        widgetContainer.appendChild(container);
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

    // Toggle chat window - RE-style with dimension changes
    window.toggleChat = function() {
        isMinimized = !isMinimized;
        
        // Recreate widget with new state (like RE does)
        createWidget();
        
        if (!isMinimized) {
            if (messages.length === 0) {
                showWelcomeMessage();
            } else {
                // Re-render existing messages
                renderExistingMessages();
            }
            
            // Focus input on desktop
            if (!isMobile) {
                setTimeout(() => {
                    const input = document.getElementById('svorum-input');
                    if (input) input.focus();
                }, 100);
            }
        }
    };

    // Re-render existing messages
    function renderExistingMessages() {
        const messagesContainer = document.getElementById('svorum-messages');
        if (!messagesContainer) return;
        
        messagesContainer.innerHTML = '';
        
        messages.forEach(message => {
            addMessageToDOM(message.type, message.content, true);
        });
        
        scrollToBottom();
    }

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
        
        addMessageToDOM(type, content, skipEffect);
    }

    // Add message to DOM
    function addMessageToDOM(type, content, skipEffect = false) {
        const messagesContainer = document.getElementById('svorum-messages');
        if (!messagesContainer) return;
        
        const messageEl = document.createElement('div');
        messageEl.style.cssText = `
            display: flex;
            justify-content: ${type === 'user' ? 'flex-end' : 'flex-start'};
            margin-bottom: 16px;
            align-items: flex-start;
            gap: 8px;
        `;
        
        if (type === 'bot') {
            messageEl.innerHTML = `
                <div style="
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #8B7355;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                ">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M17.5 12.5a1.25 1.25 0 0 1-1.25 1.25H6.25L3.75 16.25V5a1.25 1.25 0 0 1 1.25-1.25h11.25A1.25 1.25 0 0 1 17.5 5v7.5z" fill="white"/>
                        <circle cx="7.5" cy="8.75" r="0.625" fill="#8B7355"/>
                        <circle cx="10" cy="8.75" r="0.625" fill="#8B7355"/>
                        <circle cx="12.5" cy="8.75" r="0.625" fill="#8B7355"/>
                    </svg>
                </div>
                <div style="
                    max-width: 70%;
                    padding: 12px 16px;
                    border-radius: 16px;
                    background: #f0f0f0;
                    color: #333333;
                    font-size: 14px;
                    line-height: 1.5;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                " class="message-content">
                    ${content}
                </div>
            `;
        } else {
            messageEl.innerHTML = `
                <div style="
                    max-width: 70%;
                    padding: 12px 16px;
                    border-radius: 16px;
                    background: linear-gradient(135deg, #8B7355 0%, #A39A8D 100%);
                    color: white;
                    font-size: 14px;
                    line-height: 1.5;
                    box-shadow: 0 2px 8px rgba(139, 115, 85, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                ">
                    ${content}
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageEl);
        
        if (type === 'bot' && !skipEffect) {
            renderMessage(messageEl, content);
        }
        
        // Ensure scrolling happens after DOM update
        requestAnimationFrame(() => {
            scrollToBottom();
        });
    }

    // Premium message rendering
    function renderMessage(messageEl, fullText) {
        if (!fullText) return;
        
        const contentEl = messageEl.querySelector('.message-content');
        if (!contentEl) return;
        
        const safeText = typeof fullText === 'string' ? fullText : String(fullText || '');
        
        if (isMobile) {
            startSimpleRender(contentEl, safeText);
        } else {
            startChunkedReveal(contentEl, safeText);
        }
    }

    // Simple render for mobile
    function startSimpleRender(contentEl, fullText) {
        contentEl.textContent = fullText;
        contentEl.style.opacity = '0';
        
        setTimeout(() => {
            contentEl.style.transition = `opacity ${FADE_IN_DURATION}ms ease-in`;
            contentEl.style.opacity = '1';
        }, 50);
    }

    // Chunked reveal for desktop
    function startChunkedReveal(contentEl, fullText) {
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
        contentEl.style.opacity = '0';
        
        const revealNextChunk = () => {
            if (currentChunk < numberOfChunks) {
                const charsToReveal = Math.min(
                    (currentChunk + 1) * chunkSize,
                    fullText.length
                );
                
                contentEl.textContent = fullText.substring(0, charsToReveal);
                
                if (currentChunk === 0) {
                    contentEl.style.transition = `opacity ${FADE_IN_DURATION}ms ease-in`;
                    contentEl.style.opacity = '1';
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
        if (!input) return;
        
        const message = input.value.trim();
        
        if (!message || isTyping) return;
        
        // Add user message
        addMessage('user', message, true);
        input.value = '';
        
        // Show typing indicator
        isTyping = true;
        const typingIndicator = document.getElementById('svorum-typing');
        if (typingIndicator) {
            typingIndicator.style.display = 'block';
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
        const newWindowWidth = window.innerWidth;
        if (newWindowWidth !== windowWidth) {
            windowWidth = newWindowWidth;
            
            // Update container dimensions on resize
            const container = document.getElementById('svorum-container');
            if (container) {
                updateContainerStyle(container);
                // Recreate content with new dimensions
                container.innerHTML = createWidgetContent();
                
                if (!isMinimized && messages.length > 0) {
                    renderExistingMessages();
                }
            }
        }
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
        // Recreate widget with new language
        createWidget();
        
        if (!isMinimized && messages.length > 0) {
            renderExistingMessages();
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