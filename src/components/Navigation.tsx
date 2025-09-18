'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { 
  Menu, 
  X, 
  Home, 
  FlaskConical, 
  Atom, 
  GraduationCap, 
  Settings, 
  LogOut,
  User,
  ChevronDown
} from 'lucide-react'

export function Navigation() {
  const { user, role, signOut } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const getNavigationItems = () => {
    // Если пользователь не авторизован, не показываем никаких разделов
    if (!user) {
      return []
    }
    
    const items = [
      { href: '/labs', label: 'Зертханалық жұмыстар', icon: FlaskConical, roles: ['student', 'teacher', 'admin'] },
      { href: '/steam', label: 'STEAM материалдары', icon: Atom, roles: ['student', 'teacher', 'admin'] },
      { href: '/teachers', label: 'Мұғалімдерге арналған материалдар', icon: GraduationCap, roles: ['teacher', 'admin'] },
      { href: '/students', label: 'Оқушыларға арналған материалдар', icon: GraduationCap, roles: ['student', 'admin'] },
    ]
    
    return items.filter(item => role && item.roles.includes(role))
  }

  const adminItems = [
    { href: '/admin', label: 'Админ', icon: Settings },
    { href: '/admin/labs', label: 'Зертханалық жұмыстар', icon: FlaskConical },
    { href: '/admin/steam', label: 'STEAM материалдары', icon: Atom },
    { href: '/admin/teachers', label: 'Мұғалім материалдары', icon: GraduationCap },
    { href: '/admin/students', label: 'Оқушы материалдары', icon: GraduationCap },
  ]

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsOpen(false)
      setIsUserMenuOpen(false)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Логотип */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <FlaskConical className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">BioLab</span>
            </Link>
          </div>

          {/* Десктопная навигация */}
          <div className="hidden md:flex items-center space-x-8">
            {getNavigationItems().map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            
            {role === 'admin' && (
              <div className="flex items-center space-x-4 pl-4 border-l">
                <span className="text-sm text-gray-500">Админ:</span>
                {adminItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Пользователь и мобильное меню */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                {/* User Dropdown Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:block">{user.email}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border z-50">
                    <div className="py-1">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.email}</p>
                            <p className="text-xs text-gray-500">
                              {role === 'admin' ? t('common.admin') : role === 'teacher' ? t('common.teacher') : t('common.student')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Logout Button */}
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t('common.logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/login">{t('common.login')}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/register">{t('common.register')}</Link>
                </Button>
              </div>
            )}

            {/* Мобильное меню */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isOpen && (
          <div className="md:hidden">
            <Card className="mt-2 p-4">
              <div className="space-y-4">
                {getNavigationItems().map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 text-gray-700 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
                
                {role === 'admin' && (
                  <>
                    <div className="border-t pt-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Админ</h3>
                      {adminItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center space-x-3 text-gray-700 hover:text-primary transition-colors ml-4"
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </>
                )}

                {user && (
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-3 text-sm text-gray-700 mb-2">
                      <User className="h-4 w-4" />
                      <span>{user.email}</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {role === 'admin' ? 'Админ' : role === 'teacher' ? 'Учитель' : 'Ученик'}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('common.logout')}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </nav>
  )
}

