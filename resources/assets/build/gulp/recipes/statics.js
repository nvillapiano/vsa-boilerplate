// Copy font files from assets to dist
module.exports = function (gulp) {
  'use strict';
  var config = gulp.config,
  paths = config.paths;
  gulp.task(
    'statics',
    'Copy the statics directory to dist.',
    function() {
        gulp.src(paths.assets + '/static/**/*')
        .pipe(gulp.dest(paths.dist));
    }
  );
};
