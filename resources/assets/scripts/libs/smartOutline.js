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

  var self = {
    defaults: {
      debug: false,
      domId: 'smartOutline',
      hideFocusCSS: '*:focus {outline:0 !important;}::-moz-focus-inner{border:0;}',
      keycodes: [
        { name: 'tab', code: 9 },
        { name: 'space', code: 32 },
        { name: 'left', code: 37 },
        { name: 'up', code: 38 },
        { name: 'right', code: 39 },
        { name: 'down', code: 40 },
      ],
    },
    init(opts) {
      self._ = {};
      self._options = $.extend(self.defaults, opts);

      debug('smartOutline.init: start', self._options);

      // Bind mouse detection
      window.addEventListener('mousemove', self.mouseListener);

      // Build <style> tag in HEAD
      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.id = self._options.domId;
      style.type = 'text/css';

      // Maybe there's no head
      if(!head)
        return false;

      return head.appendChild(style);
    },
    mouseListener() {
      debug('smartOutline.mouseListener: Triggered');


      self.setCSS(self._options.hideFocusCSS);
      $('html').removeClass('outline-enabled').addClass('outline-disabled');
      window.removeEventListener('mousemove', self.mouseListener, false);
      window.addEventListener('keydown', self.keyboardListener); // eslint-disable-line
    },
    keyboardListener(evt) {
      debug('smartOutline.keyboardListener: Triggered');

      // only remove the outline if the user is using one of the keyboard
      // navigation keys
      if(self._options.keycodes.findIndex(obj => obj.code === evt.keyCode) === -1) {
        return;
      }

      self.setCSS('');
      $('html').removeClass('outline-disabled').addClass('outline-enabled');
      window.removeEventListener('keydown', self.keyboardListener, false);
      window.addEventListener('mousemove', self.mouseListener);
    },
    getStyleEl() {
      return document.getElementById(self._options.domId);
    },
    setCSS(css) {
      self.getStyleEl().innerHTML = css;
    },
    destroy() {
      debug('smartOutline.destroy: Triggered');

      var el = self.getStyleEl();
      if(el) {
        var head = document.head || document.getElementsByTagName('head')[0];
        head.removeChild(el);

        window.removeEventListener('keydown', self.keyboardListener, false);
        window.removeEventListener('mousemove', self.mouseListener, false);
      }
    },
  };

  return self;
});
