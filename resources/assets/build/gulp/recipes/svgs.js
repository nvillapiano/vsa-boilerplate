var svgmin   = require('gulp-svgmin');

// Minify SVGS + run sprite task
module.exports = function (gulp) {
  'use strict';
  var config = gulp.config,
  paths = config.paths;
  gulp.task('svgs',
    'Minify SVG files. Also runs svg:sprite.',
    ['svg:sprite'],
    function() {
      gulp.src(paths.assets + '/svgs/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest(paths.dist + '/svg'));
    }
  );
};
