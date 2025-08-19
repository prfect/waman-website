// components/layout/Footer.tsx
import React from 'react'
import { Droplets, MapPin, Phone, Mail, Shield, Target } from 'lucide-react'
import { BaseComponentProps } from '../../types'

export const Footer: React.FC<BaseComponentProps> = ({ currentLang, t }) => (
  <footer className="bg-gray-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">WAMAN CONSULTING</h3>
              <p className="text-gray-400 text-sm">{t('waterManagement')}</p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
            {currentLang === 'fr' 
              ? 'Leader en ingénierie de l\'eau et de l\'environnement au Maroc, accompagnant le développement durable depuis 2005.'
              : 'Leader in water and environmental engineering in Morocco, supporting sustainable development since 2005.'
            }
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-6 text-white">
            {currentLang === 'fr' ? 'Nos Spécialisations' : 'Our Specializations'}
          </h4>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white transition-colors cursor-pointer flex items-center">
              <Droplets className="w-4 h-4 mr-2 text-blue-400" />
              {currentLang === 'fr' ? 'Gestion des ressources en eau' : 'Water resources management'}
            </li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-400" />
              {currentLang === 'fr' ? 'Études impact environnemental' : 'Environmental impact studies'}
            </li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center">
              <Target className="w-4 h-4 mr-2 text-teal-400" />
              {currentLang === 'fr' ? 'Aménagement bassins versants' : 'Watershed management'}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 text-white">
            {currentLang === 'fr' ? 'Contact' : 'Contact'}
          </h4>
          <div className="space-y-4 text-gray-400">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 mt-1 text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-medium text-white">N°22, Résidence Menara</p>
                <p>Avenue Mohamed VI, Marrakech</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
              <a href="tel:+212524438183" className="hover:text-white transition-colors">
                (212) 524 43 81 83
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0" />
              <a href="mailto:contact@wamanconsulting.com" className="hover:text-white transition-colors">
                contact@wamanconsulting.com
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 mb-4 md:mb-0">
          {currentLang === 'fr' 
            ? '© 2025 WAMAN CONSULTING - Cabinet d\'Ingénierie Spécialisé en Eau. Tous droits réservés.'
            : '© 2025 WAMAN CONSULTING - Specialized Water Engineering Firm. All rights reserved.'
          }
        </p>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            {currentLang === 'fr' ? 'Mentions légales' : 'Legal notice'}
          </a>
          <a href="https://www.linkedin.com/company/watermanagementconsulting" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
)