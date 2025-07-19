import { useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Services from './components/Services'
import AIAgentsSection from './components/AIAgentsSection'
import ChoiceSection from './components/ChoiceSection'
import JobsSection from './components/JobsSection'
import TrustSection from './components/TrustSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import { 
  ContactModal 
} from './components/PlaceholderComponents'
import './App.css'

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactModalType, setContactModalType] = useState('contact')
  const [currentLanguage, setCurrentLanguage] = useState('is')

  const openContactModal = (type = 'contact') => {
    setContactModalType(type)
    setIsContactModalOpen(true)
  }

  const closeContactModal = () => {
    setIsContactModalOpen(false)
  }

  const toggleLanguage = (lang) => {
    setCurrentLanguage(lang)
  }

  return (
    <div className="App bg-white">
      <Navigation 
        currentLanguage={currentLanguage}
        onLanguageChange={toggleLanguage}
        onContactClick={openContactModal}
      />
      
      <Hero 
        currentLanguage={currentLanguage}
        onContactClick={openContactModal}
      />
      
      <Services 
        currentLanguage={currentLanguage}
        onContactClick={openContactModal}
      />
      
      <AIAgentsSection 
        currentLanguage={currentLanguage}
        onContactClick={openContactModal}
      />
      
      <ChoiceSection 
        currentLanguage={currentLanguage}
        onContactClick={openContactModal}
      />
      
      <JobsSection 
        currentLanguage={currentLanguage}
        onContactClick={openContactModal}
      />
      
      <TrustSection 
        currentLanguage={currentLanguage}
      />
      
      <TestimonialsSection 
        currentLanguage={currentLanguage}
      />
      
      <CTASection 
        currentLanguage={currentLanguage}
        onContactClick={openContactModal}
      />
      
      <Footer 
        currentLanguage={currentLanguage}
        onContactClick={openContactModal}
      />

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        type={contactModalType}
        currentLanguage={currentLanguage}
      />
            <ChatWidget />
    </div>
  )
}

export default App