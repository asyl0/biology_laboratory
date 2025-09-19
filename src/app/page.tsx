'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { Navigation } from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FlaskConical, Atom, GraduationCap, ArrowRight, Calendar, Users, Download, ExternalLink } from 'lucide-react'
import { useLabs } from '@/hooks/useLabs'
import Image from 'next/image'

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Зертханалық жұмыстар
            </h1>
          </div>

          {/* Main Cards Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Left Card - Laboratory Works */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  Зертханалық жұмыстар
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Оқушылар үшін дайындалған практикалық зертханалық жұмыстар
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-64">
                  <Image
                    src="/photo_num1.jpeg"
                    alt="Зертханалық жұмыстар"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-md">
                    <span className="text-sm font-medium text-gray-800">Зертханаль</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Card - Practical Research */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  Практикалық зерттеулер
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Биология пәні бойынша практикалық зерттеулер, эксперименттер және зертханалық талдаулар
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-64">
                  <Image
                    src="/photo_num2.jpeg"
                    alt="Практикалық зерттеулер"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Website Features Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Платформаның мүмкіндіктері
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                BioLab - бұл биология пәнін оқытуды жеңілдететін және оқушылардың қызығушылығын арттыратын заманауи білім беру платформасы
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FlaskConical className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-3">
                    Интерактивті зертханалық жұмыстар
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Оқушылар әртүрлі биологиялық эксперименттерді виртуалды түрде орындай алады. 
                    Микроскоптық зерттеулер, химиялық реакциялар және анатомиялық талдаулар.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 2 */}
              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Atom className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-3">
                    STEAM білім беру
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Ғылым, технология, инженерия, өнер және математика салаларын біріктіретін 
                    көпсалалық жобалар мен зерттеулер.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 3 */}
              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-3">
                    Мұғалімдерге арналған ресурстар
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Сабақ жоспарлары, оқу материалдары, бағалау критерийлері және 
                    оқушылардың жетістіктерін бақылау жүйесі.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Additional Features */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Неліктен BioLab таңдау керек?
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Қазақ тілінде толық қолдау</h4>
                      <p className="text-gray-600">Барлық материалдар қазақ тілінде дайындалған және отандық білім беру стандарттарына сәйкес келеді.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Интерактивті оқыту</h4>
                      <p className="text-gray-600">Оқушылар белсенді түрде қатысады, эксперименттер орындайды және нақты нәтижелерді көреді.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Қауіпсіз орта</h4>
                      <p className="text-gray-600">Зертханалық жұмыстарды қауіпсіз түрде орындауға мүмкіндік беретін виртуалды орта.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Жеке дараланған оқыту</h4>
                      <p className="text-gray-600">Әр оқушының деңгейіне сәйкес материалдар мен тапсырмалар ұсынылады.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Нақты нәтижелерді бақылау</h4>
                      <p className="text-gray-600">Мұғалімдер оқушылардың жетістіктерін нақты уақытта бақылай алады.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Қолжетімділік</h4>
                      <p className="text-gray-600">Кез келген уақытта, кез келген жерде оқуға мүмкіндік беретін онлайн платформа.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Dark Blue Background */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Box - About Author */}
              <div className="p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Автор жайлы</h2>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Бұл жобаның авторы - Омарова Ұлжалғас - биология пәні мұғалімі. 
                  Ол биологияны оқушыларға қызықты және қолжетімді ету үшін 
                  бұл веб-сайтты дайындады. Жоба білім беру процесін жеңілдетуге бағытталған.
                </p>
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open('/portfolio.pdf', '_blank')}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Портфолио
                </Button>
              </div>

              {/* Right Box - Portfolio Section */}
              <div className="p-8 text-white relative">
                <div className="absolute top-4 right-4 text-sm font-medium text-blue-200">
                  ПОРТФОЛИО
                </div>
                
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-6 leading-tight">
                    Омарова Ұлжалғас<br />
                    Тағабайқызы
                  </h3>
                  
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
                      <Image
                        src="/skrin.png"
                        alt="Омарова Ұлжалғас"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Small circular images */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full overflow-hidden border-2 border-white/30">
                      <Image
                        src="/skrin.png"
                        alt=""
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full overflow-hidden border-2 border-white/30">
                      <Image
                        src="/skrin.png"
                        alt=""
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-blue-200 font-medium">
                    ПЕДАГОГ-МОДЕРАТОР БИОЛОГИЯ ПӘНІ МҰҒАЛІМІ
                  </p>
                </div>
              </div>
            </div>
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
