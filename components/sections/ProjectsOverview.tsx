// components/sections/ProjectsOverview.tsx (New Complete Version)
import React from 'react'
import { BarChart3, ArrowRight, Calendar, MapPin, Building, Star, Eye } from 'lucide-react'
import { Project, SectionProps } from '../../types'

interface ProjectsOverviewProps extends SectionProps {
  projects: Project[]
  onProjectClick: (project: Project) => void
}

export const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({ 
  projects, 
  loading, 
  currentLang, 
  setCurrentPage, 
  onProjectClick, 
  t 
}) => {
  // Filter valid projects
  const validProjects = projects.filter((project: Project) => 
    project.client && project.year && project.status
  )

  return (
    <section id="projets" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            Portfolio d'Excellence
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Nos Réalisations en Ingénierie de l'Eau
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Projets d'infrastructure hydraulique et d'ingénierie environnementale qui transforment 
            les communautés et préservent les ressources en eau à travers le Maroc et l'Afrique.
          </p>
          <button
            onClick={() => setCurrentPage('projects')}
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded font-medium hover:bg-green-700 transition-colors shadow-lg"
          >
            Découvrir tous nos projets ({validProjects.length})
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des projets...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && validProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun projet disponible</h3>
              <p className="text-gray-600">Les projets d'ingénierie de l'eau apparaîtront bientôt ici.</p>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && validProjects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {validProjects.slice(0, 6).map((project: Project) => (
              <ProjectCard 
                key={project.id}
                project={project}
                currentLang={currentLang}
                onProjectClick={onProjectClick}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// Separate Project Card Component
const ProjectCard: React.FC<{
  project: Project
  currentLang: 'fr' | 'en'
  onProjectClick: (project: Project) => void
}> = ({ project, currentLang, onProjectClick }) => {
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

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100"
      onClick={() => onProjectClick(project)}
    >
      {/* Project Image or Placeholder */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-500 to-green-600">
        {project.image ? (
          <img 
            src={project.image} 
            alt={projectTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-70" />
              <span className="text-sm font-medium opacity-80">Projet d'Eau</span>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <div className="bg-orange-500 text-white p-2 rounded-full shadow-lg">
              <Star className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white text-gray-900 px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Voir les détails</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-6">
        {/* Project Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
          {projectTitle}
        </h3>
        
        {/* Project Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {projectDescription}
        </p>
        
        {/* Project Details */}
        <div className="space-y-2 mb-4">
          {/* Client and Year */}
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
          
          {/* Location */}
          {project.location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-2 text-orange-500" />
              <span>{project.location}</span>
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

        {/* Additional Project Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-gray-500">
          {project.budget && (
            <div>
              <span className="block font-medium text-gray-700">Budget</span>
              <span>{project.budget}</span>
            </div>
          )}
          {project.duration && (
            <div>
              <span className="block font-medium text-gray-700">Durée</span>
              <span>{project.duration}</span>
            </div>
          )}
        </div>

        {/* Project Achievements */}
        {project.achievements && project.achievements.length > 0 && (
          <div className="mb-4">
            <div className="text-xs font-medium text-gray-700 mb-2">Réalisations clés:</div>
            <div className="space-y-1">
              {project.achievements.slice(0, 2).map((achievement, index) => (
                <div key={index} className="flex items-start text-xs text-gray-600">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
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
          <span className="text-sm text-gray-500 font-medium">Voir le projet complet</span>
          <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  )
}