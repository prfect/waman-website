'use client'
import React, { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'

// Import section components
import { AdminSidebar } from './shared/AdminSidebar'
import { AdminModal } from './shared/AdminModal'
import { ActivitiesSection } from './sections/ActivitiesSection'

// Import all forms
import { ActivityForm } from './forms/ActivityForm'
import { ProjectForm } from './forms/ProjectForm'
import { PartnerForm } from './forms/PartnerForm'
import { BlogForm } from './forms/BlogForm'

// Import sections
import { AdminDashboard } from './sections/AdminDashboard'
import { ProjectsSection } from './sections/ProjectsSection'
import { BlogSection } from './sections/BlogSection'
import { PartnersSection } from './sections/PartnersSection'
import { ContactsSection } from './sections/ContactsSection'
import { SettingsSection } from './sections/SettingsSection'

export default function WamanAdminCMS() {
  // Main state
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [editingItem, setEditingItem] = useState<any>(null)
  
  // Data counts for sidebar - Initialize with default values
  const [dataCounts, setDataCounts] = useState({
    activities: 0,
    projects: 0,
    partners: 0,
    blog: 0,
    contacts: 0
  })

  // Notification state
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    show: boolean;
  }>({
    message: '',
    type: 'success',
    show: false
  })

  // Fetch data counts for sidebar
  useEffect(() => {
    fetchDataCounts()
  }, [])

  const fetchDataCounts = async () => {
    try {
      console.log('🔄 Fetching data counts...')
      
      // Helper function to safely fetch and parse JSON
      const safeFetch = async (url: string) => {
        try {
          const response = await fetch(url)
          if (response.ok) {
            const data = await response.json()
            console.log(`✅ ${url}:`, Array.isArray(data) ? data.length : 'Not array')
            return data
          }
          console.warn(`⚠️ ${url}: Response not OK`)
          return []
        } catch (error) {
          console.error(`❌ Error fetching ${url}:`, error)
          return []
        }
      }

      const [activities, projects, partners, blog, contacts] = await Promise.all([
        safeFetch('/api/admin/activities'),
        safeFetch('/api/admin/projects'), 
        safeFetch('/api/admin/partners'),
        safeFetch('/api/admin/blog_posts'),
        safeFetch('/api/admin/contacts')
      ])

      const newCounts = {
        activities: Array.isArray(activities) ? activities.length : 0,
        projects: Array.isArray(projects) ? projects.length : 0,
        partners: Array.isArray(partners) ? partners.length : 0,
        blog: Array.isArray(blog) ? blog.length : 0,
        contacts: Array.isArray(contacts) ? contacts.filter((c: any) => c.status === 'nouveau' || !c.status).length : 0
      }

      console.log('📊 Final counts:', newCounts)
      setDataCounts(newCounts)
      
    } catch (error) {
      console.error('❌ Error fetching data counts:', error)
      // Keep existing counts or set to 0 if undefined
      setDataCounts(prev => prev || {
        activities: 0,
        projects: 0,
        partners: 0,
        blog: 0,
        contacts: 0
      })
    }
  }

  // Notification helper
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, show: true })
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 5000)
  }

  // Modal management
  const openModal = (type: string, item?: any) => {
    setModalType(type)
    setEditingItem(item || null)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalType('')
    setEditingItem(null)
  }

  const triggerMainWebsiteRefresh = () => {
    // Trigger refresh for the main website
    localStorage.setItem('waman-data-updated', Date.now().toString())
    
    // Also trigger custom event for any listening components
    window.dispatchEvent(new CustomEvent('wamanDataUpdated', {
      detail: { timestamp: Date.now() }
    }))
    
    console.log('🔄 Triggered main website data refresh')
  }

  // Save handlers for all content types
  const handleSaveActivity = async (activityData: any) => {
    setLoading(true)
    try {
      const method = activityData.id ? 'PUT' : 'POST'
      const response = await fetch('/api/admin/activities', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activityData)
      })

      if (response.ok) {
        showNotification(
          activityData.id ? 'Activité mise à jour avec succès!' : 'Activité créée avec succès!',
          'success'
        )
        closeModal()
        await fetchDataCounts()
        triggerMainWebsiteRefresh()
      } else {
        const errorData = await response.json()
        showNotification(`Erreur: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Save error:', error)
      showNotification('Erreur lors de l\'enregistrement', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProject = async (projectData: any) => {
    setLoading(true)
    try {
      const method = projectData.id ? 'PUT' : 'POST'
      const response = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      })

      if (response.ok) {
        showNotification(
          projectData.id ? 'Projet mis à jour avec succès!' : 'Projet créé avec succès!',
          'success'
        )
        closeModal()
        await fetchDataCounts()
        triggerMainWebsiteRefresh()
      } else {
        const errorData = await response.json()
        showNotification(`Erreur: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Save error:', error)
      showNotification('Erreur lors de l\'enregistrement', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSavePartner = async (partnerData: any) => {
    setLoading(true)
    try {
      const method = partnerData.id ? 'PUT' : 'POST'
      const response = await fetch('/api/admin/partners', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerData)
      })

      if (response.ok) {
        showNotification(
          partnerData.id ? 'Partenaire mis à jour avec succès!' : 'Partenaire créé avec succès!',
          'success'
        )
        closeModal()
        await fetchDataCounts()
        triggerMainWebsiteRefresh()
      } else {
        const errorData = await response.json()
        showNotification(`Erreur: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Save error:', error)
      showNotification('Erreur lors de l\'enregistrement', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveBlog = async (blogData: any) => {
    setLoading(true)
    try {
      const method = blogData.id ? 'PUT' : 'POST'
      const response = await fetch('/api/admin/blog_posts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      })

      if (response.ok) {
        showNotification(
          blogData.id ? 'Article mis à jour avec succès!' : 'Article créé avec succès!',
          'success'
        )
        closeModal()
        await fetchDataCounts()
        triggerMainWebsiteRefresh()
      } else {
        const errorData = await response.json()
        showNotification(`Erreur: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Save error:', error)
      showNotification('Erreur lors de l\'enregistrement', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Delete handlers
  const handleDelete = async (type: string, id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      return
    }

    setLoading(true)
    try {
      const endpoints = {
        activity: '/api/admin/activities',
        project: '/api/admin/projects',
        partner: '/api/admin/partners',
        blog: '/api/admin/blog_posts'
      }

      const endpoint = endpoints[type as keyof typeof endpoints]
      if (!endpoint) {
        throw new Error('Type non reconnu')
      }

      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        showNotification('Élément supprimé avec succès!', 'success')
        await fetchDataCounts()
        triggerMainWebsiteRefresh()
      } else {
        const errorData = await response.json()
        showNotification(`Erreur: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Delete error:', error)
      showNotification('Erreur lors de la suppression', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Render modal content based on type
  const renderModalContent = () => {
    switch (modalType) {
      case 'activity':
        return (
          <ActivityForm
            activity={editingItem}
            onSave={handleSaveActivity}
            onCancel={closeModal}
            loading={loading}
          />
        )
      case 'project':
        return (
          <ProjectForm
            project={editingItem}
            onSave={handleSaveProject}
            onCancel={closeModal}
            loading={loading}
          />
        )
      case 'partner':
        return (
          <PartnerForm
            partner={editingItem}
            onSave={handleSavePartner}
            onCancel={closeModal}
            loading={loading}
          />
        )
      case 'blog':
        return (
          <BlogForm
            blogPost={editingItem}
            onSave={handleSaveBlog}
            onCancel={closeModal}
            loading={loading}
          />
        )
      default:
        return null
    }
  }

  // Render active section
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />
      
      case 'activities':
        return (
          <ActivitiesSection 
            onOpenModal={openModal}
            showNotification={showNotification}
            onDataChange={fetchDataCounts}
          />
        )
      
      case 'projects':
        return (
          <ProjectsSection 
            onOpenModal={openModal}
            showNotification={showNotification}
          />
        )
      
      case 'blog':
        return (
          <BlogSection 
            onOpenModal={openModal}
            showNotification={showNotification}
          />
        )
      
      case 'partners':
        return (
          <PartnersSection 
            onOpenModal={openModal}
            showNotification={showNotification}
          />
        )
      
      case 'contacts':
        return <ContactsSection />
      
      case 'settings':
        return <SettingsSection />
      
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Sidebar - Now responsive */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activitiesCount={dataCounts?.activities || 0}
        projectsCount={dataCounts?.projects || 0}
        partnersCount={dataCounts?.partners || 0}
        blogCount={dataCounts?.blog || 0}
        contactsCount={dataCounts?.contacts || 0}
        mobileMenuOpen={mobileMenuOpen}
        closeMobileMenu={() => setMobileMenuOpen(false)}
      />

      {/* Backdrop for the mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header/Navbar for mobile view */}
        <header className="p-4 bg-white border-b border-gray-100 flex items-center justify-between md:hidden">
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="text-xl font-bold gradient-text">WAMAN Admin</div>
          <div></div> {/* For spacing */}
        </header>

        {/* Header - Desktop */}
        <header className="hidden md:flex bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold text-gray-900">
              Administration Waman Consulting
            </h1>
            <div className="flex items-center space-x-4">
              {loading && (
                <div className="flex items-center text-sm text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Chargement...
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area - Scrollable */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>

      {/* Modal */}
      <AdminModal
        isOpen={showModal}
        onClose={closeModal}
        title={
          modalType === 'activity' ? (editingItem ? 'Modifier l\'activité' : 'Nouvelle activité') :
          modalType === 'project' ? (editingItem ? 'Modifier le projet' : 'Nouveau projet') :
          modalType === 'partner' ? (editingItem ? 'Modifier le partenaire' : 'Nouveau partenaire') :
          modalType === 'blog' ? (editingItem ? 'Modifier l\'article' : 'Nouvel article') :
          ''
        }
        size={
          modalType === 'activity' ? 'lg' :
          modalType === 'project' ? 'lg' :
          modalType === 'partner' ? 'md' :
          modalType === 'blog' ? 'lg' :
          'md'
        }
      >
        {renderModalContent()}
      </AdminModal>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-xl text-white z-50 shadow-lg transition-all duration-300 max-w-md ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-3 ${
              notification.type === 'success' ? 'bg-green-200' : 'bg-red-200'
            }`}></div>
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}