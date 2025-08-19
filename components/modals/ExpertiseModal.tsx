// components/modals/ExpertiseModal.tsx
import React from 'react'
import { X, Award, Users, Globe, TrendingUp, CheckCircle, Play } from 'lucide-react'

interface ExpertiseModalProps {
  isOpen: boolean
  onClose: () => void
  currentLang: 'fr' | 'en'
}

export const ExpertiseModal: React.FC<ExpertiseModalProps> = ({ isOpen, onClose, currentLang }) => {
  if (!isOpen) return null

  const expertiseData = {
    fr: {
      title: "Notre Expertise WAMAN",
      subtitle: "19+ années d'excellence en ingénierie de l'eau",
      intro: "Depuis 2005, WAMAN Consulting accompagne ses clients dans la réalisation de projets d'ingénierie de l'eau et de l'environnement au Maroc et en Afrique.",
      stats: [
        { number: "19+", label: "Années d'expérience" },
        { number: "150+", label: "Projets réalisés" },
        { number: "50+", label: "Clients satisfaits" },
        { number: "4", label: "Domaines d'expertise" }
      ],
      strengths: [
        {
          title: "Excellence Technique",
          description: "Maîtrise des dernières technologies et méthodologies en ingénierie de l'eau",
          icon: Award
        },
        {
          title: "Équipe Experte",
          description: "Ingénieurs spécialisés et consultants seniors avec expertise internationale",
          icon: Users
        },
        {
          title: "Présence Régionale",
          description: "Connaissance approfondie des enjeux locaux au Maroc et en Afrique",
          icon: Globe
        },
        {
          title: "Innovation Continue",
          description: "Adoption des solutions innovantes et durables pour vos projets",
          icon: TrendingUp
        }
      ],
      achievements: [
        "Certification ISO 9001:2015 pour la qualité",
        "Partenaire agréé des organismes internationaux",
        "Expertise reconnue en gestion des ressources en eau",
        "Formation continue de nos équipes aux dernières technologies"
      ],
      cta: "Découvrir nos réalisations"
    },
    en: {
      title: "Our WAMAN Expertise",
      subtitle: "19+ years of excellence in water engineering",
      intro: "Since 2005, WAMAN Consulting has been supporting its clients in water and environmental engineering projects in Morocco and Africa.",
      stats: [
        { number: "19+", label: "Years of experience" },
        { number: "150+", label: "Completed projects" },
        { number: "50+", label: "Satisfied clients" },
        { number: "4", label: "Areas of expertise" }
      ],
      strengths: [
        {
          title: "Technical Excellence",
          description: "Mastery of the latest technologies and methodologies in water engineering",
          icon: Award
        },
        {
          title: "Expert Team",
          description: "Specialized engineers and senior consultants with international expertise",
          icon: Users
        },
        {
          title: "Regional Presence",
          description: "Deep understanding of local challenges in Morocco and Africa",
          icon: Globe
        },
        {
          title: "Continuous Innovation",
          description: "Adoption of innovative and sustainable solutions for your projects",
          icon: TrendingUp
        }
      ],
      achievements: [
        "ISO 9001:2015 certification for quality",
        "Approved partner of international organizations",
        "Recognized expertise in water resources management",
        "Continuous training of our teams in the latest technologies"
      ],
      cta: "Discover our achievements"
    }
  }

  const data = expertiseData[currentLang]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center mb-4">
            <Play className="w-8 h-8 mr-3 text-cyan-300" />
            <h2 className="text-3xl font-bold">{data.title}</h2>
          </div>
          <p className="text-blue-100 text-lg">{data.subtitle}</p>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-8">
          {/* Introduction */}
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">{data.intro}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {data.stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Strengths */}
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Nos Points Forts</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {data.strengths.map((strength, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <strength.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{strength.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{strength.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Nos Certifications & Reconnaissances</h3>
          <div className="space-y-3 mb-8">
            {data.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{achievement}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button 
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {data.cta}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}