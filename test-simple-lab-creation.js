// Простой тест создания лабораторной работы
// Выполните в консоли браузера на странице /admin/labs/new

// Данные для тестирования
const testData = {
  title: 'Тестовая лабораторная работа',
  description: 'Описание тестовой работы',
  theory: 'Теория тестовой работы',
  process: 'Процесс тестовой работы',
  class_level: 9,
  image_url: null,
  video_url: null,
  external_links: [],
  files: []
};

console.log('Тестовые данные:', testData);

// Попробуем создать через Supabase напрямую
const { createClient } = supabase;
const supabaseClient = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);

// Тест создания
supabaseClient
  .from('labs')
  .insert([testData])
  .select()
  .single()
  .then(({ data, error }) => {
    if (error) {
      console.error('Ошибка Supabase:', error);
    } else {
      console.log('Успешно создано:', data);
    }
  });

