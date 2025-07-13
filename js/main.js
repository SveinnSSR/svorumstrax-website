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
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.toggle('mobile-menu-active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('mobile-menu-active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (!nav.contains(event.target) && navLinks.classList.contains('mobile-menu-active')) {
        navLinks.classList.remove('mobile-menu-active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.mobile-menu-toggle');
        
        if (navLinks.classList.contains('mobile-menu-active')) {
            navLinks.classList.remove('mobile-menu-active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
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
    // Prevent default action that might cause scrolling
    return false;
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

// Auto-detect staff photos vs placeholders
document.addEventListener('DOMContentLoaded', function() {
    // Only run on pages with staff cards
    const staffCards = document.querySelectorAll('.staff-card');
    
    if (staffCards.length > 0) {
        staffCards.forEach(card => {
            const avatar = card.querySelector('.staff-avatar');
            
            if (avatar) {
                // Remove any existing founder class to ensure equal treatment
                card.classList.remove('founder');
                
                // Check if it has a real image or is a placeholder
                const hasImage = avatar.querySelector('img');
                const isPlaceholder = avatar.classList.contains('placeholder');
                
                if (hasImage && !isPlaceholder) {
                    // Has a real photo
                    card.classList.add('has-photo');
                } else {
                    // Has placeholder initials
                    card.classList.add('has-placeholder');
                }
            }
        });
    }
});

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