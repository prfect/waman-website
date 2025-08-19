// components/admin/sections/SettingsSection.tsx
import React, { useState } from 'react'
import { 
  Settings, Save, User, Globe, Shield, Database, 
  Mail, Phone, MapPin, Building
} from 'lucide-react'

export const SettingsSection: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [activeSettingsTab, setActiveSettingsTab] = useState('general')
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'WAMAN CONSULTING',
    siteDescription: 'Water Management Consulting',
    siteUrl: 'https://wamanconsulting.com',
    language: 'fr',
    timezone: 'Africa/Casablanca'
  })

  const [contactSettings, setContactSettings] = useState({
    companyName: 'WAMAN CONSULTING',
    address: 'N°22, Résidence Menara, Avenue Mohamed VI, Marrakech',
    phone: '(212) 524 43 81 83',
    email: 'contact@wamanconsulting.com',
    website: 'https://wamanconsulting.com'
  })

  const handleSaveSettings = async (settingsType: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      showNotification('Paramètres sauvegardés avec succès!', 'success')
    } catch (error) {
      showNotification('Erreur lors de la sauvegarde', 'error')
    } finally {
      setLoading(false)
    }
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 p-4 rounded-xl text-white z-50 shadow-lg transition-all duration-300 max-w-md ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`
    notification.innerHTML = `
      <div class="flex items-center">
        <span class="text-sm font-medium">${message}</span>
      </div>
    `
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)'
      notification.style.opacity = '0'
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 4000)
  }

  const settingsTabs = [
    { key: 'general', label: 'Général', icon: Settings },
    { key: 'contact', label: 'Contact', icon: Mail },
    { key: 'security', label: 'Sécurité', icon: Shield },
    { key: 'backup', label: 'Sauvegarde', icon: Database }
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres du site</h1>
        <p className="text-gray-600">Configuration et paramètres généraux de votre site web</p>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {settingsTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSettingsTab(tab.key)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeSettingsTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeSettingsTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Paramètres généraux</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom du site</label>
                  <input
                    type="text"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL du site</label>
                  <input
                    type="url"
                    value={generalSettings.siteUrl}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteUrl: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description du site</label>
                <textarea
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Langue par défaut</label>
                  <select
                    value={generalSettings.language}
                    onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuseau horaire</label>
                  <select
                    value={generalSettings.timezone}
                    onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Africa/Casablanca">Africa/Casablanca</option>
                    <option value="Europe/Paris">Europe/Paris</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => handleSaveSettings('general')}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Sauvegarder
              </button>
            </div>
          )}

          {/* Contact Settings */}
          {activeSettingsTab === 'contact' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informations de contact</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise</label>
                <input
                  type="text"
                  value={contactSettings.companyName}
                  onChange={(e) => setContactSettings({...contactSettings, companyName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                <textarea
                  value={contactSettings.address}
                  onChange={(e) => setContactSettings({...contactSettings, address: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={contactSettings.phone}
                    onChange={(e) => setContactSettings({...contactSettings, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={contactSettings.email}
                    onChange={(e) => setContactSettings({...contactSettings, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={() => handleSaveSettings('contact')}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Sauvegarder
              </button>
            </div>
          )}

          {/* Security Settings */}
          {activeSettingsTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Paramètres de sécurité</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <Shield className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-800 font-medium">Sécurité du site</h4>
                    <p className="text-yellow-700 text-sm mt-1">
                      Les paramètres de sécurité avancés seront disponibles dans une future mise à jour.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-green-900">Authentification</h4>
                    <p className="text-green-700 text-sm">NextAuth.js configuré</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-green-900">HTTPS</h4>
                    <p className="text-green-700 text-sm">Connexions sécurisées</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* Backup Settings */}
          {activeSettingsTab === 'backup' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sauvegarde et restauration</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <Database className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-blue-800 font-medium">Base de données</h4>
                    <p className="text-blue-700 text-sm mt-1">
                      La sauvegarde automatique des données sera disponible prochainement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-center">
                  <Database className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Exporter les données</h4>
                  <p className="text-gray-600 text-sm">Télécharger une sauvegarde de vos données</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}