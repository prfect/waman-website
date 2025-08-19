// Path: components\public\Navigation.tsx

'use client'
interface Props {
  activeSection: string
  setActiveSection: (section: string) => void
  setIsAdmin: (value: boolean) => void
}

export default function Navigation({ activeSection, setActiveSection, setIsAdmin }: Props) {
  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold">WAMAN CONSULTING</div>
          </div>
          <div className="hidden lg:flex space-x-8">
            <button onClick={() => setActiveSection('home')} 
                    className={`hover:text-blue-200 ${activeSection === 'home' ? 'text-yellow-300' : ''}`}>
              Accueil
            </button>
            <button onClick={() => setActiveSection('services')} 
                    className={`hover:text-blue-200 ${activeSection === 'services' ? 'text-yellow-300' : ''}`}>
              Services
            </button>
            <button onClick={() => setActiveSection('projects')} 
                    className={`hover:text-blue-200 ${activeSection === 'projects' ? 'text-yellow-300' : ''}`}>
              Projets
            </button>
            <button onClick={() => setActiveSection('contact')} 
                    className={`hover:text-blue-200 ${activeSection === 'contact' ? 'text-yellow-300' : ''}`}>
              Contact
            </button>
            <button onClick={() => setIsAdmin(true)} 
                    className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg font-semibold">
              Admin
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}