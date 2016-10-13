const APP = (() => {
  const domMap = {};

  const setupDomMap = () => {
    domMap.mainWrapper = $('.wrapper--main');
    domMap.sliders = $('.c-slider');
    domMap.slidesCount = $('.slidesCount');
    domMap.currentSlide = $('.currentSlide');
    domMap.menuBtn = $('.website-nav__drawer');
    domMap.slideImg = $('.c-slider__slide_img');
    domMap.playVid = $('.playVid');
    domMap.loop = $('.intro-loop');
  };

  const closeMenu = () => {
    domMap.mainWrapper.removeClass('js-menuIsActive');
  };

  const openMenu = () => {
    domMap.mainWrapper.addClass('js-menuIsActive');
  };

  const onMenuBtnClick = () => {
    if (domMap.mainWrapper.hasClass('js-menuIsActive')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const initSliders = () => {
    const count = domMap.sliders.find('.c-slider__slide').length;

    if (count < 10) {
      domMap.slidesCount.text(`0${count}`);
    } else {
      domMap.slidesCount.text(count);
    }

    if (count <= 1) {
      return;
    }
    domMap.sliders.slick({
      lazyLoad: 'progressive',
      dots: false,
      infinite: true,
      speed: 500,
      nextArrow: $('.c-slider__nav__item--dir--next'),
      prevArrow: $('.c-slider__nav__item--back'),
      swipe: true,
      accessibility: true,
      adaptiveHeight: true,
    }).on('afterChange', (event, slick, currentSlide) => {
      const curr = currentSlide + 1;
      if (curr > 0 && curr < 10) {
        domMap.currentSlide.text(`0${currentSlide + 1}`);
      } else {
        domMap.currentSlide.text(`${currentSlide + 1}`);
      }
    });
    domMap.currentSlide.text(`0${domMap.sliders.slick('slickCurrentSlide') + 1}`);
  };

  const onPlayVid = (evt) => {
    const classes = evt.currentTarget.classList;
    const vid = $('.c-slider__slide_video')[0];
    if (!classes.contains('playing')) {
      vid.play();
      classes.add('playing');
    } else {
      vid.pause();
      classes.remove('playing');
    }
    vid.onended = () => {
      classes.remove('playing');
    };
  };

  const initModule = () => {
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
    initModule,
  };
})();

APP.initModule();
