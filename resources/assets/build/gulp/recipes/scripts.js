var merge      = require('merge-stream'),
    fs         = require('fs'),
    path       = require('path'),
    gulpif     = require('gulp-if'),
    notify     = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    util       = require('gulp-util'),
    rename     = require('gulp-rename'),
    browserify = require('browserify'),
    babelify   = require('babelify'),
    buffer     = require('vinyl-buffer'),
    source     = require('vinyl-source-stream');

// Compile JS
module.exports = function (gulp, production, browserSync) {
  'use strict';
  var config = gulp.config,
  paths = config.paths;
  gulp.task(
    'scripts',
    'Concat js files with sourcemaps. Also runs scripts:lint.',
    ['scripts:lint'],
    function() {
      var merged = merge(),
          assets = config['assets'];

      assets.forEach(function(outputs) {

        outputs = Object.keys(outputs);
        outputs.forEach(function(output) {

          // Define files and add scripts path
          var inputs = assets[0][output].filter(
            function(file) {
              if(file.indexOf('.js') === -1) {
                return false;
              }
              return true;
            }
          ).map(function(file) { return path.resolve(paths.assets + '/' + file); });

          // Check files exist
          inputs.forEach(function (file) {
            try {
              fs.accessSync(file);
            } catch (e) {
              util.log(util.colors.red('Warning! ' + file + ' does not exist.'));
            }
          });

          var bundler = browserify({
            entries: inputs,
            debug: true, // false
          });

          merged.add(
            bundler
              .transform(babelify, {presets: ["es2015"], sourceMapRelative: paths.assets + '/scripts'})
              .bundle()
              .on('error', function (err) { console.error(err); })
              .pipe(source(output))
              .pipe(buffer())
              .pipe(sourcemaps.init({loadMaps: true}))
              .pipe(gulpif(production, uglify({
                compress: {
                  drop_console: true,
                },
              })))
              .pipe(sourcemaps.write('.', {sourceRoot: paths.assets + '/scripts'}))
              .pipe(rename({
                extname: '.js',
              }))
              .pipe(gulp.dest(paths.dist + '/js'))
            );
        });
      });

      merged.add(
        gulp.src(paths.assets + '/scripts/vendor/**/*.js')
          .pipe(gulp.dest(paths.dist + '/js/vendor'))
      );

      return merged
        .pipe(gulpif(!production, notify({
          "subtitle": "Task Complete",
          "message": "Scripts task complete",
          "onLast": true,
        })))
        .on('finish', browserSync.reload);

    }, {
      options: {
        'production': 'Minified without sourcemaps.',
      },
    }
  );
};
