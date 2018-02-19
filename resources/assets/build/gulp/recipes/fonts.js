// Copy font files from assets to dist
module.exports = function (gulp) {
  'use strict';
  var config = gulp.config,
  paths = config.paths;
  gulp.task(
    'fonts',
    'Copy the fonts directory to dist.',
    function() {
        gulp.src(paths.assets + '/fonts/*')
        .pipe(gulp.dest(paths.dist + '/fonts'));
    }
  );
};
