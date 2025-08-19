// components/admin/sections/ContactsSection.tsx
import React, { useState, useEffect } from 'react'
import { 
  Mail, Search, Eye, Trash2, Calendar, User, 
  Phone, MapPin, Building, MessageCircle, CheckCircle, Clock
} from 'lucide-react'

interface Contact {
  id?: number
  name: string
  email: string
  company?: string
  projectType?: string
  message: string
  status?: string
  createdAt: string
  updatedAt?: string
}

export const ContactsSection: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  // Fetch contacts
  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/contacts')
      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
      showNotification('Erreur lors du chargement des contacts', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return

    try {
      const response = await fetch(`/api/admin/contacts?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setContacts(contacts.filter(item => item.id !== id))
        showNotification('Message supprimé avec succès!', 'success')
      } else {
        const errorData = await response.json()
        showNotification(`Erreur: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Delete error:', error)
      showNotification('Erreur lors de la suppression', 'error')
    }
  }

  const updateContactStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })

      if (response.ok) {
        setContacts(contacts.map(contact => 
          contact.id === id ? { ...contact, status } : contact
        ))
        showNotification('Statut mis à jour!', 'success')
      }
    } catch (error) {
      console.error('Update error:', error)
      showNotification('Erreur lors de la mise à jour', 'error')
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

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'lu': return 'bg-blue-100 text-blue-800'
      case 'traité': return 'bg-green-100 text-green-800'
      case 'nouveau': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'lu': return <Eye className="w-3 h-3" />
      case 'traité': return <CheckCircle className="w-3 h-3" />
      case 'nouveau': return <Clock className="w-3 h-3" />
      default: return <MessageCircle className="w-3 h-3" />
    }
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === '' || contact.status === filterStatus
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement des messages...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages de Contact</h1>
            <p className="text-gray-600">Demandes et messages des visiteurs du site</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {contacts.filter(c => c.status === 'nouveau' || !c.status).length}
              </div>
              <div className="text-sm text-gray-600">Nouveaux</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {contacts.filter(c => c.status === 'traité').length}
              </div>
              <div className="text-sm text-gray-600">Traités</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent min-w-[150px]"
          >
            <option value="">Tous les statuts</option>
            <option value="nouveau">Nouveaux</option>
            <option value="lu">Lus</option>
            <option value="traité">Traités</option>
          </select>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <Mail className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Aucun message</h3>
            <p className="text-lg">Aucun message de contact trouvé.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                        <p className="text-gray-600">{contact.email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(contact.status)}`}>
                        {getStatusIcon(contact.status)}
                        <span className="ml-1">{contact.status || 'nouveau'}</span>
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {contact.company && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Building className="w-4 h-4 mr-2" />
                          <span>{contact.company}</span>
                        </div>
                      )}
                      {contact.projectType && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          <span>{contact.projectType}</span>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(contact.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Message:</h4>
                      <p className="text-gray-700 leading-relaxed">{contact.message}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateContactStatus(contact.id!, 'lu')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Marquer comme lu
                      </button>
                      <button
                        onClick={() => updateContactStatus(contact.id!, 'traité')}
                        className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Marquer comme traité
                      </button>
                      <a
                        href={`mailto:${contact.email}?subject=Re: Votre demande sur WAMAN Consulting`}
                        className="text-pink-600 hover:text-pink-800 text-sm font-medium flex items-center"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        Répondre par email
                      </a>
                    </div>
                  </div>

                  <div className="ml-4">
                    <button 
                      onClick={() => handleDelete(contact.id!)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}