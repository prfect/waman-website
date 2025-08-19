// components/sections/ServicesOverview.tsx
import React from 'react'
import { Wrench, ArrowRight } from 'lucide-react'
import { getServiceIcon, getServiceColor } from '../../utils/icons'
import { Service, ServiceCategory, CategoryProps } from '../../types'

interface ServicesOverviewProps extends CategoryProps {
  services: Service[]
  serviceCategories: {[key: string]: ServiceCategory}
  loading: boolean
  setSelectedService: (service: any) => void
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ 
  serviceCategories, 
  services, 
  loading, 
  currentLang, 
  setCurrentPage, 
  setSelectedService, 
  t 
}) => (
  <section id="services" className="py-24 relative" style={{
    backgroundColor: '#f9fafb',
    backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)`,
    backgroundSize: '50px 50px'
  }}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
          <Wrench className="w-4 h-4 inline mr-2" />
          {t('ourSpecializations')}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {t('engineeringSolutions')}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          {currentLang === 'fr' 
            ? 'Expertise technique exclusive et conseil stratégique pour tous vos projets de ressources en eau et d\'environnement.'
            : 'Exclusive technical expertise and strategic consulting for all your water resources and environmental projects.'
          }
        </p>
        <button
          onClick={() => setCurrentPage('services')}
          className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {t('seeAllSpecializations')} ({services.length})
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(serviceCategories).slice(0, 6).map(([key, category]) => (
            <div 
              key={key} 
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 cursor-pointer"
              onClick={() => {
                setCurrentPage('services')
                setSelectedService(key)
              }}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getServiceColor(category.title)} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {getServiceIcon(category.title)}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {category.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {currentLang === 'fr' 
                  ? `Solutions spécialisées en ${category.title.toLowerCase()} avec une approche technique et durable adaptée aux défis hydriques du Maroc.`
                  : `Specialized solutions in ${category.title.toLowerCase()} with a technical and sustainable approach adapted to Morocco's water challenges.`
                }
              </p>

              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-medium text-sm">
                  {category.count} {t('services')}{category.count > 1 ? 's' : ''} spécialisé{category.count > 1 ? 's' : ''}
                </span>
                
                <div className="text-blue-600 hover:text-blue-700 font-medium flex items-center group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100">
                  <span className="text-sm">{t('discover')}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
)