'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useSteam } from '@/hooks/useSteam'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar
} from 'lucide-react'
import { SteamMaterial } from '@/types'

export default function SteamDetailPage() {
  const params = useParams()
  const { user } = useAuth()
  const { materials, loading: materialsLoading } = useSteam()
  const [material, setMaterial] = useState<SteamMaterial | null>(null)

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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">STEAM материал табылмады</h1>
          <Button asChild>
            <a href="/steam">
              <ArrowLeft className="h-4 w-4 mr-2" />
              STEAM материалдарына оралу
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
            <a href="/steam">
              <ArrowLeft className="h-4 w-4 mr-2" />
              STEAM материалдарына оралу
            </a>
          </Button>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{material.class_level} сынып</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(material.created_at).toLocaleDateString('kk-KZ')}
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4 break-words">
                {material.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 break-words">
                {material.description}
              </p>
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
          {material.theory && (
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
          )}

          {/* Process */}
          {material.process && (
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
          )}

        </div>

        {/* External Links */}
        {material.external_links && material.external_links.length > 0 && (
          <Card className="mt-8">
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
      </main>
    </div>
  )
}