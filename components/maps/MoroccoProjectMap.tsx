// components/maps/MoroccoProjectMap.tsx - Simple interactive map
import React, { useState, useEffect } from 'react'
import { 
  MapPin, Filter, Search, Building, Calendar, 
  ArrowLeft, Users, Droplets, Star, Eye
} from 'lucide-react'

interface Project {
  id: number
  titleFr: string
  client: string
  year: string
  status: string
  category?: string
  location?: string
  image?: string
  featured?: boolean
}

interface MoroccoProjectMapProps {
  projects: Project[]
  currentLang: 'fr' | 'en'
  onBack: () => void
  onProjectSelect: (project: Project) => void
}

const MoroccoProjectMap: React.FC<MoroccoProjectMapProps> = ({
  projects,
  currentLang,
  onBack,
  onProjectSelect
}) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Morocco city coordinates
  const cityCoordinates: { [key: string]: { x: number, y: number, region: string } } = {
    'Marrakech': { x: 45, y: 65, region: 'Marrakech-Safi' },
    'Casablanca': { x: 52, y: 45, region: 'Casablanca-Settat' },
    'Rabat': { x: 55, y: 42, region: 'Rabat-Salé-Kénitra' },
    'Fès': { x: 65, y: 38, region: 'Fès-Meknès' },
    'Agadir': { x: 35, y: 75, region: 'Souss-Massa' },
    'Meknès': { x: 62, y: 40, region: 'Fès-Meknès' },
    'Oujda': { x: 85, y: 35, region: 'Oriental' },
    'Tanger': { x: 58, y: 25, region: 'Tanger-Tétouan-Al Hoceïma' },
    'Tétouan': { x: 62, y: 28, region: 'Tanger-Tétouan-Al Hoceïma' },
    'Settat': { x: 50, y: 48, region: 'Casablanca-Settat' },
    'Laâyoune': { x: 20, y: 90, region: 'Laâyoune-Sakia El Hamra' },
    'Dakhla': { x: 18, y: 95, region: 'Dakhla-Oued Ed-Dahab' },
    'Ouarzazate': { x: 40, y: 70, region: 'Drâa-Tafilalet' },
    'Al Hoceïma': { x: 68, y: 30, region: 'Tanger-Tétouan-Al Hoceïma' },
    'Khouribga': { x: 55, y: 48, region: 'Béni Mellal-Khénifra' },
    'Béni Mellal': { x: 52, y: 52, region: 'Béni Mellal-Khénifra' }
  }

  // Filter projects
  useEffect(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = !searchTerm || 
        project.titleFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      
      return matchesSearch && matchesCategory && project.location
    })
    
    setFilteredProjects(filtered)
  }, [projects, searchTerm, selectedCategory])

  // Get project coordinates
  const getProjectPosition = (location: string) => {
    const normalizedLocation = Object.keys(cityCoordinates).find(city => 
      location.toLowerCase().includes(city.toLowerCase())
    )
    return normalizedLocation ? cityCoordinates[normalizedLocation] : null
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'terminé':
      case 'completed':
        return '#10B981' // green
      case 'en cours':
      case 'ongoing':
        return '#3B82F6' // blue
      case 'planifié':
      case 'planned':
        return '#F59E0B' // yellow
      default:
        return '#6B7280' // gray
    }
  }

  const categories = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Carte des Projets</h1>
                <p className="text-gray-600">Nos réalisations à travers le Maroc</p>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 pb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, client ou ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-w-48"
              >
                <option value="all">Toutes les catégories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Interactive Morocco Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Localisation des Projets ({filteredProjects.length})
                </h3>
              </div>
              
              <div className="relative h-[600px] bg-gradient-to-b from-blue-50 to-green-50">
                {/* Morocco SVG Outline */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                  style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))' }}
                >
                  {/* Simplified Morocco border */}
                  <path
                    d="M15,25 L85,25 L85,35 L90,40 L85,45 L80,50 L75,55 L70,60 L65,65 L60,70 L55,75 L50,80 L45,85 L40,90 L35,95 L30,90 L25,85 L20,80 L15,75 L10,70 L15,65 L20,60 L15,55 L10,50 L15,45 L20,40 L15,35 Z"
                    fill="#E5F3FF"
                    stroke="#93C5FD"
                    strokeWidth="0.5"
                  />
                  
                  {/* Western Sahara */}
                  <path
                    d="M15,75 L30,90 L25,95 L20,100 L15,95 L10,90 L15,85 Z"
                    fill="#F0F9FF"
                    stroke="#93C5FD"
                    strokeWidth="0.3"
                    strokeDasharray="1,1"
                  />
                  
                  {/* Project markers */}
                  {filteredProjects.map((project) => {
                    const position = getProjectPosition(project.location || '')
                    if (!position) return null
                    
                    return (
                      <g key={project.id}>
                        <circle
                          cx={position.x}
                          cy={position.y}
                          r="2"
                          fill={getStatusColor(project.status)}
                          stroke="white"
                          strokeWidth="0.5"
                          className="cursor-pointer hover:r-3 transition-all duration-200"
                          onClick={() => setSelectedProject(project)}
                        />
                        {project.featured && (
                          <circle
                            cx={position.x}
                            cy={position.y}
                            r="3"
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="0.5"
                            className="animate-pulse"
                          />
                        )}
                      </g>
                    )
                  })}
                </svg>
                
                {/* Selected project popup */}
                {selectedProject && getProjectPosition(selectedProject.location || '') && (
                  <div 
                    className="absolute bg-white p-4 rounded-lg shadow-xl border border-gray-200 z-10 max-w-sm"
                    style={{
                      left: `${getProjectPosition(selectedProject.location || '')!.x}%`,
                      top: `${getProjectPosition(selectedProject.location || '')!.y - 10}%`,
                      transform: 'translate(-50%, -100%)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {selectedProject.titleFr}
                      </h4>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="text-gray-400 hover:text-gray-600 ml-2"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="space-y-1 text-xs text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        <span>{selectedProject.client}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{selectedProject.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{selectedProject.year}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onProjectSelect(selectedProject)}
                      className="w-full bg-blue-600 text-white text-xs py-2 px-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Voir les détails
                    </button>
                  </div>
                )}
              </div>
              
              {/* Legend */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-wrap gap-4 text-sm">
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
                    <div className="w-3 h-3 border-2 border-yellow-500 rounded-full mr-2"></div>
                    <span>Projet vedette</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Projets par région
            </h3>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`bg-white p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedProject?.id === project.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                      {project.titleFr}
                    </h4>
                    <div className="flex items-center space-x-1 ml-2">
                      {project.featured && (
                        <Star className="w-4 h-4 text-yellow-500" />
                      )}
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getStatusColor(project.status) }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-600 mb-2">
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
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {project.category}
                    </span>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onProjectSelect(project)
                    }}
                    className="mt-2 w-full text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center justify-center py-1"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Voir détails
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { MoroccoProjectMap }