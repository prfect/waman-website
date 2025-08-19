// components/sections/WhyChooseSection.tsx - Version allégée style GIS4DS
import React, { useState, useEffect, useRef } from 'react'
import { 
  Award, Users, Globe, TrendingUp, ArrowRight, Sparkles, CheckCircle
} from 'lucide-react'

interface WhyChooseSectionProps {
  currentLang: 'fr' | 'en'
  t: (key: string) => string
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ currentLang, t }) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Version simplifiée - style GIS4DS
  const whyChooseData = {
    fr: {
      badge: "POURQUOI CHOISIR WAMAN",
      title: "Votre Partenaire de Confiance",
      subtitle: "en Ingénierie de l'Eau",
      description: "Depuis 2005, WAMAN Consulting accompagne ses clients dans la réalisation de projets d'ingénierie de l'eau au Maroc et en Afrique avec expertise et professionnalisme.",
      
      // Stats simplifiés (à remplacer par les vrais chiffres)
      stats: [
        { number: "2005", label: "Année de création" },
        { number: "19+", label: "Années d'expérience" }, 
        { number: "Maroc", label: "Basé à Marrakech" },
        { number: "4", label: "Domaines d'expertise" }
      ],

      // 4 points clés seulement (style GIS4DS)
      keyPoints: [
        {
          icon: Award,
          title: "Expertise Technique",
          description: "Ingénierie de l'eau et de l'environnement avec les dernières méthodologies",
          color: "from-blue-500 to-blue-600"
        },
        {
          icon: Globe,
          title: "Connaissance Locale",
          description: "Maîtrise des enjeux et réglementations au Maroc et en Afrique",
          color: "from-green-500 to-green-600"
        },
        {
          icon: Users,
          title: "Équipe Qualifiée",
          description: "Ingénieurs expérimentés et consultants spécialisés",
          color: "from-purple-500 to-purple-600"
        },
        {
          icon: TrendingUp,
          title: "Approche Innovante",
          description: "Solutions durables et adaptées aux défis contemporains",
          color: "from-orange-500 to-orange-600"
        }
      ]
    },
    
    en: {
      badge: "WHY CHOOSE WAMAN",
      title: "Your Trusted Partner",
      subtitle: "in Water Engineering",
      description: "Since 2005, WAMAN Consulting has been supporting its clients in water engineering projects in Morocco and Africa with expertise and professionalism.",
      
      stats: [
        { number: "2005", label: "Year established" },
        { number: "19+", label: "Years of experience" },
        { number: "Morocco", label: "Based in Marrakech" },
        { number: "4", label: "Areas of expertise" }
      ],

      keyPoints: [
        {
          icon: Award,
          title: "Technical Expertise",
          description: "Water and environmental engineering with latest methodologies",
          color: "from-blue-500 to-blue-600"
        },
        {
          icon: Globe,
          title: "Local Knowledge",
          description: "Understanding of challenges and regulations in Morocco and Africa",
          color: "from-green-500 to-green-600"
        },
        {
          icon: Users,
          title: "Qualified Team",
          description: "Experienced engineers and specialized consultants",
          color: "from-purple-500 to-purple-600"
        },
        {
          icon: TrendingUp,
          title: "Innovative Approach",
          description: "Sustainable solutions adapted to contemporary challenges",
          color: "from-orange-500 to-orange-600"
        }
      ]
    }
  }

  const data = whyChooseData[currentLang]

  return (
    <section 
      ref={sectionRef}
      className="py-16 relative overflow-hidden bg-gradient-to-br from-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header simplifié */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-800 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            {data.badge}
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-900 to-cyan-600 bg-clip-text text-transparent">
              {data.title}
            </span>
            <br />
            <span className="text-gray-800">{data.subtitle}</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Stats compacts */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {data.stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/50">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-700 font-medium text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 4 points clés - style GIS4DS */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {data.keyPoints.map((point, index) => (
            <div 
              key={index}
              className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <point.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                {point.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-sm">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}