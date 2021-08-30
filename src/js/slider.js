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
});

const quotes_swlider = new Swiper('.slider-quotes__body', {
    effect: 'fade',
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // autoHeight: true,
    observer: true,
    observeParents: true,
    spaceBetween: 0,
    slidesPerView: 1,
    speed: 900,

    // If we need pagination`
    // pagination: {
    //     el: '.swiper-pagination',
    // },

    // Navigation arrows
    navigation: {
        nextEl: '.controls-slider-quotes__circle',
    },
    breakpoints: {
        320: {
            autoHeight: true
        },
        570: {
            autoHeight: false
        }
    }
    // And if we need scrollbar
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
});