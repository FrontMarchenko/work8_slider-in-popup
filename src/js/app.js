
import sayHello from './lib/sayHello.js';

sayHello();
import 'slick-carousel';

$('.tab').on('click', function() {
  clickTab($(this));
  return false;
});

$('.js-slider').slick({
  slidesToShow: 2,
  rows: 0
});

$('.slides-more').on('click', function(e) {
  setModalSlider($(this));
  showModal();
  return false;
});

$('.modal-close').on('click', function(e) {
  hideModal();
  unsetModalSlider();
});

$('.modal-wrap').on('click', function(e) {
  if ($(e.target).closest('.modal').length) {
    return;
  };
  hideModal();
  unsetModalSlider();
});

$('.modal-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
  refreshModalCounter(nextSlide);
});
function showModal() {
  
  $('.modal-wrap').addClass('is-visible');
};

function hideModal() {
  $('.modal-wrap').removeClass('is-visible');
};
//clone slide
function setModalSlider(modalBtn) {
  let current = modalBtn.parent().data('slick-index');
  let slides = modalBtn.parents('.slick-track').children().not('.slick-cloned');
  let total = slides.length;
  // if (current >= total) {
  //   current = current - total;
  // }else {
  //   current === current;
  // }
  current = (current >= total) ? current - total : current;
  let modalSlider = $('.modal-slider');

  slides.each(function(i,e) {
    let slide = $(e).clone().addClass('js-modal');
    let imgTab = slide.find('.slides-img').not('.only-modal').remove();
    let imgModal = slide.find('.slides-img.only-modal');
    imgModal.attr('src', imgModal.data('modal-src'));

    modalSlider.append(slide);
  });

  modalSlider.slick({
    fade: true,
    rows: 0,
    initialSlide: current,
  });

  setModalCounter(current, total);
};

function unsetModalSlider() {
  let modalSlider = $('.modal-slider');
  modalSlider.slick('unslick');
  modalSlider.empty();
};

function setModalCounter(current, total) {
  let counter = $('.modal-slides-counter');
  counter.children('.js-current').text(++current);
  counter.children('.js-total').text(total);
};

function refreshModalCounter(current) {
  let counter = $('.modal-slides-counter');
  counter.children('.js-current').text(++current);
};

function clickTab(tab) {
  if (tab.hasClass('tab')) {
    var id = tab.attr('href');
    tab.addClass('is-active')
      .siblings().removeClass('is-active');
    $(id).addClass('is-visible')
      .siblings().removeClass('is-visible');
  } 
};


