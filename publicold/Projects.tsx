// Path: components\public\Projects.tsx

'use client'
import { useState } from 'react'
import { MapPin, Calendar, DollarSign, Users, Filter, Eye } from 'lucide-react'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const filters = ['Tous', 'Hydraulique', 'Environnement', 'Assainissement', 'Géomatique']

  const projects = [
    {
      id: 1,
      titleFr: 'Modernisation du Réseau de Distribution - Casablanca',
      titleEn: 'Water Distribution Network Modernization - Casablanca',
      category: 'Hydraulique',
      client: 'LYDEC',
      year: '2024',
      budget: '2.5M MAD',
      location: 'Casablanca, Maroc',
      status: 'Terminé',
      image: '🏙️',
      description: 'Modernisation complète du réseau de distribution d\'eau potable couvrant 150km de canalisations et desservant 500,000 habitants.',
      achievements: [
        'Réduction des pertes de 40% à 15%',
        'Amélioration de la pression de service',
        'Installation de 1,200 compteurs intelligents',
        'Formation de 50 techniciens locaux'
      ],
      featured: true
    },
    {
      id: 2,
      titleFr: 'Système d\'Alerte aux Inondations - Bassin du Bouregreg',
      titleEn: 'Flood Warning System - Bouregreg Basin',
      category: 'Environnement',
      client: 'Direction de la Météorologie Nationale',
      year: '2024',
      budget: '1.8M MAD',
      location: 'Rabat-Salé, Maroc',
      status: 'En cours',
      image: '🌊',
      description: 'Développement d\'un système d\'alerte précoce aux inondations utilisant l\'intelligence artificielle et l\'IoT.',
      achievements: [
        '20 stations de monitoring installées',
        'Prévisions en temps réel 24h/24',
        'Interface web pour les autorités',
        'Formation du personnel technique'
      ],
      featured: true
    },
    {
      id: 3,
      titleFr: 'Station d\'Épuration - Agadir',
      titleEn: 'Wastewater Treatment Plant - Agadir',
      category: 'Assainissement',
      client: 'RAMSA',
      year: '2023',
      budget: '3.2M MAD',
      location: 'Agadir, Maroc',
      status: 'Terminé',
      image: '🏭',
      description: 'Conception et supervision de la construction d\'une station d\'épuration de 45,000 m³/jour.',
      achievements: [
        'Traitement biologique avancé',
        'Réutilisation pour irrigation',
        'Réduction de 95% de la pollution',
        'Certification ISO 14001'
      ],
      featured: false
    },
    {
      id: 4,
      titleFr: 'SIG Hydraulique - Province d\'Al Haouz',
      titleEn: 'Hydraulic GIS - Al Haouz Province',
      category: 'Géomatique',
      client: 'Conseil Provincial d\'Al Haouz',
      year: '2023',
      budget: '950K MAD',
      location: 'Al Haouz, Maroc',
      status: 'Terminé',
      image: '🗺️',
      description: 'Développement d\'un système d\'information géographique pour la gestion des ressources en eau.',
      achievements: [
        'Cartographie de 2,500 km² de territoire',
        'Base de données de 1,000 points d\'eau',
        'Interface utilisateur intuitive',
        'Formation de 25 utilisateurs'
      ],
      featured: false
    }
  ]

  const filteredProjects = activeFilter === 'Tous' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            Nos Réalisations
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-6 text-gray-900">
            Projets d'Exception
            <span className="block text-green-600">& Innovation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos projets les plus emblématiques qui façonnent l'avenir 
            de la gestion de l'eau au Maroc et en Afrique.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Projets en Vedette</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map(project => (
              <div key={project.id} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{project.image}</div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'Terminé' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {project.titleFr}
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{project.budget}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{project.client}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Voir les détails</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* All Projects */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              Tous nos Projets
            </h3>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{project.image}</div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {project.titleFr}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="space-y-2 text-xs text-gray-500 mb-4">
                    <div className="flex items-center justify-between">
                      <span>Client: {project.client}</span>
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{project.budget}</span>
                      <span className={`px-2 py-1 rounded ${
                        project.status === 'Terminé' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Voir le projet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{selectedProject.image}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedProject.titleFr}
                      </h3>
                      <p className="text-gray-600">{selectedProject.titleEn}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Description du Projet</h4>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {selectedProject.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Client:</span>
                        <p className="font-medium">{selectedProject.client}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Année:</span>
                        <p className="font-medium">{selectedProject.year}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Budget:</span>
                        <p className="font-medium">{selectedProject.budget}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Statut:</span>
                        <p className="font-medium">{selectedProject.status}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Réalisations Clés</h4>
                    <div className="space-y-3">
                      {selectedProject.achievements.map((achievement: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">{selectedProject.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}