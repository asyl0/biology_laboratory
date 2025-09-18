// Тест загрузки файлов - выполните в консоли браузера
console.log('=== ТЕСТ ЗАГРУЗКИ ФАЙЛОВ ===');

// Создаем тестовый файл
const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
console.log('Тестовый файл создан:', testFile);

// Получаем Supabase клиент
const { createClient } = window.supabase;
const supabase = createClient(
  'https://imqhztqwongowiseqmff.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcWh6dHF3b25nb3dpc2VxbWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NzI5MDksImV4cCI6MjA1MDE0ODkwOX0.Q971ZjKrB1vqVNGx2yOqrPPNg_Z4-CMyP63sONQp7L0'
);

console.log('Supabase клиент:', supabase);

// Тестируем загрузку файла
async function testFileUpload() {
  try {
    console.log('Начинаем загрузку файла...');
    
    const fileExt = testFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `labs/${fileName}`;
    
    console.log('Путь файла:', filePath);
    
    const { data, error } = await supabase.storage
      .from('files')
      .upload(filePath, testFile);
    
    if (error) {
      console.error('❌ Ошибка загрузки:', error);
      return;
    }
    
    console.log('✅ Файл загружен:', data);
    
    // Получаем публичный URL
    const { data: urlData } = supabase.storage
      .from('files')
      .getPublicUrl(filePath);
    
    console.log('✅ Публичный URL:', urlData.publicUrl);
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
  }
}

testFileUpload();

