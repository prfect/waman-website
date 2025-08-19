// Path: components\admin\ProfessionalAdmin.tsx

'use client'
import { useState } from 'react'
import { Plus, Edit, Trash2, Upload, Eye, Globe, Users, FileText, Building, MessageSquare, BarChart3 } from 'lucide-react'

export default function ProfessionalAdmin() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [language, setLanguage] = useState('fr')

  // Sample data that would come from database
  const [services, setServices] = useState([
    {
      id: 1,
      titleFr: 'Télédétection et SIG',
      titleEn: 'Remote Sensing & GIS',
      descriptionFr: 'Solutions avancées de télédétection et systèmes d\'information géographique',
      descriptionEn: 'Advanced remote sensing and geographic information systems solutions',
      category: 'GIS',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      active: true
    }
  ])

  const [projects, setProjects] = useState([
    {
      id: 1,
      titleFr: 'Cartographie Risques Climatiques',
      titleEn: 'Climate Risk Mapping',
      client: 'UNDP Morocco',
      year: '2024',
      category: 'Climate',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800',
      status: 'Completed'
    }
  ])

  const [partners, setPartners] = useState([
    {
      id: 1,
      name: 'UNDP',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200',
      category: 'International',
      website: 'https://undp.org',
      description: 'United Nations Development Programme'
    },
    {
      id: 2,
      name: 'AFD',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=200',
      category: 'Development',
      website: 'https://afd.fr',
      description: 'Agence Française de Développement'
    }
  ])

  const [news, setNews] = useState([
    {
      id: 1,
      titleFr: 'Nouvelle technologie IA pour la surveillance environnementale',
      titleEn: 'New AI technology for environmental monitoring',
      contentFr: 'Introduction de nouvelles solutions d\'intelligence artificielle...',
      contentEn: 'Introduction of new artificial intelligence solutions...',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      publishDate: '2024-06-15',
      category: 'Technology'
    }
  ])

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Services</p>
              <p className="text-3xl font-bold text-blue-600">{services.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Projects</p>
              <p className="text-3xl font-bold text-green-600">{projects.length}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Partners</p>
              <p className="text-3xl font-bold text-purple-600">{partners.length}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">News</p>
              <p className="text-3xl font-bold text-orange-600">{news.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
        </div>
        <div className="p-6 grid md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab('services')}
            className="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 text-center"
          >
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-medium">Add Service</div>
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className="p-4 border-2 border-dashed border-green-300 rounded-lg hover:bg-green-50 text-center"
          >
            <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-medium">Add Project</div>
          </button>
          <button 
            onClick={() => setActiveTab('partners')}
            className="p-4 border-2 border-dashed border-purple-300 rounded-lg hover:bg-purple-50 text-center"
          >
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="font-medium">Add Partner</div>
          </button>
          <button 
            onClick={() => setActiveTab('news')}
            className="p-4 border-2 border-dashed border-orange-300 rounded-lg hover:bg-orange-50 text-center"
          >
            <MessageSquare className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="font-medium">Add News</div>
          </button>
        </div>
      </div>
    </div>
  )

  const renderServices = () => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
      titleFr: '', titleEn: '', descriptionFr: '', descriptionEn: '', category: '', image: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setServices([...services, { ...formData, id: Date.now(), active: true }])
      setFormData({ titleFr: '', titleEn: '', descriptionFr: '', descriptionEn: '', category: '', image: '' })
      setShowForm(false)
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Services Management</h1>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold">Add New Service</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Title (French)"
                    value={formData.titleFr}
                    onChange={(e) => setFormData({...formData, titleFr: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Title (English)"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="GIS">GIS & Remote Sensing</option>
                    <option value="Climate">Climate Analysis</option>
                    <option value="Environment">Environmental Studies</option>
                    <option value="Water">Water Management</option>
                  </select>
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <textarea
                  placeholder="Description (French)"
                  value={formData.descriptionFr}
                  onChange={(e) => setFormData({...formData, descriptionFr: e.target.value})}
                  className="w-full p-3 border rounded-lg h-24"
                  required
                />
                <textarea
                  placeholder="Description (English)"
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({...formData, descriptionEn: e.target.value})}
                  className="w-full p-3 border rounded-lg h-24"
                  required
                />
                <div className="flex space-x-3">
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Save</button>
                  <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="flex">
                <img 
                  src={service.image} 
                  alt={service.titleFr}
                  className="w-48 h-32 object-cover"
                />
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{service.titleFr}</h3>
                      <p className="text-gray-600">{service.titleEn}</p>
                      <p className="text-gray-700 mt-2">{service.descriptionFr}</p>
                      <span className="inline-block mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {service.category}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderPartners = () => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
      name: '', logo: '', category: '', website: '', description: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setPartners([...partners, { ...formData, id: Date.now() }])
      setFormData({ name: '', logo: '', category: '', website: '', description: '' })
      setShowForm(false)
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Partners Management</h1>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Partner</span>
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-lg w-full mx-4">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold">Add New Partner</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Partner Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="url"
                  placeholder="Logo URL"
                  value={formData.logo}
                  onChange={(e) => setFormData({...formData, logo: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="International">International</option>
                  <option value="Government">Government</option>
                  <option value="Development">Development</option>
                  <option value="Private">Private</option>
                  <option value="Academic">Academic</option>
                </select>
                <input
                  type="url"
                  placeholder="Website URL"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-3 border rounded-lg h-20"
                />
                <div className="flex space-x-3">
                  <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg">Save</button>
                  <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="bg-white rounded-xl shadow-sm border p-6 text-center">
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="w-20 h-20 object-contain mx-auto mb-4 rounded"
              />
              <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{partner.description}</p>
              <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                {partner.category}
              </span>
              <div className="flex justify-center space-x-2 mt-4">
                <button className="p-2 text-gray-400 hover:text-blue-600">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard()
      case 'services': return renderServices()
      case 'partners': return renderPartners()
      case 'projects': return <div className="text-center py-20 text-gray-500">Projects management coming soon...</div>
      case 'news': return <div className="text-center py-20 text-gray-500">News management coming soon...</div>
      default: return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">WAMAN Admin</h2>
          <p className="text-sm text-gray-500">Professional CMS</p>
        </div>
        <nav className="mt-6">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { key: 'services', label: 'Services', icon: FileText },
            { key: 'projects', label: 'Projects', icon: Building },
            { key: 'partners', label: 'Partners', icon: Users },
            { key: 'news', label: 'News', icon: MessageSquare }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                activeTab === item.key ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-700' : 'text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  )
}