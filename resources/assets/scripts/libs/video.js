// @see - https://css-tricks.com/NetMag/FluidWidthVideo/demo.php
// We need jQuery
var $ = window.jQuery;

!function(root, factory) {
  "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
  define([], function() {
    return root.urlParams = factory();
  }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
  // only CommonJS-like environments that support module.exports,
  // like Node.
  module.exports = factory() : root.urlParams = factory();
}(this, function() {

  let self = {
    init() {
      self.$videos = $('.video-wrapper');

      self.$videos.each(function(i, el) {
        self.initVideo(el);
      });
    },
    initVideo(el) {
      var $el = $(el),
        $video = $('iframe, object, embed', $el),
        aspectRatio = $video[0].height / $video[0].width;

      $video
        .removeAttr('height')
        .removeAttr('width');

      // Use a throttled resize if plugin exists
      let resize = 'resize';
      if(typeof $.fn.onResize !== 'undefined') {
        resize = 'onResize';
      }

      $(window)[resize](function() {

        var newWidth = $el.width(),
          newHeight = newWidth * aspectRatio;

        $video
          .width(newWidth)
          .height(newHeight);

      }).resize();
    },
  };

  return self;
});
