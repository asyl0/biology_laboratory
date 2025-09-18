'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FlaskConical, 
  BookOpen, 
  Users, 
  Settings,
  Plus,
  BarChart3,
  FileText,
  Video
} from 'lucide-react'

export default function AdminPage() {
  const { user, role } = useAuth()
  const router = useRouter()

  // Проверка прав доступа
  useEffect(() => {
    if (role !== 'admin') {
      router.push('/dashboard')
      return
    }
  }, [role, router])

  if (role !== 'admin') {
    return null
  }

  const adminCards = [
    {
      title: 'Зертханалық жұмыстар',
      description: 'Зертханалық жұмыстарды басқару',
      icon: FlaskConical,
      href: '/admin/labs',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'STEAM материалдары',
      description: 'STEAM материалдарын басқару',
      icon: BookOpen,
      href: '/admin/steam',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Мұғалімдерге арналған материалдар',
      description: 'Мұғалім материалдарын басқару',
      icon: FileText,
      href: '/admin/teachers',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Оқушыларға арналған материалдар',
      description: 'Оқушы материалдарын басқару',
      icon: Users,
      href: '/admin/students',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const quickActions = [
    {
      title: 'Жаңа зертханалық жұмыс',
      description: 'Зертханалық жұмыс қосу',
      href: '/admin/labs/new',
      icon: Plus
    },
    {
      title: 'STEAM материал қосу',
      description: 'STEAM материал қосу',
      href: '/admin/steam/new',
      icon: Plus
    },
    {
      title: 'Мұғалім материал қосу',
      description: 'Мұғалім материал қосу',
      href: '/admin/teachers/new',
      icon: Plus
    },
    {
      title: 'Оқушы материал қосу',
      description: 'Оқушы материал қосу',
      href: '/admin/students/new',
      icon: Plus
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Админ панелі
          </h1>
          <p className="text-gray-600">
            Платформаны басқару және материалдарды реттеу
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Жылдам әрекеттер
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <action.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                    <Button asChild size="sm">
                      <a href={action.href}>Бастау</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Admin Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Басқару бөлімдері
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminCards.map((card, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${card.bgColor}`}>
                      <card.icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href={card.href}>
                      Ашу
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FlaskConical className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Зертханалық жұмыстар</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">STEAM материалдары</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Мұғалім материалдары</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Оқушы материалдары</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

