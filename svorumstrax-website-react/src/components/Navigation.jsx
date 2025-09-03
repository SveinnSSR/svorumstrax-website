import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import svorumStraxLogo from '../assets/images/svorumstrax-logo.svg'

const Navigation = ({ currentLanguage, onLanguageChange, onContactClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setIsServicesDropdownOpen(false)
  }

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen)
  }

  const handleContactClick = (type) => {
    onContactClick(type)
    setIsMobileMenuOpen(false)
    setIsServicesDropdownOpen(false)
  }

  const closeMenus = () => {
    setIsMobileMenuOpen(false)
    setIsServicesDropdownOpen(false)
  }

  const handleScrollToSection = (sectionId) => {
    // If we're not on home page, navigate to home first
    const isOnHomePage = location.pathname === `/${currentLanguage}` || 
                         location.pathname === '/' || 
                         location.pathname === `/is` || 
                         location.pathname === `/en`
    
    if (!isOnHomePage) {
      // Navigate to home and scroll after navigation
      window.location.href = `/${currentLanguage}#${sectionId}`
    } else {
      // We're on home page, just scroll
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    closeMenus()
  }

  const handleServiceSelect = (serviceType) => {
    switch (serviceType) {
      case 'simsvorun':
        // Will be handled by Link component
        break
      case 'ai':
        handleScrollToSection('ai-agents')
        break
      case 'bokhaldsthjonusta':
        // Will be handled by Link component
        break
      case 'web':
        handleContactClick('web-service')
        break
      case 'uthringar':
        handleScrollToSection('outbound')
        break
      default:
        break
    }
    closeMenus()
  }

  // URL construction helpers
  const getHomeUrl = () => `/${currentLanguage}`
  const getTeamUrl = () => `/${currentLanguage}/${currentLanguage === 'is' ? 'mannaudur' : 'team'}`
  const getSimsvorunUrl = () => `/${currentLanguage}/${currentLanguage === 'is' ? 'simsvorun' : 'phone-service'}`
  const getBokhaldsthjonustaUrl = () => `/${currentLanguage}/${currentLanguage === 'is' ? 'bokhaldsthjonusta' : 'accounting'}`

  // Natural English navigation labels
  const content = {
    is: {
      home: 'Heim',
      services: 'Þjónusta',
      team: 'Mannauður',
      jobs: 'Störf',
      contact: 'Hafa samband',
      servicesDropdown: {
        simsvorun: 'Símsvörun',
        ai: 'Gervigreindarlausnir',
        bokhaldsthjonusta: 'Bókhaldsþjónusta',
        web: 'Vefsíðugerð',
        uthringar: 'Úthringingar'
      }
    },
    en: {
      home: 'Home',
      services: 'Services',
      team: 'Team',
      jobs: 'Careers',
      contact: 'Contact',
      servicesDropdown: {
        simsvorun: 'Phone Service',
        ai: 'AI Solutions',
        bokhaldsthjonusta: 'Accounting',
        web: 'Web Development',
        uthringar: 'Outbound Sales'
      }
    }
  }

  const currentContent = content[currentLanguage]

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Clean white backdrop */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm border-b border-gray-200/40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to={getHomeUrl()} 
              className="flex items-center transition-opacity duration-200 hover:opacity-80 focus:outline-none"
            >
              <img 
                src={svorumStraxLogo} 
                alt="Svörum strax" 
                className="h-10 sm:h-12 w-auto"
                style={{ 
                  maxWidth: '200px'
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to={getHomeUrl()} 
              className="px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100"
            >
              {currentContent.home}
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={toggleServicesDropdown}
                className="flex items-center px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
              >
                {currentContent.services}
                <ChevronDownIcon 
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    isServicesDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {/* Dropdown Menu */}
              {isServicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/40 overflow-hidden z-50">
                  <div className="py-1">
                    <Link
                      to={getSimsvorunUrl()}
                      onClick={closeMenus}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    >
                      {currentContent.servicesDropdown.simsvorun}
                    </Link>
                    <button
                      onClick={() => handleServiceSelect('ai')}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    >
                      {currentContent.servicesDropdown.ai}
                    </button>
                    <Link
                      to={getBokhaldsthjonustaUrl()}
                      onClick={closeMenus}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    >
                      {currentContent.servicesDropdown.bokhaldsthjonusta}
                    </Link>
                    <button
                      onClick={() => handleServiceSelect('web')}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    >
                      {currentContent.servicesDropdown.web}
                    </button>
                    <button
                      onClick={() => handleServiceSelect('uthringar')}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    >
                      {currentContent.servicesDropdown.uthringar}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              to={getTeamUrl()} 
              className="px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100"
            >
              {currentContent.team}
            </Link>
            
            <button 
              onClick={() => handleScrollToSection('jobs')} 
              className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
            >
              {currentContent.jobs}
            </button>
            
            {/* Minimal Contact Button - now completely minimal */}
            <button 
              onClick={() => handleContactClick('contact')}
              className="ml-3 px-5 py-2 rounded-md font-medium transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
            >
              {currentContent.contact}
            </button>
          </div>

          {/* Language Toggle */}
          <div className="hidden md:flex items-center ml-4">
            <div className="bg-gray-100/60 rounded-md p-0.5">
              <button
                onClick={() => onLanguageChange('is')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 ${
                  currentLanguage === 'is' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                IS
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 ${
                  currentLanguage === 'en' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
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
          <div className="md:hidden absolute top-full left-0 right-0 mt-1">
            <div className="mx-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/40 overflow-hidden">
              <div className="px-4 py-3 space-y-1">
                <Link
                  to={getHomeUrl()}
                  onClick={closeMenus}
                  className="block w-full text-left px-3 py-2.5 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100"
                >
                  {currentContent.home}
                </Link>
                
                {/* Services Section in Mobile */}
                <div>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {currentContent.services}
                  </div>
                  <div className="ml-3 space-y-1">
                    <Link
                      to={getSimsvorunUrl()}
                      onClick={closeMenus}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    >
                      {currentContent.servicesDropdown.simsvorun}
                    </Link>
                    <button
                      onClick={() => handleServiceSelect('ai')}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    >
                      {currentContent.servicesDropdown.ai}
                    </button>
                    <Link
                      to={getBokhaldsthjonustaUrl()}
                      onClick={closeMenus}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    >
                      {currentContent.servicesDropdown.bokhaldsthjonusta}
                    </Link>
                    <button
                      onClick={() => handleServiceSelect('web')}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    >
                      {currentContent.servicesDropdown.web}
                    </button>
                    <button
                      onClick={() => handleServiceSelect('uthringar')}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    >
                      {currentContent.servicesDropdown.uthringar}
                    </button>
                  </div>
                </div>
                
                <Link
                  to={getTeamUrl()}
                  onClick={closeMenus}
                  className="block w-full text-left px-3 py-2.5 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100"
                >
                  {currentContent.team}
                </Link>
                
                <button
                  onClick={() => handleScrollToSection('jobs')}
                  className="block w-full text-left px-3 py-2.5 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                >
                  {currentContent.jobs}
                </button>
                
                <button
                  onClick={() => handleContactClick('contact')}
                  className="w-full mt-3 px-4 py-2.5 rounded-md font-medium transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                >
                  {currentContent.contact}
                </button>
                
                {/* Mobile Language Toggle */}
                <div className="flex items-center justify-center mt-4 pt-3 border-t border-gray-200/60">
                  <div className="bg-gray-100/60 rounded-md p-0.5">
                    <button
                      onClick={() => onLanguageChange('is')}
                      className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 ${
                        currentLanguage === 'is' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-600'
                      }`}
                    >
                      IS
                    </button>
                    <button
                      onClick={() => onLanguageChange('en')}
                      className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 ${
                        currentLanguage === 'en' 
                          ? 'bg-white text-gray-900 shadow-sm' 
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