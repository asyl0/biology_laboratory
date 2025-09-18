// Тест с минимальными данными
// Выполните в консоли браузера

const { createClient } = window.supabase;

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Минимальные данные без URL полей
const minimalData = {
  title: 'Тест минимальных данных',
  description: 'Описание',
  theory: 'Теория',
  process: 'Процесс',
  class_level: 9,
  image_url: null,
  video_url: null,
  external_links: [],
  files: []
};

console.log('Тест 1: Минимальные данные');
console.log('Данные:', minimalData);

supabaseClient
  .from('labs')
  .insert([minimalData])
  .select()
  .single()
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Ошибка с минимальными данными:', error);
    } else {
      console.log('✅ Минимальные данные работают:', data);
      
      // Теперь тестируем с URL полями
      console.log('\nТест 2: С URL полями');
      const dataWithUrls = {
        ...minimalData,
        title: 'Тест с URL полями',
        image_url: 'https://example.com/image.jpg',
        video_url: 'https://youtube.com/watch?v=test',
        external_links: ['https://example.com/link1']
      };
      
      console.log('Данные с URL:', dataWithUrls);
      
      supabaseClient
        .from('labs')
        .insert([dataWithUrls])
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('❌ Ошибка с URL полями:', error);
            console.error('Код:', error.code);
            console.error('Сообщение:', error.message);
            console.error('Детали:', error.details);
          } else {
            console.log('✅ URL поля работают:', data);
          }
        });
    }
  });

