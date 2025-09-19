'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLabs } from '@/hooks/useLabs'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  FlaskConical, 
  Search, 
  Filter,
  Calendar,
  User,
  Eye
} from 'lucide-react'
import { Lab } from '@/types'

export default function LabsPage() {
  const { user, role } = useAuth()
  const { labs, loading } = useLabs()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')

  // Фильтрация лабораторных работ
  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lab.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === 'all' || lab.class_level.toString() === selectedClass
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
            Зертханалық жұмыстар
          </h1>
          <p className="text-gray-600">
            Біология пәнінен зертханалық жұмыстарды көріңіз және орындаңыз
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
                      placeholder="Зертханалық жұмысты іздеу..."
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
                <FlaskConical className="h-8 w-8 text-blue-600" />
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

        {/* Список лабораторных работ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => (
            <Card 
              key={lab.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => window.location.href = `/labs/${lab.id}`}
            >
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                {lab.image_url ? (
                  <img 
                    src={lab.image_url} 
                    alt={lab.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <FlaskConical className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{lab.title}</h3>
                  <Badge variant="secondary">{lab.class_level} сынып</Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {lab.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(lab.created_at).toLocaleDateString('kk-KZ')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{lab.files?.length || 0} файл</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLabs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FlaskConical className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Зертханалық жұмыстар табылмады
              </h3>
              <p className="text-gray-500">
                {searchTerm || selectedClass !== 'all' 
                  ? 'Іздеу критерийлеріне сәйкес жұмыстар жоқ'
                  : 'Әзірше зертханалық жұмыстар қосылмаған'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
