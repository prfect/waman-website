// components/layout/Header.tsx - Fixed with safe navigation
import React, { useState, useEffect } from 'react'
import { 
  ChevronDown, Menu, X, Droplets, Home, BarChart3, Users, 
  FileText, Mail, Languages, Layers
} from 'lucide-react'

// Activity interfaces
interface ActivityCategory {
  id: number
  slug: string
  titleFr: string
  titleEn?: string
  descriptionFr?: string
  displayOrder: number
  icon?: string
  color?: string
  subcategories: ActivitySubcategory[]
  activities: Activity[]
  _count: { activities: number }
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

interface ProjectCategory {
  title: string
  projects: any[]
  count: number
}

interface HeaderProps {
  scrolled: boolean
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  hoveredMenu: string | null
  setHoveredMenu: (menu: string | null) => void
  activityCategories: ActivityCategory[]
  projectCategories: {[key: string]: ProjectCategory}
  currentLang: 'fr' | 'en'
  setCurrentLang: (lang: 'fr' | 'en') => void
  setCurrentPage: (page: string) => void
  setSelectedActivity: (activity: any) => void
  setSelectedProject: (project: any) => void
  setIsAdmin?: (admin: boolean) => void
  t: (key: string) => string
}

export const Header: React.FC<HeaderProps> = ({ 
  scrolled, 
  isMenuOpen, 
  setIsMenuOpen, 
  hoveredMenu, 
  setHoveredMenu, 
  activityCategories = [], // Default to empty array
  projectCategories = {}, // Default to empty object
  currentLang, 
  setCurrentLang, 
  setCurrentPage, 
  setSelectedActivity, 
  setSelectedProject, 
  setIsAdmin, 
  t 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }
    
    return () => document.body.classList.remove('mobile-menu-open')
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  // Safe calculation for total activities
  const totalActivities = Array.isArray(activityCategories) 
    ? activityCategories.reduce((total, cat) => {
        if (cat && cat._count && typeof cat._count.activities === 'number') {
          return total + cat._count.activities
        }
        return total
      }, 0)
    : 0

  return (
    <div>
      {/* Enhanced Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50' 
          : 'bg-white/90 backdrop-blur-md shadow-lg'
      }`}>
        {/* Top accent line */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Droplets className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg -z-10"></div>
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                  WAMAN CONSULTING
                </h1>
                <p className="text-xs lg:text-sm text-gray-600 font-medium hidden sm:block">
                  Water Management Consulting
                </p>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a 
                href="#accueil" 
                className="relative text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 py-2 group"
              >
                {t('home')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              
              {/* Enhanced Activities Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('activities')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button className="relative flex items-center text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 py-2 group">
                  NOS ACTIVITÉS
                  <ChevronDown className={`w-4 h-4 ml-1 transition-all duration-300 ${hoveredMenu === 'activities' ? 'rotate-180' : ''}`} />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </button>
                
                {hoveredMenu === 'activities' && Array.isArray(activityCategories) && activityCategories.length > 0 && (
                  <div className="absolute top-full left-0 w-[600px] bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl py-6 z-50 mt-2 animate-dropdown-slide">
                    <div className="px-6 pb-4 border-b border-gray-100">
                      <h3 className="font-bold text-gray-900 text-lg flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                        Nos Activités
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 ml-5">Solutions complètes depuis 2005</p>
                    </div>
                    
                    <div className="py-2 max-h-80 overflow-y-auto">
                      <div className="grid grid-cols-2 gap-2 px-4">
                        {activityCategories.map((category) => {
                          // Safe access to category properties
                          if (!category) return null
                          
                          const categoryTitle = currentLang === 'fr' 
                            ? (category.titleFr || '') 
                            : (category.titleEn || category.titleFr || '')
                          
                          const activityCount = category._count?.activities || 0
                          const subcategories = Array.isArray(category.subcategories) ? category.subcategories : []
                          
                          return (
                            <button
                              key={category.id}
                              onClick={() => {
                                setCurrentPage('activities')
                                setSelectedActivity(category.slug)
                                setHoveredMenu(null)
                              }}
                              className="text-left p-4 hover:bg-blue-50/80 transition-all duration-300 group rounded-lg"
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color || 'from-blue-500 to-blue-600'} flex items-center justify-center flex-shrink-0`}>
                                  <Layers className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                    {categoryTitle}
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">
                                    {activityCount} services spécialisés
                                  </div>
                                  {/* Pipe-separated subcategories like GIS4DS */}
                                  {subcategories.length > 0 && (
                                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                      {subcategories
                                        .slice(0, 3)
                                        .map(sub => {
                                          if (!sub) return ''
                                          return currentLang === 'fr' ? (sub.titleFr || '') : (sub.titleEn || sub.titleFr || '')
                                        })
                                        .filter(Boolean)
                                        .join(' | ')}
                                      {subcategories.length > 3 && '...'}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Projects Link - Direct Navigation */}
              <button 
                onClick={() => setCurrentPage('projects')}
                className="relative text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 py-2 group"
              >
                <span>{t('realizations')}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
              </button>

              <a 
                href="#clients-partners" 
                className="relative text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 py-2 group"
              >
                {t('clientsPartners')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              
              <a 
                href="#actualites" 
                className="relative text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 py-2 group"
              >
                {t('news')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              
              <a 
                href="#contact" 
                className="relative text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 py-2 group"
              >
                {t('contact')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-green-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              
              {/* Enhanced Language Switcher */}
              <button
                onClick={() => setCurrentLang(currentLang === 'fr' ? 'en' : 'fr')}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 bg-gray-100/80 hover:bg-blue-100/80 px-4 py-2 rounded-xl border border-gray-200 hover:border-blue-300 backdrop-blur-sm"
              >
                <Languages className="w-4 h-4" />
                <span>{currentLang === 'fr' ? 'EN' : 'FR'}</span>
              </button>

            </nav>

            {/* Enhanced Mobile Menu Button */}
            <button 
              className="lg:hidden w-12 h-12 bg-gray-100/80 hover:bg-blue-100/80 rounded-xl flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 border border-gray-200 hover:border-blue-300 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu mobile"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden animate-fade-in" onClick={closeMobileMenu} />
      )}

      <div className={`fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-white/95 backdrop-blur-xl shadow-2xl z-50 transform transition-all duration-500 ease-out lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
          
          {/* Enhanced Mobile Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">WAMAN</h2>
                <p className="text-xs text-gray-600">Menu Navigation</p>
              </div>
            </div>
            <button 
              onClick={closeMobileMenu} 
              className="w-10 h-10 bg-gray-100 hover:bg-red-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Enhanced Mobile Navigation */}
          <nav className="space-y-3 mb-8">
            <a 
              href="#accueil" 
              className="flex items-center py-4 px-5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-300 font-medium group"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                <Home className="w-5 h-5 text-blue-600" />
              </div>
              <span>Accueil</span>
            </a>
            
            <button 
              onClick={() => {
                setCurrentPage('activities')
                closeMobileMenu()
              }}
              className="w-full flex items-center justify-between py-4 px-5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-300 font-medium group"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                  <Layers className="w-5 h-5 text-blue-600" />
                </div>
                <span>Nos Activités</span>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {totalActivities}
              </span>
            </button>
            
            <button 
              onClick={() => {
                setCurrentPage('projects')
                closeMobileMenu()
              }}
              className="w-full flex items-center justify-between py-4 px-5 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all duration-300 font-medium group"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <span>Réalisations</span>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {Object.keys(projectCategories).length}
              </span>
            </button>
            
            <a 
              href="#clients-partners" 
              className="flex items-center py-4 px-5 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all duration-300 font-medium group"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span>Clients & Partenaires</span>
            </a>
            
            <a 
              href="#actualites" 
              className="flex items-center py-4 px-5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all duration-300 font-medium group"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <span>Actualités</span>
            </a>
            
            <a 
              href="#contact" 
              className="flex items-center py-4 px-5 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition-all duration-300 font-medium group"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-teal-200 transition-colors">
                <Mail className="w-5 h-5 text-teal-600" />
              </div>
              <span>Contact</span>
            </a>
          </nav>

          {/* Enhanced Mobile Footer */}
          <div className="space-y-4 pt-6 border-t border-gray-200/50">
            <button
              onClick={() => {
                setCurrentLang(currentLang === 'fr' ? 'en' : 'fr')
                closeMobileMenu()
              }}
              className="w-full flex items-center justify-center space-x-3 py-4 bg-gray-100/80 hover:bg-blue-100/80 rounded-xl transition-all duration-300 font-medium text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300"
            >
              <Languages className="w-5 h-5" />
              <span>{currentLang === 'fr' ? 'English' : 'Français'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes dropdown-slide {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-dropdown-slide {
          animation: dropdown-slide 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}