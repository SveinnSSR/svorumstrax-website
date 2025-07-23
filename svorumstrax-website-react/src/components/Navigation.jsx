
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import svorumStraxLogo from '../assets/images/svorum-strax-logo.svg'

const Navigation = ({ currentLanguage, onLanguageChange, onContactClick, onNavigate, currentPage = 'home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleContactClick = (type) => {
    onContactClick(type)
    setIsMobileMenuOpen(false)
  }

  const handleNavigation = (page) => {
    onNavigate(page)
    setIsMobileMenuOpen(false)
  }

  const handleScrollToSection = (sectionId) => {
    // If we're not on home page, go to home first
    if (currentPage !== 'home') {
      onNavigate('home')
      // Wait for page to load then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // We're on home page, just scroll
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  const content = {
    is: {
      home: 'Heim',
      services: 'Þjónusta',
      about: 'Um okkur',
      team: 'Mannauður',
      jobs: 'Störf',
      contact: 'Hafa samband'
    },
    en: {
      home: 'Home',
      services: 'Services',
      about: 'About Us',
      team: 'Our Team',
      jobs: 'Jobs',
      contact: 'Contact'
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Subtle premium backdrop */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-md border-b border-gray-200/50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('home')} 
              className="flex items-center group transition-all duration-200 hover:scale-[1.01]"
            >
              <img 
                src={svorumStraxLogo} 
                alt="Svörum strax" 
                className="h-10 w-auto drop-shadow-sm"
              />
            </button>
          </div>

          {/* Desktop Navigation - Subtle active states */}
          <div className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => handleNavigation('home')} 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 'home' 
                  ? 'text-blue-700 bg-blue-50/70' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50/60'
              }`}
            >
              {currentContent.home}
            </button>
            
            <button 
              onClick={() => handleScrollToSection('services')} 
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50/60 font-medium transition-all duration-200"
            >
              {currentContent.services}
            </button>
            
            <button 
              onClick={() => handleScrollToSection('about')} 
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50/60 font-medium transition-all duration-200"
            >
              {currentContent.about}
            </button>
            
            <button 
              onClick={() => handleNavigation('staff')} 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 'staff' 
                  ? 'text-blue-700 bg-blue-50/70' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50/60'
              }`}
            >
              {currentContent.team}
            </button>
            
            <button 
              onClick={() => handleScrollToSection('jobs')} 
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50/60 font-medium transition-all duration-200"
            >
              {currentContent.jobs}
            </button>
            
            {/* Clean CTA Button */}
            <button 
              onClick={() => handleContactClick('contact')}
              className="ml-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {currentContent.contact}
            </button>
          </div>

          {/* Clean Language Toggle */}
          <div className="hidden md:flex items-center ml-4">
            <div className="bg-gray-100/70 rounded-lg p-0.5">
              <button
                onClick={() => onLanguageChange('is')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentLanguage === 'is' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                IS
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentLanguage === 'en' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Clean Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50/60 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Clean Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-1">
            <div className="mx-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/60 overflow-hidden">
              <div className="px-4 py-3 space-y-1">
                <button
                  onClick={() => handleNavigation('home')}
                  className={`block w-full text-left px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === 'home' 
                      ? 'text-blue-700 bg-blue-50/70' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50/60'
                  }`}
                >
                  {currentContent.home}
                </button>
                <button
                  onClick={() => handleScrollToSection('services')}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50/60 font-medium transition-all duration-200"
                >
                  {currentContent.services}
                </button>
                <button
                  onClick={() => handleScrollToSection('about')}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50/60 font-medium transition-all duration-200"
                >
                  {currentContent.about}
                </button>
                <button
                  onClick={() => handleNavigation('staff')}
                  className={`block w-full text-left px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === 'staff' 
                      ? 'text-blue-700 bg-blue-50/70' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50/60'
                  }`}
                >
                  {currentContent.team}
                </button>
                <button
                  onClick={() => handleScrollToSection('jobs')}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50/60 font-medium transition-all duration-200"
                >
                  {currentContent.jobs}
                </button>
                
                {/* Clean mobile CTA */}
                <button
                  onClick={() => handleContactClick('contact')}
                  className="w-full mt-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {currentContent.contact}
                </button>
                
                {/* Clean Mobile Language Toggle */}
                <div className="flex items-center justify-center mt-4 pt-3 border-t border-gray-200/60">
                  <div className="bg-gray-100/70 rounded-lg p-0.5">
                    <button
                      onClick={() => onLanguageChange('is')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                        currentLanguage === 'is' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600'
                      }`}
                    >
                      IS
                    </button>
                    <button
                      onClick={() => onLanguageChange('en')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                        currentLanguage === 'en' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation