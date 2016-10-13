'use strict';

var APP = function () {
  var domMap = {};

  var setupDomMap = function setupDomMap() {
    domMap.mainWrapper = $('.wrapper--main');
    domMap.sliders = $('.c-slider');
    domMap.slidesCount = $('.slidesCount');
    domMap.currentSlide = $('.currentSlide');
    domMap.menuBtn = $('.website-nav__drawer');
    domMap.slideImg = $('.c-slider__slide_img');
    domMap.playVid = $('.playVid');
    domMap.loop = $('.intro-loop');
  };

  var closeMenu = function closeMenu() {
    domMap.mainWrapper.removeClass('js-menuIsActive');
  };

  var openMenu = function openMenu() {
    domMap.mainWrapper.addClass('js-menuIsActive');
  };

  var onMenuBtnClick = function onMenuBtnClick() {
    if (domMap.mainWrapper.hasClass('js-menuIsActive')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  var initSliders = function initSliders() {
    var count = domMap.sliders.find('.c-slider__slide').length;

    if (count < 10) {
      domMap.slidesCount.text('0' + count);
    } else {
      domMap.slidesCount.text(count);
    }

    if (count <= 1) {
      return;
    }
    domMap.sliders.slick({
      dots: false,
      infinite: true,
      speed: 500,
      nextArrow: $('.c-slider__nav__item--dir--next'),
      prevArrow: $('.c-slider__nav__item--back'),
      swipe: true,
      accessibility: true,
      adaptiveHeight: true
    }).on('afterChange', function (event, slick, currentSlide, nextSlide) {
      var curr = currentSlide + 1;
      if (curr > 0 && curr < 10) {
        domMap.currentSlide.text('0' + (currentSlide + 1));
      } else {
        domMap.currentSlide.text('' + (currentSlide + 1));
      }
    });
    domMap.currentSlide.text('0' + (domMap.sliders.slick('slickCurrentSlide') + 1));
  };

  var onPlayVid = function onPlayVid(evt) {
    var classes = evt.currentTarget.classList;
    var vid = $('.c-slider__slide_video')[0];
    if (!classes.contains('playing')) {
      vid.play();
      classes.add('playing');
    } else {
      vid.pause();
      classes.remove('playing');
    }
    vid.onended = function () {
      classes.remove('playing');
    };
  };

  var initModule = function initModule() {
    setupDomMap();
    initSliders();
    if (document.body.classList.contains('front')) {
      domMap.loop[0].play();
    }
    // const body = document.body;
    // let loaded = false;

    // function hideLoader() {
    //   if (loaded) {
    //     return;
    //   }
    //   loaded = true;
    //   body.classList.remove('loading');
    //   domMap.loop[0].play();
    // }

    // if (body.classList.contains('front')) {
    //   body.classList.add('loading');
    //   domMap.loop[0].onloadedmetadata = () => {
    //     hideLoader();
    //   };
    //   domMap.loop[0].onloadeddata = () => {
    //     hideLoader();
    //   };
    //   domMap.loop[0].onreadystatechange = () => {
    //     if (domMap.loop[0].readyState === 4) {
    //       hideLoader();
    //     }
    //   };
    // }

    domMap.menuBtn.on('click', onMenuBtnClick);
    domMap.playVid.on('click', onPlayVid);
  };

  return {
    initModule: initModule
  };
}();

APP.initModule();