// Прямой тест Supabase - выполните в консоли браузера
console.log('=== ПРЯМОЙ ТЕСТ SUPABASE ===');

// Получаем Supabase клиент из window
const { createClient } = window.supabase;

const supabase = createClient(
  'https://imqhztqwongowiseqmff.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcWh6dHF3b25nb3dpc2VxbWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NzI5MDksImV4cCI6MjA1MDE0ODkwOX0.Q971ZjKrB1vqVNGx2yOqrPPNg_Z4-CMyP63sONQp7L0'
);

console.log('Supabase клиент создан:', supabase);

// Тест 1: Простой SELECT
console.log('=== ТЕСТ 1: SELECT ===');
supabase
  .from('labs')
  .select('id, title')
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ SELECT ошибка:', error);
    } else {
      console.log('✅ SELECT работает:', data);
    }
  });

// Тест 2: Минимальный INSERT
console.log('=== ТЕСТ 2: MINIMAL INSERT ===');
const minimalData = {
  title: 'Тест ' + Date.now(),
  description: 'Описание',
  theory: 'Теория',
  process: 'Процесс',
  class_level: 9,
  files: []
};

console.log('Отправляем минимальные данные:', minimalData);

supabase
  .from('labs')
  .insert([minimalData])
  .select()
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ INSERT ошибка:', error);
      console.error('Детали ошибки:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
    } else {
      console.log('✅ INSERT работает:', data);
    }
  });

// Тест 3: INSERT с URL полями
console.log('=== ТЕСТ 3: INSERT С URL ===');
const urlData = {
  title: 'Тест URL ' + Date.now(),
  description: 'Описание',
  theory: 'Теория',
  process: 'Процесс',
  class_level: 9,
  image_url: 'https://example.com/image.jpg',
  video_url: 'https://youtube.com/watch?v=test',
  external_links: ['https://example.com/link1'],
  files: []
};

console.log('Отправляем данные с URL:', urlData);

supabase
  .from('labs')
  .insert([urlData])
  .select()
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ INSERT с URL ошибка:', error);
      console.error('Детали ошибки:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
    } else {
      console.log('✅ INSERT с URL работает:', data);
    }
  });

