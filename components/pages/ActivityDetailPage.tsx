// components/pages/ActivityDetailPage.tsx
import React from 'react'
import { 
  ArrowLeft, CheckCircle, Wrench, Award, Users, 
  Target, Calendar, Layers, Star, ArrowRight, Clock,
  FileText, Download, BookOpen, Droplets
} from 'lucide-react'

interface Activity {
  id: number
  slug: string
  titleFr: string
  titleEn?: string
  shortDescFr?: string
  shortDescEn?: string
  descriptionFr?: string
  descriptionEn?: string
  methodology?: string
  deliverables?: string[]
  duration?: string
  targetAudience?: string
  prerequisites?: string
  technologies?: string[]
  dataTypes?: string[]
  outputFormats?: string[]
  features?: string[]
  certifications?: string[]
  image?: string
  isFeatured: boolean
}

interface ActivityDetailPageProps {
  activity: Activity
  currentLang: 'fr' | 'en'
  onBack: () => void
  t: (key: string) => string
}

export const ActivityDetailPage: React.FC<ActivityDetailPageProps> = ({ 
  activity, 
  currentLang, 
  onBack, 
  t 
}) => {
  const activityTitle = currentLang === 'fr' ? activity.titleFr : activity.titleEn || activity.titleFr
  const activityDescription = currentLang === 'fr' ? activity.descriptionFr : activity.descriptionEn || activity.descriptionFr

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
                <p className="text-xs text-gray-600">Retour aux activités</p>
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

      {/* Activity Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              
              {/* Activity Header */}
              <div className="h-64 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center relative">
                {activity.image ? (
                  <img 
                    src={activity.image} 
                    alt={activityTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-white">
                    <Layers className="w-20 h-20 mx-auto mb-4 opacity-70" />
                    <h2 className="text-xl font-semibold opacity-90">Service WAMAN</h2>
                  </div>
                )}
                
                {/* Featured Badge */}
                {activity.isFeatured && (
                  <div className="absolute top-6 left-6">
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      Service recommandé
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6 md:p-10">
                
                {/* Activity Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {activityTitle}
                </h1>
                
                {/* Activity Description */}
                <div className="prose prose-lg prose-blue max-w-none mb-8">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {activityDescription || activity.shortDescFr || 'Service spécialisé en ingénierie de l\'eau et de l\'environnement.'}
                  </p>
                </div>

                {/* Methodology Section */}
                {activity.methodology && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Wrench className="w-6 h-6 mr-3 text-blue-600" />
                      Notre méthodologie
                    </h3>
                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {activity.methodology}
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Section */}
                {activity.features && activity.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Award className="w-6 h-6 mr-3 text-green-600" />
                      Avantages clés
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {activity.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deliverables Section */}
                {activity.deliverables && activity.deliverables.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <FileText className="w-6 h-6 mr-3 text-purple-600" />
                      Livrables
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {activity.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                          <Download className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies Section (for Géomatique services) */}
                {activity.technologies && activity.technologies.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Wrench className="w-6 h-6 mr-3 text-blue-600" />
                      Technologies utilisées
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activity.technologies.map((tech, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications Section (for Formation services) */}
                {activity.certifications && activity.certifications.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Award className="w-6 h-6 mr-3 text-orange-600" />
                      Certifications disponibles
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {activity.certifications.map((cert, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                          <BookOpen className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Approach Section */}
                <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Notre approche WAMAN
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Notre équipe d'experts applique une méthodologie rigoureuse pour ce service, 
                    en respectant les normes internationales et en adaptant nos solutions au contexte local marocain. 
                    L'approche WAMAN privilégie l'accompagnement personnalisé et le transfert de compétences.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Diagnostic</h4>
                      <p className="text-sm text-gray-600">Analyse des besoins spécifiques</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-green-600 font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Solutions</h4>
                      <p className="text-sm text-gray-600">Conception sur mesure</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-purple-600 font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Accompagnement</h4>
                      <p className="text-sm text-gray-600">Suivi et formation</p>
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
                
                {activity.duration && (
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Durée typique</span>
                      <span className="text-gray-900 font-semibold">{activity.duration}</span>
                    </div>
                  </div>
                )}

                {activity.targetAudience && (
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Public cible</span>
                      <span className="text-gray-900 font-semibold">{activity.targetAudience}</span>
                    </div>
                  </div>
                )}

                {activity.prerequisites && (
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Prérequis</span>
                      <span className="text-gray-900 font-semibold">{activity.prerequisites}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Statut</span>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span>Service actif</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Types (for Géomatique) */}
            {activity.dataTypes && activity.dataTypes.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Types de données</h3>
                <div className="space-y-2">
                  {activity.dataTypes.map((dataType, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <Layers className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">{dataType}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Output Formats */}
            {activity.outputFormats && activity.outputFormats.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Formats de livraison</h3>
                <div className="space-y-2">
                  {activity.outputFormats.map((format, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{format}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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