import footerLogo from '../assets/images/svorum-strax-footer-logo.svg'

const Footer = ({ currentLanguage, onContactClick }) => {
  const content = {
    is: {
      description: 'Öflugt þjónustuver í Barcelona með 35+ íslenska sérfræðinga. Við samþættum mannlega þjónustu og gervigreind til að veita framúrskarandi upplifun fyrir þína viðskiptavini.',
      legalText: 'Svörum strax er stofnað og rekið í Barcelona á Spáni.',
      legalEntity: 'El MUNDO BUENO DE ISLANDIA, SOCIEDAD LIMITADA.',
      services: {
        title: 'Þjónusta',
        items: [
          { name: 'Símsvörun', action: 'phone-support' },
          { name: 'Tölvupóstþjónusta', action: 'email-service' },
          { name: 'AI þjónusta', action: 'ai-service' },
          { name: 'Viðskiptagreining', action: 'analytics' },
          { name: 'Úthringingar', action: 'outbound' },
          { name: 'Stöðugildi', action: 'fte' }
        ]
      },
      company: {
        title: 'Fyrirtækið',
        items: [
          { name: 'Um okkur', href: '#um-okkur' },
          { name: 'Störf', action: 'job' },
          { name: 'Mannauður', href: '/mannaudur' },
          { name: 'Barcelona', href: '#barcelona' },
          { name: 'Viðskiptavinir', href: '#clients' }
        ]
      },
      contact: {
        title: 'Hafðu samband',
        email: 'svorumstrax@svorumstrax.is',
        phone: '537-0800',
        location: 'Barcelona, Spánn'
      },
      copyright: '© 2025 Svörum strax. Allur réttur áskilinn.'
    },
    en: {
      description: 'Powerful contact center in Barcelona with 35+ Icelandic experts. We integrate human service and artificial intelligence to provide outstanding experience for your customers.',
      legalText: 'Svörum strax is founded and operated in Barcelona, Spain.',
      legalEntity: 'El MUNDO BUENO DE ISLANDIA, SOCIEDAD LIMITADA.',
      services: {
        title: 'Services',
        items: [
          { name: 'Phone Support', action: 'phone-support' },
          { name: 'Email Service', action: 'email-service' },
          { name: 'AI Service', action: 'ai-service' },
          { name: 'Business Analytics', action: 'analytics' },
          { name: 'Outbound Calls', action: 'outbound' },
          { name: 'FTEs', action: 'fte' }
        ]
      },
      company: {
        title: 'Company',
        items: [
          { name: 'About Us', href: '#about' },
          { name: 'Jobs', action: 'job' },
          { name: 'Our Team', href: '/team' },
          { name: 'Barcelona', href: '#barcelona' },
          { name: 'Clients', href: '#clients' }
        ]
      },
      contact: {
        title: 'Contact',
        email: 'svorumstrax@svorumstrax.is',
        phone: '537-0800',
        location: 'Barcelona, Spain'
      },
      copyright: '© 2025 Svörum strax. All rights reserved.'
    }
  }

  const currentContent = content[currentLanguage]

  // SVG Icons
  const EmailIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )

  const PhoneIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )

  const LocationIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )

  const handleLinkClick = (item) => {
    if (item.action) {
      onContactClick(item.action)
    }
  }

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          
          {/* Company Column */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <div className="mb-8">
              <img 
                src={footerLogo} 
                alt="Svörum strax" 
                className="h-10 w-auto"
              />
            </div>
            
            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {currentContent.description}
            </p>
            
            {/* Legal Entity */}
            <p className="text-gray-600 text-xs">
              {currentContent.legalEntity}
            </p>
          </div>
          
          {/* Services Column */}
          <div>
            <h4 className="text-gray-400 uppercase tracking-wider text-xs font-semibold mb-6">
              {currentContent.services.title}
            </h4>
            <ul className="space-y-3">
              {currentContent.services.items.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(item)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm text-left block"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Links Column */}
          <div>
            <h4 className="text-gray-400 uppercase tracking-wider text-xs font-semibold mb-6">
              {currentContent.company.title}
            </h4>
            <ul className="space-y-3">
              {currentContent.company.items.map((item, index) => (
                <li key={index}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <button
                      onClick={() => handleLinkClick(item)}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm text-left block"
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Column */}
          <div>
            <h4 className="text-gray-400 uppercase tracking-wider text-xs font-semibold mb-6">
              {currentContent.contact.title}
            </h4>
            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center space-x-3">
                <div className="text-orange-400 flex-shrink-0">
                  <EmailIcon />
                </div>
                <a
                  href={`mailto:${currentContent.contact.email}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {currentContent.contact.email}
                </a>
              </div>
              
              {/* Phone */}
              <div className="flex items-center space-x-3">
                <div className="text-orange-400 flex-shrink-0">
                  <PhoneIcon />
                </div>
                <a
                  href={`tel:+354${currentContent.contact.phone.replace('-', '')}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {currentContent.contact.phone}
                </a>
              </div>
              
              {/* Location */}
              <div className="flex items-center space-x-3">
                <div className="text-orange-400 flex-shrink-0">
                  <LocationIcon />
                </div>
                <span className="text-gray-300 text-sm">
                  {currentContent.contact.location}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              {currentContent.copyright}
            </p>
            <div className="mt-4 sm:mt-0">
              <p className="text-gray-500 text-xs">
                {currentContent.legalText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer