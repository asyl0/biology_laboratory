// Тест подключения к Supabase
// Выполните в консоли браузера

// Получаем Supabase клиент
const { createClient } = window.supabase;

// Тестовые данные
const testData = {
  title: 'Тестовая работа',
  description: 'Описание теста',
  theory: 'Теория теста',
  process: 'Процесс теста',
  class_level: 9,
  image_url: null,
  video_url: null,
  external_links: [],
  files: []
};

console.log('Тестируем Supabase...');
console.log('Данные для отправки:', testData);

// Пробуем создать запись
createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
.from('labs')
.insert([testData])
.select()
.single()
.then(({ data, error }) => {
  if (error) {
    console.error('❌ Ошибка Supabase:', error);
  } else {
    console.log('✅ Успешно создано:', data);
  }
})
.catch(err => {
  console.error('❌ Исключение:', err);
});

