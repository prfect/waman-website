// components/admin/forms/ActivityForm.tsx
import React, { useState, useEffect } from 'react'
import { Star, CheckCircle, Plus, X } from 'lucide-react'
import { ImageUpload } from '../shared/ImageUpload'

interface ActivityCategory {
  id: number
  slug: string
  titleFr: string
  titleEn?: string
  subcategories: ActivitySubcategory[]
}

interface ActivitySubcategory {
  id: number
  slug: string
  titleFr: string
  titleEn?: string
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
  prerequisites?: string
  technologies?: string[]
  dataTypes?: string[]
  outputFormats?: string[]
  features?: string[]
  certifications?: string[]
  image?: string
  isFeatured: boolean
  isActive: boolean
  displayOrder: number
  categoryId: number
  subcategoryId?: number
}

interface ActivityFormProps {
  activity?: Activity
  onSave: (activityData: Activity) => void
  onCancel: () => void
  loading: boolean
}

export const ActivityForm: React.FC<ActivityFormProps> = ({
  activity,
  onSave,
  onCancel,
  loading
}) => {
  const [formData, setFormData] = useState<Activity>({
    slug: '',
    titleFr: '',
    titleEn: '',
    shortDescFr: '',
    shortDescEn: '',
    descriptionFr: '',
    descriptionEn: '',
    methodology: '',
    deliverables: [],
    duration: '',
    targetAudience: '',
    prerequisites: '',
    technologies: [],
    dataTypes: [],
    outputFormats: [],
    features: [],
    certifications: [],
    image: '',
    isFeatured: false,
    isActive: true,
    displayOrder: 0,
    categoryId: 0,
    subcategoryId: undefined,
    ...activity
  })

  const [activityCategories, setActivityCategories] = useState<ActivityCategory[]>([])
  const [newFeature, setNewFeature] = useState('')
  const [newDeliverable, setNewDeliverable] = useState('')
  const [newTechnology, setNewTechnology] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/activity-categories')
      if (response.ok) {
        const categories = await response.json()
        setActivityCategories(categories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addArrayItem = (field: keyof Activity, value: string) => {
    if (value.trim()) {
      const currentArray = (formData[field] as string[]) || []
      setFormData({
        ...formData,
        [field]: [...currentArray, value.trim()]
      })
      
      // Clear the input based on field
      if (field === 'features') setNewFeature('')
      if (field === 'deliverables') setNewDeliverable('')
      if (field === 'technologies') setNewTechnology('')
    }
  }

  const removeArrayItem = (field: keyof Activity, index: number) => {
    const currentArray = (formData[field] as string[]) || []
    setFormData({
      ...formData,
      [field]: currentArray.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Titre (Français) *</label>
            <input
              type="text"
              placeholder="Nom de l'activité en français"
              value={formData.titleFr}
              onChange={(e) => setFormData({...formData, titleFr: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Title (English)</label>
            <input
              type="text"
              placeholder="Activity name in English"
              value={formData.titleEn}
              onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Slug (URL) *</label>
          <input
            type="text"
            placeholder="nom-activite-url"
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
            required
          />
        </div>

        {/* Category Selection */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Catégorie *</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({...formData, categoryId: parseInt(e.target.value), subcategoryId: undefined})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
              required
            >
              <option value={0}>Sélectionner une catégorie</option>
              {activityCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.titleFr}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Sous-catégorie</label>
            <select
              value={formData.subcategoryId || ''}
              onChange={(e) => setFormData({...formData, subcategoryId: e.target.value ? parseInt(e.target.value) : undefined})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
              disabled={!formData.categoryId}
            >
              <option value="">Aucune sous-catégorie</option>
              {activityCategories
                .find(cat => cat.id === formData.categoryId)?.subcategories
                ?.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.titleFr}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Descriptions */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Description courte (Français)</label>
            <textarea
              placeholder="Résumé de l'activité pour les cartes"
              value={formData.shortDescFr}
              onChange={(e) => setFormData({...formData, shortDescFr: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl h-24 resize-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Short Description (English)</label>
            <textarea
              placeholder="Activity summary for cards"
              value={formData.shortDescEn}
              onChange={(e) => setFormData({...formData, shortDescEn: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl h-24 resize-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Description complète (Français) *</label>
          <textarea
            placeholder="Description détaillée de l'activité"
            value={formData.descriptionFr}
            onChange={(e) => setFormData({...formData, descriptionFr: e.target.value})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl h-32 resize-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
            required
          />
        </div>

        {/* Service Details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Durée typique</label>
            <input
              type="text"
              placeholder="Ex: 2-4 semaines"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Public cible</label>
            <input
              type="text"
              placeholder="Ex: Ingénieurs, décideurs publics"
              value={formData.targetAudience}
              onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
            />
          </div>
        </div>

        {/* Methodology */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Méthodologie</label>
          <textarea
            placeholder="Décrivez votre approche méthodologique pour cette activité"
            value={formData.methodology}
            onChange={(e) => setFormData({...formData, methodology: e.target.value})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl h-32 resize-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Caractéristiques clés</label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ajouter une caractéristique..."
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('features', newFeature))}
              />
              <button
                type="button"
                onClick={() => addArrayItem('features', newFeature)}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.features && formData.features.length > 0 && (
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeArrayItem('features', index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Deliverables */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Livrables</label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ajouter un livrable..."
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('deliverables', newDeliverable))}
              />
              <button
                type="button"
                onClick={() => addArrayItem('deliverables', newDeliverable)}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.deliverables && formData.deliverables.length > 0 && (
              <div className="space-y-2">
                {formData.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">{deliverable}</span>
                    <button
                      type="button"
                      onClick={() => removeArrayItem('deliverables', index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Technologies (for Géomatique category) */}
        {formData.categoryId === 3 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Technologies utilisées</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: ArcGIS, QGIS, PostgreSQL..."
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('technologies', newTechnology))}
                />
                <button
                  type="button"
                  onClick={() => addArrayItem('technologies', newTechnology)}
                  className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {formData.technologies && formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('technologies', index)}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Image Upload */}
        <ImageUpload 
          currentImage={formData.image}
          onImageChange={(url) => setFormData({...formData, image: url})}
          label="Image de l'activité"
        />

        {/* Options */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-orange-50 p-4 rounded-xl">
            <input
              type="checkbox"
              id="featured-activity"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 mr-4 w-5 h-5"
            />
            <label htmlFor="featured-activity" className="text-lg font-medium text-gray-700 flex items-center">
              <Star className="w-5 h-5 mr-2 text-orange-500" />
              Activité recommandée
            </label>
          </div>

          <div className="flex items-center bg-green-50 p-4 rounded-xl">
            <input
              type="checkbox"
              id="active-activity"
              checked={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500 mr-4 w-5 h-5"
            />
            <label htmlFor="active-activity" className="text-lg font-medium text-gray-700 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Activité active
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
          >
            Annuler
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {formData.id ? 'Mise à jour...' : 'Enregistrement...'}
              </div>
            ) : (
              formData.id ? 'Mettre à jour l\'activité' : 'Enregistrer l\'activité'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}