// components/admin/sections/ProjectsSection.tsx
import React, { useState, useEffect } from 'react'
import { 
  Plus, Edit, Trash2, Search, Star, CheckCircle, BarChart3, 
  Calendar, MapPin, Building, DollarSign, Clock
} from 'lucide-react'

interface Project {
  id?: number
  titleFr: string
  titleEn?: string
  descriptionFr: string
  descriptionEn?: string
  client: string
  year: string
  status: string
  category?: string
  location?: string
  budget?: string
  duration?: string
  image?: string
  featured?: boolean
  achievements?: string[]
  createdAt?: string
  updatedAt?: string
}

interface ProjectsSectionProps {
  onOpenModal: (type: string, item?: any) => void
  showNotification: (message: string, type: 'success' | 'error') => void
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenModal,
  showNotification
}) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Fetch projects
  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      showNotification('Erreur lors du chargement des projets', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return

    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setProjects(projects.filter(item => item.id !== id))
        showNotification('Projet supprimé avec succès!', 'success')
      } else {
        const errorData = await response.json()
        showNotification(`Erreur: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Delete error:', error)
      showNotification('Erreur lors de la suppression', 'error')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-yellow-500 text-white'
      case 'Terminé': return 'bg-green-500 text-white'
      case 'En attente': return 'bg-blue-500 text-white'
      case 'Annulé': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.titleFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === '' || project.status === filterStatus
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement des projets...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Projets</h1>
            <p className="text-gray-600">Portfolio de réalisations et projets d'ingénierie de l'eau</p>
          </div>
          <button 
            onClick={() => onOpenModal('project')} 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Nouveau Projet</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-[200px]"
          >
            <option value="">Tous les statuts</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
            <option value="En attente">En attente</option>
            <option value="Annulé">Annulé</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {filteredProjects.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <BarChart3 className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Aucun projet disponible</h3>
            <p className="text-lg mb-8">Commencez par ajouter votre premier projet.</p>
            <button 
              onClick={() => onOpenModal('project')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition-colors shadow-lg text-lg"
            >
              Ajouter un projet
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-green-200 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onOpenModal('project', project)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id!)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    {project.featured && (
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Phare
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors leading-tight line-clamp-2">
                    {project.titleFr}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                    {project.descriptionFr}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Client:</span>
                      <span className="font-medium text-gray-900">{project.client}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Année:</span>
                      <span className="font-medium text-gray-900">{project.year}</span>
                    </div>
                    {project.location && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Localisation:</span>
                        <span className="font-medium text-gray-900">{project.location}</span>
                      </div>
                    )}
                    {project.budget && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Budget:</span>
                        <span className="font-medium text-gray-900">{project.budget}</span>
                      </div>
                    )}
                  </div>

                  {project.category && (
                    <div className="mb-4">
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                  )}

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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}