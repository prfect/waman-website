// components/public/MainWebsite.tsx - Fixed version
import React, { useState, useEffect, useCallback } from 'react'

// Import types
import { 
  Project, Partner, BlogPost, ProjectCategory, TranslationKeys
} from '../../types'

// Import components
import { Header } from '../layout/Header'
import { Footer } from '../layout/Footer'
import { HeroSection } from '../sections/HeroSection'
import { WhyChooseSection } from '../sections/WhyChooseSection'
import { ActivitiesOverview } from '../sections/ActivitiesOverview'
import { ProjectsOverview } from '../sections/ProjectsOverview'
import { BlogSection } from '../sections/BlogSection'
import { PartnersSection } from '../sections/PartnersSection'
import { ContactSection } from '../sections/ContactSection'

// Import page components
import { BlogDetailPage } from '../pages/BlogDetailPage'
import { ProjectDetailPage } from '../pages/ProjectDetailPage'
import { ActivitiesPage } from '../pages/ActivitiesPage'
import { ProjectsPage } from '../pages/ProjectsPage'
import { ActivityDetailPage } from '../pages/ActivityDetailPage'

// Import configuration
import { translations } from '../../config/translations'

// Interfaces
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
  descriptionFr?: string
  descriptionEn?: string
  methodology?: string
  deliverables?: string[]
  duration?: string
  targetAudience?: string
  features?: string[]
  image?: string
  isFeatured: boolean
}

interface WamanConsultingWebsiteProps {
  setIsAdmin?: (isAdmin: boolean) => void
}

export const WamanConsultingWebsite: React.FC<WamanConsultingWebsiteProps> = ({ setIsAdmin }) => {
  // State management
  const [currentLang, setCurrentLang] = useState<'fr' | 'en'>('fr')
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<number | null>(null)

  // Header state
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)

  // Data state
  const [activityCategories, setActivityCategories] = useState<ActivityCategory[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [projectCategories, setProjectCategories] = useState<{[key: string]: ProjectCategory}>({})

  // Translation function
  const t = useCallback((key: string): string => {
    const keys = key.split('.')
    let value: any = translations[currentLang]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }, [currentLang])

  // Error boundary
  const handleError = (error: Error) => {
    console.error('Website error:', error)
    setError(error.message)
  }

  // Data fetching with proper error handling
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const timestamp = Date.now()
      console.log('🔄 Fetching main website data at:', new Date().toISOString())

      // Batch fetch all data with proper error handling
      const fetchWithFallback = async (url: string, fallback: any[] = []) => {
        try {
          const response = await fetch(`${url}?_t=${timestamp}`)
          if (response.ok) {
            const data = await response.json()
            console.log(`✅ ${url}:`, Array.isArray(data) ? data.length : 'Not array')
            return Array.isArray(data) ? data : fallback
          }
          console.warn(`⚠️ ${url}: Response not OK (${response.status})`)
          return fallback
        } catch (error) {
          console.error(`❌ Error fetching ${url}:`, error)
          return fallback
        }
      }

      const [activitiesData, projectsData, partnersData, blogData] = await Promise.all([
        fetchWithFallback('/api/admin/activity-categories'),
        fetchWithFallback('/api/admin/projects'),
        fetchWithFallback('/api/admin/partners'),
        fetchWithFallback('/api/admin/blog_posts')
      ])

      console.log('📊 Main website data loaded:', {
        activities: activitiesData.length,
        projects: projectsData.length,
        partners: partnersData.length,
        blog: blogData.length
      })

      // Set data with safe defaults
      setActivityCategories(activitiesData)
      setProjects(projectsData)
      setPartners(partnersData)
      setBlogPosts(blogData)

      // Generate project categories
      const categories: {[key: string]: ProjectCategory} = {}
      projectsData.forEach((project: Project) => {
        if (project.category && !categories[project.category]) {
          categories[project.category] = {
            title: project.category,
            projects: [],
            count: 0
          }
        }
        if (project.category) {
          categories[project.category].projects.push(project)
          categories[project.category].count++
        }
      })
      setProjectCategories(categories)
      
      setLastRefresh(Date.now())
      console.log('✅ Main website data fetch completed successfully')
      
    } catch (error) {
      console.error('❌ Error fetching main website data:', error)
      setError('Erreur lors du chargement des données')
      
      // Set empty defaults to prevent crashes
      setActivityCategories([])
      setProjects([])
      setPartners([])
      setBlogPosts([])
      setProjectCategories({})
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Scroll detection for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Listen for data updates from admin
  useEffect(() => {
    const handleDataUpdate = () => {
      console.log('🔔 Data update detected, refreshing...')
      fetchData()
    }

    // Listen for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'waman-data-updated') {
        handleDataUpdate()
      }
    }

    // Listen for custom events
    window.addEventListener('wamanDataUpdated', handleDataUpdate)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('wamanDataUpdated', handleDataUpdate)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [fetchData])

  // Loading state with better UX
  if (loading && !lastRefresh) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="mt-4 text-gray-600 text-lg">Chargement du site...</p>
          <p className="text-sm text-gray-500 mt-2">Initialisation des données</p>
        </div>
      </div>
    )
  }

  // Error state with retry option
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Erreur de chargement</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={fetchData}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  // Page routing
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'blog-detail':
        return selectedBlogPost ? (
          <BlogDetailPage
            post={selectedBlogPost}
            currentLang={currentLang}
            t={t}
            onBack={() => setCurrentPage('home')}
          />
        ) : null

      case 'project-detail':
        return selectedProject ? (
          <ProjectDetailPage
            project={selectedProject}
            currentLang={currentLang}
            t={t}
            onBack={() => setCurrentPage('home')}
          />
        ) : null

      case 'activities':
        return (
          <ActivitiesPage
            activityCategories={activityCategories}
            currentLang={currentLang}
            t={t}
            onActivityClick={(activity: Activity) => {
              setSelectedActivity(activity)
              setCurrentPage('activity-detail')
            }}
            onBack={() => setCurrentPage('home')}
          />
        )

      case 'activity-detail':
        return selectedActivity ? (
          <ActivityDetailPage
            activity={selectedActivity}
            currentLang={currentLang}
            t={t}
            onBack={() => setCurrentPage('activities')}
          />
        ) : null

      case 'projects':
        return (
          <ProjectsPage
            projects={projects}
            projectCategories={projectCategories}
            currentLang={currentLang}
            t={t}
            onProjectClick={(project: Project) => {
              setSelectedProject(project)
              setCurrentPage('project-detail')
            }}
            onBack={() => setCurrentPage('home')}
          />
        )

      default:
        return (
          <>
            <HeroSection 
              projects={projects}
              partners={partners}
              currentLang={currentLang} 
              setCurrentPage={setCurrentPage}
              t={t}
            />
            
            <WhyChooseSection currentLang={currentLang} t={t} />
            
            <ActivitiesOverview
              activityCategories={activityCategories || []}
              loading={loading}
              currentLang={currentLang}
              setCurrentPage={setCurrentPage}
              setSelectedActivity={setSelectedActivity}
              t={t}
            />
            
            <ProjectsOverview
              projects={projects}
              loading={loading}
              currentLang={currentLang}
              setCurrentPage={setCurrentPage}
              onProjectClick={(project: Project) => {
                setSelectedProject(project)
                setCurrentPage('project-detail')
              }}
              t={t}
            />
            
            <BlogSection
              blogPosts={blogPosts}
              loading={loading}
              currentLang={currentLang}
              setCurrentPage={setCurrentPage}
              onPostClick={(post: BlogPost) => {
                setSelectedBlogPost(post)
                setCurrentPage('blog-detail')
              }}
              t={t}
            />
            
            <PartnersSection 
              partners={partners}
              loading={loading}
              currentLang={currentLang}
              setCurrentPage={setCurrentPage}
              t={t}
            />
            
            <ContactSection currentLang={currentLang} t={t} />
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-0 left-0 bg-black text-white text-xs p-2 z-50 opacity-75">
          Debug: Activities: {activityCategories?.length || 0} | 
          Projects: {projects?.length || 0} | 
          Partners: {partners?.length || 0} | 
          Blog: {blogPosts?.length || 0}
        </div>
      )}

      <Header 
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        hoveredMenu={hoveredMenu}
        setHoveredMenu={setHoveredMenu}
        activityCategories={activityCategories || []}
        projectCategories={projectCategories || {}}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        setCurrentPage={setCurrentPage}
        setSelectedActivity={setSelectedActivity}
        setSelectedProject={setSelectedProject}
        setIsAdmin={setIsAdmin}
        t={t}
      />

      <main>
        {renderCurrentPage()}
      </main>

      {currentPage === 'home' && (
        <Footer currentLang={currentLang} t={t} />
      )}

      {/* Refresh indicator */}
      {lastRefresh && !loading && (
        <div className="fixed bottom-4 right-4 text-xs text-gray-500 bg-white px-2 py-1 rounded shadow opacity-50">
          Mis à jour: {new Date(lastRefresh).toLocaleTimeString()}
        </div>
      )}

      {/* Component Styles */}
      <ComponentStyles />
    </div>
  )
}

// Styles Component
const ComponentStyles: React.FC = () => (
  <style jsx>{`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    body.mobile-menu-open {
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
    }

    html {
      scroll-behavior: smooth;
    }
  `}</style>
)

export default WamanConsultingWebsite