// Скрипт для отключения RLS для таблицы steam
// Выполните в Supabase SQL Editor

console.log('Выполните следующий SQL в Supabase SQL Editor:');

const sql = `
-- Временно отключаем RLS для таблицы steam
ALTER TABLE steam DISABLE ROW LEVEL SECURITY;

-- Проверяем статус RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'steam';
`;

console.log(sql);

