// components/admin/forms/PartnerForm.tsx
import React, { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { ImageUpload } from '../shared/ImageUpload'

interface Partner {
  id?: number
  name: string
  logo?: string
  category: string
  url?: string
  active?: boolean
  partnerOrder?: number
  createdAt?: string
}

interface PartnerFormProps {
  partner?: Partner
  onSave: (partnerData: Partner) => void
  onCancel: () => void
  loading: boolean
}

export const PartnerForm: React.FC<PartnerFormProps> = ({
  partner,
  onSave,
  onCancel,
  loading
}) => {
  const [formData, setFormData] = useState<Partner>({
    name: '',
    logo: '',
    category: 'Institution publique',
    url: '',
    active: true,
    partnerOrder: 0,
    ...partner
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const categories = [
    'Institution publique',
    'Organisation internationale',
    'Entreprise privée',
    'ONG',
    'Bureau d\'études',
    'Université/Recherche',
    'Autre'
  ]

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Information */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Nom du partenaire *</label>
          <input
            type="text"
            placeholder="Nom de l'organisation"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-lg"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Catégorie *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-lg"
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Website URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Site web</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={formData.url}
            onChange={(e) => setFormData({...formData, url: e.target.value})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-lg"
          />
        </div>

        {/* Display Order */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Ordre d'affichage</label>
          <input
            type="number"
            placeholder="0"
            value={formData.partnerOrder}
            onChange={(e) => setFormData({...formData, partnerOrder: parseInt(e.target.value) || 0})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-lg"
          />
          <p className="text-sm text-gray-600 mt-2">Plus le nombre est petit, plus le partenaire apparaît en premier</p>
        </div>

        {/* Logo Upload */}
        <ImageUpload 
          currentImage={formData.logo}
          onImageChange={(url) => setFormData({...formData, logo: url})}
          label="Logo du partenaire"
        />

        {/* Active Status */}
        <div className="flex items-center bg-green-50 p-4 rounded-xl">
          <input
            type="checkbox"
            id="active-partner"
            checked={formData.active}
            onChange={(e) => setFormData({...formData, active: e.target.checked})}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500 mr-4 w-5 h-5"
          />
          <label htmlFor="active-partner" className="text-lg font-medium text-gray-700 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Partenaire actif
          </label>
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
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {formData.id ? 'Mise à jour...' : 'Enregistrement...'}
              </div>
            ) : (
              formData.id ? 'Mettre à jour le partenaire' : 'Enregistrer le partenaire'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}