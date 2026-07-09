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
            $('html, body').addClass('no-scroll');
        }
        else {
            that.removeClass('open');
            menu.removeClass('open');
            $('html, body').removeClass('no-scroll');
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
        $('html, body').removeClass('no-scroll');
        var block = $(this).attr('href');
        if($(block).length) {
            var offset = $(block).offset().top;
            $('html, body').animate({
                scrollTop: offset
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
        $('html, body').addClass('no-scroll');
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
        $('html, body').removeClass('no-scroll');
        return false;
    });
    $(document).mouseup(function (e) {
		if(!$('.modal-block').is(e.target) && $('.modal-block').has(e.target).length === 0) {
            $('.overlay, .modal').removeClass('show');
            $('html, body').removeClass('no-scroll');
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
                if(checkIntegration == 1) {
                    integration.slideTo(parent.index(), 300);
                    integrationTabs.slideTo(parent.index(), 300);
                }
            }
            return false;
        });
    }

    if($('.cases_wrapper').length) {
        new Swiper('.cases_wrapper', {
            wrapperClass: 'cases_slider',
            slideClass: 'cases_slider-item',
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 12,
            pagination: {
                el: '.cases-dots',
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: '.cases-arrow.right',
                prevEl: '.cases-arrow.left',
            }
        });
    }

    if($('.recognition_item-wrapper').length) {

        const wrapperSwiper = $('.recognition_item-wrapper');
        
        $.each(wrapperSwiper, function (i, element) {
            if(element.querySelectorAll('.recognition_item-slide').length > 1) {
                new Swiper(element, {
                    wrapperClass: 'recognition_item-slider',
                    slideClass: 'recognition_item-slide',
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    pagination: {
                        el: '.recognition-dots',
                        type: 'bullets',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.recognition-arrow.right',
                        prevEl: '.recognition-arrow.left',
                    },
                });
            }
        });
    }

    /*
    if($('.recognition_item-wrapper').length) {
        new Swiper('.recognition_item-wrapper', {
            wrapperClass: 'recognition_item-slider',
            slideClass: 'recognition_item-slide',
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: {
                el: '.recognition-dots',
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: '.recognition-arrow.right',
                prevEl: '.recognition-arrow.left',
            },
        });
    }
    */

    if($('.platform__wrapper').length) {

        let platformTask = new Swiper('.platform__slider', {
            wrapperClass: 'platform__slider-list',
            slideClass: 'platform__slider-item',
            loop: true,
            spaceBetween: 20,
            slidesPerView: 'auto',
            normalizeSlideIndex: false,
            simulateTouch: true,
            slideToClickedSlide: true,
            speed: 300,
            navigation: {
                nextEl: '.platform__arrow-next',
                prevEl: '.platform__arrow-prev',
            },
            // mousewheel: {
            //     enabled: true,
            //     releaseOnEdges: true,
            // },
            on: {
                slideChangeTransitionEnd: function() {
                    let slider = $('.platform__slider .swiper-slide-active').data('slider'),
                        button = $('.platform__wrapper-buttons .link[data-id=' + slider + ']').parent(),
                        current_button_elements = $('.platform__slider .platform__slider-item:not(.swiper-slide-duplicate)[data-slider=' + slider + ']');
                    if(!button.hasClass('active')) {
                        button.addClass('active').siblings().removeClass('active');
                        if(checkPlatformButtons == 1) {
                            platformButtons.slideTo(button.index(), 500);
                        }
                    }
                    current_button_elements.each(function(index) {
                        if($(this).hasClass('swiper-slide-active')) {
                            $('.platform__wrapper-buttons .platform__wrapper-item.active .dots span').eq(index).addClass('active').siblings().removeClass('active');
                        }
                    });
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

        $('.platform__wrapper-buttons .link').on('click', function() {
            
            var that = $(this),
                parent = that.parent();

            if(!parent.hasClass('active')) {

                let id = that.data('id'),
                    next = $('.platform__slider-item[data-slider=' + id + ']').first().index();
                platformTask.slideTo(next, 1500);
                if(checkPlatformButtons == 1) {
                    platformButtons.slideTo(parent.index(), 500);
                }
                $(this).parent().addClass('active').siblings().removeClass('active');
                $(this).parent().find('.dots span').eq(0).addClass('active').siblings().removeClass('active');
            }

            return false;
        });

        $('.platform__wrapper-item').each(function() {
            $(this).find('.dots span').on('click', function() {
                if($(this).hasClass('active')) {
                    return false;
                }
                var that = $(this),
                    id = that.parents('.link').data('id'),
                    index = that.index(),
                    scroll_index = $('.platform__slider-item[data-slider=' + id + ']').eq(index).index();
                that.addClass('active').siblings().removeClass('active');
                
                platformTask.slideTo(scroll_index, 300);
                return false;
            });
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

    $('.phone-mask').inputmask({
        "mask": "+7 (999) 999-9999", 
        "onincomplete": function() {
            $(this).parent().addClass('error');
        },
        "oncomplete": function() {
            $(this).parent().removeClass('error');
        }
    });
    $('.email-mask').inputmask({
        "mask": "*{1,20}@*{1,20}.*{2,6}[.*{1,2}]",
        "greedy": false,
        "onincomplete": function() {
            $(this).parent().addClass('error');
        },
        "oncomplete": function() {
            $(this).parent().removeClass('error');
        },
        definitions: {
            '*': {
                validator: "[.0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]"
            }
        }
    });

    $('#test').on('click', function() {
        var form = $(this).parents('form'),
            wrapper = form.find('.form-wrapper');
            action = form.attr('action'),
            method = form.attr('method'),
            mail_input = $('#sub_email'),
            block_mail = mail_input.parent(),
            mail = mail_input.val().trim();
        block_mail.removeClass('error');
        if(mail == '') {
            block_mail.addClass('error');
        }
        else {
            wrapper.addClass('answer');
            wrapper.find('.res-loader').addClass('show');
            $.ajax({
                type: method,
                url: action,
                data: {f_email: mail},
                success: function(responce) {
                    res = JSON.parse(responce);
                    if(res.active == 'Y') {
                        wrapper.addClass('answer');
                        wrapper.find('.res-success').addClass('show');
                    }
                    if(res.active == 'N') {
                        wrapper.addClass('answer');
                        wrapper.find('.res-error').addClass('show');
                    }
                    mail_input.val('');

                    setTimeout(function() {

                        wrapper.removeClass('answer');
                        wrapper.find('.res-error').removeClass('show');
                        wrapper.find('.res-success').removeClass('show');
                    }, 7000);
                }
            });
        }
        return false;
    });
    
});

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

let platform = null,
    checkPlatform = 0,
    platformButtons = null,
    checkPlatformButtons = 0,
    news = [],
    checkNews = 0,
    integration = null,
    integrationTabs = null,
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

    if($('.for__wrapper').length) {
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
    }

    if($('.news__wrapper').length) {

        const wrapperSwiper = $('.news__wrapper');
        
        if(checkNews == 0 && windowWidth < 1024) {

            $.each(wrapperSwiper, function (i, element) {
                news[i] = new Swiper(element, {
                    wrapperClass: 'news__wrapper-list',
                    slideClass: 'news__wrapper-item',
                    loop: false,
                    simulateTouch: true,
                    spaceBetween: 20,
                    breakpoints: {
                        300: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        600: {
                            slidesPerView: 'auto',
                        }
                    }
                });
            });
            checkNews = 1;
        }
        
        if(checkNews == 1 && windowWidth >= 1024) {
            $.each(news, function(i, item) {
                item.destroy();
            });
            checkNews = 0;
        }
    }

    // if(checkNews == 0 && windowWidth < 1000) {

    //     news = new Swiper('.news__wrapper', {
    //         wrapperClass: 'news__wrapper-list',
    //         slideClass: 'news__wrapper-item',
    //         loop: false,
    //         simulateTouch: true,
    //         spaceBetween: 20,
    //         slidesPerView: 1,
    //         breakpoints: {
    //             300: {
    //                 slidesPerView: 1,
    //             },
    //             700: {
    //                 slidesPerView: 2,
    //             }
    //         }
    //     });
    //     checkNews = 1;
    // }
    // if(checkNews == 1 && windowWidth >= 1000) {
    //     news.destroy();
    //     checkNews = 0;
    // }

    if(checkPlatformButtons == 0 && windowWidth < 1360) {

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
    if(checkPlatformButtons == 1 && windowWidth >= 1360) {
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
        integrationTabs = new Swiper('.integration__tabs', {
            wrapperClass: 'integration__tabs-inner',
            slideClass: 'integration__tabs-tab',
            loop: false,
            spaceBetween: 24,
            slidesPerView: 1,
            normalizeSlideIndex: false,
            on: {
                slideChangeTransitionEnd: function() {
                    let slider = $('.integration__tabs .swiper-slide-active').data('tab'),
                        button = $('.integration__links a[data-id=' + slider + ']').parent();
                        //console.log(integrationTabs.activeIndex)
                    if(!button.hasClass('active')) {
                        button.addClass('active').siblings().removeClass('active');
                        if(checkIntegration == 1 && button.index() >= 0) {
                            integration.slideTo(button.index(), 300);
                        }
                    }
                }
            }
            // init: false,
        });
        checkIntegration = 1;
    }
    if(checkIntegration == 1 && windowWidth >= 1024) {
        integration.destroy();
        integrationTabs.destroy();
        checkIntegration = 0;
    }
}