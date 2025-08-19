// Path: app\page.tsx
// Updated main page with dynamic admin loading

'use client'
import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import WamanConsultingWebsite from '@/components/public/MainWebsite'

// Dynamically import the admin component to avoid SSR issues
const WamanAdminCMS = dynamic(
  () => import('@/components/admin/WamanAdminCMS'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'administration...</p>
        </div>
      </div>
    )
  }
)

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false)
  
  console.log('isAdmin state:', isAdmin) // Debug log
  
  if (isAdmin) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de l'administration...</p>
          </div>
        </div>
      }>
        <WamanAdminCMS />
      </Suspense>
    )
  }
  
  return <WamanConsultingWebsite setIsAdmin={setIsAdmin} />
}