var gulp  = require('gulp');

gulp.task('watch-sass', function() {
  gulp.watch('./src/app/**/*.scss', ['compile-sass']);
});
