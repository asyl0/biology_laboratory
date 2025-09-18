// Прямой тест вставки в Supabase
// Выполните в консоли браузера

// Получаем переменные окружения
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials missing!');
  console.log('Check your .env.local file');
} else {
  // Создаем клиент
  const { createClient } = window.supabase;
  const supabaseClient = createClient(supabaseUrl, supabaseKey);

  // Тестовые данные
  const testData = {
    title: 'Прямой тест вставки',
    description: 'Описание теста',
    theory: 'Теория теста',
    process: 'Процесс теста',
    class_level: 9,
    image_url: 'https://example.com/image.jpg',
    video_url: 'https://youtube.com/watch?v=test',
    external_links: ['https://example.com/link1'],
    files: []
  };

  console.log('Тестируем прямую вставку...');
  console.log('Данные:', testData);

  // Пробуем вставить
  supabaseClient
    .from('labs')
    .insert([testData])
    .select()
    .single()
    .then(({ data, error }) => {
      if (error) {
        console.error('❌ Ошибка:', error);
        console.error('Код:', error.code);
        console.error('Сообщение:', error.message);
        console.error('Детали:', error.details);
        console.error('Подсказка:', error.hint);
      } else {
        console.log('✅ Успешно!', data);
      }
    })
    .catch(err => {
      console.error('❌ Исключение:', err);
    });
}

