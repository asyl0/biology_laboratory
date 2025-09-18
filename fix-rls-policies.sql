-- Исправление RLS политик для таблицы labs
-- Выполните этот скрипт в Supabase SQL Editor

-- Удаляем старые политики
DROP POLICY IF EXISTS "Admins can manage labs" ON labs;

-- Создаем новые политики
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

-- Проверяем, что RLS включен
ALTER TABLE labs ENABLE ROW LEVEL SECURITY;

-- Проверяем политики
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'labs';

