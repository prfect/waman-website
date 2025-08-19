// Path: components\admin\AdminContacts.tsx

'use client'
import { useState } from 'react'
import { Mail, Phone, Building, Calendar, Filter, Search, Eye, Reply, Trash2 } from 'lucide-react'
interface Contact {
  id: number
  name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  status: string
  priority: string
  date: string
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Ahmed Benali',
      email: 'ahmed@lydec.ma',
      phone: '+212 600 123 456',
      company: 'LYDEC',
      subject: 'Consultation pour nouveau projet',
      message: 'Bonjour, nous souhaitons une consultation pour un projet d\'infrastructure hydraulique...',
      status: 'Nouveau',
      priority: 'Haute',
      date: '2024-06-18T10:30:00'
    },
    {
      id: 2,
      name: 'Marie Dubois',
      email: 'marie.dubois@afd.fr',
      phone: '+33 1 23 45 67 89',
      company: 'AFD',
      subject: 'Partenariat international',
      message: 'L\'AFD souhaite explorer les opportunités de partenariat...',
      status: 'En cours',
      priority: 'Moyenne',
      date: '2024-06-17T14:15:00'
    }
  ])

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages & Contacts</h1>
          <p className="text-gray-600 mt-1">Gérez les demandes et messages clients</p>
        </div>
        <div className="flex space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            Exporter CSV
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Marquer comme lus
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">48</div>
          <div className="text-sm text-gray-600">Total Messages</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">12</div>
          <div className="text-sm text-gray-600">Traités</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-orange-600">8</div>
          <div className="text-sm text-gray-600">En attente</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-red-600">3</div>
          <div className="text-sm text-gray-600">Urgents</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou entreprise..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>Tous les statuts</option>
            <option>Nouveau</option>
            <option>En cours</option>
            <option>Traité</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>Toutes priorités</option>
            <option>Haute</option>
            <option>Moyenne</option>
            <option>Basse</option>
          </select>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {contacts.map(contact => (
            <div key={contact.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {contact.name}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      contact.status === 'Nouveau' 
                        ? 'bg-blue-100 text-blue-800'
                        : contact.status === 'En cours'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {contact.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      contact.priority === 'Haute' 
                        ? 'bg-red-100 text-red-800'
                        : contact.priority === 'Moyenne'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {contact.priority}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span>{contact.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(contact.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  
                  <h5 className="font-medium text-gray-900 mb-2">{contact.subject}</h5>
                  <p className="text-gray-600 text-sm line-clamp-2">{contact.message}</p>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    onClick={() => setSelectedContact(contact)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                    <Reply className="w-4 h-4" />
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

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Détails du message</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom</label>
                  <p className="text-gray-900">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Entreprise</label>
                  <p className="text-gray-900">{selectedContact.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Téléphone</label>
                  <p className="text-gray-900">{selectedContact.phone}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Sujet</label>
                <p className="text-gray-900">{selectedContact.subject}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">{selectedContact.message}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Fermer
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Répondre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}