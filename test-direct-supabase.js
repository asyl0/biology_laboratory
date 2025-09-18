// Прямой тест Supabase без проверки роли
// Выполните в консоли браузера

// Получаем Supabase клиент напрямую
const { createClient } = window.supabase;

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Тестовые данные с URL полями
const testData = {
  title: 'Прямой тест Supabase',
  description: 'Описание теста',
  theory: 'Теория теста',
  process: 'Процесс теста',
  class_level: 9,
  image_url: 'https://example.com/image.jpg',
  video_url: 'https://youtube.com/watch?v=test',
  external_links: ['https://example.com/link1'],
  files: []
};

console.log('Тестируем прямое подключение к Supabase...');
console.log('Данные:', testData);

// Пробуем создать запись напрямую
supabaseClient
  .from('labs')
  .insert([testData])
  .select()
  .single()
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Ошибка Supabase:', error);
      console.error('Код ошибки:', error.code);
      console.error('Сообщение:', error.message);
      console.error('Детали:', error.details);
    } else {
      console.log('✅ Успешно создано:', data);
    }
  })
  .catch(err => {
    console.error('❌ Исключение:', err);
  });

