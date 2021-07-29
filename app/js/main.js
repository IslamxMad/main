window.addEventListener('DOMContentLoaded', () => {


    //aos.js initialization
    AOS.init();



    //For testing webp avilable
    function testWebP(callback) {

        var webP = new Image();
        webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
        
    testWebP(function (support) {
        
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        }else{
            document.querySelector('body').classList.add('no-webp');
        }
    });


    //Toggle header when scroll

    const header = document.querySelector('.header');

    function headerBgToggler() {
        if (document.documentElement.scrollTop > 40) {
            header.classList.add('header-show');
        }
        if(document.documentElement.scrollTop <= 40 && header.classList.contains('header-show')) {
            header.classList.remove('header-show');
        }
    }

    window.addEventListener('scroll', headerBgToggler);


    //Teachers slider
    $('.teachers__content_slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        prevArrow: false,
        nextArrow: false
    });


    //Counter

    let show = true;
    let countbox = ".counter__content";

    function counter() {
        $(window).on("scroll load resize", function () {
            if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
            let w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
            let e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
            let w_height = $(window).height(); // Высота окна браузера
            let d_height = $(document).height(); // Высота всего документа
            let e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
            if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
                $('.counter__content_element_text').css('opacity', '1');
                $('.counter__content_element_text').spincrement({
                    thousandSeparator: "",
                    duration: 4000
                });
                 
                show = false;
            }
        });
    }

    counter();




    












    
})