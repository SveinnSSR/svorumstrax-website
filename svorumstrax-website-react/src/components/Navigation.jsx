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
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => handleNavigation('home')} className="flex items-center">
              <img 
                src={svorumStraxLogo} 
                alt="Svörum strax" 
                className="h-10 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('home')} 
              className={`font-medium transition-colors duration-300 ${
                currentPage === 'home' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {currentContent.home}
            </button>
            <button 
              onClick={() => handleScrollToSection('services')} 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              {currentContent.services}
            </button>
            <button 
              onClick={() => handleScrollToSection('about')} 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              {currentContent.about}
            </button>
            <button 
              onClick={() => handleNavigation('staff')} 
              className={`font-medium transition-colors duration-300 ${
                currentPage === 'staff' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {currentContent.team}
            </button>
            <button 
              onClick={() => handleScrollToSection('jobs')} 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              {currentContent.jobs}
            </button>
            <button 
              onClick={() => handleContactClick('contact')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {currentContent.contact}
            </button>
          </div>

          {/* Language Toggle */}
          <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-full p-1 ml-4">
            <button
              onClick={() => onLanguageChange('is')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                currentLanguage === 'is' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              IS
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                currentLanguage === 'en' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-200/50 rounded-b-lg shadow-lg">
              <button
                onClick={() => handleNavigation('home')}
                className={`block w-full text-left px-3 py-2 font-medium transition-colors duration-300 ${
                  currentPage === 'home' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {currentContent.home}
              </button>
              <button
                onClick={() => handleScrollToSection('services')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                {currentContent.services}
              </button>
              <button
                onClick={() => handleScrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                {currentContent.about}
              </button>
              <button
                onClick={() => handleNavigation('staff')}
                className={`block w-full text-left px-3 py-2 font-medium transition-colors duration-300 ${
                  currentPage === 'staff' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {currentContent.team}
              </button>
              <button
                onClick={() => handleScrollToSection('jobs')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                {currentContent.jobs}
              </button>
              <button
                onClick={() => handleContactClick('contact')}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                {currentContent.contact}
              </button>
              
              {/* Mobile Language Toggle */}
              <div className="flex items-center justify-center space-x-1 bg-gray-100 rounded-full p-1 mt-4">
                <button
                  onClick={() => onLanguageChange('is')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentLanguage === 'is' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-gray-600'
                  }`}
                >
                  IS
                </button>
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentLanguage === 'en' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-gray-600'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation