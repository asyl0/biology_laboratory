'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTeachersMaterials } from '@/hooks/useTeachersMaterials'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  GraduationCap,
  BookOpen,
  Download,
  FileText
} from 'lucide-react'

interface TeacherMaterial {
  id: string
  title: string
  description: string
  image_url?: string
  class_level: number
  created_at: string
  files?: string[]
  external_links?: string[]
}

export default function AdminTeachersPage() {
  const { role } = useAuth()
  const router = useRouter()
  const { materials, loading, updateMaterial, deleteMaterial } = useTeachersMaterials()
  const [filteredMaterials, setFilteredMaterials] = useState(materials)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')

  // Функция для скачивания файлов
  const handleDownloadClick = (fileName: string, fileUrl: string) => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  // Проверка прав доступа
  useEffect(() => {
    if (role !== 'admin') {
      router.push('/dashboard')
    }
  }, [role, router])

  // Функция для удаления материала
  const handleDeleteMaterial = async (materialId: string) => {
    if (confirm('Материалды жоюға сенімдісіз бе?')) {
      try {
        await deleteMaterial(materialId)
      } catch (error) {
        console.error('Error deleting material:', error)
      }
    }
  }

  // Фильтрация материалов
  useEffect(() => {
    let filtered = materials

    if (searchTerm) {
      filtered = filtered.filter(material =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedClass !== 'all') {
      filtered = filtered.filter(material => material.class_level === parseInt(selectedClass))
    }

    setFilteredMaterials(filtered)
  }, [materials, searchTerm, selectedClass])

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

  const handleEdit = (id: string) => {
    router.push(`/admin/teachers/${id}/edit`)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Бұл материалды жойғыңыз келе ме?')) {
      try {
        // Здесь будет запрос к Supabase для удаления материала
        setMaterials(prev => prev.filter(material => material.id !== id))
        setFilteredMaterials(prev => prev.filter(material => material.id !== id))
      } catch (error) {
        console.error('Error deleting material:', error)
      }
    }
  }

  const handleView = (id: string) => {
    router.push(`/teachers/${id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Жүктелуде...</p>
          </div>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Мұғалімдерге арналған материалдар
              </h1>
              <p className="text-gray-600">
                Мұғалім материалдарын басқару және реттеу
              </p>
            </div>
            <Button onClick={() => router.push('/admin/teachers/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Жаңа материал
            </Button>
          </div>
        </div>

        {/* Фильтры */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Материал іздеу..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Filter className="h-4 w-4 mr-2" />
              {filteredMaterials.length} материал табылды
            </div>
          </div>
        </div>

        {/* Список материалов */}
        {filteredMaterials.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Материалдар табылмады
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? 'Іздеу критерийлеріне сәйкес материалдар жоқ'
                : 'Әлі материалдар қосылмаған'
              }
            </p>
            <Button onClick={() => router.push('/admin/teachers/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Бірінші материалды қосу
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <Card key={material.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  {material.image_url ? (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <img
                        src={material.image_url}
                        alt={material.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center rounded-t-lg">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg line-clamp-2 text-gray-900">
                        {material.title}
                      </h3>
                      <Badge variant="secondary" className="ml-2 flex-shrink-0">
                        {material.class_level}-сынып
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {material.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(material.created_at).toLocaleDateString('kk-KZ')}
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        {material.files?.length || 0} файл
                      </div>
                    </div>


                    {/* Список файлов */}
                    {material.files && material.files.length > 0 && (
                      <div className="space-y-1">
                        {material.files.map((file, index) => {
                          // Извлекаем имя файла из URL
                          const fileName = file.split('/').pop() || `Файл ${index + 1}`
                          return (
                            <div 
                              key={index} 
                              className="flex items-center justify-between text-xs bg-gray-50 hover:bg-gray-100 p-2 rounded cursor-pointer transition-colors"
                              onClick={() => handleDownloadClick(fileName, file)}
                            >
                              <div className="flex items-center flex-1 mr-2">
                                <FileText className="h-3 w-3 mr-1 text-gray-500" />
                                <span className="truncate">{fileName}</span>
                              </div>
                              <div className="flex items-center">
                                <Download className="h-3 w-3 text-gray-500" />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                    </div>

                    {/* Админ действия */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center text-xs text-gray-500">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        Мұғалім материалдары
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => router.push(`/admin/teachers/${material.id}/edit`)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteMaterial(material.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

    </div>
  )
}