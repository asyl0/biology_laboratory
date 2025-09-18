'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useLabs } from '@/hooks/useLabs'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FlaskConical,
  Calendar,
  User
} from 'lucide-react'
import { Lab } from '@/types'

export default function AdminLabsPage() {
  const { user, role } = useAuth()
  const { t } = useLanguage()
  const { labs, loading, deleteLab } = useLabs()
  const router = useRouter()

  // Проверка прав доступа
  useEffect(() => {
    if (role !== 'admin') {
      router.push('/dashboard')
      return
    }
  }, [role, router])

  const handleDelete = async (id: string) => {
    if (confirm(t('admin.labs.delete_confirm'))) {
      try {
        await deleteLab(id)
      } catch (error) {
        console.error('Error deleting lab:', error)
      }
    }
  }

  if (role !== 'admin') {
    return null
  }

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Зертханалық жұмыстарды басқару
              </h1>
              <p className="text-gray-600">
                Зертханалық жұмыстарды жасаңыз, өңдеңіз және басқарыңыз
              </p>
            </div>
            <Button size="lg" asChild>
              <a href="/admin/labs/new">
                <Plus className="h-5 w-5 mr-2" />
                Жаңасын жасау
              </a>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FlaskConical className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Барлық жұмыстар</p>
                  <p className="text-2xl font-bold text-gray-900">{labs.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">9</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">9 сынып</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {labs.filter(lab => lab.class_level === 9).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">10</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">10 сынып</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {labs.filter(lab => lab.class_level === 10).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">11</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">11 сынып</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {labs.filter(lab => lab.class_level === 11).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Labs List */}
        <div className="space-y-6">
          {labs.map((lab) => (
            <Card key={lab.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {lab.title}
                      </h3>
                      <Badge variant="secondary">{lab.class_level} сынып</Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {lab.description}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(lab.created_at).toLocaleDateString('ru-RU')}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {lab.files.length} файл
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a href={`/labs/${lab.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Көру
                      </a>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a href={`/admin/labs/${lab.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Өңдеу
                      </a>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(lab.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Жою
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {labs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FlaskConical className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Зертханалық жұмыстар жоқ
              </h3>
              <p className="text-gray-500 mb-6">
                Жұмысты бастау үшін алғашқы зертханалық жұмысты жасаңыз
              </p>
              <Button asChild>
                <a href="/admin/labs/new">
                  <Plus className="h-5 w-5 mr-2" />
                  Зертханалық жұмыс жасау
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

