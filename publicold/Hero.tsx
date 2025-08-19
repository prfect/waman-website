// Path: components\public\Hero.tsx

'use client'
export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700"></div>
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold">
              19 ans d'excellence • 150+ projets réalisés
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Ingénierie de l'Eau
            <span className="block text-yellow-400">& Environnement</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
            Leader de l'ingénierie hydraulique au Maroc, WAMAN Consulting développe des solutions 
            innovantes pour la gestion durable des ressources en eau et la protection de l'environnement.
          </p>
        </div>
      </div>
    </div>
  )
}