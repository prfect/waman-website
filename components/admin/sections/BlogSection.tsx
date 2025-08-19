// components/admin/sections/BlogSection.tsx
import React, { useState, useEffect } from 'react'
import { 
  Plus, Edit, Trash2, Search, Star, FileText, 
  Calendar, User, Eye, BookOpen
} from 'lucide-react'

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
  createdAt: string
  updatedAt?: string
}

interface BlogSectionProps {
  onOpenModal: (type: string, item?: any) => void
  showNotification: (message: string, type: 'success' | 'error') => void
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onOpenModal,
  showNotification
}) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Fetch blog posts
  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/blog_posts')
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data)
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      showNotification('Erreur lors du chargement des articles', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

    try {
      const response = await fetch(`/api/admin/blog_posts?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setBlogPosts(blogPosts.filter(item => item.id !== id))
        showNotification('Article supprimé avec succès!', 'success')
      } else {
        const errorData = await response.json()
        showNotification(`Erreur: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Delete error:', error)
      showNotification('Erreur lors de la suppression', 'error')
    }
  }

  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = (post.titleFr || post.title_fr || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === '' || post.category === filterCategory
    const matchesStatus = filterStatus === '' || 
      (filterStatus === 'published' && post.published !== false) ||
      (filterStatus === 'draft' && post.published === false)
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = [...new Set(blogPosts.map(post => post.category).filter(Boolean))]

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement des articles...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion du Blog</h1>
            <p className="text-gray-600">Articles, actualités et insights techniques</p>
          </div>
          <button 
            onClick={() => onOpenModal('blog')} 
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Nouvel Article</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[150px]"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[120px]"
          >
            <option value="">Tous</option>
            <option value="published">Publiés</option>
            <option value="draft">Brouillons</option>
          </select>
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {filteredBlogPosts.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <FileText className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Aucun article disponible</h3>
            <p className="text-lg mb-8">Commencez par ajouter votre premier article.</p>
            <button 
              onClick={() => onOpenModal('blog')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl transition-colors shadow-lg text-lg"
            >
              Ajouter un article
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogPosts.map((post) => (
                <div key={post.id} className="group border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-orange-200 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onOpenModal('blog', post)}
                        className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id!)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      post.published !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.published !== false ? 'Publié' : 'Brouillon'}
                    </span>
                    {post.featured && (
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        À la une
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors leading-tight line-clamp-2">
                    {post.titleFr || post.title_fr}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.content.substring(0, 120)}...
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Catégorie:</span>
                      <span className="font-medium text-gray-900">{post.category}</span>
                    </div>
                    {post.author && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Auteur:</span>
                        <span className="font-medium text-gray-900">{post.author}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Créé le:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>

                  {post.image && (
                    <div className="mb-4">
                      <img 
                        src={post.image} 
                        alt={post.titleFr || post.title_fr}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <BookOpen className="w-3 h-3 mr-1" />
                      <span>{Math.ceil(post.content.split(' ').length / 200)} min de lecture</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Eye className="w-3 h-3 mr-1" />
                      <span>Voir l'article</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}