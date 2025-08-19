// utils/icons.tsx
import { JSX } from 'react'
import { 
  Droplets, Shield, Globe, TrendingUp, Target, Recycle, Wrench 
} from 'lucide-react'

export const getServiceIcon = (categoryTitle: string): JSX.Element => {
  switch (categoryTitle.toLowerCase()) {
    case 'ressources en eau': return <Droplets className="w-8 h-8" />
    case 'environnement': return <Shield className="w-8 h-8" />
    case 'géomatique': case 'sig': return <Globe className="w-8 h-8" />
    case 'changement climatique': return <TrendingUp className="w-8 h-8" />
    case 'développement durable': return <Target className="w-8 h-8" />
    case 'alimentation en eau potable': case 'aep': return <Droplets className="w-8 h-8" />
    case 'assainissement': return <Recycle className="w-8 h-8" />
    default: return <Wrench className="w-8 h-8" />
  }
}

export const getServiceColor = (categoryTitle: string): string => {
  switch (categoryTitle.toLowerCase()) {
    case 'ressources en eau': return 'from-blue-500 to-blue-600'
    case 'environnement': return 'from-green-500 to-green-600'
    case 'géomatique': case 'sig': return 'from-purple-500 to-violet-500'
    case 'changement climatique': return 'from-orange-500 to-red-500'
    case 'développement durable': return 'from-green-500 to-blue-500'
    case 'alimentation en eau potable': case 'aep': return 'from-cyan-500 to-blue-500'
    case 'assainissement': return 'from-teal-500 to-green-500'
    default: return 'from-gray-500 to-gray-600'
  }
}