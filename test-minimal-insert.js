// Тест с минимальными данными без URL полей
// Выполните в консоли браузера

const { createClient } = window.supabase;

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Тест 1: Только обязательные поля
const minimalData = {
  title: 'Минимальный тест',
  description: 'Описание',
  theory: 'Теория',
  process: 'Процесс',
  class_level: 9
};

console.log('Тест 1: Только обязательные поля');
console.log('Данные:', minimalData);

supabaseClient
  .from('labs')
  .insert([minimalData])
  .select()
  .single()
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Ошибка с минимальными данными:', error);
      console.error('Код:', error.code);
      console.error('Сообщение:', error.message);
      console.error('Детали:', error.details);
    } else {
      console.log('✅ Минимальные данные работают:', data);
      
      // Тест 2: Добавляем NULL поля
      console.log('\nТест 2: С NULL полями');
      const dataWithNulls = {
        ...minimalData,
        title: 'Тест с NULL полями',
        image_url: null,
        video_url: null,
        external_links: null,
        files: null
      };
      
      console.log('Данные с NULL:', dataWithNulls);
      
      supabaseClient
        .from('labs')
        .insert([dataWithNulls])
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('❌ Ошибка с NULL полями:', error);
          } else {
            console.log('✅ NULL поля работают:', data);
          }
        });
    }
  });

