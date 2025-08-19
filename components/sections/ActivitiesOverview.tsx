// components/sections/ActivitiesOverview.tsx - Fixed with null safety
import React, { useState, useRef, useEffect } from 'react'
import { 
  Wrench, ArrowRight, Layers, Target, Globe, Users, 
  Sparkles, TrendingUp, ChevronRight, Eye
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
  _count?: { activities: number }
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
  image?: string
  isFeatured: boolean
}

interface ActivitiesOverviewProps {
  activityCategories: ActivityCategory[]
  loading: boolean
  currentLang: 'fr' | 'en'
  setCurrentPage: (page: string) => void
  setSelectedActivity: (activity: any) => void
  t: (key: string) => string
}

export const ActivitiesOverview: React.FC<ActivitiesOverviewProps> = ({ 
  activityCategories = [], // Safe default
  loading, 
  currentLang, 
  setCurrentPage, 
  setSelectedActivity, 
  t 
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-8 h-8" />
      case 'Target': return <Target className="w-8 h-8" />
      case 'Globe': return <Globe className="w-8 h-8" />
      case 'Users': return <Users className="w-8 h-8" />
      default: return <Layers className="w-8 h-8" />
    }
  }

  // Safe calculation of total activities with null checks
  const totalActivities = Array.isArray(activityCategories) 
    ? activityCategories.reduce((total, cat) => {
        if (!cat) return total
        // Use _count if available, otherwise count activities array
        const count = cat._count?.activities || (Array.isArray(cat.activities) ? cat.activities.length : 0)
        return total + count
      }, 0)
    : 0

  // Safe categories with proper null checks
  const safeCategories = Array.isArray(activityCategories) 
    ? activityCategories.filter(cat => cat && cat.titleFr) 
    : []

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded-lg mx-auto mb-4 w-64 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg mx-auto mb-2 w-96 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-lg mx-auto w-80 animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl animate-pulse mb-6"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show message if no activities
  if (!Array.isArray(activityCategories) || activityCategories.length === 0) {
    return (
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-lg max-w-2xl mx-auto">
            <Layers className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nos activités arrivent bientôt
            </h3>
            <p className="text-gray-600">
              Nous préparons actuellement nos services d'expertise. 
              Revenez bientôt pour découvrir notre offre complète.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      ref={sectionRef}
      id="activites" 
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f0f9ff 100%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center px-6 py-3 bg-white/70 backdrop-blur-md border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
            Expertise & Services
            <div className="ml-3 px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
              {totalActivities}
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Nos 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700"> Activités</span>
            <br />d'Expertise
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre gamme complète de services spécialisés en ingénierie de l'eau, 
            géomatique et conseil environnemental.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {safeCategories.map((category, index) => {
            const activitiesCount = category._count?.activities || (Array.isArray(category.activities) ? category.activities.length : 0)
            const categoryTitle = currentLang === 'fr' ? category.titleFr : category.titleEn || category.titleFr
            const categoryDesc = currentLang === 'fr' ? category.descriptionFr : category.descriptionEn || category.descriptionFr

            return (
              <div
                key={category.id}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  background: hoveredCard === category.id 
                    ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' 
                    : '#ffffff'
                }}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  setCurrentPage('activities')
                  // Optionally set selected category
                }}
              >
                {/* Card Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-white transition-all duration-300 ${
                    hoveredCard === category.id 
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-600 scale-110 rotate-3' 
                      : 'bg-gradient-to-br from-blue-600 to-blue-700'
                  }`}>
                    {getIconComponent(category.icon)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {categoryTitle}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {categoryDesc || 'Service d\'expertise spécialisé en ingénierie de l\'eau et environnement.'}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-blue-600">
                        {activitiesCount} service{activitiesCount > 1 ? 's' : ''}
                      </span>
                      {activitiesCount > 0 && (
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      )}
                    </div>
                    
                    <div className={`p-2 rounded-full transition-all duration-300 ${
                      hoveredCard === category.id 
                        ? 'bg-blue-500 text-white translate-x-1' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect Background */}
                <div className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
                  hoveredCard === category.id 
                    ? 'bg-gradient-to-br from-blue-50/50 to-cyan-50/50' 
                    : 'bg-transparent'
                }`}></div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={() => setCurrentPage('activities')}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <Eye className="w-5 h-5 mr-2" />
            Voir toutes nos activités
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}