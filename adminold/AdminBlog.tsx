// Path: components\admin\AdminBlog.tsx

'use client'
import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Star, Calendar, User } from 'lucide-react'
interface BlogPost {
  id: number
  titleFr: string
  titleEn: string
  author: string
  status: string
  featured: boolean
  category: string
  publishDate: string
  views: number
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      titleFr: 'Intelligence Artificielle pour la Gestion de l\'Eau',
      titleEn: 'AI for Water Management',
      author: 'Dr. Ahmed Benali',
      status: 'Publié',
      featured: true,
      category: 'Innovation',
      publishDate: '2024-06-15',
      views: 1250
    },
    {
      id: 2,
      titleFr: 'Économie Circulaire de l\'Eau au Maroc',
      titleEn: 'Circular Water Economy in Morocco',
      author: 'Fatima Alaoui',
      status: 'Brouillon',
      featured: false,
      category: 'Durabilité',
      publishDate: '2024-06-10',
      views: 890
    }
  ])

  const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog & Actualités</h1>
          <p className="text-gray-600 mt-1">Gérez vos articles et publications</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvel Article</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">24</div>
          <div className="text-sm text-gray-600">Total Articles</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">18</div>
          <div className="text-sm text-gray-600">Publiés</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">6</div>
          <div className="text-sm text-gray-600">Brouillons</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">12.5k</div>
          <div className="text-sm text-gray-600">Vues totales</div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Articles</h3>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                <option>Tous les statuts</option>
                <option>Publié</option>
                <option>Brouillon</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                <option>Toutes catégories</option>
                <option>Innovation</option>
                <option>Durabilité</option>
                <option>Technologie</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {posts.map(post => (
            <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {post.titleFr}
                    </h4>
                    {post.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      post.status === 'Publié' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-sm">{post.titleEn}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publishDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views} vues</span>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Nouvel Article</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Titre (Français)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Title (English)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Catégorie</option>
                  <option>Innovation</option>
                  <option>Durabilité</option>
                  <option>Technologie</option>
                </select>
                <input
                  type="text"
                  placeholder="Auteur"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Temps de lecture"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <textarea
                rows={6}
                placeholder="Contenu de l'article..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                Sauver brouillon
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Publier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}