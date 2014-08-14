var gulp = require('gulp');

gulp.task('copy', function () {
  gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist'));
});
