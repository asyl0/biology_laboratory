-- Проверка существующих таблиц в схеме public
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Проверка структуры таблицы steam (если существует)
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'steam'
ORDER BY ordinal_position;

-- Проверка структуры таблицы teachers_materials (если существует)
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'teachers_materials'
ORDER BY ordinal_position;

-- Проверка структуры таблицы students_materials (если существует)
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'students_materials'
ORDER BY ordinal_position;

-- Проверка RLS статуса для всех таблиц
SELECT schemaname, tablename, rowsecurity, hasrls
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
