'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLabs } from '@/hooks/useLabs'
import { useLanguage } from '@/contexts/LanguageContext'
import { Search, Filter, BookOpen, Calendar, GraduationCap } from 'lucide-react'

interface StudentMaterial {
  id: string
  title: string
  description: string
  image_url?: string
  class_level: number
  created_at: string
  files?: string[]
  external_links?: string[]
}

export default function StudentsPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [materials, setMaterials] = useState<StudentMaterial[]>([])
  const [filteredMaterials, setFilteredMaterials] = useState<StudentMaterial[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [loading, setLoading] = useState(true)

  // Получаем материалы для студентов из базы данных
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        // Здесь будет запрос к Supabase для получения материалов для студентов
        // Пока используем заглушку
        const mockMaterials: StudentMaterial[] = [
          {
            id: '1',
            title: 'Биология негіздері',
            description: 'Жасуша құрылымы және функциялары туралы негізгі түсініктер',
            image_url: '/api/placeholder/300/200',
            class_level: 9,
            created_at: '2024-01-15',
            files: ['biology_basics.pdf'],
            external_links: ['https://example.com/biology']
          },
          {
            id: '2',
            title: 'Химиялық реакциялар',
            description: 'Химиялық реакциялардың түрлері мен заңдылықтары',
            image_url: '/api/placeholder/300/200',
            class_level: 10,
            created_at: '2024-01-20',
            files: ['chemistry_reactions.pdf'],
            external_links: ['https://example.com/chemistry']
          }
        ]
        setMaterials(mockMaterials)
        setFilteredMaterials(mockMaterials)
      } catch (error) {
        console.error('Error fetching student materials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMaterials()
  }, [])

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

  const handleMaterialClick = (id: string) => {
    router.push(`/students/${id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Жүктелуде...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Оқушыларға арналған материалдар
          </h1>
          <p className="text-gray-600">
            Оқу материалдары мен қосымша ресурстар
          </p>
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
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Сыныпты таңдаңыз" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Барлық сыныптар</SelectItem>
                <SelectItem value="9">9-сынып</SelectItem>
                <SelectItem value="10">10-сынып</SelectItem>
                <SelectItem value="11">11-сынып</SelectItem>
                <SelectItem value="12">12-сынып</SelectItem>
              </SelectContent>
            </Select>
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
            <p className="text-gray-500">
              {searchTerm || selectedClass !== 'all' 
                ? 'Іздеу критерийлеріне сәйкес материалдар жоқ'
                : 'Әлі материалдар қосылмаған'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <Card 
                key={material.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handleMaterialClick(material.id)}
              >
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
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(material.created_at).toLocaleDateString('kk-KZ')}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        Студент материалдары
                      </div>
                      <Button size="sm" variant="outline">
                        Ашу
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
