// Простой тест подключения к Supabase
// Выполните в консоли браузера

console.log('=== ТЕСТ ПОДКЛЮЧЕНИЯ К SUPABASE ===');

// Проверяем переменные окружения
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing');

// Проверяем Supabase клиент
if (typeof window.supabase === 'undefined') {
  console.error('❌ window.supabase не определен!');
} else {
  console.log('✅ window.supabase доступен');
  
  const { createClient } = window.supabase;
  
  if (typeof createClient === 'undefined') {
    console.error('❌ createClient не определен!');
  } else {
    console.log('✅ createClient доступен');
    
    try {
      const supabaseClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      
      console.log('✅ Supabase клиент создан:', supabaseClient);
      
      // Тест простого запроса
      console.log('Тестируем простой SELECT...');
      supabaseClient
        .from('labs')
        .select('id')
        .limit(1)
        .then(({ data, error }) => {
          if (error) {
            console.error('❌ Ошибка SELECT:', error);
          } else {
            console.log('✅ SELECT работает:', data);
          }
        });
        
    } catch (err) {
      console.error('❌ Ошибка создания клиента:', err);
    }
  }
}

