var gulp  = require('gulp');

gulp.task('watch-copy', function() {
  gulp.watch('./app/index.html', ['copy']);
});
