'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, GraduationCap, Download, ExternalLink, BookOpen } from 'lucide-react'

interface StudentMaterial {
  id: string
  title: string
  description: string
  theory?: string
  process?: string
  image_url?: string
  video_url?: string
  class_level: number
  created_at: string
  files?: string[]
  external_links?: string[]
}

interface StudentMaterialPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function StudentMaterialPage({ params }: StudentMaterialPageProps) {
  const { id } = await params
  const router = useRouter()
  const [material, setMaterial] = useState<StudentMaterial | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        // Здесь будет запрос к Supabase для получения конкретного материала
        // Пока используем заглушку
        const mockMaterial: StudentMaterial = {
          id: id,
          title: 'Биология негіздері',
          description: 'Жасуша құрылымы және функциялары туралы негізгі түсініктер. Бұл материалда сіз жасушаның құрылымы, органеллалары және олардың функциялары туралы білесіз.',
          theory: 'Жасуша - бұл тірі организмдердің негізгі құрылымдық және функционалдық бірлігі. Жасушалардың екі негізгі түрі бар: прокариоттық және эукариоттық жасушалар.\n\n**Прокариоттық жасушалар:**\n- Ядро мембранасы жоқ\n- ДНК цитоплазмада орналасқан\n- Мысалы: бактериялар\n\n**Эукариоттық жасушалар:**\n- Ядро мембранасы бар\n- ДНК ядро ішінде орналасқан\n- Мысалы: өсімдіктер, жануарлар, адам',
          process: '1. **Жасуша құрылымын зерттеу:**\n   - Микроскоп арқылы жасушаны бақылау\n   - Органеллаларды анықтау\n   - Функцияларын зерттеу\n\n2. **ДНК құрылымын талдау:**\n   - ДНК молекуласының құрылымы\n   - Гендердің рөлі\n   - Тұқым қуалау заңдары\n\n3. **Жасуша бөлінуін зерттеу:**\n   - Митоз процесі\n   - Мейоз процесі\n   - Жасуша циклі',
          image_url: '/api/placeholder/600/400',
          video_url: 'https://www.youtube.com/watch?v=example',
          class_level: 9,
          created_at: '2024-01-15',
          files: [
            'biology_basics.pdf',
            'cell_structure_diagram.jpg',
            'dna_structure_3d.pdf'
          ],
          external_links: [
            'https://example.com/biology',
            'https://khanacademy.org/biology',
            'https://youtube.com/watch?v=example'
          ]
        }
        setMaterial(mockMaterial)
      } catch (error) {
        console.error('Error fetching material:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMaterial()
  }, [id])

  const handleDownload = (filename: string) => {
    // Здесь будет логика скачивания файла
    console.log('Downloading:', filename)
  }

  const getDomainFromUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return domain.replace('www.', '')
    } catch {
      return url
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Жүктелуде...</p>
        </div>
      </div>
    )
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Материал табылмады</h2>
          <p className="text-gray-600 mb-4">Сіз іздеген материал жоқ немесе оған қол жеткізе алмайсыз</p>
          <Button onClick={() => router.push('/students')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Оқушы материалдарына оралу
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Кнопка назад */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => router.push('/students')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Оқушы материалдарына оралу
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-2 space-y-6">
            {/* Заголовок и описание */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-gray-900 break-words">
                      {material.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {material.class_level}-сынып
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(material.created_at).toLocaleDateString('kk-KZ')}
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-600 break-words">
                  {material.description}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Изображение */}
            {material.image_url && (
              <Card>
                <CardContent className="p-0">
                  <img
                    src={material.image_url}
                    alt={material.title}
                    className="w-full h-auto rounded-lg"
                  />
                </CardContent>
              </Card>
            )}

            {/* Видео */}
            {material.video_url && (
              <Card>
                <CardHeader>
                  <CardTitle>Видео материал</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <a
                      href={material.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Видеоны көру
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Теория */}
            {material.theory && (
              <Card>
                <CardHeader>
                  <CardTitle>Теория</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-sm max-w-none text-gray-700 break-words"
                    dangerouslySetInnerHTML={{ 
                      __html: material.theory.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Процесс */}
            {material.process && (
              <Card>
                <CardHeader>
                  <CardTitle>Процесс</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-sm max-w-none text-gray-700 break-words"
                    dangerouslySetInnerHTML={{ 
                      __html: material.process.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Файлы для скачивания */}
            {material.files && material.files.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Жүктеп алу файлдары
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {material.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700 truncate">{file}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(file)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Жүктеу
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Внешние ссылки */}
            {material.external_links && material.external_links.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Сыртқы ресурстар
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {material.external_links.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700 truncate">
                          {getDomainFromUrl(link)}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Ашу
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
