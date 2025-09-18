'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileUploadComponent } from '@/components/ui/file-upload'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'

export default function NewTeacherMaterialPage() {
  const { role } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [externalLink, setExternalLink] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    theory: '',
    process: '',
    class_level: '9',
    video_url: '',
    external_links: [] as string[]
  })

  const [files, setFiles] = useState<Array<{ file: File; status: 'pending' | 'uploading' | 'completed' | 'error'; url?: string; name: string }>>([])
  const [cardImages, setCardImages] = useState<Array<{ file: File; status: 'pending' | 'uploading' | 'completed' | 'error'; url?: string; name: string }>>([])

  // Проверка прав доступа
  useEffect(() => {
    if (role !== 'admin') {
      router.push('/dashboard')
    }
  }, [role, router])

  if (role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Доступ запрещен</h2>
          <p className="text-gray-600">У вас нет прав для доступа к этой странице</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddExternalLink = () => {
    if (externalLink.trim()) {
      const newLink = externalLink.trim()
      setFormData(prev => ({
        ...prev,
        external_links: [...prev.external_links, newLink]
      }))
      setExternalLink('')
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
      // Здесь будет логика сохранения учительского материала
      console.log('Saving teacher material:', formData)
      
      // Заглушка - в реальном приложении здесь будет запрос к Supabase
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      router.push('/admin/teachers')
    } catch (error) {
      console.error('Error saving teacher material:', error)
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
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="outline" 
              onClick={() => router.push('/admin/teachers')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Жаңа мұғалім материал
              </h1>
              <p className="text-gray-600">
                Мұғалім материалдарын қосу және реттеу
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Левая колонка */}
            <div className="space-y-6">
              {/* Основная информация */}
              <Card>
                <CardHeader>
                  <CardTitle>Негізгі ақпарат</CardTitle>
                  <CardDescription>
                    Материал туралы негізгі мәліметтер
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Атауы</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Мұғалім материалдарының атауы"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Сипаттама</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Материалдың қысқаша сипаттамасы"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="class_level">Сынып</Label>
                    <Select value={formData.class_level} onValueChange={(value) => handleInputChange('class_level', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Сыныпты таңдаңыз" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9">9-сынып</SelectItem>
                        <SelectItem value="10">10-сынып</SelectItem>
                        <SelectItem value="11">11-сынып</SelectItem>
                        <SelectItem value="12">12-сынып</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video_url">Видео сілтемесі</Label>
                    <Input
                      id="video_url"
                      value={formData.video_url}
                      onChange={(e) => handleInputChange('video_url', e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Изображения для карточки */}
              <Card>
                <CardHeader>
                  <CardTitle>Карточка суреттері</CardTitle>
                  <CardDescription>
                    Материал карточкасы үшін суреттер
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploadComponent
                    files={cardImages}
                    onFilesChange={setCardImages}
                    accept={{
                      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
                    }}
                    maxFiles={5}
                    maxSize={5 * 1024 * 1024} // 5MB
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Бірінші сурет карточкада негізгі ретінде пайдаланылады
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Правая колонка */}
            <div className="space-y-6">
              {/* Теория */}
              <Card>
                <CardHeader>
                  <CardTitle>Теория</CardTitle>
                  <CardDescription>
                    Теориялық негіздер мен түсініктер
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="theory">Теориялық мазмұн</Label>
                    <Textarea
                      id="theory"
                      value={formData.theory}
                      onChange={(e) => handleInputChange('theory', e.target.value)}
                      placeholder="Теориялық негіздер..."
                      rows={8}
                      maxLength={10000}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      {formData.theory.length}/10000 символов
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Процесс */}
              <Card>
                <CardHeader>
                  <CardTitle>Процесс</CardTitle>
                  <CardDescription>
                    Материалды пайдалану процесі
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="process">Процесс сипаттамасы</Label>
                    <Textarea
                      id="process"
                      value={formData.process}
                      onChange={(e) => handleInputChange('process', e.target.value)}
                      placeholder="1. Материалды дайындау..."
                      rows={8}
                      maxLength={10000}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      {formData.process.length}/10000 символов
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Внешние ссылки */}
              <Card>
                <CardHeader>
                  <CardTitle>Сыртқы сілтемелер</CardTitle>
                  <CardDescription>
                    Қосымша ресурстарға сілтемелер
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={externalLink}
                      onChange={(e) => setExternalLink(e.target.value)}
                      placeholder="https://example.com"
                      maxLength={500}
                    />
                    <Button type="button" onClick={handleAddExternalLink}>
                      <Plus className="h-4 w-4" />
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
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Файлы для скачивания - полная ширина */}
          <Card>
            <CardHeader>
              <CardTitle>Жүктеп алу файлдары</CardTitle>
              <CardDescription>
                Мұғалімдер жүктеп алатын қосымша файлдар
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadComponent
                files={files}
                onFilesChange={setFiles}
                accept={{
                  'application/pdf': ['.pdf'],
                  'application/msword': ['.doc'],
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                  'application/vnd.ms-excel': ['.xls'],
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                  'text/plain': ['.txt'],
                  'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
                }}
                maxFiles={10}
                maxSize={10 * 1024 * 1024} // 10MB
              />
            </CardContent>
          </Card>

          {/* Кнопки действий */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/teachers')}
            >
              Болдырмау
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
