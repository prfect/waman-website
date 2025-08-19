// components/admin/shared/AdminSidebar.tsx - Fixed layout
import React from 'react'
import { signOut } from 'next-auth/react'
import { 
  Monitor, Layers, BarChart3, Users, FileText, Mail, Settings, 
  Home, LogOut, Droplets
} from 'lucide-react'

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  activitiesCount: number
  projectsCount: number
  partnersCount: number
  blogCount: number
  contactsCount: number
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  activitiesCount,
  projectsCount,
  partnersCount,
  blogCount,
  contactsCount
}) => {
  const navigationItems = [
    { key: 'dashboard', label: 'Tableau de bord', icon: Monitor, color: 'text-blue-600', count: null },
    { key: 'activities', label: 'Nos Activités', icon: Layers, color: 'text-blue-600', count: activitiesCount },
    { key: 'projects', label: 'Projets', icon: BarChart3, color: 'text-purple-600', count: projectsCount },
    { key: 'partners', label: 'Partenaires', icon: Users, color: 'text-orange-600', count: partnersCount },
    { key: 'blog', label: 'Blog & Actualités', icon: FileText, color: 'text-red-600', count: blogCount },
    { key: 'contacts', label: 'Messages', icon: Mail, color: 'text-pink-600', count: contactsCount },
    { key: 'settings', label: 'Paramètres', icon: Settings, color: 'text-gray-600', count: null }
  ]

  const handleSignOut = async () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      await signOut({ callbackUrl: '/admin/login' })
    }
  }

  return (
    <div className="h-screen bg-white shadow-2xl border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-700 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <Droplets className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">WAMAN CMS</h2>
            <p className="text-sm text-blue-100">Administration</p>
          </div>
        </div>
      </div>
      
      {/* Navigation - Scrollable */}
      <nav className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-2">
          {navigationItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full text-left px-5 py-4 flex items-center justify-between rounded-2xl transition-all duration-300 ${
                activeTab === item.key 
                  ? 'bg-blue-50 text-blue-700 shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
              }`}
            >
              <div className="flex items-center space-x-4">
                <item.icon className={`w-6 h-6 ${activeTab === item.key ? 'text-blue-600' : item.color}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              
              {item.count !== null && (
                <div className={`px-2 py-1 rounded-full text-xs font-bold min-w-[24px] text-center ${
                  activeTab === item.key 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {item.count}
                </div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-100 flex-shrink-0">
        <div className="space-y-2">
          <button
            onClick={() => window.open('/', '_blank')}
            className="w-full text-left px-5 py-3 flex items-center space-x-4 rounded-2xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium text-sm">Voir le site</span>
          </button>
          
          <button
            onClick={handleSignOut}
            className="w-full text-left px-5 py-3 flex items-center space-x-4 rounded-2xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  )
}