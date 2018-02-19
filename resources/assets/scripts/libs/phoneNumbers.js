// We need jQuery
var $ = window.jQuery;

export default {
  init() {
    this.$el = $('abbr[data-phone]');

    if( !this.$el.length ) {
      return;
    }

    this.render();
  },
  render() {
    this.$el.each(function(i, el){
      var $el = $(el),
        num = $el.attr('data-phone'),
        numText = $el.html();

      if ( num.length ) {
        $el.replaceWith('<a href="tel:' + num + '" class="tel">' + numText + '</a>');
      }
    });
  },
};
