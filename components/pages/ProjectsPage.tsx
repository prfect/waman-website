// components/pages/ProjectsPage.tsx
import React, { useState } from 'react'
import { 
  ArrowLeft, Search, Filter, BarChart3, Calendar, MapPin, Building, 
  Star, CheckCircle, ArrowRight, Clock, DollarSign, Target, Droplets,
  Users, Award, Eye
} from 'lucide-react'
import { Project, ProjectCategory, BaseComponentProps } from '../../types'

interface ProjectsPageProps extends BaseComponentProps {
  projects: Project[]
  projectCategories: {[key: string]: ProjectCategory}
  selectedCategory?: string
  onBack: () => void
  onProjectClick: (project: Project) => void
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ 
  projects, 
  projectCategories,
  selectedCategory,
  currentLang,
  onBack,
  onProjectClick,
  t 
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState(selectedCategory || 'all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Filter projects based on search, category, and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = !searchTerm || 
      project.titleFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.titleEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = Object.keys(projectCategories)
  const statuses = [...new Set(projects.map(p => p.status))]
  const featuredProjects = filteredProjects.filter(p => p.featured)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-yellow-500 text-white'
      case 'Terminé': return 'bg-green-500 text-white'
      case 'En attente': return 'bg-blue-500 text-white'
      case 'Annulé': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

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
                <p className="text-xs text-gray-600">Portfolio de réalisations</p>
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
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4 mr-2" />
              Portfolio d'Excellence depuis 2005
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Réalisations en Ingénierie de l'Eau
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Découvrez nos projets d'infrastructure hydraulique et d'ingénierie environnementale 
              qui transforment les communautés à travers le Maroc et l'Afrique.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-blue-300" />
                <span>{projects.length} projets réalisés</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>{featuredProjects.length} projets phares</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-green-300" />
                <span>19+ ans d'expérience</span>
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
                placeholder="Rechercher un projet, client, localisation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tous ({projects.length})
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category} ({projectCategories[category].count})
                  </button>
                ))}
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && activeCategory === 'all' && !searchTerm && statusFilter === 'all' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            Projets Phares
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredProjects.slice(0, 3).map((project) => (
              <ProjectCard 
                key={`featured-${project.id}`}
                project={project}
                currentLang={currentLang}
                onProjectClick={onProjectClick}
                isFeatured={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Projects Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Results Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {activeCategory === 'all' ? 'Tous nos projets' : `Projets - ${activeCategory}`}
          </h2>
          <p className="text-gray-600">
            {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''} trouvé{filteredProjects.length !== 1 ? 's' : ''}
            {searchTerm && ` pour "${searchTerm}"`}
            {statusFilter !== 'all' && ` avec le statut "${statusFilter}"`}
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id}
                project={project}
                currentLang={currentLang}
                onProjectClick={onProjectClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? `Aucun projet ne correspond à "${searchTerm}"`
                  : 'Aucun projet dans cette catégorie avec ce statut'
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setActiveCategory('all')
                  setStatusFilter('all')
                }}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Contact CTA Section */}
      <div className="bg-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Projet similaire en vue ?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour discuter de votre projet d'ingénierie de l'eau 
            et bénéficier de notre expertise technique approfondie.
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
            className="bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            Demander un devis
          </button>
        </div>
      </div>
    </div>
  )
}

// Project Card Component
const ProjectCard: React.FC<{
  project: Project
  currentLang: 'fr' | 'en'
  onProjectClick: (project: Project) => void
  isFeatured?: boolean
}> = ({ project, currentLang, onProjectClick, isFeatured = false }) => {
  const projectTitle = currentLang === 'fr' ? project.titleFr : project.titleEn || project.titleFr
  const projectDescription = currentLang === 'fr' ? project.descriptionFr : project.descriptionEn || project.descriptionFr

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-yellow-500 text-white'
      case 'Terminé': return 'bg-green-500 text-white'
      case 'En attente': return 'bg-blue-500 text-white'
      case 'Annulé': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'En cours': return <Clock className="w-4 h-4" />
      case 'Terminé': return <CheckCircle className="w-4 h-4" />
      case 'En attente': return <Target className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border ${
        isFeatured ? 'border-yellow-200 ring-2 ring-yellow-100' : 'border-gray-100'
      }`}
      onClick={() => onProjectClick(project)}
    >
      
      {/* Project Image */}
      {project.image ? (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={projectTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(project.status)}`}>
              {getStatusIcon(project.status)}
              <span className="ml-1">{project.status}</span>
            </div>
            {project.featured && (
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                <Star className="w-3 h-3 mr-1" />
                Phare
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center relative">
          <div className="text-center text-white">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-70" />
            <span className="text-sm font-medium opacity-90">Projet d'Ingénierie de l'Eau</span>
          </div>
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(project.status)}`}>
              {getStatusIcon(project.status)}
              <span className="ml-1">{project.status}</span>
            </div>
            {project.featured && (
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                <Star className="w-3 h-3 mr-1" />
                Phare
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="p-6">
        
        {/* Project Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
          {projectTitle}
        </h3>
        
        {/* Project Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {projectDescription}
        </p>
        
        {/* Project Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500">
              <Building className="w-4 h-4 mr-2 text-green-500" />
              <span className="font-medium text-gray-900">{project.client}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              <span className="font-medium text-gray-900">{project.year}</span>
            </div>
          </div>
          
          {project.location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-2 text-orange-500" />
              <span>{project.location}</span>
            </div>
          )}

          {(project.budget || project.duration) && (
            <div className="flex items-center justify-between text-sm text-gray-500">
              {project.budget && (
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-purple-500" />
                  <span>{project.budget}</span>
                </div>
              )}
              {project.duration && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-indigo-500" />
                  <span>{project.duration}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Project Category */}
        {project.category && (
          <div className="mb-4">
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {project.category}
            </span>
          </div>
        )}

        {/* Project Achievements Preview */}
        {project.achievements && project.achievements.length > 0 && (
          <div className="mb-4">
            <div className="text-xs font-medium text-gray-700 mb-2">Réalisations clés:</div>
            <div className="space-y-1">
              {project.achievements.slice(0, 2).map((achievement, index) => (
                <div key={index} className="flex items-start text-xs text-gray-600">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="line-clamp-1">{achievement}</span>
                </div>
              ))}
              {project.achievements.length > 2 && (
                <div className="text-xs text-green-600 font-medium">
                  +{project.achievements.length - 2} autres réalisations
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500 font-medium flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            Voir les détails
          </div>
          <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  )
}