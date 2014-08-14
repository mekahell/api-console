var gulp = require('gulp');

gulp.task('copy', function () {
  gulp.src('./src/app/index.html')
    .pipe(gulp.dest('./dist'));
});
