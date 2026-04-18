// Скрипты для страницы доната
console.log('Donate page loaded');

// Пример функции для обработки кнопки
document.addEventListener('DOMContentLoaded', function() {
  const button = document.querySelector('.button');
  if (button) {
    button.addEventListener('click', function() {
      console.log('Donate button clicked');
    });
  }
});