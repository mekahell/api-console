var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('./support/browserify');

gulp.task('watch-js', function() {
  var bundler = watchify(browserify(watchify.args));

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
      .pipe(source('./app.js'))
      .pipe(gulp.dest('./dist'));
  }
})
