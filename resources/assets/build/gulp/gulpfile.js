var gulp        = require('gulp-help')(require('gulp'), {hideDepsMessage: true}),
    util        = require('gulp-util'),
    path        = require('path'),
    gulpif      = require('gulp-if'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    browserSync = require('browser-sync').create();

var production = util.env.production || false,
    allowlint  = util.env.allowlint || false,
    mobile     = util.env.desktop || false,
    slug       = util.env.slug || '';

// Define config
gulp.config = require('./config/config.js');

// Change Gulp CWD
if(gulp.config.paths.root)
  process.chdir(path.resolve(gulp.config.paths.root));

// Override standard gulp.src task to use plumber
var _gulpsrc = gulp.src;
gulp.src = function() {
  return _gulpsrc.apply(gulp, arguments)
    .pipe(gulpif(!production, plumber({
      errorHandler: function(err) {
        notify.onError("Error: " + err.toString())(err);
        this.emit('end');
      },
    })));
};

// Compile SCSS to CSS
require('./recipes/styles')(gulp, production, browserSync);

// Lints scss files
require('./recipes/styles-lint')(gulp, production, allowlint);

// Critical path css
require('./recipes/styles-critical')(gulp, util);

// Concatenate & Minify JS
require('./recipes/scripts')(gulp, production, browserSync);

// Lint js files
require('./recipes/scripts-lint')(gulp, production, allowlint);

// Min / Crush images
require('./recipes/images')(gulp, production);

// Minify SVGS + run sprite task
require('./recipes/svgs')(gulp);

// Create SVG sprite file
require('./recipes/svg-sprite')(gulp, production);

// Copy font files from assets to dist
require('./recipes/fonts')(gulp);

// Copy static files from assets to dist
require('./recipes/statics')(gulp);

// Deletes the build folder entirely.
require('./recipes/clean')(gulp);

// Browser sync for the Ngrok tunnel
require('./recipes/browser-sync')(gulp, browserSync);

// Ngrok for tunnels
require('./recipes/ngrok')(gulp, util, browserSync);

// Google Page Speed Insights
require('./recipes/psi')(gulp, util, slug, mobile);

// W3C HTML validation
require('./recipes/w3c-validate')(gulp, util, slug);

// WAVE Accessibility validation
require('./recipes/wave')(gulp, util, slug);

// Watch Files For Changes
require('./recipes/watch')(gulp, browserSync);

// Generic build task. Use with '--production' for production builds
gulp.task('build',
  'Main build task. Runs styles, scripts, images, svgs and fonts. Does not delete dist directory.', [
    'images',
    'svgs',
    'styles',
    'scripts',
    'fonts',
    'statics',
  ]
);

gulp.task('default',
  'Runs the build task. Deleting the dist directory first.',
  ['clean'],
  function() {
    gulp.start('build');
  }
);
