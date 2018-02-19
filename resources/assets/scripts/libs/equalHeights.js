// We need jQuery
var $ = window.jQuery;

export default {
  init(el) {
    var $el = $(el);

    if( !$el.length ) {
      return;
    }

    this.checkForImages($el)
      .then(function() {
        this.render($el);
      }.bind(this));
  },
  render(el) {
    var $el = $(el);

    var maxHeight = Math.max.apply(Math, $el.map(function(){
         return $(this).height();
     }).get());

     $el.height(maxHeight);
  },
  checkForImages(el) {
    var $el = (el),
      $images = $('img', $el),
      numImages = $images.length,
      numImagesLoaded = 0;

    return new Promise(
      function(resolve) {

        if(!$images.length) {
          return resolve();
        }

        $images.each(function(i, el){
          var img = new Image();
          img.onload = function() {
            numImagesLoaded++;

            if(numImages == numImagesLoaded) {
              resolve();
            }
          };
          img.src = $(el).attr('src');
        });
      }
    );
  },
};
