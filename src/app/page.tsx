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
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-50">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-primary-600 rounded-2xl shadow-2xl mb-8 animate-bounce-in">
              <FlaskConical className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 leading-tight">
              Зертханалық жұмыстар
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Биология пәнін оқытуды жеңілдететін және оқушылардың қызығушылығын арттыратын заманауи білім беру платформасы
            </p>
          </div>

          {/* Main Cards Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Left Card - Laboratory Works */}
            <Card className="overflow-hidden card-hover group animate-fade-in">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-primary to-primary-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FlaskConical className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gradient">
                    Зертханалық жұмыстар
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground text-lg leading-relaxed">
                  Оқушылар үшін дайындалған практикалық зертханалық жұмыстар
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden rounded-b-xl">
                  <Image
                    src="/photo_num1.jpeg"
                    alt="Зертханалық жұмыстар"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                    <span className="text-sm font-semibold text-gray-800">Зертханаль</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Card - Practical Research */}
            <Card className="overflow-hidden card-hover group animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-accent to-primary-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Atom className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gradient">
                    Практикалық зерттеулер
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground text-lg leading-relaxed">
                  Биология пәні бойынша практикалық зерттеулер, эксперименттер және зертханалық талдаулар
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden rounded-b-xl">
                  <Image
                    src="/photo_num2.jpeg"
                    alt="Практикалық зерттеулер"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Website Features Section */}
          <div className="mb-20">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold text-gradient mb-6">
                Платформаның мүмкіндіктері
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                BioLab - бұл биология пәнін оқытуды жеңілдететін және оқушылардың қызығушылығын арттыратын заманауи білім беру платформасы
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="text-center p-8 card-hover group animate-fade-in">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <FlaskConical className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gradient mb-4">
                    Интерактивті зертханалық жұмыстар
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    Оқушылар әртүрлі биологиялық эксперименттерді виртуалды түрде орындай алады. 
                    Микроскоптық зерттеулер, химиялық реакциялар және анатомиялық талдаулар.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 2 */}
              <Card className="text-center p-8 card-hover group animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-r from-success to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Atom className="h-10 w-10 text-success-foreground" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gradient mb-4">
                    STEAM білім беру
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    Ғылым, технология, инженерия, өнер және математика салаларын біріктіретін 
                    көпсалалық жобалар мен зерттеулер.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 3 */}
              <Card className="text-center p-8 card-hover group animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-r from-info to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="h-10 w-10 text-info-foreground" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gradient mb-4">
                    Мұғалімдерге арналған ресурстар
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    Сабақ жоспарлары, оқу материалдары, бағалау критерийлері және 
                    оқушылардың жетістіктерін бақылау жүйесі.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Additional Features */}
            <div className="mt-16 bg-gradient-to-r from-card/50 to-accent/30 rounded-3xl p-10 backdrop-blur-sm border border-border/50 animate-fade-in">
              <h3 className="text-3xl font-bold text-gradient text-center mb-12">
                Неліктен BioLab таңдау керек?
              </h3>
              
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-primary-foreground text-lg font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-card-foreground mb-3 text-lg">Қазақ тілінде толық қолдау</h4>
                      <p className="text-muted-foreground leading-relaxed">Барлық материалдар қазақ тілінде дайындалған және отандық білім беру стандарттарына сәйкес келеді.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-success to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-success-foreground text-lg font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-card-foreground mb-3 text-lg">Интерактивті оқыту</h4>
                      <p className="text-muted-foreground leading-relaxed">Оқушылар белсенді түрде қатысады, эксперименттер орындайды және нақты нәтижелерді көреді.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-info to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-info-foreground text-lg font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-card-foreground mb-3 text-lg">Қауіпсіз орта</h4>
                      <p className="text-muted-foreground leading-relaxed">Зертханалық жұмыстарды қауіпсіз түрде орындауға мүмкіндік беретін виртуалды орта.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-warning to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-warning-foreground text-lg font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-card-foreground mb-3 text-lg">Жеке дараланған оқыту</h4>
                      <p className="text-muted-foreground leading-relaxed">Әр оқушының деңгейіне сәйкес материалдар мен тапсырмалар ұсынылады.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-primary-foreground text-lg font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-card-foreground mb-3 text-lg">Нақты нәтижелерді бақылау</h4>
                      <p className="text-muted-foreground leading-relaxed">Мұғалімдер оқушылардың жетістіктерін нақты уақытта бақылай алады.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-destructive to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-destructive-foreground text-lg font-bold">6</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-card-foreground mb-3 text-lg">Қолжетімділік</h4>
                      <p className="text-muted-foreground leading-relaxed">Кез келген уақытта, кез келген жерде оқуға мүмкіндік беретін онлайн платформа.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Author Info */}
          <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Box - About Author */}
              <div className="p-10 text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                <h2 className="text-3xl font-bold mb-6 text-gradient">Автор жайлы</h2>
                <p className="text-primary-100 mb-8 leading-relaxed text-lg">
                  Бұл жобаның авторы - Омарова Ұлжалғас - биология пәні мұғалімі. 
                  Ол биологияны оқушыларға қызықты және қолжетімді ету үшін 
                  бұл веб-сайтты дайындады. Жоба білім беру процесін жеңілдетуге бағытталған.
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-success to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl hover:shadow-2xl btn-hover"
                  onClick={() => window.open('/portfolio.pdf', '_blank')}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Портфолио
                </Button>
              </div>

              {/* Right Box - Portfolio Section */}
              <div className="p-10 text-white relative">
                <div className="absolute top-6 right-6 text-sm font-bold text-primary-200 bg-white/10 px-3 py-1 rounded-full">
                  ПОРТФОЛИО
                </div>
                
                <div className="mt-12">
                  <h3 className="text-3xl font-bold mb-8 leading-tight">
                    Омарова Ұлжалғас<br />
                    <span className="text-primary-200">Тағабайқызы</span>
                  </h3>
                  
                  <div className="relative mb-8 group">
                    <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src="/skrin.png"
                        alt="Омарова Ұлжалғас"
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl overflow-hidden border-2 border-white/30 bg-gradient-to-r from-primary-400 to-primary-600 shadow-lg">
                      <Image
                        src="/skrin.png"
                        alt=""
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl overflow-hidden border-2 border-white/30 bg-gradient-to-r from-accent to-primary-600 shadow-lg">
                      <Image
                        src="/skrin.png"
                        alt=""
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-sm text-primary-100 font-semibold text-center">
                      ПЕДАГОГ-МОДЕРАТОР БИОЛОГИЯ ПӘНІ МҰҒАЛІМІ
                    </p>
                  </div>
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
