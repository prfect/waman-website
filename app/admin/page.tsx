// app/admin/page.tsx
'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import WamanAdminCMS from '../../components/admin/WamanAdminCMS'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if (status === 'loading') return // Still loading
    
    if (!session) {
      router.push('/admin/login')
      return
    }
  }, [session, status, router])
  
  // Show loading while checking session or redirecting
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }
  
  // Show loading while redirecting unauthenticated users
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Redirecting to login...</div>
      </div>
    )
  }
  
  // Render the admin CMS only if authenticated
  return <WamanAdminCMS />
}