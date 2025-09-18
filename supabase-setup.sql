-- Создание таблицы профилей пользователей
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  class INTEGER CHECK (class >= 7 AND class <= 11),
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
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
CREATE POLICY "Admins can insert labs" ON labs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update labs" ON labs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete labs" ON labs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage steam" ON steam
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage teachers_materials" ON teachers_materials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Создание Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('files', 'files', true);

-- Политики для storage
CREATE POLICY "Anyone can view files" ON storage.objects
  FOR SELECT USING (bucket_id = 'files');

CREATE POLICY "Authenticated users can upload files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'files' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can manage files" ON storage.objects
  FOR ALL USING (
    bucket_id = 'files' AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Функция для автоматического создания профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', COALESCE(NEW.raw_user_meta_data->>'role', 'student'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер для автоматического создания профиля
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
