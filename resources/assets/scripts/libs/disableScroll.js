// We need jQuery
var $ = window.jQuery;

export default {
  /*
    Disable scrolling
  */
  disable(context) {
    debug('disableScroll: disable');

    $('body').on('scroll.disableScroll mousewheel.disableScroll touchmove.disableScroll', function(evt) {

      if(context && $(evt.currentTarget, $(context)).length) {
        return;
      }

      evt.preventDefault();
      evt.stopPropagation();
      return false;
    });
  },
  /*
    Undo Disable scrolling aka enable
  */
  enable() {
    debug('disableScroll: enable');
    $('body').off('scroll.disableScroll mousewheel.disableScroll touchmove.disableScroll');
  },
}
