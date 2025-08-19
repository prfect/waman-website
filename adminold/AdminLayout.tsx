// Path: components\admin\AdminLayout.tsx

'use client'
import { useState } from 'react'
import AdminNavigation from './AdminNavigation'
import AdminOverview from './AdminOverview'
import AdminServices from './AdminServices'
import AdminProjects from './AdminProjects'
import AdminPartners from './AdminPartners'
import AdminBlog from './AdminBlog'
import AdminContacts from './AdminContacts'
import AdminSettings from './AdminSettings'


export default function AdminLayout() {
  const [activeSection, setActiveSection] = useState('overview')

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return <AdminOverview />
      case 'services': return <AdminServices />
      case 'projects': return <AdminProjects />
      case 'partners': return <AdminPartners />
      case 'blog': return <AdminBlog />
      case 'contacts': return <AdminContacts />
      case 'settings': return <AdminSettings />
      default: return <AdminOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex">
        <aside className="w-64 bg-white shadow-lg min-h-screen border-r border-gray-200">
          <div className="p-6">
            <div className="space-y-1">
              {[
                { key: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
                { key: 'services', label: 'Services', icon: '🔧' },
                { key: 'projects', label: 'Projets', icon: '🏗️' },
                { key: 'partners', label: 'Partenaires', icon: '🤝' },
                { key: 'blog', label: 'Blog', icon: '📝' },
                { key: 'contacts', label: 'Messages', icon: '✉️' },
                { key: 'bulk', label: 'Contenu en Masse', icon: '⚡' },
                { key: 'builder', label: 'Constructeur Site', icon: '🎨' },
                { key: 'settings', label: 'Paramètres', icon: '⚙️' }
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                    activeSection === item.key 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {(item.key === 'bulk' || item.key === 'builder') && (
                    <span className="ml-auto bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>
        <main className="flex-1 p-8 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}