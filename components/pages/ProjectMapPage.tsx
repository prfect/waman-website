// components/pages/ProjectMapPage.tsx
import React, { useState, useEffect } from 'react'
import { 
  ArrowLeft, MapPin, Filter, Search, Calendar, Building, 
  Users, Droplets, BarChart3, Eye, ExternalLink, Star
} from 'lucide-react'

interface Project {
  id: number
  titleFr: string
  titleEn?: string
  descriptionFr: string
  client: string
  year: string
  status: string
  category?: string
  location?: string
  image?: string
  featured?: boolean
  coordinates?: {
    lat: number
    lng: number
  }
}

interface ProjectMapPageProps {
  projects: Project[]
  currentLang: 'fr' | 'en'
  onBack: () => void
  onProjectSelect: (project: Project) => void
  t: (key: string) => string
}

export const ProjectMapPage: React.FC<ProjectMapPageProps> = ({
  projects,
  currentLang,
  onBack,
  onProjectSelect,
  t
}) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map')

  // Filter projects by search and category
  useEffect(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = !searchTerm || 
        project.titleFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || 
        project.category === selectedCategory
      
      return matchesSearch && matchesCategory && project.location
    })
    
    setFilteredProjects(filtered)
  }, [projects, searchTerm, selectedCategory])

  // Get unique categories
  const categories = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))]

  // Mock coordinates for Moroccan cities (you'll need to add real coordinates to your database)
  const getProjectCoordinates = (location: string) => {
    const coordinates: { [key: string]: { lat: number, lng: number } } = {
      'Marrakech': { lat: 31.6295, lng: -7.9811 },
      'Casablanca': { lat: 33.5731, lng: -7.5898 },
      'Rabat': { lat: 34.0209, lng: -6.8416 },
      'Fès': { lat: 34.0181, lng: -5.0078 },
      'Agadir': { lat: 30.4278, lng: -9.5981 },
      'Meknès': { lat: 33.8935, lng: -5.5473 },
      'Oujda': { lat: 34.6814, lng: -1.9086 },
      'Tanger': { lat: 35.7595, lng: -5.8340 },
      'Tétouan': { lat: 35.5889, lng: -5.3626 },
      'Settat': { lat: 33.0018, lng: -7.6164 },
      'Laâyoune': { lat: 27.1253, lng: -13.1625 },
      'Dakhla': { lat: 23.7184, lng: -15.9571 }
    }
    
    return coordinates[location] || { lat: 31.6295, lng: -7.9811 } // Default to Marrakech
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'terminé':
      case 'completed':
        return 'bg-green-500'
      case 'en cours':
      case 'ongoing':
        return 'bg-blue-500'
      case 'planifié':
      case 'planned':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getCategoryIcon = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'alimentation en eau potable':
        return <Droplets className="w-4 h-4" />
      case 'assainissement':
        return <BarChart3 className="w-4 h-4" />
      case 'gestion des ressources':
        return <Users className="w-4 h-4" />
      default:
        return <Building className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Carte des Projets</h1>
                <p className="text-gray-600">Découvrez nos réalisations à travers le Maroc</p>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <MapPin className="w-4 h-4 mr-1 inline" />
                Carte
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-1 inline" />
                Liste
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, client ou localisation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">Toutes les catégories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>{filteredProjects.length} projets trouvés</span>
            <span>•</span>
            <span>{new Set(filteredProjects.map(p => p.location)).size} villes</span>
            <span>•</span>
            <span>{filteredProjects.filter(p => p.status.toLowerCase() === 'terminé').length} projets terminés</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'map' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Placeholder */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-96 lg:h-[600px] bg-gradient-to-br from-blue-100 to-green-100 relative flex items-center justify-center">
                  {/* Interactive Map would go here */}
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Carte Interactive</h3>
                    <p className="text-gray-600">
                      Intégration avec Google Maps ou Leaflet<br />
                      pour afficher les projets géographiquement
                    </p>
                  </div>
                  
                  {/* Mock project markers */}
                  <div className="absolute top-20 left-32 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                  <div className="absolute top-40 right-40 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                  <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project List Sidebar */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Projets ({filteredProjects.length})
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`bg-white p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                      selectedProject?.id === project.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                        {project.titleFr}
                      </h4>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)} flex-shrink-0 ml-2 mt-2`}></div>
                    </div>
                    
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        <span>{project.client}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                    
                    {project.category && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getCategoryIcon(project.category)}
                          <span className="ml-1">{project.category}</span>
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => onProjectSelect(project)}
              >
                {project.image ? (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.titleFr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                    <Building className="w-16 h-16 text-white" />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {project.titleFr}
                    </h3>
                    {project.featured && (
                      <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2" />
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.descriptionFr}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">{project.client}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-green-500" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                      <span>{project.year}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {project.category && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {project.category}
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                      <Eye className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Voir détails</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Terminé</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>En cours</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Planifié</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              <span>Projet vedette</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}