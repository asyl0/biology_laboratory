// Тест URL полей - выполните в консоли браузера
console.log('=== ТЕСТ URL ПОЛЕЙ ===');

// Тестируем данные, которые вызывают проблему
const testData = {
  title: "Тест",
  description: "Описание",
  theory: "Теория",
  process: "Процесс",
  class_level: 9,
  image_url: "https://www.olabs.edu.in/userfiles/1/1434792623_Secchis-disc-method.jpg",
  video_url: "https://www.youtube.com/watch?v=SnCX19_EWDQ",
  external_links: ["https://www.olabs.edu.in/?sub=79&brch=18&sim=229&cnt=1"],
  files: []
};

console.log('Тестовые данные:', testData);

// Проверяем длину URL
console.log('Длина image_url:', testData.image_url.length);
console.log('Длина video_url:', testData.video_url.length);
console.log('Длина external_links[0]:', testData.external_links[0].length);

// Проверяем валидацию URL
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

console.log('image_url валидный:', isValidUrl(testData.image_url));
console.log('video_url валидный:', isValidUrl(testData.video_url));
console.log('external_links[0] валидный:', isValidUrl(testData.external_links[0]));

// Тестируем минимальные данные БЕЗ URL
const minimalData = {
  title: "Тест",
  description: "Описание", 
  theory: "Теория",
  process: "Процесс",
  class_level: 9,
  files: []
};

console.log('Минимальные данные (без URL):', minimalData);

// Тестируем с null URL
const nullUrlData = {
  title: "Тест",
  description: "Описание",
  theory: "Теория", 
  process: "Процесс",
  class_level: 9,
  image_url: null,
  video_url: null,
  external_links: null,
  files: []
};

console.log('Данные с null URL:', nullUrlData);

