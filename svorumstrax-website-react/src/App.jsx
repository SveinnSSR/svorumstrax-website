import { useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import TrustSection from './components/TrustSection'
import Services from './components/Services'
import AIAgentsSection from './components/AIAgentsSection'
import ChoiceSection from './components/ChoiceSection'
import OutboundSection from './components/OutboundSection'
import JobsSection from './components/JobsSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import StaffPage from './pages/StaffPage'
import { 
  ContactModal 
} from './components/PlaceholderComponents'
import './App.css'

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactModalType, setContactModalType] = useState('contact')
  const [currentLanguage, setCurrentLanguage] = useState('is')
  const [currentPage, setCurrentPage] = useState('home')

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

  const navigateToPage = (page) => {
    setCurrentPage(page)
    // Scroll to top when navigating
    window.scrollTo(0, 0)
  }

  // STAFF PAGE
  if (currentPage === 'staff') {
    return (
      <div className="App bg-white">
        <Navigation 
          currentLanguage={currentLanguage}
          onLanguageChange={toggleLanguage}
          onContactClick={openContactModal}
          onNavigate={navigateToPage}
          currentPage={currentPage}
        />
        
        <StaffPage currentLanguage={currentLanguage} />
        
        <Footer 
          currentLanguage={currentLanguage}
          onContactClick={openContactModal}
          onNavigate={navigateToPage}
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

  // HOME PAGE (default)
  return (
    <div className="App bg-white">
      <Navigation 
        currentLanguage={currentLanguage}
        onLanguageChange={toggleLanguage}
        onContactClick={openContactModal}
        onNavigate={navigateToPage}
        currentPage={currentPage}
      />
      
      <Hero 
        currentLanguage={currentLanguage}
        onContactClick={openContactModal}
      />
      
      <TrustSection 
        currentLanguage={currentLanguage}
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

      <OutboundSection 
        currentLanguage={currentLanguage}
        onContactClick={openContactModal}
      />
      
      <JobsSection 
        currentLanguage={currentLanguage}
        onContactClick={openContactModal}
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
        onNavigate={navigateToPage}
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