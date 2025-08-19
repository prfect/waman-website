// components/sections/HeroSection.tsx - Updated with modal integration
import React, { useState, useEffect } from 'react'
import { 
  ArrowRight, Play, CheckCircle, Users, Trophy, 
  Droplets, ChevronDown, Sparkles, Globe
} from 'lucide-react'
import { ExpertiseModal } from '../modals/ExpertiseModal'

interface HeroSectionProps {
  projects: any[]
  partners: any[]
  currentLang: 'fr' | 'en'
  setCurrentPage: (page: string) => void
  t: (key: string) => string
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  projects,
  partners,
  currentLang,
  setCurrentPage,
  t
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [showExpertiseModal, setShowExpertiseModal] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const heroSlides = [
    {
      title: currentLang === 'fr' ? 'Excellence en Ingénierie de l\'Eau' : 'Excellence in Water Engineering',
      subtitle: currentLang === 'fr' 
        ? 'Transformons ensemble vos défis hydriques en solutions durables'
        : 'Let\'s transform your water challenges into sustainable solutions together',
      cta: t('discoverServices'),
      bg: 'from-blue-900 via-blue-800 to-cyan-700'
    },
    {
      title: currentLang === 'fr' ? 'Innovation & Expertise Technique' : 'Innovation & Technical Expertise',
      subtitle: currentLang === 'fr' 
        ? '19+ années d\'expérience au service de la gestion des ressources en eau'
        : '19+ years of experience serving water resources management',
      cta: t('seeRealizations'),
      bg: 'from-cyan-800 via-blue-700 to-blue-900'
    },
    {
      title: currentLang === 'fr' ? 'Partenaire de Confiance' : 'Trusted Partner',
      subtitle: currentLang === 'fr' 
        ? 'Accompagnement personnalisé pour vos projets stratégiques'
        : 'Personalized support for your strategic projects',
      cta: t('contactUs'),
      bg: 'from-blue-800 via-cyan-700 to-teal-700'
    }
  ]

  const stats = [
    { 
      number: '19+', 
      label: t('yearsExperience'), 
      icon: Trophy 
    },
    { 
      number: projects.length.toString(), 
      label: t('completedProjects'), 
      icon: CheckCircle 
    },
    { 
      number: partners.length.toString(), 
      label: t('trustedPartners'), 
      icon: Users 
    },
    { 
      number: '4', 
      label: t('activityDomains'), 
      icon: Globe 
    }
  ]

  const handleCTAClick = () => {
    switch (currentSlide) {
      case 0:
        setCurrentPage('activities')
        break
      case 1:
        setCurrentPage('projects')
        break
      case 2:
        // Scroll to contact section
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
        }
        break
      default:
        setCurrentPage('activities')
    }
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background with Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bg} transition-all duration-1000`}>
          {/* Animated Geometric Patterns */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          
          {/* Floating Water Droplets Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                <Droplets className="w-4 h-4 text-white/20" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Premium Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8 animate-slideInDown">
              <Sparkles className="w-4 h-4 mr-2 text-amber-300" />
              {currentLang === 'fr' ? 'Expertise reconnue depuis 2005' : 'Recognized expertise since 2005'}
              <div className="w-2 h-2 bg-amber-300 rounded-full ml-3 animate-pulse"></div>
            </div>

            {/* Dynamic Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="block mb-2">
                {heroSlides[currentSlide].title.split(' ').slice(0, 2).join(' ')}
              </span>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent animate-shimmer">
                {heroSlides[currentSlide].title.split(' ').slice(2).join(' ')}
              </span>
            </h1>

            {/* Subtitle with Typewriter Effect */}
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button 
                onClick={handleCTAClick}
                className="group bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-500 hover:-translate-y-1 hover:scale-105 flex items-center"
              >
                <span className="mr-3">{heroSlides[currentSlide].cta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                onClick={() => setShowExpertiseModal(true)}
                className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold text-lg border border-white/30 hover:bg-white/20 transition-all duration-500 hover:-translate-y-1 flex items-center"
              >
                <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                {t('watchExpertise')}
              </button>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                    isVisible ? 'animate-slideInUp' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 tabular-nums">
                    {stat.number}
                  </div>
                  <div className="text-blue-200 text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-3 mb-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium mb-2">
              {currentLang === 'fr' ? 'Découvrir' : 'Discover'}
            </span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>

        {/* Custom Animations */}
        <style jsx>{`
          @keyframes slideInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(-20px) rotate(120deg);
            }
            66% {
              transform: translateY(10px) rotate(240deg);
            }
          }
          
          .animate-slideInDown {
            animation: slideInDown 0.8s ease-out;
          }
          
          .animate-slideInUp {
            animation: slideInUp 0.6s ease-out;
          }
          
          .animate-shimmer {
            background-size: 1000px 100%;
            animation: shimmer 3s ease-in-out infinite;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .tabular-nums {
            font-variant-numeric: tabular-nums;
          }
        `}</style>
      </section>

      {/* Expertise Modal */}
      <ExpertiseModal 
        isOpen={showExpertiseModal}
        onClose={() => setShowExpertiseModal(false)}
        currentLang={currentLang}
      />
    </>
  )
}