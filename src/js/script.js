// Выпадающее меню пользователя
let user_icon = document.querySelector('.user-header__icon')
user_icon.addEventListener('click', function (e) {
    let user_menu = document.querySelector('.user-header__menu')
    user_menu.classList.toggle('_active')
})

// Активация бургера
let iconMenu = document.querySelector('.icon-menu')
let menuBody = document.querySelector('.menu__body')
iconMenu.addEventListener('click', function (e) {
    iconMenu.classList.toggle('_active')
    menuBody.classList.toggle('_active')
})

// Закрываем меню пользователя при клике мимо самого меню
document.addEventListener('click', function (e) {
    if (!e.target.closest('.user-header')) {
        let user_menu = document.querySelector('.user-header__menu')
        user_menu.classList.remove('_active')
    }
})