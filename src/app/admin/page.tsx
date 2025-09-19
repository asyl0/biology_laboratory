'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent } from '@/components/ui/card'
import { 
  FlaskConical, 
  BookOpen, 
  Users, 
  Settings,
  FileText
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

  const adminSections = [
    {
      title: 'Зертханалық жұмыстар',
      description: 'Зертханалық жұмыстарды басқару және реттеу',
      icon: FlaskConical,
      href: '/admin/labs',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'STEAM материалдары',
      description: 'STEAM материалдарын басқару және реттеу',
      icon: BookOpen,
      href: '/admin/steam',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Мұғалімдерге арналған материалдар',
      description: 'Мұғалім материалдарын басқару және реттеу',
      icon: FileText,
      href: '/admin/teachers',
      color: 'text-info',
      bgColor: 'bg-info/10'
    },
    {
      title: 'Оқушыларға арналған материалдар',
      description: 'Оқушы материалдарын басқару және реттеу',
      icon: Users,
      href: '/admin/students',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-accent-50/30">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary to-primary-600 rounded-xl shadow-lg">
              <Settings className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gradient">
                Админ панелі
              </h1>
              <p className="text-muted-foreground text-lg">
                Платформаны басқару және материалдарды реттеу
              </p>
            </div>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {adminSections.map((section, index) => (
            <Card 
              key={index} 
              className="card-hover group cursor-pointer animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => router.push(section.href)}
            >
              <CardContent className="p-8">
                <div className="flex items-center space-x-6">
                  <div className={`p-4 rounded-2xl ${section.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <section.icon className={`h-8 w-8 ${section.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gradient mb-2 group-hover:text-primary transition-colors duration-200">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

