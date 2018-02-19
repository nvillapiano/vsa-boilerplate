var del      = require('del');

module.exports = function (gulp) {
  'use strict';
  var paths = gulp.config.paths;
  gulp.task(
    'clean',
    'Deletes the dist directory.',
    function() {
      return del([paths.dist]);
    }
  );
};
