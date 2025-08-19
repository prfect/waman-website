// components/admin/sections/ActivitiesSection.tsx
import React, { useState, useEffect } from 'react'
import { 
  Plus, Edit, Trash2, Search, Star, CheckCircle, Layers, Grid, List
} from 'lucide-react'

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
  id?: number
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
  isActive: boolean
  displayOrder: number
  categoryId: number
  subcategoryId?: number
  createdAt: string
  updatedAt?: string
}


interface ActivitiesSectionProps {
  onOpenModal: (type: string, item?: any) => void
  showNotification: (message: string, type: 'success' | 'error') => void
  onDataChange?: () => void // Add this prop to notify parent of data changes
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  onOpenModal,
  showNotification,
  onDataChange
}) => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [activityCategories, setActivityCategories] = useState<ActivityCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const fetchActivitiesData = async () => {
    try {
      setLoading(true)
      const [activitiesRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/activities'),
        fetch('/api/admin/activity-categories')
      ])

      if (activitiesRes.ok) {
        const activitiesData = await activitiesRes.json()
        setActivities(activitiesData)
      }

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json()
        setActivityCategories(categoriesData)
      }
      
      // Notify parent component that data changed
      if (onDataChange) {
        onDataChange()
      }
    } catch (error) {
      console.error('Error fetching activities:', error)
      showNotification('Erreur lors du chargement des activités', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchActivitiesData()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) return

    try {
      const response = await fetch(`/api/admin/activities?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // Refresh all data after deletion
        await fetchActivitiesData()
        showNotification('Activité supprimée avec succès!', 'success')
      } else {
        const errorData = await response.json()
        showNotification(`Erreur: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Delete error:', error)
      showNotification('Erreur lors de la suppression', 'error')
    }
  }

  // Enhanced modal opening that refreshes data afterwards
  const handleOpenModal = (type: string, item?: any) => {
    onOpenModal(type, item)
    
    // Set up a listener for when modal closes to refresh data
    const checkForUpdates = () => {
      setTimeout(() => {
        fetchActivitiesData()
      }, 500) // Small delay to ensure save completed
    }
    
    // Store the callback for when the modal operation completes
    window.addEventListener('activitySaved', checkForUpdates, { once: true })
  }



  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.titleFr.toLowerCase().includes(searchTerm.toLowerCase())
    const category = activityCategories.find(cat => cat.id === activity.categoryId)
    const matchesCategory = filterCategory === '' || category?.slug === filterCategory
    return matchesSearch && matchesCategory
  })


  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement des activités...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Activités</h1>
            <p className="text-gray-600">Gérez vos quatre domaines d'activité et services spécialisés</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => fetchActivitiesData()} 
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl transition-colors"
              title="Actualiser les données"
            >
              🔄 Actualiser
            </button>
            <button 
              onClick={() => handleOpenModal('activity')} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Nouvelle Activité</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une activité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px]"
          >
            <option value="">Toutes les catégories</option>
            {activityCategories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.titleFr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories Overview with live counts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {activityCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color || 'from-blue-500 to-blue-600'} flex items-center justify-center`}>
                <Layers className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {activities.filter(act => act.categoryId === category.id).length}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{category.titleFr}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.descriptionFr}</p>
            <div className="text-xs text-blue-600 font-medium">
              {category.subcategories?.length || 0} sous-catégories
            </div>
          </div>
        ))}
      </div>

      {/* Activities List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {filteredActivities.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <Layers className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Aucune activité disponible</h3>
            <p className="text-lg mb-8">Commencez par ajouter votre première activité.</p>
            <button 
              onClick={() => onOpenModal('activity')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-colors shadow-lg text-lg"
            >
              Ajouter une activité
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredActivities.map((activity) => {
                const category = activityCategories.find(cat => cat.id === activity.categoryId)
                const subcategory = category?.subcategories.find(sub => sub.id === activity.subcategoryId)
                
                if (viewMode === 'grid') {
                  return (
                    <div key={activity.id} className="group border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200 bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category?.color || 'from-blue-500 to-blue-600'} flex items-center justify-center`}>
                          <Layers className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => onOpenModal('activity', activity)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(activity.id!)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        {activity.isFeatured && (
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            Recommandé
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          activity.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                        {activity.titleFr}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                        {activity.shortDescFr || activity.descriptionFr}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Catégorie:</span>
                          <span className="font-medium text-gray-900">{category?.titleFr}</span>
                        </div>
                        {subcategory && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Sous-catégorie:</span>
                            <span className="font-medium text-gray-900">{subcategory.titleFr}</span>
                          </div>
                        )}
                        {activity.duration && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Durée:</span>
                            <span className="font-medium text-gray-900">{activity.duration}</span>
                          </div>
                        )}
                      </div>

                      {activity.features && activity.features.length > 0 && (
                        <div className="mb-4">
                          <div className="text-xs font-medium text-gray-700 mb-2">Caractéristiques:</div>
                          <div className="space-y-1">
                            {activity.features.slice(0, 2).map((feature, index) => (
                              <div key={index} className="flex items-start text-xs text-gray-600">
                                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="line-clamp-1">{feature}</span>
                              </div>
                            ))}
                            {activity.features.length > 2 && (
                              <div className="text-xs text-blue-600 font-medium">
                                +{activity.features.length - 2} autres caractéristiques
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                } else {
                  // List view
                  return (
                    <div key={activity.id} className="group flex items-center space-x-6 p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all bg-white">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category?.color || 'from-blue-500 to-blue-600'} flex items-center justify-center flex-shrink-0`}>
                        <Layers className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {activity.titleFr}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                          {activity.shortDescFr || activity.descriptionFr}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">
                            {category?.titleFr}
                          </span>
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            activity.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {activity.isActive ? 'Actif' : 'Inactif'}
                          </span>
                          {activity.isFeatured && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-medium">
                              Recommandé
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onOpenModal('activity', activity)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(activity.id!)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}