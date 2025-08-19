// components/sections/BlogSection.tsx
import React from 'react'
import { BookOpen, ArrowRight, Calendar, Clock, User, Star } from 'lucide-react'
import { BlogPost, SectionProps } from '../../types'

interface BlogSectionProps extends SectionProps {
  blogPosts: BlogPost[]
  onPostClick: (post: BlogPost) => void
}

export const BlogSection: React.FC<BlogSectionProps> = ({ 
  blogPosts, 
  loading, 
  currentLang, 
  onPostClick, 
  t 
}) => (
  <section id="actualites" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4 mr-2" />
          Actualités & Insights
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Dernières Actualités
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Insights et innovations dans le secteur de l'eau et de l'environnement, 
          actualités de nos projets et expertise technique.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des actualités...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts
            .filter((post: BlogPost) => {
              const hasContent = post.content && post.content.length > 0
              const isPublished = post.published !== false
              const hasTitle = post.titleFr || post.title_fr
              return hasContent && isPublished && hasTitle
            })
            .slice(0, 6)
            .map((post: BlogPost) => (
              <article 
                key={post.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100"
                onClick={() => onPostClick(post)}
              >
                {post.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={currentLang === 'fr' ? (post.titleFr || post.title_fr || '') : (post.titleEn || post.titleFr || post.title_fr || '')}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.featured && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          À la une
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <div className="text-center text-white">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <span className="text-sm font-medium opacity-75">Article WAMAN</span>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>5 min</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {currentLang === 'fr' ? (post.titleFr || post.title_fr || '') : (post.titleEn || post.titleFr || post.title_fr || '')}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {(post.content && post.content.substring(0, 120)) || 'Aucun contenu disponible'}...
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      <span>{post.author || 'WAMAN'}</span>
                      <span className="mx-2">•</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
        </div>
      )}

      {blogPosts.length === 0 && !loading && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun article disponible</h3>
          <p className="text-gray-600">Les actualités apparaîtront bientôt ici.</p>
        </div>
      )}
    </div>
  </section>
)