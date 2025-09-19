'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTeachersMaterials } from '@/hooks/useTeachersMaterials'
import { useAuth } from '@/contexts/AuthContext'
import { TeacherMaterial } from '@/types'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, User, Download, Play, ExternalLink, FileText, GraduationCap } from 'lucide-react'

export default function TeacherDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { materials, loading: materialsLoading } = useTeachersMaterials()
  const [material, setMaterial] = useState<TeacherMaterial | null>(null)

  useEffect(() => {
    if (!materialsLoading && materials.length > 0) {
      const foundMaterial = materials.find(m => m.id === params.id)
      setMaterial(foundMaterial || null)
    }
  }, [params.id, materials, materialsLoading])

  if (materialsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Мұғалім материалы табылмады</h1>
          <Button asChild>
            <a href="/teachers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Мұғалім материалдарына оралу
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <a href="/teachers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Мұғалім материалдарына оралу
            </a>
          </Button>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                {material.class_level && (
                  <Badge variant="secondary">{material.class_level} сынып</Badge>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(material.created_at).toLocaleDateString('kk-KZ')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-1" />
                  {material.files?.length || 0} файл
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4 break-words">
                {material.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 break-words">
                {material.description}
              </p>
            </div>
            
            {/* Actions */}
            <div className="lg:w-80">
              <Card>
                <CardHeader>
                  <CardTitle>Әрекеттер</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(material.files?.length || 0) > 0 && (
                    <Button className="w-full" size="lg">
                      <Download className="h-4 w-4 mr-2" />
                      Барлық файлдарды жүктеп алу
                    </Button>
                  )}
                  
                  {material.video_url && (
                    <Button variant="outline" className="w-full" size="lg" asChild>
                      <a href={material.video_url} target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4 mr-2" />
                        Видеоны көру
                      </a>
                    </Button>
                  )}
                  
                  {material.external_links && material.external_links.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Сыртқы ресурстар:</p>
                      {material.external_links.map((link, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          asChild
                        >
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            <span className="truncate">Ресурс {index + 1}</span>
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Image */}
        {material.image_url && (
          <div className="mb-8">
            <img
              src={material.image_url}
              alt={material.title}
              className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-8">
          {/* Theory */}
          <Card>
            <CardHeader>
              <CardTitle>Теория</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm max-w-none break-words"
                dangerouslySetInnerHTML={{ 
                  __html: material.theory.replace(/\n/g, '<br>').replace(/# (.*)/g, '<h1>$1</h1>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
                }}
              />
            </CardContent>
          </Card>

          {/* Process */}
          <Card>
            <CardHeader>
              <CardTitle>Орындау процесі</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm max-w-none break-words"
                dangerouslySetInnerHTML={{ 
                  __html: material.process.replace(/\n/g, '<br>').replace(/# (.*)/g, '<h1>$1</h1>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
                }}
              />
            </CardContent>
          </Card>

          {/* Video */}
          {material.video_url && (
            <Card>
              <CardHeader>
                <CardTitle>Видеоматериал</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <Button asChild>
                    <a href={material.video_url} target="_blank" rel="noopener noreferrer">
                      <Play className="h-8 w-8 mr-2" />
                      Видеоны көру
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Files and External Links - Horizontal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Files */}
          {(material.files?.length || 0) > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Жүктеп алу файлдары
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {material.files.map((file, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={file} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        <span className="truncate">{file.split('/').pop()}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* External Links */}
          {material.external_links && material.external_links.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Сыртқы ресурстар
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {material.external_links.map((link, index) => {
                    // Извлекаем домен из URL для отображения
                    const domain = link.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start"
                        asChild
                      >
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          <span className="truncate">{domain}</span>
                        </a>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </main>
    </div>
  )
}
