export default {
  init() {
    window.debug = function() {
      if(!this.shouldDebug()) {
        return function() {};
      }
      var context = "%cdebug:";
      return Function.prototype.bind.call(console.log, console, context, 'color:blue');
    }.bind(this)();
  },
  shouldDebug(debugging) {
    if(debugging) {
      return true;
    }

    if(window.env === 'production') {
      return false;
    }

    if(localStorage.getItem("debug")) {
      return localStorage.getItem("debug");
    }

    if(window.env === 'development') {
      return true;
    }

    return false;
  },
}
