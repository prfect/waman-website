// Path: components\admin\AdminOverview.tsx

'use client'
import { useState } from 'react'
import { TrendingUp, Users, FileText, Star, ArrowUp, ArrowDown, Plus, Edit, Eye, BarChart3, Calendar, AlertCircle } from 'lucide-react'

export default function AdminOverview() {
  const [quickAction, setQuickAction] = useState<string | null>(null)

  const stats = [
    { title: 'Services Actifs', value: '12', change: '+2', trend: 'up', icon: TrendingUp, color: 'blue' },
    { title: 'Projets', value: '45', change: '+8', trend: 'up', icon: FileText, color: 'green' },
    { title: 'Partenaires', value: '28', change: '+3', trend: 'up', icon: Users, color: 'purple' },
    { title: 'Messages', value: '15', change: '+5', trend: 'up', icon: Star, color: 'orange' }
  ]

  const recentActivity = [
    { action: 'Nouveau message', item: 'Contact de LYDEC - Projet Casablanca', time: '2h', type: 'warning', priority: 'high' },
    { action: 'Projet mis à jour', item: 'Station Épuration Rabat', time: '4h', type: 'info', priority: 'medium' },
    { action: 'Service modifié', item: 'Gestion des Eaux - Description FR', time: '6h', type: 'success', priority: 'low' },
    { action: 'Article publié', item: 'Technologies IoT pour l\'Eau', time: '1j', type: 'success', priority: 'medium' },
    { action: 'Nouveau partenaire', item: 'ONEE - Partenariat stratégique', time: '2j', type: 'info', priority: 'high' }
  ]

  const contentStats = [
    { type: 'Services', total: 12, published: 10, draft: 2, needsUpdate: 1 },
    { type: 'Projets', total: 45, published: 42, draft: 3, needsUpdate: 2 },
    { type: 'Articles Blog', total: 18, published: 15, draft: 3, needsUpdate: 1 },
    { type: 'Partenaires', total: 28, published: 28, draft: 0, needsUpdate: 0 }
  ]

  const urgentTasks = [
    { task: 'Répondre au message LYDEC', deadline: 'Aujourd\'hui', priority: 'high' },
    { task: 'Finaliser projet Agadir', deadline: 'Demain', priority: 'high' },
    { task: 'Mettre à jour tarifs services', deadline: '3 jours', priority: 'medium' },
    { task: 'Publier article innovation', deadline: '1 semaine', priority: 'medium' }
  ]

  const QuickActionModal = ({ action, onClose }: { action: string, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold">Actions Rapides - {action}</h3>
        </div>
        <div className="p-6">
          {action === 'Service' && (
            <div className="space-y-4">
              <input type="text" placeholder="Titre du service (FR)" className="w-full p-3 border rounded-lg" />
              <input type="text" placeholder="Titre du service (EN)" className="w-full p-3 border rounded-lg" />
              <select className="w-full p-3 border rounded-lg">
                <option>Catégorie</option>
                <option>Hydraulique</option>
                <option>Environnement</option>
                <option>Assainissement</option>
                <option>Géomatique</option>
              </select>
              <textarea placeholder="Description..." className="w-full p-3 border rounded-lg h-32"></textarea>
            </div>
          )}
          {action === 'Projet' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nom du projet (FR)" className="w-full p-3 border rounded-lg" />
                <input type="text" placeholder="Client" className="w-full p-3 border rounded-lg" />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <input type="text" placeholder="Budget" className="w-full p-3 border rounded-lg" />
                <input type="text" placeholder="Année" className="w-full p-3 border rounded-lg" />
                <input type="text" placeholder="Localisation" className="w-full p-3 border rounded-lg" />
              </div>
              <textarea placeholder="Description du projet..." className="w-full p-3 border rounded-lg h-32"></textarea>
            </div>
          )}
          {action === 'Article' && (
            <div className="space-y-4">
              <input type="text" placeholder="Titre de l'article (FR)" className="w-full p-3 border rounded-lg" />
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Auteur" className="w-full p-3 border rounded-lg" />
                <select className="w-full p-3 border rounded-lg">
                  <option>Catégorie</option>
                  <option>Innovation</option>
                  <option>Technologie</option>
                  <option>Environnement</option>
                  <option>Actualités</option>
                </select>
              </div>
              <textarea placeholder="Contenu de l'article..." className="w-full p-3 border rounded-lg h-40"></textarea>
            </div>
          )}
        </div>
        <div className="p-6 border-t flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">Annuler</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Créer</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard WAMAN Consulting</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble et gestion rapide de votre contenu</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">ce mois</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Management Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            État du Contenu
          </h3>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            {contentStats.map((content, index) => (
              <div key={index} className="text-center">
                <h4 className="font-medium text-gray-900 mb-3">{content.type}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">{content.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Publiés:</span>
                    <span className="font-medium text-green-600">{content.published}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-600">Brouillons:</span>
                    <span className="font-medium text-yellow-600">{content.draft}</span>
                  </div>
                  {content.needsUpdate > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600">À mettre à jour:</span>
                      <span className="font-medium text-red-600">{content.needsUpdate}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Urgent Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
              Tâches Urgentes
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {urgentTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.task}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{task.deadline}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === 'high' 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.priority === 'high' ? 'Urgent' : 'Important'}
                      </span>
                    </div>
                  </div>
                  <button className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'info' ? 'bg-blue-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.item}</p>
                    {activity.priority === 'high' && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                        Priorité haute
                      </span>
                    )}
                  </div>
                  <button className="p-1 text-gray-400 hover:text-blue-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Actions Rapides</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Service', icon: '🔧', color: 'blue' },
              { type: 'Projet', icon: '🏗️', color: 'green' },
              { type: 'Article', icon: '📝', color: 'purple' },
              { type: 'Partenaire', icon: '🤝', color: 'orange' }
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => setQuickAction(action.type)}
                className={`p-6 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-${action.color}-500 hover:bg-${action.color}-50 transition-colors group`}
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <div className="font-medium text-gray-900 group-hover:text-gray-900">
                  Nouveau {action.type}
                </div>
                <div className="text-sm text-gray-500">
                  Créer un {action.type.toLowerCase()}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Modal */}
      {quickAction && (
        <QuickActionModal 
          action={quickAction} 
          onClose={() => setQuickAction(null)} 
        />
      )}
    </div>
  )
}