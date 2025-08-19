// Path: components\public\PublicWebsite.tsx
'use client'
import { useState } from 'react'
import Navigation from './Navigation'
import Hero from './Hero'
import Services from './Services'
import Projects from './Projects'
import ContactForm from './ContactForm'

interface Props {
  setIsAdmin: (value: boolean) => void
}

export default function PublicWebsite({ setIsAdmin }: Props) {
  const [activeSection, setActiveSection] = useState('home')
  
  return (
    <div>
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        setIsAdmin={setIsAdmin}
      />
      
      {activeSection === 'home' && (
        <div>
          <Hero />
          {/* You can add more home sections here like About, Stats, etc. */}
        </div>
      )}
      
      {activeSection === 'services' && <Services />}
      {activeSection === 'projects' && <Projects />}
      {activeSection === 'contact' && <ContactForm />}
    </div>
  )
}