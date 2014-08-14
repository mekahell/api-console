var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var browserify = require('./support/browserify')

gulp.task('compile-js', function() {
  browserify()
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist'));
});
