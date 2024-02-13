"use strict";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ПРОКРУТКА, ШАПКА
var headerLogic = function headerLogic() {
  var header = document.querySelector('.header');
  var gamburger = document.querySelector('.burger');
  gamburger.addEventListener('click', function () {
    this.classList.toggle('is-open');
    document.querySelector('.menu').classList.toggle('is-open');
  });
  $('.menu__link').click(function () {
    document.querySelector('.menu').classList.toggle('is-open');
    gamburger.classList.toggle('is-open');
    var scroll_elem = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(scroll_elem).offset().top
    }, 1000);
  });

  function headerActiveToggle() {
    var scrollSize = window.pageYOffset;
    scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active');
  }

  window.addEventListener('load', headerActiveToggle); // ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ ЕСЛИ СТРАНИЦА УЖЕ ПРОСКРОЛЛЕНА

  window.addEventListener('scroll', headerActiveToggle); // ПРИ СКРОЛЛЕ
}; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)


var inputMask = function inputMask() {
  $(".js-maskPhone").inputmask({
    mask: "+7 999 999 99 99",
    clearIncomplete: true
  });
  $('.email').inputmask({
    mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
    clearIncomplete: true //     greedy: false,
    //     onBeforePaste: function (pastedValue, opts) {
    //         pastedValue = pastedValue.toLowerCase();
    //         return pastedValue.replace("mailto:", "");
    //     },
    //     definitions: {
    //         '*': {
    //             validator: "[0-9A-Za-z-а-я-]",
    //             casing: "lower"
    //         }
    //     }

  });
  $(".js-maskDate").inputmask({
    mask: "99/99/9999",
    clearIncomplete: true,
    'placeholder': 'dd/mm/yyyy'
  });
}; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 


var sliders = function sliders() {
  var swiper = new Swiper('.js-sliderCatalog', {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.catalog__pagination',
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      }
    }
  });
  var swiper2 = new Swiper('.js-sliderGallery', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".js-galleryNext",
      prevEl: ".js-galleryPrev"
    },
    breakpoints: {
      768: {
        slidesPerView: 3
      }
    }
  });
}; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ АККОРДЕОН


var accordeons = function accordeons(box, item, header, content, openedClass, closedClass) {
  var accordeon = document.querySelector(box);
  var accItem = accordeon.querySelectorAll(item);
  accItem.forEach(function (item) {
    // перебираем все блоки аккордеона
    var accContent = item.querySelector(content);
    accContent.style.cssText = "\n        overflow: hidden;\n        transition: all .3s;\n      ";
    item.className = closedClass;
    accContent.style.maxHeight = 0;
    item.addEventListener('click', toggle);
  });
  accItem[0].className = openedClass;
  accItem[0].querySelector(content).style.maxHeight = accItem[0].querySelector(content).scrollHeight + 'px';

  function toggle(e) {
    var target = e.target;
    e.preventDefault();
    var thisClass = this.className;
    var itsAccHeader = target == this.querySelector(header) || this.querySelector(header).contains(target);
    var accHeader = this.querySelector(header);
    var accContent = this.querySelector(content);
    accItem.forEach(function (item) {
      var accHeader = item.querySelector(header);
      var accContent = item.querySelector(content);

      if (itsAccHeader) {
        item.className = closedClass;
        accContent.style.maxHeight = 0;
      }
    });

    if (thisClass == closedClass) {
      this.className = openedClass;
      this.querySelector(content).style.maxHeight = this.querySelector(content).scrollHeight + 'px';
    }
  }
}; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)


var map = function map() {
  setTimeout(function () {
    var headID = document.getElementsByTagName("body")[0];
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    headID.appendChild(newScript);
  }, 3000);
  setTimeout(function () {
    var myMap = new ymaps.Map("map", {
      center: [55.917879, 37.806326],
      zoom: 13,
      controls: ['smallMapDefaultSet']
    }, {
      searchControlProvider: 'yandex#search'
    });
    myGeoObject = new ymaps.GeoObject({
      geometry: {
        type: "Point"
      }
    });
    myMap.geoObjects.add(myGeoObject).add(new ymaps.Placemark([55.917879, 37.806326], {
      balloonContent: '<strong></strong>',
      iconCaption: 'М.О., г. Королев, ул. Ленина 12'
    }, {
      preset: 'islands#blueCircleDotIconWithCaption',
      iconCaptionMaxWidth: '200'
    }));
    myMap.setType('yandex#publicMap');
    myMap.behaviors.disable('scrollZoom'); //на мобильных устройствах... (проверяем по userAgent браузера)

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      //... отключаем перетаскивание карты
      myMap.behaviors.disable('drag');
    }
  }, 4000);
}; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ INIT


headerLogic();
sliders();
accordeons('.faq', '.faq__item', '.faq__title', '.faq__content', 'faq__item opened', 'faq__item closed');
accordeons('.faq-2', '.faq__item', '.faq__title', '.faq__content', 'faq__item opened', 'faq__item closed'); // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~