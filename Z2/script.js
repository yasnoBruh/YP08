// ============================================
// ГЛАВНЫЙ ФАЙЛ JavaScript - PORTFOLIO SITE
// ============================================

// Основные элементы бургер-меню
const burgerBtn = document.querySelector('.burger-btn');
const burgerMenu = document.querySelector('.burger-menu');
const burgerClose = document.querySelector('.burger-close');

// ============================================
// 1. ФУНКЦИЯ ДЛЯ ФИЛЬТРА ФОТОГРАФИЙ
// ============================================
function initPhotoFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    
    if (filterButtons.length === 0 || filterItems.length === 0) {
        console.log('Элементы фильтра не найдены');
        return;
    }
    
    // Функция фильтрации
    function filterPhotos(category) {
        // Обновляем активную кнопку
        filterButtons.forEach(btn => {
            if (btn.dataset.filter === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Фильтруем фотографии
        filterItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('hidden');
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
                item.classList.add('hidden');
            }
        });
    }
    
    // Добавляем обработчики на кнопки
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.dataset.filter;
            filterPhotos(filterValue);
        });
    });
    
    // Активируем кнопку "ALL" по умолчанию
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
    
    // Активируем фильтр "ALL" по умолчанию
    filterPhotos('all');
}

// ============================================
// 2. ФУНКЦИЯ ДЛЯ АНИМАЦИИ ПРИ СКРОЛЛЕ
// ============================================
function initScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) {
        console.log('Элементы для анимации скролла не найдены');
        return;
    }
    
    // Функция проверки видимости элемента
    function checkVisibility() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerPoint) {
                element.classList.add('visible');
            }
        });
    }
    
    // Проверяем видимость при загрузке
    checkVisibility();
    
    // Проверяем видимость при скролле
    window.addEventListener('scroll', checkVisibility);
    
    // Проверяем видимость при ресайзе окна
    window.addEventListener('resize', checkVisibility);
}

// ============================================
// 3. ФУНКЦИЯ ДЛЯ ПЕРЕКЛЮЧАТЕЛЯ ТЕМЫ
// ============================================
function initThemeSwitcher() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const burgerThemeToggle = document.querySelector('.burger-theme-toggle');
    
    if (themeToggles.length === 0) {
        console.log('Переключатели темы не найдены');
        return;
    }
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Устанавливаем тему при загрузке
    setTheme(savedTheme);
    
    // Функция установки темы
    function setTheme(theme) {
        // Удаляем все классы тем и добавляем нужный
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(theme + '-theme');
        
        // Сохраняем в localStorage
        localStorage.setItem('theme', theme);
        
        // Обновляем текст в бургер-меню
        if (burgerThemeToggle) {
            const textSpan = burgerThemeToggle.querySelector('span:first-child');
            const iconSpan = burgerThemeToggle.querySelector('.theme-icon');
            
            if (textSpan && iconSpan) {
                if (theme === 'dark') {
                    textSpan.textContent = 'Светлая тема';
                    iconSpan.textContent = '🌙';
                } else {
                    textSpan.textContent = 'Темная тема';
                    iconSpan.textContent = '☀️';
                }
            }
        }
        
        console.log('Тема установлена:', theme);
    }
    
    // Функция переключения темы
    function toggleTheme() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        const newTheme = isDarkTheme ? 'light' : 'dark';
        setTheme(newTheme);
    }
    
    // Добавляем обработчики на все переключатели
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
    
    // Закрываем бургер-меню при переключении темы
    if (burgerThemeToggle && burgerMenu) {
        burgerThemeToggle.addEventListener('click', () => {
            setTimeout(() => {
                burgerMenu.classList.remove('active');
            }, 300);
        });
    }
}

// ============================================
// 4. ФУНКЦИЯ ДЛЯ БУРГЕР-МЕНЮ
// ============================================
function initBurgerMenu() {
    if (!burgerBtn || !burgerMenu || !burgerClose) {
        console.error('Ошибка: элементы бургер-меню не найдены!');
        return;
    }
    
    // Открываем/закрываем меню при нажатии на кнопку бургера
    burgerBtn.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
    });
    
    // Закрываем меню при нажатии на крестик
    burgerClose.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
    });
    
    // Закрываем меню при клике на ссылку внутри меню
    const burgerLinks = document.querySelectorAll('.burger-links a');
    burgerLinks.forEach((link) => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
        });
    });
    
    // Закрываем меню при клике вне области меню
    document.addEventListener('click', (event) => {
        if (burgerMenu.classList.contains('active') && 
            !burgerMenu.contains(event.target) && 
            !burgerBtn.contains(event.target)) {
            burgerMenu.classList.remove('active');
        }
    });
    
    console.log('Бургер-меню инициализировано');
}

// ============================================
// 5. ОСНОВНАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ
// ============================================
function initAll() {
    console.log('Инициализация сайта...');
    
    // Инициализируем бургер-меню
    initBurgerMenu();
    
    // Инициализируем фильтр фотографий
    initPhotoFilter();
    
    // Инициализируем анимацию при скролле
    initScrollAnimation();
    
    // Инициализируем переключатель темы
    initThemeSwitcher();
    
    console.log('Все модули инициализированы');
}

// ============================================
// ЗАПУСК ПРИ ЗАГРУЗКЕ ДОКУМЕНТА
// ============================================
document.addEventListener('DOMContentLoaded', initAll);

// ============================================
// ДОПОЛНИТЕЛЬНО: ОБРАБОТЧИК ДЛЯ F5
// ============================================
window.addEventListener('beforeunload', () => {
    // Сохраняем позицию скролла (опционально)
    sessionStorage.setItem('scrollPosition', window.pageYOffset);
});

window.addEventListener('load', () => {
    // Восстанавливаем позицию скролла (опционально)
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});