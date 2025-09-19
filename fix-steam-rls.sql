-- Отключаем RLS для таблицы steam
ALTER TABLE steam DISABLE ROW LEVEL SECURITY;

-- Проверяем статус RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'steam';

-- Также проверим существующие политики
SELECT * FROM pg_policies WHERE tablename = 'steam';

