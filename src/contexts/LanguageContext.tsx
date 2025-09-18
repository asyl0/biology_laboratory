'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'ru' | 'kz'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Переводы
const translations = {
  ru: {
    // Общие
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка',
    'common.success': 'Успешно',
    'common.cancel': 'Отмена',
    'common.save': 'Сохранить',
    'common.edit': 'Редактировать',
    'common.delete': 'Удалить',
    'common.view': 'Просмотр',
    'common.download': 'Скачать',
    'common.search': 'Поиск',
    'common.filter': 'Фильтр',
    'common.back': 'Назад',
    'common.next': 'Далее',
    'common.previous': 'Предыдущий',
    'common.close': 'Закрыть',
    'common.open': 'Открыть',
    'common.upload': 'Загрузить',
    'common.create': 'Создать',
    'common.update': 'Обновить',
    'common.submit': 'Отправить',
    'common.login': 'Войти',
    'common.logout': 'Выйти',
    'common.register': 'Регистрация',
    'common.email': 'Email',
    'common.password': 'Пароль',
    'common.name': 'Имя',
    'common.description': 'Описание',
    'common.title': 'Название',
    'common.class': 'Класс',
    'common.role': 'Роль',
    'common.student': 'Ученик',
    'common.teacher': 'Учитель',
    'common.admin': 'Администратор',
    'common.files': 'Файлы',
    'common.video': 'Видео',
    'common.image': 'Изображение',
    'common.external_links': 'Внешние ссылки',
    
    // Навигация
    'nav.home': 'Главная',
    'nav.dashboard': 'Дашборд',
    'nav.labs': 'Лабораторные работы',
    'nav.steam': 'STEAM материалы',
    'nav.teachers': 'Материалы для учителей',
    'nav.admin': 'Админ-панель',
    'nav.admin_labs': 'Управление лабораторными',
    'nav.admin_steam': 'Управление STEAM',
    'nav.admin_teachers': 'Управление материалами',
    
    // Главная страница
    'home.welcome': 'Добро пожаловать в',
    'home.subtitle': 'Платформа для управления лабораторными работами и образовательными материалами. Изучайте биологию, химию и естественные науки с помощью интерактивных материалов.',
    'home.start_learning': 'Начать обучение',
    'home.login': 'Войти в систему',
    'home.features.labs.title': 'Лабораторные работы',
    'home.features.labs.description': 'Интерактивные лабораторные работы с пошаговыми инструкциями, теорией и практическими заданиями для классов 7-11.',
    'home.features.steam.title': 'STEAM материалы',
    'home.features.steam.description': 'Современные образовательные материалы по науке, технологиям, инженерии, искусству и математике.',
    'home.features.teachers.title': 'Материалы для учителей',
    'home.features.teachers.description': 'Специальные ресурсы и методические материалы для преподавателей биологии и естественных наук.',
    'home.cta.title': 'Готовы начать обучение?',
    'home.cta.subtitle': 'Присоединяйтесь к тысячам учеников и учителей, которые уже используют Биолаб',
    'home.cta.create_account': 'Создать аккаунт',
    
    // Дашборд
    'dashboard.welcome': 'Добро пожаловать',
    'dashboard.subtitle': 'Изучайте лабораторные работы и образовательные материалы',
    'dashboard.search_placeholder': 'Поиск материалов...',
    'dashboard.all_classes': 'Все классы',
    'dashboard.all_types': 'Все типы',
    'dashboard.labs_count': 'материалов',
    'dashboard.steam_count': 'материалов',
    'dashboard.teachers_count': 'материалов',
    
    // Лабораторные работы
    'labs.theory': 'Теория',
    'labs.process': 'Процесс выполнения',
    'labs.files_title': 'Файлы для скачивания',
    'labs.video_title': 'Видеоматериал',
    'labs.actions': 'Действия',
    'labs.download_all': 'Скачать все файлы',
    'labs.watch_video': 'Смотреть видео',
    'labs.external_resources': 'Внешние ресурсы',
    'labs.not_found': 'Лабораторная работа не найдена',
    'labs.back_to_dashboard': 'Вернуться к дашборду',
    
    // Аутентификация
    'auth.login.title': 'Вход в систему',
    'auth.login.subtitle': 'Войдите в свой аккаунт для доступа к материалам',
    'auth.login.full_name': 'Полное имя',
    'auth.login.confirm_password': 'Подтверждение пароля',
    'auth.login.password_placeholder': 'Минимум 6 символов',
    'auth.login.confirm_placeholder': 'Повторите пароль',
    'auth.login.no_account': 'Нет аккаунта?',
    'auth.login.register_link': 'Зарегистрироваться',
    'auth.login.has_account': 'Уже есть аккаунт?',
    'auth.login.login_link': 'Войти',
    'auth.register.title': 'Регистрация',
    'auth.register.subtitle': 'Создайте аккаунт для доступа к образовательным материалам',
    'auth.register.creating_account': 'Создание аккаунта',
    'auth.register.form_description': 'Заполните форму для регистрации в системе',
    'auth.register.role_placeholder': 'Выберите роль',
    'auth.register.class_placeholder': 'Выберите класс',
    'auth.register.registering': 'Регистрация...',
    'auth.register.passwords_not_match': 'Пароли не совпадают',
    'auth.register.password_min_length': 'Пароль должен содержать минимум 6 символов',
    'auth.register.select_class': 'Выберите класс для ученика',
    
    // Админ-панель
    'admin.labs.title': 'Управление лабораторными работами',
    'admin.labs.subtitle': 'Создавайте, редактируйте и управляйте лабораторными работами',
    'admin.labs.create_new': 'Создать новую',
    'admin.labs.total_works': 'Всего работ',
    'admin.labs.no_works': 'Нет лабораторных работ',
    'admin.labs.no_works_description': 'Создайте первую лабораторную работу для начала работы',
    'admin.labs.create_lab': 'Создать лабораторную работу',
    'admin.labs.delete_confirm': 'Вы уверены, что хотите удалить эту лабораторную работу?',
    
    // Создание лабораторной работы
    'admin.labs.new.title': 'Создание лабораторной работы',
    'admin.labs.new.subtitle': 'Заполните форму для создания новой лабораторной работы',
    'admin.labs.new.basic_info': 'Основная информация',
    'admin.labs.new.basic_info_description': 'Название, описание и класс для лабораторной работы',
    'admin.labs.new.title_ru': 'Название (русский)',
    'admin.labs.new.title_kz': 'Название (казахский)',
    'admin.labs.new.description_ru': 'Описание (русский)',
    'admin.labs.new.description_kz': 'Описание (казахский)',
    'admin.labs.new.class_level': 'Класс',
    'admin.labs.new.theory': 'Теоретическая часть',
    'admin.labs.new.theory_description': 'Теоретические основы и объяснения для учащихся',
    'admin.labs.new.theory_ru': 'Теория (русский)',
    'admin.labs.new.theory_kz': 'Теория (казахский)',
    'admin.labs.new.process': 'Процесс выполнения',
    'admin.labs.new.process_description': 'Пошаговые инструкции для выполнения работы',
    'admin.labs.new.process_ru': 'Процесс (русский)',
    'admin.labs.new.process_kz': 'Процесс (казахский)',
    'admin.labs.new.media': 'Медиа и внешние ссылки',
    'admin.labs.new.media_description': 'Изображения, видео и ссылки на внешние ресурсы',
    'admin.labs.new.image_url': 'URL изображения',
    'admin.labs.new.video_url': 'URL видео',
    'admin.labs.new.external_links': 'Внешние ссылки',
    'admin.labs.new.add_link': 'Добавить',
    'admin.labs.new.files': 'Файлы для загрузки',
    'admin.labs.new.files_description': 'Загрузите файлы, которые будут доступны для скачивания',
    'admin.labs.new.saving': 'Сохранение...',
    'admin.labs.new.back_to_list': 'Назад к списку',
  },
  
  kz: {
    // Общие
    'common.loading': 'Жүктелуде...',
    'common.error': 'Қате',
    'common.success': 'Сәтті',
    'common.cancel': 'Болдырмау',
    'common.save': 'Сақтау',
    'common.edit': 'Өңдеу',
    'common.delete': 'Жою',
    'common.view': 'Көру',
    'common.download': 'Жүктеу',
    'common.search': 'Іздеу',
    'common.filter': 'Сүзгі',
    'common.back': 'Артқа',
    'common.next': 'Келесі',
    'common.previous': 'Алдыңғы',
    'common.close': 'Жабу',
    'common.open': 'Ашу',
    'common.upload': 'Жүктеу',
    'common.create': 'Жасау',
    'common.update': 'Жаңарту',
    'common.submit': 'Жіберу',
    'common.login': 'Кіру',
    'common.logout': 'Шығу',
    'common.register': 'Тіркелу',
    'common.email': 'Email',
    'common.password': 'Құпия сөз',
    'common.name': 'Аты',
    'common.description': 'Сипаттама',
    'common.title': 'Тақырып',
    'common.class': 'Сынып',
    'common.role': 'Рөл',
    'common.student': 'Оқушы',
    'common.teacher': 'Мұғалім',
    'common.admin': 'Әкімші',
    'common.files': 'Файлдар',
    'common.video': 'Бейне',
    'common.image': 'Сурет',
    'common.external_links': 'Сыртқы сілтемелер',
    
    // Навигация
    'nav.home': 'Басты бет',
    'nav.dashboard': 'Басқару панелі',
    'nav.labs': 'Зертханалық жұмыстар',
    'nav.steam': 'STEAM материалдары',
    'nav.teachers': 'Мұғалімдерге арналған материалдар',
    'nav.admin': 'Әкімші панелі',
    'nav.admin_labs': 'Зертханалық жұмыстарды басқару',
    'nav.admin_steam': 'STEAM басқару',
    'nav.admin_teachers': 'Материалдарды басқару',
    
    // Главная страница
    'home.welcome': 'Қош келдіңіз',
    'home.subtitle': 'Зертханалық жұмыстар мен білім беру материалдарын басқару платформасы. Интерактивті материалдардың көмегімен биология, химия және табиғи ғылымдарды оқыңыз.',
    'home.start_learning': 'Оқуды бастау',
    'home.login': 'Жүйеге кіру',
    'home.features.labs.title': 'Зертханалық жұмыстар',
    'home.features.labs.description': '7-11 сыныптарға арналған қадамдық нұсқаулар, теория және практикалық тапсырмалары бар интерактивті зертханалық жұмыстар.',
    'home.features.steam.title': 'STEAM материалдары',
    'home.features.steam.description': 'Ғылым, технология, инженерия, өнер және математика бойынша заманауи білім беру материалдары.',
    'home.features.teachers.title': 'Мұғалімдерге арналған материалдар',
    'home.features.teachers.description': 'Биология және табиғи ғылымдар мұғалімдеріне арналған арнайы ресурстар мен әдістемелік материалдар.',
    'home.cta.title': 'Оқуды бастауға дайынсыз ба?',
    'home.cta.subtitle': 'Биолабты қолданатын мыңдаған оқушылар мен мұғалімдерге қосылыңыз',
    'home.cta.create_account': 'Тіркелгі жасау',
    
    // Дашборд
    'dashboard.welcome': 'Қош келдіңіз',
    'dashboard.subtitle': 'Зертханалық жұмыстар мен білім беру материалдарын оқыңыз',
    'dashboard.search_placeholder': 'Материалдарды іздеу...',
    'dashboard.all_classes': 'Барлық сыныптар',
    'dashboard.all_types': 'Барлық түрлер',
    'dashboard.labs_count': 'материал',
    'dashboard.steam_count': 'материал',
    'dashboard.teachers_count': 'материал',
    
    // Лабораторные работы
    'labs.theory': 'Теория',
    'labs.process': 'Орындау процесі',
    'labs.files_title': 'Жүктеуге арналған файлдар',
    'labs.video_title': 'Бейне материал',
    'labs.actions': 'Әрекеттер',
    'labs.download_all': 'Барлық файлдарды жүктеу',
    'labs.watch_video': 'Бейнені көру',
    'labs.external_resources': 'Сыртқы ресурстар',
    'labs.not_found': 'Зертханалық жұмыс табылмады',
    'labs.back_to_dashboard': 'Басқару панеліне оралу',
    
    // Аутентификация
    'auth.login.title': 'Жүйеге кіру',
    'auth.login.subtitle': 'Материалдарға қол жеткізу үшін тіркелгіңізге кіріңіз',
    'auth.login.full_name': 'Толық аты',
    'auth.login.confirm_password': 'Құпия сөзді растау',
    'auth.login.password_placeholder': 'Кемінде 6 таңба',
    'auth.login.confirm_placeholder': 'Құпия сөзді қайталаңыз',
    'auth.login.no_account': 'Тіркелгі жоқ па?',
    'auth.login.register_link': 'Тіркелу',
    'auth.login.has_account': 'Тіркелгі бар ма?',
    'auth.login.login_link': 'Кіру',
    'auth.register.title': 'Тіркелу',
    'auth.register.subtitle': 'Білім беру материалдарына қол жеткізу үшін тіркелгі жасаңыз',
    'auth.register.creating_account': 'Тіркелгі жасау',
    'auth.register.form_description': 'Жүйеге тіркелу үшін форманы толтырыңыз',
    'auth.register.role_placeholder': 'Рөлді таңдаңыз',
    'auth.register.class_placeholder': 'Сыныпты таңдаңыз',
    'auth.register.registering': 'Тіркелуде...',
    'auth.register.passwords_not_match': 'Құпия сөздер сәйкес келмейді',
    'auth.register.password_min_length': 'Құпия сөз кемінде 6 таңбадан тұруы керек',
    'auth.register.select_class': 'Оқушы үшін сыныпты таңдаңыз',
    
    // Админ-панель
    'admin.labs.title': 'Зертханалық жұмыстарды басқару',
    'admin.labs.subtitle': 'Зертханалық жұмыстарды жасаңыз, өңдеңіз және басқарыңыз',
    'admin.labs.create_new': 'Жаңасын жасау',
    'admin.labs.total_works': 'Барлық жұмыстар',
    'admin.labs.no_works': 'Зертханалық жұмыстар жоқ',
    'admin.labs.no_works_description': 'Жұмысты бастау үшін бірінші зертханалық жұмысты жасаңыз',
    'admin.labs.create_lab': 'Зертханалық жұмыс жасау',
    'admin.labs.delete_confirm': 'Бұл зертханалық жұмысты жойғыңыз келе ме?',
    
    // Создание лабораторной работы
    'admin.labs.new.title': 'Зертханалық жұмыс жасау',
    'admin.labs.new.subtitle': 'Жаңа зертханалық жұмыс жасау үшін форманы толтырыңыз',
    'admin.labs.new.basic_info': 'Негізгі ақпарат',
    'admin.labs.new.basic_info_description': 'Зертханалық жұмыс үшін атау, сипаттама және сынып',
    'admin.labs.new.title_ru': 'Атау (орысша)',
    'admin.labs.new.title_kz': 'Атау (қазақша)',
    'admin.labs.new.description_ru': 'Сипаттама (орысша)',
    'admin.labs.new.description_kz': 'Сипаттама (қазақша)',
    'admin.labs.new.class_level': 'Сынып',
    'admin.labs.new.theory': 'Теориялық бөлім',
    'admin.labs.new.theory_description': 'Оқушыларға арналған теориялық негіздер мен түсініктемелер',
    'admin.labs.new.theory_ru': 'Теория (орысша)',
    'admin.labs.new.theory_kz': 'Теория (қазақша)',
    'admin.labs.new.process': 'Орындау процесі',
    'admin.labs.new.process_description': 'Жұмысты орындау үшін қадамдық нұсқаулар',
    'admin.labs.new.process_ru': 'Процесс (орысша)',
    'admin.labs.new.process_kz': 'Процесс (қазақша)',
    'admin.labs.new.media': 'Медиа және сыртқы сілтемелер',
    'admin.labs.new.media_description': 'Суреттер, бейнелер және сыртқы ресурстарға сілтемелер',
    'admin.labs.new.image_url': 'Сурет URL',
    'admin.labs.new.video_url': 'Бейне URL',
    'admin.labs.new.external_links': 'Сыртқы сілтемелер',
    'admin.labs.new.add_link': 'Қосу',
    'admin.labs.new.files': 'Жүктеуге арналған файлдар',
    'admin.labs.new.files_description': 'Жүктеуге қолжетімді болатын файлдарды жүктеңіз',
    'admin.labs.new.saving': 'Сақталуда...',
    'admin.labs.new.back_to_list': 'Тізімге оралу',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('kz')

  useEffect(() => {
    // Устанавливаем казахский язык по умолчанию
    setLanguage('kz')
    localStorage.setItem('language', 'kz')
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
