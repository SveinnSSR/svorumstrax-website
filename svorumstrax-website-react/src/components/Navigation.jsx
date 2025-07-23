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
      {/* Premium backdrop with subtle gradient border */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-xl border-b border-gray-200/60"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('home')} 
              className="flex items-center group transition-all duration-300 hover:scale-[1.02]"
            >
              <img 
                src={svorumStraxLogo} 
                alt="Svörum strax" 
                className="h-11 w-auto drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => handleNavigation('home')} 
              className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 relative group ${
                currentPage === 'home' 
                  ? 'text-blue-700 bg-blue-50/80 shadow-sm' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50/80'
              }`}
            >
              {currentContent.home}
              {currentPage === 'home' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              )}
            </button>
            
            <button 
              onClick={() => handleScrollToSection('services')} 
              className="px-4 py-2.5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-50/80 font-medium transition-all duration-300"
            >
              {currentContent.services}
            </button>
            
            <button 
              onClick={() => handleScrollToSection('about')} 
              className="px-4 py-2.5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-50/80 font-medium transition-all duration-300"
            >
              {currentContent.about}
            </button>
            
            <button 
              onClick={() => handleNavigation('staff')} 
              className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 relative group ${
                currentPage === 'staff' 
                  ? 'text-blue-700 bg-blue-50/80 shadow-sm' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50/80'
              }`}
            >
              {currentContent.team}
              {currentPage === 'staff' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              )}
            </button>
            
            <button 
              onClick={() => handleScrollToSection('jobs')} 
              className="px-4 py-2.5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-50/80 font-medium transition-all duration-300"
            >
              {currentContent.jobs}
            </button>
            
            {/* Premium CTA Button */}
            <button 
              onClick={() => handleContactClick('contact')}
              className="ml-4 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:via-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300 border border-blue-500/20"
            >
              {currentContent.contact}
            </button>
          </div>

          {/* Premium Language Toggle */}
          <div className="hidden md:flex items-center ml-6">
            <div className="bg-gray-100/80 backdrop-blur border border-gray-200/60 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => onLanguageChange('is')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  currentLanguage === 'is' 
                    ? 'bg-white text-blue-600 shadow-sm border border-gray-200/40' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                IS
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  currentLanguage === 'en' 
                    ? 'bg-white text-blue-600 shadow-sm border border-gray-200/40' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Premium Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2.5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-50/80 transition-all duration-300 border border-gray-200/40 bg-white/60 backdrop-blur"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Premium Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-1">
            <div className="mx-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-900/10 border border-gray-200/60 overflow-hidden">
              <div className="px-6 py-4 space-y-1">
                <button
                  onClick={() => handleNavigation('home')}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    currentPage === 'home' 
                      ? 'text-blue-700 bg-blue-50/80' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50/80'
                  }`}
                >
                  {currentContent.home}
                </button>
                <button
                  onClick={() => handleScrollToSection('services')}
                  className="block w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-50/80 font-medium transition-all duration-300"
                >
                  {currentContent.services}
                </button>
                <button
                  onClick={() => handleScrollToSection('about')}
                  className="block w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-50/80 font-medium transition-all duration-300"
                >
                  {currentContent.about}
                </button>
                <button
                  onClick={() => handleNavigation('staff')}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    currentPage === 'staff' 
                      ? 'text-blue-700 bg-blue-50/80' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50/80'
                  }`}
                >
                  {currentContent.team}
                </button>
                <button
                  onClick={() => handleScrollToSection('jobs')}
                  className="block w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-50/80 font-medium transition-all duration-300"
                >
                  {currentContent.jobs}
                </button>
                
                {/* Premium mobile CTA */}
                <button
                  onClick={() => handleContactClick('contact')}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {currentContent.contact}
                </button>
                
                {/* Premium Mobile Language Toggle */}
                <div className="flex items-center justify-center mt-6 pt-4 border-t border-gray-200/60">
                  <div className="bg-gray-100/80 rounded-xl p-1 shadow-sm">
                    <button
                      onClick={() => onLanguageChange('is')}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        currentLanguage === 'is' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600 hover:bg-white/50'
                      }`}
                    >
                      IS
                    </button>
                    <button
                      onClick={() => onLanguageChange('en')}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        currentLanguage === 'en' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600 hover:bg-white/50'
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