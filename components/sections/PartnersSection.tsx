// components/sections/PartnersSection.tsx (Enhanced Display)
import React from 'react'
import { Users, ExternalLink, Building, Award, Globe, CheckCircle } from 'lucide-react'
import { Partner, SectionProps } from '../../types'

interface PartnersSectionProps extends SectionProps {
  partners: Partner[]
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ 
  partners, 
  loading, 
  currentLang, 
  setCurrentPage,
  t 
}) => {
  // Group partners by category
  const partnersByCategory = partners.reduce((acc: {[key: string]: Partner[]}, partner) => {
    if (partner.active !== false) {
      const category = partner.category || 'Autres'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(partner)
    }
    return acc
  }, {})

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'institution publique': return <Building className="w-5 h-5 text-blue-600" />
      case 'organisation internationale': return <Globe className="w-5 h-5 text-green-600" />
      case 'entreprise privée': return <Award className="w-5 h-5 text-purple-600" />
      case 'ong': return <CheckCircle className="w-5 h-5 text-orange-600" />
      default: return <Users className="w-5 h-5 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'institution publique': return 'from-blue-500 to-blue-600'
      case 'organisation internationale': return 'from-green-500 to-green-600'
      case 'entreprise privée': return 'from-purple-500 to-purple-600'
      case 'ong': return 'from-orange-500 to-orange-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <section id="clients-partners" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            Réseau Professionnel
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Nos Clients & Partenaires de Confiance
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Collaborations stratégiques avec les institutions publiques, organisations internationales 
            et acteurs du développement pour des projets d'envergure.
          </p>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{partners.length}+</div>
              <div className="text-gray-600 font-medium">Partenaires actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">19+</div>
              <div className="text-gray-600 font-medium">Années de collaboration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Satisfaction client</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des partenaires...</p>
          </div>
        ) : (
          <>
            {Object.keys(partnersByCategory).length > 0 ? (
              <div className="space-y-16">
                {Object.entries(partnersByCategory).map(([category, categoryPartners]) => (
                  <div key={category} className="relative">
                    
                    {/* Category Header */}
                    <div className="text-center mb-10">
                      <div className="inline-flex items-center space-x-3 mb-4">
                        {getCategoryIcon(category)}
                        <h3 className="text-2xl font-bold text-gray-900">
                          {category}
                        </h3>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {categoryPartners.length}
                        </span>
                      </div>
                    </div>

                    {/* Partners Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                      {categoryPartners.map((partner: Partner) => (
                        <div 
                          key={partner.id} 
                          className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center border border-gray-100 relative overflow-hidden"
                        >
                          {/* Background Gradient */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(category)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                          
                          {/* Partner Logo */}
                          <div className="relative mb-4">
                            {partner.logo ? (
                              <div className="w-20 h-20 mx-auto mb-3 relative">
                                <img 
                                  src={partner.logo} 
                                  alt={partner.name}
                                  className="w-full h-full object-contain rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0"
                                />
                                {/* Subtle glow effect */}
                                <div className="absolute inset-0 rounded-lg shadow-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" 
                                     style={{boxShadow: `0 0 20px ${getCategoryColor(category).includes('blue') ? '#3b82f6' : getCategoryColor(category).includes('green') ? '#10b981' : getCategoryColor(category).includes('purple') ? '#8b5cf6' : '#f59e0b'}33`}}></div>
                              </div>
                            ) : (
                              <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${getCategoryColor(category)} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300 mb-3`}>
                                <Building className="w-10 h-10" />
                              </div>
                            )}
                          </div>
                          
                          {/* Partner Name */}
                          <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                            {partner.name}
                          </h4>

                          {/* Partner URL */}
                          {partner.url && (
                            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <a 
                                href={partner.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-xs font-medium"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>Visiter</span>
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </div>
                          )}

                          {/* Hover overlay */}
                          <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-blue-200 transition-all duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-50 rounded-xl p-12 max-w-lg mx-auto">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun partenaire disponible</h3>
                  <p className="text-gray-600">Les partenaires apparaîtront bientôt ici.</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}