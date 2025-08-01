import { useState } from 'react'

// Modal content for different contact types in both languages
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
    'ai-service': {
      title: 'AI þjónusta',
      subtitle: 'Kynntu þér heildstæðar gervigreindarlausnir.',
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
    services: {
      title: 'Skoða þjónustu',
      subtitle: 'Kynntu þér alla þjónustu okkar.',
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
    'ai-service': {
      title: 'AI Service',
      subtitle: 'Learn about our comprehensive AI solutions.',
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
    services: {
      title: 'Explore Services',
      subtitle: 'Learn about all our services.',
      submitText: 'Get Information'
    }
  }
}

export const ContactModal = ({ isOpen, onClose, type, currentLanguage }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const currentContent = modalContent[currentLanguage]?.[type] || modalContent[currentLanguage]?.['contact']

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create data object for Formspree
    const data = {
      _subject: `${currentContent.title} - ${formData.companyName}`,
      inquiry_type: currentContent.title,
      company: formData.companyName,
      name: formData.contactPerson,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      website: formData.website || 'Not provided',
      message: formData.message || 'No message',
      _replyto: formData.email
    }

    try {
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/mnnvyejz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        // Success
        alert(currentLanguage === 'is' 
          ? 'Takk fyrir fyrirspurnina! Við höfum samband við þig fljótlega.' 
          : 'Thank you for your inquiry! We will contact you soon.')
        
        // Reset form
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          website: '',
          message: ''
        })
        onClose()
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      // Error
      alert(currentLanguage === 'is' 
        ? 'Villa kom upp. Vinsamlegast reyndu aftur eða sendu okkur tölvupóst beint á svorumstrax@svorumstrax.is' 
        : 'An error occurred. Please try again or email us directly at svorumstrax@svorumstrax.is')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Determine if this is a job application
  const isJobApplication = type === 'job'

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        {/* Modal */}
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {currentContent.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl font-light"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <p className="text-gray-600 mb-8 leading-relaxed">
              {currentContent.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-900 mb-2">
                  {currentLanguage === 'is' ? 'Nafn fyrirtækis' : 'Company Name'}
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Contact Person */}
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-900 mb-2">
                  {currentLanguage === 'is' ? 'Nafn tengiliðs' : 'Contact Person'}
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  {currentLanguage === 'is' ? 'Netfang' : 'Email'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                  {currentLanguage === 'is' ? 'Símanúmer' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Website - Hide for job applications */}
              {!isJobApplication && (
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-900 mb-2">
                    {currentLanguage === 'is' ? 'Vefsíða fyrirtækis' : 'Company Website'}
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder=""  // Remove the example.com
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors duration-200 text-gray-900 placeholder-gray-400"
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  {isJobApplication 
                    ? (currentLanguage === 'is' ? 'Kynning á þér' : 'About yourself')
                    : (currentLanguage === 'is' ? 'Skilaboð' : 'Message')
                  }
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={isJobApplication 
                    ? (currentLanguage === 'is' ? 'Segðu okkur aðeins frá þér...' : 'Tell us about yourself...')
                    : ''
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors duration-200 text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting 
                  ? (currentLanguage === 'is' ? 'Sendi...' : 'Sending...')
                  : currentContent.submitText
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

// Remove old placeholder components since we're now implementing properly
export const AboutSection = ({ currentLanguage }) => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Af hverju að velja Svörum strax?
          </h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </div>
    </section>
  )
}

export const JobsSection = ({ currentLanguage, onContactClick }) => {
  return (
    <section id="jobs" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Störf fyrir Íslendinga á Spáni
          </h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </div>
    </section>
  )
}

export const TestimonialsSection = ({ currentLanguage }) => {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hvað segja viðskiptavinir okkar?
          </h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </div>
    </section>
  )
}

export const ContactSection = ({ currentLanguage, onContactClick }) => {
  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Viltu bæta þjónustu og fá betri rekstrarinnsýn?
          </h2>
          <button onClick={() => onContactClick('meeting')} className="btn-primary">
            Bóka fund
          </button>
        </div>
      </div>
    </section>
  )
}

export const Footer = ({ currentLanguage, onContactClick }) => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container-custom">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Svörum strax</h3>
          <p className="text-gray-300">© 2025 Svörum strax. Allur réttur áskilinn.</p>
        </div>
      </div>
    </footer>
  )
}
