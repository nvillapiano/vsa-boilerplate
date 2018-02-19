const merge          = require('merge-stream');
const fs             = require('fs');
const path           = require('path');
const autoprefixer   = require('gulp-autoprefixer');
const concat         = require('gulp-concat');
const cssnano        = require('gulp-cssnano');
const gulpif         = require('gulp-if');
const notify         = require('gulp-notify');
const sass           = require('gulp-sass');
const tildeImporter  = require('node-sass-tilde-importer');
const sassGlob       = require('gulp-sass-glob');
const sourcemaps     = require('gulp-sourcemaps');
const rename         = require('gulp-rename');
const util           = require('gulp-util');

// Compile SCSS to CSS
module.exports = function (gulp, production, browserSync) {
  'use strict';
  var config = gulp.config,
  paths = config.paths;
  gulp.task(
    'styles',
    'Compile and concat SCSS to CSS with sourcemaps and autoprefixer. Also runs styles:lint.',
    ['styles:lint'],
    function() {
      var merged = merge(),
          assets = config['assets'];

        assets.forEach(function(outputs) {

        outputs = Object.keys(outputs);
        outputs.forEach(function(output) {

          // Define files and add scripts path
          var inputs = assets[0][output].filter(
            function(file) {
              if(file.indexOf('.scss') === -1) {
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

          merged.add(
            gulp.src(inputs)
              .pipe(sourcemaps.init({loadMaps: true}))
              .pipe(sassGlob())
              .pipe(sass({outputStyle: 'nested', importer: tildeImporter}))
              .pipe(autoprefixer({browsers: ['last 2 versions']})) // @todo autoprefixer should be defined in config or package.json
              .pipe(concat(output))
              .pipe(gulpif(production, cssnano({safe: true, discardComments:{removeAll: true} })))
              .pipe(rename({
                extname: '.css',
                // @todo Should we rename to .min.css or just leave as .css
                // extname: (production ? '.min.css' : '.css'),
              }))
          );
        });
      });

      return merged
        .pipe(gulpif(!production, sourcemaps.write('.', {sourceRoot: paths.assets + '/styles'})))
        .pipe(gulp.dest(paths.dist + '/css'))
        .pipe(gulpif(!production, notify({
          "subtitle": "Task Complete",
          "message": "Styles task complete",
          "onLast": true,
        })))
        .pipe(browserSync.stream({match: '**/*.css'}));
    }, {
      options: {
        'production': 'Minified without sourcemaps.',
      },
    }
  );
};
