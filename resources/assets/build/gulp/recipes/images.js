var pngquant = require('imagemin-pngquant'),
    gulpif   = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    newer    = require('gulp-newer'),
    notify   = require('gulp-notify');

// Min / Crush images
module.exports = function (gulp, production) {
  'use strict';
  var config = gulp.config,
  paths = config.paths;
  gulp.task(
    'images',
    'Compress JPG and PNG files.',
    function() {
      gulp.src(paths.assets + '/images/**/*')
        .pipe(newer(paths.dist + '/img'))
        .pipe(imagemin({
          progressive: true,
          use: [pngquant()],
        }))
        .pipe(gulp.dest(paths.dist + '/img'))
        .pipe(gulpif(!production, notify("Images task complete")));
    }
  );
};
