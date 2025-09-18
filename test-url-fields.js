// Тест URL полей
// Выполните в консоли браузера на странице /admin/labs/new

// Тестовые данные с URL полями
const testDataWithUrls = {
  title: 'Тест с URL полями',
  description: 'Описание теста',
  theory: 'Теория теста',
  process: 'Процесс теста',
  class_level: 9,
  image_url: 'https://example.com/image.jpg',
  video_url: 'https://youtube.com/watch?v=test',
  external_links: ['https://example.com/link1', 'https://example.com/link2'],
  files: []
};

console.log('Тестируем с URL полями...');
console.log('Данные:', testDataWithUrls);

// Проверяем типы данных
console.log('image_url type:', typeof testDataWithUrls.image_url);
console.log('video_url type:', typeof testDataWithUrls.video_url);
console.log('external_links type:', typeof testDataWithUrls.external_links);
console.log('external_links is array:', Array.isArray(testDataWithUrls.external_links));

