// components/pages/ServiceDetailPage.tsx
import React from 'react'
import { 
  ArrowLeft, CheckCircle, Wrench, Award, Users, 
  Target, Calendar, Droplets, Star, ArrowRight
} from 'lucide-react'
import { Service, BaseComponentProps } from '../../types'
import { getServiceIcon, getServiceColor } from '../../utils/icons'

interface ServiceDetailPageProps extends BaseComponentProps {
  service: Service
  onBack: () => void
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ 
  service, 
  currentLang, 
  onBack, 
  t 
}) => {
  const serviceTitle = currentLang === 'fr' ? service.titleFr : service.titleEn || service.titleFr
  const serviceDescription = currentLang === 'fr' ? service.descriptionFr : service.descriptionEn || service.descriptionFr

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
                <p className="text-xs text-gray-600">Retour aux services</p>
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

      {/* Service Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              
              {/* Service Header */}
              <div className={`h-64 bg-gradient-to-br ${getServiceColor(service.category || '')} flex items-center justify-center relative`}>
                {service.image ? (
                  <img 
                    src={service.image} 
                    alt={serviceTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-white">
                    {getServiceIcon(service.category || '')}
                    <h2 className="text-xl font-semibold mt-4 opacity-90">{service.category}</h2>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {service.category}
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-10">
                
                {/* Service Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {serviceTitle}
                </h1>
                
                {/* Service Description */}
                <div className="prose prose-lg prose-blue max-w-none mb-8">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {serviceDescription}
                  </p>
                </div>

                {/* Service Features */}
                {service.features && service.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Award className="w-6 h-6 mr-3 text-blue-600" />
                      Caractéristiques de ce service
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {service.features.map((feature: any, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">
                            {typeof feature === 'string' ? feature : feature.name || feature.title || 'Caractéristique du service'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Methodology */}
                <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Wrench className="w-5 h-5 mr-2 text-blue-600" />
                    Notre approche méthodologique
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Notre équipe d'experts seniors applique une méthodologie rigoureuse et éprouvée pour ce service, 
                    en respectant les normes internationales et en adaptant nos solutions au contexte local marocain.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Analyse</h4>
                      <p className="text-sm text-gray-600">Étude approfondie des besoins</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-green-600 font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Conception</h4>
                      <p className="text-sm text-gray-600">Solutions techniques adaptées</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-purple-600 font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Mise en œuvre</h4>
                      <p className="text-sm text-gray-600">Accompagnement et suivi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Service Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Détails du service</h3>
              <div className="space-y-4">
                
                <div className="flex items-start space-x-3">
                  <Wrench className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Catégorie</span>
                    <span className="text-gray-900 font-semibold">{service.category}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Disponible depuis</span>
                    <span className="text-gray-900 font-semibold">{new Date(service.createdAt).getFullYear()}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Statut</span>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span>Service actif</span>
                    </div>
                  </div>
                </div>

                {service.serviceOrder && (
                  <div className="flex items-start space-x-3">
                    <Star className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Priorité</span>
                      <span className="text-gray-900 font-semibold">Service #{service.serviceOrder}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Service Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Avantages de ce service</h3>
              <div className="space-y-4">
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Expertise</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">19+ ans</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Qualité</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">Certifiée</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Approche</span>
                  </div>
                  <span className="text-sm font-bold text-purple-600">Sur mesure</span>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Besoin de ce service ?</h3>
              <p className="text-blue-100 mb-4 leading-relaxed">
                Contactez nos experts pour discuter de vos besoins spécifiques 
                et obtenir un devis personnalisé.
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
                className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Demander un devis
              </button>
            </div>

            {/* Related Services */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Services connexes</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Gestion des ressources en eau</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Études d'impact environnemental</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Aménagement hydraulique</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}