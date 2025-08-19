// components/sections/ContactSection.tsx - Fixed version with proper encoding
import React, { useState } from 'react'
import { 
  Mail, Phone, MapPin, Send, CheckCircle, 
  Building, User, MessageCircle, Calendar,
  ArrowRight, Sparkles, AlertCircle
} from 'lucide-react'

interface ContactSectionProps {
  currentLang: 'fr' | 'en'
  t: (key: string) => string
}

interface FormData {
  name: string
  email: string
  company: string
  projectType: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang, t }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // Form validation
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères'
    }

    return newErrors
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'website_contact_form'
        })
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', company: '', projectType: '', message: '' })
        
        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        const errorData = await response.json()
        setErrors({ submit: errorData.message || 'Erreur lors de l\'envoi' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: 'Erreur de connexion. Veuillez réessayer.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Building,
      title: "Notre bureau",
      content: "N°22, Résidence Menara, Avenue Mohamed VI, Marrakech",
      color: "blue"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+212 524 43 81 83",
      color: "green"
    },
    {
      icon: Mail,
      title: "Email professionnel",
      content: "contact@wamanconsulting.com",
      color: "purple"
    }
  ]

  const projectTypes = [
    "Alimentation en eau potable",
    "Assainissement", 
    "Gestion des ressources en eau",
    "Études d'impact environnemental",
    "Formation et conseil",
    "Ingénierie géomatique",
    "Autre projet"
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500 border-blue-200',
      green: 'bg-green-500 border-green-200',
      purple: 'bg-purple-500 border-purple-200'
    }
    return colorMap[color as keyof typeof colorMap] || 'bg-blue-500 border-blue-200'
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-200 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Contactez-nous
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discutons de votre
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> projet</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Notre équipe d'experts est prête à vous accompagner dans la réalisation de vos projets d'ingénierie et de conseil.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Informations de contact</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className={`p-3 rounded-xl ${getColorClasses(info.color)} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{info.title}</h4>
                        <p className="text-gray-300 leading-relaxed">{info.content}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-4">Pourquoi nous choisir ?</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  Expertise technique reconnue
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  Solutions sur mesure
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  Accompagnement complet
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  Réactivité et disponibilité
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                <p className="text-gray-300">
                  Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-blue-400 hover:text-blue-300 underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h3>
                </div>

                {/* Error Display */}
                {errors.submit && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center text-red-200">
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    {errors.submit}
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Nom complet *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-blue-500'
                      }`}
                      placeholder="Votre nom et prénom"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-red-400 text-sm">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-blue-500'
                      }`}
                      placeholder="votre@email.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
                </div>

                {/* Company Field */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Entreprise / Organisation
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                {/* Project Type Field */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Type de projet
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    >
                      <option value="" className="bg-gray-800">Sélectionnez un type de projet</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type} className="bg-gray-800">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                        errors.message ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-blue-500'
                      }`}
                      placeholder="Décrivez votre projet et vos besoins..."
                    />
                  </div>
                  {errors.message && <p className="mt-1 text-red-400 text-sm">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}