// components/admin/shared/ImageUpload.tsx
import React, { useRef, useState } from 'react'
import { Camera, X, Link, Upload } from 'lucide-react'

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (url: string) => void
  label?: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  label = "Image"
}) => {
  const [uploadingImage, setUploadingImage] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        onImageChange(result.secure_url || result.url)
        showNotification('Image téléchargée avec succès!', 'success')
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Image upload error:', error)
      showNotification('Erreur lors du téléchargement de l\'image', 'error')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile) {
      handleImageUpload(imageFile)
    }
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    // Simple notification - you can replace with your notification system
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 p-4 rounded-xl text-white z-50 shadow-lg transition-all duration-300 max-w-md ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`
    notification.innerHTML = `
      <div class="flex items-center">
        <span class="text-sm font-medium">${message}</span>
      </div>
    `
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)'
      notification.style.opacity = '0'
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 4000)
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      
      {/* Current Image Preview */}
      {currentImage && (
        <div className="relative group">
          <img 
            src={currentImage} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={() => onImageChange('')}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleImageUpload(file)
          }}
        />
        
        {uploadingImage ? (
          <div className="space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600">Téléchargement en cours...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Camera className="w-12 h-12 text-gray-400 mx-auto" />
            <p className="text-gray-600">
              Glissez une image ici ou <span className="text-blue-600 font-medium">cliquez pour parcourir</span>
            </p>
            <p className="text-sm text-gray-500">PNG, JPG, WEBP jusqu'à 10MB</p>
          </div>
        )}
      </div>

      {/* URL Input */}
      <div>
        <label className="block text-sm text-gray-600 mb-2">Ou entrez une URL d'image:</label>
        <div className="flex space-x-2">
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onBlur={(e) => {
              if (e.target.value) onImageChange(e.target.value)
            }}
          />
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Link className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}