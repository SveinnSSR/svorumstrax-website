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
        newMessage.textContent = 'Viltu bóka fund til að fræðast meira? Ég get hjálpað þér með það.';
        newMessage.style.animation = 'slideIn 0.3s ease';
        typingMessage.parentElement.appendChild(newMessage);
    }, 3000);
}

// Dynamic chat messages
const chatMessages = [
    { type: 'user', text: 'Getið þið séð um alla okkar símsvörun?' },
    { type: 'ai', text: 'Já, við sérhæfum okkur í símsvörun - allt frá almennri ritaraþjónustu til fullþjálfaðra sérfræðinga. Svörum í nafni fyrirtækisins, tökum skilaboð og sendum á réttan starfsmann.' },
    { type: 'user', text: 'En hvað með úthringingar og sölu?' },
    { type: 'ai', text: 'Við erum með reynd söluteymi fyrir bæði B2B og B2C markaði. Notum nýjustu CRM kerfi og AI greiningu til að hámarka árangur. Getum líka leigt ykkur sérhæfða starfsmenn (stöðugildi) eingöngu fyrir ykkar þarfir.' },
    { type: 'user', text: 'Hvernig nýtist AI í þessu öllu?' },
    { type: 'ai', text: 'AI greinir öll samskipti, finnur sölutækifæri og veitir rekstrarinnsýn í rauntíma. Þú ræður hvort AI eða manneskja svarar - við bjóðum heildarlausn sem hentar þínum þörfum.' }
];

let messageIndex = 0;
const chatContainer = document.querySelector('.chat-messages');

setInterval(() => {
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
