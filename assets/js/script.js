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

        const platform = new Swiper('.platform__slider', {
            wrapperClass: 'platform__slider-list',
            slideClass: 'platform__slider-item',
            loop: false,
            spaceBetween: 20,
            slidesPerView: 'auto',
            normalizeSlideIndex: false,
            init: false,
        });

        platform.on('slideChange', function() {
            let slider = $('.platform__slider .swiper-slide-active').data('slider'),
                button = $('.platform__wrapper-buttons a[data-id=' + slider + ']').parent();
            if(!button.hasClass('active')) {
                button.addClass('active').siblings().removeClass('active');
            }
        });
        
        platform.init();

        $('.platform__wrapper-buttons a').on('click', function() {
            
            if(!$(this).parent().hasClass('active')) {

                let id = $(this).data('id'),
                    next = $('.platform__slider-item[data-slider=' + id + ']').first().index();
                platform.slideTo(next);
                $(this).parent().addClass('active').siblings().removeClass('active');
            }

            return false;
        });

        // $('.platform__wrapper-tab').first().siblings().removeClass('active');

        // var current_id = $('.platform__wrapper-tab').first().attr('id').replace('tab_', '');

        
    }


    menuScroll();
    $(window).scroll(function() {
        menuScroll();
        $('.search-form').removeClass('open');
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