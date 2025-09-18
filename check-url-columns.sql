-- Проверяем точные типы и ограничения для URL полей
SELECT 
    column_name, 
    data_type, 
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'labs' 
AND column_name IN ('image_url', 'video_url', 'external_links')
ORDER BY column_name;

