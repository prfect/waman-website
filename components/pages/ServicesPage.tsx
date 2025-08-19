// components/pages/ServicesPage.tsx
import React, { useState } from 'react'
import { 
  ArrowLeft, Search, Filter, Layers, CheckCircle, ArrowRight,
  Droplets, Shield, Globe, TrendingUp, Target, Recycle, Wrench,
  Users, Calendar, Award
} from 'lucide-react'
import { Service, ServiceCategory, BaseComponentProps } from '../../types'
import { getServiceIcon, getServiceColor } from '../../utils/icons'

interface ServicesPageProps extends BaseComponentProps {
  services: Service[]
  serviceCategories: {[key: string]: ServiceCategory}
  selectedCategory?: string
  onBack: () => void
  onServiceClick: (service: Service) => void
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  services, 
  serviceCategories,
  selectedCategory,
  currentLang, 
  onBack,
  onServiceClick,
  t 
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState(selectedCategory || 'all')

  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = !searchTerm || 
      service.titleFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.titleEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.descriptionFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.descriptionEn?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory
    
    return matchesSearch && matchesCategory && service.active !== false
  })

  const categories = Object.keys(serviceCategories)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={onBack}
              className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">WAMAN CONSULTING</h1>
                <p className="text-xs text-gray-600">Nos spécialisations</p>
              </div>
            </button>
            
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Retour</span>
            </button>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-6">
              <Layers className="w-4 h-4 mr-2" />
              Expertise Technique Approfondie
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Spécialisations en Ingénierie de l'Eau
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Solutions techniques avancées et conseil stratégique pour tous vos projets 
              de ressources en eau et d'environnement depuis 2005.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-300" />
                <span>19+ ans d'expertise</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-300" />
                <span>15 experts seniors</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-300" />
                <span>{services.length} services spécialisés</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous ({services.length})
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category} ({serviceCategories[category].count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Results Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {activeCategory === 'all' ? 'Tous nos services' : activeCategory}
          </h2>
          <p className="text-gray-600">
            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} trouvé{filteredServices.length !== 1 ? 's' : ''}
            {searchTerm && ` pour "${searchTerm}"`}
          </p>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard 
                key={service.id}
                service={service}
                currentLang={currentLang}
                onServiceClick={onServiceClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun service trouvé</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? `Aucun service ne correspond à "${searchTerm}"`
                  : 'Aucun service dans cette catégorie'
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setActiveCategory('all')
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Contact CTA Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Besoin d'une expertise spécialisée ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour discuter de vos besoins spécifiques 
            en ingénierie de l'eau et obtenir une solution sur mesure.
          </p>
          <button 
            onClick={() => {
              onBack()
              setTimeout(() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }, 100)
            }}
            className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Demander une consultation
          </button>
        </div>
      </div>
    </div>
  )
}

// Service Card Component
const ServiceCard: React.FC<{
  service: Service
  currentLang: 'fr' | 'en'
  onServiceClick: (service: Service) => void
}> = ({ service, currentLang, onServiceClick }) => {
  const serviceTitle = currentLang === 'fr' ? service.titleFr : service.titleEn || service.titleFr
  const serviceDescription = currentLang === 'fr' ? service.descriptionFr : service.descriptionEn || service.descriptionFr

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer"
         onClick={() => onServiceClick(service)}>
      
      {/* Service Header */}
      <div className={`h-2 bg-gradient-to-r ${getServiceColor(service.category || '')}`}></div>
      
      {/* Service Image or Icon */}
      {service.image ? (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={service.image} 
            alt={serviceTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className={`h-32 bg-gradient-to-br ${getServiceColor(service.category || '')} flex items-center justify-center`}>
          <div className="text-white text-center">
            {getServiceIcon(service.category || '')}
            <p className="text-sm font-medium mt-2 opacity-90">{service.category}</p>
          </div>
        </div>
      )}
      
      <div className="p-6">
        
        {/* Service Category */}
        {service.category && (
          <div className="mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getServiceColor(service.category)} text-white`}>
              {service.category}
            </span>
          </div>
        )}
        
        {/* Service Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {serviceTitle}
        </h3>
        
        {/* Service Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {serviceDescription}
        </p>

        {/* Service Features */}
        {service.features && service.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Caractéristiques clés :</h4>
            <div className="space-y-1">
              {service.features.slice(0, 3).map((feature: any, index: number) => (
                <div key={index} className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-1">{typeof feature === 'string' ? feature : feature.name || feature.title}</span>
                </div>
              ))}
              {service.features.length > 3 && (
                <div className="text-xs text-blue-600 font-medium">
                  +{service.features.length - 3} autres caractéristiques
                </div>
              )}
            </div>
          </div>
        )}

        {/* Service Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Depuis {new Date(service.createdAt).getFullYear()}</span>
          </div>
          <div className="text-blue-600 hover:text-blue-700 font-medium flex items-center group-hover:translate-x-1 transition-transform">
            <span className="text-sm">En savoir plus</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </div>
  )
}