// components/admin/sections/PartnersSection.tsx
import React, { useState, useEffect } from 'react'
import { 
  Plus, Edit, Trash2, Search, Users, Building, 
  ExternalLink, Globe, CheckCircle
} from 'lucide-react'

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

interface PartnersSectionProps {
  onOpenModal: (type: string, item?: any) => void
  showNotification: (message: string, type: 'success' | 'error') => void
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({
  onOpenModal,
  showNotification
}) => {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  // Fetch partners
  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/partners')
      if (response.ok) {
        const data = await response.json()
        setPartners(data)
      }
    } catch (error) {
      console.error('Error fetching partners:', error)
      showNotification('Erreur lors du chargement des partenaires', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) return

    try {
      const response = await fetch(`/api/admin/partners?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setPartners(partners.filter(item => item.id !== id))
        showNotification('Partenaire supprimé avec succès!', 'success')
      } else {
        const errorData = await response.json()
        showNotification(`Erreur: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Delete error:', error)
      showNotification('Erreur lors de la suppression', 'error')
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'institution publique': return <Building className="w-5 h-5 text-blue-600" />
      case 'organisation internationale': return <Globe className="w-5 h-5 text-green-600" />
      case 'entreprise privée': return <Users className="w-5 h-5 text-purple-600" />
      case 'ong': return <CheckCircle className="w-5 h-5 text-orange-600" />
      default: return <Users className="w-5 h-5 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'institution publique': return 'from-blue-500 to-blue-600'
      case 'organisation internationale': return 'from-green-500 to-green-600'
      case 'entreprise privée': return 'from-purple-500 to-purple-600'
      case 'ong': return 'from-orange-500 to-orange-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === '' || partner.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(partners.map(partner => partner.category).filter(Boolean))]

  // Group partners by category
  const partnersByCategory = filteredPartners.reduce((acc: {[key: string]: Partner[]}, partner) => {
    const category = partner.category || 'Autres'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(partner)
    return acc
  }, {})

      if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement des partenaires...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Partenaires</h1>
            <p className="text-gray-600">Réseau professionnel et partenaires stratégiques</p>
          </div>
          <button 
            onClick={() => onOpenModal('partner')} 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Nouveau Partenaire</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un partenaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[200px]"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Partners Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        {Object.entries(partnersByCategory).map(([category, categoryPartners]) => (
          <div key={category} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(category)} flex items-center justify-center`}>
                {getCategoryIcon(category)}
              </div>
              <span className="text-2xl font-bold text-gray-900">{categoryPartners.length}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{category}</h3>
            <p className="text-sm text-gray-600">Partenaires actifs</p>
          </div>
        ))}
      </div>

      {/* Partners List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {filteredPartners.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <Users className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Aucun partenaire disponible</h3>
            <p className="text-lg mb-8">Commencez par ajouter votre premier partenaire.</p>
            <button 
              onClick={() => onOpenModal('partner')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl transition-colors shadow-lg text-lg"
            >
              Ajouter un partenaire
            </button>
          </div>
        ) : (
          <div className="p-6">
            {Object.entries(partnersByCategory).map(([category, categoryPartners]) => (
              <div key={category} className="mb-8 last:mb-0">
                <div className="flex items-center mb-6">
                  {getCategoryIcon(category)}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">{category}</h3>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium ml-3">
                    {categoryPartners.length}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryPartners.map((partner) => (
                    <div key={partner.id} className="group border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-purple-200 bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                          {partner.logo ? (
                            <img 
                              src={partner.logo} 
                              alt={partner.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Building className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => onOpenModal('partner', partner)}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(partner.id!)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          partner.active !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {partner.active !== false ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors leading-tight line-clamp-2">
                        {partner.name}
                      </h3>
                      
                      {partner.url && (
                        <div className="mb-4">
                          <a 
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 font-medium"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Visiter le site
                          </a>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Ordre d'affichage:</span>
                          <span className="font-medium text-gray-900">{partner.partnerOrder || 0}</span>
                        </div>
                        {partner.createdAt && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Ajouté le:</span>
                            <span className="font-medium text-gray-900">
                              {new Date(partner.createdAt).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}