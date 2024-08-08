export default function initTabs() {
  const tabsElements = document.querySelectorAll('.tabs');
  if (tabsElements.length === 0) return;

  tabsElements.forEach((tabs) => {
    const tablist = tabs.querySelector('[role="tablist"]');
    const tabButtons = tablist.querySelectorAll('[role="tab"]');
    const tabContent = tabs.querySelector('.tabs__content');
    const tabPanes = tabContent.querySelectorAll('[role="tabpanel"]');

    tabButtons.forEach((tabButton) => {
      tabButton.addEventListener('click', () => {
        const targetPaneId = tabButton.getAttribute('aria-controls');
        const targetPane = document.getElementById(targetPaneId);

        // Убираем класс is-active со всех панелей
        tabPanes.forEach((pane) => {
          pane.classList.remove('is-active');
        });

        // Добавляем класс is-active к целевой панели
        targetPane.classList.add('is-active');

        // Обновляем aria-selected для всех кнопок
        tabButtons.forEach((button) => {
          button.setAttribute(
            'aria-selected',
            button === tabButton ? 'true' : 'false'
          );
        });
      });
    });
  });
}
