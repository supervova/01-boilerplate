export default function initHeaderObserver() {
  // Получаем элементы
  const fullLogo = document.querySelector('.header__logo.is-full');
  const fullLogoLink = document.querySelector('.header__logo.is-full .logo');
  const compactLogo = document.querySelector('.header__logo.is-compact');
  const popover = document.querySelector('.header__popover');

  // Проверяем наличие элементов
  if (!fullLogo || !fullLogoLink || !compactLogo || !popover) return;

  // Callback для IntersectionObserver
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio < 0.05) {
        // Если элемент полностью покинул область просмотра
        compactLogo.classList.add('is-visible');
      } else {
        // Если элемент снова появился в области просмотра хотя бы на 5%
        compactLogo.classList.remove('is-visible');
      }
    });
  };

  // Опции для IntersectionObserver
  const observerOptions = {
    threshold: [0.05, 1.0], // 5% и 100%
  };

  // Создаем экземпляр IntersectionObserver
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Наблюдаем за полным логотипом
  observer.observe(fullLogo);

  // Функция для добавления класса is-visible панели при правом клике
  function handleContextMenu(event) {
    if (window.innerWidth >= 768 && window.innerHeight >= 361) {
      event.preventDefault(); // предотвращаем стандартное контекстное меню
      popover.classList.add('is-visible');
    }
  }

  // Функция для закрытия панели при клике вне ее или нажатии Esc
  function handleClose(event) {
    if (
      (event.type === 'mousedown' && !popover.contains(event.target)) ||
      (event.type === 'keydown' && event.key === 'Escape')
    ) {
      popover.classList.remove('is-visible');
    }
  }

  // Добавляем слушатель на правый клик по логотипу
  fullLogoLink.addEventListener('contextmenu', handleContextMenu);

  // Добавляем слушатели для закрытия панели
  document.addEventListener('mousedown', handleClose);
  document.addEventListener('keydown', handleClose);
}
