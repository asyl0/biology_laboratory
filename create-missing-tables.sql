-- Создание таблицы для STEAM материалов
CREATE TABLE IF NOT EXISTS public.steam (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    theory TEXT,
    process TEXT,
    class_level INTEGER NOT NULL,
    image_url TEXT,
    video_url TEXT,
    external_links TEXT[],
    files TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы для материалов учителей
CREATE TABLE IF NOT EXISTS public.teachers_materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    theory TEXT,
    process TEXT,
    class_level INTEGER NOT NULL,
    image_url TEXT,
    video_url TEXT,
    external_links TEXT[],
    files TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы для материалов студентов
CREATE TABLE IF NOT EXISTS public.students_materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    theory TEXT,
    process TEXT,
    class_level INTEGER NOT NULL,
    image_url TEXT,
    video_url TEXT,
    external_links TEXT[],
    files TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение RLS для всех таблиц
ALTER TABLE public.steam ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students_materials ENABLE ROW LEVEL SECURITY;

-- Политики для таблицы steam
CREATE POLICY "Anyone can view steam materials" ON public.steam
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage steam materials" ON public.steam
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Политики для таблицы teachers_materials
CREATE POLICY "Teachers and admins can view teacher materials" ON public.teachers_materials
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('teacher', 'admin')
        )
    );

CREATE POLICY "Admins can manage teacher materials" ON public.teachers_materials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Политики для таблицы students_materials
CREATE POLICY "Students and admins can view student materials" ON public.students_materials
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('student', 'admin')
        )
    );

CREATE POLICY "Admins can manage student materials" ON public.students_materials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_steam_class_level ON public.steam(class_level);
CREATE INDEX IF NOT EXISTS idx_steam_created_at ON public.steam(created_at);

CREATE INDEX IF NOT EXISTS idx_teachers_materials_class_level ON public.teachers_materials(class_level);
CREATE INDEX IF NOT EXISTS idx_teachers_materials_created_at ON public.teachers_materials(created_at);

CREATE INDEX IF NOT EXISTS idx_students_materials_class_level ON public.students_materials(class_level);
CREATE INDEX IF NOT EXISTS idx_students_materials_created_at ON public.students_materials(created_at);

-- Добавление тестовых данных
INSERT INTO public.steam (title, description, theory, process, class_level, image_url, video_url, external_links, files) VALUES
('STEAM жобасы: Робот жасау', 'Оқушылар робот жасау арқылы инженерия мен технологияны үйренеді', 'Робототехника негіздері...', '1. Жоспарлау\n2. Жиынтықтау\n3. Бағдарламалау', 9, 'https://example.com/robot.jpg', 'https://youtube.com/watch?v=example', ARRAY['https://example.com/guide'], ARRAY['robot_manual.pdf']),
('STEAM жобасы: 3D модельдеу', '3D принтер арқылы заттарды жасау', '3D дизайн негіздері...', '1. Дизайн\n2. Модельдеу\n3. Басып шығару', 10, 'https://example.com/3d.jpg', 'https://youtube.com/watch?v=example2', ARRAY['https://example.com/3d-guide'], ARRAY['3d_manual.pdf']);

INSERT INTO public.teachers_materials (title, description, theory, process, class_level, image_url, video_url, external_links, files) VALUES
('Мұғалім нұсқаулығы: Биология сабақтары', 'Биология сабақтарын жоспарлау және өткізу', 'Биология оқыту әдістері...', '1. Сабақ жоспары\n2. Материалдар\n3. Бағалау', 9, 'https://example.com/bio.jpg', 'https://youtube.com/watch?v=example3', ARRAY['https://example.com/bio-guide'], ARRAY['biology_manual.pdf']),
('Мұғалім нұсқаулығы: Химия тәжірибелері', 'Химия тәжірибелерін қауіпсіз өткізу', 'Химия тәжірибелерінің ережелері...', '1. Дайындық\n2. Тәжірибе\n3. Тазалау', 10, 'https://example.com/chem.jpg', 'https://youtube.com/watch?v=example4', ARRAY['https://example.com/chem-guide'], ARRAY['chemistry_manual.pdf']);

INSERT INTO public.students_materials (title, description, theory, process, class_level, image_url, video_url, external_links, files) VALUES
('Оқушы материалдары: Биология зерттеулері', 'Оқушылар үшін биология зерттеулері', 'Биология зерттеу әдістері...', '1. Зерттеу жоспары\n2. Деректер жинау\n3. Талдау', 9, 'https://example.com/student-bio.jpg', 'https://youtube.com/watch?v=example5', ARRAY['https://example.com/student-bio-guide'], ARRAY['student_biology_guide.pdf']),
('Оқушы материалдары: Математика есептері', 'Математика есептерін шешу әдістері', 'Математика есептерінің түрлері...', '1. Есепті оқу\n2. Шешу жолы\n3. Тексеру', 10, 'https://example.com/student-math.jpg', 'https://youtube.com/watch?v=example6', ARRAY['https://example.com/student-math-guide'], ARRAY['student_math_guide.pdf']);

-- Обновление updated_at при изменении записи
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_steam_updated_at BEFORE UPDATE ON public.steam
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_materials_updated_at BEFORE UPDATE ON public.teachers_materials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_materials_updated_at BEFORE UPDATE ON public.students_materials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
