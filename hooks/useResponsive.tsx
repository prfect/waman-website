// hooks/useResponsive.tsx
import { useState, useEffect } from 'react'

export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < 768) setBreakpoint('mobile')
      else if (width < 1024) setBreakpoint('tablet')
      else setBreakpoint('desktop')
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (breakpoint === 'desktop') {
      setIsMobileMenuOpen(false)
    }
  }, [breakpoint])

  return { breakpoint, isMobileMenuOpen, setIsMobileMenuOpen }
}