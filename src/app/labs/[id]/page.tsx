'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useLabs } from '@/hooks/useLabs'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  Play, 
  FileText,
  Calendar,
  User
} from 'lucide-react'
import { Lab } from '@/types'

export default function LabDetailPage() {
  const params = useParams()
  const { user } = useAuth()
  const { labs, loading: labsLoading } = useLabs()
  const [lab, setLab] = useState<Lab | null>(null)

  useEffect(() => {
    if (!labsLoading && labs.length > 0) {
      const foundLab = labs.find(l => l.id === params.id)
      setLab(foundLab || null)
    }
  }, [params.id, labs, labsLoading])

  if (labsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!lab) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Лабораторная работа не найдена</h1>
          <Button asChild>
            <a href="/labs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Зертханалық жұмыстарға оралу
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
            <a href="/labs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Зертханалық жұмыстарға оралу
            </a>
          </Button>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{lab.class_level} класс</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(lab.created_at).toLocaleDateString('ru-RU')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-1" />
                  {lab.files.length} файлов
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4 break-words">
                {lab.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 break-words">
                {lab.description}
              </p>
            </div>
            
          </div>
        </div>

        {/* Main Image */}
        {lab.image_url && (
          <div className="mb-8">
            <img
              src={lab.image_url}
              alt={lab.title}
              className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-8">
          {/* Theory */}
          {lab.theory && (
            <Card>
              <CardHeader>
                <CardTitle>Теория</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-sm max-w-none break-words"
                  dangerouslySetInnerHTML={{ 
                    __html: lab.theory.replace(/\n/g, '<br>').replace(/# (.*)/g, '<h1>$1</h1>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* Process */}
          {lab.process && (
            <Card>
              <CardHeader>
                <CardTitle>Процесс выполнения</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-sm max-w-none break-words"
                  dangerouslySetInnerHTML={{ 
                    __html: lab.process.replace(/\n/g, '<br>').replace(/# (.*)/g, '<h1>$1</h1>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* Video */}
          {lab.video_url && (
            <Card>
              <CardHeader>
                <CardTitle>Видеоматериал</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <Button asChild>
                    <a href={lab.video_url} target="_blank" rel="noopener noreferrer">
                      <Play className="h-8 w-8 mr-2" />
                      Смотреть видео
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
          {lab.files.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Жүктеп алу файлдары
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lab.files.map((file, index) => (
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
          {lab.external_links && lab.external_links.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Сыртқы ресурстар
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lab.external_links.map((link, index) => {
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

