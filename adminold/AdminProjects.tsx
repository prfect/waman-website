// Path: components\admin\AdminProjects.tsx

'use client'
import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, MapPin, Calendar, DollarSign } from 'lucide-react'
interface Project {
  id: number
  titleFr: string
  titleEn: string
  client: string
  status: string
  budget: string
  location: string
  year: string
  featured: boolean
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      titleFr: 'Modernisation Réseau Casablanca',
      titleEn: 'Casablanca Network Modernization',
      client: 'LYDEC',
      status: 'Terminé',
      budget: '2.5M MAD',
      location: 'Casablanca',
      year: '2024',
      featured: true
    },
    {
      id: 2,
      titleFr: 'Système Alerte Inondations',
      titleEn: 'Flood Warning System',
      client: 'Direction Météo',
      status: 'En cours',
      budget: '1.8M MAD',
      location: 'National',
      year: '2024',
      featured: false
    }
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
          <p className="text-gray-600 mt-1">Gérez votre portfolio de projets</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          <span>Nouveau Projet</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">24</div>
          <div className="text-sm text-gray-600">Total Projets</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">12</div>
          <div className="text-sm text-gray-600">Terminés</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-orange-600">8</div>
          <div className="text-sm text-gray-600">En cours</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">4</div>
          <div className="text-sm text-gray-600">En pause</div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Liste des Projets</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {projects.map(project => (
            <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {project.titleFr}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.status === 'Terminé' 
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'En cours'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                    {project.featured && (
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                        Vedette
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{project.titleEn}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{project.budget}</span>
                    </div>
                    <div>
                      <span className="font-medium">Client:</span> {project.client}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}