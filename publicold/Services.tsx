// Path: components\public\Services.tsx

'use client'
import { useState } from 'react'
import { Droplets, Leaf, Settings, MapPin, ChevronRight, CheckCircle } from 'lucide-react'

export default function Services() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      id: 1,
      titleFr: 'Gestion Intégrée des Ressources en Eau',
      titleEn: 'Integrated Water Resources Management',
      icon: Droplets,
      category: 'Hydraulique',
      descriptionFr: 'Développement de stratégies durables pour la gestion optimale des ressources hydriques',
      features: [
        'Études hydrologiques et hydrogéologiques',
        'Modélisation des ressources en eau',
        'Plans de gestion des bassins versants',
        'Optimisation des réseaux de distribution'
      ]
    },
    {
      id: 2,
      titleFr: 'Aménagement des Bassins Versants',
      titleEn: 'Watershed Development',
      icon: Leaf,
      category: 'Environnement',
      descriptionFr: 'Solutions écologiques pour la protection et la valorisation des écosystèmes aquatiques',
      features: [
        'Protection contre l\'érosion',
        'Restauration écologique',
        'Gestion des zones humides',
        'Biodiversité aquatique'
      ]
    },
    {
      id: 3,
      titleFr: 'Systèmes d\'Assainissement',
      titleEn: 'Sanitation Systems',
      icon: Settings,
      category: 'Assainissement',
      descriptionFr: 'Conception et optimisation de systèmes de traitement des eaux usées',
      features: [
        'Stations d\'épuration',
        'Réseaux d\'assainissement',
        'Traitement décentralisé',
        'Réutilisation des eaux traitées'
      ]
    },
    {
      id: 4,
      titleFr: 'Géomatique et SIG',
      titleEn: 'GIS and Geomatics',
      icon: MapPin,
      category: 'Géomatique',
      descriptionFr: 'Technologies géospatiales pour l\'analyse et la gestion territoriale',
      features: [
        'Cartographie numérique',
        'Analyse spatiale',
        'Télédétection',
        'Systèmes d\'aide à la décision'
      ]
    }
  ]

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
            Nos Services
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-6 text-gray-900">
            Expertise en Ingénierie
            <span className="block text-blue-600">de l'Eau</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            19 ans d'expérience au service de la gestion durable des ressources en eau. 
            Nous accompagnons nos clients dans leurs projets les plus ambitieux.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                activeService === index 
                  ? 'border-blue-500 shadow-2xl transform -translate-y-1' 
                  : 'border-transparent hover:border-blue-200 hover:shadow-xl'
              }`}
              onClick={() => setActiveService(index)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-4 rounded-xl ${
                  activeService === index 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-blue-600'
                } transition-colors duration-300`}>
                  <service.icon className="w-8 h-8" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {service.category}
                    </span>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      activeService === index ? 'rotate-90 text-blue-600' : ''
                    }`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.titleFr}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.descriptionFr}
                  </p>
                  
                  {/* Features List */}
                  <div className={`space-y-2 transition-all duration-300 ${
                    activeService === index ? 'opacity-100 max-h-96' : 'opacity-70 max-h-0 overflow-hidden'
                  }`}>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Prêt à démarrer votre projet ?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Nos experts sont à votre disposition pour vous accompagner dans la réalisation 
            de vos projets d'ingénierie hydraulique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors">
              Demander un devis
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Nos références
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}