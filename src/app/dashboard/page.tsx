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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-accent-50/30">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary to-primary-600 rounded-xl shadow-lg">
              <FlaskConical className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gradient">
                {t('dashboard.welcome')}, {user?.email}!
              </h1>
              <p className="text-muted-foreground text-lg">
                {t('dashboard.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Поиск материалов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedClass || ''}
                onChange={(e) => setSelectedClass(e.target.value ? Number(e.target.value) : null)}
                className="px-4 py-3 border-2 border-input/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background/80 backdrop-blur-sm h-12 min-w-[140px]"
              >
                <option value="">Все классы</option>
                {[7, 8, 9, 10, 11].map(grade => (
                  <option key={grade} value={grade}>{grade} класс</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="px-4 py-3 border-2 border-input/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background/80 backdrop-blur-sm h-12 min-w-[180px]"
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
        <div className="space-y-16">
          {/* Лабораторные работы */}
          {(selectedType === 'all' || selectedType === 'labs') && (
            <section className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-primary to-primary-600 rounded-xl shadow-lg">
                    <FlaskConical className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gradient">
                      Лабораторные работы
                    </h2>
                    <p className="text-muted-foreground">Практические эксперименты и исследования</p>
                  </div>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
                  {filteredLabs.length} материалов
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredLabs.map((lab, index) => (
                  <Card key={lab.id} className="overflow-hidden card-hover group cursor-pointer animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
                      {lab.image_url ? (
                        <img 
                          src={lab.image_url} 
                          alt={lab.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          <FlaskConical className="h-12 w-12 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Изображение отсутствует</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors duration-200">{lab.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {lab.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="font-medium">{lab.class_level} класс</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4" />
                          <span>{lab.files.length} файлов</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button size="sm" className="flex-1 btn-hover" asChild>
                          <a href={`/labs/${lab.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Подробнее
                          </a>
                        </Button>
                        {lab.files.length > 0 && (
                          <Button size="sm" variant="outline" className="btn-hover">
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

