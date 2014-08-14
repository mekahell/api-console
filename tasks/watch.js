var gulp       = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', ['watch-js', 'watch-sass', 'watch-copy'], function () {
  gulp.src('./dist/*.{js,css,html}')
    .pipe(livereload());
});
