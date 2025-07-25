import React from 'react'

// Import staff images - add these to src/assets/images/staff/
import arisCrespoImg from '../assets/images/staff/aris-crespo.jpeg'
import bryndisAsgeirsdottirImg from '../assets/images/staff/bryndis-asgeirsdottir.jpeg'
import danielIrvineImg from '../assets/images/staff/daniel-irvine.jpeg'
import danielThorstensenImg from '../assets/images/staff/daniel-thorstensen.jpeg'
import davidHlynssonImg from '../assets/images/staff/david-hlynsson.jpeg'
import elmaThorhallsdottirImg from '../assets/images/staff/elma-thorhallsdottir.jpeg'
import joelKristinssonImg from '../assets/images/staff/joel-kristinsson.jpeg'
import oddnyOddsdottirImg from '../assets/images/staff/oddny-oddsdottir.jpeg'
import sigrunJonsdottirImg from '../assets/images/staff/sigrun-jonsdottir.jpeg'
import sveinnRafnssonImg from '../assets/images/staff/sveinn-rafnsson.jpeg'

const StaffPage = ({ currentLanguage = 'is' }) => {
  const content = {
    is: {
      title: 'Mannauður',
      heroIntro: 'Hjá Svörum strax starfa yfir 35 íslenskir sérfræðingar í Barcelona og víðar á Spáni sem deila ástríðu fyrir framúrskarandi þjónustu. Við sameinum reynslu, nýsköpun og alþjóðlegt sjónarhorn til að skapa einstakt vinnuumhverfi þar sem fagmennska og gleði fara saman.',
      heroIntro2: 'Fjölbreyttur bakgrunnur starfsfólks okkar, nútímaleg tækni og sveigjanleg vinnuaðstaða gera okkur kleift að veita persónulega og skilvirka þjónustu sem stenst alþjóðlegan samanburð.',
      founderBadge: 'Stofnandi'
    },
    en: {
      title: 'Our Team',
      heroIntro: 'At Svörum strax, over 35 Icelandic experts work in Barcelona and across Spain, all sharing a passion for outstanding service. We combine experience, innovation, and an international perspective to create a unique work environment where professionalism and joy go together.',
      heroIntro2: 'The diverse background of our staff, modern technology and flexible workplace enable us to provide personal and efficient service that meets international standards.',
      founderBadge: 'Founder'
    }
  }

  // Staff data with all emails added
  const staffMembers = [
    // Founders
    {
      id: 'daniel-irvine',
      name: 'Daníel Þór Irvine',
      title: { is: 'Framkvæmdastjóri', en: 'CEO' },
      email: 'daniel@svorumstrax.is',
      image: danielIrvineImg,
      isFounder: true
    },
    {
      id: 'aris-crespo',
      name: 'Aris Crespo',
      title: { is: 'Mannauðsstjóri', en: 'Head of People & Culture' },
      email: 'aris@svorumstrax.is',
      image: arisCrespoImg,
      isFounder: true
    },
    {
      id: 'sveinn-rafnsson',
      name: 'Sveinn Sigurður Rafnsson',
      title: { is: 'Viðskiptaþróunarstjóri', en: 'CTO / Head of Business Development' },
      email: 'sveinn@svorumstrax.is',
      image: sveinnRafnssonImg,
      isFounder: true
    },
    // Leadership team
    {
      id: 'elma-thorhallsdottir',
      name: 'Elma Jenný Þórhallsdóttir',
      title: { is: 'Yfirmaður í Þjónustuveri', en: 'Head of Customer Service' },
      email: 'elma.j@svorumstrax.is',
      image: elmaThorhallsdottirImg
    },
    {
      id: 'bryndis-asgeirsdottir',
      name: 'Bryndís Þóra Ásgeirsdóttir',
      title: { is: 'Verkefnastjóri', en: 'Project Manager' },
      email: 'bryndis@svorumstrax.is',
      image: bryndisAsgeirsdottirImg
    },
    {
      id: 'oddny-oddsdottir',
      name: 'Oddný Halldóra Oddsdóttir',
      title: { is: 'UX/UI Hönnuður og forritari', en: 'Full-Stack Designer / Developer' },
      email: 'oddny@svorumstrax.is',
      image: oddnyOddsdottirImg
    },
    {
      id: 'daniel-thorstensen',
      name: 'Daníel Thorstensen',
      title: { is: 'Viðskiptastjóri', en: 'Key Account Manager' },
      email: 'daniel.t@svorumstrax.is',
      image: danielThorstensenImg
    },
    {
      id: 'david-hlynsson',
      name: 'Davíð Freyr Hlynsson',
      title: { is: 'Vefsíðu- og kerfisstjóri', en: 'Web and Systems Manager' },
      email: 'david@svorumstrax.is',
      image: davidHlynssonImg
    },
    {
      id: 'joel-kristinsson',
      name: 'Jóel Kristinsson',
      title: { is: 'Rekstrarstjóri Bókhaldssviðs', en: 'Operations Manager - Accounting' },
      email: 'joel@svorumstrax.is',
      image: joelKristinssonImg
    },
    // Team members
    {
      id: 'frosti-wendel',
      name: 'Frosti Wendel',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'frosti@svorumstrax.is',
      initials: 'FW'
    },
    {
      id: 'sigrun-jonsdottir',
      name: 'Sigrún Fanný Jónsdóttir',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'sigrun@svorumstrax.is',
      image: sigrunJonsdottirImg
    },
    {
      id: 'steinunn-axelsdottir',
      name: 'Steinunn Halldóra Axelsdóttir',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'steinunn@svorumstrax.is',
      initials: 'SHA'
    },
    {
      id: 'freyja-finnbogadottir',
      name: 'Freyja Finnbogadóttir',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'freyja@svorumstrax.is',
      initials: 'FF'
    },
    {
      id: 'theodora-rodriguez',
      name: 'Theodóra Líf Rodriguez Davíðsdóttir',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'theodora@svorumstrax.is',
      initials: 'TLRD'
    },
    {
      id: 'aron-arnarsson',
      name: 'Aron Arnarsson',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'aron@svorumstrax.is',
      initials: 'AA'
    },
    {
      id: 'eydis-agustsdottir',
      name: 'Eydís Erla Ágústsdóttir',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'eydis@svorumstrax.is',
      initials: 'EEÁ'
    },
    {
      id: 'hildur-olafsdottir',
      name: 'Hildur Ósk Ólafsdóttir',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'hildur@svorumstrax.is',
      initials: 'HOÓ'
    },
    {
      id: 'gunnar-dagmararson',
      name: 'Gunnar Óli Dagmararson',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'gunnar@svorumstrax.is',
      initials: 'GOD'
    },
    {
      id: 'klara-haraldsdottir',
      name: 'Klara Valgerður Inga Haraldsdóttir',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'klara@svorumstrax.is',
      initials: 'KVIH'
    },
    {
      id: 'veigar-helgason',
      name: 'Veigar Már Helgason',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'veigar@svorumstrax.is',
      initials: 'VMH'
    },
    {
      id: 'tatjana-tanja',
      name: 'Tatjana Tanja',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'tanja@svorumstrax.is',
      initials: 'TT'
    },
    {
      id: 'maria-mikaelsdottir',
      name: 'María Mikaelsdóttir',
      title: { is: 'Bókhald og Viðskiptastjórnun', en: 'Accounting and Business Management' },
      email: 'maria@svorumstrax.is',
      initials: 'MM'
    },
    {
      id: 'embla-torfadottir',
      name: 'Embla Torfadóttir',
      title: { is: 'Viðskiptastjóri', en: 'Account Manager' },
      email: 'embla@svorumstrax.is',
      initials: 'ET'
    },
    {
      id: 'unnar-benediktsson',
      name: 'Unnar Þór Benediktsson',
      title: { is: 'Þjónustufulltrúi', en: 'Customer Support Specialist' },
      email: 'unnar@svorumstrax.is',
      initials: 'UÞB'
    }
  ]

  const currentContent = content[currentLanguage]

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 3)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Staff Hero Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Subtle background effects matching hero */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-50/40 via-teal-50/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-50/40 via-amber-50/20 to-transparent"></div>
          
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-orange-100/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            {/* Title matching hero style - clean and minimal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight text-slate-900">
              {currentContent.title}
            </h1>
            
            {/* Introduction in a card */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100">
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-6">
                  {currentContent.heroIntro}
                </p>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {currentContent.heroIntro2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Grid Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {staffMembers.map((member) => (
              <div 
                key={member.id}
                className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Avatar */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full shadow-lg ring-4 ring-white"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                      <span className="text-white text-2xl font-bold">
                        {member.initials || getInitials(member.name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                  {member.name}
                </h3>

                {/* Title */}
                <p className="text-gray-600 text-sm mb-4">
                  {member.title[currentLanguage]}
                </p>

                {/* Founder Badge - ultra subtle, just text */}
                {member.isFounder && (
                  <div className="text-gray-600 text-xs font-medium mb-3">
                    {currentContent.founderBadge}
                  </div>
                )}

                {/* Email - improved styling */}
                {member.email && (
                  <a 
                    href={`mailto:${member.email}`}
                    className="text-slate-700 hover:text-slate-900 text-sm font-medium transition-colors duration-200 block hover:underline underline-offset-2"
                  >
                    {member.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default StaffPage
