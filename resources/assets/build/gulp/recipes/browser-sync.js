module.exports = function (gulp, browserSync) {
  'use strict';
  var config = gulp.config;
  var settings = config.settings;
  gulp.task(
    'browser-sync',
    'Help text TBC.',
    function() {
      browserSync.init({
        port: settings.browserSync.port,
        open: false,
        proxy: settings.browserSync.devUrl || settings.browserSync.proxy,
        logLevel: "silent",
      });
    }
  );
};
