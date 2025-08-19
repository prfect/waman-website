// components/pages/ProjectDetailPage.tsx (Simple - Existing Fields Only)
import React from 'react'
import { 
  ArrowLeft, Calendar, MapPin, Building, Star, CheckCircle, 
  Clock, DollarSign, Target, Droplets, Award
} from 'lucide-react'
import { Project, BaseComponentProps } from '../../types'

interface ProjectDetailPageProps extends BaseComponentProps {
  project: Project
  onBack: () => void
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ 
  project, 
  currentLang, 
  onBack, 
  t 
}) => {
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
                <p className="text-xs text-gray-600">Retour aux projets</p>
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

      {/* Project Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              
              {/* Project Image */}
              {project.image ? (
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={projectTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 flex items-center space-x-3">
                    <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      <span className="ml-2">{project.status}</span>
                    </div>
                    {project.featured && (
                      <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        Projet phare
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-64 md:h-96 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Droplets className="w-20 h-20 mx-auto mb-4 opacity-70" />
                    <span className="text-xl font-semibold opacity-90">Projet d'Ingénierie de l'Eau</span>
                  </div>
                </div>
              )}
              
              <div className="p-6 md:p-10">
                
                {/* Project Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {projectTitle}
                </h1>
                
                {/* Project Description */}
                <div className="prose prose-lg prose-blue max-w-none mb-8">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {projectDescription}
                  </p>
                </div>

                {/* Project Achievements - Using existing achievements field */}
                {project.achievements && project.achievements.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Award className="w-6 h-6 mr-3 text-green-600" />
                      Réalisations clés
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {project.achievements.map((achievement: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Information Summary */}
                <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">À propos de ce projet</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Ce projet d'ingénierie de l'eau a été réalisé pour <strong>{project.client}</strong> en <strong>{project.year}</strong>.
                    {project.location && ` Situé à ${project.location},`} ce projet représente notre expertise en solutions hydrauliques durables.
                  </p>
                  {project.category && (
                    <p className="text-gray-600 leading-relaxed">
                      Il s'inscrit dans notre domaine de spécialisation en <strong>{project.category}</strong>, 
                      démontrant notre capacité à livrer des solutions techniques adaptées aux besoins locaux.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Project Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Détails du projet</h3>
              <div className="space-y-4">
                
                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Client</span>
                    <span className="text-gray-900 font-semibold">{project.client}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Année de réalisation</span>
                    <span className="text-gray-900 font-semibold">{project.year}</span>
                  </div>
                </div>

                {project.location && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Localisation</span>
                      <span className="text-gray-900 font-semibold">{project.location}</span>
                    </div>
                  </div>
                )}

                {project.budget && (
                  <div className="flex items-start space-x-3">
                    <DollarSign className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Budget</span>
                      <span className="text-gray-900 font-semibold">{project.budget}</span>
                    </div>
                  </div>
                )}

                {project.duration && (
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Durée</span>
                      <span className="text-gray-900 font-semibold">{project.duration}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Statut</span>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      <span className="ml-2">{project.status}</span>
                    </div>
                  </div>
                </div>

                {project.category && (
                  <div className="pt-4 border-t border-gray-200">
                    <span className="block text-sm font-medium text-gray-500 mb-2">Catégorie</span>
                    <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Stats - Using existing data creatively */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informations du projet</h3>
              <div className="space-y-4">
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Année</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{project.year}</span>
                </div>
                
                {project.budget && (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Budget</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">{project.budget}</span>
                  </div>
                )}
                
                {project.duration && (
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">Durée</span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">{project.duration}</span>
                  </div>
                )}

                {project.achievements && (
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">Réalisations</span>
                    </div>
                    <span className="text-lg font-bold text-orange-600">{project.achievements.length}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Projet similaire ?</h3>
              <p className="text-blue-100 mb-4 leading-relaxed">
                Contactez nos experts pour discuter de vos besoins en ingénierie de l'eau
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
          </div>
        </div>
      </main>
    </div>
  )
}