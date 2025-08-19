// Path: components\public\ContactForm.tsx

'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', subject: '', message: '', phone: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    alert('Message envoyé!')
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Contactez-nous</h1>
        
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Démarrons votre projet</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Nom complet *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 border border-gray-300 rounded-lg"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Sujet *"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-lg mt-6"
                />
                <textarea
                  placeholder="Message *"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-lg h-32 mt-6"
                  required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg mt-6">
                  Envoyer
                </button>
              </form>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-4">
              <p>📍 Casablanca, Maroc</p>
              <p>📧 contact@wamanconsulting.com</p>
              <p>📞 +212 522 XXX XXX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}