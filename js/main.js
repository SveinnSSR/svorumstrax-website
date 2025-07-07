// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('onclick')) return; // Skip if has onclick
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

// Modal functionality
let currentContactType = '';

// Context-specific content for different CTAs
const modalContent = {
    is: {
        contact: {
            title: 'Hafðu samband',
            subtitle: 'Við svörum öllum fyrirspurnum innan 24 tíma.',
            submitText: 'Senda fyrirspurn'
        },
        consultation: {
            title: 'Fá ókeypis ráðgjöf',
            subtitle: 'Bókaðu ókeypis ráðgjöf með sérfræðingum okkar.',
            submitText: 'Bóka ráðgjöf'
        },
        'phone-support': {
            title: 'Símsvörun - Frekari upplýsingar',
            subtitle: 'Fáðu tilboð í sérhæfða símsvörun fyrir þitt fyrirtæki.',
            submitText: 'Fá tilboð'
        },
        'email-service': {
            title: 'Tölvupóstþjónusta - Frekari upplýsingar',
            subtitle: 'Láttu okkur sjá um tölvupóstsamskipti þín.',
            submitText: 'Fá tilboð'
        },
        'ai-chat': {
            title: 'AI Spjallþjónusta - Frekari upplýsingar',
            subtitle: 'Kynntu þér hvernig AI getur bætt þjónustu þína.',
            submitText: 'Fá upplýsingar'
        },
        'ai-voice': {
            title: 'AI Raddþjónusta - Frekari upplýsingar',
            subtitle: 'Sjálfvirk símsvörun allan sólarhringinn.',
            submitText: 'Fá upplýsingar'
        },
        analytics: {
            title: 'Viðskiptagreining - Frekari upplýsingar',
            subtitle: 'Fáðu innsýn í þín viðskipti með AI greiningu.',
            submitText: 'Fá upplýsingar'
        },
        outbound: {
            title: 'Úthringiþjónusta - Frekari upplýsingar',
            subtitle: 'Auktu sölu með sérhæfðu úthringiteymi.',
            submitText: 'Fá tilboð'
        },
        fte: {
            title: 'Stöðugildi til leigu',
            subtitle: 'Leigðu sérhæfðan starfsmann án umsýslukostnaðar.',
            submitText: 'Fá upplýsingar'
        },
        custom: {
            title: 'Sérsniðnar lausnir',
            subtitle: 'Láttu okkur hanna lausn sem hentar þínum þörfum.',
            submitText: 'Fá ráðgjöf'
        },
        job: {
            title: 'Sækja um starf',
            subtitle: 'Sendu okkur ferilskrá og kynningu á þér.',
            submitText: 'Senda umsókn'
        },
        meeting: {
            title: 'Bóka fund',
            subtitle: 'Við finnum tíma sem hentar þér.',
            submitText: 'Bóka fund'
        },
        pricing: {
            title: 'Fá verðtilboð',
            subtitle: 'Fáðu sérsniðið tilboð miðað við þínar þarfir.',
            submitText: 'Fá verðtilboð'
        },
        'ai-service': {
            title: 'AI þjónusta',
            subtitle: 'Kynntu þér heildstæðar AI lausnir okkar.',
            submitText: 'Fá upplýsingar'
        }
    },
    en: {
        contact: {
            title: 'Contact Us',
            subtitle: 'We respond to all inquiries within 24 hours.',
            submitText: 'Send Inquiry'
        },
        consultation: {
            title: 'Get Free Consultation',
            subtitle: 'Book a free consultation with our experts.',
            submitText: 'Book Consultation'
        },
        'phone-support': {
            title: 'Phone Support - Learn More',
            subtitle: 'Get a quote for specialized phone support for your company.',
            submitText: 'Get Quote'
        },
        'email-service': {
            title: 'Email Service - Learn More',
            subtitle: 'Let us handle your email communications.',
            submitText: 'Get Quote'
        },
        'ai-chat': {
            title: 'AI Chat Service - Learn More',
            subtitle: 'Learn how AI can improve your service.',
            submitText: 'Get Information'
        },
        'ai-voice': {
            title: 'AI Voice Service - Learn More',
            subtitle: 'Automated phone support 24/7.',
            submitText: 'Get Information'
        },
        analytics: {
            title: 'Business Analytics - Learn More',
            subtitle: 'Get insights into your business with AI analysis.',
            submitText: 'Get Information'
        },
        outbound: {
            title: 'Outbound Service - Learn More',
            subtitle: 'Increase sales with a specialized outbound team.',
            submitText: 'Get Quote'
        },
        fte: {
            title: 'FTE Rental',
            subtitle: 'Rent a specialized employee without administrative costs.',
            submitText: 'Get Information'
        },
        custom: {
            title: 'Custom Solutions',
            subtitle: 'Let us design a solution that fits your needs.',
            submitText: 'Get Consultation'
        },
        job: {
            title: 'Apply for Job',
            subtitle: 'Send us your CV and introduction.',
            submitText: 'Send Application'
        },
        meeting: {
            title: 'Book a Meeting',
            subtitle: 'We\'ll find a time that suits you.',
            submitText: 'Book Meeting'
        },
        pricing: {
            title: 'Get Pricing',
            subtitle: 'Get a custom quote based on your needs.',
            submitText: 'Get Quote'
        },
        'ai-service': {
            title: 'AI Service',
            subtitle: 'Learn about our comprehensive AI solutions.',
            submitText: 'Get Information'
        }
    }
};

// Open contact modal
function openContactModal(type) {
    currentContactType = type || 'contact';
    const modal = document.getElementById('contactModal');
    const currentLang = localStorage.getItem('language') || 'is';
    const content = modalContent[currentLang][currentContactType] || modalContent[currentLang]['contact'];
    
    // Update modal content based on type
    document.getElementById('modalTitle').textContent = content.title;
    document.getElementById('modalSubtitle').textContent = content.subtitle;
    document.querySelector('.modal-submit').textContent = content.submitText;
    
    // Show/hide certain fields based on type
    const messageField = document.querySelector('textarea[name="message"]').parentElement;
    const websiteField = document.querySelector('input[name="website"]').parentElement;
    
    if (type === 'job') {
        messageField.querySelector('label').textContent = currentLang === 'is' ? 'Kynning á þér' : 'About yourself';
        messageField.querySelector('textarea').placeholder = currentLang === 'is' ? 'Segðu okkur aðeins frá þér...' : 'Tell us about yourself...';
        websiteField.style.display = 'none';
    } else {
        messageField.querySelector('label').textContent = currentLang === 'is' ? 'Skilaboð' : 'Message';
        messageField.querySelector('textarea').placeholder = '';
        websiteField.style.display = 'block';
    }
    
    // Show modal
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close contact modal
function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Reset form
        document.getElementById('contactForm').reset();
    }, 300);
}

// Handle contact form submission
async function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const currentLang = localStorage.getItem('language') || 'is';
    
    // Get context-specific subject
    const content = modalContent[currentLang][currentContactType] || modalContent[currentLang]['contact'];
    
    // Create data object for Formspree
    const data = {
        _subject: `${content.title} - ${formData.get('companyName')}`,
        inquiry_type: content.title,
        company: formData.get('companyName'),
        name: formData.get('contactPerson'),
        email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        website: formData.get('website') || 'Not provided',
        message: formData.get('message') || 'No message',
        _replyto: formData.get('email')
    };
    
    try {
        // Show loading state
        const submitBtn = form.querySelector('.modal-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = currentLang === 'is' ? 'Sendi...' : 'Sending...';
        submitBtn.disabled = true;
        
        // Send to Formspree
        const response = await fetch('https://formspree.io/f/mnnvyejz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // Success
            alert(currentLang === 'is' 
                ? 'Takk fyrir fyrirspurnina! Við höfum samband við þig fljótlega.' 
                : 'Thank you for your inquiry! We will contact you soon.');
            closeContactModal();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Error
        alert(currentLang === 'is' 
            ? 'Villa kom upp. Vinsamlegast reyndu aftur eða sendu okkur tölvupóst beint á svorumstrax@svorumstrax.is' 
            : 'An error occurred. Please try again or email us directly at svorumstrax@svorumstrax.is');
    } finally {
        // Reset button
        const submitBtn = form.querySelector('.modal-submit');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactModal();
    }
});