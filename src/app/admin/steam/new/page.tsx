'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useSteam } from '@/hooks/useSteam'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileUploadComponent } from '@/components/ui/file-upload'
import { ArrowLeft, Save, Upload } from 'lucide-react'
import { SteamMaterial, FileUpload } from '@/types'

export default function NewSteamMaterialPage() {
  const { role } = useAuth()
  const { createMaterial } = useSteam()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [cardImages, setCardImages] = useState<FileUpload[]>([]) // Изображения для карточки
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    theory: '',
    process: '',
    class_level: '',
    external_links: [] as string[]
  })

  const [externalLink, setExternalLink] = useState('')

  // Проверка прав доступа
  useEffect(() => {
    if (role && role !== 'admin') {
      router.push('/dashboard')
    }
  }, [role, router])

  if (role && role !== 'admin') {
    return null
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddExternalLink = () => {
    console.log('Adding external link:', externalLink)
    if (externalLink.trim()) {
      const newLink = externalLink.trim()
      console.log('Link to add:', newLink)
      
      // Проверяем, не превышает ли количество ссылок лимит
      if (formData.external_links.length >= 10) {
        alert('Максимум 10 внешних ссылок')
        return
      }
      
      // Проверяем, не существует ли уже такая ссылка
      if (formData.external_links.includes(newLink)) {
        alert('Такая ссылка уже добавлена')
        return
      }
      
      setFormData(prev => {
        const newLinks = [...prev.external_links, newLink]
        console.log('Updated external_links:', newLinks)
        return {
          ...prev,
          external_links: newLinks
        }
      })
      setExternalLink('')
    } else {
      console.log('Empty link, not adding')
    }
  }

  const handleRemoveExternalLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      external_links: prev.external_links.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Starting to save steam material...', { formData })
      
      // Файлы для скачивания убраны из STEAM материалов

      // Обрабатываем изображения для карточки
      console.log('Card images status:', cardImages.map(f => ({ name: f.file?.name, status: f.status, url: f.url })))
      const cardImageUrls: string[] = cardImages
        .filter(f => f.status === 'completed' && f.url)
        .map(f => f.url!)

      // Обрабатываем URL поля с валидацией
      
      // Обрабатываем внешние ссылки - упрощенная обработка
      console.log('Raw external_links from formData:', formData.external_links)
      const externalLinksArray = (formData.external_links || [])
        .filter(link => link && typeof link === 'string' && link.trim() !== '')
        .map(link => link.trim())
        .slice(0, 10) // Ограничиваем количество ссылок

      console.log('Processed data:', { 
        externalLinksArray, 
        cardImageUrls
      })
      console.log('External links array:', externalLinksArray)
      console.log('Card image URLs:', cardImageUrls)

      const materialData = {
        title: formData.title?.substring(0, 500) || '', // Ограничиваем длину заголовка
        description: formData.description?.substring(0, 1000) || '', // Ограничиваем длину описания
        theory: formData.theory?.substring(0, 10000) || '', // Ограничиваем длину теории
        process: formData.process?.substring(0, 10000) || '', // Ограничиваем длину процесса
        class_level: parseInt(formData.class_level),
        image_url: cardImageUrls.length > 0 ? cardImageUrls[0] : null, // Первое изображение карточки
        external_links: externalLinksArray.length > 0 ? externalLinksArray : null
      }

      console.log('Steam material data to save:', materialData)
      
      const result = await createMaterial(materialData)
      console.log('Steam material saved successfully:', result)
      
      router.push('/admin/steam')
    } catch (error) {
      console.error('Error saving steam material:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        name: error instanceof Error ? error.name : undefined
      })
      alert('Қате орын алды: ' + (error instanceof Error ? error.message : 'Белгісіз қате'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <a href="/admin/steam">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к списку
            </a>
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            STEAM материал жасау
          </h1>
          <p className="text-gray-600">
            Жаңа STEAM материал жасау үшін форманы толтырыңыз
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle>Негізгі ақпарат</CardTitle>
              <CardDescription>
                STEAM материал үшін атау, сипаттама және сынып
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Атау</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="STEAM жобасы: Робот жасау"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class_level">Сынып</Label>
                  <Select
                    value={formData.class_level}
                    onValueChange={(value) => handleInputChange('class_level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Сыныпты таңдаңыз" />
                    </SelectTrigger>
                    <SelectContent>
                      {[7, 8, 9, 10, 11].map(grade => (
                        <SelectItem key={grade} value={grade.toString()}>
                          {grade} сынып
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Сипаттама</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="STEAM материалдың қысқаша сипаттамасы"
                  rows={3}
                  required
                />
              </div>

            </CardContent>
          </Card>

          {/* Двухколоночная сетка для контента */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Теория */}
            <Card>
              <CardHeader>
                <CardTitle>Теориялық бөлім (міндетті емес)</CardTitle>
                <CardDescription>
                  Оқушыларға арналған теориялық негіздер
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="theory">Теория</Label>
                <Textarea
                  id="theory"
                  value={formData.theory}
                  onChange={(e) => handleInputChange('theory', e.target.value)}
                  placeholder="Толық теориялық сипаттама... (міндетті емес)"
                  rows={8}
                  maxLength={10000}
                />
                <p className="text-sm text-gray-500">
                  {formData.theory.length}/10000 символов
                </p>
                </div>
              </CardContent>
            </Card>

            {/* Процесс выполнения */}
            <Card>
              <CardHeader>
                <CardTitle>Орындау процесі (міндетті емес)</CardTitle>
                <CardDescription>
                  Жұмысты орындау үшін қадамдық нұсқаулар
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="process">Процесс</Label>
                <Textarea
                  id="process"
                  value={formData.process}
                  onChange={(e) => handleInputChange('process', e.target.value)}
                  placeholder="1. Жабдықтарды дайындаңыз... (міндетті емес)"
                  rows={8}
                  maxLength={10000}
                />
                <p className="text-sm text-gray-500">
                  {formData.process.length}/10000 символов
                </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Двухколоночная сетка для файлов */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Изображения для карточки */}
            <Card>
              <CardHeader>
                <CardTitle>Карточка суреті</CardTitle>
                <CardDescription>
                  Карточкада көрсетілетін суреттерді жүктеңіз
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploadComponent
                  files={cardImages}
                  onFilesChange={setCardImages}
                  maxFiles={3}
                  acceptedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Бірінші сурет карточкада негізгі ретінде пайдаланылады
                </p>
              </CardContent>
            </Card>

            {/* Внешние ссылки */}
            <Card>
              <CardHeader>
                <CardTitle>Сыртқы сілтемелер</CardTitle>
                <CardDescription>
                  Қосымша ресурстарға сілтемелер қосыңыз
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddExternalLink()
                      }
                    }}
                    placeholder="https://example.com"
                    maxLength={500}
                  />
                  <Button type="button" onClick={handleAddExternalLink}>
                    Қосу
                  </Button>
                </div>
                
                <p className="text-sm text-gray-500">
                  Ссылок: {formData.external_links.length}/10
                </p>
                
                {formData.external_links.length > 0 && (
                  <div className="space-y-2">
                    {formData.external_links.map((link, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm truncate">{link}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveExternalLink(index)}
                        >
                          Жою
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>



          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/steam')}
            >
              Болдырмау
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Сақталуда...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Сақтау
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}