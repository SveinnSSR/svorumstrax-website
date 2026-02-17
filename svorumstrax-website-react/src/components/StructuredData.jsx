
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const StructuredData = ({ currentLanguage }) => {
  const location = useLocation()

  useEffect(() => {
    // Remove any existing structured data
    document.querySelectorAll('script[data-structured]').forEach(el => el.remove())

    const schemas = []

    // Organization schema — always present
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Svörum strax",
      "url": "https://svorumstrax.is",
      "logo": "https://svorumstrax.is/assets/svorumstrax-logo-black.png",
      "description": currentLanguage === 'is' 
        ? "Snjallar lausnir fyrir þjónustuver — símsvörun, gervigreindarlausnir, úthringingar og bókhaldsþjónusta."
        : "Smart customer service solutions — phone answering, AI solutions, outbound calling, and accounting services.",
      "foundingDate": "2019",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 35
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Barcelona",
        "addressCountry": "ES"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Iceland"
      },
      "sameAs": []
    })

    // Page-specific Service schemas
    const path = location.pathname

    if (path === '/' || path === '/en' || path === '/en/') {
      // Homepage — add WebSite schema for sitelinks search
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Svörum strax",
        "url": "https://svorumstrax.is",
        "inLanguage": ["is", "en"]
      })
    }

    if (path.includes('simsvorun') || path.includes('phone-service')) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": currentLanguage === 'is' ? "Símsvörun" : "Phone Answering Service",
        "description": currentLanguage === 'is'
          ? "Áreiðanleg og persónuleg símsvörunarþjónusta fyrir fyrirtæki. Almenn símsvörun, þjónustuver og 24/7 gervigreindarsvörun."
          : "Reliable and professional phone answering service for businesses. General phone answering, contact center, and 24/7 AI-powered support.",
        "provider": {
          "@type": "Organization",
          "name": "Svörum strax"
        },
        "serviceType": "Phone Answering Service",
        "areaServed": { "@type": "Country", "name": "Iceland" },
        "url": currentLanguage === 'is' 
          ? "https://svorumstrax.is/simsvorun"
          : "https://svorumstrax.is/en/phone-service"
      })
    }

    if (path.includes('gervigreindarlausnir') || path.includes('ai-solutions')) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": currentLanguage === 'is' ? "Gervigreindarlausnir" : "AI Solutions",
        "description": currentLanguage === 'is'
          ? "Gervigreindarlausnir sérsniðnar að þínu fyrirtæki. Spjallmenni fyrir viðskiptavini, aðstoðarkerfi fyrir starfsfólk og gervigreind fyrir tölvupóst."
          : "AI solutions customized for your business. Customer-facing chatbots, internal staff support systems, and AI-powered email responses.",
        "provider": {
          "@type": "Organization",
          "name": "Svörum strax"
        },
        "serviceType": "Artificial Intelligence Solutions",
        "areaServed": { "@type": "Country", "name": "Iceland" },
        "url": currentLanguage === 'is'
          ? "https://svorumstrax.is/gervigreindarlausnir"
          : "https://svorumstrax.is/en/ai-solutions"
      })
    }

    if (path.includes('uthringar') || path.includes('outbound-calling')) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": currentLanguage === 'is' ? "Úthringingar" : "Outbound Calling",
        "description": currentLanguage === 'is'
          ? "Sérhæfð söluteymi fyrir B2B og B2C markað. Úthringiverkefni, markaðsrannsóknir og viðskiptavinaþjónusta."
          : "Specialized sales teams for B2B and B2C markets. Outbound calling campaigns, market research, and customer retention.",
        "provider": {
          "@type": "Organization",
          "name": "Svörum strax"
        },
        "serviceType": "Outbound Calling Service",
        "areaServed": { "@type": "Country", "name": "Iceland" },
        "url": currentLanguage === 'is'
          ? "https://svorumstrax.is/uthringar"
          : "https://svorumstrax.is/en/outbound-calling"
      })
    }

    if (path.includes('bokhaldsthjonusta') || path.includes('accounting')) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": currentLanguage === 'is' ? "Bókhaldsþjónusta" : "Accounting Services",
        "description": currentLanguage === 'is'
          ? "Nútímaleg bókhaldsþjónusta með Uniconta. Færsla bókhalds, virðisaukaskattskil, reikningsskil og skattskil."
          : "Modern accounting services with Uniconta. Bookkeeping, VAT returns, financial statements, and tax returns.",
        "provider": {
          "@type": "Organization",
          "name": "Svörum strax"
        },
        "serviceType": "Accounting Service",
        "areaServed": { "@type": "Country", "name": "Iceland" },
        "url": currentLanguage === 'is'
          ? "https://svorumstrax.is/bokhaldsthjonusta"
          : "https://svorumstrax.is/en/accounting"
      })
    }

    // Inject all schemas
    schemas.forEach((schema, i) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-structured', `schema-${i}`)
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    })

    // Cleanup on unmount
    return () => {
      document.querySelectorAll('script[data-structured]').forEach(el => el.remove())
    }
  }, [location.pathname, currentLanguage])

  return null
}

export default StructuredData