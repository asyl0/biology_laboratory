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
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="bg-background/80 backdrop-blur-md shadow-lg border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Логотип */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <FlaskConical className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-gradient">BioLab</span>
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
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200 group"
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
            
            {role === 'admin' && (
              <div className="flex items-center space-x-4 pl-6 border-l border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Админ:</span>
                {adminItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200 group"
                    >
                      <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium text-sm">{item.label}</span>
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
                  className="flex items-center space-x-2 text-foreground hover:text-primary hover:bg-accent/50 px-4 py-2 rounded-lg"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="hidden sm:block font-medium">{user.email}</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                </Button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-card/95 backdrop-blur-md rounded-xl shadow-xl border border-border/50 z-50 animate-fade-in">
                    <div className="py-2">
                      {/* User Info */}
                      <div className="px-4 py-4 border-b border-border/50">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gradient-to-r from-primary to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                            <User className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-card-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">
                              {role === 'admin' ? t('common.admin') : role === 'teacher' ? t('common.teacher') : t('common.student')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Logout Button */}
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-3 text-left text-sm text-card-foreground hover:bg-destructive/10 hover:text-destructive flex items-center space-x-3 transition-all duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="font-medium">{t('common.logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
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
              className="md:hidden hover:bg-accent/50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isOpen && (
          <div className="md:hidden animate-slide-in">
            <Card className="mt-4 p-6 bg-card/95 backdrop-blur-md">
              <div className="space-y-6">
                {getNavigationItems().map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200 group"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
                
                {role === 'admin' && (
                  <>
                    <div className="border-t border-border/50 pt-6">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-2">Админ панель</h3>
                      {adminItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200 group ml-2"
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span className="font-medium text-sm">{item.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </>
                )}

                {user && (
                  <div className="border-t border-border/50 pt-6">
                    <div className="flex items-center space-x-3 px-2 mb-4">
                      <div className="h-8 w-8 bg-gradient-to-r from-primary to-primary-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-card-foreground">{user.email}</p>
                        <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {role === 'admin' ? 'Админ' : role === 'teacher' ? 'Учитель' : 'Ученик'}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                      className="w-full hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
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

