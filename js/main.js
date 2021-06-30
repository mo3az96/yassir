$(window).on('load', function () {
    var padding = $('header').outerHeight();
    $("body").css("padding-top", padding);
});
$(document).ready(function () {
    new WOW().init();

    if ($(this).scrollTop() >= 50) {
        $("header").addClass("header-scroll");
    } else {
        $("header").removeClass("header-scroll");
    }
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 50) {
            $("header").addClass("header-scroll");
        } else {
            $("header").removeClass("header-scroll");
        }
    });
    //////////** main slider **//////////
    var mainswiper = new Swiper('.main-slider .swiper-container', {
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.main-slider .swiper-pagination',
            clickable: true,
        },
    });
    //////////** services slider **//////////
    var serviceswiper = new Swiper('.services-slider .swiper-container', {
        pagination: {
            el: '.services-slider .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1200: {
                spaceBetween: 45,
                slidesPerView: 3,
            },
        },
    });
    //////////** scroll to section **//////////
    $(document).on("scroll", onScroll);
    $('.header a[data-href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = $(this).attr("data-href")
        menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 30
        }, 500, 'swing', function () {
            $(document).on("scroll", onScroll);
        });
        if ($(window).width() <= 991) {
            $("nav").slideUp(500);
            $("body").removeClass("overflow");
            $('.menu-btn').removeClass("active");
        }
    });
    //////////** numbers animate **//////////
    var a = 0;
    $(window).scroll(function () {
        if (a === 0 && $(this).scrollTop() >= ($(".about-states").offset().top) - 900) {
            $('.item-number').each(function () {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
            a = 1
        }
    });
    //////////** feats slider **//////////
    if ($(window).width() <= 767) {
        $(".feat-item").wrap("<div class='swiper-slide'></div>");
        $(".feats-content").addClass("swiper-wrapper").removeClass("feats-content");

        var featswiper = new Swiper('.feats-slider .swiper-container', {
            spaceBetween: 10,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.feats-slider .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }
    //////////** Menu **//////////
    if ($(window).width() <= 1199) {
        $('.menu-btn').click(function () {
            $("nav").slideToggle(500);
            $("body").toggleClass("overflow");
            $(".lang-cont").fadeToggle(500);
            $(this).toggleClass("active");
        });
    }
    //////////** arrow top **//////////
    $(window).scroll(function () {
        $(this).scrollTop() >= 500 ? $(".arrow-top").fadeIn(500) : $(".arrow-top").fadeOut(500);
    });
    $(".arrow-top").click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 1500);
    });
    lazyLoad();
});

function lazyLoad() {
    const images = document.querySelectorAll('.lazy-img');

    const optionsLazyLoad = {
        //  rootMargin: '-50px',
        // threshold: 1
    }

    const imageObserver = new IntersectionObserver(function (enteries) {
        enteries.forEach(function (entery) {
            if (!entery.isIntersecting) {
                return;
            } else {
                preloadImage(entery.target);
                imageObserver.unobserve(entery.target);
            }
        });

    }, optionsLazyLoad);

    images.forEach(function (image) {
        imageObserver.observe(image)
    });
}

function preloadImage(img) {
    img.src = img.getAttribute('data-src');
    img.onload = function () {
        img.parentElement.classList.remove('loading-img');
        img.parentElement.classList.add("loaded-img");
        img.parentElement.parentElement.classList.add("lazy-head-img");
    }
}

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.header a[data-href^="#"]').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("data-href"));
        var refoffset = $(currLink.attr("data-href")).position().top - 120;
        if (refoffset <= scrollPos && refoffset + refElement.height() + 240 > scrollPos) {
            $('.header .nav-item>a').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
}