-- Создание только таблицы для материалов студентов
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

-- Включение RLS для таблицы
ALTER TABLE public.students_materials ENABLE ROW LEVEL SECURITY;

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
CREATE INDEX IF NOT EXISTS idx_students_materials_class_level ON public.students_materials(class_level);
CREATE INDEX IF NOT EXISTS idx_students_materials_created_at ON public.students_materials(created_at);

-- Добавление тестовых данных
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

CREATE TRIGGER update_students_materials_updated_at BEFORE UPDATE ON public.students_materials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
