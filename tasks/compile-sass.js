var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin       = require('gulp-cssmin');

gulp.task('compile-sass', function() {
  gulp.src('./src/app/app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist'));
});
