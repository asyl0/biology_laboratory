-- Проверяем полную схему таблицы labs
SELECT 
    column_name, 
    data_type, 
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'labs' 
ORDER BY ordinal_position;

-- Проверяем, есть ли поле content
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'labs' 
AND column_name = 'content';

-- Проверяем ограничения таблицы
SELECT 
    constraint_name,
    constraint_type,
    check_clause
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.check_constraints cc 
    ON tc.constraint_name = cc.constraint_name
WHERE tc.table_name = 'labs';

