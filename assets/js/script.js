$(document).ready(function() {

    $('.clearsearch').on('click', function() {
        $(this).parent().find('input[name=q]').val('');
        return false;
    });

    $('.openmenu').on('click', function() {
        var that = $(this),
            menu = $('.mobilemenu'),
            fixedmenu = document.querySelector('.fixedmenu'),
            fm_top = fixedmenu.getBoundingClientRect().top,
            fm_height = fixedmenu.offsetHeight,
            top = fm_top + fm_height;

        if(!that.hasClass('open')) {
            that.addClass('open');
            menu.css({'top': top + 'px'}).addClass('open');
            $('body').addClass('no-scroll');
        }
        else {
            that.removeClass('open');
            menu.removeClass('open');
            $('body').removeClass('no-scroll');
        }
        return false;
    });
    

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

    $('.go-to').click(function() {

        $('.mobilemenu').removeClass('active');
        $('.navigation ul').removeClass('open');
        $('body').removeClass('no-scroll');
        var block = $(this).attr('href');
        
        if($(block).length) {
            var offset = $(block).offset().top;
            $('html, body').animate({
                scrollTop: offset + 'px'
            }, {
                duration: 500,
                easing: 'swing'
            });
        }
        else {
            window.location.href = '/' + block;
        }
        return false;
    });

    $('.opensidebar').on('click', function() {
        let that = $(this),
            sidebar = $('.sidebar');
        if(that.hasClass('open')) {
            that.removeClass('open');
            sidebar.removeClass('open');
        }
        else {
            that.addClass('open');
            sidebar.addClass('open');
        }
        return false;
    });

    $('.openmodal').on('click', function() {
        let that = $(this),
            modal = that.data('modal');
        $('.overlay').addClass('show');
        $('body').addClass('no-scroll');
        $('#' + modal).addClass('show');
        if(modal == 'video') {
            var videourl = that.attr('href');
            var videocontainer = '#videocontainer';
            var parameter = new Date().getMilliseconds();
            var video = '<video width="1280" id="intro-video" autoplay loop src="' + videourl + '?t=' + parameter + '"></video>';
            $(videocontainer).append(video);
            videl = $(document).find('#intro-video')[0];
            videl.load();

            //$('#' + modal).find('source').attr('src', video);
        }
        return false;
    });
    $('.closemodal').on('click', function() {
        $('#video source').attr('src', '');
        $('.overlay, .modal-block').removeClass('show');
        $('body').removeClass('no-scroll');
        return false;
    });
    $(document).mouseup(function (e) {
		if(!$('.modal-block').is(e.target) && $('.modal-block').has(e.target).length === 0) {
            $('.overlay, .modal').removeClass('show');
            $('body').removeClass('no-scroll');
		}
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

        let platformButtons = new Swiper('.platform__wrapper-buttons', {
            wrapperClass: 'platform__wrapper-list',
            slideClass: 'platform__wrapper-item',
            loop: false,
            spaceBetween: 8,
            slidesPerView: 'auto',
            // normalizeSlideIndex: false,
            direction: 'horizontal',
            breakpoints: {
                1024: {
                    direction: 'vertical',
                }
            }
            //centeredSlides: true, // ?
        });

        let platformTask = new Swiper('.platform__slider', {
            wrapperClass: 'platform__slider-list',
            slideClass: 'platform__slider-item',
            loop: true,
            spaceBetween: 20,
            slidesPerView: 'auto',
            normalizeSlideIndex: false,
            simulateTouch: true,
            slideToClickedSlide: true,
            // mousewheel: {
            //     enabled: true,
            //     releaseOnEdges: true,
            // },
            on: {
                slideChangeTransitionEnd: function() {
                    let slider = $('.platform__slider .swiper-slide-active').data('slider'),
                        button = $('.platform__wrapper-buttons a[data-id=' + slider + ']').parent();
                    if(!button.hasClass('active')) {
                        button.addClass('active').siblings().removeClass('active');
                        if(platformButtons) {
                            platformButtons.slideTo(button.index(), 500);
                        }
                    }
                }
            }
            // init: false,
        });

        // platformTask.on('slideChangeTransitionEnd', function() {
        //     let slider = $('.platform__slider .swiper-slide-active').data('slider'),
        //         button = $('.platform__wrapper-buttons a[data-id=' + slider + ']').parent();
        //     if(!button.hasClass('active')) {
        //         button.addClass('active').siblings().removeClass('active');
        //         if(platformButtons) {
        //             platformButtons.slideTo(button.index());
        //         }
        //     }
        // });
        
        // platformTask.init();

        $('.platform__wrapper-buttons a').on('click', function() {
            
            var that = $(this),
                parent = that.parent();

            if(!parent.hasClass('active')) {

                let id = that.data('id'),
                    next = $('.platform__slider-item[data-slider=' + id + ']').first().index();
                platformTask.slideTo(next, 1500);
                if(platformButtons) {
                    platformButtons.slideTo(parent.index(), 500);
                }
                $(this).parent().addClass('active').siblings().removeClass('active');
            }

            return false;
        });
    }

    if($('.splide').length) {
        var splide = [];
        $('.splide').each(function(i, el) {
            if(i % 2 == 0) {
                var speed = 0.6;
            }
            else {
                var speed = -0.6;
            }
            splide[i] = new Splide(el, {
                type: 'loop',
                drag: 'free',
                focus: 'center',
                autoWidth: true,
                arrows: false,
                pagination: false,
                autoScroll: {
                    speed: speed,
                },
            });
            splide[i].mount(window.splide.Extensions);
        });
    }

    if($('#map').length) {

        var myMap;
        var zoom = $('#map').data('zoom');
        var coords = $('#map').data('center').split(',');

        function init() {

            if (!myMap) {

                myMap = new ymaps.Map('map', {
                    center: [coords[0], coords[1]],
                    zoom: zoom,
                    controls: ['smallMapDefaultSet']
                });	
                yellowCollection = new ymaps.GeoObjectCollection(null, {
                    preset: 'islands#yellowIcon'
                });
                myMap.geoObjects.add(yellowCollection);
                
                placemark = new ymaps.Placemark([coords[0], coords[1]]);

                placemark.options.set({
                    hideIcon: false, 
                    iconLayout: 'default#image',
                    iconImageHref: '/local/templates/.default/assets/images/place.svg',
                    hideIconOnBalloonOpen: false,
                    iconImageSize: [46, 59],
                    balloonOffset: [0, 0],
                    iconImageOffset: [-23, -59],
                    balloonPane: 'outerBalloon',
                });

                yellowCollection.add(placemark);
                
                myMap.behaviors.disable('scrollZoom');
                myMap.behaviors.disable('drag');
            }
        }
        ymaps.ready(init);
    }
    
});

let platform = null,
    checkPlatform = 0,
    // platformButtons = null,
    // checkPlatformButtons = 0,
    news = null,
    checkNews = 0,
    integration = null,
    checkIntegration = 0;

function blocksResize() {

    let windowWidth = $(window).width();

    var dots = $('.pagination .dots');
    if(windowWidth < 500) {
        dots.prev().hide();
        dots.next().hide();
    }
    else {
        dots.prev().show();
        dots.next().show();
    }

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

    // if(checkPlatformButtons == 0 && windowWidth < 1024) {

    //     platformButtons = new Swiper('.platform__wrapper-buttons', {
    //         wrapperClass: 'platform__wrapper-list',
    //         slideClass: 'platform__wrapper-item',
    //         loop: false,
    //         spaceBetween: 20,
    //         slidesPerView: 'auto',
    //         normalizeSlideIndex: false,
    //         //centeredSlides: true, // ?
    //     });
    //     checkPlatformButtons = 1;
    // }
    // if(checkPlatformButtons == 1 && windowWidth >= 1024) {
    //     platformButtons.destroy();
    //     checkPlatformButtons = 0;
    // }

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