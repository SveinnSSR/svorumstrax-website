import { useState, useEffect } from 'react'
import { Routes, Route, useParams, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from './components/ScrollToTop'
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
import SimsvorunPage from './pages/SimsvorunPage'
import BokhaldsthjonustaPage from './pages/BokhaldsthjonustaPage'
import { 
  ContactModal 
} from './components/PlaceholderComponents'
import './App.css'

// SEO Head Manager - Manual replacement for react-helmet
const updatePageMeta = (title, description, canonical, lang = 'is') => {
  // Update title
  document.title = title
  
  // Update description
  let metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute('content', description)
  } else {
    metaDesc = document.createElement('meta')
    metaDesc.name = 'description'
    metaDesc.content = description
    document.head.appendChild(metaDesc)
  }
  
  // Update canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]')
  if (canonicalLink) {
    canonicalLink.setAttribute('href', canonical)
  } else {
    canonicalLink = document.createElement('link')
    canonicalLink.rel = 'canonical'
    canonicalLink.href = canonical
    document.head.appendChild(canonicalLink)
  }
  
  // Update language
  document.documentElement.lang = lang
  
  // Add hreflang links
  const existingHreflangs = document.querySelectorAll('link[rel="alternate"]')
  existingHreflangs.forEach(link => link.remove())
  
  const baseUrl = 'https://svorumstrax.is'
  const currentPath = window.location.pathname
  
// Normalize a version of the path with NO lang prefix (strip /en or /is)
const pathNoLang = currentPath.replace(/^\/(en|is)/, '') || '/'

// Icelandic path = no prefix
const isPath = pathNoLang

// English path = /en + no-prefix
const enPath = `/en${pathNoLang === '/' ? '' : pathNoLang}`
  
  const isHreflang = document.createElement('link')
  isHreflang.rel = 'alternate'
  isHreflang.hreflang = 'is'
  isHreflang.href = baseUrl + isPath
  document.head.appendChild(isHreflang)
  
  const enHreflang = document.createElement('link')
  enHreflang.rel = 'alternate'
  enHreflang.hreflang = 'en'
  enHreflang.href = baseUrl + enPath
  document.head.appendChild(enHreflang)
}

// Language-aware route wrapper
const LanguageWrapper = ({ children, defaultLang = 'is' }) => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [currentLanguage, setCurrentLanguage] = useState(defaultLang)

  // Extract language from URL params OR derive from path
  useEffect(() => {
    const urlLang = params.lang || (location.pathname.startsWith('/en') ? 'en' : defaultLang)
    if (urlLang !== currentLanguage) {
      setCurrentLanguage(urlLang)
    }
  }, [params.lang, location.pathname, currentLanguage, defaultLang])

  // ❌ REMOVE root redirect (so / stays as-is)
  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     navigate('/is', { replace: true })
  //   }
  // }, [location.pathname, navigate])

  const handleLanguageChange = (newLang) => {
    const { pathname, search, hash } = location
    let newPath = pathname

    if (newLang === 'en') {
      // Ensure /en prefix
      newPath = pathname.startsWith('/en') ? pathname : `/en${pathname === '/' ? '' : pathname}`
    } else {
      // Icelandic: strip /en or /is if present
      if (pathname.startsWith('/en')) {
        newPath = pathname.replace(/^\/en/, '') || '/'
      } else if (pathname.startsWith('/is')) {
        newPath = pathname.replace(/^\/is/, '') || '/'
      } else {
        newPath = pathname // already root-IS style
      }
    }
    
    navigate(`${newPath}${search}${hash}`)
  }

  const handleNavigation = (page) => {
    const isEN = currentLanguage === 'en'
    const prefix = isEN ? '/en' : ''  // IS has no prefix now
    
    let path = isEN ? `${prefix}` : `/`
    
    switch (page) {
      case 'home':
        // stay at language root
        break
      case 'simsvorun':
        path += isEN ? `/phone-service` : `simsvorun`
        break
      case 'bokhaldsthjonusta':
        path += isEN ? `/accounting` : `bokhaldsthjonusta`
        break
      case 'staff':
        path += isEN ? `/team` : `mannaudur`
        break
      default:
        break
    }
    
    // avoid double slashes
    path = path.replace(/\/+/g, '/')
    navigate(path)
  }

  return children({ 
    currentLanguage, 
    onLanguageChange: handleLanguageChange, 
    onNavigate: handleNavigation 
  })
}

// HomePage component with all sections
const HomePage = ({ currentLanguage, onContactClick, onNavigate }) => {
  // SEO for homepage
  useEffect(() => {
    const seoData = {
      is: {
        title: 'Svörum strax - Snjallar lausnir fyrir þjónustuver og símsvörun',
        description: 'Yfir 100 fyrirtæki treysta Svörum strax fyrir þjónustu við viðskiptavini. Símsvörun, gervigreind og bókhaldsþjónusta í Barcelona.',
        canonical: 'https://svorumstrax.is' // ← root, no /is
      },
      en: {
        title: 'Svörum strax - Smart Customer Service Solutions',
        description: 'Trusted by 100+ companies across Iceland. Professional phone answering, AI solutions, and accounting services from our Barcelona team.',
        canonical: 'https://svorumstrax.is/en'
      }
    }
    
    const data = seoData[currentLanguage]
    updatePageMeta(data.title, data.description, data.canonical, currentLanguage)
  }, [currentLanguage])

  const handleViewAllServices = () => {
    const element = document.getElementById('services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Hero 
        currentLanguage={currentLanguage}
        onContactClick={onContactClick}
        onViewAllServices={handleViewAllServices}
      />
      
      <TrustSection 
        currentLanguage={currentLanguage}
      />
      
      <Services 
        currentLanguage={currentLanguage}
        onContactClick={onContactClick}
      />
      
      <AIAgentsSection 
        currentLanguage={currentLanguage}
        onContactClick={onContactClick}
      />
      
      <ChoiceSection 
        currentLanguage={currentLanguage}
        onContactClick={onContactClick}
      />

      <OutboundSection 
        currentLanguage={currentLanguage}
        onContactClick={onContactClick}
      />
      
      <JobsSection 
        currentLanguage={currentLanguage}
        onContactClick={onContactClick}
      />
      
      <TestimonialsSection 
        currentLanguage={currentLanguage}
      />
      
      <CTASection 
        currentLanguage={currentLanguage}
        onContactClick={onContactClick}
      />
    </>
  )
}

// SEO-enhanced page wrapper
const PageWithSEO = ({ children, seoData, currentLanguage }) => {
  useEffect(() => {
    const data = seoData[currentLanguage]
    updatePageMeta(data.title, data.description, data.canonical, currentLanguage)
  }, [seoData, currentLanguage])

  return children
}

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactModalType, setContactModalType] = useState('contact')

  const openContactModal = (type = 'contact') => {
    setContactModalType(type)
    setIsContactModalOpen(true)
  }

  const closeContactModal = () => {
    setIsContactModalOpen(false)
  }

  return (
    <div className="App bg-white">
      <ScrollToTop />
      <Routes>
        {/* ✅ NEW: Icelandic default at root (no /is) */}
        <Route path="/*" element={
          <LanguageWrapper defaultLang="is">
            {({ currentLanguage, onLanguageChange, onNavigate }) => (
              <>
                <Navigation 
                  currentLanguage={currentLanguage}
                  onLanguageChange={onLanguageChange}
                  onContactClick={openContactModal}
                  onNavigate={onNavigate}
                />
                
                <Routes>
                  {/* Homepage (IS) */}
                  <Route index element={
                    <HomePage 
                      currentLanguage="is"
                      onContactClick={openContactModal}
                      onNavigate={onNavigate}
                    />
                  } />
                  
                  {/* Staff/Team page (IS) */}
                  <Route path="/mannaudur" element={
                    <PageWithSEO
                      seoData={{
                        is: {
                          title: 'Mannauður - Svörum strax teymið í Barcelona',
                          description: 'Kynntu þér 35+ íslenska sérfræðinga okkar í Barcelona. Reynslumikið teymi í þjónustu, bókhaldi og tækniþróun.',
                          canonical: 'https://svorumstrax.is/mannaudur'
                        },
                        en: { title: '', description: '', canonical: '' }
                      }}
                      currentLanguage="is"
                    >
                      <StaffPage currentLanguage="is" />
                    </PageWithSEO>
                  } />
                  
                  {/* Símsvörun (IS) */}
                  <Route path="/simsvorun" element={
                    <PageWithSEO
                      seoData={{
                        is: {
                          title: 'Símsvörun - Fagleg símsvörun síðan 2019',
                          description: 'Áreiðanleg símsvörun fyrir yfir 100 fyrirtæki. Almenn símsvörun, þjónustuver og AI lausnir. Fáðu tilboð í dag.',
                          canonical: 'https://svorumstrax.is/simsvorun'
                        },
                        en: { title: '', description: '', canonical: '' }
                      }}
                      currentLanguage="is"
                    >
                      <SimsvorunPage 
                        currentLanguage="is" 
                        onContactClick={openContactModal}
                      />
                    </PageWithSEO>
                  } />
                  
                  {/* Bókhald (IS) */}
                  <Route path="/bokhaldsthjonusta" element={
                    <PageWithSEO
                      seoData={{
                        is: {
                          title: 'Bókhaldsþjónusta - Nútímaleg bókhaldslausn í Barcelona',
                          description: 'Faggleg bókhaldsþjónusta með Uniconta. Jóel Kristinsson M.Acc leiðir teymi sérfræðinga. Fáðu tilboð í dag.',
                          canonical: 'https://svorumstrax.is/bokhaldsthjonusta'
                        },
                        en: { title: '', description: '', canonical: '' }
                      }}
                      currentLanguage="is"
                    >
                      <BokhaldsthjonustaPage 
                        currentLanguage="is" 
                        onContactClick={openContactModal}
                      />
                    </PageWithSEO>
                  } />
                </Routes>
                
                <Footer 
                  currentLanguage="is"
                  onContactClick={openContactModal}
                  onNavigate={onNavigate}
                />

                <ContactModal 
                  isOpen={isContactModalOpen}
                  onClose={closeContactModal}
                  type={contactModalType}
                  currentLanguage="is"
                />
                <ChatWidget />
              </>
            )}
          </LanguageWrapper>
        } />

        {/* 🔁 Redirect legacy /is URLs to the new no-prefix Icelandic paths */}
        <Route path="/is" element={<Navigate to="/" replace />} />
        <Route
          path="/is/*"
          element={<Navigate to={window.location.pathname.replace(/^\/is/, '') || '/'} replace />}
        />

        {/* ✅ English lives only under /en/* */}
        <Route path="/en/*" element={
          <LanguageWrapper defaultLang="en">
            {({ currentLanguage, onLanguageChange, onNavigate }) => (
              <>
                <Navigation 
                  currentLanguage={currentLanguage}
                  onLanguageChange={onLanguageChange}
                  onContactClick={openContactModal}
                  onNavigate={onNavigate}
                />
                
                <Routes>
                  {/* Homepage */}
                  <Route index element={
                    <HomePage 
                      currentLanguage={currentLanguage}
                      onContactClick={openContactModal}
                      onNavigate={onNavigate}
                    />
                  } />
                  
                  {/* Staff/Team page */}
                  <Route path="mannaudur" element={
                    <PageWithSEO
                      seoData={{
                        is: {
                          title: 'Mannauður - Svörum strax teymið í Barcelona',
                          description: 'Kynntu þér 35+ íslenska sérfræðinga okkar í Barcelona. Reynslumikið teymi í þjónustu, bókhaldi og tækniþróun.',
                          canonical: 'https://svorumstrax.is/mannaudur'
                        },
                        en: {
                          title: 'Our Team - Icelandic Experts in Barcelona',
                          description: 'Meet our 35+ Icelandic specialists in Barcelona. Experienced team in customer service, accounting, and technology development.',
                          canonical: 'https://svorumstrax.is/en/team'
                        }
                      }}
                      currentLanguage={currentLanguage}
                    >
                      <StaffPage currentLanguage={currentLanguage} />
                    </PageWithSEO>
                  } />
                  
                  <Route path="team" element={
                    <PageWithSEO
                      seoData={{
                        is: {
                          title: 'Mannauður - Svörum strax teymið í Barcelona',
                          description: 'Kynntu þér 35+ íslenska sérfræðinga okkar í Barcelona. Reynslumikið teymi í þjónustu, bókhaldi og tækniþróun.',
                          canonical: 'https://svorumstrax.is/mannaudur'
                        },
                        en: {
                          title: 'Our Team - Icelandic Experts in Barcelona',
                          description: 'Meet our 35+ Icelandic specialists in Barcelona. Experienced team in customer service, accounting, and technology development.',
                          canonical: 'https://svorumstrax.is/en/team'
                        }
                      }}
                      currentLanguage={currentLanguage}
                    >
                      <StaffPage currentLanguage={currentLanguage} />
                    </PageWithSEO>
                  } />
                  
                  {/* Símsvörun/Phone Service pages */}
                  <Route path="simsvorun" element={
                    <PageWithSEO
                      seoData={{
                        is: {
                          title: 'Símsvörun - Fagleg símsvörun síðan 2019',
                          description: 'Áreiðanleg símsvörun fyrir yfir 100 fyrirtæki. Almenn símsvörun, þjónustuver og AI lausnir. Fáðu tilboð í dag.',
                          canonical: 'https://svorumstrax.is/simsvorun'
                        },
                        en: {
                          title: 'Phone Answering Service - Professional Support Since 2019',
                          description: 'Reliable phone answering for 100+ companies. General phone service, contact center, and AI solutions. Get your quote today.',
                          canonical: 'https://svorumstrax.is/en/phone-service'
                        }
                      }}
                      currentLanguage={currentLanguage}
                    >
                      <SimsvorunPage 
                        currentLanguage={currentLanguage} 
                        onContactClick={openContactModal}
                      />
                    </PageWithSEO>
                  } />
                  
                  <Route path="phone-service" element={
                    <PageWithSEO
                      seoData={{
                        is: {
                          title: 'Símsvörun - Fagleg símsvörun síðan 2019',
                          description: 'Áreiðanleg símsvörun fyrir yfir 100 fyrirtæki. Almenn símsvörun, þjónustuver og AI lausnir. Fáðu tilboð í dag.',
                          canonical: 'https://svorumstrax.is/simsvorun'
                        },
                        en: {
                          title: 'Phone Answering Service - Professional Support Since 2019',
                          description: 'Reliable phone answering for 100+ companies. General phone service, contact center, and AI solutions. Get your quote today.',
                          canonical: 'https://svorumstrax.is/en/phone-service'
                        }
                      }}
                      currentLanguage={currentLanguage}
                    >
                      <SimsvorunPage 
                        currentLanguage={currentLanguage} 
                        onContactClick={openContactModal}
                      />
                    </PageWithSEO>
                  } />
                  
                  {/* Bókhaldsþjónusta/Accounting pages */}
                  <Route path="bokhaldsthjonusta" element={
                    <PageWithSEO
                      seoData={{
                        is: {
                          title: 'Bókhaldsþjónusta - Nútímaleg bókhaldsþjónusta í Barcelona',
                          description: 'Faggleg bókhaldsþjónusta með Uniconta. Jóel Kristinsson M.Acc leiðir teymi sérfræðinga. Fáðu tilboð í dag.',
                          canonical: 'https://svorumstrax.is/bokhaldsthjonusta'
                        },
                        en: {
                          title: 'Accounting Services - Modern Accounting Solutions from Barcelona',
                          description: 'Professional accounting services with Uniconta. Led by Jóel Kristinsson M.Acc and specialist team. Get your quote today.',
                          canonical: 'https://svorumstrax.is/en/accounting'
                        }
                      }}
                      currentLanguage={currentLanguage}
                    >
                      <BokhaldsthjonustaPage 
                        currentLanguage={currentLanguage} 
                        onContactClick={openContactModal}
                      />
                    </PageWithSEO>
                  } />
                  
                  <Route path="accounting" element={
                    <PageWithSEO
                      seoData={{
                        is: {
                          title: 'Bókhaldsþjónusta - Nútímaleg bókhaldsþjónusta í Barcelona',
                          description: 'Faggleg bókhaldsþjónusta með Uniconta. Jóel Kristinsson M.Acc leiðir teymi sérfræðinga. Fáðu tilboð í dag.',
                          canonical: 'https://svorumstrax.is/bokhaldsthjonusta'
                        },
                        en: {
                          title: 'Accounting Services - Modern Accounting Solutions from Barcelona',
                          description: 'Professional accounting services with Uniconta. Led by Jóel Kristinsson M.Acc and specialist team. Get your quote today.',
                          canonical: 'https://svorumstrax.is/en/accounting'
                        }
                      }}
                      currentLanguage={currentLanguage}
                    >
                      <BokhaldsthjonustaPage 
                        currentLanguage={currentLanguage} 
                        onContactClick={openContactModal}
                      />
                    </PageWithSEO>
                  } />
                </Routes>
                
                <Footer 
                  currentLanguage={currentLanguage}
                  onContactClick={openContactModal}
                  onNavigate={onNavigate}
                />

                <ContactModal 
                  isOpen={isContactModalOpen}
                  onClose={closeContactModal}
                  type={contactModalType}
                  currentLanguage={currentLanguage}
                />
                <ChatWidget />
              </>
            )}
          </LanguageWrapper>
        } />
      </Routes>
      <Analytics />
    </div>
  )
}

export default App