document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const headLeft = document.querySelector('.head-left');

    if (menuToggle && headLeft) {
        menuToggle.addEventListener('click', function() {
            headLeft.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Закрытие меню при клике на ссылку
        const links = headLeft.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                headLeft.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Лайки товаров
    const likeButtons = document.querySelectorAll('.like');
    likeButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            this.classList.toggle('liked');
        });
    });

    // Всплывающее окно Alert при добавлении в корзину
    const cartButtons = document.querySelectorAll('.ass-button');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert("Товар добавлен в корзину!");
        });
    });
});