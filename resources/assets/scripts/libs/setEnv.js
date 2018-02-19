// We need jQuery
var $ = window.jQuery;

export default {
  init() {
    window.env = window.ENV || window.env;
    if(!window.env) {
      if($('body').hasClass('env--development')) {
        window.env = 'development';
      } else if ($('body').hasClass('env--staging')) {
        window.env = 'staging';
      } else {
        window.env = 'production';
      }
    }
  },
}
