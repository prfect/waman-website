// components/admin/forms/BlogForm.tsx
import React, { useState } from 'react'
import { Star, CheckCircle } from 'lucide-react'
import { ImageUpload } from '../shared/ImageUpload'

interface BlogPost {
  id?: number
  titleFr: string
  titleEn?: string
  title_fr?: string
  content: string
  category: string
  author?: string
  image?: string
  featured?: boolean
  published?: boolean
  createdAt?: string
  updatedAt?: string
}

interface BlogFormProps {
  blogPost?: BlogPost
  onSave: (blogData: BlogPost) => void
  onCancel: () => void
  loading: boolean
}

export const BlogForm: React.FC<BlogFormProps> = ({
  blogPost,
  onSave,
  onCancel,
  loading
}) => {
  const [formData, setFormData] = useState<BlogPost>({
    titleFr: '',
    titleEn: '',
    content: '',
    category: 'Actualités',
    author: 'WAMAN Consulting',
    image: '',
    featured: false,
    published: true,
    ...blogPost
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const categories = [
    'Actualités',
    'Projets',
    'Expertise technique',
    'Innovation',
    'Partenariats',
    'Formation',
    'Événements',
    'Insights'
  ]

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Titre (Français) *</label>
            <input
              type="text"
              placeholder="Titre de l'article en français"
              value={formData.titleFr}
              onChange={(e) => setFormData({...formData, titleFr: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Title (English)</label>
            <input
              type="text"
              placeholder="Article title in English"
              value={formData.titleEn}
              onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-lg"
            />
          </div>
        </div>

        {/* Meta Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Catégorie *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-lg"
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Auteur</label>
            <input
              type="text"
              placeholder="Nom de l'auteur"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-lg"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Contenu de l'article *</label>
          <textarea
            placeholder="Rédigez le contenu complet de votre article..."
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl h-64 resize-none focus:ring-3 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-lg"
            required
          />
          <p className="text-sm text-gray-600 mt-2">
            Vous pouvez utiliser du texte simple. Le formatage sera appliqué automatiquement.
          </p>
        </div>

        {/* Image Upload */}
        <ImageUpload 
          currentImage={formData.image}
          onImageChange={(url) => setFormData({...formData, image: url})}
          label="Image de l'article"
        />

        {/* Options */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-orange-50 p-4 rounded-xl">
            <input
              type="checkbox"
              id="featured-blog"
              checked={formData.featured}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 mr-4 w-5 h-5"
            />
            <label htmlFor="featured-blog" className="text-lg font-medium text-gray-700 flex items-center">
              <Star className="w-5 h-5 mr-2 text-orange-500" />
              Article à la une
            </label>
          </div>

          <div className="flex items-center bg-green-50 p-4 rounded-xl">
            <input
              type="checkbox"
              id="published-blog"
              checked={formData.published}
              onChange={(e) => setFormData({...formData, published: e.target.checked})}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500 mr-4 w-5 h-5"
            />
            <label htmlFor="published-blog" className="text-lg font-medium text-gray-700 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Publier immédiatement
            </label>
          </div>
        </div>

        {/* Publication Status Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-blue-800 font-medium mb-2">À propos de la publication</h4>
          <p className="text-blue-700 text-sm">
            {formData.published 
              ? "Cet article sera visible sur votre site web dès l'enregistrement."
              : "Cet article sera sauvegardé comme brouillon et ne sera pas visible publiquement."
            }
          </p>
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
            className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {formData.id ? 'Mise à jour...' : 'Enregistrement...'}
              </div>
            ) : (
              formData.published 
                ? (formData.id ? 'Mettre à jour l\'article' : 'Publier l\'article')
                : (formData.id ? 'Sauvegarder les modifications' : 'Sauvegarder comme brouillon')
            )}
          </button>
        </div>
      </form>
    </div>
  )
}