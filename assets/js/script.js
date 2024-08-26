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
    if($('.platform__wrapper-tab').length) {
        var platform = [];
        $('.platform__slider').each(function(i, element) {
            
            var id = $(element).parent().attr('id').replace('tab_', '');

            platform[id] = new Swiper(element, {
                wrapperClass: 'platform__slider-list',
                slideClass: 'platform__slider-item',
                loop: false,
                spaceBetween: 20,
                slidesPerView: 'auto',
                normalizeSlideIndex: false
            });
        });
        
        $('.platform__wrapper-tab').first().siblings().removeClass('active');

        var current_id = $('.platform__wrapper-tab').first().attr('id').replace('tab_', '');

        platform[current_id].update();
        $('.platform__wrapper-buttons a').on('click', function() {
            var that = $(this),
                tab = that.data('id'),
                li = that.parent();
            li.addClass('active').siblings().removeClass('active');
            $('#tab_' + tab).addClass('active').siblings().removeClass('active');
            
            platform[tab].update();
            platform[tab].slideTo(0, 0);
            
            return false;
        });
    }


    menuScroll();
    $(window).scroll(function() {
        menuScroll();
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