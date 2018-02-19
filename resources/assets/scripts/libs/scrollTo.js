// We need jQuery
var $ = window.jQuery;

!function(root, factory) {
  "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
  define([], function() {
    return root.scrollTo = factory();
  }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
  // only CommonJS-like environments that support module.exports,
  // like Node.
  module.exports = factory() : root.scrollTo = factory();
}(this, function() {

  let self = {
    options: {
      offset: 30,
      speed: 600, // in ms
    },
    init: function() {
      debug('scrollTo.init');

      this.$el = $('[data-scroll-to]');
      this.$el.each(function(i, el) {
        var $el = $(el),
          selector = $el.attr('data-scroll-to');
        $el.on('click.scrollTo', function(evt) {
          evt.preventDefault();
          self.to(selector);
        });
      });
    },
    to: function(selector) {
      let targetEl;
      let _isTop = (selector === 0);

      if (_isTop) {
          targetEl = document.querySelector('body');
      } else {
          targetEl = $(selector);
      }

      let pos = $(targetEl).offset().top - self.options.offset;

      // Can't be less than zero
      pos = pos < 0 ? 0 : pos;

      $("html, body").animate({
          scrollTop: pos,
      }, self.options.speed);
      return false;
    },
  };

  return self;
});
