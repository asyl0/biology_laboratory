'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { Navigation } from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FlaskConical, Atom, GraduationCap, ArrowRight, Calendar, Users } from 'lucide-react'
import { useLabs } from '@/hooks/useLabs'

export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const { labs, loading: labsLoading } = useLabs()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Если пользователь не авторизован, показываем лендинг
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('home.welcome')}{' '}
              <span className="text-primary">BioLab</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/auth/register">
                  {t('home.start_learning')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/auth/login">{t('home.login')}</a>
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <FlaskConical className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>{t('home.features.labs.title')}</CardTitle>
                <CardDescription>
                  {t('home.features.labs.description')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Atom className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>{t('home.features.steam.title')}</CardTitle>
                <CardDescription>
                  {t('home.features.steam.description')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>{t('home.features.teachers.title')}</CardTitle>
                <CardDescription>
                  {t('home.features.teachers.description')}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="bg-primary/5 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.cta.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {t('home.cta.subtitle')}
            </p>
            <Button size="lg" asChild>
              <a href="/auth/register">
                {t('home.cta.create_account')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Если пользователь авторизован, показываем лабораторные работы
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Зертханалық жұмыстар</h1>
          <p className="text-gray-600">Зертханалық жұмыстар мен білім беру материалдарын оқыңыз</p>
        </div>

        {/* Labs Grid */}
        {labsLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : labs.length === 0 ? (
          <div className="text-center py-12">
            <FlaskConical className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Зертханалық жұмыстар жоқ</h3>
            <p className="text-gray-500">Әзірше ешқандай зертханалық жұмыс қосылмаған</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labs.map((lab) => (
              <Card 
                key={lab.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => router.push(`/labs/${lab.id}`)}
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
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{lab.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{lab.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{lab.class_level}-сынып</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(lab.created_at).toLocaleDateString('kk-KZ')}</span>
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
