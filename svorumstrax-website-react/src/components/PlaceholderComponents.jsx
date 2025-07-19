// Placeholder components - these will be developed in subsequent steps

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

export const ContactModal = ({ isOpen, onClose, type, currentLanguage }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Hafðu samband</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Modal functionality will be implemented in the next step.
        </p>
        <button
          onClick={onClose}
          className="w-full btn-primary"
        >
          Loka
        </button>
      </div>
    </div>
  )
}
