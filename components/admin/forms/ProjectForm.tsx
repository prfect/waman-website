// components/admin/forms/ProjectForm.tsx
import React, { useState } from 'react'
import { Star, CheckCircle, Plus, X } from 'lucide-react'
import { ImageUpload } from '../shared/ImageUpload'

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

interface ProjectFormProps {
  project?: Project
  onSave: (projectData: Project) => void
  onCancel: () => void
  loading: boolean
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSave,
  onCancel,
  loading
}) => {
  const [formData, setFormData] = useState<Project>({
    titleFr: '',
    titleEn: '',
    descriptionFr: '',
    descriptionEn: '',
    client: '',
    year: new Date().getFullYear().toString(),
    status: 'En cours',
    category: '',
    location: '',
    budget: '',
    duration: '',
    image: '',
    featured: false,
    achievements: [],
    ...project
  })

  const [newAchievement, setNewAchievement] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setFormData({
        ...formData,
        achievements: [...(formData.achievements || []), newAchievement.trim()]
      })
      setNewAchievement('')
    }
  }

  const removeAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements?.filter((_, i) => i !== index) || []
    })
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Titre du projet (Français) *</label>
            <input
              type="text"
              placeholder="Nom du projet en français"
              value={formData.titleFr}
              onChange={(e) => setFormData({...formData, titleFr: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Titre du projet (English)</label>
            <input
              type="text"
              placeholder="Project title in English"
              value={formData.titleEn}
              onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all text-lg"
            />
          </div>
        </div>

        {/* Client and Project Details */}
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Client *</label>
            <input
              type="text"
              placeholder="Nom du client"
              value={formData.client}
              onChange={(e) => setFormData({...formData, client: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Année *</label>
            <input
              type="text"
              placeholder="2024"
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Statut *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all text-lg"
              required
            >
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
              <option value="En attente">En attente</option>
              <option value="Annulé">Annulé</option>
            </select>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Catégorie</label>
            <input
              type="text"
              placeholder="Ex: Alimentation en eau potable"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Localisation</label>
            <input
              type="text"
              placeholder="Ex: Marrakech, Maroc"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Durée</label>
            <input
              type="text"
              placeholder="Ex: 6 mois"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all text-lg"
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Budget</label>
          <input
            type="text"
            placeholder="Ex: 500,000 MAD"
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all text-lg"
          />
        </div>

        {/* Descriptions */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Description (Français) *</label>
          <textarea
            placeholder="Description détaillée du projet"
            value={formData.descriptionFr}
            onChange={(e) => setFormData({...formData, descriptionFr: e.target.value})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl h-32 resize-none focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all text-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Description (English)</label>
          <textarea
            placeholder="Detailed project description in English"
            value={formData.descriptionEn}
            onChange={(e) => setFormData({...formData, descriptionEn: e.target.value})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl h-32 resize-none focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all text-lg"
          />
        </div>

        {/* Achievements */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Réalisations clés</label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ajouter une réalisation..."
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
              />
              <button
                type="button"
                onClick={addAchievement}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.achievements && formData.achievements.length > 0 && (
              <div className="space-y-2">
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">{achievement}</span>
                    <button
                      type="button"
                      onClick={() => removeAchievement(index)}
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

        {/* Image Upload */}
        <ImageUpload 
          currentImage={formData.image}
          onImageChange={(url) => setFormData({...formData, image: url})}
          label="Image du projet"
        />

        {/* Options */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-orange-50 p-4 rounded-xl">
            <input
              type="checkbox"
              id="featured-project"
              checked={formData.featured}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 mr-4 w-5 h-5"
            />
            <label htmlFor="featured-project" className="text-lg font-medium text-gray-700 flex items-center">
              <Star className="w-5 h-5 mr-2 text-orange-500" />
              Projet phare
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
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {formData.id ? 'Mise à jour...' : 'Enregistrement...'}
              </div>
            ) : (
              formData.id ? 'Mettre à jour le projet' : 'Enregistrer le projet'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}