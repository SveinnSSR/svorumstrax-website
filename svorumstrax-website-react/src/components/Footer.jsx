import footerLogo from '../assets/images/svorum-strax-logo.svg'

const Footer = ({ currentLanguage, onContactClick, onNavigate }) => {
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
          { name: 'Um okkur', href: '#about' },
          { name: 'Störf', action: 'job' },
          { name: 'Mannauður', action: 'staff' },
          { name: 'Barcelona', href: '#jobs' },
          { name: 'Viðskiptavinir', href: '#about' }
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
      description: 'Advanced customer service center in Barcelona with 35+ Icelandic specialists. We combine human expertise and AI technology to deliver exceptional experiences for your customers.',
      legalText: 'Svörum strax is founded and operated in Barcelona, Spain.',
      legalEntity: 'El MUNDO BUENO DE ISLANDIA, SOCIEDAD LIMITADA.',
      services: {
        title: 'Services',
        items: [
          { name: 'Phone Support', action: 'phone-support' },
          { name: 'Email Management', action: 'email-service' },
          { name: 'AI Solutions', action: 'ai-service' },
          { name: 'Business Analytics', action: 'analytics' },
          { name: 'Outbound Sales', action: 'outbound' },
          { name: 'Dedicated Teams', action: 'fte' }
        ]
      },
      company: {
        title: 'Company',
        items: [
          { name: 'About', href: '#about' },
          { name: 'Careers', action: 'job' },
          { name: 'Team', action: 'staff' },
          { name: 'Barcelona', href: '#jobs' },
          { name: 'Clients', href: '#about' }
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

  // SVG Icons with subtle styling
  const EmailIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )

  const PhoneIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )

  const LocationIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )

  const handleLinkClick = (item) => {
    if (item.action === 'staff') {
      onNavigate('staff')
    } else if (item.action) {
      onContactClick(item.action)
    }
  }

  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50/80 border-t border-gray-200/60">
      {/* Subtle premium gradient overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,_rgba(226,232,240,0.8)_0%,_transparent_40%)]"></div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_80%,_rgba(248,250,252,0.9)_0%,_transparent_40%)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
        {/* Main Footer Content - Mobile optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          
          {/* Company Column - Mobile optimized */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="mb-6 sm:mb-8">
              <img 
                src={footerLogo} 
                alt="Svörum strax" 
                className="h-8 sm:h-10 w-auto opacity-90 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
            
            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 sm:mb-6">
              {currentContent.description}
            </p>
            
            {/* Legal Entity */}
            <p className="text-gray-500 text-xs font-medium">
              {currentContent.legalEntity}
            </p>
          </div>
          
          {/* Services Column */}
          <div>
            <h4 className="text-gray-900 uppercase tracking-wider text-xs font-bold mb-4 sm:mb-6">
              {currentContent.services.title}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {currentContent.services.items.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(item)}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm text-left block font-medium"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Links Column */}
          <div>
            <h4 className="text-gray-900 uppercase tracking-wider text-xs font-bold mb-4 sm:mb-6">
              {currentContent.company.title}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {currentContent.company.items.map((item, index) => (
                <li key={index}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <button
                      onClick={() => handleLinkClick(item)}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm text-left block font-medium"
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Column - Mobile optimized */}
          <div>
            <h4 className="text-gray-900 uppercase tracking-wider text-xs font-bold mb-4 sm:mb-6">
              {currentContent.contact.title}
            </h4>
            <div className="space-y-3 sm:space-y-4">
              {/* Email */}
              <div className="flex items-center space-x-3 group">
                <div className="text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0">
                  <EmailIcon />
                </div>
                <a
                  href={`mailto:${currentContent.contact.email}`}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm break-all font-medium"
                >
                  {currentContent.contact.email}
                </a>
              </div>
              
              {/* Phone */}
              <div className="flex items-center space-x-3 group">
                <div className="text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0">
                  <PhoneIcon />
                </div>
                <a
                  href={`tel:+354${currentContent.contact.phone.replace('-', '')}`}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                >
                  {currentContent.contact.phone}
                </a>
              </div>
              
              {/* Location */}
              <div className="flex items-center space-x-3 group">
                <div className="text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0">
                  <LocationIcon />
                </div>
                <span className="text-gray-600 text-sm font-medium">
                  {currentContent.contact.location}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Mobile optimized with premium divider */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 relative">
          {/* Premium subtle divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/60 to-transparent"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-500 text-sm text-center sm:text-left font-medium">
              {currentContent.copyright}
            </p>
            <p className="text-gray-400 text-xs text-center sm:text-right">
              {currentContent.legalText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer