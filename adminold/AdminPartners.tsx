// Path: components\admin\AdminPartners.tsx

'use client'
import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

export default function AdminPartners() {
  const [partners, setPartners] = useState([
    { id: 1, name: 'ONEE', logo: '⚡', category: 'Public' },
    { id: 2, name: 'LYDEC', logo: '🌊', category: 'Private' }
  ])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Partners</h2>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          New Partner
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold">Add Partner</h3>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <input placeholder="Partner Name" className="w-full p-3 border rounded-lg" />
            <input placeholder="Logo (emoji)" className="w-full p-3 border rounded-lg" />
            <select className="w-full p-3 border rounded-lg">
              <option>Category</option>
              <option>Public</option>
              <option>Private</option>
              <option>International</option>
            </select>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg mt-6">
            Add Partner
          </button>
        </div>
        
        <div className="p-6 border-t">
          <h4 className="font-bold mb-4">Current Partners</h4>
          <div className="grid md:grid-cols-4 gap-4">
            {partners.map(partner => (
              <div key={partner.id} className="border rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{partner.logo}</div>
                <h5 className="font-semibold">{partner.name}</h5>
                <p className="text-sm text-gray-500">{partner.category}</p>
                <button className="text-red-600 mt-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}