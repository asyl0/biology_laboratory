-- Полностью отключаем RLS для всех таблиц
ALTER TABLE labs DISABLE ROW LEVEL SECURITY;
ALTER TABLE steam DISABLE ROW LEVEL SECURITY;
ALTER TABLE teachers_materials DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Проверяем статус RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('labs', 'steam', 'teachers_materials', 'profiles');

