$(document).ready(function() {

    const splide1 = new Splide( '#companies__slider_1', {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        autoWidth: true,
        arrows: false,
        pagination: false,
        autoScroll: {
            speed: 1,
        },
    });
    splide1.mount(window.splide.Extensions);
    const splide2 = new Splide( '#companies__slider_2', {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        autoWidth: true,
        arrows: false,
        pagination: false,
        autoScroll: {
            speed: -1,
        },
    });
    splide2.mount(window.splide.Extensions);

    

    $('.opensearch').on('click', function() {
        $('.search-form').addClass('open');
        $('.search-form').find('input').focus();
        return false;
    });
    $('.closesearch').on('click', function() {
        $('.search-form').removeClass('open');
        return false;
    });
    $(document).mouseup(function (e) {
        let search = $('.search-form');
		if(
            !search.is(e.target) && 
            search.has(e.target).length === 0
        ) {
            search.removeClass('open');
		}
    });



    $('.parent > a').on('click', function() {
        let parent = $(this).parent();
        if(!parent.hasClass('open')) {
            parent.addClass('open').siblings().removeClass('open');
        }
        else {
            parent.removeClass('open');
        }
        return false;
    });
    $(document).mouseup(function(e) {
        let child = $('.parent ul'),
            parent = child.parent();

		if(
            !child.is(e.target) && 
            child.has(e.target).length === 0 && 
            !$(e.target).parent().hasClass('open')
        ) {
            parent.removeClass('open');
		}
        return false;
    });


    blocksResize();
    $(window).on('resize', function() {
        blocksResize();
    });
    
    menuScroll();
    $(window).on('scroll', function() {
        menuScroll();
        $('.search-form').removeClass('open');
        $('.parent').removeClass('open');
    });


    if($('.integration').length) {
        $('.integration__links-item a').on('click', function() {
            var that = $(this),
                id = that.data('id'),
                parent = that.parent();
            if(!parent.hasClass('avtive')) {
                parent.addClass('active').siblings().removeClass('active');
                $('#integration_tab_' + id).addClass('active').siblings().removeClass('active');
            }
            return false;
        });
    }

    if($('.platform__wrapper').length) {

        let platformTask = new Swiper('.platform__slider', {
            wrapperClass: 'platform__slider-list',
            slideClass: 'platform__slider-item',
            loop: false,
            spaceBetween: 20,
            slidesPerView: 'auto',
            normalizeSlideIndex: false,
            init: false,
        });

        platformTask.on('slideChange', function() {
            let slider = $('.platform__slider .swiper-slide-active').data('slider'),
                button = $('.platform__wrapper-buttons a[data-id=' + slider + ']').parent();
            if(!button.hasClass('active')) {
                button.addClass('active').siblings().removeClass('active');
                platformButtons.slideTo(button.index());
            }
        });
        
        setTimeout(function() {
            platformTask.init();
        }, 100);

        $('.platform__wrapper-buttons a').on('click', function() {
            
            var that = $(this),
                parent = that.parent();

            if(!parent.hasClass('active')) {

                let id = that.data('id'),
                    next = $('.platform__slider-item[data-slider=' + id + ']').first().index();
                platformTask.slideTo(next, 1000);
                
                platformButtons.slideTo(parent.index(), 300);
                $(this).parent().addClass('active').siblings().removeClass('active');
            }

            return false;
        });
    }
});

let platform = null,
    checkPlatform = 0,
    platformButtons = null,
    checkPlatformButtons = 0,
    news = null,
    checkNews = 0,
    integration = null,
    checkIntegration = 0;

function blocksResize() {

    let windowWidth = $(window).width();

    if(checkPlatform == 0 && windowWidth < 1000) {

        platform = new Swiper('.for__wrapper', {
            wrapperClass: 'for__wrapper-list',
            slideClass: 'for__wrapper-item',
            loop: false,
            spaceBetween: 20,
            slidesPerView: 'auto',
            normalizeSlideIndex: false,
        });
        checkPlatform = 1;
    }
    if(checkPlatform == 1 && windowWidth >= 1000) {
        platform.destroy();
        checkPlatform = 0;
    }

    if(checkNews == 0 && windowWidth < 1000) {

        news = new Swiper('.news__wrapper', {
            wrapperClass: 'news__wrapper-list',
            slideClass: 'news__wrapper-item',
            loop: false,
            simulateTouch: true,
            spaceBetween: 20,
            slidesPerView: 1,
            breakpoints: {
                300: {
                    slidesPerView: 1,
                },
                700: {
                    slidesPerView: 2,
                }
            }
        });
        checkNews = 1;
    }
    if(checkNews == 1 && windowWidth >= 1000) {
        news.destroy();
        checkNews = 0;
    }

    if(checkPlatformButtons == 0 && windowWidth < 1024) {

        platformButtons = new Swiper('.platform__wrapper-buttons', {
            wrapperClass: 'platform__wrapper-list',
            slideClass: 'platform__wrapper-item',
            loop: false,
            spaceBetween: 20,
            slidesPerView: 'auto',
            normalizeSlideIndex: false,
            //centeredSlides: true, // ?
        });
        checkPlatformButtons = 1;
    }
    if(checkPlatformButtons == 1 && windowWidth >= 1024) {
        platformButtons.destroy();
        checkPlatformButtons = 0;
    }

    if(checkIntegration == 0 && windowWidth < 1024) {

        integration = new Swiper('.integration__links', {
            wrapperClass: 'integration__links-list',
            slideClass: 'integration__links-item',
            loop: false,
            spaceBetween: 20,
            slidesPerView: 'auto',
            normalizeSlideIndex: false,
        });
        checkIntegration = 1;
    }
    if(checkIntegration == 1 && windowWidth >= 1024) {
        integration.destroy();
        checkIntegration = 0;
    }
}

function menuScroll() {
    
    if(!$('.header').hasClass('active')) {
        if($(window).scrollTop() > ($('.header .top').height() + 8)) {
            $('.header').addClass('scroll');
        }
        else {
            $('.header').removeClass('scroll');
        }
    }
}