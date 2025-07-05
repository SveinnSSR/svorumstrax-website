// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 14, 39, 0.95)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(10, 14, 39, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards
document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .choice-card, .benefit-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Simulate typing effect in chat
let typingMessage = document.querySelector('.typing-indicator');
if (typingMessage) {
    setTimeout(() => {
        typingMessage.style.display = 'none';
        
        // Add a new message after typing
        const newMessage = document.createElement('div');
        newMessage.className = 'message ai-message';
        
        // Get current language
        const currentLang = localStorage.getItem('language') || 'is';
        
        if (currentLang === 'is') {
            newMessage.textContent = 'Viltu bóka fund til að fræðast meira? Ég get hjálpað þér með það.';
        } else {
            newMessage.textContent = 'Would you like to book a meeting to learn more? I can help you with that.';
        }
        
        newMessage.style.animation = 'slideIn 0.3s ease';
        typingMessage.parentElement.appendChild(newMessage);
    }, 3000);
}

// Dynamic chat messages
const chatMessagesIS = [
    { type: 'user', text: 'Getið þið séð um alla okkar símsvörun?' },
    { type: 'ai', text: 'Já, við sérhæfum okkur í símsvörun - allt frá almennri ritaraþjónustu til fullþjálfaðra sérfræðinga. Svörum í nafni fyrirtækisins, tökum skilaboð og sendum á réttan starfsmann.' },
    { type: 'user', text: 'En hvað með úthringingar og sölu?' },
    { type: 'ai', text: 'Við erum með reynd söluteymi fyrir bæði B2B og B2C markaði. Notum nýjustu CRM kerfi og AI greiningu til að hámarka árangur. Getum líka leigt ykkur sérhæfða starfsmenn (stöðugildi) eingöngu fyrir ykkar þarfir.' },
    { type: 'user', text: 'Hvernig nýtist AI í þessu öllu?' },
    { type: 'ai', text: 'AI greinir öll samskipti, finnur sölutækifæri og veitir rekstrarinnsýn í rauntíma. Þú ræður hvort AI eða manneskja svarar - við bjóðum heildarlausn sem hentar þínum þörfum.' }
];

const chatMessagesEN = [
    { type: 'user', text: 'Can you handle all our phone support?' },
    { type: 'ai', text: 'Absolutely! We specialize in full-service phone support—from general call answering to dedicated brand specialists. We answer in your company\'s name, take detailed messages, and route calls seamlessly to your team.' },
    { type: 'user', text: 'What about outbound sales calls?' },
    { type: 'ai', text: 'Yes! Our expert B2B/B2C sales teams use AI-powered CRM tools to maximize conversions. Need a dedicated agent? We also offer exclusive FTE rentals tailored to your business.' },
    { type: 'user', text: 'How does AI enhance your service?' },
    { type: 'ai', text: 'Our AI analyzes every interaction in real-time, uncovering sales opportunities and providing actionable insights. Choose AI for instant responses or human experts for complex issues—or let our smart hybrid system adapt dynamically to your needs.' }
];

let messageIndex = 0;
const chatContainer = document.querySelector('.chat-messages');

// Clear existing interval if any
let chatInterval;

function startChatAnimation() {
    // Clear any existing interval
    if (chatInterval) {
        clearInterval(chatInterval);
    }
    
    // Reset message index
    messageIndex = 0;
    
    chatInterval = setInterval(() => {
        // Get current language
        const currentLang = localStorage.getItem('language') || 'is';
        const chatMessages = currentLang === 'is' ? chatMessagesIS : chatMessagesEN;
        
        // Remove typing indicator if exists
        const typing = chatContainer.querySelector('.typing-indicator');
        if (typing) typing.remove();

        if (messageIndex < chatMessages.length) {
            const newMessage = document.createElement('div');
            newMessage.className = `message ${chatMessages[messageIndex].type}-message`;
            newMessage.textContent = chatMessages[messageIndex].text;
            newMessage.style.animation = 'slideIn 0.3s ease';
            
            // Remove oldest messages if too many
            if (chatContainer.children.length >= 4) {
                chatContainer.removeChild(chatContainer.firstChild);
            }
            
            chatContainer.appendChild(newMessage);
            messageIndex++;
            
            // Add typing indicator after user message
            if (chatMessages[messageIndex - 1].type === 'user' && messageIndex < chatMessages.length) {
                setTimeout(() => {
                    const typingDiv = document.createElement('div');
                    typingDiv.className = 'message ai-message typing-indicator';
                    typingDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
                    chatContainer.appendChild(typingDiv);
                }, 500);
            }
        } else {
            messageIndex = 0;
        }
    }, 5000);
}

// Start chat animation on page load
if (chatContainer) {
    startChatAnimation();
}

// Restart chat animation when language changes
window.addEventListener('languageChanged', function() {
    if (chatContainer) {
        // Clear all messages except the first three (static messages)
        while (chatContainer.children.length > 3) {
            chatContainer.removeChild(chatContainer.lastChild);
        }
        startChatAnimation();
    }
});