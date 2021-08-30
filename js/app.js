"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! smooth-scroll v16.1.2 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
window.Element && !Element.prototype.closest && (Element.prototype.closest = function (e) {
    var t,
        n = (this.document || this.ownerDocument).querySelectorAll(e),
        o = this;

    do {
        for (t = n.length; 0 <= --t && n.item(t) !== o;) {
            ;
        }
    } while (t < 0 && (o = o.parentElement));

    return o;
}), function () {
    if ("function" == typeof window.CustomEvent) return;

    function e(e, t) {
        t = t || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
    }

    e.prototype = window.Event.prototype, window.CustomEvent = e;
}(), function () {
    for (var r = 0, e = ["ms", "moz", "webkit", "o"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
        window.requestAnimationFrame = window[e[t] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[t] + "CancelAnimationFrame"] || window[e[t] + "CancelRequestAnimationFrame"];
    }

    window.requestAnimationFrame || (window.requestAnimationFrame = function (e, t) {
        var n = new Date().getTime(),
            o = Math.max(0, 16 - (n - r)),
            a = window.setTimeout(function () {
                e(n + o);
            }, o);
        return r = n + o, a;
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
        clearTimeout(e);
    });
}(), function (e, t) {
    "function" == typeof define && define.amd ? define([], function () {
        return t(e);
    }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = t(e) : e.SmoothScroll = t(e);
}("undefined" != typeof global ? global : "undefined" != typeof window ? window : void 0, function (q) {
    "use strict";

    var I = {
        ignore: "[data-scroll-ignore]",
        header: null,
        topOnEmptyHash: !0,
        speed: 500,
        speedAsDuration: !1,
        durationMax: null,
        durationMin: null,
        clip: !0,
        offset: 0,
        easing: "easeInOutCubic",
        customEasing: null,
        updateURL: !0,
        popstate: !0,
        emitEvents: !0
    },
        F = function F() {
            var n = {};
            return Array.prototype.forEach.call(arguments, function (e) {
                for (var t in e) {
                    if (!e.hasOwnProperty(t)) return;
                    n[t] = e[t];
                }
            }), n;
        },
        r = function r(e) {
            "#" === e.charAt(0) && (e = e.substr(1));

            for (var t, n = String(e), o = n.length, a = -1, r = "", i = n.charCodeAt(0); ++a < o;) {
                if (0 === (t = n.charCodeAt(a))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
                1 <= t && t <= 31 || 127 == t || 0 === a && 48 <= t && t <= 57 || 1 === a && 48 <= t && t <= 57 && 45 === i ? r += "\\" + t.toString(16) + " " : r += 128 <= t || 45 === t || 95 === t || 48 <= t && t <= 57 || 65 <= t && t <= 90 || 97 <= t && t <= 122 ? n.charAt(a) : "\\" + n.charAt(a);
            }

            return "#" + r;
        },
        L = function L() {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
        },
        x = function x(e) {
            return e ? (t = e, parseInt(q.getComputedStyle(t).height, 10) + e.offsetTop) : 0;
            var t;
        },
        H = function H(e, t, n, o) {
            if (t.emitEvents && "function" == typeof q.CustomEvent) {
                var a = new CustomEvent(e, {
                    bubbles: !0,
                    detail: {
                        anchor: n,
                        toggle: o
                    }
                });
                document.dispatchEvent(a);
            }
        };

    return function (o, e) {
        var A,
            a,
            O,
            C,
            M = {};
        M.cancelScroll = function (e) {
            cancelAnimationFrame(C), C = null, e || H("scrollCancel", A);
        }, M.animateScroll = function (i, c, e) {
            M.cancelScroll();
            var s = F(A || I, e || {}),
                u = "[object Number]" === Object.prototype.toString.call(i),
                t = u || !i.tagName ? null : i;

            if (u || t) {
                var l = q.pageYOffset;
                s.header && !O && (O = document.querySelector(s.header));

                var n,
                    o,
                    a,
                    m,
                    r,
                    d,
                    f,
                    h,
                    p = x(O),
                    g = u ? i : function (e, t, n, o) {
                        var a = 0;
                        if (e.offsetParent) for (; a += e.offsetTop, e = e.offsetParent;) {
                            ;
                        }
                        return a = Math.max(a - t - n, 0), o && (a = Math.min(a, L() - q.innerHeight)), a;
                    }(t, p, parseInt("function" == typeof s.offset ? s.offset(i, c) : s.offset, 10), s.clip),
                    y = g - l,
                    v = L(),
                    w = 0,
                    S = (n = y, a = (o = s).speedAsDuration ? o.speed : Math.abs(n / 1e3 * o.speed), o.durationMax && a > o.durationMax ? o.durationMax : o.durationMin && a < o.durationMin ? o.durationMin : parseInt(a, 10)),
                    E = function E(e, t) {
                        var n,
                            o,
                            a,
                            r = q.pageYOffset;
                        if (e == t || r == t || (l < t && q.innerHeight + r) >= v) return M.cancelScroll(!0), o = t, a = u, 0 === (n = i) && document.body.focus(), a || (n.focus(), document.activeElement !== n && (n.setAttribute("tabindex", "-1"), n.focus(), n.style.outline = "none"), q.scrollTo(0, o)), H("scrollStop", s, i, c), !(C = m = null);
                    },
                    b = function b(e) {
                        var t, n, o;
                        m || (m = e), w += e - m, d = l + y * (n = r = 1 < (r = 0 === S ? 0 : w / S) ? 1 : r, "easeInQuad" === (t = s).easing && (o = n * n), "easeOutQuad" === t.easing && (o = n * (2 - n)), "easeInOutQuad" === t.easing && (o = n < .5 ? 2 * n * n : (4 - 2 * n) * n - 1), "easeInCubic" === t.easing && (o = n * n * n), "easeOutCubic" === t.easing && (o = --n * n * n + 1), "easeInOutCubic" === t.easing && (o = n < .5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1), "easeInQuart" === t.easing && (o = n * n * n * n), "easeOutQuart" === t.easing && (o = 1 - --n * n * n * n), "easeInOutQuart" === t.easing && (o = n < .5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n), "easeInQuint" === t.easing && (o = n * n * n * n * n), "easeOutQuint" === t.easing && (o = 1 + --n * n * n * n * n), "easeInOutQuint" === t.easing && (o = n < .5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n), t.customEasing && (o = t.customEasing(n)), o || n), q.scrollTo(0, Math.floor(d)), E(d, g) || (C = q.requestAnimationFrame(b), m = e);
                    };

                0 === q.pageYOffset && q.scrollTo(0, 0), f = i, h = s, u || history.pushState && h.updateURL && history.pushState({
                    smoothScroll: JSON.stringify(h),
                    anchor: f.id
                }, document.title, f === document.documentElement ? "#top" : "#" + f.id), "matchMedia" in q && q.matchMedia("(prefers-reduced-motion)").matches ? q.scrollTo(0, Math.floor(g)) : (H("scrollStart", s, i, c), M.cancelScroll(!0), q.requestAnimationFrame(b));
            }
        };

        var t = function t(e) {
            if (!e.defaultPrevented && !(0 !== e.button || e.metaKey || e.ctrlKey || e.shiftKey) && "closest" in e.target && (a = e.target.closest(o)) && "a" === a.tagName.toLowerCase() && !e.target.closest(A.ignore) && a.hostname === q.location.hostname && a.pathname === q.location.pathname && /#/.test(a.href)) {
                var t, n;

                try {
                    t = r(decodeURIComponent(a.hash));
                } catch (e) {
                    t = r(a.hash);
                }

                if ("#" === t) {
                    if (!A.topOnEmptyHash) return;
                    n = document.documentElement;
                } else n = document.querySelector(t);

                (n = n || "#top" !== t ? n : document.documentElement) && (e.preventDefault(), function (e) {
                    if (history.replaceState && e.updateURL && !history.state) {
                        var t = q.location.hash;
                        t = t || "", history.replaceState({
                            smoothScroll: JSON.stringify(e),
                            anchor: t || q.pageYOffset
                        }, document.title, t || q.location.href);
                    }
                }(A), M.animateScroll(n, a));
            }
        },
            n = function n(e) {
                if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(A)) {
                    var t = history.state.anchor;
                    "string" == typeof t && t && !(t = document.querySelector(r(history.state.anchor))) || M.animateScroll(t, null, {
                        updateURL: !1
                    });
                }
            };

        M.destroy = function () {
            A && (document.removeEventListener("click", t, !1), q.removeEventListener("popstate", n, !1), M.cancelScroll(), C = O = a = A = null);
        };

        return function () {
            if (!("querySelector" in document && "addEventListener" in q && "requestAnimationFrame" in q && "closest" in q.Element.prototype)) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
            M.destroy(), A = F(I, e || {}), O = A.header ? document.querySelector(A.header) : null, document.addEventListener("click", t, !1), A.updateURL && A.popstate && q.addEventListener("popstate", n, !1);
        }(), M;
    };
});;
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
});;
var link = document.querySelectorAll('._goto-block');

if (link) {
    var blocks = [];

    var _loop7 = function _loop7(_index28) {
        var el = link[_index28];
        var block_name = el.getAttribute('href').replace('#', '');

        if (block_name != '' && !~blocks.indexOf(block_name)) {
            blocks.push(block_name);
        }

        el.addEventListener('click', function (e) {
            if (document.querySelector('.menu__body._active')) {
                menu_close();
                document.querySelector('body').classList.toggle('_lock')
            }

            var target_block_class = el.getAttribute('href').replace('#', '');
            var target_block = document.querySelector('.' + target_block_class);

            _goto(target_block, 300);

            e.preventDefault();
        });
    };

    for (var _index28 = 0; _index28 < link.length; _index28++) {
        _loop7(_index28);
    }

    window.addEventListener('scroll', function (el) {
        var old_current_link = document.querySelectorAll('._goto-block._active');

        if (old_current_link) {
            for (var _index29 = 0; _index29 < old_current_link.length; _index29++) {
                var _el13 = old_current_link[_index29];

                _el13.classList.remove('_active');
            }
        }

        for (var _index30 = 0; _index30 < blocks.length; _index30++) {
            var block = blocks[_index30];
            var block_item = document.querySelector('.' + block);

            if (block_item) {
                var block_offset = offset(block_item).top;
                var block_height = block_item.offsetHeight;

                if (pageYOffset > block_offset - window.innerHeight / 3 && pageYOffset < block_offset + block_height - window.innerHeight / 3) {
                    var current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');

                    for (var _index31 = 0; _index31 < current_links.length; _index31++) {
                        var current_link = current_links[_index31];
                        current_link.classList.add('_active');
                    }
                }
            }
        }
    });
} //ScrollOnClick (Simple)



var goto_links = document.querySelectorAll('._goto');

if (goto_links) {
    var _loop8 = function _loop8(_index32) {
        var goto_link = goto_links[_index32];
        goto_link.addEventListener('click', function (e) {
            var target_block_class = goto_link.getAttribute('href').replace('#', '');
            var target_block = document.querySelector('.' + target_block_class);

            _goto(target_block, 300);

            e.preventDefault();
        });
    };

    for (var _index32 = 0; _index32 < goto_links.length; _index32++) {
        _loop8(_index32);
    }
}


function _goto(target_block, speed) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var header = ''; //OffsetHeader

    header = 'header';
    var options = {
        speedAsDuration: true,
        speed: speed,
        header: header,
        offset: offset
    };
    var scr = new SmoothScroll();
    scr.animateScroll(target_block, '', options);
} //SameFunctions


function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    };
}


function menu_close() {
    var iconMenu = document.querySelector(".icon-menu");
    var menuBody = document.querySelector(".menu__body");
    iconMenu.classList.remove("_active");
    menuBody.classList.remove("_active");
} //=================
//BodyLock;
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
    // Убираем скролл при открытом меню
    document.querySelector('body').classList.toggle('_lock')
    // if (menuBody.classList.contains('_active')) {
    // }
})

// Закрываем меню пользователя при клике мимо самого меню
document.addEventListener('click', function (e) {
    if (!e.target.closest('.user-header')) {
        let user_menu = document.querySelector('.user-header__menu')
        user_menu.classList.remove('_active')
    }
})

;