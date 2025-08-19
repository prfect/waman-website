// Path: components\admin\AdminSettings.tsx

'use client'
import { useState } from 'react'
import { Save, Upload, Globe, Mail, Phone, MapPin } from 'lucide-react'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    site: {
      name: 'WAMAN CONSULTING',
      tagline: 'Water Management Consulting',
      description: 'Leader de l\'ingénierie hydraulique au Maroc'
    },
    contact: {
      address: '123 Boulevard Hassan II, Casablanca 20000, Maroc',
      email: 'contact@wamanconsulting.com',
      phone: '+212 522 XXX XXX',
      fax: '+212 522 XXX XXX'
    },
    social: {
      linkedin: '',
      twitter: '',
      facebook: '',
      youtube: ''
    },
    stats: {
      experience: '19',
      projects: '150+',
      clients: '85+',
      countries: '12'
    }
  })

  const handleSave = () => {
    console.log('Saving settings:', settings)
    alert('Paramètres sauvegardés!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-1">Configuration générale du site</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Save className="w-5 h-5" />
          <span>Sauvegarder</span>
        </button>
      </div>

      {/* Site Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Informations du site
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du site
              </label>
              <input
                type="text"
                value={settings.site.name}
                onChange={(e) => setSettings({
                  ...settings,
                  site: { ...settings.site, name: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slogan
              </label>
              <input
                type="text"
                value={settings.site.tagline}
                onChange={(e) => setSettings({
                  ...settings,
                  site: { ...settings.site, tagline: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={settings.site.description}
              onChange={(e) => setSettings({
                ...settings,
                site: { ...settings.site, description: e.target.value }
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Informations de contact
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse
            </label>
            <textarea
              rows={2}
              value={settings.contact.address}
              onChange={(e) => setSettings({
                ...settings,
                contact: { ...settings.contact, address: e.target.value }
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={settings.contact.email}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, email: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={settings.contact.phone}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, phone: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fax
              </label>
              <input
                type="tel"
                value={settings.contact.fax}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, fax: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Statistiques du site</h3>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Années d'expérience
              </label>
              <input
                type="text"
                value={settings.stats.experience}
                onChange={(e) => setSettings({
                  ...settings,
                  stats: { ...settings.stats, experience: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Projets réalisés
              </label>
              <input
                type="text"
                value={settings.stats.projects}
                onChange={(e) => setSettings({
                  ...settings,
                  stats: { ...settings.stats, projects: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clients satisfaits
              </label>
              <input
                type="text"
                value={settings.stats.clients}
                onChange={(e) => setSettings({
                  ...settings,
                  stats: { ...settings.stats, clients: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pays d'intervention
              </label>
              <input
                type="text"
                value={settings.stats.countries}
                onChange={(e) => setSettings({
                  ...settings,
                  stats: { ...settings.stats, countries: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Réseaux sociaux</h3>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                placeholder="https://www.linkedin.com/company/watermanagementconsulting"
                value={settings.social.linkedin}
                onChange={(e) => setSettings({
                  ...settings,
                  social: { ...settings.social, linkedin: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter
              </label>
              <input
                type="url"
                placeholder="https://twitter.com/wamanconsulting"
                value={settings.social.twitter}
                onChange={(e) => setSettings({
                  ...settings,
                  social: { ...settings.social, twitter: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="url"
                placeholder="https://facebook.com/wamanconsulting"
                value={settings.social.facebook}
                onChange={(e) => setSettings({
                  ...settings,
                  social: { ...settings.social, facebook: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/wamanconsulting"
                value={settings.social.youtube}
                onChange={(e) => setSettings({
                  ...settings,
                  social: { ...settings.social, youtube: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}