// components/admin/sections/AdminDashboard.tsx
import React, { useState, useEffect } from 'react'
import { 
  Layers, BarChart3, Users, FileText, Bell, Calendar, 
  CheckCircle, TrendingUp, Award, Eye
} from 'lucide-react'

interface DashboardStats {
  activities: number
  projects: number
  partners: number
  blogPosts: number
  contacts: number
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    activities: 0,
    projects: 0,
    partners: 0,
    blogPosts: 0,
    contacts: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [activitiesRes, projectsRes, partnersRes, blogRes, contactsRes] = await Promise.all([
        fetch('/api/admin/activities'),
        fetch('/api/admin/projects'),
        fetch('/api/admin/partners'),
        fetch('/api/admin/blog_posts'),
        fetch('/api/admin/contacts')
      ])

      const [activities, projects, partners, blog, contacts] = await Promise.all([
        activitiesRes.ok ? activitiesRes.json() : [],
        projectsRes.ok ? projectsRes.json() : [],
        partnersRes.ok ? partnersRes.json() : [],
        blogRes.ok ? blogRes.json() : [],
        contactsRes.ok ? contactsRes.json() : []
      ])

      setStats({
        activities: activities.length || 0,
        projects: projects.length || 0,
        partners: partners.length || 0,
        blogPosts: blog.length || 0,
        contacts: contacts.filter((c: any) => c.status === 'nouveau').length || 0
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement du tableau de bord...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 -mx-8 -mt-8 px-8 pt-8 pb-12 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">Tableau de bord WAMAN</h1>
            <p className="text-blue-100 text-lg">Administration du site web - Système de gestion professionnel</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2">
              <div className="text-sm text-blue-100">Dernière mise à jour</div>
              <div className="font-semibold">{new Date().toLocaleDateString('fr-FR')}</div>
            </div>
            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 -mt-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.activities}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Activités</h3>
          <p className="text-sm text-gray-600">Nos domaines d'expertise</p>
          <div className="mt-3 flex items-center text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-700">4 catégories actives</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.projects}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Projets</h3>
          <p className="text-sm text-gray-600">Portfolio complet</p>
          <div className="mt-3 flex items-center text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-blue-700">Réalisations techniques</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.partners}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Partenaires</h3>
          <p className="text-sm text-gray-600">Réseau professionnel</p>
          <div className="mt-3 flex items-center text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-purple-700">Collaborations actives</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.blogPosts}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Articles</h3>
          <p className="text-sm text-gray-600">Blog & actualités</p>
          <div className="mt-3 flex items-center text-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-orange-700">Contenu publié</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Actions rapides</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { type: 'activity', title: 'Nouvelle Activité', desc: 'Ajouter un service spécialisé', icon: Layers, color: 'blue' },
            { type: 'project', title: 'Nouveau Projet', desc: 'Enrichir le portfolio', icon: BarChart3, color: 'green' },
            { type: 'partner', title: 'Nouveau Partenaire', desc: 'Étendre le réseau', icon: Users, color: 'purple' },
            { type: 'blog', title: 'Nouvel Article', desc: 'Publier du contenu', icon: FileText, color: 'orange' }
          ].map((action) => (
            <button 
              key={action.type}
              className="group p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 text-left"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                action.color === 'blue' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                action.color === 'green' ? 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white' :
                action.color === 'purple' ? 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' :
                'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white'
              }`}>
                <action.icon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-900">{action.title}</h4>
              <p className="text-sm text-gray-600 group-hover:text-blue-700">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Aperçu système</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Performance</h4>
            <p className="text-sm text-gray-600">Site web optimisé et fonctionnel</p>
            <div className="mt-3 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-green-700 text-sm font-medium">Système actif</span>
            </div>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Qualité</h4>
            <p className="text-sm text-gray-600">Contenu professionnel et à jour</p>
            <div className="mt-3 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-green-700 text-sm font-medium">Validé</span>
            </div>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Visibilité</h4>
            <p className="text-sm text-gray-600">Présence web professionnelle</p>
            <div className="mt-3 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-green-700 text-sm font-medium">En ligne</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Alert */}
      {stats.contacts > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mr-4">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-red-900 mb-1">
                {stats.contacts} nouveau{stats.contacts > 1 ? 'x' : ''} message{stats.contacts > 1 ? 's' : ''}
              </h4>
              <p className="text-red-700">Des clients ont pris contact avec vous. Consultez la section Messages.</p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Voir les messages
            </button>
          </div>
        </div>
      )}
    </div>
  )
}