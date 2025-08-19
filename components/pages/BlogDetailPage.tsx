// components/pages/BlogDetailPage.tsx
import React from 'react'
import { 
  ArrowLeft, Calendar, Clock, User, Tag, Share2, 
  Facebook, Twitter, Linkedin, Mail, Droplets
} from 'lucide-react'
import { BlogPost, BaseComponentProps } from '../../types'

interface BlogDetailPageProps extends BaseComponentProps {
  post: BlogPost
  onBack: () => void
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ 
  post, 
  currentLang, 
  onBack, 
  t 
}) => {
  const postTitle = currentLang === 'fr' ? 
    (post.titleFr || post.title_fr || '') : 
    (post.titleEn || post.titleFr || post.title_fr || '')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = postTitle

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(shareTitle)
    
    let shareLink = ''
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'email':
        shareLink = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
        break
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={onBack}
              className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">WAMAN CONSULTING</h1>
                <p className="text-xs text-gray-600">Retour aux actualités</p>
              </div>
            </button>
            
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Retour</span>
            </button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Featured Image */}
          {post.image && (
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img 
                src={post.image} 
                alt={postTitle}
                className="w-full h-full object-cover"
              />
              {post.featured && (
                <div className="absolute top-6 left-6">
                  <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    Article en vedette
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="p-6 md:p-10">
            
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>5 min de lecture</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{post.author || 'WAMAN Consulting'}</span>
              </div>
              {post.category && (
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                </div>
              )}
            </div>
            
            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {postTitle}
            </h1>
            
            {/* Article Content */}
            <div className="prose prose-lg prose-blue max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {post.content}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Partager cet article</h3>
                  <p className="text-gray-600">Aidez-nous à diffuser nos insights en ingénierie de l'eau</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors"
                    title="Partager sur Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-10 h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-lg flex items-center justify-center transition-colors"
                    title="Partager sur Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-lg flex items-center justify-center transition-colors"
                    title="Partager sur LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('email')}
                    className="w-10 h-10 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center transition-colors"
                    title="Partager par email"
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {post.author || 'Équipe WAMAN Consulting'}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Expert en ingénierie de l'eau et de l'environnement chez WAMAN CONSULTING. 
                    Spécialisé dans les solutions durables pour la gestion des ressources hydriques 
                    au Maroc et en Afrique.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Besoin d'expertise en ingénierie de l'eau ?
              </h3>
              <p className="text-gray-600 mb-4">
                Contactez nos experts pour discuter de vos projets et besoins spécifiques
              </p>
              <button 
                onClick={() => {
                  onBack()
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact')
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }, 100)
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Nous contacter
              </button>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}