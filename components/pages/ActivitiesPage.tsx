// components/pages/ActivitiesPage.tsx - Fixed with safe navigation
import React, { useState } from 'react'
import { 
  ArrowLeft, Search, Layers, Calendar, ArrowRight, 
  CheckCircle, Target, Globe, Users, Wrench, Award
} from 'lucide-react'

interface ActivityCategory {
  id: number
  slug: string
  titleFr: string
  titleEn?: string
  descriptionFr?: string
  descriptionEn?: string
  displayOrder: number
  icon?: string
  color?: string
  subcategories: ActivitySubcategory[]
  activities: Activity[]
  _count?: { activities: number } // Made optional
}

interface ActivitySubcategory {
  id: number
  slug: string
  titleFr: string
  titleEn?: string
  displayOrder: number
  activities: Activity[]
}

interface Activity {
  id: number
  slug: string
  titleFr: string
  titleEn?: string
  shortDescFr?: string
  shortDescEn?: string
  descriptionFr?: string
  descriptionEn?: string
  image?: string
  isFeatured: boolean
  features?: string[]
  deliverables?: string[]
  duration?: string
  targetAudience?: string
}

interface ActivitiesPageProps {
  activityCategories: ActivityCategory[]
  selectedCategory?: string
  currentLang: 'fr' | 'en'
  onBack: () => void
  onActivityClick: (activity: Activity) => void
  t: (key: string) => string
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ 
  activityCategories = [], // Default to empty array
  selectedCategory,
  currentLang,
  onBack,
  onActivityClick,
  t 
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState(selectedCategory || 'all')
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)

  // Safe navigation for all activities
  const allActivities = Array.isArray(activityCategories) 
    ? activityCategories.flatMap(cat => {
        if (!cat) return []
        const categoryActivities = Array.isArray(cat.activities) ? cat.activities : []
        const subcategoryActivities = Array.isArray(cat.subcategories) 
          ? cat.subcategories.flatMap(sub => Array.isArray(sub?.activities) ? sub.activities : [])
          : []
        return [...categoryActivities, ...subcategoryActivities]
      })
    : []

  // Filter activities based on search and category
  const filteredActivities = allActivities.filter(activity => {
    if (!activity) return false
    
    const matchesSearch = !searchTerm || 
      (activity.titleFr && activity.titleFr.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (activity.titleEn && activity.titleEn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (activity.shortDescFr && activity.shortDescFr.toLowerCase().includes(searchTerm.toLowerCase()))
    
    if (activeCategory === 'all') return matchesSearch
    
    // Find which category this activity belongs to
    const parentCategory = activityCategories.find(cat => 
      cat && (
        (Array.isArray(cat.activities) && cat.activities.some(act => act && act.id === activity.id)) ||
        (Array.isArray(cat.subcategories) && cat.subcategories.some(sub => 
          sub && Array.isArray(sub.activities) && sub.activities.some(act => act && act.id === activity.id)
        ))
      )
    )
    
    return matchesSearch && parentCategory?.slug === activeCategory
  })

  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-8 h-8" />
      case 'Target': return <Target className="w-8 h-8" />
      case 'Globe': return <Globe className="w-8 h-8" />
      case 'Users': return <Users className="w-8 h-8" />
      default: return <Layers className="w-8 h-8" />
    }
  }

  // Safe calculation of total activities
  const totalActivities = Array.isArray(activityCategories) 
    ? activityCategories.reduce((total, cat) => {
        if (!cat) return total
        const count = cat._count?.activities || (Array.isArray(cat.activities) ? cat.activities.length : 0)
        return total + count
      }, 0)
    : 0

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
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">WAMAN CONSULTING</h1>
                <p className="text-xs text-gray-600">Nos activités techniques</p>
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
              Nos Activités en Ingénierie de l'Eau
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-8">
              Solutions complètes et expertise spécialisée : des services d'ingénierie aux conseils stratégiques, 
              de la géomatique à la formation technique depuis 2005.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-300" />
                <span>{activityCategories.length} domaines d'activité</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>{totalActivities} services spécialisés</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-300" />
                <span>19+ ans d'expertise</span>
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
                placeholder="Rechercher une activité..."
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
                Toutes ({totalActivities})
              </button>
              {Array.isArray(activityCategories) && activityCategories.map((category) => {
                if (!category) return null
                const count = category._count?.activities || (Array.isArray(category.activities) ? category.activities.length : 0)
                const title = currentLang === 'fr' ? category.titleFr : (category.titleEn || category.titleFr)
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.slug)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeCategory === category.slug
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {title} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Activities Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Category Overview - Show when viewing specific category */}
        {activeCategory !== 'all' && (
          <div className="mb-12">
            {activityCategories
              .filter(cat => cat && cat.slug === activeCategory)
              .map(category => {
                if (!category) return null
                
                const title = currentLang === 'fr' ? category.titleFr : (category.titleEn || category.titleFr)
                const description = currentLang === 'fr' ? category.descriptionFr : (category.descriptionEn || category.descriptionFr)
                const count = category._count?.activities || (Array.isArray(category.activities) ? category.activities.length : 0)
                const subcategories = Array.isArray(category.subcategories) ? category.subcategories : []
                
                return (
                  <div key={category.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color || 'from-blue-500 to-blue-600'} flex items-center justify-center shadow-lg`}>
                        {getIconComponent(category.icon)}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                          {title}
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                          {description}
                        </p>
                        
                        {/* Subcategories with pipe separation like GIS4DS */}
                        {subcategories.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Domaines spécialisés:</h4>
                            <div className="text-gray-600">
                              {subcategories
                                .filter(sub => sub && sub.titleFr)
                                .map(sub => currentLang === 'fr' ? sub.titleFr : (sub.titleEn || sub.titleFr))
                                .join(' | ')}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center text-sm text-blue-600 font-medium">
                          <span>{count} services disponibles</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        )}

        {/* Results Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {activeCategory === 'all' ? 'Toutes nos activités' : 'Services spécialisés'}
          </h2>
          <p className="text-gray-600">
            {filteredActivities.length} service{filteredActivities.length !== 1 ? 's' : ''} trouvé{filteredActivities.length !== 1 ? 's' : ''}
            {searchTerm && ` pour "${searchTerm}"`}
          </p>
        </div>

        {/* Activities Grid */}
        {filteredActivities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity) => (
              <ActivityCard 
                key={activity.id}
                activity={activity}
                currentLang={currentLang}
                onActivityClick={onActivityClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune activité trouvée</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? `Aucune activité ne correspond à "${searchTerm}"`
                  : 'Aucune activité dans cette catégorie'
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
            et obtenir une solution sur mesure adaptée à votre contexte.
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

// Activity Card Component - Fixed
const ActivityCard: React.FC<{
  activity: Activity
  currentLang: 'fr' | 'en'
  onActivityClick: (activity: Activity) => void
}> = ({ activity, currentLang, onActivityClick }) => {
  if (!activity) return null
  
  const activityTitle = currentLang === 'fr' ? activity.titleFr : (activity.titleEn || activity.titleFr)
  const activityDescription = currentLang === 'fr' ? activity.shortDescFr : (activity.shortDescEn || activity.shortDescFr)

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer"
         onClick={() => onActivityClick(activity)}>
      
      {/* Activity Header */}
      <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
      
      {/* Activity Image or Icon */}
      {activity.image ? (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={activity.image} 
            alt={activityTitle || ''}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {activity.isFeatured && (
            <div className="absolute top-4 right-4">
              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                <Award className="w-3 h-3 mr-1" />
                Recommandé
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <div className="text-white text-center">
            <Layers className="w-12 h-12 mx-auto mb-2 opacity-70" />
            <p className="text-sm font-medium opacity-90">Service WAMAN</p>
          </div>
        </div>
      )}
      
      <div className="p-6">
        {/* Activity Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {activityTitle || 'Service'}
        </h3>
        
        {/* Activity Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {activityDescription || 'Service spécialisé en ingénierie de l\'eau et de l\'environnement.'}
        </p>

        {/* Activity Features */}
        {activity.features && Array.isArray(activity.features) && activity.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Avantages clés :</h4>
            <div className="space-y-1">
              {activity.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-1">{feature}</span>
                </div>
              ))}
              {activity.features.length > 3 && (
                <div className="text-xs text-blue-600 font-medium">
                  +{activity.features.length - 3} autres avantages
                </div>
              )}
            </div>
          </div>
        )}

        {/* Activity Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            {activity.duration && (
              <>
                <Calendar className="w-4 h-4 mr-1" />
                <span>{activity.duration}</span>
              </>
            )}
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