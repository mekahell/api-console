var gulp  = require('gulp');

gulp.task('watch-copy', function() {
  gulp.watch('./src/app/index.html', ['copy']);
});
