'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useSteam } from '@/hooks/useSteam'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Atom, 
  Search, 
  Calendar,
  User,
  Eye
} from 'lucide-react'

export default function SteamPage() {
  const { user, role } = useAuth()
  const { steamMaterials, loading } = useSteam()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')

  // Фильтрация STEAM материалов
  const filteredMaterials = steamMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === 'all' || material.class_level.toString() === selectedClass
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
            STEAM материалдары
          </h1>
          <p className="text-gray-600">
            Ғылым, технология, инженерия, өнер және математика материалдары
          </p>
        </div>

        {/* Фильтры */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="STEAM материалдарын іздеу..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-48">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Сыныпты таңдаңыз" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Барлық сыныптар</SelectItem>
                      <SelectItem value="7">7 сынып</SelectItem>
                      <SelectItem value="8">8 сынып</SelectItem>
                      <SelectItem value="9">9 сынып</SelectItem>
                      <SelectItem value="10">10 сынып</SelectItem>
                      <SelectItem value="11">11 сынып</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Atom className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Барлық материалдар</p>
                  <p className="text-2xl font-bold text-gray-900">{steamMaterials.length}</p>
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
                    {steamMaterials.filter(material => material.class_level === 9).length}
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
                    {steamMaterials.filter(material => material.class_level === 10).length}
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
                    {steamMaterials.filter(material => material.class_level === 11).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Список STEAM материалов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Card 
              key={material.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => window.location.href = `/steam/${material.id}`}
            >
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                {material.image_url ? (
                  <img 
                    src={material.image_url} 
                    alt={material.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <Atom className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{material.title}</h3>
                  <Badge variant="secondary">{material.class_level} сынып</Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {material.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(material.created_at).toLocaleDateString('kk-KZ')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{material.files.length} файл</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Atom className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                STEAM материалдары табылмады
              </h3>
              <p className="text-gray-500">
                {searchTerm || selectedClass !== 'all' 
                  ? 'Іздеу критерийлеріне сәйкес материалдар жоқ'
                  : 'Әзірше STEAM материалдары қосылмаған'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
