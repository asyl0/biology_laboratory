'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useLabs } from '@/hooks/useLabs'
import { useSteam } from '@/hooks/useSteam'
import { useTeachersMaterials } from '@/hooks/useTeachersMaterials'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  FlaskConical, 
  Atom, 
  GraduationCap, 
  Search, 
  Filter,
  Download,
  ExternalLink,
  Eye
} from 'lucide-react'
import { Lab, SteamMaterial, TeacherMaterial, SearchFilters } from '@/types'

export default function Dashboard() {
  const { user, role } = useAuth()
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<'all' | 'labs' | 'steam' | 'teachers'>('all')
  
  // Используем хуки для загрузки данных
  const { labs, loading: labsLoading } = useLabs()
  const { materials: steamMaterials, loading: steamLoading } = useSteam()
  const { materials: teacherMaterials, loading: teachersLoading } = useTeachersMaterials()
  
  const loading = labsLoading || steamLoading || teachersLoading

  const filteredLabs = (labs || []).filter(lab => {
    const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lab.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = !selectedClass || lab.class_level === selectedClass
    return matchesSearch && matchesClass
  })

  const filteredSteam = (steamMaterials || []).filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = !selectedClass || material.class_level === selectedClass
    return matchesSearch && matchesClass
  })

  const filteredTeachers = (teacherMaterials || []).filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = !selectedClass || (material.class_level && material.class_level === selectedClass)
    return matchesSearch && matchesClass
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.welcome')}, {user?.email}!
          </h1>
          <p className="text-gray-600">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Поиск материалов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedClass || ''}
                onChange={(e) => setSelectedClass(e.target.value ? Number(e.target.value) : null)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Все классы</option>
                {[7, 8, 9, 10, 11].map(grade => (
                  <option key={grade} value={grade}>{grade} класс</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Все типы</option>
                <option value="labs">Лабораторные работы</option>
                <option value="steam">STEAM материалы</option>
                <option value="teachers">Материалы для учителей</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Лабораторные работы */}
          {(selectedType === 'all' || selectedType === 'labs') && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FlaskConical className="h-6 w-6 text-primary mr-2" />
                  Лабораторные работы
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredLabs.length} материалов
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLabs.map((lab) => (
                  <Card key={lab.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      {lab.image_url ? (
                        <img 
                          src={lab.image_url} 
                          alt={lab.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FlaskConical className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{lab.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {lab.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{lab.class_level} класс</span>
                        <span>{lab.files.length} файлов</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" asChild>
                          <a href={`/labs/${lab.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Подробнее
                          </a>
                        </Button>
                        {lab.files.length > 0 && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* STEAM материалы */}
          {(selectedType === 'all' || selectedType === 'steam') && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Atom className="h-6 w-6 text-primary mr-2" />
                  STEAM материалы
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredSteam.length} материалов
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSteam.map((material) => (
                  <Card key={material.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      {material.image_url ? (
                        <img 
                          src={material.image_url} 
                          alt={material.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Atom className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{material.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {material.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{material.class_level} класс</span>
                        <span>{material.files?.length || 0} файлов</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Просмотр
                        </Button>
                        {material.external_links && material.external_links.length > 0 && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={material.external_links[0]} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {(material.files?.length || 0) > 0 && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Материалы для учителей */}
          {(selectedType === 'all' || selectedType === 'teachers') && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <GraduationCap className="h-6 w-6 text-primary mr-2" />
                  Материалы для учителей
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredTeachers.length} материалов
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeachers.map((material) => (
                  <Card key={material.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{material.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {material.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{material.class_level ? `${material.class_level} класс` : 'Все классы'}</span>
                        <span>{material.files?.length || 0} файлов</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Просмотр
                        </Button>
                        {(material.files?.length || 0) > 0 && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

