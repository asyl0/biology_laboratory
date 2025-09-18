'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Navigation } from '@/components/Navigation'
import { useStudentsMaterials } from '@/hooks/useStudentsMaterials'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileUploadComponent } from '@/components/ui/file-upload'
import { ArrowLeft, Save } from 'lucide-react'

export default function NewStudentMaterialPage() {
  const { role } = useAuth()
  const router = useRouter()
  const { createMaterial } = useStudentsMaterials()
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<Array<{ file: File; status: 'pending' | 'uploading' | 'completed' | 'error'; url?: string; name: string }>>([])
  const [cardImages, setCardImages] = useState<Array<{ file: File; status: 'pending' | 'uploading' | 'completed' | 'error'; url?: string; name: string }>>([])
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    class_level: '9'
  })

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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Подготавливаем данные для сохранения
      const materialData = {
        title: formData.title,
        description: formData.description,
        class_level: parseInt(formData.class_level),
        image_url: cardImages.length > 0 ? cardImages[0].url : null,
        files: files.map(f => f.url).filter(Boolean)
      }

      console.log('Saving student material:', materialData)
      
      // Сохраняем в базу данных
      await createMaterial(materialData)
      
      router.push('/admin/students')
    } catch (error) {
      console.error('Error saving student material:', error)
      alert('Ошибка при сохранении материала: ' + (error as Error).message)
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
              onClick={() => router.push('/admin/students')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Жаңа оқушы материал
              </h1>
              <p className="text-gray-600">
                Оқушы материалдарын қосу және реттеу
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
                      placeholder="Оқушы материалдарының атауы"
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


            </div>
          </div>

          {/* Файлы для скачивания - полная ширина */}
          <Card>
            <CardHeader>
              <CardTitle>Жүктеп алу файлдары</CardTitle>
              <CardDescription>
                Оқушылар жүктеп алатын қосымша файлдар
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadComponent
                files={files}
                onFilesChange={setFiles}
                maxFiles={10}
                maxSize={30 * 1024 * 1024} // 30MB
              />
            </CardContent>
          </Card>

          {/* Кнопки действий */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/students')}
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
