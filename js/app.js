const main_slider = new Swiper('.main-slider__body', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // autoHeight: true,
    observer: true,
    observeParents: true,
    spaceBetween: 0,
    slidesPerView: 1,

    // If we need pagination`
    // pagination: {
    //     el: '.swiper-pagination',
    // },

    // Navigation arrows
    navigation: {
        nextEl: '.control-main-slider__arrow_next',
        prevEl: '.control-main-slider__arrow_prev',
    },

    // And if we need scrollbar
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },

    breakpoints: {
        320: {
            autoHeight: true
        },
        768: {
            autoHeight: false
        }
    }
});

const lots_swlider = new Swiper('.slider-lots__body', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // autoHeight: true,
    observer: true,
    observeParents: true,
    spaceBetween: 0,
    slidesPerView: 3,

    // If we need pagination`
    // pagination: {
    //     el: '.swiper-pagination',
    // },

    // Navigation arrows
    navigation: {
        nextEl: '.control-slider-lots__arrow_next',
        prevEl: '.control-slider-lots__arrow_prev',
    },

    // And if we need scrollbar
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },

    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        550: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        }
    }
});;
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