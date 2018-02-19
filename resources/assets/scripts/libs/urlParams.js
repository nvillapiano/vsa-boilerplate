!function(root, factory) {
  "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
  define([], function() {
    return root.urlParams = factory();
  }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
  // only CommonJS-like environments that support module.exports,
  // like Node.
  module.exports = factory() : root.urlParams = factory();
}(this, function() {

  var params;
  (window.onpopstate = function() {
    var match,
      pl = /\+/g, // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function(s) {
        return decodeURIComponent(s.replace(pl, " "));
      },
      query = window.location.search.substring(1);

    params = {};
    while ((match = search.exec(query))) {
      params[decode(match[1])] = decode(match[2]);
    }
  })();

  let self = {
    options: {
      debug: true,
    },
    init: function(rawopts) {
      if(rawopts) {
        self.options = rawopts;
      }
      return this;
    },
    get: function(name) {
      return params[name];
    },
  };

  return self;
});
