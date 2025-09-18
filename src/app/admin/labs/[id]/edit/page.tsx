'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLabs } from '@/hooks/useLabs'
import { useRouter, useParams } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileUploadComponent } from '@/components/ui/file-upload'
import { ArrowLeft, Save } from 'lucide-react'
import { FileUpload } from '@/types'

export default function EditLabPage() {
  const { role } = useAuth()
  const { updateLab, getLabById } = useLabs()
  const router = useRouter()
  const params = useParams()
  const labId = params.id as string
  
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<FileUpload[]>([])
  const [lab, setLab] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    theory: '',
    process: '',
    class_level: '',
    image_url: '',
    video_url: '',
    external_links: [] as string[]
  })

  const [externalLink, setExternalLink] = useState('')

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

  // Загрузка данных лабораторной работы
  useEffect(() => {
    const loadLab = async () => {
      try {
        const labData = await getLabById(labId)
        if (labData) {
          setLab(labData)
          setFormData({
            title: labData.title || '',
            description: labData.description || '',
            theory: labData.theory || '',
            process: labData.process || '',
            class_level: labData.class_level?.toString() || '',
            image_url: labData.image_url || '',
            video_url: labData.video_url || '',
            external_links: labData.external_links || []
          })
        }
      } catch (error) {
        console.error('Error loading lab:', error)
      }
    }

    if (labId) {
      loadLab()
    }
  }, [labId, getLabById])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddExternalLink = () => {
    if (externalLink.trim()) {
      setFormData(prev => ({
        ...prev,
        external_links: [...prev.external_links, externalLink.trim()]
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
      const labData = {
        title: formData.title,
        description: formData.description,
        theory: formData.theory,
        process: formData.process,
        class_level: parseInt(formData.class_level),
        image_url: formData.image_url,
        video_url: formData.video_url,
        external_links: formData.external_links,
        files: files.map(f => f.url || f.name)
      }

      await updateLab(labId, labData)
      router.push('/admin/labs')
    } catch (error) {
      console.error('Error updating lab:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!lab) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <a href="/admin/labs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Тізімге оралу
            </a>
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Зертханалық жұмысты өңдеу
          </h1>
          <p className="text-gray-600">
            Зертханалық жұмысты өңдеу үшін форманы толтырыңыз
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle>Негізгі ақпарат</CardTitle>
              <CardDescription>
                Зертханалық жұмыс үшін атау, сипаттама және сынып
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Атау</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Жасуша құрылымын зерттеу"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Сипаттама</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Зертханалық жұмыстың қысқаша сипаттамасы"
                  rows={3}
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
            </CardContent>
          </Card>

          {/* Теория */}
          <Card>
            <CardHeader>
              <CardTitle>Теориялық бөлім</CardTitle>
              <CardDescription>
                Оқушыларға арналған теориялық негіздер мен түсініктемелер
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theory">Теория</Label>
                <Textarea
                  id="theory"
                  value={formData.theory}
                  onChange={(e) => handleInputChange('theory', e.target.value)}
                  placeholder="Толық теориялық сипаттама..."
                  rows={8}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Процесс выполнения */}
          <Card>
            <CardHeader>
              <CardTitle>Орындау процесі</CardTitle>
              <CardDescription>
                Жұмысты орындау үшін қадамдық нұсқаулар
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="process">Процесс</Label>
                <Textarea
                  id="process"
                  value={formData.process}
                  onChange={(e) => handleInputChange('process', e.target.value)}
                  placeholder="1. Жабдықтарды дайындаңыз..."
                  rows={8}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Медиа и ссылки */}
          <Card>
            <CardHeader>
              <CardTitle>Медиа және сілтемелер</CardTitle>
              <CardDescription>
                Суреттер, видеолар және сыртқы сілтемелер
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="image_url">Сурет сілтемесі</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
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
              </div>

              <div className="space-y-4">
                <Label>Сыртқы сілтемелер</Label>
                <div className="flex gap-2">
                  <Input
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    placeholder="https://example.com"
                  />
                  <Button type="button" onClick={handleAddExternalLink}>
                    Қосу
                  </Button>
                </div>
                
                {formData.external_links.length > 0 && (
                  <div className="space-y-2">
                    {formData.external_links.map((link, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-700">{link}</span>
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
              </div>
            </CardContent>
          </Card>

          {/* Файлы */}
          <Card>
            <CardHeader>
              <CardTitle>Файлдар</CardTitle>
              <CardDescription>
                Зертханалық жұмысқа қажетті файлдарды жүктеңіз
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadComponent
                files={files}
                onFilesChange={setFiles}
                maxFiles={10}
                maxSize={10 * 1024 * 1024}
              />
            </CardContent>
          </Card>

          {/* Кнопки действий */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/labs')}
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

