# Настройка проекта Биолаб

## Переменные окружения

Создайте файл `.env.local` в корне проекта со следующими переменными:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Supabase Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Настройка Supabase

### 1. Создание проекта в Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Скопируйте URL и anon key в переменные окружения

### 2. Создание таблиц

Выполните следующие SQL запросы в Supabase SQL Editor:

```sql
-- Создание таблицы профилей пользователей
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  class INTEGER CHECK (class >= 7 AND class <= 11),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы лабораторных работ
CREATE TABLE labs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_kz TEXT,
  description TEXT NOT NULL,
  description_kz TEXT,
  theory TEXT NOT NULL,
  theory_kz TEXT,
  process TEXT NOT NULL,
  process_kz TEXT,
  image_url TEXT,
  video_url TEXT,
  external_links TEXT[],
  files TEXT[],
  class_level INTEGER NOT NULL CHECK (class_level >= 7 AND class_level <= 11),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Создание таблицы STEAM материалов
CREATE TABLE steam (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_kz TEXT,
  description TEXT NOT NULL,
  description_kz TEXT,
  image_url TEXT,
  external_links TEXT[],
  files TEXT[],
  class_level INTEGER NOT NULL CHECK (class_level >= 7 AND class_level <= 11),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Создание таблицы материалов для учителей
CREATE TABLE teachers_materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_kz TEXT,
  description TEXT NOT NULL,
  description_kz TEXT,
  files TEXT[],
  class_level INTEGER CHECK (class_level >= 7 AND class_level <= 11),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);
```

### 3. Настройка Row Level Security (RLS)

```sql
-- Включение RLS для всех таблиц
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE steam ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers_materials ENABLE ROW LEVEL SECURITY;

-- Политики для profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Политики для labs (все пользователи могут читать)
CREATE POLICY "Anyone can view labs" ON labs
  FOR SELECT USING (true);

-- Политики для steam (все пользователи могут читать)
CREATE POLICY "Anyone can view steam" ON steam
  FOR SELECT USING (true);

-- Политики для teachers_materials (все пользователи могут читать)
CREATE POLICY "Anyone can view teachers_materials" ON teachers_materials
  FOR SELECT USING (true);

-- Политики для админов (полный доступ)
CREATE POLICY "Admins can manage labs" ON labs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() 
      AND user_id IN (
        SELECT user_id FROM profiles 
        WHERE user_id = auth.uid()
      )
    )
  );

-- Аналогично для других таблиц...
```

### 4. Создание Storage Buckets

```sql
-- Создание bucket для файлов
INSERT INTO storage.buckets (id, name, public) VALUES ('files', 'files', true);

-- Политики для storage
CREATE POLICY "Anyone can view files" ON storage.objects
  FOR SELECT USING (bucket_id = 'files');

CREATE POLICY "Authenticated users can upload files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'files' AND auth.role() = 'authenticated');
```

## Запуск проекта

1. Установите зависимости:
```bash
npm install
```

2. Запустите проект в режиме разработки:
```bash
npm run dev
```

3. Откройте [http://localhost:3000](http://localhost:3000) в браузере

## Структура проекта

- `/src/app` - страницы приложения (App Router)
- `/src/components` - переиспользуемые компоненты
- `/src/lib` - утилиты и конфигурация
- `/src/types` - TypeScript типы
- `/src/contexts` - React контексты
- `/src/hooks` - кастомные хуки

## Роли пользователей

- **student** - ученик (может просматривать материалы)
- **teacher** - учитель (может просматривать материалы + специальные материалы для учителей)
- **admin** - администратор (полный доступ к управлению контентом)


